import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'

export default function Radiofield(props) {
    return (
        <Row> 
            <Col>
                <Form.Group controlId="Name" style={{display:"flex"}}>
                    { props.values.length > 0 && props.values.map(function(item) {
                        return (<Form.Check name={props.name}  type='radio' id={item.key} value={item.value} label={item.value} defaultChecked={ props.data[props.name]==item.key ? true : false } />)
                    })}
                </Form.Group>
            </Col>  
            <span style={props.style}>{ props.validation[props.name] }</span>
        </Row>
    )
}