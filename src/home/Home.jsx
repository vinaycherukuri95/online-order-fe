import { useEffect, useState } from "react";
import "./Home.css";
import bg from "./assets/home.jpg";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Load restaurants on page load
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        if (data.length > 0) {
          setSelectedRestaurant(data[0].id);
        }
      });
  }, []);

  // Load foods when restaurant changes
  useEffect(() => {
    if (selectedRestaurant) {
      fetch(`http://localhost:8080/api/foods/${selectedRestaurant}`)
        .then(res => res.json())
        .then(data => setFoods(data));
    }
  }, [selectedRestaurant]);

  return (
    <div
      className="home-container"
      style={{
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section>
        <h2>🍽️ Restaurants</h2>
        <select
          value={selectedRestaurant || ""}
          onChange={(e) => setSelectedRestaurant(Number(e.target.value))}
          className="restaurant-dropdown"
        >
          {restaurants.map(r => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </section>

        <section>
        <h2>🍔 Food Items</h2>
        <div className="food-grid">
          {foods.map(f => (
            <div className="food-card" key={f.id}>
              
          <img
  src={`http://localhost:8080${f.imageUrl}`}
  alt={f.name}
  className="food-image"
  loading="lazy"
  onError={(e) => { e.target.src = "/no-image.png"; }}
/>

              <h4>{f.name}</h4>
              <p>₹{f.price}</p>
              <button className="add-cart-btn">Add to Cart</button>
            </div>
          ))}
          {foods.length === 0 && <p>No items available.</p>}
        </div>
      </section>
    </div>
  );
}

export default Home;
