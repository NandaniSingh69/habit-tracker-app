import axios from 'axios';

// Use environment variable for API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// For now, use a dummy userId. Later you'll add authentication
const DUMMY_USER_ID = '674c1234567890abcdef1234';

export const taskAPI = {
  getWeeklyTasks: async (weekStart) => {
    const response = await axios.get(
      `${API_BASE_URL}/tasks/week/${weekStart}?userId=${DUMMY_USER_ID}`
    );
    return response.data;
  },
  
  createTask: async (taskData) => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, {
      ...taskData,
      userId: DUMMY_USER_ID
    });
    return response.data;
  },
  
  updateTask: async (taskId, completed) => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, {
      completed
    });
    return response.data;
  },
  
  deleteTask: async (taskId) => {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  }
};

export const habitAPI = {
  getHabits: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/habits?userId=${DUMMY_USER_ID}`
    );
    return response.data;
  },
  
  createHabit: async (habitData) => {
    const response = await axios.post(`${API_BASE_URL}/habits`, {
      ...habitData,
      userId: DUMMY_USER_ID
    });
    return response.data;
  },
  
  toggleHabitCompletion: async (habitId, date) => {
    const response = await axios.put(
      `${API_BASE_URL}/habits/${habitId}/toggle`,
      { date }
    );
    return response.data;
  }
};

export const progressAPI = {
  getWeeklyProgress: async (weekStart) => {
    const response = await axios.get(
      `${API_BASE_URL}/progress/week/${weekStart}?userId=${DUMMY_USER_ID}`
    );
    return response.data;
  }
};
