import React, { FC, useState, useEffect } from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import { JourneysList } from '@components/MainPage/JourneyList/JourneysList';
import JourneyCarousel from 'scripts/components/JourneyCarousel/JourneyCarousel';
import './JourneyList/JourneyListStyle.scss';
import { apiAux } from '@api/JourneyApi';

export const SearchBar: FC = () => {
  const [journeys, setJourneys] = useState<IUserJourney[]>([]);
  const [mockJourneys, setMockJourneys] = useState<IUserJourney[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(true);
  const { getJourneys } = apiAux();

  useEffect(() => {
    const result: IUserJourney[] = getJourneys(searchText);
    setMockJourneys(result);
  }, []);

  useEffect(() => {
    setJourneys([...mockJourneys]);
    if (searchText.length === 0) {
      setIsSearchEmpty(true);
    } else {
      setIsSearchEmpty(false);
    }
  }, [searchText]);

  return (
    <div>
      <SearchBox
        placeholder=' Search '
        value={searchText}
        onChange={(_, text) => {
          setSearchText(text?.toString() ?? '');
        }}
        onSearch={(value) => handleSearch(value)}
      />

      {isSearchEmpty === true && <JourneyCarousel />}

      {isSearchEmpty === false && (
        <div className='skillportofolio-journeys-container'>
          <JourneysList Journeys={[...journeys]} />
        </div>
      )}
    </div>
  );

  function handleSearch(value: string) {
    setSearchText(value ?? '');
    setJourneys([...getJourneys(searchText)]);
  }
};
