import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ isAuthorized, alert, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = async () => {
    try {
      const response = await alert();
      response && navigate(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthorized) redirect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isAuthorized]);

  // If user is not authorized, we return empty fragment
  if (!isAuthorized) {
    return <></>;
  }

  return children;
};

const alertPrompt = async (redirect, message) => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  try {
    const res = await Swal.fire({
      // Display the message if provided, else display the default message
      title:
        message ?? `You are already logged in ${isAdmin ? "as Admin" : ""}!`,
      icon: "info",
      timer: 3000,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    if (res.dismiss === Swal.DismissReason.timer) {
      return redirect;
    }

    return;
  } catch (error) {}
};



export { ProtectedRoute, alertPrompt };
