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
                let out="";
                out=elementer.toString()+JSON.stringify(this.datasett[elementer]);
                return out;
            }
        }
        return "error";
    }
}

function sysselsattConstruct(datasett) {
  this.url="http://wildboy.uib.no/~tpe056/folk/100145.json";
  this.datasett= datasett;

  this.getNames= function () {
      let arr=[];
      for (elementer in this.datasett){
          arr.push(elementer);
      }
      return arr;
  };

  this.sysselSattePros = function(){
    let arr = [];
    let kommuner = ""
    for (elementer in this.datasett){
      kommuner = elementer
      arr.push(kommuner+ " "+ this.datasett[elementer]["Begge kjønn"]["2018"])
    }
    return arr

  }
};

//getDetlaj Henter data fra html dokumentet og endrer på dataen i
//detaljData klassen til det get info finner.
 function getDetalj(){
     let nrInn= document.getElementById("detaljNr").value;
     console.log(nrInn);
     document.getElementById("detaljData").innerHTML=befolkObj.getInfo(nrInn);
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
     sysselObj = new sysselsattConstruct(syssel)
    //console.log(befolkObj.getNames())
    //console.log(befolkObj.getInfo("0101"))



}

function utdaninngConstuct(datasett) {

}
let befolkObj;

onStart();
