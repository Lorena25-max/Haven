import {
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Swal from "sweetalert2";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
} from "../firebase/firebase";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  createUserProfile,
  validateHomeId,
} from "../services/userService";

export default function Login() {

  const navigate =
    useNavigate();

  const {
    profile,
  } = useContext(AuthContext);

  const [isRegister,
    setIsRegister,
  ] = useState(false);

  const [loading,
    setLoading,
  ] = useState(false);

  const [form,
    setForm,
  ] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [joinHome,
    setJoinHome,
  ] = useState("");

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        // =========================
        // LOGIN
        // =========================

        if (!isRegister) {

          await signInWithEmailAndPassword(
            auth,
            form.email,
            form.password
          );

          Swal.fire({
            icon: "success",
            title:
              "Bienvenida a Haven ✨",
            timer: 1200,
            showConfirmButton: false,
          });

          navigate("/dashboard");

          return;
        }

        // =========================
        // REGISTER
        // =========================

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            form.email,
            form.password
          );

        const firebaseUser =
          userCredential.user;

        // =========================
        // HOME ID
        // =========================

        let finalHomeId = "";

        // JOIN EXISTING HOME

        if (
          joinHome.trim()
        ) {

          const exists =
            await validateHomeId(
              joinHome.trim()
            );

          if (!exists) {

            setLoading(false);

            return Swal.fire({
              icon: "error",
              title:
                "Código inválido",
              text:
                "Ese hogar no existe",
            });
          }

          finalHomeId =
            joinHome
              .trim()
              .toUpperCase();

        } else {

          // CREATE NEW HOME

          finalHomeId =
            crypto.randomUUID()
              .slice(0, 8)
              .toUpperCase();
        }

        console.log(
          "FINAL HOME ID:",
          finalHomeId
        );

        // =========================
        // CREATE PROFILE
        // =========================

        await createUserProfile(
          firebaseUser.uid,
          {
            uid:
              firebaseUser.uid,

            name:
              form.name,

            email:
              form.email,

            homeId:
              finalHomeId,

            createdAt:
              new Date(),
          }
        );

        console.log(
          "PROFILE CREATED"
        );

        Swal.fire({
          icon: "success",
          title:
            "Cuenta creada ✨",
          html: `
            <p style="margin-bottom:10px;">
              Tu código de hogar es:
            </p>

            <div style="
              font-size:28px;
              font-weight:bold;
              color:#c026d3;
              letter-spacing:3px;
            ">
              ${finalHomeId}
            </div>

            <p style="margin-top:15px;">
              Compártelo con tu familia 💖
            </p>
          `,
        });

        navigate("/dashboard");

      } catch (error) {

        console.error(error);

        let message =
          "Ocurrió un error";

        if (
          error.code ===
          "auth/email-already-in-use"
        ) {

          message =
            "Ese correo ya existe";
        }

        if (
          error.code ===
          "auth/invalid-credential"
        ) {

          message =
            "Credenciales inválidas";
        }

        if (
  error.code ===
  "auth/weak-password"
) {

  message =
    "La contraseña debe tener mínimo 6 caracteres";
}

        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-100 p-6">

      <div className="w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-2xl p-8">

        {/* LOGO */}

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            🏡
          </div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
            Haven
          </h1>

          <p className="text-slate-600 mt-3">
            Organización inteligente para tu hogar ✨
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          {isRegister && (

            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={
                form.name
              }
              onChange={
                handleChange
              }
              required
              className="w-full bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none"
            />

          )}

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={
              form.email
            }
            onChange={
              handleChange
            }
            required
            className="w-full bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={
              form.password
            }
            onChange={
              handleChange
            }
            required
            className="w-full bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none"
          />

          {/* JOIN HOME */}

          {isRegister && (

            <input
              type="text"
              placeholder="Código de hogar (opcional)"
              value={
                joinHome
              }
              onChange={(e) =>
                setJoinHome(
                  e.target.value
                )
              }
              className="w-full bg-white/80 border border-slate-200 p-4 rounded-2xl outline-none uppercase"
            />

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:scale-[1.02] transition-all text-white py-4 rounded-2xl font-bold shadow-xl"
          >

            {loading
              ? "Cargando..."
              : isRegister
              ? "Crear cuenta"
              : "Iniciar sesión"}

          </button>

        </form>

        {/* SWITCH */}

        <div className="text-center mt-6">

          <button
            onClick={() =>
              setIsRegister(
                !isRegister
              )
            }
            className="text-fuchsia-600 font-semibold hover:underline"
          >

            {isRegister
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate"}

          </button>

        </div>

      </div>

    </div>
  );
}