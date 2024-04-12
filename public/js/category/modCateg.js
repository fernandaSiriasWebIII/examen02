// JavaScript Document
// var db = firebase.apps[0].firestore();
// var container = firebase.apps[0].storage().ref();

// var container = firebase.apps[0].storage().ref();
//New
function newProcess() {
    
    var db = firebase.apps[0].firestore();
    // var container = firebase.apps[0].storage().ref();
    
    const txtCod = document.querySelector('#txtCod');
    const txtNom = document.querySelector('#txtNom');
    const txtDes = document.querySelector('#txtDes');
    const txtArchi = document.querySelector('#txtArchi');
    const txtMime = document.querySelector('#txtMime');
    
    
    
    // Cargamos los datos al cargar la página
    db.collection("Categories").doc(txtCod.value).get().then(function (doc) {
        txtNom.value = doc.data().CategoryName;
        txtDes.value = doc.data().Description;
        txtArchi.value = doc.data().Imagen;
        txtMime.value = doc.data().Mime;
    });
    


}
// Modificamos el evento de clic del botón btnLoad
btnSave.addEventListener('click', function () {
    var db = firebase.apps[0].firestore();
    // Actualizamos los datos en Firebase
    db.collection("Categories").doc(txtCod.value).update({
        CategoryName: txtNom.value,
        Description: txtDes.value,
        Imagen: txtArchi.value,
        Mime: txtMime.value
    })
        .then(function () {
            alert("Document successfully updated!");
            // Puedes agregar aquí cualquier lógica adicional después de la actualización exitosa
        })
        .catch(function (error) {
            alert("Error updating document: ", error);
            // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
        });
});