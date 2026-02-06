import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./cart.css";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { userId } = useParams();
  const [cart, setCart] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!cart) return <p className="loading">Loading your cart...</p>;

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">🛒 My Cart</h2>

        {cart.items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.items.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="item-details">
                <h4 className="food-name">{item.food.name}</h4>
                <p className="qty">Quantity: {item.quantity}</p>
              </div>

              <div className="item-price">
                ₹{item.food.price * item.quantity}
              </div>
            </div>
          ))
        )}

        <div className="cart-summary">
          <h3>Total Amount</h3>
          <h2>₹{totalPrice}</h2>
          <button className="checkout-btn" onClick={() => navigate(`/checkout/${userId}`)}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
