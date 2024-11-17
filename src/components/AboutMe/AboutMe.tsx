import React from 'react';

interface Props {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
}

export default function AboutMe(props: Props) {

  const {value, onChange, disabled} = props;

  return (
    <div className='component-container'>
        <label htmlFor='about-me'>About Me</label>
        <textarea 
          id="about-me" 
          name='about-me'
          rows={5}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
    </div>
  );
}