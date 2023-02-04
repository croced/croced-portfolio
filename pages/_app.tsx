import NavigationBar from '@/components/navigation/NavigationBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationBar />

        <div className='flex flex-grow'>
          <Component {...pageProps} />
        </div>
    </div>
  ) 
}

export default App;