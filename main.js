prediction_1=""
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aSu3mQl3a/model.json',modelLoaded);

function modelLoaded()
{
    console.log("ModelLoaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 ="The first predicction is" + prediction_1;
    var utterThis =new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}


function gotResult(error, result) {
if (error) {
    console.error(error)
} else {
    console.log(result)
    document.getElementById('result_gesture_name').innerHTML = result[0].label;
    prediction_1 = result[0].label;

    speak();
    if(result[0].label =='victory')
    {
        document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
    }
    if(result[0].label =='amazing')
    {
        document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
    }
    
    if(result[0].label =='thumbs up')
    {
        document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
    }
    
}

}