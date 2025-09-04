import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        SkillSync
      </Link>

      {/* Links */}
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-indigo-600">
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
