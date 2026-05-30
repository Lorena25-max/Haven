import {
  useContext,
  useEffect,
  useState,
} from "react";

import Swal from "sweetalert2";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  createTask,
  subscribeToTasks,
  deleteTask,
  updateTask,
} from "../services/taskService";

import {
  subscribeToHomeMembers,
} from "../services/userService";

import TaskCard from "../components/TaskCard";

import StatsCard from "../components/StatsCard";

export default function TasksSection() {

  const {
    user,
    profile,
  } = useContext(AuthContext);

  const [tasks, setTasks] =
    useState([]);

  const [members,
    setMembers,
  ] = useState([]);

  const [loading,
    setLoading,
  ] = useState(true);

  const [newTask,
    setNewTask,
  ] = useState({

    titulo: "",
    descripcion: "",
    fecha: "",
    prioridad: "Media",
    assignedTo: "",
    estado: "Pendiente",
  });

  // =========================
  // REALTIME TASKS
  // =========================

  useEffect(() => {

    if (!profile?.homeId)
      return;

    const unsubscribe =
      subscribeToTasks(
        profile.homeId,
        (tasks) => {

          setTasks(tasks);

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, [profile]);

  // =========================
  // MEMBERS
  // =========================

  useEffect(() => {

    if (!profile?.homeId)
      return;

    const unsubscribe =
      subscribeToHomeMembers(
        profile.homeId,
        (users) => {

          setMembers(users);
        }
      );

    return () =>
      unsubscribe();

  }, [profile]);

  // =========================
  // CREATE TASK
  // =========================

  const handleCreateTask =
    async (e) => {

      e.preventDefault();

      if (
        !newTask.titulo
      ) {

        return Swal.fire({
          icon: "warning",
          title:
            "Escribe un título",
        });
      }

      try {

        await createTask({

          ...newTask,

          homeId:
            profile.homeId,

          createdBy:
            profile.name,

          userId:
            user.uid,

          createdAt:
            new Date(),
        });

        Swal.fire({
          icon: "success",
          title:
            "Tarea creada ✨",
          timer: 1200,
          showConfirmButton: false,
        });

        setNewTask({

          titulo: "",
          descripcion: "",
          fecha: "",
          prioridad: "Media",
          assignedTo: "",
          estado: "Pendiente",
        });

      } catch (error) {

        console.error(error);
      }
    };

  // =========================
  // STATUS
  // =========================

  const updateStatus =
    async (
      task,
      estado
    ) => {

      await updateTask(
        task.id,
        {
          estado,
        }
      );
    };

  // =========================
  // DELETE
  // =========================

  const handleDelete =
    async (id) => {

      const result =
        await Swal.fire({

          title:
            "¿Eliminar tarea?",

          icon:
            "warning",

          showCancelButton: true,

          confirmButtonColor:
            "#ef4444",
        });

      if (
        result.isConfirmed
      ) {

        await deleteTask(id);

        Swal.fire({

          icon:
            "success",

          title:
            "Eliminada",

          timer: 1000,

          showConfirmButton: false,
        });
      }
    };

  // =========================
  // FILTERS
  // =========================

  const pendientes =
    tasks.filter(
      (task) =>
        task.estado ===
        "Pendiente"
    );

  const progreso =
    tasks.filter(
      (task) =>
        task.estado ===
        "En Progreso"
    );

  const completadas =
    tasks.filter(
      (task) =>
        task.estado ===
        "Completada"
    );

  return (

    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-black text-slate-800">
          ✅ Tareas
        </h1>

        <p className="text-slate-500 mt-3">
          Organiza tu hogar inteligentemente ✨
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <StatsCard
          title="Total"
          value={tasks.length}
          icon="📋"
          color="bg-gradient-to-r from-indigo-500 to-indigo-700"
        />

        <StatsCard
          title="En progreso"
          value={
            progreso.length
          }
          icon="🚀"
          color="bg-gradient-to-r from-amber-400 to-orange-500"
        />

        <StatsCard
          title="Completadas"
          value={
            completadas.length
          }
          icon="✅"
          color="bg-gradient-to-r from-emerald-400 to-emerald-600"
        />

      </div>

      {/* CREATE */}

      <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl mb-8">

        <h2 className="text-2xl font-black text-slate-800 mb-6">
          Nueva tarea ✨
        </h2>

        <form
          onSubmit={
            handleCreateTask
          }
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            placeholder="Título"
            value={
              newTask.titulo
            }
            onChange={(e) =>
              setNewTask({
                ...newTask,
                titulo:
                  e.target.value,
              })
            }
            className="bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none"
          />

          <input
            type="date"
            value={
              newTask.fecha
            }
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) =>
              setNewTask({
                ...newTask,
                fecha:
                  e.target.value,
              })
            }
            className="bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none"
          />

          <select
            value={
              newTask.prioridad
            }
            onChange={(e) =>
              setNewTask({
                ...newTask,
                prioridad:
                  e.target.value,
              })
            }
            className="bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none"
          >

            <option>
              Baja
            </option>

            <option>
              Media
            </option>

            <option>
              Alta
            </option>

          </select>

          <select
            value={
              newTask.assignedTo
            }
            onChange={(e) =>
              setNewTask({
                ...newTask,
                assignedTo:
                  e.target.value,
              })
            }
            className="bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none"
          >

            <option value="">
              Asignar integrante
            </option>

            {members.map(
              (member) => (

                <option
                  key={member.id}
                  value={
                    member.name
                  }
                >
                  {member.name}
                </option>
              )
            )}

          </select>

          <textarea
            placeholder="Descripción"
            value={
              newTask.descripcion
            }
            onChange={(e) =>
              setNewTask({
                ...newTask,
                descripcion:
                  e.target.value,
              })
            }
            className="bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none md:col-span-2 min-h-[120px]"
          />

          <button
            className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:scale-[1.02] transition-all text-white py-4 rounded-2xl font-bold shadow-xl"
          >

            Crear tarea

          </button>

        </form>

      </div>

      {/* COLUMNS */}

      {loading ? (

        <div className="text-center py-20 text-slate-500">
          Cargando tareas...
        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-6">

          {/* PENDIENTE */}

          <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-5 shadow-xl">

            <h2 className="font-black text-xl text-rose-500 mb-5">
              Pendiente
            </h2>

            <div className="space-y-4">

              {pendientes.map(
                (task) => (

                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={() =>
                      handleDelete(
                        task.id
                      )
                    }
                    onProgress={() =>
                      updateStatus(
                        task,
                        "En Progreso"
                      )
                    }
                  />
                )
              )}

            </div>

          </div>

          {/* PROGRESO */}

          <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-5 shadow-xl">

            <h2 className="font-black text-xl text-amber-500 mb-5">
              En Progreso
            </h2>

            <div className="space-y-4">

              {progreso.map(
                (task) => (

                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={() =>
                      handleDelete(
                        task.id
                      )
                    }
                    onComplete={() =>
                      updateStatus(
                        task,
                        "Completada"
                      )
                    }
                  />
                )
              )}

            </div>

          </div>

          {/* COMPLETADAS */}

          <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-5 shadow-xl">

            <h2 className="font-black text-xl text-emerald-500 mb-5">
              Completadas
            </h2>

            <div className="space-y-4">

              {completadas.map(
                (task) => (

                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={() =>
                      handleDelete(
                        task.id
                      )
                    }
                  />
                )
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}