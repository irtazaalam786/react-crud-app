import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate,useParams } from 'react-router-dom'

export default function Navigation(props) {

    //Used to make navigate between Components
    const navigate = useNavigate();

    const logout = () =>{
        console.log('logout');
        localStorage.removeItem("token"); 
        navigate("/login")
    }

    return (
        <Navbar bg="primary">
            <Container>
                <Navbar.Brand><Link to={"/"} className="navbar-brand">REACT PROJECT</Link></Navbar.Brand>
                {localStorage.getItem('token') ? (
                    <>
                        <Navbar.Brand onClick={logout}>LOGOUT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title="Features" id="basic-nav-dropdown">
                                    <NavDropdown.Item><Link to={"/role"} className="navbar-brand">Roles</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to={"/user"} className="navbar-brand">Users</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to={"/product"} className="navbar-brand">Products</Link></NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                ) : ''}
                
            </Container>

        </Navbar>
    )
}