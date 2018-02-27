// jalar formulario
// convertirlo a Array.apply
const form = document.querySelector("form");
// se traen elementos padres de los input.
let divCard = document.getElementById("div-card");
let divName = document.getElementById("div-name");
let cvvDiv = document.getElementById("div-cvv");

// el elementos "form" se convierte a array.
const colectionToArray = Array.from(form);

// se le da el evento de submit a form y se crea una función anónima que recibirá las demás funciones.
form.addEventListener("submit", e => {
    e.preventDefault();
    validCardName(form);
    validCard(form);
    cardVerificationValue(form);
});

// se declara la función de la tarjeta de crédito y se le pasa el parámetro de form.
function validCard(form) {
    let numberCard = colectionToArray[0].value; 
    if (numberCard.charCodeAt() >= 48 && numberCard.charCodeAt() <= 57) {
        let numberArray = Array.from(numberCard);
        if (numberArray.length === 16) {
            let reverseArray = numberArray.reverse();
            const luhnAlgorithm = reverseArray.map((element, index) => {
                let unmodifiedElements = parseInt(element);
                if (index % 2 == 0) { 
                    return unmodifiedElements;
                }

                if (index % 2 != 0) {
                    let multiplyElements = parseInt(element * 2);
                    // console.log(multiplyElements);
                    if (multiplyElements >= 10) {
                        multiplyElements = parseInt(multiplyElements / 10 + multiplyElements % 10);
                    }
                    // console.log(multiplyElements);
                    return multiplyElements
                }    
            }).reduce((a, b) => a + b, 0);
            if (luhnAlgorithm % 10 == 0) {
                divCard.classList.add("has-success");    
            } else {
                divCard.classList.add("has-error");    
            } 
        } else {
            divCard.classList.add("has-error");            
        }
    } else {  
        divCard.classList.add("has-error");     
    }
}


// se declara la función que valida los tres números.
const cardVerificationValue = form => {
    // se convierte 
    const cvv = Array.from(colectionToArray[2].value);
    if (cvv.length === 3) {
        cvv.forEach(element => {
            if (element.charCodeAt() >= 48 && element.charCodeAt() <= 57) {
                cvvDiv.classList.add("has-success");   
                    return element;    
            } else {
                cvvDiv.classList.add("has-error"); 
                return false;           
            }
        })      
    } else {
        cvvDiv.classList.add("has-error");       
    }
}

// se declara la función que valida el nombre.
const validCardName = form => {
    let name = Array.from(colectionToArray[3].value.trim().toLowerCase());
    // let words = name.join("");
    // let wordsArray = words.split(" ");
    
    // const logic = wordsArray.forEach((element, index, array) => {
    //     if (element.charCodeAt() >= 97 && element.charCodeAt() <= 122 || element.charCodeAt() === 32) {
    //         console.log(element);  
    //     } else {
    //         console.log(false);
            
    //     }
        
    // })
    if (name.length >= 3 && name.length <= 30) {
        const validateName = name.map(element => {
            if (element.charCodeAt() >= 97 && element.charCodeAt() <= 122 || element.charCodeAt() === 32) {
                // console.log(element); 
                return element  
            } else {
                console.log(("no está dentro del rango"));
            }
            
        })
        const ash = validateName.join("").split(" ");
        if (ash.length >= 2) {
            console.log(ash);
            
        } else {
            console.log("escribe mínimo dos palabras");  
        }
        
    } else {
        console.log("Escribe mínimo 2 caracteres");
        
    }   
}


// const validCardName = form => {
//     let inputValue = Array.from(colectionToArray[3].value.trim().toLowerCase());
//     inputValue = (inputValue.length >= 3 && inputValue.length <= 30) ? console.log(inputValue) : console.log("no es mayor");
    
    
// } 
// primero hago el conteo de las letras y sin son mayores o igual a dos y menores o igual a 31, entonces hace el recorrido.
// Y una vez hecho el recorrido (tal vez con el forEach), se compara el valor del input con el dófigo ascii y tiene que ser 
// mayor o igual a 97 y menor o igual a 12 y si esto es verdadero, se hace el split y su longitud tiene que ser mayor o igaul a 2.