
// jalar formulario
// convertirlo a Array.apply
const form = document.querySelector("form");
// console.log(form);
const colectionToArray = Array.from(form);
// console.log(colectionToArray);
form.addEventListener("submit", e => {
    e.preventDefault();
    validCardCredentials(form);
    cardVerificationValue(form);
});

function validCardCredentials(form) {
    let numberCard = colectionToArray[0].value;
    if (numberCard.charCodeAt() >= 48 && numberCard.charCodeAt() <= 57) {
        let numberArray = Array.from(numberCard);
        if (numberArray.length === 16) {
            let reverseArray = numberArray.reverse();
            const hola = reverseArray.map((element, index) => {
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
            if (hola % 10 == 0) {
                console.log("tarjeta válida");    
            } else {
                console.log("tarjeta inválida");    
            } 
        } else {
            console.log("inválido");            
        }
    } else {
        console.log(false);        
    }
}



const cardVerificationValue = form => {
    const date = Array.from(colectionToArray[2].value);
    if (date.length === 3) {
        date.forEach(element => {
            if (element.charCodeAt() >= 48 && element.charCodeAt() <= 57) {
                    console.log(element);   
                    return element;    
            } else {
                console.log(false); 
                return false;           
            }
        })      
    } else {
        console.log("adiós");       
    }
}


