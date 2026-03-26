import { useState } from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';  // 👈 Add BrowserRouter here
import { useUsers } from './data/users';
import UserTable from './components/UserTable';
import UserDetail from './components/UserDetail';
import './App.css';

function App() {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <UserTable
                users={filteredUsers}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
              />
            } 
          />
          <Route path="/user/:id" element={<UserDetail users={users} />} />
        </Routes>
      </main>
    </div>
  );
}

// 👈 NEW: Wrap App with basename
function Root() {
  return (
    <BrowserRouter basename="/user-directory">
      <App />
    </BrowserRouter>
  );
}

export default Root;
