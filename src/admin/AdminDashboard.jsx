import "./AdminDashboard.css";

function AdminDashboard({ setPage }) {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🛠 Admin Dashboard</h1>
        <p>Manage restaurants, food items & users</p>
      </div>

      <div className="admin-cards">
        
        {/* Add Restaurant */}
        <div
          className="admin-card"
          onClick={() => setPage("addRestaurant")}
        >
          <span className="icon">🏪</span>
          <h3>Add Restaurant</h3>
          <p>Create and manage restaurants</p>
        </div>

        {/* Add Food */}
        <div
          className="admin-card"
         // onClick={() => setPage("foodupload")}
        >
          <span className="icon">🍔</span>
          <h3>Add Food</h3>
          <p>Add food items to restaurants</p>
        </div>

        {/* View Users */}
        <div
          className="admin-card"
         // onClick={() => setPage("users")}
        >
          <span className="icon">👥</span>
          <h3>View Users</h3>
          <p>See all registered users</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
