"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { DownloadIcon, LayoutDashboard, LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserDetailContext } from "../_context/UserDetailContext";
import Lookup from "../_data/Lookup";
import Prompt from "../_data/Prompt";

const GenerateLogo = () => {

    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false)
    const [logoImage, setLogoImage] = useState();
    const searchParams = useSearchParams();
    const modelType = searchParams.get('type')

    useEffect(() => {
        if (typeof window != undefined && userDetail?.email) {
            const storage = localStorage.getItem('formData')
            if (storage) {
                setFormData(JSON.parse(storage))
            }
            console.log(JSON.parse(storage))
        }
    }, [userDetail])

    useEffect(() => {
        if (formData?.title) {
            GenerateAILogo();
        }
    }, [formData])

    const GenerateAILogo = async () => {
        toast('Ai Will Generating Your Logo')
        setLoading(true);

        if (modelType != 'Free' && userDetail?.credits <= 0) {
            setLoading(false);
            console.log("Not Enough Credits");
            toast('Not enough Credits!')
            return;
        }

        try {
            const PROMPT = Prompt.LOGO_PROMPT
                .replace('{logoTitle}', formData?.title)
                .replace('{logoDesc}', formData?.desc)
                .replace('{logoColor}', formData?.palette)
                .replace('{logoIdea}', formData?.idea)
                .replace('{logoDesign}', formData?.design.title)
                .replace('{logoPrompt}', formData?.design.prompt);

            const result = await axios.post('/api/ai-logo-model', {
                prompt: PROMPT,
                email: userDetail?.email,
                title: formData?.title,
                desc: formData?.desc,
                type: modelType,
                userCredits: userDetail?.credits
            });

            console.log(result?.data);
            setLogoImage(result?.data?.image);
        } catch (error) {
            console.error("Error generating AI logo:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDownload = () => {
        const link = document.createElement('a');
        link.href = logoImage; // Your image URL or base64 data
        link.download = 'image.png'; // Set the filename
        document.body.appendChild(link);
        link.click(); // Trigger download
        document.body.removeChild(link); // Clean up
    };

    return (
        <div className="mt-10 flex flex-col items-center justify-center ">
            <h2 className="font-bold text-2xl text-primary">{Lookup.LoadingWaitTitle}</h2>
            {
                loading && <div className="flex flex-col items-center mt-2">
                    <p className="text-lg">{Lookup.LoadingWaitDesc}</p>
                    <LoaderIcon className="animate-spin" />
                    <Image src={'/loading.gif'} alt="loading" width={200} height={200} />
                    <h2 className="mt-2 font-medium text-2xl text-gray-600">Do Not Refresh This Page</h2>
                </div>
            }

            {logoImage && (<div className="mt-5 flex flex-col items-center justify-center gap-4">
                <Image
                    src={logoImage}
                    alt="Generated Logo"
                    width={200}
                    height={200}
                    className="rounded-xl"
                />
                <div className="flex items-center gap-4">
                    <Button onClick={() => onDownload()} > <DownloadIcon /> Download</Button>
                    <Link href={'/dashboard'}>
                        <Button variant='outline' > <LayoutDashboard /> Dashboard</Button>
                    </Link>
                </div>
            </div>
            )}
        </div>
    )
}

export default GenerateLogo