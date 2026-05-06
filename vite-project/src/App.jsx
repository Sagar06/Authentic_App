import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://api.freeapi.app/api/v1/users';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/current-user`, {
        headers: { 'accept': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      console.error('Auth check failed');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const clearMessage = () => setMessage({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessage();

    const endpoint = isLogin ? '/login' : '/register';
    const body = isLogin 
      ? { username: formData.username, password: formData.password } 
      : { ...formData, role: 'ADMIN' };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        if (isLogin) {
          setMessage({ type: 'success', text: 'Login successful!' });
          setUser(data.data.user || data.data); // Adjust based on actual response
          // Fetch full user data to be sure
          const userProfile = await fetch(`${API_BASE_URL}/current-user`).then(r => r.json());
          if (userProfile.success) setUser(userProfile.data);
        } else {
          setMessage({ type: 'success', text: 'Registration successful! Please login.' });
          setIsLogin(true);
        }
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: { 'accept': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setUser(null);
        setMessage({ type: 'success', text: 'Logged out successfully' });
      }
    } catch (error) {
      console.error('Logout failed');
    }
  };

  if (initialLoading) {
    return (
      <div className="screen center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!user ? (
        <div className="screen">
          <div className="auth-card">
            <div className="auth-header">
              <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p>{isLogin ? 'Login to your account to continue' : 'Join us and start your journey'}</p>
            </div>

            <div className="auth-tabs">
              <button 
                className={`tab-btn ${isLogin ? 'active' : ''}`} 
                onClick={() => { setIsLogin(true); clearMessage(); }}
              >
                Login
              </button>
              <button 
                className={`tab-btn ${!isLogin ? 'active' : ''}`} 
                onClick={() => { setIsLogin(false); clearMessage(); }}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                      type="text" 
                      id="username" 
                      placeholder="johndoe" 
                      value={formData.username}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </>
              )}

              {isLogin && (
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    placeholder="johndoe" 
                    value={formData.username}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              {message.text && (
                <div className={`${message.type}-msg`}>
                  {message.text}
                </div>
              )}

              <button type="submit" className="primary-btn" disabled={isLoading}>
                {isLoading ? (
                  <div className="btn-loader"></div>
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="screen">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar">{user.username?.charAt(0).toUpperCase()}</div>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
            
            <div className="profile-info">
              <div className="info-item">
                <span className="label">User ID</span>
                <span className="value">{user._id}</span>
              </div>
              <div className="info-item">
                <span className="label">Role</span>
                <span className="value badge">{user.role}</span>
              </div>
            </div>

            <button onClick={handleLogout} className="secondary-btn">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
