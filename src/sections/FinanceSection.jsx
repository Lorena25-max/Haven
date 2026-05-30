import BudgetCard from "../components/BudgetCard";

import BudgetForm from "../components/BudgetForm";

import {
  subscribeToBudgets,
  saveBudget,
  deleteBudget,
} from "../services/budgetService";


import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import MonthTabs from "../components/MonthTabs";

import FinanceStats from "../components/FinanceStats";

import FinanceCard from "../components/FinanceCard";

import FinanceObligations from "./finance/FinanceObligations";

import {
  createFinance,
  subscribeToFinances,
  deleteFinance,
} from "../services/financeService";

import Swal from "sweetalert2";

export default function FinanceSection() {

  const {
    user,
    profile,
  } = useContext(AuthContext);

  const [
    selectedMonth,
    setSelectedMonth,
  ] = useState("Junio");

  const [
    finances,
    setFinances,
  ] = useState([]);

  const [
  budgets,
  setBudgets,
] = useState([]);

  const [
  loading,
  setLoading,
] = useState(false);

  const [
    form,
    setForm,
  ] = useState({

    tipo: "Gasto",

    descripcion: "",

    valor: "",

    categoria: "Hogar",
  });

  // =====================
  // REALTIME FINANCES
  // =====================

  useEffect(() => {

    if (!profile?.homeId)
      return;

    const unsubscribe =
      subscribeToFinances(

        profile.homeId,

        (data) => {

          setFinances(data);

          
        }
      );

    return () =>
      unsubscribe();

  }, [profile]);

  useEffect(() => {

  if (!profile?.homeId)
    return;

  const unsubscribe =
    subscribeToBudgets(

      profile.homeId,

      selectedMonth,

      (data) => {

        setBudgets(data);
      }
    );

  return () =>
    unsubscribe();

}, [
  profile,
  selectedMonth,
]);

  // =====================
  // CREATE MOVEMENT
  // =====================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !form.descripcion ||
        !form.valor
      ) {

        return Swal.fire({

          icon: "warning",

          title:
            "Completa todos los campos",
        });
      }

      try {

        await createFinance({

          ...form,

          valor:
            Number(
              form.valor
            ),

          month:
            selectedMonth,

          homeId:
            profile.homeId,

          userId:
            user.uid,

          createdBy:
            profile.name,

          createdAt:
            new Date(),
        });

        setForm({

          tipo: "Gasto",

          descripcion: "",

          valor: "",

          categoria: "Hogar",
        });

      } catch (error) {

        console.error(error);
      }
    };

  // =====================
  // DELETE
  // =====================

  const handleDelete =
    async (id) => {

      await deleteFinance(
        id
      );
    };

    const handleSaveBudget =
  async (data) => {

    try {

      await saveBudget(

        profile.homeId,

        selectedMonth,

        data
      );

      Swal.fire({

        icon: "success",

        title:
          "Presupuesto guardado",

        timer: 1200,

        showConfirmButton: false,
      });

    } catch (error) {

      console.error(error);
    }
  };

  const handleAddSaving =
  async () => {

    const result =
      await Swal.fire({

        title:
          "Registrar ahorro",

        input:
          "number",

        inputLabel:
          "¿Cuánto deseas agregar al ahorro?",

        showCancelButton:
          true,
      });

    if (!result.value)
      return;

    const nuevoAhorro =

      Number(
        currentBudget.ahorroActual || 0
      ) +

      Number(
        result.value
      );

    await saveBudget(

      profile.homeId,

      selectedMonth,

      {

        presupuesto:
          currentBudget.presupuesto,

        ahorroMeta:
          currentBudget.ahorroMeta,

        ahorroActual:
          nuevoAhorro,
      }
    );

    Swal.fire({

      icon:
        "success",

      title:
        "Ahorro actualizado",
    });
  };

  const handleEditSavingGoal =
  async () => {

    const result =
      await Swal.fire({

        title:
          "Editar meta de ahorro",

        input:
          "number",

        inputValue:
          currentBudget.ahorroMeta,

        inputLabel:
          "Nueva meta",

        showCancelButton:
          true,
      });

    if (!result.value)
      return;

    await saveBudget(

      profile.homeId,

      selectedMonth,

      {

        ...currentBudget,

        ahorroMeta:
          Number(
            result.value
          ),
      }
    );

    Swal.fire({

      icon:
        "success",

      title:
        "Meta actualizada",
    });
  };

  const handleResetSaving =
  async () => {

    const result =
      await Swal.fire({

        title:
          "Reiniciar ahorro",

        text:
          "Se pondrá el ahorro acumulado en 0",

        icon:
          "warning",

        showCancelButton:
          true,
      });

    if (!result.isConfirmed)
      return;

    await saveBudget(

      profile.homeId,

      selectedMonth,

      {

        ...currentBudget,

        ahorroActual: 0,
      }
    );
  };

  const handleEditBudget =
  async () => {

    const result =
      await Swal.fire({

        title:
          "Editar presupuesto",

        html: `
  <label style="display:block;margin-top:10px;font-weight:bold;">
    Presupuesto mensual
  </label>

  <input
    id="budget"
    class="swal2-input"
    value="${currentBudget.presupuesto}"
  >

  <label style="display:block;margin-top:10px;font-weight:bold;">
    Meta de ahorro
  </label>

  <input
    id="goal"
    class="swal2-input"
    value="${currentBudget.ahorroMeta}"
  >
`,

        preConfirm: () => ({

          presupuesto:
            Number(
              document.getElementById(
                "budget"
              ).value
            ),

          ahorroMeta:
            Number(
              document.getElementById(
                "goal"
              ).value
            ),
        }),
      });

    if (!result.value)
      return;

    await saveBudget(

      profile.homeId,

      selectedMonth,

      {

        ...currentBudget,

        presupuesto:
          result.value.presupuesto,

        ahorroMeta:
          result.value.ahorroMeta,
      }
    );
  };

  const handleDeleteBudget =
  async () => {

    if (!budgets[0])
      return;

    const result =
      await Swal.fire({

        title:
          "Eliminar presupuesto",

        text:
          "Se eliminará el presupuesto de este mes",

        icon:
          "warning",

        showCancelButton:
          true,
      });

    if (!result.isConfirmed)
      return;

    await deleteBudget(
      budgets[0].id
    );
  };

  // =====================
  // FILTER MONTH
  // =====================

  const monthFinances =
    finances.filter(
      (item) =>
        item.month ===
        selectedMonth
    );

  // =====================
  // STATS
  // =====================

  const ingresos =
    monthFinances
      .filter(
        (item) =>
          item.tipo ===
          "Ingreso"
      )
      .reduce(
        (acc, item) =>
          acc + item.valor,
        0
      );

  const gastos =
    monthFinances
      .filter(
        (item) =>
          item.tipo ===
          "Gasto"
      )
      .reduce(
        (acc, item) =>
          acc + item.valor,
        0
      );

  const balance =
    ingresos - gastos;

    const currentBudget =
  budgets[0] || {

    presupuesto: 0,

    ahorroMeta: 0,

    ahorroActual: 0,
  };
    

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black text-slate-800">
          💰 Finanzas
        </h1>

        <p className="text-slate-500 mt-2">
          Administración financiera del hogar
        </p>

      </div>

      

      {/* MONTHS */}

      <MonthTabs

        selectedMonth={
          selectedMonth
        }

        setSelectedMonth={
          setSelectedMonth
        }

      />

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-5">

        <FinanceStats
          title="Ingresos"
          value={ingresos}
          icon="📈"
          color="bg-gradient-to-r from-emerald-500 to-emerald-700"
        />

        <FinanceStats
          title="Gastos"
          value={gastos}
          icon="💸"
          color="bg-gradient-to-r from-rose-500 to-rose-700"
        />

        <FinanceStats
          title="Balance"
          value={balance}
          icon="🏦"
          color="bg-gradient-to-r from-indigo-500 to-indigo-700"
        />

      </div>

      <BudgetForm
  onSave={
    handleSaveBudget
  }
/>

<BudgetCard

  presupuesto={
    currentBudget.presupuesto
  }

  ahorroMeta={
    currentBudget.ahorroMeta
  }

  ahorroActual={
    currentBudget.ahorroActual
  }

  gastos={gastos}

  onAddSaving={
    handleAddSaving
  }

  onEditBudget={
  handleEditBudget
}

onDeleteBudget={
  handleDeleteBudget
}

onEditSavingGoal={
  handleEditSavingGoal
}

onResetSaving={
  handleResetSaving
}

/>

      {/* OBLIGATIONS */}

      <FinanceObligations
        selectedMonth={
          selectedMonth
        }
      />

      {/* MOVEMENTS */}

      <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl">

        <h2 className="text-2xl font-black mb-6">
          💸 Movimientos
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="grid md:grid-cols-2 gap-5 mb-8"
        >

          <select
            value={
              form.tipo
            }
            onChange={(e) =>
              setForm({

                ...form,

                tipo:
                  e.target.value,
              })
            }
            className="bg-white border p-4 rounded-2xl"
          >

            <option>
              Gasto
            </option>

            <option>
              Ingreso
            </option>

          </select>

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
            className="bg-white border p-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Descripción"
            value={
              form.descripcion
            }
            onChange={(e) =>
              setForm({

                ...form,

                descripcion:
                  e.target.value,
              })
            }
            className="bg-white border p-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Categoría"
            value={
              form.categoria
            }
            onChange={(e) =>
              setForm({

                ...form,

                categoria:
                  e.target.value,
              })
            }
            className="bg-white border p-4 rounded-2xl"
          />

          <button
            className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white py-4 rounded-2xl font-bold"
          >

            Guardar movimiento

          </button>

        </form>

        {loading ? (

          <p>
            Cargando...
          </p>

        ) : (

          <div className="space-y-4">

            {monthFinances.map(
              (item) => (

                <FinanceCard
                  key={item.id}
                  item={item}
                  onDelete={() =>
                    handleDelete(
                      item.id
                    )
                  }
                />
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}