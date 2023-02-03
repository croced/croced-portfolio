import Head from 'next/head'
import { useEffect, useState } from 'react';

const links = [
  { label: 'linkedin', href: 'https://www.linkedin.com/in/daniel-croce'},
  { label: 'instagram', href: 'https://instagram.com/croced.web?igshid=YmMyMTA2M2Y='},
  { label: 'github', href: 'https://github.com/croced'},
] as const;

export default function Home() {

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  /**
   * Keeps track of the current system theme (light or dark mode)
   */
  useEffect(() => {
    // initial setting
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setTheme(e.matches ? 'dark' : 'light'));

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
      });
    }
  }, []);

  /**
   * Gets the path to the current browser image, depending on system theme
   * @returns the path to the browser image
   */
  const getBrowserImage = (): string => {

    var path: string = "browser-dark.svg"; // default is dark

    if (typeof window === 'undefined') return path;

    // dark mode checking
    if (window.matchMedia) {
      if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
        path = "browser-light.svg";
      }
    }

    return path;
  }

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

      <div className="my-auto w-full">
        {/* title (typrwriter effect) */}
        <div className="writer">
          <div className="writer-text text-4xl lg:text-5xl xl:text-6xl mb-4">hi, i&apos;m dan </div>
          <div className="text-xl lg:text-2xl xl:text-3xl">software engineer. web designer.</div>
        </div>

        {/* information */}
        <div className='mt-12'>
          {renderLinks()}
        </div>
        

        {/* browser image */}            
        <div className='my-auto relative'>
          <div className="absolute bottom-0 right-0 invisible md:visible transform md:translate-y-1/4 md:w-5/12">
            <img draggable={false} src={`/${getBrowserImage()}`} alt="webpage" />
          </div>
        </div>
      </div>
    </>
  )
}
