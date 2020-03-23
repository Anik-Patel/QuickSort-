let values = [];
let pivots = [];



p5.disableFreiendlyErrors = true;

function create_array(len){
    let l = [];
    for (var x=len;x>=1;x--){
      l.push(x);
      pivots[x] = -1;
    }

    for (let i = l.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [l[i], l[j]] = [l[j], l[i]];
      }

    return l;
}



function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  values = create_array(600); //You can mess with this parameter!
  background(0);
  draw_array(values);

}

function draw(){
  quick_sort(values, 0, values.length-1);
  noLoop();

}

async function swap(i, j){
  await sleep(0);
  var temp = values[i];
  values[i] = values[j];
  values[j] = temp;


}

async function quick_sort(arr, low, high){
  if (low < high){
    draw_array(values);
    var q = await quick(values, low, high);

    await new Promise.all([quick_sort(values, low, q-1), quick_sort(values, q+1, high)]);



  }
  draw_array(values);
}

async function quick(arr, low, high){

  var i = low-1;
  var pivot = values[high];
  pivots[pivot] = 0;

  for (var j=low;j<high;j++){
    if (values[j] <= pivot){
      i++;
      await swap(i, j);
      draw_array(values);
      pivots[pivot] = -1;
    }


  }
  await swap(i+1, high);
  draw_array(values);
  pivots[pivot] = -1;
  return i+1;
}


function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}


function draw_array(arr){
  background(0);
  var skipper = width/arr.length;
  var multiplier = height / arr.length;
  var x = 0;

  stroke(255);

  strokeWeight(skipper);

  strokeCap(PROJECT);
  for (var i=0;i<arr.length;i++){
    if (pivots[i] == 0){
      stroke(255, 0, 0);
    }

    else{
      stroke(255, 255, 255);
    }

    line(x, height, x, height-arr[i]*multiplier);
    x+=skipper;
  }
}
