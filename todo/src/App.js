
// import './App.css';
import './proper.css'
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [iscompleted, setiscompleted] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [newtitle, setnewtitle] = useState("");
  const [newdescription, setnewdescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editIndex, setEditIndex] = useState(null); 
  const [newdate,setnewdate] =useState("");
  
  const handleadd = () => {

    let newTodoitem = {
      title: newtitle,
      description: newdescription,
      date: newdate
    }

    let updatedTodoArr = [...Todos];
    updatedTodoArr.push(newTodoitem);
    setTodos(updatedTodoArr);

    setnewtitle("");
    setnewdescription("");
    setnewdate("");

    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

  };

  //Making the function for edition.
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(Todos[index].title);
    setEditDescription(Todos[index].description);
    setEditDate(Todos[index].date);
  };

  //Making the function for saving the edition.
  const handleSave = (index) => {
    let updatedTodoArr = [...Todos];
    updatedTodoArr[index].title = editTitle;
    updatedTodoArr[index].description = editDescription;
    updatedTodoArr[index].date = editDate;
    setTodos(updatedTodoArr);
  
    setEditIndex(null);
    setEditTitle("");
    setEditDescription("");
    setEditDate("");
  
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };
  

  // Making the function for delete-button which help to delete the Tasks. 
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...Todos];
    reducedTodo.splice(index, 1);

    // Removing the data from localStorage.
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  // Making the function for adding the task if it was completed.
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...Todos[index],
      completedOn: completedOn
    }

    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(filteredItem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleteArr));
  }

  //Making the Functions for operating the delete icons for the completed.
  const handleDeletecompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    // Removing the data from localStorage.
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }
  // Making the fuction to render the page while refreshing.
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, [])
  return (
    <div className="App">
      <h1>Todo App</h1>
      <diV className="todo-wrapper">
        <diV className="todo-input">
          <diV className="todo-input-item">
            <label>Title</label>
            <input type="text"className="lion" value={newtitle} onChange={(e) => setnewtitle(e.target.value)} placeholder='Title for task'></input>
          </diV>
          <diV className="todo-input-item">
            <label>Description</label>
            <input type="text" className="lion" value={newdescription} onChange={(e) => setnewdescription(e.target.value)} placeholder='Provide the description.'></input>
          </diV>
          {/* This is for the due date. */}
          <diV className="todo-input-item">
            <label>Due date</label>
            <input type="date" className="lion" value={newdate} onChange={(e) => setnewdate(e.target.value)} placeholder='Due date.'></input>
          </diV>
          <diV className="todo-input-item">
            <button type='button' onClick={handleadd} className='primary-button'>Add</button>
          </diV>
        </diV>

        {/* Making the two button. */}
        <div className='btn-area'>
          <button className={`secbutton todo-button ${iscompleted === false && 'active'}`} onClick={() => setiscompleted(false)}>Todo</button>
          <button className={`secbutton complete-button ${iscompleted === true && 'active'}`} onClick={() => setiscompleted(true)}>Completed</button>
        </div>

        {/* Making the practise list of the title and description. */}
        {/* <div className='todo-list'>
          <div className='todo-list-item'>
            <div>
              <h3>Task1</h3>
              <p>This is task1 to be completed.</p>

            </div>
            <div className='task-info'>
              <MdDelete className='icon' />
              <FaCheck className='check-icon' />
            </div>
          </div>

        </div> */}

        {/* Making the updated function. */}
        <div className='todo-list'>
          {/* Making the list of the incomplete list. */}
          {iscompleted === false && Todos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                {editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder='Title for task'
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder='Provide the description.'
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      placeholder='Provide the date.'
                    />
                  </div>
                ) : (
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Due date: {item.date}</p>
                  </div>
                )}
                {/* <div>
                  Accessing the value from the created array.
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                </div> */}

                <div className='task-info'>
                  {editIndex === index ? (
                    <button onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <>
                      <RiDeleteBin6Fill data-tooltip="Click to Delete" className='icon' onClick={() => handleDeleteTodo(index)} />
                      <FaCheck  data-tooltip="Click to complete" className='check-icon' onClick={() => handleComplete(index)} />
                      {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
                      <FaEdit className="edit" onClick={() => handleEdit(index)} />
                      
                    </>
                  )}
                </div>
              </div>

            );
          })}

          {/* Making for the completed list. */}
          {iscompleted === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  {/* Accessing the value from the created array. */}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Due date: {item.date}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>

                </div>
                <div className='task-info'>
                  {/* <MdDelete className='icon' onClick={() => handleDeletecompletedTodo(index)} /> */}
                  <RiDeleteBin6Fill className='icon' onClick={() => handleDeletecompletedTodo(index)} />
                  {/* <FaCheck className='check-icon' onClick={() => handleComplete(index)} /> */}
                </div>
              </div>

            );
          })}

        </div>

      </diV>
    </div>
  );
}

export default App;
