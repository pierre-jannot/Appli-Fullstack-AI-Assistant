import { useEffect, useState } from "react";
import { AIPromptInput } from "../components/AIPromptInput";
import { FormatText } from "../components/FormatText";
import { useNavigate } from "react-router-dom";
import "./AIAssistantPage.css";

export function AIAssistantPage(){
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [submittedPrompt, setSubmittedPrompt] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const toggleRefresh = () => {
        setRefresh(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedPrompt(prompt);
        setPrompt("");
    }

    const disconnect = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const load = async () => {
            setSubmittedPrompt(null);
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
                if (!response.ok) {
                    const text = await response.json();
                    throw new Error(`${response.status}: ${text.detail}`)
                }
                const data = await response.json();
                if (data.history) {
                    setHistory(data.history)
                }
            } catch (error) {
                alert(error);
                disconnect();
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [refresh]);

    if (loading) return <div>Chargement des conversations...</div>

    return (
        <>
            <button className="disconnect-button" onClick={disconnect}>Se déconnecter</button>
            <h2>Assistant IA ChatGPT</h2>
            <ul>
                {history.map(item => (
                    <li key={item.idprompt} style={{ marginBottom: "10px"}}>
                        <p className="prompt">{item.prompt}</p>
                        <p className="answer"><FormatText text={item.answer}/></p>
                        <small className="time">{item.time}</small>
                    </li>
                ))}
            </ul>
            <form className="prompt-form" onSubmit={handleSubmit}>
                <input className="prompt-input" type="text" value={prompt} name="prompt"
                placeholder="Prompt"onChange={(e) => setPrompt(e.target.value)}
                minLength={5} maxLength={300}/>
                <button type="submit">Envoyer</button>
            </form>
            {submittedPrompt && (
                <AIPromptInput disconnect={disconnect} toggleRefresh={toggleRefresh} prompt={submittedPrompt}/>
            )}
        </>
    )
}