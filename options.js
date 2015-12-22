var defaultDigit = 0;

function loadOptions() {
	chrome.storage.local.get('pin', function(items)
	{
		pin = items.pin;
		var form = document.getElementById("form");
		for (var i = 0; i < form.children.length; i++)
		{
			var child = form.children[i];
			child.value = pin[i];
		}
	});	
}

function clearOptions() {
	var form = document.getElementById("form");
	for (var i = 0; i < form.children.length; i++) {
		var child = form.children[i];
			child.value = "";
		}
	form.children[0].focus();
}

function saveOptions() {
	var pin = [];
	var form = document.getElementById("form");
	console.log(form);
	console.log(form.children);
	for (var i = 0; i < form.children.length; i++) {
		var child = form.children[i];
			pin[i] = child.value;
			console.log(child.value);
		}
	
	chrome.storage.local.set({'pin': pin}, function() { 
		console.log("Saved");}
		);

}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('clear').addEventListener('click', clearOptions);

$('input').on('keyup', function(){
    if (this.value.match(/\d+/)) {
        var $this = $(this);
        if ($this.next('input').length) {
          $this.next().focus();
		  $this.next().select();
        }
    }
})
