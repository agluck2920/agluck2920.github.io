"use client";

import React, { useState, useEffect } from 'react';

interface UserData {
  email: string
  password: string
  address: {
    street_address: string
    city: string
    state: string
    zip: string
  },
  metadata: {
    aboutText: string
    dob: string
  }
}

export default function Data() {
  
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
      const response = await fetch('/data/api');

      const data = await response.json();

      setUserData(data);
  }

  return (
    <React.Fragment>
      <h1>
        User Data Table
      </h1>
      <table>
        <tbody>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>About Me</th>
            <th>Birthday</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
          {
            userData.map((data: UserData, index) => (
              <tr key={index}>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td>{data.metadata.aboutText}</td>
                <td>{data.metadata.dob}</td> 
                <td>{data.address.street_address}</td>
                <td>{data.address.city}</td> 
                <td>{data.address.state}</td>
                <td>{data.address.zip}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
  </React.Fragment>
  );
}