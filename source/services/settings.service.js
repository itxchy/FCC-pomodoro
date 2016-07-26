import angular from 'angular';
import TimerModelService from './timerModel.service';
import TimerService from './timer.service';

class SettingsService {
    constructor(TimerModelService, TimerService) {
        this.TimerModelService = TimerModelService;
        this.TimerService = TimerService;
    }

    addWorkMinute () {

        if (this.TimerModelService.timerRunning) {
            this.TimerService.resetTimer();
        }

        // limits work time to 60 minutes
        if (this.TimerModelService.workTimeInitialSetting === 60) {
            return;
        }

        this.TimerModelService.workTimerInitialSetting += 1;
        this.TimerService.updateDisplayedCount();
    }

    removeWorkMinute () {

        // At least 1 minute of work time is required
        if (this.TimerModelService.workTimerInitialSetting === 1) {
            return;
        }

        if (this.TimerModelService.timerRunning) {
            this.TimerService.resetTimer();
        }

        this.TimerModelService.workTimerInitialSetting -= 1;
        this.TimerService.updateDisplayedCount();
    }

    addBreakMinute () {

        // limits break time to 60 minutes
        if (this.TimerModelService.breakTimerInitialSetting === 60) {
            return;
        }

        this.TimerModelService.breakTimerInitialSetting += 1;
        this.TimerService.updateDisplayedCount();
    }

    removeBreakMinute () {
        // at least 1 minute of break time is required
        if (this.TimerModelService.breakTimerInitialSetting === 1) {
            return;
        }

        this.TimerModelService.breakTimerInitialSetting -= 1;
        this.TimerService.updateDisplayedCount();
    }
}

SettingsService.$inject = ['TimerModelService', 'TimerService'];

export default angular.module('services.settings', [
        TimerModelService, 
        TimerService
    ])
    .service('SettingsService', SettingsService)
    .name;