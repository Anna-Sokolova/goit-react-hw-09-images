import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

const Container = ({ title, children }) => {
  return (
    <div className={styles.container}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

Container.defaultProps = {
  title: '',
};

Container.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Container;
