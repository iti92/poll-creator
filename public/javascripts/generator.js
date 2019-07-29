//Elements selected from radio
function drawOptions() {
    let valueOfDropBox = document.getElementById("exampleFormControlSelect1").value;
    let divWithChoice = document.getElementById("exampleFormControlSelect1");
    console.log(valueOfDropBox)
    document.getElementById("hidden-type").value = valueOfDropBox;

}

function formOptions(){
    let valueOfDropBox = document.getElementById("documentId").value;
    document.getElementById("hidden-id").value = valueOfDropBox;
}

//Create and delete input for survey
function radioCreate() {
    let input = document.createElement('input');
    input.setAttribute("type", "text")
    input.setAttribute("name", "option")
    input.setAttribute("class", "inputTextForm form-control")
    let newBlockGenerated = document.getElementById("new-block-generator");
    newBlockGenerated.appendChild(input);
}

function radioDelete() {
    let newBlockGenerated = document.getElementById("new-block-generator");
    newBlockGenerated.removeChild(newBlockGenerated.lastChild);
}

function textInputCreate(){
    let div = document.createElement('div');
    let label = document.createElement('label');
    let input = document.createElement('input');
    div.setAttribute('class', 'text input')
    label.s
    input.setAttribute("class", "inputTextForm form-control")
}