export default function FinanceCard({
  item,
  onDelete,
}) {

  return (

    <div className={`
      rounded-[2rem] p-5 shadow-xl border backdrop-blur-xl
      ${
        item.tipo ===
        "Ingreso"
          ? "bg-emerald-50 border-emerald-200"
          : "bg-rose-50 border-rose-200"
      }
    `}>

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-xl font-black text-slate-800">
            {item.descripcion}
          </h3>

          <p className="text-slate-500 mt-2">
            {item.categoria}
          </p>

        </div>

        <div className={`
          text-xl font-black
          ${
            item.tipo ===
            "Ingreso"
              ? "text-emerald-600"
              : "text-rose-500"
          }
        `}>

          {item.tipo ===
          "Ingreso"
            ? "+"
            : "-"}

          ${item.valor}

        </div>

      </div>

      <div className="flex justify-between items-center mt-6">

        <div>

          <p className="text-xs text-slate-500">
            Registrado por
          </p>

          <p className="font-bold text-fuchsia-600">
            {item.createdBy}
          </p>

        </div>

        <button
          onClick={onDelete}
          className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-sm transition"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}