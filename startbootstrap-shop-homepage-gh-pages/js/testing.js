document.addEventListener("DOMContentLoaded", function () {
    fetch('foremalJSON.json')
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("dataDisplay");

            // Create HTML elements to display the JSON data
            const nameElement = document.createElement("p");
            nameElement.textContent = "Namn: " + data.namn;

            const ageElement = document.createElement("p");
            ageElement.textContent = "Pris: " + data.pris;

            const cityElement = document.createElement("p");
            cityElement.textContent = "Bild: " + data.bild;

            // Append the elements to the "dataDisplay" div
            dataDisplay.appendChild(nameElement);
            dataDisplay.appendChild(ageElement);
            dataDisplay.appendChild(cityElement);
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});