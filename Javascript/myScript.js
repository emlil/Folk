
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
    let call = await fetch("http://wildboy.uib.no/~tpe056/folk/104857.json")
    let data = await call.json();
    return data;
}

function getBefolkning() {

}

function getSysselsatte() {

}

async function onStart() {

    try {
        //let answer = await getUtdanning();

        getUtdanning().then(
            function(answer) {
                console.log(answer);
            }
        ).catch(function(error) {
            console.log("something bad happened");
        });
        //console.log(answer);
    } catch(e) {
        console.log("CAUGHT EXCEPTION", e);
    }
    //await getSysselsatte();
    //await getUtdanning();

}

onStart();
