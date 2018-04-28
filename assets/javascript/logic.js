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
// var database = ...


var database = firebase.database();



// Initial Values
var initialBid;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;
var dbObj;

// --------------------------------------------------------------

//  At the page load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function (dbval) {
    dbObj = dbval.val();
    console.log(dbObj);
    initialBid = dbObj.price;
    console.log(initialBid);
    initialBidder = dbObj.name;
    $('#highest-bidder').text(dbObj.name);
    $('#highest-price').text(dbObj.price);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// If Firebase has a highPrice and highBidder stored (first case)
$(document).on("click", '#submit-bid', function (event) {
    event.preventDefault();
    console.log(initialBid);
    if ($('#bidder-price').val() > initialBid) {
        database.ref().set({
            'name': $('#bidder-name').val(),
            'price': $('#bidder-price').val()
        });
    }
    $('#bidder-name').val("");
    $('#bidder-price').val("");
});

// Set the variables for highBidder/highPrice equal to the stored values in firebase.
// highPrice = ...
// highBidder = ...


// Change the HTML to reflect the stored values



// Print the data to the console.


// Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.


// Change the HTML to reflect the initial values


// Print the data to the console.




// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button

// prevent form from submitting with event.preventDefault() or returning false

// Get the input values


// Log the Bidder and Price (Even if not the highest)


// If Then statements to compare against previous high bidder


// Alert that they are High Bidder


// Save the new price in Firebase


// Log the new High Price


// Store the new high price and bidder name as a local variable (could have also used the firebase variable)


// Change the HTML to reflect the new high price and bidder

// Else tell user their bid was too low via alert