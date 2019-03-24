$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnHwLO9LueMKMYvhgRUK2IoyuD5LV7VGA",
    authDomain: "trainscheduler-dbaca.firebaseapp.com",
    databaseURL: "https://trainscheduler-dbaca.firebaseio.com",
    projectId: "trainscheduler-dbaca",
    storageBucket: "trainscheduler-dbaca.appspot.com",
    messagingSenderId: "480317516197"
  };
  firebase.initializeApp(config);

  // Creates the variable to reference the database
  var database = firebase.database();

  // When the submit button is pressed the values of each field are captured and sent to Firebase
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Variables equal to the value entered on the input form
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#firsttime-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    // Database object showing the keys
    var newTrain = {
      name: trainName,
      destination: trainDest,
      time: trainTime,
      frequency: trainFreq,
    };

    //  Adds the new train details to the database
    database.ref().push(newTrain);

    alert("Train successfully added");

    // Resets the fields on the form
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firsttime-input").val("");
    $("#frequency-input").val("");

  });

  // Grabs the existing train entries in the database and displays them under the Current Train Schedule
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Define variable with the value equal what is coming from the database snapshot
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency

    
    // Calculates how many minutes until the next train and the arrival time

    // Convert time
    var convertTime = moment(trainTime, "HH:mm").subtract(1, "years");
    // Difference between the times
    var diffTime = moment().diff(moment(convertTime), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    // Minute Until Train
    var minutesAway = trainFreq - tRemainder;
    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");

    // Adds row to the Current Train Schedule
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );

    $("#train-table > tbody").append(newRow);
  });




























});