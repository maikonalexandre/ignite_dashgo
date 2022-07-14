import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SideBarDrawerProvider } from '../Context/SideBarContext'
import { theme } from '../styles/Theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider theme={theme}>
    <SideBarDrawerProvider>
      <Component {...pageProps} />
    </SideBarDrawerProvider>
  </ChakraProvider>
  )
}

export default MyApp
