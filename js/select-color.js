// Capturar click en boton "Añadir Color" y obtener el id del producto
$(document).on("click", ".add-color", function(e) {
  e.preventDefault();
  let element = $(this)[0];
  let id_prod = $(element).attr("prod_id");
  let index = "producto-" + id_prod;
  let color = $("#select-color-" + index).val();
  let cantidad = $("#select-cantidad-" + index).val();
  addColor(id_prod, color, cantidad);
});

var global_cart = [];
var global_total = [];

function addColor(id, color, cantidad) {
  let index = "producto-" + id;
  let color_array = [];
  let color_obj = {
    id: id,
    nombre: color,
    cantidad: cantidad
  };
  if (global_cart[index]) {
    color_array = global_cart[index];
  }
  color_array.push(color_obj);
  global_cart[index] = color_array;
  refreshColor(index);
}

function quitColor(id, color) {
  let index = "producto-" + id;
  var index2 = global_cart[index].findIndex(obj => obj.nombre == color);
  global_cart[index].splice(index2, 1);
  refreshColor(index);
}

function refreshColor(index) {
  let tmp = "";
  let precio = $("#precio-" + index).val();
  let total = 0;
  global_cart[index].forEach(obj => {
    let subtotal = obj.cantidad * precio;
    tmp += `
    <p>
    ${obj.nombre} - ${obj.cantidad} x $${precio} = $${subtotal.toFixed(2)}
    <i class="fas fa-times fa-lg delete-item x-cart" onclick='quitColor(${
      obj.id
    },"${obj.nombre}")'></i>
  </p>
    `;
    total += subtotal;
  });
  setTimeout(function() {
    $("#colores-" + index).html(tmp);
    $("#subtotal-" + index).html("SubTotal : $" + total.toFixed(2));
    global_total[index] = total.toFixed(2);
    fullTotal();
  }, 500);
}

function fullTotal() {
  let full_total = 0;
  global_productos.forEach(index => {
    if (global_total[index] == undefined) {
      full_total += 0;
    } else {
      full_total += parseFloat(global_total[index]);
    }
  }); // End forEach
  $("#full-total").html("Total: $" + full_total); // Resultado de la funcion.
}
