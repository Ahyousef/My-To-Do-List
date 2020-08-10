'use strict'

var allItems = [];

if (localStorage.getItem('allItems') !== null) {
    

var previousArray = JSON.parse( localStorage.getItem('allItems'));

allItems = previousArray;
}


function Item(task,date,urgency){
    this.task = task;
    this.date = date;
    this.urgency = urgency;
    allItems.push(this);
}

var form = document.getElementById('form-id');
var table = document.getElementById('table')

function generateItem(){
event.preventDefault();

var task = event.target.Task.value;
var date = event.target.Date.value
var urgency = event.target.Urgency.value

new Item(task,date,urgency)

stringifyArray();
console.log(localStorage);
location.reload();
}

function stringifyArray(){
    var stringifiedArray = JSON.stringify(allItems);
    localStorage.setItem('allItems',stringifiedArray)

}

function renderList(){
    for (let index = 0; index < allItems.length; index++) {
        var row = document.createElement('tr')
        var taskTd = document.createElement('td')
        var dateTd = document.createElement('td')
        var urgencyTd = document.createElement('td')
        var buttonTd = document.createElement('button')
    
        var task = allItems[index].task;
        var date = allItems[index].date;
        var urgency = allItems[index].urgency;

        taskTd.innerText = task;
        dateTd.innerText = date;
        urgencyTd.innerText = urgency;
        buttonTd.innerHTML = 'X' 
        buttonTd.setAttribute('onclick',('remove('+index + ")"))

        if (urgency == "Low") {
            urgencyTd.setAttribute('style',"color: red;");
            
        }
        else if ( urgency == 'Medium') {
                urgencyTd.setAttribute('style',"color: yellow;");
                
        }
        else if (urgency == 'High') {
                urgencyTd.setAttribute('style',"color: green;");
        }
    
        row.append(taskTd);
        row.append(dateTd);
        row.append(urgencyTd);
        row.append(buttonTd);
        table.append(row)        
    }
}

function clearAll(){
    localStorage.clear();
    location.reload();
}

function remove(index){
    for (let i = 0; i < allItems.length; i++) {
        if (allItems[index].task == allItems[i].task) {
            console.log('removing' + allItems[i].task);
            allItems.splice(index,1)
            stringifyArray();
            location.reload();
        }
        
    }
}

form.addEventListener('submit', generateItem)
renderList()