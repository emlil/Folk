
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

function GenConstruct(){

}

function protoTest(){
  var res = Object.create(genConstruct)
}

GenConstruct.prototype.getNames=function(){
      let arr=[];
      for (elementer in this.datasett){
          arr.push(elementer);
      }
      return arr;
  }

GenConstruct.prototype.getDetalj=function(){
      let nrInn= document.getElementById("detaljNr").value;
      console.log(nrInn);
      document.getElementById("detaljData").innerHTML=befolkObj.getInfo(nrInn);
    }

GenConstruct.prototype.getInfo=function(kommNr){
  for (elementer in this.datasett){
      if(this.datasett[elementer]["kommunenummer"]===kommuneNr){
          let out="";
          out=elementer.toString()+JSON.stringify(this.datasett[elementer]);
          return out;
      }
    }
  return "error";
}


 function BefolkningConstruct(datasett) {
    this.url="http://wildboy.uib.no/~tpe056/folk/104857.json";
    this.datasett= datasett;
    
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
    //sysselObj = new sysselsattConstruct(syssel);
    //console.log(befolkObj.getNames())
    //console.log(befolkObj.getInfo("0101"))


}
let befolkObj;

onStart();
