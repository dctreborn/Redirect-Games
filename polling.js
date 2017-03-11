$(document).ready(function(){

    $("#chart_div").hide();

    var config = {
        apiKey: "AIzaSyB2YikVIlcCrguTlse-VReHgt9HE_unE9w",
        authDomain: "polling-test-474df.firebaseapp.com",
        databaseURL: "https://polling-test-474df.firebaseio.com",
        storageBucket: "polling-test-474df.appspot.com",
        messagingSenderId: "583240150396"
      };


    firebase.initializeApp(config);

    var database = firebase.database();

    var dbRef = database.ref();


    dbRef.child('bestGames').child('donkeyKong').set({ "name": "donkeyKong", "count": 0});

    dbRef.child('bestGames').child('galaga').set({ "name": "galaga", "count": 0});

    dbRef.child('bestGames').child('pacMan').set({ "name": "pacMan", "count": 0});

    dbRef.child('bestGames').child('marioParty').set({ "name": "marioParty", "count": 0});

    dbRef.child('bestGames').child('pong').set({ "name": "pong", "count": 0});


    var gameSelected = $('input[name=best_game]:checked').val();


    database.ref().on("value", function(snapshot){
        console.log(snapshot.val());

        })

    //updates the firebase base with the correct number of votes for each game when the user clicks the submit button and the redraws the chart based on the number of user votes

    $("#game-submit").on("click", function(e) { 
        e.preventDefault();
        var gameSelected = $('input[name=best_game]:checked').val();
        dbRef.child('bestGames').orderByChild('name').equalTo(gameSelected).on('child_added', function(data) {
            var newData = data.val();
            newData.count += 1;
            dbRef.child('bestGames').child(gameSelected).update(newData);
        });

       updateFireBaseVotes(); 
       drawChart();
       $("#chart_div").show();
       $("#questions").hide();


    });
    



      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      
      function drawChart() { 

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Games');
        data.addColumn('number', 'Votes');
        data.addRows([
          ['Donkey Kong', dkCount],
          ['PacMan', pmCount],
          ['Pong', pongCount],
          ['Mario Party', mpCount],
          ['Galaga', galagaCount],
        ]);

        // Set chart options
        var options = {'title':'Best Classic Video Games',
                       'width':500,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

        //defines the variables that hold the vote values stored in the firebase database
        var dkCount,pongCount,galagaCount,mpCount,pmCount;

        //grabs the count values for each game from the database and saves them to the individual count variables
        function updateFireBaseVotes() {
                database.ref('bestGames/donkeyKong/count').on("value", function(data){
                dkCount = data.val();
                });
                
                database.ref('bestGames/pacMan/count').on("value", function(data){
                pmCount = data.val();
                });

                database.ref('bestGames/galaga/count').on("value", function(data){
                galagaCount = data.val();
                });

                database.ref('bestGames/marioParty/count').on("value", function(data){
                mpCount = data.val();
                });

                database.ref('bestGames/pong/count').on("value", function(data){
                pongCount = data.val();
                });
        }

});



















