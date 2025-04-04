import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, UserPlus, Palette } from 'lucide-react';
import { Dashboard } from './components/Dashboard';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    setIsAuthenticated(true);
    console.log('Login:', loginData);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // In a real app, you would create the user account here
    setIsAuthenticated(true);
    console.log('Signup:', signupData);
  };

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="md:w-1/2 p-8 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
            alt="Interior Design"
            className="rounded-xl h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Auth Forms */}
        <div className="md:w-1/2 p-8">
          <div className="flex items-center justify-center mb-8 gap-2">
            <Palette className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">RoomID</h1>
          </div>

          {isLogin ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogIn size={20} />
                Login
              </button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlus size={20} />
                Sign Up
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;