import useSWR from "swr";
import Swal from "sweetalert2/src/sweetalert2.js";
import Utils from "./utils";
import { useRouter } from "next/navigation";

export default function useUser() {
  const router = useRouter();
  const { data, mutate, error } = useSWR("/users/@me", Utils.fetchUser, {
    shouldRetryOnError: (error) => {
      if (error.code !== 403) {
        return true;
      }
      return false;
    },
    revalidateOnFocus: false,
  });

  const loading = !data && !error;
  const loggedOut = error && error.code === 403;

  const logOut = async () => {
    await Utils.logUserOut();
    mutate(null, {});
    Swal.fire({
      position: "center",
      icon: "success",
      showConfirmButton: false,
      title: "Logged Out",
      timer: 1500,
    });
  };

  return {
    loading,
    logOut,
    loggedOut,
    user: data,
    mutate,
    error,
  };
}
