import {
  getDocs,
} from "firebase/firestore";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

const budgetsCollection =
  collection(
    db,
    "budgets"
  );

// =========================
// CREATE
// =========================

export const createBudget =
  async (budget) => {

    return await addDoc(
      budgetsCollection,
      budget
    );
  };

// =========================
// REALTIME
// =========================

export const subscribeToBudgets =
  (
    homeId,
    month,
    callback
  ) => {

    const q = query(

      budgetsCollection,

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

        const budgets =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        callback(
          budgets
        );
      }
    );
  };

// =========================
// UPDATE
// =========================

export const updateBudget =
  async (
    id,
    data
  ) => {

    const budgetDoc =
      doc(
        db,
        "budgets",
        id
      );

    return await updateDoc(
      budgetDoc,
      data
    );
  };

  // =========================
// UPSERT
// =========================

export const saveBudget =
  async (

    homeId,

    month,

    data

  ) => {

    const q = query(

      budgetsCollection,

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

    const snapshot =
      await getDocs(q);

    if (
      snapshot.empty
    ) {

      return await addDoc(

        budgetsCollection,

        {

          homeId,

          month,

          ...data,
        }
      );
    }

    const existing =
      snapshot.docs[0];

    return await updateDoc(

      doc(
        db,
        "budgets",
        existing.id
      ),

      data
    );
  };

  import {
  deleteDoc,
} from "firebase/firestore";

export const deleteBudget =
  async (id) => {

    return await deleteDoc(
      doc(
        db,
        "budgets",
        id
      )
    );
  };