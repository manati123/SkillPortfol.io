import React, { useState, useEffect } from 'react';
import { IUserJourney } from '../../models/Journey/IUserJourney';
import CarouselItem from '@components/CarouselItem/CarouselItem';
import './JourneyCarousel.css';
import { UserJourneysServices } from 'scripts/services/Journeys/UserJourneysServices';
import { initializeIcons } from '@uifabric/icons';
import { IconButton } from 'office-ui-fabric-react';

const JourneyCarousel: React.FC = () => {
  const [journeys, setJourneys] = useState<IUserJourney[]>([]);
  useEffect(() => {
    setJourneys([...UserJourneysServices.getMockUserJourneys()]);
    initializeIcons();
  }, []);

  const scrollPage = (direction: number) => {
    const element = document.getElementsByClassName(
      'spio-carousel-scroller'
    )[0];
    const item = document.getElementsByClassName('spio-carousel-item')[0];

    element.scrollLeft += direction * (4 * item.clientWidth);
  };

  return (
    <section className='spio-carousel-container'>
      <IconButton
        iconProps={{ iconName: 'ChevronLeft' }}
        title='Left'
        ariaLabel='Left'
        onClick={() => scrollPage(-1)}
      />
      <div className='spio-carousel-scroller'>
        {journeys.map((journey) => (
          <CarouselItem key={journey.Id} journey={journey} />
        ))}
      </div>
      <IconButton
        iconProps={{ iconName: 'ChevronRight' }}
        title='Right'
        ariaLabel='Right'
        onClick={() => scrollPage(1)}
      />
    </section>
  );
};

export default JourneyCarousel;
