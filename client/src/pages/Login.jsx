import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, remember);
      nav("/");
    } catch (e) { setErr(e.response?.data?.message || "Login failed"); }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={handle} className="flex flex-col gap-3">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2"/>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
          Remember me
        </label>
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
