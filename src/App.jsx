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
import AdminLoginPage from "./pages/LoginPage";
import BlogAdminDashboardPage from './blog/BlogAdminDashboardPage';
import BlogPostPage from './blog/BlogPostPage'; 
import LoginPage from './pages/LoginPage';
import BlogHomePage from './blog/BlogHomePage';
import EditPostPage from './blog/EditPostPage';
import CreatePostPage from './blog/CreatePostPage';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPost from './blog/BlogPost';
import Layout from '@/components/Layout'; // Import the Layout component

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-500">
            <Navbar />
            <main className="pt-16">
              <Routes>
                {/* Public Routes - Wrapped with Layout for tracking */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/projects" element={<Layout><Projects /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
                <Route path="/blog-post" element={<Layout><BlogPostPage /></Layout>} />
                <Route path="/login" element={<Layout><LoginPage /></Layout>} />
                <Route path="/blog-home" element={<Layout><BlogHomePage /></Layout>} />
                <Route path="/blog/:postId" element={<Layout><BlogPost /></Layout>} />

                {/* ✅ Admin Login Route (entry point to admin) */}
                <Route path="/admin" element={<Layout><AdminLoginPage /></Layout>} />

                {/* ✅ Admin Protected Routes - Also wrapped with Layout */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminDashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/blog" element={
                  <ProtectedRoute>
                    <Layout>
                      <BlogAdminDashboardPage />
                    </Layout>
                  </ProtectedRoute>
                } />

                <Route path="/admin/create" element={
                  <ProtectedRoute>
                    <Layout>
                      <CreatePostPage />
                    </Layout>
                  </ProtectedRoute>
                } />

                <Route path="/edit-post/:id" element={
                  <ProtectedRoute>
                    <Layout>
                      <EditPostPage />
                    </Layout>
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