/*var lastId = 0;
var containerId = "";
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    containerId = ev.target.parentNode.id;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    if(ev.target.nodeName == "DIV") {
	    var data = ev.dataTransfer.getData("text");
	    jQuery(ev.target).parent().append(document.getElementById(data));
	    $(document.getElementById(data)).parent().find(':first-child').remove();
	    var itemTemplate = document.getElementById(data).outerHTML;
	    var newItem = itemTemplate.replace(data, data+lastId);
	    jQuery("#" + containerId).append(newItem);
	    lastId++;
    }
}*/
