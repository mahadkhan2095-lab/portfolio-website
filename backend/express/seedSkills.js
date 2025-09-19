const mongoose = require('mongoose');
const Skill = require('./models/Skill');

mongoose.connect('mongodb://localhost:27017/portfolio');

const seedSkills = async () => {  
  try {
    await Skill.deleteMany({});
    
    const skills = [
      // Frontend
      { name: 'React', category: 'frontend', proficiency: 95, color: '#61DAFB', order: 1 },
      { name: 'TypeScript', category: 'frontend', proficiency: 90, color: '#3178C6', order: 2 },
      { name: 'JavaScript', category: 'frontend', proficiency: 95, color: '#F7DF1E', order: 3 },
      { name: 'HTML5', category: 'frontend', proficiency: 95, color: '#E34F26', order: 4 },
      { name: 'CSS3', category: 'frontend', proficiency: 90, color: '#1572B6', order: 5 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, color: '#06B6D4', order: 6 },
      
      // Backend
      { name: 'Node.js', category: 'backend', proficiency: 85, color: '#339933', order: 7 },
      { name: 'Express.js', category: 'backend', proficiency: 80, color: '#000000', order: 8 },
      { name: 'Python', category: 'backend', proficiency: 75, color: '#3776AB', order: 9 },
      { name: 'Django', category: 'backend', proficiency: 70, color: '#092E20', order: 10 },
      
      // Database
      { name: 'MongoDB', category: 'database', proficiency: 80, color: '#47A248', order: 11 },
      { name: 'MySQL', category: 'database', proficiency: 75, color: '#4479A1', order: 12 },
      
      // Tools
      { name: 'Git', category: 'tools', proficiency: 85, color: '#F05032', order: 13 },
      { name: 'VS Code', category: 'tools', proficiency: 90, color: '#007ACC', order: 14 },
      { name: 'Vite', category: 'tools', proficiency: 80, color: '#646CFF', order: 15 },
      
      // UI/UX
      { name: 'Responsive Design', category: 'ui-ux', proficiency: 90, color: '#FF6B6B', order: 16 },
      { name: 'User Experience', category: 'ui-ux', proficiency: 85, color: '#4ECDC4', order: 17 }
    ];
    
    await Skill.insertMany(skills);
    console.log('✅ Skills seeded successfully!');
    console.log(`Added ${skills.length} skills to database`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding skills:', error);
    process.exit(1);
  }
};

seedSkills();