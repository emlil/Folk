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
//ikke eksisterer i objectet. Den returnerer en string med elementet hvis den
//finner det.
    this.getInfo=function (kommuneNr) {
        for (elementer in this.datasett){
            if(this.datasett[elementer]["kommunenummer"]===kommuneNr){
             //Oppretter et objekt for valgte kommune slik at vi kan ta ut infoen etter objektet er returnert.
                //Slik kan vi presentere dataen slik vi ønsker
                let thisKommune ={}
                thisKommune.befolkning=this.datasett[elementer]["Kvinner"]["2018"]+this.datasett[elementer]["Menn"]["2018"]
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

  this.sysselSattePros = function(kommuneNavn){
    //bruker kommunenavn for å hente ut data.
    var prosent=(this.datasett[kommuneNavn]["Begge kjønn"]["2018"]).toFixed(2);
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


  this.getHoyUtdanning=function(kommune){
    //antar at høyere utdanning kun er 03a og 04a
    //SE ØVE OM DENNE MATTEN E RIKTIG
    kommune.utdanningProsent =(this.datasett["elementer"][kommune.navn]['03a']["Kvinner"]['2017']+this.datasett["elementer"][kommune.navn]['03a']["Menn"]['2017'])/2;
    kommune.utdanningProsent+=((this.datasett["elementer"][kommune.navn]['04a']["Kvinner"]['2017']+this.datasett["elementer"][kommune.navn]['04a']["Menn"]['2017'])/2);
    kommune.utdanningProsent=kommune.utdanningProsent.toFixed(2)
    kommune.utdanningAntall=kommune.befolkning*(kommune.utdanningProsent)/100
    return kommune;
  }
}
//funksjon for å fremvise data
function fremvis(loc,object){

    document.getElementById(loc).innerHTML=object;
}
//getDetalj Henter data fra datasettene og legger dem til det opprettede objektet kommune slik at de er tilgjengelige for flere handlinger
function getDetalj(){
     let nrInn= document.getElementById("detaljNr").value;
  
    //Oppretter obbjekt for kommunen det skal hentes data fra 
    var kommune=befolkObj.getInfo(nrInn);
   fremvis("detaljData",kommune['navn']+" ("+kommune['nummer']+")</br> Sist målte befolkning: "+kommune['befolkning']);
    
    kommune.prosent=sysselObj.sysselSattePros(kommune['navn'])
    document.getElementById("pross").innerHTML="Prosent sysselsetting: "+kommune['prosent']+"%";
    
    //bruker Math.floor her for å få hele tall uten desimal fordi kun hele mennesker jobber
    kommune.antallSysselsatt=Math.floor((kommune['prosent']/100)*kommune['befolkning']);
    document.getElementById("totalSyssel").innerHTML ="Totalt antall sysselsatt: "+kommune['antallSysselsatt'];

    kommune=utdanningObj.getHoyUtdanning(kommune);
    document.getElementById("utdanning").innerHTML="Prosent utdanning "+kommune.utdanningProsent+"</br> Antall utdannet: "+kommune.utdanningAntall;
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
    //console.log(befolkObj.getNames())
    //console.log(befolkObj.getInfo("0101"))
}

let befolkObj;
let sysselObj;
let utdanningObj;

onStart();
