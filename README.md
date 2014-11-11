ObjetsConnectes
===============

Projet rélisé dans le carde de l'UE : Langague du WEB

L’application de gestion d'objets connectés ( ie : Les tables de distribution de boissons) est une application web de type  « single page application » qui permet  le suivi des tables.
La réalisation de cette application implique l’architecture suivante : 

1-Partie Serveur : 

1.1Technologie utilisée : 
Le serveur web est créé avec Node.js qui permet de définir le modèle de données et aussi gérer les changements effectués et les reproduire chez les autres clients web.

1.2Les modules Node.js utilisés : 

Express : Facilité de syntaxe.

Socket.io : Gestion de la communication bidirectionnelle entre le client et le serveur.

1.3Modèle de données : 

Notre modèle de données est représenté par des fonctions JavaScript ayant la structure similaire à celle de l’orienté objet, ce qui permet de créer autant d’instance et les envoyer à notre contrôleur en format JSON.

2.Contrôleur : 

2.1Technologie utilisée : 

Cette partie est réalisée avec le framework Angular.js  qui a pour but de simplifier la syntaxe de JavaScript, et de combler les faiblesses de ce dernier en lui ajoutant de nouvelles fonctionnalités. Ceci permet notamment de faciliter la réalisation d'applications web monopages.

2.2Contrôleurs crées :

TableCtrl : Permet de récupérer des données des tables depuis le serveur et les envoyer aux clients, il permet aussi le changement d’état de la table.

BoissonCtrl : Permet de récupérer des données de boissons depuis le serveur et les afficher.

FutsCtrl : Permet de récupérer les données de Fûts depuis le serveur et les afficher.

LieuCtrl : Permet de récupérer les données de Lieux de disponibilité de boissons.

Partie Vue : 

La partie présentation de l’application est réalisée avec Bootstrap et JQuery.

3.Les fonctionnalitées developpées sont : 

* Affichage des tables , boissons , futs et lieux.
* Possibilité de recherche par nom des tables , boissons et futs.
* Modification de l'etat de la table et notification des autres tables avec synchronisation temps réel de l'etat de la table.
* Integration d'une carte avec marqueures qui affiche la position des lieux( pas encore affiné : passage de position en dur )

USAGE : node server.js
        http://localhost:8081



