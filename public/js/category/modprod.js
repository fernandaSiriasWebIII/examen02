function modProducto () {
    var db = firebase.apps[0].firestore();
    // var container = firebase.apps[0].storage().ref();

    const txtUid = document.querySelector('#txtUid');
    const txtCat = document.querySelector('#txtCat');
    const txtCod = document.querySelector('#txtCod');
    const txtNom = document.querySelector('#txtNom');
    const txtPrecio = document.querySelector('#txtPrecio');
    const txtCant = document.querySelector('#txtCant');


// Cargamos los datos al cargar la página
    db.collection("Products").doc(txtUid.value).get().then(function (doc) {
        txtCat.value = doc.data().CategoryID;
        txtCod.value = doc.data().ProductID;
        txtNom.value = doc.data().ProductName;
        txtPrecio.value = doc.data().UnitPrice;
        txtCant.value = doc.data().UnitsInStock;
    });
}


// Modificamos el evento de clic del botón btnLoad
btnSave.addEventListener('click', function () {
    // Actualizamos los datos en Firebase
    var db = firebase.apps[0].firestore();
    db.collection("Products").doc(txtUid.value).update({
        CategoryID: txtCat.value,
        ProductID: txtCod.value,
        ProductName: txtNom.value,
        UnitPrice: txtPrecio.value,
        UnitsInStock: txtCant.value
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