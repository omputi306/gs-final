import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../apps/hooks/useFirestoreCollection";
import { getAllUserFromFirestore } from "../../../apps/services/firestoreServices";
import { listenToAllUser } from "../../../apps/store/actions/profileUsersAction";
import TabelUser from "../Users/components/TabelUser/TabelUser";

export default function ListUsers() {
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getAllUserFromFirestore(),
    data: (users) => dispatch(listenToAllUser(users)),
    deps: [dispatch],
  });
  return (
    <section>
      <div className="main">
        <h1>List User</h1>
        <TabelUser listUser={listUser} loading={loading} />
      </div>
    </section>
  );
}
