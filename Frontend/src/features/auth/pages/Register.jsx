import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from "react";
import { useNavigate } from 'react-router';


const Register = () => {

  const { user, loading, handleRegister } = useAuth();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister(username, email, password)

    navigate('/login')
  }

  if (loading) {
    return (<main>
      <h1>Loading...</h1>
    </main>

    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => { setUsername(e.target.value)}}
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
          />
          <input

            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
          />

          <input

            onChange={(e) => { setPassword(e.target.value)}}
            type="password"
            name='password'
            id="password"
            placeholder="Enter password"
          />

          <button className='button primary-button'>Sign up</button>
          <p>Already have an account ? <Link to={'/login'}>Login</Link></p>

        </form>

      </div>
    </main>
  )

}

export default Register