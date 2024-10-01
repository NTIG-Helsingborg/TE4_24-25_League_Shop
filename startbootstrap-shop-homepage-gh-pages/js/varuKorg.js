document.addEventListener("DOMContentLoaded", function () 
{
    fetch('JSON/foremalJSON.json')
    .then(response => response.json()) //hämtar från json
    .then(data => 
//-----------------------------------------------------------------------------------------------------------------------------
    {
        const containerCart = document.getElementById("containerCart"); //id av html

        tillLagd = JSON.parse(localStorage.getItem("index")) || []; // hämtar från local storage

        if (tillLagd.length > 0 )
        {
            const fyllningsText = document.getElementById("filler");
            fyllningsText.remove();
        }
        //-----------------------------------------------------------------------------------------------------------------------------
        for (let i = 0; i < tillLagd.length; i++) 
        { 
            createProduktCard(data.foremalData[tillLagd[i]], 'containerCart');
        }
//-----------------------------------------------------------------------------------------------------------------------------
        // Function to create product cards
        function createProduktCard(produkt, containerId) 
        {
            let containerDiv = document.createElement('div');
            containerDiv.classList.add('row', 'align-items-center', 'border', 'p-3', 'm-1');

            let produktInfoDiv = document.createElement('div');
            produktInfoDiv.classList.add('col-md-8', 'd-flex', 'align-items-center');

            let produktImg = document.createElement('img');
            produktImg.src = produkt.bild;
            produktImg.alt = produkt.namn;
            produktImg.classList.add('img-fluid', 'me-3');
            produktImg.style.width = '50%';
            produktImg.style.height = 'auto';

            let produktName = document.createElement('span');
            produktName.textContent = produkt.namn;
            produktName.classList.add('fw-bold');

            produktInfoDiv.appendChild(produktImg);
            produktInfoDiv.appendChild(produktName);

            let produktPriceDiv = document.createElement('div');
            produktPriceDiv.classList.add('col-md-4', 'text-end');

            let produktPrice = document.createElement('span');
            produktPrice.textContent = `${produkt.pris}kr`;
            produktPrice.classList.add('text-success', 'fw-bold');

            produktPriceDiv.appendChild(produktPrice);

            containerDiv.appendChild(produktInfoDiv);
            containerDiv.appendChild(produktPriceDiv);

            let targetContainer = document.getElementById(containerId);

            if (targetContainer) 
            {
                targetContainer.appendChild(containerDiv);
            } 
            else 
            {
                console.error(`Container with ID "${containerId}" not found.`);
            }
        }
//-----------------------------------------------------------------------------------------------------------------------------

        const printBtn = document.getElementById("pdf");
        printBtn.addEventListener("click", function()
        {
            window.print();
        });
//-----------------------------------------------------------------------------------------------------------------------------
    })
    .catch(error => console.error("Error fetching JSON data:", error));
});