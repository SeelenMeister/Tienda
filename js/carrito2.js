// Init
$(document).ready(function() {
  refreshCart();
  getFullCart();
});

function addCart(idProducto, cantidad) {
  let prevCart = Vars.get("carrito") || {};
  let index = "cart-" + idProducto;
  if (prevCart[index] != undefined) {
    prevCart[index].cantidad += cantidad;
  } else {
    prevCart[index] = {
      id: idProducto,
      cantidad: parseInt(cantidad)
    };
  }
  Vars.set("carrito", prevCart, true);
  refreshCart();
}

// --------------
forEachObj(prevCart, function(value, prop) {
  console.log(value);
});
// --------------

function refreshCart() {
  let total = 0;
  let i = 0;
  let cart_sm_tmp = "";
  data = Vars.get("carrito");
  forEachObj(data, function(value, prop) {
    let cantidad = 0;
    $.ajax({
      url: "backend/extend-prod.php",
      type: "POST",
      data: { id: value.id },
      beforeSend: function() {
        cantidad = value.cantidad;
      },
      success: function(response) {
        let res = JSON.parse(response);
        let precio = parseFloat(res[0].price) * parseFloat(cantidad);
        total += precio;
        cart_sm_tmp += `
                <!-- item -->
                <div class="row cart-item d-flex justify-content-center align-items-center" id="cart-${res[0].id}">
                  <div class="col-3">
                    <img
                      src="${res[0].img}"
                      alt="${res[0].p_name}"
                      style="width:60px;height:60px;"
                    />
                  </div>
                  <div class="col-4">
                    <p>${res[0].p_name}</p>
                  </div>
                  <div class="col-3">
                    <p>Cantidad: ${cantidad} x $${res[0].price}</p>
                  </div>
                  <div
                    class="col-2 d-flex justify-content-center align-items-center"
                  >
                  <form action="#"><i class="fas fa-times fa-lg delete-item x-cart" onclick="quitCart(${res[0].id})"></i></form>
                  </div>
                </div>
                <!-- fin item -->
                `;
      }
    }); // end Ajax
    i++;
  }); // end forEach
  setTimeout(function() {
    $("#cart-sm").html(cart_sm_tmp);
    $("#cart-count").html(i);
    $("#cart-total").html("Total: $" + total.toFixed(2));
  }, 900);
}

function getFullCart() {
  let cart_full_tmp = "";
  forEachObj(data, function(value, prop) {
    data = Vars.get("carrito");
    $.ajax({
      url: "backend/extend-prod.php",
      type: "POST",
      data: { id: data.id },
      beforeSend: function() {
        cantidad = data.cantidad; // DATA = Obj en LocalStore // RES = Resultado Ajax
      },
      success: function(response) {
        let res = JSON.parse(response);
        let index = "producto-" + res[0].id;
        global_productos.push(index);
        cart_full_tmp += `
          <!-- CARRITO ITEM EXTENDED -->
          <div class="container border mt-1 border-success rounded">
            <div class="row">
              <div class="col-md-4 col-sm-5 m-1">
                <div id="img_principal">
                  <img
                    src="${res[0].img}"
                    alt="${res[0].p_name}"
                    style="width:300px;height:300px;"
                  />
                </div>
                <div class="d-flex justify-content-start" id="p_img-${index}">
              </div>
              </div>
  
              <div class="col-md-4 col-sm-7 ml-4">
                <p><strong>${res[0].p_name}</strong></p>
                <p>
                  Descripcion: ${res[0].p_desc}
                </p>
                <input id="precio-${index}" type="hidden" value="${res[0].price}">
                <p>Precio: $ ${res[0].price}</p>
              </div>
              <div class="col">
                <!-- SELECTOR DE COLOR -->
                <div class="container mt-4">
                  <form action="#" class="border p-2">
                    <div class="form-group">
                      <label for="selectcolor">Color: </label>
                      <select class="form-control-sm" id="select-color-${index}">
                        <option value="Verde?">Verde - Stock: 20</option>
                        <option value="Azul?">Azul - Stock: 5</option>
                        <option value="Negro?">Negro - Stock: 7</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="Cantidad:">Cantidad: </label>
                      <input
                        class="form-control-sm"
                        type="number"
                        value="1"
                        id="select-cantidad-${index}"
                        min="1"
                        max="5"
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success add-color"
                      prod_id="${res[0].id}"
                    >
                      Añadir Color
                    </button>
                  </form>
                </div>
                <br />
                <!-- END - SELECTOR DE COLOR -->                    
                <div id="colores-${index}"> <!-- Acá van los colores seleccionados -->
                </div>
                <p class="pink-line d-block">&nbsp</p>
                <p class="subtotal" id="subtotal-${index}">SubTotal : $0</p>
                <input id="full-total-${index}" type="hidden" value="${res[0].price}">
              </div>
            </div>
          </div>
          <!-- END - CARRITO ITEM EXTENDED -->
                `;
      }
    }); // end Ajax
  }); // end forEach
  setTimeout(function() {
    $("#full-cart").html(cart_full_tmp);
  }, 900);
}
