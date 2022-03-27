import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Passwordfield(props) {
    return (
        <Row> 
            <Col>
                <Form.Group controlId="Name">
                    <Form.Label>{ props.name }</Form.Label>
                    <Form.Control name={ props.name } type="password" onChange={props.onInputChange} value={props.data[props.name]}/>
                </Form.Group>
                <span style={props.style}>{ props.validation[props.name] }</span>
            </Col>  
        </Row>
    )
}