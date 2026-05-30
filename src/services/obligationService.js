import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

const obligationsCollection =
  collection(
    db,
    "obligations"
  );

// =========================
// CREATE
// =========================

export const createObligation =
  async (obligation) => {

    return await addDoc(
      obligationsCollection,
      obligation
    );
  };

// =========================
// REALTIME
// =========================

export const subscribeToObligations =
  (
    homeId,
    month,
    callback
  ) => {

    const q = query(
      obligationsCollection,

      where(
        "homeId",
        "==",
        homeId
      ),

      where(
        "month",
        "==",
        month
      )
    );

    return onSnapshot(
      q,
      (snapshot) => {

        const obligations =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),
            })
          );

        callback(
          obligations
        );
      }
    );
  };

// =========================
// UPDATE
// =========================

export const updateObligation =
  async (
    id,
    data
  ) => {

    const obligationDoc =
      doc(
        db,
        "obligations",
        id
      );

    return await updateDoc(
      obligationDoc,
      data
    );
  };

// =========================
// DELETE
// =========================

export const deleteObligation =
  async (id) => {

    const obligationDoc =
      doc(
        db,
        "obligations",
        id
      );

    return await deleteDoc(
      obligationDoc
    );
  };

  export const getObligationsByMonth =
  (
    homeId,
    month
  ) => {

    const q = query(

      obligationsCollection,

      where(
        "homeId",
        "==",
        homeId
      ),

      where(
        "month",
        "==",
        month
      )
    );

    return getDocs(q);
  };