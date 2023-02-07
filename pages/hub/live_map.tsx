import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from "../../components/HubFullLayout";

import useSWR from 'swr'
import axios from 'axios'
import fetcher from "../../lib/fetcher"

export default function LiveMap() {
  return (
      <>
        <Head>
          <title>Bloody ARK Hub</title>
        </Head>
        <Layout>
            <iframe className="lg:pl-64 w-full h-full" loading="lazy" src="https://arkwebplugins.com/livemap/?id=2ab0317a2f3ed57582b22167077caece"></iframe>
        </Layout>
      </>
    )
}
