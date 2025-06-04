import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, LOGOUT_USER } from './actionTypes';
import { apiError, loginUserSuccessful, logoutUserSuccess } from './actions';

// AUTH related methods
// import { postLogin } from '../../../helpers/fackBackend_Helper';
import { getFirebaseBackend } from '../../../helpers/firebase_helper';


import { postLogin } from "../../../utilities/userAuthentication";

//Initilize firebase
const fireBaseBackend = getFirebaseBackend();

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(postLogin,user);
        if (response.code === "invalid") {
            yield put(apiError(response.message)); // Dispatches error action
        } 
        else if (response.code === "error") {
            yield put(apiError(response.message)); // Handles server errors
        } 
        else {
            localStorage.setItem("authUser", JSON.stringify(response));
            yield put(loginUserSuccessful(response));
            history('/dashboard');
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");

        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            const response = yield call(fireBaseBackend.logout);
            yield put(logoutUserSuccess(response));
        }

        history('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser);
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser);
}

function* loginSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default loginSaga;