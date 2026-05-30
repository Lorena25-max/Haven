import {
  useState,
} from "react";

export default function BudgetForm({

  onSave,

}) {

  const [
    form,
    setForm,
  ] = useState({

    presupuesto: "",

    ahorroMeta: "",

    ahorroActual: "",
  });

  const handleSubmit =
    (e) => {

      e.preventDefault();

      onSave({

        presupuesto:
          Number(
            form.presupuesto
          ),

        ahorroMeta:
          Number(
            form.ahorroMeta
          ),

        ahorroActual:
          Number(
            form.ahorroActual
          ),
      });
    };

  return (

    <div className="bg-white rounded-[2rem] p-8 shadow-xl">

      <h2 className="text-2xl font-black mb-6">

        🎯 Presupuesto y ahorro

      </h2>

      <form
        onSubmit={
          handleSubmit
        }
        className="grid md:grid-cols-3 gap-4"
      >

        <input
          type="number"
          placeholder="Presupuesto mensual"
          value={
            form.presupuesto
          }
          onChange={(e) =>
            setForm({

              ...form,

              presupuesto:
                e.target.value,
            })
          }
          className="border p-4 rounded-2xl"
        />

        <input
          type="number"
          placeholder="Meta ahorro"
          value={
            form.ahorroMeta
          }
          onChange={(e) =>
            setForm({

              ...form,

              ahorroMeta:
                e.target.value,
            })
          }
          className="border p-4 rounded-2xl"
        />

        <input
          type="number"
          placeholder="Ahorro actual"
          value={
            form.ahorroActual
          }
          onChange={(e) =>
            setForm({

              ...form,

              ahorroActual:
                e.target.value,
            })
          }
          className="border p-4 rounded-2xl"
        />

        <button
          className="md:col-span-3 bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white py-4 rounded-2xl font-bold"
        >

          Guardar presupuesto

        </button>

      </form>

    </div>
  );
}