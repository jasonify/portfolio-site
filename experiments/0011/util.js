
// http://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function modulo360(angle){
  return angle % 360;
}

function arrayAverages(numbers){
  var cumulative = 0;
  var length = numbers.length;
  var diffsCount = 0;
  for(var ii = 0; i < length -2; ii++){
    var start = numbers[ii];
    var end = numbers[ii+1];
    var diff = end - start;
    cumulative += diff;
    diffsCount++;
  }
  // Dont need diffs: count just length -2:
  return cumulative / diffsCount;
}
