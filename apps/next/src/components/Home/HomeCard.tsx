import type { CSSProperties, ReactNode } from 'react'

interface HomeCardProps {
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
      className={`flex flex-col rounded-lg shadow-md mt-${top || '2'} ${
        className || ''
      }`}
      style={style}
    >
      {title || subtitle ? (
        <div className="flex w-full items-center justify-between rounded-t-lg px-4 py-2 backdrop-blur-[20px] backdrop-saturate-[55%] backdrop-filter">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>
            {subtitle ? (
              <p className="sm:text-md text-sm text-white">{subtitle}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {children}

      {footer ? (
        <div className="flex w-full items-center justify-end rounded-b-lg px-4 py-2 backdrop-blur-[80px] backdrop-saturate-[70%] backdrop-filter">
          {footer}
        </div>
      ) : null}
    </div>
  )
}
