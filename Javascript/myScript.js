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
         this.getName=function (kommuneNr) {
             for (elementer in this.datasett) {
                 if (this.datasett[elementer]["kommunenummer"] === kommuneNr) {
                     return elementer;
                 }
             }
         };
         this.getNummer=function (navn) {
           return this.datasett[navn]["kommunenummer"];
         };
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

         this.getFolketallAar=function (kommuneNr,aar) {
             for (elementer in this.datasett){
                 if(this.datasett[elementer]["kommunenummer"]===kommuneNr){
                     console.log();
                     return this.datasett[elementer]["Kvinner"][aar]+this.datasett[elementer]["Menn"][aar];
                 }

             }
             return "error";
         };

    //getInfo mottar et input i fra brukeren, thrower error hvis kommunenummeret
    //ikke eksisterer i objectet. Den returnerer en string med elementet hvis den
    //finner det.
        this.getInfo=function (kommuneNr,aar) {
            for (elementer in this.datasett){
                if(this.datasett[elementer]["kommunenummer"]===kommuneNr){
                 //Oppretter et objekt for valgte kommune slik at vi kan ta ut infoen etter objektet er returnert.
                    //Slik kan vi presentere dataen slik vi ønsker
                    let thisKommune ={};
                    thisKommune.befolkning=this.datasett[elementer]["Kvinner"][aar]+this.datasett[elementer]["Menn"][aar];
                    thisKommune.navn=elementer;
                    thisKommune.nummer=kommuneNr;
                    console.log(thisKommune);
                    return thisKommune;

                }

            }
            return "error";
        };
    }

    function SysselsattConstruct(datasett) {
      this.url="http://wildboy.uib.no/~tpe056/folk/100145.json";
      this.datasett= datasett;

      this.getNames= function () {
          let arr=[];
          for (elementer in this.datasett){
              arr.push(elementer);
          }
          return arr;
      };

      this.sysselSattePros = function(kommuneNavn,aar){
        //bruker kommunenavn for å hente ut data.
          return (this.datasett[kommuneNavn]["Begge kjønn"][aar]).toFixed(2);
      }


    };
    function UtdaninngConstuct(datasett) {
      this.url="http://wildboy.uib.no/~tpe056/folk/85432.json";
      this.datasett= datasett;

      this.getUtd = function(){
        let arr = [];
        for(elementer in this.datasett){
          arr.push(this.datasett["elementer"])
        }
        return arr
      };

      this.getHoyUtdanning=function(kommune,aar){
        //antar at høyere utdanning kun er 03a og 04a
        //SE ØVE OM DENNE MATTEN E RIKTIG
        kommune.utdanningProsent =(this.datasett["elementer"][kommune.navn]['03a']["Kvinner"][aar]+this.datasett["elementer"][kommune.navn]['03a']["Menn"][aar])/2;
        kommune.utdanningProsent+=((this.datasett["elementer"][kommune.navn]['04a']["Kvinner"][aar]+this.datasett["elementer"][kommune.navn]['04a']["Menn"][aar])/2);
        kommune.utdanningProsent=kommune.utdanningProsent.toFixed(2);
        kommune.utdanningAntall=kommune.befolkning*(kommune.utdanningProsent)/100;
        return kommune;
      };
      this.tabellgetUtdanningProsent=function (kommuneNavn, aar) {
          let utdanning1=(this.datasett["elementer"][kommuneNavn]['03a']["Kvinner"][aar]+this.datasett["elementer"][kommuneNavn]['03a']["Menn"][aar])/2;
           utdanning1+=((this.datasett["elementer"][kommuneNavn]['04a']["Kvinner"][aar]+this.datasett["elementer"][kommuneNavn]['04a']["Menn"][aar])/2);
          return utdanning1.toFixed(2);
      }
    }

//getDetalj Henter data fra datasettene og legger dem til det opprettede objektet kommune slik at de er tilgjengelige for flere handlinger
//TODO: Legg til fagskole
function getDetalj(){
     let nrInn= document.getElementById("detaljNr").value;

    //Oppretter obbjekt for kommunen det skal hentes data fra
    let kommune=befolkObj.getInfo(nrInn,2018);
    document.getElementById("detaljData").innerHTML="<strong>"+kommune['navn']+"</strong>("+kommune['nummer']+")</br> Sist målte befolkning: "+kommune['befolkning'];

    kommune.prosent=sysselObj.sysselSattePros(kommune['navn'],2018);
    document.getElementById("pross").innerHTML="Prosent sysselsetting: "+kommune['prosent']+"%";

    //bruker Math.floor her for å få hele tall uten desimal fordi kun hele mennesker jobber
    kommune.antallSysselsatt=Math.floor((kommune['prosent']/100)*kommune['befolkning']);
    document.getElementById("totalSyssel").innerHTML ="Totalt antall sysselsatt: "+kommune['antallSysselsatt'];

    kommune=utdanningObj.getHoyUtdanning(kommune,2017);
    document.getElementById("utdanning").innerHTML="Prosent utdanning "+kommune.utdanningProsent+"</br> Antall utdannet: "+kommune.utdanningAntall;

    let tabell=historiskUtvikling(kommune['nummer'],kommune['navn']);
    //setter tabell inn i html
    document.getElementById("historisk-utvikling").innerHTML=tabell;
 }

 //funksjon som settter sammen data, og bygger tabell
 function historiskUtvikling(kommuneNummer,kommuneNavn){
    //oppretter en tabell. plasserer 4 arrays inni dette. en for hvert sett med verdier. Fordi de kun finnes verdier i tidsrommet 2007-2017 er det disse verdiene vi vil fremvise
    let arr=[];
    let aarArray=[];
    //oppretter tabell i rekkevidden  vi ønsker
    for (let index = 2007; index <= 2017; index++) {
      aarArray.push(index);
    }
    arr.push(aarArray);

    //lager en array til hvert datasett
     //bruker map funksjonen på aarArray for å enkelt gå gjennom de aktuelle verdiene for hvert sett.
    let befolkArr=[];
        aarArray.map( aar=>befolkArr.push(befolkObj.getFolketallAar(kommuneNummer,aar)));
     arr.push(befolkArr);

     let sysselsettArr=[];
     aarArray.map(aar=>sysselsettArr.push(sysselObj.sysselSattePros(kommuneNavn,aar)));
    arr.push(sysselsettArr);

    let utdanningArr=[];
        aarArray.map(aar=>utdanningArr.push(utdanningObj.tabellgetUtdanningProsent(kommuneNavn,aar)));
        arr.push(utdanningArr);

     return tabellFrickeren(arr);


 }
 //Funksjon som setter opp tabellen for historisk data
    //TODO: Legg til prosenttegn
 function tabellFrickeren(arr) {
     let tabell= "<table class='table'> <tr><th>År</th><th>Befolkning</th><th>Sysselsetting</th><th>Utdanning</th></tr>";
    let utdanning=arr.pop();
    let sysselsatt=arr.pop();
    let befolkning=arr.pop();
    let aarstall=arr.pop();

    while(utdanning.length>=1){
        tabell+=nextTabellLine(utdanning.pop(),sysselsatt.pop(),befolkning.pop(),aarstall.pop());

    }
     tabell+="</table>";
    //funksjon som legger til hver rekke i tabellen så lenge det er mer data å sette inn i tabellen
     function nextTabellLine(utdanning,sysselsatt,befolkning,aarstall){

         return "<tr><td>"+aarstall+"</td><td>"+befolkning+"</td><td>"+sysselsatt+"</td><td>"+utdanning+"</td>"
     }
     return tabell;
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
//TODO: Legg til feilmelding hvis gyldig har blitt søkt og så ugyldig.
 function getSammenligning(){
     //Fordi du kan  skrive inn kommunenummer eller navn,må vi finne ut hva du skrev inn
     let k1= [document.getElementById("k1").value];
    let k2 = [document.getElementById("k2").value];
    k1=sjekkInput(k1);
    k2=sjekkInput(k2);


    //oppretter tabell i rekkevidden  vi ønsker, gjør det også enklere å iterere gjennom data
    let aarArray=[];
     for (let index = 2007; index <= 2017; index++) {
         aarArray.push(index);
     }

     //sender kommunenavn og nummer til funksjon som oppretter et objekt med ønsket data
     let k1Data=lagData(k1);
     let k2Data=lagData(k2);
     console.log(k1Data);
     console.log(k2Data);
     //sammenligndata måler dataen mot hverandre og oppretter et objekt som sier hvem som har høyest vekst når.
     let resultat= sammenlignData(k1Data,k2Data);
        console.log(resultat);

     document.getElementById("kommune1").innerHTML=tabellFrickeren2ElectricBogaloo();

     //denne funksjonen er lokal og sjekker brukerens input, setter begge inputene likt slik at data er uniform for enkel behandling
     //Om brukeren skriver tull eller har feil i input blir fanget og gitt tilbakemelding
        function sjekkInput(kommune) {
            try {


                if (isNaN(kommune[0].charAt(0))) {
                    kommune[0]=kommune[0].toLowerCase();
                    kommune[0]=kommune[0].storBokstav();
                    kommune.unshift(befolkObj.getNummer(kommune[0]));
                } else {
                    kommune.push(befolkObj.getName(kommune[0]));
                }

                return kommune;
            }
            catch (e) {
                alert("Komunnenavn eller -nummer er feil eller finnes ikke. Input:"+kommune +" Error: "+e.name);
            }
        }

        //funksjon som henter inn den relevante dataen
        function lagData(kData) {

            let obj={
                navn:kData.pop(),
                popMenn:[],
                popKvinner:[],
                sysselMenn:[],
                sysselKvinner:[]
            };
            //befolkning menn
            aarArray.map(aar=>obj.popMenn.push(
                befolkObj.datasett[obj.navn]["Menn"][aar]
            ));
            //befolkning kvinner
            aarArray.map(aar=>obj.popKvinner.push(
                befolkObj.datasett[obj.navn]["Kvinner"][aar]
            ));
            //sysselsetting menn
            aarArray.map(aar=>obj.sysselMenn.push(
                sysselObj.datasett[obj.navn]["Menn"][aar]
            ));
            //sysselsetting kvinner
            aarArray.map(aar=>obj.sysselKvinner.push(
                sysselObj.datasett[obj.navn]["Kvinner"][aar]
            ));

            return obj;
        }
        //funksjon som for hvert kjønn
        function sammenlignData(kommune1,kommune2) {
            let resultatMenn={
                prosentpoeng:[],
                kommune:[]
            };
            let resultatKvinner={
                prosentpoeng:[],
                kommune:[]
            };

            menn();
            kvinner();

            return  {
                resultatKvinner,
                resultatMenn
            };
            function menn() {
                for (let i = 0; i < kommune1["sysselMenn"].length-1; i++) {
                    let k1=Number(kommune1["sysselMenn"][i+1]-kommune1["sysselMenn"][i]);
                    let k2=Number(kommune2["sysselMenn"][i+1]-kommune1["sysselMenn"][i]);

                    if (k1>k2){
                        resultatMenn.prosentpoeng.push(Number(k1.toFixed(2)));
                        resultatMenn.kommune.push(kommune1.navn);
                    }
                    else if (k2>k1) {
                        resultatMenn.prosentpoeng.push(Number(k2.toFixed(2)));
                        resultatMenn.kommune.push(kommune2.navn);
                    }
                    else{
                        resultatMenn.prosentpoeng.push(0);
                        resultatMenn.kommune.push("Lik vekst");
                    }
                }
            }
            function kvinner() {
                for (let i = 0; i < kommune1["sysselKvinner"].length-1; i++) {
                    let k1=kommune1["sysselKvinner"][i+1]-kommune1["sysselKvinner"][i];
                    let k2=kommune2["sysselKvinner"][i+1]-kommune1["sysselKvinner"][i];
                    if (k1>k2){
                        resultatKvinner.prosentpoeng.push(Number(k1.toFixed(2)));
                        resultatKvinner.kommune.push(kommune1.navn);
                    }
                    else if(k2>k1) {
                        resultatKvinner.prosentpoeng.push(Number(k2.toFixed(2)));
                        resultatKvinner.kommune.push(kommune2.navn);
                    }
                    else {
                        resultatKvinner.prosentpoeng.push(0);
                        resultatKvinner.kommune.push("Lik vekst");
                    }
                }
            }

        }
     function tabellFrickeren2ElectricBogaloo() {

            //oppretter header med alle verdien vi ønsker å ha i tabellen
            let tabell= "<table id='tabell2'> <tr><th>År</th><th>Befolkning menn"+k1Data.navn+"</th><th>Sysselsetting menn"+k1Data.navn+"</th>" +
                "<th>Befolkning menn"+k2Data.navn+"</th><th>Sysselsetting menn"+k2Data.navn+"</th><th>Prosentpoeng menn</th><th>Kommune menn</th>" +
                "<th>Befolkning Kvinner"+k1Data.navn+"</th><th>Sysselsetting kvinner"+k1Data.navn+"</th><th>Befolkning Kvinner"+k2Data.navn+"</th><th>Sysselsetting Kvinner"+k2Data.navn+"</th>" +
                "<th>Prosentpoeng Kvinner</th><th>Kommune Kvinner</th></tr>";

            //fordi vi ikke har noen data fra 2006 til 2007 setter vi dette året til 0 slik at vi ikke får undefined i tabellen
            resultat.resultatMenn.prosentpoeng.unshift(0);
            resultat.resultatKvinner.prosentpoeng.unshift(0);
            resultat.resultatMenn.kommune.unshift("ingen data");
             resultat.resultatKvinner.kommune.unshift("ingen data");

             //while løkke kaller funksjon så lenge det er mer data å hente.
         while(aarArray.length>=1){
             let foo=[resultat.resultatKvinner.kommune.pop(),resultat.resultatKvinner.prosentpoeng.pop(),k2Data.sysselKvinner.pop(),k2Data.popKvinner.pop(),k1Data.sysselKvinner.pop(),k1Data.popKvinner.pop(),
             resultat.resultatMenn.kommune.pop(),resultat.resultatMenn.prosentpoeng.pop(),k2Data.sysselMenn.pop(),k2Data.popMenn.pop(),k1Data.sysselMenn.pop(),k1Data.popMenn.pop(),aarArray.pop()
             ];

             tabell+=nextTabellLine(foo);
         }
         tabell+="</table>";
         //funksjon som legger til hver rekke i tabellen så lenge det er mer data å sette inn i tabellen
         function nextTabellLine(foo){

             let temp= "<tr>";
             while(foo.length>=1){
                 temp+="<td>"+foo.pop()+"</td>"
             }
                temp+="</tr>";
             return temp;

           //  "<tr><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td>" +
             //"<td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td><td>"+foo.pop()+"</td>" +
           //  "<td>"+foo.pop()+"</td></tr>"
         }
         return tabell;
     }
 }
 //funksjon for å gjøre første bokstav i streng om til stor bokstav.
String.prototype.storBokstav = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

async function onStart() {
    try {
    let utdanning = await getUtdanning();
    console.log(utdanning);

    let sysselsatt = await getSysselsatte();
    console.log(sysselsatt);
     let befolkning = await getBefolkning();
     syssel = await getSysselsatte();
     console.log(befolkning);
     befolkObj = new BefolkningConstruct(befolkning);
     sysselObj = new SysselsattConstruct(syssel);
     utdanningObj = new UtdaninngConstuct(utdanning)
    }
    catch(e) {
        console.log("CAUGHT EXCEPTION", e);
    }
}

let befolkObj;
let sysselObj;
let utdanningObj;

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks, tabcontentIntro;

  // Get all elements with class="tabcontent" and hide them
    //TODO: gjør slik at introduksjon er default
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }



  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
onStart();

