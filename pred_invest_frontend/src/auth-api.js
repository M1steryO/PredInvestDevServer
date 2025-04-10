export async function getUser() {
    const response = await fetch("http://localhost:8082/api/user", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    });
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export async function loginUser(email, password) {
    const response = await fetch("http://localhost:8082/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({email, password}),
    });
    
    return await response.json();
}


export async function logoutUser() {
    const response = await fetch("http://localhost:8082/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

export async function registerUser(name, email, password) {
    const response = await fetch("http://localhost:8082/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    });
    
    return await response.json();
}

export async function editUser(name, email) {
    const data = {};
    if (name) {
        data.name = name;
    }
    if (email) {
        data.email = email;
    }

    const response = await fetch("http://localhost:8082/api/user/edit", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export async function fetchDashboards(symbol, chart_type, interval) {

    const params = new URLSearchParams({
        symbol,
        chart_type,
        interval,
    });
    const response = await fetch(
        `http://flask-server:5001/api/chart?${params.toString()}`,
        {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }
    );
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export async function fetchDataTypes() {
    const response = await fetch(
        `http://flask-server:5001/api/data-types?`,
        {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }
    );
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return await response.json();
}