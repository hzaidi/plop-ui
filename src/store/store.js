import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import * as reduxImmutable from 'redux-immutable-state-invariant';

console.log(process.env.NODE_ENV)

const devTools = (process.env.NODE_ENV === 'production' || !window.devToolsExtension) ? (a) => a : window.devToolsExtension && window.devToolsExtension();
const middleware = process.env.NODE_ENV === 'production' ? [ thunk ] : [ thunk, createLogger(), reduxImmutable.default() ]
const allStoreEnhancer = compose(
	applyMiddleware(...middleware),
	devTools
);

export default createStore(reducers, allStoreEnhancer);