import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Custom404() {

  const router = useRouter();
  const { msg } = router.query;

  return (
    <>
      <Head>
        <title>Bloody ARK - Error</title>
        <meta name="description" content="Welcome to BloodyARK, The perfect Ark: Survival Evolved experience. This server was established in 2017 and is still running strong as one of the biggest unofficial ark communities." />
        <meta name="keywords" content="BloodyARK,ARK,Dinosaurs,PVPVE,Best ARK Server,BloodyHub,BloodyShop,Evolve or Die" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-full flex justify-center items-center" style={{ background: 'url(https://preview.redd.it/q82kow7rz7m91.jpg?auto=webp&s=552cb5a950dea21c862928a193765862fe32ae84)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

        <div className="bg-bgray-bg bg-opacity-90 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12
              flex items-center justify-center rounded-3xl">
          <div className="text-gray-700 px-4 py-3 p-20" role="alert">
            <div>
              <div className="text-gray-700 px-4 py-3" role="alert">
                <div className="">
                  <div className="my-auto flex justify-center mb-5">
                    <i className="fa-solid fa-exclamation-triangle text-red-600 text-5xl animate-pulse"></i>
                  </div>
                  <div>
                    <p className="text-2xl text-center text-red-600 uppercase font-bold">
                      AN ERROR OCCURED
                    </p>
                    <p className="font-fontstars text-gray-400 text-center mt-1">We encountered a critical error.<br />{msg}</p>
                  </div>
                </div>
              </div>

            </div>
            <div className="flex justify-center mb-3 mt-5">
              <Link href="/" className="block py-2 pr-4 pl-3 text-white bg-red-600 rounded-full p-4 font-bold transition-colors"><i className="fas fa-home mr-2"></i>Return Home</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}