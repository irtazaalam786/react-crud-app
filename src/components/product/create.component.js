import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate,useParams } from 'react-router-dom'
import Textfield from "./text.component";
import Descriptionfield from "./description.component";
import Imagefield from "./image.component";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [validationError,setValidationError] = useState({})
  const [data, setData] = useState({});

  const { id } = useParams()

  let checkboxes = ["irtiza", "murtaza"];

  const onInputChange = async e =>{
    const {name, value} = e.target;
      console.log('name',name);
      data[name] = value;
      setData({...data})
      console.log(data);
  }

  useEffect(()=>{
    fetchProduct()
  },[])

  useEffect(()=>{
    if(data.designation){
      console.log(data.designation);
      console.log(data.designation.includes('irtiza'));
    }
  },[data])

  const fetchProduct = async () => {
    if(id){
      await axios.get(`http://localhost:8000/api/products/${id}`).then(({data})=>{
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

  const createProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    if(id){
      formData.append('_method', 'PATCH');
      var url = `http://localhost:8000/api/products/${id}`;
    }else{
      var url = `http://localhost:8000/api/products`;
    }
    await axios.post(url, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/",{state:'Data has been Added ddd'})
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
                <Form id="frm_submit" onSubmit={createProduct}>
                  <Textfield name="title" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Descriptionfield name="description" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Imagefield name="image" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Row> 
                      <Col>
                          <Form.Group controlId="Name" style={{display:"flex"}}>
                              {/* <Form.Check name="values[]"  type='checkbox'id='checkbox' value='irtiza' label='checbox' defaultChecked={checkboxes.includes('irtiza')}/>
                              <Form.Check name="values[]"  type='checkbox'id='checkbox' value='murtaza' label='checbox' defaultChecked={checkboxes.includes('murtaza')}/> */}
                              { checkboxes.map((row)=>( 
                                  <Form.Check name="designation[]"  type='checkbox'id='checkbox' value={row} label={data.designation} defaultChecked={data.designation} />
                              ))}
                          </Form.Group>
                      </Col>  
                      <span style={mystyle}>{ validationError['designation'] }</span>
                  </Row>
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