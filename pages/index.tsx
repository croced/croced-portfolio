import React from 'react';
import useThemeProvider from '@/hooks/useThemeProvider';
import Head from 'next/head'

const links = [
  { label: 'linkedin', href: 'https://www.linkedin.com/in/daniel-croce'},
  { label: 'instagram', href: 'https://instagram.com/croced.web?igshid=YmMyMTA2M2Y='},
  { label: 'github', href: 'https://github.com/croced'},
] as const;

const Home: React.FC = () => {

  const theme = useThemeProvider();

  /**
   * Gets the path to the current browser image, depending on system theme
   * @returns the path to the browser image
   */
  const getBrowserImage = (): string => {
    var path: string;
    
    theme === "light" ? path = "browser-light.svg" : path = "browser-dark.svg";

    return path;
  }

  /**
   * Renders a list of social media links
   * @returns rendered social media links (link 1 | link 2, etc.)
   */
  const renderLinks = () => {
    return links.map((social, i) => {

      let seperator = <span className="text-lg"> {'\|'} </span>;

      // don't display seperator for last item
      if (i >= (links.length - 1))
        seperator = <></>;

      return (
        <>
          <a href={social.href} target='_blank' rel='noreferrer' className="text-lg underline">{social.label}</a>
          {seperator}
        </>
      ) 
    });
  }

  return (
    <>
     <Head>
        <title>croced | portfolio</title>
        <meta name="description" content="croced: my portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='my-auto md:flex md:flex-row w-full md:relative'>

        {/* flexbox for content */}
        <div className='py-20 flex-auto'>
          {/* title (typewriter effect) */}
          <div className="writer">
            <div className="writer-text text-4xl lg:text-5xl xl:text-6xl mb-4">hi, i&apos;m dan </div>
          </div>

          {/* subtitles */}
          <div className="text-xl lg:text-2xl xl:text-3xl">software engineer. web designer.</div>

          {/* information */}
          <div className='mt-12'>  
            {renderLinks()}
            <div className="text-sm lg:text-md xl:text-lg mt-2 md:mt-0">(based in liverpool, uk)</div>
          </div>
        </div>

        {/* flexbox for splash image */}
        <div className='flex-auto relative w-1/3 invisible md:visible'>
          <div className="h-full absolute right-0 invisible md:visible ">
            <img className='h-full w-auto' draggable={false} src={`/${getBrowserImage()}`} alt="webpage" />
          </div>
        </div>

      </div>
    </>
  )
}

export default Home;