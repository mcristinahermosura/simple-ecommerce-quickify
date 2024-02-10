import { ENDPOINT } from "../utils/constant";

const BASE_API = process.env.REACT_APP_API_URL;

export const createProduct = async (product, token) => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.PRODUCTS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  return response.json();
};

export const updateProductDetails = async (product, token) => {
  const response = await fetch(
    `${BASE_API}/${ENDPOINT.PRODUCTS_UPDATE}/${product._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    }
  );

  return response.json();
};

export const updateProductStatus = async (product, token) => {
  const response = await fetch(
    `${BASE_API}/${ENDPOINT.PRODUCTS_UPDATE_STATUS}/${product._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive: !product.isActive }),
    }
  );

  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.PRODUCTS_ALL}`, {
    method: "GET",
  });
  return response.json();
};

export const getAllActiveProducts = async () => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.PRODUCTS_ACTIVE}`);
  return response.json();
};

export const loginUser = async (user) => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.USER_LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
};

export const registerUser = async (user) => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.USER_SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
};

export const getSingleProduct = async (productId) => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.PRODUCTS}/${productId}`);
  return response.json();
};

export const getUserOrders = async (id, token) => {
  console.log("getUserOrders");
  const response = await fetch(`${BASE_API}/${ENDPOINT.ORDER}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getAllOrders = async (token) => {
  console.log("getAllOrders");
  const response = await fetch(`${BASE_API}/${ENDPOINT.ORDER_ALL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const createOrder = async (order, token) => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.ORDER_CHECKOUT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  return response.json();
};

export const cancelOrder = async (orderId, token) => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.ORDER_CANCEL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId }),
  });

  return response.json();
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await fetch(`${BASE_API}/${ENDPOINT.ORDER}/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  return response.json();
};
