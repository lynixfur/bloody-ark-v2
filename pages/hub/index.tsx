import Head from "next/head";
import axios from 'axios';
import moment from 'moment';
import Layout from '../../components/HubLayout'
import useUser from "../../lib/hooks/useUser";
import useSWR from 'swr'
import Link from "next/link";
import Error from "@/components/errors/Error"
import Loader from "@/components/Loader";
import ServerCardNew from "@/components/ServerCardNew";
import { useState } from "react";
import { Transition } from '@headlessui/react'

/* Animations */
import VisibilitySensor from "react-visibility-sensor";
import { useSpring, animated } from "react-spring";
import Notification from "@/components/Notification";
import MiniTribeMgr from "@/components/MiniTribeMgr";

let fetcher = async () => {
  const response = await fetch(`/api/hub/home`);
  const data = await response.json()
  return data
}

const FadeInDirection = ({ delay, isVisible, children }: any) => {
  const props_test = useSpring({
    delay: delay,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(50px)",
  });
  return <animated.div style={props_test}>{children}</animated.div>;
};

export const FadeInContainer = ({ children, delay }: any) => {
  const [isVisible, setVisibility]: any = useState(false);

  const onChange = (visiblity: any) => {
    visiblity && setVisibility(visiblity);
  };

  return (
    <VisibilitySensor partialVisibility onChange={onChange}>
      <FadeInDirection isVisible={isVisible} delay={delay}>{children}</FadeInDirection>
    </VisibilitySensor>
  );
};

export default function HubDashboard() {
  /* User */
  const { user } = useUser();
  const [patchnotes, setPatchnotes] = useState(false);

  /* Fetch Data */
  const { data, error } = useSWR('find', fetcher)

  if (error) return <Layout><Error msg={"Failed to load Tribe Manager \n" + error.toString()} /></Layout>
  if (!data) return <Layout><Loader/></Layout>

  return (
    <>
      <Head>
        <title>Bloody ARK Hub</title>
      </Head>
      <Layout>

        <Transition
          show={patchnotes}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"><div className="relative z-50 w-full" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-bgray-bg bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full w-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                {/* Main modal */}
                <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="relative transform z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                  <div className="relative w-full h-full max-w-2xl md:h-auto">
                    {/* Modal content */}
                    <div className="relative rounded-lg shadow bg-bgray-bg border border-bgray-border">
                      {/* Modal header */}
                      <div className="flex items-start justify-between p-4 border-b rounded-t border-bgray-border">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          What&apos;s New? A Wild Update! 🐺
                        </h3>
                        <button onClick={() => { setPatchnotes(false) }} type="button" className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-bgray-secondary hover:text-white transition-colors" data-modal-hide="staticModal">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                      {/* Modal body */}
                      <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-left">
                          It&apos;s a new year and we have a Wild, Wild, Wild Update for the Bloody Hub! We&apos;re also getting ready for Season 5! We&apos;ve decided to include a bunch of new features to the Bloody Hub to make your experience even wilder! Let&apos;s check what&apos;s new!
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-left">
                          <ul className="list-disc px-6">
                            <li>Quick Information & Redesigned Welcome Header</li>
                            <li>Added New Notification Section</li>
                            <li>Customizable Hub Home Layout</li>
                            <li>Quick Server Join</li>
                            <li>Server Viewer</li>
                            <li>Web Shop</li>
                            <li>Web Roulette</li>
                            <li>Redesigned Tribe Manager</li>
                            <li>Tribe Recruitment Pages</li>
                            <li>Redesigned Leaderboards</li>
                            <li>Improved & Darken UI</li>
                            <li>And much more...</li>
                          </ul><br />
                          Break the rules of what you can do with The Bloody Hub...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div></Transition>

        {/* Content */}
        <div>
          <div className="w-full">
            <div className="h-full w-full" style={{ background: 'url(https://cdn.discordapp.com/attachments/885607142051184700/1071915271515807835/website_bg-min.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
              <div className="w-full h-full bg-black bg-opacity-80">
                <div className="flex h-full px-3 py-4 sm:p-5 md:p-0">
                  <div className="my-auto flex justify-center w-full">
                    <div>
                      <div className="container flex flex-col items-center py-5 sm:py-14">
                        <div className="w-full mt-5 justify-center items-center flex-col mb-5 sm:mb-10">
                          <div className="flex justify-center"><img
                            src={user?.avatarUrl}
                            alt="image"
                            className="h-24 w-24 rounded-full mb-3"
                          /></div>
                          <h1 className="px-4 text-4xl lg:text-5xl xl:text-6xl text-center text-gray-50 font-black leading-7 md:leading-10">
                            Welcome, {user?.username}!
                          </h1><br />
                          <p className="px-4 text-gray-200 text-md font-semibold cursor-pointer text-center">
                            Welcome to your home page of Bloody Hub, you can manage
                            your tribe, dinosaurs and more here!
                          </p>
                          <div className="flex justify-center">
                            <FadeInContainer delay={500}>
                              <div className="flex-warp sm:flex space-x-0 sm:space-x-3 space-y-3 sm:space-y-0 items-center justify-center mt-5">

                                <div className="h-24 w-[170px] bg-bgray-secondary bg-opacity-90 border-bgray-border border rounded-2xl py-3">
                                  <p className="text-center text-4xl text-gray-400"><i className="fa-solid fa-clock"></i></p>
                                  <p className="text-center text-gray-400 mt-2">{data?.quick_info?.time ? (parseInt(data?.quick_info?.time) / 60).toFixed(2) : 0}  hrs</p>
                                </div>


                                <div className="h-24 w-[170px] bg-bgray-secondary bg-opacity-90 border-bgray-border border rounded-2xl py-3">
                                  <p className="text-center text-4xl text-gray-400"><i className="fa-solid fa-user"></i></p>
                                  <p className="text-center text-gray-400 mt-2">{data?.quick_info?.players ? data?.quick_info?.players : 0} Players Online</p>
                                </div>


                                <div className="h-24 w-[170px] bg-bgray-secondary bg-opacity-90 border-bgray-border border rounded-2xl py-3">
                                  <p className="text-center text-4xl text-gray-400"><i className="fa-solid fa-khanda"></i></p>
                                  <p className="text-center text-gray-400 mt-2">{data?.quick_info?.kills ? data?.quick_info?.kills : 0} Kills</p>
                                </div>

                              </div>
                            </FadeInContainer>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 bg-blue-600 hidden" onClick={() => setPatchnotes(true)}><p className="text-base text-white font-bold text-center"><i className="fa-solid fa-star"></i> Welcome to the 2023 UI Update Preview! We hope you will enjoy all the new features and additions!</p></div>
          <div className="py-4 bg-red-600 hidden"><p className="text-base text-white font-bold text-center"><i className="fa-solid fa-compass fa-spin"></i> Wipe Time! We&apos;re currently preparing for the next season of Bloody ARK, Season 5!</p></div>

          <div className="hub_page px-3 sm:px-20 py-10">
            {/* Important Notifications + Dismiss */}
            {data?.notifications?.join_requests?.map((request: any) => {
              return (
                <Notification key={request} request_data={request} invite_data={null} />
              )
            })}

            {data?.notifications?.invites?.map((invite: any) => {
              return (
                <Notification key={invite} is_invite={true} request_data={null} invite_data={invite} />
              )
            })}



            <h1 className="text-white text-2xl font-bold text-red-600 mb-5"><i className="fa-solid fa-exclamation-triangle animate-pulse"></i> This hub is not for ARK: Survival Ascended only ARK: Survival Evolved!</h1>
            {/* Ark Asceneded Button */}
            <div className="flex space-x-3"><Link href="https://bloody.gg/hub" className="block py-2 pr-4 pl-3 text-white bg-red-600 p-4 font-bold transition-colors w-[300px] rounded-md mb-10"><i className="fas fa-arrow-right mr-2"></i>Visit Bloody Hub Ascended</Link>
            <Link href="https://bloody.gg/" className="block py-2 pr-4 pl-3 text-white bg-gray-800 p-4 font-bold transition-colors w-[300px] rounded-md mb-10"><i className="fas fa-arrow-right mr-2"></i>Go back to Website</Link>
            </div>
            {/* Hub Layout */}

            <h1 className="text-white text-2xl font-bold">Survivor Information</h1>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-bgray-secondary shadow rounded-lg border-bgray-border border">
                <div>
                  <div className="w-full  flex flex-wrap items-center  justify-center  rounded-t-md">
                    <div className="container w-full  transform   duration-200 easy-in-out rounded-t-md">
                      <div className=" h-32 overflow-hidden rounded-t-md">
                        <img
                          className="w-full rounded-t-md"
                          src="/auth2.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center px-5  -mt-12">
                        <img
                          className="h-32 w-32 bg-white dark:bg-bgray-secondary p-2 rounded-full object-cover"
                          src={user?.avatarUrl}
                          alt={user?.username}
                        />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-gray-800 dark:text-gray-50 text-3xl mt-1 font-bold text-center">
                    {user?.username}
                  </h2>
                  <div className="flex justify-center my-1 hidden">
                    <p className="text-gray-600 dark:text-gray-50 mt-2 bg-gray-200 dark:bg-bgray-overlay rounded-full py-1 px-4 text-sm text-center font-bold">
                      <i className="fas fa-code" /> Bloody ARK Developer
                    </p>
                  </div>
                  <hr className="mx-5 mt-5 dark:border-gray-600" />
                  <div className="p-5 mb-10">
                    <h1 className="text-2xl font-bold dark:text-gray-50">
                      <i className="fa-solid fa-vector-square"></i> Your Survivor
                    </h1>
                    <p className="text-md text-gray-500 dark:text-gray-200 sm:mb-0 mb-5 mt-5">
                      Survivor Name : {data?.player?.username}
                    </p>
                    <p className="text-md text-gray-500 dark:text-gray-200  sm:mb-0 mb-5 mt-1">
                      Player ID : {data?.player?.playerId}
                    </p>
                    <p className="text-md text-gray-500 dark:text-gray-200  sm:mb-0 mb-5 mt-1">
                      Steam ID : {user?.userId}
                    </p>
                    <br />
                    <hr className="dark:border-gray-600 dark:text-gray-200 " />
                    <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2 mt-5">
                      <i className="fa-solid fa-coins text-gray-500 dark:text-gray-200  mr-2" />
                      Bloody Points : {data?.extra_data?.points ? data?.extra_data?.points : 0}
                    </p>
                    <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-5 mb-5">
                      <i className="fa-solid fa-coins text-gray-500 dark:text-gray-200  mr-2" />
                      Total Points Spent : {data?.extra_data?.points_spent ? data?.extra_data?.points_spent : 0}
                    </p>
                    <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2">
                      <i className="fa-solid fa-ticket text-gray-500 dark:text-gray-200  mr-2" />
                      Dino Color Tokens : {data?.extra_data?.dino_tokens ? data?.extra_data?.dino_tokens : 0}
                    </p>
                    <VisibilitySensor onChange={() => { console.log("Visible Tokens!") }}>
                      <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2">
                        <i className="fa-solid fa-ticket text-gray-500 dark:text-gray-200  mr-2" />
                        Renamer Tokens : {data?.extra_data?.player_rename_tokens ? data?.extra_data?.player_rename_tokens : 0}
                      </p>
                    </VisibilitySensor>
                    <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2 mt-2">
                      <i className="fa-solid fa-shield-halved text-gray-500 dark:text-gray-200 mr-2" />
                      {data?.extra_data?.pvp_status ? "PVPVE Status : PvP" : "PVPVE Status : PvE"}
                    </p>
                    <p className="text-md font-bold text-gray-500 dark:text-gray-200  sm:mb-0 mb-2 mt-2">
                      <i className="fa-solid fa-object-ungroup text-gray-500 dark:text-gray-200 mr-2" />
                      Groups : {data?.extra_data?.groups}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-bgray-secondary shadow rounded-lg relative border-bgray-border border">
                <div className="absolute bottom-0 inset-x-0 rounded-b-lg overflow-hidden z-10">
                  <canvas id="playersChart" className="h-10" />
                </div>
                <div className="p-5 mb-10">
                  <h1 className="text-2xl font-bold dark:text-gray-50">
                    <i className="fa-solid fa-users"></i> Tribe Information
                  </h1>

                  {data?.tribe?.tribeId

                    ?
                    <MiniTribeMgr />
                    :
                    <div
                      className="text-gray-100 px-4 py-3  mt-10"
                      role="alert"
                    >
                      <div>
                        <div className="my-auto flex justify-center mb-5">
                          <i className="fa-solid fa-users text-5xl text-bred-2" />
                        </div>
                        <div>
                          <p className="font-bold text-2xl text-center text-gray-800 dark:text-gray-100">
                            You&apos;re not in a tribe!
                          </p>
                          <p className="text-lg text-gray-400 mt-2 text-center">
                            Sorry, but our shadowmanes can&apos;t display your
                            tribe if you&apos;re not in a tribe!
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="bg-white dark:bg-bgray-secondary shadow rounded-lg relative border-bgray-border border hidden">
                <div className="absolute bottom-0 inset-x-0 rounded-b-lg overflow-hidden z-10">
                  <canvas id="playersChart" className="h-10" />
                </div>

                <div className="p-5 mb-10">
                  <h1 className="text-2xl font-bold dark:text-gray-50">
                    <i className="fa-solid fa-gear"></i> Notification Actions
                  </h1>
                  <Link href="/api/hub/delete_requests" data-modal-toggle="add-user-modal" className="w-full text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center mt-3">Delete All Requests</Link>
                  <Link href="/api/hub/delete_invites" data-modal-toggle="add-user-modal" className="w-full text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center mt-3 mb-5">Clear Notifications</Link>

                  <h1 className="text-2xl font-bold dark:text-gray-50">
                    <i className="fa-solid fa-inbox"></i> Notifications
                  </h1>
                  {data?.notifications?.invites != null && data?.notifications?.join_requests != null ? <></>
                    : <p className="text-md mt-1 text-gray-500 dark:text-gray-300  sm:mb-0 mb-5 hidden">
                      You currently have no notifications.
                    </p>}

                  {data?.notifications?.invites?.map((invite: any) => {
                    return (
                      <div key={invite.tribe.tribename} className="bg-gray-200 dark:bg-bgray-overlay shadow px-4 py-2 rounded-lg mt-5">
                        <h1 className="text-xl font-bold dark:text-gray-50 mb-2">
                          Tribe Invite from {invite.tribe.tribename}
                        </h1>
                        <p className="dark:text-gray-200">
                          You have been invited to the tribe of{" "}
                          <strong>
                            {invite.tribe.tribename}
                          </strong>{" "}
                          on the map of
                          {" "}<strong>
                            {invite.tribe.map}
                          </strong>{" "}
                          . Please type in-game
                          {" "}<strong>
                            /tribe acceptinvite &apos;{invite.tribe.tribename}&apos;
                          </strong>{" "}
                          to join.
                        </p>
                        <Link
                          href={`/api/hub/delete_invites`}
                          data-modal-toggle="add-user-modal"
                          className="mt-5 w-1/2 text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                        >
                          <i className="fa-solid fa-times mr-2" />
                          Reject Request
                        </Link>
                      </div>)
                  })}


                  {data?.notifications?.join_requests?.map((request: any) => {
                    return (
                      <div key={request?.survivor?.playername} className="bg-gray-200 dark:bg-bgray-overlay shadow px-4 py-2 rounded-lg mt-5">
                        <h1 className="text-xl font-bold dark:text-gray-50 mb-2">
                          Join Request by{" "}
                          <strong>
                            {request?.survivor?.playername}
                          </strong>
                        </h1>
                        <p className="dark:text-gray-200">
                          A player named{" "}
                          <strong>
                            {request?.survivor?.playername}
                          </strong>{" "}
                          has requested to join your tribe. Please type in-game{" "}
                          <strong>
                            /tribe acceptreq &apos;{request?.survivor?.playername}&apos;
                          </strong>{" "}
                          to invite them.
                        </p>
                      </div>)
                  })}

                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white items-center justify-between border-b border-gray-200 hidden">
            <div className="mb-1 w-full">
              <div className="mb-4">
                <nav className="mb-5" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center">
                      <Link
                        href="#"
                        className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                      >
                        <svg
                          className="w-5 h-5 mr-2.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        Home
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <Link
                          href="#"
                          className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                        >
                          Users
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span
                          className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                          aria-current="page"
                        >
                          List
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  All users
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
