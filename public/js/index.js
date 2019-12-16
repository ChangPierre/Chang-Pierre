//main
$(document).ready(function () {
    var page = get("page");
    if (page === null) {
        page = 0;
    }
    //algoritmos de generacion de banner
    var banner = $("[data-id='banner']").text("");
    socket.emit("ObtenerBannerCount");
    socket.on("ObtenerBannerCount.RPTA", function (num) {
        if(num>0){
            banner.append(function () {
                var bannerlist = $('<ul class="bannerlist"></ul>');
                socket.emit("ObtenerBanner");
                socket.on("ObtenerBanner.RPTA", function (banners) {
                    banners.forEach(function (bannerOpcion) {
                        bannerlist.append($('<li></li>').append($('<a></a>').attr("href", bannerOpcion.url).append($('<img>').attr("src", bannerOpcion.img).attr("alt", bannerOpcion.url))));
                    });
                });
                return bannerlist;
            }).append(function () {
                var bannerNav = $('<ul class="bannerNav"></ul>');
                bannerNav.append($('<li class="activeBanner" onclick="changeBanner($(this))"></li>'));
                num--;
                while (num--) {
                    bannerNav.append($('<li onclick="changeBanner($(this))"></li>'));
                }
                return bannerNav;
            });
        } else {
            $("[data-id='banner']").parent($("section")).addClass("hidden");
        }
    });

    //algoritmo de generacion de banner de mini productos
    var vend = 5;
    socket.emit("ObtenerMasVendidosCount");
    socket.on("ObtenerMasVendidosCount.RPTA", function (num) {
        if(num > vend ){
            socket.emit("ObtenerMasVendidos",{limit:vend});
            socket.on("ObtenerMasVendidos.RPTA",function (productos) {
                var miniProducto1 = $("[data-id='miniProductos1']").text("");
                productos.forEach(function (prdt) {
                    miniProducto1.append(mProducto(prdt));
                });
                productos.forEach(function (prdt) {
                    miniProducto1.append(mProducto(prdt));
                });
            });
        } else {
            $("[data-id='miniProductos1']").parent($("section")).addClass("hidden");
        }
    });

    //algoritmo de generacion de lista de productos
    var tam = 8;
    socket.emit("ObtenProductos", {limit: tam, offset: page});
    socket.on("ObtenProductos.RPTA",function (datos) {
        var maximo = Math.ceil(datos.count/ tam) - 3;
        var Producto = $("[data-id='Productos']").text("");
        var pages = $("[data-id='pages']").text("");
        if (datos.count > 0) {
            page = Math.min(page, maximo);
            datos.productos.forEach(function (prdt) {
                Producto.append(pProducto(prdt));
            })
            //algoritmo de generacion de pages
            pages.append(paginas(page, tam, datos.count, ""));
        }
    });
});
