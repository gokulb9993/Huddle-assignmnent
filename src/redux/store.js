import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory as createHistory } from 'history';
import { createLogger } from 'redux-logger'
import createReducer from './reducers';
import { apiMiddleware } from 'redux-api-middleware';
import authInjector from './authInjector';


export const history = createHistory();

export default function configureStore(initialState = {}) {
    const middlewares = [thunk, authInjector, apiMiddleware, routerMiddleware(history)];

    const logger = createLogger({
        collapsed: () => true
    });
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger);
    }

    const enhancers = [applyMiddleware(...middlewares)];

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                shouldHotReload: false
            })
            : compose;
    /* eslint-enable */

    const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

    store.injectedReducers = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}
