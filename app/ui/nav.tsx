import { logout } from "../actions/auth";

const Navbar = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={logout}
        className="bg-gray-400 text-white px-4 py-1 rounded-full hover:bg-gray-500 transition-colors cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
