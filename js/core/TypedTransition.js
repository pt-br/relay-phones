import React from 'react';
import invariant from 'invariant';

/**
 * TypedTransition
 *
 * Abstraction responsible to properly transitioning
 * between views
 *
 * Basic sage (inside View component):
 *
 *  TypedTransition.from(this).to(ViewIWantToGo);
 *
 */
export default class TypedTransition {

  /**
   * Constructor should no be used,
   * please use TypedTransition.from
   *
   */
  constructor(view) {
    console.log(view);
    this.view = view;
  }

  /**
   * Adds query parameters to the transition
   *
   * TypedTransition.from(this)
   *    .with({customerName, orderId, orderState, pageNum: selectedEvent.eventKey})
   *    .to(orderList);
   */
  with(queryParams) {
    this.queryParams = queryParams;
    return this;
  }

  /**
   * Executes the transition
   *
   * Usage:
   *
   *  TypedTransition.from(this)
   *    .to(orderList);
   *
   * the viewClass param must have a 'path' function that returns the
   * desired string path
   *
   */
  to(viewClass, pathParam) {
    console.log(viewClass);
    invariant(viewClass.path, 'Parameter `viewClass` should have a function called `path`');

    const path = pathParam ? `${viewClass.path().split(':')[0]}${pathParam}` : viewClass.path();
    this.view.context.history.pushState(null, path, this.queryParams || {});
  }

  /**
   * Executes the transition
   *
   * Usage:
   *
   *  TypedTransition.from(this)
   *    .toUrl('#/order');
   *
   */
  toUrl(href) {
    invariant(href, 'Parameter `href` should not be empty');
    this.view.context.history.pushState(null, href, this.queryParams || {});
  }

  /**
   * Creates the TypedTransition instance
   *
   * Usage:
   *
   *  TypedTransition.from(this)
   *
   * the view param must be a React Component instance
   *
   */
  static from(view) {
    console.log(view);
    invariant(view, 'Required parameter `{view}`');
    invariant(view.context.history, 'Parameter `{view}` should be a React component and have a history context');

    return new TypedTransition(view);
  }

  /**
   * Creates the context type necessary
   * to execute TypedTransition's methods
   *
   * should be used by the component that
   * wants to make transitions
   *
   * @returns {{history: *}}
   */
  static contextTypes() {
    return {
      history: React.PropTypes.object.isRequired
    };
  }
}
