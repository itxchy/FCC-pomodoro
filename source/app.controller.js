function PomodoroController (TimerModelService) {
    this.TimerModelService = TimerModelService;
}

PomodoroController.$inject = ['TimerModelService'];

export default PomodoroController;