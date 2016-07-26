import SettingsController from './settings.controller';
import SettingsComponent from './settings.component';
import Components from '../components';

describe('Settings', () => {
    let SettingsService;
    let controller;

    beforeEach(angular.mock.module('pomodoroApp.components'));

    beforeEach(angular.mock.inject( ($controller, _SettingsService_) => {
        SettingsService = _SettingsService_;
        controller = $controller(SettingsController, {
            SettingsService: SettingsService
        });
    }));

    describe('module', () => {

        it('should have the correct name', () => {
            expect(Components.name).toEqual('pomodoroApp.components');
        });
    });

    describe('button handlers', () => {

        it('addWorkMinuteButtonHandler() should call SettingsService.addWorkMinute()', () => {

            spyOn(SettingsService, 'addWorkMinute');
            controller.addWorkMinuteButtonHandler();
            expect(SettingsService.addWorkMinute).toHaveBeenCalled();
        });

        it('removeWorkMinuteButtonHandler() should call SettingsService.removeWorkMinute()', () => {

            spyOn(SettingsService, 'removeWorkMinute');
            controller.removeWorkMinuteButtonHandler();
            expect(SettingsService.removeWorkMinute).toHaveBeenCalled();
        });

        it('addBreakMinuteButtonHandler() should call SettingsService.addBreakMinute()', () => {

            spyOn(SettingsService, 'addBreakMinute');
            controller.addBreakMinuteButtonHandler();
            expect(SettingsService.addBreakMinute).toHaveBeenCalled();
        });

        it('removeBreakMinuteButtonHandler() should call SettingsService.removeBreakMinute()', () => {

            spyOn(SettingsService, 'removeBreakMinute');
            controller.removeBreakMinuteButtonHandler();
            expect(SettingsService.removeBreakMinute).toHaveBeenCalled();
        });        
    });
});