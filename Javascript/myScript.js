
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

async function getBefolkning() {
let call = await fetch("http://wildboy.uib.no/~tpe056/folk/104857.json");
   call= await call.json();
return call["elementer"];
}

async function getSysselsatte() {
    let call = await fetch("http://wildboy.uib.no/~tpe056/folk/100145.json");
    call=await call.json();
    return call["elementer"]
}
 function BefolkningConstruct(datasett) {
    this.url="http://wildboy.uib.no/~tpe056/folk/104857.json";
    this.datasett= datasett;

    this.getNames= function () {
        let arr=[];
        for (elementer in this.datasett){
            arr.push(elementer);
        }
        return arr;
    };


    this.getIDs=function () {
        let arr=[];
        for (elementer in this.datasett){
            arr.push(this.datasett[elementer]["kommunenummer"])
        }
        return arr;
    };


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
 function getDetalj(){
     let nrInn= document.getElementById("detaljNr").value;
     console.log(nrInn);
     document.getElementById("detaljData").innerHTML=befolkObj.getInfo(nrInn);
 }

 async function getOversikt(){
   await visInnhold('oversikt');
         let arr="";
         for (elementer in befolkObj.datasett){
            let befolkning=befolkObj.datasett[elementer]["Kvinner"]["2018"]+befolkObj.datasett[elementer]["Menn"]["2018"];

            arr+=("<p>"+elementer+" "+ befolkObj.datasett[elementer]["kommunenummer"]+"<p>" +
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

     befolkning= await getBefolkning();
     console.log(befolkning);
     befolkObj= new BefolkningConstruct(befolkning);
    //console.log(befolkObj.getNames())
  //  console.log(befolkObj.getInfo("0101"))


}

function sysselsattConstruct(datasett) {
    
}
function utdaninngConstuct(datasett) {
    
}

function visInnhold(ny){

    let arr=["intro","oversiktData","detalj","sammenligning"];
    arr.forEach(function (elementer) {
        if (elementer !== ny) {
            document.getElementById(elementer).style.display = "none";
        } else {
            document.getElementById(elementer).style.display = "block";
        }

    })
}


let befolkObj;

onStart();
