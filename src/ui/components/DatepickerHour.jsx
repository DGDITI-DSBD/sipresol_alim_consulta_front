


import React from "react";
import Flatpickr from 'react-flatpickr';
import { Spanish } from "flatpickr/dist/l10n/es.js"

export const DatepickerHour = React.forwardRef((props, ref) => {

    const options = {
        mode: 'single',
        locale: Spanish,
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
      }

  return (
    <div className="relative">
      <Flatpickr 
        className="form-input w-full text-lg ml-2 mt-1 text-gray-800 bg-transparent border-0 border-b-2 focus:border-cyan-600 border-gray-400 appearance-none hover:cursor-pointer" 
        options={options} 
        ref={ref}
        {...props}
      />
      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg className="w-4 h-4 fill-current text-slate-500" viewBox="0 0 16 16">
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
    </div>
  )
})
