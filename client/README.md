Ecommerce Website - ShopSphere

Environment configuration

Create `.env` for local development:

```env
VITE_API_URL=http://localhost:3001
```

For Netlify, set `VITE_API_URL` to your Render service URL, then rebuild the site.

ShopSphere is a fully responsive eCommerce web application built using ReactJS. It offers a seamless shopping experience with intuitive navigation with product filtering functionality.
Features
✅ Responsive Design: Mobile-first approach ensuring optimal user experience on all devices.
✅ Product Listing: Display a variety of products with detailed information.
✅ Wishlist Feature: Add products to your wishlist for future reference.
✅ Cart Management: Easily add, remove, and update cart items.
✅ Search & Filter: Find products efficiently with powerful filtering.
✅ React Router: Provides smooth navigation with dynamic routing.
✅ Vitest Testing: Ensures the reliability of components and features.
Tech Stack
•	Frontend: ReactJS, Tailwind CSS
•	State Management: Redux 
•	Routing: React Router
•	Testing: Vitest
Installation
1.	Clone the Repository:
2.	git clone (https://github.com/miral-harsora/ecomm_m3.git)
3.	cd folder
4.	Install Dependencies:
5.	npm install
6.	Run the Development Server:
7.	npm run dev
8.	Run Tests with Vitest:
9.	npm run test
10.	Build for Production:
11.	npm run build




Folder Structure
/src
  |-- assets          # Images, icons, etc.
  |-- components      # Reusable UI components
  |--helper           # regex for input validation
  |-- pages           # Main application pages (Home, Category, Cart etc.)
  |-- action        # redux actions
  |-- actionTypes     # list all action types 
  |--store  	#redux store
  |--reducer       # redux reducer 
  |-- App.js          # Root component
  |-- index.js        # Entry point

Screens:
Home
![Screenshot 2025-03-16 230159](https://github.com/user-attachments/assets/abe05eea-178e-4a69-8bbc-d906e623c7f0)

![Screenshot 2025-03-16 230357](https://github.com/user-attachments/assets/09b7bea7-a845-4a3a-9588-b76805dd80fb)

Category
![Screenshot 2025-03-16 230428](https://github.com/user-attachments/assets/6c0eac7d-bd38-4247-ac67-6ef22ac139f2)

Product Detail Page
![Screenshot 2025-03-16 230520](https://github.com/user-attachments/assets/b6eb577c-024c-4cd0-95e1-054988f42514)

Wishlist
![Screenshot 2025-03-16 230542](https://github.com/user-attachments/assets/8b07dcd7-0c6d-40e7-958a-a9b165dfddfe)

Cart
![Screenshot 2025-03-16 230557](https://github.com/user-attachments/assets/7af0c5c8-96cd-4010-ba33-679ea6b2adff)


Login/Sign up
![Screenshot 2025-03-16 231229](https://github.com/user-attachments/assets/4aca5239-940b-4b74-a195-9d85f13f38af)





Contact
For questions, feedback, or collaboration, feel free to reach out to Miral Harsora at miralharsora18@gmail.com
