import Header from '@components/Header/Header';
import { Link } from 'office-ui-fabric-react';
import * as React from 'react';
import { SearchBar } from 'scripts/components/MainPage/SearchBar';

const MainPageComponent = () => {
  return (
    <div className='spio-mainpage'>
      <Header />
      <SearchBar />
    </div>
  );
};
export default MainPageComponent;
