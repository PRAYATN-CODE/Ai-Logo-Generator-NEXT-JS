"use client"

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
const Header = () => {

    const { user } = useUser();

    return (
        <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex items-center justify-between shadow-lg">
            <Image src='/logo.svg' alt='logo' width={90} height={50} />
            <div className="flex gap-4 items-center justify-center">
                {user ? <Link href='/dashboard'><Button variant='outline'>Dashboard</Button></Link>
                    : <Button>Get Started</Button>
                }
                <UserButton />
            </div>
        </div>
    )
}

export default Header