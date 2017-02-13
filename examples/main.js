/**
 * @author <baniczek@gmail.com>
 */

let ChainOfResponsibility = require('../src/main');
let AbstractChainItem = ChainOfResponsibility.AbstractChainItem;
let AbstractChainItemContainer = ChainOfResponsibility.AbstractChainItemContainer;
let AbstractChainItemValueContainer = ChainOfResponsibility.AbstractChainItemValueContainer;

class ChainParkingLotBegin extends AbstractChainItem {
    _execute(valueContainer, resolve) {
        valueContainer.addToCharge(valueContainer.getParameter('entry'));
    }
}

class ChainParkingLotFirstHour extends AbstractChainItem {
    _execute(valueContainer, resolve) {
        valueContainer.subtractSeconds(3600);
        valueContainer.addToCharge(valueContainer.getParameter('first_hour'));
        setTimeout(() => {
            resolve();
        }, 2000);
    }

    shouldStopAfter(valueContainer) {
        return valueContainer.getValue('seconds') <= 0;
    }
}

class ChainParkingLotRestHours extends AbstractChainItem {
    _execute(valueContainer) {
        let seconds = valueContainer.getValue('seconds');
        valueContainer.subtractSeconds(seconds);
        valueContainer.addToCharge(Math.ceil(seconds / 60 / 60) * valueContainer.getParameter('after_first_hour'));
    }

    shouldStopAfter(valueContainer) {
        return valueContainer.getValue('seconds') <= 0;
    }
}

class ParkingLotChainItemContainer extends AbstractChainItemContainer {
    _createItemsChain(first) {
        let stack1 = first;
        let stack2 = new ChainParkingLotFirstHour(this, true);
        let stack3 = new ChainParkingLotRestHours(this);

        stack1.setNextChainItem(stack2);
        stack2.setNextChainItem(stack3);
    }

    _getFirstChainItem() {
        return new ChainParkingLotBegin(this);
    }
}

class ParkingLotValueContainer extends AbstractChainItemValueContainer {
    _parseValue(seconds) {
        return {
            charge: 0,
            seconds
        };
    }

    getResult() {
        return this.getValue('charge');
    }

    addToCharge(charge) {
        let value = this.getValue('charge');
        value += charge;
        this.setValue('charge', value);
        return this;
    }

    subtractSeconds(seconds) {
        let value = this.getValue('seconds');
        value -= seconds;
        this.setValue('seconds', value);
        return this;
    }
}

/*
 You parked your car in a parking lot and want to compute the total cost of the ticket. The billing rules are as follows:
 - The entrance fee of the car parking lot is 2;
 - The first full or partial hour costs 3;
 - Each successive full or partial hour (after the first) costs 4.

 You entered the car parking lot at time E and left at lime L. In this task. times are represented as strings in the
 format "HH:MM" (where "HH" is a two-digit number between 0 and 23, which stands for hours, and "MM" is a two-digit
 number between 0 and 59, which stands for minutes).

 Write a function:
 function solution(E, L);
 that, given strings E and L specifying points in time in the format "HH:MM", returns the total cost of the parking
 bill from you entry at time E to your exit at time L. You can assume that E describes a time before L on the same day.

 For example, given "10:00" and "13:21" your function should return 17, because the entrance fee equals 2, the first
 hour costs 3 and there are two more full hours and part of a further hour, so the total cost is 2 + 3 + (3 * 4) = 17.
 Given "09:42" and "11:42" your function should return 9, because the entrance fee equals 2, the first hour costs 3
 and the seconds hour costs 4, so the total cost is 2 + 3 + 4 = 9.

 Assume that:
 - strings E and L follow the format "HH:MM" strictly;
 - string E describes a time before L on the same day.
 */


/**
 * Parse time in "HH:MM" format.
 * @param time
 * @returns {{hour: Number, minutes: Number}}
 */
function parseTime(time) {
    let splitted = time.split(":");
    let hour = parseInt(splitted[0]);
    let minutes = parseInt(splitted[1]);
    return {
        hour,
        minutes
    };
}

function solution(E, L) {
    let startDate = new Date();
    let endDate = new Date();

    let startParsed = parseTime(E);
    let endParsed = parseTime(L);

    startDate.setHours(startParsed.hour);
    startDate.setMinutes(startParsed.minutes);

    endDate.setHours(endParsed.hour);
    endDate.setMinutes(endParsed.minutes);

    let differenceMS = endDate.getTime() - startDate.getTime();
    let differenceSecs = differenceMS / 1000;
    let charger = new ParkingLotChainItemContainer(new ParkingLotValueContainer(differenceSecs, {
        'entry': 2,
        'first_hour': 3,
        'after_first_hour': 4
    }));

    let promise = charger.run();

    promise.then((result) => {
        console.log("promised", result);
    });

    return charger.getResult();
}

let res1 = solution("10:00", "13:21");
let res2 = solution("09:42", "11:42");

console.log(res1);
console.log(res2);