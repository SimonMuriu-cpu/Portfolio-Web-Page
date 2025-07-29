import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import BlogPage from './blog/BlogPage'; 
import AdminLoginPage from "./pages/LoginPage"; // ✅ Used below as /admin
import BlogAdminDashboardPage from './blog/BlogAdminDashboardPage';
import BlogPostPage from './blog/BlogPostPage'; 
import LoginPage from './pages/LoginPage';
import BlogHomePage from './blog/BlogHomePage';
import EditPostPage from './blog/EditPostPage';
import BlogLoginPage from './blog/BlogLoginPage';
import CreatePostPage from './blog/CreatePostPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-500">
            <Navbar />
            <main className="pt-16">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog-post" element={<BlogPostPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/blog-home" element={<BlogHomePage />} />
                <Route path="/blog-login" element={<BlogLoginPage />} />

                {/* ✅ Admin Login Route (entry point to admin) */}
                <Route path="/admin" element={<AdminLoginPage />} />

                {/* ✅ Admin Protected Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/blog" element={
                  <ProtectedRoute>
                    <BlogAdminDashboardPage />
                  </ProtectedRoute>
                } />

                <Route path="/admin/create" element={
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                } />

                <Route path="/edit-post/:id" element={
                  <ProtectedRoute>
                    <EditPostPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
