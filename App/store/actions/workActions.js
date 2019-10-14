import axios from "axios";
import { types } from "./index";


export const doCreateQr = (token, mut) => dispatch => {
    dispatch({ type: types.POST_START });
    console.log("fdata", data)
    axios({
        url: 'https://netgiverdb.herokuapp.com/graphql',
        method: 'post',
        headers: {
            "x-token": token
        },
        data: {
          query: mut
        }
      }).then((result) => {
      console.log("TCL: result", result)
        
          dispatch({ type: types.POST_SUCCESS });
      });
      };
