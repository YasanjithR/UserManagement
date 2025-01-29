
import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

const CreateUserModal = ({ show, onHide, onCreateUser }) => {
  const [email, setEmail] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e) => {
    try {
      setLoading(true)
      e.preventDefault()
      onCreateUser({ email, firstname, lastname })
      setEmail("")
      setFirstName("")
      setLastName("")
    } catch (error) {
      setError("An error occurred while creating the user")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
              {error && <div className="alert alert-danger m-3">{error}</div>}

          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateUserModal

