import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'

export default function Textfield(props) {
    return (
        <Row> 
            <Col>
                <Form.Group controlId="Name">
                    <Form.Label>{ props.name }</Form.Label>
                    <Form.Control name={ props.name } type="text" onChange={props.onInputChange} value={props.data[props.name]}/>
                </Form.Group>
                <span style={props.style}>{ props.validation[props.name] }</span>
            </Col>  
        </Row>
    )
}