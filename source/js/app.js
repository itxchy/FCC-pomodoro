'use strict';

var pomodoroApp = angular.module('pomodoroApp', []);

pomodoroApp.controller('pomodoroCtrl', 
  function($scope, $interval) {
  
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
    $scope.resumeTime = (Date.now() + $scope.resumeTimerSetting) - Date.now();
  
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
      $scope.endTime = $scope.startTime + (60000 * $scope.workTimerInitialSetting);
    };
    $scope.getBreakEndTime = function () {
      $scope.endTime = $scope.startTime + (60000 * $scope.breakTimerInitialSetting)
    };
  
    $scope.getResumeTime = function() {
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
    $scope.timerPause = function() {
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
    	$scope.displayedCount = 60000 * $scope.workTimerInitialSetting
    };
  
  /******* Button handlers ================================================================*/
    
    /******* Start | Pause Button Handler *******/
    $scope.startPause = function () { 
      
      // if timer is currently running, pause or resume
      if ($scope.timerRunning) {
        
        // if timer is paused, resume
        if($scope.timerPaused) {
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
    	console.log('reset!')
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
