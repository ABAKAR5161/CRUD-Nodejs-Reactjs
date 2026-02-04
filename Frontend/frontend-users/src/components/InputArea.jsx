import React, { useState } from "react";
import "../css/inputArea.css"
export default function InputArea(props) {
    //const [error, setError] = useState(false);
    const[user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    function handleChange(event) {
        const {name, value} = event.target;
        setUser((prevUser) => {
            return {...prevUser, [name]: value};
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

         // Sécurité minimale
        if (!user.username || !user.email || !user.password) {
        alert("Tous les champs sont obligatoires");
        //setError(true)
        return;
        }
        props.onAdd(user);
        setUser({
            username: "",
            email: "", 
            password: ""
        });
    }
    return (
        <form className="form-input" onSubmit={handleSubmit}>
            <input 
              className="input-group"
              type="text"
              onChange={handleChange}
              name="username"
              placeholder="Name"
              value={user.username} 
              />
            <input
             className="input-group error"
              type="text"
               onChange={handleChange}
               name="email"
               placeholder="Email"
               value={user.email}
               />
            <input
             className="input-group error"
              type="password"
               onChange={handleChange}
               name="password"
               placeholder="Password"
               value={user.password}
               />
            <button className="btn submit-btn" type="submit">Ajouter</button>
        </form>
    );
}
