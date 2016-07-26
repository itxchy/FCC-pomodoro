import angular from 'angular';
import AppComponent from './app.component';
import PomodoroController from './app.controller';

import Components from './components/components';

import TimerModelService from './services/timerModel.service';
import TimerService from './services/timer.service';
import SettingsService from './services/settings.service';


const pomodoroApp = angular
    .module('pomodoroApp', [
        TimerModelService,
        TimerService,
        SettingsService,
        Components.name
    ])
    .controller('PomodoroCtrl', PomodoroController)
    .component('app', AppComponent);

angular.bootstrap(document.body, ['pomodoroApp']);
