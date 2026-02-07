import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./checkout.css";


const Checkout = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:8080/api/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCart(data));
  }, [userId]);

  if (!cart) return <p className="loading">Loading checkout...</p>;

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  const placeOrder = async () => {

    try {
      await fetch("http://localhost:8080/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          paymentMethod: "COD"
        })
      });

      navigate(`/order-success/${userId}`);
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>🧾 Checkout</h2>

     

        {/* Order Summary */}
        <div className="section">
          <h3>Order Summary</h3>
          {cart.items.map(item => (
            <div className="summary-item" key={item.id}>
              <span>
                {item.food.name} × {item.quantity}
              </span>
              <span>₹{item.food.price * item.quantity}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{totalPrice}</strong>
          </div>
        </div>

        {/* Payment */}
        <div className="section">
          <h3>Payment Method</h3>
          <p>💵 Cash on Delivery</p>
        </div>

        <button className="place-order-btn" onClick={() => navigate(`/orders/${userId}`)}> 
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
