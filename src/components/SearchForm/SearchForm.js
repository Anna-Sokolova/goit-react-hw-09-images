import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    search: '',
  };

  static defaulProps = {
    search: '',
  };

  static propTypes = {
    search: PropTypes.string,
  };

  handleChangeInput = e => {
    // console.log(e.currentTarget.value);
    const { value } = e.currentTarget;
    this.setState({
      search: value,
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.onSubmit(this.state.search);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      search: '',
    });
  };

  render() {
    const { search } = this.state;
    return (
      <form className={styles.searchForm} onSubmit={this.handleSubmitForm}>
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
          onChange={this.handleChangeInput}
        />
      </form>
    );
  }
}

export default SearchForm;
