//-------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () 
{
  fetch('JSON/foremalJSON.json')
	  .then(response => response.json())
	  .then(data => 
	  {
//-----------------------JSON FETCH FUNKTION-----------------------------

			let tillLagd = [];
			let idRaknare =0;
			let idLista =[];


//-----------------DEFINERAR ANVÄNDBARA GLOBALA VARIABLAR----------------

			let foremalLista = document.getElementsByClassName("foremal");

			for (var i = 0; i < foremalLista.length; i++) 
			{
				foremalLista[i].id = ("foremal"+i);

				idLista.push(foremalLista[i].id);
				
			}

//-------------------SKAPAR ID TILL ALLA FÖREMÅL--------------------
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


			//HÄMTAR DATAN FÖR FÖREMÅLEN FRÅN EN JSON "FORMALJSON.JSON" IS LOOPABLE
//-------------------------------------SKAPAR OBJEKT FÖR FÖREMÅLEN SOM SÄLJS-----------------------

			
			document.addEventListener('click', function (event) 
			{
		    if (event.target.tagName === 'BUTTON') 
		    	//SKAPAR EN EVENTLISTENER FÖR HELA DOKUMENTET SOM VÄNTAR PÅ ATT EN KNAPP SKA KLICKAS PÅ
		    {
		      let ovreDiv = event.target.closest('div');
		      //LETAR EFTER DEN NÄRMSTA DIV BOXEN
		      
		      while (ovreDiv && ovreDiv.tagName === 'DIV' && !ovreDiv.id) 
		      {
		          ovreDiv = ovreDiv.parentElement;
		      }
		      //GÅR FRÅN KNAPPEN OCH UPP IGENOM DOM TRÄDET FÖR ATT HITTA EN DIV MED ETT ID
		      if (ovreDiv && ovreDiv.id) 
		      {
		        const indexId = idLista.indexOf(ovreDiv.id);
		        tillLagd.push(indexId);//LÄGGER INDEXET FÖR JSON ARRAY LÄNGST BAK I ARRAY
		        localStorage.setItem("index", tillLagd);
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
			
			redigeraForemal(skin1.pris, skin1.namn, skin1.bild,idLista[0])
			redigeraForemal(skin2.pris, skin2.namn, skin2.bild,idLista[1])
			//IS LOOPABLE

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