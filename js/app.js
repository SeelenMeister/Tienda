$(document).ready(function() {
  $("#info-extend").hide();
  $("#full-carrito").hide();
  getProductos();
});

// Capturar click cerrar
$(document).on("click", ".btn-danger", function() {
  $("#info-extend").hide(1000);
});

// Capturar click en boton "Mas info" y obtener el id del producto
$(document).on("click", ".mas-info", function() {
  let element = $(this)[0];
  let id_element = $(element).attr("prod_id");
  extendProd(id_element);
});

// Capturar click en thumbnails img.
$(document).on("click", ".img-thumb", function() {
  $(".img-thumb").removeClass("border border-success");
  let element = $(this)[0];
  let url = $(element).attr("src");
  $(element).addClass("border border-success");
  imgPrincipal(url);
});

// Capturar click ver-carrito
$(document).on("click", "#ver-carrito", function() {
  $("#info-extend").hide(1000);
  $("#productos").hide(1000);
  getFullCart();
  $("#full-carrito").show(1000);

});

// --- PINTA LOS PRODUCTOS EN LA PAGINA PRINCIPAL --- //
function getProductos() {
  $.ajax({
    url: "backend/get-prod.php",
    type: "GET",
    success: function(response) {
      let productos = JSON.parse(response);
      let prod_tmp = "";
      productos.forEach(prod => {
        prod_tmp += `
                  <!-- Flip Card -->
                  <div class="col">
                    <div class="flip-card m-2">
                      <div class="flip-card-inner">
                        <div class="flip-card-front">
                          <img
                            src="${prod.img}"
                            alt="neko"
                            style="width:300px;height:300px;"
                          />
                        </div>
                        <!-- Cardback -->
                        <div class="flip-card-back bg-logo">
                          <div
                            class="d-flex align-items-center flex-column"
                            style="height: 300px;"
                          >
                            <div class="p-2">
                              <strong>${prod.p_name}</strong>
                            </div>
                            <div class="p-2">
                              <p>${prod.p_desc}</p>
                            </div>
                            <div class="p-2">Precio: $ ${prod.price}</div>
                            <div class="p-2 mt-auto">
                              <div class="row d-flex">
                                <div class="col">
                                  <button type="button" class="btn btn-secondary btn-sm btn-block" onclick="addCart(${prod.id}, 1)">
                                    AlCarrito!
                                  </button>
                                </div>
                                <div class="col">
                                  <button type="button" class="btn btn-primary btn-sm btn-block mas-info" prod_id="${prod.id}">
                                    Más info!
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END Flip Card -->
                  `;
      });
      $("#productos").html(prod_tmp);
    }
  });
}

// --- EXTENDER PRODUCTO --- //

// Funcion principal extender
function extendProd(id) {
  $.ajax({
    url: "backend/extend-prod.php",
    type: "POST",
    data: { id: id },
    beforeSend: function() {
      $("#info-extend").hide(500);
    },
    success: function(response) {
      let prod = JSON.parse(response);
      let prod_name = prod[0].p_name;
      let extend_tmp = `
              <!-- INFORMACION EXTENDIDA -->
                <div class="row">
                  <div class="col-md-3 col-sm-5 m-1" >
                  <div id="img_principal">
                    <img
                      src="${prod[0].img}"
                      alt="${prod[0].p_name}"
                      style="width:300px;height:300px;"
                    />
                    </div>
                    <div class="d-flex justify-content-start" id="p_img-">
                      <img
                        src="img/logo.jpg"
                        alt="Avatar"
                        style="width:70px;height:70px;"
                        class="m-1"
                      />
                    </div>
                  </div>
  
                  <div class="col-md-8 col-sm-7 ml-4">
                    <p><strong>${prod[0].p_name}</strong></p>
                    <p>
                      Descripcion: ${prod[0].p_desc}
                    </p>
                    <p>Precio: $ ${prod[0].price}</p>
                    Cantidad:
                    <input type="number" value="1" id="input-cantidad" />
                    <br />
                    <div class="container mt-4">
                      <button type="button" class="btn btn-success add-cart" prod_id="${prod[0].id}">
                        Añadir al carrito
                      </button>
                      <button type="button" class="btn btn-danger">Cerrar Info</button>
                    </div>
                  </div>
                </div>
              <!-- END - INFORMACION EXTENDIDA -->
              `;
      $("#info-extend").html(extend_tmp);
      $("#info-extend").show(1000);
      extendImg(id, prod_name, "");
    }
  });
}

// Busca y pinta las imágenes adicionales a la principal.
function extendImg(id, name, index) {
  $.ajax({
    url: "backend/extend-img.php",
    type: "POST",
    data: { id: id },
    success: function(response) {
      let img = JSON.parse(response);
      let img_tmp = "";
      img.forEach(img => {
        img_tmp += `
                <img
                src="${img.url}"
                alt="${name}" 
                class="img-thumb m-1" 
                style="width:70px;height:70px;"
                class="m-1"
              />
                `;
      });
      $("#p_img-"+index).html(img_tmp);
    }
  });
}

// Cambia la imagen principal mostrada.
function imgPrincipal(url) {
  let img_principal = `
      <img
      src="${url}"
      style="width:300px;height:300px;"
      />
      `;
  $("#img_principal").html(img_principal);
}
