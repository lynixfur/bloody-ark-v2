import Head from "next/head";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import Layout from "../../../components/HubLayout";
import useSWR from 'swr';
import Link from "next/link";
import Error from "@/components/errors/Error"
import TribePlayer from "@/components/TribePlayer";
import TribeMgrPlayerFinder from "@/components/TribeMgrPlayerFinder";

let fetcher = async () => {
  const response = await fetch(`/api/v2/tribe_manager`);
  const data = await response.json()
  return data
}

export default function HubDashboard() {
  /* Fetch Data */
  const { data, error } = useSWR('find', fetcher)

  if (error) return <Layout><Error msg={"Failed to load Tribe Manager"} status={error.toString()} /></Layout>
  if (!data) return <Layout><div className="p-5 text-xl text-white">Loading...</div></Layout>

  return (
    <>
      <Head>
        <title>Bloody ARK Hub</title>
      </Head>
      <Layout>
        <div className="w-full">
          {data?.tribe_data?.CreationDate ? (
            <>
              <div>
                <div className="p-4 bg-white dark:bg-bgray-secondary dark:border-gray-700 items-center justify-between border-b border-gray-200 flex">
                  <div className="mb-1 w-full">
                    <div className="mb-4">
                      <nav className="mb-5" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
                          <li className="inline-flex items-center dark:text-gray-300">
                            <a
                              href="#"
                              className="dark:text-gray-100 text-gray-700 hover:text-gray-900 inline-flex items-center"
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
                            </a>
                          </li>
                          <li>
                            <div className="flex items-center dark:text-gray-300">
                              <svg
                                className="w-6 h-6 text-gray-40"
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
                                className="text-gray-400 dark:text-gray-400 ml-1 md:ml-2 font-medium"
                                aria-current="page"
                              >
                                Tribe Management
                              </span>
                            </div>
                          </li>
                        </ol>
                      </nav>
                      <div className="sm:flex mt-4">
                        <div className="hidden sm:flex items-center sm:divide-x mb-3 sm:mb-0">
                          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">
                            Tribe Mangement
                          </h1>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                          <Link
                            href="/hub/tribe_manager/find"
                            data-modal-toggle="add-user-modal"
                            className="w-1/2 text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                          >
                            <i className="fa-solid fa-magnifying-glass mr-2" />
                            Tribe Finder
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*
      ! ------------------------------------------------------------
      ! Profile banner and avatar
      ! ------------------------------------------------------------
      !*/}
                <div className="w-full">
                  <div
                    className="w-full h-72 bg-no-repeat bg-cover "
                    style={{
                      backgroundImage:
                        "url(https://cdn.discordapp.com/attachments/885607142051184700/1073175247433498675/242ab4_f5ea2042db2a4159a20b9a4a1d9e0427mv2.png)",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="flex justify-center w-full">
                    <div className="absolute -mt-20">
                      <img
                        src={
                          "https://ui-avatars.com/api/?name=" +
                          data?.tribe_data?.TribeName +
                          "&color=9ca3af&background=272a35"
                        }
                        className="h-40 w-40 rounded-full shadow-md "
                      />
                    </div>
                  </div>
                </div>
                {/*
          ! ------------------------------------------------------------
          ! Profile general information
          ! ------------------------------------------------------------
          !*/}
                <div className="bg-gray-100 dark:bg-bgray-dropdown p-5 pt-20 flex flex-col justify-center text-center mb-10">
                  <h2 className="font-semibold text-3xl dark:text-gray-200 leading-tight py-1 mt-2">
                    {data?.tribe_data?.TribeName}
                  </h2>
                  <p
                    className="font-semibold text-md dark:text-gray-400 leading-tight mt-1"
                    v-if="$page.props.player_data.isInTribe"
                  >
                    Owned by {data?.tribe_data?.OwnerName}
                  </p>
                  <div className="text-sm mt-2 dark:text-gray-200 flex justify-center">
                    <div className="flex flex-row space-x-2 items-center">
                      <p
                        className="font-semibold text-md dark:text-gray-400 leading-tight"
                        v-if="$page.props.player_data.isInTribe"
                      >
                        {data?.tribe_data?.IsListed == 0 && <><i className="fa-solid fa-lock" /> Private</>}
                        {data?.tribe_data?.IsListed == 1 && <><i className="fa-solid fa-unlock" /> Public</>}
                      </p>
                      <div className="bg-gray-700 dark:bg-blue-200 rounded-full h-1 w-1" />
                      <p
                        className="font-semibold text-md dark:text-gray-400 leading-tight"
                        v-if="$page.props.player_data.isInTribe"
                      >
                        <i className="fa-solid fa-users" />{" "}
                        {data?.tribe_data?.Members.length} Members
                      </p>
                    </div>
                  </div>
                  {data?.tribe_data?.IsListed ? (
                    <div className="flex justify-center my-3">
                      <Link
                        href="/api/v2/tribe_manager/set_tribe_requests?value=0"
                        data-modal-toggle="add-user-modal"
                        className="w-1/2 text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                      >
                        <i className="fa-solid fa-lock mr-2" />
                        Close Tribe Request
                      </Link>
                    </div>
                  ) : (
                    <div className="flex justify-center my-3">
                      <Link
                        href="/api/v2/tribe_manager/set_tribe_requests?value=1"
                        data-modal-toggle="add-user-modal"
                        className="w-1/2 text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                      >
                        <i className="fa-solid fa-unlock mr-2" />
                        Open Tribe Request {JSON.stringify(data?.tribe)}
                      </Link>
                    </div>
                  )}
                </div>
                <div className="pb-12 px-16">
                  <div>
                    <p className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                      Tribe Manager Commands
                    </p>
                    <p className="text-white">
                      /tribe - Shows all commands for Tribe Request<br/>
                      /tribe openrequest - Opens a join request for you tribe<br/>
                      /tribe list - Shows all tribes with open requests<br/>
                      /tribe info PlayerName or PlayerID - Shows player server info<br/>
                      /tribe requests TribeName or TribeID - Requests to join a tribe<br/>
                      /tribe invite PlayerName or PlayerID - invites a player to join your tribe<br/>
                      /tribe showrequests - Shows join requests to join your tribe<br/>
                      /tribe acceptreq PlayerName or PlayerID - Accept join request (Only tribe owner or admins)<br/>
                      /tribe showinvites - Shows all invites for your tribe<br/>
                      /tribe closerequest - Closes join request for your tribe
                    </p>
                    <p className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                      Invite Player
                    </p>
                    <TribeMgrPlayerFinder />
                    <div className="flex hidden">
                      <form
                        method="GET"
                        action="/api/hub/tribe_manager/invite_player"
                        className="flex w-full"
                      >
                        <input
                          type="text"
                          name="player"
                          id="player"
                          className="bg-bgray-secondary border-gray-600 text-gray-900 sm:text-sm rounded-l-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                          placeholder="Player Name"
                        />
                        <button
                          type="submit"
                          data-modal-toggle="add-user-modal"
                          className=" text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold inline-flex items-center justify-center rounded-r-lg text-sm px-3 py-2 text-center"
                        >
                          <i className="fa-solid fa-paper-plane mr-2" />
                          Invite
                        </button>
                      </form>
                    </div>
                    <p className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 mt-10">
                      Tribe Members
                    </p>
                    <div className="mb-10">
                      <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                          <tbody>
                            <tr
                              tabIndex={0}
                              className="focus:outline-none h-12 border-t border-b-[2px] border-bgray-bg bg-bgray-overlay"
                            >
                              <td>
                                <div className="flex items-center pl-5">
                                  <p className="text-base leading-none text-gray-50 font-bold mr-2">
                                    Player Name
                                  </p>
                                </div>
                              </td>
                              <td className="pl-5">
                                <div className="flex items-center">
                                  <p className="leading-none text-gray-50 ml-2  font-bold">
                                    Group
                                  </p>
                                </div>
                              </td>
                              <td className="pl-5">
                                <div className="flex items-center">
                                  <p className="leading-none text-gray-50 ml-2  font-bold">
                                    Quick Actions
                                  </p>
                                </div>
                              </td>
                            </tr>
                            {data?.tribe_data?.Members?.map((member: any) => {
                              return (
                                <TribePlayer key={member} member={member} />
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="text-gray-700 px-4 py-3 mt-10 w-full"
                role="alert"
              >
                <div className="w-full">
                  <div className="my-auto flex justify-center mb-5">
                    <i className="fa-solid fa-triangle-exclamation text-5xl text-bred-2" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-center dark:text-gray-100">
                      You do not have a tribe!
                    </p>
                    <p className="text-lg text-gray-500 mt-2 text-center">
                      To view your tribe data you must first join a tribe.
                    </p>
                  </div>
                  <div className="my-auto flex justify-center mt-5">
                    <Link
                      href="/hub/tribe_manager/find"
                      className="text-white bg-bred-2 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-bold rounded-lg text-sm px-3 py-2"
                    >
                      <i className="fa-solid fa-magnifying-glass mr-2" />
                      Tribe Finder
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}
