// AdminContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '@ionic/storage';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [storage, setStorage] = useState(null);

    useEffect(() => {
        const initializeStorage = async () => {
            const storage = new Storage();
            await storage.create();
            setStorage(storage);
        };

        initializeStorage();
    }, []);

    const checkAuthAdmin = async () => {
        setIsLoading(true);
        try {
            if (!storage) return false; // Ensure storage is initialized
            const token = await storage.get("token");
            if (token) {
                const response = await axios.get("http://localhost:8080/admin/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const adminData = { ...response.data.ourUsers }; // Update admin data structure as needed
                    setAdmin(adminData);
                    setIsAuthenticated(true);
                    await storage.set("admin", adminData);
                    await storage.set("auth", "yes");
                    return true;
                }
            }
            setIsAuthenticated(false);
            return false;
        } catch (error) {
            console.error("Failed to check authentication:", error);
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const clearStorage = async () => {
        try {
            await storage.clear();
            console.log('Storage cleared successfully');
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    };

    return (
        <AdminContext.Provider value={{ admin, isAuthenticated, isLoading, checkAuthAdmin, clearStorage }}>
            {children}
        </AdminContext.Provider>
    );
};
