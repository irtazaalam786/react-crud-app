import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate,useParams } from 'react-router-dom'
import Textfield from "../fields/Textfield";
import Emailfield from "../fields/EmailField";
import Selectfield from "../fields/SelectField";
import Passwordfield from "../fields/PasswordField";
import Spinner from 'react-bootstrap/Spinner'

export default function Create() {

  //Used to make navigate between Components
  const navigate = useNavigate();

  const [validationError,setValidationError] = useState({})
  const [data, setData] = useState({});
  const [roles, setRoles] = useState({});
  const [loading,setLoading] = useState(false);
  const [btn_loading,setBtnLoading] = useState(true);
  
  //Used to get the param sent from link in routes Component
  const { id } = useParams()

  const onInputChange = async e =>{
    const {name, value} = e.target;
      data[name] = value;
      setData({...data})
  }

  const fetchRoles = async () => {
    await axios.get('all_roles').then(({data})=>{
        setRoles(data.data);
    }).catch(()=>{

    })
  }

  useEffect(()=>{
    fetchRoles();
    fetchItem()
  },[])


  const fetchItem = async () => {
    if(id){
      await axios.get(`users/${id}`).then(({data})=>{
        setData(data.user);
      }).catch(({response:{data}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })
    }
  }

  const mystyle = {
    color: "red",
    fontWeight: 'bold',
    fontSize: '10px'
  };

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtnLoading(false);

    //Serializing all values
    const formData = new FormData(e.target)

    if(id){
      formData.append('_method', 'PATCH');
      var url = `users/${id}`;
    }else{
      var url = `users`;
    }

    await axios.post(url, formData).then(({data})=>{
      setLoading(false);
      setBtnLoading(true);
      Swal.fire({
        icon:"success",
        text:data.message
      })

      navigate("/user",{state:'Data has been Added'})

    }).catch(({response})=>{
      if(response.status===422){
        console.log(response.data.errors);
        setLoading(false);
        setBtnLoading(true);
        setValidationError(response.data.errors)
      }else{
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
              <h4 className="card-title"> { id ? 'Update' : 'Create' } User</h4>
              <hr />
              <div className="form-wrapper">
                <Form id="frm_submit" onSubmit={create}>
                  <Textfield name="name" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Emailfield name="email" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Passwordfield name="password" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Selectfield name="role" data={data} style={mystyle} values={roles} validation={validationError} onInputChange={onInputChange} />
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit" style={{visibility: btn_loading ? 'visible' : 'hidden' }}>
                    Save
                  </Button>
                  <Spinner animation="border" style={{visibility: loading ? 'visible' : 'hidden' }} />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}