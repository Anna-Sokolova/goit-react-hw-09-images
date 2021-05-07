import React from 'react';
import PropTypes from 'prop-types';
import styles from './ButtonDelete.module.css';

const ButtonDelete = ({ children, onClick, ...alyProps }) => (
  <button
    type="button"
    className={styles.IconButton}
    onClick={onClick}
    {...alyProps}
  >
    {children}
  </button>
);

ButtonDelete.defaultProps = {
  children: null,
  onClick: () => null,
};

ButtonDelete.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};

export default ButtonDelete;