import useSWR from "swr";
import Utils from "./utils";

export default function useUser() {
  const { data, mutate, error } = useSWR("/users/@me", Utils.fetchUser, {
    shouldRetryOnError: (error) => {
      if (error.code !== 403) {
        return true;
      }
      return false;
    },
  });

  const loading = !data && !error;
  const loggedOut = error && error.code === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
    error,
  };
}
