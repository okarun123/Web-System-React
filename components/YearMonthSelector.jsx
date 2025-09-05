//components/YearMonthSelector.jsx
import { MONTHS, YEARS } from '../constants/holidays.js';

export const YearMonthSelector = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }) => (
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
        {YEARS.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
      <select 
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {MONTHS.map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
    </div>
  </div>
);