class DisplayController {
    constructor(TimerModelService) {
        this.TimerModelService = TimerModelService;
    }
}

DisplayController.$inject = ['TimerModelService'];

export default DisplayController;
