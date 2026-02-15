import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkToken } from "../api/api";

export function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try{
                const data = await checkToken(localStorage.getItem("token"));
            } catch(error) {
            localStorage.removeItem("token");
            navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div>Vérification du token...</div>
    return children;
}