
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
