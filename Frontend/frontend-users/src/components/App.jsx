import { useState, useEffect } from 'react';
import '../css/App.css';
import axios from 'axios';
import InputArea from './InputArea';
import User from './User';

function App() {
const [users, setUsers] = useState([]);

useEffect(() => {
   const fetchData = async () => {
    try {
      const response = await axios.get('/api/users'); // Utilisation du proxy défini dans vite.config.js
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);  
    }
   }
    fetchData();
}, []);
   // ADD user
   const onAdd = async(user) => {
     try {
      const result = await axios.post("/api/users",user);
       setUsers(prevUsers => {
        return [...prevUsers, result.data];
      });
     } catch (error) {
      console.log("Failled user submit : ", error);
     }
   }
   //UPDATE user

   const onUpdate = async (userId, updateUser) => {
    try {
      const result = await axios.put(`/api/users/${userId}`, updateUser);
      setUsers(prevUsers =>{
        return prevUsers.map((user) => {
          return user.id !== userId ? user : {...user, ...result.data }
        });
      });
      console.log(`User By ${userId} updated successfully`);
    } catch (error) {
      console.error(`Not found user By ${userId}`, error);
    }
   }
   // DELETE user

   const onDelete = async (id) => {
    try {
     await axios.delete(`/api/users/${id}`);
      setUsers(prevUsers => 
        prevUsers.filter(user => user.id !== id)
      );
    } catch (error) {
      console.log('User not Found', error);
    }
   }

 
  return (
    <>
      <InputArea onAdd = {onAdd} />
      <User users = {users} onDelete = {onDelete} onUpdate = {onUpdate}  />
    </>
  )
}

export default App
