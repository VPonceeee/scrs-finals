import { type } from "@testing-library/user-event/dist/type";
import { ActionTypes } from "../constants/action-types";

export const setReservation = (reservations) => {
    return {
        type: ActionTypes.SET_RESERVATIONS,
        payload: reservations,
    };
};

export const setAddReservation = (reservations) => {
    return {
        type: ActionTypes.ADD_RESERVATIONS,
        payload: reservations,
    };
};

export const setSelectedReservation = (reservations) => {
    return{
        type: ActionTypes.SELECTED_RESERVATIONS,
        payload: reservations,
    };
};

export const setPendingCount = (count) => {
    return {
      type: ActionTypes.SET_PENDING_COUNT,
      payload: count,
    };
  };