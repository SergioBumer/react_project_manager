import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
const NewPassword = () => {
  const { token } = useParams();
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/v1/users/recoverPassword/${token}`
        );
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password].includes("")) {
      setAlert({
        message: "You must provide a password",
        error: true,
      });

      return;
    }

    if (password.length < 6) {
      setAlert({
        message: "Your password must be at least 8 characters",
        error: true,
      });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/users/recoverPassword/${token}`,
        {
          password,
        }
      );
      console.log(response);
      setAlert({
        message: response.data.msg,
        error: false,
      });

      setPassword("");
    } catch (error) {
      console.log(error);
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
    }
  };
  const { message, error } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Change your <span className="text-slate-700">password</span>
      </h1>
      {message && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
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
          value="Save new password"
          className="mb-5 w-full bg-sky-700 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      {!error && (
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center text-slate-500 uppercase text-sm hover:cursor-pointer"
            to="../"
          >
            Log in
          </Link>
        </nav>
      )}
    </>
  );
};

export default NewPassword;
