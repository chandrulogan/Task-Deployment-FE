import React, {useState}from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import env  from '../environment'
import { useNavigate } from 'react-router-dom';

function Login() {
    console.log(env);
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate()

    let handleLogin = async ()=>{
        let res = await axios.post(`${env.apiurl}/users/signin`,{
            email,
            password
        })
        if(res.data.statusCode === 200){
            sessionStorage.setItem('token',res.data.token)
            navigate('/Dashboard')
        } else {
            alert("In valid Log in")
        }
    }
    return (
        <div className='Login'>
            <Form>
                <h1>Welcome to App</h1>
                <p>Login to Continue</p>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                
                <Button variant="primary" onClick={()=>handleLogin()}>
                    Submit
                </Button>
                <p>Mail ID: chandru@gmail.com</p>
                <p>Password: Admin@123</p>
            </Form>
        </div>
    )
}

export default Login