import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, password2].includes("")) {
      setAlert({
        message: "You must provide information for all fields",
        error: true,
      });

      return;
    }

    if (password !== password2) {
      setAlert({
        message: "Both passwords must be equal",
        error: true,
      });
    }

    if (password.length < 6) {
      setAlert({
        message: "Your password must be at least 8 characters",
        error: true,
      });
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/users`, {
        name,
        email,
        password,
      });
      setAlert({
        message: response.data.msg,
        error: false,
      });

      setName("");
      setEmail("");
      setPassword("");
      setPassword2("");
    } catch (error) {
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Create an account and manage your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      {alert.message && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="mb-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="repeat-password"
          >
            Repeat password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="repeat-password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Register"
          className="mb-5 w-full bg-sky-700 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:cursor-pointer"
          to="../"
        >
          Already registered? Log in
        </Link>
      </nav>
    </>
  );
};

export default Register;
