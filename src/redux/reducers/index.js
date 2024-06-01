import { combineReducers } from 'redux';
import { libraryReducer } from './libraryReducers';

const rootReducer = combineReducers ({
    allReservations:libraryReducer,

});

export default rootReducer;