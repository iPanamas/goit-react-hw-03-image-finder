import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import * as api from 'components/API/api';
import React, { Component } from 'react';

class ImageGallery extends Component {
  state = {
    pictures: null,
    error: null,
    isLoading: false,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevCategory = prevProps.category;
    const newCategory = this.props.category;

    if (prevCategory !== newCategory) {
      try {
        this.setState({ status: 'pending' });
        const pictures = await api.getPictures(newCategory);
        this.setState({ pictures, status: 'resolved' });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { pictures, status } = this.state;

    if (status === 'idle') {
      return <h1 className={s.title}>Enter category name</h1>;
    }

    if (status === 'pending') {
      return <p>Загружаем</p>;
    }
    if (status === 'rejected') {
      return <h1>Что-то пошло не так, повторите попытку позже</h1>;
    }

    if (status === 'resolved') {
      return (
        <ul className={s.gallery}>
          {pictures.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}
        </ul>
      );
    }
  }
}

export default ImageGallery;
