import { useColorScheme } from 'react-native'
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg'

// Types
import type { IconProps } from 'app/types'

export default function FreedomLifeIcon(props: IconProps) {
  const colorScheme = useColorScheme()

  return colorScheme === 'light' ? (
    <Svg viewBox="0 0 604 114" fill="none" {...props}>
      <G clipPath="url(#a)">
        <Path
          d="M29.626 18.298A40.452 40.452 0 0 0 18.492 15a48.628 48.628 0 0 1 3.83 18.9 44.85 44.85 0 0 1-.213 4.362c-.036.745-.142 1.525-.248 2.27a43.577 43.577 0 0 0-.213 4.324c0 16.596 8.369 31.241 21.134 39.965 7.022-7.447 11.313-17.482 11.313-28.546 0-16.878-10.036-31.417-24.469-37.977Z"
          fill="#1297B2"
        />
        <Path
          d="M47.39 33.597c.65 2.934-18.585 19.21-4.576 51.19 7.002-7.442 11.28-17.464 11.28-28.51a41.481 41.481 0 0 0-6.705-22.68Z"
          fill="#00728D"
        />
        <Path
          d="M87.837 45.853a49.978 49.978 0 0 0-7.27 3.688 48.639 48.639 0 0 0-8.816 6.986c1.584-11.675-1.89-23.475-9.378-32.412a40.46 40.46 0 0 0-8.618-7.784 48.628 48.628 0 0 1-4.71 18.7 45.038 45.038 0 0 1-2.075 3.842c-.354.656-.787 1.314-1.204 1.94a43.763 43.763 0 0 0-2.061 3.81c-6.283 13.114-6.122 27.655-.774 40.055a48.17 48.17 0 0 1-19.632 4.153c-4.61 0-9.043-.638-13.263-1.844-3.511-.993-6.88-2.411-10.036-4.15a70.372 70.372 0 0 0 20.018 11.67 69.103 69.103 0 0 0 11.418 2.984c2.117.364 5.466.95 9.45.95 5.992 0 11.702-1.1 16.95-3.156 13.758-5.283 24.432-16.808 28.51-31.134a48.407 48.407 0 0 1 13.653-21.419 46.47 46.47 0 0 0-12.162 3.121Z"
          fill="url(#b)"
        />
      </G>
      <Path
        d="M118.978 94V54.432l-3.8-.665c-.982-.19-1.79-.538-2.423-1.045-.602-.506-.902-1.235-.902-2.184v-5.225h7.125v-3.23c0-2.787.427-5.305 1.282-7.553.887-2.28 2.138-4.196 3.753-5.748 1.615-1.583 3.594-2.802 5.937-3.657 2.343-.855 4.988-1.282 7.933-1.282 1.14 0 2.216.079 3.23.237a21.94 21.94 0 0 1 3.135.618l-.285 6.46c-.064.981-.491 1.63-1.283 1.947-.76.285-1.615.428-2.565.428-1.33 0-2.533.142-3.61.427-1.045.285-1.932.776-2.66 1.472-.728.665-1.282 1.584-1.662 2.755-.38 1.14-.57 2.566-.57 4.276v2.85h12.16v9.12H132.04V94h-13.062Zm43.158-40.898c1.552-2.786 3.341-4.987 5.368-6.602 2.027-1.615 4.402-2.422 7.125-2.422 2.217 0 4.022.522 5.415 1.567l-.855 9.69c-.158.633-.412 1.077-.76 1.33-.317.222-.76.333-1.33.333-.507 0-1.235-.064-2.185-.19a16.243 16.243 0 0 0-2.66-.238c-1.203 0-2.28.174-3.23.523a8.121 8.121 0 0 0-2.47 1.472c-.728.633-1.393 1.41-1.995 2.328a24.085 24.085 0 0 0-1.615 3.135V94h-13.11V45.028h7.742c1.33 0 2.249.237 2.755.712.507.475.871 1.298 1.093 2.47l.712 4.892Zm53.46 10.64c0-1.361-.19-2.66-.57-3.895a8.767 8.767 0 0 0-1.71-3.277c-.791-.95-1.789-1.694-2.992-2.233-1.204-.57-2.644-.855-4.323-.855-3.135 0-5.589.887-7.362 2.66-1.774 1.774-2.929 4.307-3.468 7.6h20.425Zm-20.615 7.79c.412 4.592 1.71 7.949 3.895 10.07 2.217 2.122 5.099 3.183 8.645 3.183 1.805 0 3.357-.206 4.655-.617 1.33-.444 2.486-.919 3.468-1.425a360.661 360.661 0 0 1 2.707-1.425c.824-.444 1.631-.665 2.423-.665 1.013 0 1.805.38 2.375 1.14l3.8 4.75c-1.394 1.614-2.929 2.96-4.608 4.037a26.398 26.398 0 0 1-5.225 2.517 27.76 27.76 0 0 1-5.462 1.236c-1.837.253-3.61.38-5.32.38-3.42 0-6.619-.555-9.595-1.663a22.455 22.455 0 0 1-7.743-4.987c-2.185-2.217-3.911-4.956-5.177-8.218-1.267-3.262-1.9-7.046-1.9-11.352 0-3.325.538-6.46 1.615-9.405 1.108-2.946 2.691-5.51 4.75-7.696 2.058-2.184 4.56-3.91 7.505-5.177 2.945-1.298 6.27-1.948 9.975-1.948 3.135 0 6.016.507 8.645 1.52 2.66.982 4.94 2.423 6.84 4.323 1.931 1.9 3.42 4.243 4.465 7.03 1.076 2.755 1.615 5.906 1.615 9.453 0 .981-.048 1.789-.143 2.422-.095.633-.253 1.14-.475 1.52-.221.38-.522.65-.902.808-.38.126-.871.19-1.473.19h-29.355Zm71.548-7.79c0-1.361-.19-2.66-.57-3.895a8.796 8.796 0 0 0-1.71-3.277c-.792-.95-1.789-1.694-2.993-2.233-1.203-.57-2.644-.855-4.322-.855-3.135 0-5.589.887-7.363 2.66-1.773 1.774-2.929 4.307-3.467 7.6h20.425Zm-20.615 7.79c.411 4.592 1.71 7.949 3.895 10.07 2.216 2.122 5.098 3.183 8.645 3.183 1.805 0 3.356-.206 4.655-.617 1.33-.444 2.486-.919 3.467-1.425a359.25 359.25 0 0 1 2.708-1.425c.823-.444 1.631-.665 2.422-.665 1.014 0 1.805.38 2.375 1.14l3.8 4.75c-1.393 1.614-2.929 2.96-4.607 4.037a26.425 26.425 0 0 1-5.225 2.517 27.754 27.754 0 0 1-5.463 1.236c-1.836.253-3.61.38-5.32.38-3.42 0-6.618-.555-9.595-1.663a22.442 22.442 0 0 1-7.742-4.987c-2.185-2.217-3.911-4.956-5.178-8.218-1.266-3.262-1.9-7.046-1.9-11.352 0-3.325.539-6.46 1.615-9.405 1.109-2.946 2.692-5.51 4.75-7.696 2.059-2.184 4.56-3.91 7.505-5.177 2.945-1.298 6.27-1.948 9.975-1.948 3.135 0 6.017.507 8.645 1.52 2.66.982 4.94 2.423 6.84 4.323 1.932 1.9 3.42 4.243 4.465 7.03 1.077 2.755 1.615 5.906 1.615 9.453 0 .981-.047 1.789-.142 2.422-.095.633-.254 1.14-.475 1.52-.222.38-.523.65-.903.808-.38.126-.871.19-1.472.19h-29.355Zm70.74-13.774c-1.235-1.425-2.581-2.423-4.038-2.993-1.425-.57-2.945-.855-4.56-.855-1.583 0-3.024.3-4.322.903-1.298.601-2.423 1.551-3.373 2.85-.918 1.266-1.63 2.897-2.137 4.892-.507 1.995-.76 4.37-.76 7.125 0 2.723.206 5.035.617 6.935.412 1.9.998 3.436 1.758 4.608.792 1.171 1.742 2.026 2.85 2.564 1.108.507 2.343.76 3.705.76 2.312 0 4.243-.459 5.795-1.377 1.583-.918 3.072-2.217 4.465-3.895V57.757Zm13.11-34.58V94h-8.075c-1.678 0-2.755-.76-3.23-2.28l-1.093-4.275a27.315 27.315 0 0 1-3.135 2.945 20.46 20.46 0 0 1-3.515 2.328 18.94 18.94 0 0 1-4.085 1.472c-1.456.348-3.04.523-4.75.523-2.628 0-5.035-.555-7.22-1.663-2.185-1.108-4.085-2.723-5.7-4.845-1.583-2.153-2.818-4.782-3.705-7.885-.886-3.103-1.33-6.65-1.33-10.64 0-3.642.491-7.03 1.473-10.165 1.013-3.135 2.438-5.843 4.275-8.123a19.845 19.845 0 0 1 6.65-5.367c2.597-1.298 5.478-1.947 8.645-1.947 2.66 0 4.892.395 6.697 1.187 1.837.792 3.5 1.868 4.988 3.23V23.178h13.11Zm32.992 21.09c3.674 0 7.015.585 10.023 1.757s5.589 2.85 7.742 5.035c2.154 2.153 3.816 4.782 4.988 7.885 1.172 3.103 1.757 6.602 1.757 10.497 0 3.896-.585 7.41-1.757 10.546-1.172 3.103-2.834 5.747-4.988 7.932-2.153 2.185-4.734 3.863-7.742 5.035-3.008 1.172-6.349 1.758-10.023 1.758-3.705 0-7.077-.586-10.117-1.758-3.008-1.172-5.589-2.85-7.743-5.035-2.153-2.185-3.831-4.83-5.035-7.933-1.171-3.134-1.757-6.65-1.757-10.544 0-3.895.586-7.395 1.757-10.498 1.204-3.103 2.882-5.732 5.035-7.885 2.154-2.185 4.735-3.863 7.743-5.035 3.04-1.172 6.412-1.758 10.117-1.758Zm0 40.612c3.737 0 6.508-1.282 8.313-3.847 1.805-2.597 2.707-6.445 2.707-11.543 0-5.067-.902-8.882-2.707-11.447-1.805-2.597-4.576-3.895-8.313-3.895-3.831 0-6.65 1.298-8.455 3.894-1.805 2.566-2.707 6.381-2.707 11.448 0 5.098.902 8.946 2.707 11.543 1.805 2.564 4.624 3.847 8.455 3.847ZM395.498 94V45.028h8.075c1.647 0 2.739.76 3.278 2.28l.76 3.182a37.788 37.788 0 0 1 2.612-2.47c.918-.76 1.9-1.41 2.945-1.948a14.96 14.96 0 0 1 3.373-1.33c1.235-.316 2.565-.474 3.99-.474 3.008 0 5.494.807 7.457 2.422 1.963 1.583 3.452 3.705 4.465 6.365.792-1.552 1.758-2.882 2.898-3.99a15.675 15.675 0 0 1 3.8-2.755 17.886 17.886 0 0 1 4.37-1.52 21.188 21.188 0 0 1 4.655-.523c2.755 0 5.193.412 7.315 1.235 2.121.824 3.895 2.043 5.32 3.658 1.456 1.583 2.565 3.53 3.325 5.843.76 2.311 1.14 4.94 1.14 7.885V94h-13.11V62.888c0-5.732-2.455-8.598-7.363-8.598-1.108 0-2.137.19-3.087.57a6.948 6.948 0 0 0-2.47 1.615c-.697.728-1.251 1.63-1.663 2.707-.38 1.077-.57 2.312-.57 3.706V94h-13.11V62.888c0-3.104-.617-5.305-1.852-6.603-1.204-1.33-2.993-1.995-5.368-1.995a9.03 9.03 0 0 0-4.322 1.093c-1.33.696-2.581 1.678-3.753 2.944V94h-13.11Zm93.361-70.823V94h-13.11V23.177h13.11Zm24.406 21.85V94h-13.11V45.028h13.11Zm1.568-13.917a7.215 7.215 0 0 1-.665 3.087 8.342 8.342 0 0 1-1.805 2.518 7.789 7.789 0 0 1-2.613 1.71 8.14 8.14 0 0 1-3.182.617 7.906 7.906 0 0 1-3.088-.617 8.055 8.055 0 0 1-2.517-1.71 8.803 8.803 0 0 1-1.758-2.518 7.692 7.692 0 0 1-.617-3.087c0-1.108.206-2.137.617-3.087a8.608 8.608 0 0 1 1.758-2.566 8.055 8.055 0 0 1 2.517-1.71 7.906 7.906 0 0 1 3.088-.617 8.14 8.14 0 0 1 3.182.617 7.789 7.789 0 0 1 2.613 1.71 8.17 8.17 0 0 1 1.805 2.566c.443.95.665 1.979.665 3.087ZM528.016 94V54.432l-3.8-.665c-.982-.19-1.79-.538-2.423-1.045-.602-.506-.902-1.235-.902-2.184v-5.225h7.125v-3.23c0-2.787.427-5.305 1.282-7.553.887-2.28 2.138-4.196 3.753-5.748 1.615-1.583 3.594-2.802 5.937-3.657 2.343-.855 4.988-1.282 7.933-1.282 1.14 0 2.216.079 3.23.237a21.94 21.94 0 0 1 3.135.618l-.285 6.46c-.064.981-.491 1.63-1.283 1.947-.76.285-1.615.428-2.565.428-1.33 0-2.533.142-3.61.427-1.045.285-1.932.776-2.66 1.472-.728.665-1.282 1.584-1.662 2.755-.38 1.14-.57 2.566-.57 4.276v2.85h12.16v9.12h-11.733V94h-13.062Zm60.808-30.258c0-1.361-.19-2.66-.57-3.895a8.796 8.796 0 0 0-1.71-3.277c-.792-.95-1.789-1.694-2.993-2.233-1.203-.57-2.644-.855-4.322-.855-3.135 0-5.589.887-7.363 2.66-1.773 1.774-2.929 4.307-3.467 7.6h20.425Zm-20.615 7.79c.411 4.592 1.71 7.949 3.895 10.07 2.216 2.122 5.098 3.183 8.645 3.183 1.805 0 3.356-.206 4.655-.617 1.33-.444 2.486-.919 3.467-1.425a359.25 359.25 0 0 1 2.708-1.425c.823-.444 1.631-.665 2.422-.665 1.014 0 1.805.38 2.375 1.14l3.8 4.75c-1.393 1.614-2.929 2.96-4.607 4.037a26.425 26.425 0 0 1-5.225 2.517 27.754 27.754 0 0 1-5.463 1.236c-1.836.253-3.61.38-5.32.38-3.42 0-6.618-.555-9.595-1.663a22.442 22.442 0 0 1-7.742-4.987c-2.185-2.217-3.911-4.956-5.178-8.218-1.266-3.262-1.9-7.046-1.9-11.352 0-3.325.539-6.46 1.615-9.405 1.109-2.946 2.692-5.51 4.75-7.696 2.059-2.184 4.56-3.91 7.505-5.177 2.945-1.298 6.27-1.948 9.975-1.948 3.135 0 6.017.507 8.645 1.52 2.66.982 4.94 2.423 6.84 4.323 1.932 1.9 3.42 4.243 4.465 7.03 1.077 2.755 1.615 5.906 1.615 9.453 0 .981-.047 1.789-.142 2.422-.095.633-.254 1.14-.475 1.52-.222.38-.523.65-.903.808-.38.126-.871.19-1.472.19h-29.355Z"
        fill="#1F2937"
      />
      <Defs>
        <LinearGradient
          id="b"
          x1={0.944}
          y1={71.866}
          x2={99.047}
          y2={43.316}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.29} stopColor="#1297B2" />
          <Stop offset={0.87} stopColor="#10B981" />
        </LinearGradient>
        <ClipPath id="a">
          <Path
            fill="#fff"
            transform="translate(0 15)"
            d="M0 0h100v83.441H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ) : (
    <Svg viewBox="0 0 604 114" fill="none" {...props}>
      <G clipPath="url(#a)">
        <Path
          d="M29.627 18.298A40.452 40.452 0 0 0 18.492 15a48.628 48.628 0 0 1 3.83 18.9 44.85 44.85 0 0 1-.213 4.362c-.035.745-.142 1.525-.248 2.27a43.577 43.577 0 0 0-.213 4.324c0 16.596 8.37 31.241 21.135 39.965 7.021-7.447 11.312-17.482 11.312-28.546 0-16.878-10.036-31.417-24.468-37.977Z"
          fill="#1297B2"
        />
        <Path
          d="M47.39 33.597c.65 2.934-18.585 19.21-4.576 51.19 7.002-7.442 11.28-17.464 11.28-28.51a41.481 41.481 0 0 0-6.705-22.68Z"
          fill="#00728D"
        />
        <Path
          d="M87.837 45.853a49.978 49.978 0 0 0-7.27 3.688 48.639 48.639 0 0 0-8.816 6.986c1.584-11.675-1.89-23.475-9.378-32.412a40.46 40.46 0 0 0-8.618-7.784 48.628 48.628 0 0 1-4.71 18.7 45.038 45.038 0 0 1-2.075 3.842c-.354.656-.787 1.314-1.204 1.94a43.763 43.763 0 0 0-2.061 3.81c-6.283 13.114-6.122 27.655-.774 40.055a48.17 48.17 0 0 1-19.632 4.153c-4.61 0-9.043-.638-13.263-1.844-3.511-.993-6.88-2.411-10.036-4.15a70.372 70.372 0 0 0 20.018 11.67 69.103 69.103 0 0 0 11.418 2.984c2.117.364 5.466.95 9.45.95 5.992 0 11.702-1.1 16.95-3.156 13.758-5.283 24.432-16.808 28.51-31.134a48.407 48.407 0 0 1 13.653-21.419 46.47 46.47 0 0 0-12.162 3.121Z"
          fill="url(#b)"
        />
      </G>
      <Path
        d="M118.978 94V54.432l-3.8-.665c-.982-.19-1.79-.538-2.423-1.045-.602-.506-.902-1.235-.902-2.184v-5.225h7.125v-3.23c0-2.787.427-5.305 1.282-7.553.887-2.28 2.138-4.196 3.753-5.748 1.615-1.583 3.594-2.802 5.937-3.657 2.343-.855 4.988-1.282 7.933-1.282 1.14 0 2.216.079 3.23.237a21.94 21.94 0 0 1 3.135.618l-.285 6.46c-.064.981-.491 1.63-1.283 1.947-.76.285-1.615.428-2.565.428-1.33 0-2.533.142-3.61.427-1.045.285-1.932.776-2.66 1.472-.728.665-1.282 1.584-1.662 2.755-.38 1.14-.57 2.566-.57 4.276v2.85h12.16v9.12H132.04V94h-13.062Zm43.158-40.898c1.552-2.786 3.341-4.987 5.368-6.602 2.027-1.615 4.402-2.422 7.125-2.422 2.217 0 4.022.522 5.415 1.567l-.855 9.69c-.158.633-.412 1.077-.76 1.33-.317.222-.76.333-1.33.333-.507 0-1.235-.064-2.185-.19a16.243 16.243 0 0 0-2.66-.238c-1.203 0-2.28.174-3.23.523a8.121 8.121 0 0 0-2.47 1.472c-.728.633-1.393 1.41-1.995 2.328a24.085 24.085 0 0 0-1.615 3.135V94h-13.11V45.028h7.742c1.33 0 2.249.237 2.755.712.507.475.871 1.298 1.093 2.47l.712 4.892Zm53.46 10.64c0-1.361-.19-2.66-.57-3.895a8.767 8.767 0 0 0-1.71-3.277c-.791-.95-1.789-1.694-2.992-2.233-1.204-.57-2.644-.855-4.323-.855-3.135 0-5.589.887-7.362 2.66-1.774 1.774-2.929 4.307-3.468 7.6h20.425Zm-20.615 7.79c.412 4.592 1.71 7.949 3.895 10.07 2.217 2.122 5.099 3.183 8.645 3.183 1.805 0 3.357-.206 4.655-.617 1.33-.444 2.486-.919 3.468-1.425a360.661 360.661 0 0 1 2.707-1.425c.824-.444 1.631-.665 2.423-.665 1.013 0 1.805.38 2.375 1.14l3.8 4.75c-1.394 1.614-2.929 2.96-4.608 4.037a26.398 26.398 0 0 1-5.225 2.517 27.76 27.76 0 0 1-5.462 1.236c-1.837.253-3.61.38-5.32.38-3.42 0-6.619-.555-9.595-1.663a22.455 22.455 0 0 1-7.743-4.987c-2.185-2.217-3.911-4.956-5.177-8.218-1.267-3.262-1.9-7.046-1.9-11.352 0-3.325.538-6.46 1.615-9.405 1.108-2.946 2.691-5.51 4.75-7.696 2.058-2.184 4.56-3.91 7.505-5.177 2.945-1.298 6.27-1.948 9.975-1.948 3.135 0 6.016.507 8.645 1.52 2.66.982 4.94 2.423 6.84 4.323 1.931 1.9 3.42 4.243 4.465 7.03 1.076 2.755 1.615 5.906 1.615 9.453 0 .981-.048 1.789-.143 2.422-.095.633-.253 1.14-.475 1.52-.221.38-.522.65-.902.808-.38.126-.871.19-1.473.19h-29.355Zm71.548-7.79c0-1.361-.19-2.66-.57-3.895a8.796 8.796 0 0 0-1.71-3.277c-.792-.95-1.789-1.694-2.993-2.233-1.203-.57-2.644-.855-4.322-.855-3.135 0-5.589.887-7.363 2.66-1.773 1.774-2.929 4.307-3.467 7.6h20.425Zm-20.615 7.79c.411 4.592 1.71 7.949 3.895 10.07 2.216 2.122 5.098 3.183 8.645 3.183 1.805 0 3.356-.206 4.655-.617 1.33-.444 2.486-.919 3.467-1.425a359.25 359.25 0 0 1 2.708-1.425c.823-.444 1.631-.665 2.422-.665 1.014 0 1.805.38 2.375 1.14l3.8 4.75c-1.393 1.614-2.929 2.96-4.607 4.037a26.425 26.425 0 0 1-5.225 2.517 27.754 27.754 0 0 1-5.463 1.236c-1.836.253-3.61.38-5.32.38-3.42 0-6.618-.555-9.595-1.663a22.442 22.442 0 0 1-7.742-4.987c-2.185-2.217-3.911-4.956-5.178-8.218-1.266-3.262-1.9-7.046-1.9-11.352 0-3.325.539-6.46 1.615-9.405 1.109-2.946 2.692-5.51 4.75-7.696 2.059-2.184 4.56-3.91 7.505-5.177 2.945-1.298 6.27-1.948 9.975-1.948 3.135 0 6.017.507 8.645 1.52 2.66.982 4.94 2.423 6.84 4.323 1.932 1.9 3.42 4.243 4.465 7.03 1.077 2.755 1.615 5.906 1.615 9.453 0 .981-.047 1.789-.142 2.422-.095.633-.254 1.14-.475 1.52-.222.38-.523.65-.903.808-.38.126-.871.19-1.472.19h-29.355Zm70.74-13.774c-1.235-1.425-2.581-2.423-4.038-2.993-1.425-.57-2.945-.855-4.56-.855-1.583 0-3.024.3-4.322.903-1.298.601-2.423 1.551-3.373 2.85-.918 1.266-1.63 2.897-2.137 4.892-.507 1.995-.76 4.37-.76 7.125 0 2.723.206 5.035.617 6.935.412 1.9.998 3.436 1.758 4.608.792 1.171 1.742 2.026 2.85 2.564 1.108.507 2.343.76 3.705.76 2.312 0 4.243-.459 5.795-1.377 1.583-.918 3.072-2.217 4.465-3.895V57.757Zm13.11-34.58V94h-8.075c-1.678 0-2.755-.76-3.23-2.28l-1.093-4.275a27.315 27.315 0 0 1-3.135 2.945 20.46 20.46 0 0 1-3.515 2.328 18.94 18.94 0 0 1-4.085 1.472c-1.456.348-3.04.523-4.75.523-2.628 0-5.035-.555-7.22-1.663-2.185-1.108-4.085-2.723-5.7-4.845-1.583-2.153-2.818-4.782-3.705-7.885-.886-3.103-1.33-6.65-1.33-10.64 0-3.642.491-7.03 1.473-10.165 1.013-3.135 2.438-5.843 4.275-8.123a19.845 19.845 0 0 1 6.65-5.367c2.597-1.298 5.478-1.947 8.645-1.947 2.66 0 4.892.395 6.697 1.187 1.837.792 3.5 1.868 4.988 3.23V23.178h13.11Zm32.992 21.09c3.674 0 7.015.585 10.023 1.757s5.589 2.85 7.742 5.035c2.154 2.153 3.816 4.782 4.988 7.885 1.172 3.103 1.757 6.602 1.757 10.497 0 3.896-.585 7.41-1.757 10.546-1.172 3.103-2.834 5.747-4.988 7.932-2.153 2.185-4.734 3.863-7.742 5.035-3.008 1.172-6.349 1.758-10.023 1.758-3.705 0-7.077-.586-10.117-1.758-3.008-1.172-5.589-2.85-7.743-5.035-2.153-2.185-3.831-4.83-5.035-7.933-1.171-3.134-1.757-6.65-1.757-10.544 0-3.895.586-7.395 1.757-10.498 1.204-3.103 2.882-5.732 5.035-7.885 2.154-2.185 4.735-3.863 7.743-5.035 3.04-1.172 6.412-1.758 10.117-1.758Zm0 40.612c3.737 0 6.508-1.282 8.313-3.847 1.805-2.597 2.707-6.445 2.707-11.543 0-5.067-.902-8.882-2.707-11.447-1.805-2.597-4.576-3.895-8.313-3.895-3.831 0-6.65 1.298-8.455 3.894-1.805 2.566-2.707 6.381-2.707 11.448 0 5.098.902 8.946 2.707 11.543 1.805 2.564 4.624 3.847 8.455 3.847ZM395.498 94V45.028h8.075c1.647 0 2.739.76 3.278 2.28l.76 3.182a37.788 37.788 0 0 1 2.612-2.47c.918-.76 1.9-1.41 2.945-1.948a14.96 14.96 0 0 1 3.373-1.33c1.235-.316 2.565-.474 3.99-.474 3.008 0 5.494.807 7.457 2.422 1.963 1.583 3.452 3.705 4.465 6.365.792-1.552 1.758-2.882 2.898-3.99a15.675 15.675 0 0 1 3.8-2.755 17.886 17.886 0 0 1 4.37-1.52 21.188 21.188 0 0 1 4.655-.523c2.755 0 5.193.412 7.315 1.235 2.121.824 3.895 2.043 5.32 3.658 1.456 1.583 2.565 3.53 3.325 5.843.76 2.311 1.14 4.94 1.14 7.885V94h-13.11V62.888c0-5.732-2.455-8.598-7.363-8.598-1.108 0-2.137.19-3.087.57a6.948 6.948 0 0 0-2.47 1.615c-.697.728-1.251 1.63-1.663 2.707-.38 1.077-.57 2.312-.57 3.706V94h-13.11V62.888c0-3.104-.617-5.305-1.852-6.603-1.204-1.33-2.993-1.995-5.368-1.995a9.03 9.03 0 0 0-4.322 1.093c-1.33.696-2.581 1.678-3.753 2.944V94h-13.11Zm93.361-70.823V94h-13.11V23.177h13.11Zm24.406 21.85V94h-13.11V45.028h13.11Zm1.568-13.917a7.215 7.215 0 0 1-.665 3.087 8.342 8.342 0 0 1-1.805 2.518 7.789 7.789 0 0 1-2.613 1.71 8.14 8.14 0 0 1-3.182.617 7.906 7.906 0 0 1-3.088-.617 8.055 8.055 0 0 1-2.517-1.71 8.803 8.803 0 0 1-1.758-2.518 7.692 7.692 0 0 1-.617-3.087c0-1.108.206-2.137.617-3.087a8.608 8.608 0 0 1 1.758-2.566 8.055 8.055 0 0 1 2.517-1.71 7.906 7.906 0 0 1 3.088-.617 8.14 8.14 0 0 1 3.182.617 7.789 7.789 0 0 1 2.613 1.71 8.17 8.17 0 0 1 1.805 2.566c.443.95.665 1.979.665 3.087ZM528.016 94V54.432l-3.8-.665c-.982-.19-1.79-.538-2.423-1.045-.602-.506-.902-1.235-.902-2.184v-5.225h7.125v-3.23c0-2.787.427-5.305 1.282-7.553.887-2.28 2.138-4.196 3.753-5.748 1.615-1.583 3.594-2.802 5.937-3.657 2.343-.855 4.988-1.282 7.933-1.282 1.14 0 2.216.079 3.23.237a21.94 21.94 0 0 1 3.135.618l-.285 6.46c-.064.981-.491 1.63-1.283 1.947-.76.285-1.615.428-2.565.428-1.33 0-2.533.142-3.61.427-1.045.285-1.932.776-2.66 1.472-.728.665-1.282 1.584-1.662 2.755-.38 1.14-.57 2.566-.57 4.276v2.85h12.16v9.12h-11.733V94h-13.062Zm60.808-30.258c0-1.361-.19-2.66-.57-3.895a8.796 8.796 0 0 0-1.71-3.277c-.792-.95-1.789-1.694-2.993-2.233-1.203-.57-2.644-.855-4.322-.855-3.135 0-5.589.887-7.363 2.66-1.773 1.774-2.929 4.307-3.467 7.6h20.425Zm-20.615 7.79c.411 4.592 1.71 7.949 3.895 10.07 2.216 2.122 5.098 3.183 8.645 3.183 1.805 0 3.356-.206 4.655-.617 1.33-.444 2.486-.919 3.467-1.425a359.25 359.25 0 0 1 2.708-1.425c.823-.444 1.631-.665 2.422-.665 1.014 0 1.805.38 2.375 1.14l3.8 4.75c-1.393 1.614-2.929 2.96-4.607 4.037a26.425 26.425 0 0 1-5.225 2.517 27.754 27.754 0 0 1-5.463 1.236c-1.836.253-3.61.38-5.32.38-3.42 0-6.618-.555-9.595-1.663a22.442 22.442 0 0 1-7.742-4.987c-2.185-2.217-3.911-4.956-5.178-8.218-1.266-3.262-1.9-7.046-1.9-11.352 0-3.325.539-6.46 1.615-9.405 1.109-2.946 2.692-5.51 4.75-7.696 2.059-2.184 4.56-3.91 7.505-5.177 2.945-1.298 6.27-1.948 9.975-1.948 3.135 0 6.017.507 8.645 1.52 2.66.982 4.94 2.423 6.84 4.323 1.932 1.9 3.42 4.243 4.465 7.03 1.077 2.755 1.615 5.906 1.615 9.453 0 .981-.047 1.789-.142 2.422-.095.633-.254 1.14-.475 1.52-.222.38-.523.65-.903.808-.38.126-.871.19-1.472.19h-29.355Z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="b"
          x1={0.944}
          y1={71.866}
          x2={99.047}
          y2={43.316}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.29} stopColor="#1297B2" />
          <Stop offset={0.87} stopColor="#10B981" />
        </LinearGradient>
        <ClipPath id="a">
          <Path
            fill="#fff"
            transform="translate(0 15)"
            d="M0 0h100v83.441H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
