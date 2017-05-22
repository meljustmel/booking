import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CalendarDayViewHourSegmentComponent, CalendarDayViewComponent, CalendarWeekViewComponent, CalendarWeekViewEventComponent, CalendarWeekViewHeaderComponent, CalendarHeaderComponent, CalendarFormComponent, CalendarEventTitleComponent, EventActionsComponent, ViewHeaderComponent, TimePickerComponent, TimeSlotsComponent, CalendarComponent, CalendarMonthCellComponent, CalendarOpenDayEventsComponent, DayFormComponent } from "./components/index";
import {CalendarDatePipe, CalendarEventTitlePipe, TimePipe, FirstPipe, DatePipe} from "./pipes/index";
import {CalendarEventTitleFormatter} from "./providers/calendarEventTitleFormatter.provider";
import {CalendarDateFormatter} from "./providers/calendarDateFormatter.provider";
import {CalendarTooltipDirective, CalendarTooltipWindowComponent} from "./directives/calendarTooltip.directive";
import {CalendarPreviousViewDirective} from "./directives/calendarPreviousView.directive";
import {CalendarNextViewDirective} from "./directives/calendarNextView.directive";
import {CalendarTodayDirective} from "./directives/calendarToday.directive";

import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CalendarComponent,
    CalendarDayViewHourSegmentComponent,
    CalendarFormComponent,
    CalendarHeaderComponent,
    CalendarMonthCellComponent,
    CalendarWeekViewComponent, CalendarWeekViewEventComponent, CalendarWeekViewHeaderComponent,
    CalendarDayViewComponent,
    CalendarOpenDayEventsComponent,
    CalendarEventTitleComponent,
    EventActionsComponent,
    CalendarDatePipe,
    CalendarEventTitlePipe,
    TimePipe,
    FirstPipe,
    DatePipe,
    CalendarTooltipDirective,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarTooltipWindowComponent,
    TimeSlotsComponent,
    TimePickerComponent,
    ViewHeaderComponent,
    DayFormComponent
  ],
  exports: [
    CalendarComponent,
    CalendarDayViewHourSegmentComponent,
    CalendarFormComponent,
    CalendarMonthCellComponent,
    CalendarWeekViewComponent, CalendarWeekViewEventComponent, CalendarWeekViewHeaderComponent,
    CalendarDayViewComponent,
    CalendarHeaderComponent,
    CalendarOpenDayEventsComponent,
    CalendarEventTitleComponent,
    EventActionsComponent,
    CalendarDatePipe,
    CalendarEventTitlePipe,
    CalendarTooltipDirective,
    TimePipe,
    FirstPipe,
    DatePipe,
    CalendarPreviousViewDirective,
    CalendarNextViewDirective,
    CalendarTodayDirective,
    CalendarTooltipWindowComponent,
    TimeSlotsComponent,
    TimePickerComponent,
    ViewHeaderComponent,
    DayFormComponent
  ],
  entryComponents: [
    CalendarTooltipWindowComponent
  ]
})
export class ScheduleModule {
  static forRoot(): ModuleWithProviders {

    return {
      ngModule: ScheduleModule,
      providers: [
        CalendarEventTitleFormatter,
        CalendarDateFormatter
      ]
    };

  }
}
