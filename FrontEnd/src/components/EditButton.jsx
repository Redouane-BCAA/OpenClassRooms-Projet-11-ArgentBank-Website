import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInformation, editUserNameInformation } from '../redux/store'
import { editUserName } from '../Service/Api'


export default function EditButton() {

    const token = useSelector ((state) => state.authentification.token)
    const userInfo = useSelector((state) => state.userInformation.userData)
    const dispatch = useDispatch()

    const [newUserName, setnewUserName] = useState('')
    
    // gestion de l'état du form editName (fermé ou ouvert)
    const [editOn, setEditOn] = useState(false);
    const displayEditForm = () => {
        setEditOn(true)
      // ici on initialise l'etat de newUserName au moment de l'ouverture du form pour éviter les erreur undefined
        setnewUserName(userInfo.userName)
    }
    const closeEditForm = () => {
      setEditOn(false);
    };

    // Function callapi pour modif username (service/api.js)
    const handleEditUserName = (e) => {
      e.preventDefault();
  
      editUserName(token, newUserName)
        .then((updatedUserName) => {
          dispatch(editUserNameInformation(updatedUserName));
          setEditOn(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
        });
    };
    
  return (
    <div>
      {editOn ? (
        <div className='edit-button-component'>
          <div className="edit-form-container">
            <h3>
              Edit user info
            </h3>
            <form className='edit-username-form' onSubmit={handleEditUserName}>
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
                defaultValue={userInfo.firstName}
                readOnly
                disabled
                />
              </div>
              <div className="input-container">
                <label htmlFor="lastName">Last name: </label>
                <input 
                type="text"
                id='lastName'
                defaultValue={userInfo.lastName}
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
                <h1>Welcome back<br />{userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ''}</h1>
                <button className="edit-button" onClick={displayEditForm}>Edit Name</button>
            </div>
          </div>
        )
      }        
    </div>
  )
}
