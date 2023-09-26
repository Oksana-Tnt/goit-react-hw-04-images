import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/SearchBar';

import { useState } from 'react';

export const App = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = searchText => {
    setSearchText(searchText);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <ImageGallery searchText={searchText} />
    </>
  );
};


