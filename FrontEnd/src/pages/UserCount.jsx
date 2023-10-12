import React from 'react'
import { useEffect } from 'react'
import Account from '../components/Account'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformation } from '../redux/userinformationslice'
import EditButton from '../components/EditButton'

export default function UserCount() {
  const dispatch = useDispatch();
  // recupérer le token dans le local storge
  // let userToken = window.localStorage.getItem('userToken');
  const token = useSelector ((state) => state.authentification.token);
  // console.log(token); vérification token ok 


  useEffect(() => { 
    const callUserProfile = async () => {
      try {
        // Requête à l'API pour avoir les informations de l'utilisateur
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        console.log(data);

        // Stockez les informations de l'utilisateur dans le Redux store
        dispatch(setUserInformation(data));
      } catch (error) {
        alert(error.message);
      }
    };
    // Appele de la fonction fetchData pour récupérer les données
    callUserProfile(); 
  }, [dispatch, token]);
     

  return (
    <div className='main user-bg-dark'>

      <EditButton/>
      
      <h2 className="sr-only">Accounts</h2>
      
      <Account 
        title = "Argent Bank Checking (x8349)"
        amount = "$2,082.79"
        amountText= "Available Balance"
      />
      <Account 
        title = "Argent Bank Savings (x6712))"
        amount = "$10,928.42"
        amountText= "Available Balance"
      />
      <Account 
        title = "Argent Bank Credit Card (x8349"
        amount = "$184.30"
        amountText= "Current Balance"
      />
    </div>
  )
}
