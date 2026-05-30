import {
  Home,
  BookHeart,
  CheckSquare,
  Wallet,
  Heart,
  CalendarDays,
  Users,
  Bell,
  Settings,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {

  const menuItems = [

    {
      id: "inicio",
      label: "Inicio",
      icon: Home,
    },

    {
      id: "devocional",
      label: "Devocional",
      icon: BookHeart,
    },

    {
      id: "tareas",
      label: "Tareas",
      icon: CheckSquare,
    },

    {
      id: "finanzas",
      label: "Finanzas",
      icon: Wallet,
    },

    {
      id: "habitos",
      label: "Hábitos",
      icon: Heart,
    },

    {
      id: "calendario",
      label: "Calendario",
      icon: CalendarDays,
    },

    {
      id: "integrantes",
      label: "Integrantes",
      icon: Users,
    },

    {
      id: "recordatorios",
      label: "Recordatorios",
      icon: Bell,
    },

    {
      id: "ajustes",
      label: "Ajustes",
      icon: Settings,
    },
  ];

  return (

    <aside className="w-[280px] min-h-screen bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-2xl p-6">

      {/* LOGO */}

      <div className="mb-10">

        <h1 className="text-4xl font-black bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
          Haven
        </h1>

        <p className="text-slate-500 mt-2 text-sm">
          Tu hogar organizado ✨
        </p>

      </div>

      {/* MENU */}

      <div className="space-y-3">

        {menuItems.map((item) => {

          const Icon =
            item.icon;

          return (

            <button
              key={item.id}
              onClick={() =>
                setActiveTab(
                  item.id
                )
              }
              className={`
                w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold
                ${
                  activeTab ===
                  item.id
                    ? "bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-xl scale-[1.02]"
                    : "hover:bg-white text-slate-700"
                }
              `}
            >

              <Icon size={22} />

              {item.label}

            </button>
          );
        })}

      </div>

    </aside>
  );
}