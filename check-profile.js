const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio');

const settingsSchema = new mongoose.Schema({
  key: String,
  value: mongoose.Schema.Types.Mixed
});

const Settings = mongoose.model('Settings', settingsSchema);

async function checkProfile() {
  try {
    const profileImage = await Settings.findOne({ key: 'profileImage' });
    if (profileImage) {
      console.log('✅ Profile image found in database');
      console.log('Key:', profileImage.key);
      console.log('Image size:', profileImage.value.length, 'characters');
      console.log('Image starts with:', profileImage.value.substring(0, 50) + '...');
    } else {
      console.log('❌ No profile image found in database');
    }
    
    // Show all settings
    const allSettings = await Settings.find({});
    console.log('\n📋 All settings in database:');
    allSettings.forEach(setting => {
      if (setting.key === 'profileImage') {
        console.log(`- ${setting.key}: [Image data - ${setting.value.length} chars]`);
      } else {
        console.log(`- ${setting.key}: ${setting.value}`);
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkProfile();