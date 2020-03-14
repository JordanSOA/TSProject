var Town = /** @class */ (function () {
    function Town(name, countryMap, coord, route) {
        this.name = name;
        this.countryMap = countryMap;
        this.coord = coord;
        this.routes = route;
    }
    Town.prototype.draw = function (ctx) {
        ctx.fillRect(this.coord.x, this.coord.y, 10, 10);
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
        ctx.moveTo(this.from.coord.x, this.from.coord.y);
        ctx.lineTo(this.to.coord.x, this.to.coord.y);
        ctx.stroke();
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
        this.width = width;
        this.height = height;
        this.backImg = backImg;
        this.canvas = canvas;
        this.towns = towns;
    }
    CountryMap.prototype.draw = function () {
        // var canvas = document.createElement("canvas");
        // var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        //var reader:FileReader = new FileReader();
    };
    return CountryMap;
}());
window.onload = function () {
    var franceMap = new CountryMap(100);
    franceMap.draw();
    var divTest = document.createElement("div");
    var formHtml = "<div>\n                                <form id=\"myForm\">\n                                    <input type=\"string\" id=\"fromTown\" >\n                                    <input type=\"string\" id=\"toTown\" >\n                                    <input type=\"submit\" id=\"resInput\" onclick=\"(fromTown.value)\"value=\"submit\">\n                                </form>\n                                <div id=\"chosenCityies\">You chose </div>\n                            </div>";
    divTest.innerHTML = formHtml;
    window.document.body.appendChild(divTest);
};
window.addEventListener("submit", function (e) {
    var _a;
    console.log((_a = this.document.querySelector("#fromTown")) === null || _a === void 0 ? void 0 : _a.innerHTML);
    e.preventDefault();
});
// window.addEventListener("onloadend", function(){
//     console.log("ok");
//     var franceMap: CountryMap = new CountryMap(100);
//     franceMap.draw();
//     var divTest: HTMLDivElement = document.createElement("div");
//     divTest.innerHTML = `<input type="file" id="files" name="files[]" accept=".json" multiple />`
//     window.document.body.appendChild(divTest);
// })
