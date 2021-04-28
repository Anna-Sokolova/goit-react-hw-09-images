import React, { Component } from 'react';
import PropTypes from 'prop-types';

//services Api
import pixabayApi from './services/pixabayApi';

//import components
import Section from './components/Section';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import SearchForm from './components/SearchForm';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Spinner from './components/Spinner';
import Modal from './components/Modal';

import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    serchQuery: 'love',
    selectedImageModal: '',
    isLoading: false,
    hasError: false,
    showModal: false,
  };

  static defaultProps = {
    images: [],
    currentPage: 1,
    serchQuery: '',
    selectedImageModal: '',
    isLoading: false,
    hasError: false,
    showModal: false,
  };

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    currentPage: PropTypes.number,
    serchQuery: PropTypes.string,
    selectedImageModal: PropTypes.string,
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    showModal: PropTypes.bool,
  };

  componentDidMount() {
    this.fetchSearchImages(); //делаем HTTP-запрос для отображения картинок на странице сразу, при монтировании компонента
  }

  componentDidUpdate(prevProps, prevState) {
    //при обновлении компонента проверяем изменился ли state и делаем новый запрос для отрисовки
    if (prevState.serchQuery !== this.state.serchQuery) {
      this.fetchSearchImages();
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error);
  }

  fetchSearchImages = () => {
    //выносим get запрос в отдельную функцию для удобства переиспользования
    const { serchQuery, currentPage } = this.state;
    const options = { serchQuery, currentPage }; //передаем параметры в объекте настроек

    this.setState({ isLoading: true }); //показываем спиннер пока идет запрос

    pixabayApi
      .fetchImagesfromApi(options)
      .then(({ hits }) => {
        // console.log(hits);

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));

        if (currentPage > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ hasError: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  //метод, который получает данные с формы и перезаписывает state App
  onSubmitSearch = searchValue => {
    // console.log(searchValue);
    this.setState({
      serchQuery: searchValue, //сохраняем каждое новое значение с инпута в стейт для пагинации
      images: [], //записываем пустой массив для отрисовки новых картинок по новому запросу
      currentPage: 1, //сбрасываем currentPage в начальное состояние при новом запросе
      hasError: false, //сбрасываем error в начальное состояние при новом запросе
      selectedImageModal: '', //сбрасываем url картинки для модалки
    });
  };

  handleClickBtnIncrement = () => {
    //при клике на кнопку Load more делаем новый запрос на API
    this.fetchSearchImages();
  };

  //метод для закрытия и открытия модалки
  toggleModal = () => {
    this.setState(state => ({
      showModal: !this.state.showModal,
    }));
  };

  //метод для получения ссылки на большое изображение для модалки
  handleLargeImageModal = url => {
    this.setState({ selectedImageModal: url });
    // console.log(url);
    this.toggleModal();
  };

  render() {
    const {
      images,
      isLoading,
      hasError,
      selectedImageModal,
      showModal,
    } = this.state;

    return (
      <>
        {hasError && alert('Something went wrong, please try again later :(')}
        <Searchbar>
          <Container>
            <SearchForm onSubmit={this.onSubmitSearch} />
          </Container>
        </Searchbar>
        <Section>
          <Container className={styles.App}>
            <div className={styles.App}>
              <ImageGallery
                images={images}
                openlargeImageURL={this.handleLargeImageModal}
              />
              {isLoading && <Spinner />}
              {images.length >= 12 && !isLoading && (
                <Button onIncrement={this.handleClickBtnIncrement} />
              )}
            </div>
            {showModal && (
              <Modal onClose={this.toggleModal} url={selectedImageModal} />
            )}
          </Container>
        </Section>
      </>
    );
  }
}

export default App;
