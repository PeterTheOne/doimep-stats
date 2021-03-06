var spreadsheetUrl = 'https://docs.google.com/spreadsheet/pub?key=0Ar3KSfz0LI8kdG5jdzhPNWowZFBjZzl3WjY5VGg3YkE&single=true&gid=0&output=csv';
var startRow = 3;
var columnNumbers = {
  'id': 0,
  'firstname': 1,
  'surname': 2,
  'gender': 3,
  'dateOfBirth': 4,
  'country': 5,
  'group': 6,
  'decl_date': 7,
  'decl_url': 9,
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

var convertKeysBySort = function(mepsPerVersionNumbers) {
  var plotArray = [];
  var i = 0;
  for (var key in mepsPerVersionNumbers) {
    if (mepsPerVersionNumbers.hasOwnProperty(key)) {
      plotArray.push([key, mepsPerVersionNumbers[key]]);
      i++;
    }
  }
  plotArray.sort(function(a, b) {
    return b[1] - a[1];
  });
  var plotArray2 = [];
  for (var j = 0; j < plotArray.length; j++) {
    plotArray2.push([j, plotArray[j][1]]);
  }
  return plotArray2;
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
    if ((documentsArray[i][columnNumbers['finished']] === 1 ||
            documentsArray[i][columnNumbers['finished']] === '1')) {
      catCsum[documentsArray[i][columnNumbers['id']]] = 0;
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

var calculateCompletionByGroup = function(documentsArray) {
  var completionByGroup = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    var group = documentsArray[i][columnNumbers['group']];
    if (!completionByGroup.hasOwnProperty(group)) {
      completionByGroup[group] = {
        'complete': 0,
        'total': 0,
        'percent': 0
      };
    }
    if (documentsArray[i][columnNumbers['finished']]) {
      completionByGroup[group].complete++;
    }
    completionByGroup[group].total++;
  }
  for (var group in completionByGroup) {
    if (completionByGroup.hasOwnProperty(group)) {
      completionByGroup[group].percent = (completionByGroup[group].complete / completionByGroup[group].total) * 100;
    }
  }
  return completionByGroup;
};

var calculateCompletionByCountry = function(documentsArray) {
  var completionByCountry = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    var country = documentsArray[i][columnNumbers['country']];
    if (!completionByCountry.hasOwnProperty(country)) {
      completionByCountry[country] = {
        'complete': 0,
        'total': 0,
        'percent': 0
      };
    }
    if (documentsArray[i][columnNumbers['finished']]) {
      completionByCountry[country].complete++;
    }
    completionByCountry[country].total++;
  }
  for (var country in completionByCountry) {
    if (completionByCountry.hasOwnProperty(country)) {
      completionByCountry[country].percent = (completionByCountry[country].complete / completionByCountry[country].total) * 100;
    }
  }
  return completionByCountry;
};

var calculateMepsWithMoreThanOneVersion = function(documentsArray) {
  var mepsWithMoreThanOneVersion = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    if (documentsArray[i][columnNumbers['finished']] === 1 ||
        documentsArray[i][columnNumbers['finished']] === '1') {
      var id = documentsArray[i][columnNumbers['id']];
      if (mepsWithMoreThanOneVersion.hasOwnProperty(id)) {
        mepsWithMoreThanOneVersion[id].version++;
      } else {
        mepsWithMoreThanOneVersion[id]= {
          'version': 1,
          'firstname': documentsArray[i][columnNumbers['firstname']],
          'surname': documentsArray[i][columnNumbers['surname']],
          'gender': documentsArray[i][columnNumbers['gender']],
          'dateOfBirth': documentsArray[i][columnNumbers['dateOfBirth']],
          'country': documentsArray[i][columnNumbers['country']],
          'group': documentsArray[i][columnNumbers['group']],
          'decl_url': documentsArray[i][columnNumbers['decl_url']]
        };
      }
    }
  }
  return mepsWithMoreThanOneVersion;
};

var calculateMepsWithBlankDocuments = function(documentsArray) {
  var mepsWithBlankDocuments = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    if ((documentsArray[i][columnNumbers['finished']] === 1 ||
        documentsArray[i][columnNumbers['finished']] === '1') &&
        (documentsArray[i][columnNumbers['blank']] === 1 ||
        documentsArray[i][columnNumbers['blank']] === '1')) {
      var id = documentsArray[i][columnNumbers['id']];
      if (!mepsWithBlankDocuments.hasOwnProperty(id)) {
        mepsWithBlankDocuments[id]= {
          'firstname': documentsArray[i][columnNumbers['firstname']],
          'surname': documentsArray[i][columnNumbers['surname']],
          'gender': documentsArray[i][columnNumbers['gender']],
          'dateOfBirth': documentsArray[i][columnNumbers['dateOfBirth']],
          'country': documentsArray[i][columnNumbers['country']],
          'group': documentsArray[i][columnNumbers['group']],
          'decl_url': documentsArray[i][columnNumbers['decl_url']]
        };
      }
    }
  }
  return mepsWithBlankDocuments;
};

var calculateMepsWithNothingToDeclare = function(documentsArray) {
  var mepsWithNothingToDeclare = {};
  for (var i = startRow; i < documentsArray.length; i++) {
    if ((documentsArray[i][columnNumbers['finished']] === 1 ||
        documentsArray[i][columnNumbers['finished']] === '1') &&
        (documentsArray[i][columnNumbers['nothingToDeclare']] === 1 ||
            documentsArray[i][columnNumbers['nothingToDeclare']] === '1')) {
      var id = documentsArray[i][columnNumbers['id']];
      if (!mepsWithNothingToDeclare.hasOwnProperty(id)) {
        mepsWithNothingToDeclare[id]= {
          'firstname': documentsArray[i][columnNumbers['firstname']],
          'surname': documentsArray[i][columnNumbers['surname']],
          'gender': documentsArray[i][columnNumbers['gender']],
          'dateOfBirth': documentsArray[i][columnNumbers['dateOfBirth']],
          'country': documentsArray[i][columnNumbers['country']],
          'group': documentsArray[i][columnNumbers['group']],
          'decl_url': documentsArray[i][columnNumbers['decl_url']]
        };
      }
    }
  }
  return mepsWithNothingToDeclare;
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

    $('#status').html('calculate completion by group table');
    var completionByGroup = calculateCompletionByGroup(documentsArray);
    for (var group in completionByGroup) {
      if (completionByGroup.hasOwnProperty(group)) {
        $('#completionByGroup tbody').append('<tr><td>' + group +
            '</td><td>' + completionByGroup[group].complete +
            '</td><td>' + completionByGroup[group].total + '</td><td>' +
            roundToFixed2(completionByGroup[group].percent) + '%</td></tr>');
      }
    }

    $('#status').html('calculate completion by country table');
    var completionByCountry = calculateCompletionByCountry(documentsArray);
    for (var country in completionByCountry) {
      if (completionByCountry.hasOwnProperty(country)) {
        $('#completionByCountry tbody').append('<tr><td>' + country +
            '</td><td>' + completionByCountry[country].complete +
            '</td><td>' + completionByCountry[country].total + '</td><td>' +
            roundToFixed2(completionByCountry[country].percent) + '%</td></tr>');
      }
    }

    $('#status').html('calculate MEPs with more than one version');
    var mepsWithMoreThanOneVersion = calculateMepsWithMoreThanOneVersion(documentsArray);
    for (var id in mepsWithMoreThanOneVersion) {
      if (mepsWithMoreThanOneVersion.hasOwnProperty(id)) {
        if (mepsWithMoreThanOneVersion[id].version < 2) {
          continue;
        }
        $('#mepsWithMoreThanOneVersion tbody').append(
            '<tr><td><a href="' + mepsWithMoreThanOneVersion[id].decl_url + '">' + id + '</a>' +
            '</td><td>' + mepsWithMoreThanOneVersion[id].firstname +
            '</td><td>' + mepsWithMoreThanOneVersion[id].surname +
            '</td><td>' + mepsWithMoreThanOneVersion[id].gender +
            '</td><td>' + mepsWithMoreThanOneVersion[id].dateOfBirth +
            '</td><td>' + mepsWithMoreThanOneVersion[id].country +
            '</td><td>' + mepsWithMoreThanOneVersion[id].group +
            '</td><td>' + mepsWithMoreThanOneVersion[id].version + '</td></tr>');
      }
    }

    $('#status').html('calculate MEPs with blank documents');
    var mepsWithBlankDocuments = calculateMepsWithBlankDocuments(documentsArray);
    for (var id in mepsWithBlankDocuments) {
      if (mepsWithBlankDocuments.hasOwnProperty(id)) {
        if (mepsWithBlankDocuments[id].version < 2) {
          continue;
        }
        $('#mepsWithBlankDocuments tbody').append(
            '<tr><td><a href="' + mepsWithMoreThanOneVersion[id].decl_url + '">' + id + '</a>' +
            '</td><td>' + mepsWithBlankDocuments[id].firstname +
            '</td><td>' + mepsWithBlankDocuments[id].surname +
            '</td><td>' + mepsWithBlankDocuments[id].gender +
            '</td><td>' + mepsWithBlankDocuments[id].dateOfBirth +
            '</td><td>' + mepsWithBlankDocuments[id].country +
            '</td><td>' + mepsWithBlankDocuments[id].group + '</td></tr>');
      }
    }

    $('#status').html('calculate MEPs with nothing to declare');
    var mepsWithNothingToDeclare = calculateMepsWithNothingToDeclare(documentsArray);
    for (var id in mepsWithNothingToDeclare) {
      if (mepsWithNothingToDeclare.hasOwnProperty(id)) {
        if (mepsWithNothingToDeclare[id].version < 2) {
          continue;
        }
        $('#mepsWithNothingToDeclare tbody').append(
            '<tr><td><a href="' + mepsWithMoreThanOneVersion[id].decl_url + '">' + id + '</a>' +
            '</td><td>' + mepsWithNothingToDeclare[id].firstname +
            '</td><td>' + mepsWithNothingToDeclare[id].surname +
            '</td><td>' + mepsWithNothingToDeclare[id].gender +
            '</td><td>' + mepsWithNothingToDeclare[id].dateOfBirth +
            '</td><td>' + mepsWithNothingToDeclare[id].country +
            '</td><td>' + mepsWithNothingToDeclare[id].group + '</td></tr>');
      }
    }

    $("<div id='tooltip'></div>").css({
      position: "absolute",
      display: "none",
      border: "1px solid #fdd",
      padding: "2px",
      "background-color": "#fee",
      opacity: 0.80
    }).appendTo("body");

    $('#status').html('calculate MEPs per versioncount graph');
    var versionsPerMep = countVersionsPerMep(documentsArray);
    var mepsPerVersionNumbers = calculateMepsPerVersionNumbers(versionsPerMep);
    $.plot("#mepsPerVersioncount", [convertObjectToPlotArray(mepsPerVersionNumbers)], {
      xaxis: {
        minTickSize: 1,
        min: 0,
        max: 4
      },
      grid: {
        hoverable: true,
        clickable: true
      }
    });

    $("#mepsPerVersioncount").bind("plothover", function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

        $("#tooltip").html(y)
            .css({top: item.pageY+5, left: item.pageX+5})
            .fadeIn(200);
      } else {
        $("#tooltip").hide();
      }
    });

    $('#status').html('calculate documents per month graph');
    var documentsPerDay = countDocumentsPerDay(documentsArray);
    var documentsPerMonth = countDocumentsPerMonth(documentsArray);
    $.plot("#documentsPerMonth", [convertObjectToPlotArray(documentsPerMonth).sort(), convertObjectToPlotArray(documentsPerDay).sort()], {
      series: {
        lines: {
          show: true,
          fill: true,
          steps: false
        },
        points: {
          show: true
        }
      },
      grid: {
        hoverable: true,
        clickable: true
      },
      xaxis: {
        mode: "time",
        timezone: "browser",
        timeformat: "%d.%m.%Y",
        min: moment('01.10.2011', 'DD.MM.YYYY').valueOf(),
        max: moment().valueOf()
      }
    });

    $("#documentsPerMonth").bind("plothover", function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

        $("#tooltip").html(y)
            .css({top: item.pageY+5, left: item.pageX+5})
            .fadeIn(200);
      } else {
        $("#tooltip").hide();
      }
    });

    $('#status').html('calculate MEP additional salary');
    var additionalSalaryValue = additionalSalary(documentsArray);
    $.plot("#additionalSalary", [convertKeysBySort(additionalSalaryValue)], {
      series: {
        lines: {
          show: true,
          fill: true,
          steps: false
        },
        points: {
          show: true
        }
      },
      grid: {
        hoverable: true,
        clickable: true
      },
    });

    $("#additionalSalary").bind("plothover", function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

        $("#tooltip").html(y + ' Euro')
            .css({top: item.pageY+5, left: item.pageX+5})
            .fadeIn(200);
      } else {
        $("#tooltip").hide();
      }
    });

    $('#status').html('done');
  });

});
