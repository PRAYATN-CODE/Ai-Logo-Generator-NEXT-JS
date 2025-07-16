import LogoDesign from "@/app/_data/LogoDesign"
import Lookup from "@/app/_data/Lookup"
import Image from "next/image"
import { useState } from "react"
import HeadingDescription from "./HeadingDescription"

const LogoDesigns = ({ onHandleInputChange,formData }) => {

  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className="my-5">
      <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-2">
        {LogoDesign.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.title)
              onHandleInputChange(design)
            }}
            className={`${selectedOption == design.title && 'border-2 rounded-xl border-primary'} p-1 hover:border border-primary rounded-xl cursor-pointer`}
          >
            <Image src={design.image} alt={design.title} width={300} height={150}
              className="w-full rounded-lg h-[170px] object-cover"
            />
            <h1 className="text-center mt-2 font-bold text-gray-600">{design.title}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoDesigns