import type { ReactNode } from 'react'

interface ExternalLinkProps {
  href: string
  children: ReactNode | ReactNode[]
  className?: string
}

export default function ExternalLink(props: ExternalLinkProps) {
  return (
    <a
      className={`hover:underline ${props.className}`}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  )
}
