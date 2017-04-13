import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay
} from "date-fns";

type CalendarPeriod = 'day' | 'week' | 'month';

export function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

export function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

export function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

export function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#000742',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  pink: {
    primary: '#F19EBF',
    secondary: '#F5E2EE'
  }
};

export interface WeekDay {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  isWeekend: boolean;
}
export interface EventColor {
  primary: string;
  secondary: string;
}
export interface EventAction {
  label: string;
  cssClass?: string;
  onClick({event}: {
            event: CalendarEvent;
          }): any;
}
export interface CalendarEvent {
  start: Date;
  end?: Date;
  title: string;
  color: EventColor;
  actions?: EventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
}
export interface WeekViewEvent {
  event: CalendarEvent;
  offset: number;
  span: number;
  startsBeforeWeek: boolean;
  endsAfterWeek: boolean;
}
export interface WeekViewEventRow {
  row: WeekViewEvent[];
}
export interface MonthViewDay extends WeekDay {
  inMonth: boolean;
  events: CalendarEvent[];
  backgroundColor?: string;
  cssClass?: string;
  badgeTotal: number;
}
export interface MonthView {
  rowOffsets: number[];
  days: MonthViewDay[];
}
export interface DayViewEvent {
  event: CalendarEvent;
  height: number;
  width: number;
  top: number;
  left: number;
  startsBeforeDay: boolean;
  endsAfterDay: boolean;
}
export interface DayView {
  events: DayViewEvent[];
  width: number;
  allDayEvents: CalendarEvent[];
}
export interface DayViewHourSegment {
  isStart: boolean;
  date: Date;
  cssClass?: string;
}
export interface DayViewHour {
  segments: DayViewHourSegment[];
}
export declare const getWeekViewEventOffset: Function;
export declare const getWeekViewHeader: Function;
export declare const getWeekView: Function;
export declare const getMonthView: Function;
export declare const getDayView: Function;
export declare const getDayViewHourGrid: Function;





