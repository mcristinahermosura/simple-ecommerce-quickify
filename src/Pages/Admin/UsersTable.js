import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import { updateUserRole } from "../../api";
import { RESPONSE_STATUS } from "../../utils/constant";

export default function UsersTable() {
  const { users, fetchUsers, token } = useContext(UserContext);

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
            `Action Forbidden! \n ${res.message}` ??
            "Failed to update user role",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to update user role",
        icon: "error",
        text: error.message ?? error,
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
        {users.length > 0 ? (
          users?.map((user, index) => (
            <tr key={index}>
              <td style={{ verticalAlign: "middle" }}>{user.name}</td>
              <td style={{ verticalAlign: "middle" }}>{user.email}</td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                {user.isAdmin ? "Yes" : "No"}
              </td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>
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
                  className="mb-2"
                >
                  Update
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
