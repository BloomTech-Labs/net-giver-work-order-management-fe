import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMG":
      return {
        ...state,
        img: action.payload,
        loading: false
      }
    case "SET_USER":
      return {
        ...state,
        id: action.payload.user.id,
        token: action.payload.token
      }
    case "SIGNUP_SUCCESS":
      return{
        ...state
      }
    case "GET_USER_SUCCESS":
      console.log('SUCCESS!!!! :', action.payload)
      return{
        ...state,
        reg_complete: true
      }

    default:
      return state;
  }
};

export const UserContext = createContext();

  // State Stuff
  const initialState = {  
    username: null,
    email: null,
    token: null,
    id: null, 
    uploading: false, 
    img: null, 
    reg_complete: false
  };

export const UserProvider = props => {

  // Create UserProvider similar to redux store.
  // This code needs to be condensed and edited 
  // for consistency, but it is in working form.


  const [state, dispatch] = useReducer(reducer, initialState)

  // Actions
  function getUser(token) {
    console.log('GET USER:  ', token)
    const req = `query { me {id, picture, phone, email}}`
    // dispatch({ type: types.GET_USER_START });
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
        const data = result.data.data.me; 
        console.log("GET_USER:  ", data)
          dispatch({ type: "GET_USER_SUCCESS", payload:data });
      });
  };

async function uploadImageAsync(uri, token) {
  const apiUrl = 'https://netgiver-stage.herokuapp.com/graphql';
  const query = `mutation uploadUserPhoto($photo: Upload!) {uploadUserPhoto(photo: $photo) { userId } }`;

  let fileName = uri.split('/').pop();
  let match = /\.(\w+)$/.exec(fileName);
  let mimeType = match ? `image/${match[1]}` : `image`;

  let data = { query, variables: {"photo":null}, operationName: null };
  let fileMap = {};
  fileMap[0] = [ 'variables.photo' ];

  let body = new FormData();

  body.append('operations', JSON.stringify(data));
  body.append('map', JSON.stringify(fileMap));
  body.append(0, { uri: uri, name: fileName, type: mimeType });

  axios.post(apiUrl, body, {
    headers: {
      'x-token': token,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }}
  ).then(res => {
    // console.log('IMG_RES :', res.config.headers);
    dispatch({ type: "SIGNUP_SUCCESS" });
    getUser(res.config.headers['x-token']);
  })
  .catch(err => {
    console.log(err);
  });
}

  async function addUser(req, img) {
    dispatch({ type: "SET_IMG", payload: img })
    const res = await axios({
                  url: 'https://netgiver-stage.herokuapp.com/graphql',
                  method: 'post',
                  data: { query: req }
                })
    const data = res.data.data.signUp;
    dispatch({ type: "SET_USER", payload: data })
    const imgRes = await uploadImageAsync(img, data.token);
    // console.log('IMGRES', imgRes)
  }

  // logging for testing - comment out if not needed
  useEffect(() => {
    console.log('NEW STATE: ', state);
  }, [state]);

  return (
    <UserContext.Provider value={{user: state, addUser}}>
      {props.children}
    </UserContext.Provider>
  );
};
