//components/OutputDisplay.jsx
import { HOLIDAYS } from '../constants/holidays.js';
import { generateTrianglePattern } from '../utils/dateUtils.js';

export const OutputDisplay = ({ selectedYear, selectedMonth, selectedDays, filteredDates }) => {
  const selectedDayNames = Object.entries(selectedDays)
    .filter(([day, selected]) => selected)
    .map(([day]) => day)
    .join(', ');

  const triangleRows = generateTrianglePattern(filteredDates);

  return (
    <div className="space-y-6">
      {/* Holidays Section */}
      <div className="p-6 bg-gray-900 text-green-400 rounded-lg font-mono">
        <h4 className="font-semibold text-white mb-3">
          For the year: "{selectedYear}" the number of holidays are the following:
        </h4>
        <div className="text-left space-y-1">
          {Object.entries(HOLIDAYS).map(([date, name], index) => (
            <div key={index} className="text-lg">{date}</div>
          ))}
        </div>
      </div>

      {/* Triangle Output */}
      <div className="p-6 bg-gray-900 text-green-400 rounded-lg font-mono">
        <h4 className="font-semibold text-white mb-3">
          E.g (Month of {selectedMonth} {selectedYear}, {selectedDayNames})
        </h4>
        <div className="text-left space-y-1">
          {triangleRows.map((row, index) => (
            <div key={index} className="text-lg">{row}</div>
          ))}
          <div className="text-white mt-4 text-sm">
            This is the dates base on the selected checkbox base on the day in year {selectedYear}.
          </div>
        </div>
      </div>
    </div>
  );
};