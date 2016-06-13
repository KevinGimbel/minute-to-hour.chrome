/* Function to convert minutes to hours */
function minuteToHour(minutes) {
   var result = minutes / 60;
    return +result.toString().substr(0, 4);
}

function getDateObjectFromString(string) {
  if(!string) { return false; }
  if(string.indexOf('.') > -1) {
    string = string.replace('.', ':');
  }
  var time = string.split(':');
  if(time) {
    // Format: setHours('hours', 'minutes', 'seconds')
    var timestamp = new Date().setHours(time[0], time[1], '0');
    return new Date(timestamp);
  }
  return null;
}


/* Minute to Hour Model */
function MinuteToHourModel() {
  // Reference the current instance. This makes it easier to call
  // top-level functions/update data from within handlers
  var ModelInstance = this;

  // Create the initial time as observable, this way
  // changes are handles automatically.
  ModelInstance.timeInMinutes = ko.observable(0);
  // Make the timeInHours value a ko.computed thingy, so it updates whenever
  // the observable changes.
  ModelInstance.timeInHours = ko.computed(function() {
    return minuteToHour(ModelInstance.timeInMinutes());
  });

  // Function to display a common time
  ModelInstance.displayCommonTime = function() {
    // "this" references the clicked element!
    ModelInstance.timeInMinutes(this.value);
  }
  // Default times (common times).
  ModelInstance.commonTimes = [
    {label: '15 minutes', value: 15},
    {label: '20 minutes', value: 20},
    {label: '30 minutes', value: 30},
    {label: '50 minutes', value: 50}
  ];

  ModelInstance.startTime = ko.observable(0);
  ModelInstance.endTime = ko.observable(0);
  ModelInstance.timeDifference = ko.computed(function() {
    var startDate = this.startTime();
    var endDate = this.endTime();
    if(startDate && endDate) {
      var start_time = getDateObjectFromString(startDate);
      var end_time = getDateObjectFromString(endDate);
      return (Math.abs(start_time.getTime() - end_time.getTime()) / 3600000).toFixed(2);
    }
  }, ModelInstance);
}

var viewModel = {
  minuteToHour: new MinuteToHourModel()
}
ko.applyBindings(viewModel);
