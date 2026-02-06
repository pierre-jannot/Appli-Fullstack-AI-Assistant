import { useState, useEffect } from "react";

export function AIPromptInput({disconnect, toggleRefresh, prompt}){ 
    const [loading, setLoading] = useState(true)   
        useEffect(() => {
            const load = async () => {
                try{
                    const response = await fetch("http://localhost:8000/chat", {
                                method: "POST",
                                headers: { "Content-Type": "application/json",
                                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                                },
                                body: JSON.stringify({
                                    "prompt":prompt
                                })
                            });
                    if (!response.ok) {
                        const text = await response.text();
                        throw new Error(`${response.status}: ${text}`)
                    }
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