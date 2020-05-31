import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {
    const history = useHistory();
    const [values, updateValues] = useState({
        email: '',
        password: '',
        password2: '',
        name: '',
    })
    const [error, setError] = useState('')
    const handleSubmit = event => {
        event.preventDefault();

        if (!values.email, !values.password, !values.password2) {
            return setError('Field(s) are missing')
        }

        if (values.password !== values.password2) {
            return setError('Passwords Do not match')
        }

        axios.post('/auth/register', values).then(res => {
            if(res.data.success){
                history.push('/home/popular')
            } else {
                setError('An account with this email already exists')
            }
        })
    }

    const handleKeyDown = event => {
        updateValues({
            ...values,
            [event.target.id]: event.target.value,
        })

    }

    return (
        <div className="col-sm-12 col-md-10 mt-md-4 offset-md-2 pl-md-5 ">
            <div className="jumbotron ">
                <h3 className="text-center">Register</h3>
                <form onSubmit={handleSubmit} className="text-center d-flex flex-column justify-content-center align-items-center">
                    <div className="form-group">
                        <label htmlFor="name">Display name</label>
                        <input value={values.name} onChange={handleKeyDown} className="d-block form-control" id="name" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={values.email} onChange={handleKeyDown} className="d-block form-control" id="email" type="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input value={values.password} onChange={handleKeyDown} className="d-block form-control" id="password" type="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input value={values.password2} onChange={handleKeyDown} className="d-block form-control" id="password2" type="password" />
                    </div>
                    <p className="text-danger">{error}</p>
                    <button className="btn btn-primary" type="submit">Sign up</button>
                </form>
                <Link to="/login">Already have an account?</Link>

            </div>
        </div>
    )
}

export default Signup