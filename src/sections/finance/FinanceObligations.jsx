import {
  useContext,
  useEffect,
  useState,
} from "react";

import Swal from "sweetalert2";

import {
  AuthContext,
} from "../../context/AuthContext";

import MemberSelect from "../../components/MemberSelect";

import {
  createObligation,
  subscribeToObligations,
  updateObligation,
  deleteObligation,
  getObligationsByMonth,
} from "../../services/obligationService";

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

const getNextMonth =
  (month) => {

    const index =
      months.indexOf(month);

    if (
      index === -1
    )
      return month;

    return months[
      (index + 1) %
      months.length
    ];
  };
export default function FinanceObligations({
  selectedMonth,
}) {

  const {
    profile,
  } = useContext(AuthContext);

  const [
    obligations,
    setObligations,
  ] = useState([]);

  const [
    form,
    setForm,
  ] = useState({

    concepto: "",

    valor: "",

    responsable: "",

    recurrente: true,
  });

  useEffect(() => {

    if (!profile?.homeId)
      return;

    const unsubscribe =
      subscribeToObligations(

        profile.homeId,

        selectedMonth,

        (data) => {

          setObligations(data);
        }
      );

    return () =>
      unsubscribe();

  }, [
    profile,
    selectedMonth,
  ]);

 const handleSubmit =
  async (e) => {

    e.preventDefault();

    if (
      !form.concepto ||
      !form.valor ||
      !form.responsable
    ) {

      return Swal.fire({

        icon: "warning",

        title:
          "Completa todos los campos",
      });
    }

    try {

      await createObligation({

        ...form,

        valor:
          Number(
            form.valor
          ),

        pagado: false,

        month:
          selectedMonth,

        homeId:
          profile.homeId,

        createdAt:
          new Date(),
      });

      setForm({

        concepto: "",

        valor: "",

        responsable: "",

        recurrente: true,
      });

      Swal.fire({

        icon: "success",

        title:
          "Obligación creada",

        timer: 1200,

        showConfirmButton: false,
      });

    } catch (error) {

      console.error(error);
    }
  };
    
  const handleCopyRecurring =
  async () => {

    const nextMonth =
      getNextMonth(
        selectedMonth
      );

    const result =
      await Swal.fire({

        title:
          `Copiar recurrentes a ${nextMonth}?`,

        text:
          "Solo se copiarán obligaciones recurrentes.",

        icon:
          "question",

        showCancelButton:
          true,
      });

    if (
      !result.isConfirmed
    ) {
      return;
    }

    try {

      const currentSnapshot =
        await getObligationsByMonth(

          profile.homeId,

          selectedMonth
        );

      const nextSnapshot =
        await getObligationsByMonth(

          profile.homeId,

          nextMonth
        );

      const recurrentes =
        currentSnapshot.docs.filter(
          (doc) =>
            doc.data()
              .recurrente
        );

      let copied = 0;

      for (
        const item of recurrentes
      ) {

        const data =
          item.data();

        const alreadyExists =
          nextSnapshot.docs.some(
            (doc) =>

              doc.data()
                .concepto ===
              data.concepto
          );

        if (
          alreadyExists
        ) {
          continue;
        }

        await createObligation({

          concepto:
            data.concepto,

          valor:
            data.valor,

          responsable:
            data.responsable,

          recurrente:
            true,

          pagado:
            false,

          month:
            nextMonth,

          homeId:
            profile.homeId,

          createdAt:
            new Date(),
        });

        copied++;
      }

      Swal.fire({

        icon:
          "success",

        title:
          `${copied} obligaciones copiadas`,
      });

    } catch (error) {

      console.error(error);

      Swal.fire({

        icon:
          "error",

        title:
          "Error al copiar",
      });
    }
  };

  const togglePaid =
  async (
    obligation
  ) => {

    await updateObligation(

      obligation.id,

      {
        pagado:
          !obligation.pagado,
      }
    );
  };

  const handleDelete =
  async (id) => {

    const result =
      await Swal.fire({

        title:
          "¿Eliminar obligación?",

        icon:
          "warning",

        showCancelButton:
          true,
      });

    if (
      !result.isConfirmed
    ) {
      return;
    }

    await deleteObligation(
      id
    );
  };

const handleEdit =
  async (obligation) => {

    const result =
      await Swal.fire({

        title:
          "Editar obligación",

        html: `

          <input
            id="concepto"
            class="swal2-input"
            placeholder="Concepto"
            value="${obligation.concepto}"
          >

          <input
            id="valor"
            class="swal2-input"
            type="number"
            placeholder="Valor"
            value="${obligation.valor}"
          >

        `,

        showCancelButton: true,

        preConfirm: () => ({

          concepto:
            document.getElementById(
              "concepto"
            ).value,

          valor:
            Number(
              document.getElementById(
                "valor"
              ).value
            ),
        }),
      });

    if (!result.value)
      return;

    await updateObligation(

      obligation.id,

      {

        concepto:
          result.value.concepto,

        valor:
          result.value.valor,
      }
    );

    Swal.fire({

      icon:
        "success",

      title:
        "Obligación actualizada",

      timer: 1200,

      showConfirmButton: false,
    });
  };


  const totalPagado =
    obligations
      .filter(
        (item) =>
          item.pagado
      )
      .reduce(
        (acc, item) =>
          acc + item.valor,
        0
      );

  const totalPendiente =
    obligations
      .filter(
        (item) =>
          !item.pagado
      )
      .reduce(
        (acc, item) =>
          acc + item.valor,
        0
      );

  return (

    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl">

      <h2 className="text-2xl font-black text-slate-800 mb-6">

        📋 Obligaciones

      </h2>

      <div className="mb-6">

  <button
    onClick={
      handleCopyRecurring
    }
    className="
      bg-gradient-to-r
      from-amber-400
      to-yellow-500
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
      shadow
    "
  >

    🔁 Copiar recurrentes al siguiente mes

  </button>

</div>

      {/* FORMULARIO */}

      <form
        onSubmit={
          handleSubmit
        }
        className="grid md:grid-cols-2 gap-4 mb-8"
      >

        <input
          type="text"
          placeholder="Concepto"
          value={
            form.concepto
          }
          onChange={(e) =>
            setForm({

              ...form,

              concepto:
                e.target.value,
            })
          }
          className="bg-white border border-slate-200 p-3 rounded-xl"
        />

        <input
          type="number"
          placeholder="Valor"
          value={
            form.valor
          }
          onChange={(e) =>
            setForm({

              ...form,

              valor:
                e.target.value,
            })
          }
          className="bg-white border border-slate-200 p-3 rounded-xl"
        />

        <MemberSelect
          value={
            form.responsable
          }
          onChange={(value) =>
            setForm({

              ...form,

              responsable:
                value,
            })
          }
        />

        <label className="flex items-center gap-3 font-medium">

          <input
            type="checkbox"
            checked={
              form.recurrente
            }
            onChange={() =>
              setForm({

                ...form,

                recurrente:
                  !form.recurrente,
              })
            }
          />

          Recurrente

        </label>

        <button
          className="
            bg-gradient-to-r
            from-indigo-500
            to-violet-500
            text-white
            py-3
            rounded-xl
            font-semibold
          "
        >

          Crear obligación

        </button>

      </form>

      {/* RESUMEN */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-2xl p-4 shadow">

          <p className="text-slate-500 text-sm">
            Obligaciones
          </p>

          <h3 className="text-2xl font-black">
            {obligations.length}
          </h3>

        </div>

        <div className="bg-white rounded-2xl p-4 shadow">

          <p className="text-slate-500 text-sm">
            Pendiente
          </p>

          <h3 className="text-2xl font-black text-amber-600">
            ${totalPendiente}
          </h3>

        </div>

        <div className="bg-white rounded-2xl p-4 shadow">

          <p className="text-slate-500 text-sm">
            Pagado
          </p>

          <h3 className="text-2xl font-black text-emerald-600">
            ${totalPagado}
          </h3>

        </div>

      </div>

      {/* TABLA */}

      <div className="bg-white rounded-[2rem] shadow overflow-hidden">

        <div className="grid grid-cols-6 gap-4 p-4 bg-slate-50 border-b font-bold text-slate-600">

          <div>Concepto</div>

          <div>Responsable</div>

          <div>Valor</div>

          <div>Estado</div>

          <div>Rec.</div>

          <div>Acciones</div>

        </div>

        {obligations.length === 0 && (

          <div className="p-8 text-center text-slate-500">

            No hay obligaciones registradas

          </div>

        )}

        {obligations.map(
          (obligation) => (

            <div
              key={
                obligation.id
              }
              className="
                grid
                grid-cols-6
                gap-4
                p-4
                border-b
                items-center
                hover:bg-slate-50
              "
            >

              <div className="font-semibold">
                {obligation.concepto}
              </div>

              <div>
                {obligation.responsable}
              </div>

              <div>
                $
                {obligation.valor}
              </div>

              <div>

                <button
                  onClick={() =>
                    togglePaid(
                      obligation
                    )
                  }
                  className={`

                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold

                    ${
                      obligation.pagado

                        ? "bg-emerald-100 text-emerald-700"

                        : "bg-amber-100 text-amber-700"
                    }
                  `}
                >

                  {obligation.pagado
                    ? "Pagado"
                    : "Pendiente"}

                </button>

              </div>

              <div>

                {obligation.recurrente
                  ? "✅"
                  : "—"}

              </div>

              <div className="flex gap-2">

                <button type="button"
  onClick={() =>
    handleEdit(
      obligation
    )
  }
  className="
    px-3
    py-1
    rounded-lg
    bg-slate-200
    text-sm
  "
>
  Editar
</button>

                <button type="button"
                  onClick={() =>
                    handleDelete(
                      obligation.id
                    )
                  }
                  className="
                    px-3
                    py-1
                    rounded-lg
                    bg-rose-100
                    text-rose-600
                    text-sm
                  "
                >
                  Eliminar
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}