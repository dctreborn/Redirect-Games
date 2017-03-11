$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyB2YikVIlcCrguTlse-VReHgt9HE_unE9w",
        authDomain: "polling-test-474df.firebaseapp.com",
        databaseURL: "https://polling-test-474df.firebaseio.com",
        storageBucket: "polling-test-474df.appspot.com",
        messagingSenderId: "583240150396"
      };

    var bestGames = [
        {
            name: "donkeyKong",
            count: 0
        },
        {
            name: "marioParty",
            count: 0
        },
        {
            name: "galaga",
            count: 0
        },
        {
            name: "pong",
            count: 0
        },
        {
            name: "pacMan",
            count: 0
        }
    ];

    firebase.initializeApp(config);

    var dbRef = firebase.database();

    var gameSelected = $('input[name=best_game]:checked').val();


    dbRef.ref().on("value", function(snapshot){
        console.log(snapshot.val());

    })

    function writeGameData () {
        dbRef.ref().set({
            donkeyKong: bestGames[0].count,
            marioParty: bestGames[1].count,
            galaga: bestGames[2].count,
            pong: bestGames[3].count,
            pacMan: bestGames[4].count

        });
    }

    writeGameData();

    $("#game-submit").on("click", function(e) {
        var gameSelected = $('input[name=best_game]:checked').val();
        console.log(gameSelected);
        e.preventDefault();
            
            for (i=0; i<bestGames.length; i++) {

              if(gameSelected == bestGames[i].name) {
                bestGames[i].count++;
                var bestGames = bestGames[i].name;

                dbRef.ref().set({
                    pollingResults: bestGames
                    
                });
              }  
            }

        });

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

       var pollingResults = dbRef.bestGames;
       console.log(pollingResults);
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Games');
        data.addColumn('number', 'Votes');
        data.addRows([

          [bestGames[0].name, bestGames[0].count],
          [bestGames[1].name, bestGames[1].count],
          [bestGames[2].name, bestGames[2].count],
          [bestGames[3].name, bestGames[3].count],
          [bestGames[4].name, bestGames[4].count]
        ]);

        // Set chart options
        var options = {'title':'Best Classic Video Games',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
});



















