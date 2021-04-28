import React, { Component } from 'react';
import { createPortal } from 'react-dom'; // импорт метода для создания портала для модалки
import PropTypes from 'prop-types';

import ButtonClose from '../ButtonClose';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root'); //находим элемент в ДОМе, чтоб зарендерить в него разметку модалки

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  };

  componentDidMount() {
    //вешаем слушателя на window на событие нажатия кнопки
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    //снимаем слушателя с window на событие нажатия кнопки, чтобы избежать утечки памяти
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  //метод для закрытия модалки по кнопке ESC
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  //метод для закрытия модалки по бекдропу
  handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { url, onClose } = this.props;

    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClose}>
        <div className={styles.modal}>
          <img src={url} alt="" />
        </div>
        <ButtonClose onClose={onClose} />
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
