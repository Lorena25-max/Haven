export default function BudgetCard({

  presupuesto,

  ahorroMeta,

  ahorroActual,

  gastos,

  onAddSaving,

  onEditBudget,

  onDeleteBudget,

  onEditSavingGoal,

  onResetSaving,

}) {

  const disponible =
    presupuesto - gastos;

  const porcentajeUso =
    presupuesto > 0
      ? Math.min(
          (gastos / presupuesto) * 100,
          100
        )
      : 0;

  const porcentajeAhorro =
    ahorroMeta > 0
      ? Math.min(
          (
            ahorroActual /
            ahorroMeta
          ) * 100,
          100
        )
      : 0;

  return (

    <div className="grid lg:grid-cols-2 gap-6">

      <div className="bg-white rounded-[2rem] p-6 shadow-xl">

        <h3 className="text-2xl font-black mb-5">
          💰 Presupuesto
        </h3>

        <p>
          Presupuesto:
          <strong>
            {" "}
            ${presupuesto}
          </strong>
        </p>

        <p>
          Gastado:
          <strong className="text-rose-500">
            {" "}
            ${gastos}
          </strong>
        </p>

        <p>
          Disponible:
          <strong className="text-emerald-600">
            {" "}
            ${disponible}
          </strong>
        </p>

        <div className="w-full bg-slate-200 h-4 rounded-full mt-5">

          <div
            className="h-4 rounded-full bg-fuchsia-600"
            style={{
              width:
                `${porcentajeUso}%`,
            }}
          />

        </div>

        <p className="mt-2 text-sm">

          {porcentajeUso.toFixed(0)}%
          utilizado

        </p>

        <div className="flex gap-3 mt-5">

  <button
    onClick={onEditBudget}
    className="
      bg-indigo-600
      hover:bg-indigo-700
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
    "
  >
    ✏️ Editar
  </button>

  <button
    onClick={onDeleteBudget}
    className="
      bg-rose-500
      hover:bg-rose-600
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
    "
  >
    🗑 Eliminar
  </button>

</div>

      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-xl">

        <h3 className="text-2xl font-black mb-5">
          🎯 Meta de ahorro
        </h3>

        <p>
          Meta:
          <strong>
            {" "}
            ${ahorroMeta}
          </strong>
        </p>

        <p>
          Ahorrado:
          <strong className="text-emerald-600">
            {" "}
            ${ahorroActual}
          </strong>
        </p>

        <div className="w-full bg-slate-200 h-4 rounded-full mt-5">

          <div
            className="h-4 rounded-full bg-emerald-500"
            style={{
              width:
                `${porcentajeAhorro}%`,
            }}
          />

        </div>

        <p className="mt-2 text-sm">

          {porcentajeAhorro.toFixed(0)}%
          alcanzado

        </p>
        <button
  onClick={onAddSaving}
  className="
    mt-4
    bg-emerald-600
    hover:bg-emerald-700
    text-white
    px-4
    py-2
    rounded-xl
    font-semibold
  "
>
  ➕ Registrar ahorro
</button>

<div className="flex gap-3 mt-4">

  <button
    onClick={onEditSavingGoal}
    className="
      bg-indigo-600
      hover:bg-indigo-700
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
    "
  >
    ✏️ Editar meta
  </button>

  <button
    onClick={onResetSaving}
    className="
      bg-amber-500
      hover:bg-amber-600
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
    "
  >
    🔄 Reiniciar
  </button>

</div>

      </div>

    </div>
  );
}

