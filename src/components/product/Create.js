import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate,useParams } from 'react-router-dom'
import Textfield from "../fields/Textfield";
import Descriptionfield from "../fields/DescriptionField";
import Imagefield from "../fields/ImageField";
import Checkfield from "../fields/CheckField";
import Radiofield from "../fields/RadioField";

export default function Create() {

  //Used to make navigate between Components
  const navigate = useNavigate();

  const [validationError,setValidationError] = useState({})
  const [data, setData] = useState({});
  
  //Used to get the param sent from link in routes Component
  const { id } = useParams()

  const onInputChange = async e =>{
    const {name, value} = e.target;
      data[name] = value;
      setData({...data})
  }

  useEffect(()=>{
    fetchItem()
  },[])

  const fetchItem = async () => {
    if(id){
      await axios.get(`products/${id}`).then(({data})=>{
        setData(data.product);
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

    //Serializing all values
    const formData = new FormData(e.target)

    if(id){
      formData.append('_method', 'PATCH');
      var url = `products/${id}`;
    }else{
      var url = `products`;
    }

    await axios.post(url, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })

      navigate("/product",{state:'Data has been Added'})

    }).catch(({response})=>{
      if(response.status===422){
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
              <h4 className="card-title"> { id ? 'Update' : 'Create' } Product</h4>
              <hr />
              <div className="form-wrapper">
                <Form id="frm_submit" onSubmit={create}>
                  <Textfield name="title" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Descriptionfield name="description" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Form.Label>Designation</Form.Label>
                  <Checkfield name="designation" multi_name="designation[]" values={[{key:"1",value:'employee'},{key:"2",value:'owner'}]} data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Form.Label>Gender</Form.Label>
                  <Radiofield name="gender" values={[{key:"male",value:'Male'},{key:"female",value:'Female'}]} data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Imagefield name="image" data={data} style={mystyle} validation={validationError}/>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
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