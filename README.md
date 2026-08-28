Markdown
# BELLA 💄

A modern, elegant e-commerce platform for skincare and beauty products. BELLA offers a curated selection of face care, sun care, body care, and hair care products with an interactive shopping experience.

🌐 **Live Demo:** [BELLA on Vercel](https://bella-murex.vercel.app)

## ✨ Features

- **Product Categories**
  - Face Care
  - Sun Care
  - Body Care
  - Hair Care

- **Interactive Shopping**
  - Browse products with detailed descriptions
  - Add/remove items from shopping cart
  - Save favorite items to wishlist
  - Real-time cart drawer

- **Smart Recommendations**
  - Skincare quiz to find products tailored to your skin type
  - Personalized product suggestions

- **User Experience**
  - Modern, responsive design with animated intro
  - Toast notifications for user feedback
  - Smooth navigation and page transitions
  - Mobile-optimized interface

- **State Management**
  - Cart management
  - Wishlist tracking
  - Authentication context
  - Toast notifications

## 🔒 Protected Actions (Non-Invasive Flow)

BELLA uses a non-invasive, event-driven architecture to intercept actions that require authentication (like "Add to Cart" or "Add to Wishlist") without polluting core context APIs.

**Behavior:**
1. User clicks an action (e.g., Add to Cart) while logged out.
2. The `useProtectedAction` hook intercepts it, stores the pending action in `sessionStorage`, and dispatches an `'open-auth-modal'` CustomEvent.
3. The `<Navbar />` listens to the event and triggers the Auth modal.
4. Upon successful login, `<Navbar />` automatically calls `resumePendingAction()` to read from storage and execute the queued action instantly.

**Storage Shape (`sessionStorage['bella_pending_action']`):**
```json
{
  "type": "ADD_TO_CART",
  "payload": { "id": "prod-1", "name": "Cream" },
  "createdAt": 1700000000000
}
```

**Testing Scenarios (Unit/Integration):**
- *TTL Expiry*: Mock `createdAt` to >1 hour ago. Verify action is discarded.
- *Duplicate Execution*: Verify `sessionStorage.removeItem` is called *before* execution to prevent React strict-mode double firing.
- *Bypass*: Verify logged-in users trigger the action synchronously without modal overhead.
- *Cancel Modal*: Verify closing the modal simply leaves the action in storage until TTL expires or login occurs later.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.8
- **Routing:** React Router DOM 7.18.2
- **Build Tool:** Vite 8.2.2
- **HTTP Client:** Axios 1.20.0
- **Code Quality:** Oxlint 1.79.0
- **Styling:** CSS3 with modern animations

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/Kenzywaheed/BELLA.git
cd BELLA
Install dependencies
bash
npm install
Start the development server
bash
npm run dev
The application will be available at http://localhost:5173

📝 Available Scripts
bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter (Oxlint)
npm run lint

# Preview production build locally
npm run preview
📁 Project Structure
Code
BELLA/
├── public/                 # Static assets
│   ├── bella.mp4          # Intro video
│   ├── bella-removebg-preview.png
│   └── logo.png
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CartDrawer.jsx
│   │   └── Toast.jsx
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── FaceCarePage.jsx
│   │   ├── SunCarePage.jsx
│   │   ├── BodyCarePage.jsx
│   │   ├── HairCarePage.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   └── SkincareQuiz.jsx
│   ├── context/           # React Context for state management
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── ToastContext.jsx
│   ├── api/               # API integration
│   ├── data/              # Static data/products
│   ├── assets/            # Images and media files
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   ├── index.css          # Global styles
│   └── App.css            # App-specific styles
├── index.html             # HTML template
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── .oxlintrc.json        # Oxlint configuration
🎨 Key Components
Navbar
Main navigation component providing access to all product categories and user features.

Cart & Wishlist
Dedicated pages and drawer components for managing shopping cart and saved items.

Product Details
Detailed product page with specifications, reviews, and add-to-cart functionality.

Skincare Quiz
Interactive quiz to help users find products suitable for their skin type.

Toast Notifications
Real-time feedback system for user actions.

🔄 State Management
The app uses React Context API for global state management:

AuthContext: User authentication state
CartContext: Shopping cart items and operations
WishlistContext: Saved favorite products
ToastContext: Notification messages
🎯 User Journey
Landing → Animated intro video/image
Browsing → Explore product categories
Selection → View product details and add to cart/wishlist
Discovery → Take skincare quiz for personalized recommendations
Checkout → Review cart and proceed to purchase
Wishlist → Access saved items for later
🚀 Deployment
The project is configured to deploy on Vercel:

bash
npm run build
# Upload the dist folder to your hosting platform
📱 Responsive Design
Desktop: Full video intro with smooth animations
Mobile: Optimized image intro (0.5s duration)
Tablets: Adaptive layouts for intermediate screen sizes
🔧 Configuration
Vite Config
Located in vite.config.js - configured with React support

Linting
Oxlint configuration in .oxlintrc.json for code quality assurance

🤝 Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

📄 License
This project is private. For licensing inquiries, please contact the repository owner.

👤 Author
Kenzy Waheed

GitHub: @Kenzywaheed
🔗 Links
Live Site: BELLA
Repository: GitHub - BELLA
Made with ❤️ by Kenzy Waheed

Code

## How to Add This README

1. Go to [https://github.com/Kenzywaheed/BELLA](https://github.com/Kenzywaheed/BELLA)
2. Click **Add file** → **Create new file**
3. Name it `README.md`
4. Paste the content above
5. Click **Commit changes**

The README covers everything about your beautiful skincare e-commerce platform, including features, setup instructions, project structure, and deployment information!
