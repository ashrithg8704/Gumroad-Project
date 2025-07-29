# 🛒 Gumroad Clone - Digital Marketplace

A full-stack digital marketplace application built with React, Node.js, Express, and MongoDB. Users can create, upload, and sell digital products in a marketplace environment.

## 🚀 Features

- **User Authentication**: Secure signup/signin with JWT tokens
- **Product Management**: Create, update, delete digital products
- **File Upload**: Support for product images and files
- **Marketplace**: Browse and purchase digital products
- **Dashboard**: Manage your products and view sales
- **Responsive Design**: Modern UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **JWT** - JSON Web Tokens for authentication
- **CORS** - Cross-origin resource sharing
- **Zod** - Schema validation

## 📁 Project Structure

```
Gumroad Project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── main.jsx        # App entry point
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── routes/             # API route handlers
│   ├── middlewares/        # Custom middleware
│   ├── public/             # File uploads storage
│   │   ├── imageUploads/   # Product images
│   │   └── fileUploads/    # Product files
│   ├── db.js              # Database models
│   └── index.js           # Server entry point
└── README.md              # Project documentation
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Gumroad Project"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Ensure MongoDB is running on `mongodb://localhost:27017/Gumroad`

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   node index.js
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/signin` - User login

### Products
- `PUT /api/v1/product/new-product` - Create new product
- `GET /api/v1/product/bulk` - Get user's products
- `PUT /api/v1/product/update-product/:id` - Update product
- `DELETE /api/v1/product/delete-product/:id` - Delete product

### Marketplace
- `GET /api/v1/marketplace/bulk` - Get all published products
- `POST /api/v1/marketplace/publish-product/:id` - Publish product to marketplace

### File Upload
- `POST /api/v1/image/upload` - Upload product images
- `POST /api/v1/file/upload` - Upload product files
- `GET /uploads/:filename` - Serve uploaded images

## 🗄️ Database Schema

### User
```javascript
{
  username: String (unique),
  password: String,
  fullName: String
}
```

### Product
```javascript
{
  userId: ObjectId,
  products: [{
    productName: String,
    productDescription: String,
    productThumbnail: String,
    productFile: String,
    price: Number,
    sales: Number,
    revenue: Number,
    published: Boolean
  }]
}
```

### PublishedProducts
```javascript
{
  productId: String,
  productOwner: String,
  productName: String,
  productDescription: String,
  productThumbnail: String,
  price: Number,
  sales: Number
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://localhost:27017/Gumroad
PORT=3000
```

### File Upload Configuration
- Images are stored in `backend/public/imageUploads/`
- Product files are stored in `backend/public/fileUploads/`
- Maximum file size: Default multer limits
- Supported image formats: All image types
- Files are renamed with timestamp prefix

## 🎨 UI Components

### Pages
- **Signup/Signin** - User authentication
- **Dashboard** - Product management interface
- **Create Product** - Product creation form with file uploads
- **Update Product** - Product editing interface
- **Marketplace** - Browse all published products

### Components
- **Navbar** - Navigation with authentication state
- **ProductCard** - Reusable product display component

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or ensure MongoDB is accessible
2. Update database connection string
3. Set environment variables
4. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Image caching may require hard refresh after uploads
- File upload size limits are set to default multer values
- No payment integration (placeholder for future implementation)

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search and filtering
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Social media integration
