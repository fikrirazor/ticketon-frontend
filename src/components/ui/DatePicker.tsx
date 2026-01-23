import React from 'react';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, error, touched, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="datetime-local"
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
          touched && error ? 'border-red-500' : 'border-gray-200'
        } ${className}`}
        {...props}
      />
      {touched && error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
