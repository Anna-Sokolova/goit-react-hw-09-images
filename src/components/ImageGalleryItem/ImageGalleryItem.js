import React from 'react';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import ButtomDelete from '../ButtonDelete';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onClick, onDelete }) => (
  <li className={styles.imageGalleryItemImage}>
    <img
      src={src}
      alt={alt}
      className={styles.imageGalleryItemImage}
      onClick={onClick}
    />
    <ButtomDelete onClick={onDelete} aria-label="Delete img">
      <DeleteIcon width="15" height="15" />
    </ButtomDelete>
  </li>
);

export default ImageGalleryItem;
