const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e){
    e.preventDefault();
    //validar()

    const cuidad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (cuidad==='' || pais===''){
        //mostrar error
        mostrarError('ambos campos son obligatorios');
        return;
    }
    consultarAPI(ciudad.value, pais);
    //consultarAPI(ciudad, pais)

}


function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove();
        },3000)
    }
}


function consultarAPI(ciudad, pais){

    const x='248f0a19aa1d4a4b82f12eebea75b2aa';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${x}`;

    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(datos =>{
            limpiarhtml();
            if (!datos.name){
                mostrarError('ciudad no encontrada');
                console.log(datos);
                return;
            }

            mostrarClima(datos);
        })



}

function mostrarClima(datos){
    const {main:{temp, temp_max,temp_min } } = datos;

    console.log(temp-273.15);

    const centigrados = parseInt(temp-273.15);

    const actual = document.createElement('p');

    actual.innerHTML = `${centigrados} °C`;

    actual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');

    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);
}

function limpiarhtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}