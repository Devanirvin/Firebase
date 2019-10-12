var firebaseConfig = {
    apiKey: "AIzaSyDEHkTmZVmowtqC_5W1RwlcGG07a0lPPRc",
    authDomain: "devan-project.firebaseapp.com",
    databaseURL: "https://devan-project.firebaseio.com",
    projectId: "devan-project",
    storageBucket: "devan-project.appspot.com",
    messagingSenderId: "343120962549",
    appId: "1:343120962549:web:bcc0dbac97b2de85"
  };
 
  firebase.initializeApp(firebaseConfig);

   
  var database = firebase.database();

  
  var trainName = "";
  var trainDestination = "";
  var trainFrequency = 0;
  var trainTime = "";
  var clickCounter = 1;

  var database = firebase.database();

  //Declaring the current time
  var currentTime = moment().format();
  
  //Logging the current time
      console.log("Current Time: " + currentTime);
                  
  //When the submit button is clicked, we will run the snapshot function below.
   $("#add-train").on("click", function(event){
        // Prevent the page from refreshing
        event.preventDefault();
  
        // Grabs user input
        trainName = $("#trainNameForm").val().trim();
        trainDestination = $("#destinationForm").val().trim();
        trainTime = moment($("#trainTimeForm").val().trim(), "HH:mm").format("HH:mm");
      //Saving this goodness
  //	  var frequencyForm = moment($("#frequencyForm").val().trim().format("mm"));
        var frequencyForm = $("#frequencyForm").val().trim();
  
        // Creates local "temporary" object for holding inputs
        var newTrain = {
          train: trainNameForm,
          destination: destinationForm,
          first: trainTimeForm,
          frequency: frequencyForm
      };
      //Setting the new values in the database
      database.ref().push(newTrain);
      
      //Console.logging to make sure the new data has been stored to the database
      console.log(newTrain.train);
        console.log(newTrain.destination);
      console.log(newTrain.first);
      console.log(newTrain.frequency);
      
      //Clearing the inputs
       $("#trainNameForm").val("");
         $("#destinationForm").val("");
       $("#trainTimeForm").val("");
       $("#frequencyForm").val("");
  });
  
  //Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
      
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;
    
    //Variable to figure out the converted train time
    var trainTimeConverted = moment(trainTime, "HH:mm");
      
    //Declaring a time difference variable
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
      console.log(timeDifference);
      
    var frequencyMinutes = childSnapshot.val().frequency;
      console.log("Frequency Minutes: " + frequencyMinutes);
    
    var minutesAway = Math.abs(timeDifference % frequencyMinutes);
        console.log("Minutes Away: " + minutesAway);
    
    var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
      console.log("Next Arrival: " + nextArrival);
      
      
    //Adding into the table
    $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  });

  
