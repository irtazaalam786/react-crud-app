import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios'
import { BrowserRouter as Router} from "react-router-dom";
import RoutesInfo from "./components/routes/routes";
import Navigation from "./components/navbar/Navigation";
import { BASE_URL,API_BASE_URL } from "./config";

function App() {

  axios.defaults.baseURL = API_BASE_URL;

  axios.interceptors.request.use((request) => {
    
    //Send Bearer Token in Request. Inceptor act as a gateway or middleware.
    if(localStorage.getItem('token')){
      request.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }      
    return request;
  });

  //Inceptor act as a gateway or middleware.
  axios.interceptors.response.use((response) => {
    console.log('response received');
    return response;
  });

  return (<Router>
    
    <Navigation/>
    <RoutesInfo/>
    
  </Router>);
}

export default App;