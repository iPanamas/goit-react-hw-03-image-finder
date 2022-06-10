import React, { Component } from 'react';
// Components
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
// import Modal from './Modal/Modal';

// API

export class App extends Component {
  state = {
    category: '',
    // page: 1,
  };

  imageCategory = category => {
    this.setState({ category });
  };

  render() {
    const { category } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.imageCategory} />
        <Container>
          <ImageGallery category={category} />
          {category && <Button />}
        </Container>
      </>
    );
  }
}
