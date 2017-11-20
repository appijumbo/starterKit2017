 "use strict";

/*

+++++++++++++++++++++++++++++++  A reminder    ++++++++++++++++++++++++++++++
https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

https://www.youtube.com/watch?v=HkFlM73G-hk&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f

https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.9m56p6ka9

https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.8iiju9bue

https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know

https://www.sitepoint.com/javascript-design-patterns-singleton/

http://blog.mediumequalsmessage.com/promise-deferred-objects-in-javascript-pt2-practical-use


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

+ Self contained modules
    everything to do with a module is in my module
    no global variables
    if a module manages more than one thing it should be split up

+ Seperation of concerns

+ DRY code: don't repeat yourself

+ efficient DOM usage   cache the DOM & (jquery: find, closest, show, hide, on, off, remove, e.target)

+ very few $(selections)

+ no memory leaks
    all events can be unbounded

+ Try to avoid putting HTML in the JS
(use templates with say mustache.js    http://mustache.github.io  )

+ AJAX  
    Cache the Ajax when possible  i.e.  var cache={}.... > if(!cache[term]){....}...>  (see deferred)
    Use .always for stopping 'spinners' or other animations after download for instance

+ jQuery Deferred and Promise's

        name your promises  e.g.  var step2 = step1.then()
        
        separate handler functions from the promise logic by calling a named function from .then() and separate functionality into reusable bits
                var someReusableFunctionality = function () {
                // do something
                };
                step2.then(someReusableFunctionality);
    
        when it’s logical, return a promise instead of a deferred so that nobody else can inadvertantly resolve/reject the promise
    
        step2.then(function() {
            // we don't want to give resolution / rejection powers 
            // to the wrong parties, so we just return the promise.
            return deferred.promise();
            });
    
        don’t descend into nested callback hell or nested promise hell


        Reminder:
        deferred.always(), deferred.done(), deferred.fail() return the deferred object
        
        deferred.then(), deferred.when(), .promise() return a promise
        
        $.ajax() and $.get() return promise objects
        
        instead of using .resolveWith() and .rejectWith(), you can call resolve with the context you want it to inherit
        
        pass the deferred.promise() around instead of the deferred itself as the deferred object itself cannot be resolved or rejected through it.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


ES5 --  Module Pattern using object literal , all public  -- ES5


(function(){

var theObject ={

    property1: xx,

    property 2: xx,

    ...

    // the initialise function so can say  theObject.init()  to get going
    init: function(){
                        this.cacheDom();
                        this.render();
                    },

    //cache the DOM
    cacheDom: function(){
                            this.$AA = $('#onlyOneHtmlId');
                            this.$button = this.$AA.find('button');
                            ....etc...
                            this.template ...
                        },


    // bind events like 'click'
    bindEvents: function(){

                            this.$button.on('click', this.doThisFunction.bind(this));

                            The simplest use of bind() is to make a function that, no matter how it is called, is called with a particular this value. A common mistake for new JavaScript programmers is to extract a method from an object, then to later call that function and expect it to use the original object as its this (e.g. by using that method in callback-based code). Without special care however, the original object is usually lost. Creating a bound function from the function, using the original object, neatly solves this problem
                            https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind


                            An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up one level (from the clicked tr to tbody)

                            this.$ul.on( "click", "i.del", this.weMightDeletebind(this));
                            },

    // doThisFunction: function(){
    
                            this.theObject.push(this.$input.val());
                            this.render();
                            },

    // weMightDelete: function(eventjQuery) {
                            var $remoeve = $(event.target).closest('li');
                            var i = this.find('li').index($remove);

                            this.theObject.splice(i,1);
                            this.render();

                            },

    // print to the screen       if using mustache templates    Mustache.render("hello {{name}}", {name: 'Tom'});
    render: function(){
                        var data = {
                            property1: this.property1,
                        };
                        this.$ul.html(Mustache.render(this.template,data));
                    },


    theObject.init();
}

})();


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ES5 --  Alternative Module Pattern with Private and Public and localy aliased JQuery and underscore.js  -- ES5

var myModule = (function(jQ,_){

    // Private Methods
    function _privateMethod1(){

        jQ.(".container").html("test");

    }

    function _privateMethod2(){
        console.log(_.min([10,5,100,2,1000]));
    }


    // Public Methods

    return{

            publicMethod1: function(){
                _privateMethod1();
            }

            publicMethod2: function(){
                console.log("Hello World");
            }

        }

    };


})(jQuery, _);   // pull in jQuery and underscorejs

myModule.publicMethod();


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
