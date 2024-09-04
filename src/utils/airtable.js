import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your Airtable API key
const BASE_ID = import.meta.env.VITE_BASE_ID; // Replace with your Airtable Base ID

const airtable = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE_ID}`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default airtable;
