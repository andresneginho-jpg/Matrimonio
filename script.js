document.addEventListener("DOMContentLoaded", () => {
    const secciones = document.querySelectorAll(".seccion-boda");
    let indiceActual = 0;
    let estaAnimando = false;

    // Activar la primera sección al cargar la página
    secciones[indiceActual].classList.add("es-activa");

    const cambiarSeccion = (direccion) => {
        if (estaAnimando) return;

        let siguienteIndice = indiceActual + direccion;
        
        if (siguienteIndice < 0 || siguienteIndice >= secciones.length) return;

        estaAnimando = true;

        secciones[indiceActual].classList.remove("es-activa");

        indiceActual = siguienteIndice;
        secciones[indiceActual].classList.add("es-activa");

        setTimeout(() => {
            estaAnimando = false;
        }, 1500); 
    };

    window.addEventListener("wheel", (evento) => {
        if (evento.deltaY > 0) {
            cambiarSeccion(1); 
        } else if (evento.deltaY < 0) {
            cambiarSeccion(-1); 
        }
    });

    let tactoInicioY = 0;
    let tactoFinY = 0;

    window.addEventListener("touchstart", (evento) => {
        tactoInicioY = evento.changedTouches[0].screenY;
    }, { passive: false });

    // Cancelar el scroll normal físico
    window.addEventListener("touchmove", (evento) => {
        evento.preventDefault(); 
    }, { passive: false });

    window.addEventListener("touchend", (evento) => {
        tactoFinY = evento.changedTouches[0].screenY;
        procesarDeslizamiento();
    }, { passive: false });

    const procesarDeslizamiento = () => {
        const limiteDeslizamiento = 50; 
        const diferenciaY = tactoInicioY - tactoFinY;

        if (diferenciaY > limiteDeslizamiento) {
            cambiarSeccion(1);
        } else if (diferenciaY < -limiteDeslizamiento) {
            cambiarSeccion(-1);
        }
    };
});
