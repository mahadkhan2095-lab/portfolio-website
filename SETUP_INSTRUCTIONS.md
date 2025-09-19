# Quick Setup Instructions

## Dependencies Fixed ✅
- Express.js backend dependencies installed
- Multer security issue resolved
- Django structure created

## Next Steps:

### 1. Install Python Dependencies (if Python available)
```bash
cd backend/django
pip install Django djangorestframework django-cors-headers pymongo python-dotenv requests
```

### 2. Start MongoDB
Download and install MongoDB Community Edition, then:
```bash
mongod --dbpath="C:\data\db"
```

### 3. Create Admin User
```bash
cd backend/express
node -e "
const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.connect('mongodb://localhost:27017/portfolio');
const user = new User({
  username: 'admin',
  email: 'admin@portfolio.com',
  password: 'admin123',
  role: 'admin'
});
user.save().then(() => {
  console.log('Admin user created');
  process.exit();
});
"
```

### 4. Start Services
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Express Backend
npm run backend:dev

# Terminal 3 - Django (optional)
npm run django:dev
```

### 5. Access Points
- Portfolio: http://localhost:3000
- Admin: http://localhost:3000/#/admin
- API: http://localhost:5000/api
- Django: http://localhost:8000 (if running)

### Login Credentials
- Email: admin@portfolio.com
- Password: admin123

## Current Status
✅ Frontend working
✅ Express backend ready
✅ MongoDB integration ready
⚠️ Django optional (requires Python)
✅ Admin dashboard ready
✅ Contact form with database storage