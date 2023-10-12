import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInformation } from '../redux/store'


export default function EditButton() {

    const token = useSelector ((state) => state.authentification.token)
    const userInfo = useSelector((state) => state.authentification.userData)
    const dispatch = useDispatch()

    const [newUserName, setnewUserName] = useState('')
    
    // gestion de l'état du form editName (fermé ou ouvert)
    const [editOn, setEditOn] = useState(false);
    const displayEditForm = () => {
        setEditOn(true)
      // ici on initialise l'etat de newUserName au moment de l'ouverture du form pour éviter les erreur undefined
        setnewUserName(userInfo.body.userName)
    }
    const closeEditForm = () => {
      setEditOn(false);
    };

    // Function call api pour modif username
    const editUserName = async (e) => {
      e.preventDefault();

      // On fait la requête à l'API pour mettre à jour le nom d'utilisateur
      fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: newUserName,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du nom de l\'user name');
          }
          return response.json();
        })
        .then((data) => {
          const updatedUserName = data.body.userName;

          // on met à jour l'état Redux avec le nouveau nom d'utilisateur !!! ne fonctionne pas de cette manière !!!
          // dispatch(setUserInformation(updatedUserName)) 

          // fonctionne de cette manière en on envois les nouvel information en créant un copie superficielle de usezInfo puis la même chose pou body avant de mettre à jour l'username
          dispatch(setUserInformation({ ...userInfo, body: { ...userInfo.body, userName: updatedUserName } }))
          // on ferme le formulaire après la modification réussi
          setEditOn(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
        });
      
    }
    
  return (
    <div>
      {editOn ? (
        <div className='edit-button-component'>
          <div className="edit-form-container">
            <h3>
              Edit user info
            </h3>
            <form className='edit-username-form' onSubmit={editUserName}>
              <div className="input-container">
                <label htmlFor="userName">User name: </label>
                <input 
                type="text"
                id='userName'
                value={newUserName}
                onChange={(e) => setnewUserName(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="firstName">First name: </label>
                <input 
                type="text"
                id='firstName'
                defaultValue={userInfo.body.firstName}
                readOnly
                disabled
                />
              </div>
              <div className="input-container">
                <label htmlFor="lastName">Last name: </label>
                <input 
                type="text"
                id='lastName'
                defaultValue={userInfo.body.lastName}
                readOnly
                disabled
                />
              </div>
              <div className="form-btn-container">
                <button type='submit'>Save</button>
                <button onClick={closeEditForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        )
        : 
        (
          <div>
              <div className="header">
                <h1>Welcome back<br />{userInfo ? `${userInfo.body.firstName} ${userInfo.body.lastName}` : ''}</h1>
                <button className="edit-button" onClick={displayEditForm}>Edit Name</button>
            </div>
          </div>
        )
      }        
    </div>
  )
}
