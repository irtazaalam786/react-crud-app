import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate,useParams } from 'react-router-dom'
import Textfield from "../fields/Textfield";
import Checkfield from "../fields/CheckField";
import Spinner from 'react-bootstrap/Spinner'

export default function Create() {

  //Used to make navigate between Components
  const navigate = useNavigate();

  const [validationError,setValidationError] = useState({})
  const [data, setData] = useState({});
  const [dataPermission, setDataPermission] = useState({});
  const [permissions, setPermission] = useState({});
  const [loading,setLoading] = useState(false);
  const [btn_loading,setBtnLoading] = useState(true);
  
  //Used to get the param sent from link in routes Component
  const { id } = useParams()

  const onInputChange = async e =>{
    const {name, value} = e.target;
      data[name] = value;
      setData({...data})
  }

  const onCheckChange = async e =>{
    const {name, checked} = e.target;
    permissions.map((row,key)=>{
        row['checked']=checked;
    })
    setDataPermission(permissions);
  }

  const onViewChange = async e=>{
    const {checked} = e.target;
    let item_view = 'view'+e.target.value.replace("update","").replace("edit","").replace("delete","")
    permissions.map((row,key)=>{
        if(item_view == row.value)
          row['checked']=checked;
    })
    console.log(permissions);
    setDataPermission(permissions);
  }

  useEffect(()=>{
    fetchItem()
    fetchPermission();
  },[])

  const fetchPermission = async()=>{
     await axios.get(`permissions`).then(({data})=>{
        setPermission(data.data);
     }).catch(()=>{
         
     })
  }    

  const fetchItem = async () => {
    if(id){
      await axios.get(`roles/${id}`).then(({data})=>{
        setData(data.role);
        setDataPermission(data);
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
      var url = `roles/${id}`;
    }else{
      var url = `roles`;
    }

    await axios.post(url, formData).then(({data})=>{
      setLoading(false);
      setBtnLoading(true);
      Swal.fire({
        icon:"success",
        text:data.message
      })

      navigate("/role",{state:'Data has been Added'})

    }).catch(({response})=>{
      if(response.status===422){
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
              <h4 className="card-title"> { id ? 'Update' : 'Create' } Role</h4>
              <hr />
              <div className="form-wrapper">
                <Form id="frm_submit" onSubmit={create}>
                  <Textfield name="name" data={data} style={mystyle} validation={validationError} onInputChange={onInputChange}/>
                  <Form.Check type='checkbox' label='Check All' onChange={onCheckChange} />
                  <Checkfield name="permissions" multi_name="permissions[]" values={permissions} data={dataPermission} style={mystyle} validation={validationError} onInputChange={onViewChange}/>
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