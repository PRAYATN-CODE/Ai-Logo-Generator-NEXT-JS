"use client"

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Info = () => {

    const { userDetail, setUserDetail } = useContext(UserDetailContext);


    return (
        <div className="">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-2xl text-primary">Hello {userDetail?.name}</h2>
                <div className="flex items-center justify-center gap-2">
                    <Image src={'/coin.png'} alt='coin' width={20} height={20} />
                    <h2 className="font-bold text-lg ">{userDetail?.credits} Credits left</h2>
                </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
                <h2 className="font-bold text-xl">Dashboard</h2>
                <Link href='/create'>
                    <Button>+ Create New Logo</Button>
                </Link>
            </div>
        </div>
    )
}

export default Info