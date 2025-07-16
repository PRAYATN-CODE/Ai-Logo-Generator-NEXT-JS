"use client"

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import { UserDetailContext } from "./_context/UserDetailContext";

const Provider = ({ children }) => {

    const { user } = useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        if (user) {
            CheckUserAuth();
        }
    }, [user]);

    const CheckUserAuth = async () => {
        try {
            const result = await axios.post('/api/users', {
                userName: user?.fullName,
                userEmail: user?.primaryEmailAddress?.emailAddress
            });
            console.log('user', result.data);
            setUserDetail(result.data)
        } catch (error) {
            console.error('Error checking user auth:', error);
        }
    };

    return (
        <div>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                <Header />
                <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4">
                    {children}
                </div>
            </UserDetailContext.Provider>
        </div>
    );
};

export default Provider;
