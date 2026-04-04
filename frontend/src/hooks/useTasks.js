// frontend/src/hooks/useTasks.js

import { useState, useEffect, useCallback } from 'react'; // Add useCallback
import axiosInstance from '../api/axiosClient'; 

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      // --- THE FIX: Use axiosInstance instead of axios ---
      const res = await axiosInstance.get('/api/tasks/');
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks!", error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, setTasks, fetchTasks };
};

export default useTasks;