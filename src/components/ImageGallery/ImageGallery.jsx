import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ imageItems, onClick }) => {
  return (
    <ul className={s.gallery}>
      {imageItems.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={() => onClick(largeImageURL)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
