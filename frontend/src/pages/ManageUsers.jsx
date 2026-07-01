import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import {
  getUsers,
  searchUsers,
  deleteUser,
} from "../services/userService";
function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSearch = async () => {
    if (!search.trim()) {
      fetchUsers();
      return;
    }
    try {
      const res = await searchUsers(search);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?"))
      return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h1>Manage Users</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
          <button
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="btn btn-secondary"
            onClick={fetchUsers}
          >
            Reset
          </button>
        </div>
        {users.map((user) => (
          <div
            key={user._id}
            className="card shadow-sm mb-3"
          >
            <div className="card-body">
              <h5>{user.name}</h5>
              <p>
                <strong>Email:</strong>{" "}
                {user.email}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {user.role}
              </p>
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleDelete(user._id)
                }
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageUsers;