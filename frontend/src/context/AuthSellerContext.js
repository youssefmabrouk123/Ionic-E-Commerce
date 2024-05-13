// SellerContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '@ionic/storage';
import axios from 'axios';

const SellerContext = createContext();

export const useSeller = () => useContext(SellerContext);

export const SellerProvider = ({ children }) => {
    const [seller, setSeller] = useState(null);
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

    const checkAuthSeller = async () => {
        setIsLoading(true);
        try {
            if (!storage) return false; // Ensure storage is initialized
            const token = await storage.get("token");
            if (token) {
                const response = await axios.get("http://localhost:8080/seller/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const sellerData = { ...response.data.ourUsers }; // Update seller data structure as needed
                    setSeller(sellerData);
                    setIsAuthenticated(true);
                    await storage.set("seller", sellerData);
                    await storage.set("auth", "yes");
                    console.log(response);
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
        <SellerContext.Provider value={{ seller, isAuthenticated, isLoading, checkAuthSeller, clearStorage }}>
            {children}
        </SellerContext.Provider>
    );
};
