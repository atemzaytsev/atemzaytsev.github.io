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

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //Creat ID 
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //create new item based on type

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);

            }

            //push it into data structure
            data.allItems[type].push(newItem);


            //return new element
            return newItem;

        },
        deleteItem: function(type, id){
            var ids, index;
           
           ids = data.allItems[type].map(function(current){
               return current.id;
           });
            index = ids.indexOf(id);
            
            if (index !== -1){
               data.allItems[type].splice(index, 1); 
            }
                
        },
        calculateBudget: function () {
            // calc total incoms and expenses

            calculateTotal('exp');
            calculateTotal('inc');



            //calc the budget: icome-expenses

            data.budget = data.totals.inc - data.totals.exp;


            // calc thr percentage of 
            if(data.totals.inc > 0){
              data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);  
            } else {
                data.percentage = -1;
            }
            

        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }

        }
    }
})();



//UI Controller
var UIcontroller = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        icomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
        
    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be Inc or Exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value) // converted in number
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            //Ceate html string with placeholder text

            if (type === 'inc') {
                element = DOMStrings.icomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div</div>';

            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }




            //Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);





            //insert html to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },
        deleteListItem: function (selectorId) {
            var el = document.getElementById(selectorId);
            
            el.parentNode.removeChild(el);
            
        },
        clearFields: function () {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, array) {
                current.value = "";

            });


        },
        
        displayBudget: function(obj){ 
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
                document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
                document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage +   ' %'
            }else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '--';
            }
                
            
            
        },

        getDOMString: function () {
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
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function () {
        //1. Calculate the budget
        budgetContrl.calculateBudget();


        //2 Return budget
        
        var budget = budgetContrl.getBudget();


        //3. Display the budget on UI
        
        UICtrl.displayBudget(budget);
    };



    var ctrlAddItem = function () {

        var input, newItem;
        //1. get input data
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            //2. Add item to the budget controller
            newItem = budgetContrl.addItem(input.type, input.description, input.value);

            //3. Add item to the UI
            UICtrl.addListItem(newItem, input.type)

            //4 Clear fields
            UICtrl.clearFields();

            //5 Calculate and update budget
            updateBudget();
        }
    };
    
    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            //1. delete item from the data structure
            budgetContrl.deleteItem(type, ID);
            
            
            
            
            //2. delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            
            //3. update and show the budget
            updateBudget();
        }
        
    };
    return {
        init: function () {
            setupEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            console.log('app has started');
            
        }
    }



})(budgetController, UIcontroller);


controller.init();





























