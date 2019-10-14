import axios from "axios";
import { types } from "./index";
// export const doSignIn = credentials => dispatch => {
//     console.log("TCL: credentials", credentials)
//         dispatch({ type: types.LOGIN_START });
//         return axios
//           .post('https://netgiverdb.herokuapp.com/graphql', credentials)
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
        url: 'https://netgiverdb.herokuapp.com/graphql',
        method: 'post',
        data: {
          query: credentials
        }
      }).then((result) => {
      console.log("TCL: result", result)
          const data = result.data.data.signInDev.username
        
          dispatch({ type: types.LOGIN_SUCCESS, payload:data});
      });
      };

      export const doLogin = credentials => dispatch => {
        dispatch({ type: types.TOKEN_START });
        axios({
            url: 'https://netgiverdb.herokuapp.com/graphql',
            method: 'post',
            data: {
              query: credentials
            }
          }).then((result) => {
            const token = result.data.data.authyVerifyDev.token  
            console.log(token)
             
              dispatch({ type: types.TOKEN_SUCCESS, payload:token });
          });
          };