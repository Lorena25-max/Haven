export default function ObligationCard({
  obligation,
  onTogglePaid,
}) {

  return (

    <div className="bg-white rounded-[2rem] shadow-xl p-5">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-xl font-black text-slate-800">
            {obligation.concepto}
          </h3>

          <p className="text-slate-500 mt-2">
            Responsable:
            {" "}
            {obligation.responsable}
          </p>

          <p className="text-slate-500">
            $
            {obligation.valor}
          </p>

        </div>

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={
              obligation.pagado
            }
            onChange={
              onTogglePaid
            }
          />

          <span>

            {obligation.pagado
              ? "Pagado"
              : "Pendiente"}

          </span>

        </label>

      </div>

      {obligation.recurrente && (

        <div className="mt-4">

          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">

            Recurrente

          </span>

        </div>
      )}

    </div>
  );
}