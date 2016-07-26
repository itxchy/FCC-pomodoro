import angular from 'angular';
import TimerModelService from './timerModel.service';

class TimerService {
    constructor(TimerModelService, $interval, $rootScope) {
        this.TimerModelService = TimerModelService;
        this.$interval = $interval;
        this.$rootScope = $rootScope;
        this.promise;
        this.promiseResume;
    }

    // Stores the exact time of a Start | Pause button press
    getStartTime () {
        this.TimerModelService.startTime = Date.now();
    }

    /**
     * The endTime for each timer is calculated by adding the startTime to the number of  
     * minutes to countdown from (which is multiplyed by 60000 to convert the minutes to 
     * miliseconds).
     */
    getWorkEndTime () {
        this.TimerModelService.endTime = this.TimerModelService.startTime + (60000 * this.TimerModelService.workTimerInitialSetting);
    }

    getBreakEndTime () {
        this.TimerModelService.endTime = this.TimerModelService.startTime + (60000 * this.TimerModelService.breakTimerInitialSetting);
    }

    getResumeTime () {
        this.TimerModelService.resumeTime = Date.now() + this.TimerModelService.resumeTimerSetting;
    }

    updateTimerStatus () {
        if (this.TimerModelService.workTime) {
            this.TimerModelService.pomodoroStatus = 'Working';
            this.TimerModelService.pomodoroBackground = 'work-background';
        } else {
            this.TimerModelService.pomodoroStatus = 'Enjoy your break!';
            this.TimerModelService.pomodoroBackground = 'break-background';
        }
    }

    runTimer () {

        let self = this;

        this.updateTimerStatus();
        // Calculate start and end times from the exact time of button press
        this.getStartTime();

        if (this.TimerModelService.workTime) {
            this.getWorkEndTime();
        } else {
            this.getBreakEndTime();
        }

        this.TimerModelService.timerRunning = true;

        this.promise = this.$interval(countdown, 100);

        function countdown() {
            self.TimerModelService.displayedCount = self.TimerModelService.endTime - Date.now();

            // Once timer expires, stop the interval
            if (self.TimerModelService.displayedCount <= 10) {
                self.$interval.cancel(self.promise);
                self.TimerModelService.displayedCount = 0;
                self.TimerModelService.timerRunning = false;
                self.TimerModelService.workTime = !self.TimerModelService.workTime;
                self.runTimer();
            }
        }
    }

    timerPause () {
        this.TimerModelService.resumeTimerSetting = this.TimerModelService.displayedCount;

        this.$interval.cancel(this.promise);

        if (this.promiseResume) {
            this.$interval.cancel(this.promiseResume);
        }
        
    }

    timerResume () {
        let self = this;
        this.getResumeTime();
        this.promiseResume = this.$interval(resumeCountdown, 100);

        function resumeCountdown() {
            self.TimerModelService.displayedCount = self.TimerModelService.resumeTime - Date.now();
            this.$rootScope.$apply();
            if (self.TimerModelService.displayedCount < 10) {
                self.$interval.cancel(self.promiseResume);
            }
        }
    }

    updateDisplayedCount () {
        this.TimerModelService.displayedCount = 60000 * this.TimerModelService.workTimerInitialSetting;
    }

    resetTimer () {
        
        this.cancelPromises();
        
        this.TimerModelService.displayedCount = 60000 * this.TimerModelService.workTimerInitialSetting;
        this.TimerModelService.startTime = null;
        this.TimerModelService.endTime = null;
        this.TimerModelService.timerRunning = false;
        this.TimerModelService.timerPaused = false;
        this.TimerModelService.pomodoroStatus = 'Working';
        this.TimerModelService.workTime = true;
    }

    cancelPromises () {
        if (this.promise) {
            this.$interval.cancel(this.promise);
        }

        if (this.promiseResume) {
            this.$interval.cancel(this.promiseResume);
        }
    }
}

TimerService.$inject = ['TimerModelService', '$interval', '$rootScope'];

export default angular.module('services.timer', [TimerModelService])
    .service('TimerService', TimerService)
    .name;
