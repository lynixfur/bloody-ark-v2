import Navbar from './navbar'
import HomeHeader from './headers/homeHeader'
import useSWR from 'swr'
import { useEffect, useState } from 'react'


export default function Layout({ children }: any) {
  return (
    <>
      <main className="bg-bgray-bg">
        {children}
      </main>
    </>
  )
}