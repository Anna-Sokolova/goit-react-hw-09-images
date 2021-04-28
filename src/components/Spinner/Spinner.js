import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <Loader
      className={styles.loaderSpinner}
      type="ThreeDots"
      color="#3f51b5"
      height={80}
      width={80}
      timeout={3000}
    />
  );
};

export default Spinner;
