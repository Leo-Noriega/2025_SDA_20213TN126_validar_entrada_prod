"use client";
import React from 'react';
import { useField } from 'formik';

const TextInputLiveFeedback = ({ label, helpText, phoneCode, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  
  const showFeedback = props.type === 'tel' 
    ? (!!didFocus && field.value.length > 0) || meta.touched
    : (!!didFocus && field.value.trim().length > 2) || meta.touched;

  const handleChange = (e) => {
    if (props.type === 'tel' && phoneCode) {
      const value = e.target.value;
      const numberPart = value.replace(phoneCode, '').trim().replace(/\D/g, '');
      
      if (numberPart.length <= 10) {
        field.onChange({
          target: {
            name: field.name,
            value: numberPart,
            type: 'tel',
            id: props.id
          }
        });
      }
    } else {
      field.onChange(e);
    }
  };

  const displayValue = props.type === 'tel' && phoneCode
    ? field.value.length > 0
      ? `${phoneCode} ${field.value}`
      : `${phoneCode} `
    : field.value;

  return (
    <div className={`form-control ${showFeedback ? (meta.error ? 'border-red-500' : 'border-green-500') : ''}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={props.id} className="text-lg font-semibold">{label}</label>
        {showFeedback ? (
          <div id={`${props.id}-feedback`} aria-live="polite" className={`feedback text-sm ${meta.error ? 'text-red-500' : 'text-green-500'}`}>
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <input
        {...field}
        {...props}
        value={displayValue}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
        style={props.style}
      />
      {helpText && (
        <div className="text-xs text-gray-500 mt-1" id={`${props.id}-help`} tabIndex="-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default TextInputLiveFeedback;