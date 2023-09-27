import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal =({closeModal, children})=> {  

  useEffect(()=>{
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return ()=> {window.removeEventListener('keydown', handleKeyDown);}
  }, [closeModal]);

    
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
     closeModal();
    }
  };

  return (
    <div className={css.Modal_backdrop} onClick={handleBackdropClick}>
      <div className={css.Modal_content}>{children}</div>
    </div>
  ); 
 
}
export default Modal;
