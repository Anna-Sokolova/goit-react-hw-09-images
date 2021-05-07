import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openlargeImageURL, onDelete }) => (
  <ul className={styles.imageGallery}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => {
      //записываем инлайн коллбек в переменную для передачи как проп детям
      const getImageLink = () => openlargeImageURL(largeImageURL); //получаем url большой картинки
      const getImageIdForDelete = () => onDelete(id); //получаем id для удаления картинки из галлереи

      return (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          selectedImageModal={largeImageURL}
          onClick={getImageLink}
          onDelete={getImageIdForDelete}
        />
      );
    })}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ).isRequired,
  openlargeImageURL: PropTypes.func.isRequired,
};

export default ImageGallery;
