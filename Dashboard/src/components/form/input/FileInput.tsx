import { FC } from "react";

interface FileInputProps {
  label?: string; // Add label property
  description?: string; // Add description property
  id?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  allowedTypes?: string[]; // Add allowedTypes property
  maxSize?: number; // Add maxSize property
}

const FileInput: FC<FileInputProps> = ({
  id,
  className,
  onChange,
  hint,
  label, // Destructure label
  description, // Destructure description
  allowedTypes, // Destructure allowedTypes
  maxSize, // Destructure maxSize
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (allowedTypes && !allowedTypes.includes(file.type)) {
        alert(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
        e.target.value = ''; // Clear the input
        return;
      }
      if (maxSize && file.size > maxSize) {
        alert(`File size exceeds limit. Max size: ${maxSize / (1024 * 1024)}MB`);
        e.target.value = ''; // Clear the input
        return;
      }
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
      )}
      <input
        id={id}
        type="file"
        className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 ${className}`}
        onChange={handleFileChange}
      />
      {(hint || description) && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          {hint || description}
        </p>
      )}
    </div>
  );
};

export default FileInput;
