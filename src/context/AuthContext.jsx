import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [profile,
    setProfile,
  ] = useState(null);

  const [loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          currentUser
        ) => {

          try {

            // =========================
            // NO USER
            // =========================

            if (
              !currentUser
            ) {

              setUser(null);

              setProfile(null);

              setLoading(false);

              return;
            }

            // =========================
            // USER EXISTS
            // =========================

            setUser(
              currentUser
            );

            // =========================
            // GET PROFILE
            // =========================

            const userRef =
              doc(
                db,
                "users",
                currentUser.uid
              );

            const userSnap =
              await getDoc(
                userRef
              );

            if (
              userSnap.exists()
            ) {

              setProfile(
                userSnap.data()
              );

            } else {

              console.warn(
                "PROFILE NOT FOUND"
              );

              setProfile(
                null
              );
            }

          } catch (error) {

            console.error(
              "AUTH ERROR:",
              error
            );

          } finally {

            setLoading(false);
          }
        }
      );

    return () =>
      unsubscribe();

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const logout =
    async () => {

      await signOut(auth);

      setUser(null);

      setProfile(null);
    };

  // =========================
  // GLOBAL LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-100 to-indigo-100">

        <div className="text-center">

          <div className="text-6xl animate-bounce mb-5">
            🏡
          </div>

          <h2 className="text-2xl font-bold text-slate-700">
            Cargando Haven...
          </h2>

        </div>

      </div>
    );
  }

  return (

    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}