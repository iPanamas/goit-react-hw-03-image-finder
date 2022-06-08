import s from './Searchbar.module.css';

const Searchbar = () => {
  return (
    <header className={s.Searchbar}>
      <form className={s.searchForm}>
        <input
          className={s.searchFormInput}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={s.searchFormButton}>
          <span className={s.SearchFormButtonLabel}></span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
