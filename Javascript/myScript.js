function GenConstruct(datasett){

}

function pray(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response)
    }
  }
  xhr.send();
}

GenConstruct.prototype.getJson=function(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response)
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


 function BefolkningConstruct(datasett) {
    var x = Object.create(GenConstruct.prototype)
    x.getJson(datasett)

 }

function onStart(){
     befolkObj= new BefolkningConstruct("http://wildboy.uib.no/~tpe056/folk/104857.json");
    //sysselObj = new sysselsattConstruct(syssel);
    //console.log(befolkObj.getNames())
    //console.log(befolkObj.getInfo("0101"))
}
let befolkObj;

onStart();
