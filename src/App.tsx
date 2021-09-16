import React, { Fragment } from 'react';
import './App.css';

import { VectorAdder } from './components/VectorAdder';

interface Props {
  
}

export const App: React.FC<Props> = () => {
  return (
    <Fragment>
      <VectorAdder />
    </Fragment>
  );
}