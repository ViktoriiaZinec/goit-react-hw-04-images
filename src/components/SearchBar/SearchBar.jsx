import { useState } from 'react';
import css from '../css/Styles.module.css';
import propTypes from 'prop-types';

export const SearchBar = ({ update }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!search.trim()) {
      return alert('Please type text');
    }
    update(search);
  };

  return (
    <header className={css.search_bar}>
      <form className={css.search_form} onSubmit={handleSubmit}>
        <button type="submit" className={css.search_form_button}>
          <span className={css.search_form_button_label}>Search</span>
        </button>

        <input
          className={css.search_form_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  update: propTypes.func,
};
