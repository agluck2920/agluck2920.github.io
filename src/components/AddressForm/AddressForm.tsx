import * as React from 'react';
import { FormData } from '../../types/types';

interface Props {
  data?: FormData
  onChange?: (formData: FormData) => void 
  disabled?: boolean
}

export default function AddressForm(props: Props) {

  const {data, onChange, disabled} = props;

  return (
    <div className='component-container'>
      <label htmlFor='address'>Address</label>
      <input 
        id="address" 
        name='address'
        type='text'
        disabled={disabled}
        value={data && data.address}
        onChange={(e) => onChange && onChange({...data, address: e.target.value})} 
      />
      <label htmlFor='city'>City</label>
      <input 
        id="city" 
        name='city'
        type='text'
        disabled={disabled}
        value={data && data.city}
        onChange={(e) => onChange && onChange({...data, city: e.target.value})} 
      />
      <label htmlFor='state'>State</label>
      <input 
        id="state" 
        name='state'
        type='text'
        disabled={disabled}
        value={data && data.state}
        onChange={(e) => onChange && onChange({...data, state: e.target.value})} 
      />
      <label htmlFor='zip'>Zip</label>
      <input 
        id="zip" 
        name='zip'
        type='text'
        disabled={disabled}
        value={data && data.zip}
        onChange={(e) => onChange && onChange({...data, zip: e.target.value})} 
      />
    </div>
  );
}