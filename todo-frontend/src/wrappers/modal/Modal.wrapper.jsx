import React, { useContext, createContext, useEffect, useState } from 'react';
import s from './Modal.module.css';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModal(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setModal(false);
    setModalContent(null);
  };

  const toClose = (e) => {
    if (e.target.classList.contains(s.modal__container)) {
      closeModal();
    }
  };

  return (
    <ModalContext.Provider
      value={{
        modal,
        modalContent,
        openModal,
        closeModal,
      }}
    >
      {modal && (
        <div className={s.modal__container} onClick={toClose}>
          <div className={s.modal__content}>
            <div className={s.modal__close} onClick={closeModal}>
              X
            </div>
            {modalContent}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
}
