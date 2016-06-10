/* Function to convert minutes to hours */
function minuteToHour(minutes) {
   var result = minutes / 60;
    return +result.toString().substr(0, 4);
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
}

ko.applyBindings(new MinuteToHourModel());
