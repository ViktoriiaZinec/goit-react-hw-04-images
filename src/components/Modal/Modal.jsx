import css from '../css/Styles.module.css';
import { useEffect } from 'react';
import propTypes from 'prop-types';

export const Modal = ({ closeModal, item }) => {
  useEffect(() => {
    const handleKeyDwn = e => {
      if (e.key === 'Escape') {
        closeModal('');
      }
    };
    document.addEventListener('keydown', handleKeyDwn);
    return () => {
      document.removeEventListener('keydown', handleKeyDwn);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal('');
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={item.largeImageURL} alt={item.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
};
