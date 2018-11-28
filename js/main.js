let buffer1;
let buffer2;

function setup() {
    createCanvas(100, 100);
    frameRate(3);

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

function fire() {
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

    fire();

    //image(buffer1, 0, 0);
    buffer1.loadPixels();
    buffer2.loadPixels();

    for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
            let index = (x + y * width) * 4;
            let index1 = ((x + 1) + y * width) * 4;
            let index2 = ((x - 1) + y * width) * 4;
            let index3 = (x + (y + 1) * width) * 4;
            let index4 = (x + (y - 1) * width) * 4;
            let c1 = color(buffer1.pixels[index1], buffer1.pixels[index1 + 1], buffer1.pixels[index1 + 2], buffer1.pixels[index1 + 3]);
            let c2 = color(buffer1.pixels[index2], buffer1.pixels[index2 + 1], buffer1.pixels[index2 + 2], buffer1.pixels[index2 + 3]);
            let c3 = color(buffer1.pixels[index3], buffer1.pixels[index3 + 1], buffer1.pixels[index3 + 2], buffer1.pixels[index3 + 3]);
            let c4 = color(buffer1.pixels[index4], buffer1.pixels[index4 + 1], buffer1.pixels[index4 + 2], buffer1.pixels[index4 + 3]);

            let newC = brightness(c1) + 
                brightness(c2) +
                brightness(c3) + 
                brightness(c4);

            buffer2.pixels[index] = red(color(newC * 0.25));
            buffer2.pixels[index + 1] = green(color(newC * 0.25));
            buffer2.pixels[index + 2] = blue(color(newC * 0.25));
            buffer2.pixels[index + 3] = alpha(color(newC * 0.25));

        }
    }

    buffer2.updatePixels();

    // swap buffers
    let tmp = buffer1;
    buffer1 = buffer2;
    buffer2 = tmp;

    image(buffer2, 0, 0);
}
