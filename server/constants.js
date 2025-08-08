const CONSTANTS = {
  DB_HOST: "localhost",
  DB_PORT: "27017",
  DB_NAME: "shop",
  USER_ROLES: ["customer", "admin"],
  JWT_SECRET: "fd9e48b3a12c4e6f8d0a2b5c7e9f3h6j8k4m7n0p2q5r8t1v4w7x0z3y6",
  MAX_LIMIT_IMG: 5,
  UPLOAD_FOLDER: "uploads/",
  UPLOAD_IMG_TYPES: [".jpg", ".jpeg", ".png", ".webp"],
  AMOUNT: 50,
  JWT_EXPIRES:"7d",
  SHIPPING_METHODS: ["free", "Nova Post", "ukr post"],
  ORDER_STATUS: [
    "new",
    "paid",
    "confirm",
    "shipped",
    "deliwered ",
    "cancelled",
  ],
  STRIPE_SECRET_KEY:'sk_test_51RrKjPEia9CUNvch7t2pOBtoXXFzlPgWuVWNkHRrm3HMnflysyiWeIe0JltjTiNe3ruITWOesv4bxKTnSiDHG5xo009C3MVPRZ',
  CLIENT_URL:'http://localhost:5173'
};

module.exports = CONSTANTS;
