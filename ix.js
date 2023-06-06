img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage("download.jpeg");
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function draw()
{
    image(img, 0, 0, 640, 420);


if(status != "")
{
    for(f = 0; f < objects.length; f++)
    {
    document.getElementById("status").innerHTML = "Status: Object detected";

    fill("#FFFFFF");
    percent = floor(objects[f].confidence * 100);
    text(objects[f].label + " " + percent + "%", objects[f].x + 15, objects[f].y + 15);
    noFill();
    stroke("#FFFFFF");
    rect(objects[f].x, objects[f].y, objects[f].width, objects[f].height);
    }
}
}
function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}