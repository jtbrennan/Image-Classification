const thumbnails = document.querySelectorAll('.thumbnail');
const main = document.querySelector('.main');
const result = document.getElementById('result');

let model;
let predictions;

thumbnails.forEach(item => {
    item.addEventListener('click', (e) => {
        main.src = item.src;
        predictImage();
    });    
});


// const img = document.getElementById('image');

async function predictImage(){
    //classify the image based on the pretrained model
    predictions = await model.classify(main);
    console.log('Predictions: ', predictions);
    let output = 'Top three results:';
    predictions.forEach(obj => {
        output += '<li>'
        output += obj.className;
        // output += '&nbsp;' + obj.probability.toFixed(2) * 100 + '%';
        output += '&nbsp;(confidence: ' + parseInt(obj.probability * 100) + '%)';
        output += '</li>'
    });

    // result.innerText = predictions[0].className;
    // probability.innerText = predictions[0].probability.toFixed(4);
    result.innerHTML = output;
    
}
async function loadModel(){
    //load the pretrained model
    console.log("Model loading...");
    model = await mobilenet.load();
    console.log("Model is loaded!")
}

loadModel();