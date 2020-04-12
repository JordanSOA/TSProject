"use strict";
var villes = [
    'aix-en-provence', 'ajaccio', 'amiens', 'annecy', 'besancon', 'bordeaux', 'brest', 'caen', 'calais', 'clermond-ferrand', 'dijon', 'le-havre', 'le-mans', 'lyon',
    'marseille', 'metz', 'montpellier', 'nancy', 'nantes', 'nice', 'nimes', 'paris', 'perpignan', 'rennes', 'saint-etienne', 'toulon', 'toulouse'
];
var divTest = document.createElement("div");
var formHtml = "<div>\n\n                            <form id=\"myForm\">\n\n                                <input type=\"string\" id=\"fromTown\" >\n\n                                <input type=\"string\" id=\"toTown\" >\n\n                                <input type=\"submit\" id=\"resInput\" onclick=\"(fromTown.value)\"value=\"submit\">\n\n                            </form>\n\n                            <div id=\"chosenCityies\">You chose </div>\n\n                        </div> \n\n                        <div id=\"mapContainer\" style=\"width: 550px;height: 600px;position: relative;border: 2px solid black;\"></div>";
divTest.innerHTML = formHtml;
var canvasMap = document.createElement("canvas");
canvasMap.width = 550;
canvasMap.height = 600;
canvasMap.id = "countryMap";
var canvasTowns = document.createElement("canvas");
canvasTowns.width = 550;
canvasTowns.height = 600;
canvasTowns.id = "townsMap";
var canvasRoad = document.createElement("canvas");
canvasRoad.width = 550;
canvasRoad.height = 600;
canvasRoad.id = "roadsMap";
var imgFrance = new Image();
imgFrance.src = "https://upload.wikimedia.org/wikipedia/commons/b/b6/D%C3%A9partements_de_France-simple.svg";
var ctxTowns = canvasTowns.getContext("2d");
var ctxRoads = canvasRoad.getContext("2d");
var Town = /** @class */ (function () {
    function Town(name, countryMap, coord) {
        this.routes = [];
        this.name = name;
        this.countryMap = countryMap;
        this.coord = coord;
    }
    //WHERE ctx = ctxRoads ; FOr Each Town
    Town.prototype.draw = function (ctx) {
        this.routes.forEach(function (r) { return r.draw(ctxRoads); });
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(this.coord.x, this.coord.y, 10, 10);
        window.document.body.appendChild(canvasTowns);
    };
    return Town;
}());
var Route = /** @class */ (function () {
    function Route(dist, to, from) {
        this.dist = dist;
        this.to = to;
        this.from = from;
    }
    Route.prototype.findTown = function (a, b) {
        var obj = {
            a: a,
            b: b
        };
        console.log(obj.a + "::" + obj.b);
    };
    Route.prototype.draw = function (ctx) {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(this.from.coord.x, this.from.coord.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(this.to.coord.x, this.to.coord.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
        window.document.body.appendChild(canvasRoad);
    };
    return Route;
}());
var Coord = /** @class */ (function () {
    function Coord(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coord;
}());
var CountryMap = /** @class */ (function () {
    function CountryMap(width, height, backImg, canvas, towns) {
        this.name = "France";
        this.width = width;
        this.height = height;
        this.backImg = backImg;
        this.canvas = canvas;
        this.towns = towns;
    }
    CountryMap.prototype.draw = function () {
        var _a;
        //FORM 
        (_a = this.towns) === null || _a === void 0 ? void 0 : _a.forEach(function (t) { return t.draw(ctxTowns); });
        window.document.body.appendChild(divTest);
        //Draw France
        var ctxMap = this.canvas.getContext("2d");
        // Draw Towns
        this.backImg.addEventListener('load', function () {
            ctxMap === null || ctxMap === void 0 ? void 0 : ctxMap.drawImage(this, 0, 0);
        });
        this.backImg.src = "https://upload.wikimedia.org/wikipedia/commons/b/b6/D%C3%A9partements_de_France-simple.svg";
        window.document.body.appendChild(canvasMap);
    };
    return CountryMap;
}());
// Hard Coded poc 
var marseilleCo = new Coord(400, 430);
var parisCo = new Coord(275, 125);
var map = new CountryMap(550, 600, imgFrance, canvasMap);
var marseille = new Town("Marseille", map, marseilleCo);
var paris = new Town("Paris", map, parisCo);
//const between1: Route = new Route(773, marseille, paris);
var bordeauxCo = new Coord(175, 340);
var bordeaux = new Town("Bordeaux", map, bordeauxCo);
var between1 = new Route(773, marseille, paris);
var between2 = new Route(646, bordeaux, marseille);
marseille.routes.push(between1);
marseille.routes.push(between2);
paris.routes.push(between1);
bordeaux.routes.push(between2);
map.towns = [marseille, paris, bordeaux];
map.draw();
var getDist = function (from, to) {
    var dist = villes[from.toString()];
    var distance = 0;
    dist.forEach(function (element) {
        var toCheck = element.À;
        if (toCheck.toLowerCase() == to) {
            distance = parseInt(element.Distance);
        }
    });
    return distance;
};
window.addEventListener("load", function () {
    var promesses = [];
    var _loop_1 = function (ville) {
        promesse = fetch("http://localhost:9999/jsonByCity/" + ville + ".json").then(function (data) {
            return data.json();
        }).then(function (json) {
            villes[ville] = json;
        });
        promesses.push(promesse);
    };
    var promesse;
    for (var _i = 0, villes_1 = villes; _i < villes_1.length; _i++) {
        var ville = villes_1[_i];
        _loop_1(ville);
    }
    Promise.all(promesses).then(function () {
        var dist1 = getDist("paris", "marseille");
        var dist2 = getDist("marseille", "bordeaux");
        var dist3 = getDist("bordeaux", "paris");
        console.log(dist2);
        console.log(dist1);
        console.log(dist3);
    });
});
