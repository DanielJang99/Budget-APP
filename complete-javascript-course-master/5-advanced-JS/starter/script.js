// THIS IS CREATING AN OBJECT USING FUNCTION CONSTRUCTORS 
// var Person = function(name, yearOfBirth, job){
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// }

// Person.prototype.calculateAge = function(){
//   console.log(2020-this.yearOfBirth);
// }

// Person.prototype.lastName = 'Smith';

// var john = new Person('John', 1999,'student');
// var jane = new Person('Jane', 1970, 'designer');
// var mark = new Person('Mark', 1932, 'retired');

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// console.log(john.lastName);
// console.log(jane.lastName);
// console.log(mark.lastName);


// THIS IS CREATING AN OBJECT USING OBJECT.CREATE
// var personProto = {
//   calculateAge: function(){
//     console.log(2016 - this.yearofBirth);
//   }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearofBirth = 1999;
// john.job = 'student';

// var jane = Object.create(personProto,{
//   name: { value: 'Jane'},
//   yearofBirth: (value: 1969),
//   job: {value:'designer'}
// }); 


// primitives vs objects 

// var a = 23;
// var b = a;
// a = 45;
// console.log(a);
// console.log(b);

// var obj1 = {
//   name: 'John',
//   age: 26
// };

// var obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age);
// console.log(obj2.age);

// var age = 27;
// var obj = {
//   name: 'Daniel',
//   city: 'Seoul'
// }

// function change(a,b){
//   a = 30;
//   b.city = 'Busan'
// };

// change(age,obj);

// console.log(age);
// console.log(obj.city);



//passing functions as arguments - callback functions 

// var years = [1999, 1965, 1936, 2004, 1990];

// function arrayCalc(arr, fn){
//   var arrResult = [];
//   for (var i = 0; i < arr.length; i++){
//     arrResult.push(fn(arr[i]));
//   }
//   return arrResult;
// }

// function calcAge(el){
//   return 2016 - el;
// }

// function isFullAge(el){
//   return el >= 28;
// }

// function maxHeartRate(el){

//   if (el >= 18 && el <=81){
//     return Math.round(206.9 - (0.67*el));
//   }
//   else{
//     return -1;
//   }
// }

// var ages = arrayCalc(years,calcAge);
// console.log(ages);
// var fullAges = arrayCalc(ages,isFullAge);
// console.log(fullAges);
// var rates = arrayCalc(ages,maxHeartRate);
// console.log(rates);



//functions returning functions 

// function interviewQ(job){
//   if (job === 'designer'){
//     return function(name){
//       console.log(name + ', can you explain UX?');
//     }
//   }
//   else if (job === 'teacher'){
//     return function(name){
//       console.log('What subject do you teach, ' + name + ' ?');
//     }
//   }
//   else{
//     return function (name){
//       console.log('Hello, what do you do?');
//     }
//   }
// }

// var teacherQuestion = interviewQ('teacher');

// teacherQuestion('John');

// interviewQ('designer')('Daniel');




// Immediately Invoked Function Expression 

// function game(){
//   var score = Math.random() * 10;
//   console.log(score >=5);
// }
// game();


// (function(goodLuck){
//   var score = Math.random() * 10;
//   console.log(score >=5 - goodLuck);
// })(5);




// Cloures - inner function having access to variable/parameters of parent function

// function retirement(retirementAge){
//   var a = ' years left until retirement.';
//   return function(yearofBirth){
//     var age = 2018 - yearofBirth;
//     console.log((retirementAge - age) + a);
//   }
// }

// var retirementUS = retirement(66);
// retirement(1990);
// var retirementKorea = retirement(63);
// var retirementGermany = retirement(67);

// retirementGermany(1990);
// retirementKorea(1990);
// retirementUS(1990);




// Bind, Call, Apply 

// var john = {
//   name: 'John',
//   age: 26,
//   job: 'teacher', 
//   presentation: function(style, timeofDay){
//     if (style === 'formal'){
//       console.log('Good ' + timeofDay + ', Ladies and Gents. I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
//     }
//     else if (style === 'friendly'){
//       console.log('Hey What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. It is currently ' + timeofDay);
//     }
//   }
// }
// john.presentation('formal', 'morning');


// var emily = {
//   name: 'Emily',
//   age: 35,
//   job: 'designer'
// };

// john.presentation.call(emily, 'friendly', 'evening');

// john.presentation.apply(emily, ['formal', 'afternoon']); 
// this would not work as the function is not expecting an array

// var johnFriendly = john.presentation.bind(john, 'friendly');
// johnFriendly('morning');
// emilyFormal = john.presentation.bind(emily, 'formal');
// emilyFormal('afternoon');



/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/



(function(){

  var Question = function(q, choices, answer){
    this.q = q;
    this.choices = choices;
    this.answer = answer;
  }
  
  var questions = []; 
  var Q1 = new Question("Is JS the coolest language in the world?", ["0. Yes", "1. No"], 0);
  questions.push(Q1);
  var Q2 = new Question("What is my name?", ["0. James", "1. David", "2. Daniel"], 2);
  questions.push(Q2);
  var Q3 = new Question("Which word best describes coding?", ["0.Not Fun", "1.Fun"], 1);
  questions.push(Q3);

  var scoreboard = 0;
  
  Question.prototype.qdisplay = function(){
    console.log("Score: "+scoreboard);
    console.log(this.q);
    for (var i = 0; i < this.choices.length; i++){
      console.log(this.choices[i])
    }
    var response = prompt("Please select the right choice");
    if (response == this.answer){
      console.log("Congrats!!");
      scoreboard++;
      var num = Math.floor(Math.random()*questions.length);
      questions[num].qdisplay();
    }
    else if (response == "exit"){
      return;
    }
    else{
      console.log("Wrong answer");
      var num = Math.floor(Math.random()*questions.length);
      questions[num].qdisplay();
    }
  }

  var num = Math.floor(Math.random()*questions.length);
  questions[num].qdisplay();

})();

