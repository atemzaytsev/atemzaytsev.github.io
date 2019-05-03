//Budget controller
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            
            //Creat ID 
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            
            //create new item based on type

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                 newItem = new Income(ID, des, val);

            }
            
            //push it into data structure
            data.allItems[type].push(newItem);
            
            return newItem;

        }
    }

})();




//UI Controller
var UIcontroller = (function () {
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
        
        
    }
    
    
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be Inc or Exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },
        getDOMString: function(){
            return DOMStrings;
        }
    };



})();





//Global App Controller
var controller = (function (budgetContrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMString();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };



    var ctrlAddItem = function () {
        //1. get input data
        var input = UICtrl.getInput();
        console.log(input);


        //2. Add item to the budget controller
        //3. Add item to the UI
        //4. Calculate the budget
        //5. Display the budget on UI

    };
    return {
        init: function () {
            setupEventListeners();
            console.log('app hasstarted')
        }
    }



})(budgetController, UIcontroller);


controller.init();






























