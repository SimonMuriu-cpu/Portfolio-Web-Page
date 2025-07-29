import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { BookOpen, User, Code, Mail, ShieldCheck } from 'lucide-react';

function HomePage() {
  return (
    <>
      <HelmetProvider>
        <title>Portfolio - Welcome to My Digital Space</title>
        <meta name="description" content="Welcome to my personal portfolio. Explore my projects, read my blog, and get to know me better." />
      </HelmetProvider>
      
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Portfolio
            </motion.h1>
            <motion.div 
              className="flex gap-6 items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/blog" className="text-white hover:text-purple-300 transition-colors">
                Blog
              </Link>
              <a href="#about" className="text-white hover:text-purple-300 transition-colors">
                About
              </a>
              <a href="#contact" className="text-white hover:text-purple-300 transition-colors">
                Contact
              </a>
               <Link to="/admin">
                <Button variant="ghost" className="text-white hover:text-purple-300 transition-colors">
                  <ShieldCheck className="mr-2 h-4 w-4" /> Admin
                </Button>
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Hello, I'm a Developer
                </h1>
              </div>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Welcome to my digital space where creativity meets code. 
                Explore my projects, thoughts, and journey in the world of development.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/blog">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Read My Blog
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                  <User className="mr-2 h-5 w-5" />
                  About Me
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                I'm passionate about creating beautiful, functional, and user-friendly applications. 
                My journey in development has been filled with continuous learning and exciting challenges.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <Code className="h-12 w-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Development</h3>
                <p className="text-gray-300">
                  Crafting clean, efficient code with modern technologies and best practices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <BookOpen className="h-12 w-12 text-pink-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Writing</h3>
                <p className="text-gray-300">
                  Sharing knowledge and experiences through thoughtful blog posts and tutorials.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <User className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Collaboration</h3>
                <p className="text-gray-300">
                  Working with teams to build amazing products and solve complex problems.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
              <p className="text-xl text-gray-300 mb-12">
                Have a project in mind or just want to chat? I'd love to hear from you!
              </p>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = 'mailto:hello@example.com'}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400">
              © 2024 Portfolio. Built with passion and code.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HomePage;