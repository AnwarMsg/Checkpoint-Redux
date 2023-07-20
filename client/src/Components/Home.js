import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkedTodos } from '../Redux/TodosReducer';
import { getTodo, deleteTodo } from '../Redux/TodosReducer';
import { signOut } from '../Redux/Reducer';
import { addTodo } from '../Redux/Todos';
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const [newTodo, setNewTodo] = useState({title : "", checked : false, userid: user._id});

    useEffect(() => {
      dispatch(getTodo(newTodo))
    }, [newTodo, dispatch]);

    const todosList = useSelector(state => state.TodosRedux.todos);
    const count = useSelector(state => state.TodosRedux.count);
    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState({});
    const [temp, setTemp] = useState('');

    const errors = {
      title: "Erreur ! Cette tâche est déjà présente dans votre liste.",
      wrong: "Erreur ! Veuillez donnez un titre valide pour votre tâche."
    }
  
    const AddElement = (item) => {
      if(item.title === "") {
        setErrorMessages({name: "wrong", message: errors.wrong});
      } else {
        dispatch(addTodo(item)).then((res) => {
          let error = res.payload.error;
          if (error) {
            setErrorMessages({name: "title", message: errors.title});
          } else {
            dispatch(getTodo(newTodo))
            setErrorMessages({})
          }
      })
    }}

    const erreur = (name) => 
    name === errorMessages.name && (
      <h3 className='erreur'>{errorMessages.message}</h3>
    );
  
    const filter = (e) => {
      setTemp(e.target.value);
    }
  
    const filtered = !temp ? todosList : todosList.filter((tache) => {
      return tache.title.toLowerCase().includes(temp.toLowerCase())
    });
  
    return (
      <div className='task'>
        <h3>Welcome {user.username} !</h3>
        <h4>Your e-mail : {user.email}</h4>
        <button className='signout' onClick={()=> {dispatch(signOut()); navigate("/")}}>Sign Out</button>
        <input type="text" placeholder='Add a task' onChange={(e)=>setNewTodo({...newTodo, title: e.target.value})} />
        <button onClick={()=> {
          AddElement(newTodo);
          console.log(todosList);
          }}>Add</button>
        {erreur("title")}
        {erreur("wrong")}
        <input type="search" value={temp} onChange={filter} className="searchbar" placeholder='Search for a Task'/>
        {count > 0 &&
          filtered.map(item=>(
            <>
            <h3 className={item.done ? "checked" : ""}>{item.title}</h3>
            <input type="checkbox" checked={item.done} 
            onChange={()=> {
              const name = item.title;
              dispatch(checkedTodos(name));
            }} />
            <button onClick={()=> {
              const id = item._id;
              dispatch(deleteTodo(id));
              }}>Delete</button>
            </>  
          ))
        }
        {count === 0 && <h3>No Todos</h3>}
      </div>
    );
}

export default Home