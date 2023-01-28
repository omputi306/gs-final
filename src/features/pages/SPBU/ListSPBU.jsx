import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../apps/hooks/useFirestoreCollection";
import { getAllSpbuFromFirestore, getAllUserFromFirestore } from "../../../apps/services/firestoreServices";
import { listenToAllSPBU } from "../../../apps/store/actions/listSpbuAction";
import { listenToAllUser } from "../../../apps/store/actions/profileUsersAction";
import TabelSPBU from "./TabelSPBU/TabelSPBU";

export default function ListSPBU() {
  const dispatch = useDispatch();
  const { spbu } = useSelector((state) => state.listSPBU)
  const {listUser} = useSelector((state) => state.users)
  const { loading } = useSelector((state) => state.async)

  useFirestoreCollection({
    query: () => getAllSpbuFromFirestore(),
    data: (spbu) => dispatch(listenToAllSPBU(spbu)),
    deps: [dispatch],
  });

  useFirestoreCollection({
    query: () => getAllUserFromFirestore(),
    data: (users) => dispatch(listenToAllUser(users)),
    deps: [dispatch]
  })

  return (
    <section>
      <div className="main">
        <h1>List SPBU</h1>
        <TabelSPBU data={spbu} listUser={listUser} loading={loading} />
      </div>
    </section>
  );
}
