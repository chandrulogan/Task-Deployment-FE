import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import env from '../environment';
import Button from 'react-bootstrap/esm/Button';
import { DownloadTableExcel, downloadExcel} from 'react-export-table-to-excel';
import { FaTrash, FaPen, FaDownload } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";


function Dashboard() {
    let [data, setData] = useState([])
    let navigate = useNavigate();
    let tableRef = useRef(null)

    let loadData = async () => {
        let token = sessionStorage.getItem('token')
        if (token) {
            let res = await axios.get(`${env.apiurl}/users`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (res.data.statusCode === 200) {
                setData(res.data.data)
            } else {
                alert("Token Not found")
                navigate('/login')
            }
        } else {
            alert("Token Not found")
            navigate('/login')
        }
    }

    let handleDelete = async (id) => {
        let token = sessionStorage.getItem('token');
        if (token) {
          try {
            let res = await axios.delete(`${env.apiurl}/users/delete/${id}`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.data.statusCode === 200) {
              loadData();
            } else {
              alert(res.data.message);
            }
          } catch (err) {
            console.log(err);
            alert("An error occurred while deleting the user.");
          }
        } else {
          alert("Token Not found");
          navigate('/login');
        }
      }
      
      let handleDownloadExcel = async()=>{
        let body = []
        data.map((e)=>{
            body.push({
                Username:e.username,
                email:e.email,
                mobile:e.mobile
            })
        })
        downloadExcel({
            fileName:"Users",
            sheet:"User",
            tablePayload:{
               header: ["Users Name","Mail id", "Mobile Number"],
               body:body
            }
        })
      }

    useEffect(() => {
        loadData()
    },[])

    return (
        <div >
            <Button variant='primary' onClick={()=>loadData()}><SlRefresh/></Button>
            <div className='Dashboard-top'>
            <h1>Welcome to Dashboard</h1>
            <p>All your contents are below</p>
            </div>
            <div>
                <Button variant='success' onClick={()=>handleDownloadExcel()}><FaDownload/>Export Data</Button>
            </div>
            
            <Table striped bordered hover size="sm" className='Dashboard' ref={tableRef}>
            <thead>
                    <tr>
                        <th>S no</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e,i)=>{
                            return <tr key={i}>
                            <td>{i+1}</td>
                            <td>{e.username}</td>
                            <td>{e.email}</td>
                            <td>{e.mobile}</td>
                            <td>
                            <Button variant='danger' onClick={()=>handleDelete(e._id)}><FaTrash/></Button>
                            </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
        
    )
}

export default Dashboard