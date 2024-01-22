import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { hexReducer } from "./hexagram";

/// LOCAL TUNNEL URL FOR TESTING

export let url;
if (process.env.NODE_ENV === 'production') {
    url = 'placeholderURL.com/sample'
}
else {
    url = process.env.LOCAL_TUNNEL
}

/// REDUCERS

const rootReducer = combineReducers({
    hex: hexReducer,
})


/// ENHANCERS

let enhancer;
if (process.env.EXPO_PUBLIC_MODE === 'production') {
    enhancer = applyMiddleware(thunk)
}
else {
    const logger = (await import('redux-logger')).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}

/// STORE


export const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}
