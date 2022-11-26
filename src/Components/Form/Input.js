import React from 'react';
import styles from './Input.module.css';

const Input = ({
  type,
  placeholder,
  label,
  name,
  value,
  onChange,
  error,
  onBlur,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
