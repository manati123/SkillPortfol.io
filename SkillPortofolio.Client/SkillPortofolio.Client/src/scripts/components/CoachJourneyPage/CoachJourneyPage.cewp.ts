import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { loadContext } from '@utils/env';
import { loadFonts } from '@utils/fonts';
import { logger } from '@utils/logger';
import { setupPnp } from '@utils/odata';
import CoachJourneyPage from './CoachJourneyPage';
loadContext().then(() => {

  setupPnp();
  loadFonts();

  const journey = document.getElementById('coachjourneypage-cewp-container');
  const elem: React.ReactElement = React.createElement(CoachJourneyPage);
  ReactDOM.render(elem, journey);

}).catch(logger.error);