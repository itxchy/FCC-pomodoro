import DisplayController from './display.controller';

const DisplayComponent = {
    controller: DisplayController,
    template: `
        <div class="row text-center clock">
            <p class="pomodoro-status">{{ $ctrl.TimerModelService.pomodoroStatus }}</p>
            <p>{{ $ctrl.TimerModelService.displayedCount | date: 'mm:ss' }}<p>
        </div>
    `
};

export default DisplayComponent;
