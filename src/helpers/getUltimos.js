

export const getUltimos = async() => {

    const resp = await fetch('http://localhost:8080/ultimos'); // Petición al server
    const data = await resp.json();

    return data.ultimos;

}