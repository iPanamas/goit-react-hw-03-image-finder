import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className={s.galleryItem}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
