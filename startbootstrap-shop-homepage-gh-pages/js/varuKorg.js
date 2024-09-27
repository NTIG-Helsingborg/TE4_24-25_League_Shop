document.addEventListener("DOMContentLoaded", function () 
{
    fetch('JSON/foremalJSON.json')
        .then(response => response.json()) //hämtar från json
        .then(data => 
        {
//----------------------------------------------------------------------------
            const itemContainer = document.getElementById("itemContainer"); // hämar id button från htlm
            const containerCart = document.getElementById("containerCart"); //id av htlm

            tillLagd = JSON.parse(localStorage.getItem("index")) || []; // hämtar från local storage

            
            let value = 1; // initial value
            
            for (let i = 0; i < tillLagd.length; i++) { // for loop som skriver hela array med tillagda föremål
                let namn = data.foremalData[tillLagd[i]].namn; // hämtar data från json baserad på index från local storage 
                let pris = data.foremalData[tillLagd[i]].pris;
            
                let namnElement = document.createElement('h1'); // skapar ett element för att kunna skriva ut namnen
                let prisElement = document.createElement("h1");
                
                prisElement.textContent = pris; // sätter innehållet till hämtade priset från json fil
                namnElement.textContent = namn;
            
                let itemContainer = document.createElement("div"); // skapar en div 
                itemContainer.appendChild(namnElement); // lägger föremålen i div
                itemContainer.appendChild(prisElement);
                itemContainer.id = "lada" + i;
            
                // Skapa knappen för att öka värdet
                const ökningKnapp = document.createElement('button');
                ökningKnapp.textContent = "Öka";
            
                // Skapa knappen för att återställa värdet
                let antal = document.createElement("span"); // skapar ett element för att skriva ut priset
                antal.textContent = value;
            
            
                // Skapa knappen för att minska värdet
                const minskningKnapp = document.createElement('button');
                minskningKnapp.textContent = "Minska";
                
                ökningKnapp.onclick = function() { // funktion som adderar
                    value++;
                    antal.textContent = value; // uppdatera värdet på labelRäknare
                };
            
                // Hantera klick på minskningknappen
                minskningKnapp.onclick = function() { // funktion som subtraherar
                    value--;
                    antal.textContent = value;
                    if (value <= 0) {
                        itemContainer.remove(); // ta bort itemContainer om värdet är 0 eller lägre
                    }
                };
            
                // Lägg till knapparna i itemContainer
                itemContainer.appendChild(ökningKnapp);
                itemContainer.appendChild(antal);
                itemContainer.appendChild(minskningKnapp);
            
                // Lägg in div i containerCart div
                containerCart.appendChild(itemContainer); // lägger in itemContainer i containerCart
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
