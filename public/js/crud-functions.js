const getDataFromAPI = async (endpoint) => {
    let response = await fetch(endpoint);
    return response.json();

}

const postDataToAPI = async (endpoint, data) => {
    let response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export { getDataFromAPI, postDataToAPI };