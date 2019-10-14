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
    axios({
        url: 'https://netgiverdb.herokuapp.com/graphql',
        method: 'post',
        data: {
          query: credentials
        }
      }).then((result) => {
        console.log(result.data)
        const map = result.data.map(map=>map)
        console.log(map)
      });
      };