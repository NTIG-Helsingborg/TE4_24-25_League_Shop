document.addEventListener("DOMContentLoaded", function () {
    fetch('JSON/foremalJSON.json')
        .then(response => response.json())
        .then(data => {
            const containerCart = document.getElementById('containerCart');
            let tillLagd = JSON.parse(localStorage.getItem("index")) || []; // Load items from localStorage

            let itemQuantities = {}; // Store item quantities here
            let totalPris = 0;

            // Function to update total price in the DOM
            const updateTotalPrice = () => {
                const totalPriceElement = document.getElementById('totalPrice');
                totalPriceElement.textContent = `Total Price: ${totalPris} kr`; // assuming currency is in kr
            };

            // Function to update the display of item quantity (e.g., "2x")
            const updateItemQuantityDisplay = (itemElement, quantity) => {
                const quantityDisplay = itemElement.querySelector('.quantity-display');
                quantityDisplay.textContent = `${quantity}x`; // Update to show "2x", "3x", etc.
            };

            tillLagd.forEach((itemIndex) => {
                let namn = data.foremalData[itemIndex].namn;
                let pris = data.foremalData[itemIndex].pris;

                // Check if the item already exists in itemQuantities
                if (itemQuantities[itemIndex]) {
                    // If it exists, increment the quantity
                    itemQuantities[itemIndex].quantity++;
                    totalPris += pris;
                    updateItemQuantityDisplay(itemQuantities[itemIndex].element, itemQuantities[itemIndex].quantity);
                } else {
                    // If it doesn't exist, create a new item in the cart
                    itemQuantities[itemIndex] = { quantity: 1, element: null };

                    totalPris += pris;

                    // Create a div for each item box
                    const box = document.createElement('div');
                    box.id = "lada" + itemIndex;
                    box.classList.add('box');

                    let namnElement = document.createElement('h1');
                    let prisElement = document.createElement('h1');
                    let quantityDisplay = document.createElement('span'); // Create a span for quantity display

                    namnElement.textContent = namn;
                    prisElement.textContent = pris;
                    quantityDisplay.classList.add('quantity-display');
                    quantityDisplay.textContent = '1x'; // Initially set to "1x"

                    box.appendChild(namnElement);
                    box.appendChild(prisElement);
                    box.appendChild(quantityDisplay);

                    // Create increment and decrement buttons and value display
                    const plusButton = document.createElement('button');
                    plusButton.classList.add('plus');
                    plusButton.textContent = '+';

                    const minusButton = document.createElement('button');
                    minusButton.classList.add('minus');
                    minusButton.textContent = '-';

                    box.appendChild(plusButton);
                    box.appendChild(minusButton);
                    containerCart.appendChild(box);

                    // Store reference to this item's element in itemQuantities
                    itemQuantities[itemIndex].element = box;

                    // Add event listener for the plus button
                    plusButton.addEventListener('click', () => {
                        itemQuantities[itemIndex].quantity++;
                        totalPris += pris;
                        updateItemQuantityDisplay(box, itemQuantities[itemIndex].quantity);
                        updateTotalPrice();
                    });

                    // Add event listener for the minus button
                    minusButton.addEventListener('click', () => {
                        if (itemQuantities[itemIndex].quantity > 1) {
                            itemQuantities[itemIndex].quantity--;
                            totalPris -= pris;
                            updateItemQuantityDisplay(box, itemQuantities[itemIndex].quantity);
                            updateTotalPrice();
                        } else {
                            // Remove item when quantity goes to zero
                            totalPris -= pris;
                            box.remove();
                            delete itemQuantities[itemIndex]; // Remove the item from the quantity map
                            tillLagd = tillLagd.filter(idx => idx !== itemIndex); // Remove from the localStorage array
                            localStorage.setItem("index", JSON.stringify(tillLagd)); // Update localStorage
                            updateTotalPrice();
                        }
                    });
                }
            });

            // Initial total price display
            updateTotalPrice();
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
