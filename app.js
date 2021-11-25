var pointDate;
var pointValue;
var thirtyDayPoints = 2.5;
var ninetyDayPoints = 5.5;
var oneEightyDayPoints = 8.5;
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
    pointUpdate();
    textUpdate();
});

document.getElementById("resetButton").addEventListener("click", function(){
    thirtyDayPoints = 2.5;
    ninetyDayPoints = 5.5;
    oneEightyDayPoints = 8.5;
    textUpdate();
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
    document.getElementById("30DayText").innerHTML = "You have " + thirtyDayPoints + " points left for the next 30 days"; 
    document.getElementById("90DayText").innerHTML = "You have " + ninetyDayPoints + " points left for the next 90 days"; 
    document.getElementById("180DayText").innerHTML = "You have " + oneEightyDayPoints + " points left for the next 180 days";
    document.getElementById("date-time").innerHTML = "Current Date and Time is  " + todaysDate;
}
