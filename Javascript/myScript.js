//Henter Utdanning(JSON) fra wilbody
async function getUtdanning() {
    /*let job =  new Promise(
      function(resolve, reject) {
          // Fetch data with json
        let failed = true;
        if (failed) {
            reject("It bork");
        }

        resolve("data");
      }
    );

    console.log("HELLO");

    return job;*/
    let call = await fetch("http://wildboy.uib.no/~tpe056/folk/85432.json");
    let data = await call.json();
    return data;
}

//Henter Befolkning(JSON) fra wildboy
//(fetch er ES6, la oss spørre Truls om dette)
async function getBefolkning() {
let call = await fetch("http://wildboy.uib.no/~tpe056/folk/104857.json");
   call= await call.json();
return call["elementer"];
}

//Henter Sysselsatte(JSON) fra Wildboy
async function getSysselsatte() {
    let call = await fetch("http://wildboy.uib.no/~tpe056/folk/100145.json");
    call=await call.json();
    return call["elementer"]
}

//Konstruktor, mottar object fra getBefolkning(JSON)
 function BefolkningConstruct(datasett) {
    this.url="http://wildboy.uib.no/~tpe056/folk/104857.json";
    this.datasett= datasett;

//getNames funkjsonen lager en liste og legger til elementer funnet i datasett
    this.getNames= function () {
        let arr=[];
        for (elementer in this.datasett){
            arr.push(elementer);
        }
        return arr;
    };

//getID funkjsonen lager en liste og legger til alle objectene som
//har kommunenummer i seg
    this.getIDs=function () {
        let arr=[];
        for (elementer in this.datasett){
            arr.push(this.datasett[elementer]["kommunenummer"])
        }
        return arr;
    };

//getInfo mottar et input i fra brukeren, thrower error hvis kommunenummeret
//ikke eksisterer i objektet. Den returnerer en string med elementet hvis den
//finner det.
    this.getInfo=function (kommuneNr,aar) {
        for (elementer in this.datasett){
            if(this.datasett[elementer]["kommunenummer"]===kommuneNr){
             //Oppretter et objekt for valgte kommune slik at vi kan ta ut infoen etter objektet er returnert.
                //Slik kan vi presentere dataen slik vi ønsker
                let thisKommune ={}
                thisKommune.befolkning=this.datasett[elementer]["Kvinner"][aar]+this.datasett[elementer]["Menn"][aar]
                thisKommune.navn=elementer;
                thisKommune.nummer=kommuneNr;
                console.log(thisKommune)
                return thisKommune;

            }

        }
        return "error";
    }
}

function SysselsattConstruct(datasett) {
  this.url="http://wildboy.uib.no/~tpe056/folk/100145.json";
  this.datasett= datasett;

  this.getNames= function () {
      let arr=[];
      for (elementer in this.datasett){
          arr.push(elementer);
      }
      return arr;
  };

  this.sysselSattePros = function(kommuneNavn,aar){
    //bruker kommunenavn for å hente ut data.
    var prosent=(this.datasett[kommuneNavn]["Begge kjønn"][aar]).toFixed(2);
    return prosent;
  }

};
function UtdaninngConstuct(datasett) {
  this.url="http://wildboy.uib.no/~tpe056/folk/85432.json";
  this.datasett= datasett;

  this.getUtd = function(){
    let arr = [];
    for(elementer in this.datasett){
      arr.push(this.datasett["elementer"])
    }
    return arr
  }

  this.getHoyUtdanning=function(kommune,aar){
    //antar at høyere utdanning kun er 03a og 04a
    //SE ØVE OM DENNE MATTEN E RIKTIG
    kommune.utdanningProsent =(this.datasett["elementer"][kommune.navn]['03a']["Kvinner"][aar]+this.datasett["elementer"][kommune.navn]['03a']["Menn"][aar])/2;
    kommune.utdanningProsent+=((this.datasett["elementer"][kommune.navn]['04a']["Kvinner"][aar]+this.datasett["elementer"][kommune.navn]['04a']["Menn"][aar])/2);
    kommune.utdanningProsent=kommune.utdanningProsent.toFixed(2)
    kommune.utdanningAntall=kommune.befolkning*(kommune.utdanningProsent)/100
    return kommune;
  }
}

//getDetalj Henter data fra datasettene og legger dem til det opprettede objektet kommune slik at de er tilgjengelige for flere handlinger
function getDetalj(){
     let nrInn= document.getElementById("detaljNr").value;

    //Oppretter obbjekt for kommunen det skal hentes data fra
    let kommune=befolkObj.getInfo(nrInn,2018);
    document.getElementById("detaljData").innerHTML=kommune['navn']+" ("+kommune['nummer']+")</br> Sist målte befolkning: "+kommune['befolkning'];

    kommune.prosent=sysselObj.sysselSattePros(kommune['navn'],2018)
    document.getElementById("pross").innerHTML="Prosent sysselsetting: "+kommune['prosent']+"%";

    //bruker Math.floor her for å få hele tall uten desimal fordi kun hele mennesker jobber
    kommune.antallSysselsatt=Math.floor((kommune['prosent']/100)*kommune['befolkning']);
    document.getElementById("totalSyssel").innerHTML ="Totalt antall sysselsatt: "+kommune['antallSysselsatt'];

    kommune=utdanningObj.getHoyUtdanning(kommune,2017);
    document.getElementById("utdanning").innerHTML="Prosent utdanning "+kommune.utdanningProsent+"</br> Antall utdannet: "+kommune.utdanningAntall;

    //historiskUtviklingTabell(kommune['navn'])
 }

 //funksjon som settter sammen data, og bygger tabell
 function historiskUtviklingTabell(kommune){
    let tabell= "<table><tr><th>År</th><th>Befolkning</th><th>Sysselsetting</th><th>Utdanning</th></tr>";
    //oppretter en tabell. plasserer 4 arrays inni dette. en for hvert sett med verdier.
    //Fordi de kun finnes verdier i tidsrommet 2007-2017 er det disse verdiene vi vil fremvise
    let arr=[];
    let aarArray=[];
    for (let index = 2007; index <= 2017; index++) {
      aarArray.push(index);
    }
    arr.push(aarArray);



    tabell+="</table>"
 }

//getOversikt henter ut befolkning for alle kommunene, legger sammen
// menn og kvinner og printer ut dette i oversiktdata klassen i html.
 function getOversikt(){
   let arr="";
    for (elementer in befolkObj.datasett){
      let befolkning=befolkObj.datasett[elementer]["Kvinner"]["2018"]
      +befolkObj.datasett[elementer]["Menn"]["2018"];

      arr+=("<p>"+elementer+" "+ befolkObj.datasett[elementer]
      ["kommunenummer"]+"<p>"+
      "<p>Siste måling av befolkning: "+befolkning+"</p><br>");
    }
    document.getElementById("oversiktData").innerHTML=arr;
 }


async function onStart() {
    let sysselsatt;
    let utdanning;
    let befolkning;
    try {
         utdanning = await getUtdanning();
        console.log(utdanning);
    } catch(e) {
        console.log("CAUGHT EXCEPTION", e);
    }
    try {
         sysselsatt = await getSysselsatte();
        console.log(sysselsatt);
    }
    catch(e) {
        console.log("CAUGHT EXCEPTION", e);
    }
     befolkning = await getBefolkning();
     syssel = await getSysselsatte();
     console.log(befolkning);
     befolkObj = new BefolkningConstruct(befolkning);
     sysselObj = new SysselsattConstruct(syssel)
     utdanningObj = new UtdaninngConstuct(utdanning)
}

let befolkObj;
let sysselObj;
let utdanningObj;

onStart();
