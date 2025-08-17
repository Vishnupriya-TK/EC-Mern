import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name,setName]=useState(""); const [email,setEmail]=useState("");
  const [password,setPassword]=useState(""); const [err,setErr]=useState("");
  const { register } = useAuth(); const nav = useNavigate();

  const handle = async (e)=>{
    e.preventDefault();
    try { await register({ name, email, password }); nav("/"); }
    catch(e){ setErr(e.response?.data?.message || "Registration failed"); }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create account</h2>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={handle} className="flex flex-col gap-3">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="border p-2"/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2"/>
        <input type="password" placeholder="Password (min 6)" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2"/>
        <button className="bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
