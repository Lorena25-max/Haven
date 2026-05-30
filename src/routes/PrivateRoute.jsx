import {
  useContext,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

export default function PrivateRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useContext(
    AuthContext
  );

  // =========================
  // STILL LOADING
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

  // =========================
  // NOT LOGGED
  // =========================

  if (!user) {

    return (
      <Navigate to="/login" />
    );
  }

  return children;
}