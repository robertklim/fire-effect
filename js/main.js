let buffer1;
let buffer2;

function setup() {
    createCanvas(400, 400);

    buffer1 = createImage(width, height);
    buffer2 = createImage(width, height);

    buffer1.loadPixels();
    for (let x = 0; x < width; x++) {
        let y = height - 1;
        let index = (x + y * width) * 4;
        buffer1.pixels[index] = red(color(255, 0, 0));
        buffer1.pixels[index + 1] = green(color(255, 0, 0));
        buffer1.pixels[index + 2] = blue(color(255, 0, 0));
        buffer1.pixels[index + 3] = alpha(color(255, 0, 0));
    }
    buffer1.updatePixels();

}

function draw() {
    background(0);
    image(buffer1, 0, 0);
}
