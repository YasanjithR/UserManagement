import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; 2023 User Management. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#privacy" className="text-muted me-3">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted">
              Terms of Service
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

