var counter = 1;
//Input Values
var pointDate;
var pointValue;
//Text for HTML
var dateText;
var pointText;
//Table Variables
var newRow;
var tableDate;
var tablePoint;
var tableRemove;
//Points for SAP
var thirtyDayPoints = 2.5;
var ninetyDayPoints = 5.5;
var oneEightyDayPoints = 8.5;
//Arrays
const dateArr = [];
const pointArr = [];
const trackerArr = [];
//Dates for Calculations
const todaysDate = new Date();
const thirtyDayDate = new Date();
const ninetyDayDate = new Date(); 
const oneEightyDayDate = new Date();
thirtyDayDate.setDate(new Date().getDate() - 30);
ninetyDayDate.setDate(new Date().getDate() - 90);
oneEightyDayDate.setDate(new Date().getDate() - 180);

document.getElementById("submitButton").addEventListener("click", function(){
    pointDate = new Date(document.getElementById("date").value);
    pointValue = document.getElementById("value").value;
    if(pointDate.valueOf()){
        if((pointValue == null || pointValue == "") || (pointValue != 0.5 && pointValue != 1.0)){
            alert("Enter a valid point value");
        }
        else{
            if(dateArr.includes(pointDate.toLocaleDateString("en-us"))){
                alert("Date already entered. Enter another date");
            }
            else{
                dateArr.push(pointDate.toLocaleDateString("en-us"));
                pointArr.push(pointValue);
                pointUpdate();
                textUpdate();
                tableUpdate();
            }
        }
    }
    else{
        alert("Enter a valid date");
        if((pointValue == null || pointValue == "") || (pointValue != 0.5 && pointValue != 1.0)){
            alert("Enter a valid point value");
        }
    }
});

document.getElementById("resetButton").addEventListener("click", function(){
    thirtyDayPoints = 2.5;
    ninetyDayPoints = 5.5;
    oneEightyDayPoints = 8.5;
    dateArr.length = 0;
    pointArr.length = 0;
    trackerArr.length = 0;
    textUpdate();
    counter = 1;
    document.getElementById("jsTable").remove();
});

function pointUpdate(){
    //30 day check
    if(pointDate.getTime() >= thirtyDayDate.getTime() && pointDate.getTime() <= todaysDate.getTime()){
        thirtyDayPoints -= pointValue;
    }
    
    //90 day check
    if(pointDate.getTime() >= ninetyDayDate.getTime() && pointDate.getTime() <= todaysDate.getTime()){
        ninetyDayPoints -= pointValue;
    }
    
    //180 day check
    if(pointDate.getTime() >= oneEightyDayDate.getTime() && pointDate.getTime() <= todaysDate.getTime()){
        oneEightyDayPoints -= pointValue;
    }
}

function textUpdate(){
    if(thirtyDayPoints >= 0){
        document.getElementById("30DayText").innerHTML = "You have " + thirtyDayPoints + " points left for the next 30 days"; 
    }else{
        document.getElementById("30DayText").innerHTML = "You will get a reprimand for the 30 day period";
    }

    if(ninetyDayPoints >= 0){
        document.getElementById("90DayText").innerHTML = "You have " + ninetyDayPoints + " points left for the next 90 days";
    }else{
        document.getElementById("90DayText").innerHTML = "You will get a reprimand for the 90 day period";
    }

    if(oneEightyDayPoints >= 0){
        document.getElementById("180DayText").innerHTML = "You have " + oneEightyDayPoints + " points left for the next 180 days";
    }else{
        document.getElementById("180DayText").innerHTML = "You will get a reprimand for the 180 day period";
    }
    
    document.getElementById("date-time").innerHTML = "Current Date and Time is  " + todaysDate;
}

function tableUpdate(){
    trackerArr.push(counter);
    if(counter == 1){
        //body reference 
        var html = document.getElementById("table");

        // create elements <table> and a <tbody>
        var tbl = document.createElement("table");
        var tblHead = document.createElement("thead");
        var tblBody = document.createElement("tbody");
        tblBody.setAttribute("id", "jsBody");

        // append the <thead> and <tbody> inside the <table>
        tbl.appendChild(tblHead);
        tbl.appendChild(tblBody);
        // put <table> in the <body>
        html.appendChild(tbl);
        // tbl border attribute to 
        tbl.setAttribute("id", "jsTable");
        tbl.setAttribute("border", "2");
        tbl.setAttribute("class", "tblcenter");


        var firstRow = document.createElement("tr");
        var datesHeading = document.createElement("th");
        datesHeading.innerHTML = "Date";
        var pointsHeading = document.createElement("th");
        pointsHeading.innerHTML = "Point Value";
        var removeHeading = document.createElement("th");
        removeHeading.setAttribute("class", "remove");
        removeHeading.innerHTML = "Remove"

        firstRow.appendChild(datesHeading);
        firstRow.appendChild(pointsHeading);
        firstRow.appendChild(removeHeading);
        tblHead.appendChild(firstRow);

        newRow = tbl.insertRow();
        tableDate = newRow.insertCell();
        tableDate.innerHTML = pointDate.toLocaleDateString("en-us");
        tablePoint = newRow.insertCell();
        tablePoint.innerHTML = pointValue;
        tableRemove = newRow.insertCell();
        tableRemove.innerHTML = "<button id=\"rmvBtn\" onclick=\"removeRow(" + counter + ")\">Remove</button>";

      /*let newRow = document.createElement("tr");
        let tableDate = document.createElement("td");
        tableDate.innerHTML = pointDate.toLocaleDateString("en-us");
        let tablePoint = document.createElement("td");
        tablePoint.innerHTML = pointValue;

        newRow.appendChild(tableDate);
        newRow.appendChild(tablePoint);
        tblBody.appendChild(newRow);*/
        counter++;
    }
    else{
        var tbl = document.getElementById("jsTable");
        newRow = tbl.insertRow();
        tableDate = newRow.insertCell();
        tableDate.innerHTML = pointDate.toLocaleDateString("en-us");
        tablePoint = newRow.insertCell();
        tablePoint.innerHTML = pointValue;
        tableRemove = newRow.insertCell();
        tableRemove.innerHTML = "<button id=\"rmvBtn\" onclick=\"removeRow(" + counter + ")\">Remove</button>";

        counter++;

      /*var tblBody = document.getElementById("jsBody");
        let newRow = document.createElement("tr");
        let tableDate = document.createElement("td");
        tableDate.innerHTML = pointDate.toLocaleDateString("en-us");
        let tablePoint = document.createElement("td");
        tablePoint.innerHTML = pointValue;

        newRow.appendChild(tableDate);
        newRow.appendChild(tablePoint);
        tblBody.appendChild(newRow);*/
    }
}

function removeRow(row){
    var x = trackerArr.indexOf(row);
    let removalDate = new Date(dateArr[x]);
    let removalValue = pointArr[x];
    //30 day check
    if(removalDate.getTime() >= thirtyDayDate.getTime() && removalDate.getTime() <= todaysDate.getTime()){
        thirtyDayPoints += parseFloat(removalValue);
    }

    //90 day check
    if(removalDate.getTime() >= ninetyDayDate.getTime() && removalDate.getTime() <= todaysDate.getTime()){
        ninetyDayPoints += parseFloat(removalValue);
    }

    //180 day check
    if(removalDate.getTime() >= oneEightyDayDate.getTime() && removalDate.getTime() <= todaysDate.getTime()){
        oneEightyDayPoints += parseFloat(removalValue);
    }

    document.getElementById("jsTable").deleteRow((x+1));
    trackerArr.splice(x,1);
    pointArr.splice(x,1);
    dateArr.splice(x,1);
    textUpdate();
    if(pointArr.length == 0){
        counter = 1;
        document.getElementById("jsTable").remove();
    }
}
