//comprFinal
var CHECK = null;
var Direc = true;
var Pag = true;

var changeDirec = function () {
    let direccion1 = $("#comprar_direccion1");
    let direccion2 = $("#comprar_direccion2");
    let pais = $("#comprar_pais");
    let provincia = $("#comprar_provincia");
    let ciudad = $("#comprar_ciudad");
    let postal = $("#comprar_postal");
    let telefono = $("#comprar_telefono");
    if (direccion1.val()!=="") {
        socket.emit("ActualizarClienteDireccion", {idCliente: USER.idCliente, direccion1:direccion1.val(),direccion2:direccion2.val(),pais:pais.val(),provincia:provincia.val(),ciudad:ciudad.val(),postal:postal.val(),telefono:telefono.val()});
        socket.on("ActualizarClienteDireccion.RPTA", function (dato) {
            USER.direccion1 = direccion1.val();
            USER.direccion2 = direccion2.val();
            USER.pais = pais.val();
            USER.ciudad = ciudad.val();
            USER.postal = postal.val();
            USER.telefono = telefono.val();
        });
    } else {
        $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
    }
    let nombre = $("#comprar_nombre");
    let apellido = $("#comprar_apellido");
    if (nombre.val() != "") {
        socket.emit("ActualizarClienteName", {idCliente: USER.idCliente, nombre: nombre.val(), apellido: apellido.val()});
        socket.on("ActualizarClienteName.RPTA",function (dato) {
            USER.nombre = nombre.val();
            USER.apellido = apellido.val();
        })
    } else {
        $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
    }
}

var changePag = function () {
    let numero = $("#comprar_targeta");
    let vencimiento = $("#comprar_vencimiento");
    let mes = vencimiento.val().split("/")[0];
    let anio = vencimiento.val().split("/")[1];
    if(anio === undefined){
        mes = null;
        anio = null;
    }
    let codigo = $("#comprar_codigo");
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
            }
        });
    } else {
        $("[data-id='nodatos']").text("").removeClass("hidden").text("Datos incorrectos");
    }
}

var pago = function () {
    if(Direc || Pag){
        if(Direc){
            changeDirec();
        }
        if(Pag){
            changePag();
        }
        cerrarCompra();
        compraFinal();
    } else {
        socket.emit("RealizarCompra",{idCliente:USER.idCliente});
        socket.on("RealizarCompra",function (rpta) {
            cerrarCompra();
        })
    }
}

var detalleEnvio = function (value,typo) {
    var formulario;
    if(typo){
        formulario = $('#detalle_envio');
        formulario.text("");
    } else{
        formulario = $('<div id="detalle_envio" class="form"></div>');
    }
    if (value) {
        Direc = false;
        formulario.append($('<label></label>').text(USER.nombre + " " + USER.apellido))
        .append($('<label></label>').text(USER.direccion1))
        .append($('<label></label>').text(USER.direccion2))
        .append($('<label></label>').text(USER.ciudad + ", "+ USER.provincia))
        .append($('<label></label>').text(USER.pais))
        .append($('<label></label>').text(USER.postal))
        .append($('<label></label>')
        .append($('<a href="javascript:detalleEnvio(false,true)"><i class="fa fa-pencil"></i>Editar</a>')))
    } else{
        Direc = true;
        formulario.append($('<label for="comprar_nombre" class="mitad right">Nombres</label>'))
        .append($('<label for="comprar_apellido" class="mitad left">Apellidos</label>'))
        .append($('<input id="comprar_nombre" class="mitad right" type="text" autocomplete="false" required>'))
        .append($('<input id="comprar_apellido" class="mitad left" type="text" autocomplete="false" required>'))
        .append($('<label for="comprar_direccion_1">Direccion, renglón 1</label>'))
        .append($('<input id="comprar_direccion_1" type="tel" autocomplete="false" required>'))
        .append($('<label for="comprar_direccion_2">Direccion, renglón 2</label>'))
        .append($('<input id="comprar_direccion_2" type="tel" autocomplete="false" placeholder="Opcional">'))
        .append($('<label class="mitad right">Pais</label>'))
        .append($('<label for="comprar_provincia" class="mitad left">Distrito</label>'))
        .append($('<select id="comprar_pais" class="mitad right"></select>')
        .append($('<option id="trans-label_pais value="" default="default" selected="selected">Perú</option>'))
        .append($('<option value="1">Brasil</option>'))
        .append($('<option value="2">Chile</option>'))
        .append($('<option value="3">Rusia</option>')))
        .append($('<input id="comprar_provincia" class="mitad left" type="text" autocomplete="true" placeholder="Opcional">'))
        .append($('<label for="comprar_ciudad" class="mitad right">Ciudad</label>'))
        .append($('<label for="comprar_postal" class="mitad left">Código postal</label>'))
        .append($('<input id="comprar_ciudad" class="mitad right" type="text" autocomplete="true" required>'))
        .append($('<input id="comprar_postal" class="mitad left" type="text" autocomplete="true" required>'))
        .append($('<label for="comprar_telefono">Telefono</label>'))
        .append($('<input id="comprar_telefono" type="text" autocomplete="true" placeholder="Opcional" required>'));
    }
    if(!typo){
        return formulario;
    }
};

var detallePago = function (value,typo) {

    var formulario;
    if(typo){
        formulario= $('#detalle_pago');
        formulario.text("");
    } else{
        formulario=$('<div id="detalle_pago" class="form"></div>')
    }
    if(value){
        Pag = false;
        formulario.append($('<label><i class="fa fa-credit-card"></i> **** **** **** 2654</label>'))
        .append($('<label></label>')
        .append($('<a href="javascript:detallePago(false,true)"><i class="fa fa-pencil"></i>Editar</a>')));
    } else {
        Pag = true;
        formulario.append($('<label for="comprar_tarjeta">Número de tarjeta <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="6D8666NFNDCXA">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1">
</form></label>'))
        .append($('<input id="comprar_tarjeta" type="tel" autocomplete="false" pattern="[0-9]*" placeholder="1111 2222 3333 4444" required>'))
        .append($('<label for="comprar_vencimiento" class="mitad right">Fecha de vencimiento</label>'))
        .append($('<label for="comprar_codigo" class="mitad left">Código de seguridad</label>'))
        .append($('<input id="comprar_vencimiento" class="mitad right" type="tel" placeholder="MM/AA" required>'))
        .append($('<input id="comprar_codigo" class="mitad left" type="tel" placeholder="123" required>'));
    }
    return formulario;
};

var compraFinal = function () {
    var Compra = $("[data-id='compra']");
    Compra.text("");
    Compra.append($('<div></div>')
        .append($('<button onclick="cerrarCompra()"></button>')
            .append($('<i class="fa fa-remove"></i>')))
        .append($('<div class="lateral"></div>')
            .append($('<img src="images/home/logo.png" alt="Calidad Item" width="139">'))
            .append($('<ul></ul>')
                .append($('<li>NUEVAS TENDENCIAS DE TEMPORADAS</li>'))
                .append($('<li>CON LA MEJOR CALIDAD, GARANTIZADO</li>'))
                .append($('<li>APROVECHA LA NUEVA COLECCIÓN QUE TENEMOS PARA TI</li>'))
                .append($('<li>OFERTAS EXCLUSIVAS PARA CLIENTES REGISTRADOS</li>')))
            .append($('<p>Al confirmar pago indicas que: Haz leído y aceptado la <a href="#"> política de privacidad </a>.</p>')))
        .append(function () {
            var formulario = $('<form action="javascript:pago()" class="formulario"></form>');
        formulario.append($('<h2>Detalles de envio</h2>'))
            .append(detalleEnvio(USER.direccion1!=null,false))
            .append($('<h2>Detalles de pago</h2>'))
            .append(detallePago(USER.numero!=null,false))
            .append($('<div class="form"></div>')
            .append($('<p data-id="nodatos" class="error hidden">Error</p>'))
            .append($('<button>Confirmar Pago</button>'))
            .append($('<p class="politica">Al registrarte confirmas que: He leído y acepto la <a href="others.html?others=politicas"> política de privacidad </a>.</p>')));
        return formulario;
    }));
    Compra.removeClass("hidden");
    $("body").addClass("overflowH");
    //db.CHECK.clear();
};

var tableCheck = function (dat) {
    var entro = true;
    userID = $("#userID").val();
    dat.text("");
    dat.append($('<tr></tr>')
    .append($('<th>PRODUCTO</th>'))
    .append($('<th></th>'))
    .append($('<th>PVP</th>'))
    .append($('<th>CANTIDAD</th>'))
    .append($('<th>IMPORTE</th>'))
    .append($('<th></th>')));
    socket.emit("ObtenerVentaTipo",{idCliente:userID,tipo:0});
    socket.on("ObtenerVentaTipo.RPTA",function (ventas) {
        if(entro){
            entro = false;
            CHECK = ventas;
            ventas.forEach(function (check) {
                var precio = precioCD(check.precio,check.descuento);
                dat.append($('<tr></tr>')
                .append($('<td></td>')
                .append($('<img>').attr("src", check.imagenPrincipal).attr("alt", check.nombre)))
                .append($('<td class="prod"></td>')
                .append($('<a></a>').attr("href", "producto?producto=" + check.idProducto).text(check.nombre))
                .append($('<span></span>').text("Presentacion : " + check.talla + ", " + check.color)))
                .append($('<td class="pvp"></td>').text(MONEDA + precio))
                .append($('<td class="boton_cant cont"></td>')
                .append($('<button class="fa fa-minus"></button>').attr("onclick", "minusChangeCheck($(this))"))
                .append($('<input type="hidden" class="id">').val(check.idVenta))
                .append($('<input type="number" class="number" min="1" pattern="^[0-9]+" onchange="countChangeCheck($(this))" required>').attr("max", check.stock).val(check.cantidad))
                .append($('<button class="fa fa-plus"></button>').attr("onclick", "plusChangeCheck($(this))")))
                .append($('<td class="precio"></td>')
                .append($('<span></span>').text(precioSD(precio, check.cantidad))))
                .append($('<td class="recycle"></td>')
                .append($('<button onclick="removeCheck($(this))" class="fa fa-trash"></button>'))));
            });
            precioTotal();
        }
    });
    return dat;
};

var checklist = function (n) {
    var cesta = $('#cesta').text("");
    if (n > 0) {
        var tableCheckK = $('<table id="tableCheck"></table>');
        cesta.append($('<div class="botons"></div>')
        .append($('<h2>Mi cesta</h2>'))
        .append($('<div></div>')
        .append($('<a href="/"></a>')
        .append($('<i class="fa fa-rw"></i>'))
        .append("VOLVER A LA TIENDA"))
        .append($('<button onclick="compraFinal()">REALIZAR PEDIDO</button>'))))
        .append(tableCheck(tableCheckK))
        .append($('<div class="total"></div>')
        .append($('<table></table>')
        .append($('<tr class="subtot"></tr>')
        .append($('<td>Subtotal :</td>'))
        .append($('<th></th>').text(0)))
        .append($('<tr></tr>')
        .append($('<td>Envio a domicilio :</td>'))
        .append($('<th></th>').text(ENVIO)))
        .append($('<tr class="tot"></tr>')
        .append($('<td>Total :</td>'))
        .append($('<th class="precio"></th>').text(ENVIO))))
        .append($('<button onclick="compraFinal()">REALIZAR PEDIDO</button>')));
        //calculo del resultado
    }
    else {
        cesta.append($('<div class="botons"></div>')
        .append($('<h2>¿Qué hay en mi Cesta?</h2>'))
        .append($('<div></div>')
        .append($('<a href="/"></a>')
        .append($('<i class="fa fa-rw"></i>'))
        .append("VOLVER A LA TIENDA"))))
        .append($('<div class="total"></div>')
        .append($('<div style="text-align: left">Tu cesta de compra está vacía</div>')));
    }
};

//check
var countChangeCheck = function (ths) {
    var count = ths.val();
    var tt1 = ths.parent().parent().children(".precio").children("span");
    var index = ths.parent().parent().index()-1;
    var check = CHECK[index];
    count = Math.min(count,check.stock);
    ths.val(count);
    cambioPrecio(tt1, check.precio,check.descuento, count);
    check.cantidad = ths.val();
    socket.emit("ActualizarCantidad",{idVenta:check.idVenta,cantidad:count});
    precioTotal();
};
var minusChangeCheck = function (ths) {
    var cantidad = ths.parent().children(".number");
    var limit = 1;
    minus(cantidad, limit);
    countChangeCheck(cantidad);
};
var plusChangeCheck = function (ths) {
    var cantidad = ths.parent().children(".number");
    var index = ths.parent().parent().index()-1;
    var limit = CHECK[index].stock;
    plus(cantidad, limit);
    countChangeCheck(cantidad);
};
var removeCheck = function (ths) {
    var tr = ths.parent().parent();
    var index = tr.index()-1;
    socket.emit("RemoveItemVent", {idVenta: CHECK[index].idVenta});
    checkcont = $("[data-id='checkcont']");
    checkcont.text(CHECK.length-1);
    tr.remove();
    CHECK.splice(index,1);
    if(CHECK.length == 0){
        checklist(0);
    }
};

var precioTotal = function () {
    var table = $('#cesta').children(".total").children("table");
    var subTotal = table.children(".subtot").children("th");
    var total = table.children(".tot").children("th");
    var st = 0;
    CHECK.forEach(function (check) {
        st = st + precioCD(check.precio,check.descuento);
    })
    subTotal.text(precioSD(st,1));
    total.text(precioSD(st+ENVIO,1));
};

$(document).ready(function () {
    userID = $("#userID").val();
    if (userID === "") {
        location.href ="/";
    }
    if (userID != null) {
        socket.emit("ObtenerVentaTipoCount", {idCliente: userID, tipo: 0});
        socket.on("ObtenerVentaTipoCount.RPTA", function (n) {
            NCHECK = parseInt(n);
            checklist(n);
            $("[data-id='checkcont']").text(n);
        });
    } else {
        $("[data-id='checkcont']").text(0);
    }
});
