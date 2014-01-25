var spreadsheetUrl = 'https://docs.google.com/spreadsheet/pub?key=0Ar3KSfz0LI8kdG5jdzhPNWowZFBjZzl3WjY5VGg3YkE&single=true&gid=0&output=csv';
var startRow = 3;
var columnNumbers = {
  'id': 0,
  'finished': 10,
  'blank': 15
};

var roundToFixed2 = function(value) {
  return (Math.round(value * 100)/100).toFixed(2);
}

var countDocuments = function(documentsArray) {
  var documentCount = 0;
  for (var i = startRow; i < documentsArray.length; i++) {
    if (documentsArray[i][columnNumbers['id']] !== '') {
      documentCount++;
    }
  }
  return documentCount;
};

var countMep = function(documentsArray) {
  var meps = {};
  var mepCount = 0;
  for (var i = startRow; i < documentsArray.length; i++) {
    var id = documentsArray[i][columnNumbers['id']];
    if (!(id in meps)) {
      mepCount++;
    }
    meps[id] = id;
  }
  return mepCount;
};

var countFinishedDocuments = function(documentsArray) {
  var documentCount = 0;
  for (var i = startRow; i < documentsArray.length; i++) {
    if (documentsArray[i][columnNumbers['finished']] === 1 ||
        documentsArray[i][columnNumbers['finished']] === '1') {
      documentCount++;
    }
  }
  return documentCount;
};

var countBlankDocuments = function(documentsArray) {
  var documentCount = 0;
  for (var i = startRow; i < documentsArray.length; i++) {
    if ((documentsArray[i][columnNumbers['finished']] === 1 ||
            documentsArray[i][columnNumbers['finished']] === '1') &&
        (documentsArray[i][columnNumbers['blank']] === 1 ||
            documentsArray[i][columnNumbers['blank']] === '1')) {
      documentCount++;
    }
  }
  return documentCount;
};

var countVersionsPerMep = function(documentsArray) {
  var versionsPerMep = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    var id = documentsArray[i][columnNumbers['id']];
    if (id in versionsPerMep) {
      versionsPerMep[id]++;
    } else {
      versionsPerMep[id] = 1;
    }
  }
  return versionsPerMep;
};

$(function() {

  $('#status').html('load csv');
  $.ajax(spreadsheetUrl).done(function(csv){
    $('#status').html('convert csv to array');
    var documentsArray = $.csv.toArrays(csv);

    $('#status').html('count MEPs');
    var mepCount = countMep(documentsArray);
    $('#mepCount').html(mepCount);

    $('#status').html('count documents');
    var documentCount = countDocuments(documentsArray);
    $('#documentCount').html(documentCount);

    $('#status').html('count finished');
    var documentsFinished = countFinishedDocuments(documentsArray);
    var finishedPercent = (documentsFinished / documentCount) * 100;
    $('#finished').html(documentsFinished + ' of ' + documentCount + ' (' + roundToFixed2(finishedPercent) + '%)');

    $('#status').html('count blank');
    var documentsBlank = countBlankDocuments(documentsArray);
    var blankPercent = (documentsBlank / documentsFinished) * 100;
    $('#blank').html(documentsBlank + ' of ' + documentsFinished + ' (' + roundToFixed2(blankPercent) + '%)');

    $('#status').html('calculate average versions per mep');
    var versionsPerMep = countVersionsPerMep(documentsArray);
    var averageVersionsPerMep = documentCount / mepCount;
    $('#averageVersionsPerMep').html(roundToFixed2(averageVersionsPerMep));

  });

});