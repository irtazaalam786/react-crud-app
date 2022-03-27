import React, { useEffect,useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Checkfield(props) {
    return (
        <Row> 
            <Col>
                <Form.Group controlId="Name">
                    { props.values.length > 0 && props.values.map(function(item) {
                        return (<Form.Check name={props.multi_name} onChange={props.onInputChange}  type='checkbox' id={item.value} value={item.key} label={item.value} defaultChecked={props.data[props.name]?.includes(item.key) ? true : item.checked} />)
                    })}
                </Form.Group>
            </Col>  
            <span style={props.style}>{ props.validation[props.name] }</span>
        </Row>
    )
}