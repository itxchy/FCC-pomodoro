class ButtonsController {
    constructor(TimerModelService, TimerService) {
        this.TimerModelService = TimerModelService;
        this.TimerService = TimerService;
    }

    startPauseButtonHandler () {
        // if timer is currently running, pause or resume
        if (this.TimerModelService.timerRunning) {

            // if timer is paused, resume
            if (this.TimerModelService.timerPaused) {
                this.TimerModelService.timerPaused = false;
                this.TimerService.timerResume();
                return;
            }

            // If timer is running, then pause
            this.TimerModelService.timerPaused = true;
            this.TimerService.timerPause();
            return;
        }

        this.TimerService.runTimer();
    }

    resetButtonHandler () {
        this.TimerService.resetTimer();
    }
    
    
}

ButtonsController.$inject = ['TimerModelService', 'TimerService'];

export default ButtonsController;
