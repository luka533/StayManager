import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="text-center pt-15">
      <h1 className="text-3xl pb-5">
        The page you are looking for could not be found
      </h1>
      <button
        onClick={() => navigate(-1)}
        className="text-xl min-w-28 px-4 py-2 rounded-lg font-medium transition cursor-pointer bg-emerald-500 text-white hover:bg-emerald-600"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default PageNotFound;
