import type { CSSProperties, ReactNode } from 'react'

interface HomeCardProps {
  /**
   * Loading state to hide footer when loading
   * @default undefined
   */
  isLoading?: boolean
  /**
   * Card Header — Title
   * @default undefined
   */
  title?: string
  /**
   * Card Header — Subtitle
   * @default undefined
   */
  subtitle?: string
  /**
   * Card Content
   * @required
   */
  children: ReactNode
  /**
   * Card Footer
   */
  footer?: ReactNode

  // Styles
  /**
   * To add a margin-top to the card.
   * See https://tailwindcss.com/docs/margin#class-reference (mt section) for more info.
   * @default undefined
   */
  top?: string
  /**
   * To add a custom string styles to the card.
   * @default undefined
   */
  className?: string
  /**
   * To add custom styles to the card.
   * @default undefined
   */
  style?: CSSProperties
}

export default function HomeCard({
  isLoading,
  title,
  subtitle,
  children,
  footer,
  top,
  className,
  style,
}: HomeCardProps) {
  return (
    <div
      className={`flex flex-col shadow-md rounded-lg mt-${top || '2'} ${
        className || ''
      }`}
      style={style}
    >
      {title || subtitle ? (
        <div className="flex items-center justify-between w-full px-4 py-2 rounded-t-lg backdrop-filter backdrop-blur-[20px] backdrop-saturate-[55%]">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold sm:text-xl text-white">{title}</h2>
            {subtitle ? (
              <p className="text-sm sm:text-md text-white">{subtitle}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {children}

      {footer && !isLoading ? (
        <div className="flex items-center justify-end w-full px-4 py-2 rounded-b-lg backdrop-filter backdrop-blur-[80px] backdrop-saturate-[70%]">
          {footer}
        </div>
      ) : null}
    </div>
  )
}
