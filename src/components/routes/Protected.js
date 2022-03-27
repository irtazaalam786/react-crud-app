import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL,check_permission } from '../../config';

export default function Protected(props) {
  let Component = props.component;

  const navigate = useNavigate();

  const permissions = useSelector(state => state.permissions);

  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate("/login")
    }
  },[])

  return (
    <Component/>
  )
}