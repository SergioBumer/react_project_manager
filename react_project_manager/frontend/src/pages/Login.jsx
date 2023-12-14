import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entre!");
    if ([email, password].includes("")) {
      setAlert({
        message: "You must provide information for all fields",
        error: true,
      });

      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/users/login`,
        {
          email,
          password,
        }
      );
      setAlert({
        message: response.data.msg,
        error: false,
      });

      setEmail("");
      setPassword("");
      console.log(response);
    } catch (error) {
      console.log(error);
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Log in and manage your <span className="text-slate-700">projects</span>
      </h1>
      {alert.message && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Log in"
          className="mb-5 w-full bg-sky-700 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="xl:flex xl:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:cursor-pointer"
          to="register"
        >
          Don't have an account yet? Register here
        </Link>

        <Link
          className="block text-center my-5 text-rose-800	 uppercase text-sm hover:cursor-pointer"
          to="forgot-password"
        >
          I forgot my password
        </Link>
      </nav>
    </>
  );
};

export default Login;
