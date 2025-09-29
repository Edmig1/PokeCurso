var pokebola = document.querySelector('.animate')
var main = document.querySelector('.main')
var header = document.querySelector('.header')

setTimeout(()=>{
    pokebola.style.display = "none"
    main.classList.add("animate__animated", "animate__fadeIn")
    header.classList.add("animate__animated", "animate__fadeIn")
},2000)

const url = 'https://pokeapi.co/api/v2/pokemon/'

// Elementos a serem alterados
var nome = document.getElementById("pokename")
var id = document.getElementById("pokeID")
var foto = document.getElementById("pokeimg")
var peso = document.getElementById("peso")
var alt = document.getElementById("alt")
let btnstate = "default"; 
let currentData = null; 
const colors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};
function mudashiny() {
    if (btnstate == "default") {
        btnstate = "shiny";
    } else {
        btnstate = "default";
    }

    if (currentData) {
        foto.src = currentData.sprites["front_" + btnstate];
    }
}

function porcentagem(numero,maximo){
    result = (100*numero)/maximo
    return result
}

async function ApiRequest() {
    let poke = document.getElementById("SearchContent").value;
    await fetch("https://pokeapi.co/api/v2/pokemon/" + poke.toLowerCase())
        .then(response => response.json())
        .then(data => {
            currentData = data;
            console.log(data)
            nome.innerHTML = data.name;
            id.innerHTML = "#" + data.id;
            foto.src = data.sprites["front_" + btnstate];
            peso.innerHTML = "Peso: " + data.weight / 10 + " Kg";
            alt.innerHTML = "Altura: " + data.height * 10 + " Cm";
            
            // pega o tipo principal
            let type = data.types[0].type.name;
            document.getElementById("pokemon").style.backgroundColor = colors[type] || "#FFF";

            document.querySelectorAll('.stat').forEach((element,key) => {
                const p = element.children[0]
                p.innerHTML = data.stats[key].base_stat
                element.style.backgroundColor = colors[type] || "#FFF";
                element.style.height = porcentagem(data.stats[key].base_stat, 255)+"%"
            }); 
        });
}
