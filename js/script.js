console.clear();
const App = {
  mixins: [helpers],
  data() {
    return {
      lista_productos: [],
      mostrar_productos: [],
      item_factura: [],
      resume_prods: [],
      factura: null,
      cliente: null,
      search: "",
      modal_crearProd: null,
      nuevo_producto: null,
      errors: [],
    };
  },
  mounted() {
    let modal = document.getElementById("create_prod");
    this.modal_crearProd = M.Modal.init(modal, null);
  },
  created() {
    this.errors["nuevo_prod"] = {
      precio: "",
      codigo: "",
      nombre: "",
      inventario: "",
    };
    this.errors["nuevo_cliente"] = {};

    this.nuevo_producto = {
      precio: "",
      codigo: "",
      nombre: "",
      top: 0,
      imagen: "default.png",
      inventario: "",
    };

    this.cliente = {
      doc: "",
      nombre: "",
    };

    this.factura = {
      fecha: "",
      hora: "",
      numero: 1,
      doc_cliente: this.cliente.doc,
      nombre_cliente: this.cliente.nombre,
      iva: 0,
      bruto: 0,
      total: 0,
    };

    this.lista_productos = [
      {
        precio: 100000,
        codigo: 52020,
        nombre: "Pro x-100 - Ryzen 5 3600",
        top: 1,
        imagen: "gamer1.jpg",
        inventario: 51,
      },
      {
        precio: 150000,
        codigo: 454525,
        top: 0,
        nombre: "High Tech - Ryzen 5 3600",
        imagen: "gamer2.png",
        inventario: 42,
      },
      {
        precio: 160000,
        codigo: 98754,
        top: 1,
        nombre: "Hirez - Ryzen 5 3600",
        imagen: "gamer3.jpg",
        inventario: 74,
      },
      {
        precio: 120000,
        codigo: 87452,
        top: 0,
        nombre: "Ultrakill - Ryzen 5 3600",
        imagen: "gamer4.jpg",
        inventario: 76,
      },
      {
        precio: 110000,
        codigo: 55211,
        top: 0,
        nombre: "Maxproz - Ryzen 5 3600",
        imagen: "gamer1.jpg",
        inventario: 7,
      },
      {
        precio: 115000,
        codigo: 987872,
        nombre: "Sizen-T - Ryzen 5 3600",
        top: 1,
        imagen: "gamer1.jpg",
        inventario: 7,
      },
      {
        precio: 180000,
        codigo: 987541,
        top: 0,
        nombre: "UHD - Ryzen 5 3600",
        imagen: "gamer2.png",
        inventario: 5,
      },
      {
        precio: 150000,
        codigo: 785421,
        top: 0,
        nombre: "Xpu-50 - Ryzen 5 3600",
        imagen: "gamer3.jpg",
        inventario: 25,
      },
      {
        precio: 130000,
        codigo: 125544,
        top: 1,
        nombre: "Sacntum - Ryzen 5 3600",
        imagen: "gamer4.jpg",
        inventario: 5,
      },
      {
        precio: 140000,
        codigo: 465546,
        top: 1,
        nombre: "Aurora Lux - Ryzen 5 3600",
        imagen: "gamer1.jpg",
        inventario: 45,
      },
    ];

    this.mostrar_productos = this.lista_productos;

    this.resume_prods = this.make_resume(this.lista_productos);
  },
  methods: {
    insertar(codigo_buscar) {
      let item = this.mostrar_productos.find(
        (pro) => pro.codigo == codigo_buscar
      );

      existe = this.item_factura.find((pro) => pro.codigo == item.codigo);

      if (existe == undefined) {
        this.item_factura.push(item);
        item.selected = true;
        item.cantidad = 1;
        item.subtotal = item.precio;

        this.factura.total += item.subtotal;
        this.factura.iva = this.factura.total * 0.19;
        this.factura.bruto = this.factura.total - this.factura.iva;
      }
    },

    sumar(codigo_buscar) {
      item = this.item_factura.find((pro) => pro.codigo == codigo_buscar);
      if (item.cantidad < item.inventario) {
        this.factura.total -= item.subtotal;

        item.cantidad++;
        item.subtotal = item.cantidad * item.precio;

        this.factura.total += item.subtotal;
        this.factura.iva = this.factura.total * 0.19;
        this.factura.bruto = this.factura.total - this.factura.iva;
      }
    },

    restar(codigo_buscar) {
      item = this.item_factura.find((pro) => pro.codigo == codigo_buscar);
      if (item.cantidad > 1) {
        this.factura.total -= item.subtotal;

        item.cantidad--;
        item.subtotal = item.cantidad * item.precio;

        this.factura.total += item.subtotal;
        this.factura.iva = this.factura.total * 0.19;
        this.factura.bruto = this.factura.total - this.factura.iva;
      }
    },

    eliminar(codigo_buscar) {
      this.item_factura.forEach((prod, index) => {
        if (prod.codigo == codigo_buscar) {
          this.factura.total -= prod.subtotal;
          this.factura.iva = this.factura.total * 0.19;
          this.factura.bruto = this.factura.total - this.factura.iva;

          this.item_factura.splice(index, 1);
        }
      });

      item = this.mostrar_productos.find((pro) => pro.codigo == codigo_buscar);
      item.selected = false;
    },

    filtrar() {
      this.mostrar_productos = this.lista_productos.filter(
        (pro) =>
          (pro.nombre.toLowerCase().indexOf(this.search.toLowerCase()) > -1) |
          (pro.codigo.toString().indexOf(this.search) > -1)
      );
    },

    resumen(letra) {
      this.mostrar_productos = this.lista_productos.filter(
        (pro) => pro.nombre.toLowerCase().indexOf(letra.toLowerCase()) == 0
      );
    },

    crear_producto() {
      //*VALIDATE FORM
      let e = false;
      this.errors["nuevo_prod"] = {
        precio: "",
        codigo: "",
        nombre: "",
        inventario: "",
      };

      if (this.nuevo_producto.codigo <= 0) {
        this.errors.nuevo_prod.codigo = "El número es incorrecto";
        e = true;
      }

      if (this.nuevo_producto.nombre.length == 0) {
        this.errors.nuevo_prod.nombre = "El nombre es requerido";
        e = true;
      }

      if (this.nuevo_producto.precio <= 0) {
        this.errors.nuevo_prod.precio = "El número es incorrecto";
        e = true;
      }

      if (this.nuevo_producto.inventario <= 0) {
        this.errors.nuevo_prod.inventario = "El número es incorrecto";
        e = true;
      }

      if (e == false) {
        this.lista_productos.push(this.nuevo_producto);

        this.nuevo_producto = {
          precio: "",
          codigo: "",
          nombre: "",
          top: 0,
          imagen: "default.png",
          inventario: "",
        };

        this.modal_crearProd.close();
      }
    },
  },
};

Vue.createApp(App).mount("#app");
