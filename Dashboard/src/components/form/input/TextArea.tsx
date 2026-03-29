import React from "react";

interface TextareaProps {
  label?: string; // Add label property
  description?: string; // Add description property
  id?: string;
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows
  value?: string; // Current value
  onChange?: (value: string) => void; // Change handler
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  hint?: string; // Hint text to display
  required?: boolean;
}

const TextArea: React.FC<TextareaProps> = ({
  id, // Destructure id
  placeholder = "Enter your message", // Default placeholder
  rows = 3, // Default number of rows
  value = "", // Default value
  onChange, // Callback for changes
  className = "", // Additional custom styles
  disabled = false, // Disabled state
  error = false, // Error state
  hint = "", // Default hint text
  required = false,
  label, // Destructure label
  description, // Destructure description
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className} `;

  if (disabled) {
    textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    textareaClasses += ` bg-transparent  border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
  } else {
    textareaClasses += ` bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id} // Pass id to textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required} // Pass required to textarea
        className={textareaClasses}
      />
      {(hint || description) && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint || description}
        </p>
      )}
    </div>
  );
};

export default TextArea;
