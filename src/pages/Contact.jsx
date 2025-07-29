import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace these with your EmailJS values
    const serviceID = 'service_e7fgjoh';
    const templateID = 'template_17ah7yd';
    const userID = 'vhwR4w1tiTou9cxcA';

    emailjs.send(serviceID, templateID, formData, userID)
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch(() => {
        setIsSubmitting(false);
        alert('Failed to send message. Please try again.');
      });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'muriumsimon6@gmail.com',
      href: 'mailto:muriumsimon6@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 718391802',
      href: 'tel:+254718391802',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nairobi, Kenya',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/SimonMuriu-cpu',
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/simon-muriu-7b3645106/',
      color: 'hover:text-blue-600',
    },
    {
      icon: ExternalLink,
      label: 'Upwork',
      href: 'https://www.upwork.com/freelancers/~01d979a621275467be?mp_source=share',
      color: 'hover:text-green-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat about technology.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white group-hover:shadow-lg transition-shadow">
                      <contact.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
                      <p className="text-gray-900 dark:text-white font-medium">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Hire Me CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white"
              >
                <h3 className="text-lg font-semibold mb-2">Available for Hire</h3>
                <p className="text-blue-100 mb-4">
                  Looking for a dedicated full-stack developer? I'm available for freelance projects and full-time opportunities.
                </p>
                <a
                  href="https://www.upwork.com/freelancers/~01d979a621275467be?mp_source=share"
                  className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Upwork Profile
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h2>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-700 dark:text-green-300">Message sent successfully! I'll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                      placeholder="Type your email..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors"
                    placeholder="Project discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;