import React, { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const updateUser = (userData) => setUser(userData);
    const clearUser = () => setUser(null);

    return (
        <UserDataContext.Provider value={{ user, updateUser, clearUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserDataContext.Provider>
    );
};