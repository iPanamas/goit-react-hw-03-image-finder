import React, { Component } from 'react';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    category: '',
  };

  handleChange = event => {
    this.setState({ category: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { category } = this.state;
    event.preventDefault();

    if (category.trim() === '') {
      return alert('Введите название категории');
    }

    this.props.onSubmit(category);

    this.setState({ category: '' });
  };

  render() {
    const { category } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <input
            value={category}
            onChange={this.handleChange}
            className={s.searchFormInput}
            type="text"
            placeholder="Search images and photos"
          />
          <button type="submit" className={s.searchFormButton}>
            <span className={s.SearchFormButtonLabel}></span>
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
