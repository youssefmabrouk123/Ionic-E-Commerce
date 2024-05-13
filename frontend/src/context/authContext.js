import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  const checkAuthUser = async () => {
    const storage = new Storage();
    await storage.create();
    setIsLoading(true);
    try {
        const token = await storage.get("token");
        console.log(token)
      if (token) {
        const response = await axios.get("http://localhost:8080/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
            const userData = {
                id: response.data.id,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                password: response.data.password,
                gender: response.data.gender,
                address: response.data.address,
                role: response.data.role.authority,
                age: response.data.age,
                number: response.data.number,
                birthDate: response.data.birthDate,
                image: response.data.image,
                enabled: response.data.enabled,
                authorities: response.data.authorities,
                username: response.data.username,
                accountNonExpired: response.data.accountNonExpired,
                credentialsNonExpired: response.data.credentialsNonExpired,
                accountNonLocked: response.data.accountNonLocked,
                // Add any other properties if needed
              };
          setUser(userData);
          setIsAuthenticated(true);
          
          await storage.set("user", userData);
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






  const history = useHistory();
  // useEffect(() => {
  //   const fetchData = async () => {
  //       const storage = new Storage();
  //       await storage.create();
  //     try {
  //       const accessToken = await storage.get("token");
  //       if (!accessToken) {
  //        // history.push("/signIn");
  //       } else {
  //         await checkAuthUser();
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [storage, history]); // Include storage and history in the dependency array

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, isLoading, checkAuthUser ,clearStorage}}>
      {children}
    </UserContext.Provider>
  );
};