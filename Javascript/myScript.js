function GenConstruct(datasett){
}

GenConstruct.prototype.getJson=function(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response)
      return response
    }
  }
  xhr.send();
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


 function befolkningConstruct(datasett) {
    var x = Object.create(GenConstruct.prototype)
    var tabell = x.getJson(datasett)
    console.log(tabell)
 }

 function sysselsattConstruct(datasett) {
    var y = Object.create(GenConstruct.prototype)
    y.getJson(datasett)

 }

 function utdanningConstuct(datasett) {
    var z = Object.create(GenConstruct.prototype)
    z.getJson(datasett)

 }

function onStart(){
     befolkObj= new befolkningConstruct("http://wildboy.uib.no/~tpe056/folk/104857.json");
    sysselObj = new sysselsattConstruct("http://wildboy.uib.no/~tpe056/folk/100145.json");
    utdanningConstuct = new utdanningConstuct("http://wildboy.uib.no/~tpe056/folk/85432.json")
}
let befolkObj;

onStart();
