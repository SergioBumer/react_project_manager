import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 4) {
      setAlert({
        message: "Please enter your email address",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/users/recoverPassword`,
        { email }
      );

      setAlert({
        message: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
    }
  };

  const { message } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Recover your account, don't lose your{" "}
        <span className="text-slate-700">projects</span>
      </h1>
      {message && <Alert alert={alert} />}
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
            className="w-full mt-3 mb-5 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Send recover email"
          className="mb-5 w-full bg-sky-700 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:cursor-pointer"
          to="../register"
        >
          Don't have an account yet? Register here
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
