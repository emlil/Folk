
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

async function onStart() {

    try {
        let utdanning = await getUtdanning();
        console.log(utdanning);
    } catch(e) {
        console.log("CAUGHT EXCEPTION", e);
    }
    try {
        let sysselsatt = await getSysselsatte();
        console.log(sysselsatt);
    }
    catch(e) {
        console.log("CAUGHT EXCEPTION", e);
    }

    let befolkning= await getBefolkning();
    console.log(befolkning);
   let befolkningData= new befolkningConstruct(befolkning);
   console.log(befolkningData);


}
function befolkningConstruct(datasett) {
    this.url="http://wildboy.uib.no/~tpe056/folk/104857.json";
    this.datasett=datasett;
    let getNames=()=>{
        let arr=[];
        for (elementer in datasett){
            arr.push(elementer);
            return arr;
        }
    }

    
}
function sysselsattConstruct(datasett) {
    
}
function utdaninngConstuct(datasett) {
    
}

onStart();
