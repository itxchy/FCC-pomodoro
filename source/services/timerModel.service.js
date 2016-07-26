import angular from 'angular';

class TimerModelService {
    constructor () {
        // Number of minutes of work time to countdown from. User changeable
        this.workTimerInitialSetting = 25;
        // Number of minutes of break time to countdown from. User changable
        this.breakTimerInitialSetting = 5;
        // Amount of time to resume from after pause
        this.resumeTimerSetting = null;
        // Exact time of Start | Pause button press
        this.startTime = null;
        // The exact time of the timer's future completion, calculated from startTime plus workTimerInitialSetting
        this.endTime = null;
        // The diplayed count in the view, initiallized with initalTimerSetting's time
        this.resumeTime = (Date.now() + this.resumeTimerSetting) - Date.now();
    
        this.displayedCount = 60000 * this.workTimerInitialSetting;

        this.timerRunning = false;
  
        this.timerPaused = false;
  
        this.resumeTimerSetting = null;

        this.workTime = true;

        this.pomodoroStatus = 'Working';

        this.pomodoroBackground = 'work-background';
    }
}

export default angular.module('services.timer-model', [])
    .service('TimerModelService', TimerModelService)
    .name;