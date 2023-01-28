import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../store/reducers/asyncReducer";
import { onSnapshot } from "@firebase/firestore";
import { dataFromSnapshot } from "../services/firestoreServices";

export default function useFirestoreCollection({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = onSnapshot(
      query(),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError(error))
    );
    return () => {
      unsubscribe();
    };
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps
}
