import React, { useEffect, useState, useRef } from 'react'
import CommonBox from '../components/CommonBox'
import '../styles/pages/Home.css'

const HomePage = () => {
  const [ dynamicHeading, setDynamicHeading ] = useState('')
  const appendIndex = useRef(0)
  const direction = useRef('right')

  const handleNavShift = () => {

    const contentSection = document.querySelector('.contentSection')
    const headingSection = document.querySelector('.hero-section')
    const headingSectionScrolled = document.querySelector('.hero-section-scrolled')

    const contentSectionRect = contentSection.getBoundingClientRect()

    if(contentSectionRect.top < 20) {
      headingSection.classList.add('opacity-[0]')
      headingSectionScrolled.classList.remove( 'opacity-[0]' )
    } else if (contentSectionRect.top > 10) {
      headingSection.classList.remove('opacity-[0]')
      headingSectionScrolled.classList.add('opacity-[0]' )
    }
  }

  useEffect(() => {
    const intervalRef = setInterval(() => {
      
      const heading = '..code........';

      //heading shouldnt be empty
      if(heading?.length) {

        // if the character we are targeting is at a negative index, then change direction to right and start from 0
        if(appendIndex.current < 0) {
          direction.current = 'right'
          appendIndex.current = 0;
        }

        // if the character we are targeting is at a index more than size of string, then change direction to left and start from length 2 1
        else if(appendIndex.current >= heading.length) {
          direction.current = 'left'
          appendIndex.current = appendIndex.current - 1;
        }

        // if direction is rightwards, add the element at the current index and increase index by 1 
        if(direction.current === 'right') {

          // character should be in bounds
          if(appendIndex.current <= heading.length - 1) {
            let appendCharacter = heading[appendIndex.current]
            appendCharacter  = appendCharacter !== '.' ? appendCharacter : ''
            setDynamicHeading((prevHeading) => {
              return prevHeading + appendCharacter;
            })
            appendIndex.current = appendIndex.current + 1;
          }
        }
        
        // if direction is negative then select substring uptill the selected index and decrease index by 1
        else if (direction.current === 'left') {

          // as we are reducing index, we need to check that we are not accessing any element out of bounds 
          if(appendIndex.current >= 0) {
            setDynamicHeading((prevHeading) => {
              return prevHeading.substring(0, appendIndex.current - 1)
            })
            appendIndex.current = appendIndex.current - 1;
          }
        }

      }
    }, 200)

    window.addEventListener('scroll', handleNavShift)
    return () => {
      intervalRef && clearInterval(intervalRef)
      window.removeEventListener('scroll', handleNavShift)
    }
  }, [])

  const renderMainHeroSection = () => {
    return (
      <div className="hero-section w-full container mx-auto my-0 p-32 pb-0 flex flex-col justify-center items-start gap-8 relative transition-all duration-500 ease-in-out">
        <div className='bg-element bg-radial-gradient from-green-400/10 from-0% via-transparent via-50% p-10 h-[1300px] w-[1300px] absolute -top-80 right-5 scale-x-50 -rotate-45 z-[-1]'></div>
        <div className='bg-element bg-radial-gradient from-cyan-400/20 from-0% via-transparent via-50% p-10 h-[1300px] w-[1300px] absolute -top-96 -right-24 scale-x-75 rotate-45 z-[-1]'></div>
        <div className='headingSection'>
          <div className='textElement text-8xl leading-snug text-slate-50'>Designing with <span className='font-code text-yellow-500'><span className='text-purple-500'>{`{`}</span>{dynamicHeading}_<span className='text-purple-500'>{`}`}</span></span></div>
          <div className='textElement text-8xl leading-snug text-green-500'>Building with <span className='italic font-serif text-slate-50'>Style</span>.</div>
        </div>
        <div className='subTextElement subHeadingSection text-2xl max-w-3xl text-slate-400'>Hi, I'm a Ujjwal, Front-end developer with a designer's eye. From wireframes to sleek websites, I bring bold, user-focused experiences to life.</div>
        <button className='py-4 px-6 text-xl text-white hover:drop-shadow-2xl relative bg-gradient-to-tl from-green-600 to-green-800 z-10 rounded-xl mt-8 overflow-hidden antialiased font-medium hover:-translate-y-[6px] transition-all duration-500 ease-in-out'>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-0 transition-opacity duration-500 hover:opacity-100 z-[-1]"></div>
          View Projects
        </button>
      </div>
    )
  }

  const renderSideHeroSection = () => {
    return (
      <div className=" opacity-[0] hero-section-scrolled w-2/5 container mx-auto my-0 float-left py-16 px-32 flex flex-col justify-center items-start gap-4 sticky top-0 left-0 transition-all duration-500 ease-in-out">
        <div className='bg-element bg-radial-gradient from-green-400/10 from-0% via-transparent via-50% p-10 h-[800px] w-[800px] absolute -top-96 -right-16 scale-x-50 -rotate-45 z-[-1]'></div>
        <div className='bg-element bg-radial-gradient from-cyan-400/20 from-0% via-transparent via-50% p-10 h-[800px] w-[800px] absolute -top-64 -right-16 scale-x-75 rotate-45 z-[-1]'></div>
        <div className='headingSection'>
          <div className='textElement text-2xl leading-snug text-slate-50'>Designing with <span className='font-code text-yellow-500'><span className='text-purple-500'>{`{`}</span>{dynamicHeading}_<span className='text-purple-500'>{`}`}</span></span></div>
          <div className='textElement text-2xl leading-snug text-green-500'>Building with <span className='italic font-serif text-slate-50'>Style</span>.</div>
        </div>
        <div className='subTextElement subHeadingSection text-l max-w-3xl text-slate-400'>Hi, I'm a Ujjwal, Front-end developer with a designer's eye. From wireframes to sleek websites, I bring bold, user-focused experiences to life.</div>
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className="w-3/5 contentSection container mx-auto my-0 p-4 flex flex-col justify-center items-end gap-8 sticky top-0 right-0 overflow-hidden">
        <main className='w-full flex flex-col justify-center items-end gap-8'>
          <CommonBox
            customId='design_philosophy'
            siblingClass='home-section-content'
            isHighlightEffectEnabled={false}
            customClassName='w-full'
            heading='Design Philosophy'
          >
            <img src="images/design_philosophy_bg.svg" alt="design philosophy" />
          </CommonBox>
          <CommonBox
            customId='design_philosophy'
            siblingClass='home-section-content'
            isHighlightEffectEnabled={false}
            customClassName='w-full'
            heading='Design Philosophy'
          >
            <img src="images/design_philosophy_bg.svg" alt="design philosophy" />
          </CommonBox>
          <CommonBox
            customId='design_philosophy'
            siblingClass='home-section-content'
            isHighlightEffectEnabled={false}
            customClassName='w-full'
            heading='Design Philosophy'
          >
            <img src="images/design_philosophy_bg.svg" alt="design philosophy" />
          </CommonBox>
          <CommonBox
            customId='design_philosophy'
            siblingClass='home-section-content'
            isHighlightEffectEnabled={false}
            customClassName='w-full'
            heading='Design Philosophy'
          >
            <img src="images/design_philosophy_bg.svg" alt="design philosophy" />
          </CommonBox>
          <CommonBox
            customId='design_philosophy'
            siblingClass='home-section-content'
            isHighlightEffectEnabled={false}
            customClassName='w-full'
            heading='Design Philosophy'
          >
            <img src="images/design_philosophy_bg.svg" alt="design philosophy" />
          </CommonBox>
        </main>
      </div>
    )
  }

  return (
    <div className="mainContainer container mx-auto my-0">
      {renderMainHeroSection()}
      <div className='container w-full mx-auto my-0'>
        {renderSideHeroSection()}
        {renderContent()}
      </div>
    </div>
  )
}

export default HomePage