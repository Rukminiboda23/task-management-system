// frontend/src/components/TaskList.js

import React, { useState, useEffect } from 'react';
import useTasks from '../hooks/useTasks';
import { toast } from 'react-toastify';
import EditTaskModal from './EditTaskModal';
import TaskCard from './TaskCard';
import { AnimatePresence } from 'framer-motion';
import axiosInstance from '../api/axiosClient';

const TaskList = () => {
    const { tasks, fetchTasks } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const addTaskBtn = document.querySelector('.add-task-btn-sidebar');
        const handleOpenAddModal = () => openModal(null);
        
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', handleOpenAddModal);
        }
        return () => {
            if (addTaskBtn) {
                addTaskBtn.removeEventListener('click', handleOpenAddModal);
            }
        };
    }, []);

    const API_BASE_URL = "/api/tasks/";

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const handleSaveTask = async (taskId, data) => {
        try {
            if (taskId) {
                await axiosInstance.put(`${API_BASE_URL}${taskId}/`, data); 
                toast.success("Task updated successfully!");
            } else {
                 await axiosInstance.post(API_BASE_URL, data);
                 toast.success("Task added successfully!");
            }
            await fetchTasks();
            closeModal();
        } catch (error) {
            console.error("Error saving task:", error.response?.data || error.message);
            toast.error("Failed to save task.");
        }
    };
    
    const deleteTask = async (taskId) => {
         if (!window.confirm("Are you sure you want to delete this task?")) return;
         try {
             await axiosInstance.delete(`${API_BASE_URL}${taskId}/`);
             await fetchTasks();
             toast.success("Task deleted!");
         } catch (error) {
            console.error("Error deleting task:", error.response?.data || error.message);
            toast.error("Failed to delete task.");
         }
    };

    const toggleComplete = async (task) => {
        try {
            const newStatus = task.status === 'done' ? 'in_progress' : 'done';
            const payload = { ...task, status: newStatus };
            await axiosInstance.put(`${API_BASE_URL}${task._id}/`, payload);
            await fetchTasks();
            toast.success("Status updated!");
        } catch (error) {
            console.error("Error updating task status:", error.response?.data || error.message);
            toast.error("Failed to update status.");
        }
    };

    const openModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    return (
        <>
            <div className="task-sections">
                <section>
                    <h2>In Progress</h2>
                    <div className="task-list">
                        <AnimatePresence>
                        {/* --- DEFINITIVE FIX: Ensure the filter uses an UNDERSCORE --- */}
                        {tasks.filter(t => t.status === 'in_progress').map(task => (
                            <TaskCard key={task._id} task={task} onToggleComplete={toggleComplete} onEdit={() => openModal(task)} onDelete={deleteTask} />
                        ))}
                        </AnimatePresence>
                    </div>
                </section>

                <section>
                    <h2>To Do</h2>
                    <div className="task-list">
                        <AnimatePresence>
                        {/* This filter is likely correct, but we confirm it */}
                        {tasks.filter(t => t.status === 'todo').map(task => (
                            <TaskCard key={task._id} task={task} onToggleComplete={toggleComplete} onEdit={() => openModal(task)} onDelete={deleteTask} />
                        ))}
                        </AnimatePresence>
                    </div>
                </section>
                
                <section className="done-section">
                    <h2>Done</h2>
                     <div className="task-list">
                        <AnimatePresence>
                        {/* This filter is likely correct, but we confirm it */}
                        {tasks.filter(t => t.status === 'done').map(task => (
                            <TaskCard key={task._id} task={task} onToggleComplete={toggleComplete} onEdit={() => openModal(task)} onDelete={deleteTask} />
                        ))}
                        </AnimatePresence>
                    </div>
                </section>
            </div>

             {isModalOpen && (
                <EditTaskModal
                    task={editingTask}
                    onSave={handleSaveTask}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default TaskList;