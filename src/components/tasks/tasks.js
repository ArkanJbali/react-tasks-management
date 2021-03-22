import React, {useState, useEffect} from 'react'
import './taskStyle.scss';
import Button from '../button/Button';
import AddTask from './AddTask';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Task from './Task';
import About from '../About/About';
import {Link} from 'react-router-dom'
function Tasks() {
   // let location = useLocation()
    const onClick = () => {
        setShowAddTask(!showAddTask);
    }
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasksData, setTasksData] = useState([]);
    useEffect(() => {
       const getTasks = async () => {
           const tasksFromServer = await fetchTasks()
           setTasksData(tasksFromServer)
       }

       getTasks()
    }, [])
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return data
    }
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data
    }
        const deleteTask = async (id) => {
            await fetch(`http://localhost:5000/tasks/${id}`,
            {
                method: 'DELETE',
            })
            setTasksData(tasksData.filter((task) => task.id !== id))
        }

        const toggleReminder = async (id) => {
            const taskToToogle = await fetchTask(id)
            const updatedTask = { ...taskToToogle, reminder: !taskToToogle.reminder}
            const res = await fetch(`http://localhost:5000/tasks/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            })
            const data = await res.json()

            setTasksData(tasksData.map((task) => 
            task.id === id ? {...task, reminder: data.reminder} : task
            )
            )
        }

        const addTask = async (task) => {
            // const id = Math.floor(Math.random() * 10000) + 1
            // const newTask = { id, ...task}
            // setTasksData([...tasksData, newTask])
            const res =  await fetch('http://localhost:5000/tasks',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            const data = await res.json()
            setTasksData([...tasksData, data])
        }
    return (
        <Router>
        <div className="container">
        <header className='header'>
            <h1>Task Tracker</h1>
            {/* {location.pathname === '/' &&  */}
                <Button color={showAddTask ? 'red' : 'green' }
                text={showAddTask ? 'Close' : 'Add'}
                onClick={onClick} />
                {/* } */}
        </header>
        <Route path='/' exact render={(props)=>(
            <>
                {showAddTask && <AddTask onAdd={addTask}/> }
                {tasksData.length > 0 ? (
                <Task tasksData={tasksData} onDelete={deleteTask} onToggle={toggleReminder}/>
                 ) : (
                <h4>There is no tasks...</h4>
                 )
                }
            </>
        )} />
        <Route path='/about' component={About} />
        <hr />
        <Link to='/about'>About</Link>
            </div>
        </Router>
    )
}

export default Tasks
