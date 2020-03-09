function createButton(parentId, label, handler) {
	var parent = document.getElementById(parentId);
	if (parent) {
		var button = document.createElement("input");
		button.type = "button";
		button.value = label;
		button.onclick = handler;
		button.style.marginLeft = button.style.margin = "3px";
		parent.appendChild(button);
		return button;
	}
	return null;
}

function createButtons(parentId, actions) {
	for (var action in actions) {
		createButton(parentId, action, actions[action]);
	}
}

function createCheckBox(parentId, label, handler, checked) {
	var parent = document.getElementById(parentId);
	if (parent) {
		var button = document.createElement("input");
		button.id = "$_checkbox_" + label;
		button.type = "checkbox";
		button.value = label;
		button.checked = checked;
		button.onclick = handler;
		button.style.marginLeft = "10px";
		button.style.margin = "3px";
		parent.appendChild(button);

		var lab = document.createElement("label");
		lab.htmlFor = button.id;
		lab.textContent = label;
		lab.style.fontSize = "12px";
		parent.appendChild(lab);
		
		return button;
	}
	return null;
}

function createListBox(parentId, label, items, handler, selectedItem) {
    var parent = document.getElementById(parentId);
    if (parent) {
        var lab = document.createElement("label");
        lab.textContent = label;
        lab.style.marginLeft = "10px";
		lab.style.fontSize = "12px";
        lab.style.textDecoration = "underline";
        parent.appendChild(lab);

        var list = document.createElement("select");
        list.id = "_listbox_" + label;
        list.style.marginLeft = "3px";
        list.onchange = handler;
        parent.appendChild(list);

        if (items) {
            for (var i = 0; i < items.length; i++) {
                var opt = document.createElement("option");
                opt.value = items[i];
                opt.text = items[i];
                if (opt.value == selectedItem) {
                    opt.selected = true;
                }
                list.add(opt, null);
            }
        }

        lab.htmlFor = list.id;
    }
    return null;
}

function createRadioGroup(parentId, label, values, labels, handler) {
	var parent = document.getElementById(parentId);
	if (parent) {
		var div = document.createElement("div");
		div.style.display = "inline-block";
        div.style.margineRight = "5px";
		parent.appendChild(div);

		var lab = document.createElement("span");
		lab.textContent = label;
		div.appendChild(lab);
		
		if (values) {
			for (var i = 0; i < values.length; i++) {
				var val = values[i];
				var txt = labels && labels.length >= values.length ? labels[i] : val;
				var button = document.createElement("input");
				button.type = "radio";
				button.name = "$_raido_" + label;
				button.value = val;
				button.onclick = handler;
				button.style.marginLeft = "3px";
				div.appendChild(button);

				var lab = document.createElement("label");
				lab.htmlFor = button.id;
				lab.textContent = txt;
				div.appendChild(lab);
			}
		}
		
		return div;
	}
	return null;
}

function createTextbox(parentId, value, width) {
	var parent = document.getElementById(parentId);
	if (parent) {
		var text = document.createElement("input");
		text.type = "text";
		text.value = value;
		text.style.marginLeft = text.style.margin = "3px";
		text.style.width = width + "px";
		parent.appendChild(text);
		return text;
	}
	return null;
}

function createBreakLine(parentId) {
    var parent = document.getElementById(parentId);
    if (parent) {
        var br = document.createElement("br");
        parent.appendChild(br);
    }
}

var _getChecked = function (e) {
	var elt = typeof e == "string" ? $("#" + "_checkbox_" + e)[0] : e.target;
	return elt ? elt.checked : false;
};

var _getSelected = function (e, def) {
	var elt = typeof e == "string" ? $("#" + "_listbox_" + e)[0] : e.target;
	if (elt) {
		var idx = elt.selectedIndex;
		return idx !== undefined ? elt[idx].value : def;
	}
	return def;
};

var _setSelected = function (list, value) {
	var elt = $("#" + "_listbox_" + list)[0];
	if (elt) {
		for (var i = 0, cnt = elt.childElementCount; i < cnt; i++) {
			if (elt[i].label == value) {
				elt.selectedIndex = i;
				break;
			}
		}
	}
};

var _setListItems = function (list, items) {
	var elt = $("#" + "_listbox_" + list)[0];
	if (elt) {
		for (var i = 0; i < items.length; i++) {
			var opt = document.createElement("option");
			opt.value = items[i];
			opt.text = items[i];
			elt.add(opt, null);
		}
	}
};

function loadScript(parentId, script, callback) {
	var parent = document.getElementById(parentId);
	if (parent) {
		var elt = document.createElement("script");
		elt.type = "text/javascript";
		elt.src = script;
		elt.onreadystatechange = function() {
			if (this.readyState == 'complete') {
				callback.call(window);
			}
		};
		elt.onload = function () {
			//callback.call(window);
		};
		parent.appendChild(elt);
	}
}