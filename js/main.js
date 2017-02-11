import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import { Router, Route, Redirect } from 'react-router';
import ReactRouterRelay from 'react-router-relay';

require('../sass/main.scss');

import PhoneView, * as phoneView from './views/PhoneView';

/**
* Query called when entering this view, used by ReactRouterRelay.
*
* @returns {{viewer: Function}}
*/
export function routeQuery() {
  return {
    viewer: () => Relay.QL`query RootQuery {viewer}`,
  };
}

/**
 * Describes application routes
 *
 */
const routes = (
  <Router createElement={ReactRouterRelay.createElement}>

    <Redirect from="/" to={phoneView.path()} />

    {/*  /example */}
    <Route path={phoneView.path()} component={PhoneView}
      queries={routeQuery()}/>

  </Router>
);

// Render Application
ReactDOM.render(routes, document.getElementById('main'));
