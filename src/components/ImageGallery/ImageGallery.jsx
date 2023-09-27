import { getImage } from 'Services/GetImage';
import ErrorCard from 'components/ErrorCard/ErrorCard';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { ImageItem, ImageList } from './ImageGallery.styled';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { useEffect, useState } from 'react';

const ImageGallery = ({ searchText }) => {
  const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  };

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [tags, setTags] = useState('');


  useEffect(() => {
    requestImages(searchText);
    setCurrentPage(1);
    setImages([]);
  }, [searchText]);

  useEffect(() => {
    requestImages(searchText, currentPage);
  }, [currentPage]);

  const requestImages = async (searchText, currentPage = 1) => {

    if (searchText === '') return;

    try {
    
      const data = await getImage(searchText, currentPage);
      
      if (currentPage === 1) {
        setStatus(STATUS.PENDING);
        setImages(data.data.hits);
        setStatus(STATUS.RESOLVED);
      } else {
        setImages(prevState => [...prevState, ...data.data.hits]);
        setStatus(STATUS.RESOLVED);
      }
      
    } catch (err) {
      setStatus(STATUS.REJECTED);
    }
    
  };

  const loadMoreImages = () => {
   
    setCurrentPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const showImage = id => {
    setLargeImageURL(images.find(image => image.id === id).largeImageURL);
    setTags(images.find(image => image.id === id).tags);
  };

  if (status === STATUS.PENDING) return <Loader />;
  else if (status === STATUS.RESOLVED) {
    return (
      <>
        <ImageList>
          {images.map(el => (
            <ImageItem key={el.id}>
              {isShowModal && (
                <Modal closeModal={toggleModal}>
                  <img src={largeImageURL} alt={tags} />
                </Modal>
              )}

              <ImageGalleryItem
                webformatURL={el.webformatURL}
                tags={el.tags}
                showModal={toggleModal}
                showImage={showImage}
                id={el.id}
              />
            </ImageItem>
          ))}
        </ImageList>

        <Button loadMoreImages={loadMoreImages} />
      </>
    );
  } else if (status === STATUS.REJECTED) return <ErrorCard />;
};

export default ImageGallery;
