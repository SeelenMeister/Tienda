$(document).ready(function() {
  refreshCart();
});

// Capturar click en boton "Añadir al carrito" y obtener el id del producto
//-- Ya no lo uso --//
$(document).on("click", ".add-cart", function() {
  let element = $(this)[0];
  let id_prod = $(element).attr("prod_id");
  console.log(id_prod);
});

// Capturar click en boton "X: Quitar del carrito" y obtener el id del producto
$(document).on("click", ".x-cart", function() {
  let element = $(this)[0];
  // let id_prod = $(element).attr("prod_id");
  console.log(element);
});

// --- CARRITO --- //

var global_cart = [];

function addCart(id) {
  let prev = store.get("cart");
  if (prev) {
    global_cart = store.get("cart");
  }
  let obj = {
    id: id,
    color: "negro",
    cantidad: 10
  };
  global_cart.push(obj);
  store.set("cart", global_cart);
  refreshCart();
  console.log(store.get("cart"));
}

function refreshCart() {
  let data = store.get("cart");
  let total = 0;
  let i = 0;
  let cart_sm_tmp = "";
  data.forEach(element => {
    $.ajax({
      url: "backend/extend-prod.php",
      type: "POST",
      data: { id: data[i].id },
      success: function(response) {
        let res = JSON.parse(response);
        total += parseFloat(res[0].price);
        cart_sm_tmp += `
              <!-- item -->
              <div class="row cart-item d-flex justify-content-center align-items-center" id="cart-id-${res[0].id}">
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
                  <p>Precio: $${res[0].price}</p>
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
  }); //end forEach
  setTimeout(function() {
    $("#cart-sm").html(cart_sm_tmp);
    $("#cart-count").html(i);
    $("#cart-total").html("Total: " + total);
  }, 1000);
}

function quitCart2(id) {
  let prev = store.get("cart");
  if (prev) {
    global_cart = store.get("cart");
  }
  var index = global_cart.findIndex(obj => obj.id == id);
  console.log("antes: "+global_cart);
  console.log("index :"+index);
  global_cart.splice(index, ++index);
  console.log("despues: "+global_cart);
  store.set("cart", global_cart);
  refreshCart();
  console.log(store.get("cart"));
}

function quitCart(id) {
  let element = "#cart-id-" + id;
  $(element).hide(1000);
  let data = store.get("cart");
  // console.log(data);
  // console.log("index of: "+id);
  var index = data.findIndex(obj => obj.id == id);
  console.log(data);
  // global_cart.splice(index);
  // store.remove("cart"[index]);
  // store.remove('cart').id == id;
  console.log(data);
  refreshCart();
  // console.log(index);
  data.each(function(value, key) {
    console.log(key, '==', value)
  })
}


store.set('Test2', '2do array')
store.forEach(element => {
  console.log(store.get(element))
})
