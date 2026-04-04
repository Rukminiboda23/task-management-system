// frontend/src/components/EditTaskModal.js

import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
    const isEditing = Boolean(task); 

    const [formData, setFormData] = useState({
        title: '', description: '', priority: 'medium',
        category: 'personal', status: 'todo', due_date: ''
    });

    useEffect(() => {
        if (isEditing) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'medium',
                category: task.category || 'personal',
                status: task.status || 'todo',
                due_date: task.due_date ? task.due_date.split('T')[0] : ''
            });
        }
    }, [task, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(task ? task._id : null, formData);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {/* Dynamic title */}
                <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSave}>
                    {/* All form inputs are the same as before */}
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange}>
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="study">Study</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange}>
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="due_date">Due Date</label>
                            <input id="due_date" name="due_date" type="date" value={formData.due_date} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-save">
                        {isEditing ? 'Save Changes' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;