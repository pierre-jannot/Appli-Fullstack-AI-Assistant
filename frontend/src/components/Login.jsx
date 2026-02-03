import { useState } from "react"
import './Login.css'

export function Login(){
    const [register,setRegister] = useState(false);
    const [registerData,setRegisterData] = useState({email:'', password:'', name:'', surname:''});
    const [loginData,setLoginData] = useState({email:'', password:''});

    const removeRegisterData = () => {
        setRegisterData({email:'', password:'', name:'', surname:''});
    }

    const removeLoginData = () => {
        setLoginData({email:'', password:''});
    }

    const toggleRegister = () => {
        setRegister(prev => !prev);
    }

    const handleRegisterChange = (e) => {
        const {name, value} = e.target;
        setRegisterData({...registerData, [name]: value});
    }

    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLoginData({...loginData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulaire envoyé")
        try {
            let response;
            if(!register){
                response = await fetch("http://localhost:8000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginData),
                });
            }
            else{
                response = await fetch("http://localhost:8000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registerData),
                });
            }

        const data = await response.json();
        console.log("Réponse du serveur :", data);

        if (response.ok) {
            if (register) {
                removeRegisterData();
                alert("Création de compte réussie !");
            } else {
                removeLoginData();
                alert("Connexion réussie !")   
            }
        } else {
            if (register) {
                alert("Erreur dans la création du compte.")
            } else {
                alert("L'identifiant ou le mot de passe est erroné.")
            }
        }

    } catch (error) {
        console.error("Erreur fetch :", error);
        alert("Impossible de se connecter.");
    }
    }

    return (
        <>
            {!register &&(
                <section id="login">
                    <h1>Connexion</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Identifiant : </label>
                        <input type="email" id="email" placeholder="Adresse mail" maxLength={254} required
                        title="Merci d'utiliser une adresse mail valide."
                        onChange={handleLoginChange} value={loginData.email} name='email'></input>
                        <label htmlFor="password">Mot de passe : </label>
                        <input type="password" id="password" placeholder="Mot de passe" pattern=".{12,72}"
                        minLength={12} maxLength={72} required
                        title="Votre mot de passe est composé d'au moins 12 caractères."
                        onChange={handleLoginChange} value={loginData.password} name='password'></input>
                        <button id="submit-button">Se connecter</button>
                    </form>
                    <p className="register-login-toggler" onClick={toggleRegister}>Première connexion ? Cliquez ici pour créer un compte</p>
                </section>
            )}
            {register &&(
                <section id="register">
                    <h1>S'inscrire</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Identifiant : </label>
                        <input type="email" id="email" placeholder="Adresse mail" maxLength={254} required
                        title="Merci d'utiliser une adresse mail valide."
                        onChange={handleRegisterChange} value={registerData.email} name="email"></input>
                        <label htmlFor="password">Mot de passe : </label>
                        <input type="password" id="password" placeholder="Mot de passe" pattern=".{12,72}" minLength={12} maxLength={72} required
                        title="Votre mot de passe doit être composé d'au moins 12 caractères."
                        onChange={handleRegisterChange} value={registerData.password} name="password"></input>
                        <label htmlFor="name">Prénom : </label>
                        <input type="text" id="name" placeholder="Prénom" minLength={3} maxLength={50} required
                        onChange={handleRegisterChange} value={registerData.name} name="name"></input>
                        <label htmlFor="surname">Nom : </label>
                        <input type="text" id="surname" placeholder="Nom" minLength={3} maxLength={50} required
                        onChange={handleRegisterChange} value={registerData.surname} name="surname"></input>
                        <button id="submit-button">S'inscrire</button>
                    </form>
                    <p className="register-login-toggler" onClick={toggleRegister}>Déjà un compte ? Cliquez ici pour vous connecter</p>
                </section>
            )}
                    
                    

        </>
    )
}