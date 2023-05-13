import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import schema from './api-schema.json';
import './App.css';
import './themes.css';

function App() {
  const uiSchema = {/* Define UI schema based on the API schema */};
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [customCSS, setCustomCSS] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/items');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {/* Render other components */}
      <JsonForms
        schema={schema}
        uiSchema={uiSchema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
      />

      {/* Error handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Custom CSS */}
      <textarea
        value={customCSS}
        onChange={(e) => setCustomCSS(e.target.value)}
        placeholder="Enter custom CSS"
      />
      <style>{customCSS}</style>
    </div>
  );
}

export default App;
