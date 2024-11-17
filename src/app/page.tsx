"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import AboutMe from '../components/AboutMe/AboutMe';
import AddressForm from '../components/AddressForm/AddressForm';
import DateOfBirthSelector from '../components/DateOfBirthSelector/DateOfBirthSelector';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import useDebounce from '../hooks/useDebounce';
import { Config, FormData } from '../types/types';

export default function Home() {

  const [page, setPage] =  useState(1);
  const [isInitialRender, setInitialRender] = useState(true);

  const [config, setAdminConfig] = useState<Config>();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password:  '',
    aboutMeText: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const debouncedFormData = useDebounce(formData, 1000);

  useEffect(() => {
    const storedPage = localStorage.getItem('page');
    setPage(storedPage !== null ? parseInt(storedPage) : 1);
    setFormData({
      ...formData,
      email: localStorage.getItem('email') || '',
      password: localStorage.getItem('password') || ''
    });

    fetchUser(localStorage.getItem('email') || '');
    fetchAdminConfig();
  }, []);

  useEffect(() => {
    if (page !== 1) { 
      if (!isInitialRender) {
        handleUpdateForm();
      } else {
        setInitialRender(false);
      }
    }
    
  }, [debouncedFormData]);

  function handleUserSubmission() {
    if (formData.email && formData.password) {
      handleUpdateForm();
      setPage(2);

      localStorage.setItem('email', formData.email);
      localStorage.setItem('password', formData.password);
      localStorage.setItem('page', '2');
    }
  }

  function handlePageChange(page: number) {
    localStorage.setItem('page', page.toString());
    setPage(page);
  }

  function handleFormSubmission() {      
    setFormData({
      email: '',
      password:  '',
      aboutMeText: '',
      dob: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    });
    setPage(1);
    localStorage.clear();
  }

  async function handleUpdateForm() {
    const response = await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify({formData})
    });

    await response.json();  
  }

  async function fetchAdminConfig() {
    const response = await fetch(`/admin/api`);

    const data = await response.json();

    setAdminConfig(data.config);
  }

  async function fetchUser(email: string) {
    const response = await fetch(`/api?` + new URLSearchParams({
      email: email
    }).toString());

    const data = await response.json();

    if (data.user && data.user.email) {
      setFormData({
        email: data.user.email,
        password: data.user.password,
        aboutMeText: data.user.metadata.aboutText,
        dob: data.user.metadata.dob,
        address:  data.user.address.street_address,
        city: data.user.address.city,
        state: data.user.address.state,
        zip: data.user.address.zip
      }); 
    }
  }

  function handleComponentRender(name: string, currentPage: number, headerPage: number) {
    if (name === 'aboutMe' && (currentPage === headerPage)) {
      return <AboutMe value={formData.aboutMeText} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, aboutMeText: e.target.value})}/>
    } else if (name === 'dateOfBirth' && (currentPage === headerPage)) {
      return <DateOfBirthSelector value={formData.dob} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, dob: e.target.value})}/>
    } else if (name === 'address' && (currentPage === headerPage)) {
      return <AddressForm data={formData} onChange={setFormData}/>
    } else {
      return null;
    }
  }

  return (
    config &&
    <div className={styles.page}>
      <ProgressBar page={page}/>
      {
        page === 1 &&
          <div className={styles['input-container']}>
            <input 
              name='email' 
              placeholder='Enter Email'
              type='text'
              className={styles.input}
              value={formData.email} 
              onChange={(event) => setFormData({...formData, email: event.target.value})}
            />
            <input 
              name='password' 
              placeholder='Password'
              type='text'
              className={styles.input}
              value={formData.password} 
              onChange={(event) => setFormData({...formData, password: event.target.value})}
            />
            <button className={styles.submit} onClick={handleUserSubmission}>Submit</button>
          </div>
      }
      {
        page === 2 && 
        <React.Fragment>
          {Object.values(config).map((component, index) => { 
              const componentToRender = handleComponentRender(component.name, component.currentPage, 2);
              return (componentToRender && <div key={index}>{componentToRender}</div>);
          })}
          
          <button className={styles.continue} onClick={() => handlePageChange(page + 1)}> Continue</button>

        </React.Fragment>
      }
      {
         page === 3 &&
        <React.Fragment>
          {Object.values(config).map((component, index) => { 
              const componentToRender = handleComponentRender(component.name, component.currentPage, 3);
              return (componentToRender && <div key={index}>{componentToRender}</div>);
          })}

          <div>
            <button className={styles.back} onClick={() => handlePageChange(page - 1)}> Back</button>
            <button className={styles.complete} onClick={handleFormSubmission}> Submit</button>
          </div>
        </React.Fragment>
      }
    </div>
  );
}
