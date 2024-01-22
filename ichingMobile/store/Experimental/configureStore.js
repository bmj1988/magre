import { createReducer, configureStore, createAction } from '@reduxjs/toolkit'
import logger from 'redux-logger';

let newReading = (payload) => {
    return createAction('addReading', payload)
}

const hexReducer = createReducer(state = {}, (builder) => {
    builder
        .addCase(addReading, (state, action) => {
            const reading = action.payload;
            state.push(reading)
            // const
            // hexState.reading = action.results[0]
            // if (action.reading.length > 2) {
            //     hexState.alt = action.results[1]
            //     /// ALTERNATING LINE MEANINGS WILL GO HERE
            // }
        })

});

const reducer = {
    hex: hexReducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState: {},
    enhancers: (getDefaultEnhancer) => getDefaultEnhancer({ autoBatch: false })
})
