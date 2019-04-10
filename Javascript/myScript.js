
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
            if(this.datasett[elementer]["kommunenummer"]){
                let out="";
                out=elementer.toString()+JSON.stringify(this.datasett[elementer]);
                return out;
            }
        }
        return "error";
    }
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
let befolkObj;

onStart();
