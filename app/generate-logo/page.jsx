// app/create/page.js
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import GenerateLogo from "./_components/GenerateLogo";

export default function CreatePage() {
    return (
        <Suspense
            fallback={
                <div className="p-10 text-center text-gray-600 flex items-center justify-center">
                    <Loader2 className="animate-spin w-4 h-4" />
                </div>
            }
        >
            <GenerateLogo />
        </Suspense>
    );
}
