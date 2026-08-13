import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ContactFormModal } from '../components/ContactFormModal';

type FormModalContextValue = {
  openFormModal: () => void;
  closeFormModal: () => void;
};

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openFormModal = useCallback(() => setOpen(true), []);
  const closeFormModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openFormModal, closeFormModal }),
    [openFormModal, closeFormModal]
  );

  return (
    <FormModalContext.Provider value={value}>
      {children}
      <ContactFormModal open={open} onClose={closeFormModal} />
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error('useFormModal must be used within FormModalProvider');
  }
  return context;
}
