const months = [

  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",

  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function MonthTabs({
  selectedMonth,
  setSelectedMonth,
}) {

  return (

    <div className="flex gap-3 overflow-x-auto pb-3">

      {months.map(
        (month) => (

          <button
            key={month}
            onClick={() =>
              setSelectedMonth(
                month
              )
            }
            className={`
              whitespace-nowrap px-5 py-3 rounded-2xl font-semibold transition
              ${
                selectedMonth ===
                month

                  ? "bg-fuchsia-600 text-white"

                  : "bg-white shadow"
              }
            `}
          >

            {month}

          </button>
        )
      )}

    </div>
  );
}