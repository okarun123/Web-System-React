//Components/DaySelector.jsx
import React from 'react';
import { DAYS_OF_WEEK } from '../constants/holidays.js';

export const DaySelector = ({ selectedDays, onDayToggle }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">
      Select Days (Check what dates are needed to execute based on what is selected)
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {DAYS_OF_WEEK.map(day => (
        <label key={day} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedDays[day]}
            onChange={() => onDayToggle(day)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">{day}</span>
        </label>
      ))}
    </div>
  </div>
);