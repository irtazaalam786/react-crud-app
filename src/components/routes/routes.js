import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListProduct from "../product/List";
import ListUser from "../users/List";
import ListRole from "../roles/List";
import CreateProduct from "../product/Create";
import CreateRole from "../roles/Create";
import CreateUser from "../users/Create";
import Login from "../login/Login";
import NotAuthorize from "../401";
import Protected from "./Protected";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export default function RoutesInfo(props) {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={12}>
                    <Routes>
                        <Route path="/product/create" element={<Protected component={CreateProduct} />} />
                        <Route path="/roles/create" element={<Protected component={CreateRole} />} />
                        <Route path="/users/create" element={<Protected component={CreateUser} />} />
                        <Route path="/product/edit/:id" element={<Protected component={CreateProduct} />} />
                        <Route path="/roles/edit/:id" element={<Protected component={CreateRole} />} />
                        <Route path="/user/edit/:id" element={<Protected component={CreateUser} />} />
                        <Route exact path='product/' element={<Protected component={ListProduct} />} />
                        <Route exact path='user/' element={<Protected component={ListUser} />} />
                        <Route exact path='role/' element={<Protected component={ListRole} />} />
                        <Route exact path='/401' element={<Protected component={NotAuthorize} />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/' element={<Login />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    )
}