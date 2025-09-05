import React, { useState, useEffect } from 'react';
import { Calendar, Filter, List } from 'lucide-react';

const DateFilterApp = () => {
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

  // Holiday dates (you can modify these)
  const holidays = {
    'June 12': 'Independence Day',
    'April 9': 'Araw ng Kagitingan',
    'March 29': 'Maundy Thursday',
    'March 28': 'Good Friday',
    'January 1': 'New Year\'s Day',
    'August 26': 'National Heroes Day',
    'November 30': 'Bonifacio Day',
    'December 25': 'Christmas Day',
    'December 30': 'Rizal Day'
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const getDaysInMonth = (year, month) => {
    const monthIndex = months.indexOf(month);
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const getDayOfWeek = (year, month, day) => {
    const monthIndex = months.indexOf(month);
    const date = new Date(year, monthIndex, day);
    const dayIndex = date.getDay();
    // Convert Sunday (0) to be last (6), and shift others
    return daysOfWeek[(dayIndex + 6) % 7];
  };

  const isHoliday = (month, day) => {
    const dateStr = `${month} ${day}`;
    return holidays[dateStr];
  };

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
          date: new Date(selectedYear, months.indexOf(selectedMonth), day)
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

  const getSelectedDaysCount = () => {
    return Object.values(selectedDays).filter(Boolean).length;
  };

  const getTotalHolidays = () => {
    return filteredDates.filter(date => date.isHoliday).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Date Filter Application</h1>
          </div>

          {/* Year and Month Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year (Dropdown box, Fetch the data from computer system)
              </label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {[  1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 
                    1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 
                    1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 
                    1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 
                    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 
                    2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 
                    2023, 2024, 2025].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Month
              </label>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Day Selection Checkboxes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Select Days (Check what dates are needed to execute based on what is selected)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {daysOfWeek.map(day => (
                <label key={day} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDays[day]}
                    onChange={() => handleDayToggle(day)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{filteredDates.length}</div>
              <div className="text-sm text-gray-600">Total Filtered Dates</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getSelectedDaysCount()}</div>
              <div className="text-sm text-gray-600">Days Selected</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{getTotalHolidays()}</div>
              <div className="text-sm text-gray-600">Holidays in Results</div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <List className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Executable Output for {selectedMonth} {selectedYear}
            </h2>
          </div>

          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              On the month of "{selectedMonth}" the numbers of selected days in Year "{selectedYear}" 
              are "{filteredDates.map(d => `${selectedMonth.slice(0, 3)}. ${d.day}`).join(', ')}" 
              based on counting the number of selected days are: "{filteredDates.length}".
            </p>
            <p className="text-sm text-gray-700 mt-2">
              For the month of {selectedMonth} with holidays "{getTotalHolidays()}".
            </p>
          </div>

          {filteredDates.length > 0 ? (
            <div className="space-y-6">
              {/* Holidays Section FIRST */}
              <div className="p-6 bg-gray-900 text-green-400 rounded-lg font-mono">
                <h4 className="font-semibold text-white mb-3">
                  For the year: "{selectedYear}" the number of holidays are the following:
                </h4>
                <div className="text-left space-y-1">
                  {Object.entries(holidays).map(([date, name], index) => (
                    <div key={index} className="text-lg">
                      {date}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Output in Triangle Format */}
              <div className="p-6 bg-gray-900 text-green-400 rounded-lg font-mono">
                <h4 className="font-semibold text-white mb-3">
                  E.g (Month of {selectedMonth} {selectedYear}, {Object.entries(selectedDays).filter(([day, selected]) => selected).map(([day]) => day).join(', ')})
                </h4>
                <div className="text-left space-y-1">
                  {(() => {
                    const dateNumbers = filteredDates.map(dateInfo => dateInfo.day.toString());
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
                    
                    return triangleRows.map((row, index) => (
                      <div key={index} className="text-lg">
                        {row}
                      </div>
                    ));
                  })()}
                  <div className="text-white mt-4 text-sm">
                    This is the dates base on the selected checkbox base on the day in year {selectedYear}.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No dates match your selected criteria</p>
              <p className="text-sm">Try selecting different days of the week</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateFilterApp;