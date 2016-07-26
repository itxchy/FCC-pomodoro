import ButtonsController from './buttons.controller';
import ButtonsComponent from './buttons.component';
import Components from '../components';

describe('Buttons', () => {
    let $rootScope;
    let TimerService;
    let TimerModelService;
    let controller;

    beforeEach(angular.mock.module('pomodoroApp.components'));
    
    beforeEach(angular.mock.inject( (_$rootScope_, $controller, _TimerService_, _TimerModelService_) => {
        $rootScope = _$rootScope_;
        TimerService = _TimerService_;
        TimerModelService = _TimerModelService_;
        controller = $controller(ButtonsController, {
            $scope: $rootScope, TimerService: TimerService, TimerModelService: TimerModelService
        });
    }));


    describe('module', () => {
        
        it('should have the correct name', () => {
            expect(Components.name).toEqual('pomodoroApp.components');
        });
    });

    describe('controller', () => {

        it('services should be defined', () => {

            expect(TimerModelService).toBeDefined();
            expect(TimerService).toBeDefined();
            expect(TimerModelService.pomodoroStatus).toEqual('Working');
        });

        it('controller should be defined', () => {

            expect(controller).toBeDefined();
            expect(controller.startPauseButtonHandler).toBeDefined();
        });

        describe('startPause()', () => {

            it('if the timer isn\'t running, start the timer', () => {

                spyOn(controller, 'startPauseButtonHandler').and.callThrough();

                expect(TimerModelService.timerRunning).toBe(false);

                controller.startPauseButtonHandler();

                expect(controller.startPauseButtonHandler).toHaveBeenCalled();

                expect(TimerModelService.timerRunning).toBe(true);
            });

            it('if the timer is running, and not paused, then pause', () => {

                spyOn(TimerService, 'timerPause').and.callThrough();

                TimerModelService.timerRunning = true;
                TimerModelService.timerPaused = false;
                expect(TimerModelService.timerRunning).toBe(true);
                expect(TimerModelService.timerPaused).toBe(false);

                controller.startPauseButtonHandler();

                expect(TimerService.timerPause).toHaveBeenCalled();
                expect(TimerModelService.timerRunning).toBe(true);
                expect(TimerModelService.timerPaused).toBe(true);

                TimerModelService.timerRunning = false;
                TimerModelService.timerPaused = false;
            });

            it('if the timer is running, and paused, then resume', () => {
                spyOn(TimerService, 'timerResume').and.callThrough();

                TimerModelService.timerRunning = true;
                TimerModelService.timerPaused = true;
                expect(TimerModelService.timerRunning).toBe(true);
                expect(TimerModelService.timerPaused).toBe(true);

                controller.startPauseButtonHandler();

                expect(TimerService.timerResume).toHaveBeenCalled();
                expect(TimerModelService.timerRunning).toBe(true);
                expect(TimerModelService.timerPaused).toBe(false);

            });
        });

        describe('resetButtonHandler()', () => {

            it('should call TimerService.resetTimer()', () => {
                spyOn(TimerService, 'resetTimer');

                controller.resetButtonHandler();
                expect(TimerService.resetTimer).toHaveBeenCalled();
            });

        }); 

        xdescribe('reset()', () => {

            beforeEach(() => {
                spyOn(controller, 'cancelPromises').and.callThrough();
                controller.startPause();
                controller.startPause();
                controller.startPause();
                controller.reset();
            });


            it('cancelPromises() should be called', () => {
                expect(controller.cancelPromises).toHaveBeenCalled();
            });

            it('TimerModelService\'s should reset to defaults', () => {
                expect(TimerModelService.startTime).toEqual(null);
                expect(TimerModelService.timerRunning).toBe(false);
                expect(TimerModelService.workTime).toBe(true);
            });
        });

        xdescribe('cancelPromises()', () => {

            beforeEach(() => {
                controller.startPause();
                controller.startPause();
                controller.startPause();
                controller.reset();
            });

            it('TimeService.promise should be canceled if defined', () => {
                expect(TimerService.promise.$$state.value).toEqual('canceled');
            });

            it('TimeService.promiseResume should be canceled if defined', () => {
                expect(TimerService.promise.$$state.value).toEqual('canceled');
            });

        });

    });
});