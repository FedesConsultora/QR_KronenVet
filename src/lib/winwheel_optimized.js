/* eslint-disable */
/***********************************************************************************
 * MIT LICENSE
 * 
 * Original author: Douglas McKechie (www.dougtesting.net)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
 * Software, and to permit persons to whom the Software is furnished to do so, subject
 * to the following conditions:
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ***********************************************************************************/

/******************************************************************************************
 * Winwheel con:
 * 1) numSegments se deduce de params.segments.length si no está definido
 * 2) Índices 0..(numSegments-1) en segments
 * 3) Logs de depuración en constructor y getIndicatedSegment
 * 4) requestAnimationFrame manual para la animación
 * 5) parseEasing para strings como "power3.out"
 ******************************************************************************************/

// ==================== parseEasing =====================
function parseEasing(easeVal) {
  if (typeof easeVal === 'function') {
    return easeVal;
  }
  if (typeof easeVal === 'string') {
    switch(easeVal) {
      case 'linear':
        return (t) => t;
      case 'power3.out':
        // Curva "easeOut cubic"
        return (t) => 1 - Math.pow(1 - t, 3);
      default:
        // fallback: lineal
        return (t) => t;
    }
  }
  // Por defecto, una especie de "ease out" simple
  return (t) => t*(2 - t);
}

// ==================== TweenLite (mini) ================
var TweenLite = (function(){
  function assignVars(source, target){
    let obj = target || {};
    for (let k in source) {
      obj[k] = source[k];
    }
    return obj;
  }

  var MiniTween = function(targetObj, vars){
    this.vars = vars;
    this._time = 0;
    this._duration = Number(vars.duration) || 0;
    this._totalDuration = this._duration;
    // Asignar easing (string → función)
    this._ease = parseEasing(vars.ease);
    this._target = targetObj;
    this._propLookup = {};
    this._initProps();
  };

  MiniTween.prototype = {
    // Analiza las props a animar
    _initProps: function(){
      let obj = this._target, v = this.vars;
      for (let p in v){
        if (p !== 'ease' && p !== 'duration' && p !== 'onComplete' && p !== 'onUpdate'){
          if (obj[p] != null){
            let endVal = v[p];
            this._firstPT = {
              _next: this._firstPT,
              t: obj,
              p: p,
              s: obj[p],
              c: endVal - obj[p]
            };
          }
        }
      }
    },

    // Avanza la animación a un tiempo "time" (en segundos)
    render: function(time){
      if (time > this._duration) time = this._duration;
      if (time !== this._time) {
        this._time = time;
        let ratio = (this._duration === 0) ? 1 : time / this._duration;
        if (ratio > 1) ratio = 1;
        let eased = this._ease(ratio);

        let pt = this._firstPT;
        while (pt) {
          pt.t[pt.p] = pt.s + eased * pt.c;
          pt = pt._next;
        }

        if (this._onUpdate) {
          this._onUpdate(this);
        }
        if (time === this._duration && this._onComplete) {
          console.log('TweenLite => onComplete disparado');
          this._onComplete(this);
        }
      }
    },

    _onComplete: null,
    _onUpdate: null
  };

  // Función "constructor" principal
  return function(obj, vars){
    let cfg = {};
    assignVars(vars, cfg);
    let tw = new MiniTween(obj, cfg);
    if (cfg.onUpdate) {
      tw._onUpdate = cfg.onUpdate;
    }
    if (cfg.onComplete) {
      tw._onComplete = cfg.onComplete;
    }
    return tw;
  };
})();

// ==================== Winwheel Class ===================
function Winwheel(params){
  let defaultOps = {
    canvasId: 'canvas',
    centerX: null,
    centerY: null,
    outerRadius: null,
    innerRadius: 0,
    // No definimos numSegments aquí para que sea deducido si no se pasa
    drawMode: 'code',
    rotationAngle: 0,
    textFontFamily: 'Arial',
    textFontSize: 20,
    textFontWeight: 'bold',
    textOrientation: 'horizontal',
    textAlignment: 'center',
    textDirection: 'normal',
    responsive: false,
    scaleFactor: 1,
    animation: null,
    pointerAngle: 0,
    pointerGuide: null
  };

  let defaultAnim = {
    type: 'spinToStop',
    direction: 'clockwise',
    duration: 10,
    spins: 3,
    stopAngle: null,
    easing: null,
    repeat: 0,
    callbackFinished: null,
    callbackBefore: null,
    callbackAfter: null
  };

  // 1) Mezclar defaults
  for (let op in defaultOps) {
    if (params && typeof params[op] !== 'undefined') {
      this[op] = params[op];
    } else {
      this[op] = defaultOps[op];
    }
  }

  // 2) Mezclar anim
  if (!this.animation) {
    this.animation = defaultAnim;
  } else {
    for (let a in defaultAnim){
      if (typeof this.animation[a] === 'undefined'){
        this.animation[a] = defaultAnim[a];
      }
    }
  }

  console.log('Winwheel => Recibido params.segments:', params && params.segments);

  // 3) Deducir numSegments si no se definió, pero hay segments
  if (typeof this.numSegments === 'undefined' && params && Array.isArray(params.segments)) {
    // Deducimos de la longitud del array
    this.numSegments = params.segments.length;
    console.log('numSegments se deduce de segments.length =>', this.numSegments);
  } else if (this.numSegments == null && params && Array.isArray(params.segments)){
    this.numSegments = params.segments.length;
    console.log('numSegments se deduce de segments.length =>', this.numSegments);
  } else {
    console.log('numSegments venía definido =>', this.numSegments);
  }

  // Si sigue sin numSegments, forzamos 1
  if (!this.numSegments) {
    console.log('No se detectaron segments => numSegments=1');
    this.numSegments = 1;
  }

  // 4) Crear el array de segments [0..(numSegments-1)]
  this.segments = [];
  for (let i=0; i < this.numSegments; i++){
    if (params && params.segments && params.segments[i]) {
      this.segments[i] = new Segment(params.segments[i]);
    } else {
      this.segments[i] = new Segment({});
    }
  }
  console.log('Se generaron', this.segments.length, 'segmentos en this.segments');

  // 5) Canvas + Context
  this.canvas = document.getElementById(this.canvasId);
  if (this.canvas) {
    this.ctx = this.canvas.getContext('2d');
  } else {
    console.warn('Canvas not found, id=', this.canvasId);
  }

  if (this.centerX === null) {
    this.centerX = this.canvas.width / 2;
  }
  if (this.centerY === null) {
    this.centerY = this.canvas.height / 2;
  }
  if (this.outerRadius === null) {
    this.outerRadius = Math.min(this.canvas.width, this.canvas.height)/2 - 5;
  }

  // Dibuja inicialmente
  this.draw();
  this.winWheelToDrawDuringAnimation = this;
}

// ============== Segment Class ===============
function Segment(opts){
  let def = {
    fillStyle: null,
    text: '',
    textFillStyle: null,
    lineWidth: null,
    strokeStyle: null,
    textFontFamily: null,
    textFontSize: null,
    textFontWeight: null,
    textOrientation: null,
    textAlignment: null,
    textMargin: null
  };
  for (let k in def){
    if (opts && typeof opts[k] !== 'undefined'){
      this[k] = opts[k];
    } else {
      this[k] = def[k];
    }
  }
}

// ============== Métodos de dibujo ===============
Winwheel.prototype.draw = function(clearTheCanvas){
  if (this.ctx){
    if (clearTheCanvas !== false){
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    this.drawSegments();
    if (this.pointerGuide){
      this.drawPointerGuide();
    }
  }
};

Winwheel.prototype.drawSegments = function(){
  let n = this.numSegments;
  let arcAngle = 360 / n;

  for (let i = 0; i < n; i++){
    let seg = this.segments[i];
    if (!seg) continue;

    let angleStart = (i * arcAngle) + this.rotationAngle;
    let angleEnd   = angleStart + arcAngle;

    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.outerRadius,
      this.degToRad(angleStart),
      this.degToRad(angleEnd),
      false
    );
    this.ctx.lineTo(this.centerX,this.centerY);

    // ======== DETECTAMOS SI ES ROJO ========
    if (seg.fillStyle === '#e2161b') {
      // Crea un gradiente lineal vertical (de top a bottom en el sector)
      // Ajustamos un bounding box: Por ejemplo, -outerRadius a +outerRadius
      // centrado en x=0 => usaremos rotate, etc. 
      // Pero la forma más rápida es un radial o lineal. Haré lineal:

      // Para lineal, supongamos un gradient "vertical":
      // Ten en cuenta que la ruleta gira, así que no siempre se verá "vertical"
      // De todos modos, con Winwheel, es normal. 
      let grad = this.ctx.createLinearGradient(
        0, -this.outerRadius,
        0, this.outerRadius
      );
      grad.addColorStop(0, '#8B0000'); // un rojo oscuro
      grad.addColorStop(1, '#e2161b'); // el color "rojo" actual
      this.ctx.fillStyle = grad;
    } else {
      // Los que no son rojos, se comportan normal:
      this.ctx.fillStyle = seg.fillStyle || 'gray';
    }

    // Rellenamos
    this.ctx.fill();

    // Trazo
    this.ctx.strokeStyle= seg.strokeStyle || 'transparent';
    this.ctx.lineWidth= seg.lineWidth|| 1;
    this.ctx.stroke();
  }

  this.drawSegmentText();
};

Winwheel.prototype.drawSegmentText = function(){
  let n = this.numSegments;
  let arcAngle = 360 / n;

  for (let i=0; i<n; i++){
    let seg = this.segments[i];
    if (!seg) continue;

    let angleCenter = (i * arcAngle) + (arcAngle/2) + this.rotationAngle;

    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(this.degToRad(angleCenter));

    let fontFamily= seg.textFontFamily|| this.textFontFamily;
    let fontSize= seg.textFontSize|| this.textFontSize;
    let fontWeight= seg.textFontWeight|| this.textFontWeight;
    let fillStyle= seg.textFillStyle|| 'black';

    this.ctx.font= fontWeight+' '+fontSize+'px '+fontFamily;
    this.ctx.fillStyle= fillStyle;
    this.ctx.textAlign='center';
    this.ctx.textBaseline='middle';
    let textPadding = 30; 
    this.ctx.fillText(seg.text, 0, -(this.outerRadius - textPadding));

    this.ctx.restore();
  }
};

Winwheel.prototype.drawPointerGuide = function(){
  if (this.pointerAngle!==null && this.ctx){
    this.ctx.save();
    this.ctx.strokeStyle= this.pointerGuide.strokeStyle;
    this.ctx.lineWidth= this.pointerGuide.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX,this.centerY);
    this.ctx.lineTo(this.centerX,this.centerY - this.outerRadius);
    this.ctx.stroke();
    this.ctx.restore();
  }
};

// =============== getIndicatedSegment ===============
Winwheel.prototype.getIndicatedSegment = function(){
  let n = this.numSegments;
  let arcAngle = 360 / n;

  let rawAngle = 360 - this.rotationAngle;
  // Forzar a [0..360)
  rawAngle = ((rawAngle % 360) + 360) % 360;

  let indicatedAngle = rawAngle;
  let segmentIndex = Math.floor(indicatedAngle / arcAngle);

  // CLAMP
  if (segmentIndex < 0) {
    console.log('Clamp negativo: segmentIndex=', segmentIndex);
    segmentIndex = 0;
  }
  if (segmentIndex >= n) {
    console.log('Clamp superior: segmentIndex=', segmentIndex, '>=', n);
    segmentIndex = n-1;
  }

  const seg = this.segments[segmentIndex];
  console.log(
    'getIndicatedSegment => indicatedAngle=', indicatedAngle,
    ' => segmentIndex=', segmentIndex,
    ' => seg=', seg
  );
  return seg;
};

// =============== getRandomForSegment ===============
Winwheel.prototype.getRandomForSegment = function(index){
  let n = this.numSegments;
  let arcAngle = 360/n;
  let segStart= index * arcAngle;
  let randAngle= Math.random()* arcAngle;
  return (360 - (segStart+ randAngle)) % 360;
};

// =============== startAnimation (manual) ===============
Winwheel.prototype.startAnimation = function(){
  let _this= this;
  if (_this.animation.callbackBefore){
    _this.animation.callbackBefore();
  }

  let spins= _this.animation.spins|| 3;
  let stopAngle= (_this.animation.stopAngle!== null)? _this.animation.stopAngle: 0;
  let easeFn= parseEasing(_this.animation.easing);
  let finalAngle= 0;

  if (_this.animation.type==='spinOngoing'){
    if (_this.animation.direction==='anti-clockwise'){
      finalAngle= _this.rotationAngle - 360* spins;
    } else {
      finalAngle= _this.rotationAngle + 360* spins;
    }
  }
  else if(_this.animation.type==='spinToStop'){
    if (_this.animation.direction==='anti-clockwise'){
      finalAngle= _this.rotationAngle- (360* spins)- (360- stopAngle);
    } else {
      finalAngle= _this.rotationAngle+ (360* spins)+ stopAngle;
    }
  }
  else {
    // fallback
    finalAngle= _this.rotationAngle+ 360;
  }

  let dur= _this.animation.duration|| 10;
  let props= { rotationAngle: _this.rotationAngle };

  this.tween= TweenLite(props, {
    duration: dur,
    ease: easeFn,
    onUpdate: ()=>{
      _this.rotationAngle= props.rotationAngle;
      _this.winWheelToDrawDuringAnimation.draw(false);

      if(_this.animation.callbackAfter){
        _this.animation.callbackAfter();
      }
    },
    onComplete: ()=>{
      console.log('onComplete => Se llama callbackFinished?');
      if(_this.animation.callbackFinished){
        let seg= _this.getIndicatedSegment();
        console.log('getIndicatedSegment() retornó:', seg);
        _this.animation.callbackFinished(seg);
      }
    },
    rotationAngle: finalAngle
  });

  // rAF loop
  let startTime= null;
  const animateFrame= (timestamp)=>{
    if(!startTime) startTime= timestamp;
    let elapsedSec= (timestamp- startTime)/1000;

    // + un pequeño margen
    if(elapsedSec+0.0001< this.tween._duration){
      this.tween.render(elapsedSec);
      requestAnimationFrame(animateFrame);
    } else {
      console.log('ANIM COMPLETED => calling tween.render(final)');
      this.tween.render(this.tween._duration);
    }
  };
  requestAnimationFrame(animateFrame);
};

// =============== stopAnimation ===============
Winwheel.prototype.stopAnimation= function(canCallback){
  if(this.tween){
    this.tween._time= this.tween._duration;
    this.tween.render(this.tween._duration);

    if(canCallback!== false && this.animation.callbackFinished){
      let seg= this.getIndicatedSegment();
      this.animation.callbackFinished(seg);
    }
  }
};

Winwheel.prototype.degToRad= function(d){
  return d* 0.0174532925199432957;
};

/* eslint-enable */
export default Winwheel;
