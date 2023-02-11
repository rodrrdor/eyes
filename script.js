const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const FPS = 60;
const totalEyes = 5;
var eyes = [], mouse, hip;
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

class Eye {
    constructor() {
        this.r = 100;
        this.x = Math.random() * (cnv.width - this.r * 2) + this.r;
        this.y = Math.random() * (cnv.height - this.r * 2) + this.r;
        this.pupilOffSet = this.r / 2;
        this.eyeColor = "white";
        this.pupilColor = "#" + (Math.round(Math.random() * 16777215)).toString(16);
    };

    updateEye() {
        for (let eye = 0; eye < eyes.length; eye++) {
            if (eyes[eye].x == this.x && eyes[eye].y == this.y) {} else {
                hip = Math.sqrt((eyes[eye].x - this.x) * (eyes[eye].x - this.x) + (eyes[eye].y - this.y) * (eyes[eye].y - this.y));
                while (hip < 200) {
                    this.x = Math.random() * (cnv.width - this.r * 2) + this.r;
                    this.y = Math.random() * (cnv.height - this.r * 2) + this.r;
                    hip = Math.sqrt((eyes[eye].x - this.x) * (eyes[eye].x - this.x) + (eyes[eye].y - this.y) * (eyes[eye].y - this.y));
                };
            };
        };
        let hipo = Math.sqrt((mouse.x - this.x) * (mouse.x - this.x) + (mouse.y - this.y) * (mouse.y - this.y));
        let sin = mouse.y - this.y;
        let cos = mouse.x - this.x;
        if (Math.asin(sin / hipo) * 180 / Math.PI < 0) {
            this.angle = Math.acos(cos / hipo) * 180 / Math.PI;
        } else {
            this.angle = 360 - Math.acos(cos / hipo) * 180 / Math.PI;
        };
    };

    drawEye() {
        ctx.save();
        ctx.strokeStyle = this.eyeColor;
        ctx.fillStyle = this.eyeColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();

        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle * Math.PI / 180);
        ctx.strokeStyle = this.pupilColor;
        ctx.fillStyle = this.pupilColor;
        ctx.beginPath();
        ctx.arc(0 + this.pupilOffSet, 0, this.r / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();

        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(0 + this.pupilOffSet, 0, this.r / 2 - 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    };
};

(function init() {
    for (let eye = 0; eye < totalEyes; eye++) {
        eyes.push(new Eye());
    };
    addEventListener("mousemove", (e) => {mouse = {x: e.clientX, y: e.clientY};});
    setInterval(main, 1000 / FPS);
}());

function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;

    for (let eye = 0; eye < eyes.length; eye++) {
        eyes[eye].updateEye();
        eyes[eye].drawEye();
    };
};