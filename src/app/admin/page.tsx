"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import AboutMe from '../../components/AboutMe/AboutMe';
import AddressForm from '../../components/AddressForm/AddressForm';
import BirthdateSelector from '../../components/BirthdateSelector/BirthdateSelector';
import { Config } from '../../types/types';

interface SingleConfig {
  name: string,
  currentPage: number
}

export default function Admin() {
  
  const [config, setAdminConfig] = useState<Config>();

  const [pageComponentCount, setPageComponentCount] = useState({
      pageTwo: 0,
      pageThree: 0
  })

  useEffect(() => {
    fetchAdminConfig();
  }, []);

  useEffect(() => {
    setPageComponentCount({
      pageTwo: 0,
      pageThree: 0
    });

    if (config) {
      Object.values(config).map((component) => {
        if (component.currentPage === 2) {
          setPageComponentCount((prevCount) => {
            return { pageTwo: prevCount.pageTwo + 1, pageThree: prevCount.pageThree }
          }) 
        } else {
          setPageComponentCount((prevCount) => {
            return { pageTwo: prevCount.pageTwo , pageThree: prevCount.pageThree + 1}
          })
        }
      })
    }

  }, [config]);

  async function fetchAdminConfig() {
    const response = await fetch('/admin/api');

    const data = await response.json();

    setAdminConfig(data.config);
  }

  async function updateAdminConfig(configObject: Config) { 
    const response = await fetch('/admin/api', {
      method: 'POST',
      body: JSON.stringify(configObject)
    });

    await response.json();

    fetchAdminConfig();
  }

  function handlePageMove(configToUpdate: SingleConfig) {
      let newConfig: any = {...config};
      
      newConfig[configToUpdate.name] = {
        name: configToUpdate.name,
        currentPage: configToUpdate.currentPage === 2 ? 3 : 2
      }

      updateAdminConfig(newConfig);
  }

  function handleComponentRender(name: string, currentPage: number, headerPage: number) {
    if (name === 'aboutMe' && (currentPage === headerPage)) {
      return <AboutMe disabled/>
    } else if (name === 'dateOfBirth' && (currentPage === headerPage)) {
      return <BirthdateSelector disabled/>
    } else if (name === 'address' && (currentPage === headerPage)) {
      return <AddressForm disabled/>
    } else {
      return null;
    }
  }

  return (
    config &&
    <React.Fragment>
      <h1 className={styles.header}>Please customize your onboarding pages</h1>
      <div className={styles['page-header']}>
        <div className={styles['page-content']}>
          <h2>Page 2</h2>
          {
            Object.values(config).map((component, index) => {              
              const componentToRender = handleComponentRender(component.name, component.currentPage, 2);
        
              return (
                componentToRender &&
                <div key={index} className={styles.container}>
                  {componentToRender}
                  <button 
                    className={styles['move-button']} 
                    onClick={() => handlePageMove(component)}
                    disabled={pageComponentCount.pageTwo === 1}
                    >
                      Move to Page 3
                  </button>
                </div>
              );
            })
          }
        </div>
        <div className={styles['page-content']}>
          <h2>Page 3</h2>
          {
            Object.values(config).map((component, index) => {
              const componentToRender = handleComponentRender(component.name, component.currentPage, 3);

              return (
                componentToRender &&
                <div key={index} className={styles.container}>
                  {componentToRender}
                  <button 
                    className={`${styles['move-button']}`} 
                    onClick={() => handlePageMove(component)}
                    disabled={pageComponentCount.pageThree === 1}
                    >
                      Move to Page 2
                  </button>
                </div>
              );
            })
          }
        </div>
      </div>
    </React.Fragment>
  );
}
