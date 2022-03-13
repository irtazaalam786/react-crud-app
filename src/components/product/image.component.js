import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'

export default function Imagefield(props) {
    return (
        <Row>
            <Col>
                <Form.Group controlId="Image" className="mb-3">
                    <Form.Label>{ props.name }</Form.Label>
                    <Form.Control name={ props.name } type="file" />
                </Form.Group>
                { props.data[props.name] ? <img width="200px" height="180px" alt='' src={`http://localhost:8000/storage/product/image/${props.data[props.name]}`} /> : '' }
                <span style={props.style}>{ props.validation[props.name] }</span>
            </Col>
        </Row>
    )
}