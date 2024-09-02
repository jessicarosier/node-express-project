import {getData, postData} from "./util/crud-functions.js";
import {validateForm} from "./util/form-functions.js";


async function createPdf(data) {
    const endpoint = "/api/v1/pdf";
    return await postData(endpoint, data);
}

async function downloadFile(endpoint, title) {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    try {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${title}.pdf`; // You can set a default filename or get it from the server
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
}

document.getElementById("generate-pdf-btn").addEventListener("click", async () => {
    if (!validateForm("pdf-form")) {
        return;
    }
    let formData = new FormData(document.getElementById("pdf-form"));

    let data = Object.fromEntries(formData.entries());
    let title = data.title;
    let filePath = await createPdf(data);

    //make API call to download the file
    await downloadFile(`/api/v1/download/${filePath.result}`, title);

});