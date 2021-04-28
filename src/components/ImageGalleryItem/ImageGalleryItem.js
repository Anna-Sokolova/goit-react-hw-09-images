import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onClick }) => (
  <li className={styles.imageGalleryItemImage}>
    <img
      src={src}
      alt={alt}
      className={styles.imageGalleryItemImage}
      onClick={onClick}
    />
  </li>
);

export default ImageGalleryItem;
