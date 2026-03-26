import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../data/users';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();

  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-8 py-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Info</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Phone:</span> {user.phone}</p>
            <p><span className="font-medium">Website:</span> {user.website}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm">{user.address.street}, {user.address.suite}</p>
            <p className="text-sm font-medium">{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Company</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">{user.company.name}</p>
            <p className="text-sm text-gray-600">{user.company.catchPhrase}</p>
            <p className="text-sm font-medium">{user.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
