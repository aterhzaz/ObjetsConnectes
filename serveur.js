// Chargement du module express

var express = require('express')
var app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Répertoire contenant les données statiques

app.use(express.static(__dirname + '/statiques'));

// La classe Boisson

function Boisson(id, fabriquant, logo, type, description) {
	
	this.id = id;
	this.fabriquant = fabriquant;
	this.logo = logo;
	this.type = type;
	this.description = description;
}

// La classe Fut

function Fut(id, volume, boisson) {
	
	this.id = id;
	this.volume = volume;
	this.boisson = boisson;
}

// La classe Lieu

function Lieu(id, nom, position, prix) {

	this.id = id;
	this.nom = nom;
	this.position = position;
	this.prix = prix;
}

var etat = ["FREE", "TAG" ,"OFF","DISCONNECT" ];

// La classe Table

function Table(id, nom, mac, etat, lieu, fut, image) {
	
	this.id = id;
	this.nom = nom;
	this.mac = mac;
	this.etat = etat;
	this.lieu = lieu;
	this.fut=fut;
	this.image=image;
}

// Création des boissons

var b1 = new Boisson('1','Pepsi', './logo/pepsy.png', 'Boisson Gazeuse', 'Pepsi est Boisson gazeuse'); 
var b2 = new Boisson('2','CocaCola', './logo/coca.jpg', 'Boisson Gazeuse', 'Coca  est une boisson gazeuse mondiale'); 
var b3 = new Boisson('3','Oasis', './logo/oasis.png', 'Gamme Fruits', 'Oasis est une boisson plate aux fruits et à l’eau de source');

// Création des Futs

var f1 = new Fut('1',50, b1);
var f2 = new Fut('2',20, b3);
var f3 = new Fut('3',60, b2);

// Création des Lieu

var l1 = new Lieu('1','Brest', 'Latitude : 48.390394 / Longitude : -4.4860760000000255', '60€');
var l2 = new Lieu('2','Quimper', 'Latitude : 48.4434969 / Longitude : -4.420151199999964', '52€');
var l3 = new Lieu('3','Brest', 'Latitude : 48.390394 / Longitude : -4.4860760000000255', '60');

// Création des Tables nom, mac, etat, lieu, fut, image

var t1 = new Table('1','Maxroyo', '01:23:45:67:89:AB', etat[1], l1, f1, './photo/table.png');
var t2 = new Table('2','Onakhwiga', '12-34-56-78-9A-BC', etat[1], l2, f2, './photo/table.png');
var t3 = new Table('3','Palabra', '48-2C-6A-1E-59-3D', etat[1], l3, f3, './photo/table.png');
// La préparation des mes elements pour la conversion en JSON 

var b = [b1,b2,b3];
var f = [f1,f2,f3];
var l = [l1,l2,l3];
var t = [t1,t2,t3];


app.get('/modelBoisson', function(req, res){
console.log('Transmission des boissons');
res.json(b);
});

app.get('/modelFut', function(req, res){
console.log('Transmission des futs');
res.json(f);
});

app.get('/modelLieu', function(req, res){
console.log('Transmission des Lieux');
res.json(l);
});

app.get('/modelTable', function(req, res){
console.log('Transmission des Tables');
res.json(t);
});

// Démarage du serveur

http.listen(8081, function(){
  console.log('listening on *:8081');
});



//---------Modification de l'état des table via Socket.io--------------
io.on('connection', function(socket){
	
  socket.on('changerEtat', function(x){
	//Récuperation de l'id de la table à modifier et le nouvel etat selectionné
    var id = x[0];
    var idetat = x[1];
    t[id].etat = etat[idetat];
	
	
	console.log("la table:" +id +"= etat"+etat[idetat]);
	//mise a jour de l etat
    io.emit('miseAJour', [id , t[id].etat]);
  });


});
