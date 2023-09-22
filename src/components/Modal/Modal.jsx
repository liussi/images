import React, { useEffect } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export default function Modal({image,onClose}){
  useEffect(() => {

     function hendleEsc(e) {
       if (e.code === 'Escape') {
         onClose();
       }
     }

    window.addEventListener('keydown', hendleEsc);

    return () => {
      window.removeEventListener('keydown', hendleEsc);
    };
  }, [onClose]);

 
  function hendleBackdrop (e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={hendleBackdrop}>
      <ModalEl>
        <img src={image} alt="" width="100%" />
      </ModalEl>
    </Overlay>
  );
}

