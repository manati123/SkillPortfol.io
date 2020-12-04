import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { loadContext } from '@utils/env';
import { loadFonts } from '@utils/fonts';
import { logger } from '@utils/logger';
import { setupPnp } from '@utils/odata';
import JourneyPageComponent from '../JourneyPage/JourneyPageComponent';
loadContext().then(() => {

  setupPnp();
  loadFonts();

  const journey = document.getElementById('journeypage-cewp-container');
  const elem: React.ReactElement = React.createElement(JourneyPageComponent);
  ReactDOM.render(elem, journey);

}).catch(logger.error);