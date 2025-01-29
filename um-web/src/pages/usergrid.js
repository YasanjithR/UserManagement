import React, { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import UserDetailsCard from "../components/UserDetailsCard"
import CreateUserModal from "../components/CreateUserModal"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, updateUser, createUser, deleteUser } from "../features/userSlice"
import { useNavigate } from 'react-router-dom'

function UserGrid() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users, loading, error } = useSelector((state) => state.users)
  const { isAuthenticated, token } = useSelector((state) => state.auth)
  const [editingId, setEditingId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Check authentication and fetch users on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      // navigate('/login')
      // return
    }
    dispatch(fetchUsers())
    console.log(token)
  }, [isAuthenticated, dispatch, navigate])

  const handleEdit = (id) => {
    setEditingId(id)
  }

  const handleSave = async (id, field, value) => {
    const userToUpdate = users.find(user => user._id === id)
    if (!userToUpdate) return

    const updatedUser = {
      ...userToUpdate,
      [field]: value,
    }

    try {
      await dispatch(updateUser(updatedUser)).unwrap()
      setEditingId(null)
    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap()
      if (selectedUser && selectedUser._id === id) {
        setSelectedUser(null)
      }
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }

  const handleView = (user) => {
    setSelectedUser(user)
  }

  const handleCreateUser = async (newUser) => {
    try {
      await dispatch(createUser(newUser)).unwrap()

      setShowCreateModal(false)
    } catch (err) {
      console.error('Failed to create user:', err)
    }
  }

  if (loading) {
    return <div className="text-center py-5">Loading...</div>
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <div className="alert alert-danger mt-4">Error: {error}</div>;
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
                  <tr key={user._id}>
                    <td>
                      {editingId === user._id ? (
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          defaultValue={user.email}
                          onBlur={(e) => handleSave(user._id, "email", e.target.value)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          defaultValue={user.firstname}
                          onBlur={(e) => handleSave(user._id, "firstname", e.target.value)}
                        />
                      ) : (
                        user.firstname
                      )}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          defaultValue={user.lastname}
                          onBlur={(e) => handleSave(user._id, "lastname", e.target.value)}
                        />
                      ) : (
                        user.lastname
                      )}
                    </td>
                    <td>{new Date(user.createdDate).toLocaleDateString()}</td>
                    <td>{new Date(user.lastUpdateDate).toLocaleDateString()}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(user._id)}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" className="me-2" onClick={() => handleDelete(user._id)}>
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
          {errorMessage}
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