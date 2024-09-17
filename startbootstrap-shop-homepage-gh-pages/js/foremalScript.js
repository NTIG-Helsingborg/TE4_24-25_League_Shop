const foremolpris = document.getElementById("produkten1");
let knappen = foremolpris.getElementsByTagName('button')[0];
let counter=0;

knappen.addEventListener("click", laggTill); 


class produkt 
{
  constructor(pris,namn,bild) 
  {
    this.pris = pris;
    this.namn = namn;
    this.bild= bild;
  }
}

let skin = new produkt(600,"bil", "../../tillgangar/test.jpg" );
redigeraForemal(skin.pris, skin.namn, skin.bild,"produkten1")

function redigeraForemal(pris,namn,bild,produktId)
{
	//const foremolpris = document.getElementById(produktId)

	let titlar = foremolpris.getElementsByTagName('h5')[0];
	titlar.innerHTML =namn;

	let priser = foremolpris.getElementsByTagName('p')[0];
	priser.innerHTML =(pris+"kr");

	let bilden = foremolpris.getElementsByTagName('img')[0]
	bilden.src = bild;
}

function laggTill()
{
	
	localStorage.setItem("id", counter);
	counter++;

}
