import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const handleSubmit = event => {
        event.preventDefault();
        axios.post('/auth/login', values).then(res => {
            console.log(res.data);
        })
    }
    const handleKeyDown = event => {
        setValues({
            ...values,
            [event.target.id]:event.target.value
        })
    }
    return(
        <div className="col-sm-12 col-md-10 mt-md-4 offset-md-2 pl-md-5 ">
            <div className="jumbotron ">
                <h3 className="text-center">Login</h3>
                <form onSubmit={handleSubmit} className="text-center d-flex flex-column justify-content-center align-items-center">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={values.email} onChange={handleKeyDown} className="d-block form-control" id="email" type="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input value={values.password} onChange={handleKeyDown} className="d-block form-control" id="password" type="password"/>
                    </div>
                    <button className="btn btn-primary" type="submit">Log in</button>
                </form>
                <Link to="/register">Don't have an account?</Link>

            </div>
        </div>
    )
}

export default Login