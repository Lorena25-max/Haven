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

    <aside className="
      w-[250px]
      min-h-screen
      bg-white
      border-r
      border-[#ECE6DA]
      p-5
      shadow-lg
    ">

      <div className="mb-8">

        <h1 className="
          text-3xl
          font-black
          text-[#B08D57]
        ">
          Haven
        </h1>

        <p className="
          text-slate-500
          text-sm
          mt-2
        ">
          Tu hogar organizado
        </p>

      </div>

      <div className="space-y-2">

        {menuItems.map((item) => {

          const Icon =
            item.icon;

          return (

            <button
              key={item.id}
              onClick={() =>
                setActiveTab(item.id)
              }
              className={`

                w-full
                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-xl

                transition-all

                text-sm
                font-semibold

                ${
                  activeTab === item.id

                    ? `
                      bg-[#F4EFE4]
                      text-[#8F6B35]
                      border
                      border-[#DCCBA8]
                    `

                    : `
                      text-slate-700
                      hover:bg-[#F8F5EF]
                    `
                }

              `}
            >

              <Icon size={18} />

              {item.label}

            </button>

          );

        })}

      </div>

    </aside>
  );
}