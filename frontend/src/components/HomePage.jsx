import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                EventHub
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">Welcome, {user?.name}</span>
                  <Link
                    to={
                      user?.role === 'admin' 
                        ? '/admin/dashboard' 
                        : user?.role === 'organizer' 
                        ? '/organizer/dashboard' 
                        : '/dashboard'
                    }
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to EventHub
            </h1>
            
            {!isAuthenticated && (
              <div className="space-y-4">
                <p className="text-lg text-gray-600 mb-8">
                  Please login or register to access your dashboard
                </p>
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
            
            {isAuthenticated && (
              <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Your Account</h2>
                <div className="text-left space-y-2">
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Role:</strong> {user?.role}</p>
                </div>
                <Link
                  to={
                    user?.role === 'admin' 
                      ? '/admin/dashboard' 
                      : user?.role === 'organizer' 
                      ? '/organizer/dashboard' 
                      : '/dashboard'
                  }
                  className="mt-4 block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;