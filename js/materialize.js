var options = [
    { selector: '.product-list', offset: 500, callback: 'Materialize.fadeInImage(".product-list")' }
];
Materialize = M.AutoInit();
Materialize.scrollFire(options);