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

import ObligationCard from "../../components/ObligationCard";

import {
  createObligation,
  subscribeToObligations,
  updateObligation,
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

          setObligations(
            data
          );
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

        console.error(
          error
        );
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

  return (

    <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl">

      <h2 className="text-2xl font-black text-slate-800 mb-6">

        📋 Obligaciones

      </h2>

      <form
        onSubmit={
          handleSubmit
        }
        className="grid md:grid-cols-2 gap-5 mb-8"
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
          className="bg-white border border-slate-200 p-4 rounded-2xl"
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
          className="bg-white border border-slate-200 p-4 rounded-2xl"
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

        <label className="flex items-center gap-3 font-semibold">

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
          className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white py-4 rounded-2xl font-bold"
        >

          Crear obligación

        </button>

      </form>

      <div className="space-y-4">

        {obligations.map(
          (obligation) => (

            <ObligationCard

              key={
                obligation.id
              }

              obligation={
                obligation
              }

              onTogglePaid={() =>
                togglePaid(
                  obligation
                )
              }

            />
          )
        )}

      </div>

    </div>
  );
}