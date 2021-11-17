var game = {
  zdobyte : 0,
  zycia : 5,
}

dz = document.createElement("div");
par = document.getElementById("liczba_zyc").appendChild(dz);

wyswietlZycia(dz, game.zycia, game.zdobyte);


var elem = document.getElementById("panstwa");
lastLetter = 0;


haslo = losuj_haslo();

for (var i = 0; i < haslo.length; i += 1) 
{
   addElement("litera", haslo[i]);
}

//LISTENERS

document.getElementById("sprawdz").addEventListener("click", Sprawdz_Litery); 
alert(game.zycia);

document.getElementById("autor").addEventListener("click", wyswietlInfo);
document.getElementById("zamknij_okno").addEventListener("click", zamknijInfo);

document.getElementById("graj").addEventListener("click", zacznijNowaGre);

function wyswietlZycia(dz, liczba_zyc, liczba_zdobytych)
{
    dz.innerHTML = "zycia: "+liczba_zyc +" zdobyte: "+liczba_zdobytych;
}

function kontunuujGre()
{
  wyswietlZycia(dz, game.zycia, game.zdobyte);
  usun_haslo();
  haslo = losuj_haslo();

  for (var i = 0; i < haslo.length; i += 1) 
  {
    addElement("litera", haslo[i]);
  }
}

function zacznijNowaGre()
{
  game.zycia = 5;
  game.zdobyte = 0;
  
  wyswietlZycia(dz, game.zycia, game.zdobyte);

  usun_haslo();
  haslo = losuj_haslo();
  console.log(haslo);

  for (var i = 0; i < haslo.length; i += 1) 
  {
    addElement("litera", haslo[i]);
  }
}

function wyswietlInfo()
{
  var div = document.getElementById("informacjeOAutorze");
  div.style.display = "block";
  div.style.backgroundColor = "Purple"
  
  console.log(div)
}

function zamknijInfo()
{
  console.log("zamknij Info function");
  var div = document.getElementById("informacjeOAutorze");
  div.style.display = "none";
}


function Ent(e)
{ 
    console.log(e)
    if (e.key == "ArrowLeft") 
    {
      Sprawdz_Litery();
    }
}

document.getElementById("litera").addEventListener("keydown", Ent, false);
console.log(document.getElementsByClassName("mystyle"));


//FUNKCJE

function Sprawdz_Haslo(liter, haslo)
{
  if (liter == haslo)
  {
    return true;
  }

  return false;
}

function odslon_haslo()
{
  for (var i = 0; i < haslo.length; i+= 1)
  {
    document.getElementsByClassName("mystyle")[i].innerHTML = haslo[i];
  }
}


function usun_haslo()
{
  for (var i = haslo.length -1; i >= 0; i-= 1)
  {
    document.getElementsByClassName("mystyle")[i].remove();
    console.log(haslo[i]);
  }
}

function Sprawdz_Litery()
{
  letter_found = 0;
  odp = false;
  var liter = document.getElementById("litera").value;

  if (liter.length > 1)
  {
    odp = Sprawdz_Haslo(liter, haslo);

    if (odp)
    {
      odslon_haslo();
      game.zycia += 5;
      game.zdobyte +=1;
      console.log(game.zycia);
      kontunuujGre();
      return;
    }
    else
    {
      game.zycia -= 1;
      console.log(game.zycia);
    }
  }
  else
  {
    for (var i = 0; i < haslo.length; i+= 1)
    {
      liter_h = haslo[i]
  
      if (liter.toUpperCase() == liter_h.toUpperCase())
      {
          document.getElementsByClassName("mystyle")[i].innerHTML = liter_h;
          lastLetter++;
          letter_found = 1;
      }

    }

    if (letter_found == 0)
    {
      game.zycia -= 1;
      if (game.zycia <= 0)
      {
        game.zycia = 0;
      }
      wyswietlZycia(dz, game.zycia, game.zdobyte);
      console.log(game.zycia);
    }


  }

  if (game.zycia <= 0)
  {
      odslon_haslo();
      game.zycia = 0;
  }

  if (lastLetter == haslo.length)
  {
    game.zycia += 5;
    lastLetter = 0;
    game.zdobyte += 1;
    kontunuujGre();
    console.log(game.zycia);
    wyswietlZycia(game.zycia, game.zdobyte);
  }
 
}

function insertAfter(Node, newNode) 
{
  Node.parentNode.insertBefore(newNode, Node.nextSibling);
}

function addElement(mydiv, letter)
{ 
  newDiv = document.createElement("span");
  my_div = document.getElementById(mydiv);
  document.body.insertBefore(newDiv, my_div);
  newDiv.classList.add("mystyle");  
}

function losuj_haslo()
{
    var i = getRandomInt(0, data.length);
    return data[i]['country'];
}

function getRandomInt(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}