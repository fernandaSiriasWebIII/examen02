var db = firebase.apps[0].firestore();
const txtNumeroFactura = document.querySelector('#txtNumeroFactura');
const btnLoad = document.querySelector('#btnLoad');
const pantallaFactura = document.querySelector('#pantallaFactura');
const pantallaCliente = document.querySelector('#pantallaCliente');
const pantallaTituloContacto = document.querySelector('#pantallaTituloContacto');
const pantallaNombreContacto = document.querySelector('#pantallaNombreContacto');
const pantallaPais = document.querySelector('#pantallaPais');
const pantallaCiudad = document.querySelector('#pantallaCiudad');
const pantallaCodPostal = document.querySelector('#pantallaCodPostal');
const pantallaFacturada = document.querySelector('#pantallaFacturada');
const pantallaRequerida = document.querySelector('#pantallaRequerida');
const pantallaDespachada = document.querySelector('#pantallaDespachada');
const pantallaEmpleado = document.querySelector('#pantallaEmpleado');
const pantallaCodigo = document.querySelector('#pantallaCodigo');
const pantallaNombre = document.querySelector('#pantallaNombre');
const pantallaCantidad = document.querySelector('#pantallaCantidad');
const pantallaPrecioUni = document.querySelector('#pantallaPrecioUni');
const pantallaDescuento = document.querySelector('#pantallaDescuento');
const pantallaTotal = document.querySelector('#pantallaTotal');
const totalDescuentos = document.querySelector('#totalDescuentos');
const totalGeneral = document.querySelector('#totalGeneral');

btnLoad.addEventListener('click', function () {
    const numeroFactura = Number(txtNumeroFactura.value);

    let Orders;

    db.collection('Orders')
        .where('OrderID', '==', numeroFactura)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                Orders = querySnapshot.docs[0].data();

                pantallaFactura.value = Orders.OrderID;
                pantallaPais.value = Orders.ShipCountry;
                pantallaCiudad.value = Orders.ShipCity;
                pantallaCodPostal.value = Orders.ShipPostalCode;
                pantallaFacturada.value = Date(Orders.ShippedDate);
                pantallaRequerida.value = Date(Orders.RequiredDate);
                pantallaDespachada.value = Date(Orders.OrderDate);
                pantallaEmpleado.value = Orders.empleado;

                db.collection('Customers')
                    .where('CustomerID', '==', Orders.CustomerID)
                    .get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            const clienteDoc = querySnapshot.docs[0];
                            const Customers = clienteDoc.data();

                            pantallaCliente.value = Customers.ContactName;
                            pantallaTituloContacto.value = Customers.ContactTitle;
                            pantallaNombreContacto.value = Customers.ContactName;
                        } else {
                            console.log("CustomerID recuperado de Orders:", Orders.CustomerID);
                            alert("No se encontró el cliente con ese ID.");
                            console.log("No se encontró el cliente con ese ID.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error al obtener datos del cliente:", error);
                    });

                db.collection('Employees')
                    .where('EmployeeID', '==', Orders.EmployeeID)
                    .get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            const empleadoDoc = querySnapshot.docs[0];
                            const Employees = empleadoDoc.data();

                            pantallaEmpleado.value = Employees.FirstName + " " + Employees.LastName;

                        } else {
                            console.log("No se encontró el empleado con ese ID.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error al obtener datos del empleado:", error);
                    });

                db.collection('OrderDetails')
                    .where('OrderID', '==', Orders.OrderID)
                    .get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            const detalleDoc = querySnapshot.docs[0];
                            var OrderDetails = detalleDoc.data();

                            pantallaCodigo.textContent = OrderDetails.ProductID
                            pantallaCantidad.textContent = OrderDetails.Quantity
                            pantallaPrecioUni.textContent = OrderDetails.UnitPrice
                            pantallaDescuento.textContent = OrderDetails.Discount

                            const Total = Number(OrderDetails.UnitPrice - OrderDetails.Discount)

                            pantallaTotal.textContent = Total

                            const totalDescuentosPanta = Number(OrderDetails.Discount)
                            const totalGeneralPanta = Number((OrderDetails.Quantity * OrderDetails.UnitPrice) - OrderDetails.Discount)

                            totalDescuentos.textContent = totalDescuentosPanta
                            totalGeneral.textContent = totalGeneralPanta

                        } else {
                            console.log("No se encontraron detalles para la factura:", numeroFactura);
                        }
                    })
                    .catch((error) => {
                        alert("Error al obtener detalles de la factura:", error);
                    });

                db.collection('Products')
                    .where('ProductID', '==', OrderDetails.ProductID)
                    .get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            const productsDoc = querySnapshot.docs[0];
                            const Product = productsDoc.data();

                            pantallaNombre.textContent = Product.ProductName


                        } else {
                            console.log("No se encontraron productos para la factura:", numeroFactura);
                        }
                    })
                    .catch((error) => {
                        console.error("Error al obtener productos de la factura:", error);
                    });

            } else {
                alert("No se encontró ninguna factura con ese número.");
                console.log("No se encontró ninguna factura con ese número.");
            }
        })
        .catch((error) => {
            console.error("Error al consultar la base de datos:", error);
        });
});
