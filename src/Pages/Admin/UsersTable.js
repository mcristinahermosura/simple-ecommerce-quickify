import React from "react";
import { Button, Table } from "react-bootstrap";

export default function UsersTable({
  users = [],
  handleUpdateUser = () => {},
}) {
  return (
    <Table striped bordered hover responsive variant="secondary">
      <thead>
        <tr>
          <th>Email Address</th>
          <th>isAdmin</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td style={{ verticalAlign: "middle" }}>{user.email}</td>
            <td style={{ verticalAlign: "middle" }}>
              {user.isAdmin ? "Yes" : "No"}
            </td>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>
              <Button
                variant="primary"
                onClick={() => handleUpdateUser(user)}
                className="mb-2"
              >
                Update
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
