const conexion = require("../conection");

module.exports = {
	async insertar(nombre, idMenu) {
		return await conexion.query('INSERT INTO public."Submenu"( nombre, "idMenu" ) VALUES ($1, $2)', [nombre, idMenu]);
	},
	async obtener() {
		const resultados = await conexion.query('SELECT * FROM public."Submenu" ORDER BY "idSubmenu"');
		return resultados.rows;
	},
	async obtenerPorId(id) {
		const resultados = await conexion.query('SELECT * FROM public."Submenu" WHERE "idSubmenu"=$1', [id]);
		return resultados.rows[0];
	},
	async obtenerPorMenu() {
		const resultados = await conexion.query('SELECT public."Menu"."idMenu", "idSubmenu", public."Menu".nombre, public."Submenu".nombre as subNombre FROM public."Submenu" INNER JOIN public."Menu" ON public."Submenu"."idMenu"=public."Menu"."idMenu" order by public."Menu"."idMenu","idSubmenu"');
		return resultados.rows;
	},
	async obtenerPorIdMenu(id) {
		const resultados = await conexion.query('SELECT * FROM public."Submenu" WHERE "idMenu"=$1 ORDER BY "idSubmenu"', [id]);
		return resultados.rows;
	},
	async actualizar(id, nombre, idMenu) {
		return conexion.query('UPDATE public."Submenu" SET nombre=$2, idMenu=$3 WHERE "idSubmenu"=$1', [id, nombre, idMenu]);
	},
	async eliminar(id) {
		return conexion.query('DELETE FROM public."Submenu" WHERE "idSubmenu"=$1', [id]);
	}
};
