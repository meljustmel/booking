"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var WeekViewEventComponent = (function () {
    function WeekViewEventComponent() {
        this.eventClicked = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input()
    ], WeekViewEventComponent.prototype, "weekEvent", void 0);
    __decorate([
        core_1.Input()
    ], WeekViewEventComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.Output()
    ], WeekViewEventComponent.prototype, "eventClicked", void 0);
    WeekViewEventComponent = __decorate([
        core_1.Component({
            selector: 'week-view-event',
            template: "\n    <div\n      class=\"cal-event\"\n      [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n      [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n      [style.backgroundColor]=\"weekEvent.event.color.secondary\"\n      [ngClass]=\"weekEvent.event?.cssClass\"\n      [mwlCalendarTooltip]=\"weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event\"\n      [tooltipPlacement]=\"tooltipPlacement\">\n      <!--<mwl-calendar-event-title-->\n        <!--[event]=\"weekEvent.event\"-->\n        <!--view=\"week\"-->\n        <!--(click)=\"eventClicked.emit()\">-->\n      <!--</mwl-calendar-event-title>-->\n    </div>\n  "
        })
    ], WeekViewEventComponent);
    return WeekViewEventComponent;
}());
exports.WeekViewEventComponent = WeekViewEventComponent;
