import { createRoot } from 'react-dom/client';
import App from './App';  // Note: Ensure App.js is correctly transpiled from App.tsx
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
}
