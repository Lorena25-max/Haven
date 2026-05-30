import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

const financeCollection =
  collection(
    db,
    "finances"
  );

// =========================
// CREATE
// =========================

export const createFinance =
  async (finance) => {

    return await addDoc(
      financeCollection,
      finance
    );
  };

// =========================
// REALTIME
// =========================

export const subscribeToFinances =
  (
    homeId,
    callback
  ) => {

    const q = query(
      financeCollection,

      where(
        "homeId",
        "==",
        homeId
      ),

      orderBy(
        "createdAt",
        "desc"
      )
    );

    return onSnapshot(
      q,
      (snapshot) => {

        const finances =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),
            })
          );

        callback(finances);
      }
    );
  };

// =========================
// DELETE
// =========================

export const deleteFinance =
  async (id) => {

    const financeDoc =
      doc(
        db,
        "finances",
        id
      );

    return await deleteDoc(
      financeDoc
    );
  };