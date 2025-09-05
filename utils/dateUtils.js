//utils/dateUtils.js
import { MONTHS, HOLIDAYS } from '../constants/holidays.js';

export const getDaysInMonth = (year, month) => {
  const monthIndex = MONTHS.indexOf(month);
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const getDayOfWeek = (year, month, day) => {
  const monthIndex = MONTHS.indexOf(month);
  const date = new Date(year, monthIndex, day);
  const dayIndex = date.getDay();
  return DAYS_OF_WEEK[(dayIndex + 6) % 7];
};

export const isHoliday = (month, day) => {
  const dateStr = `${month} ${day}`;
  return HOLIDAYS[dateStr];
};

export const generateTrianglePattern = (dates) => {
  const dateNumbers = dates.map(dateInfo => dateInfo.day.toString());
  const triangleRows = [];
  let currentIndex = 0;
  let rowSize = 1;
  
  while (currentIndex < dateNumbers.length) {
    const rowDates = dateNumbers.slice(currentIndex, currentIndex + rowSize);
    const concatenatedRow = rowDates.join('');
    triangleRows.push(concatenatedRow);
    currentIndex += rowSize;
    rowSize++;
  }
  
  return triangleRows;
};