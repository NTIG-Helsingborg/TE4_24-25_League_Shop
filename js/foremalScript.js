document.addEventListener("DOMContentLoaded", function () 
{
    fetch('JSON/foremalJSON.json')
        .then(response => response.json())
        .then(data => 
        {
//-------------------------------DEFINERAR GLOBLA VARIABLAR--------------------------------------------
            let tillLagd = [];
            let idLista = [];
            const korg = document.getElementById("korgAntal");
//------------------------------SKAPAR EN KLASS FÖR VARORNA-------------------------------------------
            class Produkt 
            {
                constructor(pris, namn, bild) 
                {
                    this.pris = pris;
                    this.namn = namn;
                    this.bild = bild;
                }
            }
//-----------------------------------------SKAPAR OBJEKT SAMT ANGER ID TILL DEM------------------------------------
            const foremalLista = document.getElementsByClassName("foremal");

            for (let i = 0; i < foremalLista.length; i++) 
            {
                foremalLista[i].id = "foremal" + i;
                idLista.push(foremalLista[i].id);
                const skin = new Produkt(data.foremalData[i].pris, data.foremalData[i].namn, data.foremalData[i].bild);
                redigeraForemal(skin.pris, skin.namn, skin.bild, idLista[i]);
            }

//-------------------------------------UPDATERAR VAGNEN DÅ SIDAN LADDAS IN-----------------------------------------
            korg.textContent = JSON.parse(localStorage.getItem("index"))?.length || 0;

            // Click event for buttons
            document.addEventListener('click', function (event) {
                if (event.target.tagName === 'BUTTON' && event.target.dataset.bsTarget === '#exampleModal') 
                {
                    let ovreDiv = event.target.closest('div');

                    while (ovreDiv && ovreDiv.tagName === 'DIV' && !ovreDiv.id) 
                    {
                        ovreDiv = ovreDiv.parentElement;
                    }

                    if (ovreDiv && ovreDiv.id) 
                    {
                        const indexId = idLista.indexOf(ovreDiv.id);
                        modalInput(indexId, data);
                    } 

                    else 
                    {
                        console.log('No outer div with id found');
                    }
                }
            });
//-----------------------------------------MODAL LOGIK OCH MODAL INNEHÅLL FÖRÄNDRING BEROENDE PÅ VILKEN KNAPP-------------------
            function modalInput(indexId, data) 
            {
                document.getElementById("modalLabel").textContent = "Lägg till " + data.foremalData[indexId].namn + "?";
                document.getElementById("modalImg").src = data.foremalData[indexId].bild;
                document.getElementById("priset").textContent = data.foremalData[indexId].pris+"kr";

//----------------------------------------LOCAL STORAGE FÖRVARING GENOM KNAPP I MODAL------------------------------------------
                const laggTillButton = document.getElementById("laggTill");
                laggTillButton.onclick = function () 
                {
                    tillLagd = JSON.parse(localStorage.getItem("index")) || [];
                    tillLagd.push(indexId); // FÖRVARAR INDEXET FÖR VARANS INFORMATION I JSON
                    localStorage.setItem("index", JSON.stringify(tillLagd));
                    korg.textContent = JSON.parse(localStorage.getItem("index")).length; // UPDATERAR VAGNEN DÅ NY FÖREMÅL LÄGS TILL
                };
            }
//-------------------------------------FUNKTION FÖR ATT ÄNDRA FÖREMÅL ENKELT VIA JSON----------------------
            function redigeraForemal(pris, namn, bild, produktId) 
            {
                const foremalId = document.getElementById(produktId);
                foremalId.getElementsByTagName('h5')[0].textContent = namn;
                foremalId.getElementsByTagName('p')[0].textContent = (pris + " kr");
                foremalId.getElementsByTagName('img')[0].src = bild;
            }
        })
//-------------------------------------JSON FEL KOLL-----------------------------------------------------
        .catch(error => console.error("Error fetching JSON data:", error));
});