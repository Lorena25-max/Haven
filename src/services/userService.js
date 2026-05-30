import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

// =========================
// CREATE USER PROFILE
// =========================

export const createUserProfile =
  async (
    uid,
    data
  ) => {

    await setDoc(
      doc(db, "users", uid),
      data
    );
  };

// =========================
// GET USER PROFILE
// =========================

export const getUserProfile =
  async (uid) => {

    const userRef =
      doc(db, "users", uid);

    const userSnap =
      await getDoc(userRef);

    if (
      userSnap.exists()
    ) {

      return userSnap.data();
    }

    return null;
  };

// =========================
// VALIDATE HOME ID
// =========================

export const validateHomeId =
  async (homeId) => {

    const usersRef =
      collection(
        db,
        "users"
      );

    const q = query(
      usersRef,

      where(
        "homeId",
        "==",
        homeId
      )
    );

    const snapshot =
      await getDocs(q);

    return !snapshot.empty;
  };

  // =========================
// SUBSCRIBE HOME MEMBERS
// =========================

import {
  onSnapshot,
} from "firebase/firestore";

export const subscribeToHomeMembers =
  (
    homeId,
    callback
  ) => {

    const usersRef =
      collection(
        db,
        "users"
      );

    const q = query(
      usersRef,

      where(
        "homeId",
        "==",
        homeId
      )
    );

    return onSnapshot(
      q,
      (snapshot) => {

        const members =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        callback(members);
      }
    );
  };