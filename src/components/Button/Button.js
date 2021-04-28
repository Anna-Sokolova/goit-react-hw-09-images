import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onIncrement }) => (
  <button type="button" className={styles.button} onClick={onIncrement}>
    Load more...
  </button>
);

Button.propTypes = {
  onIncrement: PropTypes.func.isRequired,
};

export default Button;
