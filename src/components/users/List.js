import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL,check_permission,ADMIN_NUMBER, USER_NUMBER } from '../../config';
import { useSelector, useDispatch } from 'react-redux';

export default function List(props) {
    
    //Used to access the payload sent from Create Component
    const location = useLocation();
    
    //Used to Navigate between pages
    const navigate = useNavigate();

    const [informations, setInformation] = useState([])

    //Get all Permissions
    const permissions = useSelector(state => state.permissions);

    useEffect(() => {
        fetchData()

        // Get Segments
        var segments=window.location.href.split('/');

        //Check Permission
        if(!check_permission(permissions,'view_'+segments[3])){
            navigate('/401');
        }

    }, [])

    const fetchData = async () => {
        await axios.get(`users`).then(({ data }) => {
            setInformation(data.data)
            
            //This is used to clear the payload sent from Create Component
            // navigate(location.pathname, { replace: true });
        })
    }

    const deleteItem = async (id) => {

        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`products/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchData()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    return (
        <div className="container">
            
            { location.state ? (<Alert variant="success">
                <p className="mb-0">
                    {location.state}
                </p>
            </Alert>) : '' }
            

            <div className="row">
                <div className='col-12'>
                    { check_permission(permissions,'update_user') ? (
                        <Link className='btn btn-primary mb-2 float-end' to={"/users/create"}>
                            Create User
                        </Link>
                    ) : '' }
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        informations.length > 0 && (
                                            informations.map((row, key) => (
                                                <tr key={key}>
                                                    <td>{row.name}</td>
                                                    <td>{row.email}</td>
                                                    <td>
                                                        { row.id != USER_NUMBER ? (
                                                            <>
                                                                { check_permission(permissions,'edit_user') ? (<Link to={`/user/edit/${row.id}`} className='btn btn-success me-2'>Edit</Link>) : '' }
                                                                { check_permission(permissions,'delete_user') ? (<Button variant="danger" onClick={() => deleteItem(row.id)}>Delete</Button>) : ''}             
                                                            </>
                                                        ) : '' }
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}