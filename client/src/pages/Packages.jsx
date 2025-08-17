import { useEffect, useState } from "react";
import axios from "axios";

function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/packages")
      .then(res => setPackages(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Travel Packages</h2>
      <div className="grid grid-cols-2 gap-4">
        {packages.map(pkg => (
          <div key={pkg._id} className="border p-4 rounded">
            <h3 className="font-semibold">{pkg.name}</h3>
            <p>{pkg.type}</p>
            <p>{pkg.description}</p>
            <p>${pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Packages;
