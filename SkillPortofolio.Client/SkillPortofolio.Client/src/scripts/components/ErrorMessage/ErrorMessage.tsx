import * as React from 'react';

import { logger } from '@utils/logger';

import { IProps } from './IErrorMessage';

import './ErrorMessage.scss';

export const ErrorMessage = (props: IProps) => {
  logger.log(props.message);
  const error: any = props.message;
  return <div className='error-message'>{error}</div>;
};
