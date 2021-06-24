import { useContext } from "react";
import { AuthContext } from "../components/navigation/AuthProvider";
import { useDocument } from "@nandorojo/swr-firestore";
import firebase from 'firebase/app';

export const useUser = (uid) => {
    const { user: ctxUser } = useContext(AuthContext);
    const { data, error, update, mutate} = useDocument(`Users/${uid}`);
    console.log("potato: ", uid)
    return {
        user: data,
        userMeta: {
          error,
          isLoading: !error && !data,
        },
  };
};