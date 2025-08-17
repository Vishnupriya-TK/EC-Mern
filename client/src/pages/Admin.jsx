import { useEffect, useState } from "react";
import api from "../api";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:"", category:"", price:"", image:"" });
  const load = async () => setItems((await api.get("/products")).data);

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("/products", { ...form, price: Number(form.price) });
    setForm({ name:"", category:"", price:"", image:"" });
    load();
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-3">Admin: Manage Products</h2>
      <form onSubmit={add} className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="border p-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/>
        <input className="border p-2" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
        <input className="border p-2" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form, image:e.target.value})}/>
        <button className="bg-gray-900 text-white px-4 rounded">Add</button>
      </form>

      <ul className="grid grid-cols-3 gap-3">
        {items.map(p => (
          <li key={p._id} className="border p-3 rounded">
            <img src={p.image} className="w-full h-32 object-cover" />
            <div className="font-semibold">{p.name}</div>
            <div>{p.category} • ${p.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
