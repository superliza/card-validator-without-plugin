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
    let name = colectionToArray[3].value.trim();
    let mySplit = name.split(" ");
        // console.log(mySplit);

    if (mySplit.length > 1) {
        // console.log("hola");
        const validateName = mySplit.forEach(element => {
            if (element.length > 2 && element.length < 31) {
                let upperCaseLetters = element.charCodeAt() >= 65 && element.charCodeAt() <= 90;
                let lowerCaseLetters = element.charCodeAt() >= 97 && element.charCodeAt() <= 122;
                let space = element.charCodeAt() === 32;
                if (upperCaseLetters || lowerCaseLetters || space) {
                    console.log(element);        
                } else {
                    divName.classList.add("has-error");    
                }
            } else {
                divName.classList.add("has-error");
            } 
       });
   } else {
    divName.classList.add("has-error");    
   }
}