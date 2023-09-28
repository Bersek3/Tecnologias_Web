const inventario = {
    producto1: {
        nombre: "Libros",
        precio: 1000,
        stock: 1000
    },
    producto2: {
        nombre: "Lapiz",
        precio: 2000,
        stock: 1500
    },
    producto3: {
        nombre: "Cuadernos",
        precio: 3000,
        stock: 1000
    }
};

let esCritico = false;
for (const producto in inventario) {
    if (inventario[producto].stock < 1000) {
        console.log(`El producto ${inventario[producto].nombre} tiene un stock crítico de ${inventario[producto].stock} unidades.`);
        esCritico = true;
    }
}

if (esCritico) {
    console.log("El inventario está en estado critico.");
} else {
    console.log("El inventario está en buen estado.");
}