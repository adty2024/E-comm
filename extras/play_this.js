class Shape{
    fun(){
        console.log(this + " " + "2");
        const person = {
            firstName: 'John',
            lastName: 'Doe',
            currentAge: 28,
            greet: function() {
                console.log(this + " " + this.firstName);
            },
            temp: this
        };
        console.log(person.temp.names + " 3");
        person.greet();
    }

    constructor(){
        this.names = [1, 2, 3];
        console.log(this.names + " " + "1");
        this.fun();
    }
}

let circle = new Shape();

/*
Global Context
In the global scope (outside of any function), this refers to the global object, which is window in a browser environment or global in a Node.js environment.
Function Context:

Within a function, what this refers to can vary:
In a regular function (not a method of an object), this typically refers to the global object (e.g., window in a browser).
In an arrow function, this retains the value of the enclosing lexical context, which means it depends on where the arrow function is defined.

Method Context:
When a function is called as a method of an object, this refers to the object that owns the method.

Constructor Context:
When a function is used as a constructor to create objects using the new keyword, this refers to the newly created object.

Event Handlers:
In event handlers, like those used with DOM elements, this often refers to the element that triggered the event.

Explicitly Set this:
You can explicitly set the value of this using methods like call(), apply(), or bind().
*/