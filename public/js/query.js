//quitar acetos
var quitaacentos = function (r) {
    r = r.toLowerCase();
    r = r.replace(new RegExp(/\s/g), "");
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "n");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    return r;
};
//generacion de un filtro
var filtros = function (filtro) {
    return $('<li class="seccion"></li>')
        .append($('<div></div>')
        .append($('<a onclick="fil($(this))"></a>')
        .append(filtro.nombre)
        .append($('<i class="fa fa-flecha_desplegable"></i>'))))
        .append(function () {
        var ul = $('<ul></ul>');
        for (var j in filtro.option) {
            var option = filtro.option[j];
            ul.append($('<li class="checkbox"></li>')
                .append($('<input type="checkbox">').attr("id", option.name))
                .append($('<label></label>').attr("for", option.name).text(option.name)));
        }
        return ul;
    });
};
var fil = function (ths) {
    ths.parent().parent().toggleClass("active");
};
//main
$(document).ready(function () {
        var query = get("query");
        if (query === null) {
            location.href = 'home.html';
        } else {
            query = query.toLowerCase()
        }
        var page = get("page");
         if (page === null) {
            page = 0;
        }
        //algoritmo de generacion de filtros
        var filtro = $("[data-id='filtro']").text("");
        filtro.append($('<li class="seccion precio"></li>')
            .append($('<div></div>')
            .append($('<a onclick="fil($(this))"></a>')
            .append("Precio")
            .append($('<i class="fa fa-flecha_desplegable"></i>'))))
            .append($('<ul></ul>')
            .append($('<li></li>')
            .append($('<div class="barra"></div>'))
            .append($('<span class="punto min"></span>')
            .append($('<div></div>').text(10 + MONEDA)))
            .append($('<span class="punto max"></span>')
            .append($('<div></div>').text(75 + MONEDA)))
            .append($('<div class="rango min"></div>').text(1 + MONEDA))
            .append($('<div class="rango max"></div>').text(100 + MONEDA)))));
        for (var i in FILTROS) {
            filtro.append(filtros(FILTROS[i]));
        }

        //algoritmo de generacion de lista de productos
        var tam = 10;
        socket.emit("obtenerPorBusqueda", {text: query, limit: tam, offset: page});
        socket.on("obtenerPorBusqueda.RPTA",function (datos) {
            var maximo = Math.ceil(datos.count/ tam) - 1;
            var seccion = $("[data-id='seccion']").text("");
            var producto = $('<ul class="productos"></ul>');
            var pages = $("[data-id='pages']").text("");
            if (datos.count > 0) {
                page = Math.min(page, maximo);
                datos.productos.forEach(function (prdt) {
                    producto.append(pProducto(prdt));
                });
                seccion.append($('<h1></h1>')
                .append($('<span></span>').text("¡Hoy es tu día de suerte!")))
                .append($('<div></div>')
                .append($('<h2></h2>')
                .append($('<span></span>').text("Aquí tienes " + datos.count + " productos para tu búsqueda \"" + query + "\" ¡Elige el que más te guste!")))
                .append(producto));

                //algoritmo de generacion de pages
                pages.append(paginas(page, tam, datos.count, ""));
            } else {
                seccion.append($('<h1></h1>')
                .append($('<span>No hay resultados de tu busqueda - Intenta denuevo</span>')))
            }
        });
});
