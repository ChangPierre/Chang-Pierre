//caracteristicas del producto
let detalles = function (dat, det, nombre) {
    dat.text("");
    dat.append($('<div class="titulo"></div>')
        .append($('<span></span>').text(nombre)))
        .append($('<div class="conte"></div>')
        .append($('<ul></ul>').append($('<li></li>').text(det))));
};
//compra.
let compra2 = function () {
    let Compra = $("[data-id='compra']");
    Compra.text("");
    Compra.append($('<div></div>')
        .append($('<button onclick="cerrarCompra()"></button>')
        .append($('<i class="fa fa-remove"></i>')))
        .append($('<div class="shop"></div>')
        .append($('<div class="botones" style="position: relative"></div>')
        .append($('<p class="listo"><span>¡Listo, ya lo tienes en tu cesta!</span></p>'))
        .append($('<div class="boton"></div>')
        .append($('<button class="relizado" onclick="cerrarCompra()">Segir comprando</button>'))
        .append($('<button onclick="location.href = \'checkout\'">Realizar pedido</button>'))))));
    Compra.removeClass("hidden");
    $("body").addClass("overflowH");
};
//producto
let typeChangeProducto = function (ths) {
    let type = ths.val();
    let article = ths.parent().parent().parent().parent().parent();
    article.children("form").children(".tp").val(type);
    let prdt = PRODUCTO;
    let tt1 = article.children(".head").children(".price").children("span");
    let tt2 = article.children("form").children(".botoness").children("p").children("span");
    ths.parent().children("label").children(".boton_cant").children("input").val("1");
    let count = 1;
    cambioPrecio(tt1, prdt.type[type].precio, prdt.descuento, count);
    cambioPrecio(tt2, prdt.type[type].precio, prdt.descuento, count);
};
let countChangeProducto = function (ths) {
    let count = ths.val();
    let article = ths.parent().parent().parent().parent().parent().parent().parent();
    let tt1 = article.children(".head").children(".price").children("span");
    let tt2 = article.children("form").children(".botoness").children("p").children("span");
    let prdt = PRODUCTO;
    let type = ths.parent().parent().parent().children("input").val();
    cambioPrecio(tt1, prdt.type[type].precio, prdt.descuento, count);
    cambioPrecio(tt2, prdt.type[type].precio, prdt.descuento, count);
};
let minusChangeProducto = function (ths) {
    let cantidad = ths.parent().children("input");
    let limit = 1;
    minus(cantidad, limit);
    countChangeProducto(cantidad);
};
let plusChangeProducto = function (ths) {
    let form = ths.parent().parent().parent().parent().parent().parent();
    let cantidad = ths.parent().children("input");
    let type = form.children(".tp").val();
    let limit = PRODUCTO.type[type].stock;
    plus(cantidad, limit);
    countChangeProducto(cantidad);
};

let regresarinicio=function(){
    location.href = '/';
}
let addCheckProducto = function (ths) {
    if(USER != null){

        let form = ths.parent().parent().parent().children("form");
        let idProducto = form.children("input").val();
        let prdt = PRODUCTO;
        let type =  form.children(".tp").val();
        let li = form.children(".option").children("ul").children("li");
        let count = li.children("label").children(".boton_cant").children("input").val();
        if (1 <= count && count <= prdt.type[type].stock) {
            addCheck(prdt, type, count);
            location.href = '/';
            return true;
        } else {
            return false;
        }
    } else {
        login();
        return false
    }
};

let envioCheckProducto = function (ths) {
    if (addCheckProducto(ths)) {
        location.href = 'checkout';
    }
};

$(document).ready(function () {
        let producto = get("producto");
        if (producto === null) {
            location.href = 'home';
        }
        socket.emit("ObtenUnProducto",{idProducto:producto});
        socket.on("ObtenUnProducto.RPTA",function (prdt) {
            let Agotado = true;
            PRODUCTO = prdt;

            if(PRODUCTO === undefined){
                location.href = 'home';
            }

            let oldPrecio = precioSD(prdt.type[0].precio, 1);
            let precio = precioCD(oldPrecio, prdt.descuento);
            //algoritmo de sig_ant
            let ant_sig = $("[data-id='ant_sig']").text("");
            ant_sig.append(function () {
                let anterior = $('<a></a>');
                if(parseInt(producto) > 1){
                    anterior.attr("href", "producto?producto=" + (producto - 1));
                    anterior.append($('<i class="fa fa-angle-left"></i>')).append("Anterior");
                    return anterior;
                } else {
                    return "";
                }
            })
            .append($('<span></span>').text(" " + producto + "/" + prdt.num + " "))
            .append(function () {
                let siguiente = $('<a></a>');
                if(parseInt(producto) < parseInt(prdt.num)){
                    siguiente.attr("href", "producto?producto=" + ((producto - 0) + 1));
                    siguiente.append("Siguiente").append($('<i class="fa fa-angle-right"></i>'));
                    return siguiente;
                } else {
                    return "";
                }
            });
            //detalles del producto
            let detalle = $("[data-id='detalle']").text("");
            detalle.append($('<div class="head"></div>')
            .append($('<div class="nombre"></div>')
            .append($('<span></span>').text(prdt.nombre)))
            .append($('<div class="price"></div>')
            .append($('<span class="precio"></span>').text(precio + MONEDA))))
            .append($('<div class="producto listImagenes"></div>')
            .append($('<span class="up" onclick="javascrip:subirImg($(this),0)"><i class="fa fa-chevron-up"></i></span>'))
            .append(function(){
                let imagenes = $('<ul></ul>');
                imagenes.append($('<li class="active" onclick="javascript:cambiarImg($(this))"></li>')
                .append($('<figure></figure>')
                .append($('<img>').attr("src", prdt.imagenPrincipal).attr("alt", prdt.nombre))));
                for (let j in prdt.type) {
                    if(prdt.type[j].img != null){
                        let option = prdt.type[j];
                        imagenes.append($('<li onclick="javascript:cambiarImg($(this))"></li>')
                        .append($('<figure></figure>')
                        .append($('<img>').attr("src", option.img).attr("alt", prdt.nombre))));
                    }
                }
                return imagenes;
            })
                .append($('<span class="down pointer" onclick="javascrip:bajarImg($(this),0)"><i class="fa fa-chevron-down"></i></span>')))
            .append($('<div class="img"></div>')
            .append($('<figure class="imgPrincipal"></figure>')
            .append($('<img>').attr("src",  prdt.imagenPrincipal).attr("alt", prdt.nombre))))
            .append($('<form action="javascript:void(0)" class="conten"></form>')
            .append($('<input class="pro" type="hidden">').val(producto))
            .append($('<input class="tp" type="hidden">').val(0))
            .append(function(){
                if(prdt.caracteristica!= null){
                    return $('<div class="caract"></div>')
                    .append($('<span></span>').text(function(){
                        if(prdt.caracteristica.length > 200){
                            return prdt.caracteristica.slice(0, 200)+'...';
                        } else {
                            return prdt.caracteristica;
                        }
                    }))
                    .append(function(){
                        if(prdt.caracteristica.length>200 || prdt.caracteristica.length > 1){
                            return $('<a href="#caracteristicas">Leer más</a>');
                        }
                    });
                } else {
                    return "";
                }
            })
            .append($('<div class="option"></div>')
            .append(function () {
                let optiones = $('<ul></ul>');
                for (let j in prdt.type) {
                    let option = prdt.type[j];
                    if(option.stock > 0){
                        Agotado = false;
                        let precioTipo = precioCD(option.precio, prdt.descuento);
                        optiones.append($('<li class="checkbox"></li>')
                        .append($('<input type="radio" onchange="typeChangeProducto($(this))" name="producto">').val(j).attr("checked", (j == 0) ? true : false).attr("id", "producto_" + producto + "_" + j))
                        .append($('<label></label>').attr("for", "producto_" + producto + "_" + j)
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
                        .append($('<span class="precio"></span>').text(MONEDA + precioTipo))))
                        .append($('<span class="boton_cant buton"></span>')
                        .append($('<button class="fa fa-minus"></button>').attr("onclick", "minusChangeProducto($(this))"))
                        .append($('<input type="number" pattern="^[0-9]+" onchange="countChangeProducto($(this))" value="1" min="1" required>').attr("max", prdt.type[j].stock).attr("id", "cantidad_" + producto + "_" + j))
                        .append($('<button class="fa fa-plus"></button>').attr("onclick", "plusChangeProducto($(this))")))));
                    }
                }
                return optiones;
            }))
            .append(function () {
                let botones = $('<div class="botoness"></div>');
                if(Agotado!=true){
                    botones.append($('<p>Precio Total : </p>')
                    .append($('<span></span>').text(MONEDA + precio)));
                }
                if(Agotado){
                    botones.append($('<button class="agotado" onclick="javascript:regresarinicio()">Agotado</button>'));
                } else {
                    botones.append($('<button onclick="javascript:addCheckProducto($(this))">Añadir a la cesta</button>'));
                }

                return botones;
            }));
            if (prdt.caracteristica.length > 0) {
                detalles($("#caracteristicas"), prdt.caracteristica, "Características");
            }
            if (prdt.descripcion.length > 0) {
                detalles($("#descripcion"), prdt.descripcion, "Descripcion");
            }
        });
    });
