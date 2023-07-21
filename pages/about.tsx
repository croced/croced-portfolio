import NavigationBar from '@/components/navigation/NavigationBar'
import React from 'react'
import Head from 'next/head'

const About: React.FC = () => {
    return (
        <> 
            <Head>
                <title>croced | about</title>
                <meta name="description" content="about me" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <p>based in liverpool...</p>
            <p>(wip)</p>
        </>
      
    )
  }
  
export default About;
