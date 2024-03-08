import Swal from "sweetalert2";

const alertPrompt = async (message) => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const defaultTitle = `You are already logged in ${
    isAdmin ? "as Admin" : ""
  }!`;

  const alertOptions = {
    title: message || defaultTitle,
    icon: "error",
    timer: 500,
    showConfirmButton: false,
    allowOutsideClick: false,
  };

  return await Swal.fire(alertOptions);
};

export { alertPrompt };
