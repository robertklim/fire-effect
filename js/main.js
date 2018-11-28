let buffer1;
let buffer2;
let cooling;

function setup() {
    createCanvas(60, 60);

    buffer1 = createImage(width, height);
    buffer2 = createImage(width, height);
    cooling = createImage(width, height);
    cool();

}

function fire(rows) {
    buffer1.loadPixels();
    for (let x = 0; x < width; x++) {
        for (let j = 0; j < rows; j++) {
            let y = height - (j + 1);
            let index = (x + y * width) * 4;
            buffer1.pixels[index] = red(color(255));
            buffer1.pixels[index + 1] = green(color(255));
            buffer1.pixels[index + 2] = blue(color(255));
            buffer1.pixels[index + 3] = alpha(color(255));
        }
    }

    buffer1.updatePixels();
}

function cool() {
    cooling.loadPixels();

    let xoff = 0.0;
    let increment = 0.02;

    for (let x = 0; x < width; x++) {
        xoff += increment;
        let yoff = 0.0;
        for (let y = 0; y < height; y++) {
            yoff += increment;
            let bright = noise(xoff, yoff) * 255;
            let index = (x + y * width) * 4;
            cooling.pixels[index] = red(color(bright));
            cooling.pixels[index + 1] = green(color(bright));
            cooling.pixels[index + 2] = blue(color(bright));
            cooling.pixels[index + 3] = alpha(color(bright));
        }
    }

    cooling.updatePixels();

}

function draw() {
    background(0);

    fire(2);

    //image(buffer1, 0, 0);
    buffer1.loadPixels();
    buffer2.loadPixels();

    for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
            let index = ((x) + (y - 1) * width) * 4;
            let index1 = ((x + 1) + (y) * width) * 4;
            let index2 = ((x - 1) + (y) * width) * 4;
            let index3 = ((x) + (y + 1) * width) * 4;
            let index4 = ((x) + (y - 1) * width) * 4;
            let c1 = color(buffer1.pixels[index1], buffer1.pixels[index1 + 1], buffer1.pixels[index1 + 2], buffer1.pixels[index1 + 3]);
            let c2 = color(buffer1.pixels[index2], buffer1.pixels[index2 + 1], buffer1.pixels[index2 + 2], buffer1.pixels[index2 + 3]);
            let c3 = color(buffer1.pixels[index3], buffer1.pixels[index3 + 1], buffer1.pixels[index3 + 2], buffer1.pixels[index3 + 3]);
            let c4 = color(buffer1.pixels[index4], buffer1.pixels[index4 + 1], buffer1.pixels[index4 + 2], buffer1.pixels[index4 + 3]);

            let newC = (brightness(c1) + 
                brightness(c2) +
                brightness(c3) + 
                brightness(c4)) * 0.6;

            buffer2.pixels[index] = red(color(newC));
            buffer2.pixels[index + 1] = green(color(newC));
            buffer2.pixels[index + 2] = blue(color(newC));
            buffer2.pixels[index + 3] = alpha(color(newC));

        }
    }

    buffer2.updatePixels();

    // swap buffers
    let tmp = buffer1;
    buffer1 = buffer2;
    buffer2 = tmp;

    // image(buffer2, 0, 0);
    image(cooling, 0, 0);
}
