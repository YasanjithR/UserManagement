import React, { useState } from "react"
import { Container, Button } from "react-bootstrap"
import UserDetailsCard from "../components/UserDetailsCard"
import CreateUserModal from "../components/CreateUserModal"
import Header from "../components/Header"
import Footer from "../components/Footer"

const initialUsers = [
  {
    id: 1,
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    createdDate: "2023-01-15",
    lastUpdatedDate: "2023-05-20",
  },
  {
    id: 2,
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    createdDate: "2023-02-20",
    lastUpdatedDate: "2023-06-10",
  },
  {
    id: 3,
    email: "bob@example.com",
    firstName: "Bob",
    lastName: "Johnson",
    createdDate: "2023-03-25",
    lastUpdatedDate: "2023-07-05",
  },
]

function UserGrid() {
  const [users, setUsers] = useState(initialUsers)
  const [editingId, setEditingId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleEdit = (id) => {
    setEditingId(id)
  }

  const handleSave = (id, field, value) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, [field]: value, lastUpdatedDate: new Date().toISOString().split("T")[0] } : user,
      ),
    )
    setEditingId(null)
  }

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(null)
    }
  }

  const handleView = (user) => {
    setSelectedUser(user)
  }

  const handleCreateUser = (newUser) => {
    const currentDate = new Date().toISOString().split("T")[0]
    const userWithDates = {
      ...newUser,
      id: users.length + 1,
      createdDate: currentDate,
      lastUpdatedDate: currentDate,
    }
    setUsers([...users, userWithDates])
    setShowCreateModal(false)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0">User List</h2>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Create User
            </Button>
          </div>
          <div className="table-container mb-4">
            <table className="table table-styled">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Created Date</th>
                  <th>Last Updated Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {editingId === user.id ? (
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          defaultValue={user.email}
                          onBlur={(e) => handleSave(user.id, "email", e.target.value)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingId === user.id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          defaultValue={user.firstName}
                          onBlur={(e) => handleSave(user.id, "firstName", e.target.value)}
                        />
                      ) : (
                        user.firstName
                      )}
                    </td>
                    <td>
                      {editingId === user.id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          defaultValue={user.lastName}
                          onBlur={(e) => handleSave(user.id, "lastName", e.target.value)}
                        />
                      ) : (
                        user.lastName
                      )}
                    </td>
                    <td>{user.createdDate}</td>
                    <td>{user.lastUpdatedDate}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(user.id)}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" className="me-2" onClick={() => handleDelete(user.id)}>
                        Delete
                      </Button>
                      <Button variant="outline-info" size="sm" onClick={() => handleView(user)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedUser && <UserDetailsCard user={selectedUser} />}
        </Container>
      </main>
      <Footer />
      <CreateUserModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreateUser={handleCreateUser}
      />
    </div>
  )
}

export default UserGrid

