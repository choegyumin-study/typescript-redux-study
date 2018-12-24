import * as React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/home';

export default class extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Route path="/" component={Home} />
      </React.Fragment>
    );
  }
}
