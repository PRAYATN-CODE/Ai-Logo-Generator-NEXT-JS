"use client"

import Lookup from '@/app/_data/Lookup'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect } from 'react'
import HeadingDescription from './HeadingDescription'

const PricingModel = ({ formData }) => {

    const { user } = useUser();

    useEffect(() => {
        if (formData?.title) {
            localStorage.setItem('formData', JSON.stringify(formData))
        }
    }, [formData])

    return (
        <div className='my-10'>
            <HeadingDescription
                title={Lookup.LogoPricingModelTitle}
                description={Lookup.LogoPricingModelDesc}
            />
            <div className="bg-white rounded-xl p-10 mt-4 border transition-all duration-300 text-center">
                <h2 className="text-3xl font-bold text-gray-900">You're Almost There!</h2>
                <p className="mt-4 text-gray-600 text-lg mb-4">
                    Hello! You're on the final step. Click the button below to generate your logo.
                </p>
                {
                    user ? <Link href={'/generate-logo'}>
                        <Button className="mt-auto py-3 text-lg">Generate Logo</Button>
                    </Link> : <SignInButton mode='modal'>
                        <Button className="mt-auto py-3 text-lg">Generate Logo</Button>
                    </SignInButton>
                }
            </div>
        </div >
    )
}

export default PricingModel