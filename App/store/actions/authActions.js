import axios from "axios";
import { types } from "./index";
// export const doSignIn = credentials => dispatch => {
//     console.log("TCL: credentials", credentials)
//         dispatch({ type: types.LOGIN_START });
//         return axios
//           .post('https://netgiver-stage.herokuapp.com/graphql', credentials)
//           .then(res => {
//               console.log(res)
//             //   dispatch({ type: types.LOGIN_SUCCESS });
//           })
//           .catch(err => {
//             dispatch({ type: types.LOGIN_FAIL, payload: err });
    
//             console.log(err);
//           });
//       };

export const doSignIn = credentials => dispatch => {
    dispatch({ type: types.LOGIN_START });
    axios({
        url: 'https://netgiver-stage.herokuapp.com/graphql',
        method: 'post',
        data: {
          query: credentials
        }
      }).then((result) => {
        // console.log("TCL: result", result)
        const data = result.data.data.signInDev.username
        console.log('DATA', result.data.data.signInDev)
        dispatch({ type: types.LOGIN_SUCCESS, payload:data});
      });
      };

export const doLogin = credentials => dispatch => {
    dispatch({ type: types.TOKEN_START });
  axios({
      url: 'https://netgiver-stage.herokuapp.com/graphql',
      method: 'post',
      data: {
        query: credentials
      }
    }).then((result) => {
      const token = result.data.data.authyVerifyDev.token  
      console.log(token)
      dispatch({ type: types.TOKEN_SUCCESS, payload:token });

      const req = `query { me {phone, email}}`
      dispatch(getUser(req, token));
    });
    };

export const doSignup = newUser => dispatch => {
  dispatch({ type: types.CREATE_USER_START });
  console.log('actions', newUser)
  axios({
      url: 'https://netgiver-stage.herokuapp.com/graphql',
      method: 'post',
      data: {
        query: newUser
      }
    }).then((result) => {
      const data = result.data.data
      console.log('DATA', result.data.data)
      dispatch({ type: types.SIGNUP_SUCCESS, payload:data});
    })
    .catch(err => console.log(err.response));
    };

export const getUser = (req, token) => dispatch => {
  dispatch({ type: types.GET_USER_START });
  axios({
      url: 'https://netgiver-stage.herokuapp.com/graphql',
      method: 'post',
      data: {
        query: req
      },
      headers: {
        "x-token": token
    },
    }).then((result) => {
      const data = result.data.data.me
        dispatch({ type: types.GET_USER_SUCCESS, payload:data });
    });
    };
