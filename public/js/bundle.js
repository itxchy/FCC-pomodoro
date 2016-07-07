'use strict';

var pomodoroApp = angular.module('pomodoroApp', []);

pomodoroApp.controller('pomodoroCtrl', function ($scope, $interval) {

  /******* Initializing Variables =====================================================*/
  // Number of minutes of work time to countdown from. User changeable
  $scope.workTimerInitialSetting = 25;
  // Number of minutes of break time to countdown from. User changable
  $scope.breakTimerInitialSetting = 5;
  // Amount of time to resume from after pause
  $scope.resumeTimerSetting = null;
  // Exact time of Start | Pause button press
  $scope.startTime = null;
  // The exact time of the timer's future completion, calculated from startTime plus workTimerInitialSetting
  $scope.endTime = null;
  // The diplayed count in the view, initiallized with initalTimerSetting's time
  $scope.resumeTime = Date.now() + $scope.resumeTimerSetting - Date.now();

  $scope.displayedCount = 60000 * $scope.workTimerInitialSetting;

  $scope.timerRunning = false;

  $scope.timerPaused = false;

  $scope.resumeTimerSetting = null;

  $scope.workTime = true;

  $scope.pomodoroStatus = 'Working';

  $scope.pomodoroBackground = 'work-background';

  /******* Timer Functions ============================================================*/
  // Stores the exact time of a Start | Pause button press
  $scope.getStartTime = function () {
    $scope.startTime = Date.now();
  };
  /**
  * The endTime for each timer is calculated by adding the startTime to the number of  
  * minutes to countdown from (which is multiplyed by 60000 to convert the minutes to 
  * miliseconds).
  */
  $scope.getWorkEndTime = function () {
    $scope.endTime = $scope.startTime + 60000 * $scope.workTimerInitialSetting;
  };
  $scope.getBreakEndTime = function () {
    $scope.endTime = $scope.startTime + 60000 * $scope.breakTimerInitialSetting;
  };

  $scope.getResumeTime = function () {
    $scope.resumeTime = Date.now() + $scope.resumeTimerSetting;
  };

  // Initialize Timer
  $scope.runTimer = function () {

    if ($scope.workTime) {
      $scope.pomodoroStatus = 'Working';
      $scope.pomodoroBackground = 'work-background';
    } else {
      $scope.pomodoroStatus = 'Enjoy your break!';
      $scope.pomodoroBackground = 'break-background';
    }
    // Calculate start and end times from the exact time of button press
    $scope.getStartTime();

    if ($scope.workTime) {
      $scope.getWorkEndTime();
    } else {
      $scope.getBreakEndTime();
    }
    $scope.timerRunning = true;
    // TODO update display to show Work Time or Break Time depending on workTime's truthyness
    // Also, write the update display function
    $scope.promise = $interval(countdown, 100);

    function countdown() {
      $scope.displayedCount = $scope.endTime - Date.now();

      // Once timer expires, stop the interval
      if ($scope.displayedCount <= 10) {
        $interval.cancel($scope.promise);
        $scope.displayedCount = 0;
        $scope.timerRunning = false;
        $scope.workTime = !$scope.workTime;
        console.log('$scope.workTime flipped! :', $scope.workTime);
        $scope.runTimer();
      }
    }
  };

  // Pause timer
  $scope.timerPause = function () {
    $scope.resumeTimerSetting = $scope.displayedCount;
    console.log('paused!', '$scope.resumeTimerSetting = ', $scope.resumeTimerSetting);
    $interval.cancel($scope.promise);
    $interval.cancel($scope.promiseResume);
  };

  // Resume timer after pause
  $scope.timerResume = function () {
    $scope.getResumeTime();
    $scope.promiseResume = $interval(resumeCountdown, 100);
    function resumeCountdown() {
      $scope.displayedCount = $scope.resumeTime - Date.now();
      if ($scope.displayedCount < 10) {
        $interval.cancel($scope.promiseResume);
      }
    }
  };

  $scope.updateDisplayedCount = function () {
    $scope.displayedCount = 60000 * $scope.workTimerInitialSetting;
  };

  /******* Button handlers ================================================================*/

  /******* Start | Pause Button Handler *******/
  $scope.startPause = function () {

    // if timer is currently running, pause or resume
    if ($scope.timerRunning) {

      // if timer is paused, resume
      if ($scope.timerPaused) {
        $scope.timerPaused = false;
        $scope.timerResume();
        return;
      }

      // If timer is running, then pause
      $scope.timerPaused = true;
      $scope.timerPause();
      return;
    }

    // Update the view with current time remaining until endTime is reached
    $scope.runTimer();
  };

  /** Reset Button Handler *******/
  $scope.reset = function () {
    console.log('reset!');
    $interval.cancel($scope.promise);
    $interval.cancel($scope.promiseResume);
    $scope.displayedCount = 60000 * $scope.workTimerInitialSetting;
    $scope.startTime = null;
    $scope.endTime = null;
    $scope.timerRunning = false;
    $scope.timerPaused = false;
    $scope.pomodoroStatus = 'Working';
    $scope.workTime = true;
    console.log('workTime should be true: ', $scope.workTime);
  };

  /** User Config handlers for setting work time and break time in minutes 
  ======================================================================*/

  $scope.addWorkMinute = function () {

    if ($scope.timerRunning) {
      $scope.reset();
    }

    /**
    * A maximum of 60 minutes of work is allowed, otherwise
    * are you really doing a pomodoro? I don't care. 60 minutes or less.
    */
    if ($scope.workTimerInitialSetting === 60) {
      return;
    }

    $scope.workTimerInitialSetting += 1;
    $scope.updateDisplayedCount();
  };

  $scope.removeWorkMinute = function () {

    // At least 1 minute of work time is required.
    if ($scope.workTimerInitialSetting === 1) {
      return;
    }

    if ($scope.timerRunning) {
      $scope.reset();
    }

    $scope.workTimerInitialSetting -= 1;
    $scope.updateDisplayedCount();
  };

  $scope.addBreakMinute = function () {

    if ($scope.breakTimerInitialSetting === 60) {
      return;
    }

    $scope.breakTimerInitialSetting += 1;
    $scope.updateDisplayedCount();
  };

  $scope.removeBreakMinute = function () {

    if ($scope.breakTimerInitialSetting === 1) {
      return;
    }

    $scope.breakTimerInitialSetting -= 1;
    $scope.updateDisplayedCount();
  };
});
//# sourceMappingURL=data:application/json;base64,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QixJQUFsQjtBQUNBLFlBQVEsR0FBUixDQUFZLDJCQUFaLEVBQXlDLE9BQU8sUUFBaEQ7QUFDRCxHQVpEOzs7OztBQWlCQSxTQUFPLGFBQVAsR0FBdUIsWUFBWTs7QUFFbEMsUUFBSSxPQUFPLFlBQVgsRUFBeUI7QUFDeEIsYUFBTyxLQUFQO0FBQ0E7Ozs7OztBQU1ELFFBQUksT0FBTyx1QkFBUCxLQUFtQyxFQUF2QyxFQUEyQztBQUMxQztBQUNBOztBQUVELFdBQU8sdUJBQVAsSUFBa0MsQ0FBbEM7QUFDQSxXQUFPLG9CQUFQO0FBQ0EsR0FoQkQ7O0FBa0JBLFNBQU8sZ0JBQVAsR0FBMEIsWUFBWTs7O0FBR3JDLFFBQUksT0FBTyx1QkFBUCxLQUFtQyxDQUF2QyxFQUEwQztBQUN6QztBQUNBOztBQUVELFFBQUksT0FBTyxZQUFYLEVBQXlCO0FBQ3hCLGFBQU8sS0FBUDtBQUNBOztBQUVELFdBQU8sdUJBQVAsSUFBa0MsQ0FBbEM7QUFDQSxXQUFPLG9CQUFQO0FBRUEsR0FkRDs7QUFnQkEsU0FBTyxjQUFQLEdBQXdCLFlBQVk7O0FBRWxDLFFBQUksT0FBTyx3QkFBUCxLQUFvQyxFQUF4QyxFQUE0QztBQUMxQztBQUNEOztBQUVELFdBQU8sd0JBQVAsSUFBbUMsQ0FBbkM7QUFDQSxXQUFPLG9CQUFQO0FBQ0QsR0FSRDs7QUFVQSxTQUFPLGlCQUFQLEdBQTJCLFlBQVk7O0FBRXJDLFFBQUksT0FBTyx3QkFBUCxLQUFvQyxDQUF4QyxFQUEyQztBQUN6QztBQUNEOztBQUVELFdBQU8sd0JBQVAsSUFBbUMsQ0FBbkM7QUFDQSxXQUFPLG9CQUFQO0FBQ0QsR0FSRDtBQVVILENBek5EIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHBvbW9kb3JvQXBwID0gYW5ndWxhci5tb2R1bGUoJ3BvbW9kb3JvQXBwJywgW10pO1xuXG5wb21vZG9yb0FwcC5jb250cm9sbGVyKCdwb21vZG9yb0N0cmwnLCBcbiAgZnVuY3Rpb24oJHNjb3BlLCAkaW50ZXJ2YWwpIHtcbiAgXG4gICAgLyoqKioqKiogSW5pdGlhbGl6aW5nIFZhcmlhYmxlcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAvLyBOdW1iZXIgb2YgbWludXRlcyBvZiB3b3JrIHRpbWUgdG8gY291bnRkb3duIGZyb20uIFVzZXIgY2hhbmdlYWJsZVxuICAgICRzY29wZS53b3JrVGltZXJJbml0aWFsU2V0dGluZyA9IDI1O1xuICAgICAgLy8gTnVtYmVyIG9mIG1pbnV0ZXMgb2YgYnJlYWsgdGltZSB0byBjb3VudGRvd24gZnJvbS4gVXNlciBjaGFuZ2FibGVcbiAgICAkc2NvcGUuYnJlYWtUaW1lckluaXRpYWxTZXR0aW5nID0gNTtcbiAgICAgIC8vIEFtb3VudCBvZiB0aW1lIHRvIHJlc3VtZSBmcm9tIGFmdGVyIHBhdXNlXG4gICAgJHNjb3BlLnJlc3VtZVRpbWVyU2V0dGluZyA9IG51bGw7XG4gICAgICAvLyBFeGFjdCB0aW1lIG9mIFN0YXJ0IHwgUGF1c2UgYnV0dG9uIHByZXNzXG4gICAgJHNjb3BlLnN0YXJ0VGltZSA9IG51bGw7XG4gICAgICAvLyBUaGUgZXhhY3QgdGltZSBvZiB0aGUgdGltZXIncyBmdXR1cmUgY29tcGxldGlvbiwgY2FsY3VsYXRlZCBmcm9tIHN0YXJ0VGltZSBwbHVzIHdvcmtUaW1lckluaXRpYWxTZXR0aW5nXG4gICAgJHNjb3BlLmVuZFRpbWUgPSBudWxsO1xuICAgICAgLy8gVGhlIGRpcGxheWVkIGNvdW50IGluIHRoZSB2aWV3LCBpbml0aWFsbGl6ZWQgd2l0aCBpbml0YWxUaW1lclNldHRpbmcncyB0aW1lXG4gICAgJHNjb3BlLnJlc3VtZVRpbWUgPSAoRGF0ZS5ub3coKSArICRzY29wZS5yZXN1bWVUaW1lclNldHRpbmcpIC0gRGF0ZS5ub3coKTtcbiAgXG4gICAgJHNjb3BlLmRpc3BsYXllZENvdW50ID0gNjAwMDAgKiAkc2NvcGUud29ya1RpbWVySW5pdGlhbFNldHRpbmc7XG5cbiAgICAkc2NvcGUudGltZXJSdW5uaW5nID0gZmFsc2U7XG4gIFxuICAgICRzY29wZS50aW1lclBhdXNlZCA9IGZhbHNlO1xuICBcbiAgICAkc2NvcGUucmVzdW1lVGltZXJTZXR0aW5nID0gbnVsbDtcblxuICAgICRzY29wZS53b3JrVGltZSA9IHRydWU7XG5cbiAgICAkc2NvcGUucG9tb2Rvcm9TdGF0dXMgPSAnV29ya2luZyc7XG5cbiAgICAkc2NvcGUucG9tb2Rvcm9CYWNrZ3JvdW5kID0gJ3dvcmstYmFja2dyb3VuZCc7XG4gICAgXG5cbiAgXG4gICAgLyoqKioqKiogVGltZXIgRnVuY3Rpb25zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAvLyBTdG9yZXMgdGhlIGV4YWN0IHRpbWUgb2YgYSBTdGFydCB8IFBhdXNlIGJ1dHRvbiBwcmVzc1xuICAgICRzY29wZS5nZXRTdGFydFRpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkc2NvcGUuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9O1xuICAgICAgLyoqXG4gICAgICAqIFRoZSBlbmRUaW1lIGZvciBlYWNoIHRpbWVyIGlzIGNhbGN1bGF0ZWQgYnkgYWRkaW5nIHRoZSBzdGFydFRpbWUgdG8gdGhlIG51bWJlciBvZiAgXG4gICAgICAqIG1pbnV0ZXMgdG8gY291bnRkb3duIGZyb20gKHdoaWNoIGlzIG11bHRpcGx5ZWQgYnkgNjAwMDAgdG8gY29udmVydCB0aGUgbWludXRlcyB0byBcbiAgICAgICogbWlsaXNlY29uZHMpLlxuICAgICAgKi9cbiAgICAkc2NvcGUuZ2V0V29ya0VuZFRpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkc2NvcGUuZW5kVGltZSA9ICRzY29wZS5zdGFydFRpbWUgKyAoNjAwMDAgKiAkc2NvcGUud29ya1RpbWVySW5pdGlhbFNldHRpbmcpO1xuICAgIH07XG4gICAgJHNjb3BlLmdldEJyZWFrRW5kVGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRzY29wZS5lbmRUaW1lID0gJHNjb3BlLnN0YXJ0VGltZSArICg2MDAwMCAqICRzY29wZS5icmVha1RpbWVySW5pdGlhbFNldHRpbmcpXG4gICAgfTtcbiAgXG4gICAgJHNjb3BlLmdldFJlc3VtZVRpbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5yZXN1bWVUaW1lID0gRGF0ZS5ub3coKSArICRzY29wZS5yZXN1bWVUaW1lclNldHRpbmc7XG4gICAgfTtcbiAgXG4gICAgICAvLyBJbml0aWFsaXplIFRpbWVyXG4gICAgJHNjb3BlLnJ1blRpbWVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICBpZiAoJHNjb3BlLndvcmtUaW1lKSB7XG4gICAgICAgICRzY29wZS5wb21vZG9yb1N0YXR1cyA9ICdXb3JraW5nJztcbiAgICAgICAgJHNjb3BlLnBvbW9kb3JvQmFja2dyb3VuZCA9ICd3b3JrLWJhY2tncm91bmQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNjb3BlLnBvbW9kb3JvU3RhdHVzID0gJ0Vuam95IHlvdXIgYnJlYWshJztcbiAgICAgICAgJHNjb3BlLnBvbW9kb3JvQmFja2dyb3VuZCA9ICdicmVhay1iYWNrZ3JvdW5kJztcbiAgICAgIH1cbiAgICAgIC8vIENhbGN1bGF0ZSBzdGFydCBhbmQgZW5kIHRpbWVzIGZyb20gdGhlIGV4YWN0IHRpbWUgb2YgYnV0dG9uIHByZXNzXG4gICAgICAkc2NvcGUuZ2V0U3RhcnRUaW1lKCk7XG5cbiAgICAgIGlmICgkc2NvcGUud29ya1RpbWUpIHtcbiAgICAgICAgJHNjb3BlLmdldFdvcmtFbmRUaW1lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUuZ2V0QnJlYWtFbmRUaW1lKCk7XG4gICAgICB9XG4gICAgICAkc2NvcGUudGltZXJSdW5uaW5nID0gdHJ1ZTtcbiAgICAgIC8vIFRPRE8gdXBkYXRlIGRpc3BsYXkgdG8gc2hvdyBXb3JrIFRpbWUgb3IgQnJlYWsgVGltZSBkZXBlbmRpbmcgb24gd29ya1RpbWUncyB0cnV0aHluZXNzXG4gICAgICAvLyBBbHNvLCB3cml0ZSB0aGUgdXBkYXRlIGRpc3BsYXkgZnVuY3Rpb25cbiAgICAgICRzY29wZS5wcm9taXNlID0gJGludGVydmFsKGNvdW50ZG93biwgMTAwKTtcblxuICAgICAgZnVuY3Rpb24gY291bnRkb3duKCkge1xuICAgICAgICAkc2NvcGUuZGlzcGxheWVkQ291bnQgPSAkc2NvcGUuZW5kVGltZSAtIERhdGUubm93KCk7XG4gICAgICAgIFxuICAgICAgICAvLyBPbmNlIHRpbWVyIGV4cGlyZXMsIHN0b3AgdGhlIGludGVydmFsXG4gICAgICAgIGlmICgkc2NvcGUuZGlzcGxheWVkQ291bnQgPD0gMTApIHtcbiAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKCRzY29wZS5wcm9taXNlKTtcbiAgICAgICAgICAkc2NvcGUuZGlzcGxheWVkQ291bnQgPSAwO1xuICAgICAgICAgICRzY29wZS50aW1lclJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAkc2NvcGUud29ya1RpbWUgPSAhJHNjb3BlLndvcmtUaW1lO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCckc2NvcGUud29ya1RpbWUgZmxpcHBlZCEgOicsICRzY29wZS53b3JrVGltZSk7XG4gICAgICAgICAgJHNjb3BlLnJ1blRpbWVyKCk7ICAgICBcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9O1xuICBcbiAgICAgIC8vIFBhdXNlIHRpbWVyXG4gICAgJHNjb3BlLnRpbWVyUGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5yZXN1bWVUaW1lclNldHRpbmcgPSAkc2NvcGUuZGlzcGxheWVkQ291bnQ7XG4gICAgICBjb25zb2xlLmxvZygncGF1c2VkIScsICckc2NvcGUucmVzdW1lVGltZXJTZXR0aW5nID0gJywgJHNjb3BlLnJlc3VtZVRpbWVyU2V0dGluZyk7XG4gICAgICAkaW50ZXJ2YWwuY2FuY2VsKCRzY29wZS5wcm9taXNlKTtcbiAgICAgICRpbnRlcnZhbC5jYW5jZWwoJHNjb3BlLnByb21pc2VSZXN1bWUpO1xuICAgIH07XG4gIFxuICAgICAgLy8gUmVzdW1lIHRpbWVyIGFmdGVyIHBhdXNlXG4gICAgJHNjb3BlLnRpbWVyUmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgJHNjb3BlLmdldFJlc3VtZVRpbWUoKTtcbiAgICAgICRzY29wZS5wcm9taXNlUmVzdW1lID0gJGludGVydmFsKHJlc3VtZUNvdW50ZG93biwgMTAwKTtcbiAgICAgIGZ1bmN0aW9uIHJlc3VtZUNvdW50ZG93bigpIHtcbiAgICAgICAgJHNjb3BlLmRpc3BsYXllZENvdW50ID0gJHNjb3BlLnJlc3VtZVRpbWUgLSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoJHNjb3BlLmRpc3BsYXllZENvdW50IDwgMTApIHtcbiAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKCRzY29wZS5wcm9taXNlUmVzdW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUudXBkYXRlRGlzcGxheWVkQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgXHQkc2NvcGUuZGlzcGxheWVkQ291bnQgPSA2MDAwMCAqICRzY29wZS53b3JrVGltZXJJbml0aWFsU2V0dGluZ1xuICAgIH07XG4gIFxuICAvKioqKioqKiBCdXR0b24gaGFuZGxlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgXG4gICAgLyoqKioqKiogU3RhcnQgfCBQYXVzZSBCdXR0b24gSGFuZGxlciAqKioqKioqL1xuICAgICRzY29wZS5zdGFydFBhdXNlID0gZnVuY3Rpb24gKCkgeyBcbiAgICAgIFxuICAgICAgLy8gaWYgdGltZXIgaXMgY3VycmVudGx5IHJ1bm5pbmcsIHBhdXNlIG9yIHJlc3VtZVxuICAgICAgaWYgKCRzY29wZS50aW1lclJ1bm5pbmcpIHtcbiAgICAgICAgXG4gICAgICAgIC8vIGlmIHRpbWVyIGlzIHBhdXNlZCwgcmVzdW1lXG4gICAgICAgIGlmKCRzY29wZS50aW1lclBhdXNlZCkge1xuICAgICAgICAgICRzY29wZS50aW1lclBhdXNlZCA9IGZhbHNlOyAgICAgXG4gICAgICAgICAgJHNjb3BlLnRpbWVyUmVzdW1lKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBJZiB0aW1lciBpcyBydW5uaW5nLCB0aGVuIHBhdXNlXG4gICAgICAgICRzY29wZS50aW1lclBhdXNlZCA9IHRydWU7XG4gICAgICAgICRzY29wZS50aW1lclBhdXNlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuXG4gICAgICBcbiAgICAgIC8vIFVwZGF0ZSB0aGUgdmlldyB3aXRoIGN1cnJlbnQgdGltZSByZW1haW5pbmcgdW50aWwgZW5kVGltZSBpcyByZWFjaGVkXG4gICAgICAkc2NvcGUucnVuVGltZXIoKTtcbiAgICB9O1xuXG4gICAgLyoqIFJlc2V0IEJ1dHRvbiBIYW5kbGVyICoqKioqKiovXG4gICAgJHNjb3BlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIFx0Y29uc29sZS5sb2coJ3Jlc2V0IScpXG4gICAgICAkaW50ZXJ2YWwuY2FuY2VsKCRzY29wZS5wcm9taXNlKTtcbiAgICAgICRpbnRlcnZhbC5jYW5jZWwoJHNjb3BlLnByb21pc2VSZXN1bWUpO1xuICAgICAgJHNjb3BlLmRpc3BsYXllZENvdW50ID0gNjAwMDAgKiAkc2NvcGUud29ya1RpbWVySW5pdGlhbFNldHRpbmc7XG4gICAgICAkc2NvcGUuc3RhcnRUaW1lID0gbnVsbDtcbiAgICAgICRzY29wZS5lbmRUaW1lID0gbnVsbDtcbiAgICAgICRzY29wZS50aW1lclJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICRzY29wZS50aW1lclBhdXNlZCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLnBvbW9kb3JvU3RhdHVzID0gJ1dvcmtpbmcnO1xuICAgICAgJHNjb3BlLndvcmtUaW1lID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKCd3b3JrVGltZSBzaG91bGQgYmUgdHJ1ZTogJywgJHNjb3BlLndvcmtUaW1lKTtcbiAgICB9O1xuXG4gICAgLyoqIFVzZXIgQ29uZmlnIGhhbmRsZXJzIGZvciBzZXR0aW5nIHdvcmsgdGltZSBhbmQgYnJlYWsgdGltZSBpbiBtaW51dGVzIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4gICAgJHNjb3BlLmFkZFdvcmtNaW51dGUgPSBmdW5jdGlvbiAoKSB7XG4gICBcdFxuICAgIFx0aWYgKCRzY29wZS50aW1lclJ1bm5pbmcpIHtcbiAgICBcdFx0JHNjb3BlLnJlc2V0KCk7XG4gICAgXHR9XG5cbiAgICBcdC8qKlxuICAgIFx0KiBBIG1heGltdW0gb2YgNjAgbWludXRlcyBvZiB3b3JrIGlzIGFsbG93ZWQsIG90aGVyd2lzZVxuICAgIFx0KiBhcmUgeW91IHJlYWxseSBkb2luZyBhIHBvbW9kb3JvPyBJIGRvbid0IGNhcmUuIDYwIG1pbnV0ZXMgb3IgbGVzcy5cbiAgICBcdCovXG4gICAgXHRpZiAoJHNjb3BlLndvcmtUaW1lckluaXRpYWxTZXR0aW5nID09PSA2MCkge1xuICAgIFx0XHRyZXR1cm47XG4gICAgXHR9XG5cbiAgICBcdCRzY29wZS53b3JrVGltZXJJbml0aWFsU2V0dGluZyArPSAxO1xuICAgIFx0JHNjb3BlLnVwZGF0ZURpc3BsYXllZENvdW50KCk7XG4gICAgfTtcblxuICAgICRzY29wZS5yZW1vdmVXb3JrTWludXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgXHQvLyBBdCBsZWFzdCAxIG1pbnV0ZSBvZiB3b3JrIHRpbWUgaXMgcmVxdWlyZWQuXG4gICAgXHRpZiAoJHNjb3BlLndvcmtUaW1lckluaXRpYWxTZXR0aW5nID09PSAxKSB7XG4gICAgXHRcdHJldHVybjtcbiAgICBcdH1cblxuICAgIFx0aWYgKCRzY29wZS50aW1lclJ1bm5pbmcpIHtcbiAgICBcdFx0JHNjb3BlLnJlc2V0KCk7XG4gICAgXHR9XG5cbiAgICBcdCRzY29wZS53b3JrVGltZXJJbml0aWFsU2V0dGluZyAtPSAxO1xuICAgIFx0JHNjb3BlLnVwZGF0ZURpc3BsYXllZENvdW50KCk7XG5cbiAgICB9O1xuXG4gICAgJHNjb3BlLmFkZEJyZWFrTWludXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICBpZiAoJHNjb3BlLmJyZWFrVGltZXJJbml0aWFsU2V0dGluZyA9PT0gNjApIHtcbiAgICAgICAgcmV0dXJuOyBcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLmJyZWFrVGltZXJJbml0aWFsU2V0dGluZyArPSAxO1xuICAgICAgJHNjb3BlLnVwZGF0ZURpc3BsYXllZENvdW50KCk7XG4gICAgfTtcblxuICAgICRzY29wZS5yZW1vdmVCcmVha01pbnV0ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgaWYgKCRzY29wZS5icmVha1RpbWVySW5pdGlhbFNldHRpbmcgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUuYnJlYWtUaW1lckluaXRpYWxTZXR0aW5nIC09IDE7XG4gICAgICAkc2NvcGUudXBkYXRlRGlzcGxheWVkQ291bnQoKTtcbiAgICB9O1xuIFxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
