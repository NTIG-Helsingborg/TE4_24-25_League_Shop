document.addEventListener("DOMContentLoaded", function () 
{
    fetch('JSON/foremalJSON.json')
        .then(response => response.json()) //hämtar från json
        .then(data => 
        {
//----------------------------------------------------------------------------
        const containerCart = document.getElementById('containerCart');
        const numberOfBoxes = 3; // Antalet boxar vi vill skapa

        tillLagd = JSON.parse(localStorage.getItem("index")) || []; // hämtar från local storage

        for (let i = 0; i < tillLagd.length; i++) 
        {
            let namn = data.foremalData[tillLagd[i]].namn; // hämtar data från json baserad på index från local storage 
            let pris = data.foremalData[tillLagd[i]].pris;
            // Skapa en div för boxen
            const box = document.createElement('div');

            let namnElement = document.createElement('h1'); // skapar ett element för att kunna skriva ut namnen
            let prisElement = document.createElement("h1");
                
                prisElement.textContent = pris; // sätter innehållet till hämtade priset från json fil
                namnElement.textContent = namn;
            
                box.appendChild(namnElement); // lägger föremålen i div
                box.appendChild(prisElement);
                box.id = "lada" + i;
                box.classList.add('box');
            

            // Skapa minus-knappen (plus)
            const plusButton = document.createElement('button');
            plusButton.classList.add('plus');
            plusButton.textContent = '+';
            
            
            // Skapa värdvisaren
            const valueDisplay = document.createElement('span');
            valueDisplay.classList.add('value');
            valueDisplay.textContent = '1';
            
            // Skapa plus-knappen (minus)
            const minusButton = document.createElement('button');
            minusButton.classList.add('minus');
            minusButton.textContent = '-';

            // Lägg till knappar och värdvisare i boxen
            box.appendChild(plusButton);  
            box.appendChild(valueDisplay);
            box.appendChild(minusButton);

            // Lägg till boxen i container
            containerCart.appendChild(box);

            // Händelselyssnare för plus-knappen
            plusButton.addEventListener('click', () => {
                let value = parseInt(valueDisplay.textContent);
                value++;
                valueDisplay.textContent = value;
            });

            // Händelselyssnare för minus-knappen
            minusButton.addEventListener('click', () => 
            {
                let value = parseInt(valueDisplay.textContent);
                value--;
                valueDisplay.textContent = value;
                if (value <= 0) {
                    box.remove(); // ta bort box om värdet är 0 eller lägre
                }
            });
        }





           

           

            
        
            
                
            
               

                
            
    
            


        
  
            



            

            

            

//----------------------------------------------------------------------------
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

/*for (let i = 0; i < tillLagd.length; i++) {
    let namn = data.foremalData[tillLagd[i]].namn;
    let pris = data.foremalData[tillLagd[i]].pris;

    let box = document.createElement("div")
    let prisElement = document.createElement("h1");
    let namnElement = document.createElement('h1')
    
    box.appendChild(namnElement);
    namnContainer.appendChild(namnElement);

    prisElement.textContent = pris
    namnElement.textContent = namn;
    containerCart.appendChild(box);
    



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
