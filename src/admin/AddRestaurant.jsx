import { useState } from "react";
import { Link } from "react-router-dom";
import "./AddRestaurant.css";

function AddRestaurant() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      alert("Please enter restaurant name");
      return;
    }

    setLoading(true);
    await fetch("http://localhost:8080/api/admin/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    setLoading(false);

    alert("✅ Restaurant added successfully");
    setName("");
  };

  return (
    <div className="add-restaurant-page">
      <div className="add-restaurant-card">
        <h2>🏪 Add New Restaurant</h2>
        <p className="subtitle">
          Enter restaurant details below
        </p>

        <input
          className="input-field"
          placeholder="Restaurant Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Restaurant"}
        </button>

        <Link to="/admin" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AddRestaurant;
