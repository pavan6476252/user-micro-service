
## User Micro-Service API

**User Micro-Service using Node.js, Express, Mongoose, and Firebase**

This micro-service is built using Node.js, Express.js, Mongoose for MongoDB integration, and Firebase for authentication and other services. It provides endpoints to manage user-related operations.

### Installation

1. Clone the repository:

   ```
   git clone 
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   MONGO_URL=<Your_MongoDB_Connection_String>
   PORT=8001
   ENVIRONMENT=dev
   CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
   CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
   CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
   CLOUDINARY_CLOUDINARY_URL=<Your_Cloudinary_URL>
   PRODUCTS_BASEURL=http://localhost:8002/api/v1/products/arr

   # Firebase Configuration
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=<Your_Firebase_Project_ID>
   FIREBASE_PRIVATE_KEY_ID=<Your_Firebase_Private_Key_ID>
   FIREBASE_PRIVATE_KEY=<Your_Firebase_Private_Key>
   FIREBASE_CLIENT_EMAIL=<Your_Firebase_Client_Email>
   FIREBASE_CLIENT_ID=<Your_Firebase_Client_ID>
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/<Your_Firebase_Client_Email>
   FIREBASE_UNIVERSAL_DOMAIN=googleapis.com
   ```

### Usage

- Start the server:

  ```
  npm run dev
  ```

### Endpoints

- **GET `/api/v1/users`**: Get all users.
- **GET `/api/v1/users/:id`**: Get a user by ID.
- **POST `/api/v1/users`**: Create a new user.
- **PUT `/api/v1/users/:id`**: Update a user by ID.
- **DELETE `/api/v1/users/:id`**: Delete a user by ID.

### Dependencies

- axios
- cloudinary
- cors
- dotenv
- express
- firebase-admin
- mongoose
- morgan
- multer

### Dev Dependencies

- nodemon

### Important Files

- `index.js`: Entry point of the application.
- `.env`: Environment variables configuration.
- `package.json`: Node.js package configuration.
- `.gitignore`: Specifies intentionally untracked files to ignore.


---


### Overview

This micro-service provides APIs for managing user-related operations such as user profiles, addresses, preferences, and wishlists.

### Routes

#### Version 1 (v1)

- **GET /api/v1/users/profile**
  - Get user profile information.

- **POST /api/v1/users/profile/auto-create**
  - Automatically create a user profile.

- **POST /api/v1/users/profile**
  - Create a new user profile.

- **PUT /api/v1/users/profile**
  - Update user profile information.

- **PATCH /api/v1/users/profile/pic**
  - Update user profile picture.

- **DELETE /api/v1/users/profile/pic**
  - Delete user profile picture.

- **DELETE /api/v1/users/**
  - Delete a user.

- **GET /api/v1/users/profile/address**
  - Get user addresses.

- **POST /api/v1/users/profile/address**
  - Add a new address to user profile.

- **PUT /api/v1/users/profile/address/:addressId**
  - Edit an existing address.

- **DELETE /api/v1/users/profile/address/:addressId**
  - Delete an address from user profile.

- **GET /api/v1/users/profile/wishlist**
  - Get user's wishlist.

- **PATCH /api/v1/users/profile/wishlist/:productId**
  - Update user's wishlist.

- **PATCH /api/v1/users/preferences/fcm**
  - Update user's FCM token.

- **PATCH /api/v1/users/preferences/status/whatsapp**
  - Update user's WhatsApp notification status.

- **PATCH /api/v1/users/preferences/status/mail**
  - Update user's mail notification status.

#### Version 2 (v2)

- **GET /api/v2/users/auto-create**
  - Automatically create a user profile.

- **GET /api/v2/users/**
  - Get user profile information.

- **POST /api/v2/users/**
  - Create a new user profile.

- **PUT /api/v2/users/**
  - Update user profile information.

- **DELETE /api/v2/users/**
  - Delete a user.

- **PATCH /api/v2/users/pic**
  - Update user profile picture.

- **DELETE /api/v2/users/pic**
  - Delete user profile picture.

- **GET /api/v2/users/address**
  - Get user addresses.

- **POST /api/v2/users/address**
  - Add a new address to user profile.

- **PUT /api/v2/users/address/:addressId**
  - Edit an existing address.

- **DELETE /api/v2/users/address/:addressId**
  - Delete an address from user profile.

- **GET /api/v2/users/wishlist**
  - Get user's wishlist.

- **PATCH /api/v2/users/wishlist/:productId**
  - Update user's wishlist.

- **PATCH /api/v2/users/prefs/fcm**
  - Update user's FCM token.

---

Feel free to customize the documentation further according to your specific requirements or add any additional information you deem necessary.

### Contributing

Feel free to contribute to this project by submitting pull requests.

### License

This project is licensed under the ISC License.

---

This README provides an overview of the user micro-service. For detailed API documentation, refer to the API documentation or inline comments in the code.
