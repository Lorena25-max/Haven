import {
  collection,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

// =========================
// COLLECTION
// =========================

const tasksCollection =
  collection(db, "tasks");

// =========================
// CREATE TASK
// =========================

export const createTask =
  async (task) => {

    return await addDoc(
      tasksCollection,
      task
    );
  };

// =========================
// REALTIME TASKS
// =========================

export const subscribeToTasks =
  (
    homeId,
    callback
  ) => {

    const q = query(
      tasksCollection,

      where(
        "homeId",
        "==",
        homeId
      ),

    );

    return onSnapshot(
      q,

      (snapshot) => {

        const tasks =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        callback(tasks);
      },

      (error) => {

        console.error(
          "REALTIME ERROR:",
          error
        );
      }
    );
  };

// =========================
// UPDATE TASK
// =========================

export const updateTask =
  async (
    id,
    updatedTask
  ) => {

    const taskDoc =
      doc(
        db,
        "tasks",
        id
      );

    return await updateDoc(
      taskDoc,
      updatedTask
    );
  };

// =========================
// DELETE TASK
// =========================

export const deleteTask =
  async (id) => {

    const taskDoc =
      doc(
        db,
        "tasks",
        id
      );

    return await deleteDoc(
      taskDoc
    );
  };