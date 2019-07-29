const name = "Что болит?";

let variants = ['голова', 'горло','туловище','ноги','ухи','почка'];
//let variants = ['голова', 'горло','туловище'];

function createRadiobutton(variants, name){
    
    
    for(let i = 0;i < variants.length; i++){
        let input = document.createElement('input');
        let p = document.createElement('p');
        let someText = document.createElement('label');
        input.setAttribute('name','opros');
        input.setAttribute('type','radio');
        input.setAttribute('value',variants[i]);
        someText.innerText=variants[i];
        document.getElementById('formGenerator').appendChild(p).appendChild(input);
        document.getElementById('formGenerator').appendChild(p).appendChild(someText)
    }
}
createRadiobutton(variants);