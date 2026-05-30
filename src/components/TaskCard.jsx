export default function TaskCard({
  task,
  onDelete,
  onProgress,
  onComplete,
}) {

  return (

    <div className={`
      rounded-[2rem] p-5 shadow-xl border backdrop-blur-xl transition-all hover:scale-[1.02]
      ${
        task.estado ===
        "Pendiente"
          ? "bg-rose-50 border-rose-200"
          : task.estado ===
            "En Progreso"
          ? "bg-amber-50 border-amber-200"
          : "bg-emerald-50 border-emerald-200"
      }
    `}>

      {/* PRIORITY */}

      <div className="flex justify-between items-center mb-4">

        <span className={`
          text-xs px-3 py-1 rounded-full font-bold
          ${
            task.prioridad ===
            "Alta"
              ? "bg-rose-500 text-white"
              : task.prioridad ===
                "Media"
              ? "bg-amber-400 text-white"
              : "bg-emerald-500 text-white"
          }
        `}>

          {task.prioridad || "Baja"}

        </span>

        <span className="text-xs text-slate-500">
          {task.fecha}
        </span>

      </div>

      {/* TITLE */}

      <h3 className="text-xl font-black text-slate-800">
        {task.titulo}
      </h3>

      {/* DESCRIPTION */}

      <p className="text-slate-600 mt-3 text-sm leading-relaxed">
        {task.descripcion}
      </p>

      {/* ASSIGNED */}

      <div className="mt-5">

        <p className="text-xs text-slate-500">
          Asignada a
        </p>

        <p className="font-bold text-fuchsia-600">
          {task.assignedTo || "Sin asignar"}
        </p>

      </div>

      {/* BUTTONS */}

      <div className="flex gap-2 mt-6">

        {task.estado ===
          "Pendiente" && (

          <button
            onClick={
              onProgress
            }
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-white py-2 rounded-xl text-sm font-semibold transition"
          >
            Progreso
          </button>
        )}

        {task.estado ===
          "En Progreso" && (

          <button
            onClick={
              onComplete
            }
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl text-sm font-semibold transition"
          >
            Completar
          </button>
        )}

        <button
          onClick={
            onDelete
          }
          className="flex-1 bg-slate-900 hover:bg-black text-white py-2 rounded-xl text-sm font-semibold transition"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}