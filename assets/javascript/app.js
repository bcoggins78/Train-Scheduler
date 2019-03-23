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

  var database = firebase.database();


  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#firsttime-input").val().trim();  // <--- Convert to Military Time
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firsttime-input").val("");
    $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    // Calculate Next Arrival
    var nextArrival

    // Calculate Minutes Away
    var minutesAway
    
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