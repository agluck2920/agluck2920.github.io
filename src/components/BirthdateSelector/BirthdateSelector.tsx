import React from 'react';
import styles from './page.module.css';

interface Props {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export default function BirthdateSelector(props: Props) {

  const {value, onChange, disabled} = props;

  return (
    <div className='component-container'>
      <label htmlFor="birthday">Birthday</label>
      <input 
        type="date" 
        id="birthday" 
        name="birthday"
        disabled={disabled}
        className={styles.date}
        value={value}
        onChange={onChange}
        />
    </div>
  );
}