import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState, useEffect } from 'react';
import { fetchPhotos } from 'servise/image-servise';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './css/Styles.module.css';
import propTypes from 'prop-types';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!search) return;
    setIsLoading(true);
    setIsEmpty(false);

    fetchPhotos(search, page)
      .then(result => {
        setPhotos(prevPhotos => [...prevPhotos, ...result.hits]);
        setLoading(false);
        setError(false);
        setIsLoading(false);
        setPage(page);
        setPageCount(Math.ceil(result.total / 12));
        setIsEmpty(result.total === 0);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, page]);

  function onLoadMore() {
    setPage(prevState => prevState + 1);
  }

  const updateSearch = searchLine => {
    setPhotos([]);
    setSearch(searchLine);
    setPage(1);
    setPageCount(1);
    setLoading(false);
    setError(false);
    setIsEmpty(false);
  };

  const showModal = item => {
    setModalItem(item);
  };
  const closeModal = () => {
    setModalItem(null);
  };

  return (
    <>
      <SearchBar update={updateSearch} />
      <ImageGallery
        // search={this.state.search}
        photos={photos}
        onShowModal={showModal}
      />
      {page < pageCount && <Button onLoadMore={onLoadMore} />}
      {isEmpty && (
        <p className={css.sorry}> Sorry, there are no photos available</p>
      )}
      {modalItem && <Modal item={modalItem} closeModal={closeModal}></Modal>}
      {isLoading && <Loader />}
    </>
  );
};

App.propsTypes = {
  search: propTypes.string,
};
