
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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.coord.x, this.coord.y, 10, 10);
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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.from.coord.x, this.from.coord.y);
        ctx.lineTo(this.to.coord.x, this.to.coord.y);
        ctx.stroke();
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
    height?: number;
    backImg?: CanvasImageSource;
    canvas?: HTMLCanvasElement;
    towns?: Town[];

    constructor(width: number, height?: number, backImg?: CanvasImageSource, canvas?: HTMLCanvasElement, towns?: Town[]) {
        this.width = width;
        this.height = height;
        this.backImg = backImg;
        this.canvas = canvas;
        this.towns = towns;
    }

    draw() {
        // var canvas = document.createElement("canvas");
        // var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        // var urlSrc: CanvasImageSource = "C:/Users/Workspace/Desktop/CoursSimplon/TSProject/svg/Départements_de_France-simple.svg";
        // ctx.drawImage(urlSrc,0,0);
        //var reader:FileReader = new FileReader();
    }
}

const mCoor: Coord = new Coord(12, 99);
const map: CountryMap = new CountryMap(150);
const marseille: Town = new Town("Marseille", map, mCoor);
const aix: Town = new Town("Aix", map, mCoor);
const betwenR: Route = new Route(222, marseille, aix);


marseille.routes.push(betwenR);
aix.routes.push(betwenR);
map.towns = [marseille, aix];
console.log(map);
window.onload = function () {
    // var mapImg: string = `<img id="map" width="max-content" height="max-content" src="https://upload.wikimedia.org/wikipedia/commons/b/b6/D%C3%A9partements_de_France-simple.svg">`;
    // var divImgBal = this.document.createElement("div");
    // divImgBal.innerHTML = mapImg;
    // window.document.body.appendChild(divImgBal);


    var canvas = <HTMLCanvasElement> document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dImgBal = this.document.createElement("img");
    dImgBal.src = `https://upload.wikimedia.org/wikipedia/commons/b/b6/D%C3%A9partements_de_France-simple.svg`;
    //dImgBal.setAttribute('style',"visibility : hidden;");
    this.document.body.appendChild(dImgBal);
    //ctx.drawImage(dImgBal, 0, 0);
    ctx.fillRect(250, 150, 10, 10);
    this.document.body.appendChild(canvas);

}
// window.onload = function () {
//     var franceMap: CountryMap = new CountryMap(100);
//     franceMap.draw();
//     var divTest: HTMLDivElement = document.createElement("div");
//     var formHtml: string = `<div>
//                                 <form id="myForm">
//                                     <input type="string" id="fromTown" >
//                                     <input type="string" id="toTown" >
//                                     <input type="submit" id="resInput" onclick="(fromTown.value)"value="submit">
//                                 </form>
//                                 <div id="chosenCityies">You chose </div>
//                             </div>`;
//     divTest.innerHTML = formHtml;
//     window.document.body.appendChild(divTest);
// }
// window.addEventListener("submit", function (e) {
//     console.log(this.document.querySelector("#fromTown")?.nodeValue);
//     e.preventDefault();
// })