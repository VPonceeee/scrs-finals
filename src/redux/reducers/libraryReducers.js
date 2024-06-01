// src/redux/reducers/libraryReducer.js
import { ActionTypes } from "../constants/action-types";

const initialState = {
    reservations: [],
    pendingCount: 0
};

export const libraryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_RESERVATIONS:
            return { ...state, reservations: payload };

        case ActionTypes.SET_PENDING_COUNT:
            return {...state, pendingCount: payload,};

        default:
            return state;
    }
};
