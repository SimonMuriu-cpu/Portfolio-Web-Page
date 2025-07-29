import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Server, Palette, GraduationCap, Calendar } from 'lucide-react';

const About = () => {
  const skills = {
    frontend: [
      { name: 'React.js', level: 95, color: 'from-blue-500 to-cyan-500' },
      { name: 'JavaScript', level: 90, color: 'from-yellow-500 to-yellow-600' },
      { name: 'Next.js', level: 85, color: 'from-gray-700 to-gray-900' },
      { name: 'Tailwind CSS', level: 92, color: 'from-cyan-500 to-teal-500' },
      { name: 'Vue.js', level: 80, color: 'from-green-500 to-emerald-500' },
    ],
    backend: [
      { name: 'Node.js', level: 90, color: 'from-green-600 to-green-700' },
      { name: 'Express.js', level: 88, color: 'from-gray-600 to-gray-700' },
      { name: 'MongoDB', level: 85, color: 'from-green-500 to-green-600' },
      { name: 'PostgreSQL', level: 80, color: 'from-blue-600 to-indigo-600' },
      { name: 'Python', level: 75, color: 'from-yellow-500 to-yellow-600' },
    ],
    tools: [
      { name: 'Git & GitHub', level: 95, color: 'from-purple-600 to-purple-700' },
      { name: 'Docker', level: 78, color: 'from-blue-500 to-blue-600' },
      { name: 'AWS', level: 70, color: 'from-orange-500 to-orange-600' },
      { name: 'Figma', level: 85, color: 'from-pink-500 to-purple-500' },
      { name: 'VS Code', level: 98, color: 'from-blue-600 to-blue-700' },
    ],
  };

  const education = [
    {
      degree: 'Bachelor of Commerce (BCOM)',
      school: 'Technical University of Mombasa',
      period: '2013 - 2017',
      description: 'A Bachelor’s degree focusing on business management with a specialization in Mnagement Science',
    },
    {
      degree: 'Web Design Certification',
      school: 'FreeCodeCamp',
      period: '2023',
      description: 'Comprehensive certification in web design (HTML and CSS',
    },
    {
      degree: 'Full Stack MERN Development',
      school: 'Power Learn Project',
      period: '2025',
      description: 'Advanced software development course with a specialization in the MERN stack (MongoDB, Express.js, React.js, Node.js)',
    },
    {
      degree: 'Professional Foundations',
      school: 'ALX Africa',
      period: '2025',
      description: 'A world-class trainign on essential commication, teamwork, and leadership skills designed for young tech professionals to help then excel in their careers.',
    },
    {
      degree: 'Python and Django for Back-End Web Development',
      school: 'ALX Africa',
      period: '2025-2026',
      description: 'Advanced back-end web development course (Python and Django) for developing robust back-end systems and dynamic web applications)',
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
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm Simon, a Professional Full-Stack MERN Developer with a passion for solving complex problems through clean, intuitive tech. 
            I specialize in building sleek, functional web apps and am currently expanding my backend skills with Python and Django. I love turning chaos into code—and crafting simple, beautiful solutions that just work.
          </p>
        </motion.div>

        {/* Personal Story */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Journey</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I began my professional journey as a freelance researcher and writer, driven by a love for deep thinking and clear communication. But when AI technology began reshaping the creative landscape, I saw an opportunity—not a threat.
              Instead of resisting change, I embraced it.<br/> 
              Curious about how I could build with the tools that were transforming my field, I took my first steps into tech through web design with freeCodeCamp. That exploration led me to the world of Full-Stack Development with the MERN stack, where I now build modern, responsive web applications that solve real problems with clarity and efficiency.
              Currently, I’m diving deeper into backend development with Python and Django, sharpening my ability to build scalable systems and APIs.<br/>
              Through this transition, I’ve developed a strong belief: AI shouldn't replace human creativity—it should amplify it. I continuously explore ways to integrate AI tools into my workflow to speed up processes, enhance ideas, and bring better solutions to life faster.
              This journey isn't just about code—it's also about creating elegant, meaningful technology that supports and enhances the human experience.
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Technical Skills</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend Skills */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Frontend</h3>
              </div>
              
              <div className="space-y-4">
                {skills.frontend.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Backend</h3>
              </div>
              
              <div className="space-y-4">
                {skills.backend.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tools & Others</h3>
              </div>
              
              <div className="space-y-4">
                {skills.tools.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.1 + 0.9, duration: 0.8 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.9, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Education</h2>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{edu.degree}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{edu.school}</p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{edu.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;