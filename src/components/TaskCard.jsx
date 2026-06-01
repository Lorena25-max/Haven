import {
  useDraggable,
} from "@dnd-kit/core";

import {
  CSS,
} from "@dnd-kit/utilities";

export default function TaskCard({

  task,
  onDelete,
  onEdit,

}) {

  const {

    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,

  } = useDraggable({

    id: task.id,

  });

  const style = {

    transform:
      CSS.Transform.toString(
        transform
      ),

    transition,

  };

  const priorityColors = {

    Alta:
      "bg-rose-100 text-rose-700",

    Media:
      "bg-amber-100 text-amber-700",

    Baja:
      "bg-emerald-100 text-emerald-700",

  };

  return (

    <div

      ref={setNodeRef}

      style={style}

      {...listeners}

      {...attributes}

      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-4
        shadow-sm
        hover:shadow-lg
        transition
        cursor-grab
      "

    >

      <div className="flex justify-between items-start">

        <h3 className="font-bold text-slate-800">

          {task.titulo}

        </h3>

        <span
          className={`
            text-xs
            px-2
            py-1
            rounded-full
            font-semibold
            ${priorityColors[
              task.prioridad
            ]}
          `}
        >

          {task.prioridad}

        </span>

      </div>

      {task.descripcion && (

        <p className="text-sm text-slate-500 mt-2">

          {task.descripcion}

        </p>

      )}

      <div className="mt-4 text-xs text-slate-500">

        👤 {task.assignedTo || "Sin asignar"}

      </div>

      <div className="text-xs text-slate-500">

        📅 {task.fecha || "Sin fecha"}

      </div>

      <div className="flex gap-2 mt-4">

        <button

          onClick={() =>
            onEdit(task)
          }

          className="
            flex-1
            bg-violet-100
            text-violet-700
            py-2
            rounded-xl
            text-sm
          "

        >

          ✏️

        </button>

        <button

          onClick={onDelete}

          className="
            flex-1
            bg-rose-100
            text-rose-700
            py-2
            rounded-xl
            text-sm
          "

        >

          🗑️

        </button>

      </div>

    </div>

  );

}