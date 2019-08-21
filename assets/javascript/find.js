//Connecting the firebase

var config = {
    apiKey: "AIzaSyC4Hpr6xwLdePHgbr-9JpPr3GTJxm1bM18",
    authDomain: "val-s-78fb3.firebaseapp.com",
    databaseURL: "https://val-s-78fb3.firebaseio.com",
    projectId: "val-s-78fb3",
    storageBucket: "",
    messagingSenderId: "385745409028",
    appId: "1:385745409028:web:624428a5597065f5"
  };

    firebase.initializeApp(config);

    var database = firebase.database();
  
   
    
//Weather info with Dark Sky API ----------------------------------------------------------------------------------
 
var dslink ="https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/931a24fb86c0e16f5b65657a523b3b6a/37.7749,-122.4194";
  $.ajax({
    url: dslink,
    method: "GET",
    success: function (e){
        console.log(e.currently);
        var t=e.currently.summary;
        var d=e.currently.temperature;
        var w=e.currently.windSpeed;
        $("#weather").append("<img src=assets/images/w.gif>");
        $("p").text("San Francisco = " +t);
        $("ul").append("<p>"+"Temperature = "+d+"</p>","<p>"+"Wind Speed = "+w+"</p>"); //creating the new p-tag and put the value of temprature and windspeed in it
    }
});

//Places info with Yelp API ---------------------------------------------------------------------------------------
 
var int;
 
function t(){
      var ylink = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="+int+"&limit=50&location=San francisco";
      
$.ajax({
   url: ylink,
   headers: {
    'Authorization':'Bearer ygzo2cbJjvrHGClqUm3mSHfok9ZijgsGAaFe3za7ZnotunjVzfyC_KuA7WsTh0w36I981NmKURz6JV4JHQRkIl1_riqh2v-E-rcZTTfDIZF20j5F8l_VG7kIlL9IXXYx ',
},
   method: 'GET',
   dataType: 'json',
   success: function(data){
   console.log(data);

  
      drawTable(data);
     
}
});
}
function drawTable(data) {
    for (var i = 0; i < 50; i++) {
        drawRow(data.businesses[i]);
    }
 }

 function drawRow(rowData) {
   
  var row = $("<tr />")
  $("#tbl").append(row);
  row.append($("<td>" +("<img src="+ rowData.image_url)+" "+ "</td>"));
  row.append($("<td class="+"l"+">" + rowData.name + "</td>"));
  row.append($("<td>" + rowData.rating + "</td>"));
  row.append($("<td>" + rowData.display_phone + "</td>"));
  row.append($("<td>" + rowData.location.address1 + "</td>"));
  row.append($("<input class="+"ck"+"  value=" +rowData.name+"  type="+"checkbox"+"></input>"));

  
}
var npl;
   $(document).on("click","#ls",function(){
 
      $("#tbl").empty();
      int=$("#inps").val();
      
        t();
        
   });

   var arr=[];
   var n;
      $(document).on("click",".ck",function(){
       n=$(this).val();
   arr.push(n)
   
      
      })
   
      $(document).on("click","#save",function(){
   
       npl=$("#name").val();
   
          database.ref(npl).push({
           
           name:arr
           
            });
    });
   



 