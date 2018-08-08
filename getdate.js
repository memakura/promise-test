'use strict';

function getDate() {
    var date = new Date;
    return date;
}

function getYear(d) {
    var year = d.getFullYear();
    return year;
}

console.log(getYear());