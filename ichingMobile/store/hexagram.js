import { csrfFetch } from "./csrfFetch"
import { url } from "."

/// ACTION

const READING = 'hex/READING'

/// ACTION CREATOR

const reading = (result) => {
    return (
        {
            type: READING,
            result
        }
    )
}


/// THUNK

export const ichingReading = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`${url}/api/hex`)
        if (response.ok) {
            const result = await response.json();
            dispatch(reading(result))
            return result
        }
    }
    catch (e) {
        return e
    }
}


/// REDUCER

export const hexReducer = (state = {}, action) => {
    let hexState = { ...state }
    switch (action.type) {
        case READING: {
            hexState.reading = action.result[0]
            if (action.result.length > 2) {
                hexState.alt = action.result[1]
                /// ALTERNATING LINE MEANINGS WILL GO HERE
            }
        }
        default: {
            return hexState;
        }
    }
    return hexState
}
