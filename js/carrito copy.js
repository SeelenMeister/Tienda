$(document).ready(function() {
  refreshCart();
});

// --- CARRITO --- //

function addCart(id, x) {
  let index = "cart-" + id;
  if (store.has(index)) {
    data = store.get(index);
    let obj = {
      id: id,
      cantidad: data.cantidad += x,
    };
    store.set(index, obj);
  } else {
    let obj = {
      id: id,
      cantidad: parseInt(x)
    };
    store.set(index, obj);
  }
  refreshCart();
}

function refreshCart() {
  let total = 0;
  let i = 0;
  let cart_sm_tmp = "";
  store.forEach(element => {
    data = store.get(element);
    let cantidad = 0;
    $.ajax({
      url: "backend/extend-prod.php",
      type: "POST",
      data: { id: data.id },
      beforeSend: function() {
        cantidad = data.cantidad;
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

function quitCart(id) {
  let element = "cart-" + id;
  $("#" + element).hide(1000);
  store.remove(element);
  refreshCart();
}

// Prod Extendido - Capturar click en boton "Añadir al carrito" y obtener el id del producto
$(document).on("click", ".add-cart", function() {
  let element = $(this)[0];
  let id_prod = $(element).attr("prod_id");
  let cantidad = $('#input-cantidad').val();
  addCart(id_prod , parseInt(cantidad));
});
