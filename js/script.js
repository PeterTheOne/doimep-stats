var spreadsheetUrl = 'https://docs.google.com/spreadsheet/pub?key=0Ar3KSfz0LI8kdG5jdzhPNWowZFBjZzl3WjY5VGg3YkE&single=true&gid=0&output=csv';
var startRow = 3;
var columnNumbers = {
  'id': 0,
  'decl_date': 7,
  'finished': 10,
  'blank': 15,
  'nothingToDeclare': 16,
  'cCat1': 40,
  'cCat2': 42,
  'cCat3': 44,
  'cCat4': 46,
  'cCat5': 48
};

var roundToFixed2 = function(value) {
  return (Math.round(value * 100)/100).toFixed(2);
};

var convertObjectToPlotArray = function(mepsPerVersionNumbers) {
  var plotArray = [];
  for (var key in mepsPerVersionNumbers) {
    if (mepsPerVersionNumbers.hasOwnProperty(key)) {
      plotArray.push([key, mepsPerVersionNumbers[key]])
    }
  }
  return plotArray;
};

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

var additionalSalary = function(documentsArray) {
  var catCsum = [];
  for (var i = startRow; i < documentsArray.length; i++) {
    catCsum[documentsArray[i][columnNumbers['id']]] = 0;
    if ((documentsArray[i][columnNumbers['finished']] === 1 ||
            documentsArray[i][columnNumbers['finished']] === '1')) {
      switch (parseInt(documentsArray[i][columnNumbers['cCat1']])) {
        case 1: catCsum[documentsArray[i][columnNumbers['id']]] += 500; break;
	case 2: catCsum[documentsArray[i][columnNumbers['id']]] += 1001; break;
	case 3: catCsum[documentsArray[i][columnNumbers['id']]] += 5001; break;
	case 4: catCsum[documentsArray[i][columnNumbers['id']]] += 10000; break;
	default: break;
      }
      switch (parseInt(documentsArray[i][columnNumbers['cCat2']])) {
        case 1: catCsum[documentsArray[i][columnNumbers['id']]] += 500; break;
	case 2: catCsum[documentsArray[i][columnNumbers['id']]] += 1001; break;
	case 3: catCsum[documentsArray[i][columnNumbers['id']]] += 5001; break;
	case 4: catCsum[documentsArray[i][columnNumbers['id']]] += 10000; break;
	default: break;
      }
      switch (parseInt(documentsArray[i][columnNumbers['cCat3']])) {
        case 1: catCsum[documentsArray[i][columnNumbers['id']]] += 500; break;
	case 2: catCsum[documentsArray[i][columnNumbers['id']]] += 1001; break;
	case 3: catCsum[documentsArray[i][columnNumbers['id']]] += 5001; break;
	case 4: catCsum[documentsArray[i][columnNumbers['id']]] += 10000; break;
	default: break;
      }
      switch (parseInt(documentsArray[i][columnNumbers['cCat4']])) {
        case 1: catCsum[documentsArray[i][columnNumbers['id']]] += 500; break;
	case 2: catCsum[documentsArray[i][columnNumbers['id']]] += 1001; break;
	case 3: catCsum[documentsArray[i][columnNumbers['id']]] += 5001; break;
	case 4: catCsum[documentsArray[i][columnNumbers['id']]] += 10000; break;
	default: break;
      }
      switch (parseInt(documentsArray[i][columnNumbers['cCat5']])) {
        case 1: catCsum[documentsArray[i][columnNumbers['id']]] += 500; break;
	case 2: catCsum[documentsArray[i][columnNumbers['id']]] += 1001; break;
	case 3: catCsum[documentsArray[i][columnNumbers['id']]] += 5001; break;
	case 4: catCsum[documentsArray[i][columnNumbers['id']]] += 10000; break;
	default: break;
      }
    }
  }
  return catCsum;
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

var countNothingToDeclare = function(documentsArray) {
  var documentCount = 0;
  for (var i = startRow; i < documentsArray.length; i++) {
    if ((documentsArray[i][columnNumbers['finished']] === 1 ||
        documentsArray[i][columnNumbers['finished']] === '1') &&
        (documentsArray[i][columnNumbers['nothingToDeclare']] === 1 ||
            documentsArray[i][columnNumbers['nothingToDeclare']] === '1')) {
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

var calculateMepsPerVersionNumbers = function(versionsPerMep) {
  var mepsPerVersionNumbers = {};
  for (var key in versionsPerMep) {
    if (mepsPerVersionNumbers.hasOwnProperty(versionsPerMep[key])) {
      mepsPerVersionNumbers[versionsPerMep[key]]++;
    } else {
      mepsPerVersionNumbers[versionsPerMep[key]] = 1;
    }
  }
  return mepsPerVersionNumbers;
};

var countDocumentsPerDay = function(documentsArray) {
  var documentsPerMonth = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    if (documentsArray[i][columnNumbers['id']] !== '') {
      var decl_date = moment(documentsArray[i][columnNumbers['decl_date']], 'DD/MM/YYYY').valueOf();
      if (documentsPerMonth.hasOwnProperty(decl_date)) {
        documentsPerMonth[decl_date]++;
      } else {
        documentsPerMonth[decl_date] = 1;
      }
    }
  }
  return documentsPerMonth
};

var countDocumentsPerMonth = function(documentsArray) {
  var documentsPerMonth = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    if (documentsArray[i][columnNumbers['id']] !== '') {
      var decl_date = moment(documentsArray[i][columnNumbers['decl_date']], 'DD/MM/YYYY').date(1).valueOf();
      if (documentsPerMonth.hasOwnProperty(decl_date)) {
        documentsPerMonth[decl_date]++;
      } else {
        documentsPerMonth[decl_date] = 1;
      }
    }
  }
  return documentsPerMonth
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

    $('#status').html('count nothingToDeclare');
    var documentsNothingToDeclare = countNothingToDeclare(documentsArray);
    var nothingToDeclarePercent = (documentsNothingToDeclare / documentsFinished) * 100;
    $('#nothingToDeclare').html(documentsNothingToDeclare + ' of ' + documentsFinished + ' (' + roundToFixed2(nothingToDeclarePercent) + '%)');

    $('#status').html('calculate average versions per mep');
    var averageVersionsPerMep = documentCount / mepCount;
    $('#averageVersionsPerMep').html(roundToFixed2(averageVersionsPerMep));

    $('#status').html('calculate MEPs per versioncount graph');
    var versionsPerMep = countVersionsPerMep(documentsArray);
    var mepsPerVersionNumbers = calculateMepsPerVersionNumbers(versionsPerMep);
    $.plot("#mepsPerVersioncount", [convertObjectToPlotArray(mepsPerVersionNumbers)]);

    $('#status').html('calculate documents per month graph');
    var documentsPerDay = countDocumentsPerDay(documentsArray);
    var documentsPerMonth = countDocumentsPerMonth(documentsArray);
    //alert(documentsPerMonth['24.09.2013']);
    //alert(convertObjectToPlotArray(documentsPerMonth)[0][1]);
    //$.plot("#documentsPerMonth", convertObjectToPlotArray(documentsPerMonth), {
    $.plot("#documentsPerMonth", [convertObjectToPlotArray(documentsPerMonth).sort(), convertObjectToPlotArray(documentsPerDay).sort()], {
      series: {
        stack: true,
        lines: {
          show: true,
          fill: true,
          steps: false
        },
        points: {
          show: true
        }
      },
      xaxis: {
        mode: "time",
        timezone: "browser",
        timeformat: "%d.%m.%Y",
        min: moment('01.01.2011', 'DD.MM.YYYY').valueOf(),
        max: moment().valueOf()
      }
    });

    $('#status').html('calculate MEP additional salary');
    var additionalSalaryValue = additionalSalary(documentsArray);
    $.plot("#additionalSalary", [convertObjectToPlotArray(additionalSalaryValue).sort()]);

    $('#status').html('done');
  });

});
