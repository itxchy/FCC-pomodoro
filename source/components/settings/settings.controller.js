class SettingsController {
    constructor(SettingsService, TimerModelService) {
        this.SettingsService = SettingsService;
        this.TimerModelService = TimerModelService;
    }

    addWorkMinuteButtonHandler () {
        this.SettingsService.addWorkMinute();
    }

    removeWorkMinuteButtonHandler () {
        this.SettingsService.removeWorkMinute();
    }

    addBreakMinuteButtonHandler () {
        this.SettingsService.addBreakMinute();
    }

    removeBreakMinuteButtonHandler () {
        this.SettingsService.removeBreakMinute();
    }
}

SettingsController.$inject = ['SettingsService', 'TimerModelService'];

export default SettingsController;