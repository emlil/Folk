
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
            dtInput.style.backgroundColor = "green"
        } else {
            dtInput.style.backgroundColor = "red"

        }
    });

    let smBtn = document.getElementById("sammenlignButton");
    smBtn.addEventListener("click", getSammenligning);

    let komInput = document.getElementsByClassName("komInput");
    for (let i = 0; i < komInput.length; i++) {
        komInput[i].addEventListener("keyup", function (event) {
            // x er verdien om det er komunenummer
            //y er navnet på kommunen.
            let x = komInput[i].value;
            let y=x.toLowerCase();
            y=y.storBokstav();


             if (!isNaN(x)&&befolkObj.nrCheck(x)) {
                komInput[i].style.backgroundColor = "green";
                 if (event.code === "Enter") {
                     getSammenligning();
                 }
            }
            else if (typeof befolkObj.datasett[y] === "object") {
                komInput[i].style.backgroundColor = "green";
                 if (event.code === "Enter") {
                     getSammenligning();
                 }
            }
            else {
                komInput[i].style.backgroundColor = "red"

            }

        })


    }


}
