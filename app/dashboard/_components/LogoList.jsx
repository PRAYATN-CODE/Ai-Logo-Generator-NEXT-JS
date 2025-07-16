"use client"

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const LogoList = () => {

    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [logoList, setLogoList] = useState([])

    useEffect(() => {
        if (userDetail) {
            GetUserLogo();
        }
        console.log(logoList)
    }, [userDetail])

    const GetUserLogo = async () => {
        const querySnapshot = await getDocs(collection(db, "users", userDetail?.email, "logos"));
        setLogoList([])
        querySnapshot.forEach((doc) => {
            setLogoList(prev => [...prev, doc.data()])
        })
    }

    const ViewLogo = (image) => {
        const link = document.createElement('a');
        link.href = image; // Your image URL or base64 data
        link.download = 'image.png'; // Set the filename
        document.body.appendChild(link);
        link.click(); // Trigger download
        document.body.removeChild(link); // Clean up
    }

    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {logoList?.length > 0 ? logoList.map((logo, index) => (
                    <div onClick={() => ViewLogo(logo?.image)} key={index} className="hover:scale-[1.009] transition-all cursor-pointer duration-150 ease-in-out">
                        <Image src={logo.image ? logo.image : "/dummyimage.jpg"}
                            alt='LogoImage'
                            width={350}
                            height={250}
                            className='w-full rounded-xl overflow-hidden border border-gray-200'
                        />
                        <h2 className="text-center text-lg text-primary">{logo?.title}</h2>
                        <p className="text-gray-500 text-center text-sm">{logo?.desc}</p>
                    </div>
                )) : (
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className="animate-pulse border rounded-xl bg-slate-100 h-[200px]">
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default LogoList