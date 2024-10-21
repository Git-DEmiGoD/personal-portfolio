import React, { Fragment, useEffect, useRef, forwardRef } from 'react'
import '../styles/components/Heading.css'

const Heading = forwardRef((props, ref) => {
    const {
        children = '',
        customClassName = '',
    } = props

    const className = `common-heading w-full text-2xl text-slate-50 font-sans font-semibold relative ${customClassName}`

  return (
    <div ref={ref} className={className}>{children}</div>
  )
})

export default Heading