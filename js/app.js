'use strict';

var app = angular.module('SecretSantaNameDrawingApp', []);

app.controller('SecretSantaNameDrawingController', ['$scope', '$timeout' , function($scope , $timeout) {
  // begin

$scope.currentlyViewing ='inputPage';
$scope.commaSeparatedListOfNames ='Vlad Anton,  Alexandru Birlica , Silvia Brindusescu,  Valentin Buzea, Nicu Damian , Daniel Dragomir, Marius Ionescu, Daniel Iordache, Radu Jinga, Marius Macovei, Theodor Macovei, Sabina Mihaila, Mihai Mina , Florin Nastase, Razvan Nitu, Vlad Pelin, Ioana Popescu , Robert Radu, Teodora Simion, Paul Stoian, Stefan Valvoiu';
$scope.personWhoseNameWasLastClicked='';
function generateSecretSantaHash(commaSeparatedListOfNames) {
    var resultOfSplittingByComma = commaSeparatedListOfNames.split(',');
    function trimAsFirstClassFunction(element) {
      return element.trim();
    }
    var resultOfTrimmingWhitespace = resultOfSplittingByComma.map(trimAsFirstClassFunction);
    var santas = _.shuffle(resultOfTrimmingWhitespace);
    var giftRecipients = _.clone(santas);
    var rightmostElement = santas.pop();
    var leftmostElement = giftRecipients.shift();
    var resultOfZip = _.zip(santas, giftRecipients);
    function absorbTupleIntoHash (hash, tuple) {
      hash[tuple[0]] = tuple[1];
      return hash;
    }
    var initialSecretSantaHash = {};
    initialSecretSantaHash[rightmostElement] = leftmostElement;
    var secretSantaHash = _.reduce(resultOfZip, absorbTupleIntoHash, initialSecretSantaHash);
    return secretSantaHash;
  }

function drawNames(names){
$scope.secretSantaHash=generateSecretSantaHash(names);
$scope.currentlyViewing='outputPage';
}

function setPersonTo(person)
{$scope.personWhoseNameWasLastClicked = person ;
$timeout(resetPerson,500);
}
function resetPerson()
{$scope.personWhoseNameWasLastClicked ="";
}

$scope.drawNames=drawNames;
$scope.setPersonTo=setPersonTo;
  // end

  window.sc = $scope;

}]);

// 'Alice, Andy, Ashley, Betty, Billy, Bobby, Bradley, Chris, Craig, Dorothy, Emily, Gregory, Jack, Jason, Jennifer, Jessica, Linda, Maggie, Ryan, Tony'

/*
  function generateSecretSantaHash(commaSeparatedListOfNames) {
    var resultOfSplittingByComma = commaSeparatedListOfNames.split(',');
    function trimAsFirstClassFunction(element) {
      return element.trim();
    }
    var resultOfTrimmingWhitespace = resultOfSplittingByComma.map(trimAsFirstClassFunction);
    var santas = _.shuffle(resultOfTrimmingWhitespace);
    var giftRecipients = _.clone(santas);
    var rightmostElement = santas.pop();
    var leftmostElement = giftRecipients.shift();
    var resultOfZip = _.zip(santas, giftRecipients);
    function absorbTupleIntoHash (hash, tuple) {
      hash[tuple[0]] = tuple[1];
      return hash;
    }
    var initialSecretSantaHash = {};
    initialSecretSantaHash[rightmostElement] = leftmostElement;
    var secretSantaHash = _.reduce(resultOfZip, absorbTupleIntoHash, initialSecretSantaHash);
    return secretSantaHash;
  }
*/

