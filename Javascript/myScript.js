var GenConstruct = function(datasett){
  this.datasett = datasett
};

GenConstruct.prototype.getJson=function(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText);
       return response;
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

let befolkObj = new GenConstruct("http://wildboy.uib.no/~tpe056/folk/104857.json");

function request(url, callback){
var xhr = new XMLHttpRequest();
xhr.open("GET", url)
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200){
    //var response = JSON.parse(xhr.responseText);
    myDataset1 = callback(xhr.responseText)
  }
}
xhr.send();
}

function requestTwo(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      //var response = JSON.parse(xhr.responseText);
      myDataset2 = callback(xhr.responseText)
    }
  }
  xhr.send();
  }

  function requestThree(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200){
        //var response = JSON.parse(xhr.responseText);
        myDataset3 = callback(xhr.responseText)
      }
    }
    xhr.send();
    }


function handleIt(komm){
  return JSON.parse(komm);
}

const userGet= "http://wildboy.uib.no/~tpe056/folk/104857.json"
const userGetTwo= "http://wildboy.uib.no/~tpe056/folk/104857.json"
const UserGetThree = "http://wildboy.uib.no/~tpe056/folk/104857.json"

request(userGet, handleIt);
requestTwo(userGetTwo, handleIt)
requestThree(UserGetThree, handleIt)
let myDataset1, myDataset2, myDataset3;
