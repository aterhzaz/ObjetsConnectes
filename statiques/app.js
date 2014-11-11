(function(){

	var app = angular.module('tabApp', []);
	var socket = io();


	//récupérer la modification de l'état des tables depuis le serveur & l'afficher chez les autres clients
		app.factory('socket', function($rootScope) {
			var socket = io.connect();
			return {
				on: function(eventName, callback) {
						socket.on(eventName, function() {
						var args = arguments;
						$rootScope.$apply(function() {
							callback.apply(socket, args);
						});
					});
				},
				emit: function(eventName, data, callback) {
					socket.emit(eventName, data, function() {
						var args = arguments;
						$rootScope.$apply(function() {
							if(callback) {
								callback.apply(socket, args);
							}
						});
					});
				}
			};
		});





//controleur du modèle "Table"
	app.controller('tableCtrl',[ '$scope', '$http','socket',function($scope, $http, socket){
		$scope.tables= [];
		$http.get('/modelTable').success(function(dataT){
				console.log(dataT);
				$scope.tables = dataT;	
					
			});

		//activer le bouton "Details"
		$scope.custom = true;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };

        //Changer l'état de la table 
        $scope.changerEtat = function(table, newEtat){
			socket.emit('changerEtat', [table.id -1, newEtat]);
		}

		function f(id, etat){
			$scope.tables[id].etat = etat;
		}
		
		//reception des mise a jours
		socket.on('miseAJour', function(data){
			var id = data[0];
			var etat = data[1];
			f(id,etat);
		});		

        
	}]);


//Controlleur du modèe "Boisson"
	app.controller('BoissonsCtrl',[ '$scope', '$http',function($scope, $http){
		$scope.Boissons= [];
		$http.get('/modelBoisson').success(function(dataB){
			console.log(dataB);
			$scope.Boissons = dataB;
			});

		}]);
//Controlleur du modèe "Lieu"
	app.controller('LieuCtrl',[ '$scope', '$http',function($scope, $http){
		$scope.Lieux= [];
		$http.get('/modelLieu').success(function(dataL){
			console.log(dataL);
			$scope.Lieux = dataL;
			});

		}]);
//Controlleur du modèe "Fut"
	app.controller('FutCtrl',[ '$scope', '$http',function($scope, $http){
		$scope.Futs= [];
		$http.get('/modelFut').success(function(dataF){
			console.log(dataF);
			$scope.Futs = dataF;
			});

		}]);


       
})();