"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import Lookup from "../_data/Lookup"

const Hero = () => {

    const [logoTitle, setLogoTitle] = useState('')

    return (
        <div className=" flex items-center mt-24 flex-col gap-5">
            <h1 className="text-primary text-5xl text-center font-bold">{Lookup.HeroHeading}</h1>
            <h1 className="text-4xl text-center font-bold">{Lookup.HeroSubHeading}</h1>
            <p className="text-lg text-[#2e073f]">{Lookup.HeroDecs}</p>
            <div className="flex gap-5 w-full max-w-2xl mt-10">
                <input
                    type="text"
                    placeholder={Lookup.InputTitlePlaceholder}
                    className="p-3 border rounded-lg w-full shadow-sm"
                    onChange={(e) => setLogoTitle(e.target.value)}
                />
                <Link href={"/create?title=" + logoTitle}>
                    <Button className='w-full p-6'>Get Started</Button>
                </Link>
            </div>

        </div>
    )
}

export default Hero