const socket = io();

let MONEDA = "S/.";
let ENVIO = 0;
let USER = null;
let PRODUCTO = null;
let NCHECK = 0;
let FILTROS = [{ "nombre": "Ofertas Exclusivas", "option": [{ "name": "Cupon ahorro" }, { "name": "Mas kilos gratis" }, { "name": "Mejor precio" }, { "name": "Top ventas" }, { "name": "Novedades" }] }, { "nombre": "Tipo de alimento", "option": [{ "name": "Deshidratado" }, { "name": "Húmedo" }, { "name": "Semihúmedo" }, { "name": "Seco" }] }, { "nombre": "Edad", "option": [{ "name": "Adulto" }, { "name": "Cachorro" }, { "name": "Junior" }, { "name": "Senior" }, { "name": "Todas" }] }, { "nombre": "Tamaño de la raza", "option": [{ "name": "Gigante" }, { "name": "Grande" }, { "name": "Mediano" }, { "name": "Mini" }, { "name": "Pequeño" }, { "name": "Todas" }] }, { "nombre": "Opción nutricional", "option": [{ "name": "Grain Free" }, { "name": "Light" }, { "name": "Medicado" }, { "name": "Natural/Orgánico" }, { "name": "Vegetariano/Vegano" }] }];
let MENU = [{"nombre":"Bebidas","icon":"gatos","etiqueta":"Bebidas","sub":[{"etiqueta":["Agua"],"nombre":"Aguas"},{"etiqueta":["lata","alcohol"],"nombre":"Bebidas Alcoholicas"},{"etiqueta":["Cafes"],"nombre":"Cafe"},{"etiqueta":["Energizante"],"nombre":"Energizantes "},{"etiqueta":["gaseosa"],"nombre":"Gaseosas"},{"etiqueta":["jugo","refresco"],"nombre":"Jugos y Refrescos"},{"etiqueta":["infusion"],"nombre":"Infusiones"}]},{"nombre":"Cereales y legumbres","icon":"perros","etiqueta":"Cereales y legumbres","sub":[{"etiqueta":["Arroz"],"nombre":"Arroz"},{"etiqueta":["Avena"],"nombre":"Avenas "},{"etiqueta":["cereal"],"nombre":"Cereales "},{"etiqueta":["collares","granola"],"nombre":"Granolas"},{"etiqueta":["grano"],"nombre":"Granos"},{"etiqueta":["menestra"],"nombre":"Menestras"}]},{"nombre":"Envasados y conservas","icon":"peces-alt","etiqueta":"Envasados y conservas","sub":[{"etiqueta":["comino"],"nombre":"Comino "},{"etiqueta":["embutido"],"nombre":"Embutidos"},{"etiqueta":["fruta"],"nombre":"Frutas en conserva "},{"etiqueta":["pescado"],"nombre":"Pescados en conserva "},{"etiqueta":["pimienta"],"nombre":"Pimienta"},{"etiqueta":["snack"],"nombre":"Snacks"},{"etiqueta":["vegetales"],"nombre":"Vegetales en conserva"},{"etiqueta":["vinagre","sillao"],"nombre":"Vingre y sillao"},{"etiqueta":["conserva"],"nombre":"Otras conservas"}]},{"nombre":"Golosinas y postres","icon":"pajaros","etiqueta":"Golosinas y postres","sub":[{"etiqueta":["caramelo"],"nombre":"Caramelos"},{"etiqueta":["chocolat"],"nombre":"Chocolates"},{"etiqueta":["esencia"],"nombre":"Esencias "},{"etiqueta":["harina"],"nombre":"Harinas"},{"etiqueta":["helado"],"nombre":"Helados"},{"etiqueta":["galleta"],"nombre":"Galletas"},{"etiqueta":["manjar","algarrobina"],"nombre":"Manjar y algarrobina"}]},{"nombre":"Leche y derivados ","icon":"reptiles","etiqueta":"Leche y derivados ","sub":[{"etiqueta":["leche"],"nombre":"Leche "},{"etiqueta":["queso"],"nombre":"Quesos"},{"etiqueta":["mantequilla","margarina"],"nombre":"Mantequillas y Margarina"},{"etiqueta":["yogurt"],"nombre":"Yogurts"}]},{"nombre":"Pastas, Salsas y cremas","icon":"roedores","etiqueta":"Pastas, Salsas y cremas","sub":[{"etiqueta":["fideo"],"nombre":"Fideos"},{"etiqueta":["salsa"],"nombre":"Salsas"},{"etiqueta":["crema"],"nombre":"Cremas"},{"etiqueta":["sopa"],"nombre":"Sopas"}]}];

//datos obtenidos por get
let get = function (key) {
    key = key.replace(/[\[]/, '\\[');
    key = key.replace(/[\]]/, '\\]');
    let results = new RegExp("[\\?&]" + key + "=([^&#]*)").exec(unescape(window.location.href));
    if (results === null) {
        return null;
    }
    else {
        return results[1];
    }
};
//Usuario:
let userActivo = function (nombre, email) {
    let User = $("[data-id='User']").text("");
    User.append($('<ul class="menu"></ul>')
        .append($('<li class="sin-menu"></li>')
        .append($('<a href="javascript:perfil()"></a>')
        .append($('<i class="fa fa-user"></i>'))
        .append($('<span></span>').text(nombre))))
        .append($('<li></li>')
        .append($('<span>|</span>')))
        .append($('<li class="zona-vip"></li>')
        .append($('<a href="#"></a>')
        .append($('<span>Zona VIP</span>'))
        .append($('<i class="fa fa-flecha_desplegable"></i>')))
        .append($('<div class="sub-menu"></div>')
        .append($('<div></div>')
        .append($('<div></div>')
        .append($('<h3></h3>').text("Hola " + nombre)))
        .append($('<ul></ul>')
        .append($('<li></li>')
        .append($('<a href="javascript:historialPedidos()">Historial de Pedidos</a>')))
        .append($('<li></li>')
        .append($('<a href="javascript:salir()">salir</a>'))))))));
    let UserMovil =$("div.user-mobil").text("");
    UserMovil.append($('<a href="javascript:perfil()"><i class="fa fa-user"></i></a>'));
};
let userNoActivo = function () {
    let User = $("[data-id='User']").text("");
    User.append($('<ul class="menu"></ul>')
        .append($('<li class="sin-menu"></li>')
        .append($('<a href="javascript:login()"></a>')
        .append($('<i class="fa fa-user" ></i>'))
        .append($('<span>Mi cuenta</span>'))))
        .append($('<li></li>')
        .append($('<span>|</span>')))
        .append($('<li class="sin-menu"></li>')
        .append($('<a href="javascript:registro()"></a>')
        .append($('<span>Soy nuevo</span>')))));
    let UserMovil =$("div.user-mobil").text("");
    UserMovil.append($('<a href="javascript:login()"><i class="fa fa-user"></i></a>'));
};

let perfil = function () {
    let Compra = $("[data-id='compra']");
    Compra.text('');
    Compra.append($('<div></div>')
        .append($('<button onclick="cerrarCompra()"></button>')
        	.append($('<i class="fa fa-remove"></i>')))
        .append($('<div class="perfil_opciones"></div>')
        	.append($('<img src="images/home/logo.png" alt="Pet Shop" width="139">'))
        	.append($('<aside class="perfil_laterales"></aside>')
        		.append($('<ul data-id="filtro"></ul>')
        			.append($('<li class="seccion active"></li>')
        				.append($('<div></div>')
        					.append($('<a href="javascript:changeName(false)"></a>').text("Datos personales")
        						.append($('<i class="fa fa-flecha_desplegable"></i>')))))
        			.append($('<li class="seccion"></li>')
        				.append($('<div></div>')
        					.append($('<a href="javascript:changeEmail(false)"></a>').text("Cambiar correo electrónico")
        						.append($('<i class="fa fa-flecha_desplegable"></i>')))))
        			.append($('<li class="seccion"></li>')
        				.append($('<div></div>')
        					.append($('<a href="javascript:changePass(false)"></a>').text("Cambiar contraseña")
        						.append($('<i class="fa fa-flecha_desplegable"></i>')))))
        			.append($('<li class="seccion"></li>')
        				.append($('<div></div>')
        					.append($('<a href="javascript:changeDireccion(false)"></a>').text("Cambiar dirección")
        						.append($('<i class="fa fa-flecha_desplegable"></i>')))))
        			.append($('<li class="seccion"></li>')
        				.append($('<div></div>')
        					.append($('<a href="javascript:changeTargeta(false)"></a>').text("Cambiar metodo de pago")
        						.append($('<i class="fa fa-flecha_desplegable"></i>'))))))))
        .append($('<form action="javascript:void(0)" class="formulario"></form>')
        	.append($('<h2>Datos Personales</h2>'))
        	.append($('<div class="form"></div>')
        		.append($('<label for="login_email">Nombre</label>'))
        		.append($('<input id="login_email" type="email" placeholder="Escribe tu e-mail" required="">'))
        		.append($('<button>Guardar</button>')))));
    Compra.removeClass("hidden");
    $("body").addClass("overflowH");
    changeName();
};

let changeName = function (value) {
    let form = $("[data-id='compra']").children().children("form");
    if (value) {
        let nombre = $("#name_nombre");
        let apellido = $("#name_apellido");
        if (nombre.val() != "") {
            socket.emit("ActualizarClienteName", {idCliente: USER.idCliente, nombre: nombre.val(), apellido: apellido.val()});
            socket.on("ActualizarClienteName.RPTA",function (dato) {
                USER.nombre = nombre.val();
                USER.apellido = apellido.val();
                cerrarCompra();
            })
        } else {
            $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
        }
    } else {
        let list = $("[data-id='filtro']");
        list.children("li").removeClass("active");
        $(list.children("li")[0]).addClass("active");

        form.html("");
        form.append($('<h2>Datos Personales</h2>'))
        .append($('<div class="form"></div>')
        .append($('<label for="name_nombre">Nombres</label>'))
        .append($('<input id="name_nombre" type="text" placeholder="Escribe tu nombre" required="">').val(USER.nombre))
        .append($('<label for="name_apellido">Apellidos</label>'))
        .append($('<input id="name_apellido" type="text" placeholder="Escribe tu apellido">').val(USER.apellido))
        .append($('<p class="error hidden" data-id="nodatos"></p>'))
        .append($('<button>Guardar</button>')));
        form.attr("action","javascript:changeName(true)");
    }
}

let changeEmail = function (value) {
    let form = $("[data-id='compra']").children().children("form");
    if (value) {
        let email = $("#email_email");
        if (email.val() != "") {
            socket.emit("ActualizarClienteEmail", {idCliente: USER.idCliente, email: email.val()});
            socket.on("ActualizarClienteEmail.RPTA", function (dato) {
                if (dato === null) {
                    $("[data-id='nodatos']").text("").removeClass("hidden").text("Email ya utilizado");
                } else {
                    USER.email = email.val();
                    cerrarCompra();
                }
            });
        } else {
            $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
        }
    } else {
        let list = $("[data-id='filtro']");
        list.children("li").removeClass("active");
        $(list.children("li")[1]).addClass("active");

        form.html("");
        form.append($('<h2>Cambiar email</h2>'))
        .append($('<div class="form"></div>')
        .append($('<label for="email_email">Email</label>'))
        .append($('<input id="email_email" type="text" placeholder="Escribe tu email" required="">').val(USER.email))
        .append($('<p class="error hidden" data-id="nodatos"></p>'))
        .append($('<button>Guardar</button>')));
        form.attr("action","javascript:changeEmail(true)");
    }
}

let changePass = function (value) {
    let form = $("[data-id='compra']").children().children("form");
    if (value) {
        let pass = $("#pass_pass");
        let pass1 = $("#pass_pass1");
        let pass2 = $("#pass_pass2");
        if (pass.val()===USER.pass && pass1.val() === pass2.val()) {
            socket.emit("ActualizarClientePass", {idCliente: USER.idCliente, pass: pass1.val()});
            socket.on("ActualizarClientePass.RPTA", function (dato) {
                USER.pass1 = pass1.val();
                cerrarCompra();
            });
        } else {
            $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
        }
    } else {
        let list = $("[data-id='filtro']");
        list.children("li").removeClass("active");
        $(list.children("li")[2]).addClass("active");

        form.html("");
        form.append($('<h2>Cambiar contraseña</h2>'))
        .append($('<div class="form"></div>')
        .append($('<label for="pass_pass">Contraseña Actual</label>'))
        .append($('<input id="pass_pass" type="password" required="">'))
        .append($('<label for="pass_pass1">Nueva contraseña</label>'))
        .append($('<input id="pass_pass1" type="password" required="">'))
        .append($('<label for="pass_pass2">Repetir contraseña nueva</label>'))
        .append($('<input id="pass_pass2" type="password" required="">'))
        .append($('<p class="error hidden" data-id="nodatos"></p>'))
        .append($('<button>Guardar</button>')));
        form.attr("action","javascript:changePass(true)");
    }
}

let changeDireccion = function (value) {
    let form = $("[data-id='compra']").children().children("form");
    if (value) {
        let direccion1 = $("#dire_direccion1");
        let direccion2 = $("#dire_direccion2");
        let pais = $("#dire_pais");
        let provincia = $("#dire_provincia");
        let ciudad = $("#dire_ciudad");
        let postal = $("#dire_postal");
        let telefono = $("#dire_telefono");
        if (direccion1.val()!=="") {
            socket.emit("ActualizarClienteDireccion", {idCliente: USER.idCliente, direccion1:direccion1.val(),direccion2:direccion2.val(),pais:pais.val(),provincia:provincia.val(),ciudad:ciudad.val(),postal:postal.val(),telefono:telefono.val()});
            socket.on("ActualizarClienteDireccion.RPTA", function (dato) {
                USER.direccion1 = direccion1.val();
                USER.direccion2 = direccion2.val();
                USER.pais = pais.val();
                USER.ciudad = ciudad.val();
                USER.postal = postal.val();
                USER.telefono = telefono.val();
                cerrarCompra();
            });
        } else {
            $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
        }
    } else {
        let list = $("[data-id='filtro']");
        list.children("li").removeClass("active");
        $(list.children("li")[3]).addClass("active");

        form.html("");
        form.append($('<h2>Cambiar Direccion</h2>'))
        .append($('<div class="form"></div>')
        .append($('<label for="dire_direccion1">Direccion, renglón 1</label>'))
        .append($('<input id="dire_direccion1" type="tel" autocomplete="false" required>').val(USER.direccion1))
        .append($('<label for="dire_direccion2">Direccion, renglón 2</label>'))
        .append($('<input id="dire_direccion2" type="tel" autocomplete="false" placeholder="Opcional">').val(USER.direccion2))
        .append($('<label class="mitad right">Pais</label>'))
        .append($('<label for="dire_provincia" class="mitad left">Estado o provincia</label>'))
        .append($('<select id="dire_pais" class="mitad right"></select>').val(USER.pais)
        .append($('<option id="trans-label_pais value="" default="default" selected="selected">Perú</option>'))
        .append($('<option value="1">Brasil</option>'))
        .append($('<option value="2">Chile</option>'))
        .append($('<option value="3">Rusia</option>')))
        .append($('<input id="dire_provincia" class="mitad left" type="text" autocomplete="true" placeholder="Opcional">').val(USER.provincia))
        .append($('<label for="dire_ciudad" class="mitad right">Ciudad</label>'))
        .append($('<label for="dire_postal" class="mitad left">Código postal</label>'))
        .append($('<input id="dire_ciudad" class="mitad right" type="text" autocomplete="true" required>').val(USER.ciudad))
        .append($('<input id="dire_postal" class="mitad left" type="text" autocomplete="true" required>').val(USER.postal))
        .append($('<label for="dire_telefono">Telefono</label>'))
        .append($('<input id="dire_telefono" type="text" autocomplete="true" placeholder="Opcional" required>').val(USER.telefono))
        .append($('<p class="error hidden" data-id="nodatos"></p>'))
        .append($('<button>Guardar</button>')));
        form.attr("action","javascript:changeDireccion(true)");
    }
}

let changeTargeta = function (value) {
    let form = $("[data-id='compra']").children().children("form");
    if (value) {
        let numero = $("#tar_numero");
        let vencimiento = $("#tar_vencimiento");
        let mes = vencimiento.val().split("/")[0];
        let anio = vencimiento.val().split("/")[1];
        if(anio === undefined){
            mes = null;
            anio = null;
        }
        let codigo = $("#tar_codigo");
        if (numero.val() !== "") {
            socket.emit("ActualizarClienteTarjeta", {idCliente: USER.idCliente, numero:numero.val(),mes:mes,anio:anio,codigo:codigo.val()});
            socket.on("ActualizarClienteTarjeta.RPTA", function (dato) {
                if(dato === null){
                    $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos no validos");
                } else {
                    USER.numero = numero.val();
                    USER.mes = mes;
                    USER.anio = anio;
                    USER.codigo = codigo.val();
                    cerrarCompra();
                }
            });
        } else {
            $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
        }
    } else {
        let list = $("[data-id='filtro']");
        list.children("li").removeClass("active");
        $(list.children("li")[4]).addClass("active");
        let vencimiento = "";
        if(USER.mes !== null && USER.anio !== null ){
            let vencimiento = USER.mes + "/" + USER.anio;
        }
        form.html("");
        form.append($('<h2>Cambiar Direccion</h2>'))
        .append($('<div class="form"></div>')
        .append($('<label for="tar_numero">Número de tarjeta</label>'))
        .append($('<input id="tar_numero" type="text" autocomplete="false" placeholder="1111 2222 3333 4444" required>').val(USER.numero))
        .append($('<label for="tar_vencimiento" class="mitad right">Fecha de vencimiento</label>'))
        .append($('<label for="tar_codigo" class="mitad left">Código de seguridad</label>'))
        .append($('<input id="tar_vencimiento" class="mitad right" type="tel" placeholder="MM/AA" required>').val(vencimiento))
        .append($('<input id="tar_codigo" class="mitad left" type="tel" placeholder="123" required>').val(USER.codigo))
        .append($('<p class="error hidden" data-id="nodatos"></p>'))
        .append($('<button>Guardar</button>')));
        form.attr("action","javascript:changeTargeta(true)");
    }
}

let tableHistorial = function (dat, venta) {
    let precio = precioCD(venta.precio,venta.descuento);
    let precioCantidad = precioCD(precioSD(venta.precio,venta.cantidad),venta.descuento);
    dat.append($('<tr></tr>')
    .append($('<td></td>')
    .append($('<img>').attr("src", venta.imagenPrincipal).attr("alt", venta.nombre)))
    .append($('<td class="prod"></td>')
    .append($('<a></a>').attr("href", "producto?producto=" + venta.idProducto).text(venta.nombre))
    .append($('<span></span>').text("Presentacion : " + venta.talla + ", " + venta.color)))
    .append($('<td class="pvp"></td>').text(MONEDA + precio))
    .append($('<td class="boton_cant cont"></td>').text(venta.cantidad))
    .append($('<td class="precio"></td>')
    .append($('<span></span>').text(MONEDA + precioCantidad))));
    return dat;
};

let historialPedidos = function () {
    let Compra = $("[data-id='compra']");
    Compra.text("");
    Compra.append($('<div></div>')
        .append($('<button onclick="cerrarCompra()"></button>')
        	.append($('<i class="fa fa-remove"></i>')))
        .append(function(){
        	let ListaPedido = $('<form action="javascript:void(0)" id="historial" class="historial">')
            .append($('<h2>Historial de pedidos</h2>'));
        	let tipo = 0;
        	let subTotal= 0;
            let precio = 0;
            let dat;
            socket.emit("ObtenerHistorial",{
                idCliente:$("#userID").val()
            });
            socket.on("ObtenerHistorial.RPTA",function (historial) {
                historial.forEach(function (venta) {
                    if(venta.tipo > tipo){
                        if(tipo > 0){
                            subTotal = precioSD(subTotal, 1);
                            ListaPedido.append($('<div class="total"></div>')
                            .append($('<table></table>')
                            .append($('<tr class="subtot"></tr>')
                            .append($('<td>Subtotal :</td>'))
                            .append($('<th></th>').text(MONEDA + subTotal)))
                            .append($('<tr></tr>')
                            .append($('<td>Envio a domicilio :</td>'))
                            .append($('<th></th>').text(MONEDA + ENVIO)))
                            .append($('<tr class="tot"></tr>')
                            .append($('<td>Total :</td>'))
                            .append($('<th class="precio"></th>').text(MONEDA + (subTotal + ENVIO))))));
                        }
                        let fecha = new Date(venta.fecha);
                        let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        ListaPedido.append($('<h3></h3>').text(fecha.toLocaleDateString("es-ES", options)));
                        dat = $('<table id="tableHistorial"></table>').append($('<tr></tr>')
                        .append($('<th>PRODUCTO</th>'))
                        .append($('<th></th>'))
                        .append($('<th>PVP</th>'))
                        .append($('<th>CANTIDAD</th>'))
                        .append($('<th>IMPORTE</th>')));
                        tipo = venta.tipo;
                        subTotal = 0;
                    }
                    precio = precioCD(precioSD(venta.precio,venta.cantidad),venta.descuento);
                    subTotal += precio;
                    ListaPedido.append($(tableHistorial(dat, venta)));
                });
                if(tipo > 0){
                    subTotal = precioSD(subTotal, 1);
                    ListaPedido.append($('<div class="total"></div>')
                    .append($('<table></table>')
                    .append($('<tr class="subtot"></tr>')
                    .append($('<td>Subtotal :</td>'))
                    .append($('<th></th>').text(MONEDA + subTotal)))
                    .append($('<tr></tr>')
                    .append($('<td>Envio a domicilio :</td>'))
                    .append($('<th></th>').text(MONEDA + ENVIO)))
                    .append($('<tr class="tot"></tr>')
                    .append($('<td>Total :</td>'))
                    .append($('<th class="precio"></th>').text(MONEDA + (subTotal+ENVIO))))));
                }
            })
            return ListaPedido;
        }));
    Compra.removeClass("hidden");
    $("body").addClass("overflowH");
};

//cerar login
let cerrarLogin = function () {
    $("body").removeClass("overflowH");
    $("[data-id='login']").addClass("hidden");
};
//cerrar registro
let cerrarRegistro = function () {
    $("body").removeClass("overflowH");
    $("[data-id='registro']").addClass("hidden");
};
//login
var login = function () {
    cerrarRegistro();
    $("body").addClass("overflowH");
    $("[data-id='login']").removeClass("hidden");
    $("#login_email").focus();
    $("[data-id='nodatos']").addClass("hidden").text("");
};
//registro
var registro = function () {
    cerrarLogin();
    $("body").addClass("overflowH");
    $("[data-id='registro']").removeClass("hidden");
    $("#registro_name").focus();
    $("[data-id='nodatos']").addClass("hidden").text("");
};
var registrarse = function () {
    var nombre = $("#registro_name");
    var email = $("#registro_email");
    var pass = $("#registro_pass");
    var pass2 = $("#registro_pass2");
    var nodatos = $("[data-id='nodatos']").text("");
    if (pass.val() == pass2.val()){
        socket.emit("Registrarse", {nombre: nombre.val(), email: email.val(), pass: pass.val()});
        socket.on("Registrarse.RPTA", function (user) {
            if (user === null) {
                nodatos.removeClass("hidden").text("El email ya estan urilizados, intente nuevamente con otros datos");
                nombre.val("");
                email.val("");
                pass.val("");
                pass2.val("");
                nombre.focus();
            } else {
                nodatos.addClass("hidden");
                cerrarRegistro();
                userActivo(nombre.val(), email.val());
                USER = {idCliente: user.idCliente, nombre: nombre, email: email, pass: pass};
                $("#userID").val(user.idCliente);
                $.post("session", {idCliente: user.idCliente});
            }
        });
    } else {
        nodatos.removeClass("hidden").text("Las contraseñas no coinciden");
        pass.val("");
        pass2.val("");
        pass.focus();
    }
};
var logearse = function () {
    var email = $("#login_email");
    var pass = $("#login_pass");
    var nombre = "";
    var nodatos = $("[data-id='nodatos']").text("");
    socket.emit("Logearse",{email:email.val(),pass:pass.val()});
    socket.on("Logearse.RPTA",function (user) {
        if(user === null){
            nodatos.removeClass("hidden").text("Los datos son incorecta, intente nuevamente");
            email.val("");
            pass.val("");
            email.focus();
        }else{
            nodatos.addClass("hidden");
            cerrarLogin();
            userActivo(user.nombre, email.val());
            numeroCheck(user.idCliente);
            USER = user;
            $("#userID").val(user.idCliente);
            $.post("session", {idCliente: user.idCliente});
        }
    });
};
var salir = function () {
    $("#registro_name").val("");
    $("#registro_email").val("");
    $("#registro_pass").val("");
    $("#registro_pass2").val("");
    $("#login_email").val("");
    $("#login_pass").val("");
    USER = null;
    $("[data-id='checkcont']").text(0);
    $("#userID").val("");
    $.post("session", {idCliente: null});
    userNoActivo();
};
//algortimo de generacion de menu
var recursiva = function (menu, cad) {
    if (menu.sub === undefined) {
        return "";
    }
    else {
        return $('<div></div>').addClass("sub-menu")
            .append($('<div></div>')
            .append(function () {
            var submenu = $('<ul></ul>');
            var _loop_1 = function (i) {
                var option = menu.sub[i];
                var text = cad;
                submenu.append($('<li></li>')
                    .append($('<a></a>').attr("href", function () {
                    return "query?query=" + option.etiqueta;
                })
                    .append($('<span></span>').text(option.nombre))
                    .append(function () {
                    if (option.sub === undefined) {
                        return "";
                    }
                    else {
                        return $('<i></i>').addClass("fa fa-flecha_desplegable fa-rotate-270");
                    }
                }))
                    .append(recursiva(option, text)));
            };
            for (var i in menu.sub) {
                _loop_1(i);
            }
            return submenu;
        }));
    }
};
var cambioPrecio = function (ths, precio, descuento, count) {
    var oldPrecio = precioSD(precio, count);
    var precio = precioCD(oldPrecio, descuento);
    ths.text(MONEDA + precio);
};
var minus = function (ths, limit) {
    ths.val((ths.val() > limit) ? (ths.val() - 1) : limit);
};
var plus = function (ths, limit) {
    ths.val((ths.val() < limit) ? (ths.val() - 0) + 1 : limit);
};

var addCheck = function (prdt, type, count) {
    socket.emit("InsertarVenta",{idCliente:USER.idCliente,idCaracteristica:prdt.type[type].idCaracteristica,cantidad:count,tipo:0});
    socket.on("InsertarVenta.RPTA",function (num) {
        NCHECK +=parseInt(num);
        $("[data-id='checkcont']").text(NCHECK);
    })
};
//compra
var typeChangeCompra = function (ths) {
    var type = ths.val();
    var form = ths.parent().parent().parent().parent();
    form.children(".tp").val(type);
    var idProducto = form.children(".pr").val();
    var prdt = PRODUCTO;
    var tt = form.children(".botones").children("p").children("span");
    form.children(".botones").children(".cantidad").children(".boton_cant").children("input").val(1);
    cambioPrecio(tt, prdt.type[type].precio, prdt.descuento, 1);
};
var countChangeCompra = function (ths) {
    var count = ths.val();
    var form = ths.parent().parent().parent().parent();
    var tt = form.children(".botones").children("p").children("span");
    var idProducto = form.children(".pr").val();
    var prdt = PRODUCTO;
    var type = form.children(".tp").val();
    count = Math.min(count,prdt.type[type].stock);
    ths.val(count);
    cambioPrecio(tt,prdt.type[type].precio, prdt.descuento, count);
};
var minusChangeCompra = function (ths) {
    var form = ths.parent().parent().parent().parent();
    var type = form.children(".tp").val();
    var cantidad = ths.parent().children("input");
    var limit = 1;
    minus(cantidad, limit);
    countChangeCompra(cantidad);
};
var plusChangeCompra = function (ths) {
    var form = ths.parent().parent().parent().parent();
    var type = form.children(".tp").val();
    var cantidad = ths.parent().children("input");
    var limit = PRODUCTO.type[type].stock;
    plus(cantidad, limit);
    countChangeCompra(cantidad);
};

var addCheckCompra = function (ths) {
    if(USER != null){
        var form = ths.parent().parent().parent();
        var idProducto = form.children("input").val();
        var prdt = PRODUCTO;
        var type =  form.children(".tp").val();
        var count = form.children(".botones").children(".cantidad").children(".boton_cant").children("input").val();
        if (1 <= count && count <= prdt.type[type].stock) {
            addCheck(prdt, type, count);
            cerrarCompra();
            return true;
        } else {
            return false;
        }
    } else {
        login();
        return false
    }
};
var envioCheckCompra = function (ths) {
    if (addCheckCompra(ths)) {
        location.href = 'checkout';
    }
};

var subirImg = function(ths,index){
    index = parseInt(index)-1;
    let li = ths.parent().children("ul").children("li")
    let tam = li.length;
    ths.parent().children("span").addClass("pointer");
    if (index >= 0){
        ths.addClass("pointer");
        $(li[index]).removeClass("hidden");
        ths.attr("onclick","subirImg($(this),"+(index)+")");
        ths.parent().children("span.down").attr("onclick","bajarImg($(this),"+(index)+")");
    } else{
        ths.removeClass("pointer");
    }
}

var bajarImg = function(ths,index){
    index = parseInt(index);
    let li = ths.parent().children("ul").children("li")
    let tam = li.length;
    ths.parent().children("span").addClass("pointer");
    if (index + 4 < tam){
        ths.addClass("pointer");
        $(li[index]).addClass("hidden");
        ths.parent().children("span.up").attr("onclick","subirImg($(this),"+(index+1)+")");
        ths.attr("onclick","bajarImg($(this),"+(index+1)+")");
    } else{
        ths.removeClass("pointer");
    }
}

var cambiarImg = function(ths){
    ths.parent().children("li").removeClass("active");
    ths.addClass("active");
    let img = ths.children("figure").children('img').attr('src');
    $('figure.imgPrincipal>img').attr('src',img);
}

//algoritmo de generacion de compra
var compra = function (i) {
    socket.emit("ObtenUnProducto",{idProducto:i});
    socket.on("ObtenUnProducto.RPTA",function (prdt) {
        var Agotado = true;
        PRODUCTO = prdt;
        var Compra = $("[data-id='compra']");
        var precio = precioCD(prdt.type[0].precio, prdt.descuento);
        Compra.text("");
        Compra.append($('<div></div>')
        .append($('<button onclick="cerrarCompra()"></button>')
        .append($('<i class="fa fa-remove"></i>')))
        .append($('<form action="javascript:void(0)" class="shop"></form>')
        .append($('<input type="hidden" class="pr">').val(i))
        .append($('<input type="hidden" class="tp">').val(0))
        .append($('<div class="producto listImagenes"></div>')
        .append($('<span class="up" onclick="subirImg($(this),0)"><i class="fa fa-chevron-up"></i></span>'))
        .append(function(){
            var imagenes = $('<ul></ul>');
            imagenes.append($('<li class="active" onclick="cambiarImg($(this))"></li>')
            .append($('<figure></figure>')
            .append($('<img>').attr("src", prdt.imagenPrincipal).attr("alt", prdt.nombre))));
            for (var j in prdt.type) {
                if(prdt.type[j].img != null){
                    var option = prdt.type[j];
                    imagenes.append($('<li onclick="cambiarImg($(this))"></li>')
                    .append($('<figure></figure>')
                    .append($('<img>').attr("src", option.img).attr("alt", prdt.nombre))));
                }
            }
            return imagenes;
        })
        .append($('<span class="down pointer" onclick="bajarImg($(this),0)"><i class="fa fa-chevron-down"></i></span>')))
        .append($('<div class="producto"></div>')
        .append($('<figure class="imgPrincipal"></figure>')
        .append($('<img>').attr("src", prdt.imagenPrincipal).attr("alt", prdt.nombre))))
        .append($('<div class="opciones"></div>')
        .append($('<a></a>').attr("href", "producto?producto=" + i).text(prdt.nombre))
        .append($('<p>Elige el formato que prefieras</p>'))
        .append(function () {
            var optiones = $('<ul></ul>');
            for (var j in prdt.type) {
                if(prdt.type[j].stock > 0){
                    Agotado = false;
                    var option = prdt.type[j];
                    var precioTipo = precioCD(option.precio, prdt.descuento);
                    optiones.append($('<li class="checkbox"></li>')
                    .append($('<input type="radio" onchange="typeChangeCompra($(this))" name="producto">').val(j).attr("checked", (j == 0) ? true : false).attr("id", "producto_" + i + "_" + j))
                    .append($('<label></label>').attr("for", "producto_" + i + "_" + j)
                    .append($('<span class="caracteristicas"></span>')
                    .append($('<span></span>')
                    .append($('<b></b>').text("Talla: "))
                    .append($('<span></span>').text(option.talla)))
                    .append($('<span></span>')
                    .append($('<b></b>').text("Color: "))
                    .append($('<span></span>').text(option.color)))
                    .append($('<span></span>')
                    .append($('<b></b>').text("Precio: "))
                    .append($('<span class="old-precio"></span>').text(MONEDA + option.precio))
                    .append($('<span class="precio"></span>').text(MONEDA + precioTipo))))));
                }
            }
            return optiones;
        }))
        .append(function () {
            var botones = $('<div class="botones"></div>');
            if(Agotado!=true){
                botones.append($('<p>Total: </p>')
                .append($('<span></span>').text(MONEDA + precio)))
                .append($('<div class="cantidad"></div>')
                .append($('<label for="cantidad">Cantidad :</label>'))
                .append($('<span class="boton_cant"></span>')
                .append($('<button class="fa fa-minus"></button>').attr("onclick", "minusChangeCompra($(this))"))
                .append($('<input id="cantidad" type="number" pattern="^[0-9]+" onchange="countChangeCompra($(this))" value="1" min="1" required>'))
                .append($('<button class="fa fa-plus"></button>').attr("onclick", "plusChangeCompra($(this))"))));
            }
            if(Agotado){
                botones.append($('<div class="boton"></div>')
                .append($('<button class="agotado" disabled>Agotado</button>'))
                .append($('<button onclick="cerrarCompra()">Seguir comprando</button>')));
            } else {
                botones.append($('<div class="boton"></div>')
                .append($('<button onclick="envioCheckCompra($(this))" class="relizado">Realizar el Pedido</button>'))
                .append($('<button onclick="addCheckCompra($(this))">Añadir y seguir comprando</button>')));
            }
            return botones;
        })));
        Compra.removeClass("hidden");
        $("body").addClass("overflowH");
    })
};
var cerrarCompra = function () {
    $("[data-id='compra']").addClass("hidden");
    $("body").removeClass("overflowH");
    PRODUCTO = null;
};

var precioSD = function (precio, count) {
    return Math.round(count * precio * 100) / 100;
};

var precioCD = function (precio,descuento) {
    return Math.round(precio * (100 - descuento)) / 100;
};
//algoritmo de generacion de mini productos
var mProducto = function (prdt) {
    var precio = precioCD(prdt.precioBase,prdt.descuento);
    return $('<li></li>')
        .append($('<div class="producto"></div>')
        .append($('<a></a>').attr("href", "producto?producto=" + prdt.idProducto)
        .append($('<figure></figure>')
        .append($('<img>').attr("src", prdt.imagenPrincipal).attr("alt", prdt.nombre))
        .append($('<figcaption></figcaption>')
        .append($('<span></span>').text(prdt.nombre))))
        .append($('<div class="precios"></div>')
        .append($('<div class="old-precio"></div>')
        .append($('<span></span>').text(MONEDA + prdt.precioBase)))
        .append($('<div class="precio"></div>')
        .append(MONEDA + Math.trunc(precio))
        .append($('<span></span>').text(function () {
	        return "." + Math.round((Math.round(precio * 100) / 100 - Math.trunc(precio)) * 100);
	    }))))))
        .append($('<button></button>').attr("onclick", "compra(" + prdt.idProducto + ")")
        	.append($('<i>¡Añadir al Carrito!</i>')));
};
//algoritmo de generacion de productos
var pProducto = function (prdt) {
    var precio = precioCD(prdt.precioBase,prdt.descuento);
    return $('<li></li>')
        .append($('<div class="producto"></div>')
        .append($('<a></a>').attr("href", "producto?producto=" + prdt.idProducto)
        .append($('<figure></figure>')
        .append($('<img>').attr("src", prdt.imagenPrincipal).attr("alt", prdt.nombre))
        .append($('<div class="marca"></div>')
        .append($('<span></span>').text(prdt.marca)))
        .append($('<figcaption></figcaption>')
        .append($('<span></span>').text(prdt.nombre))))
        .append($('<div class="precios"></div>')
        .append($('<div class="old-precio"></div>')
        .append($('<span></span>').text(MONEDA + prdt.precioBase)))
        .append($('<div class="precio"></div>')
        .append(MONEDA + Math.trunc(precio))
        .append($('<span></span>').text(function () {
        return "." + Math.round((Math.round(precio * 100) / 100 - Math.trunc(precio)) * 100);
    })))
        .append($('<div class="descuento"></div>')
        .append($('<i class="fa fa-heart"></i>'))
        .append(prdt.descuento)
        .append($('<span></span>').text("%")))
        .append($('<div class="apartir"></div>')
        .append($('<span>A partir de</span>'))))
        .append($('<div class="entrega"></div>')
        .append($('<span class="text">Envio inmediato</span>'))
        .append($('<span class="time"></span>')
        .append($('<span>24 h</span>'))))))
        .append($('<button></button>').attr("onclick", "compra(" + prdt.idProducto + ")")
        .append($('<i>¡Añadir al Carrito!</i>')));
};

var changeBanner = function (ths) {
    ths.parent().children("li").removeClass("activeBanner");
    ths.addClass("activeBanner");
    var index = ths.index();
    var list = $(ths.parent().parent().children("ul")[0]);
    list.children("li").hide();
    $(list.children("li")[index]).fadeIn();
}

var nextSlider= function (ths){
    var list = ths.parent().parent().children("ul");
    var first = list.children("li")[0];
    $(first).hide();
    first.remove();
    list.append(first);
    $(first).fadeIn();
}

var prevSlider= function (ths){
    var list = ths.parent().parent().children("ul");
    var count = list.children("li").length;
    var last = list.children("li")[count-1];
    $(last).hide();
    last.remove();
    list.prepend(last);
    $(last).fadeIn();
    //list.css("left","+=16rem");
}

var menu_construir = function (i) {
    var option = MENU[i];
    $("[data-id='menu']").append($('<li></li>')
        .append($('<a></a>').attr("href", "query?query=" + option.etiqueta)
        .append($('<i></i>').addClass("icon icon-active fa fa-" + option.icon))
        .append($('<span></span>').text(option.nombre))
        .append(function () {
        if (option.sub === undefined)
            return "";
        else {
            return $('<i></i>').addClass("fa fa-flecha_desplegable");
        }
    }))
        .append(recursiva(option, option.etiqueta)));
    $("#menuMobil").append($('<li></li>')
        .append($('<a></a>').attr("href", "query?query=" + option.etiqueta)
        .append($('<i></i>').addClass("icon fa fa-" + option.icon))
        .append($('<span></span>').text(option.nombre))));
};

var numeroCheck = function (userID) {
    if (userID != null) {
        socket.emit("ObtenerVentaTipoCount", {idCliente: userID, tipo: 0});
        socket.on("ObtenerVentaTipoCount.RPTA", function (n) {
            NCHECK = parseInt(n);
            $("[data-id='checkcont']").text(n);
        });
    } else {
        $("[data-id='checkcont']").text(0);
    }
};

var paginas = function (page, tam, nlength, url) {
    var maximo = Math.ceil(nlength / tam) - 1;
    var and = (url == 0) ? "" : "&";
    var pages = $('<ul></ul>');
    if (page != 0) {
        pages.append($('<li></li>')
        .append($('<a></a>').attr("href", "?" + url + and + "page=" + (page - 1)).text("Ant")));
    }
    if (page >= 3) {
        pages.append($('<li></li>')
        .append($('<a></a>').attr("href", "?" + url).text(1)));
        pages.append($('<li class="disabled"></li>')
        .append($('<span>...</span>')));
    }
    for (var i = Math.max(page - 2, 0); i <= Math.min((page - 0) + 2, maximo); i++) {
        if (i == page) {
            pages.append($('<li class="active"></li>')
            .append($('<span></span>').text(i + 1)));
        }
        else {
            pages.append($('<li></li>')
            .append($('<a></a>').attr("href", "?" + url + and + "page=" + i).text(i + 1)));
        }
    }
    if (page <= maximo - 3) {
        pages.append($('<li class="disabled"></li>')
        .append($('<span>...</span>')));
        pages.append($('<li></li>')
        .append($('<a></a>').attr("href", "?" + url + and + "page=" + maximo).text(maximo + 1)));
    }
    if (Math.min(page, maximo) < maximo) {
        pages.append($('<li></li>')
        .append($('<a></a>').attr("href", "?" + url + and + "page=" + ((page - 0) + 1)).text("Sig")));
    }
    return pages;
};

$(document).ready(function () {
    for (var i in MENU) {
        menu_construir(i);
    }
    userID = $("#userID").val();
    if (userID !== "") {
        socket.emit("ObtenerUser", {idCliente: userID});
        socket.on("ObtenerUser.RPTA", function (user) {
            USER = user;
            if (user === null) {
                $("#userID").val("");
                userNoActivo();
            } else {
                userActivo(user.nombre, user.email);
            }
            numeroCheck(USER.idCliente);
        });
    } else {
        userNoActivo();
    }
    var arriba = $("#arriba");
    arriba.click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });
    if ($(window).scrollTop() == 0) {
        arriba.hide();
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            arriba.slideDown(300);
        }
        else {
            arriba.slideUp(300);
        }
    });
});

