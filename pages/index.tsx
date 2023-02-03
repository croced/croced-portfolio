import Head from 'next/head'

const links = [
  { label: 'linkedin', href: 'https://www.linkedin.com/in/daniel-croce'},
  { label: 'instagram', href: 'https://instagram.com/croced.web?igshid=YmMyMTA2M2Y='},
  { label: 'github', href: 'https://github.com/croced'},
] as const;

export default function Home() {

  const renderLinks = () => {
    return links.map((social, i) => {

      let seperator = <span className="text-white text-lg"> {'\|'} </span>;

      // don't display seperator for last item
      if (i >= (links.length - 1))
        seperator = <></>;

      return (
        <>
          <a href={social.href} target='_blank' rel='noreferrer' className="text-white text-lg underline">{social.label}</a>
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
        <p className="mt-5 text-white text-lg">my links...</p>
        {renderLinks()}

        {/* browser image */}            
        <div className='my-auto relative'>
          <div className="absolute bottom-0 right-0 invisible md:visible transform md:translate-y-1/4 md:w-5/12">
            <img draggable={false} src="/browser.svg" alt="webpage" />
          </div>
        </div>
      </div>
    </>
  )
}
