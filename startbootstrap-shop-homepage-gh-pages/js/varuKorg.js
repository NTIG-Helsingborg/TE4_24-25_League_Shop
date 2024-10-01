document.addEventListener("DOMContentLoaded", function () {
    fetch("JSON/foremalJSON.json")
        .then(response => response.json())
        .then(data => {
//------------------------------------------------------------------------------------------------------------------------------            
            const containerCart = document.getElementById("containerCart");
            let tillLagd = JSON.parse(localStorage.getItem("index")) || []; // Load items from localStorage

            let itemQuantities = {}; // Store item quantities here
            let totalPris = 0;
//------------------------------------------------------------------------------------------------------------------------------      
            // Function to update total price in the DOM
            const updateTotalPris = () => {
                const totalPrisElement = document.getElementById("totalPris");
                totalPrisElement.textContent = `Total pris: ${totalPris} kr`; // assuming currency is in kr
            };
//------------------------------------------------------------------------------------------------------------------------------      
            // Function to update the display of item quantity (e.g., "2x")
            const updateItemQuantityDisplay = (itemElement, quantity) => {
                const quantityDisplay = itemElement.querySelector(".quantity-display");
                quantityDisplay.textContent = `${quantity}x`; // Update to show "2x", "3x", etc.
            };
//------------------------------------------------------------------------------------------------------------------------------      
            // Remove filler text if items are present
            if (tillLagd.length > 0) {
                const fyllningsText = document.getElementById("filler");
                if (fyllningsText) fyllningsText.remove();
            }
//------------------------------------------------------------------------------------------------------------------------------      
            // Iterate through tillLagd and create product cards
            tillLagd.forEach((i) => 
            {
                const produkt = data.foremalData[i]; //skapar shortcut till hämta från json
                let pris = produkt.pris;//hämtar priset för var produkt

                // Check if the item already exists in itemQuantities
                if (itemQuantities[i]) //kollar om föremålet som ska läggas till redan finns i varukorgen
                {
                    //om den finns öka det nuvarande antalet
                    itemQuantities[i].quantity++;
                    totalPris += pris;
                    updateItemQuantityDisplay(itemQuantities[i].element, itemQuantities[i].quantity);
                } //om inte så skapas ett nytt föremål
                else 
                {
                    // Här läggs det till i vårt objekt som spårar antalet hos alla föremål
                    itemQuantities[i] = { quantity: 1, element: null };

                    totalPris += pris; //ökar nuvarande totalpris med prist av det nya föremålet
                    //-------------------------------------------------------------------------------
                    // Create the product card
                    createProduktCard(produkt, "containerCart",i);
                    
                    

                } 
            });
//------------------------------------------------------------------------------------------------------------------------------      
            // Function to create product cards (from the other version)
            function createProduktCard(produkt, containerId, index) 
            {
                let containerDiv = document.createElement("div");//skapar en div som ligger runt hela föremålet
                containerDiv.classList.add("row", "align-items-center", "border", "p-3", "m-1");//lägger klasser så de ser fint ut UwU
                containerDiv.id = "lada" + index;//needed 
                itemQuantities[index].element = containerDiv;
                
                //------------------------------------------------------
                let produktInfoDiv = document.createElement("div");//skapar en div för namnet och bilden
                produktInfoDiv.classList.add("col-md-8", "d-flex", "align-items-center");//lägger klasser så det bli ännnu finare UWUUWUUWUUWU
                //------------------------------------------------------
                let quantityDisplay = document.createElement("span"); //Needed
                quantityDisplay.classList.add("quantity-display","me-3");//needed?
                quantityDisplay.textContent = "1x"; // Initially set to "1x"
                //------------------------------------------------------
                let produktImg = document.createElement("img");//skapar en img tag
                produktImg.src = produkt.bild;//lägger min bild i img tagen
                produktImg.alt = produkt.namn;//lägger in en alt ifall shit goes wild
                produktImg.classList.add("img-fluid", "me-3"); //klasser UWU
                produktImg.style.width = "50%";
                produktImg.style.height = "auto";
                //------------------------------------------------------
                let produktName = document.createElement("span");//skapar text rutan där vi skriver namnet
                produktName.textContent = produkt.namn;//lägger namnet bra
                produktName.classList.add("fw-bold");//klasser UWU

                produktInfoDiv.appendChild(quantityDisplay);
                produktInfoDiv.appendChild(produktImg);//lägger till allt i diven vi skapat för det syftet
                produktInfoDiv.appendChild(produktName);
                //------------------------------------------------------
                let produktPriceDiv = document.createElement("div");//skapar en div för pris delen på andra sidan
                produktPriceDiv.classList.add("col-md-4", "text-end");//klasser WuW
                //------------------------------------------------------
                let produktPrice = document.createElement("span");//skapar pris lappen
                produktPrice.textContent = `${produkt.pris}kr`;//lägger priset i prislappen
                produktPrice.classList.add("text-success", "fw-bold"); //klasser UWU
                //------------------------------------------------------
                const plusButton = document.createElement("button");//skapar plus knapp
                plusButton.classList.add("btn","m-1","py-auto");
                plusButton.textContent = "+";

                const minusButton = document.createElement("button");//Skapar minus knapp
                minusButton.classList.add("btn","mx-1","p-1");
                minusButton.textContent = "-";

                const IDontCare = document.createElement("br");
                //------------------------------------------------------
                
                
                produktPriceDiv.appendChild(produktPrice);
                produktPriceDiv.appendChild(IDontCare);
                produktPriceDiv.appendChild(plusButton);//lägger knapppar där de ska vara
                produktPriceDiv.appendChild(minusButton);// lägger knapp där den ska vara

                
                containerDiv.appendChild(produktInfoDiv);
                containerDiv.appendChild(produktPriceDiv);

                plusButton.addEventListener("click", () => 
                {
                    itemQuantities[index].quantity++;
                    totalPris += produkt.pris;
                    updateItemQuantityDisplay(containerDiv, itemQuantities[index].quantity);
                    updateTotalPris();
                });

                // Add event listener for the minus button
                minusButton.addEventListener("click", () => 
                {
                    if (itemQuantities[index].quantity > 1) 
                    {
                        itemQuantities[index].quantity--;
                        totalPris -= produkt.pris;
                        updateItemQuantityDisplay(containerDiv, itemQuantities[index].quantity);
                        updateTotalPris();
                    } 

                    else 
                    {
                        // Remove item when quantity goes to zero
                        totalPris -= produkt.pris;
                        containerDiv.remove();
                        delete itemQuantities[index]; // Remove the item from the quantity map
                        tillLagd = tillLagd.filter(idx => idx !== index); // Remove from the localStorage array
                        localStorage.setItem("index", JSON.stringify(tillLagd)); // Update localStorage
                        updateTotalPris();
                    }
                });

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
//------------------------------------------------------------------------------------------------------------------------------ 
            // Initial total price display
            updateTotalPris();
//------------------------------------------------------------------------------------------------------------------------------ 
            // Print button functionality (from the other version)
            const printBtn = document.getElementById("pdf");
            if (printBtn) 
            {
                printBtn.addEventListener("click", function () 
                {
                    window.print();
                });
            }
 //------------------------------------------------------------------------------------------------------------------------------            
        })
    .catch(error => console.error("Error fetching JSON data:", error));
});
