import Navbar from './navbar'
import HomeHeader from './headers/homeHeader'
import useSWR from 'swr'
  

export default function Layout({ children }: any) {
    return (
    <>
      <main className="bg-bgray-bg">{children}</main>
    </>
  )
}