function BefolkningConstruct() {
    this.url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
    this.onload = null;
    this.ready=false;

    this.load = function (befolk, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                let foo = JSON.parse(xhr.responseText);
                callback(foo["elementer"]);
                befolk.ready = true;
            }
        };
        xhr.send();
    };

    this.getName = function (kommuneNr) {
        for (elementer in this.datasett) {
            if (this.datasett[elementer]["kommunenummer"] === kommuneNr) {
                return elementer;
            }
        }
    };
    this.getNummer = function (navn) {
        return this.datasett[navn]["kommunenummer"];
    };
    //getNames funkjsonen lager en liste og legger til elementer funnet i datasett
    this.getNames = function () {
        let arr = [];
        for (elementer in this.datasett) {
            arr.push(elementer);
        }
        return arr;
    };

    //getID funkjsonen lager en liste og legger til alle objectene som
    //har kommunenummer i seg
    this.getIDs = function () {
        let arr = [];
        for (elementer in this.datasett) {
            arr.push(this.datasett[elementer]["kommunenummer"])
        }
        return arr;
    };

    this.getFolketallAar = function (kommuneNr, aar) {
        if (aar === undefined) {
            aar = 2017
        }
        for (elementer in this.datasett) {
            if (this.datasett[elementer]["kommunenummer"] === kommuneNr) {
                return this.datasett[elementer]["Kvinner"][aar] + this.datasett[elementer]["Menn"][aar];
            }

        }
        return "error";
    };

    //getInfo mottar et input i fra brukeren, thrower error hvis kommunenummeret
    //ikke eksisterer i objectet. Den returnerer en string med elementet hvis den
    //finner det.
    this.getInfo = function (kommuneNr, aar) {
        if (aar === undefined) {
            aar = 2017
        }
        for (elementer in this.datasett) {
            if (this.datasett[elementer]["kommunenummer"] === kommuneNr) {
                //Oppretter et objekt for valgte kommune slik at vi kan ta ut infoen etter objektet er returnert.
                //Slik kan vi presentere dataen slik vi ønsker
                let thisKommune = {};
                thisKommune.befolkning = this.datasett[elementer]["Kvinner"][aar] + this.datasett[elementer]["Menn"][aar];
                thisKommune.navn = elementer;
                thisKommune.nummer = kommuneNr;
                console.log(thisKommune);
                return thisKommune;

            }

        }
        return "error";
    };
    this.nrCheck = function (kommuneNr) {
        for (elementer in this.datasett) {
            if (this.datasett[elementer]["kommunenummer"] === kommuneNr) {
                return true;
            }
        }
        return false;
    }
}

function SysselsattConstruct() {
    this.url = "http://wildboy.uib.no/~tpe056/folk/100145.json";
    this.onload = null;
    this.ready=false;
    this.load = function (syssel, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                let foo = JSON.parse(xhr.responseText);
                callback(foo["elementer"]);
                sysselObj.ready = true;

            }
        };
        xhr.send();
    };

    this.getNames = function () {
        let arr = [];
        for (elementer in this.datasett) {
            arr.push(elementer);
        }
        return arr;
    };

    this.sysselSattePros = function (kommuneNavn, aar) {
        //bruker kommunenavn for å hente ut data.
        return (this.datasett[kommuneNavn]["Begge kjønn"][aar]).toFixed(2);
    }
};

//Antar at dette er det siste datasettet som må lastes inn
function UtdaninngConstuct() {
    this.url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
    this.onload = null;
    this.ready=false;
    this.load = function (utdanning,callback) {
        console.log("kjører");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                callback(JSON.parse(xhr.responseText));
                utdanning.ready = true;
            }
        };
        xhr.send();
    };
    this.getNames = function () {
        let arr = [];
        let prev = "";
        let obj = this.datasett["elementer"];
        for (elementer in obj) {

            arr.push(elementer)
        }
        return arr
    };

    this.getHoyUtdanning = function (kommune, aar) {
        //antar at høyere utdanning kun er 03a og 04a
        //11 er lagt til
        //SE ØVE OM DENNE MATTEN E RIKTIG
        kommune.utdanningProsent = (this.datasett["elementer"][kommune.navn]['03a']["Kvinner"][aar] + this.datasett["elementer"][kommune.navn]['03a']["Menn"][aar]) / 2;
        kommune.utdanningProsent += ((this.datasett["elementer"][kommune.navn]['04a']["Kvinner"][aar] + this.datasett["elementer"][kommune.navn]['04a']["Menn"][aar]) / 2);
        kommune.utdanningProsent += ((this.datasett["elementer"][kommune.navn]['11']["Kvinner"][aar] + this.datasett["elementer"][kommune.navn]['11']["Menn"][aar]) / 2);
        kommune.utdanningProsent = kommune.utdanningProsent.toFixed(2);
        kommune.utdanningAntall = kommune.befolkning * (kommune.utdanningProsent) / 100;
        return kommune;
    };
    this.tabellgetUtdanningProsent = function (kommuneNavn, aar) {
        let utdanning1 = (this.datasett["elementer"][kommuneNavn]['03a']["Kvinner"][aar] + this.datasett["elementer"][kommuneNavn]['03a']["Menn"][aar]) / 2;
        utdanning1 += ((this.datasett["elementer"][kommuneNavn]['04a']["Kvinner"][aar] + this.datasett["elementer"][kommuneNavn]['04a']["Menn"][aar]) / 2);
        utdanning1 += ((this.datasett["elementer"][kommuneNavn]['11']["Kvinner"][aar] + this.datasett["elementer"][kommuneNavn]['11']["Menn"][aar]) / 2);
        return utdanning1.toFixed(2);
    };
}

function onStart() {
    try {
        befolkObj = new BefolkningConstruct();
        sysselObj = new SysselsattConstruct();
        utdanningObj = new UtdaninngConstuct();

        befolkObj.load(befolkObj, function (data) {
            befolkObj.datasett=data;
            sysselObj.load(sysselObj,function (data) {
                sysselObj.datasett=data;
                utdanningObj.load(utdanningObj,function (data) {
                    utdanningObj.datasett=data;
                });
            });

        });
        console.log(befolkObj);


        console.log(sysselObj);


        console.log(utdanningObj);



        openTab(true, 'Introduksjon');
        addListeners();
    } catch (e) {
        console.log("CAUGHT EXCEPTION", e);
    }
}


let befolkObj;
let sysselObj;
let utdanningObj;



