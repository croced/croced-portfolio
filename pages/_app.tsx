import NavigationBar from '@/components/navigation/NavigationBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationBar />

        <div className='flex flex-grow'>
          <Component {...pageProps} />
        </div>
    </div>
  ) 
}
