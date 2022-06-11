import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import * as api from 'components/API/api';
import React, { Component } from 'react';

class ImageGallery extends Component {
  state = {
    imageItems: [],
    error: null,
    isLoading: false,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevCategory = prevProps.category;
    const newCategory = this.props.category;

    const prevPage = prevProps.imageCount;
    const nextPage = this.props.imageCount;

    const { imageItems } = this.state;
    if (prevCategory !== newCategory || prevPage !== nextPage) {
      try {
        this.setState({ status: 'pending' });
        const pictures = await api.getPictures(newCategory, nextPage);
        this.setState({
          imageItems: [...imageItems, ...pictures],
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { imageItems, status } = this.state;

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
          {imageItems.map(({ id, webformatURL, tags }) => (
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
