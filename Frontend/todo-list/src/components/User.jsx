import '../css/user.css';
import UpdateUserForm from './UpdateUserForm';

export default function User(props) {

    return (
        <div  className="user-card">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>    
                    </tr>
                </thead>
            <tbody>
                    {
                        props.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button 
                                    className="btn delete-btn"
                                     onClick={() => props.onDelete(user.id)}
                                    >Supprimer
                                    </button>
                                    <UpdateUserForm   user = {user} onUpdate={props.onUpdate} />
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
            </table>
        
        </div>
    );
}
