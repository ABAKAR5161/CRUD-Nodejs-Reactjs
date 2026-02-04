import React from 'react';


export default function UpdateUserForm(props) {
  const [user, setUser] = React.useState({
    username: props.user.username,
    email: props.user.email,
  });



    return ( <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${props.user.id}`}>
        Edit
      </button>

      <div className="modal" id={`id${props.user.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Update User</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body d-flex flex-column gap-3">
              <input type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
              <input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal"
              onClick={() => props.onUpdate(props.user.id, user)}
              >Save</button>
            </div>

          </div>
        </div>
      </div>
        
    </>);
}
