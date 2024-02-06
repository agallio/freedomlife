import type { ReactNode } from 'react'
import clsx from 'clsx'

interface ExternalLinkProps {
  href: string
  children: ReactNode | ReactNode[]
  className?: string
}

export default function ExternalLink(props: ExternalLinkProps) {
  return (
    <a
      className={clsx('hover:underline', props.className)}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  )
}
