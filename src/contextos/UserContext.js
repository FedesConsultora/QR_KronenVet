import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    veterinaria: '',
    premio: null
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
