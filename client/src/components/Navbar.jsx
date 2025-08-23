import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  // If you're on an admin route, show a different navbar
  if (pathname.startsWith("/admin") && user?.role === "admin") {
    return (
      <nav className="p-4 bg-gray-900 text-white flex gap-4 justify-between">
        <div>Admin Dashboard</div>
        <div className="flex gap-4">
          <Link to="/admin">Overview</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/packages">Packages</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="p-4 bg-blue-600 text-white flex gap-4 justify-between">
      <div className="flex gap-4">
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/packages">Packages</NavLink>
          {user && <NavLink to="/cart">Cart</NavLink>}
          {user && <NavLink to="/profile">Profile</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        </div>
      </div>
      <div className="flex gap-3">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hello, {user.name.split(" ")[0]}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
