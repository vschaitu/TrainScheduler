// Initialize Firebase

var config = {
    apiKey: "AIzaSyCPEbyAsvYzBwvORtniXqMYVE9VcGhgaIA",
    authDomain: "inclasswork-678a7.firebaseapp.com",
    databaseURL: "https://inclasswork-678a7.firebaseio.com",
    projectId: "inclasswork-678a7",
    storageBucket: "inclasswork-678a7.appspot.com",
    messagingSenderId: "1072302891379"
};
firebase.initializeApp(config);


// Assign the reference to the database to a variable named 'database'
var database = firebase.database();


//Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStarttime = $("#time-input").val().trim();
    var trainFrequency = parseInt($("#frequency-input").val().trim());
    
    // Check train name entered
    if (trainName === "") {
        alert("Must enter Train Name!");
        console.log("hi");
        return false;
    }

    // Check destination  entered
    if (trainDestination === "") {
        alert("Must enter Destination!");
        return false;
    }

    // Check frequency  entered
    if (isNaN(trainFrequency) || (trainFrequency > 240)) {
        alert("Invalid frequency or more than 4hrs!");
        return false;
    }

    // Check start time entered is valid
    if (moment(trainStarttime, "H:mm", true).isValid()) {

    } else {
        alert("Invalid Start time of Train!");
        return false;
    };





    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        starttime: trainStarttime,
        frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Alert
    alert("Train Info successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {


    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var starttime = childSnapshot.val().starttime;
    var frequency = childSnapshot.val().frequency;
    var minaway;
    var nextTime;

    // Convert to seconds
    var freq = frequency * 60;

    // get current time
    var now = moment();
    var unixNow = moment(now).format("X");

    // From start time check the time of the next train
    var startval = moment().format("MM/DD/YY") + " " + starttime;
    var fmt = moment(startval, "MM/DD/YY H:mm");
    var timeNow = moment(fmt).format("X")

    // find the unix time diff between start time of train with curret time of day
    var dif = (timeNow - unixNow);

    // Check if time past the start time of train in a day get next time by adding freqnency factor
    if (dif < 0) {
        dif = dif * -1;
        timeNow = parseInt(timeNow) + ((parseInt(dif / freq) + 1) * freq);
        dif = (timeNow - unixNow);
        remin = parseInt(dif / 60);
    };

    var remin = parseInt(dif / 60);

    // Final remaining time in minutes & next train time
    minaway = remin;
    nextTime = moment.unix(timeNow).format("h:mm A");

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTime + "</td><td>" + minaway + "</td></tr>");
});
