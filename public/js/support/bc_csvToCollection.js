// JavaScript Document 
var db = firebase.apps[0].firestore();
const txtCSV = document.querySelector('#txtCSV');
const btnLoad = document.querySelector('#btnLoad');
btnLoad.addEventListener('click', function () {
    lecturaCSV(txtCSV.files[0]).then(r => {
        txtCSV.value = '';
    });
});

async function convertirDato(valor) {
    if (valor === null || valor.trim() === '' || valor == 'NULL') {
        return 'na';
    }

    const numero = Number(valor);
    if (!isNaN(numero)) {
        return numero;
    }

    const fecha = new Date(valor);
    if (!isNaN(fecha.getTime())) {
        return fecha;
    }

    return valor;
}

async function lecturaCSV(archivo) {
    const nomarch = archivo.name.split('.')[0];
    const lector = new FileReader();
    lector.readAsText(archivo);
    await esperarSegundos();

    if (lector.result != null) {
        let data = lector.result.split('\n');
        let etiquetas = data[0].split(';');
        for (let index = 1; index < data.length; index++) {
            const valores = data[index].split(';');
            let salida = {};
            for (let index2 = 0; index2 < etiquetas.length; index2++) {
                salida[etiquetas[index2]] = await convertirDato(valores[index2]);
            }
            db.collection(nomarch).add(salida).then(function (docRef) {
                console.log("ID del registro: " + docRef.id);
            }).catch(function (FirebaseError) {
                console.log("Error al registrar el dato: " + FirebaseError);
            });
        }
        console.log("Registro de dato exitoso");
        alert("Registro de datos exitoso");
        txtCSV.value = '';
    }
}

function esperarSegundos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, 5000);
    });
}
