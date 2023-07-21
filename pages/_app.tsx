import NavigationBar from '@/components/navigation/NavigationBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className='mx-4 md:mx-8'>
        <NavigationBar />

        <div className='min-h-screen'>
          <Component {...pageProps} />
        </div>
    </div>
  ) 
}

export default App;