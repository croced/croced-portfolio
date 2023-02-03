import Head from 'next/head'

export default function Home() {
  return (
    <>
    <Head>
        <title>croced | portfolio</title>
        <meta name="description" content="croced: my portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


        <div className="my-auto w-full">
          {/* typewriter text */}
            <div className="writer">
              <div className="writer-text text-4xl lg:text-5xl xl:text-6xl mb-4">hi, i&apos;m dan </div>
              <div className="font-semibold text-xl lg:text-2xl xl:text-3xl">software engineer. web designer.</div>
            </div>

            <p className="mt-5 text-white text-lg font-light">need a website?</p>
            <a href="#" className="mt-5 text-white text-lg font-light underline">get in touch!</a>

            <div className='my-auto relative'>
              {/* webpage image */}
              <div className="absolute bottom-0 right-0 invisible md:visible transform md:translate-y-1/4 md:w-5/12">
                <img draggable={false} src="/browser.svg" alt="webpage" />
              </div>
            </div>

        </div>
    </>
  )
}
