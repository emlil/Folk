function BefolkningConstruct() {
    this.url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
    this.onload = null;

    this.load = function (befolk) {
        console.log("kjører");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                let foo = JSON.parse(xhr.responseText);
                befolk.datasett = foo["elementer"];
                befolk.onload = true;
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
                console.log();
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

    this.load = function (syssel) {
        console.log("kjører");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                let foo = JSON.parse(xhr.responseText);
                syssel.datasett = foo["elementer"];
                sysselObj.onload = true;

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
    this.load = function (utdanning) {
        console.log("kjører");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                let foo = JSON.parse(xhr.responseText);
                utdanning.datasett = foo;
                utdanning.onload = true;
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
        //11 er lagt til, ser ut til å funke. burde dobbelt sjekkes uansett
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

    //har ett timeout på ett milisekund for det funker da.
    //dette er det siste datasettet og når det er lastet vises introduksjonen
    setTimeout(function () {
    }, 1)
}

function onStart() {
    try {
        befolkObj = new BefolkningConstruct();
        befolkObj.load(befolkObj);
        console.log(befolkObj);

        sysselObj = new SysselsattConstruct();
        sysselObj.load(sysselObj);
        console.log(sysselObj);

        utdanningObj = new UtdaninngConstuct();
        utdanningObj.load(utdanningObj);
        console.log(utdanningObj);

        openTab(true, 'Introduksjon');
        addListeners();
    } catch (e) {
        console.log("CAUGHT EXCEPTION", e);
    }
}

//EventListeners laget for to av knappene for å vise at det kan gjøres
//Disse gjør også at du kan trykke Enter i tekstboksen istedenfor å trykke på knappen
// Sjekker også om det er ett gyldig kommunenummer for detalj oppgaven og gir feedback med endring i bakgrunnsfargen
function addListeners() {
    let dtBtn = document.getElementById("detaljButton");
    dtBtn.addEventListener("click", function () {
        getDetalj()
    });
    let dtInput = document.getElementById("detaljNr");
    dtInput.addEventListener("keyup", function (event) {
        if (event.code === "Enter") {
            getDetalj();
        }
        let x = dtInput.value;
        if (befolkObj.nrCheck(x)) {
            console.log("12");
            dtInput.style.backgroundColor = "green"
        } else {
            console.log("13");
            dtInput.style.backgroundColor = "red"

        }
    });

    let smBtn = document.getElementById("sammenlignButton");
    smBtn.addEventListener("click", getSammenligning);
    let komInput = document.getElementsByClassName("komInput");
    for (let i = 0; i < komInput.length; i++) {
        komInput[i].addEventListener("keyup", function (event) {
            if (event.code === "Enter") {
                getSammenligning();
            }
            let x = komInput[i].value;

            if (!isNaN(x)&&befolkObj.nrCheck(x)) {
                console.log("12");
                komInput[i].style.backgroundColor = "green";

            }
                x=x.toLowerCase();
                x=x.storBokstav();
                if (typeof befolkObj.datasett[x] === "object") {
                    console.log("12");
                    komInput[i].style.backgroundColor = "green";
                }
             else {
                console.log("13");
                komInput[i].style.backgroundColor = "red"

            }

        })


    }


}

let befolkObj;
let sysselObj;
let utdanningObj;



