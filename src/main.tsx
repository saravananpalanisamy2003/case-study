import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { FormModalProvider } from './context/FormModalContext.tsx';
import { TabProvider } from './context/TabContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabProvider>
      <FormModalProvider>
        <App />
      </FormModalProvider>
    </TabProvider>
  </StrictMode>
);
