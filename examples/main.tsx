import * as ChainOfResponsibility from '../dist/chain-of-responsibility.js'

const {AbstractChainItem, AbstractChainItemValueContainer, AbstractChainItemContainer} = ChainOfResponsibility;

class ChainParkingLotBegin extends AbstractChainItem {
    constructor(...props) {
        super(...props);
    }

    _execute(valueContainer, resolve: (value: any) => void) {
        valueContainer.addToCharge(valueContainer.getParameter('entry'));
    }
}

class ChainParkingLotFirstHour extends AbstractChainItem {
    constructor(...props) {
        super(...props);
    }

    _execute(valueContainer, resolve: (value: any) => void) {
        valueContainer.subtractSeconds(3600);
        valueContainer.addToCharge(valueContainer.getParameter('first_hour'));
        setTimeout(() => {
            resolve(valueContainer.getParameter('first_hour'));
        }, 2000);
    }

    shouldStopAfter(valueContainer): boolean {
        return valueContainer.getValue('seconds') <= 0;
    }
}

class ChainParkingLotRestHours extends AbstractChainItem {
    constructor(...props) {
        super(...props);
    }

    _execute(valueContainer) {
        const seconds = valueContainer.getValue('seconds');
        valueContainer.subtractSeconds(seconds);
        valueContainer.addToCharge(Math.ceil(seconds / 60 / 60) * valueContainer.getParameter('after_first_hour'));
    }

    shouldStopAfter(valueContainer): boolean {
        return valueContainer.getValue('seconds') <= 0;
    }
}

class ParkingLotChainItemContainer extends AbstractChainItemContainer {
    constructor(...props) {
        super(...props);
    }

    _createItemsChain(first) {
        const stack1 = first;
        const stack2 = new ChainParkingLotFirstHour(this, true);
        const stack3 = new ChainParkingLotRestHours(this);

        stack1.setNextChainItem(stack2);
        stack2.setNextChainItem(stack3);
    }

    _getFirstChainItem() {
        return new ChainParkingLotBegin(this);
    }

    run(): Promise<any> {
        return super.run();
    }

    getResult(): any {
        return super.getResult();
    }
}

class ParkingLotValueContainer extends AbstractChainItemValueContainer {
    constructor(...props) {
        super(...props);
    }

    _parseValue(seconds: number): any {
        return {
            charge: 0,
            seconds
        };
    }

    getResult(): any {
        return super.getValue('charge');
    }

    addToCharge(charge: number) {
        let value = super.getValue('charge');
        value += charge;
        super.setValue('charge', value);
        return this;
    }

    subtractSeconds(seconds: number) {
        let value = super.getValue('seconds');
        value -= seconds;
        super.setValue('seconds', value);
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
function parseTime(time: string): {
    hour: number;
    minutes: number;
} {
    const splitted = time.split(":");
    const hour = parseInt(splitted[0]);
    const minutes = parseInt(splitted[1]);
    return {
        hour,
        minutes
    };
}

function solution(E: string, L: string): any {
    const startDate = new Date();
    const endDate = new Date();

    const startParsed = parseTime(E);
    const endParsed = parseTime(L);

    startDate.setHours(startParsed.hour);
    startDate.setMinutes(startParsed.minutes);

    endDate.setHours(endParsed.hour);
    endDate.setMinutes(endParsed.minutes);

    const differenceMS = endDate.getTime() - startDate.getTime();
    const differenceSecs = differenceMS / 1000;
    const charger = new ParkingLotChainItemContainer(new ParkingLotValueContainer(differenceSecs, {
        'entry': 2,
        'first_hour': 3,
        'after_first_hour': 4
    }));

    const promise = charger.run();

    promise.then((result) => {
        console.log("promised", result);
    });

    return charger.getResult();
}

const res1 = solution("10:00", "13:21");
const res2 = solution("09:42", "11:42");

console.log(res1);
console.log(res2);
