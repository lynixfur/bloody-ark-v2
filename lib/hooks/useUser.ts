import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { User } from "../../types/User";
import fetcher from "../fetcher";

export default function useUser({ redirectTo = "" } = {}) {
  const { data, isLoading } = useSWR<{ message: User; success: boolean }>(
    `/api/auth/user`,
    fetcher
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || isLoading) return;

    // If redirectTo is set, redirect if the user was not found.
    if (redirectTo && !data?.success) {
      Router.push(redirectTo);
    }
  }, [data, isLoading, redirectTo]);

  let user = undefined;
  if (data && data.success) {
    user = data.message;
  }

  return { user };
}