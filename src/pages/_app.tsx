import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SideBarDrawerProvider } from '../Context/SideBarContext'
import { makeServer } from '../services/mirage'
import { theme } from '../styles/Theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

if(process.env.NODE_ENV === 'development'){
  makeServer();
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <QueryClientProvider client={queryClient}>
  <ChakraProvider theme={theme}>
    <SideBarDrawerProvider>
      <Component {...pageProps} />
    </SideBarDrawerProvider>
    <ReactQueryDevtools/>
  </ChakraProvider>
  </QueryClientProvider>
  )
}

export default MyApp
