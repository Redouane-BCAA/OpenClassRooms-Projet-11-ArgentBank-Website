import { configureStore, createSlice } from '@reduxjs/toolkit';

// Création du slice Redux pour la gestion de l'authentification
const authentificationSlice = createSlice({
    name: 'authentification',
    initialState: {
        // Indique l'état initial
        isConnected: false, 
        token: null, 
    },
    reducers: {
        // Action pour connecter l'utilisateur
        signIn: (state, action) => {
            // Une fois utilisateur est connecté on stoke le token 
            state.isConnected = true; 
            state.token = action.payload; 
        },
        // Action pour déconnecter l'utilisateur
        signOut: (state) => {
        // Quand utilisateur n'est pas connecté/déconnecté on supprime le token
            state.isConnected = false; 
            state.token = null;
            state.userData = null;
        },
        setUserInformation: (state, action) => {
            state.userData = action.payload; // Stockage des données de l'utilisateur dans le store
        },
    },

});
export const { signIn, signOut, setUserInformation } = authentificationSlice.actions;

// Configure le store Redux 
const store = configureStore({
    reducer: {
        // Utilisation du reducer du slice d'authentification
        authentification: authentificationSlice.reducer, 
    },
});

export default store;
