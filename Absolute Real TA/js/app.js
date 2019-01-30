let app = angular.module("app",["ngRoute"])

var ori,desti,depart_date,return_date,tipe
var totalHarga
var firstName, lastname, birthDate,gender
var departTime1, arrivalTime1, departTime2,arrivalTime2
app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/about',{
        templateUrl: 'pages/about.html',
        //controller: 'gemListController'
    })
    .when('/departure',{
        templateUrl: 'pages/departure.html',
        controller: 'departController'
    })
    .when('/round-trip',{
        templateUrl: 'pages/round-trip.html',
        controller: 'mainController'
    })
    .when('/rincian',{
        templateUrl: 'pages/rincianTamu.html',
        controller:'rincianController'
    })
    .when('/confirm',{
        templateUrl: 'pages/confirmation.html',
        controller:'confirmController'
    })
    .when('/thx',{
        templateUrl: 'pages/thankyou.html'
    })
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
})

app.controller('mainController',function($scope,$http){
    $http.get('json/bandara.json').then(function(response){
        console.log(response.data)
            $scope.bandara = response.data
    })
    $('#Mainbutton').on('click',function(){
        ori = $('#origin').val()
        desti = $('#desti').val()
        depart_date = $('#depart-date').val()
        return_date = $('#return-date').val()
        tipe = $("input[name='customRadio']:checked").val()
        console.log(tipe)
    })
})

app.controller('departController',function($scope,$http){
    $http.get('json/plane.json').then(function(response){
        console.log(response.data)
            $scope.plane = response.data
    })
    $scope.totalPrice = 0
    $scope.temporary1 = 0
    $scope.temporary2 = 0
    if(tipe=="Round Trip"){
        $scope.returnTrip = true
    }
    else{
        $scope.returnTrip = false
    }
    $scope.departPlane = function(pla){
        $scope.state1 = {};
        $scope.state1.activeItem = ''
        $scope.temporary1 = pla.Price
        $scope.totalPrice = $scope.temporary1 + $scope.temporary2
        totalHarga = $scope.totalPrice
        departTime1 = pla.Depart
        arrivalTime1 = pla.Arrival

    }
    $scope.returnPlane = function(pla){
        $scope.state2 = {};
        $scope.state2.activeItem = ''
        $scope.temporary2 = pla.Price
        $scope.totalPrice = $scope.temporary1 + $scope.temporary2 
        totalHarga = $scope.totalPrice
        departTime2 = pla.Depart
        arrivalTime2 = pla.Arrival
    }
    $scope.rutePergi = ori + ' - ' + desti
    $scope.ruteKembali = desti + ' - ' + ori
    
})

app.controller('rincianController',function($scope){
    $scope.totalPrice = totalHarga
    $scope.detailCust = function(){
        firstName =  $('#first').val() 
        lastname = $('#last').val()
        birthDate = $('#bod').val()
        gender = $("input[name='gender']:checked").val()
    }
    

    
})

app.controller('confirmController',function($scope){
    $scope.totalPrice = totalHarga
    $scope.givenName = firstName
    $scope.familyName = lastname
    $scope.dateOfBirth = birthDate
    $scope.yourGender = gender
    $scope.origin = ori
    $scope.destination = desti
    $scope.departDate = depart_date
    $scope.returnDate = return_date
    $scope.departTimeX = departTime1
    $scope.arrivalTimeX = arrivalTime1

    if(tipe == "Round Trip")
    {
        $scope.round_trip = true
        $scope.departTimeY = departTime2
        $scope.arrivalTimeY = arrivalTime2
    }
    
})