import { useNavigate } from 'react-router-dom';

const UserTable = ({ users, loading, error, searchTerm, setSearchTerm, sortConfig, setSortConfig }) => {
  const navigate = useNavigate();

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
  // Fix: Handle null/undefined sortConfig.key
  if (!sortConfig.key) return 0;
  
  let aValue, bValue;
  
  if (sortConfig.key === 'company') {
    aValue = a.company?.name?.toLowerCase() || '';
    bValue = b.company?.name?.toLowerCase() || '';
  } else {
    aValue = a[sortConfig.key]?.toLowerCase() || '';
    bValue = b[sortConfig.key]?.toLowerCase() || '';
  }
  
  if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
  if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
  return 0;
});

  if (loading) return <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div></div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Search */}
      <div className="p-6 border-b">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('company')}>
                Company {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/user/${user.id}`)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedUsers.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-500">No users found</div>
      )}
    </div>
  );
};

export default UserTable;
