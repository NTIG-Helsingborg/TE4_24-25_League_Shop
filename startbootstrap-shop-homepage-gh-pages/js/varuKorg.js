document.addEventListener("DOMContentLoaded", function () 
{
    fetch('JSON/foremalJSON.json')
        .then(response => response.json()) //hämtar från json
        .then(data => 
        {
//----------------------------------------------------------------------------

            const containerCart = document.getElementById("containerCart"); //id av htlm

            tillLagd = JSON.parse(localStorage.getItem("index")) || []; // hämtar från local storage
            
            for (let i = 0; i < tillLagd.length; i++) { // for loop som skiver hela array med tillagda föremål
                let namn = data.foremalData[tillLagd[i]].namn; // hämtar data från json baserad från idex från locl storage 
                let pris = data.foremalData[tillLagd[i]].pris;

                let namnElement = document.createElement('h1') // skpar ekapar en element för att kunna skriva ut namnen/priset
                let prisElement = document.createElement("h1");
                prisElement.textContent = pris; // sätter innehållet till hämtade priset från json fil
                namnElement.textContent = namn;

                let itemContainer = document.createElement("div"); // skpar en div 
                itemContainer.appendChild(namnElement); // lägger föremålen i div
                itemContainer.appendChild(prisElement)

                containerCart.appendChild(itemContainer); // lägger in div i containercart div
                
            }
            let labelRäknare = document.getElementById("labelRäknare"); // hämar id button från htlm
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
