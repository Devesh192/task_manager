// reducers/taskReducer.js

import { ADD_TASK_SUCCESS, ADD_TASK_FAILURE } from '../actionType';

const initialState = {
    tasks: [],
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                error: null,
            };
        case ADD_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default taskReducer;
