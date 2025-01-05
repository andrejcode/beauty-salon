interface FormGroupProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  fieldValue: string;
  fieldError: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function FormGroup({
  label,
  type,
  name,
  placeholder,
  fieldValue,
  fieldError,
  onChange,
  onBlur,
}: FormGroupProps) {
  return (
    <div className="my-4">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <input
        type={type}
        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none ${
          fieldError
            ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-pink-100 focus:ring-pink-100'
        }`}
        id={name}
        name={name}
        placeholder={placeholder}
        value={fieldValue}
        onChange={onChange}
        onBlur={onBlur}
      />
      {fieldError && (
        <div role="alert" aria-live="polite" className="mt-2 text-red-500">
          {fieldError}
        </div>
      )}
    </div>
  );
}
