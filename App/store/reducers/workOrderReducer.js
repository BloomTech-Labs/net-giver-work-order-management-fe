import {types} from '../actions';

const initialState = {
    token: "",
    user: null,
    signedin: false,
    isAuth: false,
    isLoading: false,
    isSuccess: false,
    errors:null,

}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        default:
            return state;
    }
}