import { Link } from "react-router-dom";
const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Change your <span className="text-slate-700">password</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
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
          />
        </div>

        <input
          type="submit"
          value="Save new password"
          className="mb-5 w-full bg-sky-700 py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NewPassword;
