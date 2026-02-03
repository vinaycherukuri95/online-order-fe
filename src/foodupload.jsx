import { useState } from "react";
import "./FoodUpload.css";

function FoodUpload() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [restaurantId, setRestaurantId] = useState(1);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("restaurantId", restaurantId);
    formData.append("image", image);

    const res = await fetch("http://localhost:8080/api/addFood", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Uploaded food:", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Food Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input type="number" placeholder="Restaurant ID" value={restaurantId} onChange={e => setRestaurantId(Number(e.target.value))} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Upload Food</button>
    </form>
  );
}

export default FoodUpload;
