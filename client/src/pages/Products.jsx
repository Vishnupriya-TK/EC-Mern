import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <h3 className="font-semibold">{p.name}</h3>
            <p>{p.category}</p>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Products;
