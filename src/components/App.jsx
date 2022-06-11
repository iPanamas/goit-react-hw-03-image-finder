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
    imageCount: 1,
  };

  imageCategory = category => {
    this.setState({ category });
  };

  nextPage = () => {
    this.setState(prevState => ({
      imageCount: prevState.imageCount + 1,
    }));
  };

  render() {
    const { category, imageCount } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.imageCategory} />
        <Container>
          <ImageGallery category={category} imageCount={imageCount} />
          {category && <Button nextPage={this.nextPage} />}
        </Container>
      </>
    );
  }
}
