import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiClock, FiTag, FiFlag } from 'react-icons/fi';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={`task-item status-${task.status.replace('_', '-')}`}
      variants={cardVariants}
      initial="hidden"  
      animate="visible" 
      exit="exit"       
      layout            
    >
      <div className="task-info">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.status === 'done'}
          onChange={() => onToggleComplete(task)}
        />
        <div className="task-text">
          <strong>{task.title}</strong>
          {task.description && <p>{task.description}</p>}
        </div>
      </div>

      <div className="task-meta">
        <span className={`pill priority-${task.priority}`}>
          <FiFlag /> {task.priority}
        </span>
        <span className="pill category">
          <FiTag /> {task.category}
        </span>
        {task.due_date && (
          <span className="pill due-date">
            <FiClock /> {task.due_date.split('T')[0]}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button className="edit-btn" onClick={() => onEdit(task)} aria-label="Edit Task">
          <FiEdit2 />
        </button>
        <button className="delete-btn" onClick={() => onDelete(task._id)} aria-label="Delete Task">
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;