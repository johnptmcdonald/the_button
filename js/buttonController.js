angular
    .module('buttonApp')
    .controller('ButtonController', ButtonController);

    // 3 - inject either $firebaseObject or Firebase Array into our controller:
    ButtonController.$inject = ['$firebaseObject'];

    // 4 - add it to our function so we can use it!
    function ButtonController($firebaseObject){
        var self = this;
        // 6 - then we attach this getButton() function to self.button, so everytime we refer to self.button, it is referring to the firebase object.
        self.button = getButton();
        self.clickMe = clickMe;


        // 5 - instead of hardcoding the button object, we write a function that goes to firebase and gets the button object for us:

        function getButton(){
            // this goes to firebase and gets the firebase object, then returns it to us
            var ref = new Firebase("https://color-button.firebaseio.com/");
            var button = $firebaseObject(ref);
            return button
        }

        function clickMe(){
            if(self.button.color === 'red'){
                self.button.color = 'green';
                // 7 - Whenever we change the object in any way, we MUST save it if we want it to change on firebase. 
                self.button.$save();
            } else {
                self.button.color = 'red';
                self.button.$save();
            }
        }

    }