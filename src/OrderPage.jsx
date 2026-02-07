import React, { useEffect, useState } from "react";
import "./OrderPage.css";

function OrderPage() {
  const userId = 1;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/place/${userId}`,
        { method: "POST" }
      );
     

      if (response.ok) {
        const data = await response.json();
        setOrders((prev) => [...prev, data]);
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${userId}`
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
   

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-page">
      <div className="order-header">
        <h2>📦 My Orders</h2>
        <button
          className="place-order-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <span className={`status ${order.status?.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
