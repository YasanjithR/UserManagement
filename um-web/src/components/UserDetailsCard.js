import React from "react"

const UserDetailsCard = ({ user }) => {
  return (
    <div className="card card-styled">
      <div className="card-header">
        <h5 className="card-title mb-0">User Details</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 mb-3">
            <strong className="text-primary">Email:</strong> {user.email}
          </div>
          <div className="col-md-6 mb-3">
            <strong className="text-primary">First Name:</strong> {user.firstName}
          </div>
          <div className="col-md-6 mb-3">
            <strong className="text-primary">Last Name:</strong> {user.lastName}
          </div>
          <div className="col-md-6 mb-3">
            <strong className="text-primary">Created Date:</strong> {user.createdDate}
          </div>
          <div className="col-md-6 mb-3">
            <strong className="text-primary">Last Updated Date:</strong> {user.lastUpdatedDate}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsCard

