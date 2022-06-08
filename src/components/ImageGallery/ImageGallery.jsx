import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ pictures }) => {
  return (
    <ul className={s.gallery}>
      {pictures.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
      ))}
    </ul>
  );
};

export default ImageGallery;
