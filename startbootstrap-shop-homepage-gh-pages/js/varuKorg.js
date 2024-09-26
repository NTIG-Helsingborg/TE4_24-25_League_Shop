document.addEventListener("DOMContentLoaded", function () 
{
    fetch('JSON/foremalJSON.json')
        .then(response => response.json()) //hämtar från json
        .then(data => 
        {
//----------------------------------------------------------------------------

            const containerCart = document.getElementById("containerCart"); //id av htlm

            tillLagd = JSON.parse(localStorage.getItem("index")) || []; // hämtar från local storage
            if (tillLagd.length > 0 )
            {
                const fyllningsText = document.getElementById("filler");
                fyllningsText.remove();
            }
            
            for (let i = 0; i < tillLagd.length; i++) { // for loop som skiver hela array med tillagda föremål
               createProduktCard(data.foremalData[tillLagd[i]], 'containerCart');

            }
            /*let labelRäknare = document.getElementById("labelRäknare"); // hämar id button från htlm
            const ökningKnapp = document.getElementById("ökningKnapp");
            const återställaKnapp = document.getElementById("återställaKnapp");
            const minskningKnapp = document.getElementById("minskningKnapp");
            let value = 0; 

            ökningKnapp.onclick = function(){
                value++
                labelRäknare.textContent=value
            }
            återställaKnapp.onclick = function(){
                value = 0;
                labelRäknare.textContent=value
            }
            minskningKnapp.onclick = function(){
                value--
                labelRäknare.textContent=value
            }*/
           
            
            //funktion för att visa vad som finns i varukorgen
            function createProduktCard(produkt, containerId) {
            // skapar en div med de nödvändiga Bootstrap classes
            let containerDiv = document.createElement('div');
            containerDiv.classList.add('row', 'align-items-center', 'border', 'p-3', 'm-1')

            // Create a div for produkt bild and namn (left side)
            let produktInfoDiv = document.createElement('div');
            produktInfoDiv.classList.add('col-md-8', 'd-flex', 'align-items-center');

            // Create an bild element for the produkt
            let produktImg = document.createElement('img');
            produktImg.src = produkt.bild;
            produktImg.alt = produkt.namn;
            produktImg.classList.add('img-fluid', 'me-3');

            produktImg.style.width = '50%';
            produktImg.style.height = 'auto';

            // Create a span element for the produkt namn
            let produktName = document.createElement('span');
            produktName.textContent = produkt.namn;
            produktName.classList.add('fw-bold');

            // Append bild and namn to the produkt info div
            produktInfoDiv.appendChild(produktImg);
            produktInfoDiv.appendChild(produktName);

            // Create a div for produkt price (right side)
            let produktPriceDiv = document.createElement('div');
            produktPriceDiv.classList.add('col-md-4', 'text-end');

            // Create a span for the produkt price
            let produktPrice = document.createElement('span');
            produktPrice.textContent = `${produkt.pris}kr`;
            produktPrice.classList.add('text-success', 'fw-bold');

            // Append price to the price div
            produktPriceDiv.appendChild(produktPrice);

            // Append the produkt info div and price div to the container div
            containerDiv.appendChild(produktInfoDiv);
            containerDiv.appendChild(produktPriceDiv);

            // Get the target container by ID
            let targetContainer = document.getElementById(containerId);

            // Append the containerDiv to the specified container
            if (targetContainer) {
                targetContainer.appendChild(containerDiv);
            } else {
                console.error(`Container with ID "${containerId}" not found.`);
            }
        }
       
//----------------------------------------------------------------------------
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

/*for (let i = 0; i < tillLagd.length; i++) {
    let namn = data.foremalData[tillLagd[i]].namn;
    let pris = data.foremalData[tillLagd[i]].pris;

    let itemContainer = document.createElement("div")
    let prisElement = document.createElement("h1");
    let namnElement = document.createElement('h1')
    
    itemContainer.appendChild(namnElement);
    namnContainer.appendChild(namnElement);

    prisElement.textContent = pris
    namnElement.textContent = namn;
    containerCart.appendChild(itemContainer);
    



-----------------

for (let i = 0; i < tillLagd.length; i++) {
    let namn = data.foremalData[tillLagd[i]].namn;
    let namnElement = document.createElement('h1')
    let pris = data.foremalData[tillLagd[i]].pris;
    let prisElement = document.createElement("h1");
    prisElement.textContent = pris
    namnElement.textContent = namn;
    containerCart.appendChild(namnElement);
    
            }
}*/
