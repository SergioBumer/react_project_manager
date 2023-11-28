import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
const ConfirmAccount = () => {
  const params = useParams();
  const { id } = params;
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/v1/users/check/${id}`;
        const { data } = await axios.get(url);

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

    confirmAccount();
  }, []);

  const { message, error } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Confirm your <span className="text-slate-700">account</span> and start
        managing your <span className="text-slate-700">projects</span>
      </h1>

      <div>
        {message && (
          <div className="mt-20 md:mt-10 shadow-lg px-5 py-5 rounded-xl bg-white">
            {" "}
            <Alert alert={alert} />
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
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
