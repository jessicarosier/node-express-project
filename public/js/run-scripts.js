import {getDataFromAPI, postDataToAPI} from "./crud-functions.js";

function humanReadableBytes(sizeBytes) {
    const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];
    let size = Math.abs(Number(sizeBytes));
    let unitIndex = 0;

    while (size >= 1000 && unitIndex < UNITS.length - 1) {
        size /= 1000;
        ++unitIndex;
    }

    return `${size.toFixed(1)} ${UNITS[unitIndex]}`;
}


function buildTableRowsFromObject(obj) {
    let tableRowHTML = "";
    // Iterate over the object's keys and values
    Object.entries(obj).forEach(([key, value]) => {
        tableRowHTML += "<tr>";
        tableRowHTML += `<td>${key}: ${value}</td>`;
        tableRowHTML += "</tr>";
    });

    return tableRowHTML;
}


function buildStatsObject(array) {
    return array.reduce((accumulator, currentObject) => {
        Object.keys(currentObject).forEach(key => {
            if (typeof currentObject[key] === "number") {
                accumulator[key] = (accumulator[key] || 0) + currentObject[key];
            }
        });
        return accumulator;
    }, {});
}


async function getStats() {
    const tableBody = document.getElementById("tableBody");
    const endpoint = "/api/v1/stats";
    const url = `${endpoint}/${encodeURIComponent(document.getElementById("start-date").value)}/${encodeURIComponent(document.getElementById("end-date").value)}`;

    try {
        const data = await getDataFromAPI(url);
        let statsObj = buildStatsObject(data.result);

        const keysToConvert = ["totalDownloadSize", "totalUploadSize"];

        keysToConvert.forEach(key => {
            if (statsObj[key]) {
                statsObj[key] = humanReadableBytes(statsObj[key]);
            }
        });

        tableBody.innerHTML = buildTableRowsFromObject(statsObj);
    } catch (error) {
        console.error(error);
        tableBody.innerHTML = "<tr><td>Unable to fetch data</td></tr>";
    }
}

async function createPdf(data) {
    const endpoint = "/api/v1/pdf";
    try {
        const response = await postDataToAPI(endpoint, data);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("generate-pdf-btn").addEventListener("click", async () => {
    let formData = new FormData(document.getElementById("pdf-form"));

   let data = Object.fromEntries(formData.entries());
    console.log(data);

    await createPdf(data);
});