import { useState, useEffect } from "react";
import { runPrompt } from "../api/api";

export function AIPromptInput({disconnect, toggleRefresh, prompt}){ 
    const [loading, setLoading] = useState(true)   
        useEffect(() => {
            const load = async () => {
                try{
                    await runPrompt(localStorage.getItem("token"), prompt)
                    toggleRefresh();
                } catch (error) {
                    alert(error);
                    disconnect();
                } finally {
                    setLoading(false);
                }
            };
            load();
        }, []);

    if (loading) return (
    <>
        <ul>
            <li style={{ marginBottom: "10px"}}>
                <p className="prompt">{prompt}</p>
            </li>
        </ul>
        <div className="loading">Chargement de la réponse...</div>
    </>

    );
}