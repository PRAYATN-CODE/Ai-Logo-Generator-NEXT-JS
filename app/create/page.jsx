"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import LogoColorPallete from "./_components/LogoColorPallete"
import LogoDesc from "./_components/LogoDesc"
import LogoDesigns from "./_components/LogoDesigns"
import LogoIdea from "./_components/LogoIdea"
import LogoTitle from "./_components/LogoTitle"
import PricingModel from "./_components/PricingModel"

const CreateLogo = () => {

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState()

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    console.log(formData)
  }

  // Trigger next step on Enter key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && step <= 5) {
        setStep(prevStep => prevStep + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [step]); // Make sure the listener has the latest `step`

  return (
    <div className="mt-28 p-10 border rounded-xl 2xl:mx-72">
      {
        step == 1 ? <LogoTitle formData={formData} onHandleInputChange={(v) => onHandleInputChange('title', v)} /> :
          step == 2 ? <LogoDesc formData={formData} onHandleInputChange={(v) => onHandleInputChange('desc', v)} /> :
            step == 3 ? <LogoColorPallete formData={formData} onHandleInputChange={(v) => onHandleInputChange('palette', v)} /> :
              step == 4 ? <LogoDesigns formData={formData} onHandleInputChange={(v) => onHandleInputChange('design', v)} /> :
                step == 5 ? <LogoIdea formData={formData} onHandleInputChange={(v) => onHandleInputChange('idea', v)} /> :
                  step == 6 ? <PricingModel formData={formData} onHandleInputChange={(v) => onHandleInputChange('pricing', v)} /> :
                    null
      }

      <div className="flex items-center justify-between mt-5">
        {step != 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft /> Back
          </Button>
        )}
        {step <= 5 && (
          <Button onClick={() => setStep(step + 1)}>
            Continue <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  )
}

export default CreateLogo
