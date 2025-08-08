const CONSTANTS = {
  BASE_URL: "http://localhost:3000",
  UPLOAD_FOLDER: "uploads",
  SHIPPING_METHODS: ["free", "Nova Post", "ukr post"],
  SHIPPING_PRICE: { free: 0, "nova post": 80, "ukr post": 50 },
  ORDER_STATUS: [
    "new",
    "paid",
    "confirm",
    "shipped",
    "deliwered ",
    "cancelled",
  ],
  STRIPE_SECRET_KEY:'pk_test_51RrKjPEia9CUNvchQKcrUeLJekGxCCGILTqkRsS0Aqb1qaPSvfr3ollwdTRfWhzxQA7xeUbEtujdwJNy1o3ZdLUp00sR6Ha0vn'
};
export default CONSTANTS;
