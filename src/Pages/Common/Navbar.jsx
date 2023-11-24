import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/survey">Survey</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-blue-300  rounded-lg text-black">
        <div className="navbar-start  ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <img className="w-[40px]" src="" alt="" />
          <a className="btn btn-ghost normal-case text-xl">SurveyHub</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user && (
            <>
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar mr-2"
              >
                <div className="w-8  lg:w-10 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </label>
              <div>
                <h1 className="text-sm md:text-xl lg:text-xl mr-2 ">
                  {user.displayName}
                </h1>
              </div>
            </>
          )}
          {!user ? (
            <Link to="/login">
              <button className="btn ">Login</button>
            </Link>
          ) : (
            <button onClick={logOut} className="btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
