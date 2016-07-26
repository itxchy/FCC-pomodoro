import SettingsController from './settings.controller';

const SettingsComponent = {
    controller: SettingsController,
    template: `
        <div class="row buttons text-center increments">
            <h1>Work Time</h1>
            <button class="clock-btn increment" ng-click="$ctrl.removeWorkMinuteButtonHandler()">-</button>
            <button class="clock-btn increment" ng-click="$ctrl.addWorkMinuteButtonHandler()">+</button>
            <span>{{$ctrl.TimerModelService.workTimerInitialSetting}} min</span>
        </div>

        <div class="row buttons text-center increments">
            <h1>Break Time</h1>
            <button class="clock-btn increment" ng-click="$ctrl.removeBreakMinuteButtonHandler()">-</button>
            <button class="clock-btn increment" ng-click="$ctrl.addBreakMinuteButtonHandler()">+</button>
            <span>{{$ctrl.TimerModelService.breakTimerInitialSetting}} min</span>
        </div>
    `
};

export default SettingsComponent;