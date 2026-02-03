import { useState, useEffect } from "react"

export function Login(formData){
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async() => {
            setError(null);
            try{
                let body;
                if(register=="register"){
                    body = JSON.stringify({
                        "email":formData.email,
                        "password":formData.password,
                        "name":formData.name,
                        "surname":formData.surname
                    })
                }
                else if (register=="login"){
                    body = JSON.stringify({
                        "email":formData.email,
                        "password":formData.password,
                    })
                }
                let res = await fetch(`/${register}`,
                    {
                        method: "POST",
                        headers: {"Content-type": "application/json"},
                        body: body
                    }
                )
                const text = await res.text();
                let data;

                try {
                    data = text ? JSON.parse(text) : null;
                } catch {
                    data = null;
                }

                if (!res.ok) {
                    const err = data
                    ? `Code: ${data.code || res.status} - Message: ${data.detail || data.message}`
                    : `Erreur serveur (${res.status})`;
                    throw new Error(err);
                }

                console.log(data);
            }
            catch(err) {
                console.error(err);
                const error = `${err.message}`;
                setError(error);
            }
        };
    },[]
);
}