import React from "react";
import { Button, Table } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import { deleteUser, updateUserRole } from "../../api";
import { RESPONSE_STATUS } from "../../utils/constant";

export default function UsersTable() {
  const { users, fetchUsers, token } = useUserContext();

  const handleUpdateUser = async (user) => {
    try {
      const isAdmin = !user.isAdmin;
      const res = await updateUserRole(user._id, isAdmin, token);
      if (res.status === RESPONSE_STATUS.SUCCESS) {
        fetchUsers();
        Swal.fire({
          title: "User role updated successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title:
            res.message.length > 0
              ? `Action Forbidden! \n ${res.message}`
              : "Failed to update user role",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to update user role",
        icon: "error",
        text: error.message.length > 0 ? error.message : error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const sortedUsers = users
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .sort((a, b) => b.isAdmin - a.isAdmin);

  const handleDeleteUser = async (user) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: `Are you sure you want to delete this user: ${
          user.name || user.email
        }?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (isConfirmed) {
        const res = await deleteUser(user._id, token);

        if (res.status === RESPONSE_STATUS.SUCCESS) {
          fetchUsers();
          Swal.fire({
            title: "User deleted successfully!",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title:
              res.message.length > 0
                ? `Action Forbidden! \n ${res.message}`
                : "Failed to delete user",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to delete user",
        icon: "error",
        text: error.message.length > 0 ? error.message : error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Table striped bordered hover responsive variant="secondary">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email Address</th>
          <th className="text-center">Admin</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.length > 0 ? (
          sortedUsers?.map((user, index) => (
            <tr key={index}>
              <td style={{ verticalAlign: "middle" }}>{user.name}</td>
              <td style={{ verticalAlign: "middle" }}>{user.email}</td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                {user.isAdmin ? "Yes" : "No"}
              </td>
              <td className="d-flex justify-content-center align-items-center gap-2">
                <Button
                  variant="primary"
                  onClick={() =>
                    Swal.fire({
                      title:
                        "Are you sure you want to update this user's role?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      cancelButtonText: "No",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleUpdateUser(user);
                      }
                    })
                  }
                >
                  Update
                </Button>
                <Button variant="dark" onClick={() => handleDeleteUser(user)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
