const mongoose = require('mongoose');
const Project = require('./models/Project');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio');

const seedProjects = async () => {
  try {
    // Clear existing projects
    await Project.deleteMany({});
    
    // Add your existing projects
    const projects = [
      {
        title: 'Facebook Login Page',
        description: 'A pixel-perfect replica of Facebook\'s login page built with modern web technologies. Features responsive design, form validation, and authentic styling that matches the original interface.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        images: ['/images/facebook-project.jpg'],
        liveUrl: 'https://your-facebook-replica.com',
        githubUrl: 'https://github.com/yourusername/facebook-replica',
        featured: true,
        category: 'web',
        status: 'completed'
      },
      {
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, contact forms, project showcases, and admin dashboard for content management.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
        images: ['/images/portfolio-project.jpg'],
        liveUrl: 'https://your-portfolio.com',
        githubUrl: 'https://github.com/yourusername/portfolio',
        featured: true,
        category: 'web',
        status: 'completed'
      }
    ];
    
    // Insert projects
    await Project.insertMany(projects);
    console.log('✅ Projects seeded successfully!');
    console.log(`Added ${projects.length} projects to database`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
};

seedProjects();