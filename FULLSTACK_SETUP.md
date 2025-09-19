# Full-Stack Portfolio Setup Guide

## Overview
Your portfolio now includes:
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js + MongoDB
- **AI Features**: Django + Python
- **Database**: MongoDB for data persistence
- **Authentication**: JWT-based admin system

## Quick Start

### 1. Install Dependencies
```bash
npm run setup
```

### 2. Start MongoDB
```bash
# Install MongoDB Community Edition first
# Then start the service
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

### 4. Start All Services
```bash
npm run full:dev
```

This starts:
- Frontend: http://localhost:3000
- Express API: http://localhost:5000
- Django API: http://localhost:8000

## New Features Added

### 1. Contact Management
- All contact form submissions saved to MongoDB
- Admin dashboard to view and manage contacts
- Email notifications still work via Web3Forms
- Contact analytics and reporting

### 2. Admin Dashboard
- Access: http://localhost:3000/#/admin
- Login: admin@portfolio.com / admin123
- View contact statistics
- Manage contact status (new/read/replied)
- Real-time dashboard updates

### 3. Dynamic Project Management
- Projects stored in database
- Admin can add/edit projects
- Featured project management
- Category-based filtering

### 4. User Authentication
- JWT-based authentication
- Admin and client roles
- Secure API endpoints
- Session management

### 5. Analytics & Insights
- Contact form analytics
- Visitor engagement metrics
- Performance tracking
- Data visualization ready

## API Endpoints

### Contacts
- `POST /api/contacts` - Create contact
- `GET /api/contacts` - Get all contacts (admin)
- `PUT /api/contacts/:id` - Update contact status

### Projects
- `GET /api/projects` - Get projects
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create user (admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/contacts` - Paginated contacts

### Analytics
- `GET /api/analytics/contacts` - Contact analytics

## Database Schema

### Contacts Collection
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  status: 'new' | 'read' | 'replied',
  createdAt: Date,
  repliedAt: Date,
  notes: String
}
```

### Projects Collection
```javascript
{
  title: String,
  description: String,
  technologies: [String],
  images: [String],
  liveUrl: String,
  githubUrl: String,
  featured: Boolean,
  category: 'web' | 'mobile' | 'ai' | 'other',
  status: 'completed' | 'in-progress' | 'planned',
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: 'admin' | 'client',
  isActive: Boolean,
  createdAt: Date,
  lastLogin: Date
}
```

## Environment Variables

### Express (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=mahadkhan2095@gmail.com
EMAIL_PASS=your-app-password
WEB3FORMS_KEY=3e6d8513-9998-469d-8615-272bc72927da
```

### Django (.env)
```
DJANGO_SECRET_KEY=your-django-secret-key
DEBUG=True
MONGODB_URI=mongodb://localhost:27017/portfolio
```

## Deployment Considerations

### Production Setup
1. **Database**: Use MongoDB Atlas for cloud database
2. **Backend**: Deploy Express.js to Heroku/Railway/DigitalOcean
3. **Django**: Deploy to separate service for AI features
4. **Frontend**: Deploy to Vercel/Netlify with API URLs updated
5. **Environment**: Update all environment variables for production

### Security
- Change all default passwords
- Use strong JWT secrets
- Enable CORS only for your domain
- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization

## Benefits of Full-Stack Setup

1. **Data Persistence**: All contacts and projects saved permanently
2. **Admin Control**: Manage content without code changes
3. **Analytics**: Track visitor engagement and contact patterns
4. **Scalability**: Handle thousands of visitors and contacts
5. **Professional**: Client portals and project management capabilities
6. **SEO**: Dynamic content and meta tags
7. **Performance**: Optimized database queries and caching

## Maintenance

### Regular Tasks
- Monitor database size and performance
- Backup contact data regularly
- Update dependencies monthly
- Review and respond to contacts
- Update project portfolio

### Monitoring
- Check server logs for errors
- Monitor API response times
- Track database performance
- Review contact analytics

Your portfolio is now a professional full-stack application ready for business use!