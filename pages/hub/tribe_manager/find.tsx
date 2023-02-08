import Head from "next/head";
import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import Layout from '../../../components/HubLayout'
import useSWR from 'swr'
import { env } from "process";
import Link from "next/link";
import fetcher from "@/lib/fetcher";


export default function HubDashboard() {
  /* Fetch Data */
  const { data, error }: any = useSWR('/api/v2/tribe_manager/find', fetcher)

  if (error) return <Layout><div className="p-5 text-xl text-white">An error occured while loading data!</div></Layout>
  if (!data) return <Layout><div className="p-5 text-xl text-white">Loading...</div></Layout>

  return (
      <>
        <Head>
          <title>Bloody ARK Hub</title>
        </Head>
        <Layout>
        <div>
  <div className="p-4 bg-white dark:bg-bgray-secondary dark:border-gray-700 items-center justify-between border-b border-gray-200 flex">
    <div className="mb-1 w-full">
      <div className="mb-4">
        <nav className="mb-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center dark:text-gray-300">
              <Link href="#" className="dark:text-gray-100 text-gray-700 hover:text-gray-900 inline-flex items-center">
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                  </path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center dark:text-gray-300">
                <svg className="w-6 h-6 text-gray-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 dark:text-gray-400 ml-1 md:ml-2 font-medium" aria-current="page">Tribe Management</span>
              </div>
            </li>
            <li>
              <div className="flex items-center dark:text-gray-300">
                <svg className="w-6 h-6 text-gray-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 dark:text-gray-400 ml-1 md:ml-2 font-medium" aria-current="page">Find Tribes</span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="sm:flex mt-4">
          <div className="hidden sm:flex items-center sm:divide-x mb-3 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">Tribe Finder</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <Link href="/hub/tribe_manager" data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
              <i className="fa-solid fa-cog mr-2" />
              Tribe Manager
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="pb-12 px-16 mt-10">

  {data?.tribes?.map((tribe: any) => {
    return (
    <div key={tribe?.tribename} className="px-4 bg-white w-full rounded-lg shadow-md sm:p-8 dark:bg-bgray-secondary mb-5">
      <div className="flow-root w-full">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-2">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img className="w-[100px] h-[100px] rounded-lg" src={`https://ui-avatars.com/api/?name=${tribe?.tribename}&color=9ca3af&background=272a35`} alt="Neil image" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-medium text-gray-900 truncate dark:text-white">
                  {tribe?.tribename}
                </p>
                <p className="text-md text-gray-500 truncate dark:text-gray-400 py-1">
                  <i className="fa-solid fa-earth-americas" /> {tribe?.map} | <span> Owner : {tribe?.ownername} <br /> Created At : {moment(tribe?.creation_date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                </p>
              </div>
              <a href={`/api/hub/tribe_manager/request_join_tribe?tribe_id=${tribe?.tribeid}`} className="hidden inline-flex bg-bred-2 rounded-full py-1 px-4 items-center text-base font-bold text-gray-100 dark:text-white">
                Request to Join
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    )})}


  </div>
  <div className="text-gray-700 px-4 py-3 mt-10 w-full hidden" role="alert">
    <div className="w-full">
      <div className="my-auto flex justify-center mb-5"><i className="fa-solid fa-triangle-exclamation text-5xl text-bred-2" /></div>
      <div>
        <p className="font-bold text-2xl text-center dark:text-gray-100">Something went wrong on our end!</p>
        <p className="text-lg text-gray-500 mt-2 text-center">
          We&apos;re looking to resolve this as soon as we can.<br />
        </p>
      </div>
    </div>
  </div>
</div>

                </Layout>
      </>
    )
}
