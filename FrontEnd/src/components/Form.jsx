import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../redux/authentificationslice'
import { useDispatch } from 'react-redux'

export default function Form() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Connection=(e)=>{
        e.preventDefault();

            fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
            email: email,
            password: password,
            }),
        })
        .then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur de connexion');
            }
        })
        .then((data) => {
        const token = data.body.token;
        localStorage.setItem("token", JSON.stringify(token))
        dispatch(signIn(token));
        // console.log(token); vérification token ok 
        // Si le token est bien présent on renvois l'user sur la page /user
        navigate('/user');
        })
        .catch((error) => {
            console.error('Une erreur s\'est produite :', error);
            setError('Une erreur s\'est produite lors de la connexion.');
        });
    };
        
  return (
    <form onSubmit={Connection}>
        <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
            <div className="input-remember">
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
        </div>
            <button type='submit' className="sign-in-button">Sign In</button>
            <div className='error-txt'>{error}</div>
    </form>
  )
}
