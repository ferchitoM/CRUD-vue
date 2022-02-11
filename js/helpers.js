var helpers = {
  methods: {
    formatoMoneda(numero) {
      var formateado = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
      }).format(numero);

      return formateado;
    },

    make_resume(lista) {
      lista.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      let color_list = [
        "#3dcc68",
        "#546dc9",
        "#97f75b",
        "#b2fffc",
        "#dd99fc",
        "#d4ffaa",
        "#7c47d8",
        "#e8ab51",
        "#5dd367",
        "#2b6abc",
        "#84ffbd",
        "#67ebfc",
        "#1aa837",
        "#fce40c",
        "#f9cbc0",
        "#7bfc50",
        "#81db6f",
        "#2032aa",
        "#b36ee5",
        "#26e067",
        "#c4f7fc",
        "#d8602d",
        "#26abf2",
        "#db4234",
        "#18357c",
        "#f29bec",
        "#f2d868",
        "#d6cb3b",
        "#def9a4",
        "#6cf702",
        "#0b8e5a",
        "#3ac971",
        "#65d0f7",
        "#3c07ea",
        "#f9ff5e",
        "#87062d",
        "#35f8ff",
        "#c40d96",
        "#f9959c",
        "#f49ad2",
        "#e6a7f9",
        "#baffaf",
        "#7ca2ea",
        "#f4e53d",
        "#e9f40e",
        "#db6f95",
        "#d6ef73",
        "#e9ed74",
        "#5a8ec9",
        "#0c9988",
        "#b0a1ed",
        "#fcdcb5",
        "#93d83e",
        "#f4d3ad",
        "#db7db0",
        "#2b27ba",
        "#53d34a",
        "#271e89",
        "#573de5",
        "#db9c30",
        "#b219c6",
        "#eda6d4",
        "#d3a910",
        "#22e3f4",
        "#beffa0",
        "#7bb215",
        "#78fc6a",
        "#5fef4f",
        "#bfff7f",
        "#4ed378",
        "#7de820",
        "#9aed74",
        "#adffd6",
        "#bd2ad3",
        "#52d35d",
        "#5fe248",
        "#561b87",
        "#75c4d6",
        "#b2ffdd",
        "#5ea4e5",
        "#2496ad",
        "#76c942",
        "#37a7ad",
        "#5ca9bc",
        "#b52943",
        "#139364",
        "#2ce829",
        "#26c97a",
        "#c8b5f2",
        "#0de885",
        "#82d6e0",
        "#e29d36",
        "#ff63fc",
        "#51c3cc",
        "#67bdc6",
        "#dd3c39",
        "#8874c9",
        "#e273cc",
        "#651889",
        "#ed9ae4",
      ];

      let resume = [];
      let letra = "";

      lista.forEach((pro, index) => {
        let nombre = pro.nombre.split("");
        let color = color_list[index];

        if (letra != nombre[0]) {
          resume.push({ letra: nombre[0], color: color });
          letra = nombre[0];
        }
      });

      return resume;
    },
  },
};
