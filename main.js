const readline = require('readline');
const fs = require('fs/promises');

let pause

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      resolve(respuesta);
    });
  });
}

class Videojuego {
    constructor (titulo, desarrollador, anoLanzamiento, genero, rating) {
        this.titulo = titulo
        this.desarrollador = desarrollador
        this.anoLanzamiento = anoLanzamiento
        this.genero = genero
        this.rating = rating
    }
}

class Gestor {
    constructor () {
        this.videojuegos = []
    }

    async leerdatos() {
        try {
            const datos = await fs.readFile("db.json", 'utf8');
            this.videojuegos = JSON.parse(datos);
        } catch (error) {
            console.error("Error al leer los datos");
            this.videojuegos = [];
        }
    }

    async escribirdatos() {
        try {
            const datosparseados = JSON.stringify(this.videojuegos, null, 2);
            await fs.writeFile("db.json", datosparseados, 'utf8');
        } catch (error) {
            console.error("Error al escribir los datos");
        }
    }

    async registrarVideojuego (titulo, desarrollador, anoLanzamiento, genero, rating) {

        this.videojuegos[0].push(new Videojuego(titulo, desarrollador, parseInt(anoLanzamiento), genero, parseInt(rating)))
        console.log("Videojuego registrado con exito!")

    }

    async ordenarPor(campo){

        for (let i = 0; i < (this.videojuegos[0].length - 1); i++){
            for (let j = 0; j < (this.videojuegos[0].length - 1 - i); j++){
                if (this.videojuegos[0][j][campo] > this.videojuegos[0][j+1][campo]){ 
                    let aux = this.videojuegos[0][j];
                    this.videojuegos[0][j] = this.videojuegos[0][j+1];
                    this.videojuegos[0][j+1] = aux;
                }
            }
        }

        console.table(this.videojuegos[0])
    }

    async filtrarPor (campo, valor) {
        for (let i = 0; i < this.videojuegos[0].length; i++){
            if (this.videojuegos[0][i][campo] == valor){
                console.log(`Titulo: ${this.videojuegos[0][i]["titulo"]} | Desarrollador: ${this.videojuegos[0][i]["desarrollador"]} | Año de lanzamiento: ${this.videojuegos[0][i]["anoLanzamiento"]} | Genero: ${this.videojuegos[0][i]["genero"]} | Rating: ${this.videojuegos[0][i]["rating"]} `)
            }
        }
    }

    esRetro(videojuego) {
        if (videojuego["anoLanzamiento"] < 2010) {
            return true
        }
        else{
            return false
        }
    }

    async juegosRetro() {
        for (let i = 0; i < this.videojuegos[0].length; i++){
            if(this.esRetro(this.videojuegos[0][i])){
                console.log(`Titulo: ${this.videojuegos[0][i]["titulo"]} | Desarrollador: ${this.videojuegos[0][i]["desarrollador"]} | Año de lanzamiento: ${this.videojuegos[0][i]["anoLanzamiento"]} | Genero: ${this.videojuegos[0][i]["genero"]} | Rating: ${this.videojuegos[0][i]["rating"]} `)
            }
        }
    }

    async registrarFavorito(titulo){
        let encontrado = false
        for(let i = 0; i < this.videojuegos[0].length; i++){
            if(this.videojuegos[0][i]["titulo"] == titulo) {
                encontrado = true
                this.videojuegos[1].push(this.videojuegos[0][i])
            }
        }

        if (!encontrado) {
            console.error(`Error: no existe ${titulo} en los registros`)
        }

        else{
            console.log("Videojuego registrado en favoritos con exito!")
        }
    }

    listarJuegos(){
        for (let i = 0; i < this.videojuegos[0].length; i++){
                console.log(`Titulo: ${this.videojuegos[0][i]["titulo"]} | Desarrollador: ${this.videojuegos[0][i]["desarrollador"]} | Año de lanzamiento: ${this.videojuegos[0][i]["anoLanzamiento"]} | Genero: ${this.videojuegos[0][i]["genero"]} | Rating: ${this.videojuegos[0][i]["rating"]} `)
        }
    }

    listarFavoritos(){
        for (let i = 0; i < this.videojuegos[1].length; i++){
                console.log(`Titulo: ${this.videojuegos[1][i]["titulo"]} | Desarrollador: ${this.videojuegos[1][i]["desarrollador"]} | Año de lanzamiento: ${this.videojuegos[1][i]["anoLanzamiento"]} | Genero: ${this.videojuegos[1][i]["genero"]} | Rating: ${this.videojuegos[1][i]["rating"]} `)
        }
    }


}


async function menu () {
    
    const gestor = new Gestor()
    let menu = 0

    while (menu != 8) { 

        console.clear()
        console.log("\x1b[36m╔════════════════════════════════════╗\x1b[0m");
        console.log("\x1b[36m║ \x1b[32m        GESTOR VIDEOJUEGOS     \x1b[36m    ║\x1b[0m");
        console.log("\x1b[36m╠════════════════════════════════════╣\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 1)\x1b[0m Registrar videojuego       \x1b[36m    ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 2)\x1b[0m Ordenar por                 \x1b[36m   ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 3)\x1b[0m Filtrar por      \x1b[36m              ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 4)\x1b[0m Juegos retro     \x1b[36m              ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 5)\x1b[0m Agregar juego a favoritos     \x1b[36m ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 6)\x1b[0m Mostrar favoritos     \x1b[36m         ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 7)\x1b[0m Mostrar todos los juegos     \x1b[36m  ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 8)\x1b[0m Salir                        \x1b[36m  ║\x1b[0m");
        console.log("\x1b[36m╚════════════════════════════════════╝\x1b[0m");

        menu = parseInt(await preguntar("Elige una opción: "))

        console.clear()

        switch (menu) {

            case 1: {
                console.clear()
                console.log("=== Registrar videojuego ===") 

                await gestor.leerdatos()

                let titulo = await preguntar("Titulo: ")
                let desarrollador = await preguntar("Desarrollador: ")
                let anoLanzamiento = await preguntar("Año de lanzamiento: ")
                let genero = await preguntar("Genero: ")
                let rating = await preguntar("Rating (0-10): ")

                await gestor.registrarVideojuego(titulo, desarrollador, anoLanzamiento, genero, rating)

                await gestor.escribirdatos()

                pause = await preguntar("Pulse Enter para continuar...")
                break;
            }
            
            case 2: {
                console.clear()
                console.log("=== Ordenar por ===") 

                await gestor.leerdatos()

                let campo = await preguntar("¿Por qué campo deseas ordenar? (titulo, desarrollador, genero, anoLanzamiento, rating): ")

                await gestor.ordenarPor(campo)

                await gestor.escribirdatos()

                pause = await preguntar("Pulse Enter para continuar...")
                break;
            }
        
            case 3: {
                console.clear()
                console.log("=== Filtrar por ===") 
                
                await gestor.leerdatos()

                let campo = await preguntar("¿Por qué campo deseas filtrar? (titulo, desarrollador, genero, anoLanzamiento, rating): ")
                let valorCampo = await preguntar("Valor para filtrar: ")
                await gestor.filtrarPor(campo, valorCampo)

                pause = await preguntar("Pulse Enter para continuar...")
                break;
            }

            case 4: {
                console.clear()
                console.log("=== Juegos retro ===") 
                
                await gestor.leerdatos()

                await gestor.juegosRetro()

                pause = await preguntar("Pulse Enter para continuar...")
                break;
            }

            case 5: {
                console.clear()
                console.log("=== Agregar juego a favoritos ===") 
                
                await gestor.leerdatos()

                let titulo = await preguntar("Titulo del juego que quieras añadira a favoritos: ")

                await gestor.registrarFavorito(titulo)

                await gestor.escribirdatos()

                pause = await preguntar("Pulse Enter para continuar...")
                break;
            }

            case 6: {
                console.clear()
                console.log("=== Mostrar juegos favoritos ===") 
                
                await gestor.leerdatos()

                await gestor.listarFavoritos()

                pause = await preguntar("Pulse Enter para continuar...")
                break;
            }

            case 7: {
                console.clear()
                console.log("=== Mostrar todos los juegos ===") 
                
                await gestor.leerdatos()

                await gestor.listarJuegos()

                pause = await preguntar("Pulse Enter para continuar...")
                break;
            }

            case 8: {
                console.clear()
                console.log("=== Salir ===")
                rl.close()
                break;
            }

            default: {
                console.error("Error: Opción no válida, intentalo de nuevo.");
                pause = await preguntar("Pulse Enter para continuar...")
            }
        }
    }
}

menu()

