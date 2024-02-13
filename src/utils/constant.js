const BASE_API = process.env.REACT_APP_API_BASE_URL;

export const ACTION = Object.freeze({
  remove: "remove",
  checkout: "checkout",
});

export const RESPONSE_STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  FAILED: "failed",
});

export const ENDPOINT = Object.freeze({
  PRODUCTS: "products",
  PRODUCTS_ALL: "products/all",
  PRODUCTS_ACTIVE: "products/all-active",
  PRODUCTS_UPDATE: "products/update",
  PRODUCTS_UPDATE_STATUS: "products/update-status",
  USER: "users",
  USER_SIGNUP: "users/sign-up",
  USER_LOGIN: "users/login",
  USER_DETAILS: "users/details",
  USER_UPDATE: "users/update",
  ORDER_CHECKOUT: "orders/checkout",
  ORDER: "orders",
  ORDER_ALL: "orders/all",
  ORDER_CANCEL: "orders/cancel-order",
  ORDER_UPDATE_STATUS: "orders/update-status",
});

export const ADMIN_TABLES = [
  { name: "Users", value: "users" },
  { name: "Products", value: "products" },
  { name: "Orders", value: "orders" },
];

export const ORDER_STATUS = Object.freeze({
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped - In Transit",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
});

export const BODY_SHOP_LOGO = `${BASE_API}/files/THEBODYSHOPLOGO.png`;
