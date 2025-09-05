//hooks/useDateFilter.js
import { useState, useEffect } from 'react';
import { getDaysInMonth, getDayOfWeek, isHoliday } from '../utils/dateUtils.js';
import { MONTHS } from '../constants/holidays.js';

export const useDateFilter = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: true,
    Wednesday: false,
    Thursday: false,
    Friday: true,
    Saturday: true,
    Sunday: true
  });
  const [filteredDates, setFilteredDates] = useState([]);

  const filterDates = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const filtered = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = getDayOfWeek(selectedYear, selectedMonth, day);
      const holidayName = isHoliday(selectedMonth, day);
      
      if (selectedDays[dayOfWeek]) {
        filtered.push({
          day,
          dayOfWeek,
          isHoliday: !!holidayName,
          holidayName: holidayName || null,
          date: new Date(selectedYear, MONTHS.indexOf(selectedMonth), day)
        });
      }
    }
    return filtered;
  };

  useEffect(() => {
    setFilteredDates(filterDates());
  }, [selectedYear, selectedMonth, selectedDays]);

  const handleDayToggle = (day) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedDays,
    handleDayToggle,
    filteredDates,
    getSelectedDaysCount: () => Object.values(selectedDays).filter(Boolean).length,
    getTotalHolidays: () => filteredDates.filter(date => date.isHoliday).length
  };
};