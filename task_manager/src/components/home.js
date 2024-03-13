import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import TaskFormPopup from './taskFormpopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
    const loginUser = useSelector((state) => state.user.user);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async (e) => {
            try {
                const response = await fetch(`http://localhost:8081/tasks/${loginUser}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify(tasks),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                // console.log("response", data.user.tasks);
                setTasks(data.user.tasks); // Uncomment this line if you want to update state with fetched data
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        const timeoutId = setTimeout(fetchTasks, 5000); // Delay of 5 seconds

        return () => clearTimeout(timeoutId); // Clean up on component unmount

        fetchTasks();
    }, [loginUser, tasks]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const addTask = async (e) => {
        setIsPopupOpen(true);
    }
    const openPopup = () => {
        // Set isPopupOpen to true when opening the popup
    }

    const closePopup = () => {
        setIsPopupOpen(false); // Set isPopupOpen to false when closing the popup
    }
    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:8081/deleteTask/${loginUser}/${taskId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            const data = await response.json();
            toast.warn("Task Deleted!")
        }
        catch (error) {
            console.error('Failed to delete:', error);
        }
    }
    const edit = () => { toast.warn("Edit feature is not available for this task!") }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md ">
                <div className=" text-gray-600 text-lg mb-4 bg-blue-200 p-3 rounded-md ">Hi : <span className="font-bold text-blue-800">{loginUser}</span></div>
                <h1 className="text-3xl text-center font-semibold mb-8">Task Manager</h1>

                {/* Task Management Section */}

                <div>
                    <div className='flex justify-between items-center '>
                        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={addTask}>ADD New Tasks</button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        {tasks.map((task, index) => (
                            <div key={index} className="bg-gray-200 p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-semibold mb-2">{"Task Name : " + task.name}</h3>
                                <p className="text-gray-600">{"Task Description : " + task.description}</p>
                                <div className="flex justify-end">
                                    <button className="text-blue-500 hover:text-blue-600" onClick={edit}>Edit</button>
                                    <button className="text-red-500 hover:text-red-600 ml-2 " onClick={() => deleteTask(task._id)} >Delete</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {isPopupOpen && <TaskFormPopup onClose={closePopup} />}
            <ToastContainer />
        </div>
        // </div>
    );
}

export default Home