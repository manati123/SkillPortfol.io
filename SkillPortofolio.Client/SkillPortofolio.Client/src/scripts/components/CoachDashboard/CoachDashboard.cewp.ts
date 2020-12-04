import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { loadContext } from '@utils/env';
import { loadFonts } from '@utils/fonts';
import { logger } from '@utils/logger';
import { setupPnp } from '@utils/odata';
import CoachDashboardComponent from './CoachDashboardComponent';
loadContext().then(() => {

  setupPnp();
  loadFonts();

  const dashboard = document.getElementById('coachdashboard-cewp-container');
  const elem: React.ReactElement = React.createElement(CoachDashboardComponent);
  ReactDOM.render(elem, dashboard);

}).catch(logger.error);