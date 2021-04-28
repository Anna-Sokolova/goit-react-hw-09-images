import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

const Searchbar = ({ children }) => (
  <header className={styles.searchbar}>{children}</header>
);

Searchbar.defaultProps = {
  children: [],
};

Searchbar.propTypes = {
  children: PropTypes.node,
};

export default Searchbar;
