const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.set("Server", server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// sessions
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET || '123456789-secret', resave: false, saveUninitialized: false}));

// routers
const sessionRouter = require("./routes/session.js");

const indexRouter = require("./routes/index.js");
const queryRouter = require("./routes/query.js");
const productoRouter = require("./routes/producto.js");
const checkoutRouter = require("./routes/checkout.js");
const othersRouter = require("./routes/others.js");

app.use("/session", sessionRouter);

app.use('/', indexRouter);
app.use("/query", queryRouter);
app.use("/producto", productoRouter);
app.use("/checkout", checkoutRouter);
app.use("/others", othersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// models
const BannerModel = require("./models/banner.js");
const CaracteristicaModel = require("./models/caracteristica.js");
const ClienteModel = require("./models/cliente.js");
const DireccionModel = require("./models/direccion.js");
const ImgModel = require("./models/img.js");
const MenuModel = require("./models/menu.js");
const ProductoModel = require("./models/productos.js");
const SubMenuModel = require("./models/submenu.js");
const TargetaModel = require("./models/targeta.js");
const UsuarioModel = require("./models/usuario.js");
const VentaModel = require("./models/venta.js");

// sockets
io.sockets.on("connection", (socket) => {
	socket.on("Logearse", (dato) => {
		ClienteModel.obtenerId(dato.email, dato.pass).then(cliente => {
			if (cliente != null) {
				DireccionModel.obtenerPorClienteLimit(cliente.idCliente, 1).then(function (direccion) {
					TargetaModel.obtenerPorClienteLimit(cliente.idCliente, 1).then(function (targeta) {
						Object.assign(cliente, direccion);
						Object.assign(cliente, targeta);
						socket.emit("Logearse.RPTA", cliente);
					});
				});
			} else {
				socket.emit("Logearse.RPTA", null);
			}
		});
	});
	socket.on("Registrarse", (dato) => {
		ClienteModel.insertar(dato.email, dato.pass,dato.nombre).then(dato => {
			socket.emit("Registrarse.RPTA", dato);
		});
	});
	socket.on("ObtenerUser", (dato) => {
		ClienteModel.obtenerPorId(dato.idCliente).then(cliente => {
			DireccionModel.obtenerPorClienteLimit(cliente.idCliente,1).then(function (direccion) {
				TargetaModel.obtenerPorClienteLimit(cliente.idCliente,1).then(function (targeta) {
					Object.assign(cliente, direccion);
					Object.assign(cliente, targeta);
					socket.emit("ObtenerUser.RPTA", cliente);
				})
			})
		});
	});
	socket.on("ObtenerMenu", () => {
		let Menu = [];
		SubMenuModel.obtenerPorMenu().then(menu => {
			let id = -1;
			menu.forEach(elem => {
				if (id !== elem.idMenu) {
					id = elem.idMenu;
					Menu.push({"idMenu": elem.idMenu, "nombre": elem.nombre, "sub": [{"idSubmenu": elem.idSubmenu, "nombre": elem.subnombre}]});
				} else {
					Menu[elem.idMenu - 1].sub.push({"idSubmenu": elem.idSubmenu, "nombre": elem.subnombre});
				}
			});
			socket.emit("ObtenerMenu.RPTA", Menu);
		});
	});
	socket.on("ObtenerBanner",function () {
		BannerModel.obtener().then(function (banners) {
			socket.emit("ObtenerBanner.RPTA",banners);
		})
	});
	socket.on("ObtenerBannerCount",function () {
		BannerModel.obtenerCount().then(function (num) {
			socket.emit("ObtenerBannerCount.RPTA",num.count);
		})
	});
	socket.on("ObtenProductos", (dato) => {
		ProductoModel.obtenerAlgunos(dato.limit, dato.offset).then(productos => {
			ProductoModel.countFilas().then(num => {
				socket.emit("ObtenProductos.RPTA", {count: num.count, productos: productos});
			});
		});
	});
	socket.on("ObtenProductoscountFilas", (dato) => {
		ProductoModel.countFilas().then(num => {
			socket.emit("ObtenProductoscountFilas.RPTA", num.count);
		});
	});
	socket.on("ObtenUnProducto", (dato) => {
		ProductoModel.obtenerPorId(dato.idProducto).then(producto => {
			CaracteristicaModel.obtenerPorProductoId(dato.idProducto).then(caracteristicas => {
				ProductoModel.countFilas().then(num => {
					producto.type = caracteristicas;
					producto.num = num.count;
					socket.emit("ObtenUnProducto.RPTA", producto);
				});
			});
		});
	});
	socket.on("ObtenerMasVendidosCount", () => {
		ProductoModel.obtenerMasVendidosCount().then(num => {
			socket.emit("ObtenerMasVendidosCount.RPTA", num.count);
		});
	});
	socket.on("ObtenerMasVendidos", (dato) => {
		ProductoModel.obtenerMasVendidos(dato.limit).then(productos => {
			socket.emit("ObtenerMasVendidos.RPTA", productos);
		});
	});
	socket.on("ObtenerHistorial", (dato) => {
		VentaModel.obtenerHistorial(dato.idCliente).then(venta => {
			socket.emit("ObtenerHistorial.RPTA", venta);
		});
	});
	socket.on("ObtenerVentaTipo", (dato) => {
		VentaModel.obtenerPorTipo(dato.idCliente,dato.tipo).then(venta => {
			socket.emit("ObtenerVentaTipo.RPTA", venta);
		});
	});
	socket.on("ObtenerVentaTipoCount", (dato) => {
		VentaModel.obtenerPorTipoCount(dato.idCliente,dato.tipo).then(num => {
			socket.emit("ObtenerVentaTipoCount.RPTA", num.count);
		});
	});

	socket.on("InsertarVenta", (dato) => {
		VentaModel.obtenerPorTipoCarac(dato.idCliente,dato.idCaracteristica,dato.tipo).then(function (obj) {
			if(obj === undefined){
				VentaModel.insertar(dato.idCliente,dato.idCaracteristica,dato.cantidad,dato.tipo).then(function (rpta) {
					socket.emit("InsertarVenta.RPTA", 1);
				});
			} else {
				VentaModel.actualizarCantidad(obj.idVenta,dato.cantidad).then(function (rpta) {
					socket.emit("InsertarVenta.RPTA", 0);
				});
			}
		})
	});
	socket.on("ActualizarCantidad", (dato) => {
		VentaModel.actualizarCantidad(dato.idVenta,dato.cantidad);
	});
	socket.on("RemoveItemVent",function (dato) {
		VentaModel.eliminar(dato.idVenta);
	})
	socket.on("ActualizarClienteName",function (dato) {
		ClienteModel.actualizarDatos(dato.idCliente,dato.nombre,dato.apellido).then(function (rpta) {
			socket.emit("ActualizarClienteName.RPTA",rpta);
		})
	});
	socket.on("ActualizarClienteEmail",function (dato) {
		ClienteModel.actualizarEmail(dato.idCliente,dato.email).then(function (rpta) {
			socket.emit("ActualizarClienteEmail.RPTA",rpta);
		})
	});
	socket.on("ActualizarClientePass",function (dato) {
		ClienteModel.actualizarPass(dato.idCliente,dato.pass).then(function (rpta) {
			socket.emit("ActualizarClientePass.RPTA",rpta);
		})
	});
	socket.on("ActualizarClienteDireccion",function (dato) {
		DireccionModel.insertar(dato.idCliente, dato.direccion1, dato.direccion2, dato.pais, dato.provincia, dato.ciudad, dato.postal, dato.telefono).then(function (rpta) {
			socket.emit("ActualizarClienteDireccion.RPTA",rpta);
		})
	});
	socket.on("ActualizarClienteTarjeta",function (dato) {
		TargetaModel.insertar(dato.idCliente, dato.numero, dato.mes, dato.anio, dato.codigo).then(function (rpta) {
			socket.emit("ActualizarClienteTarjeta.RPTA",rpta);
		})
	});
	socket.on("RealizarCompra",function (dato) {
		VentaModel.obtenerMaxTipo(dato.idCliente).then(function (tipo) {
			VentaModel.actualizarTipo(dato.idCliente,0,parseInt(tipo.max )+ 1).then(function (rpta) {
				socket.emit("RealizarCompra.RPTA",rpta);
			})
		})
	});
	socket.on("obtenerPorBusqueda", (dato) => {
		console.log(dato);
		ProductoModel.obtenerPorBusqueda(dato.text,dato.limit, dato.offset).then(productos => {
			ProductoModel.countFilasPorBusqueda(dato.text).then(num => {
				console.log(productos);
				console.log(num);
				socket.emit("obtenerPorBusqueda.RPTA", {count: num.count, productos: productos});
			});
		});
	});
});

module.exports = app;
