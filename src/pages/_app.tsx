import Image from 'next/image'
import 'tailwindcss/tailwind.css';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import SearchInput from '../components/SearchInput';
import '../../globals.css'
import { AppProps } from 'next/app';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
     <Component {...pageProps} />
    </QueryClientProvider>
  )
}


