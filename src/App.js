import React, { useState, useEffect } from 'react';

//import notify from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import scroll back to top
import { addBackToTop } from 'vanilla-back-to-top';

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

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [serchQuery, setSerchQuery] = useState('love');
  const [selectedImageModal, setSelectedImageModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //useEffect для запроса за картинками
  useEffect(() => {
    if (!serchQuery) {
      toast.info('Введите корректный запрос пожалуйста!');
      return;
    }

    //создаем в useEffect get запрос
    const fetchSearchImages = () => {
      const options = { serchQuery, currentPage }; //передаем параметры в объекте настроек

      setIsLoading(true); //показываем спиннер пока идет запрос

      pixabayApi
        .fetchImagesfromApi(options)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return toast.warn(
              `По вашему запросу ${serchQuery} нет данных! Поробуйте ещё раз)`,
            );
          }
          setImages(prevImages => [...prevImages, ...hits]);

          if (currentPage > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    };

    fetchSearchImages();
  }, [currentPage, serchQuery]);

  //useEffect для кнопки "back to top"
  useEffect(() => {
    addBackToTop({
      backgroundColor: '#2d860a',
    });
  }, []);

  //функция, которая получает данные с формы и перезаписывает state App
  const onSubmitSearch = searchValue => {
    // console.log(searchValue);
    setSerchQuery(searchValue); //сохраняем каждое новое значение с инпута в стейт для пагинации
    setImages([]); //записываем пустой массив для отрисовки новых картинок по новому запросу
    setCurrentPage(1); //сбрасываем currentPage в начальное состояние при новом запросе
    setSelectedImageModal(''); //сбрасываем url картинки для модалки
    setError(null); //сбрасываем error в начальное состояние при новом запросе
  };

  const handleClickBtnIncrement = () => {
    //при клике на кнопку Load more увеличиваем
    setCurrentPage(prevPage => prevPage + 1);
  };

  //метод для закрытия и открытия модалки
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //метод для получения ссылки на большое изображение для модалки
  const handleLargeImageModal = url => {
    setSelectedImageModal(url);
    // console.log(url);
    toggleModal();
  };

  //метод для удаления картинки с галереи по id
  const deleteImage = ImageId => {
    setImages(prevImages => prevImages.filter(image => image.id !== ImageId));
  };

  return (
    <>
      {error && toast.error('Что-то пошло не так! Попробуйте позже :(')}
      <Searchbar>
        <Container>
          <SearchForm onSubmit={onSubmitSearch} />
        </Container>
      </Searchbar>
      <Section>
        <Container className={styles.App}>
          <div className={styles.App}>
            <ImageGallery
              images={images}
              openlargeImageURL={handleLargeImageModal}
              onDelete={deleteImage}
            />
            {isLoading && <Spinner />}
            {images.length >= 12 && !isLoading && (
              <Button onIncrement={handleClickBtnIncrement} />
            )}
          </div>
          {showModal && (
            <Modal onClose={toggleModal} url={selectedImageModal} />
          )}
        </Container>
      </Section>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
