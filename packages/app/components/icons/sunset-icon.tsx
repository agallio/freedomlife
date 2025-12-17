import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg'

// Types
import type { IconProps } from '../../types'

export default function SunsetIcon(props: IconProps) {
  return (
    <Svg viewBox="0 0 826 500" fill="none" {...props}>
      <G clipPath="url(#as)">
        <Circle cx={250} cy={250} r={225} fill="url(#bs)" />
        <Path
          fill="url(#cs)"
          d="M209.95 327.5C120.204 258.464 0 250 0 250s-96.456 178.008-28 267c68.456 88.992 353-17 353-17s-25.304-103.465-115.05-172.5Z"
        />
        <Path
          fill="url(#ds)"
          d="M292.05 327.5C381.796 258.464 502 250 502 250s85.027 207.615 25.5 285C450.115 635.6 177 500 177 500s25.304-103.465 115.05-172.5Z"
        />
        <Path
          fill="url(#es)"
          d="M710.6 327.5c-89.746-69.036-145.935-84.06-209.95-77.5-34.15 3.5-85.026 207.616-25.5 285 77.385 100.6 350.5-35 350.5-35S800.347 396.536 710.6 327.5Z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="bs"
          x1={250}
          x2={250}
          y1={25}
          y2={475}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F4A261" />
          <Stop offset={1} stopColor="#FF6B35" />
        </LinearGradient>
        <LinearGradient
          id="cs"
          x1={136.227}
          x2={136.227}
          y1={250}
          y2={552.58}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7B5EA7" />
          <Stop offset={1} stopColor="#3D2659" />
        </LinearGradient>
        <LinearGradient
          id="ds"
          x1={362.825}
          x2={362.825}
          y1={250}
          y2={572.147}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#5B3A7D" />
          <Stop offset={1} stopColor="#3D2659" />
        </LinearGradient>
        <LinearGradient
          id="es"
          x1={639.825}
          x2={639.825}
          y1={250}
          y2={572.148}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#5B3A7D" />
          <Stop offset={1} stopColor="#3D2659" />
        </LinearGradient>
        <ClipPath id="as">
          <Path fill="#fff" d="M0 0h826v500H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
