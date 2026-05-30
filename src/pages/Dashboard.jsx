import {
  useState,
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import Sidebar from "../components/Sidebar";

import TasksSection from "../sections/TasksSection";

import FinanceSection from "../sections/FinanceSection";

export default function Dashboard() {

  const {
    profile,
  } = useContext(AuthContext);

  const [
    activeTab,
    setActiveTab,
  ] = useState("inicio");

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-100">

      {/* SIDEBAR */}

      <Sidebar
        activeTab={
          activeTab
        }
        setActiveTab={
          setActiveTab
        }
      />

      {/* CONTENT */}

      <main className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}

        <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[2rem] p-8 shadow-2xl mb-8">

          <h1 className="text-4xl font-black bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
            Haven ✨
          </h1>

          <p className="text-slate-600 mt-3 text-lg">

            Bienvenida,
            <span className="font-bold text-fuchsia-600">
              {" "}
              {profile?.name}
            </span>

          </p>

          <div className="flex gap-4 flex-wrap mt-6">

            <div className="bg-white/70 px-5 py-3 rounded-2xl shadow text-sm font-semibold text-slate-700">
              🏡 Home ID:
              {" "}
              {profile?.homeId}
            </div>

            <div className="bg-emerald-100 text-emerald-700 px-5 py-3 rounded-2xl shadow text-sm font-semibold">
              Realtime activo
            </div>

          </div>

        </div>

        {/* INICIO */}

        {activeTab ===
          "inicio" && (

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-xl">

              <h2 className="text-2xl font-black text-slate-800">
                🙏 Devocional
              </h2>

              <p className="text-slate-500 mt-3">
                Espacio espiritual del hogar.
              </p>

            </div>

            <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-xl">

              <h2 className="text-2xl font-black text-slate-800">
                ✅ Tareas
              </h2>

              <p className="text-slate-500 mt-3">
                Organización y productividad familiar.
              </p>

            </div>

            <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-xl">

              <h2 className="text-2xl font-black text-slate-800">
                💰 Finanzas
              </h2>

              <p className="text-slate-500 mt-3">
                Control inteligente del hogar.
              </p>

            </div>

          </div>
        )}

        {/* DEVOCIONAL */}

        {activeTab ===
          "devocional" && (

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 shadow-2xl">

            <h2 className="text-3xl font-black text-slate-800">
              🙏 Devocional
            </h2>

            <p className="text-slate-500 mt-4">
              Próximamente:
              versículos, oración,
              gratitud y devocional compartido ✨
            </p>

          </div>
        )}

        {/* TASKS */}

        {activeTab ===
          "tareas" && (

          <TasksSection />

        )}

        {/* FINANCES */}

        {activeTab ===
          "finanzas" && (

          <FinanceSection />

        )}

        {/* HABITS */}

        {activeTab ===
          "habitos" && (

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 shadow-2xl">

            <h2 className="text-3xl font-black text-slate-800">
              ❤️ Hábitos
            </h2>

            <p className="text-slate-500 mt-4">
              Próximamente:
              rutinas, streaks y progreso diario ✨
            </p>

          </div>
        )}

        {/* CALENDAR */}

        {activeTab ===
          "calendario" && (

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 shadow-2xl">

            <h2 className="text-3xl font-black text-slate-800">
              📅 Calendario
            </h2>

            <p className="text-slate-500 mt-4">
              Próximamente:
              eventos, recordatorios y agenda ✨
            </p>

          </div>
        )}

        {/* MEMBERS */}

        {activeTab ===
          "integrantes" && (

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 shadow-2xl">

            <h2 className="text-3xl font-black text-slate-800">
              👨‍👩‍👧 Integrantes
            </h2>

            <p className="text-slate-500 mt-4">
              Próximamente:
              perfiles y roles del hogar ✨
            </p>

          </div>
        )}

        {/* REMINDERS */}

        {activeTab ===
          "recordatorios" && (

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 shadow-2xl">

            <h2 className="text-3xl font-black text-slate-800">
              🔔 Recordatorios
            </h2>

            <p className="text-slate-500 mt-4">
              Próximamente:
              alertas inteligentes y notificaciones ✨
            </p>

          </div>
        )}

        {/* SETTINGS */}

        {activeTab ===
          "ajustes" && (

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 shadow-2xl">

            <h2 className="text-3xl font-black text-slate-800">
              ⚙️ Ajustes
            </h2>

            <p className="text-slate-500 mt-4">
              Configuración del hogar y cuenta ✨
            </p>

          </div>
        )}

      </main>

    </div>
  );
}