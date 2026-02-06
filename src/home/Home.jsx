import { useEffect, useState } from "react";
import "./Home.css";
import bg from "../assets/home.jpg";

import { useNavigate } from "react-router-dom";


function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
const navigate = useNavigate();
  // Quantity state
  const [quantities, setQuantities] = useState({});

  // Image modal
  const [selectedImage, setSelectedImage] = useState(null);

  const userId = 1; // TEMP

  const addToCart = async (food) => {
    const qty = quantities[food.id] || 1;

    try {
      await fetch(
        `http://localhost:8080/api/cart/add?userId=${userId}&foodId=${food.id}&qty=${qty}`,
        { method: "POST" }
      );
      navigate(`/cart/${userId}`);

    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const increaseQty = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const decreaseQty = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1)
    }));
  };

  // load restaurants
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

  // load foods
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
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section>
        <h2>🍔 Food Items</h2>

        <div className="food-grid">
          {foods.map(f => (
            <div className="food-card" key={f.id}>
              <img
                src={`http://localhost:8080${f.imageUrl}`}
                alt={f.name}
                className="food-image"
                onClick={() =>
                  setSelectedImage(`http://localhost:8080${f.imageUrl}`)
                }
              />

              <h4>{f.name}</h4>
              <p>₹{f.price}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(f.id)}>-</button>
                <span>{quantities[f.id] || 1}</span>
                <button onClick={() => increaseQty(f.id)}>+</button>
              </div>

              <button
                className="add-cart-btn"
                onClick={() => addToCart(f)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Preview" />
        </div>
      )}
    </div>
  );
}

export default Home;
