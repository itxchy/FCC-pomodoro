import angular from 'angular';

import TimerService from './../services/timer.service';
import TimerModelService from './../services/timerModel.service';
import SettingsService from './../services/settings.service';

import ButtonsComponent from './buttons/buttons.component';
import DisplayComponent from './display/display.component';
import SettingsComponent from './settings/settings.component';


const Components = angular
    .module('pomodoroApp.components', [
        TimerService, 
        TimerModelService, 
        SettingsService
    ])
    .component('buttons', ButtonsComponent)
    .component('display', DisplayComponent)
    .component('settings', SettingsComponent);

export default Components;
