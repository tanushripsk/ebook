import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" })
    const host = "http://localhost:3001"

    var navigate = useNavigate()
    const clickhere = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/")
        } else {
            alert("invalid username and password")
        }
    }
    const onChange = (e) =>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form onSubmit={clickhere}>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={onChange} value={credential.email} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={onChange} value={credential.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
