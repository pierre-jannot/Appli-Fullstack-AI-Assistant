import { useState, useEffect } from "react"
import './Login.css'

export function Login(){
    const [register,setRegister] = useState(false);

    const toggleRegister = () => {
        setRegister(prev => !prev);
    }

    return (
        <>
            {!register &&(
                <section id="login">
                    <h1>Connexion</h1>
                    <form className="login-form">
                        <label for="email">Identifiant : </label>
                        <input type="email" id="email" placeholder="Adresse mail" maxLength={254} required
                        title="Merci d'utiliser une adresse mail valide."></input>
                        <label for="password">Mot de passe : </label>
                        <input type="password" id="password" placeholder="Mot de passe" pattern=".{12,72}" minLength={12} maxLength={72} required
                        title="Votre mot de passe est composé d'au moins 12 caractères."></input>
                        <button type="submit">Se connecter</button>
                    </form>
                    <p className="register-login-toggler" onClick={toggleRegister}>Première connexion ? Cliquez ici pour créer un compte</p>
                </section>
            )}
            {register &&(
                <section id="register">
                    <h1>S'inscrire</h1>
                    <form className="register-form">
                        <label for="email">Identifiant : </label>
                        <input type="email" id="email" placeholder="Adresse mail" maxLength={254} required
                        title="Merci d'utiliser une adresse mail valide."></input>
                        <label for="password">Mot de passe : </label>
                        <input type="password" id="password" placeholder="Mot de passe" pattern=".{12,72}" minLength={12} maxLength={72} required
                        title="Votre mot de passe doit être composé d'au moins 12 caractères."></input>
                        <label for="name">Prénom : </label>
                        <input type="text" id="name" placeholder="Prénom" minLength={3} maxLength={50} required></input>
                        <label for="surname">Nom : </label>
                        <input type="text" id="surname" placeholder="Nom" minLength={3} maxLength={50} required></input>
                        <button type="submit">S'inscrire</button>
                    </form>
                    <p className="register-login-toggler" onClick={toggleRegister}>Déjà un compte ? Cliquez ici pour vous connecter</p>
                </section>
            )}
                    
                    

        </>
    )
}