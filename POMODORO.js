let minutes = document.getElementById("timer-minutes");
let seconds = document.getElementById("timer-seconds");
let start = document.getElementById("start");
let stopbut = document.getElementById("stop");
let numerodeciclos=document.getElementById("ciclostexto");
let musicaactiva=document.getElementById("musica-activa")
let musicadescanso=document.getElementById("musica-descanso")

let minutesInt=parseInt(minutes.textContent);
let secondsInt=parseInt(seconds.textContent);
let numerodeciclosInt=parseInt(numerodeciclos.textContent);


let secondsTxt="";
let secondsTxt0="";
let numerodeciclosTxt=";"

let running =false;
let descanso = false;
let clickstop = 0;


let funcioncuentatras;

//*EMPEZAR CUENTA ATRAS.
start.addEventListener("click", function(){
    if (running===true){
        alert("El reloj ya esta en funcionamiento.");
    }
    else if(running ===false){
        if(clickstop === 0)
            musicaactiva.currentTime = 0;
            musicaactiva.play();
            funcioncuentatras = setInterval(cuentaatras,1000);
            running=true;
            clickstop=0;
        }

        else if (clickstop === 1){
            musicaactiva.play();
            funcioncuentatras = setInterval(cuentaatras,1000);
            clickstop=0;
            running=true;
        }
})

//*PARADA Y REINICIO.
stopbut.addEventListener("click", function(){    
    if (clickstop === 0){
        clearInterval(funcioncuentatras);
        musicaactiva.pause();
        clickstop+=1;
        running = false;
    }
    else if(clickstop===1){
        reset();
        clickstop=0;
        numerodeciclosInt=0;
        clearInterval(funcioncuentatras);

        numerodeciclos.textContent = numerodeciclosInt;
        minutes.textContent = minutesInt;
        seconds.textContent = "0"+ secondsInt;
    }
})


//! FUNCION PARA CONTAR.
function cuentaatras(){
    //RELOS FUNCIONANDO TRABAJO
    secondsInt-=1;
    running = true;

    //SI LLEGAN A 0 LOS SEGUNDOS REINICIAR
    if (secondsInt<0 ){
        minutesInt-=1;
        secondsInt=59;
    }
    // COMIENZO DEL DESCANSO.
    if (minutesInt===0 && secondsInt===0 && descanso===false){
        alert("Toca descansar.")
        secondsInt=0;
        minutesInt=5;
        descanso = true;
        musicaactiva.pause();
        musicadescanso.currentTime = 0;
        musicadescanso.play();
    }
    //COMIENZO DEL TRABAJO.DE NUEVO.
    if (minutesInt===0 && secondsInt===0 && descanso===true){
        alert("A currar")
        secondsInt=0;
        minutesInt=25;
        descanso = false;
        numerodeciclosInt+=1;
        numerodeciclos.textContent = numerodeciclosInt;
        musicaactiva.currentTime = 0;
        musicaactiva.play();
        musicadescanso.pause();
        }

    if (minutesInt<10){
        minutes.textContent = "0"+minutesInt;
    }else{
    minutes.textContent = minutesInt;}  

// CON OPERADOR TERNARIO.
    secondsInt<10 ? seconds.textContent = "0" + secondsInt :  seconds.textContent = secondsInt;    


}
//!FUNCION PARA HACER EL RESET.
function reset(){
    minutesInt=25;
    secondsInt=0;
}