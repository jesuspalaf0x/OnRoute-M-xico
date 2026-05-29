import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'

// Setup globals for prototype
window.React = React;
window.ReactDOM = { createRoot };

import './icons.jsx';
import './data.jsx';
import './screens-dashboard.jsx';
import './screens-admin.jsx';
import './screens-flow.jsx';

// Instead of App from App.jsx, we can just let app.jsx render itself.
// Wait, app.jsx does its own ReactDOM.createRoot. 
// So we just import it here.
import './App.jsx';
