import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../redux/authentificationslice'
import { useDispatch } from 'react-redux'
import { loginUser } from '../Service/Api'

export default function Form() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

// ****************************GESTION "REMEMBERME" LOGIN INFORMATION**************************************************
    // Récupèrer les valeurs stockées dans le localStorage au chargement de la page
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const rememberedPassword = localStorage.getItem("rememberedPassword");

        if (rememberedEmail && rememberedPassword) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        // Coche automatiquement la case "Remember me" si des valeurs sont présente
        document.getElementById("remember-me").checked = true;
        }
    }, []);

// ****************************FUNCTION LOGIN **************************************************
    const Connection=(e)=>{
        e.preventDefault();
        // FUNCTION API LOGINUSER (service/api.js)
        loginUser(email, password)
        .then((token) => {
            dispatch(signIn(token));

            // Enregistrement dans le localstorage des info de connexion
            const rememberMeCheckbox = document.getElementById("remember-me");
            if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                // Stocke l'email et le mot de passe dans le localStorage
                localStorage.setItem("rememberedEmail", email);
                localStorage.setItem("rememberedPassword", password);
            } 
            else {
                // Efface les données du localStorage si "Remember me" n'est pas coché
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
            }

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
