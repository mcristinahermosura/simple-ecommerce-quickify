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
  USER_SIGNUP: "users/sign-up",
  USER_LOGIN: "users/login",
  USER_DETAILS: "users/details",
  ORDER_CHECKOUT: "orders/checkout",
  ORDER: "orders",
  ORDER_ALL: "orders/all",
  ORDER_CANCEL: "orders/cancel-order",
  ORDER_UPDATE_STATUS: "orders/update-status",
});
