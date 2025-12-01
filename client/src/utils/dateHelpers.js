export const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day; // Get Sunday
  const weekStart = new Date(d.setDate(diff));
  return weekStart.toISOString().split('T')[0];
};

export const getWeekDates = (weekStart) => {
  const dates = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    dates.push({
      dayName: days[i],
      date: date.toISOString().split('T')[0],
      displayDate: date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    });
  }
  
  return dates;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).replace(/\//g, '.');
};
