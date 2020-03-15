var divTest: HTMLDivElement = document.createElement("div");
var formHtml: string = `<div>

                            <form id="myForm">

                                <input type="string" id="fromTown"  >

                                <input type="string" id="toTown" >

                                <input type="submit" id="resInput" onclick="(fromTown.value)"value="submit">

                            </form>

                            <div id="chosenCityies">You chose </div>

                        </div> 

                        <div id="mapContainer" style="width: 550px;height: 600px;position: relative;border: 2px solid black;"></div>`;

divTest.innerHTML = formHtml;
var canvasMap = <HTMLCanvasElement>document.createElement("canvas");
canvasMap.width = 550;
canvasMap.height = 600;
canvasMap.id = "countryMap";
var canvasTowns = <HTMLCanvasElement>document.createElement("canvas");
canvasTowns.width = 550;
canvasTowns.height = 600;
canvasTowns.id = "townsMap";
var canvasRoad = <HTMLCanvasElement>document.createElement("canvas");
canvasRoad.width = 550;
canvasRoad.height = 600;
canvasRoad.id = "roadsMap";
var imgFrance: HTMLImageElement = new Image();
imgFrance.src = `https://upload.wikimedia.org/wikipedia/commons/b/b6/D%C3%A9partements_de_France-simple.svg`;

var ctxTowns = canvasTowns.getContext("2d");
var ctxRoads = canvasRoad.getContext("2d");
class Town {
    name: string;
    countryMap: CountryMap;
    coord: Coord;
    routes: Route[] = [];

    constructor(name: string, countryMap: CountryMap, coord: Coord) {
        this.name = name;
        this.countryMap = countryMap;
        this.coord = coord;
    }

    //WHERE ctx = ctxRoads ; FOr Each Town
    draw(ctx: CanvasRenderingContext2D | null) {
        this.routes.forEach((r) => r.draw(ctxRoads));
        ctx?.fillRect(this.coord.x, this.coord.y, 10, 10);
        window.document.body.appendChild(canvasTowns);
    }
}

class Route {
    dist: number;
    to: Town;
    from: Town;


    constructor(dist: number, to: Town, from: Town) {
        this.dist = dist;
        this.to = to;
        this.from = from;
    }

    findTown(a: any, b: any) {
        var obj: any = {
            a: a,
            b: b
        }
        console.log(obj.a + "::" + obj.b);
    }

    draw(ctx: CanvasRenderingContext2D | null) {
        ctx?.beginPath()
        ctx?.moveTo(this.from.coord.x, this.from.coord.y);
        ctx?.lineTo(this.to.coord.x, this.to.coord.y);
        ctx?.stroke();
        window.document.body.appendChild(canvasRoad);
    }
}

class Coord {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class CountryMap {
    name: string = "France";
    width: number;
    height: number;
    backImg: HTMLImageElement;
    canvas: HTMLCanvasElement;
    towns?: Town[];

    constructor(width: number, height: number, backImg: HTMLImageElement, canvas: HTMLCanvasElement, towns?: Town[]) {
        this.width = width;
        this.height = height;
        this.backImg = backImg;
        this.canvas = canvas;
        this.towns = towns;
    }

    draw() {
        //FORM 
        this.towns?.forEach((t) => t.draw(ctxTowns))
        window.document.body.appendChild(divTest);
        //Draw France
        var ctxMap = this.canvas.getContext("2d");
        // Draw Towns
        this.backImg.addEventListener('load', function () {
            ctxMap?.drawImage(this, 0, 0);
        })
        this.backImg.src = `https://upload.wikimedia.org/wikipedia/commons/b/b6/D%C3%A9partements_de_France-simple.svg`;
        window.document.body.appendChild(canvasMap);
    }
}
// Hard Coded poc 
const marseilleCo: Coord = new Coord(400, 430);
const parisCo: Coord = new Coord(275, 125);
const map: CountryMap = new CountryMap(550, 600, imgFrance, canvasMap);
const marseille: Town = new Town("Marseille", map, marseilleCo);
const paris: Town = new Town("Paris", map, parisCo);
//const between1: Route = new Route(773, marseille, paris);
const bordeauxCo: Coord = new Coord(175, 340);
const bordeaux: Town = new Town("Bordeaux", map, bordeauxCo);
const between1: Route = new Route(773, marseille, paris);
const between2: Route = new Route(646, bordeaux, marseille);

marseille.routes.push(between1);
marseille.routes.push(between2);
paris.routes.push(between1);
bordeaux.routes.push(between2);

map.towns = [marseille, paris, bordeaux];

map.draw();

function inputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    var activeInput = target.value;
    console.log(activeInput);
}
this.document.getElementById("#fromTown")?.addEventListener("input", function (ev: Event) {
    const target = ev.target as HTMLInputElement;
    var activeInput = target.value;
    console.log(target);
})
window.onload = function () {
    window.addEventListener("submit", function (e: Event) {
        e.preventDefault();
    })
}
let addFood = document.getElementById("resInput")?.addEventListener("click", () => {
    let foodName = (<HTMLInputElement>document.getElementById("#fromTown"))?.value;
    console.log(foodName);
});