import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Places from './components/Places';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Places />
);

export default App;
