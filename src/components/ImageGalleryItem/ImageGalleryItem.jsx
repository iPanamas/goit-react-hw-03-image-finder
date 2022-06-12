import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <li className={s.galleryItem} onClick={onClick}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
