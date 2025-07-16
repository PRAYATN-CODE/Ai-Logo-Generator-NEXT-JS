"use client"

import Lookup from '@/app/_data/Lookup'
import Prompt from '@/app/_data/Prompt'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'

function LogoIdea({ formData, onHandleInputChange }) {

  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);

  useEffect(() => {
    generateLogoDesignIdea();
  }, [])

  const generateLogoDesignIdea = async () => {
    try {
      setLoading(true);

      const PROMPT = Prompt.DESIGN_IDEA_PROMPT
        .replace('{logoType}', formData.design.title)
        .replace('{logoTitle}', formData.title)
        .replace('{logoDesc}', formData.desc)
        .replace('{logoPrompt}', formData.design.prompt);

      const response = await axios.post('/api/ai-design-ideas', { prompt: PROMPT });

      if (response?.data?.ideas) {
        setIdeas(prevIdeas => prevIdeas || response.data.ideas);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error generating logo design ideas:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='my-5'>
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className='flex items-center justify-center'>
        {loading && <Loader2Icon className='animate-spin my-10' />}
      </div>
      <div className='flex flex-wrap gap-3 mt-2'>
        {ideas && ideas.map((item, index) => (
          <h2 key={index}
            onClick={() => {
              setSelectedOption(item);
              onHandleInputChange(item)
            }}
            className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption == item && 'border-primary'}`}
          >{item}</h2>
        ))}
        <h2
          onClick={() => {
            setSelectedOption('Let AI Select the best idea');
            onHandleInputChange('Let AI Select the best idea')
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption == 'Let AI Select the best idea' && 'border-primary'}`}>Let AI Select the best idea</h2>
      </div>
    </div>
  )
}

export default LogoIdea