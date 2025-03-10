import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

// todo
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('/service-worker.js')
//         .then((registration) => {
//             console.log('Service Worker registered with scope:', registration.scope);
//         })
//         .catch((error) => {
//             console.error('Service Worker registration failed:', error);
//         });
// }

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
