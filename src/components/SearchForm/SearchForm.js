import React, { useState } from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChangeInput = e => {
    // console.log(e.currentTarget.value);
    const { value } = e.currentTarget;
    setSearch(value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    onSubmit(search);
    resetForm();
  };

  const resetForm = () => {
    setSearch('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmitForm}>
      <button type="submit" className={styles.searchFormButton}>
        <span className={styles.searchFormButtonLabel}>Search</span>
      </button>

      <input
        className={styles.searchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={search}
        onChange={handleChangeInput}
      />
    </form>
  );
}
