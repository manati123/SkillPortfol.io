import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { loadContext } from '@utils/env';
import { loadFonts } from '@utils/fonts';
import { logger } from '@utils/logger';
import { setupPnp } from '@utils/odata';
import MainPageComponent from './MainPageComponent';
loadContext().then(() => {

  setupPnp();
  loadFonts();

  const mainPage = document.getElementById('mainpage-cewp-container');
  const elem: React.ReactElement = React.createElement(MainPageComponent);
  ReactDOM.render(elem, mainPage);

}).catch(logger.error);