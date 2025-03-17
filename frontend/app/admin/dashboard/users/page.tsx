"use client"
import { useState } from "react";
import { Pencil, Trash2, Ban, CheckCircle } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  phone: number;
  password: string;
  isBlocked: boolean;
}

const usersData: User[] = [
  { id: 1, username: "John Doe", email: "john@example.com", phone: 9876543210, password: "****", isBlocked: false },
  { id: 2, username: "Alice", email: "alice@example.com", phone: 9988776655, password: "****", isBlocked: true },
  { id: 3, username: "Bob", email: "bob@example.com", phone: 8877665544, password: "****", isBlocked: false },
];

const UserTable =()=> {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleBlock = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
    ));
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="bg-[#151c2c] text-white p-5 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 rounded-md bg-[#1f2a40] text-white border-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#1f2a40] text-white">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-[#1f2a40]">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  {user.isBlocked ? (
                    <span className="text-red-500">Blocked</span>
                  ) : (
                    <span className="text-green-500">Active</span>
                  )}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    className={`px-2 ${
                      user.isBlocked ? "text-green-400 hover:text-green-500" : "text-red-400 hover:text-red-500"
                    }`}
                    onClick={() => toggleBlock(user.id)}
                  >
                    {user.isBlocked ? <CheckCircle size={18} /> : <Ban size={18} />}
                  </button>
                  <button className="text-yellow-400 hover:text-yellow-500 px-2">
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500 px-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white p-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}


export default UserTable;