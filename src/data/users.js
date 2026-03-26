import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading, error };
};
