// actions/taskActions.js

import { ADD_TASK_SUCCESS, ADD_TASK_FAILURE } from '../actionTypes';

export const addTaskSuccess = (task) => ({
    type: ADD_TASK_SUCCESS,
    payload: task,
});

export const addTaskFailure = (error) => ({
    type: ADD_TASK_FAILURE,
    payload: error,
});
