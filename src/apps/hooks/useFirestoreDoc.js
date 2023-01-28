import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../store/reducers/asyncReducer";
import { onSnapshot } from "@firebase/firestore";
import { dataFromSnapshot } from "../services/firestoreServices";

export default function useFirestoreDoc({
  query,
  data,
  deps,
  shouldExecute = true,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) return;
    dispatch(asyncActionStart());
    const unsubscribe = onSnapshot(
      query(),
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: "not-found",
              message: "Couldn't find document",
            })
          );
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError(error))
    );
    return () => {
      unsubscribe();
    };
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps
}