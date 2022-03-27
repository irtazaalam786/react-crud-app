import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Checkfield(props) {
    return (
        <Row> 
            <Col>
                <Form.Group controlId="Name">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name={props.name}  type='select' id={props.name} value={props.data[props.name]} onChange={props.onInputChange}>
                        <option value="">Select Role</option>
                        { props.values.length > 0 && props.values.map(function(item,key) {
                            return (<option value={item.key}>{ item.value }</option>)
                        })}
                    </Form.Select>
                    <span style={props.style}>{ props.validation[props.name] }</span>
                </Form.Group>
            </Col>  
        </Row>
    )
}