# chain-of-responsibility

## About pattern
[Description of "Chain of Responsibility" pattern](https://www.joezimjs.com/javascript/javascript-design-patterns-chain-of-responsibility/)

## Installation
```
npm install chain-of-responsibility 
```

## Usage

Import classes:

```javascript
let ChainOfResponsibility = require('chain-of-responsibility');
let AbstractChainItem = ChainOfResponsibility.AbstractChainItem;
let AbstractChainItemContainer = ChainOfResponsibility.AbstractChainItemContainer;
let AbstractChainItemValueContainer = ChainOfResponsibility.AbstractChainItemValueContainer;
```

### Create chain items:

```javascript
class ChainParkingLotBegin extends AbstractChainItem {
    _execute(valueContainer) {
        valueContainer.addToCharge(valueContainer.getParameter('entry'));
    }
}
```

```javascript
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
```

If Chain Item was created with async flag in ```_execute``` method there is second parameter available which is 
resolve function.

```javascript
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
```

#### Chain Item flow methods

In ```AbstractChainItem``` class you can modify the Chain Stack flow.

The following methods are available:

* ```shouldStopBefore```
* ```shouldStopAfter```
* ```shouldSkip```

and should return booleans.

### Create chain items container:

```javascript
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
```

Second parameter in ```new ChainParkingLotFirstHour(this, true);``` describes if Chain Item is async.

### Create value container:

```javascript
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
```

### Use created classes:

```javascript
let charger = new ParkingLotChainItemContainer(new ParkingLotValueContainer(12060, {
    'entry': 2,
    'first_hour': 3,
    'after_first_hour': 4
}));

let promise = charger.run();

promise.then((result) => {
    console.log("promised", result); // promised 17
});

let result = charger.getResult();

console.log(result); // 5
```