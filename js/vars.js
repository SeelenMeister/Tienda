var Vars = {

    /**
        * @memberof Vars
        * @method clearSession
        * @description Elimina todas las variables almacenadas en el framework
    */
    clearSession: function () {
        sessionStorage.clear();
    },


    /**
        * @memberof Vars
        * @method set
        * @param path {string} Nombre de la variable a almacenar
        * @param value {object} Valor de la variable a almacenar
        * @param persistent {bool} Determina si se debe persistir en memoria volatil la variable en cuestion
        * @description Setea una variable en memoria
    */
    set: function (path, value, persistent) {
        if (typeof persistent === 'undefined') {
            persistent = false;
        }

        if (typeof value === 'undefined' || value===null) {
            sessionStorage.removeItem(name);
            localStorage.removeItem(name);
            return;
        }

        value = JSON.stringify(value);

        sessionStorage[path] = value;
        if (persistent) {
            localStorage[path] = value;
        }
    },

    /**
        * @memberof Vars
        * @method get
        * @param path {string} Nombre de la variable a obtener
        * @param def {object} Valor default a devolver en caso de no encontrar la variable
        * @description Obtiene el valor de una variable o un default.
    */
    get: function (path, def) {
        var ret = def;
        if (sessionStorage[path] != null)
            ret = sessionStorage[path];
        else if (localStorage[path] != null)
            ret = localStorage[path];
        if (ret === def)
            return def;
        try {
            return JSON.parse(ret);
        } catch (ex) {
        }
        return ret;
    },

    /**
        * @memberof Vars
        * @method exists
        * @param path {string} Nombre de la variable a consultar existencia
        * @description Consulta existencia de una variable.
    */
    exist: function (path) {
        return sessionStorage[path] != null || localStorage[path] != null;
    },

    /**
        * @memberof Vars
        * @method remove
        * @param path {string} Nombre de la variable a eliminar
        * @description Elimina una variable del framework.
    */
    remove: function (path) {
        sessionStorage.removeItem(path);
        localStorage.removeItem(path);
    },
};

// *@ForEach para objetos !
function forEachObj(objeto, callback, scope) {
    for (var prop in objeto) {
        if (Object.prototype.hasOwnProperty.call(objeto, prop)) {
            callback.call(scope, objeto[prop], prop, objeto);
        }
    }
}
