import React, { Component } from 'react';
// Components
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

// Toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import * as api from 'components/API/api';

export class App extends Component {
  state = {
    imageCount: 1,
    category: '',
    imageItems: [],
    error: null,
    status: 'idle',
    showModal: false,
    fullSizeImage: '',
  };

  async componentDidUpdate(_, prevState) {
    const { imageCount, category } = this.state;
    const prevCategory = prevState.category;

    const newCategory = category;

    if (prevCategory !== newCategory) {
      this.getImages();
    }
    if (imageCount !== prevState.imageCount && imageCount !== 1) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { category, imageCount } = this.state;
    try {
      this.setState({ status: 'pending' });
      const pictures = await api.getPictures(category, imageCount);

      if (pictures.length === 0) {
        this.setState({ status: 'idle' });
        return toast.error(`${category} not found`);
      }
      this.setState(prevState => ({
        imageItems: [...prevState.imageItems, ...pictures],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  imageCategory = category => {
    this.setState({ category, imageItems: [], imageCount: 1 });
  };

  nextPage = () => {
    this.setState(prevState => ({
      imageCount: prevState.imageCount + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  bigImage = event => {
    this.toggleModal();
    this.setState({ fullSizeImage: event });
  };

  render() {
    const { imageCategory, toggleModal, nextPage, bigImage } = this;
    const { imageItems, showModal, fullSizeImage, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={imageCategory} />
        <Container>
          {status === 'pending' && <Loader />}
          <ImageGallery imageItems={imageItems} onClick={bigImage} />
          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={fullSizeImage} alt="Stepan" />
            </Modal>
          )}

          {imageItems.length > 0 && <Button nextPage={nextPage} />}
        </Container>
        <ToastContainer autoClose={3000} />;
      </>
    );
  }
}
