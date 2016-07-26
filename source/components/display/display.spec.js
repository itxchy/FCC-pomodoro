import DisplayController from './display.controller';
import DisplayComponent from './display.component';
import Components from '../components';

describe('Display', () => {
    let TimerModelService;
    let controller;

    beforeEach(angular.mock.module('pomodoroApp.components'));

    beforeEach(angular.mock.inject( ($controller, _TimerModelService_) => {
        TimerModelService = _TimerModelService_;
        controller = $controller(DisplayController, {
            TimerModelService: TimerModelService
        })
    }));

    describe('module', () => {

        it('should have the correct name', () => {

            expect(Components.name).toEqual('pomodoroApp.components');
        });
    });

    describe('controller', () => {

        it('services should be defined', () => {

            expect(TimerModelService).toBeDefined();
            expect(TimerModelService.pomodoroStatus).toEqual('Working');
        });
    });

});