import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/check-token", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error();
        })
        .catch(() => {
            localStorage.removeItem("token");
            navigate("/login");
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Vérification du token...</div>
    return children;
}