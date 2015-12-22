var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (!mutation.addedNodes) return

    for (var i = 0; i < mutation.addedNodes.length; i++) {
      // do things to your newly added nodes here
      var node = mutation.addedNodes[i]
	  if(node.className == "pinWrapper")
	  {
		  // Found the popup
		  observer.disconnect();
		  enterPin();
		  return;
	  }
    }
  })
});

observer.observe(document.body, {
    childList: true
  , subtree: true
  , attributes: false
  , characterData: false
});


function enterPin() {
	// Get the saved PIN from the local storage
	chrome.storage.local.get('pin', function(items)
	{
		pin = items.pin;
		console.log(pin);
		var keyVals = [];
		for(i = 0; i < 4; i++)
		{
			keyVals[i] = 48 + parseInt(pin[i]); // 48 --> Keycode 0;
		}
		// Execute the jquery key event trigger in the web page context
		exec(trigger, keyVals);
	});
};

trigger = function(keyVals) {
	console.debug("Triggering...");
	var pins = $('.pinWrapper > .table > .tableCell > .modal > .description > .pinFields > .pinField');
	pins[0].focus();
	console.log(keyVals);
	for(i = 0; i < 4; i++)
	{
		$(pins[i]).trigger ( {
			type: 'keydown', keyCode: keyVals[i], which: keyVals[i], charCode: keyVals[i]
		} );
	}
	$(pins[3]).trigger ( {
			type: 'keyup', keyCode: keyVals[3], which: keyVals[3], charCode: keyVals[3]
		} );
}

// Executing an anonymous script
function exec(fn, opts)
{
	var args = '';
    if (arguments.length > 1) {
        for (var i = 1, end = arguments.length - 2; i <= end; i++) {
            args += typeof arguments[i]=='function' ? arguments[i] : JSON.stringify(arguments[i]) + ', ';
        }
        args += typeof arguments[i]=='function' ? arguments[arguments.length - 1] : JSON.stringify(arguments[arguments.length - 1]);
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')(' + args + ');';
	(document.head || document.documentElement).appendChild(script)); // run the script
    (document.head || document.documentElement).removeChild(script); // clean up
}
