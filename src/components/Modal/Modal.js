import React, { useEffect } from 'react';

import { createPortal } from 'react-dom'; // импорт метода для создания портала для модалки

import ButtonClose from '../ButtonClose';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root'); //находим элемент в ДОМе, чтоб зарендерить в него разметку модалки

export default function Modal({ url, onClose }) {
  useEffect(() => {
    //функция для закрытия модалки по кнопке ESC
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose(); //функцию onClose нужно мемоизировать в основном компоненте, чтоб не было перерендеринга
      }
    };

    //вешаем слушателя на window на событие нажатия кнопки
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      //снимаем слушателя с window на событие нажатия кнопки, чтобы избежать утечки памяти
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  //функция для закрытия модалки по бекдропу
  const handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClose}>
      <div className={styles.modal}>
        <img src={url} alt="" />
      </div>
      <ButtonClose onClose={onClose} />
    </div>,
    modalRoot,
  );
}
