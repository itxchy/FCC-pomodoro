import ButtonsController from './buttons.controller';

const ButtonsComponent = {
    controller: ButtonsController,
    template: `
        <div class="row buttons text-center">
            <button class="clock-btn start-pause" ng-click="$ctrl.startPauseButtonHandler()">Start | Pause</button>
            <button class="clock-btn reset" ng-click="$ctrl.resetButtonHandler()">Reset</button>
        </div>    
    `
};

export default ButtonsComponent;