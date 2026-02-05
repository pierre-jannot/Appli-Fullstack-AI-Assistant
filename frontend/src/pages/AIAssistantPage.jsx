import { useEffect, useState } from "react";

export function AIAssistantPage(toggleLogged){
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try{
                const response = await fetch("http://localhost:8000/history", {
                            method: "POST",
                            headers: { "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify({
                                "prompt":"prompt",
                                "answer":"answer"
                            })
                        });
                        const data = await response.json();
                if (response.ok) {
                    if (data.history) {
                        setHistory(data.history)

                    } else {
                        return <p>Commencer une nouvelle conversation</p>
                    }
                }

            } catch (error) {
                console.error("Erreur fetch :", error);
                alert(error);
                toggleLogged();
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div>Chargement des conversations...</div>

    return (
        <>
            <h2>Conversation</h2>
            <ul>
                {history.map(item => (
                    <li key={item.idprompt} style={{ marginBottom: "10px"}}>
                        <strong>{item.prompt}</strong> <br />
                        {item.answer} <br />
                        <small>{item.time}</small>
                    </li>
                ))}
            </ul>
        </>
    )
}