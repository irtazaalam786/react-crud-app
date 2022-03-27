import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate,useParams } from 'react-router-dom'
import Textfield from "../fields/Textfield";
import Passwordfield from "../fields/PasswordField";
import { useSelector, useDispatch } from 'react-redux';
import {set_permissions} from '../../actions/permissions.js';

export default function Login() {

  const dispatch = useDispatch();

  //Used to make navigate between Components
  const navigate = useNavigate();

  const [validationError,setValidationError] = useState({})
  const [validationMessage,setValidationMessage] = useState({})
  const [data, setData] = useState({});
  
  //Used to get the param sent from link in routes Component
  const { id } = useParams()

  //Required for chaning state when changing
  const onInputChange = async e =>{
    const {name, value} = e.target;
      data[name] = value;
      setData({...data})
  }
  
  //If login then move to the products
  useEffect(()=>{
    if(localStorage.getItem('token')){
        navigate("/product")
    }
  },[])

  const mystyle = {
    color: "red",
    fontWeight: 'bold',
    fontSize: '10px'
  };

  const login = async (e) => {
    e.preventDefault();

    //Serializing all values
    const formData = new FormData(e.target)

    var url = `login`;

    await axios.post(url, formData).then(({data})=>{
      
      console.log(data);
      dispatch(set_permissions(data.permissions));
      
      localStorage.setItem('token', data.token);

      navigate("/product")

    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data)
      }else{
        console.log(response);
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Login</h4>
              <hr />
              <div className="form-wrapper">
                <Form id="frm_submit" onSubmit={login}>
                  <Textfield name="email" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Passwordfield name="password" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}