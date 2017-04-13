"use strict";
var date_fns_1 = require("date-fns");
function addPeriod(period, date, amount) {
    return {
        day: date_fns_1.addDays,
        week: date_fns_1.addWeeks,
        month: date_fns_1.addMonths
    }[period](date, amount);
}
exports.addPeriod = addPeriod;
function subPeriod(period, date, amount) {
    return {
        day: date_fns_1.subDays,
        week: date_fns_1.subWeeks,
        month: date_fns_1.subMonths
    }[period](date, amount);
}
exports.subPeriod = subPeriod;
function startOfPeriod(period, date) {
    return {
        day: date_fns_1.startOfDay,
        week: date_fns_1.startOfWeek,
        month: date_fns_1.startOfMonth
    }[period](date);
}
exports.startOfPeriod = startOfPeriod;
function endOfPeriod(period, date) {
    return {
        day: date_fns_1.endOfDay,
        week: date_fns_1.endOfWeek,
        month: date_fns_1.endOfMonth
    }[period](date);
}
exports.endOfPeriod = endOfPeriod;
