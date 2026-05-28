import { motion } from "framer-motion";

export default function Login() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-100 flex items-center justify-center p-6">

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-2xl w-full max-w-md p-10"
      >

        <div className="text-center mb-10">

          <div className="text-6xl mb-4">
            ✨
          </div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
            Selah Home
          </h1>

          <p className="text-slate-600 mt-4 text-lg">
            Organización, hogar y propósito
          </p>

        </div>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Correo electrónico"
            className="w-full bg-white/80 border border-slate-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-200 outline-none p-4 rounded-2xl transition"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-white/80 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none p-4 rounded-2xl transition"
          />

          <button
            className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:scale-[1.02] transition-all text-white py-4 rounded-2xl font-bold shadow-xl"
          >
            Ingresar
          </button>

        </form>

      </motion.div>

    </div>
  );
}