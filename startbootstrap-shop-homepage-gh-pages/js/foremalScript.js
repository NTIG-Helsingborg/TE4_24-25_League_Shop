//-------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () 
{
  fetch('js/foremalJSON.json')
	  .then(response => response.json())
	  .then(data => 
	  {
//-----------------------JSON FETCH FUNKTION-----------------------------

			let tillLagd = [];


//-----------------DEFINERAR ANVÄNDBARA GLOBALA VARIABLAR----------------
			"use strict";
			class produkt 
			{
			  constructor(pris,namn,bild) 
			  {
			    this.pris = pris;
			    this.namn = namn;
			    this.bild= bild;
			  }
			}
//------------------------------------SKAPAR KLASSEN FÖR FÖREMÅLEN VI SÄLJER-----------------------
			let skin1 = new produkt(data.foremalData[0].pris,data.foremalData[0].namn,data.foremalData[0].bild);
			let skin2 = new produkt(data.foremalData[1].pris,data.foremalData[1].namn,data.foremalData[0].bild);


			//HÄMTAR DATAN FÖR FÖREMÅLEN FRÅN EN JSON "FORMALJSON.JSON"
//-------------------------------------SKAPAR OBJEKT FÖR FÖREMÅLEN SOM SÄLJS-----------------------
			document.addEventListener('click', function (event) 
			{
		    if (event.target.tagName === 'BUTTON') 
		    	//SKAPAR EN EVENTLISTENER FÖR HELA DOKUMENTET SOM VÄNTAR PÅ ATT EN KNAPP SKA KLICKAS PÅ
		    {
		      let parentDiv = event.target.closest('div');
		      //LETAR EFTER DEN NÄRMSTA DIV BOXEN
		      
		      while (parentDiv && parentDiv.tagName === 'DIV' && !parentDiv.id) 
		      {
		          parentDiv = parentDiv.parentElement;
		      }
		      //GÅR FRÅN KNAPPEN OCH UPP IGENOM DOM TRÄDET FÖR ATT HITTA EN DIV MED ETT ID
		      if (parentDiv && parentDiv.id) 
		      {
		        const outerDivId = parentDiv.id;
		        tillLagd.push(outerDivId);//LÄGGER ID LÄNGSTBACK I ARRAY
		        localStorage.setItem("id", tillLagd);
		      } 

		      else 
		      {
		          console.log('No outer div with id found');
		      }
		    }
			});
			//DENNA FUNKTION KOLLAR VILKEN KNAPP SOM TRYCKS SAMT LÄGGER 
			//FÖREMÅLETS ID I EN ARRAY SOM LÄGGS I LOCAL STORAGE SÅ VI KAN HÄMTA DET SENARE
//-------------FUNKTION SOM KOLLAR VILKEN KNAPP SOM TRYCKS------------
			
			redigeraForemal(skin1.pris, skin1.namn, skin1.bild,"produkten1")
			redigeraForemal(skin2.pris, skin2.namn, skin2.bild,"produkten2")
			function redigeraForemal(pris,namn,bild,produktId)
			{
				const foremolId = document.getElementById(produktId)

				let titlar = foremolId.getElementsByTagName('h5')[0];
				titlar.innerHTML =namn;

				let priser = foremolId.getElementsByTagName('p')[0];
				priser.innerHTML =(pris+"kr");

				let bilden = foremolId.getElementsByTagName('img')[0];
				bilden.src = bild;
			}
//------------------------------TILLÅTER OSS ATT ÄNDRA ALLA SÄLJES FÖREMÅL I JS-------------------------
		})
	.catch(error => console.error("Error fetching JSON data:", error));
});
//--------------------------------OM JSON FETCH EJ FUNGERAR------------------------------------------