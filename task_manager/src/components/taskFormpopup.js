// TaskFormPopup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskFormPopup = ({ onClose, onSubmit }) => {
    const loginUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        taskID:'',
        name: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };
    
    const addTask = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8081/add-task/${loginUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error('Failed to add task:', error);
        }
        onClose();

    }
    return (
        <>
            <div>
                {JSON.stringify(taskData)}
            </div>
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-10">
                <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
                    <button className=" top-2 right-2 text-gray-500 hover:text-gray-600" onClick={onClose}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
                    <form onSubmit={addTask}>
                        <div className="mb-4">
                            <label htmlFor="taskName" className="block font-medium mb-2">Task Name</label>
                            <input type="text" name = "name" id="taskName" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="taskDescription" className="block font-medium mb-2">Task Description</label>
                            <textarea name = "description" id="taskDescription" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaskFormPopup;
