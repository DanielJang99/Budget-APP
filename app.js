

//BUDGET CONTROLLER 
var budgetController = (function(){

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  Expense.prototype.calcPercentage = function(totalIncome){

    if (totalIncome > 0){
      this.percentage = Math.round((this.value/totalIncome)*100);
    }
    else{
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function(){
    return this.percentage;
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

    deleteItem: function(type, id){

      var ids, index;
      //get the id of the item to delete
      ids = data.allItems[type].map(function(current){
        return current.id;
      });
      //get the index
      index = ids.indexOf(id);

      if (index !== -1){
        data.allItems[type].splice(index, 1);  //splice removes element from array
      }
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

    calculatePercentages: function(){
      data.allItems.exp.forEach(function(cur){
        cur.calcPercentage(data.totals.inc);    
      })
    },

    getPercentages: function(){
      var allPerc = data.allItems.exp.map(function(cur){
        return cur.getPercentage();
      })
      return allPerc;
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
    budgetExpensePercentage:'.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  var formatNumber = function(num, type){
    var numSplit, int, dec, type;
    // + or - sign 
    // round numbers to exactly 2 decimals 
    // comma separating thousands 

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.')
    int = numSplit[0];
    dec = numSplit[1];

    if (int.length > 3){
      int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3, 3);
    }

    type === 'exp' ? sign = '-' : sign = '+';

    return sign + ' ' + int + '.' + dec;

  };

  var nodeListforEach = function(list, callback){
    for (var i = 0; i < list.length; i++){
      callback(list[i],i)
    }
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
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      
      if (type === 'exp'){
        element = DOMstrings.expensesContainer; 
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      //replace placeholder tag with actual data 
      newHtml = html.replace('%id%',obj.id);
      newHtml = newHtml.replace('%description%',obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      // insert HTML into DOM 
      document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
    },

    deleteListItem: function(selectorID){

      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
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

    displayPercentages: function(percentages){

      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      nodeListforEach(fields,function(current, index){

        if (percentages[index] > 0){
          current.textContent = percentages[index] + '%';
        }else {
          current.textContent = '---';
        }

      });

    },

    changeBudget: function(obj){  
      var type;

      if (obj.budget > 0){
        type = 'inc'
        document.querySelector(DOMstrings.budgetValue).innerHTML = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.budgetIncome).innerHTML = formatNumber(obj.totalInc,type);
        document.querySelector(DOMstrings.budgetIncome).innerHTML = formatNumber(obj.totalInc, type);
        document.querySelector(DOMstrings.budgetExpense).innerHTML = formatNumber(obj.totalExp,type);
      }
      else if (obj.budget < 0){
        type = 'exp'
        document.querySelector(DOMstrings.budgetValue).innerHTML = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.budgetIncome).innerHTML = formatNumber(obj.totalInc, type);
        document.querySelector(DOMstrings.budgetExpense).innerHTML = formatNumber(obj.totalExp,type);
      }
      else{ 
        document.querySelector(DOMstrings.budgetValue).innerHTML = '0';
      }

      if (obj.percentage > 0){
        document.querySelector(DOMstrings.budgetExpensePercentage).innerHTML = obj.percentage + '%';
      }else {
        document.querySelector(DOMstrings.budgetExpensePercentage).innerHTML = '---';
      }
    },

    displayMonth: function(){
      var now, year, month
      var now = new Date();

      year = now.getFullYear();
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      month = now.getMonth();
      document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },

    changeType: function(){
      var fields = document.querySelectorAll(
        DOMstrings.inputType + ',' + 
        DOMstrings.inputDescription + ',' + 
        DOMstrings.inputValue);
      
      nodeListforEach(fields,function(cur){
        // from css
        cur.classList.toggle('red-focus'); 
      })

      document.querySelector(DOMstrings.inputButton).classList.toggle('red');

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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change',uictrl.changeType)
  }

  var updateBudget = function(){

    // 1. calculate the budget 
    budgetCtrl.calculateBudget();
    // 2. return the budget 
    var budget = budgetCtrl.getBudget();
    // 3. display the budget on UI
    uictrl.changeBudget(budget);
  }

  var updatePercentages = function(){

    //1. Calculate Percentage
    budgetCtrl.calculatePercentages();
    //2. Read percentages from budget controller
    var percentages = budgetCtrl.getPercentages();
    //3. display new percentages on UI
    uictrl.displayPercentages(percentages);
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

      // 6. Calculate and update percentages 
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event){
    var itemID, splitID, type, ID;
    itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);

    if (itemID){
      splitID = itemID.split('-');  // split returns array 
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //1. delete item from data structure 
     budgetCtrl.deleteItem(type, ID);

      // 2. delete from UI
      uictrl.deleteListItem(itemID, ID);

      // 3. update and display new budget 
      updateBudget();
    }
  };


  return{
    init: function(){
      console.log('Application has started');
      uictrl.displayMonth();
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