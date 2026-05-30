import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

const homesCollection =
  collection(db, "homes");

// =========================
// GENERATE CODE
// =========================

const generateHomeCode =
  () => {

    const random =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `HAVEN-${random}`;
  };

// =========================
// CREATE HOME
// =========================

export const createHome =
  async (name) => {

    const homeCode =
      generateHomeCode();

    const docRef =
      await addDoc(
        homesCollection,
        {
          name,
          code: homeCode,
          createdAt:
            new Date(),
        }
      );

    return {
      id: docRef.id,
      code: homeCode,
    };
  };

// =========================
// FIND HOME BY CODE
// =========================

export const getHomeByCode =
  async (code) => {

    const q = query(
      homesCollection,
      where(
        "code",
        "==",
        code
      )
    );

    const snapshot =
      await getDocs(q);

    if (snapshot.empty)
      return null;

    return {
      id:
        snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
  };