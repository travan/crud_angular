var app=angular.module('HelloQuotes',[]);

app.controller('myQuotes',function($http){
    var myQ=this;
    myQ.quotes={};
    $http.get('/quotes').success(function(data){
        myQ.quotes=data;
    })
});
app.controller('createQuotes', function($http){
    var myQ=this;
    myQ.quotes={};
    this.addQ=function(quote){
        $http({
            method : "POST",
            url : "/quotes",
            headers: {'Content-Type': 'application/json'},
            data:{name:quote.name, quote:quote.quote}
        }).success(function(){
            myQ.quotes.name=quote.name;
            myQ.quotes.quote=quote.quote;
            console.log(myQ.quotes);
        })  
    }
});
app.controller('updateQuotes', function($http){
    this.updateQ=function(){
        var data = {name: 'ahihihi',quote: 'ahiahaihaia'};
        console.log(data);
        $http({
            method : "PUT",
            url : "/quotes",
            headers: {'Content-Type': 'application/json'},
            data:data
        }).success(function(){
            console.log('success');
        })  
    }
});
app.controller('deleleQuotes', function($http){
    this.deleteQ=function(){
        var data = {name: null,quote: null};
        console.log(data);
        $http({
            method : "DELETE",
            url : "/quotes",
            headers: {'Content-Type': 'application/json'},
            data:data
        }).success(function(){
            console.log('success');
        })  
    }
});