import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth, updateToken } from './features/user';

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';
import MyNetworksPage from './pages/MyNetworksPage';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PostsMangement from './pages/PostsMangement';
import UserManagementPage from './pages/UserManagementPage';
import BlockedPage from './pages/BlockedPage';

import NotFoundPage from './pages/NotFoundPage';
import ReportedPage from './pages/ReportedPage';


function App() {
  const dispatch = useDispatch();
  const access = localStorage.getItem('access_token');

  useEffect(()=> {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(()=> {
    let thirtyMinutes = 1000 * 60 * 30
    let interval = setInterval(() => {
      if (access) {
        dispatch(updateToken());
      }
    }, thirtyMinutes)
    return () => clearInterval(interval);
  }, [dispatch, access])

  return (
    <Router>
      <Routes>
        <Route path='/' element={< LoginPage/>} />
        <Route path='/profile/:email' element={< Dashboard/>} />
        <Route path='/register' element={< RegisterPage/>} />
        <Route path='/about' element={< AboutPage/>} />
        <Route path='/home' element={< PostsPage/>} />
        <Route path='/network' element={< MyNetworksPage/>} />

        <Route path='/admin-login' element={< AdminLogin/>} />
        <Route path='/admin' element={< AdminDashboard/>} />
        <Route path='/admin/post' element={< PostsMangement/>} />
        <Route path='/admin/user' element={< UserManagementPage/>} />
        <Route path='/admin/blocked' element={< BlockedPage/>} />
        <Route path='/admin/reported' element={< ReportedPage/>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router> 
  );
}

export default App;
