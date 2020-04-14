

//BUDGET CONTROLLER 
var budgetController = (function(){

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(cur){
      sum = sum + cur.value;
    });
    data.totals[type] = sum;
  }

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
    addItem: function(type, des, val){
      var newItem, ID;

      //create new ID 
      if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length -1].id +1;
      }
      else{
        ID = 0;
      }

      //create new item based on exp or inc type 
      if (type === 'exp'){
        newItem = new Expense(ID, des, val);
      }
      else if (type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      //push into our data structure
      data.allItems[type].push(newItem);

      //return the new element 
      return newItem;
    }, 

    calculateBudget: function(){

      // calculate total income and expenses 
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate budget: income - budget 
      data.budget = Math.round((100*(data.totals.inc - data.totals.exp))/100);

      // calculate the percentage of income spent  
      if (data.totals.inc > 0){
        data.percentage = Math.round(100*(data.totals.exp / data.totals.inc));
      }
      else{
        data.percentage = -1
      }
    },

    getBudget: function(){
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function(){
      console.log(data);
    }
  }


})();

//UI CONTROLLER 
var UIcontroller = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value', 
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetValue: '.budget__value',
    budgetIncome: '.budget__income--value',
    budgetIncomePercentage: '.budget__income--percentage',
    budgetExpense: '.budget__expenses--value',
    budgetExpensePercentage:'.budget__expenses--percentage'
  };

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp 
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //parseFloat changes string to int 
      };
    },

    addListItem: function(obj, type){

      var html, newHtml, element;
      // create html string with placeholder tag - notice difference between single quotes and double quotes

      if (type === 'inc'){
        element = DOMstrings.incomeContainer; 
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      
      if (type === 'exp'){
        element = DOMstrings.expensesContainer; 
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      //replace placeholder tag with actual data 
      newHtml = html.replace('%id%',obj.id);
      newHtml = newHtml.replace('%description%',obj.description);
      newHtml = newHtml.replace('%value%',obj.value);

      // insert HTML into DOM 
      document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
    },

    clearFields: function(){
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      //querySelectorAll returns a list. So convert the list into an arry! 

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array){
          current.value = "";
      });

      fieldsArr[0].focus();

    },

    changeBudget: function(obj){  

      if (obj.budget > 0){
        document.querySelector(DOMstrings.budgetValue).innerHTML = '+ ' + obj.budget;
        document.querySelector(DOMstrings.budgetIncome).innerHTML = obj.totalInc;
      }
      else if (obj.budget < 0){
        document.querySelector(DOMstrings.budgetValue).innerHTML = obj.budget;
      }
      else{ 
        document.querySelector(DOMstrings.budgetValue).innerHTML = '0';
      }

      document.querySelector(DOMstrings.budgetIncome).innerHTML = obj.totalInc;
      document.querySelector(DOMstrings.budgetExpense).innerHTML = obj.totalExp;
      if (obj.percentage > 0){
        document.querySelector(DOMstrings.budgetExpensePercentage).innerHTML = obj.percentage + '%';
      }else {
        document.querySelector(DOMstrings.budgetExpensePercentage).innerHTML = '---';
      }
    },

    getDOMstrings: function(){
      return DOMstrings;
    }
  };
})();


//GLOBAL APP CONTROLLER 
var controller = (function(budgetCtrl, uictrl){

  var setupEventListeners = function(){
    var DOM = uictrl.getDOMstrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAdditem);
    document.addEventListener('keydown', function(event){
      if (event.keyCode == 13){
        ctrlAdditem();
      }
    });
  }

  var updateBudget = function(){

    // 1. calculate the budget 
    budgetCtrl.calculateBudget();

    // 2. return the budget 
    var budget = budgetCtrl.getBudget();

    // 3. display the budget on UI
    uictrl.changeBudget(budget);
  }

  var ctrlAdditem = function(){
    var input, newItem;
    
    // 1. Get the field input data
    input = uictrl.getInput();

    // error checking 
    if (input.description !== "" && !isNaN(input.value) && input.value > 0){
      
      // 2. Add the item to the budget controller 
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item
      uictrl.addListItem(newItem, input.type);

      // 4. clear fields 
      uictrl.clearFields();

      // 5. Calculate and update budget 
      updateBudget();
    }
  }


  return{
    init: function(){
      console.log('Application has started');
      uictrl.changeBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  }


})(budgetController, UIcontroller);

controller.init();