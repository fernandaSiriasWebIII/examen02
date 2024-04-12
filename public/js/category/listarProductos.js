var listar = document.getElementById("productsCategory");
function recibeParametros() {
  // Variables declaration
  var OUT_HTML = "";
  var urlParams = new URLSearchParams(window.location.search);
  var CATEGORIE_ID = urlParams.get("idProduct");
  var productosRef = firebase.firestore().collection("Products");

  productosRef
    .where("CategoryID", "==", CATEGORIE_ID)
    .get()
    .then((querySnapshot) => {
      OUT_HTML += '<table class="table table-striped">';
      OUT_HTML +=
        "<tr>" +
        "<th>CODIGO</th>" +
        "<th>NOMBRE</th>" +
        "<th>PRECIO</th>" +
        "<th>STOCK</th>" +
        "<th>DESCUENTO</th>" +
        "<th>MODIFICACIÓN</th>" +
        "</tr>";
      querySnapshot.forEach((doc) => {
        var NOMBRE_PRODUCT = doc.data().ProductName;
        var ID_PRODUCT = doc.data().ProductID;
        var PRICE_PRODUCT = doc.data().UnitPrice;
        var STOCK_PRODUCT = doc.data().UnitsInStock;
        // console.log(OUT_HTML);
        // console.log(NOMBRE_PRODUCT, ID_PRODUCT, PRICE_PRODUCT, STOCK_PRODUCT);
        OUT_HTML +=
          "<tr><td>" +
          ID_PRODUCT +
          "</td>" +
          "<td>" +
          NOMBRE_PRODUCT +
          "</td>" +
          "<td>" +
          PRICE_PRODUCT +
          "</td>" +
          "<td>" +
          STOCK_PRODUCT +
          "</td>" +
          "<td>" +
          PRICE_PRODUCT +
          "</td>" + "<td>" +
          '<a href="modprod.html?cod='+doc.id+'">Editar<a/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp'+
          '<a href="deleteprod.html?cod='+doc.id+'">Borrar<a/>'
          "</td></tr>";
      });
      OUT_HTML += "</table>";
      listar.innerHTML = OUT_HTML;
    })
    .catch((error) => {
      console.error("Error inesperado al buscar los productos: ", error);
    });
}