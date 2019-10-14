import {types} from '../actions';

const initialState = {
  
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
        case types.POST_START:
            return {
              ...state,
              isLoading: true,
              isAuth: false,
              isSuccess: false,
              errors: null,
              username: null
            };
          case types.POST_SUCCESS:
            return {
              ...state,
              isLoading: false,
              isAuth: true,
              isSuccess: true,
              signedin: true,
            //   username: payload
            };
        default:
            return state;
    }
}