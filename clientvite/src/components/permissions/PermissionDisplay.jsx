import React, { useContext } from 'react'
import (useContext)

const PermissionDisplay = () => {
   // Destructure 'permissions' from the AuthContext
  const { permissions, loggedInUser } = useContext(AuthContext);

  return (
    <div>
      {loggedInUser ? (
        <>
          <h3>Welcome, {loggedInUser}!</h3>
          <h4>Your Permissions:</h4>
          {/* Check if permissions is an array before mapping over it */}
          {Array.isArray(permissions) && permissions.length > 0 ? (
            <ul>
              {permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          ) : (
            <p>No specific permissions found or still loading...</p>
          )}
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default PermissionDisplay