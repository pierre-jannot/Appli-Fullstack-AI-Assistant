const BASE_URL = "http://localhost:8000"

export async function loginUser(loginData) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    });
    if (!response.ok) {
        const text = await response.json();
        throw new Error(`${response.status}: ${text.detail}`);
    }
    return response.json();
}

export async function registerUser(registerData) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData)
    });
    if (!response.ok) {
        const text = await response.json();
        throw new Error(`${response.status}: ${text.detail}`);
    }
    return response.json();
}

export async function getUserHistory(token) {
    const response = await fetch(`${BASE_URL}/history`, {
        headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
    const text = await response.json();
    throw new Error(`${response.status}: ${text.detail}`)
    }
    return response.json();
}

export async function runPrompt(token, prompt) {
    const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "prompt":prompt
        })
    });
        if (!response.ok) {
        const text = await response.text();
        throw new Error(`${response.status}: ${text.detail}`)
    }
}

export async function checkToken(token) {
    const response = await fetch(`${BASE_URL}/check-token`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error();
}