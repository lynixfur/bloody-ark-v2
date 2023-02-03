import Head from "next/head";
import axios from 'axios';
import moment from 'moment';

import { useState, useEffect } from 'react';
import Layout from "../../components/HubLayout";

export default function HubDashboard() {
  return (
      <>
        <Head>
          <title>Bloody ARK Hub</title>
        </Head>
        <div className="flex flex-col bg-opacity-50 h-screen">
                <div className="w-full h-full">
                <iframe id="bloodyPortal" src="https://portal.bloody-ark.com" className="w-full justify-center items-center scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-full flex flex-grow">
                
                </iframe>
            </div>
        </div>
      </>
    )
}
