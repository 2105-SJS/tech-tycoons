import axios from "axios";
import React from "react";
const baseURL = ''

export const callApi = async ({ url, method, token, body }) => {
  try {
    const options = {
      method: method ? method.toUpperCase() : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${url}`, options);
    console.log('resp:', response)
    const data = await response.json();
    console.log('data:', data)

    if (data.error) {
      throw (data.error)
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}