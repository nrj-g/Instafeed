angular.module('starter.services',[])

.factory('form',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/form',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        get:function(scope,resCallback){
			var form = Parse.Object.extend("form");
			var query = new Parse.Query(form);
			query.equalTo("hash", "#MSEpresentation");
			query.find({
				success: function(results) {
					resCallback.call(scope,results[0].get('layout'),1);
			},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
		},
		
        getResult:function(scope,resCallback){
		},
		
		getLocation:function(scope,rescallback){
		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				console.log("Geolocation is not supported by this browser.");
			}
			function showPosition(position) {
				rescallback.call(scope,[position.coords.latitude,position.coords.longitude])
			}
		},
		
		insert:function(ip,lat,longi,result){
			
				//var ip = [9,8,"prafulla","no"];
				//Extend the native Parse.Object class on the basis of parameter result (if its result or layout)
				if(result == 1){
					var Input = Parse.Object.extend("results");
					//Instantiate an object of the Input class
					var input = new Input();
					//listItem is now the object that we want to save, so we assign the properties that we want on it.
					//input.set("fid", "somefid");
					input.set("user_input", ip);
				}
				else{
					var Input = Parse.Object.extend("form");
					//Instantiate an object of the Input class
					var input = new Input();
					//listItem is now the object that we want to save, so we assign the properties that we want on it.
					//input.set("fid", "somefid");
					console.log("logging 4m insert");
					console.log(ip);
					input.set("layout", ip);
					input.set("latitude", lat);
					input.set("longitude", longi);
				}
				
 
				//We call the save method, and pass in success and failure callback functions.
				input.save(null, {       
					success: function(item) {
					console.log("insert success");
					//Success Callback 
				},
				error: function(gameScore, error) {
					console.log("insertion failed");
					//Failure Callback
				}
				});
			},
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/form',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/form/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/form/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}])

.value('PARSE_CREDENTIALS',{
    APP_ID: 'ojt8l3zRlv5UB2ZX196lefTmnvP7mleBInzOyJMq',
    REST_API_KEY:'xwztpbOdOvwbjq6n3hXwxMsfd84gj6w2N1WSXCNB'
})

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})


.factory('AddFeedBackQuestionsObject', function(){
    return {type:"long", myquestion:"Seom",myargs:[]};
})

.factory('globalFunctions', function(){
    return {
        genElement : function(type,question,args) //i think u need to put it in services.
            {       
                //long question   myargs:   0: Rows           1: placeholder
                //rating question myargs:   0: Starting Range 1: Ending Range        
                //select question myargs:   0: option1        1: option2       ..... onwards
                //date question myargs: []
                //number question myargs:   0: placeholder
                //yesorno question myargs:  0: yes value      1: no
                var s;
                if(type === 'rating')
                {   
                    //type = rating, args = [Label]
                    //rating question myargs:   0: Starting Range 1: Ending Range        
                    s='<div class="card">\
                            <h4>' +question + '</h4>\
                                <div class="range range-positive">\
                                    <i class="icon ion-sad"></i>\
                                    <input type="range" name="volume">\
                                    <i class="icon ion-happy"></i>\
                                </div>\
                        </div>';
                }
                else if(type === 'number')
                {
                    //type = number, args = [Label,placeholder]
                    //number question myargs:   0: placeholder
                    s = '<div class="card">\
                        <label class="item item-input no-list-border">\
                            <span class="input-label h4">'+question+'</span>\
                            <input type="number" placeholder="'+args[0]+'">\
                        </label>\
                    </div>';
                }
                else if(type === 'date')
                {
                    //type = date, args = [Label]
                    //date question myargs: []
                    s = '<div class="card">\
                            <label class="item item-input no-list-border">\
                                <span class="input-label h4">'+question+'</span>\
                                <input type="date" placeholder="dd/mm/yyyy">\
                            </label>\
                        </div>';
                }
                else if(type === 'long')
                {
                    //type = long, args = [Label,placeholder,rows]
                    //long question   myargs:   0: Rows           1: placeholder
                    s = '<div class="card">\
                            <h4>'+question+'</h4>\
                            <textarea placeholder="'+ args[1] +'" rows='+ args[0] +'>\</textarea>\
                        </div>';
                }
                else if(type === 'yesorno')
                {
                    //type = boolean, args = [Label]
                    //yesorno question myargs:  0: yes value      1: no
                    s = '   <div class="card">\
                                  <label class="item item-toggle no-list-border">\
                                     <span class="h4">'+question+'</span>\
                                     <label class="toggle toggle-positive">\
                                       <input type="checkbox" ng-model="yesornoValueBool" ng-change="yesOrNoFunc()">\
                                       </div>';
                }
                else if(type === 'select')
                {
                    //type = select, args = [Label,[<option1>,<option2>]]
                    //select question myargs:   0: option1        1: option2       ..... onwards
                    s = '<div class="card">\
                            <label class="item item-input item-select no-list-border">\
                                <div class="input-label">\
                                  <span class="h4">'+question+'</span>\
                                </div>\
                                <select>';
                                
                                for(var i=0;i<args.length;i++)
                                    s+= '<option>'+args[i]+'</option>';
                                  
                    s +=        '</select>\
                             </label>\
                        </div>';
                    //return s;
                }
                return s;
                //return $sce.trustAsHtml(s);
            }
    }
});

