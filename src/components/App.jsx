import React, { Component } from 'react';
import axios from 'axios';
// Components
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
// import Modal from './Modal/Modal';

// API
import api from './API/api';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    pictures: [],
    error: null,
  };

  async componentDidMount() {
    try {
      const pictures = await api.getPictures('cat', '1');
      this.setState({ pictures });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { pictures } = this.state;
    console.log(pictures);
    return (
      <>
        <Searchbar />
        <Container>
          {pictures.length > 0 ? <ImageGallery pictures={pictures} /> : null}
          <Button />
        </Container>
      </>
    );
  }
}