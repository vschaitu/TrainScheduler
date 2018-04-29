// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

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
console.log("hi",database);



// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStarttime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      starttime: trainStarttime,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train Info successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var starttime = childSnapshot.val().starttime;
    var frequency = childSnapshot.val().frequency;
    var minaway = "0";
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(starttime);
    console.log(frequency);
  
    // // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + starttime + "</td><td>" + minaway + "</td></tr>");
  });
  