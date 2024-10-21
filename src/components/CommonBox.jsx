import React, { useEffect, useRef } from 'react'
import Heading from '../components/Heading'
import '../styles/components/CommonBox.css'

const CommonBox = (props) => {
    const {
        customId = '',
        customClassName = '',
        children = '',
        siblingClass = '',
        float = 'right',
        isHighlightEffectEnabled = true,
        heading = '',
        customHeadingClassName=''
    } = props

    const elementRef = useRef(null)
    const headingRef = useRef(null)

    const className = `relative float-${float} border-solid border-[1px] rounded-lg border-slate-500 bg-slate-800 common-content-box text-slate-600
        p-4 ${customClassName} ${siblingClass}`

    const handleContent = () => {
        const contentSections = document.querySelectorAll('.common-content-box')
        contentSections.forEach((section) => {
          const currentHeading = headingRef.current
          const sectionTop = section.getBoundingClientRect().top;
          const sectionHeight = section.getBoundingClientRect().height;
          const currentHeadingTop = currentHeading.getBoundingClientRect().top;
          if (sectionHeight > 500) {
              if (sectionTop < window.innerHeight * 0.85) {
                section.classList.add('opacity-100');
                section.classList.remove('opacity-0');
              } else {
                section.classList.add('opacity-0');
                section.classList.remove('opacity-100');
              }
              if (currentHeadingTop < window.innerHeight * 0.75 - 100) {
                currentHeading?.classList.add('opacity-100');
                currentHeading?.classList.remove('opacity-0');
              } else {
                currentHeading?.classList.add('opacity-0');
                currentHeading?.classList.remove('opacity-100');
              }
          }
        });
      }

    const handleHovering = () => {
        const currentElement = elementRef.current;
        const currentElementTop = currentElement.getBoundingClientRect().top;
        if (currentElementTop < window.innerHeight * 0.75) {
            const allSiblingElements = document.querySelectorAll(`.${siblingClass}`)
            allSiblingElements.forEach((elem) => {
                const elemTop = elem.getBoundingClientRect().top;
                (elemTop < window.innerHeight * 0.85) && elem.classList.add('opacity-40')
            })
            currentElement.classList.remove('opacity-40', 'text-slate-600', 'bg-slate-800')
            currentElement.classList.add('opacity-100', 'bg-slate-700')
            isHighlightEffectEnabled && currentElement.classList.add('text-slate-400')
        }
    }
    
    const handleNotHovering = () => {
        const currentElement = elementRef.current;
        const currentElementTop = currentElement.getBoundingClientRect().top;
        if (currentElementTop < window.innerHeight * 0.75) {
            const allSiblingElements = document.querySelectorAll(`.${siblingClass}`)
            allSiblingElements.forEach((elem) => {
                elem.classList.remove('opacity-40')
            })
            isHighlightEffectEnabled && currentElement.classList.remove('text-slate-400')
            currentElement.classList.remove('opacity-100', 'bg-slate-700')
            currentElement.classList.add('opacity-100', 'text-slate-600', 'bg-slate-800')
        }
    }
    
    useEffect(() => {
            window.addEventListener('scroll', handleContent)
            const currentElement = elementRef.current;
            siblingClass && currentElement?.addEventListener('mouseover', handleHovering)
            siblingClass && currentElement?.addEventListener('mouseout', handleNotHovering)
        return () => {
            window.removeEventListener('scroll', handleContent)   
            siblingClass && currentElement?.removeEventListener('mouseover', handleHovering)
            siblingClass && currentElement?.removeEventListener('mouseout', handleNotHovering)         
        }
    }, [])
  return (
    <>
        {heading && <Heading ref={headingRef} customClassName={customHeadingClassName}>{heading}</Heading>}
        <div id={customId} ref={elementRef} className={className}>{children}</div>
    </>
  )
}

export default CommonBox