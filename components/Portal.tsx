import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
}

// test

export const Portal = (props: PortalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal-view")
    setMounted(true)
  }, [])

  return (mounted && ref.current) ? createPortal(<div className="bg-bgray-secondary text-white">{props.children}</div>, ref.current) : null
}