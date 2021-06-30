/* eslint-disable array-callback-return */
import { put, call, select, takeLatest } from "redux-saga/effects";
import { api } from '@pagerduty/pdjs';

import {
  GET_CURRENT_USER_REQUESTED,
  GET_CURRENT_USER_COMPLETED,
  GET_CURRENT_USER_ERROR
} from "./actions";

import { selectUsers } from "./selectors";

// TODO: Update with Bearer token OAuth
const pd = api({ token: process.env.REACT_APP_PD_TOKEN });

export function* getCurrentUserAsync() {
  yield takeLatest(GET_CURRENT_USER_REQUESTED, getCurrentUser);
};

export function* getCurrentUser() {
  try {
    let response = yield call(pd.get, "users/me")
    yield put({
      type: GET_CURRENT_USER_COMPLETED,
      currentUser: response.data.user
    });
  } catch (e) {
    yield put({ type: GET_CURRENT_USER_ERROR, message: e.message });
  }
};