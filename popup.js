document.addEventListener('DOMContentLoaded', function() {
	
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    var canvasElement = document.getElementById("displayArea");
var displayArea = canvasElement.getContext("2d");

var controller = new Leap.Controller();
controller.on("frame", function(frame){
    if(frame.pointables.length > 0)
    {
        canvasElement.width = canvasElement.width; //clear
        
        //Get a pointable and normalize the tip position
        var pointable = frame.pointables[0];
        var interactionBox = frame.interactionBox;
        var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
        
        // Convert the normalized coordinates to span the canvas
        var canvasX = canvasElement.width * normalizedPosition[0];
        var canvasY = canvasElement.height * (1 - normalizedPosition[1]);
        //we can ignore z for a 2D context
        
        displayArea.strokeText("(" + canvasX.toFixed(1) + ", " + canvasY.toFixed(1) + ")", canvasX, canvasY);
    }
});
controller.connect();


  }, false);
}, false);