import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openlargeImageURL }) => (
  <ul className={styles.imageGallery}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => {
      
      const getImageLink = () => openlargeImageURL(largeImageURL); //записываем инлайн коллбек в функцию для передачи как проп детям

      return (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          selectedImageModal={largeImageURL}
          onClick={getImageLink}
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
