function CarroDeCompras() {
  this.productos = [];

  this.agregarProducto = function (producto) {
    this.productos.push(producto);
  };
  //console.log(this.productos)
  this.calcularValorTotalCarro = function () {
    this.totalProductos = 0;

    for (let i = 0; i < this.productos.length; i++) {
      console.log("****", this.productos[i].calcularPrecioPorProducto());
      this.totalProductos += this.productos[i].calcularPrecioPorProducto();
    }
    return this.totalProductos;
  };
  //listar carrito
  this.listarProductos = function () {
    console.log("lista carro", this.productos);
    return this.productos;
  };
  this.calcularTotalCompra = function() {
      this.totalCompra = 0
      for(let item of this.productos){
        console.log(item.nombre_producto)
        this.totalCompra += item.calcularTotalValorProducto()
      }
      return this.totalCompra
  }
}
//Descunetos, sobre la compra de 3 produtos te llevas un 30% en cada compra total de cada produto

function Producto(nombreProducto, precioProducto, cantidadProducto) {
  this.nombre_producto = nombreProducto;
  this.precio_producto = precioProducto;
  this.cantidad_producto = cantidadProducto;

  this.calcularPrecioPorProducto = function () {
    return this.precio_producto * this.cantidad_producto;
  };
  this.calcularDescProducto = function () {
    if (this.cantidad_producto > 3) {
      let dctoProducto = (this.calcularPrecioPorProducto() * 30) / 100;
      console.log("Descuento Producto", dctoProducto);
      return dctoProducto;
    } else {
      return "N/A";
    }
  };
  this.calcularTotalValorProducto = function () {
    if (isNaN(this.calcularDescProducto())) {
      return this.calcularPrecioPorProducto();
    } else {
      return this.calcularPrecioPorProducto() - this.calcularDescProducto();
    }
  };
}

$(function () {
  let miCarroDeCompras = new CarroDeCompras();
  

  $(".btn-agregar-producto").on("click", function () {
    //Obtengo los datos de html
    let nombreProducto = $(this).data("nombre");
    let precioProducto = parseInt($(this).data("precio"))
    let cantidadProducto = parseInt($(this).siblings(".cantidad-producto").val());
    //$('#elemento1').siblings();

    //Crear producto
    let producto = new Producto(
      nombreProducto,
      precioProducto,
      cantidadProducto
    );

    miCarroDeCompras.agregarProducto(producto);
    miCarroDeCompras.calcularTotalCompra()
    actualizarCarroCompra(miCarroDeCompras);
  });

  function actualizarCarroCompra(carroCompra) {
    let listaCarroCompra = $("#carrito tbody");
    let totalPagar = $("#total-pagar")
    listaCarroCompra.html("")
    
    let valorFinal = carroCompra.calcularTotalCompra()
    let valorFinalFormateado = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valorFinal)
    //totalPagar.html(valorFinal)
    let productosCarroCompra = carroCompra.listarProductos();
    console.log(productosCarroCompra);
    for (let i = 0; i < productosCarroCompra.length; i++) {
      let producto = productosCarroCompra[i];
      listaCarroCompra.append(`
            <tr>
            <td class="text-end">${producto.nombre_producto}</td>
            <td class="text-end">${producto.precio_producto}</td>
            <td class="text-end">${producto.cantidad_producto}</td>
            <td class="text-end">${producto.calcularDescProducto()}</td>
            <td class="text-end">${producto.calcularPrecioPorProducto()}</td>
            <td class="text-end">${producto.calcularTotalValorProducto()}</td>       
        </tr>
            `);
    }

   totalPagar.html(`Total a pagar: ${valorFinalFormateado}`)
  }
});
