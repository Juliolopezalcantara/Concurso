/* ═══════════════════════════════════════════════
   concurso.js — Inversión Arriesgada (POO)
   ═══════════════════════════════════════════════ */

/* ════════════════════════════════════════════════
   CLASE: Pregunta
   Representa una pregunta con sus opciones y lógica
   ════════════════════════════════════════════════ */
class Pregunta {
    constructor(enunciado, opciones, correctaa, premio){
        this.enunciado = enunciado
        this.opciones  = opciones
        this.correctaa  = correctaa
        this.premio    = premio
    }

    esCorrecta(indice)     { return indice === this.correctaa }
    getPremio(doble)       { return doble ? this.premio * 2 : this.premio }
    getPenalizacion(doble) { return doble ? 2 : 1 }
}

/* ════════════════════════════════════════════════
   CLASE: Nivel
   Gestiona las preguntas de un nivel y su mezcla
   ════════════════════════════════════════════════ */
class Nivel {
    constructor(clave, nombre, color, preguntas){
        this.clave     = clave
        this.nombre    = nombre
        this.color     = color
        this.preguntas = preguntas.map(p => new Pregunta(p.enunciado, p.opciones, p.correctaa, p.premio))
    }

    prepararRonda(){
        let copia = [...this.preguntas]
        for(let i = copia.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]]
        }
        this._grupo = copia
        return copia.slice(0, 4)
    }

    getGrupo(){ return this._grupo || [] }
}

/* ════════════════════════════════════════════════
   CLASE: Comodines
   Gestiona los usos de cada comodín
   ════════════════════════════════════════════════ */
class Comodines {
    constructor(){ this.reiniciar() }

    reiniciar(){
        this.cincuentaCincuenta = 1
        this.cambiarPregunta    = 1
        this.tiempoExtra        = 1
        this.dobleOportunidad   = 1
    }

    usar(clave){
        if(this[clave] > 0){ this[clave]--; return true }
        return false
    }

    tieneUsos(clave){ return this[clave] > 0 }
}

/* ════════════════════════════════════════════════
   DATOS — Niveles y preguntas del concurso
   ════════════════════════════════════════════════ */
const NIVELES = {
            muyFacil: new Nivel("muyFacil","BÁSICO","#00f5ff",[
                { enunciado:"¿Qué lenguaje se usa para hacer páginas web interactivas junto con HTML y CSS?", opciones:["JavaScript","C#","Pascal","Swift"], correctaa:0, premio:100 },
                { enunciado:"¿Qué etiqueta HTML se usa para crear un enlace?", opciones:["<img>","<link>","<a>","<href>"], correctaa:2, premio:100 },
                { enunciado:"¿Cuál es el océano más grande?", opciones:["Atlántico","Índico","Ártico","Pacífico"], correctaa:3, premio:100 },
                { enunciado:"¿Qué estrella está en el centro del sistema solar?", opciones:["La Luna","El Sol","Marte","Júpiter"], correctaa:1, premio:100 },
                { enunciado:"¿Cuántas patas tiene una araña?", opciones:["6","8","10","12"], correctaa:1, premio:100 },
                { enunciado:"En programación, ¿cómo se llama la 'caja' donde guardamos datos?", opciones:["Bucle","Variable","Clase","Función"], correctaa:1, premio:100 },
                { enunciado:"¿Quién escribió Don Quijote de la Mancha?", opciones:["Lope de Vega","Miguel de Cervantes","García Lorca","Fernando de Rojas"], correctaa:1, premio:100 },
                { enunciado:"¿Cuántos planetas hay en el sistema solar?", opciones:["7","8","9","10"], correctaa:1, premio:100 },
                { enunciado:"¿Quién pintó la Mona Lisa?", opciones:["Van Gogh","Picasso","Leonardo da Vinci","Miguel Ángel"], correctaa:2, premio:100 },
                { enunciado:"¿Qué científico formuló la ley de la gravedad?", opciones:["Einstein","Newton","Galileo","Tesla"], correctaa:1, premio:100 },
                { enunciado:"¿Qué idioma se habla principalmente en Brasil?", opciones:["Español","Portugués","Brasileño","Italiano"], correctaa:1, premio:100 },
                { enunciado:"¿Qué lenguaje se usa para estilos web?", opciones:["HTML","CSS","Python","C++"], correctaa:1, premio:100 }
            ]),
            facil: new Nivel("facil","FÁCIL","#00ff9f",[
                { enunciado:"En Python, ¿qué símbolo se usa para comentarios de una sola línea?", opciones:["//","--","#","**"], correctaa:2, premio:200 },
                { enunciado:"¿Qué metal es líquido a temperatura ambiente?", opciones:["Hierro","Mercurio","Oro","Cobre"], correctaa:1, premio:200 },
                { enunciado:"¿Cuál NO es un lenguaje de programación?", opciones:["HTML","Java","Python","PHP"], correctaa:0, premio:200 },
                { enunciado:"¿Qué significa HTML?", opciones:["HyperText Markup Language","HighText Machine Language","Hyper Transfer Mark","Home Tool Markup"], correctaa:0, premio:200 },
                { enunciado:"¿Cuál es el país más grande del mundo?", opciones:["Alemania","Estados Unidos","China","Rusia"], correctaa:3, premio:200 },
                { enunciado:"¿En qué continente se encuentra Egipto?", opciones:["Asia","Europa","África","América"], correctaa:2, premio:200 },
                { enunciado:"¿En qué ciudad se encuentra el Museo del Louvre?", opciones:["Londres","Roma","Berlín","París"], correctaa:3, premio:200 },
                { enunciado:"¿Qué órgano filtra la sangre en el cuerpo?", opciones:["Riñones","Pulmones","Estómago","Hígado"], correctaa:0, premio:200 },
                { enunciado:"¿Qué gas necesitan las plantas para la fotosíntesis?", opciones:["Oxígeno","Dióxido de carbono","Helio","Nitrógeno"], correctaa:1, premio:200 },
                { enunciado:"¿Qué palabra clave en Python define una función?", opciones:["function","def","func","define"], correctaa:1, premio:200 },
                { enunciado:"¿Cómo se llama una variable que no cambia su valor en JavaScript?", opciones:["let","const","var","static"], correctaa:1, premio:200 },
                { enunciado:"¿Qué es una clave primaria en una base de datos?", opciones:["La primera columna","Una contraseña","Un identificador único","Un índice"], correctaa:2, premio:200 }
            ]),
            medio: new Nivel("medio","MEDIO","#f5e642",[
                { enunciado:"¿Qué método añade un elemento a un array en JS?", opciones:["push()","add()","insert()","append()"], correctaa:0, premio:300 },
                { enunciado:"¿Qué país tiene más volcanes activos?", opciones:["Japón","Indonesia","Chile","Estados Unidos"], correctaa:1, premio:300 },
                { enunciado:"¿Qué tipo de base de datos es MongoDB?", opciones:["Relacional","NoSQL","Jerárquica","Orientada a objetos"], correctaa:1, premio:300 },
                { enunciado:"¿Qué método en Java se ejecuta al crear un objeto?", opciones:["main()","constructor()","init()","start()"], correctaa:1, premio:300 },
                { enunciado:"¿Qué operador compara igualdad estricta en JavaScript?", opciones:["==","===","!=","<>"], correctaa:1, premio:300 },
                { enunciado:"¿Qué palabra clave detiene un bucle?", opciones:["exit","stop","break","halt"], correctaa:2, premio:300 },
                { enunciado:"¿En qué año comenzó la Primera Guerra Mundial?", opciones:["1920","1910","1914","1933"], correctaa:2, premio:300 },
                { enunciado:"¿Quién fue el primer presidente del gobierno español tras Franco?", opciones:["Zapatero","Rajoy","Pedro Sánchez","Adolfo Suárez"], correctaa:3, premio:300 },
                { enunciado:"¿Cuál es el metal más abundante en la corteza terrestre?", opciones:["Hierro","Aluminio","Cobre","Plata"], correctaa:1, premio:300 },
                { enunciado:"¿Qué instrumento mide la velocidad del viento?", opciones:["Barómetro","Anemómetro","Termómetro","Voltímetro"], correctaa:1, premio:300 },
                { enunciado:"¿Qué significa SQL JOIN?", opciones:["Combinar filas de varias tablas","Eliminar tablas","Crear tablas","Ordenar tablas"], correctaa:0, premio:300 },
                { enunciado:"¿Cuál es el elemento más abundante en la corteza terrestre?", opciones:["Hierro","Nitrógeno","Silicio","Oxígeno"], correctaa:3, premio:300 }
            ]),
            dificil: new Nivel("dificil","DIFÍCIL","#ff8c00",[
                { enunciado:"¿Qué estructura almacena pares clave-valor?", opciones:["Array","Map","Stack","Queue"], correctaa:1, premio:400 },
                { enunciado:"¿Qué palabra clave en Java impide que una clase sea heredada?", opciones:["static","final","private","sealed"], correctaa:1, premio:400 },
                { enunciado:"¿Qué civilización construyó Machu Picchu?", opciones:["Azteca","Maya","Inca","Olmeca"], correctaa:2, premio:400 },
                { enunciado:"¿En qué año cayó el Imperio Romano de Occidente?", opciones:["476 d.C.","510 d.C.","73 d.C.","493 d.C."], correctaa:0, premio:400 },
                { enunciado:"¿Quién escribió 'Cien años de soledad'?", opciones:["Mario Vargas Llosa","Gabriel García Márquez","Pablo Neruda","Jorge Luis Borges"], correctaa:1, premio:400 },
                { enunciado:"¿Qué planeta tiene el día más largo del sistema solar?", opciones:["Mercurio","Venus","Marte","Júpiter"], correctaa:1, premio:400 },
                { enunciado:"¿Qué científico propuso las tres leyes del movimiento planetario?", opciones:["Galileo Galilei","Johannes Kepler","Isaac Newton","Tycho Brahe"], correctaa:1, premio:400 },
                { enunciado:"¿Qué país tiene más husos horarios?", opciones:["Estados Unidos","Rusia","China","Francia"], correctaa:3, premio:400 },
                { enunciado:"¿Qué lenguaje se usa para consultas en bases de datos relacionales?", opciones:["Python","SQL","HTML","CSS"], correctaa:1, premio:400 },
                { enunciado:"¿Cuál es la capital de Canadá?", opciones:["Toronto","Vancouver","Ottawa","Montreal"], correctaa:2, premio:400 },
                { enunciado:"¿Cuál es el río más largo de Europa?", opciones:["Danubio","Volga","Rin","Tajo"], correctaa:1, premio:400 },
                { enunciado:"¿Qué río atraviesa más países de África?", opciones:["Congo","Zambeze","Níger","Nilo"], correctaa:3, premio:400 }
            ]),
            muyDificil: new Nivel("muyDificil","EXTREMO","#ff2a6d",[
                { enunciado:"¿En qué país se originó el ajedrez?", opciones:["Persia","India","China","Grecia"], correctaa:1, premio:500 },
                { enunciado:"¿Qué matemático desarrolló la teoría de los logaritmos?", opciones:["Isaac Newton","John Napier","Carl Gauss","Leonhard Euler"], correctaa:1, premio:500 },
                { enunciado:"¿Qué tratado puso fin a la Primera Guerra Mundial?", opciones:["Tratado de Utrecht","Tratado de París","Tratado de Versalles","Tratado de Tordesillas"], correctaa:2, premio:500 },
                { enunciado:"¿Qué estructura de datos funciona con el principio LIFO?", opciones:["Queue","Stack","Tree","Graph"], correctaa:1, premio:500 },
                { enunciado:"¿Qué físico propuso el principio de incertidumbre?", opciones:["Albert Einstein","Niels Bohr","Werner Heisenberg","Max Planck"], correctaa:2, premio:500 },
                { enunciado:"¿Qué imperio fue gobernado por Mansa Musa?", opciones:["Imperio Songhai","Imperio de Malí","Imperio Otomano","Imperio Persa"], correctaa:1, premio:500 },
                { enunciado:"¿Qué constante física representa la velocidad de la luz en el vacío?", opciones:["g","c","h","k"], correctaa:1, premio:500 },
                { enunciado:"¿Qué científico descubrió la radiactividad natural en 1896?", opciones:["Marie Curie","Henri Becquerel","Ernest Rutherford","Niels Bohr"], correctaa:1, premio:500 },
                { enunciado:"¿Qué tipo de excepción en Java debe declararse o manejarse obligatoriamente?", opciones:["Checked Exception","Runtime Exception","Error","NullPointerException"], correctaa:0, premio:500 },
                { enunciado:"¿Qué elemento tiene el punto de fusión más alto de la Tabla Periódica?", opciones:["Titanio","Wolframio","Renio","Osmio"], correctaa:1, premio:500 },
                { enunciado:"¿En qué año fue publicada la 'Crítica de la Razón Pura' de Kant?", opciones:["1762","1790","1781","1820"], correctaa:2, premio:500 },
                { enunciado:"¿Qué filósofo presocrático sostenía que el Ápeiron era el principio de todo?", opciones:["Tales","Heráclito","Pitágoras","Anaximandro"], correctaa:3, premio:500 }
            ])
        }

/* ════════════════════════════════════════════════
   CLASE: Juego
   Estado global de la partida
   ════════════════════════════════════════════════ */
class Juego {
    constructor(){
        this.dinero    = 0
        this.vidas     = 3
        this.tiempo    = 30
        this.intervalo = null

        this.escudoActivo           = false
        this.doblePuntosActivo      = false
        this.ruletaActiva           = false
        this.respuestasExtraActivas = false
        this.modoComodinesInfinitos = false

        this.doblePuntosUsadoEsteTramo        = false
        this.comodinesInfinitosUsadoEsteTramo = false
        this.ruletaUsadaEsteTramo             = false
        this.bonusTiempoRuleta                = 0

        this.comodines = new Comodines()
        this.comodinesCompradosEnNivel = {
            cincuentaCincuenta:false, cambiarPregunta:false,
            tiempoExtra:false,        dobleOportunidad:false
        }

        this.ordenNiveles         = ["muyFacil","facil","medio","dificil","muyDificil"]
        this.niveles              = NIVELES
        this.indiceNivelActual    = 0
        this.indicePreguntaActual = 0
        this.preguntasJugadas     = []
        this.indicesGrupoJugados  = []
        this.preguntasNivelActual = []
        this.preguntaActual       = null
    }

    getNivelActual(){
        return this.niveles[this.ordenNiveles[this.indiceNivelActual]]
    }

    prepararNivel(){
        this.preguntasNivelActual = this.getNivelActual().prepararRonda()
        this.preguntasJugadas    = []
        this.indicesGrupoJugados = []
    }
}

/* ════════════════════════════════════════════════
   CONSTANTES E INSTANCIA GLOBAL
   ════════════════════════════════════════════════ */
const COSTES_COMODINES = [75, 150, 250, 400, 600]
let juego = new Juego()

/* ════════════════════════════════════════════════
   INTERFAZ — Actualización visual
   ════════════════════════════════════════════════ */
function actualizarEtiquetaNivel(){
    const nivel = juego.getNivelActual()
    const elemento = document.getElementById("etiquetaNivel")
    if(elemento && nivel){ elemento.textContent = nivel.nombre; elemento.style.color = nivel.color }
}

function actualizarEstadisticas(){
    document.getElementById("dinero").innerText = juego.dinero
    document.getElementById("vidas").innerText = juego.vidas
}

function actualizarContadoresComodines(){
    document.getElementById("contadorCincuentaCincuenta").innerText      = juego.comodines.cincuentaCincuenta
    document.getElementById("contadorCambiarPregunta").innerText  = juego.comodines.cambiarPregunta
    document.getElementById("contadorTiempoExtra").innerText      = juego.comodines.tiempoExtra
    document.getElementById("contadorDobleOportunidad").innerText = juego.comodines.dobleOportunidad
}

function mostrarNotificacion(mensaje, tipo="info"){
    const notif = document.createElement("div")
    notif.className = "notificacion toast-" + tipo
    notif.innerText = mensaje
    document.body.appendChild(notif)
    setTimeout(() => notif.classList.add("notificacion-visible"), 10)
    setTimeout(() => { notif.classList.remove("notificacion-visible"); setTimeout(() => notif.remove(), 400) }, 2200)
}

function ocultarTodo(){
    document.querySelector(".juego").style.display          = "none"
    document.querySelector(".comodines").style.display      = "none"
    document.querySelector(".potenciadores").style.display  = "none"
    document.getElementById("pantallaTramo").style.display    = "none"
    document.getElementById("pantallaDerrota").style.display = "none"
    document.getElementById("pantallaVictoria").style.display  = "none"
    document.getElementById("pantallaPlantarse").style.display  = "none"
}

/* ════════════════════════════════════════════════
   FLUJO DEL JUEGO
   ════════════════════════════════════════════════ */
function comenzar(){
    document.getElementById("botonEmpezar").classList.add("oculto")
    document.getElementById("botonPlantar").classList.remove("oculto")
    document.querySelector(".comodines").style.display    = ""
    document.querySelector(".potenciadores").style.display = ""

    juego = new Juego()
    juego.prepararNivel()

    actualizarContadoresComodines()
    actualizarEstadisticas()
    actualizarEtiquetaNivel()
    siguientePregunta()
}

function siguientePregunta(){
    const listado = juego.preguntasNivelActual
    if(!listado || listado.length === 0){ finJuego(); return }

    if(juego.indicePreguntaActual >= listado.length){
        clearInterval(juego.intervalo)
        mostrarPantallaTramo()
        return
    }

    const grupo = juego.getNivelActual().getGrupo()
    const indiceGrupo = grupo.indexOf(listado[juego.indicePreguntaActual])
    if(indiceGrupo !== -1 && !juego.indicesGrupoJugados.includes(indiceGrupo))
        juego.indicesGrupoJugados.push(indiceGrupo)

    juego.preguntasJugadas.push(juego.indicePreguntaActual)
    juego.preguntaActual = listado[juego.indicePreguntaActual]
    juego.indicePreguntaActual++
    mostrarPregunta()
    iniciarTemporizador()
}

function mostrarPregunta(){
    document.getElementById("pregunta").innerText = juego.preguntaActual.enunciado
    const contenedor = document.getElementById("respuestas")
    contenedor.innerHTML = ""
    const letras = ["A","B","C","D","E","F"]
    let opciones = [...juego.preguntaActual.opciones]
    if(juego.respuestasExtraActivas){ opciones.push("Señal no identificada"); opciones.push("Dato corrupto") }
    opciones.forEach((opcion, i) => {
        const boton = document.createElement("button")
        boton.innerText = opcion
        boton.setAttribute("data-letter", letras[i] || "?")
        boton.onclick = () => responder(i)
        contenedor.appendChild(boton)
    })
}

function responder(indice){
    const botones  = document.querySelectorAll("#respuestas button")
    const pregunta = juego.preguntaActual
    clearInterval(juego.intervalo)

    if(pregunta.esCorrecta(indice)){
        botones[indice].classList.add("correcta")
        const ganancia = pregunta.getPremio(juego.doblePuntosActivo)
        juego.dinero += ganancia
        setTimeout(() => {
            mostrarNotificacion("✓ CORRECTO — +" + ganancia + " €", "success")
            actualizarEstadisticas(); reiniciarPotenciadores(); siguientePregunta()
        }, 900)
    } else {
        botones[indice].classList.add("incorrectaa")
        botones[pregunta.correctaa].classList.add("correcta")
        setTimeout(() => {
            if(juego.escudoActivo){
                mostrarNotificacion("🛡 ESCUDO ACTIVADO — Daño bloqueado", "shield")
                juego.escudoActivo = false
                document.getElementById("iconoEscudo").style.visibility = "hidden"
            } else {
                const penalizacion = pregunta.getPenalizacion(juego.doblePuntosActivo)
                juego.vidas -= penalizacion
                if(penalizacion === 2) mostrarNotificacion("✗ INCORRECTO — Doble penalización: -2 vidas", "error")
            }
            actualizarEstadisticas()
            if(juego.vidas <= 0){ clearInterval(juego.intervalo); setTimeout(finJuego, 400); return }
            reiniciarPotenciadores(); siguientePregunta()
        }, 900)
    }
}

function iniciarTemporizador(){
    clearInterval(juego.intervalo)
    juego.tiempo = 30
    if(juego.bonusTiempoRuleta !== 0){
        juego.tiempo = Math.max(5, juego.tiempo + juego.bonusTiempoRuleta)
        mostrarNotificacion("⏱ " + (juego.bonusTiempoRuleta > 0 ? "+" : "") + juego.bonusTiempoRuleta + "s de la ruleta",
            juego.bonusTiempoRuleta > 0 ? "success" : "error")
        juego.bonusTiempoRuleta = 0
    }
    document.getElementById("temporizador").innerText = juego.tiempo
    juego.intervalo = setInterval(() => {
        juego.tiempo--
        document.getElementById("temporizador").innerText = juego.tiempo
        if(juego.tiempo <= 0){
            clearInterval(juego.intervalo)
            juego.vidas--; actualizarEstadisticas()
            if(juego.vidas <= 0){ setTimeout(finJuego, 400); return }
            reiniciarPotenciadores(); siguientePregunta()
        }
    }, 1000)
}

function continuarJuego(){
    ocultarTodo()
    document.querySelector(".juego").style.display         = ""
    document.querySelector(".comodines").style.display     = ""
    document.querySelector(".potenciadores").style.display = ""

    juego.indiceNivelActual++
    juego.indicePreguntaActual = 0

    const claves = ["cincuentaCincuenta","cambiarPregunta","tiempoExtra","dobleOportunidad"]
    claves.forEach(c => { if(juego.comodinesCompradosEnNivel[c]) juego.comodines[c] = 1 })
    juego.comodinesCompradosEnNivel = {
        cincuentaCincuenta:false, cambiarPregunta:false,
        tiempoExtra:false,        dobleOportunidad:false
    }
    juego.modoComodinesInfinitos          = false
    juego.doblePuntosUsadoEsteTramo        = false
    juego.comodinesInfinitosUsadoEsteTramo = false
    actualizarContadoresComodines()

    if(juego.indiceNivelActual >= juego.ordenNiveles.length){ mostrarVictoria(); return }
    juego.prepararNivel()
    actualizarEtiquetaNivel()
    siguientePregunta()
}

function plantarse(){
    clearInterval(juego.intervalo); ocultarTodo()
    document.getElementById("plantarDinero").innerText = juego.dinero + " €"
    document.getElementById("pantallaPlantarse").style.display = "flex"
}

function finJuego(){
    clearInterval(juego.intervalo); ocultarTodo()
    document.getElementById("derrotaDinero").innerText = juego.dinero + " €"
    document.getElementById("pantallaDerrota").style.display = "flex"
}

function mostrarVictoria(){
    ocultarTodo()
    document.getElementById("victoriaDinero").innerText = juego.dinero + " €"
    document.getElementById("pantallaVictoria").style.display = "flex"
}

function reiniciarJuego(){ location.reload() }

/* ════════════════════════════════════════════════
   PANTALLA DE TRAMO Y COMPRAS
   ════════════════════════════════════════════════ */
function mostrarPantallaTramo(){
    ocultarTodo()
    document.getElementById("pantallaTramo").style.display = "flex"

    juego.comodinesCompradosEnNivel = {
        cincuentaCincuenta:false, cambiarPregunta:false,
        tiempoExtra:false,        dobleOportunidad:false
    }
    juego.ruletaUsadaEsteTramo = false
    const botonGirar = document.querySelector(".boton-girar")
    if(botonGirar){ botonGirar.disabled = false; botonGirar.style.opacity = "" }

    const nivel = juego.getNivelActual()
    document.getElementById("nombreNivelCompletado").innerText   = nivel.nombre
    document.getElementById("nombreNivelCompletado").style.color = nivel.color
    document.getElementById("dineroTramo").innerText = juego.dinero + " €"

    const porcentaje = Math.round((juego.indicePreguntaActual / 4) * 100)
    document.getElementById("barraProgresoTramo").style.width = Math.min(porcentaje, 100) + "%"

    const siguienteIndice = juego.indiceNivelActual + 1
    if(siguienteIndice < juego.ordenNiveles.length){
        const siguienteNivel = juego.niveles[juego.ordenNiveles[siguienteIndice]]
        document.getElementById("nombreSiguienteNivel").innerText   = siguienteNivel.nombre
        document.getElementById("nombreSiguienteNivel").style.color = siguienteNivel.color
        document.getElementById("botonContinuarNivel").style.display = ""
    } else {
        document.getElementById("nombreSiguienteNivel").innerText   = "VICTORIA"
        document.getElementById("nombreSiguienteNivel").style.color = "#f5e642"
    }

    construirPanelCompras()
    dibujarRuleta(anguloRuleta)
    if(juego.ruletaActiva){ setTimeout(girarRuleta, 600) }
}

function construirPanelCompras(){
    const coste = COSTES_COMODINES[juego.indiceNivelActual] || 100
    document.getElementById("etiquetaCosteComodin").innerText = coste + " €"
    const contenedor = document.getElementById("panelComprarComodines")
    contenedor.innerHTML = ""

    const lista = [
        { clave:"cincuentaCincuenta", etiqueta:"◈ 50:50" },
        { clave:"cambiarPregunta",    etiqueta:"↺ Cambiar Pregunta" },
        { clave:"tiempoExtra",        etiqueta:"⊕ Tiempo Extra" },
        { clave:"dobleOportunidad",   etiqueta:"⬡ Escudo" }
    ]
    lista.forEach(c => {
        const usos = juego.comodines[c.clave]
        const yaComprado = juego.comodinesCompradosEnNivel[c.clave]
        const boton = document.createElement("button")
        boton.className = "boton-comprar-comodin"
        if(yaComprado){
            boton.classList.add("comodin-comprado"); boton.disabled = true
            boton.innerHTML = `<span class="etiqueta-compra">${c.etiqueta}</span><span class="coste-compra">COMPRADO</span><span class="stock-compra">×1</span>`
        } else if(usos > 0){
            boton.classList.add("comodin-disponible"); boton.disabled = true
            boton.innerHTML = `<span class="etiqueta-compra">${c.etiqueta}</span><span class="coste-compra">DISPONIBLE</span><span class="stock-compra">×${usos}</span>`
        } else {
            boton.classList.add("comodin-gastado")
            boton.innerHTML = `<span class="etiqueta-compra">${c.etiqueta}</span><span class="coste-compra">${coste} €</span><span class="stock-compra">×0</span>`
            boton.onclick = () => comprarComodin(c.clave, coste)
        }
        contenedor.appendChild(boton)
    })
}

function comprarComodin(clave, coste){
    if(juego.comodinesCompradosEnNivel[clave]){ mostrarNotificacion("⚠ Ya compraste este comodín en este tramo", "error"); return }
    if(juego.dinero < coste){ mostrarNotificacion("⚠ CAPITAL INSUFICIENTE", "error"); return }
    juego.dinero -= coste
    juego.comodines[clave] = 1
    juego.comodinesCompradosEnNivel[clave] = true
    actualizarEstadisticas(); actualizarContadoresComodines()
    mostrarNotificacion("✓ Comodín recuperado", "success")
    construirPanelCompras()
}

/* ════════════════════════════════════════════════
   COMODINES Y POTENCIADORES
   ════════════════════════════════════════════════ */
function cincuentaCincuenta(){
    if(!juego.comodines.tieneUsos("cincuentaCincuenta") && !juego.modoComodinesInfinitos){
        mostrarNotificacion("⚠ Sin usos disponibles para este comodín", "error"); return
    }
    if(!juego.modoComodinesInfinitos){
        juego.comodines.usar("cincuentaCincuenta")
        document.getElementById("contadorCincuentaCincuenta").innerText = juego.comodines.cincuentaCincuenta
    }
    let botones = document.querySelectorAll("#respuestas button"), eliminadas = 0
    for(let i = 0; i < botones.length; i++){
        if(i !== juego.preguntaActual.correctaa && eliminadas < 2){
            botones[i].disabled = true; botones[i].style.opacity = "0.3"; eliminadas++
        }
    }
}

function tiempoExtra(){
    if(!juego.comodines.tieneUsos("tiempoExtra") && !juego.modoComodinesInfinitos){
        mostrarNotificacion("⚠ Sin usos disponibles para este comodín", "error"); return
    }
    if(!juego.modoComodinesInfinitos){
        juego.comodines.usar("tiempoExtra")
        document.getElementById("contadorTiempoExtra").innerText = juego.comodines.tiempoExtra
    }
    juego.tiempo += 15
}

function dobleOportunidad(){
    if(!juego.comodines.tieneUsos("dobleOportunidad") && !juego.modoComodinesInfinitos){
        mostrarNotificacion("⚠ Sin usos disponibles para este comodín", "error"); return
    }
    if(!juego.modoComodinesInfinitos){
        juego.comodines.usar("dobleOportunidad")
        document.getElementById("contadorDobleOportunidad").innerText = juego.comodines.dobleOportunidad
    }
    juego.escudoActivo = true
    document.getElementById("iconoEscudo").style.visibility = "visible"
}

function cambiarPregunta(){
    if(!juego.comodines.tieneUsos("cambiarPregunta")){
        mostrarNotificacion("⚠ Sin usos disponibles para este comodín", "error"); return
    }
    const grupo = juego.getNivelActual().getGrupo()
    const disponibles = []
    for(let i = 0; i < grupo.length; i++){
        if(!juego.indicesGrupoJugados.includes(i)) disponibles.push(i)
    }
    if(disponibles.length === 0){ mostrarNotificacion("⚠ No hay más preguntas disponibles en este tramo", "error"); return }

    juego.comodines.usar("cambiarPregunta")
    document.getElementById("contadorCambiarPregunta").innerText = juego.comodines.cambiarPregunta

    const indiceElegido = disponibles[Math.floor(Math.random() * disponibles.length)]
    juego.indicesGrupoJugados.push(indiceElegido)
    juego.preguntaActual = grupo[indiceElegido]
    clearInterval(juego.intervalo)
    mostrarPregunta()
    iniciarTemporizador()
}

function comodinesInfinitos(){
    const coste = 300
    if(juego.comodinesInfinitosUsadoEsteTramo){ mostrarNotificacion("⚠ Comodines infinitos ya usado en este tramo", "error"); return }
    if(juego.dinero < coste){ mostrarNotificacion("⚠ CAPITAL INSUFICIENTE (necesitas " + coste + " €)", "error"); return }
    juego.dinero -= coste
    juego.comodinesInfinitosUsadoEsteTramo = true
    juego.modoComodinesInfinitos = true
    document.getElementById("contadorCincuentaCincuenta").innerText      = "∞"
    document.getElementById("contadorTiempoExtra").innerText      = "∞"
    document.getElementById("contadorDobleOportunidad").innerText = "∞"
    actualizarEstadisticas()
    mostrarNotificacion("♾️ Comodines infinitos — solo esta pregunta (300 €)", "success")
}

function doblePuntos(){
    if(juego.doblePuntosUsadoEsteTramo){ mostrarNotificacion("⚠ Doble puntuación ya usado en este tramo", "error"); return }
    juego.doblePuntosUsadoEsteTramo = true
    juego.doblePuntosActivo = true
    mostrarNotificacion("✦ Doble puntos activados (1 pregunta)", "info")
}

function activarRuleta(){
    juego.ruletaActiva = true
    mostrarNotificacion("⟳ Modo ruleta — úsalo en fin de tramo", "info")
}

function reiniciarPotenciadores(){
    juego.doblePuntosActivo      = false
    juego.ruletaActiva           = false
    juego.respuestasExtraActivas = false
    if(juego.modoComodinesInfinitos){
        juego.modoComodinesInfinitos = false
        actualizarContadoresComodines()
    }
}

/* ════════════════════════════════════════════════
   RULETA — Canvas y animación
   ════════════════════════════════════════════════ */
const SECTORES_RULETA = [
    {texto:"+250€",  color:"#00b4d8"},
    {texto:"-250€",  color:"#c1121f"},
    {texto:"+1 vida",color:"#2dc653"},
    {texto:"-1 vida",color:"#c1121f"},
    {texto:"+500€",  color:"#f5e642"},
    {texto:"-500€",  color:"#c1121f"},
    {texto:"+20s",   color:"#b86bff"},
    {texto:"-10s",   color:"#e07800"}
]
let anguloRuleta = 0, ruletaGirando = false

function dibujarRuleta(angulo){
    const lienzo = document.getElementById("lienzo-ruleta")
    if(!lienzo) return
    const ctx = lienzo.getContext("2d")
    const cx = lienzo.width/2, cy = lienzo.height/2, r = cx - 8
    const porcion = (2*Math.PI)/SECTORES_RULETA.length
    ctx.clearRect(0,0,lienzo.width,lienzo.height)

    ctx.save()
    ctx.beginPath(); ctx.arc(cx,cy,r+5,0,2*Math.PI)
    ctx.strokeStyle="rgba(0,245,255,0.6)"; ctx.lineWidth=2
    ctx.shadowColor="#00f5ff"; ctx.shadowBlur=20
    ctx.stroke(); ctx.restore()

    SECTORES_RULETA.forEach((sector, i) => {
        const inicio=angulo+i*porcion, fin=inicio+porcion
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,inicio,fin)
        ctx.fillStyle=sector.color; ctx.fill()
        ctx.strokeStyle="rgba(0,0,0,0.5)"; ctx.lineWidth=1.5; ctx.stroke()
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(inicio+porcion/2)
        ctx.textAlign="right"; ctx.fillStyle="#fff"
        ctx.font="bold 11px 'Orbitron',monospace"
        ctx.shadowColor="rgba(0,0,0,0.9)"; ctx.shadowBlur=4
        ctx.fillText(sector.texto, r-10, 4); ctx.restore()
    })

    ctx.beginPath(); ctx.arc(cx,cy,16,0,2*Math.PI)
    const degradado = ctx.createRadialGradient(cx,cy,2,cx,cy,16)
    degradado.addColorStop(0,"#00f5ff"); degradado.addColorStop(1,"#003344")
    ctx.fillStyle=degradado; ctx.fill()
    ctx.strokeStyle="#00f5ff"; ctx.lineWidth=2; ctx.shadowColor="#00f5ff"; ctx.shadowBlur=10; ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(cx-8, cy-r-10); ctx.lineTo(cx+8, cy-r-10); ctx.lineTo(cx, cy-r+4)
    ctx.closePath()
    ctx.fillStyle="#ff2a6d"; ctx.shadowColor="#ff2a6d"; ctx.shadowBlur=10; ctx.fill()
}

function girarRuleta(){
    if(ruletaGirando) return
    if(juego.ruletaUsadaEsteTramo){ mostrarNotificacion("⚠ Solo un giro de ruleta por fin de tramo", "error"); return }
    ruletaGirando = true
    juego.ruletaUsadaEsteTramo = true
    const botonGirar = document.querySelector(".boton-girar")
    if(botonGirar){ botonGirar.disabled = true; botonGirar.style.opacity = "0.4" }

    document.getElementById("resultadoRuleta").textContent = "⟳ Girando..."
    const giroTotal = Math.PI*2*(5+Math.random()*4), duracion = 3200
    const tiempoInicio = performance.now(), anguloInicio = anguloRuleta

    function fotograma(ahora){
        const transcurrido = ahora-tiempoInicio, t = Math.min(transcurrido/duracion, 1)
        const suavizado = 1-Math.pow(1-t, 4)
        anguloRuleta = anguloInicio + giroTotal*suavizado
        dibujarRuleta(anguloRuleta)
        if(t < 1){ requestAnimationFrame(fotograma); return }

        const porcion = (2*Math.PI)/SECTORES_RULETA.length
        const normalizado = (((-anguloRuleta-Math.PI/2)%(2*Math.PI))+2*Math.PI)%(2*Math.PI)
        const indice = Math.floor(normalizado/porcion)%SECTORES_RULETA.length
        const resultado = SECTORES_RULETA[indice]
        document.getElementById("resultadoRuleta").textContent = "▶ " + resultado.texto
        ruletaGirando = false

        const texto = resultado.texto
        if(texto.includes("€")){
            const valor = parseInt(texto.replace(/[^0-9]/g,"")) * (texto.startsWith("+") ? 1 : -1)
            juego.dinero += valor; actualizarEstadisticas()
            mostrarNotificacion("🎲 Ruleta: "+texto, texto.startsWith("-") ? "error" : "success")
        } else if(texto.includes("vida")){
            const delta = texto.startsWith("+") ? 1 : -1
            juego.vidas = Math.max(0, juego.vidas + delta)
            actualizarEstadisticas()
            mostrarNotificacion("🎲 Ruleta: "+texto, delta < 0 ? "error" : "success")
            if(juego.vidas <= 0) setTimeout(() => {
                ocultarTodo()
                document.getElementById("derrotaDinero").innerText = juego.dinero + " €"
                document.getElementById("pantallaDerrota").style.display = "flex"
            }, 1200)
        } else if(texto.includes("s")){
            const valor = parseInt(texto.replace(/[^0-9]/g,"")) * (texto.startsWith("+") ? 1 : -1)
            juego.bonusTiempoRuleta += valor
            mostrarNotificacion("🎲 Ruleta: "+texto+" (próxima pregunta)", texto.startsWith("-") ? "error" : "success")
        }
    }
    requestAnimationFrame(fotograma)
}

/* ════════════════════════════════════════════════
   INICIALIZACIÓN
   ════════════════════════════════════════════════ */
window.addEventListener("load", () => {
    dibujarRuleta(0)

    // Animación de escritura en el encabezado
    const mensajes = [
        "// SISTEMA DE EVALUACIÓN DE RIESGO v7.3.1",
        "// CONEXIÓN SEGURA ESTABLECIDA...",
        "// CARGANDO BASE DE DATOS DE PREGUNTAS...",
        "// PROTOCOLO DE INVERSIÓN ACTIVO"
    ]
    let indiceMensaje = 0, indiceCaracter = 0
    const elementoTexto = document.getElementById("textoArranque")
    function escribirSiguiente(){
        if(indiceCaracter < mensajes[indiceMensaje].length){
            elementoTexto.textContent = mensajes[indiceMensaje].slice(0, ++indiceCaracter)
            setTimeout(escribirSiguiente, 45)
        } else {
            setTimeout(() => { indiceMensaje = (indiceMensaje+1)%mensajes.length; indiceCaracter = 0; escribirSiguiente() }, 2600)
        }
    }
    escribirSiguiente()

    // Asignar letras A/B/C/D a los botones de respuesta
    const letras = ["A","B","C","D","E","F"]
    new MutationObserver(() => {
        document.querySelectorAll("#respuestas button").forEach((boton, i) =>
            boton.setAttribute("data-letter", letras[i] || "?"))
    }).observe(document.getElementById("respuestas"), {childList:true})

    // Aviso visual cuando quedan 8 segundos
    const elementoTemporizador = document.getElementById("temporizador")
    const elementoEstadisticas = document.querySelector(".estadisticas")
    new MutationObserver(() => {
        parseInt(elementoTemporizador.textContent, 10) <= 8
            ? elementoEstadisticas.classList.add("aviso-temporizador")
            : elementoEstadisticas.classList.remove("aviso-temporizador")
    }).observe(elementoTemporizador, {childList:true, characterData:true, subtree:true})
})
