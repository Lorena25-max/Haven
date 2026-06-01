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

  const { profile } =
    useContext(AuthContext);

  const [
    activeTab,
    setActiveTab,
  ] = useState("inicio");

  return (

    <div className="
      flex
      min-h-screen
      bg-gradient-to-br
      from-[#FAF8F3]
      via-[#F6F2EA]
      to-[#F3F0E8]
    ">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="
        flex-1
        p-6
        overflow-y-auto
      ">

        {/* HEADER */}

        <div className="
          bg-white/80
          backdrop-blur-xl
          border
          border-[#E7DFD0]
          rounded-[28px]
          p-6
          shadow-lg
          mb-6
        ">

          <h1 className="
            text-3xl
            font-black
            text-[#3F3A34]
          ">
            Haven
          </h1>

          <p className="
            text-slate-500
            mt-2
          ">
            Bienvenida,
            <span className="
              font-bold
              text-[#B08D57]
            ">
              {" "}
              {profile?.name}
            </span>
          </p>

          <div className="
            flex
            gap-3
            flex-wrap
            mt-5
          ">

            <div className="
              bg-[#F8F4EC]
              border
              border-[#E7DFD0]
              px-4
              py-2
              rounded-xl
              text-sm
              font-medium
              text-slate-700
            ">
              🏡 Home ID: {profile?.homeId}
            </div>

            <div className="
              bg-[#EEF6EF]
              text-[#4F7D57]
              px-4
              py-2
              rounded-xl
              text-sm
              font-medium
            ">
              Realtime activo
            </div>

          </div>

        </div>

        {/* INICIO */}

        {activeTab === "inicio" && (

          <div className="
            grid
            md:grid-cols-3
            gap-5
          ">

            <div className="
              bg-white
              rounded-[24px]
              p-6
              shadow-md
            ">

              <h2 className="
                text-xl
                font-black
                text-slate-800
              ">
                🙏 Devocional
              </h2>

              <p className="
                text-slate-500
                mt-2
              ">
                Espacio espiritual del hogar.
              </p>

            </div>

            <div className="
              bg-white
              rounded-[24px]
              p-6
              shadow-md
            ">

              <h2 className="
                text-xl
                font-black
                text-slate-800
              ">
                ✅ Tareas
              </h2>

              <p className="
                text-slate-500
                mt-2
              ">
                Organización familiar.
              </p>

            </div>

            <div className="
              bg-white
              rounded-[24px]
              p-6
              shadow-md
            ">

              <h2 className="
                text-xl
                font-black
                text-slate-800
              ">
                💰 Finanzas
              </h2>

              <p className="
                text-slate-500
                mt-2
              ">
                Control financiero inteligente.
              </p>

            </div>

          </div>

        )}

        {activeTab === "devocional" && (

          <div className="
            bg-white
            rounded-[24px]
            p-8
            shadow-md
          ">
            <h2 className="text-2xl font-black">
              🙏 Devocional
            </h2>
          </div>

        )}

        {activeTab === "tareas" && (
          <TasksSection />
        )}

        {activeTab === "finanzas" && (
          <FinanceSection />
        )}

      </main>

    </div>
  );
}