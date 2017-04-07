/*!
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){

var 
	// Will speed up references to window, and allows munging its name.
	window = this,
	// Will speed up references to undefined, and allows munging its name.
	undefined,
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,
	// Map over the $ in case of overwrite
	_$ = window.$,

	jQuery = window.jQuery = window.$ = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		// Make sure that a selection was provided
		selector = selector || document;

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this[0] = selector;
			this.length = 1;
			this.context = selector;
			return this;
		}
		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			var match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] )
					selector = jQuery.clean( [ match[1] ], context );

				// HANDLE: $("#id")
				else {
					var elem = document.getElementById( match[3] );

					// Handle the case where IE and Opera return items
					// by name instead of ID
					if ( elem && elem.id != match[3] )
						return jQuery().find( selector );

					// Otherwise, we inject the element directly into the jQuery object
					var ret = jQuery( elem || [] );
					ret.context = document;
					ret.selector = selector;
					return ret;
				}

			// HANDLE: $(expr, [context])
			// (which is just equivalent to: $(content).find(expr)
			} else
				return jQuery( context ).find( selector );

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) )
			return jQuery( document ).ready( selector );

		// Make sure that old selector state is passed along
		if ( selector.selector && selector.context ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return this.setArray(jQuery.isArray( selector ) ?
			selector :
			jQuery.makeArray(selector));
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.3.2",

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num === undefined ?

			// Return a 'clean' array
			Array.prototype.slice.call( this ) :

			// Return just the object
			this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery( elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" )
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		else if ( name )
			ret.selector = this.selector + "." + name + "(" + selector + ")";

		// Return the newly-formed element set
		return ret;
	},

	// Force the current matched set of elements to become
	// the specified array of elements (destroying the stack in the process)
	// You should use pushStack() in order to do this, but maintain the stack
	setArray: function( elems ) {
		// Resetting the length to 0, then using the native Array push
		// is a super-fast way to populate an object with array-like properties
		this.length = 0;
		Array.prototype.push.apply( this, elems );

		return this;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem && elem.jquery ? elem[0] : elem
		, this );
	},

	attr: function( name, value, type ) {
		var options = name;

		// Look for the case where we're accessing a style value
		if ( typeof name === "string" )
			if ( value === undefined )
				return this[0] && jQuery[ type || "attr" ]( this[0], name );

			else {
				options = {};
				options[ name ] = value;
			}

		// Check to see if we're setting style values
		return this.each(function(i){
			// Set all the styles
			for ( name in options )
				jQuery.attr(
					type ?
						this.style :
						this,
					name, jQuery.prop( this, options[ name ], type, i, name )
				);
		});
	},

	css: function( key, value ) {
		// ignore negative width and height values
		if ( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
			value = undefined;
		return this.attr( key, value, "curCSS" );
	},

	text: function( text ) {
		if ( typeof text !== "object" && text != null )
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );

		var ret = "";

		jQuery.each( text || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					ret += this.nodeType != 1 ?
						this.nodeValue :
						jQuery.fn.text( [ this ] );
			});
		});

		return ret;
	},

	wrapAll: function( html ) {
		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).clone();

			if ( this[0].parentNode )
				wrap.insertBefore( this[0] );

			wrap.map(function(){
				var elem = this;

				while ( elem.firstChild )
					elem = elem.firstChild;

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		return this.each(function(){
			jQuery( this ).contents().wrapAll( html );
		});
	},

	wrap: function( html ) {
		return this.each(function(){
			jQuery( this ).wrapAll( html );
		});
	},

	append: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.appendChild( elem );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.insertBefore( elem, this.firstChild );
		});
	},

	before: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	end: function() {
		return this.prevObject || jQuery( [] );
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: [].push,
	sort: [].sort,
	splice: [].splice,

	find: function( selector ) {
		if ( this.length === 1 ) {
			var ret = this.pushStack( [], "find", selector );
			ret.length = 0;
			jQuery.find( selector, this[0], ret );
			return ret;
		} else {
			return this.pushStack( jQuery.unique(jQuery.map(this, function(elem){
				return jQuery.find( selector, elem );
			})), "find", selector );
		}
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML;
				if ( !html ) {
					var div = this.ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0];
			} else
				return this.cloneNode(true);
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			var orig = this.find("*").andSelf(), i = 0;

			ret.find("*").andSelf().each(function(){
				if ( this.nodeName !== orig[i].nodeName )
					return;

				var events = jQuery.data( orig[i], "events" );

				for ( var type in events ) {
					for ( var handler in events[ type ] ) {
						jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
					}
				}

				i++;
			});
		}

		// Return the cloned set
		return ret;
	},

	filter: function( selector ) {
		return this.pushStack(
			jQuery.isFunction( selector ) &&
			jQuery.grep(this, function(elem, i){
				return selector.call( elem, i );
			}) ||

			jQuery.multiFilter( selector, jQuery.grep(this, function(elem){
				return elem.nodeType === 1;
			}) ), "filter", selector );
	},

	closest: function( selector ) {
		var pos = jQuery.expr.match.POS.test( selector ) ? jQuery(selector) : null,
			closer = 0;

		return this.map(function(){
			var cur = this;
			while ( cur && cur.ownerDocument ) {
				if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selector) ) {
					jQuery.data(cur, "closest", closer);
					return cur;
				}
				cur = cur.parentNode;
				closer++;
			}
		});
	},

	not: function( selector ) {
		if ( typeof selector === "string" )
			// test special case where just one selector is passed in
			if ( isSimple.test( selector ) )
				return this.pushStack( jQuery.multiFilter( selector, this, true ), "not", selector );
			else
				selector = jQuery.multiFilter( selector, this );

		var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
		return this.filter(function() {
			return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
		});
	},

	add: function( selector ) {
		return this.pushStack( jQuery.unique( jQuery.merge(
			this.get(),
			typeof selector === "string" ?
				jQuery( selector ) :
				jQuery.makeArray( selector )
		)));
	},

	is: function( selector ) {
		return !!selector && jQuery.multiFilter( selector, this ).length > 0;
	},

	hasClass: function( selector ) {
		return !!selector && this.is( "." + selector );
	},

	val: function( value ) {
		if ( value === undefined ) {			
			var elem = this[0];

			if ( elem ) {
				if( jQuery.nodeName( elem, 'option' ) )
					return (elem.attributes.value || {}).specified ? elem.value : elem.text;
				
				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type == "select-one";

					// Nothing was selected
					if ( index < 0 )
						return null;

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one )
								return value;

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;				
				}

				// Everything else, we just grab the value
				return (elem.value || "").replace(/\r/g, "");

			}

			return undefined;
		}

		if ( typeof value === "number" )
			value += '';

		return this.each(function(){
			if ( this.nodeType != 1 )
				return;

			if ( jQuery.isArray(value) && /radio|checkbox/.test( this.type ) )
				this.checked = (jQuery.inArray(this.value, value) >= 0 ||
					jQuery.inArray(this.name, value) >= 0);

			else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(value);

				jQuery( "option", this ).each(function(){
					this.selected = (jQuery.inArray( this.value, values ) >= 0 ||
						jQuery.inArray( this.text, values ) >= 0);
				});

				if ( !values.length )
					this.selectedIndex = -1;

			} else
				this.value = value;
		});
	},

	html: function( value ) {
		return value === undefined ?
			(this[0] ?
				this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") :
				null) :
			this.empty().append( value );
	},

	replaceWith: function( value ) {
		return this.after( value ).remove();
	},

	eq: function( i ) {
		return this.slice( i, +i + 1 );
	},

	slice: function() {
		return this.pushStack( Array.prototype.slice.apply( this, arguments ),
			"slice", Array.prototype.slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function(elem, i){
			return callback.call( elem, i, elem );
		}));
	},

	andSelf: function() {
		return this.add( this.prevObject );
	},

	domManip: function( args, table, callback ) {
		if ( this[0] ) {
			var fragment = (this[0].ownerDocument || this[0]).createDocumentFragment(),
				scripts = jQuery.clean( args, (this[0].ownerDocument || this[0]), fragment ),
				first = fragment.firstChild;

			if ( first )
				for ( var i = 0, l = this.length; i < l; i++ )
					callback.call( root(this[i], first), this.length > 1 || i > 0 ?
							fragment.cloneNode(true) : fragment );
		
			if ( scripts )
				jQuery.each( scripts, evalScript );
		}

		return this;
		
		function root( elem, cur ) {
			return table && jQuery.nodeName(elem, "table") && jQuery.nodeName(cur, "tr") ?
				(elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
				elem;
		}
	}
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

function evalScript( i, elem ) {
	if ( elem.src )
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});

	else
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );

	if ( elem.parentNode )
		elem.parentNode.removeChild( elem );
}

function now(){
	return +new Date;
}

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) )
		target = {};

	// extend jQuery itself if only one argument is passed
	if ( length == i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var src = target[ name ], copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy )
					continue;

				// Recurse if we're merging object values
				if ( deep && copy && typeof copy === "object" && !copy.nodeType )
					target[ name ] = jQuery.extend( deep, 
						// Never move original objects, clone them
						src || ( copy.length != null ? [ ] : { } )
					, copy );

				// Don't bring in undefined values
				else if ( copy !== undefined )
					target[ name ] = copy;

			}

	// Return the modified object
	return target;
};

// exclude the following css properties to add px
var	exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	// cache defaultView
	defaultView = document.defaultView || {},
	toString = Object.prototype.toString;

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep )
			window.jQuery = _jQuery;

		return jQuery;
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

	isArray: function( obj ) {
		return toString.call(obj) === "[object Array]";
	},

	// check if an element is in a (or is an) XML document
	isXMLDoc: function( elem ) {
		return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
			!!elem.ownerDocument && jQuery.isXMLDoc( elem.ownerDocument );
	},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && /\S/.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";
			if ( jQuery.support.scriptEval )
				script.appendChild( document.createTextNode( data ) );
			else
				script.text = data;

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0, length = object.length;

		if ( args ) {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			} else
				for ( ; i < length; )
					if ( callback.apply( object[ i++ ], args ) === false )
						break;

		// A special, fast, case for the most common use of each
		} else {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.call( object[ name ], name, object[ name ] ) === false )
						break;
			} else
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},

	prop: function( elem, value, type, i, name ) {
		// Handle executable functions
		if ( jQuery.isFunction( value ) )
			value = value.call( elem, i );

		// Handle passing in a number to a CSS property
		return typeof value === "number" && type == "curCSS" && !exclude.test( name ) ?
			value + "px" :
			value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, classNames ) {
			jQuery.each((classNames || "").split(/\s+/), function(i, className){
				if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
					elem.className += (elem.className ? " " : "") + className;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, classNames ) {
			if (elem.nodeType == 1)
				elem.className = classNames !== undefined ?
					jQuery.grep(elem.className.split(/\s+/), function(className){
						return !jQuery.className.has( classNames, className );
					}).join(" ") :
					"";
		},

		// internal only, use hasClass("class")
		has: function( elem, className ) {
			return elem && jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};
		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( var name in options )
			elem.style[ name ] = old[ name ];
	},

	css: function( elem, name, force, extra ) {
		if ( name == "width" || name == "height" ) {
			var val, props = { position: "absolute", visibility: "hidden", display:"block" }, which = name == "width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ];

			function getWH() {
				val = name == "width" ? elem.offsetWidth : elem.offsetHeight;

				if ( extra === "border" )
					return;

				jQuery.each( which, function() {
					if ( !extra )
						val -= parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					if ( extra === "margin" )
						val += parseFloat(jQuery.curCSS( elem, "margin" + this, true)) || 0;
					else
						val -= parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
				});
			}

			if ( elem.offsetWidth !== 0 )
				getWH();
			else
				jQuery.swap( elem, props, getWH );

			return Math.max(0, Math.round(val));
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style;

		// We need to handle opacity special in IE
		if ( name == "opacity" && !jQuery.support.opacity ) {
			ret = jQuery.attr( style, "opacity" );

			return ret == "" ?
				"1" :
				ret;
		}

		// Make sure we're using the right name for getting the float value
		if ( name.match( /float/i ) )
			name = styleFloat;

		if ( !force && style && style[ name ] )
			ret = style[ name ];

		else if ( defaultView.getComputedStyle ) {

			// Only "float" is needed here
			if ( name.match( /float/i ) )
				name = "float";

			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle )
				ret = computedStyle.getPropertyValue( name );

			// We should always get a number back from opacity
			if ( name == "opacity" && ret == "" )
				ret = "1";

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
			});

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	clean: function( elems, context, fragment ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" )
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;

		// If a single string is passed in and it's a single tag
		// just do a createElement and skip the rest
		if ( !fragment && elems.length === 1 && typeof elems[0] === "string" ) {
			var match = /^<(\w+)\s*\/?>$/.exec(elems[0]);
			if ( match )
				return [ context.createElement( match[1] ) ];
		}

		var ret = [], scripts = [], div = context.createElement("div");

		jQuery.each(elems, function(i, elem){
			if ( typeof elem === "number" )
				elem += '';

			if ( !elem )
				return;

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
					return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
						all :
						front + "></" + tag + ">";
				});

				// Trim whitespace, otherwise indexOf won't work as expected
				var tags = elem.replace(/^\s+/, "").substring(0, 10).toLowerCase();

				var wrap =
					// option or optgroup
					!tags.indexOf("<opt") &&
					[ 1, "<select multiple='multiple'>", "</select>" ] ||

					!tags.indexOf("<leg") &&
					[ 1, "<fieldset>", "</fieldset>" ] ||

					tags.match(/^<(thead|tbody|tfoot|colg|cap)/) &&
					[ 1, "<table>", "</table>" ] ||

					!tags.indexOf("<tr") &&
					[ 2, "<table><tbody>", "</tbody></table>" ] ||

				 	// <thead> matched above
					(!tags.indexOf("<td") || !tags.indexOf("<th")) &&
					[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] ||

					!tags.indexOf("<col") &&
					[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ] ||

					// IE can't serialize <link> and <script> tags normally
					!jQuery.support.htmlSerialize &&
					[ 1, "div<div>", "</div>" ] ||

					[ 0, "", "" ];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( wrap[0]-- )
					div = div.lastChild;

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = /<tbody/i.test(elem),
						tbody = !tags.indexOf("<table") && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

						// String was a bare <thead> or <tfoot>
						wrap[1] == "<table>" && !hasBody ?
							div.childNodes :
							[];

					for ( var j = tbody.length - 1; j >= 0 ; --j )
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );

					}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && /^\s/.test( elem ) )
					div.insertBefore( context.createTextNode( elem.match(/^\s*/)[0] ), div.firstChild );
				
				elem = jQuery.makeArray( div.childNodes );
			}

			if ( elem.nodeType )
				ret.push( elem );
			else
				ret = jQuery.merge( ret, elem );

		});

		if ( fragment ) {
			for ( var i = 0; ret[i]; i++ ) {
				if ( jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				} else {
					if ( ret[i].nodeType === 1 )
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					fragment.appendChild( ret[i] );
				}
			}
			
			return scripts;
		}

		return ret;
	},

	attr: function( elem, name, value ) {
		// don't set attributes on text and comment nodes
		if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
			return undefined;

		var notxml = !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// Only do all the following if this is a node (faster for style)
		// IE elem.getAttribute passes even for style
		if ( elem.tagName ) {

			// These attributes require special treatment
			var special = /href|src|style/.test( name );

			// Safari mis-reports the default selected property of a hidden option
			// Accessing the parent's selectedIndex property fixes it
			if ( name == "selected" && elem.parentNode )
				elem.parentNode.selectedIndex;

			// If applicable, access the attribute via the DOM 0 way
			if ( name in elem && notxml && !special ) {
				if ( set ){
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name == "type" && jQuery.nodeName( elem, "input" ) && elem.parentNode )
						throw "type property can't be changed";

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) )
					return elem.getAttributeNode( name ).nodeValue;

				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				if ( name == "tabIndex" ) {
					var attributeNode = elem.getAttributeNode( "tabIndex" );
					return attributeNode && attributeNode.specified
						? attributeNode.value
						: elem.nodeName.match(/(button|input|object|select|textarea)/i)
							? 0
							: elem.nodeName.match(/^(a|area)$/i) && elem.href
								? 0
								: undefined;
				}

				return elem[ name ];
			}

			if ( !jQuery.support.style && notxml &&  name == "style" )
				return jQuery.attr( elem.style, "cssText", value );

			if ( set )
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );

			var attr = !jQuery.support.hrefNormalized && notxml && special
					// Some attributes require a special call on IE
					? elem.getAttribute( name, 2 )
					: elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}

		// elem is actually elem.style ... set the style

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name == "opacity" ) {
			if ( set ) {
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				elem.zoom = 1;

				// Set the alpha filter to set the opacity
				elem.filter = (elem.filter || "").replace( /alpha\([^)]*\)/, "" ) +
					(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
			}

			return elem.filter && elem.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
				"";
		}

		name = name.replace(/-([a-z])/ig, function(all, letter){
			return letter.toUpperCase();
		});

		if ( set )
			elem[ name ] = value;

		return elem[ name ];
	},

	trim: function( text ) {
		return (text || "").replace( /^\s+|\s+$/g, "" );
	},

	makeArray: function( array ) {
		var ret = [];

		if( array != null ){
			var i = array.length;
			// The window, strings (and functions) also have 'length'
			if( i == null || typeof array === "string" || jQuery.isFunction(array) || array.setInterval )
				ret[0] = array;
			else
				while( i )
					ret[--i] = array[i];
		}

		return ret;
	},

	inArray: function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
		// Use === because on IE, window == document
			if ( array[ i ] === elem )
				return i;

		return -1;
	},

	merge: function( first, second ) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		var i = 0, elem, pos = first.length;
		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if ( !jQuery.support.getAll ) {
			while ( (elem = second[ i++ ]) != null )
				if ( elem.nodeType != 8 )
					first[ pos++ ] = elem;

		} else
			while ( (elem = second[ i++ ]) != null )
				first[ pos++ ] = elem;

		return first;
	},

	unique: function( array ) {
		var ret = [], done = {};

		try {

			for ( var i = 0, length = array.length; i < length; i++ ) {
				var id = jQuery.data( array[ i ] );

				if ( !done[ id ] ) {
					done[ id ] = true;
					ret.push( array[ i ] );
				}
			}

		} catch( e ) {
			ret = array;
		}

		return ret;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ )
			if ( !inv != !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	map: function( elems, callback ) {
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if ( value != null )
				ret[ ret.length ] = value;
		}

		return ret.concat.apply( [], ret );
	}
});

// Use of jQuery.browser is deprecated.
// It's included for backwards compatibility and plugins,
// although they should work to migrate away.

var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

jQuery.each({
	parent: function(elem){return elem.parentNode;},
	parents: function(elem){return jQuery.dir(elem,"parentNode");},
	next: function(elem){return jQuery.nth(elem,2,"nextSibling");},
	prev: function(elem){return jQuery.nth(elem,2,"previousSibling");},
	nextAll: function(elem){return jQuery.dir(elem,"nextSibling");},
	prevAll: function(elem){return jQuery.dir(elem,"previousSibling");},
	siblings: function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},
	children: function(elem){return jQuery.sibling(elem.firstChild);},
	contents: function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}
}, function(name, fn){
	jQuery.fn[ name ] = function( selector ) {
		var ret = jQuery.map( this, fn );

		if ( selector && typeof selector == "string" )
			ret = jQuery.multiFilter( selector, ret );

		return this.pushStack( jQuery.unique( ret ), name, selector );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original){
	jQuery.fn[ name ] = function( selector ) {
		var ret = [], insert = jQuery( selector );

		for ( var i = 0, l = insert.length; i < l; i++ ) {
			var elems = (i > 0 ? this.clone(true) : this).get();
			jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
			ret = ret.concat( elems );
		}

		return this.pushStack( ret, name, selector );
	};
});

jQuery.each({
	removeAttr: function( name ) {
		jQuery.attr( this, name, "" );
		if (this.nodeType == 1)
			this.removeAttribute( name );
	},

	addClass: function( classNames ) {
		jQuery.className.add( this, classNames );
	},

	removeClass: function( classNames ) {
		jQuery.className.remove( this, classNames );
	},

	toggleClass: function( classNames, state ) {
		if( typeof state !== "boolean" )
			state = !jQuery.className.has( this, classNames );
		jQuery.className[ state ? "add" : "remove" ]( this, classNames );
	},

	remove: function( selector ) {
		if ( !selector || jQuery.filter( selector, [ this ] ).length ) {
			// Prevent memory leaks
			jQuery( "*", this ).add([this]).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			if (this.parentNode)
				this.parentNode.removeChild( this );
		}
	},

	empty: function() {
		// Remove element nodes and prevent memory leaks
		jQuery(this).children().remove();

		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(name, fn){
	jQuery.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

// Helper function used by the dimensions and offset modules
function num(elem, prop) {
	return elem[0] && parseInt( jQuery.curCSS(elem[0], prop, true), 10 ) || 0;
}
var expando = "jQuery" + now(), uuid = 0, windowData = {};

jQuery.extend({
	cache: {},

	data: function( elem, name, data ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// Compute a unique ID for the element
		if ( !id )
			id = elem[ expando ] = ++uuid;

		// Only generate the data cache if we're
		// trying to access or manipulate it
		if ( name && !jQuery.cache[ id ] )
			jQuery.cache[ id ] = {};

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined )
			jQuery.cache[ id ][ name ] = data;

		// Return the named cache data, or the ID for the element
		return name ?
			jQuery.cache[ id ][ name ] :
			id;
	},

	removeData: function( elem, name ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( jQuery.cache[ id ] ) {
				// Remove the section of cache data
				delete jQuery.cache[ id ][ name ];

				// If we've removed all the data, remove the element's cache
				name = "";

				for ( name in jQuery.cache[ id ] )
					break;

				if ( !name )
					jQuery.removeData( elem );
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			// Clean up the element expando
			try {
				delete elem[ expando ];
			} catch(e){
				// IE has trouble directly removing the expando
				// but it's ok with using removeAttribute
				if ( elem.removeAttribute )
					elem.removeAttribute( expando );
			}

			// Completely remove the data cache
			delete jQuery.cache[ id ];
		}
	},
	queue: function( elem, type, data ) {
		if ( elem ){
	
			type = (type || "fx") + "queue";
	
			var q = jQuery.data( elem, type );
	
			if ( !q || jQuery.isArray(data) )
				q = jQuery.data( elem, type, jQuery.makeArray(data) );
			else if( data )
				q.push( data );
	
		}
		return q;
	},

	dequeue: function( elem, type ){
		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();
		
		if( !type || type === "fx" )
			fn = queue[0];
			
		if( fn !== undefined )
			fn.call(elem);
	}
});

jQuery.fn.extend({
	data: function( key, value ){
		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length )
				data = jQuery.data( this[0], key );

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function(){
				jQuery.data( this, key, value );
			});
	},

	removeData: function( key ){
		return this.each(function(){
			jQuery.removeData( this, key );
		});
	},
	queue: function(type, data){
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined )
			return jQuery.queue( this[0], type );

		return this.each(function(){
			var queue = jQuery.queue( this, type, data );
			
			 if( type == "fx" && queue.length == 1 )
				queue[0].call(this);
		});
	},
	dequeue: function(type){
		return this.each(function(){
			jQuery.dequeue( this, type );
		});
	}
});/*!
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
	done = 0,
	toString = Object.prototype.toString;

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 )
		return [];
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true;
	
	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;
	
	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = RegExp.rightContext;
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		var ret = seed ?
			{ expr: parts.pop(), set: makeArray(seed) } :
			Sizzle.find( parts.pop(), parts.length === 1 && context.parentNode ? context.parentNode : context, isXML(context) );
		set = Sizzle.filter( ret.expr, ret.set );

		if ( parts.length > 0 ) {
			checkSet = makeArray(set);
		} else {
			prune = false;
		}

		while ( parts.length ) {
			var cur = parts.pop(), pop = cur;

			if ( !Expr.relative[ cur ] ) {
				cur = "";
			} else {
				pop = parts.pop();
			}

			if ( pop == null ) {
				pop = context;
			}

			Expr.relative[ cur ]( checkSet, pop, isXML(context) );
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, context, results, seed );

		if ( sortOrder ) {
			hasDuplicate = false;
			results.sort(sortOrder);

			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[i-1] ) {
						results.splice(i--, 1);
					}
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context, isXML){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( match[3].match(chunker).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while (node = node.previousSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while (node = node.nextSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value != check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
	Array.prototype.slice.call( document.documentElement.childNodes );

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.selectNode(a);
		aRange.collapse(true);
		bRange.selectNode(b);
		bRange.collapse(true);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("form"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<input name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( !!document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}
})();

if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle, div = document.createElement("div");
	div.innerHTML = "<p class='TEST'></p>";

	// Safari can't handle uppercase or unicode characters when
	// in quirks mode.
	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
		return;
	}
	
	Sizzle = function(query, context, extra, seed){
		context = context || document;

		// Only use querySelectorAll on non-XML documents
		// (ID selectors don't work in non-HTML documents)
		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
			try {
				return makeArray( context.querySelectorAll(query), extra );
			} catch(e){}
		}
		
		return oldSizzle(query, context, extra, seed);
	};

	Sizzle.find = oldSizzle.find;
	Sizzle.filter = oldSizzle.filter;
	Sizzle.selectors = oldSizzle.selectors;
	Sizzle.matches = oldSizzle.matches;
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	if ( div.getElementsByClassName("e").length === 0 )
		return;

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && isXML( elem.ownerDocument );
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.filter = Sizzle.filter;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;

Sizzle.selectors.filters.hidden = function(elem){
	return elem.offsetWidth === 0 || elem.offsetHeight === 0;
};

Sizzle.selectors.filters.visible = function(elem){
	return elem.offsetWidth > 0 || elem.offsetHeight > 0;
};

Sizzle.selectors.filters.animated = function(elem){
	return jQuery.grep(jQuery.timers, function(fn){
		return elem === fn.elem;
	}).length;
};

jQuery.multiFilter = function( expr, elems, not ) {
	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return Sizzle.matches(expr, elems);
};

jQuery.dir = function( elem, dir ){
	var matched = [], cur = elem[dir];
	while ( cur && cur != document ) {
		if ( cur.nodeType == 1 )
			matched.push( cur );
		cur = cur[dir];
	}
	return matched;
};

jQuery.nth = function(cur, result, dir, elem){
	result = result || 1;
	var num = 0;

	for ( ; cur; cur = cur[dir] )
		if ( cur.nodeType == 1 && ++num == result )
			break;

	return cur;
};

jQuery.sibling = function(n, elem){
	var r = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType == 1 && n != elem )
			r.push( n );
	}

	return r;
};

return;

window.Sizzle = Sizzle;

})();
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(elem, types, handler, data) {
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( elem.setInterval && elem != window )
			elem = window;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;

		// if data is passed, bind to handler
		if ( data !== undefined ) {
			// Create temporary function pointer to original handler
			var fn = handler;

			// Create unique handler function, wrapped around original handler
			handler = this.proxy( fn );

			// Store data in unique handler
			handler.data = data;
		}

		// Init the element's event structure
		var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
			handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function(){
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply(arguments.callee.elem, arguments) :
					undefined;
			});
		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native
		// event in IE.
		handle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		jQuery.each(types.split(/\s+/), function(index, type) {
			// Namespaced event handlers
			var namespaces = type.split(".");
			type = namespaces.shift();
			handler.type = namespaces.slice().sort().join(".");

			// Get the current list of functions bound to this event
			var handlers = events[type];
			
			if ( jQuery.event.specialAll[type] )
				jQuery.event.specialAll[type].setup.call(elem, data, namespaces);

			// Init the event handler queue
			if (!handlers) {
				handlers = events[type] = {};

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem, data, namespaces) === false ) {
					// Bind the global event handler to the element
					if (elem.addEventListener)
						elem.addEventListener(type, handle, false);
					else if (elem.attachEvent)
						elem.attachEvent("on" + type, handle);
				}
			}

			// Add the function to the element's handler list
			handlers[handler.guid] = handler;

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[type] = true;
		});

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(elem, types, handler) {
		// don't do events on text and comment nodes
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		var events = jQuery.data(elem, "events"), ret, index;

		if ( events ) {
			// Unbind all events for the element
			if ( types === undefined || (typeof types === "string" && types.charAt(0) == ".") )
				for ( var type in events )
					this.remove( elem, type + (types || "") );
			else {
				// types is actually an event object here
				if ( types.type ) {
					handler = types.handler;
					types = types.type;
				}

				// Handle multiple events seperated by a space
				// jQuery(...).unbind("mouseover mouseout", fn);
				jQuery.each(types.split(/\s+/), function(index, type){
					// Namespaced event handlers
					var namespaces = type.split(".");
					type = namespaces.shift();
					var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

					if ( events[type] ) {
						// remove the given handler for the given type
						if ( handler )
							delete events[type][handler.guid];

						// remove all handlers for the given type
						else
							for ( var handle in events[type] )
								// Handle the removal of namespaced events
								if ( namespace.test(events[type][handle].type) )
									delete events[type][handle];
									
						if ( jQuery.event.specialAll[type] )
							jQuery.event.specialAll[type].teardown.call(elem, namespaces);

						// remove generic event handler if no more handlers exist
						for ( ret in events[type] ) break;
						if ( !ret ) {
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem, namespaces) === false ) {
								if (elem.removeEventListener)
									elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
								else if (elem.detachEvent)
									elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
							}
							ret = null;
							delete events[type];
						}
					}
				});
			}

			// Remove the expando if it's no longer used
			for ( ret in events ) break;
			if ( !ret ) {
				var handle = jQuery.data( elem, "handle" );
				if ( handle ) handle.elem = null;
				jQuery.removeData( elem, "events" );
				jQuery.removeData( elem, "handle" );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem, bubbling ) {
		// Event object or event type
		var type = event.type || event;

		if( !bubbling ){
			event = typeof event === "object" ?
				// jQuery.Event object
				event[expando] ? event :
				// Object literal
				jQuery.extend( jQuery.Event(type), event ) :
				// Just the event type (string)
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			// Handle a global trigger
			if ( !elem ) {
				// Don't bubble custom events when global (to avoid too much overhead)
				event.stopPropagation();
				// Only trigger if we've ever bound an event for it
				if ( this.global[type] )
					jQuery.each( jQuery.cache, function(){
						if ( this.events && this.events[type] )
							jQuery.event.trigger( event, data, this.handle.elem );
					});
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType == 3 || elem.nodeType == 8 )
				return undefined;
			
			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;
			
			// Clone the incoming data, if any
			data = jQuery.makeArray(data);
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = jQuery.data(elem, "handle");
		if ( handle )
			handle.apply( elem, data );

		// Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
		if ( (!elem[type] || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
			event.result = false;

		// Trigger the native events (except for clicks on links)
		if ( !bubbling && elem[type] && !event.isDefaultPrevented() && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
			this.triggered = true;
			try {
				elem[ type ]();
			// prevent IE from throwing an error for some hidden elements
			} catch (e) {}
		}

		this.triggered = false;

		if ( !event.isPropagationStopped() ) {
			var parent = elem.parentNode || elem.ownerDocument;
			if ( parent )
				jQuery.event.trigger(event, data, parent, true);
		}
	},

	handle: function(event) {
		// returned undefined or false
		var all, handlers;

		event = arguments[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;
		
		// Namespaced event handlers
		var namespaces = event.type.split(".");
		event.type = namespaces.shift();

		// Cache this now, all = true means, any handler
		all = !namespaces.length && !event.exclusive;
		
		var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

		handlers = ( jQuery.data(this, "events") || {} )[event.type];

		for ( var j in handlers ) {
			var handler = handlers[j];

			// Filter the functions by class
			if ( all || namespace.test(handler.type) ) {
				// Pass in a reference to the handler function itself
				// So that we can later remove it
				event.handler = handler;
				event.data = handler.data;

				var ret = handler.apply(this, arguments);

				if( ret !== undefined ){
					event.result = ret;
					if ( ret === false ) {
						event.preventDefault();
						event.stopPropagation();
					}
				}

				if( event.isImmediatePropagationStopped() )
					break;

			}
		}
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function(event) {
		if ( event[expando] )
			return event;

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ){
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either

		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = event.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) )
			event.which = event.charCode || event.keyCode;

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

		return event;
	},

	proxy: function( fn, proxy ){
		proxy = proxy || function(){ return fn.apply(this, arguments); };
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || this.guid++;
		// So proxy can be declared as an argument
		return proxy;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: bindReady,
			teardown: function() {}
		}
	},
	
	specialAll: {
		live: {
			setup: function( selector, namespaces ){
				jQuery.event.add( this, namespaces[0], liveHandler );
			},
			teardown:  function( namespaces ){
				if ( namespaces.length ) {
					var remove = 0, name = RegExp("(^|\\.)" + namespaces[0] + "(\\.|$)");
					
					jQuery.each( (jQuery.data(this, "events").live || {}), function(){
						if ( name.test(this.type) )
							remove++;
					});
					
					if ( remove < 1 )
						jQuery.event.remove( this, namespaces[0], liveHandler );
				}
			}
		}
	}
};

jQuery.Event = function( src ){
	// Allow instantiation without the 'new' keyword
	if( !this.preventDefault )
		return new jQuery.Event(src);
	
	// Event object
	if( src && src.type ){
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	}else
		this.type = src;

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = now();
	
	// Mark it as fixed
	this[expando] = true;
};

function returnFalse(){
	return false;
}
function returnTrue(){
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if preventDefault exists run it on the original event
		if (e.preventDefault)
			e.preventDefault();
		// otherwise set the returnValue property of the original event to false (IE)
		e.returnValue = false;
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if stopPropagation exists run it on the original event
		if (e.stopPropagation)
			e.stopPropagation();
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation:function(){
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};
// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function(event) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;
	// Traverse up the tree
	while ( parent && parent != this )
		try { parent = parent.parentNode; }
		catch(e) { parent = this; }
	
	if( parent != this ){
		// set the correct event type
		event.type = event.data;
		// handle event if we actually just moused on to a non sub-element
		jQuery.event.handle.apply( this, arguments );
	}
};
	
jQuery.each({ 
	mouseover: 'mouseenter', 
	mouseout: 'mouseleave'
}, function( orig, fix ){
	jQuery.event.special[ fix ] = {
		setup: function(){
			jQuery.event.add( this, orig, withinElement, fix );
		},
		teardown: function(){
			jQuery.event.remove( this, orig, withinElement );
		}
	};			   
});

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},

	one: function( type, data, fn ) {
		var one = jQuery.event.proxy( fn || data, function(event) {
			jQuery(this).unbind(event, one);
			return (fn || data).apply( this, arguments );
		});
		return this.each(function(){
			jQuery.event.add( this, type, one, fn && data);
		});
	},

	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	trigger: function( type, data ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if( this[0] ){
			var event = jQuery.Event(type);
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}		
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments, i = 1;

		// link all the functions, so any of them can unbind this click handler
		while( i < args.length )
			jQuery.event.proxy( fn, args[i++] );

		return this.click( jQuery.event.proxy( fn, function(event) {
			// Figure out which function to execute
			this.lastToggle = ( this.lastToggle || 0 ) % i;

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ this.lastToggle++ ].apply( this, arguments ) || false;
		}));
	},

	hover: function(fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut);
	},

	ready: function(fn) {
		// Attach the listeners
		bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		else
			// Add the function to the wait list
			jQuery.readyList.push( fn );

		return this;
	},
	
	live: function( type, fn ){
		var proxy = jQuery.event.proxy( fn );
		proxy.guid += this.selector + type;

		jQuery(document).bind( liveConvert(type, this.selector), this.selector, proxy );

		return this;
	},
	
	die: function( type, fn ){
		jQuery(document).unbind( liveConvert(type, this.selector), fn ? { guid: fn.guid + this.selector + type } : null );
		return this;
	}
});

function liveHandler( event ){
	var check = RegExp("(^|\\.)" + event.type + "(\\.|$)"),
		stop = true,
		elems = [];

	jQuery.each(jQuery.data(this, "events").live || [], function(i, fn){
		if ( check.test(fn.type) ) {
			var elem = jQuery(event.target).closest(fn.data)[0];
			if ( elem )
				elems.push({ elem: elem, fn: fn });
		}
	});

	elems.sort(function(a,b) {
		return jQuery.data(a.elem, "closest") - jQuery.data(b.elem, "closest");
	});
	
	jQuery.each(elems, function(){
		if ( this.fn.call(this.elem, event, this.fn.data) === false )
			return (stop = false);
	});

	return stop;
}

function liveConvert(type, selector){
	return ["live", type, selector.replace(/\./g, "`").replace(/ /g, "|")].join(".");
}

jQuery.extend({
	isReady: false,
	readyList: [],
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.call( document, jQuery );
				});

				// Reset the list of functions
				jQuery.readyList = null;
			}

			// Trigger any bound ready events
			jQuery(document).triggerHandler("ready");
		}
	}
});

var readyBound = false;

function bindReady(){
	if ( readyBound ) return;
	readyBound = true;

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function(){
			document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
			jQuery.ready();
		}, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", arguments.callee );
				jQuery.ready();
			}
		});

		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function(){
			if ( jQuery.isReady ) return;

			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( arguments.callee, 0 );
				return;
			}

			// and execute any waiting functions
			jQuery.ready();
		})();
	}

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
}

jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
	"change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name){

	// Handle event binding
	jQuery.fn[name] = function(fn){
		return fn ? this.bind(name, fn) : this.trigger(name);
	};
});

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
jQuery( window ).bind( 'unload', function(){ 
	for ( var id in jQuery.cache )
		// Skip the window
		if ( id != 1 && jQuery.cache[ id ].handle )
			jQuery.event.remove( jQuery.cache[ id ].handle.elem );
}); 
(function(){

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + (new Date).getTime();

	div.style.display = "none";
	div.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType == 3,
		
		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,
		
		// Make sure that you can get all elements in an <object> element
		// IE 7 always returns no results
		objectAll: !!div.getElementsByTagName("object")[0]
			.getElementsByTagName("*").length,
		
		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,
		
		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style: /red/.test( a.getAttribute("style") ),
		
		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",
		
		// Make sure that element opacity exists
		// (IE uses filter instead)
		opacity: a.style.opacity === "0.5",
		
		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Will be defined later
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null
	};
	
	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e){}

	root.insertBefore( script, root.firstChild );
	
	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function(){
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", arguments.callee);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function(){
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';
	});
})();

var styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat";

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	"float": styleFloat,
	cssFloat: styleFloat,
	styleFloat: styleFloat,
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	tabindex: "tabIndex"
};
jQuery.fn.extend({
	// Keep a copy of the old load
	_load: jQuery.fn.load,

	load: function( url, params, callback ) {
		if ( typeof url !== "string" )
			return this._load( url );

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if( typeof params === "object" ) {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function(res, status){
				// If successful, inject the HTML into all the matched elements
				if ( status == "success" || status == "notmodified" )
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div/>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(/<script(.|\s)*?\/script>/g, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );

				if( callback )
					self.each( callback, [res.responseText, status, res] );
			}
		});
		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				(this.checked || /select|textarea/i.test(this.nodeName) ||
					/text|hidden|password|search/i.test(this.type));
		})
		.map(function(i, elem){
			var val = jQuery(this).val();
			return val == null ? null :
				jQuery.isArray(val) ?
					jQuery.map( val, function(val, i){
						return {name: elem.name, value: val};
					}) :
					{name: elem.name, value: val};
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

var jsc = now();

jQuery.extend({
  
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		username: null,
		password: null,
		*/
		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr:function(){
			return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	// Last-Modified header cache for next request
	lastModified: {},

	ajax: function( s ) {
		// Extend the settings, but re-extend 's' so that it can be
		// checked again later (in the test suite, specifically)
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));

		var jsonp, jsre = /=\?(&|$)/g, status, data,
			type = s.type.toUpperCase();

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" )
			s.data = jQuery.param(s.data);

		// Handle JSONP Parameter Callbacks
		if ( s.dataType == "jsonp" ) {
			if ( type == "GET" ) {
				if ( !s.url.match(jsre) )
					s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?";
			} else if ( !s.data || !s.data.match(jsre) )
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre)) ) {
			jsonp = "jsonp" + jsc++;

			// Replace the =? sequence both in the query string and the data
			if ( s.data )
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = function(tmp){
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;
				try{ delete window[ jsonp ]; } catch(e){}
				if ( head )
					head.removeChild( script );
			};
		}

		if ( s.dataType == "script" && s.cache == null )
			s.cache = false;

		if ( s.cache === false && type == "GET" ) {
			var ts = now();
			// try replacing _= if it is there
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && type == "GET" ) {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

			// IE likes to send both get and post data, prevent this
			s.data = null;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		// Matches an absolute URL, and saves the domain
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec( s.url );

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType == "script" && type == "GET" && parts
			&& ( parts[1] && parts[1] != location.protocol || parts[2] != location.host )){

			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset)
				script.charset = s.scriptCharset;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function(){
					if ( !done && (!this.readyState ||
							this.readyState == "loaded" || this.readyState == "complete") ) {
						done = true;
						success();
						complete();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if( s.username )
			xhr.open(type, s.url, s.async, s.username, s.password);
		else
			xhr.open(type, s.url, s.async);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data )
				xhr.setRequestHeader("Content-Type", s.contentType);

			// Set the If-Modified-Since header, if ifModified mode.
			if ( s.ifModified )
				xhr.setRequestHeader("If-Modified-Since",
					jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

			// Set header so the called script knows that it's an XMLHttpRequest
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e){}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend(xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global )
			jQuery.event.trigger("ajaxSend", [xhr, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The request was aborted, clear the interval and decrement jQuery.active
			if (xhr.readyState == 0) {
				if (ival) {
					// clear poll interval
					clearInterval(ival);
					ival = null;
					// Handle the global AJAX counter
					if ( s.global && ! --jQuery.active )
						jQuery.event.trigger( "ajaxStop" );
				}
			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;

				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}

				status = isTimeout == "timeout" ? "timeout" :
					!jQuery.httpSuccess( xhr ) ? "error" :
					s.ifModified && jQuery.httpNotModified( xhr, s.url ) ? "notmodified" :
					"success";

				if ( status == "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch(e) {
						status = "parsererror";
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status == "success" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xhr.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available

					if ( s.ifModified && modRes )
						jQuery.lastModified[s.url] = modRes;

					// JSONP handles its own success callback
					if ( !jsonp )
						success();
				} else
					jQuery.handleError(s, xhr, status);

				// Fire the complete handlers
				complete();

				if ( isTimeout )
					xhr.abort();

				// Stop memory leaks
				if ( s.async )
					xhr = null;
			}
		};

		if ( s.async ) {
			// don't attach the handler to the request, just poll it instead
			var ival = setInterval(onreadystatechange, 13);

			// Timeout checker
			if ( s.timeout > 0 )
				setTimeout(function(){
					// Check to see if the request is still happening
					if ( xhr && !requestDone )
						onreadystatechange( "timeout" );
				}, s.timeout);
		}

		// Send the data
		try {
			xhr.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();

		function success(){
			// If a local callback was specified, fire it and pass it the data
			if ( s.success )
				s.success( data, status );

			// Fire the global callback
			if ( s.global )
				jQuery.event.trigger( "ajaxSuccess", [xhr, s] );
		}

		function complete(){
			// Process result
			if ( s.complete )
				s.complete(xhr, status);

			// The request was completed
			if ( s.global )
				jQuery.event.trigger( "ajaxComplete", [xhr, s] );

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xhr, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xhr, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol == "file:" ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		try {
			var xhrRes = xhr.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xhr.status == 304 || xhrRes == jQuery.lastModified[url];
		} catch(e){}
		return false;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type"),
			xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
			
		// Allow a pre-filtering function to sanitize the response
		// s != null is checked to keep backwards compatibility
		if( s && s.dataFilter )
			data = s.dataFilter( data, type );

		// The filter can actually parse the response
		if( typeof data === "string" ){

			// If the type is "script", eval it in global context
			if ( type == "script" )
				jQuery.globalEval( data );

			// Get the JavaScript object, if JSON is used.
			if ( type == "json" )
				data = window["eval"]("(" + data + ")");
		}
		
		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [ ];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( jQuery.isArray(a) || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				add( this.name, this.value );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( jQuery.isArray(a[j]) )
					jQuery.each( a[j], function(){
						add( j, this );
					});
				else
					add( j, jQuery.isFunction(a[j]) ? a[j]() : a[j] );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

});
var elemdisplay = {},
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

function genFx( type, num ){
	var obj = {};
	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function(){
		obj[ this ] = type;
	});
	return obj;
}

jQuery.fn.extend({
	show: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("show", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				
				this[i].style.display = old || "";
				
				if ( jQuery.css(this[i], "display") === "none" ) {
					var tagName = this[i].tagName, display;
					
					if ( elemdisplay[ tagName ] ) {
						display = elemdisplay[ tagName ];
					} else {
						var elem = jQuery("<" + tagName + " />").appendTo("body");
						
						display = elem.css("display");
						if ( display === "none" )
							display = "block";
						
						elem.remove();
						
						elemdisplay[ tagName ] = display;
					}
					
					jQuery.data(this[i], "olddisplay", display);
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = jQuery.data(this[i], "olddisplay") || "";
			}
			
			return this;
		}
	},

	hide: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("hide", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				if ( !old && old !== "none" )
					jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ){
		var bool = typeof fn === "boolean";

		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle.apply( this, arguments ) :
			fn == null || bool ?
				this.each(function(){
					var state = bool ? fn : jQuery(this).is(":hidden");
					jQuery(this)[ state ? "show" : "hide" ]();
				}) :
				this.animate(genFx("toggle", 3), fn, fn2);
	},

	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		return this[ optall.queue === false ? "each" : "queue" ](function(){
		
			var opt = jQuery.extend({}, optall), p,
				hidden = this.nodeType == 1 && jQuery(this).is(":hidden"),
				self = this;
	
			for ( p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return opt.complete.call(this);

				if ( ( p == "height" || p == "width" ) && this.style ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}
			}

			if ( opt.overflow != null )
				this.style.overflow = "hidden";

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function(name, val){
				var e = new jQuery.fx( self, opt, name );

				if ( /toggle|show|hide/.test(val) )
					e[ val == "toggle" ? hidden ? "show" : "hide" : val ]( prop );
				else {
					var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat(parts[2]),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit != "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] )
							end = ((parts[1] == "-=" ? -1 : 1) * end) + start;

						e.custom( start, end, unit );
					} else
						e.custom( start, val, "" );
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function(clearQueue, gotoEnd){
		var timers = jQuery.timers;

		if (clearQueue)
			this.queue([]);

		this.each(function(){
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- )
				if ( timers[i].elem == this ) {
					if (gotoEnd)
						// force the next step to be the last
						timers[i](true);
					timers.splice(i, 1);
				}
		});

		// start the next in the queue if the last step wasn't forced
		if (!gotoEnd)
			this.dequeue();

		return this;
	}

});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" }
}, function( name, props ){
	jQuery.fn[ name ] = function( speed, callback ){
		return this.animate( props, speed, callback );
	};
});

jQuery.extend({

	speed: function(speed, easing, fn) {
		var opt = typeof speed === "object" ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			if ( opt.queue !== false )
				jQuery(this).dequeue();
			if ( jQuery.isFunction( opt.old ) )
				opt.old.call( this );
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ){
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig )
			options.orig = {};
	}

});

jQuery.fx.prototype = {

	// Simple function for setting a style value
	update: function(){
		if ( this.options.step )
			this.options.step.call( this.elem, this.now, this );

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( ( this.prop == "height" || this.prop == "width" ) && this.elem.style )
			this.elem.style.display = "block";
	},

	// Get the current size
	cur: function(force){
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) )
			return this.elem[ this.prop ];

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(function(){
				var timers = jQuery.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval( timerId );
					timerId = undefined;
				}
			}, 13);
		}
	},

	// Simple 'show' function
	show: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery(this.elem).show();
	},

	// Simple 'hide' function
	hide: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function(gotoEnd){
		var t = now();

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {
				if ( this.options.display != null ) {
					// Reset the overflow
					this.elem.style.overflow = this.options.overflow;

					// Reset the display
					this.elem.style.display = this.options.display;
					if ( jQuery.css(this.elem, "display") == "none" )
						this.elem.style.display = "block";
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide )
					jQuery(this.elem).hide();

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show )
					for ( var p in this.options.curAnim )
						jQuery.attr(this.elem.style, p, this.options.orig[p]);
					
				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}

};

jQuery.extend( jQuery.fx, {
	speeds:{
		slow: 600,
 		fast: 200,
 		// Default speed
 		_default: 400
	},
	step: {

		opacity: function(fx){
			jQuery.attr(fx.elem.style, "opacity", fx.now);
		},

		_default: function(fx){
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null )
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			else
				fx.elem[ fx.prop ] = fx.now;
		}
	}
});
if ( document.documentElement["getBoundingClientRect"] )
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		var box  = this[0].getBoundingClientRect(), doc = this[0].ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || jQuery.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || jQuery.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
		return { top: top, left: left };
	};
else 
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		jQuery.offset.initialized || jQuery.offset.initialize();

		var elem = this[0], offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView.getComputedStyle(elem, null),
			top = elem.offsetTop, left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			computedStyle = defaultView.getComputedStyle(elem, null);
			top -= elem.scrollTop, left -= elem.scrollLeft;
			if ( elem === offsetParent ) {
				top += elem.offsetTop, left += elem.offsetLeft;
				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName)) )
					top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
			}
			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" )
				top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
				left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" )
			top  += body.offsetTop,
			left += body.offsetLeft;

		if ( prevComputedStyle.position === "fixed" )
			top  += Math.max(docElem.scrollTop, body.scrollTop),
			left += Math.max(docElem.scrollLeft, body.scrollLeft);

		return { top: top, left: left };
	};

jQuery.offset = {
	initialize: function() {
		if ( this.initialized ) return;
		var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
		for ( prop in rules ) container.style[prop] = rules[prop];

		container.innerHTML = html;
		body.insertBefore(container, body.firstChild);
		innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		body.style.marginTop = '1px';
		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
		body.style.marginTop = bodyMarginTop;

		body.removeChild(container);
		this.initialized = true;
	},

	bodyOffset: function(body) {
		jQuery.offset.initialized || jQuery.offset.initialize();
		var top = body.offsetTop, left = body.offsetLeft;
		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset )
			top  += parseInt( jQuery.curCSS(body, 'marginTop',  true), 10 ) || 0,
			left += parseInt( jQuery.curCSS(body, 'marginLeft', true), 10 ) || 0;
		return { top: top, left: left };
	}
};


jQuery.fn.extend({
	position: function() {
		var left = 0, top = 0, results;

		if ( this[0] ) {
			// Get *real* offsetParent
			var offsetParent = this.offsetParent(),

			// Get correct offsets
			offset       = this.offset(),
			parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? { top: 0, left: 0 } : offsetParent.offset();

			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft 
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top  -= num( this, 'marginTop'  );
			offset.left -= num( this, 'marginLeft' );

			// Add offsetParent borders
			parentOffset.top  += num( offsetParent, 'borderTopWidth'  );
			parentOffset.left += num( offsetParent, 'borderLeftWidth' );

			// Subtract the two offsets
			results = {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}

		return results;
	},

	offsetParent: function() {
		var offsetParent = this[0].offsetParent || document.body;
		while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && jQuery.css(offsetParent, 'position') == 'static') )
			offsetParent = offsetParent.offsetParent;
		return jQuery(offsetParent);
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ['Left', 'Top'], function(i, name) {
	var method = 'scroll' + name;
	
	jQuery.fn[ method ] = function(val) {
		if (!this[0]) return null;

		return val !== undefined ?

			// Set the scroll offset
			this.each(function() {
				this == window || this == document ?
					window.scrollTo(
						!i ? val : jQuery(window).scrollLeft(),
						 i ? val : jQuery(window).scrollTop()
					) :
					this[ method ] = val;
			}) :

			// Return the scroll offset
			this[0] == window || this[0] == document ?
				self[ i ? 'pageYOffset' : 'pageXOffset' ] ||
					jQuery.boxModel && document.documentElement[ method ] ||
					document.body[ method ] :
				this[0][ method ];
	};
});
// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function(i, name){

	var tl = i ? "Left"  : "Top",  // top or left
		br = i ? "Right" : "Bottom", // bottom or right
		lower = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function(){
		return this[0] ?
			jQuery.css( this[0], lower, false, "padding" ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function(margin) {
		return this[0] ?
			jQuery.css( this[0], lower, false, margin ? "margin" : "border" ) :
			null;
	};
	
	var type = name.toLowerCase();

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		return this[0] == window ?
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			document.compatMode == "CSS1Compat" && document.documentElement[ "client" + name ] ||
			document.body[ "client" + name ] :

			// Get document width or height
			this[0] == document ?
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max(
					document.documentElement["client" + name],
					document.body["scroll" + name], document.documentElement["scroll" + name],
					document.body["offset" + name], document.documentElement["offset" + name]
				) :

				// Get or set width or height on the element
				size === undefined ?
					// Get width or height on the element
					(this.length ? jQuery.css( this[0], type ) : null) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, typeof size === "string" ? size : size + "px" );
	};

});
})();
;

var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

/**
 * Set the variable that indicates if JavaScript behaviors should be applied
 */
Drupal.jsEnabled = document.getElementsByTagName && document.createElement && document.createTextNode && document.documentElement && document.getElementById;

/**
 * Attach all registered behaviors to a page element.
 *
 * Behaviors are event-triggered actions that attach to page elements, enhancing
 * default non-Javascript UIs. Behaviors are registered in the Drupal.behaviors
 * object as follows:
 * @code
 *    Drupal.behaviors.behaviorName = function () {
 *      ...
 *    };
 * @endcode
 *
 * Drupal.attachBehaviors is added below to the jQuery ready event and so
 * runs on initial page load. Developers implementing AHAH/AJAX in their
 * solutions should also call this function after new page content has been
 * loaded, feeding in an element to be processed, in order to attach all
 * behaviors to the new content.
 *
 * Behaviors should use a class in the form behaviorName-processed to ensure
 * the behavior is attached only once to a given element. (Doing so enables
 * the reprocessing of given elements, which may be needed on occasion despite
 * the ability to limit behavior attachment to a particular element.)
 *
 * @param context
 *   An element to attach behaviors to. If none is given, the document element
 *   is used.
 */
Drupal.attachBehaviors = function(context) {
  context = context || document;
  if (Drupal.jsEnabled) {
    // Execute all of them.
    jQuery.each(Drupal.behaviors, function() {
      this(context);
    });
  }
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.checkPlain = function(str) {
  str = String(str);
  var replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  for (var character in replace) {
    var regex = new RegExp(character, 'g');
    str = str.replace(regex, replace[character]);
  }
  return str;
};

/**
 * Translate strings to the page language or a given language.
 *
 * See the documentation of the server-side t() function for further details.
 *
 * @param str
 *   A string containing the English string to translate.
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 * @return
 *   The translated string.
 */
Drupal.t = function(str, args) {
  // Fetch the localized version of the string.
  if (Drupal.locale.strings && Drupal.locale.strings[str]) {
    str = Drupal.locale.strings[str];
  }

  if (args) {
    // Transform arguments before inserting them
    for (var key in args) {
      switch (key.charAt(0)) {
        // Escaped only
        case '@':
          args[key] = Drupal.checkPlain(args[key]);
        break;
        // Pass-through
        case '!':
          break;
        // Escaped and placeholder
        case '%':
        default:
          args[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
      str = str.replace(key, args[key]);
    }
  }
  return str;
};

/**
 * Format a string containing a count of items.
 *
 * This function ensures that the string is pluralized correctly. Since Drupal.t() is
 * called by this function, make sure not to pass already-localized strings to it.
 *
 * See the documentation of the server-side format_plural() function for further details.
 *
 * @param count
 *   The item count to display.
 * @param singular
 *   The string for the singular case. Please make sure it is clear this is
 *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
 *   Do not use @count in the singular string.
 * @param plural
 *   The string for the plural case. Please make sure it is clear this is plural,
 *   to ease translation. Use @count in place of the item count, as in "@count
 *   new comments".
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 *   Note that you do not need to include @count in this array.
 *   This replacement is done automatically for the plural case.
 * @return
 *   A translated string.
 */
Drupal.formatPlural = function(count, singular, plural, args) {
  var args = args || {};
  args['@count'] = count;
  // Determine the index of the plural form.
  var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

  if (index == 0) {
    return Drupal.t(singular, args);
  }
  else if (index == 1) {
    return Drupal.t(plural, args);
  }
  else {
    args['@count['+ index +']'] = args['@count'];
    delete args['@count'];
    return Drupal.t(plural.replace('@count', '@count['+ index +']'), args);
  }
};

/**
 * Generate the themed representation of a Drupal object.
 *
 * All requests for themed output must go through this function. It examines
 * the request and routes it to the appropriate theme function. If the current
 * theme does not provide an override function, the generic theme function is
 * called.
 *
 * For example, to retrieve the HTML that is output by theme_placeholder(text),
 * call Drupal.theme('placeholder', text).
 *
 * @param func
 *   The name of the theme function to call.
 * @param ...
 *   Additional arguments to pass along to the theme function.
 * @return
 *   Any data the theme function returns. This could be a plain HTML string,
 *   but also a complex object.
 */
Drupal.theme = function(func) {
  for (var i = 1, args = []; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
};

/**
 * Parse a JSON response.
 *
 * The result is either the JSON object, or an object with 'status' 0 and 'data' an error message.
 */
Drupal.parseJson = function (data) {
  if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '[')) {
    return { status: 0, data: data.length ? data : Drupal.t('Unspecified error') };
  }
  return eval('(' + data + ');');
};

/**
 * Freeze the current body height (as minimum height). Used to prevent
 * unnecessary upwards scrolling when doing DOM manipulations.
 */
Drupal.freezeHeight = function () {
  Drupal.unfreezeHeight();
  var div = document.createElement('div');
  $(div).css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1px',
    height: $('body').css('height')
  }).attr('id', 'freeze-height');
  $('body').append(div);
};

/**
 * Unfreeze the body height
 */
Drupal.unfreezeHeight = function () {
  $('#freeze-height').remove();
};

/**
 * Wrapper around encodeURIComponent() which avoids Apache quirks (equivalent of
 * drupal_urlencode() in PHP). This function should only be used on paths, not
 * on query string arguments.
 */
Drupal.encodeURIComponent = function (item, uri) {
  uri = uri || location.href;
  item = encodeURIComponent(item).replace(/%2F/g, '/');
  return (uri.indexOf('?q=') != -1) ? item : item.replace(/%26/g, '%2526').replace(/%23/g, '%2523').replace(/\/\//g, '/%252F');
};

/**
 * Get the text selection in a textarea.
 */
Drupal.getSelection = function (element) {
  if (typeof(element.selectionStart) != 'number' && document.selection) {
    // The current selection
    var range1 = document.selection.createRange();
    var range2 = range1.duplicate();
    // Select all text.
    range2.moveToElementText(element);
    // Now move 'dummy' end point to end point of original range.
    range2.setEndPoint('EndToEnd', range1);
    // Now we can calculate start and end points.
    var start = range2.text.length - range1.text.length;
    var end = start + range1.text.length;
    return { 'start': start, 'end': end };
  }
  return { 'start': element.selectionStart, 'end': element.selectionEnd };
};

/**
 * Build an error message from ahah response.
 */
Drupal.ahahError = function(xmlhttp, uri) {
  if (xmlhttp.status == 200) {
    if (jQuery.trim($(xmlhttp.responseText).text())) {
      var message = Drupal.t("An error occurred. \n@uri\n@text", {'@uri': uri, '@text': xmlhttp.responseText });
    }
    else {
      var message = Drupal.t("An error occurred. \n@uri\n(no information available).", {'@uri': uri, '@text': xmlhttp.responseText });
    }
  }
  else {
    var message = Drupal.t("An HTTP error @status occurred. \n@uri", {'@uri': uri, '@status': xmlhttp.status });
  }
  return message;
}

// Global Killswitch on the <html> element
if (Drupal.jsEnabled) {
  // Global Killswitch on the <html> element
  $(document.documentElement).addClass('js');
  // 'js enabled' cookie
  document.cookie = 'has_js=1; path=/';
  // Attach all behaviors.
  $(document).ready(function() {
    Drupal.attachBehaviors(this);
  });
}

/**
 * The default themes.
 */
Drupal.theme.prototype = {

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param str
   *   The text to format (plain-text).
   * @return
   *   The formatted text (html).
   */
  placeholder: function(str) {
    return '<em>' + Drupal.checkPlain(str) + '</em>';
  }
};
;

$(document).ready(function() {

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch only the first parent link of a clicked element.
    $(event.target).parents("a:first,area:first").andSelf().filter("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for absolute internal links.
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:],area[href^=mailto:]")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutgoing && this.href) {
          if (ga.trackOutboundAsPageview) {
            // Track all external links as page views after URL cleanup.
            // Currently required, if click should be tracked as goal.
            _gaq.push(["_trackPageview", '/outbound/' + this.href.replace(/^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\//i, '').split('/').join('--')]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });
});
;
(function ($) {

/**
 * Open Mollom privacy policy link in a new window.
 *
 * Required for valid XHTML Strict markup.
 */
Drupal.behaviors.mollomPrivacy = function (context) {
  $('.mollom-privacy a', context).click(function () {
    this.target = '_blank';
  });
};

/**
 * Attach click event handlers for CAPTCHA links.
 */
Drupal.behaviors.mollomCaptcha = function (context) {
  $('a.mollom-switch-captcha', context).click(getMollomCaptcha);
};

/**
 * Fetch a Mollom CAPTCHA and output the image or audio into the form.
 */
function getMollomCaptcha() {
  // Get the current requested CAPTCHA type from the clicked link.
  var newCaptchaType = $(this).hasClass('mollom-audio-captcha') ? 'audio' : 'image';

  var context = $(this).parents('form');

  // Extract the Mollom session id from the form.
  var mollomSessionId = $('input.mollom-session-id', context).val();

  // Retrieve a CAPTCHA:
  $.getJSON(Drupal.settings.basePath + 'mollom/captcha/' + newCaptchaType + '/' + mollomSessionId,
    function (data) {
      if (!(data && data.content)) {
        return;
      }
      // Inject new CAPTCHA.
      $('.mollom-captcha-content', context).parent().html(data.content);
      // Update session id.
      $('input.mollom-session-id', context).val(data.session_id);
      // Add an onclick-event handler for the new link.
      Drupal.attachBehaviors(context);
      // Focus on the CATPCHA input.
      $('input[name="mollom[captcha]"]', context).focus();
    }
  );
  return false;
}

})(jQuery);
;

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);
;
/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-06-19 20:25:28 -0500 (Tue, 19 Jun 2007) $
 * $Rev: 2111 $
 *
 * Version 2.1
 */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&parseInt($.browser.version)<=6){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};if(!$.browser.version)$.browser.version=navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1];})(jQuery);;
﻿/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);;
// $Id: nice_menus.js,v 1.21 2010/06/18 06:14:12 vordude Exp $

// This uses Superfish 1.4.8
// (http://users.tpg.com.au/j_birch/plugins/superfish)

// Add Superfish to all Nice menus with some basic options.
(function ($) {
  $(document).ready(function() {
    $('ul.nice-menu').superfish({
      // Apply a generic hover class.
      hoverClass: 'over',
      // Disable generation of arrow mark-up.
      autoArrows: false,
      // Disable drop shadows.
      dropShadows: false,
      // Mouse delay.
      delay: Drupal.settings.nice_menus_options.delay,
      // Animation speed.
      speed: Drupal.settings.nice_menus_options.speed
    // Add in Brandon Aaron’s bgIframe plugin for IE select issues.
    // http://plugins.jquery.com/node/46/release
    }).find('ul').bgIframe({opacity:false});
    $('ul.nice-menu ul').css('display', 'none');
  });
})(jQuery);
;

(function ($) {
  Drupal.Panels = {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());;
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Trademark:
 * FS Clerkenwell is a trademark of Fontsmith Ltd.
 * 
 * Full name:
 * FSClerkenwell
 * 
 * Description:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Manufacturer:
 * Fontsmith Ltd
 * 
 * Designer:
 * Phil Garnham and Jason Smith
 * 
 * Vendor URL:
 * http://www.fontsmith.com/
 * 
 * License information:
 * http://www.fontsmith.com
 */
Cufon.registerFont({"w":506,"face":{"font-family":"FS Clerkenwell","font-weight":400,"font-stretch":"normal","units-per-em":"1000","panose-1":"2 0 5 3 2 0 0 2 0 4","ascent":"730","descent":"-270","x-height":"13","bbox":"-100 -891 1067 260","underline-thickness":"20","underline-position":"-113","stemh":"65","stemv":"94","unicode-range":"U+0020-U+FB02"},"glyphs":{" ":{"w":196},"\ufb01":{"d":"456,-588v0,31,-26,56,-57,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,57,25,57,56xm505,0r-199,0r0,-58r52,0r0,-341r-168,0r0,319v-1,29,30,21,55,22r0,58r-202,0r0,-58r53,0r0,-341r-67,0r0,-59r63,0v-8,-35,-19,-67,-19,-103v0,-136,168,-157,259,-97r-26,54v-19,-9,-51,-18,-77,-18v-87,1,-58,105,-43,164v77,2,183,-7,242,-7v16,0,24,7,24,23r0,360v-1,29,27,24,53,24r0,58","w":543},"\ufb02":{"d":"274,-691v108,0,178,67,178,180r0,428v-2,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-460v0,-65,-31,-101,-84,-101v-51,0,-88,27,-88,96r0,65r98,0r0,59r-94,0r0,319v-1,29,30,21,55,22r0,58r-202,0r0,-58r53,0r0,-341r-67,0r0,-59r63,0r0,-58v0,-118,77,-175,182,-175","w":541},"\u00a0":{"w":196},"A":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"B":{"d":"277,-616v124,-5,199,41,203,147v1,48,-27,106,-91,128v95,19,140,84,140,162v0,116,-75,179,-191,179r-284,0r0,-65r60,0r0,-461v2,-32,-33,-24,-62,-25r0,-65r225,0xm268,-363v79,6,109,-37,109,-97v0,-86,-63,-95,-159,-91r0,188r50,0xm294,-65v93,2,125,-41,127,-123v2,-107,-91,-120,-203,-114r0,210v-2,37,43,26,76,27","w":569},"C":{"d":"493,-70v-49,46,-125,81,-203,81v-152,0,-250,-109,-250,-311v0,-192,99,-328,255,-328v57,0,101,21,127,47r5,-35r52,0r0,213v-29,-1,-57,7,-60,-24v-6,-71,-38,-123,-113,-123v-102,0,-155,102,-155,234v0,177,65,248,161,248v58,0,112,-28,152,-57","w":529},"D":{"d":"256,-616v211,-11,331,105,329,311v0,88,-20,165,-59,218v-86,116,-284,82,-471,87r0,-65r59,0r0,-461v3,-32,-34,-24,-62,-25r0,-65r204,0xm474,-306v-1,-169,-76,-260,-256,-245r0,461v-2,31,38,25,68,25v41,0,77,-9,106,-27v69,-43,82,-135,82,-214","w":621},"E":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191","w":547},"F":{"d":"482,-414v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v-2,32,34,24,63,25r0,65r-227,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0","w":514,"k":{"y":10,"g":40,"c":37}},"G":{"d":"573,-226r-50,0r0,226r-67,0r-17,-29v-25,18,-86,40,-142,40v-161,0,-251,-124,-251,-310v0,-218,127,-329,270,-329v66,0,113,26,134,50r7,-38r53,0r0,206v-30,1,-54,3,-59,-24v-11,-67,-48,-116,-125,-116v-95,0,-169,84,-169,245v0,218,128,285,262,212r0,-108v3,-36,-30,-22,-58,-25r0,-60r212,0r0,60","w":607},"H":{"d":"615,0r-227,0r0,-65r60,0r0,-206r-230,0r0,182v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,209r230,0r0,-185v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65","w":667},"I":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65","w":339},"J":{"d":"322,-213v1,148,-39,224,-179,224v-43,0,-83,-8,-109,-18r0,-73v25,9,59,16,91,16v71,0,93,-49,93,-115r0,-348v0,-16,-8,-24,-25,-24r-129,0r-12,-65r270,0r0,403","w":404},"K":{"d":"581,0r-149,0r-159,-275r-55,71r0,114v0,33,35,24,64,25r0,65r-228,0r0,-65r60,0r0,-459v3,-32,-32,-27,-62,-27r0,-65r228,0r0,65r-62,0r0,229v68,-92,167,-193,216,-294r125,0r0,65v-41,1,-70,-5,-91,23r-127,164r156,267v13,29,41,34,84,32r0,65","w":603,"k":{"y":24,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7,"e":20,"\u00e8":20,"\u00e9":20,"\u00ea":20,"\u011b":20,"\u00eb":20,"\u0113":20,"\u0115":20,"\u0117":20,"\u0119":20,"o":23,"\u00f2":23,"\u00f3":23,"\u00f4":23,"\u00f5":23,"\u00f6":23,"\u014d":23,"\u014f":23,"\u0151":23,"\u00f8":23,"\u01ff":23,"\u0153":23,"u":19,"\u00f9":19,"\u00fa":19,"\u00fb":19,"\u0169":19,"\u00fc":19,"\u016b":19,"\u016d":19,"\u016f":19,"\u0171":19,"\u0173":19,"O":38,"\u00d2":38,"\u00d3":38,"\u00d4":38,"\u00d5":38,"\u00d6":38,"\u014c":38,"\u014e":38,"\u0150":38,"\u00d8":38,"\u01fe":38,"\u0152":38,"Y":16,"\u1ef2":16,"\u00dd":16,"\u0176":16,"\u0178":16,"r":13,"\u0155":13,"\u0159":13,"\u0157":13}},"L":{"d":"488,0r-434,0r0,-65r60,0r0,-461v0,-35,-33,-23,-62,-25r0,-65r227,0r0,65r-61,0r0,461v0,17,9,25,25,25r165,0v15,-44,25,-106,29,-151v26,0,51,-4,51,25r0,191","w":520,"k":{"y":11,"u":21,"\u00f9":21,"\u00fa":21,"\u00fb":21,"\u0169":21,"\u00fc":21,"\u016b":21,"\u016d":21,"\u016f":21,"\u0171":21,"\u0173":21,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66,"T":60,"\u0164":60,"\u0162":60}},"M":{"d":"754,0r-214,0r0,-65r55,0r0,-322r-158,387r-70,0r-166,-387r0,297v-3,27,30,26,58,25r0,65r-196,0r0,-65r55,0r0,-461v3,-28,-34,-26,-62,-25r0,-65r148,0r209,490r199,-490r137,0r0,65r-54,0r0,461v-1,30,31,25,59,25r0,65","w":810},"N":{"d":"625,-551r-56,0r0,551r-70,0r-297,-436r0,346v-3,27,30,26,58,25r0,65r-197,0r0,-65r56,0r0,-461v3,-28,-33,-26,-61,-25r0,-65r129,0r298,428r0,-338v3,-30,-32,-25,-60,-25r0,-65r200,0r0,65","w":682},"O":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"P":{"d":"528,-429v0,122,-74,196,-256,196r-54,0r0,143v-3,31,34,25,63,25r0,65r-227,0r0,-65r60,0r0,-461v3,-32,-34,-24,-62,-25r0,-65r245,0v150,0,231,53,231,187xm418,-430v0,-111,-87,-127,-200,-121r0,250r59,0v111,0,141,-53,141,-129","w":562,"k":{"Z":35,"S":9,"A":92,"\u00c0":92,"\u00c1":92,"\u00c2":92,"\u00c3":92,"\u00c4":92,"\u0100":92,"\u0102":92,"\u00c5":92,"\u01fa":92,"\u0104":92,"\u00c6":92,"\u01fc":92,"a":29,"\u00e0":29,"\u00e1":29,"\u00e2":29,"\u00e3":29,"\u00e4":29,"\u0101":29,"\u0103":29,"\u00e5":29,"\u01fb":29,"\u0105":29,"\u00e6":29,"\u01fd":29,"e":27,"\u00e8":27,"\u00e9":27,"\u00ea":27,"\u011b":27,"\u00eb":27,"\u0113":27,"\u0115":27,"\u0117":27,"\u0119":27,"o":27,"\u00f2":27,"\u00f3":27,"\u00f4":27,"\u00f5":27,"\u00f6":27,"\u014d":27,"\u014f":27,"\u0151":27,"\u00f8":27,"\u01ff":27,"\u0153":27,"Y":19,"\u1ef2":19,"\u00dd":19,"\u0176":19,"\u0178":19}},"Q":{"d":"143,-40v-70,-51,-97,-175,-97,-268v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241v0,80,-16,176,-68,240v-63,76,-170,98,-269,62v-50,43,-7,113,60,113v73,0,144,-40,212,-47r0,61v-82,17,-141,57,-234,57v-76,0,-150,-42,-150,-127v0,-41,22,-76,54,-91xm292,-70v113,0,135,-101,135,-238v0,-138,-21,-239,-135,-239v-113,0,-135,102,-135,239v0,138,22,238,135,238","w":584},"R":{"d":"574,0r-151,0r-138,-248r-67,0r0,158v-3,31,34,25,63,25r0,65r-227,0r0,-65r60,0r0,-461v3,-32,-34,-24,-62,-25r0,-65r240,0v161,0,236,62,236,182v0,83,-47,151,-134,176r93,161v13,29,44,35,87,32r0,65xm419,-437v0,-59,-26,-114,-143,-114r-58,0r0,235r56,0v110,0,145,-46,145,-121","w":612,"k":{"o":19,"\u00f2":19,"\u00f3":19,"\u00f4":19,"\u00f5":19,"\u00f6":19,"\u014d":19,"\u014f":19,"\u0151":19,"\u00f8":19,"\u01ff":19,"\u0153":19,"O":19,"\u00d2":19,"\u00d3":19,"\u00d4":19,"\u00d5":19,"\u00d6":19,"\u014c":19,"\u014e":19,"\u0150":19,"\u00d8":19,"\u01fe":19,"\u0152":19,"T":28,"\u0164":28,"\u0162":28}},"S":{"d":"465,-163v0,89,-61,174,-198,174v-56,0,-112,-15,-147,-56r-7,46r-48,0r0,-211v28,1,55,-8,58,22v7,76,56,125,129,125v73,0,107,-39,107,-80v0,-149,-298,-95,-298,-312v0,-109,87,-173,188,-173v57,0,104,19,132,54r9,-42r47,0r0,208v-29,-1,-57,8,-61,-22v-10,-74,-45,-126,-121,-126v-55,0,-91,39,-91,84v0,133,301,100,301,309","w":512},"T":{"d":"520,-425v-26,-1,-55,6,-59,-19r-12,-69v-3,-57,-71,-33,-124,-38r0,462v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-486v-53,5,-114,-18,-124,38r-12,69v-2,24,-30,18,-55,19r3,-191r483,0","w":548,"k":{"e":40,"\u00e8":40,"\u00e9":40,"\u00ea":40,"\u011b":40,"\u00eb":40,"\u0113":40,"\u0115":40,"\u0117":40,"\u0119":40,"a":29,"\u00e0":29,"\u00e1":29,"\u00e2":29,"\u00e3":29,"\u00e4":29,"\u0101":29,"\u0103":29,"\u00e5":29,"\u01fb":29,"\u0105":29,"\u00e6":29,"\u01fd":29,"o":40,"\u00f2":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"\u00f6":40,"\u014d":40,"\u014f":40,"\u0151":40,"\u00f8":40,"\u01ff":40,"\u0153":40,"A":50,"\u00c0":50,"\u00c1":50,"\u00c2":50,"\u00c3":50,"\u00c4":50,"\u0100":50,"\u0102":50,"\u00c5":50,"\u01fa":50,"\u0104":50,"\u00c6":50,"\u01fc":50,"O":13,"\u00d2":13,"\u00d3":13,"\u00d4":13,"\u00d5":13,"\u00d6":13,"\u014c":13,"\u014e":13,"\u0150":13,"\u00d8":13,"\u01fe":13,"\u0152":13,"u":13,"\u00f9":13,"\u00fa":13,"\u00fb":13,"\u0169":13,"\u00fc":13,"\u016b":13,"\u016d":13,"\u016f":13,"\u0171":13,"\u0173":13}},"U":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126","w":641,"k":{"a":16,"\u00e0":16,"\u00e1":16,"\u00e2":16,"\u00e3":16,"\u00e4":16,"\u0101":16,"\u0103":16,"\u00e5":16,"\u01fb":16,"\u0105":16,"\u00e6":16,"\u01fd":16}},"V":{"d":"599,-551v-44,-1,-68,-1,-80,39r-158,512r-118,0r-155,-523v-10,-34,-30,-27,-64,-28r0,-65r230,0r0,65r-61,0r118,413r126,-413r-64,0r0,-65r226,0r0,65","w":599,"k":{"y":37,"A":72,"\u00c0":72,"\u00c1":72,"\u00c2":72,"\u00c3":72,"\u00c4":72,"\u0100":72,"\u0102":72,"\u00c5":72,"\u01fa":72,"\u0104":72,"\u00c6":72,"\u01fc":72,"a":45,"\u00e0":45,"\u00e1":45,"\u00e2":45,"\u00e3":45,"\u00e4":45,"\u0101":45,"\u0103":45,"\u00e5":45,"\u01fb":45,"\u0105":45,"\u00e6":45,"\u01fd":45,"e":48,"\u00e8":48,"\u00e9":48,"\u00ea":48,"\u011b":48,"\u00eb":48,"\u0113":48,"\u0115":48,"\u0117":48,"\u0119":48,"o":50,"\u00f2":50,"\u00f3":50,"\u00f4":50,"\u00f5":50,"\u00f6":50,"\u014d":50,"\u014f":50,"\u0151":50,"\u00f8":50,"\u01ff":50,"\u0153":50,"u":21,"\u00f9":21,"\u00fa":21,"\u00fb":21,"\u0169":21,"\u00fc":21,"\u016b":21,"\u016d":21,"\u016f":21,"\u0171":21,"\u0173":21,"O":38,"\u00d2":38,"\u00d3":38,"\u00d4":38,"\u00d5":38,"\u00d6":38,"\u014c":38,"\u014e":38,"\u0150":38,"\u00d8":38,"\u01fe":38,"\u0152":38}},"W":{"d":"868,-551v-45,-2,-74,0,-84,40r-132,511r-102,0r-108,-387r-112,387r-102,0r-136,-520v-10,-37,-34,-30,-72,-31r0,-65r227,0r0,65r-51,0r98,393r131,-458r57,0r126,458r99,-393r-52,0r0,-65r213,0r0,65","w":883,"k":{"y":35,"e":58,"\u00e8":58,"\u00e9":58,"\u00ea":58,"\u011b":58,"\u00eb":58,"\u0113":58,"\u0115":58,"\u0117":58,"\u0119":58,"a":45,"\u00e0":45,"\u00e1":45,"\u00e2":45,"\u00e3":45,"\u00e4":45,"\u0101":45,"\u0103":45,"\u00e5":45,"\u01fb":45,"\u0105":45,"\u00e6":45,"\u01fd":45,"o":61,"\u00f2":61,"\u00f3":61,"\u00f4":61,"\u00f5":61,"\u00f6":61,"\u014d":61,"\u014f":61,"\u0151":61,"\u00f8":61,"\u01ff":61,"\u0153":61,"A":76,"\u00c0":76,"\u00c1":76,"\u00c2":76,"\u00c3":76,"\u00c4":76,"\u0100":76,"\u0102":76,"\u00c5":76,"\u01fa":76,"\u0104":76,"\u00c6":76,"\u01fc":76,"O":35,"\u00d2":35,"\u00d3":35,"\u00d4":35,"\u00d5":35,"\u00d6":35,"\u014c":35,"\u014e":35,"\u0150":35,"\u00d8":35,"\u01fe":35,"\u0152":35,"u":53,"\u00f9":53,"\u00fa":53,"\u00fb":53,"\u0169":53,"\u00fc":53,"\u016b":53,"\u016d":53,"\u016f":53,"\u0171":53,"\u0173":53,"i":13,"\u0131":13,"\u00ec":13,"\u00ed":13,"\u00ee":13,"\u0129":13,"\u00ef":13,"\u012b":13,"\u012d":13,"\u012f":13,"\u0133":13,"r":21,"\u0155":21,"\u0159":21,"\u0157":21}},"X":{"d":"602,0r-242,0r0,-65r61,0r-111,-170r-102,170r59,0r0,65r-245,0r0,-65v49,2,75,-4,96,-38r135,-216r-136,-200v-14,-27,-45,-34,-90,-32r0,-65r235,0r0,65r-53,0r110,163r96,-163r-55,0r0,-65r238,0r0,65v-52,-1,-75,-1,-100,39r-124,201r145,215v18,27,43,33,83,31r0,65","w":622,"k":{"v":27,"e":19,"\u00e8":19,"\u00e9":19,"\u00ea":19,"\u011b":19,"\u00eb":19,"\u0113":19,"\u0115":19,"\u0117":19,"\u0119":19,"o":13,"\u00f2":13,"\u00f3":13,"\u00f4":13,"\u00f5":13,"\u00f6":13,"\u014d":13,"\u014f":13,"\u0151":13,"\u00f8":13,"\u01ff":13,"\u0153":13,"O":41,"\u00d2":41,"\u00d3":41,"\u00d4":41,"\u00d5":41,"\u00d6":41,"\u014c":41,"\u014e":41,"\u0150":41,"\u00d8":41,"\u01fe":41,"\u0152":41}},"Y":{"d":"586,-551v-47,-1,-67,1,-87,39r-145,276r0,147v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-171r-149,-283v-13,-29,-40,-34,-81,-32r0,-65r237,0r0,65r-55,0r115,227r116,-227r-54,0r0,-65r207,0r0,65","w":601,"k":{"s":50,"y":66,"e":90,"\u00e8":90,"\u00e9":90,"\u00ea":90,"\u011b":90,"\u00eb":90,"\u0113":90,"\u0115":90,"\u0117":90,"\u0119":90,"a":70,"\u00e0":70,"\u00e1":70,"\u00e2":70,"\u00e3":70,"\u00e4":70,"\u0101":70,"\u0103":70,"\u00e5":70,"\u01fb":70,"\u0105":70,"\u00e6":70,"\u01fd":70,"o":85,"\u00f2":85,"\u00f3":85,"\u00f4":85,"\u00f5":85,"\u00f6":85,"\u014d":85,"\u014f":85,"\u0151":85,"\u00f8":85,"\u01ff":85,"\u0153":85,"A":70,"\u00c0":70,"\u00c1":70,"\u00c2":70,"\u00c3":70,"\u00c4":70,"\u0100":70,"\u0102":70,"\u00c5":70,"\u01fa":70,"\u0104":70,"\u00c6":70,"\u01fc":70,"O":44,"\u00d2":44,"\u00d3":44,"\u00d4":44,"\u00d5":44,"\u00d6":44,"\u014c":44,"\u014e":44,"\u0150":44,"\u00d8":44,"\u01fe":44,"\u0152":44,"u":50,"\u00f9":50,"\u00fa":50,"\u00fb":50,"\u0169":50,"\u00fc":50,"\u016b":50,"\u016d":50,"\u016f":50,"\u0171":50,"\u0173":50,"r":45,"\u0155":45,"\u0159":45,"\u0157":45}},"Z":{"d":"495,0r-438,0v-1,-66,-1,-58,49,-140r248,-404r-186,0v-23,0,-29,5,-32,23r-13,73r-59,0r0,-168r423,0v3,60,-7,72,-44,132r-253,412r203,0v46,1,31,-61,43,-94r59,0r0,166","w":537},"a":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35","w":465},"b":{"d":"303,-471v120,0,172,105,171,239v-2,148,-55,243,-192,245v-63,1,-100,-24,-120,-49v-13,49,-76,33,-131,36r0,-58v28,-1,62,7,62,-24r0,-541r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,240v32,-27,69,-45,116,-45xm187,-172v-4,73,25,114,84,114v86,0,103,-80,103,-174v0,-82,-19,-159,-92,-159v-29,0,-62,12,-95,36r0,183","w":514},"c":{"d":"392,-54v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240v0,-127,66,-244,203,-244v45,0,78,16,96,41r3,-28r53,0r0,174v-25,-1,-55,7,-57,-19v-3,-56,-29,-97,-86,-97v-75,0,-112,73,-112,172v0,179,132,207,226,129","w":430},"d":{"d":"39,-222v0,-147,69,-249,194,-249v42,0,74,13,95,27r0,-179r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,585v-2,30,35,22,62,23r0,58v-56,-3,-127,14,-143,-30v-27,24,-73,43,-116,43v-121,0,-186,-93,-186,-235xm328,-89r0,-285v-15,-11,-48,-22,-79,-22v-93,0,-110,102,-110,174v0,153,97,200,189,133","w":508},"e":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0","w":455,"k":{"v":10}},"f":{"d":"309,-601v-50,-27,-141,-38,-141,44v0,28,11,74,19,99r90,0r12,59r-99,0r0,319v-2,33,42,19,70,22r0,58r-216,0r0,-58r52,0r0,-341r-67,0r0,-59r63,0v-11,-28,-19,-72,-19,-103v0,-125,152,-158,236,-103r0,63","w":304},"g":{"d":"455,71v0,70,-54,154,-215,154v-211,0,-264,-155,-159,-264v-24,-46,-1,-99,34,-124v-36,-29,-56,-75,-56,-134v-2,-126,96,-191,227,-170v19,-41,64,-62,108,-62v44,0,36,24,36,59v-38,0,-71,3,-94,20v52,27,82,80,82,153v0,139,-128,203,-258,160v-28,42,-6,77,66,73v124,-7,229,5,229,135xm319,-297v0,-58,-14,-118,-80,-118v-66,0,-80,60,-80,118v0,58,14,117,80,117v66,0,80,-59,80,-117xm372,86v0,-100,-186,-37,-250,-82v-37,89,4,157,120,157v93,0,130,-36,130,-75","w":477},"h":{"d":"331,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,52,25r0,58r-198,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,6,24,23r0,254v37,-36,90,-59,144,-59","w":540,"k":{"v":9}},"i":{"d":"200,-588v0,31,-26,56,-57,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,57,25,57,56xm245,0r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,53,25r0,58","w":283,"k":{"v":7}},"j":{"d":"139,-644v31,0,57,25,57,56v0,31,-26,56,-57,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56xm192,27v7,107,-43,170,-137,168v-29,0,-58,-8,-81,-18r0,-62v66,20,124,19,124,-83r0,-431r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,469","w":271},"k":{"d":"485,0r-195,0r0,-58r35,0r-94,-186r-45,43r0,121v-3,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,369v49,-49,119,-104,153,-161r111,0r0,60v-37,1,-57,-3,-80,19r-71,69r113,222v13,29,35,32,73,30r0,58","w":489},"l":{"d":"240,0r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,583v-3,29,26,25,53,25r0,58","w":276},"m":{"d":"584,-471v87,-2,119,60,119,145r0,246v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v0,-41,-13,-67,-51,-67v-40,0,-83,24,-111,46r0,260v-2,30,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-264v0,-41,-13,-67,-51,-67v-41,0,-84,25,-110,45r0,261v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v59,-68,215,-89,245,9v47,-48,103,-68,147,-68","w":794,"k":{"v":22}},"n":{"d":"336,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v37,-36,90,-59,144,-59","w":545,"k":{"v":16}},"o":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171","w":478,"k":{"v":13}},"p":{"d":"476,-233v0,151,-64,246,-183,246v-44,0,-79,-12,-106,-35r0,169v0,45,-18,76,-73,76r-80,0r0,-61v28,-1,59,7,59,-25r0,-536r-55,0r-12,-59v53,0,105,-7,137,-7v24,0,25,18,24,42v140,-114,289,-16,289,190xm376,-234v0,-65,-15,-157,-99,-157v-31,0,-61,14,-90,41r0,192v0,67,40,99,86,99v67,0,103,-45,103,-175","w":514},"q":{"d":"490,-399r-68,0r0,538v-2,30,34,22,61,23r0,61r-84,0v-50,0,-71,-25,-71,-73r0,-167v-24,16,-64,30,-103,30v-112,0,-186,-83,-186,-232v0,-173,100,-252,195,-252v38,0,74,15,94,31v-1,-18,8,-25,25,-25v32,0,72,7,125,7xm328,-87r0,-280v-92,-69,-189,-10,-189,145v0,99,37,163,107,163v29,0,60,-12,82,-28","w":513},"r":{"d":"343,-389v-70,-11,-127,19,-151,49r0,257v-2,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v30,0,24,30,24,57v39,-38,65,-63,122,-63v38,0,28,47,29,82","w":353,"k":{"g":3,"s":7,"e":7,"\u00e8":7,"\u00e9":7,"\u00ea":7,"\u011b":7,"\u00eb":7,"\u0113":7,"\u0115":7,"\u0117":7,"\u0119":7,"a":10,"\u00e0":10,"\u00e1":10,"\u00e2":10,"\u00e3":10,"\u00e4":10,"\u0101":10,"\u0103":10,"\u00e5":10,"\u01fb":10,"\u0105":10,"\u00e6":10,"\u01fd":10,"o":7,"\u00f2":7,"\u00f3":7,"\u00f4":7,"\u00f5":7,"\u00f6":7,"\u014d":7,"\u014f":7,"\u0151":7,"\u00f8":7,"\u01ff":7,"\u0153":7}},"s":{"d":"375,-119v0,69,-54,132,-154,132v-47,0,-91,-17,-113,-41r-3,28r-53,0r0,-174v25,0,55,-5,57,19v4,60,36,102,97,101v53,0,78,-28,78,-58v0,-54,-81,-74,-128,-93v-73,-29,-103,-74,-103,-136v0,-77,61,-130,144,-130v50,0,86,18,101,38r4,-25r53,0r0,169v-25,0,-52,5,-55,-19v-6,-56,-33,-101,-90,-100v-45,0,-68,25,-68,59v0,51,82,76,127,95v74,32,106,70,106,135","w":410},"t":{"d":"214,12v-93,2,-137,-60,-137,-168r0,-243r-57,0r0,-59r57,0v4,-34,-13,-95,18,-101r74,-13r0,114r91,0r12,59r-101,0r0,248v-4,102,57,103,124,83r0,62v-23,10,-52,18,-81,18","w":324,"k":{"y":10,"w":3,"t":7,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7,"e":10,"\u00e8":10,"\u00e9":10,"\u00ea":10,"\u011b":10,"\u00eb":10,"\u0113":10,"\u0115":10,"\u0117":10,"\u0119":10,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":7,"\u00f9":7,"\u00fa":7,"\u00fb":7,"\u0169":7,"\u00fc":7,"\u016b":7,"\u016d":7,"\u016f":7,"\u0171":7,"\u0173":7}},"u":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65","w":543,"k":{"v":10}},"v":{"d":"471,-399v-35,1,-55,-6,-67,27r-132,372r-86,0r-135,-399r-49,0r0,-59r207,0r0,59v-29,-2,-59,-3,-48,34r77,269r101,-303r-59,0r0,-59r179,0","w":467,"k":{"w":-14,"v":-14,"a":8,"\u00e0":8,"\u00e1":8,"\u00e2":8,"\u00e3":8,"\u00e4":8,"\u0101":8,"\u0103":8,"\u00e5":8,"\u01fb":8,"\u0105":8,"\u00e6":8,"\u01fd":8,"e":13,"\u00e8":13,"\u00e9":13,"\u00ea":13,"\u011b":13,"\u00eb":13,"\u0113":13,"\u0115":13,"\u0117":13,"\u0119":13,"o":17,"\u00f2":17,"\u00f3":17,"\u00f4":17,"\u00f5":17,"\u00f6":17,"\u014d":17,"\u014f":17,"\u0151":17,"\u00f8":17,"\u01ff":17,"\u0153":17}},"w":{"d":"674,-399v0,0,-56,-4,-66,30r-107,369r-90,0r-79,-285r-76,285r-90,0r-114,-399r-50,0r0,-59r198,0r0,59v-28,-2,-57,-3,-48,31r67,253r90,-343r63,0r89,335r77,-276r-60,0r0,-59r184,0","w":670,"k":{"g":20,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7}},"x":{"d":"503,0r-219,0r0,-58v22,1,62,2,40,-22r-68,-80r-77,102r45,0r0,58r-202,0r0,-58v43,3,69,-8,87,-32r101,-133r-149,-176r-51,0r0,-59r222,0r0,59v-23,-1,-67,-3,-44,24r66,77r76,-101r-41,0r0,-59r190,0r12,59v-43,2,-61,-7,-87,26r-106,136r154,179r51,0r0,58","w":513},"y":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-50,0r0,-59r193,0r12,59v-31,1,-61,-7,-61,30r0,398v0,108,-64,196,-216,196v-30,0,-73,-6,-105,-14r0,-73v31,9,72,16,108,16v131,0,120,-88,119,-197v-38,33,-88,56,-144,56","w":538},"z":{"d":"385,-458v2,46,-5,64,-29,98r-208,298r141,0v38,0,26,-47,37,-74r58,0r0,136r-346,0v-2,-42,4,-63,23,-91r212,-305r-134,0v-33,-4,-30,49,-38,74r-58,0r0,-136r342,0","w":420},"&":{"d":"628,0v-95,6,-178,-6,-200,-78v-36,57,-109,89,-175,89v-133,0,-205,-81,-205,-191v0,-91,57,-153,126,-173v-51,-20,-77,-74,-77,-122v0,-88,66,-153,204,-153v153,-1,209,91,205,250v31,5,91,-15,91,21r0,48r-91,0r0,111v2,104,32,143,122,134r0,64xm279,-68v162,0,125,-179,125,-331v0,-78,-12,-162,-108,-162v-63,0,-96,36,-96,85v0,65,45,106,121,98r0,69v-96,-7,-156,30,-157,122v0,70,40,119,115,119","w":652},"@":{"d":"676,-354v0,96,-45,220,-161,220v-38,0,-69,-17,-78,-64v-17,41,-67,63,-109,63v-85,0,-130,-70,-130,-149v0,-112,72,-191,180,-191v45,0,97,21,125,40r-12,187v-3,40,13,56,29,56v65,0,79,-125,79,-169v0,-110,-78,-204,-220,-204v-153,0,-270,113,-270,273v0,152,87,247,241,247v81,0,144,-24,184,-48r18,25v-31,31,-118,79,-222,79v-190,0,-296,-132,-296,-292v0,-205,143,-347,357,-347v173,0,285,117,285,274xm423,-404v-9,-5,-26,-9,-40,-9v-74,0,-104,65,-104,127v0,43,20,86,69,86v88,0,64,-123,75,-204","w":710},"!":{"d":"174,-558v0,30,-29,319,-29,366r-47,0v0,-48,-29,-338,-29,-366v0,-40,17,-69,53,-69v35,0,52,23,52,69xm179,-45v0,31,-27,56,-58,56v-31,0,-57,-25,-57,-56v0,-31,26,-56,57,-56v31,0,58,25,58,56","w":243},"\u00a1":{"d":"174,-59v0,46,-17,69,-52,69v-36,0,-53,-29,-53,-69v0,-28,29,-318,29,-366r47,0v0,47,29,336,29,366xm179,-572v0,31,-27,56,-58,56v-31,0,-57,-25,-57,-56v0,-31,26,-56,57,-56v31,0,58,25,58,56","w":243},"?":{"d":"312,-482v0,100,-109,176,-138,290r-49,0v6,-125,86,-182,86,-282v0,-99,-105,-84,-175,-59r0,-74v123,-45,276,-23,276,125xm210,-45v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":363},"\u00bf":{"d":"51,-136v0,-100,109,-176,138,-290r49,0v-6,125,-86,182,-86,282v0,99,105,84,175,59r0,74v-123,45,-276,23,-276,-125xm153,-573v0,-31,27,-56,58,-56v31,0,56,25,56,56v0,31,-25,56,-56,56v-31,0,-58,-25,-58,-56","w":363},"*":{"d":"322,-453v45,29,-2,97,-43,70v-20,-12,-56,-60,-81,-86v9,35,32,91,32,114v0,29,-21,37,-41,37v-22,0,-41,-8,-41,-37v0,-23,22,-78,32,-113v-25,26,-61,73,-81,85v-25,15,-42,2,-53,-16v-10,-17,-15,-39,10,-54v20,-12,83,-21,118,-31v-53,-17,-164,-19,-128,-87v9,-17,28,-31,53,-16v20,12,56,60,81,86v-9,-35,-32,-91,-32,-114v0,-29,19,-37,41,-37v20,0,41,8,41,37v0,24,-24,81,-33,116v25,-26,62,-76,82,-88v25,-15,43,-1,53,16v11,18,14,39,-11,54v-21,12,-81,23,-116,33v35,10,97,19,117,31","w":379},".":{"d":"144,-46v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":164},",":{"d":"145,-33v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63","w":165},":":{"d":"144,-313v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56xm144,-45v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":174},";":{"d":"144,-313v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56xm146,-33v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63","w":176},"\u2026":{"d":"551,-43v0,31,-27,56,-58,56v-31,0,-57,-25,-57,-56v0,-31,26,-56,57,-56v31,0,58,25,58,56xm347,-43v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56xm145,-43v0,31,-27,56,-58,56v-31,0,-57,-25,-57,-56v0,-31,26,-56,57,-56v31,0,58,25,58,56","w":571},"\u00b7":{"d":"144,-253v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":174},"\u2022":{"d":"288,-319v0,63,-51,114,-114,114v-63,0,-114,-51,-114,-114v0,-63,51,-114,114,-114v63,0,114,51,114,114","w":348},"\/":{"d":"392,-683r-315,744r-80,0r316,-744r79,0","w":389},"(":{"d":"295,171r-22,35v-120,-52,-209,-230,-209,-445v0,-215,89,-391,209,-443r22,35v-81,55,-120,204,-120,409v0,205,39,354,120,409","w":299},"\u00a6":{"d":"139,-334r-79,0r0,-346r79,0r0,346xm139,200r-79,0r0,-346r79,0r0,346","w":199},")":{"d":"235,-239v0,215,-89,393,-209,445r-22,-35v81,-55,120,-204,120,-409v0,-205,-39,-354,-120,-409r22,-35v120,52,209,228,209,443","w":299},"[":{"d":"310,193r-226,0r0,-875r226,0r0,76r-107,0v-15,0,-19,11,-19,23r0,680v0,11,5,20,18,20r108,0r0,76","w":280},"\\":{"d":"345,61r-79,0r-316,-744r79,0","w":314},"]":{"d":"196,193r-226,0r0,-76r108,0v13,0,18,-9,18,-20r0,-680v0,-12,-4,-23,-19,-23r-107,0r0,-76r226,0r0,875","w":280},"{":{"d":"318,225v-138,0,-176,-65,-176,-202v0,-96,34,-228,-107,-239r0,-25v141,-11,107,-143,107,-239v0,-137,38,-202,176,-202r0,55v-48,0,-73,18,-73,68v0,40,12,80,12,121v0,115,-19,186,-120,209v141,22,108,190,108,331v0,50,25,68,73,68r0,55","w":326},"|":{"d":"137,260r-77,0r0,-1000r77,0r0,1000","w":197},"}":{"d":"291,-216v-141,11,-107,143,-107,239v0,137,-38,202,-176,202r0,-55v48,0,73,-18,73,-68v0,-40,-12,-80,-12,-121v0,-115,19,-187,120,-210v-141,-21,-108,-192,-108,-330v0,-50,-25,-68,-73,-68r0,-55v138,0,176,65,176,202v0,96,-34,228,107,239r0,25","w":326},"-":{"d":"262,-212r-214,0r0,-74r214,0r0,74","w":310},"\u00ad":{"d":"262,-212r-214,0r0,-74r214,0r0,74","w":310},"\u2013":{"d":"500,-214r-500,0r0,-70r500,0r0,70","w":500},"\u2014":{"d":"1000,-214r-1000,0r0,-70r1000,0r0,70","w":1000},"_":{"d":"366,78r-366,0r0,-52r366,0r0,52","w":366},"\u2020":{"d":"482,-398v0,29,-18,48,-58,48v-34,0,-111,-26,-157,-35v2,174,33,486,33,522v0,40,-18,57,-47,57v-30,0,-48,-17,-48,-57v0,-36,31,-351,33,-521v-46,9,-123,34,-156,34v-40,0,-58,-19,-58,-48v0,-30,18,-48,58,-48v33,0,107,23,154,33v-9,-47,-31,-124,-31,-158v0,-40,18,-57,48,-57v29,0,47,17,47,57v0,34,-22,112,-31,158v47,-10,122,-33,155,-33v40,0,58,18,58,48"},"\u2021":{"d":"482,-31v0,36,-30,48,-61,48v-50,0,-105,-25,-155,-35v10,49,34,104,34,154v0,31,-11,60,-47,60v-36,0,-48,-28,-48,-60v0,-50,23,-104,33,-153v-49,10,-103,34,-153,34v-31,0,-61,-12,-61,-48v0,-36,30,-48,61,-48v50,0,105,23,154,33v-10,-55,-25,-114,-25,-170v0,-56,14,-114,24,-168v-49,10,-103,34,-153,34v-31,0,-61,-12,-61,-48v0,-36,30,-48,61,-48v50,0,105,23,154,33v-10,-50,-34,-104,-34,-155v0,-32,12,-60,48,-60v36,0,47,29,47,60v0,51,-24,106,-34,156v50,-10,104,-34,155,-34v31,0,61,12,61,48v0,36,-30,48,-61,48v-50,0,-105,-25,-155,-35v10,56,25,112,25,169v0,58,-15,114,-25,171v50,-10,104,-34,155,-34v31,0,61,12,61,48"},"\u00a7":{"d":"424,-220v0,52,-33,110,-91,129v49,28,87,74,87,146v0,71,-55,138,-154,138v-39,0,-85,-14,-107,-40v-2,11,-3,27,-3,27r-53,0r0,-174v25,0,54,-5,57,19v6,57,32,100,91,100v50,0,76,-30,76,-63v0,-119,-245,-98,-245,-277v0,-61,37,-110,90,-130v-48,-29,-87,-75,-87,-145v0,-133,179,-178,261,-98v2,-11,3,-27,3,-27r53,0r0,174v-25,0,-54,5,-57,-19v-6,-57,-32,-100,-91,-100v-50,0,-76,30,-76,63v0,115,246,103,246,277xm333,-210v0,-48,-50,-75,-90,-93v-27,5,-70,32,-70,79v0,48,50,74,90,92v27,-10,70,-31,70,-78"},"\u00b6":{"d":"484,-541r-67,0r0,766r-73,0r0,-766r-64,0r0,766r-73,0r0,-513v-88,0,-159,-71,-159,-159v0,-88,71,-158,159,-158r277,0r0,64","w":521},"\u00ae":{"d":"674,-309v0,176,-143,319,-319,319v-176,0,-319,-143,-319,-319v0,-176,143,-319,319,-319v176,0,319,143,319,319xm629,-309v0,-154,-121,-280,-274,-280v-153,0,-274,126,-274,280v0,154,121,280,274,280v153,0,274,-126,274,-280xm523,-123r-93,0r-84,-149r-46,0r0,95v-1,19,20,15,37,15r0,39r-137,0r0,-39r31,0r0,-277v1,-17,-16,-15,-32,-15r0,-39r145,0v96,0,142,37,142,109v0,47,-25,86,-72,103r57,100v8,17,26,21,52,19r0,39xm418,-385v0,-35,-14,-69,-84,-69r-34,0r0,141v72,6,118,-15,118,-72","w":710},"\u00a9":{"d":"674,-309v0,176,-143,319,-319,319v-176,0,-319,-143,-319,-319v0,-176,143,-319,319,-319v176,0,319,143,319,319xm629,-309v0,-154,-121,-280,-274,-280v-153,0,-274,126,-274,280v0,154,121,280,274,280v153,0,274,-126,274,-280xm476,-161v-25,25,-69,48,-118,48v-100,0,-153,-87,-153,-191v0,-131,66,-192,149,-192v34,0,63,13,78,28r3,-21r31,0r0,128v-27,5,-37,-8,-39,-34v-3,-31,-30,-54,-66,-54v-53,0,-90,45,-90,138v0,92,34,147,103,147v34,0,66,-16,84,-29","w":710},"\u2122":{"d":"596,-339r-94,0r0,-29r25,0r0,-145r-73,174r-32,0r-74,-174r0,134v-1,12,14,12,26,11r0,29r-88,0r0,-29r24,0r0,-208v2,-13,-15,-11,-28,-11r0,-29r67,0r94,222r93,-222r58,0r0,29r-24,0r0,208v0,13,14,11,26,11r0,29xm250,-530v-12,0,-24,3,-26,-9v-4,-23,-1,-55,-35,-48r-26,0r0,208v0,15,15,10,28,11r0,29r-102,0r0,-29r27,0r0,-219v-24,2,-53,-8,-56,17v-3,19,1,46,-30,40r1,-86r218,0","w":626},"\u201c":{"d":"286,-512v0,32,-24,54,-55,54v-34,0,-60,-23,-60,-63v0,-48,24,-106,73,-180r34,17v-18,36,-37,93,-41,120v31,4,49,28,49,52xm135,-512v0,32,-24,54,-55,54v-34,0,-60,-23,-60,-63v0,-48,24,-106,73,-180r34,17v-18,36,-37,93,-41,120v31,4,49,28,49,52","w":316},"\u201d":{"d":"296,-638v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63xm145,-638v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63","w":316},"\u2018":{"d":"135,-512v0,32,-24,54,-55,54v-34,0,-60,-23,-60,-63v0,-48,24,-106,73,-180r34,17v-18,36,-37,93,-41,120v31,4,49,28,49,52","w":165},"\u2019":{"d":"145,-638v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63","w":165},"\u00ab":{"d":"355,-120r-14,52r-126,-145v-23,-18,-18,-40,0,-62r121,-145r15,51r-71,124xm184,-120r-14,52r-126,-145v-23,-18,-18,-40,0,-62r121,-145r15,51r-71,124","w":400},"\u00bb":{"d":"356,-275v21,18,19,40,0,62r-126,145r-14,-52r75,-125r-71,-124r15,-51xm185,-275v21,18,19,40,0,62r-126,145r-14,-52r75,-125r-71,-124r15,-51","w":400},"\u2039":{"d":"184,-120r-14,52r-126,-145v-23,-18,-18,-40,0,-62r121,-145r15,51r-71,124","w":229},"\u203a":{"d":"185,-275v21,18,19,40,0,62r-126,145r-14,-52r75,-125r-71,-124r15,-51","w":229},"\u201a":{"d":"145,-33v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63","w":165},"\u201e":{"d":"296,-33v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63xm145,-33v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63","w":316},"\u00aa":{"d":"188,-500v4,-52,-14,-82,-58,-81v-29,0,-60,8,-87,22r0,-46v22,-10,53,-23,94,-23v67,0,117,23,117,113r0,159v-1,23,23,16,42,17r0,41v-41,-2,-87,9,-99,-24v-15,16,-43,33,-78,33v-62,0,-101,-36,-101,-98v0,-83,83,-113,170,-113xm188,-364r0,-96v-69,1,-102,22,-102,67v0,58,76,68,102,29","w":293},"\u00ba":{"d":"282,-462v0,91,-39,171,-141,171v-102,0,-139,-75,-139,-167v0,-92,39,-170,141,-170v102,0,139,74,139,166xm212,-460v0,-46,-7,-118,-69,-118v-64,0,-71,71,-71,119v0,46,7,117,69,117v64,0,71,-70,71,-118","w":284},"0":{"d":"456,-308v0,203,-61,319,-203,319v-142,0,-203,-116,-203,-319v0,-203,61,-320,203,-320v142,0,203,117,203,320xm346,-308v0,-175,-14,-246,-93,-246v-79,0,-93,71,-93,246v0,175,14,245,93,245v79,0,93,-70,93,-245"},"1":{"d":"388,0r-241,0r0,-63r68,0r0,-438r-88,0r-9,-62v58,-6,116,-28,146,-53r53,0r0,529v-2,33,41,22,71,24r0,63"},"2":{"d":"330,-453v0,-112,-131,-106,-223,-75r-16,-74v51,-17,105,-26,152,-26v125,0,194,63,194,169v0,78,-52,142,-145,224v-79,70,-111,114,-120,158r174,0r23,-92v3,-27,40,-17,68,-19r-17,188r-350,0v-6,-131,55,-200,134,-275v86,-82,126,-123,126,-178"},"3":{"d":"440,-190v0,107,-77,201,-212,201v-58,0,-115,-16,-161,-46r26,-75v38,25,85,40,124,40v78,0,117,-58,117,-118v0,-77,-58,-97,-118,-102r0,-69v71,-7,107,-50,107,-101v0,-105,-126,-100,-207,-67r-21,-72v40,-17,99,-29,150,-29v108,0,181,60,181,152v0,61,-35,115,-92,137v78,25,106,79,106,149"},"4":{"d":"484,-163r-111,0v5,36,-17,101,25,100r38,0r0,63r-226,0r0,-63r63,0r0,-100r-251,0r0,-64r265,-389r86,0r0,366r111,0r0,87xm273,-250r0,-232r-154,232r154,0"},"5":{"d":"271,-421v108,0,172,82,170,208v-2,119,-77,225,-209,224v-68,0,-119,-19,-166,-49r29,-72v35,22,74,40,118,40v84,0,120,-66,120,-144v0,-77,-42,-136,-101,-135v-37,0,-67,19,-89,44r-49,-21r0,-291r306,0r0,80r-231,0r0,152v27,-21,62,-36,102,-36"},"6":{"d":"457,-220v0,124,-84,231,-217,231v-126,0,-191,-90,-191,-280v-1,-230,159,-417,373,-341r-19,66v-125,-42,-210,21,-240,173v41,-36,92,-49,129,-49v124,0,165,95,165,200xm353,-220v0,-83,-22,-128,-84,-128v-38,0,-78,20,-114,51v-5,117,11,235,96,235v67,0,102,-78,102,-158"},"7":{"d":"447,-557v-72,182,-158,330,-190,557r-99,0v31,-229,114,-363,188,-539r-197,0r-21,82v-3,27,-41,17,-69,19r16,-178r372,0r0,59"},"8":{"d":"335,-333v62,26,124,72,124,156v0,98,-65,188,-206,188v-123,0,-206,-71,-206,-177v0,-68,39,-131,107,-159v-44,-31,-79,-72,-80,-143v0,-109,93,-160,179,-160v118,0,178,68,178,156v0,70,-46,113,-96,139xm335,-475v0,-51,-33,-81,-80,-81v-51,0,-81,36,-81,81v0,56,39,82,90,107v47,-25,71,-70,71,-107xm350,-165v0,-71,-78,-90,-131,-122v-40,26,-65,67,-65,119v0,59,40,104,99,104v67,0,97,-50,97,-101"},"9":{"d":"457,-347v0,218,-151,415,-380,340r19,-67v58,22,132,17,175,-24v33,-32,59,-80,72,-148v-41,36,-92,49,-129,49v-124,0,-165,-95,-165,-200v0,-131,90,-231,217,-231v126,0,191,91,191,281xm351,-320v5,-117,-11,-235,-96,-235v-62,0,-102,69,-102,158v0,83,22,128,84,128v38,0,78,-20,114,-51"},"$":{"d":"224,-259v-103,-35,-177,-96,-177,-194v0,-108,83,-168,177,-174r0,-71r54,0r0,73v41,6,74,23,94,48r8,-39r50,0r0,211v-31,-1,-59,7,-64,-24v-10,-60,-37,-113,-88,-119r0,187v124,50,181,95,181,196v0,86,-57,166,-181,174r0,74r-54,0r0,-75v-43,-5,-84,-21,-110,-51r-7,43r-51,0r0,-214v29,1,58,-8,61,24v6,67,46,111,107,119r0,-188xm224,-385r0,-162v-42,8,-70,35,-70,76v0,34,21,60,70,86xm278,-73v97,-25,90,-127,0,-162r0,162"},"\u00a2":{"d":"75,-227v0,-125,63,-233,182,-243r0,-88r54,0r0,90v28,6,49,20,63,38r3,-28r53,0r0,174v-25,-1,-55,7,-57,-19v-3,-48,-20,-85,-62,-94r0,339v35,-4,66,-21,90,-41r30,45v-30,31,-71,56,-120,64r0,79r-54,0r0,-77v-131,-8,-182,-113,-182,-239xm257,-63r0,-333v-55,17,-82,83,-82,168v0,94,34,148,82,165"},"\u20ac":{"d":"496,-69v-31,37,-108,80,-184,80v-117,0,-198,-81,-227,-216r-75,0r0,-64r65,0r-1,-57r-64,0r0,-64r70,0v23,-162,114,-238,226,-238v53,0,96,18,121,47r5,-35r48,0r0,213v-28,-1,-55,7,-56,-24v-4,-72,-38,-123,-108,-122v-69,0,-119,54,-134,159r156,0r0,64r-161,0v-2,16,-1,42,2,57r159,0r0,64r-147,0v23,90,71,131,146,131v53,0,104,-27,131,-48"},"\u0192":{"d":"523,-675r-18,62v-96,-23,-126,-1,-156,140r-23,130r114,0r-11,68r-115,0r-48,278v-32,183,-111,220,-196,220v-30,0,-61,-5,-86,-16r15,-66v89,32,132,6,157,-136r49,-280r-104,0r0,-68r116,0r22,-128v32,-183,111,-220,196,-220v28,0,70,9,88,16"},"\u00a3":{"d":"445,-191r-14,191r-375,0r0,-52v36,-53,84,-147,62,-247r-79,0r0,-64r61,0v-44,-134,2,-267,164,-265v56,0,114,16,152,34r-20,77v-36,-16,-78,-27,-108,-27v-115,-2,-109,101,-80,181r108,0r16,64r-106,0v16,89,-8,167,-65,219r193,0r23,-92v3,-27,40,-17,68,-19"},"\u00a5":{"d":"536,-551v-47,-1,-67,1,-87,39r-89,170r70,0r0,68r-106,0v-9,19,-24,32,-20,63r126,0r0,68r-126,0v2,31,-10,78,25,78r38,0r0,65r-227,0r0,-65r60,0r0,-78r-136,0r0,-68r136,0v3,-31,-11,-44,-20,-63r-116,0r0,-68r80,0r-93,-177v-13,-29,-40,-34,-81,-32r0,-65r237,0r0,65r-55,0r115,227r116,-227r-54,0r0,-65r207,0r0,65"},"#":{"d":"489,-194r-131,0r-37,204r-67,0r37,-204r-118,0r-37,204r-67,0r37,-204r-89,0r0,-57r100,0r21,-117r-121,0r0,-57r132,0r37,-203r66,0r-37,203r119,0r37,-203r66,0r-37,203r89,0r0,57r-99,0r-22,117r121,0r0,57xm323,-368r-118,0r-22,117r119,0"},"%":{"d":"750,-180v0,121,-51,189,-140,189v-89,0,-141,-68,-141,-189v0,-121,52,-188,141,-188v89,0,140,67,140,188xm585,-616r-261,616r-64,0r262,-616r63,0xm366,-439v0,121,-51,189,-140,189v-89,0,-140,-68,-140,-189v0,-121,51,-189,140,-189v89,0,140,68,140,189xm673,-180v0,-104,-14,-136,-63,-136v-49,0,-64,32,-64,136v0,104,15,138,64,138v49,0,63,-34,63,-138xm290,-439v0,-104,-15,-137,-64,-137v-49,0,-64,33,-64,137v0,104,15,137,64,137v49,0,64,-33,64,-137","w":836},"\u2030":{"d":"1067,-180v0,121,-51,189,-140,189v-89,0,-141,-68,-141,-189v0,-121,52,-188,141,-188v89,0,140,67,140,188xm750,-180v0,121,-51,189,-140,189v-89,0,-141,-68,-141,-189v0,-121,52,-188,141,-188v89,0,140,67,140,188xm585,-616r-261,616r-64,0r262,-616r63,0xm366,-439v0,121,-51,189,-140,189v-89,0,-140,-68,-140,-189v0,-121,51,-189,140,-189v89,0,140,68,140,189xm990,-180v0,-104,-14,-136,-63,-136v-49,0,-64,32,-64,136v0,104,15,138,64,138v49,0,63,-34,63,-138xm673,-180v0,-104,-14,-136,-63,-136v-49,0,-64,32,-64,136v0,104,15,138,64,138v49,0,63,-34,63,-138xm290,-439v0,-104,-15,-137,-64,-137v-49,0,-64,33,-64,137v0,104,15,137,64,137v49,0,64,-33,64,-137","w":1153},"+":{"d":"413,-269r-149,0r0,149r-68,0r0,-149r-149,0r0,-68r149,0r0,-149r68,0r0,149r149,0r0,68","w":460},"\u2212":{"d":"413,-269r-366,0r0,-68r366,0r0,68","w":460},"\u00d7":{"d":"383,-198r-48,48r-105,-105r-105,105r-48,-48r105,-105r-105,-105r48,-48r105,105r105,-105r48,48r-105,105","w":460},"<":{"d":"399,-117r-337,-155r0,-62r337,-155r0,74r-255,111r255,113r0,74","w":460},"\u00f7":{"d":"292,-450v0,30,-26,54,-56,54v-30,0,-54,-24,-54,-54v0,-30,24,-54,54,-54v30,0,56,24,56,54xm413,-269r-366,0r0,-68r366,0r0,68xm292,-154v0,30,-26,54,-56,54v-30,0,-54,-24,-54,-54v0,-30,24,-54,54,-54v30,0,56,24,56,54","w":460},"=":{"d":"413,-356r-366,0r0,-68r366,0r0,68xm413,-180r-366,0r0,-68r366,0r0,68","w":460},"\u00ac":{"d":"413,-180r-69,0r0,-176r-297,0r0,-68r345,0v14,0,21,9,21,22r0,222","w":460},">":{"d":"399,-272r-337,155r0,-74r255,-113r-255,-111r0,-74r337,155r0,62","w":460},"\u2260":{"d":"413,-180r-204,0r-46,108r-72,0r46,-108r-90,0r0,-68r119,0r45,-108r-164,0r0,-68r193,0r46,-108r71,0r-46,108r102,0r0,68r-130,0r-46,108r176,0r0,68","w":460},"\u2248":{"d":"432,-407v-34,54,-85,93,-140,93v-80,0,-100,-62,-168,-62v-25,0,-59,30,-75,57r-34,-28v34,-54,85,-98,140,-98v80,0,100,62,168,62v25,0,60,-28,75,-53xm432,-237v-34,54,-85,93,-140,93v-80,0,-100,-62,-168,-62v-25,0,-59,30,-75,57r-34,-28v34,-54,85,-98,140,-98v80,0,100,62,168,62v25,0,60,-28,75,-53","w":446},"\u00b1":{"d":"408,-269r-149,0r0,149r-68,0r0,-149r-149,0r0,-68r149,0r0,-149r68,0r0,149r149,0r0,68xm408,10r-366,0r0,-68r366,0r0,68","w":450},"\u2264":{"d":"381,-117r-337,-155r0,-62r337,-155r0,74r-255,111r255,113r0,74xm408,10r-366,0r0,-68r366,0r0,68","w":450},"\u2265":{"d":"381,-272r-337,155r0,-74r255,-113r-255,-111r0,-74r337,155r0,62xm408,10r-366,0r0,-68r366,0r0,68","w":450},"^":{"d":"408,-342r-75,0r-110,-209r-112,209r-75,0r155,-286r62,0","w":444},"~":{"d":"480,-262v-22,54,-67,102,-126,102v-98,0,-203,-136,-267,-19r-51,-48v28,-52,75,-89,122,-89v93,0,135,62,211,62v26,0,46,-21,61,-50","w":516},"\u25ca":{"d":"313,-616r275,308r-275,308r-275,-308xm313,-137r148,-171r-148,-172r-148,172","w":641},"\u00b0":{"d":"322,-475v0,95,-59,153,-151,153v-92,0,-151,-58,-151,-153v0,-95,59,-153,151,-153v92,0,151,58,151,153xm251,-475v0,-69,-33,-99,-80,-99v-47,0,-80,30,-80,99v0,69,33,99,80,99v47,0,80,-30,80,-99","w":344},"'":{"d":"159,-568v0,36,-22,150,-30,206r-43,0v-8,-54,-30,-170,-30,-206v0,-39,16,-59,52,-59v33,0,51,21,51,59","w":215},"\"":{"d":"329,-568v0,36,-22,150,-30,206r-43,0v-8,-54,-30,-170,-30,-206v0,-39,16,-59,52,-59v33,0,51,21,51,59xm159,-568v0,36,-22,150,-30,206r-43,0v-8,-54,-30,-170,-30,-206v0,-39,16,-59,52,-59v33,0,51,21,51,59","w":385},"\u221a":{"d":"501,-639r-51,0r-229,638r-42,0r-119,-365r-53,0r0,-43r119,0r93,286r201,-559r81,0r0,43","w":508},"\u00a4":{"d":"525,-174r-41,42r-67,-67v-69,49,-157,56,-234,0r-67,67r-40,-42r68,-64v-50,-66,-52,-167,0,-232r-68,-65r40,-42r67,67v82,-54,157,-52,233,0v23,-22,46,-44,68,-67r41,42r-68,65v53,74,51,161,0,232xm438,-355v0,-81,-68,-136,-137,-136v-79,0,-139,63,-139,136v0,75,63,138,138,138v76,0,138,-63,138,-138","w":612},"\u221e":{"d":"699,-258v0,112,-54,201,-162,201v-75,0,-123,-40,-166,-114v-33,52,-79,101,-155,101v-92,0,-156,-79,-156,-183v0,-105,58,-177,159,-177v76,0,120,43,151,94v44,-76,96,-115,169,-115v104,0,160,60,160,193xm636,-257v0,-66,-34,-103,-94,-103v-38,0,-74,17,-127,111v35,66,66,101,114,101v60,0,107,-39,107,-109xm327,-255v-35,-64,-65,-91,-117,-91v-60,0,-92,42,-92,94v0,56,33,95,91,95v53,0,88,-44,118,-98","w":759},"\u00b5":{"d":"510,0v-68,3,-132,2,-146,-52v-45,41,-105,74,-177,62v-5,90,27,206,-75,202r-78,0r0,-59v28,-1,59,7,59,-25r0,-527r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,304v-2,107,125,66,168,21r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-2,34,31,28,61,28r0,58","w":545},"\u2202":{"d":"466,-288v0,183,-72,299,-211,299v-133,0,-210,-102,-210,-226v0,-194,179,-272,311,-172v-9,-95,-67,-166,-223,-181r26,-60v197,0,307,130,307,340xm250,-66v72,0,116,-94,110,-243v-26,-27,-60,-46,-109,-46v-67,0,-101,55,-101,144v0,87,44,145,100,145"},"\u2211":{"d":"577,-438r-58,0r-28,-83v-6,-19,-16,-23,-39,-23r-264,0r234,328r-245,337r263,0v23,0,31,-5,38,-24r30,-82r61,0r-41,178r-478,0v11,-52,17,-72,67,-141r194,-268r-195,-269v-37,-50,-47,-74,-56,-131r492,0","w":623},"\u220f":{"d":"657,-551r-81,0r0,655v0,32,34,23,63,24r0,65r-217,0r0,-65r60,0r0,-655v0,-16,-8,-24,-25,-24r-231,0r0,655v0,32,34,23,63,24r0,65r-217,0r0,-65r60,0r0,-655v2,-36,-50,-21,-82,-24r0,-65r607,0r0,65","w":703},"\u03c0":{"d":"580,-393r-77,0r0,304v0,32,34,23,63,24r0,65r-210,0r0,-65r60,0r0,-304v0,-16,-8,-24,-25,-24r-171,0r0,304v0,32,34,23,63,24r0,65r-211,0r0,-65r60,0r0,-304v2,-35,-47,-21,-78,-24r0,-65r526,0r0,65","w":634},"\u222b":{"d":"514,-677r-12,61v-97,-21,-136,3,-160,142r-79,477v-20,170,-112,257,-275,205r7,-63v98,36,145,-26,164,-139r76,-458v27,-153,54,-239,191,-239v30,0,59,5,88,14","w":502},"\u03a9":{"d":"311,-548v-104,0,-171,81,-171,226v0,135,68,226,137,267r0,55r-194,0r0,-65r83,0v-77,-45,-136,-138,-136,-267v0,-174,121,-296,281,-296v160,0,281,122,281,296v0,129,-59,222,-136,267r83,0r0,65r-194,0r0,-55v69,-41,137,-132,137,-267v0,-145,-67,-226,-171,-226","w":622},"\u2126":{"d":"311,-548v-104,0,-171,81,-171,226v0,135,68,226,137,267r0,55r-194,0r0,-65r83,0v-77,-45,-136,-138,-136,-267v0,-174,121,-296,281,-296v160,0,281,122,281,296v0,129,-59,222,-136,267r83,0r0,65r-194,0r0,-55v69,-41,137,-132,137,-267v0,-145,-67,-226,-171,-226","w":622},"\u2206":{"d":"591,0r-553,0r258,-628r36,0xm458,-46r-173,-425r-173,425r346,0","w":607},"\u2113":{"d":"240,0r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,583v-3,29,26,25,53,25r0,58","w":276},"\u212e":{"d":"761,-301r-576,0v-3,0,-5,1,-5,5r0,174v0,8,3,15,9,21v53,57,132,93,218,93v92,0,174,-41,228,-105r52,0v-65,75,-167,124,-281,124v-196,0,-356,-142,-356,-319v0,-178,160,-320,356,-320v197,0,358,142,355,327xm631,-323r0,-176v0,-7,-4,-15,-10,-21v-108,-117,-327,-116,-432,3v-5,6,-9,14,-9,23r0,171v0,3,2,5,5,5r441,0v3,0,5,-2,5,-5","w":811},"\u2116":{"d":"625,-551r-56,0r0,551r-70,0r-297,-436r0,346v-3,27,30,26,58,25r0,65r-197,0r0,-65r56,0r0,-461v3,-28,-33,-26,-61,-25r0,-65r129,0r298,428r0,-338v3,-30,-32,-25,-60,-25r0,-65r200,0r0,65xm946,-375v0,106,-55,178,-157,178v-102,0,-157,-72,-157,-178v0,-106,55,-178,157,-178v102,0,157,72,157,178xm860,-375v0,-72,-23,-112,-71,-112v-48,0,-71,40,-71,112v0,72,23,112,71,112v48,0,71,-40,71,-112","w":966},"\u2044":{"d":"225,-616r-261,616r-64,0r262,-616r63,0","w":125},"\u00b9":{"d":"234,-234r-150,0r0,-39r43,0r0,-269r-55,0r-5,-41v36,-4,71,-18,90,-33r33,0r0,328v-1,21,26,14,44,15r0,39","w":300},"\u00b2":{"d":"264,-357r-10,118r-218,0v-4,-81,35,-124,83,-170v48,-45,70,-70,70,-108v0,-66,-84,-64,-137,-45r-12,-50v32,-11,65,-16,96,-16v76,0,120,45,120,108v0,48,-25,84,-83,135v-52,46,-66,70,-72,96r107,0r14,-57v3,-16,25,-10,42,-11","w":300},"\u00b3":{"d":"274,-354v0,125,-139,149,-227,93r16,-48v48,36,145,33,145,-42v0,-48,-33,-64,-73,-67r0,-43v46,-5,62,-30,62,-62v0,-61,-76,-62,-127,-39r-14,-47v81,-40,205,-16,205,76v0,38,-19,70,-53,84v43,15,66,47,66,95","w":300},"\u00bd":{"d":"664,-118r-10,118r-218,0v-4,-81,35,-124,83,-170v48,-45,70,-70,70,-108v0,-66,-84,-64,-137,-45r-12,-50v32,-11,65,-16,96,-16v76,0,120,45,120,108v0,48,-25,84,-83,135v-52,46,-66,70,-72,96r107,0r14,-57v3,-16,25,-10,42,-11xm499,-616r-261,616r-64,0r262,-616r63,0xm227,-234r-150,0r0,-39r43,0r0,-269r-55,0r-5,-41v36,-4,71,-18,90,-33r33,0r0,328v-1,21,26,14,44,15r0,39","w":724},"\u00bc":{"d":"657,-101r-69,0v3,22,-10,63,15,62r24,0r0,39r-140,0r0,-39r39,0r0,-62r-156,0r0,-40r165,-241r53,0r0,227r69,0r0,54xm506,-616r-261,616r-64,0r262,-616r63,0xm234,-234r-150,0r0,-39r43,0r0,-269r-55,0r-5,-41v36,-4,71,-18,90,-33r33,0r0,328v-1,21,26,14,44,15r0,39xm526,-155r0,-144r-95,144r95,0","w":724},"\u00be":{"d":"678,-101r-69,0v3,22,-10,63,15,62r24,0r0,39r-140,0r0,-39r39,0r0,-62r-156,0r0,-40r165,-241r53,0r0,227r69,0r0,54xm527,-616r-261,616r-64,0r262,-616r63,0xm274,-354v0,125,-139,149,-227,93r16,-48v48,36,145,33,145,-42v0,-48,-33,-64,-73,-67r0,-43v46,-5,62,-30,62,-62v0,-61,-76,-62,-127,-39r-14,-47v81,-40,205,-16,205,76v0,38,-19,70,-53,84v43,15,66,47,66,95xm547,-155r0,-144r-95,144r95,0","w":724},"`":{"d":"193,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":213},"\u00b4":{"d":"192,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":213},"\u00a8":{"d":"271,-581v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm117,-581v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":291},"\u02c6":{"d":"258,-498r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":282},"\u02dc":{"d":"262,-652v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":282},"\u00af":{"d":"262,-600r-242,0r0,-52r242,0r0,52","w":282},"\u02d8":{"d":"241,-652v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":282},"\u02d9":{"d":"198,-596v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":282},"\u02da":{"d":"223,-573v0,55,-40,81,-82,81v-42,0,-82,-26,-82,-81v0,-55,40,-81,82,-81v42,0,82,26,82,81xm185,-573v0,-33,-19,-52,-44,-52v-25,0,-44,19,-44,52v0,33,19,52,44,52v25,0,44,-19,44,-52","w":282},"\u00b8":{"d":"218,98v0,34,-28,71,-77,71v-23,0,-46,-8,-60,-19r12,-34v24,19,69,17,69,-18v0,-29,-32,-31,-51,-20r-33,-14r25,-75r49,0r-16,48v43,-14,82,14,82,61","w":282},"\u02dd":{"d":"284,-559v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59xm134,-559v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59","w":282},"\u02db":{"d":"115,-5r63,0v-39,17,-61,48,-61,76v0,36,52,44,74,26r0,38v-47,30,-130,-1,-130,-58v0,-30,17,-60,54,-82","w":282},"\u02c7":{"d":"258,-720r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":282},"\u0326":{"d":"185,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":282},"\u00c0":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0xm394,-670r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u00c1":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0xm377,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u00c2":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0xm414,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u00c3":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0xm423,-766v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u00c4":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0xm425,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm271,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u0100":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0xm416,-681r-242,0r0,-52r242,0r0,52","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u0102":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0xm396,-761v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":588,"k":{"w":17,"v":17,"V":80,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76}},"\u00c5":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-17,41,8,52,48,47r0,66r-194,0r0,-66r50,0r192,-540v-18,-13,-30,-35,-30,-65v0,-55,40,-81,82,-81v42,0,82,26,82,81v0,31,-12,53,-31,66r170,513v11,32,32,27,65,27r0,65xm344,-671v0,-33,-19,-52,-44,-52v-25,0,-44,19,-44,52v0,33,19,52,44,52v25,0,44,-19,44,-52xm355,-254r-75,-236r-80,236r155,0","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u01fa":{"d":"586,0r-221,0r0,-65r50,0r-40,-126r-197,0r-26,78v-17,41,8,52,48,47r0,66r-194,0r0,-66r50,0r192,-540v-18,-13,-30,-35,-30,-65v0,-55,40,-81,82,-81v42,0,82,26,82,81v0,31,-12,53,-31,66r170,513v11,32,32,27,65,27r0,65xm344,-671v0,-33,-19,-52,-44,-52v-25,0,-44,19,-44,52v0,33,19,52,44,52v25,0,44,-19,44,-52xm355,-254r-75,-236r-80,236r155,0xm378,-822v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u0104":{"d":"586,0v-64,-6,-107,18,-112,71v-3,36,52,44,74,26r0,38v-47,30,-130,-1,-130,-58v0,-30,17,-60,47,-77r-100,0r0,-65r50,0r-40,-126r-197,0r-26,78v-18,41,8,52,48,47r0,66r-194,0r0,-66r50,0r196,-550r95,0r174,524v11,32,32,27,65,27r0,65xm355,-254r-75,-236r-80,236r155,0","w":588,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u00c6":{"d":"783,0r-439,0r0,-65r60,0r0,-126r-195,0r-40,71v-16,28,-16,54,18,54r29,0r0,66r-222,0r0,-66r52,0r321,-550r401,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm404,-254r0,-282r-159,282r159,0","w":837,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u01fc":{"d":"783,0r-439,0r0,-65r60,0r0,-126r-195,0r-40,71v-16,28,-16,54,18,54r29,0r0,66r-222,0r0,-66r52,0r321,-550r401,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm404,-254r0,-282r-159,282r159,0xm652,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":837,"k":{"v":17,"w":17,"V":80,"T":51,"\u0164":51,"\u0162":51,"W":76,"\u1e80":76,"\u1e82":76,"\u0174":76,"\u1e84":76,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66}},"\u0106":{"d":"493,-70v-49,46,-125,81,-203,81v-152,0,-250,-109,-250,-311v0,-192,99,-328,255,-328v57,0,101,21,127,47r5,-35r52,0r0,213v-29,-1,-57,7,-60,-24v-6,-71,-38,-123,-113,-123v-102,0,-155,102,-155,234v0,177,65,248,161,248v58,0,112,-28,152,-57xm374,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":529},"\u00c7":{"d":"374,98v0,34,-28,71,-77,71v-23,0,-46,-8,-60,-19r12,-34v24,19,69,17,69,-18v0,-29,-32,-31,-51,-20r-33,-14r18,-56v-130,-16,-212,-123,-212,-308v0,-192,99,-328,255,-328v57,0,101,21,127,47r5,-35r52,0r0,213v-29,-1,-57,7,-60,-24v-6,-71,-38,-123,-113,-123v-102,0,-155,102,-155,234v0,177,65,248,161,248v58,0,112,-28,152,-57r29,55v-47,44,-118,78,-193,81r-8,26v43,-14,82,14,82,61","w":529},"\u0108":{"d":"493,-70v-49,46,-125,81,-203,81v-152,0,-250,-109,-250,-311v0,-192,99,-328,255,-328v57,0,101,21,127,47r5,-35r52,0r0,213v-29,-1,-57,7,-60,-24v-6,-71,-38,-123,-113,-123v-102,0,-155,102,-155,234v0,177,65,248,161,248v58,0,112,-28,152,-57xm408,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":529},"\u010c":{"d":"493,-70v-49,46,-125,81,-203,81v-152,0,-250,-109,-250,-311v0,-192,99,-328,255,-328v57,0,101,21,127,47r5,-35r52,0r0,213v-29,-1,-57,7,-60,-24v-6,-71,-38,-123,-113,-123v-102,0,-155,102,-155,234v0,177,65,248,161,248v58,0,112,-28,152,-57xm409,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":529},"\u010a":{"d":"493,-70v-49,46,-125,81,-203,81v-152,0,-250,-109,-250,-311v0,-192,99,-328,255,-328v57,0,101,21,127,47r5,-35r52,0r0,213v-29,-1,-57,7,-60,-24v-6,-71,-38,-123,-113,-123v-102,0,-155,102,-155,234v0,177,65,248,161,248v58,0,112,-28,152,-57xm351,-721v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":529},"\u010e":{"d":"256,-616v211,-11,331,105,329,311v0,88,-20,165,-59,218v-86,116,-284,82,-471,87r0,-65r59,0r0,-461v3,-32,-34,-24,-62,-25r0,-65r204,0xm474,-306v-1,-169,-76,-260,-256,-245r0,461v-2,31,38,25,68,25v41,0,77,-9,106,-27v69,-43,82,-135,82,-214xm442,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":621},"\u0110":{"d":"280,-616v211,-11,331,105,329,311v0,88,-20,165,-59,218v-86,116,-284,82,-471,87r0,-65r59,0r0,-216r-90,0r0,-67r90,0r0,-178v3,-32,-34,-24,-62,-25r0,-65r204,0xm498,-306v-1,-169,-76,-260,-256,-245r0,203r101,0r0,67r-101,0r0,191v-2,31,38,25,68,25v41,0,77,-9,106,-27v69,-43,82,-135,82,-214","w":645},"\u00d0":{"d":"280,-616v211,-11,331,105,329,311v0,88,-20,165,-59,218v-86,116,-284,82,-471,87r0,-65r59,0r0,-216r-90,0r0,-67r90,0r0,-178v3,-32,-34,-24,-62,-25r0,-65r204,0xm498,-306v-1,-169,-76,-260,-256,-245r0,203r101,0r0,67r-101,0r0,191v-2,31,38,25,68,25v41,0,77,-9,106,-27v69,-43,82,-135,82,-214","w":645},"\u00c8":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm362,-670r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":547},"\u00c9":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm371,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":547},"\u00ca":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm386,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":547},"\u011a":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm397,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":547},"\u00cb":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm398,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm244,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":547},"\u0112":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm393,-681r-242,0r0,-52r242,0r0,52","w":547},"\u0114":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm382,-761v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":547},"\u0116":{"d":"493,0r-439,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191xm340,-721v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":547},"\u0118":{"d":"493,0v-49,-2,-81,28,-85,71v-4,36,52,44,74,26r0,38v-47,30,-130,-1,-130,-58v0,-30,17,-60,47,-77r-345,0r0,-65r60,0r0,-458v5,-33,-32,-28,-62,-28r0,-65r426,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,9,25,25,25r170,0v14,-41,25,-107,29,-151v26,0,51,-4,51,25r0,191","w":547},"\u011c":{"d":"573,-226r-50,0r0,226r-67,0r-17,-29v-25,18,-86,40,-142,40v-161,0,-251,-124,-251,-310v0,-218,127,-329,270,-329v66,0,113,26,134,50r7,-38r53,0r0,206v-30,1,-54,3,-59,-24v-11,-67,-48,-116,-125,-116v-95,0,-169,84,-169,245v0,218,128,285,262,212r0,-108v3,-36,-30,-22,-58,-25r0,-60r212,0r0,60xm428,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":607},"\u011e":{"d":"573,-226r-50,0r0,226r-67,0r-17,-29v-25,18,-86,40,-142,40v-161,0,-251,-124,-251,-310v0,-218,127,-329,270,-329v66,0,113,26,134,50r7,-38r53,0r0,206v-30,1,-54,3,-59,-24v-11,-67,-48,-116,-125,-116v-95,0,-169,84,-169,245v0,218,128,285,262,212r0,-108v3,-36,-30,-22,-58,-25r0,-60r212,0r0,60xm418,-761v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":607},"\u0120":{"d":"573,-226r-50,0r0,226r-67,0r-17,-29v-25,18,-86,40,-142,40v-161,0,-251,-124,-251,-310v0,-218,127,-329,270,-329v66,0,113,26,134,50r7,-38r53,0r0,206v-30,1,-54,3,-59,-24v-11,-67,-48,-116,-125,-116v-95,0,-169,84,-169,245v0,218,128,285,262,212r0,-108v3,-36,-30,-22,-58,-25r0,-60r212,0r0,60xm373,-721v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":607},"\u0122":{"d":"573,-226r-50,0r0,226r-67,0r-17,-29v-25,18,-86,40,-142,40v-161,0,-251,-124,-251,-310v0,-218,127,-329,270,-329v66,0,113,26,134,50r7,-38r53,0r0,206v-30,1,-54,3,-59,-24v-11,-67,-48,-116,-125,-116v-95,0,-169,84,-169,245v0,218,128,285,262,212r0,-108v3,-36,-30,-22,-58,-25r0,-60r212,0r0,60xm366,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":607},"\u0124":{"d":"615,0r-227,0r0,-65r60,0r0,-206r-230,0r0,182v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,209r230,0r0,-185v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm450,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":667},"\u0126":{"d":"632,-474r0,59r-80,0r0,326v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-206r-230,0r0,182v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-350r-80,0r0,-59r80,0v-3,-32,12,-79,-25,-77r-37,0r0,-65r227,0r0,65r-61,0r0,77r230,0v-3,-32,12,-79,-25,-77r-37,0r0,-65r227,0r0,65r-61,0r0,77r80,0xm218,-342r230,0r0,-73r-230,0r0,73","w":667},"\u00cc":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm255,-670r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":339},"\u00cd":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm254,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":339},"\u00ce":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm285,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":339},"\u0128":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm290,-766v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":339},"\u00cf":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm295,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm141,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":339},"\u012a":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm290,-681r-242,0r0,-52r242,0r0,52","w":339},"\u012c":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm270,-761v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":339},"\u0130":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65xm224,-721v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":339},"\u012e":{"d":"284,0v-65,-6,-111,16,-116,71v-3,36,52,44,74,26r0,38v-47,30,-130,-1,-130,-58v0,-30,17,-60,47,-77r-102,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,462v0,32,34,23,63,24r0,65","w":339},"\u0132":{"d":"284,0r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r12,65r-73,0r0,462v0,32,34,23,63,24r0,65xm639,-213v1,148,-39,224,-179,224v-43,0,-83,-8,-109,-18r0,-73v25,9,59,16,91,16v71,0,93,-49,93,-115r0,-348v0,-16,-8,-24,-25,-24r-129,0r-12,-65r270,0r0,403","w":721},"\u0134":{"d":"322,-213v1,148,-39,224,-179,224v-43,0,-83,-8,-109,-18r0,-73v25,9,59,16,91,16v71,0,93,-49,93,-115r0,-348v0,-16,-8,-24,-25,-24r-129,0r-12,-65r270,0r0,403xm309,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":404},"\u0136":{"d":"581,0r-149,0r-159,-275r-55,71r0,114v0,33,35,24,64,25r0,65r-228,0r0,-65r60,0r0,-459v3,-32,-32,-27,-62,-27r0,-65r228,0r0,65r-62,0r0,229v68,-92,167,-193,216,-294r125,0r0,65v-41,1,-70,-5,-91,23r-127,164r156,267v13,29,41,34,84,32r0,65xm378,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":603},"\u0139":{"d":"488,0r-434,0r0,-65r60,0r0,-461v0,-35,-33,-23,-62,-25r0,-65r227,0r0,65r-61,0r0,461v0,17,9,25,25,25r165,0v15,-44,25,-106,29,-151v26,0,51,-4,51,25r0,191xm252,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":520},"\u013d":{"d":"488,0r-434,0r0,-65r60,0r0,-461v0,-35,-33,-23,-62,-25r0,-65r227,0r0,65r-61,0r0,461v0,17,9,25,25,25r165,0v15,-44,25,-106,29,-151v26,0,51,-4,51,25r0,191xm432,-577v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":520},"\u013b":{"d":"488,0r-434,0r0,-65r60,0r0,-461v0,-35,-33,-23,-62,-25r0,-65r227,0r0,65r-61,0r0,461v0,17,9,25,25,25r165,0v15,-44,25,-106,29,-151v26,0,51,-4,51,25r0,191xm343,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":520},"\u0141":{"d":"510,0r-434,0r0,-65r60,0r0,-186r-88,43r0,-78r88,-43r0,-197v0,-35,-33,-23,-62,-25r0,-65r227,0r0,65r-61,0r0,172r84,-41r0,78r-84,41r0,211v0,17,9,25,25,25r165,0v15,-44,25,-106,29,-151v26,0,51,-4,51,25r0,191","w":542},"\u013f":{"d":"488,0r-434,0r0,-65r60,0r0,-461v0,-35,-33,-23,-62,-25r0,-65r227,0r0,65r-61,0r0,461v0,17,9,25,25,25r165,0v15,-44,25,-106,29,-151v26,0,51,-4,51,25r0,191xm416,-333v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":520,"k":{"y":11,"u":21,"\u00f9":21,"\u00fa":21,"\u00fb":21,"\u0169":21,"\u00fc":21,"\u016b":21,"\u016d":21,"\u016f":21,"\u0171":21,"\u0173":21,"Y":66,"\u1ef2":66,"\u00dd":66,"\u0176":66,"\u0178":66,"T":60,"\u0164":60,"\u0162":60}},"\u0143":{"d":"625,-551r-56,0r0,551r-70,0r-297,-436r0,346v-3,27,30,26,58,25r0,65r-197,0r0,-65r56,0r0,-461v3,-28,-33,-26,-61,-25r0,-65r129,0r298,428r0,-338v3,-30,-32,-25,-60,-25r0,-65r200,0r0,65xm428,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":682},"\u0147":{"d":"625,-551r-56,0r0,551r-70,0r-297,-436r0,346v-3,27,30,26,58,25r0,65r-197,0r0,-65r56,0r0,-461v3,-28,-33,-26,-61,-25r0,-65r129,0r298,428r0,-338v3,-30,-32,-25,-60,-25r0,-65r200,0r0,65xm456,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":682},"\u00d1":{"d":"625,-551r-56,0r0,551r-70,0r-297,-436r0,346v-3,27,30,26,58,25r0,65r-197,0r0,-65r56,0r0,-461v3,-28,-33,-26,-61,-25r0,-65r129,0r298,428r0,-338v3,-30,-32,-25,-60,-25r0,-65r200,0r0,65xm463,-766v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":682},"\u0145":{"d":"625,-551r-56,0r0,551r-70,0r-297,-436r0,346v-3,27,30,26,58,25r0,65r-197,0r0,-65r56,0r0,-461v3,-28,-33,-26,-61,-25r0,-65r129,0r298,428r0,-338v3,-30,-32,-25,-60,-25r0,-65r200,0r0,65xm399,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":682},"\u014a":{"d":"569,-3v7,107,-43,170,-137,168v-29,0,-58,-8,-81,-18r0,-62v63,18,136,21,134,-72r0,-34r-283,-415r0,346v-3,27,30,26,58,25r0,65r-197,0r0,-65r56,0r0,-461v3,-28,-33,-26,-61,-25r0,-65r129,0r298,428r0,-338v3,-30,-32,-25,-60,-25r0,-65r200,0r0,65r-56,0r0,548","w":682},"\u00d2":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm389,-670r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u00d3":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm362,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u00d4":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm408,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u00d5":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm414,-766v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u00d6":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm416,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm262,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u014c":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm413,-681r-242,0r0,-52r242,0r0,52","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u014e":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm393,-761v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u0150":{"d":"538,-308v0,80,-15,177,-68,240v-88,107,-268,106,-356,0v-53,-63,-68,-160,-68,-240v0,-80,15,-178,68,-241v88,-107,268,-106,356,0v53,63,68,161,68,241xm292,-69v113,0,135,-102,135,-239v0,-138,-21,-240,-135,-240v-114,0,-135,103,-135,240v0,138,21,239,135,239xm435,-717v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59xm285,-717v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u00d8":{"d":"538,-308v0,80,-15,177,-68,240v-67,81,-181,101,-284,56r-40,78r-76,0r60,-117v-66,-65,-84,-168,-84,-257v0,-80,16,-178,68,-241v69,-83,192,-102,294,-51r38,-77r75,0r-59,119v60,64,76,166,76,250xm292,-547v-113,0,-135,102,-135,239v0,65,8,118,23,157r187,-370v-20,-18,-45,-26,-75,-26xm292,-70v113,0,135,-101,135,-238v0,-58,-7,-107,-19,-145r-183,363v19,13,41,20,67,20","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u01fe":{"d":"538,-308v0,80,-15,177,-68,240v-67,81,-181,101,-284,56r-40,78r-76,0r60,-117v-66,-65,-84,-168,-84,-257v0,-80,16,-178,68,-241v69,-83,192,-102,294,-51r38,-77r75,0r-59,119v60,64,76,166,76,250xm292,-547v-113,0,-135,102,-135,239v0,65,8,118,23,157r187,-370v-20,-18,-45,-26,-75,-26xm292,-70v113,0,135,-101,135,-238v0,-58,-7,-107,-19,-145r-183,363v19,13,41,20,67,20xm375,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":584,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u0152":{"d":"786,0r-234,0v-198,2,-340,46,-438,-68v-54,-62,-68,-160,-68,-240v0,-80,15,-178,68,-241v53,-64,113,-78,213,-78v58,0,143,11,265,11r179,0r4,202v-26,0,-52,5,-55,-20v-16,-50,-5,-117,-81,-117r-128,0r0,208r102,0v7,-23,7,-70,37,-66r23,0r0,194v-25,-1,-42,5,-49,-20r-12,-46r-101,0r0,191v0,17,10,25,26,25r169,0v15,-44,25,-106,29,-151v26,0,51,-4,51,25r0,191xm157,-308v0,138,22,238,135,238v90,0,115,-11,115,-74r0,-317v0,-65,-11,-86,-111,-86v-116,0,-139,100,-139,239","w":840,"k":{"V":38,"J":19,"X":50,"W":32,"\u1e80":32,"\u1e82":32,"\u0174":32,"\u1e84":32,"Y":57,"\u1ef2":57,"\u00dd":57,"\u0176":57,"\u0178":57,"A":16,"\u00c0":16,"\u00c1":16,"\u00c2":16,"\u00c3":16,"\u00c4":16,"\u0100":16,"\u0102":16,"\u00c5":16,"\u01fa":16,"\u0104":16,"\u00c6":16,"\u01fc":16}},"\u00de":{"d":"516,-317v0,135,-105,207,-298,196v-1,27,-2,56,25,56r38,0r0,65r-227,0r0,-65r60,0r0,-462v3,-30,-34,-23,-62,-24r0,-65r227,0r0,65r-61,0r0,47v174,-9,298,28,298,187xm404,-318v0,-106,-77,-127,-186,-121r0,250r47,0v111,0,139,-53,139,-129","w":550},"\u0154":{"d":"574,0r-151,0r-138,-248r-67,0r0,158v-3,31,34,25,63,25r0,65r-227,0r0,-65r60,0r0,-461v3,-32,-34,-24,-62,-25r0,-65r240,0v161,0,236,62,236,182v0,83,-47,151,-134,176r93,161v13,29,44,35,87,32r0,65xm419,-437v0,-59,-26,-114,-143,-114r-58,0r0,235r56,0v110,0,145,-46,145,-121xm391,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":612},"\u0158":{"d":"574,0r-151,0r-138,-248r-67,0r0,158v-3,31,34,25,63,25r0,65r-227,0r0,-65r60,0r0,-461v3,-32,-34,-24,-62,-25r0,-65r240,0v161,0,236,62,236,182v0,83,-47,151,-134,176r93,161v13,29,44,35,87,32r0,65xm419,-437v0,-59,-26,-114,-143,-114r-58,0r0,235r56,0v110,0,145,-46,145,-121xm417,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":612},"\u0156":{"d":"574,0r-151,0r-138,-248r-67,0r0,158v-3,31,34,25,63,25r0,65r-227,0r0,-65r60,0r0,-461v3,-32,-34,-24,-62,-25r0,-65r240,0v161,0,236,62,236,182v0,83,-47,151,-134,176r93,161v13,29,44,35,87,32r0,65xm419,-437v0,-59,-26,-114,-143,-114r-58,0r0,235r56,0v110,0,145,-46,145,-121xm374,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":612},"\u015a":{"d":"465,-163v0,89,-61,174,-198,174v-56,0,-112,-15,-147,-56r-7,46r-48,0r0,-211v28,1,55,-8,58,22v7,76,56,125,129,125v73,0,107,-39,107,-80v0,-149,-298,-95,-298,-312v0,-109,87,-173,188,-173v57,0,104,19,132,54r9,-42r47,0r0,208v-29,-1,-57,8,-61,-22v-10,-74,-45,-126,-121,-126v-55,0,-91,39,-91,84v0,133,301,100,301,309xm347,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":512},"\u015c":{"d":"465,-163v0,89,-61,174,-198,174v-56,0,-112,-15,-147,-56r-7,46r-48,0r0,-211v28,1,55,-8,58,22v7,76,56,125,129,125v73,0,107,-39,107,-80v0,-149,-298,-95,-298,-312v0,-109,87,-173,188,-173v57,0,104,19,132,54r9,-42r47,0r0,208v-29,-1,-57,8,-61,-22v-10,-74,-45,-126,-121,-126v-55,0,-91,39,-91,84v0,133,301,100,301,309xm373,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":512},"\u0160":{"d":"465,-163v0,89,-61,174,-198,174v-56,0,-112,-15,-147,-56r-7,46r-48,0r0,-211v28,1,55,-8,58,22v7,76,56,125,129,125v73,0,107,-39,107,-80v0,-149,-298,-95,-298,-312v0,-109,87,-173,188,-173v57,0,104,19,132,54r9,-42r47,0r0,208v-29,-1,-57,8,-61,-22v-10,-74,-45,-126,-121,-126v-55,0,-91,39,-91,84v0,133,301,100,301,309xm368,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":512},"\u015e":{"d":"350,98v0,34,-28,71,-77,71v-23,0,-46,-8,-60,-19r12,-34v24,19,69,17,69,-18v0,-29,-32,-31,-51,-20r-33,-14r18,-56v-42,-6,-81,-21,-108,-53r-7,46r-48,0r0,-211v28,1,55,-8,58,22v7,76,56,125,129,125v73,0,107,-39,107,-80v0,-149,-298,-95,-298,-312v0,-109,87,-173,188,-173v57,0,104,19,132,54r9,-42r47,0r0,208v-29,-1,-57,8,-61,-22v-10,-74,-45,-126,-121,-126v-55,0,-91,39,-91,84v0,133,301,100,301,309v0,87,-59,170,-189,174r-8,26v43,-14,82,14,82,61","w":512},"\u0218":{"d":"465,-163v0,89,-61,174,-198,174v-56,0,-112,-15,-147,-56r-7,46r-48,0r0,-211v28,1,55,-8,58,22v7,76,56,125,129,125v73,0,107,-39,107,-80v0,-149,-298,-95,-298,-312v0,-109,87,-173,188,-173v57,0,104,19,132,54r9,-42r47,0r0,208v-29,-1,-57,8,-61,-22v-10,-74,-45,-126,-121,-126v-55,0,-91,39,-91,84v0,133,301,100,301,309xm327,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":512},"\u0164":{"d":"520,-425v-26,-1,-55,6,-59,-19r-12,-69v-3,-57,-71,-33,-124,-38r0,462v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-486v-53,5,-114,-18,-124,38r-12,69v-2,24,-30,18,-55,19r3,-191r483,0xm390,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":548,"k":{"e":40,"\u00e8":40,"\u00e9":40,"\u00ea":40,"\u011b":40,"\u00eb":40,"\u0113":40,"\u0115":40,"\u0117":40,"\u0119":40,"a":29,"\u00e0":29,"\u00e1":29,"\u00e2":29,"\u00e3":29,"\u00e4":29,"\u0101":29,"\u0103":29,"\u00e5":29,"\u01fb":29,"\u0105":29,"\u00e6":29,"\u01fd":29,"o":40,"\u00f2":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"\u00f6":40,"\u014d":40,"\u014f":40,"\u0151":40,"\u00f8":40,"\u01ff":40,"\u0153":40,"A":50,"\u00c0":50,"\u00c1":50,"\u00c2":50,"\u00c3":50,"\u00c4":50,"\u0100":50,"\u0102":50,"\u00c5":50,"\u01fa":50,"\u0104":50,"\u00c6":50,"\u01fc":50,"O":13,"\u00d2":13,"\u00d3":13,"\u00d4":13,"\u00d5":13,"\u00d6":13,"\u014c":13,"\u014e":13,"\u0150":13,"\u00d8":13,"\u01fe":13,"\u0152":13,"u":13,"\u00f9":13,"\u00fa":13,"\u00fb":13,"\u0169":13,"\u00fc":13,"\u016b":13,"\u016d":13,"\u016f":13,"\u0171":13,"\u0173":13}},"\u0162":{"d":"520,-425v-26,-1,-55,6,-59,-19r-12,-69v-3,-57,-71,-33,-124,-38r0,462v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-486v-53,5,-114,-18,-124,38r-12,69v-2,24,-30,18,-55,19r3,-191r483,0xm326,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":548,"k":{"A":50,"\u00c0":50,"\u00c1":50,"\u00c2":50,"\u00c3":50,"\u00c4":50,"\u0100":50,"\u0102":50,"\u00c5":50,"\u01fa":50,"\u0104":50,"\u00c6":50,"\u01fc":50,"a":29,"\u00e0":29,"\u00e1":29,"\u00e2":29,"\u00e3":29,"\u00e4":29,"\u0101":29,"\u0103":29,"\u00e5":29,"\u01fb":29,"\u0105":29,"\u00e6":29,"\u01fd":29,"e":40,"\u00e8":40,"\u00e9":40,"\u00ea":40,"\u011b":40,"\u00eb":40,"\u0113":40,"\u0115":40,"\u0117":40,"\u0119":40,"o":40,"\u00f2":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"\u00f6":40,"\u014d":40,"\u014f":40,"\u0151":40,"\u00f8":40,"\u01ff":40,"\u0153":40,"u":13,"\u00f9":13,"\u00fa":13,"\u00fb":13,"\u0169":13,"\u00fc":13,"\u016b":13,"\u016d":13,"\u016f":13,"\u0171":13,"\u0173":13,"O":13,"\u00d2":13,"\u00d3":13,"\u00d4":13,"\u00d5":13,"\u00d6":13,"\u014c":13,"\u014e":13,"\u0150":13,"\u00d8":13,"\u01fe":13,"\u0152":13}},"\u021a":{"d":"520,-425v-26,-1,-55,6,-59,-19r-12,-69v-3,-57,-71,-33,-124,-38r0,462v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-486v-53,5,-114,-18,-124,38r-12,69v-2,24,-30,18,-55,19r3,-191r483,0xm326,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":548,"k":{"A":50,"\u00c0":50,"\u00c1":50,"\u00c2":50,"\u00c3":50,"\u00c4":50,"\u0100":50,"\u0102":50,"\u00c5":50,"\u01fa":50,"\u0104":50,"\u00c6":50,"\u01fc":50,"a":29,"\u00e0":29,"\u00e1":29,"\u00e2":29,"\u00e3":29,"\u00e4":29,"\u0101":29,"\u0103":29,"\u00e5":29,"\u01fb":29,"\u0105":29,"\u00e6":29,"\u01fd":29,"e":40,"\u00e8":40,"\u00e9":40,"\u00ea":40,"\u011b":40,"\u00eb":40,"\u0113":40,"\u0115":40,"\u0117":40,"\u0119":40,"o":40,"\u00f2":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"\u00f6":40,"\u014d":40,"\u014f":40,"\u0151":40,"\u00f8":40,"\u01ff":40,"\u0153":40,"u":13,"\u00f9":13,"\u00fa":13,"\u00fb":13,"\u0169":13,"\u00fc":13,"\u016b":13,"\u016d":13,"\u016f":13,"\u0171":13,"\u0173":13,"O":13,"\u00d2":13,"\u00d3":13,"\u00d4":13,"\u00d5":13,"\u00d6":13,"\u014c":13,"\u014e":13,"\u0150":13,"\u00d8":13,"\u01fe":13,"\u0152":13}},"\u0166":{"d":"116,-317r105,0r0,-234v-53,5,-114,-18,-124,38r-12,69v-2,24,-30,18,-55,19r3,-191r483,0r4,191v-26,-1,-55,6,-59,-19r-12,-69v-3,-57,-71,-33,-124,-38r0,234r105,0r0,59r-105,0r0,169v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-193r-105,0r0,-59","w":548,"k":{"A":50,"\u00c0":50,"\u00c1":50,"\u00c2":50,"\u00c3":50,"\u00c4":50,"\u0100":50,"\u0102":50,"\u00c5":50,"\u01fa":50,"\u0104":50,"\u00c6":50,"\u01fc":50,"a":29,"\u00e0":29,"\u00e1":29,"\u00e2":29,"\u00e3":29,"\u00e4":29,"\u0101":29,"\u0103":29,"\u00e5":29,"\u01fb":29,"\u0105":29,"\u00e6":29,"\u01fd":29,"e":40,"\u00e8":40,"\u00e9":40,"\u00ea":40,"\u011b":40,"\u00eb":40,"\u0113":40,"\u0115":40,"\u0117":40,"\u0119":40,"o":40,"\u00f2":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"\u00f6":40,"\u014d":40,"\u014f":40,"\u0151":40,"\u00f8":40,"\u01ff":40,"\u0153":40,"u":13,"\u00f9":13,"\u00fa":13,"\u00fb":13,"\u0169":13,"\u00fc":13,"\u016b":13,"\u016d":13,"\u016f":13,"\u0171":13,"\u0173":13,"O":13,"\u00d2":13,"\u00d3":13,"\u00d4":13,"\u00d5":13,"\u00d6":13,"\u014c":13,"\u014e":13,"\u0150":13,"\u00d8":13,"\u01fe":13,"\u0152":13}},"\u00d9":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm414,-670r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":641},"\u00da":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm414,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":641},"\u00db":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm438,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":641},"\u0168":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm448,-766v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":641},"\u00dc":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm451,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm297,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":641},"\u016a":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm441,-681r-242,0r0,-52r242,0r0,52","w":641},"\u016c":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm421,-761v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":641},"\u016e":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm407,-730v0,55,-40,81,-82,81v-42,0,-82,-26,-82,-81v0,-55,40,-81,82,-81v42,0,82,26,82,81xm369,-730v0,-33,-19,-52,-44,-52v-25,0,-44,19,-44,52v0,33,19,52,44,52v25,0,44,-19,44,-52","w":641},"\u0170":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v1,142,-74,227,-211,227v-120,0,-215,-66,-215,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126xm469,-717v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59xm319,-717v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59","w":641},"\u0172":{"d":"326,-71v82,0,113,-61,113,-141r0,-314v3,-29,-35,-26,-64,-25r0,-65r221,0r0,65r-62,0r0,335v0,51,-9,96,-28,131v-42,78,-151,88,-151,156v0,36,52,44,74,26r0,38v-48,29,-132,3,-132,-58v0,-25,10,-48,30,-66v-124,1,-218,-65,-219,-219r0,-318v3,-28,-34,-26,-62,-25r0,-65r227,0r0,65r-61,0r0,354v0,86,48,126,114,126","w":641},"\u1e80":{"d":"868,-551v-45,-2,-74,0,-84,40r-132,511r-102,0r-108,-387r-112,387r-102,0r-136,-520v-10,-37,-34,-30,-72,-31r0,-65r227,0r0,65r-51,0r98,393r131,-458r57,0r126,458r99,-393r-52,0r0,-65r213,0r0,65xm544,-670r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":883,"k":{"y":35,"A":76,"\u00c0":76,"\u00c1":76,"\u00c2":76,"\u00c3":76,"\u00c4":76,"\u0100":76,"\u0102":76,"\u00c5":76,"\u01fa":76,"\u0104":76,"\u00c6":76,"\u01fc":76,"a":45,"\u00e0":45,"\u00e1":45,"\u00e2":45,"\u00e3":45,"\u00e4":45,"\u0101":45,"\u0103":45,"\u00e5":45,"\u01fb":45,"\u0105":45,"\u00e6":45,"\u01fd":45,"e":58,"\u00e8":58,"\u00e9":58,"\u00ea":58,"\u011b":58,"\u00eb":58,"\u0113":58,"\u0115":58,"\u0117":58,"\u0119":58,"o":61,"\u00f2":61,"\u00f3":61,"\u00f4":61,"\u00f5":61,"\u00f6":61,"\u014d":61,"\u014f":61,"\u0151":61,"\u00f8":61,"\u01ff":61,"\u0153":61,"u":53,"\u00f9":53,"\u00fa":53,"\u00fb":53,"\u0169":53,"\u00fc":53,"\u016b":53,"\u016d":53,"\u016f":53,"\u0171":53,"\u0173":53,"O":35,"\u00d2":35,"\u00d3":35,"\u00d4":35,"\u00d5":35,"\u00d6":35,"\u014c":35,"\u014e":35,"\u0150":35,"\u00d8":35,"\u01fe":35,"\u0152":35,"r":21,"\u0155":21,"\u0159":21,"\u0157":21,"i":13,"\u0131":13,"\u00ec":13,"\u00ed":13,"\u00ee":13,"\u0129":13,"\u00ef":13,"\u012b":13,"\u012d":13,"\u012f":13,"\u0133":13}},"\u1e82":{"d":"868,-551v-45,-2,-74,0,-84,40r-132,511r-102,0r-108,-387r-112,387r-102,0r-136,-520v-10,-37,-34,-30,-72,-31r0,-65r227,0r0,65r-51,0r98,393r131,-458r57,0r126,458r99,-393r-52,0r0,-65r213,0r0,65xm535,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":883,"k":{"y":35,"A":76,"\u00c0":76,"\u00c1":76,"\u00c2":76,"\u00c3":76,"\u00c4":76,"\u0100":76,"\u0102":76,"\u00c5":76,"\u01fa":76,"\u0104":76,"\u00c6":76,"\u01fc":76,"a":45,"\u00e0":45,"\u00e1":45,"\u00e2":45,"\u00e3":45,"\u00e4":45,"\u0101":45,"\u0103":45,"\u00e5":45,"\u01fb":45,"\u0105":45,"\u00e6":45,"\u01fd":45,"e":58,"\u00e8":58,"\u00e9":58,"\u00ea":58,"\u011b":58,"\u00eb":58,"\u0113":58,"\u0115":58,"\u0117":58,"\u0119":58,"o":61,"\u00f2":61,"\u00f3":61,"\u00f4":61,"\u00f5":61,"\u00f6":61,"\u014d":61,"\u014f":61,"\u0151":61,"\u00f8":61,"\u01ff":61,"\u0153":61,"u":53,"\u00f9":53,"\u00fa":53,"\u00fb":53,"\u0169":53,"\u00fc":53,"\u016b":53,"\u016d":53,"\u016f":53,"\u0171":53,"\u0173":53,"O":35,"\u00d2":35,"\u00d3":35,"\u00d4":35,"\u00d5":35,"\u00d6":35,"\u014c":35,"\u014e":35,"\u0150":35,"\u00d8":35,"\u01fe":35,"\u0152":35,"r":21,"\u0155":21,"\u0159":21,"\u0157":21,"i":13,"\u0131":13,"\u00ec":13,"\u00ed":13,"\u00ee":13,"\u0129":13,"\u00ef":13,"\u012b":13,"\u012d":13,"\u012f":13,"\u0133":13}},"\u0174":{"d":"868,-551v-45,-2,-74,0,-84,40r-132,511r-102,0r-108,-387r-112,387r-102,0r-136,-520v-10,-37,-34,-30,-72,-31r0,-65r227,0r0,65r-51,0r98,393r131,-458r57,0r126,458r99,-393r-52,0r0,-65r213,0r0,65xm568,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":883,"k":{"y":35,"e":58,"\u00e8":58,"\u00e9":58,"\u00ea":58,"\u011b":58,"\u00eb":58,"\u0113":58,"\u0115":58,"\u0117":58,"\u0119":58,"a":45,"\u00e0":45,"\u00e1":45,"\u00e2":45,"\u00e3":45,"\u00e4":45,"\u0101":45,"\u0103":45,"\u00e5":45,"\u01fb":45,"\u0105":45,"\u00e6":45,"\u01fd":45,"o":61,"\u00f2":61,"\u00f3":61,"\u00f4":61,"\u00f5":61,"\u00f6":61,"\u014d":61,"\u014f":61,"\u0151":61,"\u00f8":61,"\u01ff":61,"\u0153":61,"A":76,"\u00c0":76,"\u00c1":76,"\u00c2":76,"\u00c3":76,"\u00c4":76,"\u0100":76,"\u0102":76,"\u00c5":76,"\u01fa":76,"\u0104":76,"\u00c6":76,"\u01fc":76,"O":35,"\u00d2":35,"\u00d3":35,"\u00d4":35,"\u00d5":35,"\u00d6":35,"\u014c":35,"\u014e":35,"\u0150":35,"\u00d8":35,"\u01fe":35,"\u0152":35,"u":53,"\u00f9":53,"\u00fa":53,"\u00fb":53,"\u0169":53,"\u00fc":53,"\u016b":53,"\u016d":53,"\u016f":53,"\u0171":53,"\u0173":53,"i":13,"\u0131":13,"\u00ec":13,"\u00ed":13,"\u00ee":13,"\u0129":13,"\u00ef":13,"\u012b":13,"\u012d":13,"\u012f":13,"\u0133":13,"r":21,"\u0155":21,"\u0159":21,"\u0157":21}},"\u1e84":{"d":"868,-551v-45,-2,-74,0,-84,40r-132,511r-102,0r-108,-387r-112,387r-102,0r-136,-520v-10,-37,-34,-30,-72,-31r0,-65r227,0r0,65r-51,0r98,393r131,-458r57,0r126,458r99,-393r-52,0r0,-65r213,0r0,65xm581,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm427,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":883,"k":{"y":35,"A":76,"\u00c0":76,"\u00c1":76,"\u00c2":76,"\u00c3":76,"\u00c4":76,"\u0100":76,"\u0102":76,"\u00c5":76,"\u01fa":76,"\u0104":76,"\u00c6":76,"\u01fc":76,"a":45,"\u00e0":45,"\u00e1":45,"\u00e2":45,"\u00e3":45,"\u00e4":45,"\u0101":45,"\u0103":45,"\u00e5":45,"\u01fb":45,"\u0105":45,"\u00e6":45,"\u01fd":45,"e":58,"\u00e8":58,"\u00e9":58,"\u00ea":58,"\u011b":58,"\u00eb":58,"\u0113":58,"\u0115":58,"\u0117":58,"\u0119":58,"o":61,"\u00f2":61,"\u00f3":61,"\u00f4":61,"\u00f5":61,"\u00f6":61,"\u014d":61,"\u014f":61,"\u0151":61,"\u00f8":61,"\u01ff":61,"\u0153":61,"u":53,"\u00f9":53,"\u00fa":53,"\u00fb":53,"\u0169":53,"\u00fc":53,"\u016b":53,"\u016d":53,"\u016f":53,"\u0171":53,"\u0173":53,"O":35,"\u00d2":35,"\u00d3":35,"\u00d4":35,"\u00d5":35,"\u00d6":35,"\u014c":35,"\u014e":35,"\u0150":35,"\u00d8":35,"\u01fe":35,"\u0152":35,"r":21,"\u0155":21,"\u0159":21,"\u0157":21,"i":13,"\u0131":13,"\u00ec":13,"\u00ed":13,"\u00ee":13,"\u0129":13,"\u00ef":13,"\u012b":13,"\u012d":13,"\u012f":13,"\u0133":13}},"\u1ef2":{"d":"586,-551v-47,-1,-67,1,-87,39r-145,276r0,147v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-171r-149,-283v-13,-29,-40,-34,-81,-32r0,-65r237,0r0,65r-55,0r115,227r116,-227r-54,0r0,-65r207,0r0,65xm414,-670r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":601,"k":{"y":66,"s":50,"A":70,"\u00c0":70,"\u00c1":70,"\u00c2":70,"\u00c3":70,"\u00c4":70,"\u0100":70,"\u0102":70,"\u00c5":70,"\u01fa":70,"\u0104":70,"\u00c6":70,"\u01fc":70,"a":70,"\u00e0":70,"\u00e1":70,"\u00e2":70,"\u00e3":70,"\u00e4":70,"\u0101":70,"\u0103":70,"\u00e5":70,"\u01fb":70,"\u0105":70,"\u00e6":70,"\u01fd":70,"e":90,"\u00e8":90,"\u00e9":90,"\u00ea":90,"\u011b":90,"\u00eb":90,"\u0113":90,"\u0115":90,"\u0117":90,"\u0119":90,"o":85,"\u00f2":85,"\u00f3":85,"\u00f4":85,"\u00f5":85,"\u00f6":85,"\u014d":85,"\u014f":85,"\u0151":85,"\u00f8":85,"\u01ff":85,"\u0153":85,"u":50,"\u00f9":50,"\u00fa":50,"\u00fb":50,"\u0169":50,"\u00fc":50,"\u016b":50,"\u016d":50,"\u016f":50,"\u0171":50,"\u0173":50,"O":44,"\u00d2":44,"\u00d3":44,"\u00d4":44,"\u00d5":44,"\u00d6":44,"\u014c":44,"\u014e":44,"\u0150":44,"\u00d8":44,"\u01fe":44,"\u0152":44,"r":45,"\u0155":45,"\u0159":45,"\u0157":45}},"\u00dd":{"d":"586,-551v-47,-1,-67,1,-87,39r-145,276r0,147v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-171r-149,-283v-13,-29,-40,-34,-81,-32r0,-65r237,0r0,65r-55,0r115,227r116,-227r-54,0r0,-65r207,0r0,65xm397,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":601,"k":{"s":50,"y":66,"e":90,"\u00e8":90,"\u00e9":90,"\u00ea":90,"\u011b":90,"\u00eb":90,"\u0113":90,"\u0115":90,"\u0117":90,"\u0119":90,"a":70,"\u00e0":70,"\u00e1":70,"\u00e2":70,"\u00e3":70,"\u00e4":70,"\u0101":70,"\u0103":70,"\u00e5":70,"\u01fb":70,"\u0105":70,"\u00e6":70,"\u01fd":70,"o":85,"\u00f2":85,"\u00f3":85,"\u00f4":85,"\u00f5":85,"\u00f6":85,"\u014d":85,"\u014f":85,"\u0151":85,"\u00f8":85,"\u01ff":85,"\u0153":85,"A":70,"\u00c0":70,"\u00c1":70,"\u00c2":70,"\u00c3":70,"\u00c4":70,"\u0100":70,"\u0102":70,"\u00c5":70,"\u01fa":70,"\u0104":70,"\u00c6":70,"\u01fc":70,"O":44,"\u00d2":44,"\u00d3":44,"\u00d4":44,"\u00d5":44,"\u00d6":44,"\u014c":44,"\u014e":44,"\u0150":44,"\u00d8":44,"\u01fe":44,"\u0152":44,"u":50,"\u00f9":50,"\u00fa":50,"\u00fb":50,"\u0169":50,"\u00fc":50,"\u016b":50,"\u016d":50,"\u016f":50,"\u0171":50,"\u0173":50,"r":45,"\u0155":45,"\u0159":45,"\u0157":45}},"\u0176":{"d":"586,-551v-47,-1,-67,1,-87,39r-145,276r0,147v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-171r-149,-283v-13,-29,-40,-34,-81,-32r0,-65r237,0r0,65r-55,0r115,227r116,-227r-54,0r0,-65r207,0r0,65xm432,-658r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":601,"k":{"s":50,"y":66,"e":90,"\u00e8":90,"\u00e9":90,"\u00ea":90,"\u011b":90,"\u00eb":90,"\u0113":90,"\u0115":90,"\u0117":90,"\u0119":90,"a":70,"\u00e0":70,"\u00e1":70,"\u00e2":70,"\u00e3":70,"\u00e4":70,"\u0101":70,"\u0103":70,"\u00e5":70,"\u01fb":70,"\u0105":70,"\u00e6":70,"\u01fd":70,"o":85,"\u00f2":85,"\u00f3":85,"\u00f4":85,"\u00f5":85,"\u00f6":85,"\u014d":85,"\u014f":85,"\u0151":85,"\u00f8":85,"\u01ff":85,"\u0153":85,"A":70,"\u00c0":70,"\u00c1":70,"\u00c2":70,"\u00c3":70,"\u00c4":70,"\u0100":70,"\u0102":70,"\u00c5":70,"\u01fa":70,"\u0104":70,"\u00c6":70,"\u01fc":70,"O":44,"\u00d2":44,"\u00d3":44,"\u00d4":44,"\u00d5":44,"\u00d6":44,"\u014c":44,"\u014e":44,"\u0150":44,"\u00d8":44,"\u01fe":44,"\u0152":44,"u":50,"\u00f9":50,"\u00fa":50,"\u00fb":50,"\u0169":50,"\u00fc":50,"\u016b":50,"\u016d":50,"\u016f":50,"\u0171":50,"\u0173":50,"r":45,"\u0155":45,"\u0159":45,"\u0157":45}},"\u0178":{"d":"586,-551v-47,-1,-67,1,-87,39r-145,276r0,147v0,32,34,23,63,24r0,65r-227,0r0,-65r60,0r0,-171r-149,-283v-13,-29,-40,-34,-81,-32r0,-65r237,0r0,65r-55,0r115,227r116,-227r-54,0r0,-65r207,0r0,65xm441,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm287,-708v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":601,"k":{"s":50,"y":66,"e":90,"\u00e8":90,"\u00e9":90,"\u00ea":90,"\u011b":90,"\u00eb":90,"\u0113":90,"\u0115":90,"\u0117":90,"\u0119":90,"a":70,"\u00e0":70,"\u00e1":70,"\u00e2":70,"\u00e3":70,"\u00e4":70,"\u0101":70,"\u0103":70,"\u00e5":70,"\u01fb":70,"\u0105":70,"\u00e6":70,"\u01fd":70,"o":85,"\u00f2":85,"\u00f3":85,"\u00f4":85,"\u00f5":85,"\u00f6":85,"\u014d":85,"\u014f":85,"\u0151":85,"\u00f8":85,"\u01ff":85,"\u0153":85,"A":70,"\u00c0":70,"\u00c1":70,"\u00c2":70,"\u00c3":70,"\u00c4":70,"\u0100":70,"\u0102":70,"\u00c5":70,"\u01fa":70,"\u0104":70,"\u00c6":70,"\u01fc":70,"O":44,"\u00d2":44,"\u00d3":44,"\u00d4":44,"\u00d5":44,"\u00d6":44,"\u014c":44,"\u014e":44,"\u0150":44,"\u00d8":44,"\u01fe":44,"\u0152":44,"u":50,"\u00f9":50,"\u00fa":50,"\u00fb":50,"\u0169":50,"\u00fc":50,"\u016b":50,"\u016d":50,"\u016f":50,"\u0171":50,"\u0173":50,"r":45,"\u0155":45,"\u0159":45,"\u0157":45}},"\u0179":{"d":"495,0r-438,0v-1,-66,-1,-58,49,-140r248,-404r-186,0v-23,0,-29,5,-32,23r-13,73r-59,0r0,-168r423,0v3,60,-7,72,-44,132r-253,412r203,0v46,1,31,-61,43,-94r59,0r0,166xm368,-707v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":537},"\u017d":{"d":"495,0r-438,0v-1,-66,-1,-58,49,-140r248,-404r-186,0v-23,0,-29,5,-32,23r-13,73r-59,0r0,-168r423,0v3,60,-7,72,-44,132r-253,412r203,0v46,1,31,-61,43,-94r59,0r0,166xm395,-776r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":537},"\u017b":{"d":"495,0r-438,0v-1,-66,-1,-58,49,-140r248,-404r-186,0v-23,0,-29,5,-32,23r-13,73r-59,0r0,-168r423,0v3,60,-7,72,-44,132r-253,412r203,0v46,1,31,-61,43,-94r59,0r0,166xm338,-721v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":537},"\u00e0":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm323,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":465},"\u00e1":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm301,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":465},"\u00e2":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm343,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":465},"\u00e3":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm342,-628v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":465},"\u00e4":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm350,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm196,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":465},"\u0101":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm343,-547r-242,0r0,-52r242,0r0,52","w":465},"\u0103":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm317,-624v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":465,"k":{"w":17,"v":37}},"\u00e5":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm299,-573v0,55,-40,81,-82,81v-42,0,-82,-26,-82,-81v0,-55,40,-81,82,-81v42,0,82,26,82,81xm264,-573v0,-36,-19,-55,-47,-55v-28,0,-47,19,-47,55v0,36,19,55,47,55v28,0,47,-19,47,-55","w":465},"\u01fb":{"d":"280,-288v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58v-58,-2,-124,13,-141,-34v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35xm299,-573v0,55,-40,81,-82,81v-42,0,-82,-26,-82,-81v0,-55,40,-81,82,-81v42,0,82,26,82,81xm261,-573v0,-33,-19,-52,-44,-52v-25,0,-44,19,-44,52v0,33,19,52,44,52v25,0,44,-19,44,-52xm297,-719v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":465},"\u0105":{"d":"433,0v-48,-1,-79,28,-83,71v-4,36,52,44,74,26r0,38v-47,30,-130,-2,-130,-58v0,-29,18,-61,46,-78v-22,-3,-40,-12,-48,-33v-23,23,-62,47,-111,47v-88,0,-144,-52,-144,-140v0,-118,114,-161,243,-161v6,-75,-21,-117,-84,-116v-42,0,-86,13,-124,32r0,-66v50,-24,100,-33,136,-33v95,0,166,34,166,162r0,227v-2,32,32,23,59,24r0,58xm280,-95r0,-133v-87,1,-146,27,-146,93v0,42,22,75,71,75v30,0,59,-15,75,-35","w":465},"\u00e6":{"d":"281,-288v6,-75,-21,-117,-84,-116v-42,0,-87,13,-125,32r0,-66v50,-24,101,-33,137,-33v58,0,107,12,136,51v33,-32,79,-51,134,-51v98,0,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-66,0,-114,-23,-146,-61v-34,35,-83,61,-148,61v-88,0,-144,-52,-144,-140v0,-119,120,-161,244,-161xm554,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm297,-103v-14,-37,-19,-81,-19,-128v-96,2,-144,33,-144,96v0,43,22,75,71,75v39,0,72,-20,92,-43","w":685},"\u01fd":{"d":"281,-288v6,-75,-21,-117,-84,-116v-42,0,-87,13,-125,32r0,-66v50,-24,101,-33,137,-33v58,0,107,12,136,51v33,-32,79,-51,134,-51v98,0,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-66,0,-114,-23,-146,-61v-34,35,-83,61,-148,61v-88,0,-144,-52,-144,-140v0,-119,120,-161,244,-161xm554,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm297,-103v-14,-37,-19,-81,-19,-128v-96,2,-144,33,-144,96v0,43,22,75,71,75v39,0,72,-20,92,-43xm449,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":685},"\u0107":{"d":"392,-54v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240v0,-127,66,-244,203,-244v45,0,78,16,96,41r3,-28r53,0r0,174v-25,-1,-55,7,-57,-19v-3,-56,-29,-97,-86,-97v-75,0,-112,73,-112,172v0,179,132,207,226,129xm317,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":430},"\u00e7":{"d":"328,98v0,34,-28,71,-77,71v-23,0,-46,-8,-60,-19r12,-34v24,19,69,17,69,-18v0,-29,-32,-31,-51,-20r-33,-14r17,-53v-122,-14,-169,-116,-169,-238v0,-127,66,-244,203,-244v45,0,78,16,96,41r3,-28r53,0r0,174v-25,-1,-55,7,-57,-19v-3,-56,-29,-97,-86,-97v-75,0,-112,73,-112,172v0,179,132,207,226,129r30,45v-34,35,-81,61,-138,66r-8,25v43,-14,82,14,82,61","w":430},"\u0109":{"d":"392,-54v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240v0,-127,66,-244,203,-244v45,0,78,16,96,41r3,-28r53,0r0,174v-25,-1,-55,7,-57,-19v-3,-56,-29,-97,-86,-97v-75,0,-112,73,-112,172v0,179,132,207,226,129xm347,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":430},"\u010d":{"d":"392,-54v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240v0,-127,66,-244,203,-244v45,0,78,16,96,41r3,-28r53,0r0,174v-25,-1,-55,7,-57,-19v-3,-56,-29,-97,-86,-97v-75,0,-112,73,-112,172v0,179,132,207,226,129xm355,-628r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":430},"\u010b":{"d":"392,-54v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240v0,-127,66,-244,203,-244v45,0,78,16,96,41r3,-28r53,0r0,174v-25,-1,-55,7,-57,-19v-3,-56,-29,-97,-86,-97v-75,0,-112,73,-112,172v0,179,132,207,226,129xm290,-571v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":430},"\u010f":{"d":"39,-222v0,-147,69,-249,194,-249v42,0,74,13,95,27r0,-179r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,585v-2,30,35,22,62,23r0,58v-56,-3,-127,14,-143,-30v-27,24,-73,43,-116,43v-121,0,-186,-93,-186,-235xm328,-89r0,-285v-15,-11,-48,-22,-79,-22v-93,0,-110,102,-110,174v0,153,97,200,189,133xm545,-639v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":530},"\u0111":{"d":"39,-222v0,-147,69,-249,194,-249v42,0,74,13,95,27r0,-74r-165,0r0,-55r165,0r0,-50r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,93r65,0r0,55r-65,0r0,437v-2,30,35,22,62,23r0,58v-56,-3,-127,14,-143,-30v-27,24,-73,43,-116,43v-121,0,-186,-93,-186,-235xm328,-89r0,-285v-15,-11,-48,-22,-79,-22v-93,0,-110,102,-110,174v0,153,97,200,189,133","w":508},"\u00f0":{"d":"466,-288v0,183,-72,299,-211,299v-133,0,-210,-102,-210,-226v0,-194,179,-272,311,-172v-6,-63,-34,-116,-98,-149r-78,70r-37,-45r52,-47v-19,-4,-39,-8,-62,-10r26,-60v36,0,70,4,100,13r75,-66r38,44r-53,47v95,53,147,159,147,302xm250,-66v72,0,116,-94,110,-243v-26,-27,-60,-46,-109,-46v-67,0,-101,55,-101,144v0,87,44,145,100,145"},"\u00e8":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm335,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":455,"k":{"v":10}},"\u00e9":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm315,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":455,"k":{"v":10}},"\u00ea":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm353,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":455,"k":{"v":10}},"\u011b":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm358,-628r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":455,"k":{"v":10}},"\u00eb":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm359,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm205,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":455,"k":{"v":10}},"\u0113":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm355,-547r-242,0r0,-52r242,0r0,52","w":455,"k":{"v":10}},"\u0115":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm342,-624v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":455,"k":{"v":10}},"\u0117":{"d":"38,-227v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-144,0,-199,-109,-199,-240xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm299,-571v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":455,"k":{"v":10}},"\u0119":{"d":"394,-54v-28,44,-107,57,-114,125v-4,36,52,44,74,26r0,38v-47,30,-130,-2,-130,-58v0,-23,10,-47,28,-65v-153,10,-214,-104,-214,-239v0,-132,68,-240,203,-244v97,-3,186,91,173,255r-276,0v-2,166,135,194,226,117xm316,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0","w":455,"k":{"v":10}},"\u011d":{"d":"455,71v0,70,-54,154,-215,154v-211,0,-264,-155,-159,-264v-24,-46,-1,-99,34,-124v-36,-29,-56,-75,-56,-134v-2,-126,96,-191,227,-170v19,-41,64,-62,108,-62v44,0,36,24,36,59v-38,0,-71,3,-94,20v52,27,82,80,82,153v0,139,-128,203,-258,160v-28,42,-6,77,66,73v124,-7,229,5,229,135xm319,-297v0,-58,-14,-118,-80,-118v-66,0,-80,60,-80,118v0,58,14,117,80,117v66,0,80,-59,80,-117xm372,86v0,-100,-186,-37,-250,-82v-37,89,4,157,120,157v93,0,130,-36,130,-75xm355,-544r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":477},"\u011f":{"d":"455,71v0,70,-54,154,-215,154v-211,0,-264,-155,-159,-264v-24,-46,-1,-99,34,-124v-36,-29,-56,-75,-56,-134v-2,-126,96,-191,227,-170v19,-41,64,-62,108,-62v44,0,36,24,36,59v-38,0,-71,3,-94,20v52,27,82,80,82,153v0,139,-128,203,-258,160v-28,42,-6,77,66,73v124,-7,229,5,229,135xm319,-297v0,-58,-14,-118,-80,-118v-66,0,-80,60,-80,118v0,58,14,117,80,117v66,0,80,-59,80,-117xm372,86v0,-100,-186,-37,-250,-82v-37,89,4,157,120,157v93,0,130,-36,130,-75xm341,-624v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":477},"\u0121":{"d":"455,71v0,70,-54,154,-215,154v-211,0,-264,-155,-159,-264v-24,-46,-1,-99,34,-124v-36,-29,-56,-75,-56,-134v-2,-126,96,-191,227,-170v19,-41,64,-62,108,-62v44,0,36,24,36,59v-38,0,-71,3,-94,20v52,27,82,80,82,153v0,139,-128,203,-258,160v-28,42,-6,77,66,73v124,-7,229,5,229,135xm319,-297v0,-58,-14,-118,-80,-118v-66,0,-80,60,-80,118v0,58,14,117,80,117v66,0,80,-59,80,-117xm372,86v0,-100,-186,-37,-250,-82v-37,89,4,157,120,157v93,0,130,-36,130,-75xm299,-571v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":477},"\u0123":{"d":"187,-573v0,-38,21,-85,63,-144r29,14v-15,29,-32,74,-35,96v26,3,42,22,42,42v0,25,-21,43,-47,43v-30,0,-52,-18,-52,-51xm455,71v0,70,-54,154,-215,154v-211,0,-264,-155,-159,-264v-24,-46,-1,-99,34,-124v-36,-29,-56,-75,-56,-134v-2,-126,96,-191,227,-170v19,-41,64,-62,108,-62v44,0,36,24,36,59v-38,0,-71,3,-94,20v52,27,82,80,82,153v0,139,-128,203,-258,160v-28,42,-6,77,66,73v124,-7,229,5,229,135xm319,-297v0,-58,-14,-118,-80,-118v-66,0,-80,60,-80,118v0,58,14,117,80,117v66,0,80,-59,80,-117xm372,86v0,-100,-186,-37,-250,-82v-37,89,4,157,120,157v93,0,130,-36,130,-75","w":477},"\u0125":{"d":"331,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,52,25r0,58r-198,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,6,24,23r0,254v37,-36,90,-59,144,-59xm256,-716r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":540},"\u0127":{"d":"331,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,52,25r0,58r-198,0r0,-58r52,0r0,-460r-70,0r0,-55r70,0r0,-50r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,6,24,23r0,93r151,0r0,55r-151,0r0,106v37,-36,90,-59,144,-59","w":540,"k":{"v":9}},"\u0131":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58","w":282,"k":{"v":7}},"\u00ec":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58xm224,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":282,"k":{"v":7}},"\u00ed":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58xm212,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":282,"k":{"v":7}},"\u00ee":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58xm246,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":282,"k":{"v":7}},"\u0129":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58xm257,-628v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":282,"k":{"v":7}},"\u00ef":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58xm265,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm111,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":282,"k":{"v":7}},"\u012b":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58xm254,-547r-242,0r0,-52r242,0r0,52","w":282,"k":{"v":7}},"\u012d":{"d":"244,0r-199,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25r0,58xm246,-624v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":282,"k":{"v":7}},"\u012f":{"d":"243,135v-46,28,-122,5,-122,-58v0,-30,17,-60,47,-77r-123,0r0,-58r53,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,52,25v-2,18,4,44,-2,58v-39,0,-73,30,-73,71v0,36,52,44,74,26r0,38xm200,-588v0,31,-26,56,-57,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,57,25,57,56","w":282,"k":{"v":7}},"\u0133":{"d":"200,-588v0,31,-26,56,-57,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,57,25,57,56xm245,0r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,359v-3,29,26,25,53,25r0,58xm415,-644v31,0,57,25,57,56v0,31,-26,56,-57,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56xm468,27v7,107,-43,170,-137,168v-29,0,-58,-8,-81,-18r0,-62v66,20,124,19,124,-83r0,-431r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,469","w":547,"k":{"v":7}},"\u0135":{"d":"192,27v7,107,-43,170,-137,168v-29,0,-58,-8,-81,-18r0,-62v66,20,124,19,124,-83r0,-431r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,469xm252,-498r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":271},"\u0137":{"d":"485,0r-195,0r0,-58r35,0r-94,-186r-45,43r0,121v-3,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,369v49,-49,119,-104,153,-161r111,0r0,60v-37,1,-57,-3,-80,19r-71,69r113,222v13,29,35,32,73,30r0,58xm311,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":489},"\u0138":{"d":"501,0r-195,0r0,-58r35,0r-94,-186r-55,52r0,112v-3,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,155v52,-53,125,-110,163,-171r111,0r0,60v-37,1,-57,-3,-80,19r-71,69r113,222v13,29,35,32,73,30r0,58","w":505},"\u013a":{"d":"240,0r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,583v-3,29,26,25,53,25r0,58xm211,-768v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":276},"\u013e":{"d":"240,0r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,583v-3,29,26,25,53,25r0,58xm309,-639v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":294},"\u013c":{"d":"240,0r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,583v-3,29,26,25,53,25r0,58xm187,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":276},"\u0142":{"d":"279,-388r-92,45r0,260v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-240r-90,44r0,-78r90,-44r0,-247r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,245r92,-45r0,78","w":275},"\u017f":{"d":"227,-622v-94,3,-37,122,-37,188r0,354v-2,33,42,19,70,22r0,58r-216,0r0,-58r52,0r0,-341r-67,0r0,-59r63,0v-11,-28,-19,-72,-19,-103v0,-125,152,-158,236,-103r0,63v-23,-11,-55,-21,-82,-21","w":289},"\u0140":{"d":"240,0r-199,0r0,-58r52,0r0,-565r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,7,24,23r0,583v-3,29,26,25,53,25r0,58xm356,-300v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":346},"\u0144":{"d":"336,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v37,-36,90,-59,144,-59xm366,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":545},"\u0148":{"d":"336,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v37,-36,90,-59,144,-59xm395,-628r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":545},"\u00f1":{"d":"336,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v37,-36,90,-59,144,-59xm398,-628v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":545},"\u0146":{"d":"336,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v37,-36,90,-59,144,-59xm322,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":545},"\u0149":{"d":"385,-471v77,0,118,57,118,141r0,250v-1,28,28,21,53,22r0,58r-199,0r0,-58r52,0r0,-264v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v37,-36,90,-59,144,-59xm85,-638v0,48,-24,106,-73,180r-34,-17v18,-36,37,-93,41,-120v-31,-4,-49,-28,-49,-52v0,-32,24,-54,55,-54v34,0,60,23,60,63","w":594},"\u014b":{"d":"336,-471v77,0,118,57,118,141r0,327v7,107,-43,170,-137,168v-29,0,-58,-8,-81,-18r0,-62v66,20,124,19,124,-83r0,-324v2,-106,-126,-63,-168,-19r0,258v-3,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v29,0,24,27,24,53v37,-36,90,-59,144,-59","w":530},"\u00f2":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm340,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":478,"k":{"v":13}},"\u00f3":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm314,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":478,"k":{"v":13}},"\u00f4":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm357,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":478,"k":{"v":13}},"\u00f5":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm360,-628v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":478,"k":{"v":13}},"\u00f6":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm363,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm209,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":478,"k":{"v":13}},"\u014d":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm360,-547r-242,0r0,-52r242,0r0,52","w":478,"k":{"v":13}},"\u014f":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm340,-624v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":478,"k":{"v":13}},"\u0151":{"d":"439,-233v0,131,-56,246,-201,246v-145,0,-199,-109,-199,-240v0,-131,56,-244,201,-244v145,0,199,106,199,238xm339,-230v0,-66,-9,-169,-98,-169v-91,0,-102,102,-102,171v0,66,11,169,99,169v92,0,101,-102,101,-171xm382,-559v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59xm232,-559v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59","w":478,"k":{"v":13}},"\u00f8":{"d":"440,-234v0,131,-56,244,-201,244v-30,0,-57,-4,-80,-13r-32,64r-64,0r47,-93v-50,-43,-70,-115,-70,-196v0,-131,56,-243,201,-243v32,0,60,5,84,15r34,-67r63,0r-49,97v47,43,67,113,67,192xm289,-386v-13,-8,-28,-13,-47,-13v-91,0,-102,101,-102,170v0,32,3,74,16,107xm340,-231v0,-31,-3,-70,-14,-103r-131,261v12,7,26,11,44,11v92,0,101,-100,101,-169","w":480,"k":{"v":13}},"\u01ff":{"d":"440,-234v0,131,-56,244,-201,244v-30,0,-57,-4,-80,-13r-32,64r-64,0r47,-93v-50,-43,-70,-115,-70,-196v0,-131,56,-243,201,-243v32,0,60,5,84,15r34,-67r63,0r-49,97v47,43,67,113,67,192xm289,-386v-13,-8,-28,-13,-47,-13v-91,0,-102,101,-102,170v0,32,3,74,16,107xm340,-231v0,-31,-3,-70,-14,-103r-131,261v12,7,26,11,44,11v92,0,101,-100,101,-169xm315,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":480,"k":{"v":13}},"\u0153":{"d":"393,-403v33,-40,84,-68,149,-68v98,0,186,91,173,255r-276,0v-3,166,136,194,226,117r30,45v-38,39,-92,67,-157,67v-70,0,-119,-26,-151,-68v-32,40,-81,65,-149,65v-145,0,-199,-107,-199,-238v0,-131,56,-243,201,-243v72,0,121,26,153,68xm617,-271v7,-76,-28,-129,-76,-129v-56,0,-92,46,-100,129r176,0xm339,-231v0,-66,-9,-168,-98,-168v-91,0,-102,101,-102,170v0,66,11,167,99,167v92,0,101,-100,101,-169","w":756,"k":{"v":13}},"\u00fe":{"d":"476,-228v0,148,-64,241,-183,241v-44,0,-79,-12,-106,-35r0,169v0,46,-18,76,-73,76r-80,0r0,-61v28,-1,59,7,59,-25r0,-760r-55,0r-12,-59v53,0,105,-7,137,-7v16,0,24,6,24,23r0,237v31,-29,70,-42,109,-42v106,0,180,80,180,243xm376,-229v0,-90,-30,-162,-101,-162v-55,0,-88,40,-88,102r0,131v0,67,42,99,88,99v67,0,101,-49,101,-170","w":514},"\u0155":{"d":"343,-389v-70,-11,-127,19,-151,49r0,257v-2,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v30,0,24,30,24,57v39,-38,65,-63,122,-63v38,0,28,47,29,82xm283,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":353,"k":{"g":3,"s":7,"e":7,"\u00e8":7,"\u00e9":7,"\u00ea":7,"\u011b":7,"\u00eb":7,"\u0113":7,"\u0115":7,"\u0117":7,"\u0119":7,"a":10,"\u00e0":10,"\u00e1":10,"\u00e2":10,"\u00e3":10,"\u00e4":10,"\u0101":10,"\u0103":10,"\u00e5":10,"\u01fb":10,"\u0105":10,"\u00e6":10,"\u01fd":10,"o":7,"\u00f2":7,"\u00f3":7,"\u00f4":7,"\u00f5":7,"\u00f6":7,"\u014d":7,"\u014f":7,"\u0151":7,"\u00f8":7,"\u01ff":7,"\u0153":7}},"\u0159":{"d":"343,-389v-70,-11,-127,19,-151,49r0,257v-2,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v30,0,24,30,24,57v39,-38,65,-63,122,-63v38,0,28,47,29,82xm314,-628r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":353,"k":{"g":3,"s":7,"e":7,"\u00e8":7,"\u00e9":7,"\u00ea":7,"\u011b":7,"\u00eb":7,"\u0113":7,"\u0115":7,"\u0117":7,"\u0119":7,"a":10,"\u00e0":10,"\u00e1":10,"\u00e2":10,"\u00e3":10,"\u00e4":10,"\u0101":10,"\u0103":10,"\u00e5":10,"\u01fb":10,"\u0105":10,"\u00e6":10,"\u01fd":10,"o":7,"\u00f2":7,"\u00f3":7,"\u00f4":7,"\u00f5":7,"\u00f6":7,"\u014d":7,"\u014f":7,"\u0151":7,"\u00f8":7,"\u01ff":7,"\u0153":7}},"\u0157":{"d":"343,-389v-70,-11,-127,19,-151,49r0,257v-2,29,26,25,53,25r0,58r-199,0r0,-58r52,0r0,-341r-55,0r-12,-59v53,0,105,-7,137,-7v30,0,24,30,24,57v39,-38,65,-63,122,-63v38,0,28,47,29,82xm194,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":353,"k":{"g":3,"s":7,"e":7,"\u00e8":7,"\u00e9":7,"\u00ea":7,"\u011b":7,"\u00eb":7,"\u0113":7,"\u0115":7,"\u0117":7,"\u0119":7,"a":10,"\u00e0":10,"\u00e1":10,"\u00e2":10,"\u00e3":10,"\u00e4":10,"\u0101":10,"\u0103":10,"\u00e5":10,"\u01fb":10,"\u0105":10,"\u00e6":10,"\u01fd":10,"o":7,"\u00f2":7,"\u00f3":7,"\u00f4":7,"\u00f5":7,"\u00f6":7,"\u014d":7,"\u014f":7,"\u0151":7,"\u00f8":7,"\u01ff":7,"\u0153":7}},"\u015b":{"d":"375,-119v0,69,-54,132,-154,132v-47,0,-91,-17,-113,-41r-3,28r-53,0r0,-174v25,0,55,-5,57,19v4,60,36,102,97,101v53,0,78,-28,78,-58v0,-54,-81,-74,-128,-93v-73,-29,-103,-74,-103,-136v0,-77,61,-130,144,-130v50,0,86,18,101,38r4,-25r53,0r0,169v-25,0,-52,5,-55,-19v-6,-56,-33,-101,-90,-100v-45,0,-68,25,-68,59v0,51,82,76,127,95v74,32,106,70,106,135xm293,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":410},"\u015d":{"d":"375,-119v0,69,-54,132,-154,132v-47,0,-91,-17,-113,-41r-3,28r-53,0r0,-174v25,0,55,-5,57,19v4,60,36,102,97,101v53,0,78,-28,78,-58v0,-54,-81,-74,-128,-93v-73,-29,-103,-74,-103,-136v0,-77,61,-130,144,-130v50,0,86,18,101,38r4,-25r53,0r0,169v-25,0,-52,5,-55,-19v-6,-56,-33,-101,-90,-100v-45,0,-68,25,-68,59v0,51,82,76,127,95v74,32,106,70,106,135xm321,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":410},"\u0161":{"d":"375,-119v0,69,-54,132,-154,132v-47,0,-91,-17,-113,-41r-3,28r-53,0r0,-174v25,0,55,-5,57,19v4,60,36,102,97,101v53,0,78,-28,78,-58v0,-54,-81,-74,-128,-93v-73,-29,-103,-74,-103,-136v0,-77,61,-130,144,-130v50,0,86,18,101,38r4,-25r53,0r0,169v-25,0,-52,5,-55,-19v-6,-56,-33,-101,-90,-100v-45,0,-68,25,-68,59v0,51,82,76,127,95v74,32,106,70,106,135xm321,-628r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":410},"\u015f":{"d":"303,98v0,34,-28,71,-77,71v-23,0,-46,-8,-60,-19r12,-34v24,19,69,17,69,-18v0,-29,-32,-31,-51,-20r-33,-14r18,-55v-31,-7,-58,-20,-73,-37r-3,28r-53,0r0,-174v25,0,55,-5,57,19v4,60,36,102,97,101v53,0,78,-28,78,-58v0,-54,-81,-74,-128,-93v-73,-29,-103,-74,-103,-136v0,-77,61,-130,144,-130v50,0,86,18,101,38r4,-25r53,0r0,169v-25,0,-52,5,-55,-19v-6,-56,-33,-101,-90,-100v-45,0,-68,25,-68,59v0,51,82,76,127,95v74,32,106,70,106,135v0,67,-51,129,-146,132r-8,24v43,-14,82,14,82,61","w":410},"\u0219":{"d":"375,-119v0,69,-54,132,-154,132v-47,0,-91,-17,-113,-41r-3,28r-53,0r0,-174v25,0,55,-5,57,19v4,60,36,102,97,101v53,0,78,-28,78,-58v0,-54,-81,-74,-128,-93v-73,-29,-103,-74,-103,-136v0,-77,61,-130,144,-130v50,0,86,18,101,38r4,-25r53,0r0,169v-25,0,-52,5,-55,-19v-6,-56,-33,-101,-90,-100v-45,0,-68,25,-68,59v0,51,82,76,127,95v74,32,106,70,106,135xm274,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":410},"\u00df":{"d":"537,-124v0,73,-55,137,-142,137v-50,0,-89,-16,-109,-41r-3,28r-53,0r0,-174v25,1,56,-6,57,19v3,61,36,100,89,100v40,0,71,-23,71,-59v0,-98,-207,-74,-207,-229v0,-109,113,-121,113,-206v0,-48,-34,-75,-77,-75v-59,0,-86,48,-86,113r0,511r-147,0r0,-58r53,0r0,-341r-67,0r0,-59r63,0v-12,-145,53,-233,184,-233v98,0,168,53,168,141v0,105,-108,122,-108,195v0,87,201,71,201,231","w":573},"\u0165":{"d":"214,12v-93,2,-137,-60,-137,-168r0,-243r-57,0r0,-59r57,0v4,-34,-13,-95,18,-101r74,-13r0,114r91,0r12,59r-101,0r0,248v-4,102,57,103,124,83r0,62v-23,10,-52,18,-81,18xm299,-649v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":324},"\u0163":{"d":"214,12v-93,2,-137,-60,-137,-168r0,-243r-57,0r0,-59r57,0v4,-34,-13,-95,18,-101r74,-13r0,114r91,0r12,59r-101,0r0,248v-4,102,57,103,124,83r0,62v-23,10,-52,18,-81,18xm233,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":324,"k":{"\u0163":7,"y":10,"w":3,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7,"e":10,"\u00e8":10,"\u00e9":10,"\u00ea":10,"\u011b":10,"\u00eb":10,"\u0113":10,"\u0115":10,"\u0117":10,"\u0119":10,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":7,"\u00f9":7,"\u00fa":7,"\u00fb":7,"\u0169":7,"\u00fc":7,"\u016b":7,"\u016d":7,"\u016f":7,"\u0171":7,"\u0173":7}},"\u021b":{"d":"214,12v-93,2,-137,-60,-137,-168r0,-243r-57,0r0,-59r57,0v4,-34,-13,-95,18,-101r74,-13r0,114r91,0r12,59r-101,0r0,248v-4,102,57,103,124,83r0,62v-23,10,-52,18,-81,18xm233,105v0,38,-21,85,-63,144r-29,-14v15,-29,32,-74,35,-96v-26,-3,-42,-22,-42,-42v0,-25,21,-43,47,-43v30,0,52,18,52,51","w":324,"k":{"\u021b":7,"y":10,"w":3,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7,"e":10,"\u00e8":10,"\u00e9":10,"\u00ea":10,"\u011b":10,"\u00eb":10,"\u0113":10,"\u0115":10,"\u0117":10,"\u0119":10,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":7,"\u00f9":7,"\u00fa":7,"\u00fb":7,"\u0169":7,"\u00fc":7,"\u016b":7,"\u016d":7,"\u016f":7,"\u0171":7,"\u0173":7}},"\u0167":{"d":"214,12v-93,2,-145,-61,-137,-168r0,-72r-53,0r0,-55r53,0r0,-116r-57,0r0,-59r57,0v4,-34,-13,-95,18,-101r74,-13r0,114r91,0r12,59r-101,0r0,116r87,0r0,55r-87,0r0,77v-4,102,57,103,124,83r0,62v-23,10,-52,18,-81,18","w":324,"k":{"\u0167":7,"y":10,"w":3,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7,"e":10,"\u00e8":10,"\u00e9":10,"\u00ea":10,"\u011b":10,"\u00eb":10,"\u0113":10,"\u0115":10,"\u0117":10,"\u0119":10,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":7,"\u00f9":7,"\u00fa":7,"\u00fb":7,"\u0169":7,"\u00fc":7,"\u016b":7,"\u016d":7,"\u016f":7,"\u0171":7,"\u0173":7}},"\u00f9":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm337,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":543,"k":{"v":10}},"\u00fa":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm339,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":543,"k":{"v":10}},"\u00fb":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm375,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":543,"k":{"v":10}},"\u0169":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm390,-629v-3,49,-22,95,-75,95v-33,0,-64,-34,-91,-34v-22,0,-34,14,-39,34r-36,0v2,-59,31,-95,75,-95v46,0,67,32,94,32v22,0,35,-12,41,-32r31,0","w":543,"k":{"v":10}},"\u00fc":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm385,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm231,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":543,"k":{"v":10}},"\u016b":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm387,-547r-242,0r0,-52r242,0r0,52","w":543,"k":{"v":10}},"\u016d":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm362,-624v1,60,-43,102,-101,103v-58,0,-101,-45,-101,-103r36,0v11,67,120,71,129,0r37,0","w":543,"k":{"v":10}},"\u016f":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm352,-573v0,55,-40,81,-82,81v-42,0,-82,-26,-82,-81v0,-55,40,-81,82,-81v42,0,82,26,82,81xm314,-573v0,-33,-19,-52,-44,-52v-25,0,-44,19,-44,52v0,33,19,52,44,52v25,0,44,-19,44,-52","w":543,"k":{"v":10}},"\u0171":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58v-68,-1,-135,12,-146,-52v-39,37,-93,65,-153,65xm414,-559v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59xm264,-559v-77,0,-99,43,-119,58r-17,-14v33,-47,69,-103,107,-103v35,1,29,28,29,59","w":543,"k":{"v":10}},"\u0173":{"d":"508,0v-48,-1,-79,28,-83,71v-4,36,52,44,74,26r0,38v-47,30,-130,-2,-130,-58v0,-29,18,-62,45,-79v-27,-4,-46,-19,-52,-50v-39,37,-93,65,-153,65v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,356v-1,33,31,28,61,28r0,58","w":543,"k":{"v":10}},"\u1e81":{"d":"674,-399v0,0,-56,-4,-66,30r-107,369r-90,0r-79,-285r-76,285r-90,0r-114,-399r-50,0r0,-59r198,0r0,59v-28,-2,-57,-3,-48,31r67,253r90,-343r63,0r89,335r77,-276r-60,0r0,-59r184,0xm432,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":670,"k":{"g":20,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7}},"\u1e83":{"d":"674,-399v0,0,-56,-4,-66,30r-107,369r-90,0r-79,-285r-76,285r-90,0r-114,-399r-50,0r0,-59r198,0r0,59v-28,-2,-57,-3,-48,31r67,253r90,-343r63,0r89,335r77,-276r-60,0r0,-59r184,0xm436,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":670,"k":{"g":20,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7}},"\u0175":{"d":"674,-399v0,0,-56,-4,-66,30r-107,369r-90,0r-79,-285r-76,285r-90,0r-114,-399r-50,0r0,-59r198,0r0,59v-28,-2,-57,-3,-48,31r67,253r90,-343r63,0r89,335r77,-276r-60,0r0,-59r184,0xm457,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":670},"\u1e85":{"d":"674,-399v0,0,-56,-4,-66,30r-107,369r-90,0r-79,-285r-76,285r-90,0r-114,-399r-50,0r0,-59r198,0r0,59v-28,-2,-57,-3,-48,31r67,253r90,-343r63,0r89,335r77,-276r-60,0r0,-59r184,0xm467,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm313,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":670,"k":{"g":20,"a":7,"\u00e0":7,"\u00e1":7,"\u00e2":7,"\u00e3":7,"\u00e4":7,"\u0101":7,"\u0103":7,"\u00e5":7,"\u01fb":7,"\u0105":7,"\u00e6":7,"\u01fd":7}},"\u1ef3":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-50,0r0,-59r193,0r12,59v-31,1,-61,-7,-61,30r0,398v0,108,-64,196,-216,196v-30,0,-73,-6,-105,-14r0,-73v31,9,72,16,108,16v131,0,120,-88,119,-197v-38,33,-88,56,-144,56xm352,-512r-17,14v-20,-15,-79,-51,-156,-51v2,-33,-9,-69,29,-69v38,0,111,59,144,106","w":538},"\u00fd":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-50,0r0,-59r193,0r12,59v-31,1,-61,-7,-61,30r0,398v0,108,-64,196,-216,196v-30,0,-73,-6,-105,-14r0,-73v31,9,72,16,108,16v131,0,120,-88,119,-197v-38,33,-88,56,-144,56xm362,-560v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":538},"\u0177":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-50,0r0,-59r193,0r12,59v-31,1,-61,-7,-61,30r0,398v0,108,-64,196,-216,196v-30,0,-73,-6,-105,-14r0,-73v31,9,72,16,108,16v131,0,120,-88,119,-197v-38,33,-88,56,-144,56xm385,-506r-41,0v-26,-20,-48,-43,-76,-61v-28,17,-50,42,-76,61r-40,0r83,-107v11,-16,25,-10,46,-11v9,0,14,3,20,11","w":538},"\u00ff":{"d":"209,13v-77,0,-118,-57,-118,-141r0,-271r-55,0r-12,-59v54,0,106,-7,137,-7v16,0,24,7,24,23r0,306v-2,106,126,63,168,19r0,-282r-50,0r0,-59r193,0r12,59v-31,1,-61,-7,-61,30r0,398v0,108,-64,196,-216,196v-30,0,-73,-6,-105,-14r0,-73v31,9,72,16,108,16v131,0,120,-88,119,-197v-38,33,-88,56,-144,56xm386,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47xm232,-571v0,27,-22,48,-49,48v-27,0,-48,-21,-48,-48v0,-27,21,-47,48,-47v27,0,49,20,49,47","w":538},"\u017a":{"d":"385,-458v2,46,-5,64,-29,98r-208,298r141,0v38,0,26,-47,37,-74r58,0r0,136r-346,0v-2,-42,4,-63,23,-91r212,-305r-134,0v-33,-4,-30,49,-38,74r-58,0r0,-136r342,0xm301,-549v-77,0,-136,36,-156,51r-17,-14v33,-47,106,-106,144,-106v38,0,27,36,29,69","w":420},"\u017e":{"d":"385,-458v2,46,-5,64,-29,98r-208,298r141,0v38,0,26,-47,37,-74r58,0r0,136r-346,0v-2,-42,4,-63,23,-91r212,-305r-134,0v-33,-4,-30,49,-38,74r-58,0r0,-136r342,0xm332,-628r-84,107v-12,16,-51,19,-66,0r-83,-107r40,0v26,20,48,43,76,61v28,-17,50,-42,76,-61r41,0","w":420},"\u017c":{"d":"385,-458v2,46,-5,64,-29,98r-208,298r141,0v38,0,26,-47,37,-74r58,0r0,136r-346,0v-2,-42,4,-63,23,-91r212,-305r-134,0v-33,-4,-30,49,-38,74r-58,0r0,-136r342,0xm276,-571v0,31,-27,56,-58,56v-31,0,-56,-25,-56,-56v0,-31,25,-56,56,-56v31,0,58,25,58,56","w":420},"\uf8ff":{"d":"426,-189r-245,0r0,-60r184,0r0,-63r-184,0r0,-182r245,0r0,61r-183,0r0,60r183,0r0,184xm426,-556r-305,0r0,495r68,0r0,61r-129,0r0,-616r366,0r0,60","w":486}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Trademark:
 * FS Clerkenwell Bold is a trademark of Fontsmith Ltd.
 * 
 * Full name:
 * FSClerkenwell-Bold
 * 
 * Description:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Manufacturer:
 * Fontsmith Ltd
 * 
 * Designer:
 * Phil Garnham and Jason Smith
 * 
 * Vendor URL:
 * http://www.fontsmith.com/
 * 
 * License information:
 * http://www.fontsmith.com
 */
Cufon.registerFont({"w":328,"face":{"font-family":"FS Clerkenwell","font-weight":700,"font-stretch":"normal","units-per-em":"1000","panose-1":"2 0 8 3 2 0 0 2 0 4","ascent":"730","descent":"-270","x-height":"13","bbox":"-110 -893 1129 277","underline-thickness":"20","underline-position":"-113","stemh":"81","stemv":"154","unicode-range":"U+0020-U+FB02"},"glyphs":{" ":{"w":240},"\ufb01":{"d":"583,-604v0,49,-40,78,-86,78v-46,0,-86,-29,-86,-78v0,-49,40,-78,86,-78v46,0,86,29,86,78xm634,0r-259,0r0,-69r52,0r0,-319r-183,0r0,290v-2,28,24,30,53,29r0,69r-259,0r0,-69r52,0r0,-319r-69,0r0,-70r63,0v-4,-15,-11,-55,-11,-84v0,-92,59,-149,171,-149v46,0,103,11,136,23r-13,89v-52,-16,-144,-34,-141,46v0,21,5,53,10,75r99,0v93,0,172,-7,208,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69","w":662},"\ufb02":{"d":"336,-691v175,0,248,67,248,256r0,336v-2,31,23,31,53,30r0,69r-259,0r0,-69r52,0r0,-399v0,-82,-21,-130,-94,-130v-83,1,-101,62,-98,140r98,0r0,70r-94,0r0,287v-2,31,22,34,53,32r0,69r-259,0r0,-69r52,0r0,-319r-67,0r0,-70r63,0v-12,-159,89,-233,252,-233","w":665},"\u00a0":{"w":240},"A":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"B":{"d":"314,-616v140,-4,241,30,241,150v0,59,-37,114,-111,127v104,14,155,66,155,153v0,47,-17,90,-48,128v-61,76,-338,54,-500,58r0,-81r56,0r0,-413v5,-39,-28,-43,-69,-41r0,-81r276,0xm391,-455v2,-68,-46,-84,-120,-80r0,165v73,4,118,-2,120,-85xm431,-186v0,-90,-59,-115,-160,-109r0,173v-4,42,28,41,68,41v65,0,92,-43,92,-105","w":635},"C":{"d":"46,-308v0,-183,94,-320,263,-320v51,0,99,13,130,45r5,-34r73,0r0,229v-36,-1,-79,7,-84,-27v-9,-55,-17,-109,-92,-109v-72,0,-124,58,-124,207v0,151,49,224,132,224v53,0,103,-31,132,-60r56,64v-42,49,-123,101,-218,101v-166,0,-273,-116,-273,-320","w":581},"D":{"d":"635,-306v0,191,-100,306,-323,306r-261,0v1,-26,-2,-57,1,-81r55,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r185,0v176,0,246,12,316,72v64,55,96,140,96,238xm464,-309v-1,-148,-38,-237,-193,-226r0,414v-2,35,27,40,65,40v81,0,128,-57,128,-228","w":679},"E":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206","w":609},"F":{"d":"540,-387v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v-4,43,29,42,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0","w":580,"k":{"s":30,"c":26,"a":26,"\u00e0":26,"\u00e1":26,"\u00e2":26,"\u00e3":26,"\u00e4":26,"\u0101":26,"\u0103":26,"\u00e5":26,"\u01fb":26,"\u0105":26,"\u00e6":26,"\u01fd":26,"A":67,"\u00c0":67,"\u00c1":67,"\u00c2":67,"\u00c3":67,"\u00c4":67,"\u0100":67,"\u0102":67,"\u00c5":67,"\u01fa":67,"\u0104":67,"\u00c6":67,"\u01fc":67,"e":23,"\u00e8":23,"\u00e9":23,"\u00ea":23,"\u011b":23,"\u00eb":23,"\u0113":23,"\u0115":23,"\u0117":23,"\u0119":23,"o":20,"\u00f2":20,"\u00f3":20,"\u00f4":20,"\u00f5":20,"\u00f6":20,"\u014d":20,"\u014f":20,"\u0151":20,"\u00f8":20,"\u01ff":20,"\u0153":20}},"G":{"d":"364,-529v-97,0,-147,104,-147,221v0,193,73,243,195,202v-4,-54,22,-128,-58,-113r0,-81r267,0r0,81r-47,0r0,220r-112,0r-16,-30v-29,21,-84,41,-142,41v-131,0,-258,-84,-258,-316v0,-193,122,-324,292,-324v67,0,118,22,148,55r8,-43r69,0r0,223v-38,-1,-79,8,-83,-29v-6,-67,-46,-108,-116,-107","w":669,"k":{"v":18,"w":18,"y":10}},"H":{"d":"680,0r-289,0r0,-81r56,0r0,-187r-176,0r0,146v-5,38,28,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,174r176,0r0,-133v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81","w":718},"I":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81","w":386},"J":{"d":"394,-182v0,133,-80,194,-203,194v-46,0,-109,-10,-145,-25r0,-101v35,18,70,29,111,29v61,0,73,-36,73,-77r0,-337v0,-26,-10,-36,-41,-36r-108,0r-23,-81r336,0r0,434","w":479,"k":{"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10}},"K":{"d":"677,0r-213,0r-193,-280r0,158v-5,39,29,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,185v58,-70,179,-203,209,-266r161,0r0,81v-51,0,-81,-2,-109,31r-123,143r169,239v20,33,47,44,99,41r0,81","w":691,"k":{"y":16,"w":20,"v":20,"u":16,"\u00f9":16,"\u00fa":16,"\u00fb":16,"\u0169":16,"\u00fc":16,"\u016b":16,"\u016d":16,"\u016f":16,"\u0171":16,"\u0173":16}},"L":{"d":"547,0r-496,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v0,32,11,41,42,41r134,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206","w":589,"k":{"y":14,"w":16,"v":16,"V":78,"U":16,"u":14,"\u00f9":14,"\u00fa":14,"\u00fb":14,"\u0169":14,"\u00fc":14,"\u016b":14,"\u016d":14,"\u016f":14,"\u0171":14,"\u0173":14,"W":78,"\u1e80":78,"\u1e82":78,"\u0174":78,"\u1e84":78,"Y":55,"\u1ef2":55,"\u00dd":55,"\u0176":55,"\u0178":55}},"M":{"d":"802,0r-245,0r0,-81r56,0r0,-234r-153,315r-66,0r-172,-315r0,193v-5,39,29,43,70,41r0,81r-241,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r168,0r230,430r203,-430r150,0r0,81r-56,0r0,413v-5,37,29,44,69,41r0,81","w":840},"N":{"d":"655,-535r-56,0r0,535r-88,0r-291,-364r0,242v-5,39,29,44,69,41r0,81r-238,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r155,0r292,358r0,-236v5,-41,-28,-43,-69,-41r0,-81r239,0r0,81","w":703,"k":{"y":26,"x":26,"w":24,"v":24,"s":30,"c":21,"a":22,"\u00e0":22,"\u00e1":22,"\u00e2":22,"\u00e3":22,"\u00e4":22,"\u0101":22,"\u0103":22,"\u00e5":22,"\u01fb":22,"\u0105":22,"\u00e6":22,"\u01fd":22,"u":26,"\u00f9":26,"\u00fa":26,"\u00fb":26,"\u0169":26,"\u00fc":26,"\u016b":26,"\u016d":26,"\u016f":26,"\u0171":26,"\u0173":26,"o":20,"\u00f2":20,"\u00f3":20,"\u00f4":20,"\u00f5":20,"\u00f6":20,"\u014d":20,"\u014f":20,"\u0151":20,"\u00f8":20,"\u01ff":20,"\u0153":20}},"O":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"P":{"d":"579,-425v0,115,-58,199,-260,199r-48,0v8,56,-28,148,42,145r27,0r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r246,0v135,0,295,11,295,191xm409,-425v0,-86,-45,-118,-138,-110r0,226r48,0v69,0,90,-41,90,-116","w":613,"k":{"X":18,"V":14,"U":14,"J":16,"a":12,"\u00e0":12,"\u00e1":12,"\u00e2":12,"\u00e3":12,"\u00e4":12,"\u0101":12,"\u0103":12,"\u00e5":12,"\u01fb":12,"\u0105":12,"\u00e6":12,"\u01fd":12,"A":66,"\u00c0":66,"\u00c1":66,"\u00c2":66,"\u00c3":66,"\u00c4":66,"\u0100":66,"\u0102":66,"\u00c5":66,"\u01fa":66,"\u0104":66,"\u00c6":66,"\u01fc":66,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"o":15,"\u00f2":15,"\u00f3":15,"\u00f4":15,"\u00f5":15,"\u00f6":15,"\u014d":15,"\u014f":15,"\u0151":15,"\u00f8":15,"\u01ff":15,"\u0153":15,"W":14,"\u1e80":14,"\u1e82":14,"\u0174":14,"\u1e84":14,"Y":24,"\u1ef2":24,"\u00dd":24,"\u0176":24,"\u0178":24}},"Q":{"d":"602,-308v0,202,-122,358,-349,312v-25,44,-10,81,66,81v82,0,164,-35,226,-45r0,94v-96,20,-168,53,-258,53v-110,0,-184,-52,-184,-136v0,-37,21,-73,45,-97v-74,-65,-100,-166,-100,-262v0,-178,84,-320,277,-320v193,0,277,142,277,320xm431,-308v0,-67,-11,-209,-106,-209v-95,0,-106,142,-106,209v0,67,11,209,106,209v95,0,106,-142,106,-209","w":650},"R":{"d":"299,-616v170,-3,282,36,282,184v0,69,-28,126,-105,161r92,154v20,33,44,38,89,36r0,81r-198,0r-132,-244r-56,0r0,122v-5,39,29,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r261,0xm409,-429v0,-91,-48,-113,-138,-106r0,210r41,0v78,0,97,-42,97,-104","w":677,"k":{"v":26}},"S":{"d":"275,-92v43,-1,74,-19,78,-55v6,-57,-105,-87,-157,-110v-95,-42,-142,-103,-142,-181v0,-119,95,-190,210,-190v58,0,104,17,132,43r4,-31r84,0r0,235v-34,-1,-77,8,-82,-24v-10,-64,-38,-116,-110,-118v-41,0,-74,23,-74,56v0,56,117,95,172,122v68,33,133,78,133,170v0,107,-76,187,-229,187v-56,0,-109,-21,-137,-47r-6,35r-84,0r0,-239v39,3,87,-13,90,29v6,72,46,120,118,118","w":563},"T":{"d":"583,-400v-32,-2,-76,10,-81,-23r-13,-85v-5,-46,-58,-21,-98,-27r0,413v-5,39,29,44,69,41r0,81r-292,0r0,-81r59,0r0,-454v-40,6,-92,-18,-98,27r-12,85v0,35,-50,20,-82,23r5,-216r538,0","w":618,"k":{"q":11,"e":18,"\u00e8":18,"\u00e9":18,"\u00ea":18,"\u011b":18,"\u00eb":18,"\u0113":18,"\u0115":18,"\u0117":18,"\u0119":18,"A":38,"\u00c0":38,"\u00c1":38,"\u00c2":38,"\u00c3":38,"\u00c4":38,"\u0100":38,"\u0102":38,"\u00c5":38,"\u01fa":38,"\u0104":38,"\u00c6":38,"\u01fc":38,"o":12,"\u00f2":12,"\u00f3":12,"\u00f4":12,"\u00f5":12,"\u00f6":12,"\u014d":12,"\u014f":12,"\u0151":12,"\u00f8":12,"\u01ff":12,"\u0153":12}},"U":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157","w":691,"k":{"w":15,"v":15,"q":10,"g":31,"c":16,"e":16,"\u00e8":16,"\u00e9":16,"\u00ea":16,"\u011b":16,"\u00eb":16,"\u0113":16,"\u0115":16,"\u0117":16,"\u0119":16,"i":3,"\u0131":3,"\u00ec":3,"\u00ed":3,"\u00ee":3,"\u0129":3,"\u00ef":3,"\u012b":3,"\u012d":3,"\u012f":3,"\u0133":3}},"V":{"d":"640,-535v-48,-2,-71,3,-86,43r-180,492r-108,0r-163,-493v-14,-46,-37,-42,-83,-42r0,-81r287,0r0,81r-51,0r96,318r108,-318r-49,0r0,-81r229,0r0,81","w":660,"k":{"y":32,"g":50,"Q":12,"J":7,"a":57,"\u00e0":57,"\u00e1":57,"\u00e2":57,"\u00e3":57,"\u00e4":57,"\u0101":57,"\u0103":57,"\u00e5":57,"\u01fb":57,"\u0105":57,"\u00e6":57,"\u01fd":57,"u":32,"\u00f9":32,"\u00fa":32,"\u00fb":32,"\u0169":32,"\u00fc":32,"\u016b":32,"\u016d":32,"\u016f":32,"\u0171":32,"\u0173":32,"A":98,"\u00c0":98,"\u00c1":98,"\u00c2":98,"\u00c3":98,"\u00c4":98,"\u0100":98,"\u0102":98,"\u00c5":98,"\u01fa":98,"\u0104":98,"\u00c6":98,"\u01fc":98,"e":50,"\u00e8":50,"\u00e9":50,"\u00ea":50,"\u011b":50,"\u00eb":50,"\u0113":50,"\u0115":50,"\u0117":50,"\u0119":50,"o":50,"\u00f2":50,"\u00f3":50,"\u00f4":50,"\u00f5":50,"\u00f6":50,"\u014d":50,"\u014f":50,"\u0151":50,"\u00f8":50,"\u01ff":50,"\u0153":50,"i":5,"\u0131":5,"\u00ec":5,"\u00ed":5,"\u00ee":5,"\u0129":5,"\u00ef":5,"\u012b":5,"\u012d":5,"\u012f":5,"\u0133":5,"C":33,"\u0106":33,"\u00c7":33,"\u0108":33,"\u010c":33,"\u010a":33,"G":33,"\u011c":33,"\u011e":33,"\u0120":33,"\u0122":33,"O":12,"\u00d2":12,"\u00d3":12,"\u00d4":12,"\u00d5":12,"\u00d6":12,"\u014c":12,"\u014e":12,"\u0150":12,"\u00d8":12,"\u01fe":12,"\u0152":12}},"W":{"d":"926,-535v-49,0,-76,-6,-91,43r-147,492r-117,0r-97,-316r-107,316r-121,0r-140,-489v-11,-48,-36,-47,-86,-46r0,-81r286,0r0,81r-50,0r78,317r133,-398r66,0r124,398r84,-317r-46,0r0,-81r231,0r0,81","w":946,"k":{"Q":12,"U":4,"y":30,"s":63,"u":30,"\u00f9":30,"\u00fa":30,"\u00fb":30,"\u0169":30,"\u00fc":30,"\u016b":30,"\u016d":30,"\u016f":30,"\u0171":30,"\u0173":30,"O":12,"\u00d2":12,"\u00d3":12,"\u00d4":12,"\u00d5":12,"\u00d6":12,"\u014c":12,"\u014e":12,"\u0150":12,"\u00d8":12,"\u01fe":12,"\u0152":12,"e":53,"\u00e8":53,"\u00e9":53,"\u00ea":53,"\u011b":53,"\u00eb":53,"\u0113":53,"\u0115":53,"\u0117":53,"\u0119":53,"A":90,"\u00c0":90,"\u00c1":90,"\u00c2":90,"\u00c3":90,"\u00c4":90,"\u0100":90,"\u0102":90,"\u00c5":90,"\u01fa":90,"\u0104":90,"\u00c6":90,"\u01fc":90,"o":57,"\u00f2":57,"\u00f3":57,"\u00f4":57,"\u00f5":57,"\u00f6":57,"\u014d":57,"\u014f":57,"\u0151":57,"\u00f8":57,"\u01ff":57,"\u0153":57,"a":55,"\u00e0":55,"\u00e1":55,"\u00e2":55,"\u00e3":55,"\u00e4":55,"\u0101":55,"\u0103":55,"\u00e5":55,"\u01fb":55,"\u0105":55,"\u00e6":55,"\u01fd":55}},"X":{"d":"667,0r-296,0r0,-81r42,0r-76,-122r-71,122r42,0r0,81r-277,0r0,-81v54,1,87,-2,110,-39r115,-182r-136,-202v-15,-29,-44,-32,-90,-31r0,-81r270,0r0,81r-35,0r78,119r66,-119r-35,0r0,-81r256,0r0,81v-52,0,-84,-4,-107,36r-100,176r138,204v25,37,55,40,106,38r0,81","w":681},"Y":{"d":"633,-535v-55,-1,-74,0,-99,50r-128,249r0,114v-4,36,23,44,62,41r0,81r-286,0r0,-81r60,0r0,-153r-129,-255v-20,-43,-41,-48,-93,-46r0,-81r285,0r0,81r-40,0r84,173r91,-173r-39,0r0,-81r232,0r0,81","w":653,"k":{"Q":11,"q":54,"C":15,"\u0106":15,"\u00c7":15,"\u0108":15,"\u010c":15,"\u010a":15,"G":15,"\u011c":15,"\u011e":15,"\u0120":15,"\u0122":15,"O":11,"\u00d2":11,"\u00d3":11,"\u00d4":11,"\u00d5":11,"\u00d6":11,"\u014c":11,"\u014e":11,"\u0150":11,"\u00d8":11,"\u01fe":11,"\u0152":11,"e":60,"\u00e8":60,"\u00e9":60,"\u00ea":60,"\u011b":60,"\u00eb":60,"\u0113":60,"\u0115":60,"\u0117":60,"\u0119":60,"A":54,"\u00c0":54,"\u00c1":54,"\u00c2":54,"\u00c3":54,"\u00c4":54,"\u0100":54,"\u0102":54,"\u00c5":54,"\u01fa":54,"\u0104":54,"\u00c6":54,"\u01fc":54,"o":60,"\u00f2":60,"\u00f3":60,"\u00f4":60,"\u00f5":60,"\u00f6":60,"\u014d":60,"\u014f":60,"\u0151":60,"\u00f8":60,"\u01ff":60,"\u0153":60,"a":60,"\u00e0":60,"\u00e1":60,"\u00e2":60,"\u00e3":60,"\u00e4":60,"\u0101":60,"\u0103":60,"\u00e5":60,"\u01fb":60,"\u0105":60,"\u00e6":60,"\u01fd":60}},"Z":{"d":"533,-616v2,96,1,89,-68,192r-231,343r151,0v61,5,48,-48,62,-87r81,0r0,168r-485,0v-2,-92,2,-92,58,-176r241,-359r-156,0v-60,-8,-54,55,-67,98r-79,0r0,-179r493,0","w":573},"a":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38","w":516},"b":{"d":"347,-471v132,0,191,102,191,242v0,122,-60,242,-205,242v-50,0,-97,-19,-121,-53v-27,54,-113,38,-188,40r0,-69v29,1,62,2,62,-26r0,-517r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,217v34,-20,80,-29,107,-29xm378,-232v0,-149,-52,-169,-138,-126r0,199v0,49,25,76,64,76v51,0,74,-54,74,-149","w":570},"c":{"d":"192,-228v0,90,23,148,103,148v42,0,88,-20,110,-37r39,66v-34,31,-106,64,-178,64v-149,0,-234,-93,-234,-240v0,-161,102,-244,227,-244v47,0,88,15,112,38r7,-25r54,0r0,187v-34,-1,-73,8,-74,-27v-1,-50,-26,-88,-72,-85v-79,4,-94,69,-94,155","w":484},"d":{"d":"539,0v-69,-3,-154,14,-180,-34v-24,25,-71,47,-123,47v-127,0,-204,-96,-204,-246v0,-190,137,-272,291,-224r0,-155r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,559v-5,30,30,33,62,31r0,69xm323,-98r0,-278v-78,-30,-131,-9,-131,145v0,118,39,152,79,152v25,0,42,-11,52,-19","w":557},"e":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0","w":508},"f":{"d":"360,-580v-54,-18,-143,-30,-141,47v0,20,10,62,16,75r100,0r14,70r-105,0r0,290v-2,28,24,30,53,29r0,69r-259,0r0,-69r52,0r0,-319r-69,0r0,-70r58,0v-5,-15,-13,-57,-13,-80v0,-102,66,-153,171,-153v49,0,101,13,123,22r0,89","w":364,"k":{"v":-6}},"g":{"d":"514,70v0,79,-68,158,-250,158v-129,0,-230,-44,-230,-139v0,-45,28,-74,65,-86v-49,-42,-39,-114,10,-161v-32,-31,-49,-75,-49,-129v0,-131,110,-202,259,-180v43,-63,89,-86,132,-86v50,-1,47,38,46,83v-31,-1,-67,-1,-105,27v55,30,86,84,86,156v0,146,-151,215,-299,171v-17,40,1,46,74,47r85,0v123,0,176,49,176,139xm325,-287v0,-62,-14,-101,-56,-101v-42,0,-56,39,-56,101v0,62,14,101,56,101v42,0,56,-39,56,-101xm383,83v0,-66,-170,-28,-211,-44v-35,54,25,96,100,96v75,0,111,-26,111,-52","w":542},"h":{"d":"240,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-250,0r0,-69r43,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,31,22,29,51,29r0,69r-257,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,239","w":599},"i":{"d":"249,-604v0,49,-40,78,-86,78v-46,0,-86,-29,-86,-78v0,-49,40,-78,86,-78v46,0,86,29,86,78xm300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69"},"j":{"d":"244,-604v0,49,-40,78,-86,78v-46,0,-86,-29,-86,-78v0,-49,40,-78,86,-78v46,0,86,29,86,78xm252,9v0,127,-44,186,-170,186v-39,0,-86,-6,-122,-19r0,-90v56,19,138,32,138,-53r0,-421r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,444","w":332},"k":{"d":"577,0r-252,0r0,-69r33,0r-81,-147r-37,32v6,51,-25,128,51,115r0,69r-257,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,369v51,-47,144,-113,169,-168r135,0r0,70v-46,1,-66,-4,-99,24r-63,55r112,200v21,37,39,42,83,40r0,69","w":592},"l":{"d":"293,0r-259,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,561v-2,32,24,29,53,29r0,69","w":321},"m":{"d":"655,-471v88,1,145,54,145,152r0,221v-2,33,24,29,53,29r0,69r-249,0r0,-69r42,0r0,-244v-2,-76,-83,-66,-125,-24r1,239v-1,31,20,29,48,29r0,69r-244,0r0,-69r42,0r0,-244v0,-78,-88,-63,-124,-23r0,238v-1,30,20,30,48,29r0,69r-254,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45v48,-38,98,-51,133,-51v52,-1,101,23,124,60v38,-34,92,-60,154,-60","w":877},"n":{"d":"244,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-252,0r0,-69r45,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,30,21,30,49,29r0,69r-255,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45","w":603},"o":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147","w":528},"p":{"d":"538,-229v-3,133,-52,242,-192,242v-44,0,-83,-13,-105,-34v-9,109,40,250,-92,244r-128,0r0,-73v29,1,65,4,65,-26r0,-512r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45v138,-113,303,-34,298,191xm378,-229v0,-147,-61,-168,-138,-107r0,178v0,49,23,74,62,74v48,0,76,-50,76,-145","w":570},"q":{"d":"559,-388r-82,0r0,512v-2,38,43,23,75,26r0,73v-102,-3,-225,26,-225,-87r0,-149v-147,70,-295,-7,-295,-211v0,-176,97,-247,186,-247v45,0,80,18,105,43v-1,-24,7,-37,37,-37v55,0,94,7,185,7xm323,-96r0,-247v-64,-58,-131,-14,-131,117v0,91,23,146,78,146v22,0,43,-9,53,-16","w":560,"k":{"v":-16}},"r":{"d":"397,-358v-63,-3,-99,0,-154,34r0,226v-2,32,24,29,53,29r0,69r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v37,0,40,20,38,55v29,-37,74,-61,120,-61v56,0,27,68,34,113","w":407},"s":{"d":"418,-125v0,129,-210,181,-305,96r-7,29r-55,0r0,-183v33,2,73,-10,73,26v0,55,37,87,95,87v34,0,57,-17,57,-38v0,-40,-84,-60,-120,-76v-63,-27,-111,-66,-111,-143v0,-135,201,-185,286,-105r5,-26r55,0r0,180v-33,0,-72,6,-72,-27v0,-51,-29,-84,-77,-84v-32,0,-55,18,-55,41v0,42,89,65,127,83v63,30,104,67,104,140","w":446},"t":{"d":"223,-181v-2,63,16,96,63,98v21,0,46,-6,61,-11r0,86v-24,8,-69,20,-118,20v-120,0,-160,-55,-160,-196r0,-204r-57,0r0,-70r57,0v-1,-50,-5,-95,43,-102r109,-17r0,119r95,0r14,70r-107,0r0,207","w":369},"u":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69","w":602},"v":{"d":"531,-388v-41,1,-62,-6,-77,36r-133,352r-125,0r-154,-388r-51,0r0,-70r260,0r0,70v-36,-4,-56,9,-44,42r71,192r79,-234r-47,0r0,-70r207,0","w":512,"k":{"y":-19,"x":-12,"t":-18,"f":-10}},"w":{"d":"752,-388v-48,-2,-75,2,-87,46r-99,342r-124,0r-68,-218r-70,218r-125,0r-126,-388r-52,0r0,-70r253,0r0,70v-35,-4,-55,6,-45,40r55,186r94,-296r64,0r96,297r60,-227r-52,0r0,-70r212,0","w":735,"k":{"y":-15,"x":-12,"t":-18,"f":-6}},"x":{"d":"547,0r-242,0r0,-69v10,0,31,3,31,-13v-7,-25,-30,-37,-44,-56r-56,69r35,0r0,69r-241,0r0,-69v41,0,62,2,89,-31r99,-120r-147,-168r-51,0r0,-70r248,0r0,70v-9,0,-25,-2,-25,12v7,25,29,37,42,57r56,-69r-38,0r0,-70r225,0r13,70v-38,0,-59,-6,-84,25r-103,126r144,168r49,0r0,69","w":567},"y":{"d":"364,-38v-114,94,-282,59,-282,-100r0,-250r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v0,80,91,62,128,23r0,-266r-49,0r0,-70r252,0r14,70v-36,-1,-64,-1,-63,38r0,311v7,173,-62,263,-244,263v-50,0,-107,-9,-139,-19r0,-97v42,15,84,23,126,23v99,0,109,-70,103,-169","w":595},"z":{"d":"451,0r-411,0v-3,-43,5,-71,24,-97r213,-286r-110,0v-40,-4,-34,40,-42,69r-79,0r0,-144r401,0v2,51,-2,74,-29,110r-203,273r117,0v43,2,32,-39,40,-69r79,0r0,144","w":491},"&":{"d":"666,1v-105,3,-210,1,-236,-73v-30,50,-100,83,-173,83v-134,0,-227,-64,-227,-193v0,-85,56,-151,166,-169v-67,-15,-113,-61,-113,-125v0,-95,96,-152,230,-152v170,0,254,81,241,239v38,4,99,-16,99,29r0,58r-99,0v3,92,-23,227,74,221r38,0r0,82xm392,-186r0,-245v0,-64,-23,-101,-76,-101v-43,0,-74,23,-74,70v0,54,46,80,112,73r0,87v-87,-6,-149,12,-149,105v0,65,35,104,95,104v69,0,92,-49,92,-93","w":696},"@":{"d":"822,-330v0,104,-75,201,-224,201v-41,0,-86,-13,-104,-54v-17,37,-59,60,-99,60v-92,0,-149,-53,-149,-146v0,-126,89,-220,216,-220v47,0,114,18,154,43r-21,200v0,24,6,44,34,44v58,0,67,-114,67,-153v0,-144,-108,-207,-240,-207v-157,0,-283,108,-283,269v0,83,30,146,80,186v101,81,291,54,409,20r14,49v-49,23,-167,49,-280,49v-188,0,-352,-106,-352,-284v0,-209,198,-355,429,-355v189,0,349,107,349,298xm481,-425v-85,-11,-104,102,-104,162v0,28,11,57,43,57v21,0,38,-19,40,-39","w":866},"!":{"d":"214,-539v0,52,-48,280,-48,363r-65,0v0,-87,-47,-309,-47,-363v0,-61,32,-89,80,-89v49,0,80,27,80,89xm198,-51v0,35,-30,63,-65,63v-35,0,-62,-28,-62,-63v0,-35,27,-62,62,-62v35,0,65,27,65,62","w":268},"\u00a1":{"d":"214,-78v0,62,-31,89,-80,89v-48,0,-80,-28,-80,-89v0,-54,47,-276,47,-363r65,0v0,83,48,311,48,363xm198,-566v0,35,-30,62,-65,62v-35,0,-62,-27,-62,-62v0,-35,27,-63,62,-63v35,0,65,28,65,63","w":268},"?":{"d":"382,-481v0,134,-135,151,-172,306r-65,0v9,-162,80,-206,80,-291v-1,-92,-117,-73,-183,-45r0,-92v43,-16,96,-25,148,-25v128,0,192,62,192,147xm242,-51v0,35,-30,63,-65,63v-35,0,-62,-28,-62,-63v0,-35,27,-62,62,-62v35,0,65,27,65,62","w":414},"\u00bf":{"d":"32,-137v0,-134,135,-151,172,-306r65,0v-9,162,-80,206,-80,291v1,92,117,73,183,45r0,92v-43,16,-96,25,-148,25v-128,0,-192,-62,-192,-147xm172,-567v0,-35,30,-63,65,-63v35,0,62,28,62,63v0,35,-27,62,-62,62v-35,0,-65,-27,-65,-62","w":396},"*":{"d":"351,-394v-13,27,-40,34,-61,22v-21,-12,-51,-56,-81,-84v10,39,33,86,33,112v0,22,-17,42,-49,42v-90,0,-30,-91,-16,-156v-29,28,-59,73,-82,86v-19,11,-48,6,-61,-22v-37,-78,60,-72,125,-91v-65,-20,-162,-12,-125,-92v13,-28,42,-32,61,-21v23,13,52,57,81,85v-9,-41,-32,-88,-32,-113v0,-25,18,-42,49,-42v90,0,31,91,16,154v30,-28,60,-72,81,-84v21,-12,48,-6,61,21v37,80,-63,74,-127,92v63,19,164,11,127,91","w":384},".":{"d":"160,-53v0,36,-29,65,-65,65v-36,0,-64,-29,-64,-65v0,-36,28,-64,64,-64v36,0,65,28,65,64","w":178},",":{"d":"159,-37v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72","w":179},":":{"d":"160,-322v0,36,-29,65,-65,65v-36,0,-64,-29,-64,-65v0,-36,28,-64,64,-64v36,0,65,28,65,64xm160,-53v0,36,-29,65,-65,65v-36,0,-64,-29,-64,-65v0,-36,28,-64,64,-64v36,0,65,28,65,64","w":188},";":{"d":"157,-324v0,36,-29,65,-65,65v-36,0,-64,-29,-64,-65v0,-36,28,-64,64,-64v36,0,65,28,65,64xm159,-37v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72","w":189},"\u2026":{"d":"573,-53v0,36,-29,65,-65,65v-36,0,-64,-29,-64,-65v0,-36,28,-64,64,-64v36,0,65,28,65,64xm366,-53v0,36,-29,65,-65,65v-36,0,-64,-29,-64,-65v0,-36,28,-64,64,-64v36,0,65,28,65,64xm160,-53v0,36,-29,65,-65,65v-36,0,-64,-29,-64,-65v0,-36,28,-64,64,-64v36,0,65,28,65,64","w":592},"\u00b7":{"d":"157,-271v0,35,-30,63,-65,63v-35,0,-62,-28,-62,-63v0,-35,27,-62,62,-62v35,0,65,27,65,62","w":187},"\u2022":{"d":"350,-302v0,82,-71,147,-153,147v-82,0,-144,-65,-144,-147v0,-82,62,-144,144,-144v82,0,153,62,153,144","w":403},"\/":{"d":"436,-682r-341,743r-137,0r341,-743r137,0","w":394},"(":{"d":"328,172r-28,44v-160,-65,-253,-247,-253,-453v0,-206,93,-387,253,-452r28,44v-81,76,-113,190,-113,410v0,220,32,331,113,407","w":332},"\u00a6":{"d":"190,-334r-132,0r0,-346r132,0r0,346xm190,200r-132,0r0,-346r132,0r0,346","w":248},")":{"d":"285,-237v0,206,-93,388,-253,453r-28,-44v81,-76,113,-187,113,-407v0,-220,-32,-334,-113,-410r28,-44v160,65,253,246,253,452","w":332},"[":{"d":"368,193r-287,0r0,-875r287,0r0,92r-126,0r0,691r126,0r0,92"},"\\":{"d":"436,61r-137,0r-341,-743r137,0","w":394},"]":{"d":"247,193r-287,0r0,-92r126,0r0,-691r-126,0r0,-92r287,0r0,875"},"{":{"d":"427,224v-150,0,-241,-21,-241,-191v0,-82,44,-205,-46,-222r-60,-8r0,-65r60,-8v91,-16,46,-140,46,-221v0,-170,91,-191,241,-191r0,80v-120,2,-65,146,-65,238v0,75,-22,116,-134,135v180,20,119,144,119,282v0,59,21,86,80,91r0,80","w":457},"|":{"d":"190,260r-132,0r0,-1000r132,0r0,1000","w":248},"}":{"d":"377,-197r-60,8v-91,17,-46,141,-46,222v0,170,-91,191,-241,191r0,-80v120,-2,65,-146,65,-238v0,-75,22,-116,134,-135v-180,-20,-119,-144,-119,-282v0,-59,-21,-86,-80,-91r0,-80v150,0,241,21,241,191v0,81,-45,204,46,221r60,8r0,65","w":457},"-":{"d":"274,-187r-234,0r0,-104r234,0r0,104","w":314},"\u00ad":{"d":"274,-187r-234,0r0,-104r234,0r0,104","w":314},"\u2013":{"d":"500,-214r-500,0r0,-70r500,0r0,70","w":500},"\u2014":{"d":"1000,-214r-1000,0r0,-70r1000,0r0,70","w":1000},"_":{"d":"426,90r-426,0r0,-64r426,0r0,64","w":426},"\u2020":{"d":"514,-399v0,34,-23,62,-62,62v-39,0,-96,-36,-150,-43v3,166,42,404,42,511v0,41,-28,62,-60,62v-34,0,-61,-23,-61,-62v0,-101,40,-344,43,-511v-54,8,-110,43,-148,43v-39,0,-62,-28,-62,-62v0,-32,21,-61,62,-61v35,0,94,33,147,41v-8,-53,-43,-109,-43,-147v0,-39,28,-62,62,-62v32,0,61,21,61,62v0,36,-35,95,-42,148v54,-7,113,-42,149,-42v41,0,62,29,62,61","w":570},"\u2021":{"d":"514,-36v0,34,-23,62,-62,62v-39,0,-95,-36,-149,-43v7,54,42,113,42,149v0,41,-29,62,-61,62v-34,0,-62,-23,-62,-62v0,-39,35,-94,42,-148v-53,8,-108,42,-146,42v-39,0,-62,-28,-62,-62v0,-32,21,-61,62,-61v35,0,93,33,146,41v-7,-49,-40,-117,-40,-161v0,-45,33,-112,40,-162v-53,8,-108,42,-146,42v-39,0,-62,-28,-62,-62v0,-32,21,-61,62,-61v35,0,93,33,146,41v-8,-53,-42,-109,-42,-147v0,-39,28,-62,62,-62v32,0,61,21,61,62v0,36,-35,95,-42,148v54,-7,113,-42,149,-42v41,0,62,29,62,61v0,34,-23,62,-62,62v-39,0,-95,-36,-149,-43v7,49,40,122,40,163v0,40,-33,113,-40,162v54,-7,113,-42,149,-42v41,0,62,29,62,61","w":570},"\u00a7":{"d":"475,40v0,109,-92,153,-188,153v-45,0,-91,-9,-124,-42r-7,29r-53,0r0,-183v33,2,68,-9,71,26v4,56,33,87,88,87v36,0,78,-13,78,-56v0,-90,-244,-73,-244,-272v0,-53,29,-101,76,-125v-49,-32,-76,-73,-76,-133v0,-109,92,-153,188,-153v45,0,91,9,124,42r7,-29r53,0r0,183v-33,-2,-68,9,-71,-26v-3,-53,-33,-88,-89,-87v-36,0,-77,13,-77,56v0,90,244,73,244,272v0,53,-29,101,-76,125v49,32,76,73,76,133xm343,-212v0,-45,-40,-64,-75,-81v-24,15,-40,40,-40,69v0,44,37,64,73,77v26,-12,42,-36,42,-65","w":570},"\u00b6":{"d":"494,-531r-67,0r0,756r-93,0r0,-756r-57,0r0,756r-93,0r0,-509v-88,0,-160,-69,-160,-161v0,-90,72,-160,160,-160r310,0r0,74","w":526},"\u00ae":{"d":"696,-308v0,192,-144,320,-329,320v-185,0,-329,-128,-329,-320v0,-192,144,-320,329,-320v185,0,329,128,329,320xm603,-308v0,-151,-94,-254,-236,-254v-142,0,-236,103,-236,254v0,151,94,254,236,254v142,0,236,-103,236,-254xm221,-462v116,4,271,-27,271,92v0,35,-14,63,-52,80r46,77v10,16,22,19,44,18r0,41r-99,0r-66,-122r-28,0v5,35,-19,91,35,81r0,41r-145,0r0,-41r28,0r0,-206v2,-19,-14,-22,-34,-21r0,-40xm406,-369v0,-46,-24,-56,-69,-53r0,105v46,5,69,-13,69,-52","w":734},"\u00a9":{"d":"696,-308v0,192,-144,320,-329,320v-185,0,-329,-128,-329,-320v0,-192,144,-320,329,-320v185,0,329,128,329,320xm603,-308v0,-151,-94,-254,-236,-254v-142,0,-236,103,-236,254v0,151,94,254,236,254v142,0,236,-103,236,-254xm235,-304v0,-92,46,-160,131,-160v25,0,49,6,65,22r3,-17r36,0r0,115v-19,0,-39,3,-42,-14v-4,-28,-9,-54,-46,-54v-36,0,-62,28,-62,103v0,120,77,135,132,82r28,32v-21,25,-62,51,-109,51v-83,0,-136,-58,-136,-160","w":734},"\u2122":{"d":"662,-339r-111,0r0,-36r25,0r0,-106r-69,142r-30,0r-77,-142r0,87v-2,18,12,20,31,19r0,36r-109,0r0,-36r26,0r0,-187v2,-18,-13,-20,-32,-19r0,-36r76,0r104,194r92,-194r68,0r0,36r-26,0r0,187v-2,17,13,21,32,19r0,36xm287,-519v-15,-1,-36,4,-37,-11v-5,-16,1,-51,-20,-50r-30,0r0,186v-2,18,13,19,31,18r0,37r-131,0r0,-37r27,0r0,-204v-18,3,-43,-8,-45,12v-6,17,3,48,-18,49r-24,0r2,-98r242,0","w":702},"\u201c":{"d":"307,-491v0,39,-29,64,-64,64v-38,0,-68,-27,-68,-72v0,-54,27,-119,82,-202r38,20v-21,40,-42,102,-46,132v37,2,58,29,58,58xm152,-491v0,39,-29,64,-64,64v-38,0,-68,-27,-68,-72v0,-54,27,-119,82,-202r38,20v-21,40,-42,102,-46,132v37,2,58,29,58,58","w":334},"\u201d":{"d":"314,-629v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72xm159,-629v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72","w":334},"\u2018":{"d":"152,-491v0,39,-29,64,-64,64v-38,0,-68,-27,-68,-72v0,-54,27,-119,82,-202r38,20v-21,40,-42,102,-46,132v37,2,58,29,58,58","w":179},"\u2019":{"d":"159,-629v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72","w":179},"\u00ab":{"d":"440,-99r-27,59r-149,-153v-42,-37,-40,-61,0,-102r149,-153r27,59r-106,145xm259,-99r-27,59r-149,-153v-42,-37,-40,-61,0,-102r149,-153r27,59r-106,145","w":490},"\u00bb":{"d":"407,-295v42,37,40,61,0,102r-149,153r-27,-59r106,-145r-106,-145r27,-59xm226,-295v42,37,40,61,0,102r-149,153r-27,-59r106,-145r-106,-145r27,-59","w":490},"\u2039":{"d":"259,-99r-27,59r-149,-153v-42,-37,-40,-61,0,-102r149,-153r27,59r-106,145","w":309},"\u203a":{"d":"226,-295v42,37,40,61,0,102r-149,153r-27,-59r106,-145r-106,-145r27,-59","w":309},"\u201a":{"d":"159,-37v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72","w":179},"\u201e":{"d":"314,-37v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72xm159,-37v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72","w":334},"\u00aa":{"d":"358,-298v-51,-3,-117,12,-133,-26v-14,16,-53,35,-92,35v-55,0,-104,-31,-104,-103v0,-73,71,-115,176,-117v3,-39,-7,-61,-46,-61v-24,0,-58,5,-100,22r0,-60v104,-36,254,-37,254,100r0,142v-1,24,24,18,45,19r0,49xm205,-374r0,-85v-41,2,-68,25,-68,58v0,39,46,47,68,27","w":358},"\u00ba":{"d":"346,-459v0,114,-66,170,-162,170v-96,0,-162,-56,-162,-170v0,-114,66,-169,162,-169v96,0,162,55,162,169xm234,-459v0,-68,-14,-103,-50,-103v-36,0,-50,35,-50,103v0,68,14,103,50,103v36,0,50,-35,50,-103","w":368},"0":{"d":"534,-308v0,222,-96,320,-249,320v-153,0,-249,-98,-249,-320v0,-222,96,-320,249,-320v153,0,249,98,249,320xm369,-308v0,-157,-23,-212,-84,-212v-61,0,-84,55,-84,212v0,157,23,212,84,212v61,0,84,-55,84,-212","w":570},"1":{"d":"438,0r-313,0r0,-81r82,0r0,-413r-84,0r-17,-81v74,-5,140,-20,169,-41r94,0r0,496v-4,37,30,42,69,39r0,81","w":570},"2":{"d":"495,-216r-24,216r-419,0v-9,-146,44,-204,157,-299v84,-71,108,-101,108,-145v-1,-95,-153,-73,-221,-42r-26,-109v63,-21,139,-33,204,-33v136,0,208,69,208,180v0,74,-38,134,-126,199v-99,73,-138,103,-150,144r178,0r23,-79v11,-44,45,-29,88,-32","w":570},"3":{"d":"499,-191v0,97,-64,202,-236,202v-72,0,-141,-18,-202,-54r39,-109v44,31,87,49,140,49v60,0,93,-38,93,-93v0,-62,-43,-87,-117,-83r0,-79v66,4,100,-28,100,-88v-1,-100,-130,-74,-203,-46r-29,-101v61,-24,125,-35,190,-35v130,0,204,60,204,160v0,50,-24,105,-101,130v82,19,122,65,122,147","w":570},"4":{"d":"547,-162r-111,0v0,41,-6,86,39,81r31,0r0,81r-293,0r0,-81r64,0r0,-81r-256,0r0,-72r283,-382r132,0r0,366r111,0r0,88xm277,-250r0,-190r-140,190r140,0","w":570},"5":{"d":"511,-221v0,147,-88,232,-241,232v-79,0,-152,-25,-195,-52r38,-104v41,31,83,48,130,48v85,0,102,-51,102,-123v0,-114,-120,-125,-177,-67r-63,-26r0,-303r365,0r0,105r-264,0r0,125v29,-17,72,-28,116,-28v124,0,189,74,189,193","w":570},"6":{"d":"334,-414v127,2,200,70,201,194v0,111,-72,231,-244,231v-166,0,-241,-130,-241,-301v-1,-197,103,-338,286,-338v56,0,116,14,150,30r-26,81v-22,-11,-61,-23,-98,-23v-85,0,-127,68,-137,155v35,-21,71,-29,109,-29xm370,-224v0,-116,-83,-125,-153,-77v-1,17,-1,36,-1,55v0,124,33,166,81,166v53,0,73,-55,73,-144","w":570},"7":{"d":"510,-542v-107,218,-175,392,-198,542r-159,0v27,-167,112,-326,220,-511r-194,0v-18,32,-9,90,-59,89r-51,0r18,-194r423,0r0,74","w":570},"8":{"d":"523,-178v0,100,-69,189,-236,189v-123,0,-240,-55,-240,-176v0,-67,47,-127,109,-151v-44,-29,-78,-70,-78,-139v0,-94,77,-173,204,-173v145,0,205,77,205,147v0,52,-36,112,-96,135v68,34,132,79,132,168xm349,-480v0,-35,-25,-62,-64,-62v-39,0,-64,26,-64,61v0,42,42,72,77,90v31,-25,51,-57,51,-89xm364,-159v1,-61,-64,-85,-109,-107v-34,23,-53,61,-53,102v0,54,38,85,84,85v46,0,78,-30,78,-80","w":570},"9":{"d":"236,-203v-127,-2,-200,-70,-201,-194v0,-111,72,-231,244,-231v166,0,241,130,241,301v1,197,-103,338,-286,338v-56,0,-116,-14,-150,-30r26,-81v22,11,61,23,98,23v85,0,127,-68,137,-155v-35,21,-71,29,-109,29xm354,-371v0,-124,-33,-166,-81,-166v-53,0,-73,55,-73,144v0,117,83,125,153,76v1,-17,1,-35,1,-54","w":570},"$":{"d":"519,-176v0,101,-68,178,-204,186r0,73r-58,0r0,-74v-43,-5,-81,-20,-104,-41r-6,32r-84,0r0,-237v39,3,87,-13,90,29v5,67,38,114,115,114v46,0,81,-19,81,-55v0,-37,-34,-61,-135,-98v-80,-29,-162,-73,-162,-189v0,-134,103,-192,205,-192r0,-71r58,0r0,77v32,7,59,20,77,37r4,-31r84,0r0,237v-34,-1,-75,8,-83,-24r-14,-54v-12,-82,-170,-88,-169,-1v0,36,32,57,144,98v80,29,161,76,161,184","w":570},"\u00a2":{"d":"491,-51v-27,25,-78,51,-135,60r0,80r-58,0r0,-76v-140,-6,-219,-98,-219,-240v0,-158,98,-241,219,-244r0,-87r58,0r0,93v26,7,47,18,62,32r7,-25r54,0r0,187v-34,-1,-73,8,-74,-27v-2,-40,-16,-76,-49,-82r0,299v38,-4,77,-21,96,-36xm298,-377v-81,34,-80,261,0,289r0,-289","w":570},"\u20ac":{"d":"289,-207v17,70,61,114,121,114v53,0,103,-31,132,-60r56,64v-42,49,-123,101,-218,101v-137,0,-233,-78,-263,-219r-89,0r0,-68r80,0r-1,-54r-79,0r0,-68r87,0v24,-131,115,-231,255,-231v51,0,99,13,130,45r5,-34r73,0r0,229v-36,-1,-79,7,-84,-27v-9,-55,-17,-109,-92,-109v-57,0,-102,37,-118,127r130,0r0,68r-138,0r2,54r136,0r0,68r-125,0","w":642},"\u0192":{"d":"599,-676r-21,91v-89,-26,-135,-12,-161,128r-23,118r113,0r-14,87r-116,0r-43,241v-33,182,-136,230,-238,230v-48,0,-91,-10,-124,-26r22,-98v23,13,48,22,77,22v54,0,79,-53,94,-136r43,-233r-94,0r0,-87r111,0v35,-184,56,-358,261,-356v41,0,86,9,113,19","w":570},"\u00a3":{"d":"517,-216r-25,216r-422,0r0,-72v51,-71,77,-121,63,-216r-80,0r0,-83r59,0v-39,-147,40,-257,199,-257v75,0,144,18,189,36r-33,102v-31,-14,-82,-29,-127,-29v-84,0,-82,86,-57,148r104,0r31,83r-114,0v7,82,-26,137,-76,183r177,0r24,-79v12,-44,45,-29,88,-32","w":570},"\u00a5":{"d":"633,-535v-55,-1,-74,0,-99,50r-96,186r77,0r0,64r-109,0r0,35r109,0r0,64r-109,0v-5,44,14,60,62,55r0,81r-286,0r0,-81r60,0r0,-55r-112,0r0,-64r112,0v-1,-11,2,-26,-1,-35r-111,0r0,-64r79,0r-96,-190v-20,-43,-41,-48,-93,-46r0,-81r285,0r0,81r-40,0r84,173r91,-173r-39,0r0,-81r232,0r0,81","w":653},"#":{"d":"547,-184r-153,0r-38,194r-81,0r38,-194r-107,0r-38,194r-81,0r38,-194r-101,0r0,-67r115,0r23,-117r-138,0r0,-67r152,0r39,-193r80,0r-39,193r108,0r39,-193r80,0r-39,193r102,0r0,67r-115,0r-24,117r140,0r0,67xm350,-368r-107,0r-24,117r108,0","w":570},"%":{"d":"789,-182v0,126,-52,194,-154,194v-102,0,-155,-68,-155,-194v0,-126,53,-194,155,-194v102,0,154,68,154,194xm605,-616r-286,616r-88,0r287,-616r87,0xm351,-436v0,126,-52,194,-154,194v-102,0,-155,-68,-155,-194v0,-126,53,-194,155,-194v102,0,154,68,154,194xm686,-182v0,-94,-14,-127,-51,-127v-37,0,-51,33,-51,127v0,94,14,127,51,127v37,0,51,-33,51,-127xm248,-436v0,-94,-14,-127,-51,-127v-37,0,-51,33,-51,127v0,94,14,127,51,127v37,0,51,-33,51,-127","w":831},"\u2030":{"d":"1129,-182v0,126,-52,194,-154,194v-102,0,-155,-68,-155,-194v0,-126,53,-194,155,-194v102,0,154,68,154,194xm784,-182v0,126,-52,194,-154,194v-102,0,-155,-68,-155,-194v0,-126,53,-194,155,-194v102,0,154,68,154,194xm600,-616r-286,616r-88,0r287,-616r87,0xm351,-436v0,126,-52,194,-154,194v-102,0,-155,-68,-155,-194v0,-126,53,-194,155,-194v102,0,154,68,154,194xm1026,-182v0,-94,-14,-127,-51,-127v-37,0,-51,33,-51,127v0,94,14,127,51,127v37,0,51,-33,51,-127xm681,-182v0,-94,-14,-127,-51,-127v-37,0,-51,33,-51,127v0,94,14,127,51,127v37,0,51,-33,51,-127xm248,-436v0,-94,-14,-127,-51,-127v-37,0,-51,33,-51,127v0,94,14,127,51,127v37,0,51,-33,51,-127","w":1171},"+":{"d":"466,-254r-154,0r0,154r-98,0r0,-154r-154,0r0,-98r154,0r0,-154r98,0r0,154r154,0r0,98","w":526},"\u2212":{"d":"466,-254r-406,0r0,-98r406,0r0,98","w":526},"\u00d7":{"d":"441,-194r-69,69r-109,-109r-109,109r-69,-69r109,-109r-109,-109r69,-69r109,109r109,-109r69,69r-109,109","w":526},"<":{"d":"462,-83r-397,-177r0,-86r397,-177r0,100r-269,119r269,111r0,110","w":526},"\u00f7":{"d":"334,-455v0,35,-30,64,-65,64v-35,0,-62,-29,-62,-64v0,-35,27,-62,62,-62v35,0,65,27,65,62xm466,-254r-406,0r0,-98r406,0r0,98xm334,-152v0,35,-30,63,-65,63v-35,0,-62,-28,-62,-63v0,-35,27,-62,62,-62v35,0,65,27,65,62","w":526},"=":{"d":"466,-357r-406,0r0,-98r406,0r0,98xm466,-151r-406,0r0,-98r406,0r0,98","w":526},"\u00ac":{"d":"466,-151r-98,0r0,-206r-308,0r0,-98r342,0v49,0,64,16,64,58r0,246","w":526},">":{"d":"462,-260r-397,177r0,-110r269,-111r-269,-119r0,-100r397,177r0,86","w":526},"\u2260":{"d":"466,-151r-227,0r-55,127r-89,0r55,-127r-90,0r0,-98r132,0r47,-108r-179,0r0,-98r221,0r55,-127r89,0r-55,127r96,0r0,98r-138,0r-47,108r185,0r0,98","w":526},"\u2248":{"d":"432,-407v-32,50,-83,93,-140,93v-80,0,-96,-52,-164,-52v-21,0,-52,23,-79,57r-34,-38v40,-63,86,-108,138,-108v80,0,103,52,171,52v25,0,57,-23,74,-43xm432,-224v-32,50,-83,93,-140,93v-80,0,-96,-52,-164,-52v-21,0,-52,23,-79,57r-34,-38v40,-63,86,-108,138,-108v80,0,103,52,171,52v25,0,57,-23,74,-43","w":446},"\u00b1":{"d":"466,-294r-154,0r0,126r-98,0r0,-126r-154,0r0,-98r154,0r0,-126r98,0r0,126r154,0r0,98xm466,0r-406,0r0,-98r406,0r0,98","w":526},"\u2264":{"d":"458,-123r-397,-177r0,-86r397,-177r0,100r-269,119r269,111r0,110xm466,0r-406,0r0,-98r406,0r0,98","w":526},"\u2265":{"d":"465,-300r-397,177r0,-110r269,-111r-269,-119r0,-100r397,177r0,86xm466,0r-406,0r0,-98r406,0r0,98","w":526},"^":{"d":"466,-342r-141,0r-95,-170r-97,170r-141,0r188,-286r98,0","w":458},"~":{"d":"532,-264v-30,53,-83,99,-153,99v-73,0,-133,-68,-199,-68v-34,0,-60,24,-83,57r-69,-65v43,-66,94,-100,157,-100v85,0,138,65,199,65v39,0,62,-30,77,-53v0,0,72,63,71,65","w":560},"\u25ca":{"d":"313,-616r275,308r-275,308r-275,-308xm313,-167r118,-141r-118,-142r-118,142","w":641},"\u00b0":{"d":"349,-475v0,104,-66,153,-162,153v-96,0,-161,-49,-161,-153v0,-104,65,-153,161,-153v96,0,162,49,162,153xm258,-475v0,-54,-23,-90,-71,-90v-48,0,-70,36,-70,90v0,54,22,90,70,90v48,0,71,-36,71,-90","w":375},"'":{"d":"168,-564v0,40,-24,137,-30,201r-56,0v-7,-63,-30,-161,-30,-201v0,-46,22,-64,59,-64v39,0,57,21,57,64","w":220},"\"":{"d":"339,-564v0,40,-24,137,-30,201r-56,0v-7,-63,-30,-161,-30,-201v0,-46,22,-64,59,-64v39,0,57,21,57,64xm168,-564v0,40,-24,137,-30,201r-56,0v-7,-63,-30,-161,-30,-201v0,-46,22,-64,59,-64v39,0,57,21,57,64","w":391},"\u221a":{"d":"501,-639r-26,0r-229,638r-92,0r-119,-365r-28,0r0,-43r119,0r93,286r201,-559r81,0r0,43","w":508},"\u00a4":{"d":"525,-174r-41,42r-67,-67v-69,49,-157,56,-234,0r-67,67r-40,-42r68,-64v-50,-66,-52,-167,0,-232r-68,-65r40,-42r67,67v82,-54,157,-52,233,0v23,-22,46,-44,68,-67r41,42r-68,65v53,74,51,161,0,232xm438,-355v0,-81,-68,-136,-137,-136v-79,0,-139,63,-139,136v0,75,63,138,138,138v76,0,138,-63,138,-138","w":612},"\u221e":{"d":"699,-258v0,112,-54,201,-162,201v-75,0,-123,-40,-166,-114v-33,52,-79,101,-155,101v-92,0,-156,-79,-156,-183v0,-105,58,-177,159,-177v76,0,120,43,151,94v44,-76,96,-115,169,-115v104,0,160,60,160,193xm636,-257v0,-66,-34,-103,-94,-103v-38,0,-74,17,-127,111v35,66,66,101,114,101v60,0,107,-39,107,-109xm327,-255v-35,-64,-65,-91,-117,-91v-60,0,-92,42,-92,94v0,56,33,95,91,95v53,0,88,-44,118,-98","w":759},"\u00b5":{"d":"584,0v-76,-5,-175,21,-190,-47v-38,30,-88,61,-157,60v-4,102,28,210,-92,210r-124,0r0,-73v29,1,65,4,65,-26r0,-512r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-5,78,98,61,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69","w":604},"\u2202":{"d":"507,-290v0,144,-70,302,-245,302v-130,0,-236,-77,-236,-234v0,-144,100,-226,217,-226v27,0,56,7,71,18v-14,-51,-67,-115,-188,-116r26,-82v187,0,355,111,355,338xm341,-245v0,-34,-7,-83,-12,-99v-72,-38,-138,-2,-138,127v0,93,24,141,69,141v53,0,81,-46,81,-169","w":527},"\u2211":{"d":"577,-438r-83,0r-28,-78v-6,-19,-16,-23,-39,-23r-239,0r234,327r-245,329r238,0v23,0,31,-5,38,-24r30,-78r86,0r-41,178r-517,0v11,-52,17,-73,67,-141r194,-264r-195,-273v-37,-50,-47,-74,-56,-131r531,0","w":623},"\u220f":{"d":"687,-535r-81,0r0,624v0,32,34,23,63,24r0,80r-247,0r0,-80r60,0r0,-624v0,-16,-8,-24,-25,-24r-231,0r0,624v0,32,34,23,63,24r0,80r-247,0r0,-80r60,0r0,-624v2,-36,-50,-21,-82,-24r0,-80r667,0r0,80","w":703},"\u03c0":{"d":"580,-378r-77,0r0,274v0,32,34,23,63,24r0,80r-230,0r0,-80r60,0r0,-274v0,-16,-8,-24,-25,-24r-131,0r0,274v0,32,34,23,63,24r0,80r-231,0r0,-80r60,0r0,-274v2,-35,-47,-21,-78,-24r0,-80r526,0r0,80","w":634},"\u222b":{"d":"514,-677r-12,61v-97,-20,-127,2,-150,142r-79,477v-22,169,-121,257,-285,205r7,-63v98,36,135,-25,154,-139r76,-458v28,-192,118,-274,289,-225","w":502},"\u03a9":{"d":"321,-628v188,0,301,124,301,293v0,116,-49,197,-131,254r86,0r0,81r-232,0r0,-71v63,-38,107,-112,107,-251v0,-101,-42,-194,-131,-194v-89,0,-131,93,-131,194v0,139,44,213,107,251r0,71r-232,0r0,-81r86,0v-82,-57,-131,-138,-131,-254v0,-169,113,-293,301,-293","w":642},"\u2126":{"d":"321,-628v188,0,301,124,301,293v0,116,-49,197,-131,254r86,0r0,81r-232,0r0,-71v63,-38,107,-112,107,-251v0,-101,-42,-194,-131,-194v-89,0,-131,93,-131,194v0,139,44,213,107,251r0,71r-232,0r0,-81r86,0v-82,-57,-131,-138,-131,-254v0,-169,113,-293,301,-293","w":642},"\u2206":{"d":"591,0r-553,0r258,-628r36,0xm414,-89r-124,-298r-123,298r247,0","w":607},"\u2113":{"d":"293,0r-259,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,561v-2,32,24,29,53,29r0,69","w":321},"\u212e":{"d":"761,-301r-576,0v-3,0,-5,1,-5,5r0,174v0,8,3,15,9,21v53,57,132,93,218,93v92,0,174,-41,228,-105r52,0v-65,75,-167,124,-281,124v-196,0,-356,-142,-356,-319v0,-178,160,-320,356,-320v197,0,358,142,355,327xm631,-323r0,-176v0,-7,-4,-15,-10,-21v-108,-117,-327,-116,-432,3v-5,6,-9,14,-9,23r0,171v0,3,2,5,5,5r441,0v3,0,5,-2,5,-5","w":811},"\u2116":{"d":"1030,-375v0,114,-77,178,-187,178v-110,0,-187,-64,-187,-178v0,-114,77,-178,187,-178v110,0,187,64,187,178xm896,-375v0,-59,-16,-95,-53,-95v-37,0,-53,36,-53,95v0,59,16,95,53,95v37,0,53,-36,53,-95xm655,-535r-56,0r0,535r-88,0r-291,-364r0,242v-5,39,29,44,69,41r0,81r-238,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r155,0r292,358r0,-236v5,-41,-28,-43,-69,-41r0,-81r239,0r0,81","w":1066},"\u2044":{"d":"264,-616r-286,616r-88,0r287,-616r87,0","w":154},"\u00b9":{"d":"253,-228r-186,0r0,-51r40,0r0,-260r-53,0r-10,-51v47,-3,88,-13,106,-26r59,0r0,312v-2,24,19,27,44,25r0,51","w":297},"\u00b2":{"d":"323,-368r-15,136r-264,0v-5,-92,27,-128,99,-188v53,-45,68,-64,68,-92v0,-61,-97,-45,-139,-26r-17,-69v40,-13,88,-21,129,-21v86,0,131,44,131,114v0,47,-24,84,-79,125v-62,46,-88,65,-95,91r112,0v11,-24,9,-73,43,-70r27,0","w":367},"\u00b3":{"d":"320,-353v0,61,-41,128,-149,128v-45,0,-89,-11,-127,-34r25,-69v44,40,146,50,146,-28v0,-39,-26,-55,-73,-52r0,-50v42,2,63,-17,63,-55v0,-64,-82,-47,-128,-29r-19,-64v91,-41,249,-30,249,79v0,32,-16,66,-64,82v52,12,77,40,77,92","w":364},"\u00bd":{"d":"757,-136r-15,136r-264,0v-5,-92,27,-128,99,-188v53,-45,68,-64,68,-92v0,-61,-97,-45,-139,-26r-17,-69v40,-13,88,-21,129,-21v86,0,131,44,131,114v0,47,-24,84,-79,125v-62,46,-88,65,-95,91r112,0v11,-24,9,-73,43,-70r27,0xm568,-616r-286,616r-88,0r287,-616r87,0xm253,-228r-186,0r0,-51r40,0r0,-260r-53,0r-10,-51v47,-3,88,-13,106,-26r59,0r0,312v-2,24,19,27,44,25r0,51","w":800},"\u00bc":{"d":"756,-102r-70,0v0,25,-5,54,24,51r20,0r0,51r-185,0r0,-51r41,0r0,-51r-159,0r0,-45r176,-241r83,0r0,230r70,0r0,56xm568,-616r-286,616r-88,0r287,-616r87,0xm253,-228r-186,0r0,-51r40,0r0,-260r-53,0r-10,-51v47,-3,88,-13,106,-26r59,0r0,312v-2,24,19,27,44,25r0,51xm586,-158r0,-119r-89,119r89,0","w":800},"\u00be":{"d":"778,-102r-70,0v0,25,-5,54,24,51r20,0r0,51r-185,0r0,-51r41,0r0,-51r-159,0r0,-45r176,-241r83,0r0,230r70,0r0,56xm590,-616r-286,616r-88,0r287,-616r87,0xm298,-353v0,61,-41,128,-149,128v-45,0,-89,-11,-127,-34r25,-69v44,40,146,50,146,-28v0,-39,-26,-55,-73,-52r0,-50v42,2,63,-17,63,-55v0,-64,-82,-47,-128,-29r-19,-64v91,-41,249,-30,249,79v0,32,-16,66,-64,82v52,12,77,40,77,92xm608,-158r0,-119r-89,119r89,0","w":800},"`":{"d":"199,-515r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":213},"\u00b4":{"d":"219,-534v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":229},"\u00a8":{"d":"275,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm121,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":295},"\u02c6":{"d":"293,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17"},"\u02dc":{"d":"311,-648v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0"},"\u00af":{"d":"288,-595r-248,0r0,-63r248,0r0,63"},"\u02d8":{"d":"293,-652v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0"},"\u02d9":{"d":"227,-594v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61"},"\u02da":{"d":"254,-573v0,51,-42,83,-90,83v-48,0,-90,-32,-90,-83v0,-51,42,-83,90,-83v48,0,90,32,90,83xm203,-573v0,-29,-15,-45,-39,-45v-24,0,-39,16,-39,45v0,29,15,45,39,45v24,0,39,-16,39,-45"},"\u00b8":{"d":"140,213v-24,0,-52,-7,-69,-17r12,-52v29,20,89,22,89,-23v0,-33,-46,-43,-63,-21r-43,-16r31,-98r54,0r-17,54v57,-19,114,18,114,80v0,48,-39,93,-108,93"},"\u02dd":{"d":"343,-544v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74xm164,-544v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74"},"\u02db":{"d":"213,191v-75,33,-182,-3,-182,-94v0,-47,35,-90,90,-112r71,0v-49,22,-75,66,-75,105v0,55,63,62,96,42r0,59"},"\u02c7":{"d":"293,-728r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0"},"\u0326":{"d":"229,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62"},"\u00c0":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0xm450,-686r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u00c1":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0xm421,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u00c2":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0xm454,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u00c3":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0xm473,-780v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u00c4":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0xm455,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm301,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u0100":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0xm452,-685r-248,0r0,-63r248,0r0,63","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u0102":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81xm356,-259r-58,-171r-64,171r122,0xm453,-758v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":656,"k":{"y":20,"w":46,"v":46,"c":4,"V":92,"U":28,"Q":8,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60}},"\u00c5":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r204,-524v-19,-14,-32,-36,-32,-64v0,-51,42,-83,90,-83v48,0,90,32,90,83v0,28,-12,51,-32,65r186,485v14,34,36,40,76,38r0,81xm366,-669v0,-29,-15,-45,-39,-45v-24,0,-39,16,-39,45v0,29,15,45,39,45v24,0,39,-16,39,-45xm356,-259r-58,-171r-64,171r122,0","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u01fa":{"d":"647,0r-280,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r204,-524v-19,-14,-32,-36,-32,-64v0,-51,42,-83,90,-83v48,0,90,32,90,83v0,28,-12,51,-32,65r186,485v14,34,36,40,76,38r0,81xm366,-669v0,-29,-15,-45,-39,-45v-24,0,-39,16,-39,45v0,29,15,45,39,45v24,0,39,-16,39,-45xm356,-259r-58,-171r-64,171r122,0xm421,-809v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u0104":{"d":"603,191v-74,33,-182,-3,-182,-94v0,-38,21,-79,62,-97r-116,0r0,-81r48,0r-35,-105r-174,0v-10,28,-23,54,-30,85v-1,26,33,19,58,20r0,81r-228,0r0,-81r59,0r208,-535r107,0r191,497v14,34,36,40,76,38r0,81v-81,-9,-137,19,-140,90v-3,55,63,62,96,42r0,59xm356,-259r-58,-171r-64,171r122,0","w":656,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u00c6":{"d":"862,0r-498,0r0,-81r56,0r0,-102r-192,0r-37,66v-21,37,22,38,57,36r0,81r-248,0r0,-81r60,0r315,-535r469,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,149v0,35,13,42,47,42r131,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm420,-259r0,-264r-149,264r149,0","w":922,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u01fc":{"d":"862,0r-498,0r0,-81r56,0r0,-102r-192,0r-37,66v-21,37,22,38,57,36r0,81r-248,0r0,-81r60,0r315,-535r469,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,149v0,35,13,42,47,42r131,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm420,-259r0,-264r-149,264r149,0xm710,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":922,"k":{"v":46,"Q":8,"U":28,"V":92,"c":4,"w":46,"y":20,"u":20,"\u00f9":20,"\u00fa":20,"\u00fb":20,"\u0169":20,"\u00fc":20,"\u016b":20,"\u016d":20,"\u016f":20,"\u0171":20,"\u0173":20,"C":12,"\u0106":12,"\u00c7":12,"\u0108":12,"\u010c":12,"\u010a":12,"G":14,"\u011c":14,"\u011e":14,"\u0120":14,"\u0122":14,"O":8,"\u00d2":8,"\u00d3":8,"\u00d4":8,"\u00d5":8,"\u00d6":8,"\u014c":8,"\u014e":8,"\u0150":8,"\u00d8":8,"\u01fe":8,"\u0152":8,"T":60,"\u0164":60,"\u0162":60,"W":88,"\u1e80":88,"\u1e82":88,"\u0174":88,"\u1e84":88,"Y":90,"\u1ef2":90,"\u00dd":90,"\u0176":90,"\u0178":90,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4}},"\u0106":{"d":"46,-308v0,-183,94,-320,263,-320v51,0,99,13,130,45r5,-34r73,0r0,229v-36,-1,-79,7,-84,-27v-9,-55,-17,-109,-92,-109v-72,0,-124,58,-124,207v0,151,49,224,132,224v53,0,103,-31,132,-60r56,64v-42,49,-123,101,-218,101v-166,0,-273,-116,-273,-320xm408,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":581},"\u00c7":{"d":"46,-308v0,-183,94,-320,263,-320v51,0,99,13,130,45r5,-34r73,0r0,229v-36,-1,-79,7,-84,-27v-9,-55,-17,-109,-92,-109v-72,0,-124,58,-124,207v0,151,49,224,132,224v53,0,103,-31,132,-60r56,64v-42,49,-121,99,-214,101r-9,28v57,-19,114,18,114,80v0,48,-39,93,-108,93v-24,0,-52,-7,-69,-17r12,-52v29,20,89,22,89,-23v0,-33,-46,-43,-63,-21r-43,-16r24,-76v-138,-20,-224,-133,-224,-316","w":581},"\u0108":{"d":"46,-308v0,-183,94,-320,263,-320v51,0,99,13,130,45r5,-34r73,0r0,229v-36,-1,-79,7,-84,-27v-9,-55,-17,-109,-92,-109v-72,0,-124,58,-124,207v0,151,49,224,132,224v53,0,103,-31,132,-60r56,64v-42,49,-123,101,-218,101v-166,0,-273,-116,-273,-320xm439,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":581},"\u010c":{"d":"46,-308v0,-183,94,-320,263,-320v51,0,99,13,130,45r5,-34r73,0r0,229v-36,-1,-79,7,-84,-27v-9,-55,-17,-109,-92,-109v-72,0,-124,58,-124,207v0,151,49,224,132,224v53,0,103,-31,132,-60r56,64v-42,49,-123,101,-218,101v-166,0,-273,-116,-273,-320xm448,-781r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":581},"\u010a":{"d":"46,-308v0,-183,94,-320,263,-320v51,0,99,13,130,45r5,-34r73,0r0,229v-36,-1,-79,7,-84,-27v-9,-55,-17,-109,-92,-109v-72,0,-124,58,-124,207v0,151,49,224,132,224v53,0,103,-31,132,-60r56,64v-42,49,-123,101,-218,101v-166,0,-273,-116,-273,-320xm374,-729v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":581},"\u010e":{"d":"635,-306v0,191,-100,306,-323,306r-261,0v1,-26,-2,-57,1,-81r55,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r185,0v176,0,246,12,316,72v64,55,96,140,96,238xm464,-309v-1,-148,-38,-237,-193,-226r0,414v-2,35,27,40,65,40v81,0,128,-57,128,-228xm472,-780r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":679},"\u0110":{"d":"634,-306v0,191,-100,306,-323,306r-261,0v1,-26,-2,-57,1,-81r55,0r0,-192r-79,0r0,-77r79,0r0,-144v5,-39,-29,-44,-69,-41r0,-81r185,0v176,0,246,12,316,72v64,55,96,140,96,238xm463,-309v-1,-148,-38,-237,-193,-226r0,185r71,0r0,77r-71,0r0,152v-2,35,27,40,65,40v81,0,128,-57,128,-228","w":678},"\u00d0":{"d":"634,-306v0,191,-100,306,-323,306r-261,0v1,-26,-2,-57,1,-81r55,0r0,-192r-79,0r0,-77r79,0r0,-144v5,-39,-29,-44,-69,-41r0,-81r185,0v176,0,246,12,316,72v64,55,96,140,96,238xm463,-309v-1,-148,-38,-237,-193,-226r0,185r71,0r0,77r-71,0r0,152v-2,35,27,40,65,40v81,0,128,-57,128,-228","w":678},"\u00c8":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm406,-686r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":609},"\u00c9":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm398,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":609},"\u00ca":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm419,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":609},"\u011a":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm433,-780r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":609},"\u00cb":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm419,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm265,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":609},"\u0112":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm420,-685r-248,0r0,-63r248,0r0,63","w":609},"\u0114":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm432,-758v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":609},"\u0116":{"d":"549,0r-498,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm368,-729v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":609},"\u0118":{"d":"426,0r-375,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r493,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206v-60,-4,-96,34,-99,90v-3,55,63,62,96,42r0,59v-74,33,-182,-3,-182,-94v0,-38,21,-79,62,-97","w":609},"\u011c":{"d":"364,-529v-97,0,-147,104,-147,221v0,193,73,243,195,202v-4,-54,22,-128,-58,-113r0,-81r267,0r0,81r-47,0r0,220r-112,0r-16,-30v-29,21,-84,41,-142,41v-131,0,-258,-84,-258,-316v0,-193,122,-324,292,-324v67,0,118,22,148,55r8,-43r69,0r0,223v-38,-1,-79,8,-83,-29v-6,-67,-46,-108,-116,-107xm463,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":669,"k":{"v":18,"w":18,"y":10}},"\u011e":{"d":"364,-529v-97,0,-147,104,-147,221v0,193,73,243,195,202v-4,-54,22,-128,-58,-113r0,-81r267,0r0,81r-47,0r0,220r-112,0r-16,-30v-29,21,-84,41,-142,41v-131,0,-258,-84,-258,-316v0,-193,122,-324,292,-324v67,0,118,22,148,55r8,-43r69,0r0,223v-38,-1,-79,8,-83,-29v-6,-67,-46,-108,-116,-107xm469,-758v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":669,"k":{"y":10,"w":18,"v":18}},"\u0120":{"d":"364,-529v-97,0,-147,104,-147,221v0,193,73,243,195,202v-4,-54,22,-128,-58,-113r0,-81r267,0r0,81r-47,0r0,220r-112,0r-16,-30v-29,21,-84,41,-142,41v-131,0,-258,-84,-258,-316v0,-193,122,-324,292,-324v67,0,118,22,148,55r8,-43r69,0r0,223v-38,-1,-79,8,-83,-29v-6,-67,-46,-108,-116,-107xm400,-729v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":669,"k":{"v":18,"w":18,"y":10}},"\u0122":{"d":"364,-529v-97,0,-147,104,-147,221v0,193,73,243,195,202v-4,-54,22,-128,-58,-113r0,-81r267,0r0,81r-47,0r0,220r-112,0r-16,-30v-29,21,-84,41,-142,41v-131,0,-258,-84,-258,-316v0,-193,122,-324,292,-324v67,0,118,22,148,55r8,-43r69,0r0,223v-38,-1,-79,8,-83,-29v-6,-67,-46,-108,-116,-107xm404,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":669,"k":{"v":18,"w":18,"y":10}},"\u0124":{"d":"680,0r-289,0r0,-81r56,0r0,-187r-176,0r0,146v-5,38,28,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,174r176,0r0,-133v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm485,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":718},"\u0126":{"d":"33,-415r0,-62r74,0v1,-36,-1,-59,-41,-58r-28,0r0,-81r289,0r0,81r-56,0r0,58r176,0v1,-36,-1,-59,-41,-58r-28,0r0,-81r289,0r0,81r-56,0r0,58r70,0r0,62r-70,0r0,293v-5,38,28,44,69,41r0,81r-289,0r0,-81r56,0r0,-187r-176,0r0,146v-5,38,28,44,69,41r0,81r-289,0r0,-81r56,0r0,-334r-74,0xm271,-361r176,0r0,-54r-176,0r0,54","w":718},"\u00cc":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm294,-686r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":386},"\u00cd":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm284,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":386},"\u00ce":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm316,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":386},"\u0128":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm340,-780v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":386},"\u00cf":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm315,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm161,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":386},"\u012a":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm317,-685r-248,0r0,-63r248,0r0,63","w":386},"\u012c":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm322,-758v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":386},"\u0130":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81xm256,-729v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":386},"\u012e":{"d":"344,0r-60,0v-50,0,-87,40,-87,90v0,55,63,62,96,42r0,59v-74,33,-182,-3,-182,-94v0,-38,21,-79,62,-97r-118,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v-5,38,28,44,69,41r0,81","w":386},"\u0132":{"d":"344,0r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r23,81r-79,0r0,413v-5,38,28,44,69,41r0,81xm767,-182v0,133,-80,194,-203,194v-46,0,-109,-10,-145,-25r0,-101v35,18,70,29,111,29v61,0,73,-36,73,-77r0,-337v0,-26,-10,-36,-41,-36r-108,0r-23,-81r336,0r0,434","w":852},"\u0134":{"d":"394,-182v0,133,-80,194,-203,194v-46,0,-109,-10,-145,-25r0,-101v35,18,70,29,111,29v61,0,73,-36,73,-77r0,-337v0,-26,-10,-36,-41,-36r-108,0r-23,-81r336,0r0,434xm359,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":479},"\u0136":{"d":"677,0r-213,0r-193,-280r0,158v-5,39,29,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,185v58,-70,179,-203,209,-266r161,0r0,81v-51,0,-81,-2,-109,31r-123,143r169,239v20,33,47,44,99,41r0,81xm454,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":691},"\u0139":{"d":"547,0r-496,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v0,32,11,41,42,41r134,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm288,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":589},"\u013d":{"d":"547,0r-496,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v0,32,11,41,42,41r134,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm492,-566v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":589},"\u013b":{"d":"547,0r-496,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v0,32,11,41,42,41r134,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm385,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":589},"\u0141":{"d":"546,0r-496,0r0,-81r56,0r0,-162r-87,32r0,-88r87,-32r0,-163v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,143r83,-31r0,88r-83,31r0,182v0,32,11,41,42,41r134,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206","w":588},"\u013f":{"d":"547,0r-496,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,413v0,32,11,41,42,41r134,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm461,-330v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":589,"k":{"y":14,"w":16,"v":16,"V":78,"U":16,"u":14,"\u00f9":14,"\u00fa":14,"\u00fb":14,"\u0169":14,"\u00fc":14,"\u016b":14,"\u016d":14,"\u016f":14,"\u0171":14,"\u0173":14,"W":78,"\u1e80":78,"\u1e82":78,"\u0174":78,"\u1e84":78,"Y":55,"\u1ef2":55,"\u00dd":55,"\u0176":55,"\u0178":55}},"\u0143":{"d":"655,-535r-56,0r0,535r-88,0r-291,-364r0,242v-5,39,29,44,69,41r0,81r-238,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r155,0r292,358r0,-236v5,-41,-28,-43,-69,-41r0,-81r239,0r0,81xm454,-706v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":703},"\u0147":{"d":"655,-535r-56,0r0,535r-88,0r-291,-364r0,242v-5,39,29,44,69,41r0,81r-238,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r155,0r292,358r0,-236v5,-41,-28,-43,-69,-41r0,-81r239,0r0,81xm478,-780r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":703},"\u00d1":{"d":"655,-535r-56,0r0,535r-88,0r-291,-364r0,242v-5,39,29,44,69,41r0,81r-238,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r155,0r292,358r0,-236v5,-41,-28,-43,-69,-41r0,-81r239,0r0,81xm490,-780v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":703},"\u0145":{"d":"655,-535r-56,0r0,535r-88,0r-291,-364r0,242v-5,39,29,44,69,41r0,81r-238,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r155,0r292,358r0,-236v5,-41,-28,-43,-69,-41r0,-81r239,0r0,81xm421,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":703},"\u014a":{"d":"485,-32r-265,-324r0,234v-5,39,29,44,69,41r0,81r-238,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r155,0r292,358r0,-236v5,-41,-28,-43,-69,-41r0,-81r239,0r0,81r-56,0r0,506v0,130,-41,194,-160,194v-37,0,-77,-6,-112,-18r0,-90v22,6,59,13,91,13v57,0,71,-40,67,-102","w":703},"\u00d2":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm441,-686r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u00d3":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm405,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u00d4":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm454,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u00d5":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm473,-780v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u00d6":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm448,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm294,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u014c":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm445,-685r-248,0r0,-63r248,0r0,63","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u014e":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm450,-758v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u0150":{"d":"598,-308v0,215,-115,320,-277,320v-162,0,-277,-105,-277,-320v0,-215,115,-320,277,-320v162,0,277,105,277,320xm427,-308v0,-142,-42,-209,-106,-209v-64,0,-106,67,-106,209v0,142,42,209,106,209v64,0,106,-67,106,-209xm500,-746v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74xm321,-746v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u00d8":{"d":"598,-308v1,258,-170,364,-383,302r-32,67r-83,0r49,-103v-66,-51,-105,-139,-105,-266v-1,-256,167,-363,380,-303r41,-85r82,0r-58,119v68,51,109,140,109,269xm370,-500v-14,-11,-31,-17,-49,-17v-64,0,-106,67,-106,209v0,43,4,79,11,108xm427,-308v0,-45,-4,-83,-12,-113r-146,303v15,13,32,19,52,19v64,0,106,-67,106,-209","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u01fe":{"d":"598,-308v1,258,-170,364,-383,302r-32,67r-83,0r49,-103v-66,-51,-105,-139,-105,-266v-1,-256,167,-363,380,-303r41,-85r82,0r-58,119v68,51,109,140,109,269xm370,-500v-14,-11,-31,-17,-49,-17v-64,0,-106,67,-106,209v0,43,4,79,11,108xm427,-308v0,-45,-4,-83,-12,-113r-146,303v15,13,32,19,52,19v64,0,106,-67,106,-209xm415,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":642,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u0152":{"d":"881,0r-318,0v-62,0,-114,12,-200,12v-189,0,-319,-113,-319,-320v0,-202,137,-320,320,-320v80,0,117,12,190,12r309,0r9,229v-37,0,-75,4,-78,-30v-17,-47,0,-118,-69,-118r-122,0r0,187r70,0v8,-25,6,-70,39,-70r36,0r0,216v-32,-3,-57,10,-65,-26r-10,-44r-70,0r0,150v0,32,11,41,42,41r136,0v13,-45,23,-113,23,-161v38,0,77,-7,77,36r0,206xm339,-97v71,0,100,-25,100,-95r0,-227v1,-79,-27,-100,-101,-100v-106,0,-123,133,-123,211v0,79,17,211,124,211","w":941,"k":{"y":6,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u00de":{"d":"579,-315v0,103,-51,179,-251,179r-57,0v-1,34,2,56,41,55r28,0r0,81r-289,0r0,-81r56,0r0,-413v5,-38,-28,-44,-69,-41r0,-81r289,0r0,81r-56,0r0,49r32,0v200,0,276,43,276,171xm409,-315v0,-82,-53,-95,-138,-90r0,186r54,0v73,0,84,-41,84,-96","w":613},"\u0154":{"d":"299,-616v170,-3,282,36,282,184v0,69,-28,126,-105,161r92,154v20,33,44,38,89,36r0,81r-198,0r-132,-244r-56,0r0,122v-5,39,29,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r261,0xm409,-429v0,-91,-48,-113,-138,-106r0,210r41,0v78,0,97,-42,97,-104xm411,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":677},"\u0158":{"d":"299,-616v170,-3,282,36,282,184v0,69,-28,126,-105,161r92,154v20,33,44,38,89,36r0,81r-198,0r-132,-244r-56,0r0,122v-5,39,29,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r261,0xm409,-429v0,-91,-48,-113,-138,-106r0,210r41,0v78,0,97,-42,97,-104xm456,-780r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":677},"\u0156":{"d":"299,-616v170,-3,282,36,282,184v0,69,-28,126,-105,161r92,154v20,33,44,38,89,36r0,81r-198,0r-132,-244r-56,0r0,122v-5,39,29,44,69,41r0,81r-289,0r0,-81r56,0r0,-413v5,-39,-29,-44,-69,-41r0,-81r261,0xm409,-429v0,-91,-48,-113,-138,-106r0,210r41,0v78,0,97,-42,97,-104xm429,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":677},"\u015a":{"d":"275,-92v43,-1,74,-19,78,-55v6,-57,-105,-87,-157,-110v-95,-42,-142,-103,-142,-181v0,-119,95,-190,210,-190v58,0,104,17,132,43r4,-31r84,0r0,235v-34,-1,-77,8,-82,-24v-10,-64,-38,-116,-110,-118v-41,0,-74,23,-74,56v0,56,117,95,172,122v68,33,133,78,133,170v0,107,-76,187,-229,187v-56,0,-109,-21,-137,-47r-6,35r-84,0r0,-239v39,3,87,-13,90,29v6,72,46,120,118,118xm386,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":563},"\u015c":{"d":"275,-92v43,-1,74,-19,78,-55v6,-57,-105,-87,-157,-110v-95,-42,-142,-103,-142,-181v0,-119,95,-190,210,-190v58,0,104,17,132,43r4,-31r84,0r0,235v-34,-1,-77,8,-82,-24v-10,-64,-38,-116,-110,-118v-41,0,-74,23,-74,56v0,56,117,95,172,122v68,33,133,78,133,170v0,107,-76,187,-229,187v-56,0,-109,-21,-137,-47r-6,35r-84,0r0,-239v39,3,87,-13,90,29v6,72,46,120,118,118xm408,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":563},"\u0160":{"d":"275,-92v43,-1,74,-19,78,-55v6,-57,-105,-87,-157,-110v-95,-42,-142,-103,-142,-181v0,-119,95,-190,210,-190v58,0,104,17,132,43r4,-31r84,0r0,235v-34,-1,-77,8,-82,-24v-10,-64,-38,-116,-110,-118v-41,0,-74,23,-74,56v0,56,117,95,172,122v68,33,133,78,133,170v0,107,-76,187,-229,187v-56,0,-109,-21,-137,-47r-6,35r-84,0r0,-239v39,3,87,-13,90,29v6,72,46,120,118,118xm398,-780r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":563},"\u015e":{"d":"275,-92v43,-1,74,-19,78,-55v6,-57,-105,-87,-157,-110v-95,-42,-142,-103,-142,-181v0,-119,95,-190,210,-190v58,0,104,17,132,43r4,-31r84,0r0,235v-34,-1,-77,8,-82,-24v-10,-64,-38,-116,-110,-118v-41,0,-74,23,-74,56v0,56,117,95,172,122v68,33,133,78,133,170v0,103,-71,181,-212,187r-9,28v57,-19,114,18,114,80v0,48,-39,93,-108,93v-24,0,-52,-7,-69,-17r12,-52v29,20,89,22,89,-23v0,-33,-46,-43,-63,-21r-43,-16r23,-75v-41,-7,-78,-24,-100,-44r-6,35r-84,0r0,-239v39,3,87,-13,90,29v6,72,46,120,118,118","w":563},"\u0218":{"d":"275,-92v43,-1,74,-19,78,-55v6,-57,-105,-87,-157,-110v-95,-42,-142,-103,-142,-181v0,-119,95,-190,210,-190v58,0,104,17,132,43r4,-31r84,0r0,235v-34,-1,-77,8,-82,-24v-10,-64,-38,-116,-110,-118v-41,0,-74,23,-74,56v0,56,117,95,172,122v68,33,133,78,133,170v0,107,-76,187,-229,187v-56,0,-109,-21,-137,-47r-6,35r-84,0r0,-239v39,3,87,-13,90,29v6,72,46,120,118,118xm368,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":563},"\u0164":{"d":"583,-400v-32,-2,-76,10,-81,-23r-13,-85v-5,-46,-58,-21,-98,-27r0,413v-5,39,29,44,69,41r0,81r-292,0r0,-81r59,0r0,-454v-40,6,-92,-18,-98,27r-12,85v0,35,-50,20,-82,23r5,-216r538,0xm438,-781r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":618,"k":{"q":11,"e":18,"\u00e8":18,"\u00e9":18,"\u00ea":18,"\u011b":18,"\u00eb":18,"\u0113":18,"\u0115":18,"\u0117":18,"\u0119":18,"A":38,"\u00c0":38,"\u00c1":38,"\u00c2":38,"\u00c3":38,"\u00c4":38,"\u0100":38,"\u0102":38,"\u00c5":38,"\u01fa":38,"\u0104":38,"\u00c6":38,"\u01fc":38,"o":12,"\u00f2":12,"\u00f3":12,"\u00f4":12,"\u00f5":12,"\u00f6":12,"\u014d":12,"\u014f":12,"\u0151":12,"\u00f8":12,"\u01ff":12,"\u0153":12}},"\u0162":{"d":"583,-400v-32,-2,-76,10,-81,-23r-13,-85v-5,-46,-58,-21,-98,-27r0,413v-5,39,29,44,69,41r0,81r-292,0r0,-81r59,0r0,-454v-40,6,-92,-18,-98,27r-12,85v0,35,-50,20,-82,23r5,-216r538,0xm372,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":618,"k":{"q":11,"A":38,"\u00c0":38,"\u00c1":38,"\u00c2":38,"\u00c3":38,"\u00c4":38,"\u0100":38,"\u0102":38,"\u00c5":38,"\u01fa":38,"\u0104":38,"\u00c6":38,"\u01fc":38,"e":18,"\u00e8":18,"\u00e9":18,"\u00ea":18,"\u011b":18,"\u00eb":18,"\u0113":18,"\u0115":18,"\u0117":18,"\u0119":18,"o":12,"\u00f2":12,"\u00f3":12,"\u00f4":12,"\u00f5":12,"\u00f6":12,"\u014d":12,"\u014f":12,"\u0151":12,"\u00f8":12,"\u01ff":12,"\u0153":12}},"\u021a":{"d":"583,-400v-32,-2,-76,10,-81,-23r-13,-85v-5,-46,-58,-21,-98,-27r0,413v-5,39,29,44,69,41r0,81r-292,0r0,-81r59,0r0,-454v-40,6,-92,-18,-98,27r-12,85v0,35,-50,20,-82,23r5,-216r538,0xm372,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":618,"k":{"q":11,"A":38,"\u00c0":38,"\u00c1":38,"\u00c2":38,"\u00c3":38,"\u00c4":38,"\u0100":38,"\u0102":38,"\u00c5":38,"\u01fa":38,"\u0104":38,"\u00c6":38,"\u01fc":38,"e":18,"\u00e8":18,"\u00e9":18,"\u00ea":18,"\u011b":18,"\u00eb":18,"\u0113":18,"\u0115":18,"\u0117":18,"\u0119":18,"o":12,"\u00f2":12,"\u00f3":12,"\u00f4":12,"\u00f5":12,"\u00f6":12,"\u014d":12,"\u014f":12,"\u0151":12,"\u00f8":12,"\u01ff":12,"\u0153":12}},"\u0166":{"d":"122,-317r105,0r0,-218v-40,6,-92,-18,-98,27r-12,85v0,35,-50,20,-82,23r5,-216r538,0r5,216v-32,-2,-76,10,-81,-23r-13,-85v-5,-46,-58,-21,-98,-27r0,218r105,0r0,62r-105,0r0,133v-5,39,29,44,69,41r0,81r-292,0r0,-81r59,0r0,-174r-105,0r0,-62","w":618,"k":{"q":11,"A":38,"\u00c0":38,"\u00c1":38,"\u00c2":38,"\u00c3":38,"\u00c4":38,"\u0100":38,"\u0102":38,"\u00c5":38,"\u01fa":38,"\u0104":38,"\u00c6":38,"\u01fc":38,"e":18,"\u00e8":18,"\u00e9":18,"\u00ea":18,"\u011b":18,"\u00eb":18,"\u0113":18,"\u0115":18,"\u0117":18,"\u0119":18,"o":12,"\u00f2":12,"\u00f3":12,"\u00f4":12,"\u00f5":12,"\u00f6":12,"\u014d":12,"\u014f":12,"\u0151":12,"\u00f8":12,"\u01ff":12,"\u0153":12}},"\u00d9":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm461,-686r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":691},"\u00da":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm444,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":691},"\u00db":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm474,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":691},"\u0168":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm492,-780v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":691},"\u00dc":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm475,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm321,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":691},"\u016a":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm470,-685r-248,0r0,-63r248,0r0,63","w":691},"\u016c":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm474,-758v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":691},"\u016e":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm435,-744v0,51,-42,83,-90,83v-48,0,-90,-32,-90,-83v0,-51,42,-83,90,-83v48,0,90,32,90,83xm384,-744v0,-29,-15,-45,-39,-45v-24,0,-39,16,-39,45v0,29,15,45,39,45v24,0,39,-16,39,-45","w":691},"\u0170":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v3,152,-82,247,-241,245v-72,0,-137,-19,-178,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157xm528,-745v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74xm349,-745v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74","w":691},"\u0172":{"d":"352,-93v60,0,85,-42,85,-109r0,-292v5,-41,-29,-43,-69,-41r0,-81r277,0r0,81r-56,0r0,301v0,66,-13,128,-51,172v-45,53,-137,82,-137,152v0,55,57,63,96,42r0,59v-76,32,-184,-1,-184,-94v0,-32,16,-65,45,-86v-78,1,-145,-17,-188,-54v-104,-86,-67,-280,-67,-451v0,-40,-29,-43,-69,-41r0,-81r289,0r0,81r-56,0r0,285v-4,107,9,157,85,157","w":691},"\u1e80":{"d":"926,-535v-49,0,-76,-6,-91,43r-147,492r-117,0r-97,-316r-107,316r-121,0r-140,-489v-11,-48,-36,-47,-86,-46r0,-81r286,0r0,81r-50,0r78,317r133,-398r66,0r124,398r84,-317r-46,0r0,-81r231,0r0,81xm615,-686r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":946,"k":{"y":30,"s":63,"U":4,"Q":12,"a":55,"\u00e0":55,"\u00e1":55,"\u00e2":55,"\u00e3":55,"\u00e4":55,"\u0101":55,"\u0103":55,"\u00e5":55,"\u01fb":55,"\u0105":55,"\u00e6":55,"\u01fd":55,"u":30,"\u00f9":30,"\u00fa":30,"\u00fb":30,"\u0169":30,"\u00fc":30,"\u016b":30,"\u016d":30,"\u016f":30,"\u0171":30,"\u0173":30,"A":90,"\u00c0":90,"\u00c1":90,"\u00c2":90,"\u00c3":90,"\u00c4":90,"\u0100":90,"\u0102":90,"\u00c5":90,"\u01fa":90,"\u0104":90,"\u00c6":90,"\u01fc":90,"e":53,"\u00e8":53,"\u00e9":53,"\u00ea":53,"\u011b":53,"\u00eb":53,"\u0113":53,"\u0115":53,"\u0117":53,"\u0119":53,"o":57,"\u00f2":57,"\u00f3":57,"\u00f4":57,"\u00f5":57,"\u00f6":57,"\u014d":57,"\u014f":57,"\u0151":57,"\u00f8":57,"\u01ff":57,"\u0153":57,"O":12,"\u00d2":12,"\u00d3":12,"\u00d4":12,"\u00d5":12,"\u00d6":12,"\u014c":12,"\u014e":12,"\u0150":12,"\u00d8":12,"\u01fe":12,"\u0152":12}},"\u1e82":{"d":"926,-535v-49,0,-76,-6,-91,43r-147,492r-117,0r-97,-316r-107,316r-121,0r-140,-489v-11,-48,-36,-47,-86,-46r0,-81r286,0r0,81r-50,0r78,317r133,-398r66,0r124,398r84,-317r-46,0r0,-81r231,0r0,81xm601,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":946,"k":{"y":30,"s":63,"U":4,"Q":12,"a":55,"\u00e0":55,"\u00e1":55,"\u00e2":55,"\u00e3":55,"\u00e4":55,"\u0101":55,"\u0103":55,"\u00e5":55,"\u01fb":55,"\u0105":55,"\u00e6":55,"\u01fd":55,"u":30,"\u00f9":30,"\u00fa":30,"\u00fb":30,"\u0169":30,"\u00fc":30,"\u016b":30,"\u016d":30,"\u016f":30,"\u0171":30,"\u0173":30,"A":90,"\u00c0":90,"\u00c1":90,"\u00c2":90,"\u00c3":90,"\u00c4":90,"\u0100":90,"\u0102":90,"\u00c5":90,"\u01fa":90,"\u0104":90,"\u00c6":90,"\u01fc":90,"e":53,"\u00e8":53,"\u00e9":53,"\u00ea":53,"\u011b":53,"\u00eb":53,"\u0113":53,"\u0115":53,"\u0117":53,"\u0119":53,"o":57,"\u00f2":57,"\u00f3":57,"\u00f4":57,"\u00f5":57,"\u00f6":57,"\u014d":57,"\u014f":57,"\u0151":57,"\u00f8":57,"\u01ff":57,"\u0153":57,"O":12,"\u00d2":12,"\u00d3":12,"\u00d4":12,"\u00d5":12,"\u00d6":12,"\u014c":12,"\u014e":12,"\u0150":12,"\u00d8":12,"\u01fe":12,"\u0152":12}},"\u0174":{"d":"926,-535v-49,0,-76,-6,-91,43r-147,492r-117,0r-97,-316r-107,316r-121,0r-140,-489v-11,-48,-36,-47,-86,-46r0,-81r286,0r0,81r-50,0r78,317r133,-398r66,0r124,398r84,-317r-46,0r0,-81r231,0r0,81xm631,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":946,"k":{"Q":12,"U":4,"y":30,"s":63,"u":30,"\u00f9":30,"\u00fa":30,"\u00fb":30,"\u0169":30,"\u00fc":30,"\u016b":30,"\u016d":30,"\u016f":30,"\u0171":30,"\u0173":30,"O":12,"\u00d2":12,"\u00d3":12,"\u00d4":12,"\u00d5":12,"\u00d6":12,"\u014c":12,"\u014e":12,"\u0150":12,"\u00d8":12,"\u01fe":12,"\u0152":12,"e":53,"\u00e8":53,"\u00e9":53,"\u00ea":53,"\u011b":53,"\u00eb":53,"\u0113":53,"\u0115":53,"\u0117":53,"\u0119":53,"A":90,"\u00c0":90,"\u00c1":90,"\u00c2":90,"\u00c3":90,"\u00c4":90,"\u0100":90,"\u0102":90,"\u00c5":90,"\u01fa":90,"\u0104":90,"\u00c6":90,"\u01fc":90,"o":57,"\u00f2":57,"\u00f3":57,"\u00f4":57,"\u00f5":57,"\u00f6":57,"\u014d":57,"\u014f":57,"\u0151":57,"\u00f8":57,"\u01ff":57,"\u0153":57,"a":55,"\u00e0":55,"\u00e1":55,"\u00e2":55,"\u00e3":55,"\u00e4":55,"\u0101":55,"\u0103":55,"\u00e5":55,"\u01fb":55,"\u0105":55,"\u00e6":55,"\u01fd":55}},"\u1e84":{"d":"926,-535v-49,0,-76,-6,-91,43r-147,492r-117,0r-97,-316r-107,316r-121,0r-140,-489v-11,-48,-36,-47,-86,-46r0,-81r286,0r0,81r-50,0r78,317r133,-398r66,0r124,398r84,-317r-46,0r0,-81r231,0r0,81xm624,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm470,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":946,"k":{"y":30,"s":63,"U":4,"Q":12,"a":55,"\u00e0":55,"\u00e1":55,"\u00e2":55,"\u00e3":55,"\u00e4":55,"\u0101":55,"\u0103":55,"\u00e5":55,"\u01fb":55,"\u0105":55,"\u00e6":55,"\u01fd":55,"u":30,"\u00f9":30,"\u00fa":30,"\u00fb":30,"\u0169":30,"\u00fc":30,"\u016b":30,"\u016d":30,"\u016f":30,"\u0171":30,"\u0173":30,"A":90,"\u00c0":90,"\u00c1":90,"\u00c2":90,"\u00c3":90,"\u00c4":90,"\u0100":90,"\u0102":90,"\u00c5":90,"\u01fa":90,"\u0104":90,"\u00c6":90,"\u01fc":90,"e":53,"\u00e8":53,"\u00e9":53,"\u00ea":53,"\u011b":53,"\u00eb":53,"\u0113":53,"\u0115":53,"\u0117":53,"\u0119":53,"o":57,"\u00f2":57,"\u00f3":57,"\u00f4":57,"\u00f5":57,"\u00f6":57,"\u014d":57,"\u014f":57,"\u0151":57,"\u00f8":57,"\u01ff":57,"\u0153":57,"O":12,"\u00d2":12,"\u00d3":12,"\u00d4":12,"\u00d5":12,"\u00d6":12,"\u014c":12,"\u014e":12,"\u0150":12,"\u00d8":12,"\u01fe":12,"\u0152":12}},"\u1ef2":{"d":"633,-535v-55,-1,-74,0,-99,50r-128,249r0,114v-4,36,23,44,62,41r0,81r-286,0r0,-81r60,0r0,-153r-129,-255v-20,-43,-41,-48,-93,-46r0,-81r285,0r0,81r-40,0r84,173r91,-173r-39,0r0,-81r232,0r0,81xm460,-686r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":653,"k":{"q":54,"Q":11,"a":60,"\u00e0":60,"\u00e1":60,"\u00e2":60,"\u00e3":60,"\u00e4":60,"\u0101":60,"\u0103":60,"\u00e5":60,"\u01fb":60,"\u0105":60,"\u00e6":60,"\u01fd":60,"A":54,"\u00c0":54,"\u00c1":54,"\u00c2":54,"\u00c3":54,"\u00c4":54,"\u0100":54,"\u0102":54,"\u00c5":54,"\u01fa":54,"\u0104":54,"\u00c6":54,"\u01fc":54,"e":60,"\u00e8":60,"\u00e9":60,"\u00ea":60,"\u011b":60,"\u00eb":60,"\u0113":60,"\u0115":60,"\u0117":60,"\u0119":60,"o":60,"\u00f2":60,"\u00f3":60,"\u00f4":60,"\u00f5":60,"\u00f6":60,"\u014d":60,"\u014f":60,"\u0151":60,"\u00f8":60,"\u01ff":60,"\u0153":60,"C":15,"\u0106":15,"\u00c7":15,"\u0108":15,"\u010c":15,"\u010a":15,"G":15,"\u011c":15,"\u011e":15,"\u0120":15,"\u0122":15,"O":11,"\u00d2":11,"\u00d3":11,"\u00d4":11,"\u00d5":11,"\u00d6":11,"\u014c":11,"\u014e":11,"\u0150":11,"\u00d8":11,"\u01fe":11,"\u0152":11}},"\u00dd":{"d":"633,-535v-55,-1,-74,0,-99,50r-128,249r0,114v-4,36,23,44,62,41r0,81r-286,0r0,-81r60,0r0,-153r-129,-255v-20,-43,-41,-48,-93,-46r0,-81r285,0r0,81r-40,0r84,173r91,-173r-39,0r0,-81r232,0r0,81xm448,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":653,"k":{"Q":11,"q":54,"C":15,"\u0106":15,"\u00c7":15,"\u0108":15,"\u010c":15,"\u010a":15,"G":15,"\u011c":15,"\u011e":15,"\u0120":15,"\u0122":15,"O":11,"\u00d2":11,"\u00d3":11,"\u00d4":11,"\u00d5":11,"\u00d6":11,"\u014c":11,"\u014e":11,"\u0150":11,"\u00d8":11,"\u01fe":11,"\u0152":11,"e":60,"\u00e8":60,"\u00e9":60,"\u00ea":60,"\u011b":60,"\u00eb":60,"\u0113":60,"\u0115":60,"\u0117":60,"\u0119":60,"A":54,"\u00c0":54,"\u00c1":54,"\u00c2":54,"\u00c3":54,"\u00c4":54,"\u0100":54,"\u0102":54,"\u00c5":54,"\u01fa":54,"\u0104":54,"\u00c6":54,"\u01fc":54,"o":60,"\u00f2":60,"\u00f3":60,"\u00f4":60,"\u00f5":60,"\u00f6":60,"\u014d":60,"\u014f":60,"\u0151":60,"\u00f8":60,"\u01ff":60,"\u0153":60,"a":60,"\u00e0":60,"\u00e1":60,"\u00e2":60,"\u00e3":60,"\u00e4":60,"\u0101":60,"\u0103":60,"\u00e5":60,"\u01fb":60,"\u0105":60,"\u00e6":60,"\u01fd":60}},"\u0176":{"d":"633,-535v-55,-1,-74,0,-99,50r-128,249r0,114v-4,36,23,44,62,41r0,81r-286,0r0,-81r60,0r0,-153r-129,-255v-20,-43,-41,-48,-93,-46r0,-81r285,0r0,81r-40,0r84,173r91,-173r-39,0r0,-81r232,0r0,81xm475,-661r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":653,"k":{"Q":11,"q":54,"C":15,"\u0106":15,"\u00c7":15,"\u0108":15,"\u010c":15,"\u010a":15,"G":15,"\u011c":15,"\u011e":15,"\u0120":15,"\u0122":15,"O":11,"\u00d2":11,"\u00d3":11,"\u00d4":11,"\u00d5":11,"\u00d6":11,"\u014c":11,"\u014e":11,"\u0150":11,"\u00d8":11,"\u01fe":11,"\u0152":11,"e":60,"\u00e8":60,"\u00e9":60,"\u00ea":60,"\u011b":60,"\u00eb":60,"\u0113":60,"\u0115":60,"\u0117":60,"\u0119":60,"A":54,"\u00c0":54,"\u00c1":54,"\u00c2":54,"\u00c3":54,"\u00c4":54,"\u0100":54,"\u0102":54,"\u00c5":54,"\u01fa":54,"\u0104":54,"\u00c6":54,"\u01fc":54,"o":60,"\u00f2":60,"\u00f3":60,"\u00f4":60,"\u00f5":60,"\u00f6":60,"\u014d":60,"\u014f":60,"\u0151":60,"\u00f8":60,"\u01ff":60,"\u0153":60,"a":60,"\u00e0":60,"\u00e1":60,"\u00e2":60,"\u00e3":60,"\u00e4":60,"\u0101":60,"\u0103":60,"\u00e5":60,"\u01fb":60,"\u0105":60,"\u00e6":60,"\u01fd":60}},"\u0178":{"d":"633,-535v-55,-1,-74,0,-99,50r-128,249r0,114v-4,36,23,44,62,41r0,81r-286,0r0,-81r60,0r0,-153r-129,-255v-20,-43,-41,-48,-93,-46r0,-81r285,0r0,81r-40,0r84,173r91,-173r-39,0r0,-81r232,0r0,81xm471,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm317,-711v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":653,"k":{"Q":11,"q":54,"C":15,"\u0106":15,"\u00c7":15,"\u0108":15,"\u010c":15,"\u010a":15,"G":15,"\u011c":15,"\u011e":15,"\u0120":15,"\u0122":15,"O":11,"\u00d2":11,"\u00d3":11,"\u00d4":11,"\u00d5":11,"\u00d6":11,"\u014c":11,"\u014e":11,"\u0150":11,"\u00d8":11,"\u01fe":11,"\u0152":11,"e":60,"\u00e8":60,"\u00e9":60,"\u00ea":60,"\u011b":60,"\u00eb":60,"\u0113":60,"\u0115":60,"\u0117":60,"\u0119":60,"A":54,"\u00c0":54,"\u00c1":54,"\u00c2":54,"\u00c3":54,"\u00c4":54,"\u0100":54,"\u0102":54,"\u00c5":54,"\u01fa":54,"\u0104":54,"\u00c6":54,"\u01fc":54,"o":60,"\u00f2":60,"\u00f3":60,"\u00f4":60,"\u00f5":60,"\u00f6":60,"\u014d":60,"\u014f":60,"\u0151":60,"\u00f8":60,"\u01ff":60,"\u0153":60,"a":60,"\u00e0":60,"\u00e1":60,"\u00e2":60,"\u00e3":60,"\u00e4":60,"\u0101":60,"\u0103":60,"\u00e5":60,"\u01fb":60,"\u0105":60,"\u00e6":60,"\u01fd":60}},"\u0179":{"d":"533,-616v2,96,1,89,-68,192r-231,343r151,0v61,5,48,-48,62,-87r81,0r0,168r-485,0v-2,-92,2,-92,58,-176r241,-359r-156,0v-60,-8,-54,55,-67,98r-79,0r0,-179r493,0xm401,-705v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":573},"\u017d":{"d":"533,-616v2,96,1,89,-68,192r-231,343r151,0v61,5,48,-48,62,-87r81,0r0,168r-485,0v-2,-92,2,-92,58,-176r241,-359r-156,0v-60,-8,-54,55,-67,98r-79,0r0,-179r493,0xm418,-780r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":573},"\u017b":{"d":"533,-616v2,96,1,89,-68,192r-231,343r151,0v61,5,48,-48,62,-87r81,0r0,168r-485,0v-2,-92,2,-92,58,-176r241,-359r-156,0v-60,-8,-54,55,-67,98r-79,0r0,-179r493,0xm362,-728v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":573},"\u00e0":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm373,-521r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":516},"\u00e1":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm350,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":516},"\u00e2":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm386,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":516},"\u00e3":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm401,-632v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":516},"\u00e4":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm377,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm223,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":516},"\u0101":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm132,-601r248,0r0,63r-248,0r0,-63","w":516},"\u0103":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm377,-618v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":516},"\u00e5":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm347,-573v0,51,-42,83,-90,83v-48,0,-90,-32,-90,-83v0,-51,42,-83,90,-83v48,0,90,32,90,83xm304,-573v0,-33,-19,-53,-47,-53v-28,0,-47,20,-47,53v0,33,19,53,47,53v28,0,47,-20,47,-53","w":516},"\u01fb":{"d":"501,0v-72,-4,-165,18,-190,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28r0,69xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38xm346,-573v0,51,-42,83,-90,83v-48,0,-90,-32,-90,-83v0,-51,42,-83,90,-83v48,0,90,32,90,83xm295,-573v0,-29,-15,-45,-39,-45v-24,0,-39,16,-39,45v0,29,15,45,39,45v24,0,39,-16,39,-45xm350,-702v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":516},"\u0105":{"d":"388,0v-35,0,-65,-10,-77,-36v-21,22,-75,49,-131,49v-78,0,-148,-44,-148,-147v0,-105,104,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v148,-51,362,-52,362,142r0,203v-2,34,33,28,64,28v-2,22,4,51,-2,69v-50,0,-87,40,-87,90v0,55,63,62,96,42r0,59v-74,33,-182,-3,-182,-94v0,-38,21,-79,62,-97xm283,-108r0,-122v-66,4,-105,40,-105,84v0,58,75,67,105,38","w":516},"\u00e6":{"d":"514,-471v148,1,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-78,79,-286,99,-362,5v-29,32,-85,64,-164,64v-78,0,-148,-44,-148,-147v0,-105,101,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v95,-34,233,-46,307,9v36,-24,80,-38,132,-38xm570,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm302,-118v-14,-36,-19,-76,-19,-112v-58,3,-100,36,-100,84v0,68,90,60,119,28","w":763},"\u01fd":{"d":"514,-471v148,1,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-78,79,-286,99,-362,5v-29,32,-85,64,-164,64v-78,0,-148,-44,-148,-147v0,-105,101,-164,251,-167v5,-56,-12,-87,-66,-87v-35,0,-82,7,-142,31r0,-85v95,-34,233,-46,307,9v36,-24,80,-38,132,-38xm570,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm302,-118v-14,-36,-19,-76,-19,-112v-58,3,-100,36,-100,84v0,68,90,60,119,28xm486,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":763},"\u0107":{"d":"192,-228v0,90,23,148,103,148v42,0,88,-20,110,-37r39,66v-34,31,-106,64,-178,64v-149,0,-234,-93,-234,-240v0,-161,102,-244,227,-244v47,0,88,15,112,38r7,-25r54,0r0,187v-34,-1,-73,8,-74,-27v-1,-50,-26,-88,-72,-85v-79,4,-94,69,-94,155xm351,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":484},"\u00e7":{"d":"192,-228v0,90,23,148,103,148v42,0,88,-20,110,-37r39,66v-35,31,-107,65,-181,64r-8,27v57,-19,114,18,114,80v0,48,-39,93,-108,93v-24,0,-52,-7,-69,-17r12,-52v29,20,89,22,89,-23v0,-33,-46,-43,-63,-21r-43,-16r24,-76v-115,-20,-179,-107,-179,-235v0,-161,102,-244,227,-244v47,0,88,15,112,38r7,-25r54,0r0,187v-34,-1,-73,8,-74,-27v-1,-50,-26,-88,-72,-85v-79,4,-94,69,-94,155","w":484},"\u0109":{"d":"192,-228v0,90,23,148,103,148v42,0,88,-20,110,-37r39,66v-34,31,-106,64,-178,64v-149,0,-234,-93,-234,-240v0,-161,102,-244,227,-244v47,0,88,15,112,38r7,-25r54,0r0,187v-34,-1,-73,8,-74,-27v-1,-50,-26,-88,-72,-85v-79,4,-94,69,-94,155xm380,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":484},"\u010d":{"d":"192,-228v0,90,23,148,103,148v42,0,88,-20,110,-37r39,66v-34,31,-106,64,-178,64v-149,0,-234,-93,-234,-240v0,-161,102,-244,227,-244v47,0,88,15,112,38r7,-25r54,0r0,187v-34,-1,-73,8,-74,-27v-1,-50,-26,-88,-72,-85v-79,4,-94,69,-94,155xm384,-629r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":484},"\u010b":{"d":"192,-228v0,90,23,148,103,148v42,0,88,-20,110,-37r39,66v-34,31,-106,64,-178,64v-149,0,-234,-93,-234,-240v0,-161,102,-244,227,-244v47,0,88,15,112,38r7,-25r54,0r0,187v-34,-1,-73,8,-74,-27v-1,-50,-26,-88,-72,-85v-79,4,-94,69,-94,155xm316,-573v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":484},"\u010f":{"d":"539,0v-69,-3,-154,14,-180,-34v-24,25,-71,47,-123,47v-127,0,-204,-96,-204,-246v0,-190,137,-272,291,-224r0,-155r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,559v-5,30,30,33,62,31r0,69xm323,-98r0,-278v-78,-30,-131,-9,-131,145v0,118,39,152,79,152v25,0,42,-11,52,-19xm622,-627v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":612},"\u0111":{"d":"155,-568r168,0r0,-44r-60,0r-14,-70v94,0,154,-7,190,-7v63,0,30,73,38,121r62,0r0,56r-62,0r0,412v-5,30,30,33,62,31r0,69v-69,-3,-154,14,-180,-34v-24,25,-71,47,-123,47v-127,0,-204,-96,-204,-246v0,-190,137,-272,291,-224r0,-55r-168,0r0,-56xm323,-98r0,-278v-78,-30,-131,-9,-131,145v0,118,39,152,79,152v25,0,42,-11,52,-19","w":557},"\u00f0":{"d":"519,-288v0,144,-70,300,-245,300v-130,0,-236,-77,-236,-234v0,-144,100,-226,217,-226v27,0,56,7,71,18v-8,-30,-30,-64,-72,-88r-48,54r-42,-41r31,-35v-17,-4,-36,-6,-57,-6r26,-82v34,0,67,4,99,11r59,-65r43,40r-40,45v113,47,194,150,194,309xm353,-245v0,-34,-7,-83,-12,-99v-72,-38,-138,-2,-138,127v0,93,24,141,69,141v53,0,81,-46,81,-169","w":559},"\u00e8":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm377,-521r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":508},"\u00e9":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm354,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":508},"\u00ea":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm392,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":508},"\u011b":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm386,-629r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":508},"\u00eb":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm389,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm235,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":508},"\u0113":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm384,-544r-248,0r0,-63r248,0r0,63","w":508},"\u0115":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm385,-619v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":508},"\u0117":{"d":"260,-471v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41r40,65v-42,39,-120,69,-194,69v-148,0,-229,-96,-229,-240v0,-139,88,-244,231,-244xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm322,-573v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":508},"\u0119":{"d":"452,-56v-40,52,-116,74,-122,148v-4,52,55,62,96,40r0,59v-74,31,-182,1,-182,-92v0,-35,17,-67,45,-88v-165,16,-260,-84,-260,-238v0,-139,88,-244,231,-244v148,0,221,118,207,267r-277,0v2,76,37,124,101,124v43,0,87,-16,121,-41xm322,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0","w":508},"\u011d":{"d":"514,70v0,79,-68,158,-250,158v-129,0,-230,-44,-230,-139v0,-45,28,-74,65,-86v-49,-42,-39,-114,10,-161v-32,-31,-49,-75,-49,-129v0,-131,110,-202,259,-180v43,-63,89,-86,132,-86v50,-1,47,38,46,83v-31,-1,-67,-1,-105,27v55,30,86,84,86,156v0,146,-151,215,-299,171v-17,40,1,46,74,47r85,0v123,0,176,49,176,139xm325,-287v0,-62,-14,-101,-56,-101v-42,0,-56,39,-56,101v0,62,14,101,56,101v42,0,56,-39,56,-101xm383,83v0,-66,-170,-28,-211,-44v-35,54,25,96,100,96v75,0,111,-26,111,-52xm397,-552r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":542},"\u011f":{"d":"514,70v0,79,-68,158,-250,158v-129,0,-230,-44,-230,-139v0,-45,28,-74,65,-86v-49,-42,-39,-114,10,-161v-32,-31,-49,-75,-49,-129v0,-131,110,-202,259,-180v43,-63,89,-86,132,-86v50,-1,47,38,46,83v-31,-1,-67,-1,-105,27v55,30,86,84,86,156v0,146,-151,215,-299,171v-17,40,1,46,74,47r85,0v123,0,176,49,176,139xm325,-287v0,-62,-14,-101,-56,-101v-42,0,-56,39,-56,101v0,62,14,101,56,101v42,0,56,-39,56,-101xm383,83v0,-66,-170,-28,-211,-44v-35,54,25,96,100,96v75,0,111,-26,111,-52xm397,-619v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":542},"\u0121":{"d":"514,70v0,79,-68,158,-250,158v-129,0,-230,-44,-230,-139v0,-45,28,-74,65,-86v-49,-42,-39,-114,10,-161v-32,-31,-49,-75,-49,-129v0,-131,110,-202,259,-180v43,-63,89,-86,132,-86v50,-1,47,38,46,83v-31,-1,-67,-1,-105,27v55,30,86,84,86,156v0,146,-151,215,-299,171v-17,40,1,46,74,47r85,0v123,0,176,49,176,139xm325,-287v0,-62,-14,-101,-56,-101v-42,0,-56,39,-56,101v0,62,14,101,56,101v42,0,56,-39,56,-101xm383,83v0,-66,-170,-28,-211,-44v-35,54,25,96,100,96v75,0,111,-26,111,-52xm331,-573v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":542},"\u0123":{"d":"207,-569v0,-46,24,-92,73,-163r34,17v-19,34,-37,77,-41,104v33,1,52,24,52,49v0,33,-25,55,-57,55v-34,0,-61,-23,-61,-62xm514,70v0,79,-68,158,-250,158v-129,0,-230,-44,-230,-139v0,-45,28,-74,65,-86v-49,-42,-39,-114,10,-161v-32,-31,-49,-75,-49,-129v0,-131,110,-202,259,-180v43,-63,89,-86,132,-86v50,-1,47,38,46,83v-31,-1,-67,-1,-105,27v55,30,86,84,86,156v0,146,-151,215,-299,171v-17,40,1,46,74,47r85,0v123,0,176,49,176,139xm325,-287v0,-62,-14,-101,-56,-101v-42,0,-56,39,-56,101v0,62,14,101,56,101v42,0,56,-39,56,-101xm383,83v0,-66,-170,-28,-211,-44v-35,54,25,96,100,96v75,0,111,-26,111,-52","w":542},"\u0125":{"d":"240,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-250,0r0,-69r43,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,31,22,29,51,29r0,69r-257,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,239xm284,-719r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":599},"\u0127":{"d":"240,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-250,0r0,-69r43,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,31,22,29,51,29r0,69r-257,0r0,-69r52,0r0,-445r-70,0r0,-56r70,0r0,-42r-60,0r-14,-70v94,0,154,-7,190,-7v62,0,31,72,38,119r150,0r0,56r-150,0r0,94","w":599},"\u0131":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69"},"\u00ec":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm280,-521r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103"},"\u00ed":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm252,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84"},"\u00ee":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm287,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17"},"\u0129":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm306,-632v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0"},"\u00ef":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm285,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm131,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49"},"\u012b":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm283,-544r-248,0r0,-63r248,0r0,63"},"\u012d":{"d":"300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm291,-619v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0"},"\u012f":{"d":"300,0v-78,-9,-129,22,-133,90v-3,55,63,62,96,42r0,59v-74,33,-182,-3,-182,-94v0,-38,21,-79,62,-97r-102,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm249,-604v0,49,-40,78,-86,78v-46,0,-86,-29,-86,-78v0,-49,40,-78,86,-78v46,0,86,29,86,78"},"\u0133":{"d":"249,-604v0,49,-40,78,-86,78v-46,0,-86,-29,-86,-78v0,-49,40,-78,86,-78v46,0,86,29,86,78xm300,0r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,337v-2,32,24,29,53,29r0,69xm568,-604v0,49,-40,78,-86,78v-46,0,-86,-29,-86,-78v0,-49,40,-78,86,-78v46,0,86,29,86,78xm576,9v0,127,-44,186,-170,186v-39,0,-86,-6,-122,-19r0,-90v56,19,138,32,138,-53r0,-421r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,444","w":656},"\u0135":{"d":"252,9v0,127,-44,186,-170,186v-39,0,-86,-6,-122,-19r0,-90v56,19,138,32,138,-53r0,-421r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,444xm293,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":332},"\u0137":{"d":"577,0r-252,0r0,-69r33,0r-81,-147r-37,32v6,51,-25,128,51,115r0,69r-257,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,369v51,-47,144,-113,169,-168r135,0r0,70v-46,1,-66,-4,-99,24r-63,55r112,200v21,37,39,42,83,40r0,69xm368,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":592},"\u0138":{"d":"589,0r-252,0r0,-69r33,0r-81,-147r-45,39v5,50,-23,121,51,108r0,69r-257,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,152v53,-50,150,-117,177,-175r135,0r0,70v-47,1,-67,-4,-99,24r-63,55r112,200v21,37,39,42,83,40r0,69","w":604},"\u013a":{"d":"293,0r-259,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,561v-2,32,24,29,53,29r0,69xm246,-756v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":321},"\u013e":{"d":"293,0r-259,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,561v-2,32,24,29,53,29r0,69xm385,-627v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":375},"\u013c":{"d":"293,0r-259,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,561v-2,32,24,29,53,29r0,69xm220,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":321},"\u0142":{"d":"327,-390r-90,33r0,259v-2,32,24,29,53,29r0,69r-259,0r0,-69r52,0r0,-230r-90,33r0,-88r90,-33r0,-225r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,214r90,-33r0,88","w":319},"\u017f":{"d":"219,-533v0,35,25,81,25,122r0,313v-2,28,24,30,53,29r0,69r-259,0r0,-69r52,0r0,-319r-69,0r0,-70r58,0v-5,-15,-13,-57,-13,-80v0,-102,66,-153,171,-153v49,0,101,13,123,22r0,89v-54,-18,-141,-30,-141,47","w":338},"\u0140":{"d":"293,0r-259,0r0,-69r52,0r0,-543r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,561v-2,32,24,29,53,29r0,69xm392,-300v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":402},"\u0144":{"d":"244,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-252,0r0,-69r45,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,30,21,30,49,29r0,69r-255,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45xm410,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":603},"\u0148":{"d":"244,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-252,0r0,-69r45,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,30,21,30,49,29r0,69r-255,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45xm445,-629r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":603},"\u00f1":{"d":"244,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-252,0r0,-69r45,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,30,21,30,49,29r0,69r-255,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45xm446,-632v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":603},"\u0146":{"d":"244,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-252,0r0,-69r45,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,30,21,30,49,29r0,69r-255,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45xm368,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":603},"\u0149":{"d":"316,-420v115,-94,282,-59,282,101r0,221v-2,33,24,29,53,29r0,69r-252,0r0,-69r45,0r0,-244v0,-80,-91,-62,-128,-23r0,238v-2,30,21,30,49,29r0,69r-255,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45xm102,-629v0,54,-27,119,-82,202r-38,-20v21,-40,42,-102,46,-132v-37,-2,-58,-29,-58,-58v0,-39,29,-64,64,-64v38,0,68,27,68,72","w":675},"\u014b":{"d":"244,-420v115,-94,282,-59,282,101r0,298v0,127,-44,186,-170,186v-39,0,-86,-6,-122,-19r0,-90v56,19,138,32,138,-53r0,-316v0,-80,-91,-62,-128,-23r0,238v-2,30,21,30,49,29r0,69r-255,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v34,0,40,14,38,45","w":590},"\u00f2":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm393,-521r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":528},"\u00f3":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm352,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":528},"\u00f4":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm394,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":528},"\u00f5":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm408,-632v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":528},"\u00f6":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm390,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm236,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":528},"\u014d":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm388,-544r-248,0r0,-63r248,0r0,63","w":528},"\u014f":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm393,-619v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":528},"\u0151":{"d":"496,-229v0,163,-95,242,-232,242v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v137,0,232,79,232,242xm336,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147xm443,-580v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74xm264,-580v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74","w":528},"\u00f8":{"d":"500,-229v1,191,-135,269,-308,233r-28,57r-73,0r40,-84v-59,-38,-95,-106,-95,-206v-1,-191,135,-269,308,-233r35,-73r72,0r-48,99v60,38,97,106,97,207xm298,-368v-73,-29,-103,27,-102,139v0,24,1,46,4,64xm340,-229v0,-25,-1,-48,-4,-67r-99,206v74,29,104,-27,103,-139","w":536},"\u01ff":{"d":"500,-229v1,191,-135,269,-308,233r-28,57r-73,0r40,-84v-59,-38,-95,-106,-95,-206v-1,-191,135,-269,308,-233r35,-73r72,0r-48,99v60,38,97,106,97,207xm298,-368v-73,-29,-103,27,-102,139v0,24,1,46,4,64xm340,-229v0,-25,-1,-48,-4,-67r-99,206v74,29,104,-27,103,-139xm350,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":528},"\u0153":{"d":"569,-471v148,1,221,118,207,267r-277,0v2,76,38,124,101,124v43,0,87,-16,121,-41r40,65v-74,72,-257,100,-342,19v-41,32,-91,50,-151,50v-137,0,-232,-79,-232,-242v0,-163,95,-242,232,-242v62,0,113,18,154,52v34,-30,86,-52,147,-52xm631,-273v3,-49,0,-112,-59,-112v-56,0,-69,69,-71,112r130,0xm340,-229v0,-97,-20,-147,-72,-147v-52,0,-72,50,-72,147v0,97,20,147,72,147v52,0,72,-50,72,-147","w":818},"\u00fe":{"d":"530,-229v0,118,-59,242,-192,242v-44,0,-83,-13,-105,-34v-9,109,40,250,-92,244r-128,0r0,-73v29,1,65,4,65,-26r0,-736r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,233v31,-31,72,-45,113,-45v141,0,185,119,185,242xm370,-229v0,-102,-30,-139,-76,-139v-84,0,-62,126,-62,210v0,49,23,74,62,74v48,0,76,-50,76,-145","w":566},"\u0155":{"d":"397,-358v-63,-3,-99,0,-154,34r0,226v-2,32,24,29,53,29r0,69r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v37,0,40,20,38,55v29,-37,74,-61,120,-61v56,0,27,68,34,113xm342,-534v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":407},"\u0159":{"d":"397,-358v-63,-3,-99,0,-154,34r0,226v-2,32,24,29,53,29r0,69r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v37,0,40,20,38,55v29,-37,74,-61,120,-61v56,0,27,68,34,113xm345,-629r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":407},"\u0157":{"d":"397,-358v-63,-3,-99,0,-154,34r0,226v-2,32,24,29,53,29r0,69r-259,0r0,-69r52,0r0,-319r-60,0r-14,-70v94,0,154,-7,190,-7v37,0,40,20,38,55v29,-37,74,-61,120,-61v56,0,27,68,34,113xm227,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":407},"\u015b":{"d":"418,-125v0,129,-210,181,-305,96r-7,29r-55,0r0,-183v33,2,73,-10,73,26v0,55,37,87,95,87v34,0,57,-17,57,-38v0,-40,-84,-60,-120,-76v-63,-27,-111,-66,-111,-143v0,-135,201,-185,286,-105r5,-26r55,0r0,180v-33,0,-72,6,-72,-27v0,-51,-29,-84,-77,-84v-32,0,-55,18,-55,41v0,42,89,65,127,83v63,30,104,67,104,140xm328,-539v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":446},"\u015d":{"d":"418,-125v0,129,-210,181,-305,96r-7,29r-55,0r0,-183v33,2,73,-10,73,26v0,55,37,87,95,87v34,0,57,-17,57,-38v0,-40,-84,-60,-120,-76v-63,-27,-111,-66,-111,-143v0,-135,201,-185,286,-105r5,-26r55,0r0,180v-33,0,-72,6,-72,-27v0,-51,-29,-84,-77,-84v-32,0,-55,18,-55,41v0,42,89,65,127,83v63,30,104,67,104,140xm352,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":446},"\u0161":{"d":"418,-125v0,129,-210,181,-305,96r-7,29r-55,0r0,-183v33,2,73,-10,73,26v0,55,37,87,95,87v34,0,57,-17,57,-38v0,-40,-84,-60,-120,-76v-63,-27,-111,-66,-111,-143v0,-135,201,-185,286,-105r5,-26r55,0r0,180v-33,0,-72,6,-72,-27v0,-51,-29,-84,-77,-84v-32,0,-55,18,-55,41v0,42,89,65,127,83v63,30,104,67,104,140xm350,-628r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":446},"\u015f":{"d":"237,213v-24,0,-52,-7,-69,-17r12,-52v29,20,89,22,89,-23v0,-33,-46,-43,-63,-21r-43,-16r24,-77v-27,-7,-52,-18,-74,-36r-7,29r-55,0r0,-183v33,2,73,-10,73,26v0,55,37,87,95,87v34,0,57,-17,57,-38v0,-40,-84,-60,-120,-76v-63,-27,-111,-66,-111,-143v0,-135,201,-185,286,-105r5,-26r55,0r0,180v-33,0,-72,6,-72,-27v0,-51,-29,-84,-77,-84v-32,0,-55,18,-55,41v0,42,89,65,127,83v63,30,104,67,104,140v0,82,-77,139,-179,138r-8,27v57,-19,114,18,114,80v0,48,-39,93,-108,93","w":446},"\u0219":{"d":"418,-125v0,129,-210,181,-305,96r-7,29r-55,0r0,-183v33,2,73,-10,73,26v0,55,37,87,95,87v34,0,57,-17,57,-38v0,-40,-84,-60,-120,-76v-63,-27,-111,-66,-111,-143v0,-135,201,-185,286,-105r5,-26r55,0r0,180v-33,0,-72,6,-72,-27v0,-51,-29,-84,-77,-84v-32,0,-55,18,-55,41v0,42,89,65,127,83v63,30,104,67,104,140xm306,114v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":446},"\u00df":{"d":"643,-131v0,78,-66,144,-170,144v-48,0,-92,-17,-124,-43r-7,30r-53,0r0,-186v32,1,71,-6,71,26v0,55,28,91,83,91v42,0,66,-19,66,-47v0,-88,-200,-68,-200,-227v0,-100,96,-115,96,-184v0,-46,-29,-73,-75,-73v-75,0,-86,68,-86,129r0,471r-206,0r0,-69r52,0r0,-319r-69,0r0,-70r65,0v-6,-156,96,-232,239,-233v92,0,219,44,219,156v0,87,-101,113,-101,166v0,86,200,63,200,238","w":671},"\u0165":{"d":"223,-181v-2,63,16,96,63,98v21,0,46,-6,61,-11r0,86v-24,8,-69,20,-118,20v-120,0,-160,-55,-160,-196r0,-204r-57,0r0,-70r57,0v-1,-50,-5,-95,43,-102r109,-17r0,119r95,0r14,70r-107,0r0,207xm362,-660v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":369},"\u0163":{"d":"223,-181v-2,63,16,96,63,98v21,0,46,-6,61,-11r0,86v-24,8,-69,20,-118,20v-120,0,-160,-55,-160,-196r0,-204r-57,0r0,-70r57,0v-1,-50,-5,-95,43,-102r109,-17r0,119r95,0r14,70r-107,0r0,207xm243,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":369},"\u021b":{"d":"223,-181v-2,63,16,96,63,98v21,0,46,-6,61,-11r0,86v-24,8,-69,20,-118,20v-120,0,-160,-55,-160,-196r0,-204r-57,0r0,-70r57,0v-1,-50,-5,-95,43,-102r109,-17r0,119r95,0r14,70r-107,0r0,207xm243,108v0,46,-24,92,-73,163r-34,-17v19,-34,37,-77,41,-104v-33,-1,-52,-24,-52,-49v0,-33,25,-55,57,-55v34,0,61,23,61,62","w":369},"\u0167":{"d":"229,12v-136,0,-166,-85,-160,-242r-52,0r0,-56r52,0r0,-102r-57,0r0,-70r57,0v-1,-50,-5,-95,43,-102r109,-17r0,119r95,0r14,70r-107,0r0,102r89,0r0,56r-89,0v-2,73,-2,147,63,147v21,0,46,-6,61,-11r0,86v-24,8,-69,20,-118,20","w":369},"\u00f9":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm390,-521r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":602},"\u00fa":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm395,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":602},"\u00fb":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm415,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":602},"\u0169":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm448,-632v-8,48,-29,99,-101,99v-40,0,-65,-28,-98,-28v-22,0,-37,12,-44,28r-51,0v10,-65,44,-99,96,-99v45,0,69,28,104,28v23,0,36,-13,42,-28r52,0","w":602},"\u00fc":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm417,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm263,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":602},"\u016b":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm423,-544r-248,0r0,-63r248,0r0,63","w":602},"\u016d":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm427,-618v-6,55,-57,100,-129,100v-71,0,-120,-38,-129,-100r61,0v6,21,32,38,68,38v40,0,62,-17,68,-38r61,0","w":602},"\u016f":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm390,-573v0,51,-42,83,-90,83v-48,0,-90,-32,-90,-83v0,-51,42,-83,90,-83v48,0,90,32,90,83xm339,-573v0,-29,-15,-45,-39,-45v-24,0,-39,16,-39,45v0,29,15,45,39,45v24,0,39,-16,39,-45","w":602},"\u0171":{"d":"582,0v-76,-5,-175,21,-190,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34r0,69xm480,-580v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74xm301,-580v-70,0,-106,20,-157,79r-22,-20v42,-96,91,-133,138,-133v46,0,42,33,41,74","w":602},"\u0173":{"d":"469,0v-40,0,-69,-13,-77,-47v-38,31,-90,60,-160,60v-85,0,-148,-47,-148,-148r0,-253r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v-3,76,97,62,128,22r0,-265r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,332v-2,36,28,36,62,34v-2,22,4,51,-2,69v-50,0,-87,40,-87,90v0,55,63,62,96,42r0,59v-74,33,-182,-3,-182,-94v0,-38,21,-79,62,-97","w":602},"\u1e81":{"d":"752,-388v-48,-2,-75,2,-87,46r-99,342r-124,0r-68,-218r-70,218r-125,0r-126,-388r-52,0r0,-70r253,0r0,70v-35,-4,-55,6,-45,40r55,186r94,-296r64,0r96,297r60,-227r-52,0r0,-70r212,0xm494,-521r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":735,"k":{"y":-15,"x":-12,"t":-18,"f":-6}},"\u1e83":{"d":"752,-388v-48,-2,-75,2,-87,46r-99,342r-124,0r-68,-218r-70,218r-125,0r-126,-388r-52,0r0,-70r253,0r0,70v-35,-4,-55,6,-45,40r55,186r94,-296r64,0r96,297r60,-227r-52,0r0,-70r212,0xm497,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":735,"k":{"y":-15,"x":-12,"t":-18,"f":-6}},"\u0175":{"d":"752,-388v-48,-2,-75,2,-87,46r-99,342r-124,0r-68,-218r-70,218r-125,0r-126,-388r-52,0r0,-70r253,0r0,70v-35,-4,-55,6,-45,40r55,186r94,-296r64,0r96,297r60,-227r-52,0r0,-70r212,0xm518,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":735},"\u1e85":{"d":"752,-388v-48,-2,-75,2,-87,46r-99,342r-124,0r-68,-218r-70,218r-125,0r-126,-388r-52,0r0,-70r253,0r0,70v-35,-4,-55,6,-45,40r55,186r94,-296r64,0r96,297r60,-227r-52,0r0,-70r212,0xm518,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm364,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":735,"k":{"y":-15,"x":-12,"t":-18,"f":-6}},"\u1ef3":{"d":"364,-38v-114,94,-282,59,-282,-100r0,-250r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v0,80,91,62,128,23r0,-266r-49,0r0,-70r252,0r14,70v-36,-1,-64,-1,-63,38r0,311v7,173,-62,263,-244,263v-50,0,-107,-9,-139,-19r0,-97v42,15,84,23,126,23v99,0,109,-70,103,-169xm397,-521r-22,20v-58,-30,-122,-39,-187,-39v-4,-47,3,-84,49,-84v56,0,108,42,160,103","w":595},"\u00fd":{"d":"364,-38v-114,94,-282,59,-282,-100r0,-250r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v0,80,91,62,128,23r0,-266r-49,0r0,-70r252,0r14,70v-36,-1,-64,-1,-63,38r0,311v7,173,-62,263,-244,263v-50,0,-107,-9,-139,-19r0,-97v42,15,84,23,126,23v99,0,109,-70,103,-169xm400,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":595},"\u0177":{"d":"364,-38v-114,94,-282,59,-282,-100r0,-250r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v0,80,91,62,128,23r0,-266r-49,0r0,-70r252,0r14,70v-36,-1,-64,-1,-63,38r0,311v7,173,-62,263,-244,263v-50,0,-107,-9,-139,-19r0,-97v42,15,84,23,126,23v99,0,109,-70,103,-169xm426,-510r-62,0r-67,-53r-67,53r-62,0r81,-101v21,-24,31,-15,62,-17v10,0,21,1,34,17","w":595},"\u00ff":{"d":"364,-38v-114,94,-282,59,-282,-100r0,-250r-60,0r-14,-70v94,0,154,-7,190,-7v27,0,38,7,38,30r0,290v0,80,91,62,128,23r0,-266r-49,0r0,-70r252,0r14,70v-36,-1,-64,-1,-63,38r0,311v7,173,-62,263,-244,263v-50,0,-107,-9,-139,-19r0,-97v42,15,84,23,126,23v99,0,109,-70,103,-169xm416,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49xm262,-579v0,28,-24,49,-52,49v-28,0,-49,-21,-49,-49v0,-28,21,-49,49,-49v28,0,52,21,52,49","w":595},"\u017a":{"d":"451,0r-411,0v-3,-43,5,-71,24,-97r213,-286r-110,0v-40,-4,-34,40,-42,69r-79,0r0,-144r401,0v2,51,-2,74,-29,110r-203,273r117,0v43,2,32,-39,40,-69r79,0r0,144xm358,-540v-65,0,-129,9,-187,39r-22,-20v52,-61,104,-103,160,-103v45,0,53,37,49,84","w":491},"\u017e":{"d":"451,0r-411,0v-3,-43,5,-71,24,-97r213,-286r-110,0v-40,-4,-34,40,-42,69r-79,0r0,-144r401,0v2,51,-2,74,-29,110r-203,273r117,0v43,2,32,-39,40,-69r79,0r0,144xm379,-628r-81,101v-21,24,-31,15,-62,17v-10,0,-21,-1,-34,-17r-81,-101r62,0r67,53r67,-53r62,0","w":491},"\u017c":{"d":"451,0r-411,0v-3,-43,5,-71,24,-97r213,-286r-110,0v-40,-4,-34,40,-42,69r-79,0r0,-144r401,0v2,51,-2,74,-29,110r-203,273r117,0v43,2,32,-39,40,-69r79,0r0,144xm316,-573v0,35,-29,62,-64,62v-35,0,-61,-27,-61,-62v0,-35,26,-61,61,-61v35,0,64,26,64,61","w":491},"\uf8ff":{"d":"435,-189r-245,0r0,-60r184,0r0,-63r-184,0r0,-182r245,0r0,61r-183,0r0,60r183,0r0,184xm435,-556r-305,0r0,495r68,0r0,61r-129,0r0,-616r366,0r0,60","w":486}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Trademark:
 * FS Clerkenwell Italic is a trademark of Fontsmith Ltd.
 * 
 * Full name:
 * FSClerkenwell-Italic
 * 
 * Description:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Manufacturer:
 * Fontsmith Ltd
 * 
 * Designer:
 * Phil Garnham and Jason Smith
 * 
 * Vendor URL:
 * http://www.fontsmith.com/
 * 
 * License information:
 * http://www.fontsmith.com
 */
Cufon.registerFont({"w":277,"face":{"font-family":"FS Clerkenwell","font-weight":400,"font-style":"italic","font-stretch":"normal","units-per-em":"1000","panose-1":"2 0 6 6 3 0 0 9 0 4","ascent":"730","descent":"-270","x-height":"11","bbox":"-189 -887 1010 260","underline-thickness":"20","underline-position":"-113","slope":"-12","stemh":"65","stemv":"99","unicode-range":"U+0020-U+FB02"},"glyphs":{" ":{"w":194},"\ufb01":{"d":"547,-602v0,37,-39,71,-75,71v-24,0,-42,-15,-42,-40v0,-37,38,-72,74,-72v24,0,43,16,43,41xm475,-465v35,-2,30,30,23,55r-95,341v1,17,38,8,56,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,67,-239,98,-361r-166,0r-95,337v-32,115,-57,180,-97,222v-27,28,-73,56,-119,63r-17,-49v45,-17,69,-43,84,-77v49,-113,105,-353,148,-496r-65,0r16,-59r66,0v25,-112,84,-234,200,-231v32,0,66,9,91,26r-36,51v-90,-48,-126,32,-159,154v71,2,170,-4,224,-7","w":540},"\ufb02":{"d":"385,-691v93,0,157,45,150,137v-12,165,-90,329,-125,485v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v30,-144,74,-272,112,-410v21,-76,44,-163,-47,-171v-69,-6,-105,82,-127,161r98,0r-16,59r-96,0r-96,337v-51,171,-70,246,-215,285r-17,-49v45,-17,69,-43,84,-77v49,-113,105,-353,148,-496r-65,0r16,-59r65,0v15,-51,33,-105,58,-144v43,-67,113,-89,173,-89","w":554},"\u00a0":{"w":194},"A":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"B":{"d":"495,-211v0,112,-104,211,-275,211r-252,0r18,-65r59,0r131,-473v2,-19,-38,-11,-57,-13r18,-65v169,4,387,-33,387,128v0,77,-62,141,-139,150v88,20,110,71,110,127xm423,-478v0,-69,-67,-77,-143,-73r-52,187v107,10,195,-23,195,-114xm389,-214v0,-60,-32,-89,-102,-89r-77,0r-60,222v1,25,51,16,77,16v113,0,162,-77,162,-149","w":559},"C":{"d":"24,-182v0,-183,160,-449,346,-446v44,0,85,21,103,55r18,-43r60,0r-55,199v-26,-1,-64,6,-58,-23v14,-65,-13,-117,-69,-117v-148,0,-240,251,-240,368v0,71,23,127,95,127v63,0,121,-42,171,-100r34,40v-55,77,-139,133,-235,133v-112,0,-170,-67,-170,-193","w":524},"D":{"d":"330,-616v144,-3,247,52,247,199v0,229,-146,425,-390,417r-220,0r18,-65r59,0r131,-471v-1,-20,-35,-14,-57,-15r18,-65r194,0xm166,-65v202,0,300,-180,307,-347v5,-113,-70,-148,-194,-139r-130,466v-3,12,5,20,17,20","w":599},"E":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0","w":546},"F":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v1,24,37,12,59,15r-18,65r-222,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0","w":538,"k":{"y":8,"X":6,"U":11,"Q":8,"J":23,"A":56,"\u00c0":56,"\u00c1":56,"\u00c2":56,"\u00c3":56,"\u00c4":56,"\u0100":56,"\u0102":56,"\u00c5":56,"\u01fa":56,"\u0104":56,"\u00c6":56,"\u01fc":56,"C":14,"\u0106":14,"\u00c7":14,"\u0108":14,"\u010c":14,"\u010a":14,"G":4,"\u011c":4,"\u011e":4,"\u0120":4,"\u0122":4,"O":4,"\u00d2":4,"\u00d3":4,"\u00d4":4,"\u00d5":4,"\u00d6":4,"\u014c":4,"\u014e":4,"\u0150":4,"\u00d8":4,"\u01fe":4,"\u0152":4,"T":14,"\u0164":14,"\u0162":14,"Y":15,"\u1ef2":15,"\u00dd":15,"\u0176":15,"\u0178":15,"a":48,"\u00e0":48,"\u00e1":48,"\u00e2":48,"\u00e3":48,"\u00e4":48,"\u0101":48,"\u0103":48,"\u00e5":48,"\u01fb":48,"\u0105":48,"\u00e6":48,"\u01fd":48,"e":44,"\u00e8":44,"\u00e9":44,"\u00ea":44,"\u011b":44,"\u00eb":44,"\u0113":44,"\u0115":44,"\u0117":44,"\u0119":44,"i":7,"\u0131":7,"\u00ec":7,"\u00ed":7,"\u00ee":7,"\u0129":7,"\u00ef":7,"\u012b":7,"\u012d":7,"\u012f":7,"\u0133":7,"o":40,"\u00f2":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"\u00f6":40,"\u014d":40,"\u014f":40,"\u0151":40,"\u00f8":40,"\u01ff":40,"\u0153":40,"u":16,"\u00f9":16,"\u00fa":16,"\u00fb":16,"\u0169":16,"\u00fc":16,"\u016b":16,"\u016d":16,"\u016f":16,"\u0171":16,"\u0173":16}},"G":{"d":"568,-616r-55,195v-27,-1,-63,9,-59,-24v10,-71,-20,-114,-84,-114v-69,0,-142,58,-191,169v-32,74,-50,147,-50,216v0,69,33,120,103,120v35,0,70,-8,90,-20r39,-137v1,-20,-33,-14,-53,-15r17,-60r207,0r-17,60r-49,0r-51,180v-56,34,-138,57,-211,57v-125,0,-180,-72,-180,-180v0,-127,53,-261,139,-357v49,-55,124,-102,211,-102v56,0,91,21,116,56r19,-44r59,0","w":572},"H":{"d":"688,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r57,-206r-230,0r-51,190v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r131,-471v1,-22,-36,-13,-57,-15r18,-65r222,0r-18,65r-61,0r-58,209r230,0r53,-195v0,-21,-37,-12,-57,-14r18,-65r222,0","w":656,"k":{"y":20,"a":16,"\u00e0":16,"\u00e1":16,"\u00e2":16,"\u00e3":16,"\u00e4":16,"\u0101":16,"\u0103":16,"\u00e5":16,"\u01fb":16,"\u0105":16,"\u00e6":16,"\u01fd":16,"e":14,"\u00e8":14,"\u00e9":14,"\u00ea":14,"\u011b":14,"\u00eb":14,"\u0113":14,"\u0115":14,"\u0117":14,"\u0119":14,"i":8,"\u0131":8,"\u00ec":8,"\u00ed":8,"\u00ee":8,"\u0129":8,"\u00ef":8,"\u012b":8,"\u012d":8,"\u012f":8,"\u0133":8,"o":20,"\u00f2":20,"\u00f3":20,"\u00f4":20,"\u00f5":20,"\u00f6":20,"\u014d":20,"\u014f":20,"\u0151":20,"\u00f8":20,"\u01ff":20,"\u0153":20,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24}},"I":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0","w":326,"k":{"y":20,"a":16,"\u00e0":16,"\u00e1":16,"\u00e2":16,"\u00e3":16,"\u00e4":16,"\u0101":16,"\u0103":16,"\u00e5":16,"\u01fb":16,"\u0105":16,"\u00e6":16,"\u01fd":16,"e":14,"\u00e8":14,"\u00e9":14,"\u00ea":14,"\u011b":14,"\u00eb":14,"\u0113":14,"\u0115":14,"\u0117":14,"\u0119":14,"i":8,"\u0131":8,"\u00ec":8,"\u00ed":8,"\u00ee":8,"\u0129":8,"\u00ef":8,"\u012b":8,"\u012d":8,"\u012f":8,"\u0133":8,"o":20,"\u00f2":20,"\u00f3":20,"\u00f4":20,"\u00f5":20,"\u00f6":20,"\u014d":20,"\u014f":20,"\u0151":20,"\u00f8":20,"\u01ff":20,"\u0153":20,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24}},"J":{"d":"390,-616r-130,466v-32,116,-78,161,-179,161v-49,0,-95,-19,-121,-41r25,-60v23,17,57,33,89,33v47,0,71,-35,88,-98r105,-382v0,-10,-7,-14,-20,-14r-118,0r18,-65r243,0","w":396},"K":{"d":"636,-616r-18,65r-69,0r-213,207r81,217v23,72,47,81,95,47r24,42v-32,30,-70,48,-109,48v-53,0,-75,-30,-102,-104r-66,-181r-76,71v-10,43,-27,82,-33,128v4,18,38,9,58,11r-18,65r-222,0r18,-65r59,0r128,-459v10,-31,-26,-28,-54,-27r18,-65r222,0r-18,65r-61,0r-63,231v91,-90,221,-195,289,-296r130,0","w":595,"k":{"X":-22,"Q":5,"A":-34,"\u00c0":-34,"\u00c1":-34,"\u00c2":-34,"\u00c3":-34,"\u00c4":-34,"\u0100":-34,"\u0102":-34,"\u00c5":-34,"\u01fa":-34,"\u0104":-34,"\u00c6":-34,"\u01fc":-34,"C":5,"\u0106":5,"\u00c7":5,"\u0108":5,"\u010c":5,"\u010a":5,"G":3,"\u011c":3,"\u011e":3,"\u0120":3,"\u0122":3,"O":3,"\u00d2":3,"\u00d3":3,"\u00d4":3,"\u00d5":3,"\u00d6":3,"\u014c":3,"\u014e":3,"\u0150":3,"\u00d8":3,"\u01fe":3,"\u0152":3}},"L":{"d":"406,-216v25,-2,50,-2,43,25r-52,191r-429,0r18,-65r59,0r131,-471v4,-20,-37,-14,-57,-15r18,-65r222,0r-18,65r-61,0r-131,471v0,11,8,15,20,15r165,0v30,-48,57,-110,72,-151","w":499,"k":{"X":-10,"V":42,"U":8,"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":46,"\u0164":46,"\u0162":46,"Y":47,"\u1ef2":47,"\u00dd":47,"\u0176":47,"\u0178":47,"W":34,"\u1e80":34,"\u1e82":34,"\u0174":34,"\u1e84":34}},"M":{"d":"829,-616r-17,65r-54,0r-130,469v-1,22,31,17,53,17r-18,65r-205,0r18,-65r55,0r98,-353r-285,418r-65,0r-66,-408r-88,328v0,22,33,13,54,15r-18,65r-194,0r18,-65r55,0r131,-472v1,-20,-37,-13,-57,-14r18,-65r143,0r78,489r333,-489r143,0","w":797,"k":{"y":20,"a":16,"\u00e0":16,"\u00e1":16,"\u00e2":16,"\u00e3":16,"\u00e4":16,"\u0101":16,"\u0103":16,"\u00e5":16,"\u01fb":16,"\u0105":16,"\u00e6":16,"\u01fd":16,"e":14,"\u00e8":14,"\u00e9":14,"\u00ea":14,"\u011b":14,"\u00eb":14,"\u0113":14,"\u0115":14,"\u0117":14,"\u0119":14,"i":8,"\u0131":8,"\u00ec":8,"\u00ed":8,"\u00ee":8,"\u0129":8,"\u00ef":8,"\u012b":8,"\u012d":8,"\u012f":8,"\u0133":8,"o":20,"\u00f2":20,"\u00f3":20,"\u00f4":20,"\u00f5":20,"\u00f6":20,"\u014d":20,"\u014f":20,"\u0151":20,"\u00f8":20,"\u01ff":20,"\u0153":20,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24}},"N":{"d":"696,-616r-18,65r-56,0r-153,551r-50,0r-194,-436r-98,355v-2,22,32,15,53,16r-18,65r-194,0r18,-65r55,0r129,-461v10,-31,-28,-25,-54,-25r18,-65r113,0r193,428r96,-348v1,-21,-35,-14,-55,-15r18,-65r197,0","w":663,"k":{"a":26,"\u00e0":26,"\u00e1":26,"\u00e2":26,"\u00e3":26,"\u00e4":26,"\u0101":26,"\u0103":26,"\u00e5":26,"\u01fb":26,"\u0105":26,"\u00e6":26,"\u01fd":26}},"O":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216","w":558},"P":{"d":"556,-468v0,53,-28,117,-69,159v-69,69,-169,77,-295,73r-41,155v-2,21,36,15,57,16r-18,65r-222,0r18,-65r59,0r131,-472v-1,-20,-36,-12,-57,-14r18,-65r196,0v108,0,223,10,223,148xm270,-304v112,3,176,-64,182,-161v6,-93,-82,-86,-172,-86r-69,247r59,0","w":539,"k":{"X":6,"J":12,"A":30,"\u00c0":30,"\u00c1":30,"\u00c2":30,"\u00c3":30,"\u00c4":30,"\u0100":30,"\u0102":30,"\u00c5":30,"\u01fa":30,"\u0104":30,"\u00c6":30,"\u01fc":30,"Y":11,"\u1ef2":11,"\u00dd":11,"\u0176":11,"\u0178":11,"a":3,"\u00e0":3,"\u00e1":3,"\u00e2":3,"\u00e3":3,"\u00e4":3,"\u0101":3,"\u0103":3,"\u00e5":3,"\u01fb":3,"\u0105":3,"\u00e6":3,"\u01fd":3,"e":7,"\u00e8":7,"\u00e9":7,"\u00ea":7,"\u011b":7,"\u00eb":7,"\u0113":7,"\u0115":7,"\u0117":7,"\u0119":7,"o":3,"\u00f2":3,"\u00f3":3,"\u00f4":3,"\u00f5":3,"\u00f6":3,"\u014d":3,"\u014f":3,"\u0151":3,"\u00f8":3,"\u01ff":3,"\u0153":3}},"Q":{"d":"41,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,208,-151,497,-400,444v-17,8,-35,32,-35,57v0,32,23,54,63,54v79,0,154,-44,221,-94r25,37v-70,66,-167,122,-275,122v-71,0,-126,-37,-126,-100v0,-42,24,-84,69,-108v-37,-35,-52,-88,-52,-145xm446,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216","w":575},"R":{"d":"563,-482v0,109,-84,196,-185,221r39,133v17,77,47,79,95,48r24,42v-76,68,-175,73,-211,-56r-43,-154r-87,0r-45,169v1,20,37,12,58,14r-18,65r-222,0r18,-65r59,0r131,-471v-2,-24,-35,-12,-57,-15r18,-65r222,0v148,0,204,50,204,134xm417,-368v57,-69,70,-192,-71,-183r-66,0r-66,235v87,3,163,-5,203,-52","w":605},"S":{"d":"96,-439v0,-109,105,-189,218,-189v49,0,114,22,137,62r20,-49r47,0r-57,207v-24,-2,-59,9,-55,-20v10,-80,-20,-135,-95,-135v-61,0,-110,43,-110,105v0,120,222,106,222,281v0,114,-118,188,-228,188v-47,0,-120,-22,-144,-66r-24,55r-54,0r63,-211v23,2,58,-8,55,18v-11,83,30,136,104,136v62,0,123,-39,123,-106v0,-114,-222,-105,-222,-276","w":494},"T":{"d":"590,-616r-53,191v-22,-1,-49,6,-49,-19v0,-51,38,-118,-48,-107r-58,0r-130,470v0,23,36,14,58,16r-18,65r-222,0r18,-65r59,0r136,-486v-60,3,-113,-12,-135,38r-31,69v-9,23,-31,19,-59,19r54,-191r478,0","w":533,"k":{"J":11,"a":24,"\u00e0":24,"\u00e1":24,"\u00e2":24,"\u00e3":24,"\u00e4":24,"\u0101":24,"\u0103":24,"\u00e5":24,"\u01fb":24,"\u0105":24,"\u00e6":24,"\u01fd":24,"e":21,"\u00e8":21,"\u00e9":21,"\u00ea":21,"\u011b":21,"\u00eb":21,"\u0113":21,"\u0115":21,"\u0117":21,"\u0119":21,"o":16,"\u00f2":16,"\u00f3":16,"\u00f4":16,"\u00f5":16,"\u00f6":16,"\u014d":16,"\u014f":16,"\u0151":16,"\u00f8":16,"\u01ff":16,"\u0153":16,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"Y":-11,"\u1ef2":-11,"\u00dd":-11,"\u0176":-11,"\u0178":-11}},"U":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0","w":607},"V":{"d":"639,-616r-18,65v-50,1,-66,-7,-92,39r-296,512r-93,0r-10,-518v3,-35,-24,-34,-56,-33r18,-65r219,0r-18,65r-61,0r-7,438r250,-438r-64,0r18,-65r210,0","w":574,"k":{".":160,"Z":12,"Q":26,"J":6,"A":76,"\u00c0":76,"\u00c1":76,"\u00c2":76,"\u00c3":76,"\u00c4":76,"\u0100":76,"\u0102":76,"\u00c5":76,"\u01fa":76,"\u0104":76,"\u00c6":76,"\u01fc":76,"C":13,"\u0106":13,"\u00c7":13,"\u0108":13,"\u010c":13,"\u010a":13,"G":3,"\u011c":3,"\u011e":3,"\u0120":3,"\u0122":3,"O":16,"\u00d2":16,"\u00d3":16,"\u00d4":16,"\u00d5":16,"\u00d6":16,"\u014c":16,"\u014e":16,"\u0150":16,"\u00d8":16,"\u01fe":16,"\u0152":16,"Y":-24,"\u1ef2":-24,"\u00dd":-24,"\u0176":-24,"\u0178":-24,"a":70,"\u00e0":70,"\u00e1":70,"\u00e2":70,"\u00e3":70,"\u00e4":70,"\u0101":70,"\u0103":70,"\u00e5":70,"\u01fb":70,"\u0105":70,"\u00e6":70,"\u01fd":70,"e":74,"\u00e8":74,"\u00e9":74,"\u00ea":74,"\u011b":74,"\u00eb":74,"\u0113":74,"\u0115":74,"\u0117":74,"\u0119":74,"i":14,"\u0131":14,"\u00ec":14,"\u00ed":14,"\u00ee":14,"\u0129":14,"\u00ef":14,"\u012b":14,"\u012d":14,"\u012f":14,"\u0133":14,"o":70,"\u00f2":70,"\u00f3":70,"\u00f4":70,"\u00f5":70,"\u00f6":70,"\u014d":70,"\u014f":70,"\u0151":70,"\u00f8":70,"\u01ff":70,"\u0153":70,"u":50,"\u00f9":50,"\u00fa":50,"\u00fb":50,"\u0169":50,"\u00fc":50,"\u016b":50,"\u016d":50,"\u016f":50,"\u0171":50,"\u0173":50}},"W":{"d":"944,-616r-18,65v-47,-2,-66,4,-85,40r-272,511r-91,0r-17,-414r-232,414r-87,0r-7,-520v1,-38,-27,-30,-59,-31r18,-65r225,0r-18,65r-58,0r-15,427r270,-492r53,0r14,492r220,-427r-63,0r18,-65r204,0","w":875,"k":{"Z":9,"a":54,"\u00e0":54,"\u00e1":54,"\u00e2":54,"\u00e3":54,"\u00e4":54,"\u0101":54,"\u0103":54,"\u00e5":54,"\u01fb":54,"\u0105":54,"\u00e6":54,"\u01fd":54,"e":54,"\u00e8":54,"\u00e9":54,"\u00ea":54,"\u011b":54,"\u00eb":54,"\u0113":54,"\u0115":54,"\u0117":54,"\u0119":54,"o":51,"\u00f2":51,"\u00f3":51,"\u00f4":51,"\u00f5":51,"\u00f6":51,"\u014d":51,"\u014f":51,"\u0151":51,"\u00f8":51,"\u01ff":51,"\u0153":51,"u":23,"\u00f9":23,"\u00fa":23,"\u00fb":23,"\u0169":23,"\u00fc":23,"\u016b":23,"\u016d":23,"\u016f":23,"\u0171":23,"\u0173":23,"A":62,"\u00c0":62,"\u00c1":62,"\u00c2":62,"\u00c3":62,"\u00c4":62,"\u0100":62,"\u0102":62,"\u00c5":62,"\u01fa":62,"\u0104":62,"\u00c6":62,"\u01fc":62,"C":8,"\u0106":8,"\u00c7":8,"\u0108":8,"\u010c":8,"\u010a":8,"G":3,"\u011c":3,"\u011e":3,"\u0120":3,"\u0122":3,"O":4,"\u00d2":4,"\u00d3":4,"\u00d4":4,"\u00d5":4,"\u00d6":4,"\u014c":4,"\u014e":4,"\u0150":4,"\u00d8":4,"\u01fe":4,"\u0152":4,"Y":-26,"\u1ef2":-26,"\u00dd":-26,"\u0176":-26,"\u0178":-26}},"X":{"d":"646,-616r-18,65v-55,-1,-72,0,-107,39r-182,200r85,216v10,28,37,33,74,31r-18,65r-222,0r18,-65r61,0r-66,-175r-158,175r59,0r-18,65r-226,0r18,-65v52,2,76,-4,107,-38r191,-209r-84,-207v-6,-27,-39,-34,-81,-32r18,-65r215,0r-18,65r-53,0r69,174r159,-174r-59,0r18,-65r218,0","w":568},"Y":{"d":"625,-616r-18,65v-52,-2,-69,2,-99,39r-214,269r-43,154v-10,33,30,22,57,24r-18,65r-222,0r18,-65r59,0r52,-187r-69,-267v-7,-37,-34,-32,-72,-32r18,-65r222,0r-18,65r-55,0r57,223r174,-223r-54,0r18,-65r207,0","w":522,"k":{"U":-21,"V":-40,"X":-30,"a":41,"\u00e0":41,"\u00e1":41,"\u00e2":41,"\u00e3":41,"\u00e4":41,"\u0101":41,"\u0103":41,"\u00e5":41,"\u01fb":41,"\u0105":41,"\u00e6":41,"\u01fd":41,"e":36,"\u00e8":36,"\u00e9":36,"\u00ea":36,"\u011b":36,"\u00eb":36,"\u0113":36,"\u0115":36,"\u0117":36,"\u0119":36,"o":27,"\u00f2":27,"\u00f3":27,"\u00f4":27,"\u00f5":27,"\u00f6":27,"\u014d":27,"\u014f":27,"\u0151":27,"\u00f8":27,"\u01ff":27,"\u0153":27,"u":16,"\u00f9":16,"\u00fa":16,"\u00fb":16,"\u0169":16,"\u00fc":16,"\u016b":16,"\u016d":16,"\u016f":16,"\u0171":16,"\u0173":16,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"T":-29,"\u0164":-29,"\u0162":-29,"W":-30,"\u1e80":-30,"\u1e82":-30,"\u0174":-30,"\u1e84":-30,"Y":-61,"\u1ef2":-61,"\u00dd":-61,"\u0176":-61,"\u0178":-61}},"Z":{"d":"582,-616v-13,56,-14,56,-81,132r-367,412r193,0v23,0,30,-5,38,-24r31,-70r59,0r-45,166r-425,0v14,-62,14,-58,87,-140r361,-404r-196,0v-23,0,-31,5,-39,23r-33,73r-59,0r46,-168r430,0","w":544},"a":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273","w":509},"b":{"d":"357,-471v129,-1,140,156,102,261v-42,117,-141,220,-285,221v-61,0,-112,-20,-146,-40r168,-594r-65,0r17,-59v52,0,92,-7,123,-7v35,0,30,30,23,55r-62,221v32,-33,75,-58,125,-58xm130,-57v156,55,248,-132,250,-262v1,-45,-15,-83,-54,-83v-95,0,-131,114,-154,196","w":513},"c":{"d":"30,-140v0,-149,118,-331,275,-331v34,0,69,10,88,39r12,-26r53,0r-42,147v-30,1,-51,4,-51,-36v0,-45,-29,-63,-64,-63v-112,0,-172,160,-172,265v0,47,19,92,72,92v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151","w":434},"d":{"d":"348,0v-53,2,-68,-29,-57,-63v-32,41,-81,74,-139,74v-129,1,-140,-156,-102,-261v47,-132,167,-248,345,-215r45,-158r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-158,563v0,18,37,10,56,12r-16,59r-71,0xm129,-141v-1,45,15,83,54,83v105,0,135,-134,161,-226r33,-119v-157,-55,-245,132,-248,262","w":516},"e":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0","w":469},"f":{"d":"433,-678r-17,58v-101,-35,-137,56,-165,162r95,0r-16,59r-96,0r-95,337v-32,115,-57,180,-97,222v-27,28,-73,56,-119,63r-17,-49v45,-17,69,-44,84,-77v51,-111,107,-352,150,-496r-65,0r16,-59r66,0r9,-31v59,-184,123,-221,267,-189","w":313,"k":{"c":14,"a":12,"\u00e0":12,"\u00e1":12,"\u00e2":12,"\u00e3":12,"\u00e4":12,"\u0101":12,"\u0103":12,"\u00e5":12,"\u01fb":12,"\u0105":12,"\u00e6":12,"\u01fd":12,"e":10,"\u00e8":10,"\u00e9":10,"\u00ea":10,"\u011b":10,"\u00eb":10,"\u0113":10,"\u0115":10,"\u0117":10,"\u0119":10,"i":4,"\u0131":4,"\u00ec":4,"\u00ed":4,"\u00ee":4,"\u0129":4,"\u00ef":4,"\u012b":4,"\u012d":4,"\u012f":4,"\u0133":4,"o":14,"\u00f2":14,"\u00f3":14,"\u00f4":14,"\u00f5":14,"\u00f6":14,"\u014d":14,"\u014f":14,"\u0151":14,"\u00f8":14,"\u01ff":14,"\u0153":14,"r":10,"\u0155":10,"\u0159":10,"\u0157":10}},"g":{"d":"481,-431v-55,173,-92,392,-177,529v-25,40,-89,125,-249,125r-14,-51v86,-6,137,-42,175,-94v31,-43,59,-113,65,-140v-32,36,-76,63,-129,63v-125,2,-141,-149,-102,-251v44,-116,144,-220,288,-221v60,0,116,23,143,40xm129,-151v-1,45,15,83,54,83v104,0,135,-126,162,-218r34,-117v-152,-51,-245,122,-250,252","w":504},"h":{"d":"375,-471v106,0,109,113,83,206r-55,196v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-95,0r177,-623r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-67,239v34,-43,92,-76,144,-76","w":538},"i":{"d":"284,-602v0,37,-39,71,-75,71v-24,0,-42,-15,-42,-40v0,-37,38,-72,74,-72v24,0,43,16,43,41xm211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7"},"j":{"d":"284,-602v0,37,-39,71,-75,71v-24,0,-42,-15,-42,-40v0,-37,38,-72,74,-72v24,0,43,16,43,41xm211,-465v35,0,30,30,23,55r-106,374v-31,110,-71,210,-208,241r-18,-47v79,-35,106,-97,137,-208r98,-349r-65,0r17,-59v52,0,91,-7,122,-7","w":268},"k":{"d":"522,-458r-17,60r-59,0r-129,99r59,217v5,34,47,22,82,24r-17,58v-74,0,-136,9,-154,-58r-48,-181r-68,52r-52,187r-95,0r177,-623r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-99,350v68,-54,159,-113,213,-174r110,0","w":518},"l":{"d":"273,-689v35,0,30,30,23,55r-159,565v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-12,4,-28,7,-39r155,-546r-65,0r17,-59v52,0,91,-7,122,-7","w":279},"m":{"d":"475,-382v34,-45,94,-89,160,-89v106,0,109,113,83,206r-55,196v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-36,-23,-46,-48,-46v-132,5,-166,266,-210,397r-95,0r76,-271v12,-44,16,-63,16,-80v0,-75,-87,-42,-121,-11v-63,58,-102,252,-137,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,89,-76,141,-76v58,0,97,37,101,89","w":798},"n":{"d":"377,-471v106,0,109,113,83,206r-54,196v1,17,38,8,56,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,92,-76,144,-76","w":540},"o":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85","w":478},"p":{"d":"221,-395v30,-39,81,-76,141,-76v129,0,140,156,102,261v-48,132,-167,248,-347,215r-45,160v-10,35,-24,58,-71,58r-98,0r17,-61v26,0,57,3,63,-18r155,-543r-75,0r17,-59v52,0,91,-7,122,-7v42,0,26,44,19,70xm136,-57v157,55,246,-132,249,-262v1,-45,-15,-83,-54,-83v-106,0,-136,134,-162,226","w":518},"q":{"d":"30,-133v0,-172,133,-340,309,-338v61,0,108,20,142,40r-164,583v0,19,38,10,57,12r-15,59v-67,1,-161,12,-138,-70r56,-200v-32,33,-75,58,-125,58v-84,0,-122,-65,-122,-144xm129,-141v-3,45,15,83,54,83v98,0,128,-107,153,-196r42,-149v-13,-6,-28,-11,-50,-11v-127,0,-192,156,-199,273","w":503},"r":{"d":"352,-469v58,0,32,56,21,86v-124,-22,-161,63,-193,177r-58,206r-95,0r113,-399r-65,0r17,-59v52,0,88,-6,119,-6v42,-1,28,50,20,78v24,-42,72,-83,121,-83","w":349,"k":{"a":12,"\u00e0":12,"\u00e1":12,"\u00e2":12,"\u00e3":12,"\u00e4":12,"\u0101":12,"\u0103":12,"\u00e5":12,"\u01fb":12,"\u0105":12,"\u00e6":12,"\u01fd":12,"e":6,"\u00e8":6,"\u00e9":6,"\u00ea":6,"\u011b":6,"\u00eb":6,"\u0113":6,"\u0115":6,"\u0117":6,"\u0119":6,"o":6,"\u00f2":6,"\u00f3":6,"\u00f4":6,"\u00f5":6,"\u00f6":6,"\u014d":6,"\u014f":6,"\u0151":6,"\u00f8":6,"\u01ff":6,"\u0153":6}},"s":{"d":"326,-322v4,-56,-26,-90,-75,-91v-42,0,-77,24,-77,70v0,72,176,78,176,199v0,87,-75,155,-175,155v-38,0,-92,-10,-113,-45r-11,34r-53,0r42,-157v31,-2,63,-4,50,35v-5,50,41,72,84,72v42,0,83,-25,83,-74v0,-72,-175,-74,-175,-198v0,-89,75,-149,161,-149v39,0,86,9,109,45r11,-32r52,0r-39,153v-21,-1,-52,6,-50,-17","w":415},"t":{"d":"330,-458r-17,59r-93,0r-67,239v-11,38,-15,61,-15,71v0,48,76,28,106,19r-18,64v-16,6,-62,18,-91,18v-57,0,-95,-25,-95,-84v0,-106,60,-226,85,-327r-59,0r17,-59r58,0r31,-106r95,0r-30,106r93,0","w":321,"k":{"y":8,"c":6,"a":2,"\u00e0":2,"\u00e1":2,"\u00e2":2,"\u00e3":2,"\u00e4":2,"\u0101":2,"\u0103":2,"\u00e5":2,"\u01fb":2,"\u0105":2,"\u00e6":2,"\u01fd":2,"e":15,"\u00e8":15,"\u00e9":15,"\u00ea":15,"\u011b":15,"\u00eb":15,"\u0113":15,"\u0115":15,"\u0117":15,"\u0119":15,"o":9,"\u00f2":9,"\u00f3":9,"\u00f4":9,"\u00f5":9,"\u00f6":9,"\u014d":9,"\u014f":9,"\u0151":9,"\u00f8":9,"\u01ff":9,"\u0153":9,"u":8,"\u00f9":8,"\u00fa":8,"\u00fb":8,"\u0169":8,"\u00fc":8,"\u016b":8,"\u016d":8,"\u016f":8,"\u0171":8,"\u0173":8}},"u":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7","w":531},"v":{"d":"477,-458r-283,458r-83,0r-11,-399r-62,0r17,-59v45,0,65,-7,97,-7v36,0,38,14,39,72r3,282r190,-347r93,0","w":450,"k":{"y":4,"a":14,"\u00e0":14,"\u00e1":14,"\u00e2":14,"\u00e3":14,"\u00e4":14,"\u0101":14,"\u0103":14,"\u00e5":14,"\u01fb":14,"\u0105":14,"\u00e6":14,"\u01fd":14,"e":9,"\u00e8":9,"\u00e9":9,"\u00ea":9,"\u011b":9,"\u00eb":9,"\u0113":9,"\u0115":9,"\u0117":9,"\u0119":9,"o":11,"\u00f2":11,"\u00f3":11,"\u00f4":11,"\u00f5":11,"\u00f6":11,"\u014d":11,"\u014f":11,"\u0151":11,"\u00f8":11,"\u01ff":11,"\u0153":11,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"w":{"d":"717,-458r-273,458r-83,0r-8,-274r-159,274r-83,0r-11,-399r-62,0r17,-59v45,0,65,-7,97,-7v36,0,38,14,39,72r3,282r180,-347r65,0r5,347r180,-347r93,0","w":690,"k":{"y":2,"a":18,"\u00e0":18,"\u00e1":18,"\u00e2":18,"\u00e3":18,"\u00e4":18,"\u0101":18,"\u0103":18,"\u00e5":18,"\u01fb":18,"\u0105":18,"\u00e6":18,"\u01fd":18,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"o":13,"\u00f2":13,"\u00f3":13,"\u00f4":13,"\u00f5":13,"\u00f6":13,"\u014d":13,"\u014f":13,"\u0151":13,"\u00f8":13,"\u01ff":13,"\u0153":13,"u":5,"\u00f9":5,"\u00fa":5,"\u00fb":5,"\u0169":5,"\u00fc":5,"\u016b":5,"\u016d":5,"\u016f":5,"\u0171":5,"\u0173":5}},"x":{"d":"495,-458r-205,223r73,153v7,30,41,23,76,24r-15,58v-73,-1,-121,9,-148,-53r-49,-111r-126,164r-115,0r211,-226r-74,-152v-9,-29,-41,-21,-75,-22r15,-58v76,2,122,-11,151,56r46,106r125,-162r110,0","w":485,"k":{"y":6,"a":12,"\u00e0":12,"\u00e1":12,"\u00e2":12,"\u00e3":12,"\u00e4":12,"\u0101":12,"\u0103":12,"\u00e5":12,"\u01fb":12,"\u0105":12,"\u00e6":12,"\u01fd":12,"e":7,"\u00e8":7,"\u00e9":7,"\u00ea":7,"\u011b":7,"\u00eb":7,"\u0113":7,"\u0115":7,"\u0117":7,"\u0119":7,"i":6,"\u0131":6,"\u00ec":6,"\u00ed":6,"\u00ee":6,"\u0129":6,"\u00ef":6,"\u012b":6,"\u012d":6,"\u012f":6,"\u0133":6,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"y":{"d":"470,-465v35,0,30,30,23,55v-51,163,-89,381,-167,508v-24,40,-90,125,-250,125r-17,-51v150,-7,205,-124,241,-237v-29,38,-86,76,-144,76v-64,0,-100,-41,-100,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v5,75,92,44,122,11v55,-39,94,-205,121,-301r-64,0r17,-59v52,0,91,-7,122,-7","w":519},"z":{"d":"468,-458v-6,50,-20,64,-60,105r-288,291r141,0v41,-1,40,-49,58,-74r56,0r-39,136r-340,0v-2,-51,38,-83,61,-107r284,-289r-134,0v-34,-3,-44,51,-59,74r-56,0r39,-136r337,0","w":459},"&":{"d":"426,-628v101,-1,177,45,177,139v-1,43,-11,79,-20,113r69,0v33,4,5,45,3,65r-91,0v-16,62,-43,118,-47,190v-3,60,41,64,98,61r-17,60v-87,4,-163,-2,-170,-84v-39,52,-110,95,-196,95v-102,0,-166,-64,-166,-155v0,-103,75,-189,190,-206v-35,-18,-58,-54,-58,-94v0,-109,95,-184,228,-184xm485,-379v29,-91,39,-185,-67,-185v-65,0,-119,51,-119,118v0,58,44,74,98,70r-19,65v-122,-9,-199,60,-198,151v0,56,35,90,90,90v149,1,175,-184,215,-309","w":700},"@":{"d":"727,-421v0,125,-80,283,-218,283v-44,0,-77,-21,-77,-62v-22,37,-65,65,-116,65v-56,0,-96,-36,-96,-104v0,-168,208,-305,348,-196v-23,75,-71,138,-71,222v0,16,10,26,27,26v65,0,125,-125,125,-234v0,-82,-54,-146,-171,-146v-176,0,-355,164,-355,362v0,101,66,161,177,161v71,0,141,-22,199,-52r13,24v-50,42,-149,83,-239,83v-139,0,-229,-87,-229,-209v0,-228,218,-430,444,-430v154,0,239,94,239,207xm485,-417v-104,-39,-182,79,-181,165v0,35,12,61,41,61v83,0,108,-151,140,-226","w":737},"!":{"d":"282,-590v0,29,-20,80,-38,125v-35,88,-74,186,-101,273r-47,0v23,-98,39,-179,56,-269v26,-139,45,-166,92,-166v25,0,38,12,38,37xm139,-60v0,33,-34,71,-76,71v-26,0,-43,-15,-43,-40v0,-40,40,-72,74,-72v29,0,45,18,45,41","w":274},"\u00a1":{"d":"254,-587v0,40,-40,72,-74,72v-29,0,-45,-18,-45,-41v0,-33,34,-71,76,-71v26,0,43,15,43,40xm178,-424v-23,98,-39,179,-56,269v-26,139,-45,166,-92,166v-25,0,-38,-12,-38,-37v0,-29,20,-80,38,-125v35,-88,74,-186,101,-273r47,0","w":274},"?":{"d":"113,-614v104,-29,255,-20,255,95v0,64,-39,117,-155,223v-30,27,-58,66,-77,104r-46,0v25,-92,185,-252,172,-316v0,-73,-103,-62,-166,-43xm139,-60v0,33,-34,71,-76,71v-26,0,-43,-15,-43,-40v0,-40,40,-72,74,-72v29,0,45,18,45,41","w":356},"\u00bf":{"d":"336,-588v0,40,-40,72,-74,72v-29,0,-45,-18,-45,-41v0,-33,34,-71,76,-71v26,0,43,15,43,40xm243,-3v-104,29,-255,20,-255,-95v0,-64,39,-117,155,-223v30,-27,58,-66,77,-104r46,0v-25,92,-185,252,-172,316v0,73,103,62,166,43","w":356},"*":{"d":"246,-493v30,-23,93,-99,135,-99v18,0,27,17,27,34v0,62,-102,54,-158,74v35,17,123,10,123,51v0,21,-33,56,-54,56v-41,0,-54,-70,-77,-97v-1,65,25,156,-51,156v-16,0,-30,-4,-30,-22v0,-37,54,-102,69,-134v-36,28,-90,97,-133,97v-18,0,-26,-19,-26,-36v0,-62,105,-52,158,-71v-34,-17,-117,-13,-123,-54v3,-25,42,-70,71,-49v19,14,45,69,60,91v2,-64,-25,-159,50,-156v53,2,25,49,2,87v-15,26,-32,51,-43,72","w":371},".":{"d":"134,-60v0,33,-34,71,-76,71v-26,0,-43,-15,-43,-40v0,-40,40,-72,74,-72v29,0,45,18,45,41","w":200},",":{"d":"133,-50v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44","w":195},":":{"d":"205,-303v0,33,-34,71,-76,71v-26,0,-43,-15,-43,-40v0,-40,40,-72,74,-72v29,0,45,18,45,41xm134,-60v0,33,-34,71,-76,71v-26,0,-43,-15,-43,-40v0,-40,40,-72,74,-72v29,0,45,18,45,41","w":196},";":{"d":"206,-303v0,33,-34,71,-76,71v-26,0,-43,-15,-43,-40v0,-40,40,-72,74,-72v29,0,45,18,45,41xm133,-50v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44","w":195},"\u2026":{"d":"542,-60v0,37,-40,71,-76,71v-24,0,-43,-16,-43,-41v0,-37,39,-71,75,-71v24,0,44,16,44,41xm337,-60v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41xm134,-60v0,37,-40,71,-76,71v-24,0,-43,-16,-43,-41v0,-37,39,-71,75,-71v24,0,44,16,44,41","w":608},"\u00b7":{"d":"138,-268v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":204},"\u2022":{"d":"288,-368v0,75,-78,146,-152,146v-49,0,-86,-32,-86,-82v0,-75,78,-146,152,-146v49,0,86,32,86,82","w":338},"\/":{"d":"438,-682r-449,743r-75,0r450,-743r74,0","w":298},"(":{"d":"407,-647v-125,71,-200,279,-237,409v-24,84,-45,174,-45,261v0,50,7,113,48,148r-32,35v-88,-44,-111,-161,-111,-250v0,-66,11,-132,29,-195v47,-164,169,-378,336,-443","w":323},"\u00a6":{"d":"139,-334r-79,0r0,-346r79,0r0,346xm139,200r-79,0r0,-346r79,0r0,346","w":199},")":{"d":"293,-433v0,66,-11,131,-29,194v-47,163,-169,380,-336,445r-12,-35v125,-71,200,-279,237,-409v24,-84,45,-173,45,-261v0,-50,-7,-113,-48,-148r32,-35v88,44,111,160,111,249","w":323},"[":{"d":"447,-682r-21,76r-107,0v-15,0,-22,11,-26,23r-196,687v0,8,4,13,13,13r108,0r-21,76r-227,0r250,-875r227,0","w":337},"\\":{"d":"291,61r-67,0r-123,-743r67,0","w":383},"]":{"d":"367,-682r-250,875r-227,0r21,-76r108,0v13,0,21,-9,24,-20r197,-691v0,-7,-4,-12,-14,-12r-107,0r21,-76r227,0","w":337},"{":{"d":"447,-682r-16,55v-106,-2,-92,105,-115,189v-28,103,-67,185,-180,209v54,13,80,43,80,99v0,103,-71,199,-71,259v0,35,29,41,58,41r-16,55v-72,0,-136,-15,-136,-100v0,-93,61,-187,61,-266v0,-52,-34,-71,-82,-75r8,-25v141,-10,144,-133,175,-239v40,-138,89,-202,234,-202","w":347},"|":{"d":"137,260r-77,0r0,-1000r77,0r0,1000","w":197},"}":{"d":"313,-241r-8,25v-141,10,-144,133,-175,239v-40,138,-89,202,-234,202r16,-55v106,2,92,-105,115,-189v28,-103,67,-185,180,-209v-54,-13,-80,-43,-80,-99v0,-103,71,-199,71,-259v0,-35,-29,-41,-58,-41r16,-55v72,0,136,15,136,100v0,93,-61,187,-61,266v0,52,34,71,82,75","w":343},"-":{"d":"235,-286r-22,74r-194,0r22,-74r194,0","w":254},"\u00ad":{"d":"235,-286r-22,74r-194,0r22,-74r194,0","w":254},"\u2013":{"d":"510,-284r-20,70r-500,0r20,-70r500,0","w":500},"\u2014":{"d":"1010,-284r-20,70r-1000,0r20,-70r1000,0","w":1000},"_":{"d":"393,26r-14,52r-366,0r14,-52r366,0","w":406},"\u2020":{"d":"241,-413v9,-81,-9,-212,79,-215v21,0,35,9,35,32v0,41,-61,141,-81,183v46,-9,122,-33,165,-33v22,0,47,6,47,32v0,107,-150,49,-222,29v-33,119,-58,241,-83,362r-34,160v-10,32,-26,57,-63,57v-65,-1,-22,-85,-10,-119r36,-99v43,-119,89,-239,125,-360v-46,9,-123,34,-166,34v-22,0,-47,-6,-47,-32v0,-105,147,-52,219,-31","w":508},"\u2021":{"d":"538,-413v0,105,-151,50,-222,28v-6,57,-7,114,-23,169v-17,60,-48,115,-74,171v54,-11,109,-34,165,-34v22,0,49,6,49,33v0,105,-151,50,-222,28v-2,23,-1,47,-1,70v0,49,-5,144,-73,144v-23,0,-35,-11,-35,-34v0,-48,58,-133,81,-179v-54,11,-108,34,-163,34v-22,0,-49,-6,-49,-33v0,-104,149,-52,221,-30v6,-57,8,-115,24,-170v17,-59,46,-113,72,-168v-54,11,-108,34,-163,34v-22,0,-49,-6,-49,-33v0,-104,149,-52,221,-30v5,-58,-14,-215,76,-215v22,0,34,12,34,34v0,50,-60,135,-83,182v54,-11,109,-34,165,-34v22,0,49,6,49,33","w":508},"\u00a7":{"d":"518,-616r-49,156v-22,-2,-51,7,-51,-17v0,-57,-19,-92,-77,-92v-53,0,-85,38,-85,83v0,88,178,91,178,238v0,90,-71,148,-146,159v34,26,63,61,63,120v0,84,-62,162,-180,162v-45,0,-88,-18,-111,-51r-17,38r-52,0r49,-156v22,2,51,-7,51,17v0,57,19,92,77,92v53,0,85,-38,85,-83v0,-88,-178,-91,-178,-238v0,-90,71,-148,146,-159v-34,-26,-63,-61,-63,-120v0,-84,62,-162,180,-162v45,0,88,18,111,51r17,-38r52,0xm174,-208v0,33,20,71,61,71v57,0,100,-42,100,-91v0,-33,-20,-71,-61,-71v-57,0,-100,42,-100,91","w":508},"\u00b6":{"d":"-6,-408v0,-129,110,-197,270,-197r217,0r-18,64r-67,0r-220,766r-73,0r220,-766r-64,0r-220,766r-73,0r147,-513v-70,0,-119,-49,-119,-120","w":446},"\u00ae":{"d":"698,-392v0,196,-200,402,-416,402v-139,0,-246,-94,-246,-236v0,-204,203,-402,417,-402v139,0,245,91,245,236xm650,-386v0,-121,-85,-201,-205,-201v-171,0,-361,166,-361,355v0,121,85,201,205,201v185,0,361,-184,361,-355xm488,-389v0,52,-41,94,-89,107v15,32,18,125,64,84r12,22v-37,34,-85,36,-103,-27r-21,-73r-39,0r-21,75v-2,7,-1,11,8,11r18,0r-8,33r-108,0r9,-33r29,0r62,-222v4,-12,-16,-8,-28,-9r8,-33r108,0v71,0,99,24,99,65xm321,-310v66,6,114,-20,114,-78v0,-31,-44,-36,-83,-33","w":734},"\u00a9":{"d":"698,-392v0,196,-200,402,-416,402v-139,0,-246,-94,-246,-236v0,-204,203,-402,417,-402v139,0,245,91,245,236xm650,-386v0,-121,-85,-201,-205,-201v-171,0,-361,166,-361,355v0,121,85,201,205,201v185,0,361,-184,361,-355xm239,-243v0,-88,78,-216,167,-215v20,0,41,10,50,26r7,-20r31,0r-27,97v-20,2,-35,0,-28,-24v2,-29,-12,-43,-33,-43v-70,0,-115,120,-115,176v0,32,12,60,45,60v30,0,57,-21,82,-49r17,21v-27,37,-67,65,-113,65v-58,0,-83,-38,-83,-94","w":734},"\u2122":{"d":"688,-616r-8,29r-24,0r-59,211v-1,9,14,8,24,8r-7,29r-93,0r8,-29r25,0r44,-159r-128,188r-30,0r-29,-183r-40,147v0,10,14,6,24,7r-8,29r-86,0r7,-29r25,0r59,-212v0,-10,-16,-7,-26,-7r8,-29r65,0r35,220r149,-220r65,0xm339,-616r-23,86v-10,0,-22,3,-22,-9v0,-23,16,-53,-22,-48r-26,0r-59,212v0,11,16,6,26,7r-8,29r-99,0r7,-29r27,0r61,-219v-27,1,-54,-7,-60,17v-10,16,-9,46,-41,40r24,-86r215,0","w":638},"\u201c":{"d":"338,-612r-77,119v20,2,37,16,37,37v0,33,-32,67,-69,67v-26,0,-45,-14,-45,-44v0,-80,90,-136,128,-195xm190,-612r-77,119v20,2,37,16,37,37v0,33,-32,67,-69,67v-26,0,-45,-14,-45,-44v0,-80,90,-136,128,-195","w":289},"\u201d":{"d":"344,-584v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44xm196,-584v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44","w":295},"\u2018":{"d":"190,-612r-77,119v20,2,37,16,37,37v0,33,-32,67,-69,67v-26,0,-45,-14,-45,-44v0,-80,90,-136,128,-195","w":141},"\u2019":{"d":"196,-584v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44","w":147},"\u00ab":{"d":"392,-369r-124,134r66,119r-28,48r-95,-145v-21,-22,0,-46,18,-62r163,-145r0,51xm221,-369r-124,134r66,119r-28,48r-95,-145v-21,-22,0,-46,18,-62r163,-145r0,51","w":422},"\u00bb":{"d":"382,-275v21,22,0,46,-18,62r-163,145r0,-51r124,-134r-66,-119r28,-48xm211,-275v21,22,0,46,-18,62r-163,145r0,-51r124,-134r-66,-119r28,-48","w":422},"\u2039":{"d":"221,-369r-124,134r66,119r-28,48r-95,-145v-21,-22,0,-46,18,-62r163,-145r0,51","w":251},"\u203a":{"d":"211,-275v21,22,0,46,-18,62r-163,145r0,-51r124,-134r-66,-119r28,-48","w":251},"\u201a":{"d":"133,-50v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44","w":195},"\u201e":{"d":"281,-50v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44xm133,-50v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44","w":343},"\u00aa":{"d":"58,-392v2,-119,89,-234,218,-236v41,0,72,14,94,27r-69,253v0,13,26,7,39,8r-12,41v-46,3,-110,0,-90,-44v-23,29,-53,52,-94,52v-59,0,-86,-46,-86,-101xm128,-397v-2,32,10,58,37,58v102,0,102,-153,134,-242v-106,-34,-168,95,-171,184","w":334},"\u00ba":{"d":"56,-401v0,-119,71,-227,182,-227v69,0,104,43,104,110v0,119,-70,227,-182,227v-69,0,-104,-43,-104,-110xm165,-334v73,2,108,-126,110,-191v0,-38,-13,-60,-42,-60v-72,-1,-108,126,-110,191v0,38,13,60,42,60","w":307},"0":{"d":"484,-466v0,195,-127,477,-311,477v-90,0,-149,-60,-149,-162v0,-195,127,-477,311,-477v90,0,149,60,149,162xm123,-154v0,48,17,91,62,91v107,0,200,-274,200,-400v0,-48,-17,-91,-62,-91v-107,0,-200,274,-200,400","w":508},"1":{"d":"412,-616r-149,542v1,26,42,11,66,15r-16,59r-239,0r16,-59r69,0r122,-441r-95,0r19,-63v54,-3,108,-21,157,-53r50,0","w":508},"2":{"d":"486,-482v0,88,-59,142,-175,227v-133,97,-164,129,-188,179r184,0r47,-87v14,-29,36,-25,72,-25r-70,188r-356,0v27,-127,79,-177,214,-278v107,-80,162,-132,162,-198v-1,-113,-139,-85,-216,-58r22,-72v38,-14,83,-22,124,-22v121,0,180,57,180,146","w":508},"3":{"d":"463,-489v0,75,-47,145,-138,161v57,20,92,64,92,123v0,119,-102,216,-234,216v-65,0,-126,-19,-167,-47r28,-65v42,26,85,41,135,41v77,0,129,-62,129,-141v0,-54,-36,-84,-103,-92r19,-63v82,-4,135,-55,135,-121v0,-99,-124,-92,-207,-62r20,-70v117,-44,291,-13,291,120","w":508},"4":{"d":"494,-248r-22,81r-112,0r-24,91v-1,24,35,15,58,17r-16,59r-223,0r16,-59r63,0r31,-108r-251,0r11,-58r377,-391r82,0r-102,368r112,0xm352,-483r-227,235r162,0","w":508},"5":{"d":"490,-616r-21,75r-233,0r-41,148v23,-16,61,-24,88,-24v99,0,148,81,148,160v0,114,-79,268,-254,268v-59,0,-115,-20,-152,-47r20,-65v36,23,85,40,126,40v88,0,154,-84,154,-196v0,-108,-124,-110,-178,-51r-39,-19r80,-289r302,0","w":508},"6":{"d":"36,-172v1,-228,153,-452,355,-456v34,0,76,6,96,15r-18,59v-146,-41,-243,59,-297,196v88,-107,279,-69,279,89v0,129,-92,280,-247,280v-107,0,-168,-68,-168,-183xm347,-264v0,-54,-30,-85,-77,-85v-65,0,-133,57,-133,184v0,48,18,105,74,105v82,0,136,-107,136,-204","w":508},"7":{"d":"499,-616r-15,57r-351,559r-101,0r361,-542r-214,0r-45,84v-9,25,-40,17,-70,18r64,-176r371,0","w":508},"8":{"d":"493,-508v0,80,-69,139,-148,177v49,36,91,77,91,139v0,115,-106,203,-252,203v-94,0,-173,-52,-173,-148v0,-76,62,-157,170,-194v-119,-107,-39,-297,156,-297v110,0,156,64,156,120xm400,-497v0,-46,-29,-73,-73,-73v-60,0,-105,45,-105,100v0,38,33,72,72,102v55,-27,106,-71,106,-129xm329,-175v0,-42,-30,-72,-97,-119v-71,29,-117,96,-117,160v0,59,43,83,81,83v86,0,133,-67,133,-124","w":508},"9":{"d":"480,-445v0,159,-70,300,-165,382v-82,71,-187,95,-297,54r18,-61v70,33,168,11,211,-34v34,-36,76,-94,97,-155v-88,107,-279,69,-279,-89v0,-129,92,-280,247,-280v107,0,168,68,168,183xm246,-268v65,0,134,-59,133,-186v0,-65,-29,-101,-74,-101v-92,0,-136,127,-136,202v0,54,30,85,77,85","w":508},"$":{"d":"230,-271v-73,-43,-125,-89,-125,-168v0,-106,86,-190,228,-189r20,-70r54,0r-22,78v35,11,62,31,75,53r20,-48r47,0r-57,207v-26,-2,-58,9,-55,-22v7,-59,-4,-111,-49,-126r-60,209v68,38,128,83,126,166v-2,110,-108,191,-229,193r-20,71r-54,0r22,-76v-41,-10,-76,-33,-91,-61r-24,55r-54,0r63,-211v25,2,59,-8,54,22v-11,66,17,118,71,129xm314,-561v-62,7,-104,53,-104,106v0,29,16,53,51,79xm224,-59v101,-17,143,-129,52,-183","w":508},"\u00a2":{"d":"478,-458r-42,147v-30,1,-51,4,-51,-36v0,-33,-15,-51,-37,-59r-100,350v40,-9,74,-36,101,-66r35,35v-37,51,-93,85,-155,95r-23,81r-54,0r23,-79v-81,-8,-125,-65,-125,-150v0,-147,113,-316,263,-331r25,-87r54,0r-27,92v19,6,37,16,48,34r12,-26r53,0xm294,-406v-91,31,-145,161,-145,261v0,38,13,74,45,87","w":508},"\u20ac":{"d":"90,-390v52,-115,168,-240,293,-238v44,0,85,21,103,55r18,-43r60,0r-55,199v-26,-1,-64,6,-58,-23v14,-65,-13,-117,-69,-117v-82,0,-147,78,-189,167r136,0r-18,64r-143,0v-6,19,-12,39,-16,57r143,0r-19,64r-133,0v-7,78,17,143,94,143v63,0,121,-42,171,-100r34,40v-55,77,-139,133,-235,133v-119,1,-179,-80,-169,-216r-94,0r19,-64r84,0v4,-19,9,-38,16,-57r-84,0r18,-64r93,0","w":508},"\u0192":{"d":"591,-677r-29,61v-105,-22,-127,8,-196,142r-62,132r114,0r-29,66r-115,0r-129,279v-74,162,-160,257,-334,205r25,-63v105,36,148,-29,199,-139r131,-282r-104,0r30,-66r105,0v47,-101,117,-259,178,-304v63,-46,138,-56,216,-31","w":508},"\u00a3":{"d":"145,-362v-17,-228,183,-319,365,-236r-15,78v-26,-12,-69,-27,-110,-27v-111,1,-138,80,-134,185r106,0r0,62r-106,0v-6,90,-57,173,-132,223r221,0r49,-94v11,-27,40,-15,71,-18r-68,189r-394,0r14,-50v59,-57,128,-149,134,-250r-81,0r17,-62r63,0","w":508},"\u00a5":{"d":"611,-616r-17,65v-52,-2,-69,2,-99,39r-161,202r98,0r-19,68r-132,0r-15,51r133,0r-19,68r-133,0v-5,20,-23,58,9,58r38,0r-17,65r-222,0r17,-65r60,0r16,-58r-134,0r19,-68r134,0r14,-51r-134,0r19,-68r103,0r-54,-209v-7,-37,-34,-32,-72,-32r17,-65r222,0r-17,65r-55,0r57,223r174,-223r-54,0r17,-65r207,0","w":508},"#":{"d":"526,-628r-93,203r89,0r-16,57r-99,0r-54,117r121,0r-16,57r-131,0r-93,204r-67,0r94,-204r-119,0r-93,204r-67,0r94,-204r-90,0r16,-57r100,0r54,-117r-122,0r16,-57r132,0r93,-203r66,0r-93,203r119,0r93,-203r66,0xm341,-368r-119,0r-54,117r119,0","w":508},"%":{"d":"693,-262v0,115,-76,273,-187,273v-55,0,-94,-32,-94,-107v0,-111,78,-273,187,-273v55,0,94,33,94,107xm640,-616r-437,616r-60,0r438,-616r59,0xm371,-524v0,115,-76,273,-187,273v-55,0,-94,-32,-94,-107v0,-111,78,-273,187,-273v55,0,94,33,94,107xm630,-273v0,-36,-15,-52,-38,-52v-50,0,-117,122,-117,240v0,34,15,52,38,52v50,0,117,-122,117,-240xm308,-535v0,-36,-15,-52,-38,-52v-50,0,-117,122,-117,240v0,34,15,52,38,52v50,0,117,-122,117,-240","w":783},"\u2030":{"d":"982,-262v0,115,-76,273,-187,273v-55,0,-94,-32,-94,-107v0,-111,78,-273,187,-273v55,0,94,33,94,107xm693,-262v0,115,-76,273,-187,273v-55,0,-94,-32,-94,-107v0,-111,78,-273,187,-273v55,0,94,33,94,107xm640,-616r-437,616r-60,0r438,-616r59,0xm371,-524v0,115,-76,273,-187,273v-55,0,-94,-32,-94,-107v0,-111,78,-273,187,-273v55,0,94,33,94,107xm919,-273v0,-36,-15,-52,-38,-52v-50,0,-117,122,-117,240v0,34,15,52,38,52v50,0,117,-122,117,-240xm630,-273v0,-36,-15,-52,-38,-52v-50,0,-117,122,-117,240v0,34,15,52,38,52v50,0,117,-122,117,-240xm308,-535v0,-36,-15,-52,-38,-52v-50,0,-117,122,-117,240v0,34,15,52,38,52v50,0,117,-122,117,-240","w":1072},"+":{"d":"416,-330r-20,68r-149,0r-42,149r-68,0r42,-149r-149,0r20,-68r149,0r42,-149r68,0r-42,149r149,0","w":446},"\u2212":{"d":"416,-331r-20,68r-366,0r20,-68r366,0","w":446},"\u00d7":{"d":"406,-402r-135,105r75,105r-62,48r-75,-105r-135,105r-34,-48r135,-105r-75,-105r62,-48r75,105r135,-105","w":446},"<":{"d":"423,-483r-20,72r-294,115r229,111r-21,74r-293,-157r18,-60","w":446},"\u00f7":{"d":"329,-464v0,36,-38,68,-73,68v-23,0,-41,-15,-41,-39v0,-36,37,-69,72,-69v23,0,42,16,42,40xm416,-337r-19,68r-366,0r19,-68r366,0xm245,-168v0,36,-39,68,-74,68v-23,0,-40,-15,-40,-39v0,-36,36,-69,71,-69v24,0,43,15,43,40","w":446},"=":{"d":"441,-418r-20,68r-366,0r20,-68r366,0xm391,-242r-20,68r-366,0r20,-68r366,0","w":446},"\u00ac":{"d":"410,-383r-60,209r-69,0r50,-176r-297,0r20,-68r334,0v22,0,28,13,22,35","w":445},">":{"d":"423,-326r-18,60r-381,155r20,-72r294,-115r-229,-111r21,-74","w":446},"\u2260":{"d":"441,-418r-20,68r-135,0r-67,108r172,0r-20,68r-195,0r-62,98r-71,0r62,-98r-100,0r20,-68r123,0r68,-108r-161,0r20,-68r184,0r62,-98r70,0r-62,98r112,0","w":446},"\u2248":{"d":"432,-407v-34,54,-85,93,-140,93v-80,0,-100,-62,-168,-62v-25,0,-59,30,-75,57r-34,-28v34,-54,85,-98,140,-98v80,0,100,62,168,62v25,0,60,-28,75,-53xm432,-237v-34,54,-85,93,-140,93v-80,0,-100,-62,-168,-62v-25,0,-59,30,-75,57r-34,-28v34,-54,85,-98,140,-98v80,0,100,62,168,62v25,0,60,-28,75,-53","w":446},"\u00b1":{"d":"456,-337r-19,68r-149,0r-43,149r-68,0r43,-149r-149,0r19,-68r149,0r43,-149r68,0r-43,149r149,0xm376,-58r-19,68r-366,0r19,-68r366,0","w":446},"\u2264":{"d":"464,-489r-20,72r-294,115r229,111r-21,74r-293,-157r18,-60xm368,-58r-20,68r-366,0r20,-68r366,0","w":446},"\u2265":{"d":"443,-332r-18,60r-381,155r20,-72r294,-115r-229,-111r21,-74xm393,-58r-20,68r-366,0r20,-68r366,0","w":450},"^":{"d":"397,-342r-74,0r-52,-210r-172,210r-76,0r239,-286r60,0","w":420},"~":{"d":"450,-283v-38,54,-94,102,-155,102v-80,0,-120,-66,-184,-66v-25,0,-47,13,-78,47r-37,-48v42,-51,97,-89,146,-89v89,0,115,62,191,62v28,0,57,-23,79,-50","w":446},"\u25ca":{"d":"313,-616r275,308r-275,308r-275,-308xm313,-137r148,-171r-148,-172r-148,172","w":641},"\u00b0":{"d":"376,-519v0,91,-66,197,-185,197v-79,0,-123,-46,-123,-109v0,-91,66,-197,185,-197v79,0,123,46,123,109xm309,-516v0,-34,-19,-63,-59,-63v-70,0,-115,82,-115,145v0,34,19,63,59,63v70,0,115,-82,115,-145","w":347},"'":{"d":"83,-362v19,-89,-3,-261,98,-265v23,0,38,11,38,35v0,38,-74,186,-93,230r-43,0","w":177},"\"":{"d":"253,-362v19,-89,-3,-261,98,-265v23,0,38,12,38,36v0,38,-74,185,-93,229r-43,0xm83,-362v19,-89,-3,-261,98,-265v23,0,38,12,38,36v0,38,-74,185,-93,229r-43,0","w":347},"\u221a":{"d":"501,-639r-51,0r-229,638r-42,0r-119,-365r-53,0r0,-43r119,0r93,286r201,-559r81,0r0,43","w":508},"\u00a4":{"d":"525,-174r-41,42r-67,-67v-69,49,-157,56,-234,0r-67,67r-40,-42r68,-64v-50,-66,-52,-167,0,-232r-68,-65r40,-42r67,67v82,-54,157,-52,233,0v23,-22,46,-44,68,-67r41,42r-68,65v53,74,51,161,0,232xm438,-355v0,-81,-68,-136,-137,-136v-79,0,-139,63,-139,136v0,75,63,138,138,138v76,0,138,-63,138,-138","w":612},"\u221e":{"d":"699,-258v0,112,-54,201,-162,201v-75,0,-123,-40,-166,-114v-33,52,-79,101,-155,101v-92,0,-156,-79,-156,-183v0,-105,58,-177,159,-177v76,0,120,43,151,94v44,-76,96,-115,169,-115v104,0,160,60,160,193xm636,-257v0,-66,-34,-103,-94,-103v-38,0,-74,17,-127,111v35,66,66,101,114,101v60,0,107,-39,107,-109xm327,-255v-35,-64,-65,-91,-117,-91v-60,0,-92,42,-92,94v0,56,33,95,91,95v53,0,88,-44,118,-98","w":759},"\u00b5":{"d":"458,-465v57,0,43,47,33,84r-85,312v3,20,41,6,60,10r-17,59v-66,0,-173,16,-142,-65v-45,52,-114,94,-189,68r-46,162v-10,35,-24,58,-71,58r-98,0r17,-61v26,0,57,3,63,-18r155,-543r-65,0r17,-59v45,0,74,-7,105,-7v57,0,43,47,33,84v-23,84,-58,184,-70,272v6,75,93,44,123,11v54,-38,93,-206,120,-301r-65,0r17,-59v45,0,74,-7,105,-7","w":534},"\u2202":{"d":"488,-418v0,159,-112,429,-310,429v-96,0,-158,-61,-158,-160v0,-168,131,-282,249,-282v45,0,88,19,114,52v30,-116,-44,-183,-168,-189r11,-60v146,0,262,74,262,210xm368,-309v-99,-123,-248,2,-248,160v0,53,28,87,69,87v90,0,144,-117,179,-247","w":508},"\u2211":{"d":"577,-438r-58,0r-28,-83v-6,-19,-16,-23,-39,-23r-264,0r234,328r-245,337r263,0v23,0,31,-5,38,-24r30,-82r61,0r-41,178r-478,0v11,-52,17,-72,67,-141r194,-268r-195,-269v-37,-50,-47,-74,-56,-131r492,0","w":623},"\u220f":{"d":"657,-551r-81,0r0,655v0,32,34,23,63,24r0,65r-217,0r0,-65r60,0r0,-655v0,-16,-8,-24,-25,-24r-231,0r0,655v0,32,34,23,63,24r0,65r-217,0r0,-65r60,0r0,-655v2,-36,-50,-21,-82,-24r0,-65r607,0r0,65","w":703},"\u03c0":{"d":"580,-393r-77,0r0,304v0,32,34,23,63,24r0,65r-210,0r0,-65r60,0r0,-304v0,-16,-8,-24,-25,-24r-171,0r0,304v0,32,34,23,63,24r0,65r-211,0r0,-65r60,0r0,-304v2,-35,-47,-21,-78,-24r0,-65r526,0r0,65","w":634},"\u222b":{"d":"514,-677r-12,61v-97,-21,-136,3,-160,142r-79,477v-20,170,-112,257,-275,205r7,-63v98,36,145,-26,164,-139r76,-458v27,-153,54,-239,191,-239v30,0,59,5,88,14","w":502},"\u03a9":{"d":"311,-548v-104,0,-171,81,-171,226v0,135,68,226,137,267r0,55r-194,0r0,-65r83,0v-77,-45,-136,-138,-136,-267v0,-174,121,-296,281,-296v160,0,281,122,281,296v0,129,-59,222,-136,267r83,0r0,65r-194,0r0,-55v69,-41,137,-132,137,-267v0,-145,-67,-226,-171,-226","w":622},"\u2126":{"d":"311,-548v-104,0,-171,81,-171,226v0,135,68,226,137,267r0,55r-194,0r0,-65r83,0v-77,-45,-136,-138,-136,-267v0,-174,121,-296,281,-296v160,0,281,122,281,296v0,129,-59,222,-136,267r83,0r0,65r-194,0r0,-55v69,-41,137,-132,137,-267v0,-145,-67,-226,-171,-226","w":622},"\u2206":{"d":"591,0r-553,0r258,-628r36,0xm458,-46r-173,-425r-173,425r346,0","w":607},"\u2113":{"d":"273,-689v35,0,30,30,23,55r-159,565v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-12,4,-28,7,-39r155,-546r-65,0r17,-59v52,0,91,-7,122,-7","w":279},"\u212e":{"d":"761,-301r-576,0v-3,0,-5,1,-5,5r0,174v0,8,3,15,9,21v53,57,132,93,218,93v92,0,174,-41,228,-105r52,0v-65,75,-167,124,-281,124v-196,0,-356,-142,-356,-319v0,-178,160,-320,356,-320v197,0,358,142,355,327xm631,-323r0,-176v0,-7,-4,-15,-10,-21v-108,-117,-327,-116,-432,3v-5,6,-9,14,-9,23r0,171v0,3,2,5,5,5r441,0v3,0,5,-2,5,-5","w":811},"\u2116":{"d":"642,-313v0,-125,75,-240,193,-240v72,0,110,45,110,116v0,125,-75,240,-193,240v-72,0,-110,-45,-110,-116xm763,-263v65,2,97,-112,98,-171v0,-34,-11,-53,-37,-53v-65,-2,-98,112,-98,171v0,35,11,53,37,53xm696,-616r-18,65r-56,0r-153,551r-50,0r-194,-436r-98,355v-2,22,32,15,53,16r-18,65r-194,0r18,-65r55,0r129,-461v10,-31,-28,-25,-54,-25r18,-65r113,0r193,428r96,-348v1,-21,-35,-14,-55,-15r18,-65r197,0","w":975},"\u2044":{"d":"331,-616r-437,616r-64,0r438,-616r63,0","w":161},"\u00b9":{"d":"261,-616r-92,336v1,16,27,7,41,9r-10,37r-149,0r10,-37r43,0r76,-273r-59,0r12,-39v33,-2,67,-13,97,-33r31,0","w":330},"\u00b2":{"d":"319,-537v0,54,-37,87,-109,140v-83,60,-101,80,-116,111r114,0v20,-26,20,-78,73,-69r-43,116r-221,0v15,-79,50,-109,133,-172v66,-49,100,-82,100,-123v0,-71,-85,-52,-133,-36r13,-44v24,-9,51,-14,77,-14v75,0,112,36,112,91","w":330},"\u00b3":{"d":"307,-542v0,47,-30,90,-86,100v35,13,57,39,57,76v0,74,-63,134,-145,134v-40,0,-78,-12,-103,-29r17,-40v26,16,53,25,84,25v48,0,80,-38,80,-87v0,-34,-22,-52,-64,-57r12,-39v51,-2,83,-34,83,-75v0,-61,-77,-57,-128,-39r12,-43v72,-27,181,-9,181,74","w":330},"\u00bd":{"d":"656,-299v0,54,-36,88,-108,141v-83,60,-102,80,-117,111r114,0v20,-27,20,-79,74,-70r-43,117r-221,0v15,-79,50,-109,133,-172v66,-49,100,-82,100,-123v-1,-71,-86,-52,-134,-36r14,-45v24,-9,51,-13,77,-13v75,0,111,35,111,90xm599,-616r-437,616r-60,0r438,-616r59,0xm275,-616r-92,336v1,16,27,7,41,9r-10,37r-149,0r10,-37r43,0r76,-273r-59,0r12,-39v33,-2,67,-13,97,-33r31,0","w":720},"\u00bc":{"d":"630,-154r-13,50r-70,0r-15,57v0,14,22,9,36,10r-10,37r-138,0r10,-37r39,0r19,-67r-155,0r6,-35r234,-243r51,0r-63,228r69,0xm605,-616r-437,616r-60,0r438,-616r59,0xm281,-616r-92,336v1,16,27,7,41,9r-10,37r-149,0r10,-37r43,0r76,-273r-59,0r12,-39v33,-2,67,-13,97,-33r31,0xm542,-299r-141,145r101,0","w":700},"\u00be":{"d":"653,-154r-13,50r-70,0r-15,57v0,14,22,9,36,10r-10,37r-138,0r10,-37r39,0r19,-67r-155,0r6,-35r234,-243r51,0r-63,228r69,0xm628,-616r-437,616r-60,0r438,-616r59,0xm324,-542v0,47,-30,90,-86,100v35,13,57,39,57,76v0,74,-63,134,-145,134v-40,0,-78,-12,-103,-29r17,-40v26,16,53,25,84,25v48,0,80,-38,80,-87v0,-34,-22,-52,-64,-57r12,-39v51,-2,83,-34,83,-75v0,-61,-77,-57,-128,-39r12,-43v72,-27,181,-9,181,74xm565,-299r-141,145r101,0","w":700},"`":{"d":"185,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105"},"\u00b4":{"d":"247,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25"},"\u00a8":{"d":"266,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm112,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34"},"\u02c6":{"d":"255,-498r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11"},"\u02dc":{"d":"273,-652v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0"},"\u00af":{"d":"230,-652r-14,52r-168,0r14,-52r168,0"},"\u02d8":{"d":"241,-636v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0"},"\u02d9":{"d":"198,-611v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41"},"\u02da":{"d":"225,-593v0,51,-42,102,-103,102v-41,0,-69,-22,-69,-61v0,-51,42,-102,103,-102v41,0,69,22,69,61xm185,-588v0,-25,-15,-36,-33,-36v-36,0,-59,37,-59,67v0,25,15,36,33,36v36,0,59,-37,59,-67"},"\u00b8":{"d":"117,6r45,5r-16,26v35,-15,75,6,75,45v0,40,-31,79,-88,79v-28,0,-54,-8,-69,-18r13,-36v21,20,85,20,83,-18v-2,-25,-33,-26,-48,-12r-29,-13"},"\u02dd":{"d":"283,-559v-54,-3,-102,29,-136,58r-13,-14v28,-29,95,-103,137,-103v33,-1,20,38,12,59xm133,-559v-54,-3,-102,29,-136,58r-13,-14v28,-28,95,-103,137,-103v33,-1,20,38,12,59"},"\u02db":{"d":"123,0r49,13v-27,14,-48,38,-48,65v-7,35,56,39,81,24r-13,47v-59,27,-140,-2,-140,-62v0,-34,25,-68,71,-87"},"\u02c7":{"d":"255,-616r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0"},"\u0326":{"d":"196,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20"},"\u00c0":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0xm479,-673r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u00c1":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0xm463,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u00c2":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0xm498,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u00c3":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0xm528,-765v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u00c4":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0xm523,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm369,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u0100":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0xm496,-736r-14,52r-168,0r14,-52r168,0","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u0102":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27xm341,-254r-6,-245r-150,245r156,0xm507,-759v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":581,"k":{"\u0102":-26,"c":8,"X":-30,"V":66,"U":33,"Q":14,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26}},"\u00c5":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r339,-539v-55,-51,2,-149,81,-149v97,0,80,128,11,153r35,508v-3,34,34,26,65,27xm440,-687v0,-25,-15,-36,-33,-36v-36,0,-59,37,-59,67v0,25,15,36,33,36v36,0,59,-37,59,-67xm341,-254r-6,-245r-150,245r156,0","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u01fa":{"d":"522,-65r-18,65r-220,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r339,-539v-55,-51,2,-149,81,-149v97,0,80,128,11,153r35,508v-3,34,34,26,65,27xm440,-687v0,-25,-15,-36,-33,-36v-36,0,-59,37,-59,67v0,25,15,36,33,36v36,0,59,-37,59,-67xm341,-254r-6,-245r-150,245r156,0xm505,-826v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u0104":{"d":"485,102r-13,47v-59,27,-140,-2,-140,-62v0,-34,25,-68,71,-87r-119,0r18,-65r43,0r-3,-126r-197,0v-18,35,-49,70,-60,109v-1,21,27,17,47,17r-18,65r-192,0r18,-65r51,0r347,-551r83,0r36,524v-3,34,34,26,65,27v-7,21,-10,46,-19,65v-43,0,-99,34,-99,78v-7,35,56,39,81,24xm341,-254r-6,-245r-150,245r156,0","w":581,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u00c6":{"d":"854,-616r-54,202v-22,-1,-49,7,-49,-20v0,-53,32,-117,-47,-117r-131,0r-58,208r105,0v18,-28,25,-78,78,-66r-55,196v-21,-1,-41,5,-41,-20r-1,-48r-104,0r-53,191v-4,16,3,25,19,25r172,0v26,-41,57,-107,73,-151v24,0,52,-5,43,25r-54,191r-437,0r17,-65r60,0r35,-126r-200,0r-75,89v-8,10,-13,19,-13,26v2,19,41,8,60,11r-18,65r-214,0r18,-65r51,0r476,-551r397,0xm469,-536r-242,282r162,0","w":840,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u01fc":{"d":"854,-616r-54,202v-22,-1,-49,7,-49,-20v0,-53,32,-117,-47,-117r-131,0r-58,208r105,0v18,-28,25,-78,78,-66r-55,196v-21,-1,-41,5,-41,-20r-1,-48r-104,0r-53,191v-4,16,3,25,19,25r172,0v26,-41,57,-107,73,-151v24,0,52,-5,43,25r-54,191r-437,0r17,-65r60,0r35,-126r-200,0r-75,89v-8,10,-13,19,-13,26v2,19,41,8,60,11r-18,65r-214,0r18,-65r51,0r476,-551r397,0xm469,-536r-242,282r162,0xm748,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":840,"k":{"c":8,"Q":14,"U":33,"V":66,"X":-30,"e":4,"\u00e8":4,"\u00e9":4,"\u00ea":4,"\u011b":4,"\u00eb":4,"\u0113":4,"\u0115":4,"\u0117":4,"\u0119":4,"o":10,"\u00f2":10,"\u00f3":10,"\u00f4":10,"\u00f5":10,"\u00f6":10,"\u014d":10,"\u014f":10,"\u0151":10,"\u00f8":10,"\u01ff":10,"\u0153":10,"u":12,"\u00f9":12,"\u00fa":12,"\u00fb":12,"\u0169":12,"\u00fc":12,"\u016b":12,"\u016d":12,"\u016f":12,"\u0171":12,"\u0173":12,"A":-26,"\u00c0":-26,"\u00c1":-26,"\u00c2":-26,"\u00c3":-26,"\u00c4":-26,"\u0100":-26,"\u0102":-26,"\u00c5":-26,"\u01fa":-26,"\u0104":-26,"\u00c6":-26,"\u01fc":-26,"C":16,"\u0106":16,"\u00c7":16,"\u0108":16,"\u010c":16,"\u010a":16,"G":16,"\u011c":16,"\u011e":16,"\u0120":16,"\u0122":16,"O":10,"\u00d2":10,"\u00d3":10,"\u00d4":10,"\u00d5":10,"\u00d6":10,"\u014c":10,"\u014e":10,"\u0150":10,"\u00d8":10,"\u01fe":10,"\u0152":10,"T":40,"\u0164":40,"\u0162":40,"W":66,"\u1e80":66,"\u1e82":66,"\u0174":66,"\u1e84":66,"Y":46,"\u1ef2":46,"\u00dd":46,"\u0176":46,"\u0178":46,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12}},"\u0106":{"d":"24,-182v0,-183,160,-449,346,-446v44,0,85,21,103,55r18,-43r60,0r-55,199v-26,-1,-64,6,-58,-23v14,-65,-13,-117,-69,-117v-148,0,-240,251,-240,368v0,71,23,127,95,127v63,0,121,-42,171,-100r34,40v-55,77,-139,133,-235,133v-112,0,-170,-67,-170,-193xm473,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":524},"\u00c7":{"d":"129,-189v0,71,23,127,95,127v63,0,121,-42,171,-100r34,40v-56,78,-139,134,-238,133r-16,26v35,-15,75,6,75,45v0,40,-31,79,-88,79v-28,0,-54,-8,-69,-18r13,-36v21,20,85,20,83,-18v-2,-25,-33,-26,-48,-12r-29,-13r34,-58v-82,-19,-120,-79,-122,-188v-1,-183,160,-449,346,-446v44,0,85,21,103,55r18,-43r60,0r-55,199v-26,-1,-64,6,-58,-23v14,-65,-13,-117,-69,-117v-148,0,-240,251,-240,368","w":524},"\u0108":{"d":"24,-182v0,-183,160,-449,346,-446v44,0,85,21,103,55r18,-43r60,0r-55,199v-26,-1,-64,6,-58,-23v14,-65,-13,-117,-69,-117v-148,0,-240,251,-240,368v0,71,23,127,95,127v63,0,121,-42,171,-100r34,40v-55,77,-139,133,-235,133v-112,0,-170,-67,-170,-193xm499,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":524},"\u010c":{"d":"24,-182v0,-183,160,-449,346,-446v44,0,85,21,103,55r18,-43r60,0r-55,199v-26,-1,-64,6,-58,-23v14,-65,-13,-117,-69,-117v-148,0,-240,251,-240,368v0,71,23,127,95,127v63,0,121,-42,171,-100r34,40v-55,77,-139,133,-235,133v-112,0,-170,-67,-170,-193xm544,-780r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":524},"\u010a":{"d":"24,-182v0,-183,160,-449,346,-446v44,0,85,21,103,55r18,-43r60,0r-55,199v-26,-1,-64,6,-58,-23v14,-65,-13,-117,-69,-117v-148,0,-240,251,-240,368v0,71,23,127,95,127v63,0,121,-42,171,-100r34,40v-55,77,-139,133,-235,133v-112,0,-170,-67,-170,-193xm474,-731v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":524},"\u010e":{"d":"330,-616v144,-3,247,52,247,199v0,229,-146,425,-390,417r-220,0r18,-65r59,0r131,-471v-1,-20,-35,-14,-57,-15r18,-65r194,0xm166,-65v202,0,300,-180,307,-347v5,-113,-70,-148,-194,-139r-130,466v-3,12,5,20,17,20xm542,-779r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":599},"\u0110":{"d":"329,-616v144,-3,247,52,247,199v0,229,-146,425,-390,417r-219,0r17,-65r59,0r60,-216r-96,0r19,-67r96,0r52,-188v-1,-20,-35,-14,-57,-15r17,-65r195,0xm165,-65v202,0,300,-180,307,-347v5,-113,-70,-148,-194,-139r-57,203r100,0r-19,67r-99,0r-55,196v-3,12,5,20,17,20","w":598},"\u00d0":{"d":"329,-616v144,-3,247,52,247,199v0,229,-146,425,-390,417r-219,0r17,-65r59,0r60,-216r-96,0r19,-67r96,0r52,-188v-1,-20,-35,-14,-57,-15r17,-65r195,0xm165,-65v202,0,300,-180,307,-347v5,-113,-70,-148,-194,-139r-57,203r100,0r-19,67r-99,0r-55,196v-3,12,5,20,17,20","w":598},"\u00c8":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm453,-673r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":546},"\u00c9":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm449,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":546},"\u00ca":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm479,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":546},"\u011a":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm513,-779r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":546},"\u00cb":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm500,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm346,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":546},"\u0112":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm466,-736r-14,52r-168,0r14,-52r168,0","w":546},"\u0114":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm491,-759v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":546},"\u0116":{"d":"560,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-437,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0xm434,-730v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":546},"\u0118":{"d":"299,0r-331,0r18,-65r59,0r130,-471v2,-21,-35,-14,-56,-15r18,-65r423,0r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191v-49,-2,-100,33,-105,78v-4,36,56,39,81,24r-13,47v-59,27,-140,-2,-140,-62v0,-34,25,-68,71,-87","w":546},"\u011c":{"d":"568,-616r-55,195v-27,-1,-63,9,-59,-24v10,-71,-20,-114,-84,-114v-69,0,-142,58,-191,169v-32,74,-50,147,-50,216v0,69,33,120,103,120v35,0,70,-8,90,-20r39,-137v1,-20,-33,-14,-53,-15r17,-60r207,0r-17,60r-49,0r-51,180v-56,34,-138,57,-211,57v-125,0,-180,-72,-180,-180v0,-127,53,-261,139,-357v49,-55,124,-102,211,-102v56,0,91,21,116,56r19,-44r59,0xm506,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":572},"\u011e":{"d":"568,-616r-55,195v-27,-1,-63,9,-59,-24v10,-71,-20,-114,-84,-114v-69,0,-142,58,-191,169v-32,74,-50,147,-50,216v0,69,33,120,103,120v35,0,70,-8,90,-20r39,-137v1,-20,-33,-14,-53,-15r17,-60r207,0r-17,60r-49,0r-51,180v-56,34,-138,57,-211,57v-125,0,-180,-72,-180,-180v0,-127,53,-261,139,-357v49,-55,124,-102,211,-102v56,0,91,21,116,56r19,-44r59,0xm510,-759v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":572},"\u0120":{"d":"568,-616r-55,195v-27,-1,-63,9,-59,-24v10,-71,-20,-114,-84,-114v-69,0,-142,58,-191,169v-32,74,-50,147,-50,216v0,69,33,120,103,120v35,0,70,-8,90,-20r39,-137v1,-20,-33,-14,-53,-15r17,-60r207,0r-17,60r-49,0r-51,180v-56,34,-138,57,-211,57v-125,0,-180,-72,-180,-180v0,-127,53,-261,139,-357v49,-55,124,-102,211,-102v56,0,91,21,116,56r19,-44r59,0xm477,-730v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":572},"\u0122":{"d":"568,-616r-55,195v-27,-1,-63,9,-59,-24v10,-71,-20,-114,-84,-114v-69,0,-142,58,-191,169v-32,74,-50,147,-50,216v0,69,33,120,103,120v35,0,70,-8,90,-20r39,-137v1,-20,-33,-14,-53,-15r17,-60r207,0r-17,60r-49,0r-51,180v-56,34,-138,57,-211,57v-125,0,-180,-72,-180,-180v0,-127,53,-261,139,-357v49,-55,124,-102,211,-102v56,0,91,21,116,56r19,-44r59,0xm245,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":572},"\u0124":{"d":"688,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r57,-206r-230,0r-51,190v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r131,-471v1,-22,-36,-13,-57,-15r18,-65r222,0r-18,65r-61,0r-58,209r230,0r53,-195v0,-21,-37,-12,-57,-14r18,-65r222,0xm545,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":656},"\u0126":{"d":"682,-602r-18,65r-61,0r-20,70r86,0r-18,64r-86,0r-92,336v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r57,-206r-230,0r-51,190v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r98,-352r-82,0r18,-64r82,0r15,-55v1,-22,-36,-13,-57,-15r18,-65r222,0r-18,65r-61,0r-20,70r230,0r15,-56v0,-21,-37,-12,-57,-14r18,-65r222,0xm216,-328r230,0r20,-75r-229,0","w":656},"\u00cc":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm338,-673r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":326},"\u00cd":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm342,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":326},"\u00ce":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm369,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":326},"\u0128":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm411,-765v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":326},"\u00cf":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm389,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm235,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":326},"\u012a":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm358,-736r-14,52r-168,0r14,-52r168,0","w":326},"\u012c":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm382,-758v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":326},"\u0130":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm331,-730v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":326,"k":{"y":20,"a":16,"\u00e0":16,"\u00e1":16,"\u00e2":16,"\u00e3":16,"\u00e4":16,"\u0101":16,"\u0103":16,"\u00e5":16,"\u01fb":16,"\u0105":16,"\u00e6":16,"\u01fd":16,"e":14,"\u00e8":14,"\u00e9":14,"\u00ea":14,"\u011b":14,"\u00eb":14,"\u0113":14,"\u0115":14,"\u0117":14,"\u0119":14,"i":8,"\u0131":8,"\u00ec":8,"\u00ed":8,"\u00ee":8,"\u0129":8,"\u00ef":8,"\u012b":8,"\u012d":8,"\u012f":8,"\u0133":8,"o":20,"\u00f2":20,"\u00f3":20,"\u00f4":20,"\u00f5":20,"\u00f6":20,"\u014d":20,"\u014f":20,"\u0151":20,"\u00f8":20,"\u01ff":20,"\u0153":20,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24}},"\u012e":{"d":"190,0v-64,-7,-121,25,-128,78v-5,36,56,39,81,24r-13,47v-59,27,-140,-2,-140,-62v0,-34,25,-68,71,-87r-93,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-130,470v0,24,36,14,58,16","w":326},"\u0132":{"d":"359,-616r-18,65r-61,0r-130,470v0,24,36,14,58,16r-18,65r-222,0r18,-65r59,0r130,-472v1,-21,-36,-12,-56,-14r18,-65r222,0xm701,-616r-130,466v-32,116,-78,161,-179,161v-49,0,-95,-19,-121,-41r25,-60v23,17,57,33,89,33v47,0,71,-35,88,-98r105,-382v0,-10,-7,-14,-20,-14r-118,0r18,-65r243,0","w":707,"k":{"y":20,"a":16,"\u00e0":16,"\u00e1":16,"\u00e2":16,"\u00e3":16,"\u00e4":16,"\u0101":16,"\u0103":16,"\u00e5":16,"\u01fb":16,"\u0105":16,"\u00e6":16,"\u01fd":16,"e":14,"\u00e8":14,"\u00e9":14,"\u00ea":14,"\u011b":14,"\u00eb":14,"\u0113":14,"\u0115":14,"\u0117":14,"\u0119":14,"i":8,"\u0131":8,"\u00ec":8,"\u00ed":8,"\u00ee":8,"\u0129":8,"\u00ef":8,"\u012b":8,"\u012d":8,"\u012f":8,"\u0133":8,"o":20,"\u00f2":20,"\u00f3":20,"\u00f4":20,"\u00f5":20,"\u00f6":20,"\u014d":20,"\u014f":20,"\u0151":20,"\u00f8":20,"\u01ff":20,"\u0153":20,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24}},"\u0134":{"d":"390,-616r-130,466v-32,116,-78,161,-179,161v-49,0,-95,-19,-121,-41r25,-60v23,17,57,33,89,33v47,0,71,-35,88,-98r105,-382v0,-10,-7,-14,-20,-14r-118,0r18,-65r243,0xm395,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":396},"\u0136":{"d":"636,-616r-18,65r-69,0r-213,207r81,217v23,72,47,81,95,47r24,42v-32,30,-70,48,-109,48v-53,0,-75,-30,-102,-104r-66,-181r-76,71v-10,43,-27,82,-33,128v4,18,38,9,58,11r-18,65r-222,0r18,-65r59,0r128,-459v10,-31,-26,-28,-54,-27r18,-65r222,0r-18,65r-61,0r-63,231v91,-90,221,-195,289,-296r130,0xm297,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":595},"\u0139":{"d":"406,-216v25,-2,50,-2,43,25r-52,191r-429,0r18,-65r59,0r131,-471v4,-20,-37,-14,-57,-15r18,-65r222,0r-18,65r-61,0r-131,471v0,11,8,15,20,15r165,0v30,-48,57,-110,72,-151xm337,-716v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":499},"\u013d":{"d":"406,-216v25,-2,50,-2,43,25r-52,191r-429,0r18,-65r59,0r131,-471v4,-20,-37,-14,-57,-15r18,-65r222,0r-18,65r-61,0r-131,471v0,11,8,15,20,15r165,0v30,-48,57,-110,72,-151xm504,-590v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":499},"\u013b":{"d":"406,-216v25,-2,50,-2,43,25r-52,191r-429,0r18,-65r59,0r131,-471v4,-20,-37,-14,-57,-15r18,-65r222,0r-18,65r-61,0r-131,471v0,11,8,15,20,15r165,0v30,-48,57,-110,72,-151xm247,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":499},"\u0141":{"d":"406,-216v25,-2,50,-2,43,25r-52,191r-429,0r17,-65r60,0r51,-183r-101,44r23,-78r100,-44r58,-210v4,-20,-37,-14,-57,-15r17,-65r222,0r-17,65r-61,0r-50,177r102,-42r-22,78r-101,42r-60,216v0,11,8,15,20,15r165,0v30,-48,57,-110,72,-151","w":499},"\u013f":{"d":"406,-216v25,-2,50,-2,43,25r-52,191r-429,0r18,-65r59,0r131,-471v4,-20,-37,-14,-57,-15r18,-65r222,0r-18,65r-61,0r-131,471v0,11,8,15,20,15r165,0v30,-48,57,-110,72,-151xm369,-337v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":499,"k":{"X":-10,"V":42,"U":8,"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":46,"\u0164":46,"\u0162":46,"Y":47,"\u1ef2":47,"\u00dd":47,"\u0176":47,"\u0178":47,"W":34,"\u1e80":34,"\u1e82":34,"\u0174":34,"\u1e84":34}},"\u0143":{"d":"696,-616r-18,65r-56,0r-153,551r-50,0r-194,-436r-98,355v-2,22,32,15,53,16r-18,65r-194,0r18,-65r55,0r129,-461v10,-31,-28,-25,-54,-25r18,-65r113,0r193,428r96,-348v1,-21,-35,-14,-55,-15r18,-65r197,0xm496,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":663},"\u0147":{"d":"696,-616r-18,65r-56,0r-153,551r-50,0r-194,-436r-98,355v-2,22,32,15,53,16r-18,65r-194,0r18,-65r55,0r129,-461v10,-31,-28,-25,-54,-25r18,-65r113,0r193,428r96,-348v1,-21,-35,-14,-55,-15r18,-65r197,0xm560,-780r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":663},"\u00d1":{"d":"696,-616r-18,65r-56,0r-153,551r-50,0r-194,-436r-98,355v-2,22,32,15,53,16r-18,65r-194,0r18,-65r55,0r129,-461v10,-31,-28,-25,-54,-25r18,-65r113,0r193,428r96,-348v1,-21,-35,-14,-55,-15r18,-65r197,0xm555,-750v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":663},"\u0145":{"d":"696,-616r-18,65r-56,0r-153,551r-50,0r-194,-436r-98,355v-2,22,32,15,53,16r-18,65r-194,0r18,-65r55,0r129,-461v10,-31,-28,-25,-54,-25r18,-65r113,0r193,428r96,-348v1,-21,-35,-14,-55,-15r18,-65r197,0xm303,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":663},"\u014a":{"d":"229,108v95,-44,146,-77,167,-157r-171,-387r-98,355v-2,22,32,15,53,16r-18,65r-194,0r18,-65r55,0r129,-461v10,-31,-28,-25,-54,-25r18,-65r113,0r193,428r96,-348v1,-21,-35,-14,-55,-15r18,-65r197,0r-18,65r-56,0r-140,503v-37,133,-108,179,-235,203","w":663},"\u00d2":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm462,-673r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":558},"\u00d3":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm459,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":558},"\u00d4":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm492,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":558},"\u00d5":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm526,-765v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":558},"\u00d6":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm523,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm369,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":558},"\u014c":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm496,-735r-14,52r-168,0r14,-52r168,0","w":558},"\u014e":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm516,-758v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":558},"\u0150":{"d":"24,-175v0,-194,135,-453,342,-453v123,0,168,88,168,186v0,194,-135,452,-342,452v-123,0,-168,-87,-168,-185xm429,-444v0,-62,-26,-108,-81,-108v-52,0,-123,43,-171,162v-30,75,-48,148,-48,217v0,62,26,107,81,107v52,0,123,-43,171,-162v30,-75,48,-147,48,-216xm550,-719v-54,-3,-102,29,-136,58r-13,-14v28,-29,95,-103,137,-103v33,-1,20,38,12,59xm400,-719v-54,-3,-102,29,-136,58r-13,-14v28,-28,95,-103,137,-103v33,-1,20,38,12,59","w":558},"\u00d8":{"d":"32,-175v0,-194,135,-451,342,-453v44,0,78,11,103,30r62,-79r75,0r-98,124v18,32,26,70,26,111v0,194,-135,450,-342,452v-45,0,-79,-12,-105,-31r-69,87r-76,0r106,-133v-17,-31,-24,-69,-24,-108xm416,-522v-13,-19,-33,-30,-60,-30v-52,0,-123,43,-171,162v-30,77,-48,148,-48,220xm389,-228v31,-79,49,-148,48,-225r-281,355v13,20,34,32,62,32v52,0,123,-43,171,-162","w":564},"\u01fe":{"d":"32,-175v0,-194,135,-451,342,-453v44,0,78,11,103,30r62,-79r75,0r-98,124v18,32,26,70,26,111v0,194,-135,450,-342,452v-45,0,-79,-12,-105,-31r-69,87r-76,0r106,-133v-17,-31,-24,-69,-24,-108xm416,-522v-13,-19,-33,-30,-60,-30v-52,0,-123,43,-171,162v-30,77,-48,148,-48,220xm389,-228v31,-79,49,-148,48,-225r-281,355v13,20,34,32,62,32v52,0,123,-43,171,-162xm479,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":558},"\u0152":{"d":"828,-616r-52,202v-22,-1,-53,6,-49,-20v-2,-53,30,-117,-48,-117r-131,0r-58,208r101,0v20,-27,28,-78,82,-66r-55,196v-21,-1,-40,5,-41,-20r-1,-48r-104,0r-55,201v0,12,9,15,20,15r173,0v26,-41,56,-107,72,-151v23,0,51,-6,43,25r-52,191r-261,0v-83,0,-144,10,-215,10v-123,0,-173,-87,-173,-185v0,-122,54,-268,139,-357v129,-136,244,-84,447,-84r218,0xm429,-479v18,-55,-11,-74,-80,-74v-52,0,-124,44,-172,163v-30,75,-48,149,-48,218v0,62,26,108,81,108v90,0,107,-16,120,-61","w":814},"\u00de":{"d":"525,-354v0,53,-28,117,-69,159v-69,69,-169,77,-295,73v-4,18,-25,56,8,57r38,0r-17,65r-222,0r17,-65r60,0r130,-472v1,-21,-36,-12,-56,-14r17,-65r222,0r-17,65r-61,0r-13,49v128,0,258,-3,258,148xm239,-190v112,3,176,-64,182,-161v6,-94,-83,-86,-173,-86r-69,247r60,0","w":508},"\u0154":{"d":"563,-482v0,109,-84,196,-185,221r39,133v17,77,47,79,95,48r24,42v-76,68,-175,73,-211,-56r-43,-154r-87,0r-45,169v1,20,37,12,58,14r-18,65r-222,0r18,-65r59,0r131,-471v-2,-24,-35,-12,-57,-15r18,-65r222,0v148,0,204,50,204,134xm417,-368v57,-69,70,-192,-71,-183r-66,0r-66,235v87,3,163,-5,203,-52xm471,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":605},"\u0158":{"d":"563,-482v0,109,-84,196,-185,221r39,133v17,77,47,79,95,48r24,42v-76,68,-175,73,-211,-56r-43,-154r-87,0r-45,169v1,20,37,12,58,14r-18,65r-222,0r18,-65r59,0r131,-471v-2,-24,-35,-12,-57,-15r18,-65r222,0v148,0,204,50,204,134xm417,-368v57,-69,70,-192,-71,-183r-66,0r-66,235v87,3,163,-5,203,-52xm528,-780r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":605},"\u0156":{"d":"563,-482v0,109,-84,196,-185,221r39,133v17,77,47,79,95,48r24,42v-76,68,-175,73,-211,-56r-43,-154r-87,0r-45,169v1,20,37,12,58,14r-18,65r-222,0r18,-65r59,0r131,-471v-2,-24,-35,-12,-57,-15r18,-65r222,0v148,0,204,50,204,134xm417,-368v57,-69,70,-192,-71,-183r-66,0r-66,235v87,3,163,-5,203,-52xm275,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":605},"\u015a":{"d":"96,-439v0,-109,105,-189,218,-189v49,0,114,22,137,62r20,-49r47,0r-57,207v-24,-2,-59,9,-55,-20v10,-80,-20,-135,-95,-135v-61,0,-110,43,-110,105v0,120,222,106,222,281v0,114,-118,188,-228,188v-47,0,-120,-22,-144,-66r-24,55r-54,0r63,-211v23,2,58,-8,55,18v-11,83,30,136,104,136v62,0,123,-39,123,-106v0,-114,-222,-105,-222,-276xm419,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":494},"\u015c":{"d":"96,-439v0,-109,105,-189,218,-189v49,0,114,22,137,62r20,-49r47,0r-57,207v-24,-2,-59,9,-55,-20v10,-80,-20,-135,-95,-135v-61,0,-110,43,-110,105v0,120,222,106,222,281v0,114,-118,188,-228,188v-47,0,-120,-22,-144,-66r-24,55r-54,0r63,-211v23,2,58,-8,55,18v-11,83,30,136,104,136v62,0,123,-39,123,-106v0,-114,-222,-105,-222,-276xm454,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":494},"\u0160":{"d":"96,-439v0,-109,105,-189,218,-189v49,0,114,22,137,62r20,-49r47,0r-57,207v-24,-2,-59,9,-55,-20v10,-80,-20,-135,-95,-135v-61,0,-110,43,-110,105v0,120,222,106,222,281v0,114,-118,188,-228,188v-47,0,-120,-22,-144,-66r-24,55r-54,0r63,-211v23,2,58,-8,55,18v-11,83,30,136,104,136v62,0,123,-39,123,-106v0,-114,-222,-105,-222,-276xm483,-779r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":494},"\u015e":{"d":"96,-439v0,-109,105,-189,218,-189v49,0,114,22,137,62r20,-49r47,0r-57,207v-24,-2,-59,9,-55,-20v10,-80,-20,-135,-95,-135v-61,0,-110,43,-110,105v0,120,222,106,222,281v0,111,-111,189,-215,188r-16,26v35,-15,75,6,75,45v0,40,-31,79,-88,79v-28,0,-54,-8,-69,-18r13,-36v21,20,85,20,83,-18v-2,-25,-33,-26,-48,-12r-29,-13r32,-56v-43,-8,-91,-28,-110,-63r-24,55r-54,0r63,-211v23,2,58,-8,55,18v-11,83,30,136,104,136v62,0,123,-39,123,-106v0,-114,-222,-105,-222,-276","w":494},"\u0218":{"d":"96,-439v0,-109,105,-189,218,-189v49,0,114,22,137,62r20,-49r47,0r-57,207v-24,-2,-59,9,-55,-20v10,-80,-20,-135,-95,-135v-61,0,-110,43,-110,105v0,120,222,106,222,281v0,114,-118,188,-228,188v-47,0,-120,-22,-144,-66r-24,55r-54,0r63,-211v23,2,58,-8,55,18v-11,83,30,136,104,136v62,0,123,-39,123,-106v0,-114,-222,-105,-222,-276xm228,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":494},"\u0164":{"d":"590,-616r-53,191v-22,-1,-49,6,-49,-19v0,-51,38,-118,-48,-107r-58,0r-130,470v0,23,36,14,58,16r-18,65r-222,0r18,-65r59,0r136,-486v-60,3,-113,-12,-135,38r-31,69v-9,23,-31,19,-59,19r54,-191r478,0xm507,-779r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":533,"k":{"J":11,"a":24,"\u00e0":24,"\u00e1":24,"\u00e2":24,"\u00e3":24,"\u00e4":24,"\u0101":24,"\u0103":24,"\u00e5":24,"\u01fb":24,"\u0105":24,"\u00e6":24,"\u01fd":24,"e":21,"\u00e8":21,"\u00e9":21,"\u00ea":21,"\u011b":21,"\u00eb":21,"\u0113":21,"\u0115":21,"\u0117":21,"\u0119":21,"o":16,"\u00f2":16,"\u00f3":16,"\u00f4":16,"\u00f5":16,"\u00f6":16,"\u014d":16,"\u014f":16,"\u0151":16,"\u00f8":16,"\u01ff":16,"\u0153":16,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"Y":-11,"\u1ef2":-11,"\u00dd":-11,"\u0176":-11,"\u0178":-11}},"\u0162":{"d":"590,-616r-53,191v-22,-1,-49,6,-49,-19v0,-51,38,-118,-48,-107r-58,0r-130,470v0,23,36,14,58,16r-18,65r-222,0r18,-65r59,0r136,-486v-60,3,-113,-12,-135,38r-31,69v-9,23,-31,19,-59,19r54,-191r478,0xm213,85v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":533,"k":{"J":11,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"Y":-11,"\u1ef2":-11,"\u00dd":-11,"\u0176":-11,"\u0178":-11,"a":24,"\u00e0":24,"\u00e1":24,"\u00e2":24,"\u00e3":24,"\u00e4":24,"\u0101":24,"\u0103":24,"\u00e5":24,"\u01fb":24,"\u0105":24,"\u00e6":24,"\u01fd":24,"e":21,"\u00e8":21,"\u00e9":21,"\u00ea":21,"\u011b":21,"\u00eb":21,"\u0113":21,"\u0115":21,"\u0117":21,"\u0119":21,"o":16,"\u00f2":16,"\u00f3":16,"\u00f4":16,"\u00f5":16,"\u00f6":16,"\u014d":16,"\u014f":16,"\u0151":16,"\u00f8":16,"\u01ff":16,"\u0153":16}},"\u021a":{"d":"590,-616r-53,191v-22,-1,-49,6,-49,-19v0,-51,38,-118,-48,-107r-58,0r-130,470v0,23,36,14,58,16r-18,65r-222,0r18,-65r59,0r136,-486v-60,3,-113,-12,-135,38r-31,69v-9,23,-31,19,-59,19r54,-191r478,0xm213,85v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":533,"k":{"J":11,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"Y":-11,"\u1ef2":-11,"\u00dd":-11,"\u0176":-11,"\u0178":-11,"a":24,"\u00e0":24,"\u00e1":24,"\u00e2":24,"\u00e3":24,"\u00e4":24,"\u0101":24,"\u0103":24,"\u00e5":24,"\u01fb":24,"\u0105":24,"\u00e6":24,"\u01fd":24,"e":21,"\u00e8":21,"\u00e9":21,"\u00ea":21,"\u011b":21,"\u00eb":21,"\u0113":21,"\u0115":21,"\u0117":21,"\u0119":21,"o":16,"\u00f2":16,"\u00f3":16,"\u00f4":16,"\u00f5":16,"\u00f6":16,"\u014d":16,"\u014f":16,"\u0151":16,"\u00f8":16,"\u01ff":16,"\u0153":16}},"\u0166":{"d":"422,-337r-18,64r-100,0r-52,192v0,23,36,14,58,16r-18,65r-222,0r18,-65r59,0r58,-208r-100,0r18,-64r100,0r60,-214v-60,3,-113,-12,-135,38r-31,69v-9,23,-31,19,-59,19r54,-191r478,0r-53,191v-22,-1,-49,6,-49,-19v0,-51,38,-118,-48,-107r-58,0r-60,214r100,0","w":533,"k":{"J":11,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"Y":-11,"\u1ef2":-11,"\u00dd":-11,"\u0176":-11,"\u0178":-11,"a":24,"\u00e0":24,"\u00e1":24,"\u00e2":24,"\u00e3":24,"\u00e4":24,"\u0101":24,"\u0103":24,"\u00e5":24,"\u01fb":24,"\u0105":24,"\u00e6":24,"\u01fd":24,"e":21,"\u00e8":21,"\u00e9":21,"\u00ea":21,"\u011b":21,"\u00eb":21,"\u0113":21,"\u0115":21,"\u0117":21,"\u0119":21,"o":16,"\u00f2":16,"\u00f3":16,"\u00f4":16,"\u00f5":16,"\u00f6":16,"\u014d":16,"\u014f":16,"\u0151":16,"\u00f8":16,"\u01ff":16,"\u0153":16}},"\u00d9":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm481,-673r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":607},"\u00da":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm492,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":607},"\u00db":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm513,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":607},"\u0168":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm555,-765v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":607},"\u00dc":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm536,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm382,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":607},"\u016a":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm503,-735r-14,52r-168,0r14,-52r168,0","w":607},"\u016c":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm532,-759v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":607},"\u016e":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm503,-751v0,51,-42,102,-103,102v-41,0,-69,-22,-69,-61v0,-51,42,-102,103,-102v41,0,69,22,69,61xm463,-746v0,-25,-15,-36,-33,-36v-36,0,-59,37,-59,67v0,25,15,36,33,36v36,0,59,-37,59,-67","w":607},"\u0170":{"d":"663,-616r-18,65r-61,0v-49,154,-85,361,-163,475v-82,120,-366,129,-359,-64v5,-131,72,-272,94,-397v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0xm562,-719v-54,-3,-102,29,-136,58r-13,-14v28,-29,95,-103,137,-103v33,-1,20,38,12,59xm412,-719v-54,-3,-102,29,-136,58r-13,-14v28,-28,95,-103,137,-103v33,-1,20,38,12,59","w":607},"\u0172":{"d":"250,159v-105,0,-115,-109,-38,-149v-88,-5,-150,-61,-150,-154v0,-130,73,-268,94,-393v3,-20,-36,-12,-56,-14r18,-65r222,0r-18,65r-61,0r-83,295v-7,24,-18,69,-18,103v0,54,32,87,84,87v106,-1,144,-108,170,-205r72,-266v-1,-22,-36,-11,-57,-14r18,-65r216,0r-18,65r-61,0v-53,161,-87,400,-186,496v-68,65,-165,76,-165,133v0,37,55,39,81,24r-13,47v-16,6,-33,10,-51,10","w":607},"\u1e80":{"d":"944,-616r-18,65v-47,-2,-66,4,-85,40r-272,511r-91,0r-17,-414r-232,414r-87,0r-7,-520v1,-38,-27,-30,-59,-31r18,-65r225,0r-18,65r-58,0r-15,427r270,-492r53,0r14,492r220,-427r-63,0r18,-65r204,0xm622,-673r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":875,"k":{"Z":9,"A":62,"\u00c0":62,"\u00c1":62,"\u00c2":62,"\u00c3":62,"\u00c4":62,"\u0100":62,"\u0102":62,"\u00c5":62,"\u01fa":62,"\u0104":62,"\u00c6":62,"\u01fc":62,"C":8,"\u0106":8,"\u00c7":8,"\u0108":8,"\u010c":8,"\u010a":8,"G":3,"\u011c":3,"\u011e":3,"\u0120":3,"\u0122":3,"O":4,"\u00d2":4,"\u00d3":4,"\u00d4":4,"\u00d5":4,"\u00d6":4,"\u014c":4,"\u014e":4,"\u0150":4,"\u00d8":4,"\u01fe":4,"\u0152":4,"Y":-26,"\u1ef2":-26,"\u00dd":-26,"\u0176":-26,"\u0178":-26,"a":54,"\u00e0":54,"\u00e1":54,"\u00e2":54,"\u00e3":54,"\u00e4":54,"\u0101":54,"\u0103":54,"\u00e5":54,"\u01fb":54,"\u0105":54,"\u00e6":54,"\u01fd":54,"e":54,"\u00e8":54,"\u00e9":54,"\u00ea":54,"\u011b":54,"\u00eb":54,"\u0113":54,"\u0115":54,"\u0117":54,"\u0119":54,"o":51,"\u00f2":51,"\u00f3":51,"\u00f4":51,"\u00f5":51,"\u00f6":51,"\u014d":51,"\u014f":51,"\u0151":51,"\u00f8":51,"\u01ff":51,"\u0153":51,"u":23,"\u00f9":23,"\u00fa":23,"\u00fb":23,"\u0169":23,"\u00fc":23,"\u016b":23,"\u016d":23,"\u016f":23,"\u0171":23,"\u0173":23}},"\u1e82":{"d":"944,-616r-18,65v-47,-2,-66,4,-85,40r-272,511r-91,0r-17,-414r-232,414r-87,0r-7,-520v1,-38,-27,-30,-59,-31r18,-65r225,0r-18,65r-58,0r-15,427r270,-492r53,0r14,492r220,-427r-63,0r18,-65r204,0xm648,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":875,"k":{"Z":9,"A":62,"\u00c0":62,"\u00c1":62,"\u00c2":62,"\u00c3":62,"\u00c4":62,"\u0100":62,"\u0102":62,"\u00c5":62,"\u01fa":62,"\u0104":62,"\u00c6":62,"\u01fc":62,"C":8,"\u0106":8,"\u00c7":8,"\u0108":8,"\u010c":8,"\u010a":8,"G":3,"\u011c":3,"\u011e":3,"\u0120":3,"\u0122":3,"O":4,"\u00d2":4,"\u00d3":4,"\u00d4":4,"\u00d5":4,"\u00d6":4,"\u014c":4,"\u014e":4,"\u0150":4,"\u00d8":4,"\u01fe":4,"\u0152":4,"Y":-26,"\u1ef2":-26,"\u00dd":-26,"\u0176":-26,"\u0178":-26,"a":54,"\u00e0":54,"\u00e1":54,"\u00e2":54,"\u00e3":54,"\u00e4":54,"\u0101":54,"\u0103":54,"\u00e5":54,"\u01fb":54,"\u0105":54,"\u00e6":54,"\u01fd":54,"e":54,"\u00e8":54,"\u00e9":54,"\u00ea":54,"\u011b":54,"\u00eb":54,"\u0113":54,"\u0115":54,"\u0117":54,"\u0119":54,"o":51,"\u00f2":51,"\u00f3":51,"\u00f4":51,"\u00f5":51,"\u00f6":51,"\u014d":51,"\u014f":51,"\u0151":51,"\u00f8":51,"\u01ff":51,"\u0153":51,"u":23,"\u00f9":23,"\u00fa":23,"\u00fb":23,"\u0169":23,"\u00fc":23,"\u016b":23,"\u016d":23,"\u016f":23,"\u0171":23,"\u0173":23}},"\u0174":{"d":"944,-616r-18,65v-47,-2,-66,4,-85,40r-272,511r-91,0r-17,-414r-232,414r-87,0r-7,-520v1,-38,-27,-30,-59,-31r18,-65r225,0r-18,65r-58,0r-15,427r270,-492r53,0r14,492r220,-427r-63,0r18,-65r204,0xm653,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":875,"k":{"Z":9,"a":54,"\u00e0":54,"\u00e1":54,"\u00e2":54,"\u00e3":54,"\u00e4":54,"\u0101":54,"\u0103":54,"\u00e5":54,"\u01fb":54,"\u0105":54,"\u00e6":54,"\u01fd":54,"e":54,"\u00e8":54,"\u00e9":54,"\u00ea":54,"\u011b":54,"\u00eb":54,"\u0113":54,"\u0115":54,"\u0117":54,"\u0119":54,"o":51,"\u00f2":51,"\u00f3":51,"\u00f4":51,"\u00f5":51,"\u00f6":51,"\u014d":51,"\u014f":51,"\u0151":51,"\u00f8":51,"\u01ff":51,"\u0153":51,"u":23,"\u00f9":23,"\u00fa":23,"\u00fb":23,"\u0169":23,"\u00fc":23,"\u016b":23,"\u016d":23,"\u016f":23,"\u0171":23,"\u0173":23,"A":62,"\u00c0":62,"\u00c1":62,"\u00c2":62,"\u00c3":62,"\u00c4":62,"\u0100":62,"\u0102":62,"\u00c5":62,"\u01fa":62,"\u0104":62,"\u00c6":62,"\u01fc":62,"C":8,"\u0106":8,"\u00c7":8,"\u0108":8,"\u010c":8,"\u010a":8,"G":3,"\u011c":3,"\u011e":3,"\u0120":3,"\u0122":3,"O":4,"\u00d2":4,"\u00d3":4,"\u00d4":4,"\u00d5":4,"\u00d6":4,"\u014c":4,"\u014e":4,"\u0150":4,"\u00d8":4,"\u01fe":4,"\u0152":4,"Y":-26,"\u1ef2":-26,"\u00dd":-26,"\u0176":-26,"\u0178":-26}},"\u1e84":{"d":"944,-616r-18,65v-47,-2,-66,4,-85,40r-272,511r-91,0r-17,-414r-232,414r-87,0r-7,-520v1,-38,-27,-30,-59,-31r18,-65r225,0r-18,65r-58,0r-15,427r270,-492r53,0r14,492r220,-427r-63,0r18,-65r204,0xm673,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm519,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":875,"k":{"Z":9,"A":62,"\u00c0":62,"\u00c1":62,"\u00c2":62,"\u00c3":62,"\u00c4":62,"\u0100":62,"\u0102":62,"\u00c5":62,"\u01fa":62,"\u0104":62,"\u00c6":62,"\u01fc":62,"C":8,"\u0106":8,"\u00c7":8,"\u0108":8,"\u010c":8,"\u010a":8,"G":3,"\u011c":3,"\u011e":3,"\u0120":3,"\u0122":3,"O":4,"\u00d2":4,"\u00d3":4,"\u00d4":4,"\u00d5":4,"\u00d6":4,"\u014c":4,"\u014e":4,"\u0150":4,"\u00d8":4,"\u01fe":4,"\u0152":4,"Y":-26,"\u1ef2":-26,"\u00dd":-26,"\u0176":-26,"\u0178":-26,"a":54,"\u00e0":54,"\u00e1":54,"\u00e2":54,"\u00e3":54,"\u00e4":54,"\u0101":54,"\u0103":54,"\u00e5":54,"\u01fb":54,"\u0105":54,"\u00e6":54,"\u01fd":54,"e":54,"\u00e8":54,"\u00e9":54,"\u00ea":54,"\u011b":54,"\u00eb":54,"\u0113":54,"\u0115":54,"\u0117":54,"\u0119":54,"o":51,"\u00f2":51,"\u00f3":51,"\u00f4":51,"\u00f5":51,"\u00f6":51,"\u014d":51,"\u014f":51,"\u0151":51,"\u00f8":51,"\u01ff":51,"\u0153":51,"u":23,"\u00f9":23,"\u00fa":23,"\u00fb":23,"\u0169":23,"\u00fc":23,"\u016b":23,"\u016d":23,"\u016f":23,"\u0171":23,"\u0173":23}},"\u1ef2":{"d":"625,-616r-18,65v-52,-2,-69,2,-99,39r-214,269r-43,154v-10,33,30,22,57,24r-18,65r-222,0r18,-65r59,0r52,-187r-69,-267v-7,-37,-34,-32,-72,-32r18,-65r222,0r-18,65r-55,0r57,223r174,-223r-54,0r18,-65r207,0xm449,-673r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":522,"k":{"\u1ef2":-61,"X":-30,"V":-40,"U":-21,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"T":-29,"\u0164":-29,"\u0162":-29,"a":41,"\u00e0":41,"\u00e1":41,"\u00e2":41,"\u00e3":41,"\u00e4":41,"\u0101":41,"\u0103":41,"\u00e5":41,"\u01fb":41,"\u0105":41,"\u00e6":41,"\u01fd":41,"e":36,"\u00e8":36,"\u00e9":36,"\u00ea":36,"\u011b":36,"\u00eb":36,"\u0113":36,"\u0115":36,"\u0117":36,"\u0119":36,"o":27,"\u00f2":27,"\u00f3":27,"\u00f4":27,"\u00f5":27,"\u00f6":27,"\u014d":27,"\u014f":27,"\u0151":27,"\u00f8":27,"\u01ff":27,"\u0153":27,"u":16,"\u00f9":16,"\u00fa":16,"\u00fb":16,"\u0169":16,"\u00fc":16,"\u016b":16,"\u016d":16,"\u016f":16,"\u0171":16,"\u0173":16,"W":-30,"\u1e80":-30,"\u1e82":-30,"\u0174":-30,"\u1e84":-30,"Y":-61,"\u00dd":-61,"\u0176":-61,"\u0178":-61}},"\u00dd":{"d":"625,-616r-18,65v-52,-2,-69,2,-99,39r-214,269r-43,154v-10,33,30,22,57,24r-18,65r-222,0r18,-65r59,0r52,-187r-69,-267v-7,-37,-34,-32,-72,-32r18,-65r222,0r-18,65r-55,0r57,223r174,-223r-54,0r18,-65r207,0xm453,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":522,"k":{"U":-21,"V":-40,"X":-30,"a":41,"\u00e0":41,"\u00e1":41,"\u00e2":41,"\u00e3":41,"\u00e4":41,"\u0101":41,"\u0103":41,"\u00e5":41,"\u01fb":41,"\u0105":41,"\u00e6":41,"\u01fd":41,"e":36,"\u00e8":36,"\u00e9":36,"\u00ea":36,"\u011b":36,"\u00eb":36,"\u0113":36,"\u0115":36,"\u0117":36,"\u0119":36,"o":27,"\u00f2":27,"\u00f3":27,"\u00f4":27,"\u00f5":27,"\u00f6":27,"\u014d":27,"\u014f":27,"\u0151":27,"\u00f8":27,"\u01ff":27,"\u0153":27,"u":16,"\u00f9":16,"\u00fa":16,"\u00fb":16,"\u0169":16,"\u00fc":16,"\u016b":16,"\u016d":16,"\u016f":16,"\u0171":16,"\u0173":16,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"T":-29,"\u0164":-29,"\u0162":-29,"W":-30,"\u1e80":-30,"\u1e82":-30,"\u0174":-30,"\u1e84":-30,"Y":-61,"\u1ef2":-61,"\u00dd":-61,"\u0176":-61,"\u0178":-61}},"\u0176":{"d":"625,-616r-18,65v-52,-2,-69,2,-99,39r-214,269r-43,154v-10,33,30,22,57,24r-18,65r-222,0r18,-65r59,0r52,-187r-69,-267v-7,-37,-34,-32,-72,-32r18,-65r222,0r-18,65r-55,0r57,223r174,-223r-54,0r18,-65r207,0xm469,-647r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":522,"k":{"U":-21,"V":-40,"X":-30,"a":41,"\u00e0":41,"\u00e1":41,"\u00e2":41,"\u00e3":41,"\u00e4":41,"\u0101":41,"\u0103":41,"\u00e5":41,"\u01fb":41,"\u0105":41,"\u00e6":41,"\u01fd":41,"e":36,"\u00e8":36,"\u00e9":36,"\u00ea":36,"\u011b":36,"\u00eb":36,"\u0113":36,"\u0115":36,"\u0117":36,"\u0119":36,"o":27,"\u00f2":27,"\u00f3":27,"\u00f4":27,"\u00f5":27,"\u00f6":27,"\u014d":27,"\u014f":27,"\u0151":27,"\u00f8":27,"\u01ff":27,"\u0153":27,"u":16,"\u00f9":16,"\u00fa":16,"\u00fb":16,"\u0169":16,"\u00fc":16,"\u016b":16,"\u016d":16,"\u016f":16,"\u0171":16,"\u0173":16,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"T":-29,"\u0164":-29,"\u0162":-29,"W":-30,"\u1e80":-30,"\u1e82":-30,"\u0174":-30,"\u1e84":-30,"Y":-61,"\u1ef2":-61,"\u00dd":-61,"\u0176":-61,"\u0178":-61}},"\u0178":{"d":"625,-616r-18,65v-52,-2,-69,2,-99,39r-214,269r-43,154v-10,33,30,22,57,24r-18,65r-222,0r18,-65r59,0r52,-187r-69,-267v-7,-37,-34,-32,-72,-32r18,-65r222,0r-18,65r-55,0r57,223r174,-223r-54,0r18,-65r207,0xm506,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm352,-712v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":522,"k":{"U":-21,"V":-40,"X":-30,"a":41,"\u00e0":41,"\u00e1":41,"\u00e2":41,"\u00e3":41,"\u00e4":41,"\u0101":41,"\u0103":41,"\u00e5":41,"\u01fb":41,"\u0105":41,"\u00e6":41,"\u01fd":41,"e":36,"\u00e8":36,"\u00e9":36,"\u00ea":36,"\u011b":36,"\u00eb":36,"\u0113":36,"\u0115":36,"\u0117":36,"\u0119":36,"o":27,"\u00f2":27,"\u00f3":27,"\u00f4":27,"\u00f5":27,"\u00f6":27,"\u014d":27,"\u014f":27,"\u0151":27,"\u00f8":27,"\u01ff":27,"\u0153":27,"u":16,"\u00f9":16,"\u00fa":16,"\u00fb":16,"\u0169":16,"\u00fc":16,"\u016b":16,"\u016d":16,"\u016f":16,"\u0171":16,"\u0173":16,"A":20,"\u00c0":20,"\u00c1":20,"\u00c2":20,"\u00c3":20,"\u00c4":20,"\u0100":20,"\u0102":20,"\u00c5":20,"\u01fa":20,"\u0104":20,"\u00c6":20,"\u01fc":20,"T":-29,"\u0164":-29,"\u0162":-29,"W":-30,"\u1e80":-30,"\u1e82":-30,"\u0174":-30,"\u1e84":-30,"Y":-61,"\u1ef2":-61,"\u00dd":-61,"\u0176":-61,"\u0178":-61}},"\u0179":{"d":"582,-616v-13,56,-14,56,-81,132r-367,412r193,0v23,0,30,-5,38,-24r31,-70r59,0r-45,166r-425,0v14,-62,14,-58,87,-140r361,-404r-196,0v-23,0,-31,5,-39,23r-33,73r-59,0r46,-168r430,0xm460,-717v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":544},"\u017d":{"d":"582,-616v-13,56,-14,56,-81,132r-367,412r193,0v23,0,30,-5,38,-24r31,-70r59,0r-45,166r-425,0v14,-62,14,-58,87,-140r361,-404r-196,0v-23,0,-31,5,-39,23r-33,73r-59,0r46,-168r430,0xm519,-779r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":544},"\u017b":{"d":"582,-616v-13,56,-14,56,-81,132r-367,412r193,0v23,0,30,-5,38,-24r31,-70r59,0r-45,166r-425,0v14,-62,14,-58,87,-140r361,-404r-196,0v-23,0,-31,5,-39,23r-33,73r-59,0r46,-168r430,0xm441,-730v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":544},"\u00e0":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm444,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":509},"\u00e1":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm424,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":509},"\u00e2":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm453,-506r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":509},"\u00e3":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm499,-622v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":509},"\u00e4":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm492,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm338,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":509},"\u0101":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm478,-597r-14,52r-168,0r14,-52r168,0","w":509},"\u0103":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm490,-611v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":509},"\u00e5":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm453,-596v0,51,-42,102,-103,102v-41,0,-69,-22,-69,-61v0,-51,42,-102,103,-102v41,0,69,22,69,61xm417,-592v0,-27,-16,-39,-36,-39v-39,0,-64,40,-64,72v0,27,16,39,36,39v39,0,64,-40,64,-72","w":509},"\u01fb":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12r-16,59v-65,3,-157,4,-129,-63v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273xm453,-596v0,51,-42,102,-103,102v-41,0,-69,-22,-69,-61v0,-51,42,-102,103,-102v41,0,69,22,69,61xm413,-591v0,-25,-15,-36,-33,-36v-36,0,-59,37,-59,67v0,25,15,36,33,36v36,0,59,-37,59,-67xm475,-731v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":509},"\u0105":{"d":"29,-134v2,-171,128,-334,311,-337v58,0,106,21,137,39r-101,361v0,18,36,10,55,12v-6,19,-9,42,-17,59v-43,0,-99,34,-99,78v-7,35,56,39,81,24r-13,47v-59,27,-140,-2,-140,-62v0,-34,27,-70,75,-89v-34,-6,-40,-35,-32,-61v-33,42,-77,74,-135,74v-84,0,-122,-66,-122,-145xm128,-141v-1,45,15,83,54,83v105,0,131,-133,158,-226r34,-119v-11,-6,-27,-11,-45,-11v-127,6,-196,155,-201,273","w":509},"\u00e6":{"d":"675,-338v0,35,-12,90,-24,124r-275,0v-17,68,-16,161,63,161v51,0,95,-32,128,-69r35,35v-44,60,-115,98,-190,98v-49,0,-100,-20,-124,-66v-42,43,-103,68,-159,68v-69,0,-118,-46,-118,-116v0,-142,170,-176,281,-169v9,-22,23,-57,23,-81v0,-39,-30,-51,-64,-51v-44,0,-93,17,-133,35r19,-73v87,-34,209,-54,261,28v40,-32,94,-57,145,-57v85,0,132,48,132,133xm565,-268v18,-48,38,-141,-29,-141v-69,0,-122,84,-144,141r173,0xm278,-219v-74,-2,-168,19,-168,103v0,88,125,58,161,9v-6,-39,-2,-76,7,-112","w":707},"\u01fd":{"d":"675,-338v0,35,-12,90,-24,124r-275,0v-17,68,-16,161,63,161v51,0,95,-32,128,-69r35,35v-44,60,-115,98,-190,98v-49,0,-100,-20,-124,-66v-42,43,-103,68,-159,68v-69,0,-118,-46,-118,-116v0,-142,170,-176,281,-169v9,-22,23,-57,23,-81v0,-39,-30,-51,-64,-51v-44,0,-93,17,-133,35r19,-73v87,-34,209,-54,261,28v40,-32,94,-57,145,-57v85,0,132,48,132,133xm565,-268v18,-48,38,-141,-29,-141v-69,0,-122,84,-144,141r173,0xm278,-219v-74,-2,-168,19,-168,103v0,88,125,58,161,9v-6,-39,-2,-76,7,-112xm541,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":707},"\u0107":{"d":"30,-140v0,-149,118,-331,275,-331v34,0,69,10,88,39r12,-26r53,0r-42,147v-30,1,-51,4,-51,-36v0,-45,-29,-63,-64,-63v-112,0,-172,160,-172,265v0,47,19,92,72,92v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm404,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":434},"\u00e7":{"d":"30,-140v0,-149,118,-331,275,-331v34,0,69,10,88,39r12,-26r53,0r-42,147v-30,1,-51,4,-51,-36v0,-45,-29,-63,-64,-63v-112,0,-172,160,-172,265v0,47,19,92,72,92v52,0,95,-32,128,-69r35,35v-41,56,-104,92,-173,97r-16,27v35,-15,75,6,75,45v0,40,-31,79,-88,79v-28,0,-54,-8,-69,-18r13,-36v21,20,85,20,83,-18v-2,-25,-33,-26,-48,-12r-29,-13r32,-56v-75,-11,-114,-67,-114,-148","w":434},"\u0109":{"d":"30,-140v0,-149,118,-331,275,-331v34,0,69,10,88,39r12,-26r53,0r-42,147v-30,1,-51,4,-51,-36v0,-45,-29,-63,-64,-63v-112,0,-172,160,-172,265v0,47,19,92,72,92v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm444,-506r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":434},"\u010d":{"d":"30,-140v0,-149,118,-331,275,-331v34,0,69,10,88,39r12,-26r53,0r-42,147v-30,1,-51,4,-51,-36v0,-45,-29,-63,-64,-63v-112,0,-172,160,-172,265v0,47,19,92,72,92v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm468,-615r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":434},"\u010b":{"d":"30,-140v0,-149,118,-331,275,-331v34,0,69,10,88,39r12,-26r53,0r-42,147v-30,1,-51,4,-51,-36v0,-45,-29,-63,-64,-63v-112,0,-172,160,-172,265v0,47,19,92,72,92v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm403,-577v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":434},"\u010f":{"d":"348,0v-53,2,-68,-29,-57,-63v-32,41,-81,74,-139,74v-129,1,-140,-156,-102,-261v47,-132,167,-248,345,-215r45,-158r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-158,563v0,18,37,10,56,12r-16,59r-71,0xm129,-141v-1,45,15,83,54,83v105,0,135,-134,161,-226r33,-119v-157,-55,-245,132,-248,262xm662,-652v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":562},"\u0111":{"d":"348,0v-53,2,-68,-29,-57,-63v-32,41,-81,74,-139,74v-129,1,-140,-156,-102,-261v47,-132,167,-248,345,-215r15,-55r-159,0r17,-61r160,0r12,-42r-65,0r17,-59v52,0,91,-7,122,-7v57,0,12,75,8,108r58,0r-17,61r-59,0r-125,449v0,18,37,10,56,12r-16,59r-71,0xm129,-141v-1,45,15,83,54,83v105,0,135,-134,161,-226r33,-119v-157,-55,-245,132,-248,262","w":516},"\u00f0":{"d":"492,-414v0,159,-110,425,-291,425v-104,0,-167,-65,-167,-167v0,-150,106,-275,233,-275v54,0,100,26,126,59v14,-60,5,-126,-37,-152r-67,53r-30,-39r51,-41v-28,-12,-55,-18,-86,-23r11,-54v49,1,99,9,137,27r68,-55r31,38r-53,43v48,35,74,81,74,161xm375,-311v-93,-136,-246,-3,-246,162v0,60,26,98,73,98v80,0,139,-125,173,-260","w":512},"\u00e8":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm407,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":469},"\u00e9":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm392,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":469},"\u00ea":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm430,-498r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":469},"\u011b":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm470,-615r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":469},"\u00eb":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm460,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm306,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":469},"\u0113":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm441,-597r-14,52r-168,0r14,-52r168,0","w":469},"\u0115":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm459,-611v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":469},"\u0117":{"d":"30,-140v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-94,0,-144,-60,-144,-151xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0xm400,-577v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":469},"\u0119":{"d":"364,-87v-32,63,-135,86,-149,165v-6,36,56,39,81,24r-13,47v-59,27,-140,-2,-140,-62v0,-28,18,-57,50,-77v-104,9,-163,-53,-163,-150v0,-149,118,-331,275,-331v85,0,132,48,132,133v0,37,-14,95,-24,124r-275,0v-18,69,-16,161,63,161v52,0,95,-32,128,-69xm327,-268v18,-47,37,-141,-29,-141v-76,0,-117,77,-144,141r173,0","w":469},"\u011d":{"d":"481,-431v-55,173,-92,392,-177,529v-25,40,-89,125,-249,125r-14,-51v86,-6,137,-42,175,-94v31,-43,59,-113,65,-140v-32,36,-76,63,-129,63v-125,2,-141,-149,-102,-251v44,-116,144,-220,288,-221v60,0,116,23,143,40xm129,-151v-1,45,15,83,54,83v104,0,135,-126,162,-218r34,-117v-152,-51,-245,122,-250,252xm470,-507r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":504},"\u011f":{"d":"481,-431v-55,173,-92,392,-177,529v-25,40,-89,125,-249,125r-14,-51v86,-6,137,-42,175,-94v31,-43,59,-113,65,-140v-32,36,-76,63,-129,63v-125,2,-141,-149,-102,-251v44,-116,144,-220,288,-221v60,0,116,23,143,40xm129,-151v-1,45,15,83,54,83v104,0,135,-126,162,-218r34,-117v-152,-51,-245,122,-250,252xm489,-611v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":504},"\u0121":{"d":"481,-431v-55,173,-92,392,-177,529v-25,40,-89,125,-249,125r-14,-51v86,-6,137,-42,175,-94v31,-43,59,-113,65,-140v-32,36,-76,63,-129,63v-125,2,-141,-149,-102,-251v44,-116,144,-220,288,-221v60,0,116,23,143,40xm129,-151v-1,45,15,83,54,83v104,0,135,-126,162,-218r34,-117v-152,-51,-245,122,-250,252xm420,-577v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":504},"\u0123":{"d":"318,-544v-5,-49,78,-119,111,-169r23,14r-67,103v18,2,32,13,32,32v0,52,-93,87,-99,20xm481,-431v-55,173,-92,392,-177,529v-25,40,-89,125,-249,125r-14,-51v86,-6,137,-42,175,-94v31,-43,59,-113,65,-140v-32,36,-76,63,-129,63v-125,2,-141,-149,-102,-251v44,-116,144,-220,288,-221v60,0,116,23,143,40xm129,-151v-1,45,15,83,54,83v104,0,135,-126,162,-218r34,-117v-152,-51,-245,122,-250,252","w":504},"\u0125":{"d":"375,-471v106,0,109,113,83,206r-55,196v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-95,0r177,-623r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-67,239v34,-43,92,-76,144,-76xm393,-710r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":538},"\u0127":{"d":"113,-581r76,0r12,-42r-65,0r17,-59v52,0,91,-7,122,-7v57,0,12,75,8,108r139,0r-17,61r-140,0r-34,125v34,-43,92,-76,144,-76v106,0,109,113,83,206r-55,196v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-95,0r147,-520r-75,0","w":538},"\u0131":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7"},"\u00ec":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm291,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105"},"\u00ed":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm263,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25"},"\u00ee":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm306,-507r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11"},"\u0129":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm352,-622v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0"},"\u00ef":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm345,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm191,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34"},"\u012b":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm308,-597r-14,52r-168,0r14,-52r168,0"},"\u012d":{"d":"211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm337,-611v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0"},"\u012f":{"d":"7,87v0,-33,25,-68,71,-87v-43,-3,-43,-41,-33,-77r92,-322r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-96,341v1,17,39,8,57,10v-6,19,-9,42,-17,59v-43,0,-99,34,-99,78v-7,35,56,39,81,24r-13,47v-59,27,-140,-2,-140,-62xm284,-602v0,37,-39,71,-75,71v-24,0,-42,-15,-42,-40v0,-37,38,-72,74,-72v24,0,43,16,43,41"},"\u0133":{"d":"284,-602v0,37,-39,71,-75,71v-24,0,-42,-15,-42,-40v0,-37,38,-72,74,-72v24,0,43,16,43,41xm211,-465v35,0,30,30,23,55r-96,341v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v25,-127,68,-239,99,-361r-65,0r17,-59v52,0,91,-7,122,-7xm556,-602v0,37,-39,71,-75,71v-24,0,-42,-15,-42,-40v0,-37,38,-72,74,-72v24,0,43,16,43,41xm483,-465v35,0,30,30,23,55r-106,374v-31,110,-71,210,-208,241r-18,-47v79,-35,106,-97,137,-208r98,-349r-65,0r17,-59v52,0,91,-7,122,-7","w":540},"\u0135":{"d":"211,-465v35,0,30,30,23,55r-106,374v-31,110,-71,210,-208,241r-18,-47v79,-35,106,-97,137,-208r98,-349r-65,0r17,-59v52,0,91,-7,122,-7xm315,-507r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":268},"\u0137":{"d":"522,-458r-17,60r-59,0r-129,99r59,217v5,34,47,22,82,24r-17,58v-74,0,-136,9,-154,-58r-48,-181r-68,52r-52,187r-95,0r177,-623r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-99,350v68,-54,159,-113,213,-174r110,0xm257,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":518},"\u0138":{"d":"525,-458r-17,60r-59,0r-129,99r59,217v5,34,47,22,82,24r-17,58v-74,0,-136,9,-154,-58r-48,-181r-68,52r-52,187r-95,0r113,-399r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-35,126v68,-54,159,-113,213,-174r110,0","w":521},"\u013a":{"d":"273,-689v35,0,30,30,23,55r-159,565v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-12,4,-28,7,-39r155,-546r-65,0r17,-59v52,0,91,-7,122,-7xm349,-774v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":279},"\u013e":{"d":"273,-689v35,0,30,30,23,55r-159,565v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-12,4,-28,7,-39r155,-546r-65,0r17,-59v52,0,91,-7,122,-7xm417,-652v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":317},"\u013c":{"d":"273,-689v35,0,30,30,23,55r-159,565v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-12,4,-28,7,-39r155,-546r-65,0r17,-59v52,0,91,-7,122,-7xm126,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":279},"\u0142":{"d":"338,-470r-23,78r-100,42r-78,281v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-97,49,-176,71,-266r-107,46r22,-78r108,-46r68,-241r-65,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-59,207","w":279},"\u017f":{"d":"433,-678r-17,58v-90,-22,-124,19,-155,127r-122,431v-32,115,-57,180,-97,222v-27,28,-73,56,-119,63r-17,-49v45,-17,69,-44,84,-77v51,-111,107,-352,150,-496r-65,0r16,-59r66,0r9,-31v59,-184,123,-221,267,-189","w":283},"\u0140":{"d":"273,-689v35,0,30,30,23,55r-159,565v1,17,39,8,57,10r-16,59v-54,-3,-141,15,-141,-38v0,-12,4,-28,7,-39r155,-546r-65,0r17,-59v52,0,91,-7,122,-7xm351,-315v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":325},"\u0144":{"d":"377,-471v106,0,109,113,83,206r-54,196v1,17,38,8,56,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,92,-76,144,-76xm446,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":540},"\u0148":{"d":"377,-471v106,0,109,113,83,206r-54,196v1,17,38,8,56,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,92,-76,144,-76xm496,-616r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":540},"\u00f1":{"d":"377,-471v106,0,109,113,83,206r-54,196v1,17,38,8,56,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,92,-76,144,-76xm500,-622v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":540},"\u0146":{"d":"377,-471v106,0,109,113,83,206r-54,196v1,17,38,8,56,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,92,-76,144,-76xm253,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":540},"\u0149":{"d":"444,-471v106,0,109,113,83,206r-54,196v1,17,38,8,56,10r-16,59v-54,-3,-141,15,-141,-38v0,-104,77,-213,77,-313v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,92,-76,144,-76xm174,-584v0,80,-90,136,-128,195r-26,-16r77,-119v-20,-2,-37,-16,-37,-37v0,-33,32,-67,69,-67v26,0,45,14,45,44","w":607},"\u014b":{"d":"478,-364v0,115,-55,222,-82,327v-32,123,-91,175,-210,202r-18,-47v76,-35,109,-65,137,-168r61,-221v12,-44,16,-63,16,-80v0,-76,-90,-41,-123,-11v-64,58,-103,252,-138,362r-94,0r113,-399r-66,0r17,-59v52,0,91,-7,122,-7v44,-1,23,46,20,70v34,-43,92,-76,144,-76v64,0,101,41,101,107","w":530},"\u00f2":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm419,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":478},"\u00f3":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm373,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":478},"\u00f4":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm424,-507r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":478},"\u00f5":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm462,-622v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":478},"\u00f6":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm454,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm300,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":478},"\u014d":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm427,-597r-14,52r-168,0r14,-52r168,0","w":478},"\u014f":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm443,-611v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":478},"\u0151":{"d":"34,-146v0,-171,102,-325,261,-325v98,0,149,61,149,157v0,171,-102,325,-261,325v-98,0,-149,-61,-149,-157xm191,-51v103,0,155,-181,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85xm472,-559v-54,-3,-102,29,-136,58r-13,-14v28,-29,95,-103,137,-103v33,-1,20,38,12,59xm322,-559v-54,-3,-102,29,-136,58r-13,-14v28,-28,95,-103,137,-103v33,-1,20,38,12,59","w":478},"\u00f8":{"d":"33,-146v0,-171,102,-325,261,-325v35,0,64,8,87,22r59,-74r63,0r-86,109v17,26,26,60,26,100v0,171,-102,325,-261,325v-34,0,-62,-7,-85,-21r-57,71r-64,0r84,-106v-18,-26,-27,-60,-27,-101xm286,-409v-103,-2,-156,181,-156,276r202,-254v-10,-15,-25,-22,-46,-22xm190,-51v103,3,155,-181,156,-274r-201,253v10,14,25,21,45,21","w":479},"\u01ff":{"d":"33,-146v0,-171,102,-325,261,-325v35,0,64,8,87,22r59,-74r63,0r-86,109v17,26,26,60,26,100v0,171,-102,325,-261,325v-34,0,-62,-7,-85,-21r-57,71r-64,0r84,-106v-18,-26,-27,-60,-27,-101xm286,-409v-103,-2,-156,181,-156,276r202,-254v-10,-15,-25,-22,-46,-22xm190,-51v103,3,155,-181,156,-274r-201,253v10,14,25,21,45,21xm398,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":478},"\u0153":{"d":"34,-146v0,-171,102,-325,261,-325v67,0,112,28,134,77v43,-44,105,-77,167,-77v85,0,132,48,132,133v0,37,-14,95,-24,124r-274,0v-19,62,-17,162,62,161v52,0,95,-32,128,-69r35,35v-44,60,-114,98,-190,98v-61,0,-104,-26,-126,-68v-42,40,-95,68,-156,68v-98,0,-149,-61,-149,-157xm618,-268v16,-48,38,-131,-29,-141v-76,7,-117,77,-144,141r173,0xm191,-51v104,0,156,-162,156,-273v0,-55,-18,-85,-60,-85v-103,0,-155,181,-156,273v0,55,18,85,60,85","w":760},"\u00fe":{"d":"222,-395v28,-41,82,-76,140,-76v129,0,140,156,102,261v-48,132,-167,248,-347,215r-45,160v-10,35,-24,58,-71,58r-98,0r17,-61v26,0,57,3,63,-18r219,-767r-75,0r17,-59v52,0,92,-7,123,-7v35,0,30,30,23,55xm136,-57v157,55,246,-132,249,-262v1,-45,-15,-83,-54,-83v-106,0,-136,134,-162,226","w":518},"\u0155":{"d":"352,-469v58,0,32,56,21,86v-124,-22,-161,63,-193,177r-58,206r-95,0r113,-399r-65,0r17,-59v52,0,88,-6,119,-6v42,-1,28,50,20,78v24,-42,72,-83,121,-83xm358,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":349,"k":{"a":12,"\u00e0":12,"\u00e1":12,"\u00e2":12,"\u00e3":12,"\u00e4":12,"\u0101":12,"\u0103":12,"\u00e5":12,"\u01fb":12,"\u0105":12,"\u00e6":12,"\u01fd":12,"e":6,"\u00e8":6,"\u00e9":6,"\u00ea":6,"\u011b":6,"\u00eb":6,"\u0113":6,"\u0115":6,"\u0117":6,"\u0119":6,"o":6,"\u00f2":6,"\u00f3":6,"\u00f4":6,"\u00f5":6,"\u00f6":6,"\u014d":6,"\u014f":6,"\u0151":6,"\u00f8":6,"\u01ff":6,"\u0153":6}},"\u0159":{"d":"352,-469v58,0,32,56,21,86v-124,-22,-161,63,-193,177r-58,206r-95,0r113,-399r-65,0r17,-59v52,0,88,-6,119,-6v42,-1,28,50,20,78v24,-42,72,-83,121,-83xm415,-615r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":349,"k":{"a":12,"\u00e0":12,"\u00e1":12,"\u00e2":12,"\u00e3":12,"\u00e4":12,"\u0101":12,"\u0103":12,"\u00e5":12,"\u01fb":12,"\u0105":12,"\u00e6":12,"\u01fd":12,"e":6,"\u00e8":6,"\u00e9":6,"\u00ea":6,"\u011b":6,"\u00eb":6,"\u0113":6,"\u0115":6,"\u0117":6,"\u0119":6,"o":6,"\u00f2":6,"\u00f3":6,"\u00f4":6,"\u00f5":6,"\u00f6":6,"\u014d":6,"\u014f":6,"\u0151":6,"\u00f8":6,"\u01ff":6,"\u0153":6}},"\u0157":{"d":"352,-469v58,0,32,56,21,86v-124,-22,-161,63,-193,177r-58,206r-95,0r113,-399r-65,0r17,-59v52,0,88,-6,119,-6v42,-1,28,50,20,78v24,-42,72,-83,121,-83xm100,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":349,"k":{"a":12,"\u00e0":12,"\u00e1":12,"\u00e2":12,"\u00e3":12,"\u00e4":12,"\u0101":12,"\u0103":12,"\u00e5":12,"\u01fb":12,"\u0105":12,"\u00e6":12,"\u01fd":12,"e":6,"\u00e8":6,"\u00e9":6,"\u00ea":6,"\u011b":6,"\u00eb":6,"\u0113":6,"\u0115":6,"\u0117":6,"\u0119":6,"o":6,"\u00f2":6,"\u00f3":6,"\u00f4":6,"\u00f5":6,"\u00f6":6,"\u014d":6,"\u014f":6,"\u0151":6,"\u00f8":6,"\u01ff":6,"\u0153":6}},"\u015b":{"d":"326,-322v4,-56,-26,-90,-75,-91v-42,0,-77,24,-77,70v0,72,176,78,176,199v0,87,-75,155,-175,155v-38,0,-92,-10,-113,-45r-11,34r-53,0r42,-157v31,-2,63,-4,50,35v-5,50,41,72,84,72v42,0,83,-25,83,-74v0,-72,-175,-74,-175,-198v0,-89,75,-149,161,-149v39,0,86,9,109,45r11,-32r52,0r-39,153v-21,-1,-52,6,-50,-17xm358,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":415},"\u015d":{"d":"326,-322v4,-56,-26,-90,-75,-91v-42,0,-77,24,-77,70v0,72,176,78,176,199v0,87,-75,155,-175,155v-38,0,-92,-10,-113,-45r-11,34r-53,0r42,-157v31,-2,63,-4,50,35v-5,50,41,72,84,72v42,0,83,-25,83,-74v0,-72,-175,-74,-175,-198v0,-89,75,-149,161,-149v39,0,86,9,109,45r11,-32r52,0r-39,153v-21,-1,-52,6,-50,-17xm398,-506r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":415},"\u0161":{"d":"326,-322v4,-56,-26,-90,-75,-91v-42,0,-77,24,-77,70v0,72,176,78,176,199v0,87,-75,155,-175,155v-38,0,-92,-10,-113,-45r-11,34r-53,0r42,-157v31,-2,63,-4,50,35v-5,50,41,72,84,72v42,0,83,-25,83,-74v0,-72,-175,-74,-175,-198v0,-89,75,-149,161,-149v39,0,86,9,109,45r11,-32r52,0r-39,153v-21,-1,-52,6,-50,-17xm425,-615r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":415},"\u015f":{"d":"326,-322v4,-56,-26,-90,-75,-91v-42,0,-77,24,-77,70v0,72,176,78,176,199v0,88,-76,156,-177,155r-16,26v35,-15,75,6,75,45v0,40,-31,79,-88,79v-28,0,-54,-8,-69,-18r13,-36v21,20,85,20,83,-18v-2,-25,-33,-26,-48,-12r-29,-13r34,-58v-27,-6,-53,-18,-66,-40r-11,34r-53,0r42,-157v31,-2,63,-4,50,35v-5,50,41,72,84,72v42,0,83,-25,83,-74v0,-72,-175,-74,-175,-198v0,-89,75,-149,161,-149v39,0,86,9,109,45r11,-32r52,0r-39,153v-21,-1,-52,6,-50,-17","w":415},"\u0219":{"d":"326,-322v4,-56,-26,-90,-75,-91v-42,0,-77,24,-77,70v0,72,176,78,176,199v0,87,-75,155,-175,155v-38,0,-92,-10,-113,-45r-11,34r-53,0r42,-157v31,-2,63,-4,50,35v-5,50,41,72,84,72v42,0,83,-25,83,-74v0,-72,-175,-74,-175,-198v0,-89,75,-149,161,-149v39,0,86,9,109,45r11,-32r52,0r-39,153v-21,-1,-52,6,-50,-17xm187,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":415},"\u00df":{"d":"538,-579v0,147,-186,141,-186,233v0,72,176,83,176,204v0,87,-77,155,-177,155v-38,0,-95,-13,-114,-47r-11,34r-53,0r42,-156v21,1,57,-6,52,16v-13,61,33,92,83,92v42,0,85,-25,85,-74v0,-72,-175,-76,-175,-200v0,-149,187,-137,187,-245v0,-39,-29,-57,-59,-57v-55,0,-98,40,-119,113r-146,511r-147,0r16,-58r53,0r98,-341r-67,0r17,-59r63,0r13,-46v36,-129,122,-187,228,-187v76,0,141,44,141,112","w":561},"\u0165":{"d":"421,-663v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20xm330,-458r-17,59r-93,0r-67,239v-11,38,-15,61,-15,71v0,48,76,28,106,19r-18,64v-16,6,-62,18,-91,18v-57,0,-95,-25,-95,-84v0,-106,60,-226,85,-327r-59,0r17,-59r58,0r31,-106r95,0r-30,106r93,0","w":321},"\u0163":{"d":"330,-458r-17,59r-93,0r-67,239v-11,38,-15,61,-15,71v0,48,76,28,106,19r-18,64v-16,6,-62,18,-91,18v-57,0,-95,-25,-95,-84v0,-106,60,-226,85,-327r-59,0r17,-59r58,0r31,-106r95,0r-30,106r93,0xm149,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":321,"k":{"y":8,"c":6,"a":2,"\u00e0":2,"\u00e1":2,"\u00e2":2,"\u00e3":2,"\u00e4":2,"\u0101":2,"\u0103":2,"\u00e5":2,"\u01fb":2,"\u0105":2,"\u00e6":2,"\u01fd":2,"e":15,"\u00e8":15,"\u00e9":15,"\u00ea":15,"\u011b":15,"\u00eb":15,"\u0113":15,"\u0115":15,"\u0117":15,"\u0119":15,"o":9,"\u00f2":9,"\u00f3":9,"\u00f4":9,"\u00f5":9,"\u00f6":9,"\u014d":9,"\u014f":9,"\u0151":9,"\u00f8":9,"\u01ff":9,"\u0153":9,"u":8,"\u00f9":8,"\u00fa":8,"\u00fb":8,"\u0169":8,"\u00fc":8,"\u016b":8,"\u016d":8,"\u016f":8,"\u0171":8,"\u0173":8}},"\u021b":{"d":"330,-458r-17,59r-93,0r-67,239v-11,38,-15,61,-15,71v0,48,76,28,106,19r-18,64v-16,6,-62,18,-91,18v-57,0,-95,-25,-95,-84v0,-106,60,-226,85,-327r-59,0r17,-59r58,0r31,-106r95,0r-30,106r93,0xm149,87v5,49,-78,119,-111,169r-23,-14r67,-103v-18,-2,-32,-13,-32,-32v0,-52,93,-87,99,-20","w":321,"k":{"y":8,"c":6,"a":2,"\u00e0":2,"\u00e1":2,"\u00e2":2,"\u00e3":2,"\u00e4":2,"\u0101":2,"\u0103":2,"\u00e5":2,"\u01fb":2,"\u0105":2,"\u00e6":2,"\u01fd":2,"e":15,"\u00e8":15,"\u00e9":15,"\u00ea":15,"\u011b":15,"\u00eb":15,"\u0113":15,"\u0115":15,"\u0117":15,"\u0119":15,"o":9,"\u00f2":9,"\u00f3":9,"\u00f4":9,"\u00f5":9,"\u00f6":9,"\u014d":9,"\u014f":9,"\u0151":9,"\u00f8":9,"\u01ff":9,"\u0153":9,"u":8,"\u00f9":8,"\u00fa":8,"\u00fb":8,"\u0169":8,"\u00fc":8,"\u016b":8,"\u016d":8,"\u016f":8,"\u0171":8,"\u0173":8}},"\u0167":{"d":"41,-286r52,0r32,-113r-59,0r17,-59r58,0r31,-106r95,0r-30,106r93,0r-17,59r-93,0r-32,113r96,0r-17,61r-96,0r-18,65v-11,38,-15,61,-15,71v0,48,76,28,106,19r-18,64v-16,6,-62,18,-91,18v-57,0,-95,-25,-95,-84v-1,-37,25,-110,36,-153r-52,0","w":321,"k":{"y":8,"c":6,"a":2,"\u00e0":2,"\u00e1":2,"\u00e2":2,"\u00e3":2,"\u00e4":2,"\u0101":2,"\u0103":2,"\u00e5":2,"\u01fb":2,"\u0105":2,"\u00e6":2,"\u01fd":2,"e":15,"\u00e8":15,"\u00e9":15,"\u00ea":15,"\u011b":15,"\u00eb":15,"\u0113":15,"\u0115":15,"\u0117":15,"\u0119":15,"o":9,"\u00f2":9,"\u00f3":9,"\u00f4":9,"\u00f5":9,"\u00f6":9,"\u014d":9,"\u014f":9,"\u0151":9,"\u00f8":9,"\u01ff":9,"\u0153":9,"u":8,"\u00f9":8,"\u00fa":8,"\u00fb":8,"\u0169":8,"\u00fc":8,"\u016b":8,"\u016d":8,"\u016f":8,"\u0171":8,"\u0173":8}},"\u00f9":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm413,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":531},"\u00fa":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm424,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":531},"\u00fb":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm432,-507r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":531},"\u0169":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm467,-622v-18,53,-48,95,-101,95v-31,0,-51,-35,-84,-35v-21,0,-36,12,-48,35r-36,0v21,-65,58,-95,101,-95v41,0,58,35,84,35v22,0,37,-9,53,-35r31,0","w":531},"\u00fc":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm453,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm299,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":531},"\u016b":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm433,-597r-14,52r-168,0r14,-52r168,0","w":531},"\u016d":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm452,-611v-15,52,-59,101,-124,101v-53,1,-91,-44,-77,-101r34,0v0,33,20,54,52,54v34,0,63,-22,79,-54r36,0","w":531},"\u016f":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm426,-593v0,51,-42,102,-103,102v-41,0,-69,-22,-69,-61v0,-51,42,-102,103,-102v41,0,69,22,69,61xm386,-588v0,-25,-15,-36,-33,-36v-36,0,-59,37,-59,67v0,25,15,36,33,36v36,0,59,-37,59,-67","w":531},"\u0171":{"d":"470,-465v35,0,30,30,23,55r-96,341v3,19,38,6,57,10r-16,59v-65,1,-168,14,-137,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7xm482,-559v-54,-3,-102,29,-136,58r-13,-14v28,-29,95,-103,137,-103v33,-1,20,38,12,59xm332,-559v-54,-3,-102,29,-136,58r-13,-14v28,-28,95,-103,137,-103v33,-1,20,38,12,59","w":531},"\u0173":{"d":"266,87v0,-33,25,-68,70,-87v-41,1,-44,-39,-35,-65v-34,43,-92,76,-144,76v-64,0,-101,-41,-101,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v6,75,93,44,123,11v54,-38,93,-206,120,-301r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55r-96,341v3,19,38,6,57,10v-6,19,-9,42,-17,59v-43,0,-99,34,-99,78v-7,35,56,39,81,24r-13,47v-59,27,-140,-2,-140,-62","w":531},"\u1e81":{"d":"717,-458r-273,458r-83,0r-8,-274r-159,274r-83,0r-11,-399r-62,0r17,-59v45,0,65,-7,97,-7v36,0,38,14,39,72r3,282r180,-347r65,0r5,347r180,-347r93,0xm501,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":690,"k":{"y":2,"a":18,"\u00e0":18,"\u00e1":18,"\u00e2":18,"\u00e3":18,"\u00e4":18,"\u0101":18,"\u0103":18,"\u00e5":18,"\u01fb":18,"\u0105":18,"\u00e6":18,"\u01fd":18,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"o":13,"\u00f2":13,"\u00f3":13,"\u00f4":13,"\u00f5":13,"\u00f6":13,"\u014d":13,"\u014f":13,"\u0151":13,"\u00f8":13,"\u01ff":13,"\u0153":13,"u":5,"\u00f9":5,"\u00fa":5,"\u00fb":5,"\u0169":5,"\u00fc":5,"\u016b":5,"\u016d":5,"\u016f":5,"\u0171":5,"\u0173":5}},"\u1e83":{"d":"717,-458r-273,458r-83,0r-8,-274r-159,274r-83,0r-11,-399r-62,0r17,-59v45,0,65,-7,97,-7v36,0,38,14,39,72r3,282r180,-347r65,0r5,347r180,-347r93,0xm512,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":690,"k":{"y":2,"a":18,"\u00e0":18,"\u00e1":18,"\u00e2":18,"\u00e3":18,"\u00e4":18,"\u0101":18,"\u0103":18,"\u00e5":18,"\u01fb":18,"\u0105":18,"\u00e6":18,"\u01fd":18,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"o":13,"\u00f2":13,"\u00f3":13,"\u00f4":13,"\u00f5":13,"\u00f6":13,"\u014d":13,"\u014f":13,"\u0151":13,"\u00f8":13,"\u01ff":13,"\u0153":13,"u":5,"\u00f9":5,"\u00fa":5,"\u00fb":5,"\u0169":5,"\u00fc":5,"\u016b":5,"\u016d":5,"\u016f":5,"\u0171":5,"\u0173":5}},"\u0175":{"d":"717,-458r-273,458r-83,0r-8,-274r-159,274r-83,0r-11,-399r-62,0r17,-59v45,0,65,-7,97,-7v36,0,38,14,39,72r3,282r180,-347r65,0r5,347r180,-347r93,0xm543,-507r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":690},"\u1e85":{"d":"717,-458r-273,458r-83,0r-8,-274r-159,274r-83,0r-11,-399r-62,0r17,-59v45,0,65,-7,97,-7v36,0,38,14,39,72r3,282r180,-347r65,0r5,347r180,-347r93,0xm558,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm404,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":690,"k":{"y":2,"a":18,"\u00e0":18,"\u00e1":18,"\u00e2":18,"\u00e3":18,"\u00e4":18,"\u0101":18,"\u0103":18,"\u00e5":18,"\u01fb":18,"\u0105":18,"\u00e6":18,"\u01fd":18,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"o":13,"\u00f2":13,"\u00f3":13,"\u00f4":13,"\u00f5":13,"\u00f6":13,"\u014d":13,"\u014f":13,"\u0151":13,"\u00f8":13,"\u01ff":13,"\u0153":13,"u":5,"\u00f9":5,"\u00fa":5,"\u00fb":5,"\u0169":5,"\u00fc":5,"\u016b":5,"\u016d":5,"\u016f":5,"\u0171":5,"\u0173":5}},"\u1ef3":{"d":"470,-465v35,0,30,30,23,55v-51,163,-89,381,-167,508v-24,40,-90,125,-250,125r-17,-51v150,-7,205,-124,241,-237v-29,38,-86,76,-144,76v-64,0,-100,-41,-100,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v5,75,92,44,122,11v55,-39,94,-205,121,-301r-64,0r17,-59v52,0,91,-7,122,-7xm401,-513r-21,14v-28,-27,-73,-58,-134,-58v1,-30,6,-61,39,-61v40,0,94,51,116,105","w":519},"\u00fd":{"d":"470,-465v35,0,30,30,23,55v-51,163,-89,381,-167,508v-24,40,-90,125,-250,125r-17,-51v150,-7,205,-124,241,-237v-29,38,-86,76,-144,76v-64,0,-100,-41,-100,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v5,75,92,44,122,11v55,-39,94,-205,121,-301r-64,0r17,-59v52,0,91,-7,122,-7xm419,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":519},"\u0177":{"d":"470,-465v35,0,30,30,23,55v-51,163,-89,381,-167,508v-24,40,-90,125,-250,125r-17,-51v150,-7,205,-124,241,-237v-29,38,-86,76,-144,76v-64,0,-100,-41,-100,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v5,75,92,44,122,11v55,-39,94,-205,121,-301r-64,0r17,-59v52,0,91,-7,122,-7xm432,-507r-41,0r-50,-63v-2,-5,-9,-3,-12,0r-90,63r-40,0r114,-107v15,-16,26,-10,49,-11v9,0,13,3,17,11","w":519},"\u00ff":{"d":"470,-465v35,0,30,30,23,55v-51,163,-89,381,-167,508v-24,40,-90,125,-250,125r-17,-51v150,-7,205,-124,241,-237v-29,38,-86,76,-144,76v-64,0,-100,-41,-100,-107v0,-110,52,-204,76,-303r-64,0r17,-59v52,0,91,-7,122,-7v35,0,30,30,23,55v-24,96,-63,201,-78,301v5,75,92,44,122,11v55,-39,94,-205,121,-301r-64,0r17,-59v52,0,91,-7,122,-7xm466,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34xm312,-594v0,32,-34,61,-65,61v-21,0,-36,-13,-36,-34v0,-32,33,-61,64,-61v20,0,37,13,37,34","w":519},"\u017a":{"d":"468,-458v-6,50,-20,64,-60,105r-288,291r141,0v41,-1,40,-49,58,-74r56,0r-39,136r-340,0v-2,-51,38,-83,61,-107r284,-289r-134,0v-34,-3,-44,51,-59,74r-56,0r39,-136r337,0xm400,-557v-61,0,-106,31,-134,58r-21,-14v22,-54,76,-105,116,-105v16,0,33,5,35,25","w":459},"\u017e":{"d":"468,-458v-6,50,-20,64,-60,105r-288,291r141,0v41,-1,40,-49,58,-74r56,0r-39,136r-340,0v-2,-51,38,-83,61,-107r284,-289r-134,0v-34,-3,-44,51,-59,74r-56,0r39,-136r337,0xm444,-615r-114,107v-15,16,-26,10,-49,11v-9,0,-13,-3,-17,-11r-53,-107r41,0r50,63v2,5,9,3,12,0r90,-63r40,0","w":459},"\u017c":{"d":"468,-458v-6,50,-20,64,-60,105r-288,291r141,0v41,-1,40,-49,58,-74r56,0r-39,136r-340,0v-2,-51,38,-83,61,-107r284,-289r-134,0v-34,-3,-44,51,-59,74r-56,0r39,-136r337,0xm381,-578v0,37,-40,71,-76,71v-24,0,-42,-15,-42,-40v0,-37,37,-72,74,-72v24,0,44,16,44,41","w":459},"\uf8ff":{"d":"426,-189r-245,0r0,-60r184,0r0,-63r-184,0r0,-182r245,0r0,61r-183,0r0,60r183,0r0,184xm426,-556r-305,0r0,495r68,0r0,61r-129,0r0,-616r366,0r0,60","w":486}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Trademark:
 * FS Clerkenwell Light is a trademark of Fontsmith Ltd.
 * 
 * Full name:
 * FSClerkenwell-Light
 * 
 * Description:
 * Copyright (c) 2009 by Fontsmith Ltd. All rights reserved.
 * 
 * Manufacturer:
 * Fontsmith Ltd
 * 
 * Designer:
 * Phil Garnham and Jason Smith
 * 
 * Vendor URL:
 * http://www.fontsmith.com/
 * 
 * License information:
 * http://www.fontsmith.com
 */
Cufon.registerFont({"w":448,"face":{"font-family":"FS Clerkenwell Light","font-weight":300,"font-stretch":"normal","units-per-em":"1000","panose-1":"2 0 3 6 8 0 0 2 0 4","ascent":"730","descent":"-270","x-height":"13","bbox":"-50 -870 1000 260","underline-thickness":"20","underline-position":"-113","stemh":"44","stemv":"60","unicode-range":"U+0020-U+FB02"},"glyphs":{" ":{"w":190},"\ufb01":{"d":"387,-606v0,21,-16,39,-37,39v-21,0,-38,-18,-38,-39v0,-21,17,-38,38,-38v21,0,37,17,37,38xm435,0r-160,0r0,-39r49,0r0,-380r-171,0r0,362v-4,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-79,0r0,-39r72,0v-14,-29,-27,-70,-27,-109v-2,-139,162,-150,248,-86r-19,37v-28,-18,-59,-30,-91,-30v-102,-2,-81,129,-47,188r107,0v60,0,73,-5,104,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39","w":469},"\ufb02":{"d":"93,-510v-6,-115,50,-181,148,-181v46,0,81,14,107,41v31,32,36,84,36,132r0,462v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-467v0,-56,-4,-82,-15,-102v-13,-23,-32,-37,-68,-37v-86,-2,-93,88,-88,187r87,0r0,39r-87,0r0,362v-4,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-79,0r0,-39r79,0r0,-52","w":470},"\u00a0":{"w":190},"A":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"B":{"d":"208,-616v148,-6,238,25,238,145v0,57,-26,112,-78,136v79,26,115,79,115,160v0,105,-61,175,-199,175r-231,0r0,-44r53,0r0,-503v7,-28,-29,-26,-56,-25r0,-44r158,0xm382,-466v0,-121,-102,-105,-212,-106r0,218r116,0v64,0,96,-46,96,-112xm417,-177v0,-86,-60,-141,-157,-133r-90,0r0,244v0,39,67,22,102,22v113,0,145,-63,145,-133","w":524},"C":{"d":"273,11v-172,0,-230,-119,-230,-320v0,-204,91,-319,229,-319v52,0,97,21,122,52r9,-39r36,0r0,181v-22,0,-47,4,-47,-18v0,-75,-38,-127,-119,-127v-102,0,-164,97,-164,270v0,179,53,272,167,272v57,0,108,-27,144,-61r25,32v-36,41,-105,77,-172,77","w":486},"D":{"d":"215,-616v242,-11,316,106,316,323v0,189,-71,308,-282,293r-196,0r0,-44r53,0r0,-503v5,-32,-29,-24,-56,-25r0,-44r165,0xm465,-294v0,-180,-49,-287,-250,-278r-45,0r0,505v0,39,56,23,90,23v168,0,205,-90,205,-250","w":571},"E":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157","w":517},"F":{"d":"449,-451v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v-3,31,29,23,56,24r0,44r-173,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0","w":481,"k":{"J":8,"A":50,"\u00c0":50,"\u00c1":50,"\u00c2":50,"\u00c3":50,"\u00c4":50,"\u0100":50,"\u0102":50,"\u00c5":50,"\u01fa":50,"\u0104":50,"\u00c6":50,"\u01fc":50,"a":25,"\u00e0":25,"\u00e1":25,"\u00e2":25,"\u00e3":25,"\u00e4":25,"\u0101":25,"\u0103":25,"\u00e5":25,"\u01fb":25,"\u0105":25,"\u00e6":25,"\u01fd":25,"e":26,"\u00e8":26,"\u00e9":26,"\u00ea":26,"\u011b":26,"\u00eb":26,"\u0113":26,"\u0115":26,"\u0117":26,"\u0119":26,"o":22,"\u00f2":22,"\u00f3":22,"\u00f4":22,"\u00f5":22,"\u00f6":22,"\u014d":22,"\u014f":22,"\u0151":22,"\u00f8":22,"\u01ff":22,"\u0153":22}},"G":{"d":"515,-220r-53,0r0,220r-45,0r-12,-35v-27,24,-82,46,-134,46v-142,0,-228,-97,-228,-315v0,-207,86,-324,234,-324v57,0,107,22,134,55r11,-42r34,0r0,183v-21,0,-44,3,-44,-18v0,-74,-47,-130,-133,-130v-109,0,-170,100,-170,273v0,176,56,270,168,270v49,0,96,-23,121,-45r0,-116v5,-28,-31,-21,-56,-22r0,-44r173,0r0,44","w":552},"H":{"d":"563,0r-173,0r0,-44r53,0r0,-247r-273,0r0,224v-4,29,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,230r273,0r0,-207v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44","w":613},"I":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44","w":276},"J":{"d":"133,-37v90,0,107,-59,107,-160r0,-351v0,-19,-4,-24,-24,-24r-155,0r-9,-44r252,0r0,418v9,143,-47,208,-166,209v-40,0,-85,-12,-108,-22r0,-47v32,12,72,21,103,21","w":384},"K":{"d":"533,0r-107,0r-190,-309r-66,81r0,166v-1,24,33,17,56,18r0,44r-173,0r0,-44r53,0r0,-503v7,-30,-30,-25,-56,-25r0,-44r173,0r0,44r-53,0r0,268r180,-222v26,-32,46,-66,52,-90r116,0r0,44v-48,1,-65,-5,-94,31r-148,183r176,287v17,32,41,27,81,27r0,44","w":560},"L":{"d":"456,0r-403,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r173,0r0,44r-53,0r0,504v0,19,8,24,26,24r199,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157","w":484},"M":{"d":"710,0r-167,0r0,-44r53,0r0,-428r-192,472r-50,0r-191,-464r0,399v-3,29,32,19,56,21r0,44r-163,0r0,-44r53,0r0,-506v3,-29,-31,-21,-56,-22r0,-44r110,0r220,535r218,-535r106,0r0,44r-53,0r0,502v-5,34,29,25,56,26r0,44","w":758},"N":{"d":"581,-572r-53,0r0,572r-49,0r-319,-495r0,432v-2,26,33,18,56,19r0,44r-161,0r0,-44r53,0r0,-506v3,-30,-31,-20,-56,-22r0,-44r102,0r320,496r0,-428v5,-28,-30,-24,-56,-24r0,-44r163,0r0,44","w":626},"O":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271","w":530},"P":{"d":"245,-616v156,-8,238,52,238,180v0,162,-120,199,-313,189r0,181v-2,29,31,21,56,22r0,44r-173,0r0,-44r53,0r0,-500v5,-32,-27,-28,-56,-28r0,-44r195,0xm417,-436v5,-131,-110,-142,-247,-136r0,281r56,0v143,5,187,-38,191,-145","w":513},"Q":{"d":"486,-309v0,162,-57,320,-222,320v-36,0,-66,-7,-92,-20v-20,11,-33,33,-33,65v0,50,39,76,108,76v61,0,135,-27,195,-38r0,39v-78,19,-137,45,-219,45v-85,0,-142,-43,-142,-117v0,-39,19,-76,54,-95v-66,-58,-91,-164,-91,-274v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271","w":530},"R":{"d":"475,-446v0,95,-52,163,-150,174r114,202v13,32,41,25,80,26r0,44r-111,0r-150,-267r-88,0r0,199v-1,36,29,21,56,24r0,44r-173,0r0,-44r53,0r0,-501v8,-29,-28,-29,-56,-27r0,-44r177,0v172,-4,248,30,248,170xm357,-332v59,-38,78,-170,6,-219v-20,-24,-118,-21,-193,-21r0,260v66,0,164,3,187,-20","w":545},"S":{"d":"446,-159v0,177,-232,217,-342,116r-14,43r-36,0r0,-181v20,0,38,-3,40,17v7,84,82,129,159,129v82,0,131,-51,131,-110v0,-82,-56,-110,-168,-147v-85,-28,-164,-67,-164,-170v0,-163,233,-223,323,-104r8,-49r35,0r0,181v-21,0,-40,2,-42,-18v-13,-78,-54,-133,-138,-132v-70,0,-124,40,-124,109v0,70,54,96,142,127v93,33,190,70,190,189","w":482},"T":{"d":"505,-464v-22,0,-40,4,-43,-18v-14,-35,-1,-90,-58,-90r-107,0r0,505v-3,30,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-528r-107,0v-57,-7,-43,55,-58,90v-3,22,-21,18,-43,18r7,-152r466,0","w":530,"k":{".":44}},"U":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197","w":586},"V":{"d":"563,-572v-39,3,-71,-11,-83,28r-167,544r-65,0r-162,-545v-6,-32,-37,-27,-72,-27r0,-44r187,0r0,44r-60,0r145,493r152,-493r-62,0r0,-44r187,0r0,44","w":571,"k":{".":142,"A":72,"\u00c0":72,"\u00c1":72,"\u00c2":72,"\u00c3":72,"\u00c4":72,"\u0100":72,"\u0102":72,"\u00c5":72,"\u01fa":72,"\u0104":72,"\u00c6":72,"\u01fc":72,"a":69,"\u00e0":69,"\u00e1":69,"\u00e2":69,"\u00e3":69,"\u00e4":69,"\u0101":69,"\u0103":69,"\u00e5":69,"\u01fb":69,"\u0105":69,"\u00e6":69,"\u01fd":69,"e":67,"\u00e8":67,"\u00e9":67,"\u00ea":67,"\u011b":67,"\u00eb":67,"\u0113":67,"\u0115":67,"\u0117":67,"\u0119":67,"o":71,"\u00f2":71,"\u00f3":71,"\u00f4":71,"\u00f5":71,"\u00f6":71,"\u014d":71,"\u014f":71,"\u0151":71,"\u00f8":71,"\u01ff":71,"\u0153":71,"C":13,"\u0106":13,"\u00c7":13,"\u0108":13,"\u010c":13,"\u010a":13,"G":10,"\u011c":10,"\u011e":10,"\u0120":10,"\u0122":10,"O":11,"\u00d2":11,"\u00d3":11,"\u00d4":11,"\u00d5":11,"\u00d6":11,"\u014c":11,"\u014e":11,"\u0150":11,"\u00d8":11,"\u01fe":11,"\u0152":11,"i":14,"\u0131":14,"\u00ec":14,"\u00ed":14,"\u00ee":14,"\u0129":14,"\u00ef":14,"\u012b":14,"\u012d":14,"\u012f":14,"\u0133":14,"u":32,"\u00f9":32,"\u00fa":32,"\u00fb":32,"\u0169":32,"\u00fc":32,"\u016b":32,"\u016d":32,"\u016f":32,"\u0171":32,"\u0173":32}},"W":{"d":"837,-572v-35,2,-69,-8,-78,26r-140,546r-74,0r-125,-477r-130,477r-68,0r-139,-551v-1,-26,-40,-20,-69,-21r0,-44r183,0r0,44r-57,0r123,486r145,-530r35,0r144,548r128,-504r-59,0r0,-44r181,0r0,44","w":845,"k":{"a":57,"\u00e0":57,"\u00e1":57,"\u00e2":57,"\u00e3":57,"\u00e4":57,"\u0101":57,"\u0103":57,"\u00e5":57,"\u01fb":57,"\u0105":57,"\u00e6":57,"\u01fd":57,"e":52,"\u00e8":52,"\u00e9":52,"\u00ea":52,"\u011b":52,"\u00eb":52,"\u0113":52,"\u0115":52,"\u0117":52,"\u0119":52,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12,"o":48,"\u00f2":48,"\u00f3":48,"\u00f4":48,"\u00f5":48,"\u00f6":48,"\u014d":48,"\u014f":48,"\u0151":48,"\u00f8":48,"\u01ff":48,"\u0153":48,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24,"A":69,"\u00c0":69,"\u00c1":69,"\u00c2":69,"\u00c3":69,"\u00c4":69,"\u0100":69,"\u0102":69,"\u00c5":69,"\u01fa":69,"\u0104":69,"\u00c6":69,"\u01fc":69,"O":5,"\u00d2":5,"\u00d3":5,"\u00d4":5,"\u00d5":5,"\u00d6":5,"\u014c":5,"\u014e":5,"\u0150":5,"\u00d8":5,"\u01fe":5,"\u0152":5}},"X":{"d":"576,0r-210,0r0,-44r65,0r-130,-214r-122,214r64,0r0,44r-205,0r0,-44v43,0,90,6,101,-27r133,-232r-145,-240v-15,-36,-49,-28,-95,-29r0,-44r209,0r0,44r-61,0r130,217r123,-217r-64,0r0,-44r203,0r0,44v-47,2,-79,-8,-101,30r-132,232r146,238v13,33,48,28,91,28r0,44","w":592},"Y":{"d":"545,-572v-49,2,-70,-8,-92,36r-148,300r0,172v-2,28,32,18,56,20r0,44r-173,0r0,-44r53,0r0,-192r-146,-302v-15,-37,-41,-34,-86,-34r0,-44r189,0r0,44r-54,0r135,280r138,-280r-50,0r0,-44r178,0r0,44","w":546},"Z":{"d":"468,0r-412,0v-4,-38,17,-63,31,-88r295,-480r-234,0v-46,-2,-28,64,-41,96r-39,0r0,-144r394,0v1,38,-3,40,-37,95r-290,473r253,0v46,2,28,-64,41,-96r39,0r0,144","w":509},"a":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125"},"b":{"d":"283,-471v119,0,161,91,161,235v0,148,-43,249,-180,249v-47,0,-95,-20,-114,-52v0,49,-64,38,-113,39r0,-39v24,-1,53,6,53,-21r0,-583r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,247v39,-34,86,-53,133,-53xm150,-183v-1,108,28,152,111,152v90,0,120,-87,120,-206v0,-101,-19,-185,-111,-185v-41,0,-87,23,-120,55r0,184","w":488},"c":{"d":"379,-62v-30,41,-86,75,-150,75v-116,0,-186,-79,-186,-240v0,-167,90,-244,188,-244v43,0,81,19,100,44r5,-31r35,0r0,147v-22,0,-44,5,-45,-18v-6,-58,-36,-97,-95,-97v-77,0,-125,68,-125,198v0,124,41,195,130,195v45,0,88,-24,118,-55","w":416},"d":{"d":"44,-221v0,-136,57,-250,185,-250v40,0,78,14,105,33r0,-205r-55,0r-8,-39v56,0,69,-5,100,-5v16,0,23,6,23,22r0,608v-4,24,33,17,55,18r0,39v-46,-2,-110,11,-113,-32v-26,26,-71,45,-115,45v-125,2,-177,-105,-177,-234xm233,-425v-99,0,-126,79,-126,200v0,127,43,194,124,194v40,0,79,-20,103,-50r0,-305v-29,-24,-65,-39,-101,-39","w":475},"e":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0","w":425},"f":{"d":"269,-630v-56,-27,-149,-24,-149,62v0,37,13,75,30,110r100,0r8,39r-105,0r0,362v-4,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-79,0r0,-39r72,0v-15,-27,-28,-67,-28,-109v0,-108,118,-150,211,-107r0,44","w":273,"k":{"e":7,"\u00e8":7,"\u00e9":7,"\u00ea":7,"\u011b":7,"\u00eb":7,"\u0113":7,"\u0115":7,"\u0117":7,"\u0119":7,"o":23,"\u00f2":23,"\u00f3":23,"\u00f4":23,"\u00f5":23,"\u00f6":23,"\u014d":23,"\u014f":23,"\u0151":23,"\u00f8":23,"\u01ff":23,"\u0153":23,"i":5,"\u0131":5,"\u00ec":5,"\u00ed":5,"\u00ee":5,"\u0129":5,"\u00ef":5,"\u012b":5,"\u012d":5,"\u012f":5,"\u0133":5,"u":4,"\u00f9":4,"\u00fa":4,"\u00fb":4,"\u0169":4,"\u00fc":4,"\u016b":4,"\u016d":4,"\u016f":4,"\u0171":4,"\u0173":4}},"g":{"d":"224,-54v126,-7,201,19,202,127v0,76,-66,150,-197,150v-110,0,-187,-49,-187,-145v0,-49,25,-89,57,-113v-36,-39,-16,-110,23,-131v-41,-30,-61,-80,-61,-138v0,-111,86,-191,213,-161v27,-32,58,-47,95,-47v24,0,20,25,20,47v-38,0,-61,4,-80,14v51,28,75,83,75,148v0,94,-50,166,-161,166v-25,0,-46,-3,-65,-10v-13,10,-24,26,-24,43v0,40,40,53,90,50xm324,-303v0,-78,-34,-128,-101,-128v-67,0,-102,49,-102,127v0,78,35,127,102,127v67,0,101,-48,101,-126xm368,79v0,-113,-154,-58,-234,-89v-20,16,-35,44,-35,84v0,66,44,107,131,107v85,0,138,-42,138,-102","w":435},"h":{"d":"304,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,259v36,-34,90,-66,152,-66","w":507},"i":{"d":"158,-606v0,22,-16,40,-38,40v-22,0,-39,-18,-39,-40v0,-22,17,-39,39,-39v22,0,38,17,38,39xm205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39","w":239},"j":{"d":"158,-606v0,22,-16,40,-38,40v-22,0,-39,-18,-39,-40v0,-22,17,-39,39,-39v22,0,38,17,38,39xm-32,141v75,26,126,5,126,-93r0,-467r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,485v5,96,-26,151,-118,151v-26,0,-48,-4,-68,-12r0,-42","w":236},"k":{"d":"457,0r-155,0r0,-39r34,0r-124,-217r-60,64r0,135v-3,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,411v58,-66,135,-128,180,-204r104,0r0,39v-43,2,-63,-8,-91,22r-92,98r135,235v12,26,34,26,69,25r0,39","w":464},"l":{"d":"203,0r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,608v-4,21,30,17,51,17r0,39","w":238},"m":{"d":"560,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-106,-73,-106v-51,0,-98,30,-130,67r1,296v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-42,0,-89,27,-129,68r0,295v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,21,33,23,59v38,-38,89,-67,144,-67v53,0,92,29,107,70v39,-41,94,-70,155,-70","w":763},"n":{"d":"306,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,22,32,23,58v36,-34,90,-66,152,-66","w":510},"o":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197"},"p":{"d":"282,-471v119,0,161,91,161,235v0,148,-43,249,-180,249v-47,0,-91,-19,-114,-52r0,216v4,59,-65,45,-119,46r0,-39v25,-1,59,8,59,-21r0,-582r-56,0r-8,-39v56,0,70,-5,101,-5v26,0,24,21,23,45v42,-35,86,-53,133,-53xm149,-175v-2,80,35,144,111,144v90,0,120,-87,120,-206v0,-101,-19,-185,-111,-185v-41,0,-87,23,-120,55r0,192","w":487},"q":{"d":"221,13v-125,1,-177,-104,-177,-234v0,-150,65,-250,180,-250v47,0,86,18,110,44v-1,-21,1,-36,23,-36v31,0,33,5,89,5r8,39r-60,0r0,585v-4,24,35,17,57,18r0,39v-51,-1,-117,12,-117,-44r0,-205v-22,20,-69,39,-113,39xm334,-74r0,-298v-32,-53,-130,-73,-177,-24v-29,31,-50,86,-50,171v0,127,43,194,124,194v37,0,80,-19,103,-43","w":479},"r":{"d":"300,-408v-74,-3,-103,10,-146,66r0,285v-3,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v56,0,70,-5,101,-5v34,0,20,42,23,70v34,-47,78,-78,122,-78v35,0,21,35,24,63","w":314,"k":{"a":5,"\u00e0":5,"\u00e1":5,"\u00e2":5,"\u00e3":5,"\u00e4":5,"\u0101":5,"\u0103":5,"\u00e5":5,"\u01fb":5,"\u0105":5,"\u00e6":5,"\u01fd":5,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"i":4,"\u0131":4,"\u00ec":4,"\u00ed":4,"\u00ee":4,"\u0129":4,"\u00ef":4,"\u012b":4,"\u012d":4,"\u012f":4,"\u0133":4,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"s":{"d":"298,-107v2,-130,-249,-79,-249,-238v0,-116,173,-169,243,-83r4,-30r34,0r0,147v-20,1,-37,2,-38,-18v-4,-65,-47,-103,-105,-103v-53,0,-86,34,-86,75v0,50,49,68,110,90v66,23,138,55,138,147v0,128,-188,180,-259,82r-8,38r-34,0r0,-148v21,0,41,-4,42,18v6,66,53,103,111,103v49,0,97,-27,97,-80","w":382},"t":{"d":"148,-117v-12,87,56,99,119,76r0,41v-19,7,-50,13,-73,13v-79,-3,-106,-41,-106,-141r0,-291r-67,0r0,-39r67,0v5,-40,-16,-101,25,-105r33,-5r0,110r109,0r8,39r-115,0r0,302","w":297},"u":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106","w":500},"v":{"d":"427,-419v-29,2,-65,-9,-68,20r-130,399r-57,0r-135,-419r-43,0r0,-39r161,0r0,39v-24,1,-63,-8,-52,25r103,319r111,-344r-41,0r0,-39r143,0","w":409,"k":{"t":11,"f":4,"A":38,"\u00c0":38,"\u00c1":38,"\u00c2":38,"\u00c3":38,"\u00c4":38,"\u0100":38,"\u0102":38,"\u00c5":38,"\u01fa":38,"\u0104":38,"\u00c6":38,"\u01fc":38}},"w":{"d":"643,-419v-32,2,-63,-8,-72,23r-109,396r-66,0r-87,-355r-104,355r-64,0r-102,-419r-45,0r0,-39r156,0r0,39v-26,-1,-57,-6,-49,28r79,320r113,-387r45,0r97,392r96,-353r-40,0r0,-39r144,0","w":625,"k":{"t":11,"f":4,"A":22,"\u00c0":22,"\u00c1":22,"\u00c2":22,"\u00c3":22,"\u00c4":22,"\u0100":22,"\u0102":22,"\u00c5":22,"\u01fa":22,"\u0104":22,"\u00c6":22,"\u01fc":22}},"x":{"d":"436,0r-162,0r0,-39v15,0,39,3,38,-11v0,-5,-2,-11,-7,-18r-83,-118r-80,147r42,0r0,39r-162,0r0,-39v36,-1,68,5,83,-22r88,-163r-138,-195r-46,0r0,-39r163,0r0,39v-26,-3,-49,6,-32,29r85,119r81,-148r-39,0r0,-39r157,0r8,39v-43,2,-73,-9,-92,27r-87,159r136,194r47,0r0,39","w":444},"y":{"d":"218,-39v54,-1,105,-36,137,-68r0,-312r-53,0r0,-39r157,0r9,39v-27,0,-53,-4,-53,26r0,411v2,132,-46,207,-183,207v-40,0,-90,-10,-123,-23r0,-49v32,16,81,27,111,27v141,3,138,-102,135,-232v-36,34,-90,65,-152,65v-82,0,-118,-64,-118,-150r0,-282r-55,0r-9,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106","w":499},"z":{"d":"370,-458v0,23,0,31,-12,49r-252,367r180,0v39,2,32,-46,40,-76r38,0r0,118r-334,0v0,-24,-1,-31,12,-50r250,-366r-180,0v-38,-3,-32,45,-40,75r-38,0r0,-117r336,0","w":402},"&":{"d":"308,-628v124,0,184,75,179,200r0,67v36,4,93,-19,80,41r-80,0r0,185v2,97,34,98,103,96r0,38v-76,4,-147,-2,-157,-64v-26,45,-89,76,-160,76v-118,-1,-190,-61,-190,-181v0,-81,48,-150,127,-173v-54,-22,-81,-71,-81,-124v0,-101,77,-161,179,-161xm282,-35v110,0,150,-78,145,-207v-6,-153,35,-342,-122,-342v-67,0,-115,43,-115,115v1,73,51,113,129,108r0,41v-104,-5,-170,53,-171,147v0,81,47,138,134,138","w":644},"@":{"d":"669,-359v0,144,-54,223,-147,223v-41,0,-81,-21,-90,-63v-16,32,-54,64,-106,64v-69,0,-121,-48,-121,-135v0,-170,150,-251,289,-178r-18,215v0,42,20,60,52,60v55,0,88,-74,88,-187v0,-128,-72,-227,-235,-227v-152,0,-284,124,-284,300v0,143,84,260,252,260v61,0,146,-22,198,-60r15,22v-40,36,-129,76,-236,76v-171,0,-282,-117,-282,-294v0,-200,156,-345,343,-345v183,0,282,110,282,269xm437,-427v-100,-39,-179,41,-178,151v0,65,27,101,77,101v50,0,83,-45,88,-106","w":713},"!":{"d":"140,-575v0,59,-20,246,-29,395r-28,0v-9,-149,-29,-336,-29,-395v0,-34,13,-52,43,-52v30,0,43,18,43,52xm142,-34v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":196},"\u00a1":{"d":"140,-42v0,34,-13,52,-43,52v-30,0,-43,-18,-43,-52v0,-59,20,-246,29,-395r28,0v9,149,29,336,29,395xm142,-583v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":196},"?":{"d":"221,-484v4,-109,-122,-117,-208,-82r0,-42v32,-12,77,-20,117,-20v98,0,157,48,157,139v0,44,-16,89,-76,161v-40,48,-71,92,-80,148r-29,0v-2,-103,115,-198,119,-304xm163,-34v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":319},"\u00bf":{"d":"99,-134v-4,109,122,117,208,82r0,42v-32,12,-77,20,-117,20v-98,0,-157,-48,-157,-139v0,-44,16,-89,76,-161v40,-48,71,-92,80,-148r29,0v2,103,-115,198,-119,304xm157,-584v0,-24,18,-45,44,-45v25,0,44,20,44,45v0,25,-19,45,-44,45v-26,0,-44,-21,-44,-45","w":320},"*":{"d":"337,-399v-11,18,-31,18,-48,8v-22,-13,-63,-60,-91,-85v7,37,27,96,27,121v0,20,-11,37,-32,37v-21,0,-32,-17,-32,-37v0,-25,19,-82,26,-119v-28,26,-67,70,-88,83v-17,10,-37,10,-48,-8v-11,-18,-2,-36,15,-46v22,-13,83,-27,118,-40v-35,-13,-96,-27,-118,-40v-17,-10,-26,-28,-15,-46v11,-18,31,-18,48,-8v21,13,60,57,88,83v-7,-37,-26,-94,-26,-119v0,-20,11,-37,32,-37v21,0,32,17,32,37v0,25,-20,84,-27,121v28,-25,69,-72,91,-85v17,-10,37,-10,48,8v11,18,2,36,-15,46v-22,13,-83,27,-118,40v35,13,96,27,118,40v17,10,26,28,15,46","w":387},".":{"d":"118,-34v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":154},",":{"d":"120,-25v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50","w":156},":":{"d":"118,-309v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45xm118,-34v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":154},";":{"d":"118,-309v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45xm120,-25v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50","w":156},"\u2026":{"d":"424,-34v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45xm272,-34v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45xm120,-34v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":444},"\u00b7":{"d":"130,-250v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":154},"\u2022":{"d":"288,-319v0,63,-51,114,-114,114v-63,0,-114,-51,-114,-114v0,-63,51,-114,114,-114v63,0,114,51,114,114","w":348},"\/":{"d":"355,-682r-312,743r-56,0r313,-743r55,0","w":332},"(":{"d":"303,181r-12,19v-126,-57,-205,-210,-205,-438v0,-228,79,-381,205,-438r12,19v-104,77,-138,218,-138,419v0,201,34,342,138,419","w":293},"\u00a6":{"d":"109,-359r-49,0r0,-323r49,0r0,323xm109,200r-49,0r0,-321r49,0r0,321","w":169},")":{"d":"207,-238v0,228,-79,381,-205,438r-12,-19v104,-77,138,-218,138,-419v0,-201,-34,-342,-138,-419r12,-19v126,57,205,210,205,438","w":293},"[":{"d":"280,193r-179,0r0,-875r179,0r0,50r-89,0v-15,0,-23,5,-23,22r0,731v0,17,8,22,23,22r89,0r0,50","w":257},"\\":{"d":"328,61r-55,0r-312,-743r54,0","w":333},"]":{"d":"156,193r-179,0r0,-50r89,0v15,0,23,-5,23,-22r0,-731v0,-17,-8,-22,-23,-22r-89,0r0,-50r179,0r0,875","w":257},"{":{"d":"286,223v-124,-6,-155,-63,-155,-189v0,-117,30,-237,-101,-255r0,-16v130,-18,101,-137,101,-255v0,-126,31,-183,155,-189r0,21v-54,6,-86,26,-86,84v0,138,59,309,-101,347v160,38,101,209,101,347v0,58,32,78,86,84r0,21","w":276},"|":{"d":"108,260r-48,0r0,-1000r48,0r0,1000","w":168},"}":{"d":"246,-221v-130,18,-101,137,-101,255v0,126,-31,183,-155,189r0,-21v54,-6,86,-26,86,-84v0,-138,-59,-309,101,-347v-160,-38,-101,-209,-101,-347v0,-58,-32,-78,-86,-84r0,-21v124,6,155,63,155,189v0,117,-30,237,101,255r0,16","w":276},"-":{"d":"244,-215r-210,0r0,-54r210,0r0,54","w":278},"\u00ad":{"d":"244,-215r-210,0r0,-54r210,0r0,54","w":278},"\u2013":{"d":"500,-224r-500,0r0,-50r500,0r0,50","w":500},"\u2014":{"d":"1000,-224r-1000,0r0,-50r1000,0r0,50","w":1000},"_":{"d":"366,59r-366,0r0,-45r366,0r0,45","w":366},"\u2020":{"d":"415,-368v-41,0,-122,-24,-163,-31v0,62,30,506,30,540v0,33,-8,52,-37,52v-28,0,-38,-19,-38,-52v0,-161,28,-478,30,-540v-25,5,-55,11,-86,18v-31,7,-60,13,-77,13v-33,0,-52,-10,-52,-38v0,-58,75,-37,129,-25v31,7,61,13,86,18v-5,-25,-11,-56,-18,-87v-7,-31,-12,-59,-12,-76v0,-33,10,-52,38,-52v56,0,36,74,25,128v-7,31,-13,62,-18,87v25,-5,55,-11,86,-18v56,-13,129,-31,129,26v0,29,-19,37,-52,37","w":489},"\u2021":{"d":"415,-368v-41,0,-122,-24,-163,-31v12,92,46,172,17,271v-9,32,-14,66,-17,93v25,-5,55,-11,86,-18v31,-7,60,-13,77,-13v33,0,52,10,52,38v0,58,-75,37,-129,25v-31,-7,-61,-13,-86,-18v5,25,11,56,18,87v7,31,12,59,12,76v0,33,-8,52,-37,52v-56,0,-38,-74,-26,-128v7,-31,13,-62,18,-87v-25,5,-55,11,-86,18v-56,13,-122,31,-129,-26v6,-57,75,-35,129,-24v31,7,61,13,86,18v-14,-88,-45,-175,-17,-271v9,-31,13,-65,17,-93v-25,5,-55,11,-86,18v-31,7,-60,13,-77,13v-33,0,-52,-10,-52,-38v0,-58,75,-37,129,-25v31,7,61,13,86,18v-5,-25,-11,-56,-18,-87v-7,-31,-12,-59,-12,-76v0,-33,10,-52,38,-52v56,0,36,74,25,128v-7,31,-13,62,-18,87v25,-5,55,-11,86,-18v56,-13,129,-31,129,26v0,29,-19,37,-52,37","w":489},"\u00a7":{"d":"392,54v0,131,-185,188,-261,88r-9,38r-35,0r0,-148v22,0,42,-4,44,18v5,62,50,103,111,103v52,0,96,-33,96,-85v0,-64,-56,-94,-118,-123v-69,-32,-141,-71,-141,-159v0,-66,34,-113,89,-137v-56,-34,-89,-73,-89,-139v0,-144,184,-183,261,-88r9,-38r35,0r0,148v-22,0,-42,4,-44,-18v-5,-62,-50,-103,-111,-103v-55,0,-96,32,-96,86v0,64,56,93,118,122v69,32,141,71,141,159v0,66,-34,113,-89,137v56,34,89,73,89,139xm338,-208v0,-61,-83,-92,-125,-119v-47,15,-80,51,-80,99v0,61,83,92,125,119v47,-15,80,-51,80,-99","w":470},"\u00b6":{"d":"393,-573r-62,0r0,797r-46,0r0,-797r-55,0r0,797r-46,0r0,-551v-80,0,-144,-65,-144,-145v0,-80,64,-144,144,-144r209,0r0,43","w":451},"\u00ae":{"d":"639,-309v0,188,-124,319,-297,319v-173,0,-296,-131,-296,-319v0,-188,123,-319,296,-319v173,0,297,131,297,319xm602,-308v0,-175,-103,-289,-260,-289v-157,0,-260,113,-260,288v0,175,103,288,260,288v157,0,260,-112,260,-287xm442,-381v0,46,-26,81,-73,87r54,97v6,16,23,13,43,13r0,26r-61,0r-74,-133r-38,0r0,97v-1,17,15,8,27,10r0,26r-90,0r0,-26r27,0r0,-247v4,-14,-16,-11,-28,-11r0,-26r90,0v84,-2,123,18,123,87xm293,-317v70,2,111,-2,112,-63v1,-54,-41,-69,-112,-62r0,125","w":685},"\u00a9":{"d":"639,-309v0,188,-124,319,-297,319v-173,0,-296,-131,-296,-319v0,-188,123,-319,296,-319v173,0,297,131,297,319xm602,-308v0,-175,-103,-289,-260,-289v-157,0,-260,113,-260,288v0,175,103,288,260,288v157,0,260,-112,260,-287xm344,-147v-86,0,-116,-59,-116,-160v0,-102,45,-161,115,-161v25,0,46,10,59,24r4,-17r22,0r0,94v-13,0,-28,2,-28,-11v-2,-37,-17,-61,-56,-61v-48,0,-79,47,-79,132v0,89,25,133,80,133v28,0,52,-14,71,-32r15,19v-19,22,-53,40,-87,40","w":685},"\u2122":{"d":"570,-337r-79,0r0,-24r23,0r0,-178r-81,202r-25,0r-81,-199r0,168v-1,12,16,5,25,7r0,24r-78,0r0,-24r24,0r0,-223v1,-13,-15,-7,-25,-8r0,-24r53,0r96,236r96,-236r51,0r0,24r-24,0r0,222v-2,15,15,7,25,9r0,24xm251,-544v-38,11,-12,-48,-47,-48r-46,0r0,223v-1,12,15,7,25,8r0,24r-82,0r0,-24r24,0r0,-231v-22,4,-57,-10,-63,12v-4,16,-3,42,-30,36r3,-72r213,0","w":602},"\u201c":{"d":"235,-555v0,22,-14,44,-43,44v-30,0,-47,-23,-47,-50v0,-46,25,-90,68,-140r22,14v-18,29,-40,69,-42,90v21,2,42,16,42,42xm110,-555v0,22,-14,44,-43,44v-30,0,-47,-23,-47,-50v0,-46,25,-90,68,-140r22,14v-18,29,-40,69,-42,90v21,2,42,16,42,42","w":263},"\u201d":{"d":"243,-651v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50xm118,-651v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50","w":263},"\u2018":{"d":"110,-555v0,22,-14,44,-43,44v-30,0,-47,-23,-47,-50v0,-46,25,-90,68,-140r22,14v-18,29,-40,69,-42,90v21,2,42,16,42,42","w":138},"\u2019":{"d":"118,-651v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50","w":138},"\u00ab":{"d":"330,-102r-9,31r-108,-114v-41,-37,-38,-57,0,-97r108,-114r9,31r-96,131xm179,-102r-9,31r-108,-114v-41,-37,-38,-57,0,-97r108,-114r9,31r-96,131","w":374},"\u00bb":{"d":"312,-282v40,37,38,57,0,97r-108,114r-9,-31r96,-132r-96,-131r9,-31xm161,-282v40,37,38,57,0,97r-108,114r-9,-31r96,-132r-96,-131r9,-31","w":374},"\u2039":{"d":"179,-102r-9,31r-108,-114v-41,-37,-38,-57,0,-97r108,-114r9,31r-96,131","w":223},"\u203a":{"d":"161,-282v40,37,38,57,0,97r-108,114r-9,-31r96,-132r-96,-131r9,-31","w":223},"\u201a":{"d":"118,-25v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50","w":138},"\u201e":{"d":"243,-25v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50xm118,-25v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50","w":263},"\u00aa":{"d":"298,-297v-34,-1,-71,7,-75,-26v-48,62,-186,40,-181,-59v5,-90,80,-121,179,-120v2,-58,-9,-93,-69,-92v-30,0,-59,9,-86,21r0,-34v27,-12,63,-21,93,-21v143,0,104,165,104,291v0,18,20,12,35,13r0,27xm85,-385v0,83,104,81,136,28r0,-116v-62,-3,-136,22,-136,88","w":315},"\u00ba":{"d":"283,-458v0,125,-59,171,-127,171v-70,0,-126,-45,-126,-170v0,-125,60,-171,128,-171v70,0,125,45,125,170xm239,-457v0,-103,-33,-139,-81,-139v-41,0,-83,30,-83,139v0,103,33,138,81,138v41,0,83,-29,83,-138","w":313},"0":{"d":"417,-309v0,247,-78,320,-184,320v-106,0,-180,-70,-180,-317v0,-247,78,-322,184,-322v106,0,180,72,180,319xm353,-308v0,-205,-44,-270,-118,-270v-74,0,-118,65,-118,270v0,205,44,269,118,269v74,0,118,-64,118,-269","w":470},"1":{"d":"351,0r-235,0r0,-44r87,0r0,-481r-86,0r-8,-43v65,-3,103,-21,132,-48r24,0r0,551v-1,36,56,16,86,21r0,44","w":470},"2":{"d":"393,-171r-21,171r-316,0v-3,-110,31,-178,142,-285v91,-88,118,-125,118,-187v0,-64,-34,-102,-109,-102v-38,0,-86,13,-126,30r-15,-48v50,-23,104,-36,155,-36v94,0,161,59,161,153v0,84,-38,131,-117,205v-99,94,-132,148,-145,219r199,0r25,-100v2,-23,25,-20,49,-20","w":470},"3":{"d":"301,-479v0,-110,-140,-112,-223,-72r-15,-47v45,-20,91,-30,136,-30v108,0,166,58,166,145v0,60,-28,121,-88,143v78,26,113,82,113,156v0,114,-74,195,-192,195v-54,0,-111,-16,-155,-44r23,-50v38,24,86,41,131,41v82,0,128,-59,128,-140v0,-76,-53,-122,-137,-127r0,-46v77,-8,113,-59,113,-124","w":470},"4":{"d":"441,-174r-109,0r0,107v-2,36,49,19,79,23r0,44r-217,0r0,-44r78,0r0,-130r-256,0r0,-41r266,-401r50,0r0,391r109,0r0,51xm272,-225r0,-289r-191,289r191,0","w":470},"5":{"d":"214,-41v93,1,127,-73,128,-162v0,-86,-34,-149,-111,-149v-45,0,-85,24,-110,52r-32,-12r0,-304r284,0r0,54r-232,0r0,197v113,-84,265,-27,265,158v0,124,-60,218,-183,218v-56,0,-103,-13,-155,-45r21,-47v35,22,84,40,125,40","w":470},"6":{"d":"423,-212v0,118,-61,223,-182,223v-102,0,-182,-65,-182,-277v0,-232,105,-362,246,-362v27,0,59,6,85,16r-13,43v-142,-51,-229,62,-247,219v115,-101,293,-85,293,138xm359,-212v0,-99,-32,-147,-95,-147v-47,0,-100,26,-139,63v-1,11,-1,22,-1,34v0,174,47,227,119,227v76,0,116,-72,116,-177","w":470},"7":{"d":"413,-579v-74,182,-180,367,-208,579r-64,0v22,-193,135,-396,206,-562r-227,0r-23,77v-3,21,-22,22,-46,21r16,-152r346,0r0,37","w":470},"8":{"d":"425,-163v0,87,-61,174,-186,174v-127,0,-194,-68,-194,-172v0,-76,52,-142,118,-171v-49,-30,-87,-73,-87,-146v0,-98,72,-150,163,-150v94,0,158,51,158,139v0,67,-39,121,-104,154v76,31,132,79,132,172xm339,-483v0,-65,-37,-101,-99,-101v-60,0,-105,34,-105,98v0,68,50,106,109,132v66,-32,95,-84,95,-129xm359,-165v1,-84,-80,-114,-152,-144v-57,30,-95,79,-95,148v0,81,53,126,123,126v81,0,124,-56,124,-130","w":470},"9":{"d":"411,-351v0,232,-105,362,-246,362v-27,0,-59,-6,-85,-16r13,-43v142,51,229,-62,247,-219v-115,101,-293,85,-293,-138v0,-118,61,-223,182,-223v102,0,182,65,182,277xm346,-355v0,-174,-47,-227,-119,-227v-76,0,-116,72,-116,177v0,99,32,147,95,147v47,0,100,-26,139,-63v1,-11,1,-22,1,-34","w":470},"$":{"d":"432,-159v0,107,-76,163,-174,169r0,73r-40,0r0,-73v-46,-4,-95,-21,-128,-53r-14,43r-36,0r0,-181v20,0,38,-3,40,17v7,77,68,120,138,128r0,-251v-91,-28,-180,-66,-180,-175v0,-103,82,-164,180,-166r0,-70r40,0r0,73v41,6,80,24,103,59r8,-49r35,0r0,181v-21,0,-39,2,-42,-18v-12,-67,-41,-117,-104,-129r0,239v88,32,174,71,174,183xm218,-357r0,-227v-67,2,-118,40,-118,109v0,63,44,90,118,118xm370,-145v0,-70,-43,-102,-112,-128r0,237v71,-7,112,-54,112,-109","w":470},"\u00a2":{"d":"403,-62v-27,36,-76,68,-133,74r0,77r-37,0r0,-77v-104,-9,-166,-88,-166,-239v0,-154,77,-232,166,-243r0,-88r37,0r0,88v37,4,68,21,85,43r5,-31r35,0r0,147v-22,0,-43,5,-45,-18v-5,-53,-31,-91,-80,-96r0,392v41,-3,81,-26,108,-55xm233,-35r0,-389v-64,12,-103,79,-103,196v0,111,33,180,103,193","w":470},"\u20ac":{"d":"467,-66v-34,41,-100,77,-164,77v-144,0,-200,-105,-214,-243r-85,0r0,-46r82,0r0,-59r-82,0r0,-46r85,0v19,-158,98,-245,213,-245v49,0,92,21,116,52r9,-39r34,0r0,181v-21,0,-44,4,-45,-18v-3,-75,-36,-127,-113,-127v-82,0,-137,70,-152,196r150,0r0,46r-152,0v-1,18,-1,41,0,59r152,0r0,46r-150,0v13,129,63,195,155,195v54,0,103,-27,137,-61","w":470},"\u0192":{"d":"516,-681r-9,46v-111,-26,-166,3,-192,147r-29,159r130,0r-7,43r-130,0r-48,264v-33,188,-118,241,-277,203r11,-48v112,30,170,1,196,-145r49,-274r-108,0r0,-43r116,0r27,-149v32,-185,116,-241,271,-203","w":470},"\u00a3":{"d":"92,-459v0,-165,170,-203,313,-140r-17,47v-37,-15,-79,-25,-113,-25v-73,0,-113,41,-113,113v0,40,12,80,25,119r117,0r7,40r-111,0v30,101,20,170,-54,253r213,0r23,-90v2,-18,19,-20,41,-19r-12,161r-342,0r0,-28v73,-70,97,-169,58,-277r-79,0r0,-40r65,0v-11,-35,-21,-71,-21,-114","w":470},"\u00a5":{"d":"503,-571v-49,2,-70,-8,-92,36r-133,269r98,0r0,47r-113,0r0,51r113,0r0,47r-113,0v4,28,-12,78,20,77r36,0r0,44r-173,0r0,-44r53,0r0,-77r-115,0r0,-47r115,0r0,-51r-115,0r0,-47r100,0r-131,-271v-15,-37,-41,-34,-86,-34r0,-45r189,0r0,45r-54,0r135,279r138,-279r-50,0r0,-45r178,0r0,45","w":470},"#":{"d":"446,-208r-132,0r-41,218r-41,0r41,-218r-122,0r-41,218r-41,0r41,-218r-85,0r0,-37r92,0r24,-127r-116,0r0,-37r123,0r41,-219r40,0r-41,219r123,0r41,-219r40,0r-41,219r95,0r0,37r-102,0r-23,127r125,0r0,37xm304,-372r-123,0r-23,127r122,0","w":470},"%":{"d":"656,-171v0,119,-44,182,-127,182v-83,0,-127,-63,-127,-182v0,-119,44,-182,127,-182v83,0,127,63,127,182xm503,-616r-260,616r-44,0r261,-616r43,0xm299,-446v0,119,-44,182,-127,182v-83,0,-127,-63,-127,-182v0,-119,44,-182,127,-182v83,0,127,63,127,182xm609,-171v0,-110,-31,-146,-80,-146v-49,0,-80,36,-80,146v0,110,31,146,80,146v49,0,80,-36,80,-146xm252,-446v0,-110,-31,-146,-80,-146v-49,0,-80,36,-80,146v0,110,31,146,80,146v49,0,80,-36,80,-146","w":701},"\u2030":{"d":"951,-171v0,119,-44,182,-127,182v-83,0,-127,-63,-127,-182v0,-119,44,-182,127,-182v83,0,127,63,127,182xm656,-171v0,119,-44,182,-127,182v-83,0,-127,-63,-127,-182v0,-119,44,-182,127,-182v83,0,127,63,127,182xm503,-616r-260,616r-44,0r261,-616r43,0xm299,-446v0,119,-44,182,-127,182v-83,0,-127,-63,-127,-182v0,-119,44,-182,127,-182v83,0,127,63,127,182xm904,-171v0,-110,-31,-146,-80,-146v-49,0,-80,36,-80,146v0,110,31,146,80,146v49,0,80,-36,80,-146xm609,-171v0,-110,-31,-146,-80,-146v-49,0,-80,36,-80,146v0,110,31,146,80,146v49,0,80,-36,80,-146xm252,-446v0,-110,-31,-146,-80,-146v-49,0,-80,36,-80,146v0,110,31,146,80,146v49,0,80,-36,80,-146","w":996},"+":{"d":"340,-286r-120,0r0,120r-49,0r0,-120r-121,0r0,-49r121,0r0,-121r49,0r0,121r120,0r0,49","w":390},"\u2212":{"d":"340,-286r-290,0r0,-49r290,0r0,49","w":390},"\u00d7":{"d":"350,-226r-34,35r-85,-86r-86,86r-35,-34r86,-86r-86,-86r35,-34r86,85r85,-85r34,35r-85,85","w":460},"<":{"d":"334,-176r-277,-111r0,-47r277,-121r0,51r-214,92r214,84r0,52","w":390},"\u00f7":{"d":"238,-430v0,23,-17,44,-42,44v-24,0,-42,-20,-42,-44v0,-24,18,-43,42,-43v25,0,42,20,42,43xm340,-286r-290,0r0,-49r290,0r0,49xm238,-192v0,23,-17,44,-42,44v-24,0,-42,-20,-42,-44v0,-24,18,-43,42,-43v25,0,42,20,42,43","w":390},"=":{"d":"340,-355r-290,0r0,-49r290,0r0,49xm340,-217r-290,0r0,-49r290,0r0,49","w":390},"\u00ac":{"d":"340,-217r-49,0r0,-138r-241,0r0,-49r266,0v19,0,24,8,24,25r0,162","w":390},">":{"d":"334,-287r-277,111r0,-52r214,-84r-214,-92r0,-51r277,121r0,47","w":390},"\u2260":{"d":"340,-217r-166,0r-59,125r-52,0r60,-125r-73,0r0,-49r96,0r42,-89r-138,0r0,-49r162,0r51,-108r51,0r-51,108r77,0r0,49r-100,0r-43,89r143,0r0,49","w":390},"\u2248":{"d":"367,-402v-30,49,-61,78,-106,78v-75,0,-82,-48,-146,-48v-31,0,-54,23,-69,46r-22,-15v30,-49,61,-78,106,-78v75,0,83,48,146,48v31,0,54,-23,69,-46xm367,-258v-30,49,-61,78,-106,78v-75,0,-82,-48,-146,-48v-31,0,-54,23,-69,46r-22,-15v30,-49,61,-78,106,-78v75,0,83,48,146,48v31,0,54,-23,69,-46","w":390},"\u00b1":{"d":"340,-286r-120,0r0,120r-49,0r0,-120r-121,0r0,-49r121,0r0,-121r49,0r0,121r120,0r0,49xm340,11r-290,0r0,-49r290,0r0,49","w":390},"\u2264":{"d":"333,-174r-277,-111r0,-49r277,-121r0,52r-214,92r214,84r0,53xm340,11r-290,0r0,-49r290,0r0,49","w":390},"\u2265":{"d":"334,-285r-277,111r0,-53r214,-84r-214,-92r0,-52r277,121r0,49xm340,11r-290,0r0,-49r290,0r0,49","w":390},"^":{"d":"376,-344r-48,0r-106,-230r-106,230r-48,0r131,-284r46,0","w":444},"~":{"d":"468,-272v-23,54,-66,99,-120,99v-85,0,-131,-59,-211,-59v-29,0,-63,27,-79,52r-28,-19v28,-66,67,-100,114,-100v85,0,145,60,217,60v29,0,63,-27,79,-52","w":498},"\u25ca":{"d":"313,-616r275,308r-275,308r-275,-308xm313,-97r188,-211r-188,-212r-188,212","w":641},"\u00b0":{"d":"286,-475v0,96,-55,153,-128,153v-73,0,-128,-57,-128,-153v0,-96,55,-153,128,-153v73,0,128,57,128,153xm244,-475v0,-78,-32,-120,-86,-120v-54,0,-86,42,-86,120v0,78,32,120,86,120v54,0,86,-42,86,-120","w":316},"'":{"d":"102,-579v0,52,-20,158,-27,217r-18,0v-7,-59,-27,-165,-27,-217v0,-34,14,-48,36,-48v22,0,36,14,36,48","w":152},"\"":{"d":"236,-579v0,52,-20,158,-27,217r-18,0v-7,-59,-27,-165,-27,-217v0,-34,14,-48,36,-48v22,0,36,14,36,48xm102,-579v0,52,-20,158,-27,217r-18,0v-7,-59,-27,-165,-27,-217v0,-34,14,-48,36,-48v22,0,36,14,36,48","w":286},"\u221a":{"d":"521,-652r-50,0r-238,652r-45,0r-129,-389r-52,0r0,-30r92,0r122,366r229,-629r71,0r0,30","w":508},"\u00a4":{"d":"525,-174r-41,42r-67,-67v-69,49,-157,56,-234,0r-67,67r-40,-42r68,-64v-50,-66,-52,-167,0,-232r-68,-65r40,-42r67,67v82,-54,157,-52,233,0v23,-22,46,-44,68,-67r41,42r-68,65v53,74,51,161,0,232xm438,-355v0,-81,-68,-136,-137,-136v-79,0,-139,63,-139,136v0,75,63,138,138,138v76,0,138,-63,138,-138","w":612},"\u221e":{"d":"699,-258v0,117,-54,201,-154,201v-71,0,-117,-37,-174,-138v-47,78,-91,124,-163,124v-85,0,-148,-76,-148,-182v0,-107,56,-175,151,-175v72,0,114,41,159,117v57,-103,108,-140,177,-140v98,0,152,55,152,193xm663,-257v0,-78,-40,-127,-113,-127v-48,0,-90,25,-151,135v40,78,77,125,137,125v71,0,127,-49,127,-133xm342,-255v-42,-78,-77,-114,-140,-114v-73,0,-113,54,-113,117v0,68,41,119,112,119v65,0,106,-57,141,-122","w":759},"\u00b5":{"d":"222,-39v54,-1,105,-35,137,-68r0,-312r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v-1,25,29,15,50,17r0,39v-54,-2,-117,15,-110,-52v-45,44,-135,88,-210,51r0,177v4,60,-65,46,-119,47r0,-39v25,-1,59,8,59,-21r0,-582r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106","w":503},"\u2202":{"d":"443,-286v0,191,-75,297,-209,297v-132,0,-207,-96,-207,-219v0,-136,75,-208,179,-208v63,0,124,24,165,59v-15,-145,-63,-222,-232,-232r6,-37v165,8,298,39,298,340xm228,-37v101,0,149,-102,144,-265v-34,-35,-89,-63,-145,-63v-94,0,-131,63,-131,161v0,97,51,167,132,167","w":470},"\u2211":{"d":"513,-455r-45,0r-28,-83v-6,-19,-16,-23,-39,-23r-277,0r256,341r-256,357r270,0v23,0,31,-5,38,-24r37,-98r48,0r-41,178r-430,0v-3,-54,20,-74,67,-141r188,-272r-197,-265v-37,-49,-58,-72,-56,-131r444,0","w":561},"\u220f":{"d":"586,-572r-83,0r0,707v0,34,51,12,78,18r0,40r-204,0r0,-40r75,0r0,-703v0,-18,-10,-22,-24,-22r-252,0r0,705v-3,34,51,16,79,20r0,40r-206,0r0,-40r75,0r0,-704v3,-36,-55,-16,-84,-21r0,-44r546,0r0,44","w":626},"\u03c0":{"d":"546,-419r-83,0r0,362v-2,32,43,13,68,18r0,39r-184,0r0,-39r65,0r0,-358v0,-18,-10,-22,-24,-22r-212,0r0,360v-4,31,43,17,69,20r0,39r-186,0r0,-39r65,0r0,-359v3,-36,-55,-16,-84,-21r0,-39r506,0r0,39","w":586},"\u222b":{"d":"496,-682r-5,31v-120,-24,-161,64,-178,163r-85,498v-19,113,-53,213,-186,213v-23,0,-45,-3,-67,-9r4,-30v117,25,163,-71,179,-164r82,-479v19,-113,45,-232,185,-232v24,0,48,3,71,9","w":470},"\u03a9":{"d":"304,-579v-104,0,-165,112,-165,257v0,135,78,247,147,288r0,34r-178,0r0,-44r97,0v-71,-57,-136,-159,-136,-288v0,-157,81,-296,235,-296v154,0,235,139,235,296v0,129,-65,231,-136,288r97,0r0,44r-178,0r0,-34v69,-41,147,-153,147,-288v0,-145,-61,-257,-165,-257","w":608},"\u2126":{"d":"304,-579v-104,0,-165,112,-165,257v0,135,78,247,147,288r0,34r-178,0r0,-44r97,0v-71,-57,-136,-159,-136,-288v0,-157,81,-296,235,-296v154,0,235,139,235,296v0,129,-65,231,-136,288r97,0r0,44r-178,0r0,-34v69,-41,147,-153,147,-288v0,-145,-61,-257,-165,-257","w":608},"\u2206":{"d":"563,0r-525,0r258,-628r11,0xm473,-46r-179,-443r-180,443r359,0","w":607},"\u2113":{"d":"203,0r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,608v-4,21,30,17,51,17r0,39","w":238},"\u212e":{"d":"761,-301r-576,0v-3,0,-5,1,-5,5r0,174v0,8,3,15,9,21v53,57,132,93,218,93v92,0,174,-41,228,-105r52,0v-65,75,-167,124,-281,124v-196,0,-356,-142,-356,-319v0,-178,160,-320,356,-320v197,0,358,142,355,327xm631,-323r0,-176v0,-7,-4,-15,-10,-21v-108,-117,-327,-116,-432,3v-5,6,-9,14,-9,23r0,171v0,3,2,5,5,5r441,0v3,0,5,-2,5,-5","w":811},"\u2116":{"d":"887,-375v0,102,-49,177,-142,177v-93,0,-142,-75,-142,-177v0,-102,49,-177,142,-177v93,0,142,75,142,177xm833,-375v0,-81,-27,-132,-88,-132v-61,0,-88,51,-88,132v0,81,27,132,88,132v61,0,88,-51,88,-132xm581,-572r-53,0r0,572r-49,0r-319,-495r0,432v-2,26,33,18,56,19r0,44r-161,0r0,-44r53,0r0,-506v3,-30,-31,-20,-56,-22r0,-44r102,0r320,496r0,-428v5,-28,-30,-24,-56,-24r0,-44r163,0r0,44","w":917},"\u2044":{"d":"254,-616r-260,616r-44,0r261,-616r43,0","w":204},"\u00b9":{"d":"202,-246r-141,0r0,-27r52,0r0,-288r-52,0r-5,-26v39,-2,63,-13,80,-29r14,0r0,331v-1,22,34,9,52,12r0,27","w":258},"\u00b2":{"d":"258,-354r-12,103r-190,0v-2,-67,18,-106,85,-171v55,-53,71,-75,71,-112v0,-72,-88,-72,-141,-44r-9,-28v75,-41,190,-26,190,70v0,50,-24,78,-71,123v-59,56,-79,88,-87,131r120,0r15,-60v1,-14,14,-12,29,-12","w":314},"\u00b3":{"d":"211,-539v1,-65,-84,-67,-134,-43r-9,-28v72,-38,181,-16,181,69v0,36,-17,73,-53,86v111,35,84,214,-48,210v-32,0,-65,-9,-92,-26r12,-31v57,43,157,31,157,-58v0,-46,-32,-72,-82,-75r0,-29v46,-5,68,-36,68,-75","w":320},"\u00bd":{"d":"597,-103r-12,103r-190,0v-2,-67,18,-106,85,-171v55,-53,71,-75,71,-112v0,-72,-89,-70,-141,-43r-9,-29v75,-41,190,-26,190,70v0,50,-23,78,-70,123v-59,56,-79,88,-87,131r119,0r15,-60v1,-14,14,-12,29,-12xm463,-616r-260,616r-41,0r261,-616r40,0xm199,-246r-141,0r0,-27r52,0r0,-288r-52,0r-5,-26v39,-2,63,-13,80,-29r14,0r0,331v-1,22,34,9,52,12r0,27","w":650},"\u00bc":{"d":"601,-104r-66,0r0,64v-1,22,30,12,48,14r0,26r-131,0r0,-26r47,0r0,-78r-152,0r0,-25r158,-241r30,0r0,235r66,0r0,31xm459,-616r-260,616r-41,0r261,-616r40,0xm195,-246r-141,0r0,-27r52,0r0,-288r-52,0r-5,-26v39,-2,63,-13,80,-29r14,0r0,331v-1,22,34,9,52,12r0,27xm499,-135r0,-173r-114,173r114,0","w":650},"\u00be":{"d":"620,-104r-66,0r0,64v-1,22,30,12,48,14r0,26r-131,0r0,-26r47,0r0,-78r-152,0r0,-25r158,-241r30,0r0,235r66,0r0,31xm481,-616r-260,616r-41,0r261,-616r40,0xm184,-539v1,-65,-84,-67,-134,-43r-9,-28v72,-38,181,-16,181,69v0,36,-17,73,-53,86v111,35,84,214,-48,210v-32,0,-65,-9,-92,-26r12,-31v57,43,157,31,157,-58v0,-46,-32,-72,-82,-75r0,-29v46,-5,68,-36,68,-75xm518,-135r0,-173r-114,173r114,0","w":650},"`":{"d":"145,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":160},"\u00b4":{"d":"145,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":160},"\u00a8":{"d":"241,-582v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm115,-582v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":279},"\u02c6":{"d":"218,-510r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":239},"\u02dc":{"d":"228,-617v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":239},"\u00af":{"d":"236,-573r-232,0r0,-43r232,0r0,43","w":239},"\u02d8":{"d":"206,-630v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":239},"\u02d9":{"d":"164,-583v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":239},"\u02da":{"d":"197,-556v0,48,-32,80,-77,80v-45,0,-77,-32,-77,-80v0,-48,32,-80,77,-80v45,0,77,32,77,80xm163,-556v0,-29,-15,-52,-43,-52v-28,0,-43,23,-43,52v0,29,15,52,43,52v28,0,43,-23,43,-52","w":239},"\u00b8":{"d":"183,88v0,25,-20,54,-63,54v-19,0,-37,-5,-53,-15r8,-28v22,16,72,22,72,-14v0,-26,-38,-30,-53,-15r-26,-8r23,-72r32,0r-15,45v41,-11,75,11,75,53","w":239},"\u02dd":{"d":"221,-578v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40xm120,-578v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40","w":239},"\u02db":{"d":"173,113v-43,22,-117,6,-117,-51v0,-28,18,-51,46,-62r42,0v-36,17,-46,36,-46,55v0,38,51,39,75,26r0,32","w":239},"\u02c7":{"d":"218,-611r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":239},"\u0326":{"d":"161,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":239},"\u00c0":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0xm341,-683r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u00c1":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0xm326,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u00c2":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0xm361,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u00c3":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0xm372,-747v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u00c4":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0xm366,-705v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm240,-705v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u0100":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0xm383,-684r-232,0r0,-43r232,0r0,43","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u0102":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44xm349,-256r-91,-273r-88,273r179,0xm350,-758v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":537,"k":{"\u0102":-30,".":-44,"w":10,"v":40,"V":78,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58,"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30}},"\u00c5":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r181,-552v-27,-12,-45,-39,-45,-74v0,-48,32,-80,77,-80v85,0,103,131,32,154r178,528v5,30,38,24,71,24r0,44xm308,-670v0,-29,-15,-52,-43,-52v-28,0,-43,23,-43,52v0,29,15,52,43,52v28,0,43,-23,43,-52xm349,-256r-91,-273r-88,273r179,0","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u01fa":{"d":"546,0r-180,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r181,-552v-27,-12,-45,-39,-45,-74v0,-48,32,-80,77,-80v85,0,103,131,32,154r178,528v5,30,38,24,71,24r0,44xm308,-670v0,-29,-15,-52,-43,-52v-28,0,-43,23,-43,52v0,29,15,52,43,52v28,0,43,-23,43,-52xm349,-256r-91,-273r-88,273r179,0xm327,-818v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u0104":{"d":"500,113v-43,22,-117,6,-117,-51v0,-28,18,-52,45,-62r-62,0r0,-44r54,0r-55,-166r-210,0v-14,48,-35,96,-44,148v-3,22,37,18,60,18r0,44r-172,0r0,-44r53,0r187,-572r51,0r185,548v5,30,38,24,71,24r0,44v-59,-4,-117,7,-121,55v-3,38,51,39,75,26r0,32xm349,-256r-91,-273r-88,273r179,0","w":537,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u00c6":{"d":"767,0r-410,0r0,-44r53,0r0,-166r-203,0v-26,50,-61,94,-81,150v-1,20,29,16,49,16r0,44r-168,0r0,-44r52,0r329,-572r360,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,18,7,24,22,24r210,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm410,-256r0,-306r-176,306r176,0","w":821,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u01fc":{"d":"767,0r-410,0r0,-44r53,0r0,-166r-203,0v-26,50,-61,94,-81,150v-1,20,29,16,49,16r0,44r-168,0r0,-44r52,0r329,-572r360,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,18,7,24,22,24r210,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm410,-256r0,-306r-176,306r176,0xm639,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":821,"k":{"A":-30,"\u00c0":-30,"\u00c1":-30,"\u00c2":-30,"\u00c3":-30,"\u00c4":-30,"\u0100":-30,"\u0102":-30,"\u00c5":-30,"\u01fa":-30,"\u0104":-30,"\u00c6":-30,"\u01fc":-30,"T":49,"\u0164":49,"\u0162":49,"W":67,"\u1e80":67,"\u1e82":67,"\u0174":67,"\u1e84":67,"Y":58,"\u1ef2":58,"\u00dd":58,"\u0176":58,"\u0178":58}},"\u0106":{"d":"273,11v-172,0,-230,-119,-230,-320v0,-204,91,-319,229,-319v52,0,97,21,122,52r9,-39r36,0r0,181v-22,0,-47,4,-47,-18v0,-75,-38,-127,-119,-127v-102,0,-164,97,-164,270v0,179,53,272,167,272v57,0,108,-27,144,-61r25,32v-36,41,-105,77,-172,77xm333,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":486},"\u00c7":{"d":"242,9v-150,-22,-199,-128,-199,-318v0,-204,91,-319,229,-319v52,0,97,21,122,52r9,-39r36,0r0,181v-22,0,-47,4,-47,-18v0,-75,-38,-127,-119,-127v-102,0,-164,97,-164,270v0,179,53,272,167,272v57,0,108,-27,144,-61r25,32v-36,41,-105,77,-172,77r-8,24v41,-11,75,11,75,53v0,25,-20,54,-63,54v-19,0,-37,-5,-53,-15r8,-28v22,16,72,22,72,-14v0,-26,-38,-30,-53,-15r-26,-8","w":486},"\u0108":{"d":"273,11v-172,0,-230,-119,-230,-320v0,-204,91,-319,229,-319v52,0,97,21,122,52r9,-39r36,0r0,181v-22,0,-47,4,-47,-18v0,-75,-38,-127,-119,-127v-102,0,-164,97,-164,270v0,179,53,272,167,272v57,0,108,-27,144,-61r25,32v-36,41,-105,77,-172,77xm366,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":486},"\u010c":{"d":"273,11v-172,0,-230,-119,-230,-320v0,-204,91,-319,229,-319v52,0,97,21,122,52r9,-39r36,0r0,181v-22,0,-47,4,-47,-18v0,-75,-38,-127,-119,-127v-102,0,-164,97,-164,270v0,179,53,272,167,272v57,0,108,-27,144,-61r25,32v-36,41,-105,77,-172,77xm367,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":486},"\u010a":{"d":"273,11v-172,0,-230,-119,-230,-320v0,-204,91,-319,229,-319v52,0,97,21,122,52r9,-39r36,0r0,181v-22,0,-47,4,-47,-18v0,-75,-38,-127,-119,-127v-102,0,-164,97,-164,270v0,179,53,272,167,272v57,0,108,-27,144,-61r25,32v-36,41,-105,77,-172,77xm315,-714v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":486},"\u010e":{"d":"215,-616v242,-11,316,106,316,323v0,189,-71,308,-282,293r-196,0r0,-44r53,0r0,-503v5,-32,-29,-24,-56,-25r0,-44r165,0xm465,-294v0,-180,-49,-287,-250,-278r-45,0r0,505v0,39,56,23,90,23v168,0,205,-90,205,-250xm390,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":571},"\u0110":{"d":"215,-616v242,-11,316,106,316,323v0,189,-71,308,-282,293r-196,0r0,-44r53,0r0,-250r-100,0r0,-46r100,0r0,-207v5,-32,-29,-24,-56,-25r0,-44r165,0xm465,-294v0,-180,-49,-287,-250,-278r-45,0r0,232r101,0r0,46r-101,0r0,227v0,39,56,23,90,23v168,0,205,-90,205,-250","w":571},"\u00d0":{"d":"215,-616v242,-11,316,106,316,323v0,189,-71,308,-282,293r-196,0r0,-44r53,0r0,-250r-100,0r0,-46r100,0r0,-207v5,-32,-29,-24,-56,-25r0,-44r165,0xm465,-294v0,-180,-49,-287,-250,-278r-45,0r0,232r101,0r0,46r-101,0r0,227v0,39,56,23,90,23v168,0,205,-90,205,-250","w":570},"\u00c8":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm331,-683r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":517},"\u00c9":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm328,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":517},"\u00ca":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm355,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":517},"\u011a":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm370,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":517},"\u00cb":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm366,-705v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm240,-705v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":517},"\u0112":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm374,-684r-232,0r0,-43r232,0r0,43","w":517},"\u0114":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm354,-757v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":517},"\u0116":{"d":"463,0r-410,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm315,-714v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":517},"\u0118":{"d":"463,0v-47,-5,-84,22,-87,55v-3,38,51,39,75,26r0,32v-43,22,-117,6,-117,-51v0,-28,18,-51,46,-62r-327,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r394,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157","w":517},"\u011c":{"d":"515,-220r-53,0r0,220r-45,0r-12,-35v-27,24,-82,46,-134,46v-142,0,-228,-97,-228,-315v0,-207,86,-324,234,-324v57,0,107,22,134,55r11,-42r34,0r0,183v-21,0,-44,3,-44,-18v0,-74,-47,-130,-133,-130v-109,0,-170,100,-170,273v0,176,56,270,168,270v49,0,96,-23,121,-45r0,-116v5,-28,-31,-21,-56,-22r0,-44r173,0r0,44xm371,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":552},"\u011e":{"d":"515,-220r-53,0r0,220r-45,0r-12,-35v-27,24,-82,46,-134,46v-142,0,-228,-97,-228,-315v0,-207,86,-324,234,-324v57,0,107,22,134,55r11,-42r34,0r0,183v-21,0,-44,3,-44,-18v0,-74,-47,-130,-133,-130v-109,0,-170,100,-170,273v0,176,56,270,168,270v49,0,96,-23,121,-45r0,-116v5,-28,-31,-21,-56,-22r0,-44r173,0r0,44xm364,-757v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":552},"\u0120":{"d":"515,-220r-53,0r0,220r-45,0r-12,-35v-27,24,-82,46,-134,46v-142,0,-228,-97,-228,-315v0,-207,86,-324,234,-324v57,0,107,22,134,55r11,-42r34,0r0,183v-21,0,-44,3,-44,-18v0,-74,-47,-130,-133,-130v-109,0,-170,100,-170,273v0,176,56,270,168,270v49,0,96,-23,121,-45r0,-116v5,-28,-31,-21,-56,-22r0,-44r173,0r0,44xm319,-714v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":552},"\u0122":{"d":"515,-220r-53,0r0,220r-45,0r-12,-35v-27,24,-82,46,-134,46v-142,0,-228,-97,-228,-315v0,-207,86,-324,234,-324v57,0,107,22,134,55r11,-42r34,0r0,183v-21,0,-44,3,-44,-18v0,-74,-47,-130,-133,-130v-109,0,-170,100,-170,273v0,176,56,270,168,270v49,0,96,-23,121,-45r0,-116v5,-28,-31,-21,-56,-22r0,-44r173,0r0,44xm319,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":552},"\u0124":{"d":"563,0r-173,0r0,-44r53,0r0,-247r-273,0r0,224v-4,29,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,230r273,0r0,-207v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm405,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":613},"\u0126":{"d":"579,-480r0,44r-72,0r0,369v-4,29,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-247r-273,0r0,224v-4,29,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-392r-72,0r0,-44r72,0v-6,-33,17,-92,-23,-92r-33,0r0,-44r173,0r0,44r-53,0r0,92r273,0v-6,-33,17,-92,-23,-92r-33,0r0,-44r173,0r0,44r-53,0r0,92r72,0xm170,-342r273,0r0,-94r-273,0r0,94","w":613},"\u00cc":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm205,-683r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":276},"\u00cd":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm199,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":276},"\u00ce":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm234,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":276},"\u0128":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm246,-747v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":276},"\u00cf":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm238,-705v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm112,-705v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":276},"\u012a":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm254,-684r-232,0r0,-43r232,0r0,43","w":276},"\u012c":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm225,-757v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":276},"\u0130":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44xm182,-714v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":276},"\u012e":{"d":"226,0v-46,-1,-75,25,-75,55v0,38,51,39,75,26r0,32v-43,22,-117,6,-117,-51v0,-28,18,-51,46,-62r-102,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,505v-4,29,30,22,56,23r0,44","w":276},"\u0132":{"d":"226,0r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r9,44r-62,0r0,505v-4,29,30,22,56,23r0,44xm393,-37v90,0,107,-59,107,-160r0,-351v0,-19,-4,-24,-24,-24r-155,0r-9,-44r252,0r0,418v9,143,-47,208,-166,209v-40,0,-85,-12,-108,-22r0,-47v32,12,72,21,103,21","w":644},"\u0134":{"d":"133,-37v90,0,107,-59,107,-160r0,-351v0,-19,-4,-24,-24,-24r-155,0r-9,-44r252,0r0,418v9,143,-47,208,-166,209v-40,0,-85,-12,-108,-22r0,-47v32,12,72,21,103,21xm286,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":384},"\u0136":{"d":"533,0r-107,0r-190,-309r-66,81r0,166v-1,24,33,17,56,18r0,44r-173,0r0,-44r53,0r0,-503v7,-30,-30,-25,-56,-25r0,-44r173,0r0,44r-53,0r0,268r180,-222v26,-32,46,-66,52,-90r116,0r0,44v-48,1,-65,-5,-94,31r-148,183r176,287v17,32,41,27,81,27r0,44xm352,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":560},"\u0139":{"d":"456,0r-403,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r173,0r0,44r-53,0r0,504v0,19,8,24,26,24r199,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm202,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":484},"\u013d":{"d":"346,-587v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41xm456,0r-403,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r173,0r0,44r-53,0r0,504v0,19,8,24,26,24r199,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157","w":484},"\u013b":{"d":"456,0r-403,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r173,0r0,44r-53,0r0,504v0,19,8,24,26,24r199,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm324,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":484},"\u0141":{"d":"456,0r-403,0r0,-44r53,0r0,-234r-95,45r0,-44r95,-45r0,-226v5,-32,-30,-23,-56,-24r0,-44r173,0r0,44r-53,0r0,220r97,-46r0,43r-97,46r0,241v0,19,8,24,26,24r199,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157","w":492},"\u013f":{"d":"456,0r-403,0r0,-44r53,0r0,-504v5,-32,-30,-23,-56,-24r0,-44r173,0r0,44r-53,0r0,504v0,19,8,24,26,24r199,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm366,-328v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":484},"\u0143":{"d":"581,-572r-53,0r0,572r-49,0r-319,-495r0,432v-2,26,33,18,56,19r0,44r-161,0r0,-44r53,0r0,-506v3,-30,-31,-20,-56,-22r0,-44r102,0r320,496r0,-428v5,-28,-30,-24,-56,-24r0,-44r163,0r0,44xm384,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":626},"\u0147":{"d":"581,-572r-53,0r0,572r-49,0r-319,-495r0,432v-2,26,33,18,56,19r0,44r-161,0r0,-44r53,0r0,-506v3,-30,-31,-20,-56,-22r0,-44r102,0r320,496r0,-428v5,-28,-30,-24,-56,-24r0,-44r163,0r0,44xm411,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":626},"\u00d1":{"d":"581,-572r-53,0r0,572r-49,0r-319,-495r0,432v-2,26,33,18,56,19r0,44r-161,0r0,-44r53,0r0,-506v3,-30,-31,-20,-56,-22r0,-44r102,0r320,496r0,-428v5,-28,-30,-24,-56,-24r0,-44r163,0r0,44xm425,-747v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":626},"\u0145":{"d":"581,-572r-53,0r0,572r-49,0r-319,-495r0,432v-2,26,33,18,56,19r0,44r-161,0r0,-44r53,0r0,-506v3,-30,-31,-20,-56,-22r0,-44r102,0r320,496r0,-428v5,-28,-30,-24,-56,-24r0,-44r163,0r0,44xm362,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":626},"\u014a":{"d":"342,111v77,25,147,7,132,-93r0,-26r-314,-487r0,432v-2,26,33,18,56,19r0,44r-161,0r0,-44r53,0r0,-506v3,-30,-31,-20,-56,-22r0,-44r102,0r320,496r0,-428v5,-28,-30,-24,-56,-24r0,-44r163,0r0,44r-53,0r0,586v5,96,-26,151,-118,151v-26,0,-48,-4,-68,-12r0,-42","w":626},"\u00d2":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm338,-683r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":530},"\u00d3":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm321,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":530},"\u00d4":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm362,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":530},"\u00d5":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm374,-747v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":530},"\u00d6":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm366,-705v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm240,-705v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":530},"\u014c":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm381,-684r-232,0r0,-43r232,0r0,43","w":530},"\u014e":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm352,-757v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":530},"\u0150":{"d":"486,-309v0,162,-57,320,-222,320v-165,0,-220,-155,-220,-319v0,-162,57,-320,222,-320v165,0,220,157,220,319xm420,-309v0,-145,-40,-270,-155,-270v-115,0,-155,125,-155,270v0,145,40,271,155,271v115,0,155,-126,155,-271xm366,-727v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40xm265,-727v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40","w":530},"\u00d8":{"d":"483,-309v0,162,-57,320,-222,320v-49,0,-89,-14,-120,-38r-48,93r-47,0r64,-123v-50,-61,-69,-154,-69,-251v0,-162,57,-320,222,-320v51,0,91,15,123,41r47,-90r46,0r-63,120v48,61,67,154,67,248xm359,-535v-24,-28,-55,-44,-97,-44v-173,0,-184,320,-120,461xm262,-38v172,0,183,-315,122,-457r-216,416v23,26,54,41,94,41","w":522},"\u01fe":{"d":"483,-309v0,162,-57,320,-222,320v-49,0,-89,-14,-120,-38r-48,93r-47,0r64,-123v-50,-61,-69,-154,-69,-251v0,-162,57,-320,222,-320v51,0,91,15,123,41r47,-90r46,0r-63,120v48,61,67,154,67,248xm359,-535v-24,-28,-55,-44,-97,-44v-173,0,-184,320,-120,461xm262,-38v172,0,183,-315,122,-457r-216,416v23,26,54,41,94,41xm328,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":522},"\u0152":{"d":"745,0r-230,0v-150,0,-173,11,-245,11v-165,0,-226,-155,-226,-319v0,-162,61,-320,226,-320v84,0,102,12,217,12r239,0r5,165v-20,-1,-35,3,-41,-15v-14,-43,2,-106,-66,-106r-172,0r0,234r146,0v10,-23,2,-66,42,-59r0,165v-38,8,-33,-35,-44,-59r-144,0r0,223v0,19,8,24,26,24r206,0v15,-39,24,-92,26,-131v18,-1,35,-1,35,18r0,157xm266,-38v83,0,122,-1,122,-78r0,-376v0,-86,-31,-87,-122,-87v-115,0,-156,125,-156,270v0,145,41,271,156,271","w":799},"\u00de":{"d":"245,-493v156,-8,238,52,238,180v0,162,-120,199,-313,189v4,31,-15,82,23,80r33,0r0,44r-173,0r0,-44r53,0r0,-505v4,-29,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,79r75,0xm417,-313v5,-131,-110,-142,-247,-136r0,281r56,0v143,5,187,-38,191,-145","w":513},"\u0154":{"d":"475,-446v0,95,-52,163,-150,174r114,202v13,32,41,25,80,26r0,44r-111,0r-150,-267r-88,0r0,199v-1,36,29,21,56,24r0,44r-173,0r0,-44r53,0r0,-501v8,-29,-28,-29,-56,-27r0,-44r177,0v172,-4,248,30,248,170xm357,-332v59,-38,78,-170,6,-219v-20,-24,-118,-21,-193,-21r0,260v66,0,164,3,187,-20xm336,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":545},"\u0158":{"d":"475,-446v0,95,-52,163,-150,174r114,202v13,32,41,25,80,26r0,44r-111,0r-150,-267r-88,0r0,199v-1,36,29,21,56,24r0,44r-173,0r0,-44r53,0r0,-501v8,-29,-28,-29,-56,-27r0,-44r177,0v172,-4,248,30,248,170xm357,-332v59,-38,78,-170,6,-219v-20,-24,-118,-21,-193,-21r0,260v66,0,164,3,187,-20xm367,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":545},"\u0156":{"d":"475,-446v0,95,-52,163,-150,174r114,202v13,32,41,25,80,26r0,44r-111,0r-150,-267r-88,0r0,199v-1,36,29,21,56,24r0,44r-173,0r0,-44r53,0r0,-501v8,-29,-28,-29,-56,-27r0,-44r177,0v172,-4,248,30,248,170xm357,-332v59,-38,78,-170,6,-219v-20,-24,-118,-21,-193,-21r0,260v66,0,164,3,187,-20xm338,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":545},"\u015a":{"d":"446,-159v0,177,-232,217,-342,116r-14,43r-36,0r0,-181v20,0,38,-3,40,17v7,84,82,129,159,129v82,0,131,-51,131,-110v0,-82,-56,-110,-168,-147v-85,-28,-164,-67,-164,-170v0,-163,233,-223,323,-104r8,-49r35,0r0,181v-21,0,-40,2,-42,-18v-13,-78,-54,-133,-138,-132v-70,0,-124,40,-124,109v0,70,54,96,142,127v93,33,190,70,190,189xm314,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":482},"\u015c":{"d":"446,-159v0,177,-232,217,-342,116r-14,43r-36,0r0,-181v20,0,38,-3,40,17v7,84,82,129,159,129v82,0,131,-51,131,-110v0,-82,-56,-110,-168,-147v-85,-28,-164,-67,-164,-170v0,-163,233,-223,323,-104r8,-49r35,0r0,181v-21,0,-40,2,-42,-18v-13,-78,-54,-133,-138,-132v-70,0,-124,40,-124,109v0,70,54,96,142,127v93,33,190,70,190,189xm340,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":482},"\u0160":{"d":"446,-159v0,177,-232,217,-342,116r-14,43r-36,0r0,-181v20,0,38,-3,40,17v7,84,82,129,159,129v82,0,131,-51,131,-110v0,-82,-56,-110,-168,-147v-85,-28,-164,-67,-164,-170v0,-163,233,-223,323,-104r8,-49r35,0r0,181v-21,0,-40,2,-42,-18v-13,-78,-54,-133,-138,-132v-70,0,-124,40,-124,109v0,70,54,96,142,127v93,33,190,70,190,189xm338,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":482},"\u015e":{"d":"321,88v0,25,-20,54,-63,54v-19,0,-37,-5,-53,-15r8,-28v22,16,72,22,72,-14v0,-26,-38,-30,-53,-15r-26,-8r17,-53v-44,-6,-89,-22,-119,-52r-14,43r-36,0r0,-181v20,0,38,-3,40,17v7,84,82,129,159,129v82,0,131,-51,131,-110v0,-82,-56,-110,-168,-147v-85,-28,-164,-67,-164,-170v0,-163,233,-223,323,-104r8,-49r35,0r0,181v-21,0,-40,2,-42,-18v-13,-78,-54,-133,-138,-132v-70,0,-124,40,-124,109v0,70,54,96,142,127v93,33,190,70,190,189v0,113,-86,170,-192,170r-8,24v41,-11,75,11,75,53","w":482},"\u0218":{"d":"446,-159v0,177,-232,217,-342,116r-14,43r-36,0r0,-181v20,0,38,-3,40,17v7,84,82,129,159,129v82,0,131,-51,131,-110v0,-82,-56,-110,-168,-147v-85,-28,-164,-67,-164,-170v0,-163,233,-223,323,-104r8,-49r35,0r0,181v-21,0,-40,2,-42,-18v-13,-78,-54,-133,-138,-132v-70,0,-124,40,-124,109v0,70,54,96,142,127v93,33,190,70,190,189xm297,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":482},"\u0164":{"d":"505,-464v-22,0,-40,4,-43,-18v-14,-35,-1,-90,-58,-90r-107,0r0,505v-3,30,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-528r-107,0v-57,-7,-43,55,-58,90v-3,22,-21,18,-43,18r7,-152r466,0xm363,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":530,"k":{".":44}},"\u0162":{"d":"505,-464v-22,0,-40,4,-43,-18v-14,-35,-1,-90,-58,-90r-107,0r0,505v-3,30,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-528r-107,0v-57,-7,-43,55,-58,90v-3,22,-21,18,-43,18r7,-152r466,0xm308,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":530,"k":{".":44}},"\u021a":{"d":"505,-464v-22,0,-40,4,-43,-18v-14,-35,-1,-90,-58,-90r-107,0r0,505v-3,30,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-528r-107,0v-57,-7,-43,55,-58,90v-3,22,-21,18,-43,18r7,-152r466,0xm308,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":530,"k":{".":44}},"\u0166":{"d":"103,-328r130,0r0,-244r-107,0v-57,-7,-43,55,-58,90v-3,22,-21,18,-43,18r7,-152r466,0r7,152v-22,0,-40,4,-43,-18v-14,-35,-1,-90,-58,-90r-107,0r0,244r130,0r0,44r-130,0r0,217v-3,30,30,22,56,23r0,44r-173,0r0,-44r53,0r0,-240r-130,0r0,-44","w":530,"k":{".":44}},"\u00d9":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm373,-683r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":586},"\u00da":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm365,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":586},"\u00db":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm397,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":586},"\u0168":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm401,-747v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":586},"\u00dc":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm402,-705v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm276,-705v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":586},"\u016a":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm409,-684r-232,0r0,-43r232,0r0,43","w":586},"\u016c":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm388,-757v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":586},"\u016e":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm381,-716v0,48,-32,80,-77,80v-45,0,-77,-32,-77,-80v0,-48,32,-80,77,-80v45,0,77,32,77,80xm347,-716v0,-29,-15,-52,-43,-52v-28,0,-43,23,-43,52v0,29,15,52,43,52v28,0,43,-23,43,-52","w":586},"\u0170":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v0,58,-4,110,-30,158v-31,56,-96,93,-172,93v-135,-1,-206,-78,-206,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197xm394,-727v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40xm293,-727v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40","w":586},"\u0172":{"d":"299,-37v119,0,146,-78,146,-212r0,-296v4,-34,-28,-26,-56,-27r0,-44r165,0r0,44r-53,0r0,332v5,110,-35,205,-119,235v-41,15,-60,33,-60,60v0,38,51,39,75,26r0,32v-43,22,-117,6,-117,-51v0,-21,9,-39,26,-51v-141,2,-213,-76,-213,-233r0,-327v4,-30,-30,-22,-56,-23r0,-44r173,0r0,44r-53,0r0,338v-4,125,32,197,142,197","w":586},"\u1e80":{"d":"496,-683r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84xm837,-572v-35,2,-69,-8,-78,26r-140,546r-74,0r-125,-477r-130,477r-68,0r-139,-551v-1,-26,-40,-20,-69,-21r0,-44r183,0r0,44r-57,0r123,486r145,-530r35,0r144,548r128,-504r-59,0r0,-44r181,0r0,44","w":845,"k":{"a":57,"\u00e0":57,"\u00e1":57,"\u00e2":57,"\u00e3":57,"\u00e4":57,"\u0101":57,"\u0103":57,"\u00e5":57,"\u01fb":57,"\u0105":57,"\u00e6":57,"\u01fd":57,"e":52,"\u00e8":52,"\u00e9":52,"\u00ea":52,"\u011b":52,"\u00eb":52,"\u0113":52,"\u0115":52,"\u0117":52,"\u0119":52,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12,"o":48,"\u00f2":48,"\u00f3":48,"\u00f4":48,"\u00f5":48,"\u00f6":48,"\u014d":48,"\u014f":48,"\u0151":48,"\u00f8":48,"\u01ff":48,"\u0153":48,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24,"A":69,"\u00c0":69,"\u00c1":69,"\u00c2":69,"\u00c3":69,"\u00c4":69,"\u0100":69,"\u0102":69,"\u00c5":69,"\u01fa":69,"\u0104":69,"\u00c6":69,"\u01fc":69,"O":5,"\u00d2":5,"\u00d3":5,"\u00d4":5,"\u00d5":5,"\u00d6":5,"\u014c":5,"\u014e":5,"\u0150":5,"\u00d8":5,"\u01fe":5,"\u0152":5}},"\u1e82":{"d":"837,-572v-35,2,-69,-8,-78,26r-140,546r-74,0r-125,-477r-130,477r-68,0r-139,-551v-1,-26,-40,-20,-69,-21r0,-44r183,0r0,44r-57,0r123,486r145,-530r35,0r144,548r128,-504r-59,0r0,-44r181,0r0,44xm503,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":845,"k":{"a":57,"\u00e0":57,"\u00e1":57,"\u00e2":57,"\u00e3":57,"\u00e4":57,"\u0101":57,"\u0103":57,"\u00e5":57,"\u01fb":57,"\u0105":57,"\u00e6":57,"\u01fd":57,"e":52,"\u00e8":52,"\u00e9":52,"\u00ea":52,"\u011b":52,"\u00eb":52,"\u0113":52,"\u0115":52,"\u0117":52,"\u0119":52,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12,"o":48,"\u00f2":48,"\u00f3":48,"\u00f4":48,"\u00f5":48,"\u00f6":48,"\u014d":48,"\u014f":48,"\u0151":48,"\u00f8":48,"\u01ff":48,"\u0153":48,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24,"A":69,"\u00c0":69,"\u00c1":69,"\u00c2":69,"\u00c3":69,"\u00c4":69,"\u0100":69,"\u0102":69,"\u00c5":69,"\u01fa":69,"\u0104":69,"\u00c6":69,"\u01fc":69,"O":5,"\u00d2":5,"\u00d3":5,"\u00d4":5,"\u00d5":5,"\u00d6":5,"\u014c":5,"\u014e":5,"\u0150":5,"\u00d8":5,"\u01fe":5,"\u0152":5}},"\u0174":{"d":"837,-572v-35,2,-69,-8,-78,26r-140,546r-74,0r-125,-477r-130,477r-68,0r-139,-551v-1,-26,-40,-20,-69,-21r0,-44r183,0r0,44r-57,0r123,486r145,-530r35,0r144,548r128,-504r-59,0r0,-44r181,0r0,44xm524,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":845,"k":{"a":57,"\u00e0":57,"\u00e1":57,"\u00e2":57,"\u00e3":57,"\u00e4":57,"\u0101":57,"\u0103":57,"\u00e5":57,"\u01fb":57,"\u0105":57,"\u00e6":57,"\u01fd":57,"e":52,"\u00e8":52,"\u00e9":52,"\u00ea":52,"\u011b":52,"\u00eb":52,"\u0113":52,"\u0115":52,"\u0117":52,"\u0119":52,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12,"o":48,"\u00f2":48,"\u00f3":48,"\u00f4":48,"\u00f5":48,"\u00f6":48,"\u014d":48,"\u014f":48,"\u0151":48,"\u00f8":48,"\u01ff":48,"\u0153":48,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24,"A":69,"\u00c0":69,"\u00c1":69,"\u00c2":69,"\u00c3":69,"\u00c4":69,"\u0100":69,"\u0102":69,"\u00c5":69,"\u01fa":69,"\u0104":69,"\u00c6":69,"\u01fc":69,"O":5,"\u00d2":5,"\u00d3":5,"\u00d4":5,"\u00d5":5,"\u00d6":5,"\u014c":5,"\u014e":5,"\u0150":5,"\u00d8":5,"\u01fe":5,"\u0152":5}},"\u1e84":{"d":"528,-705v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm402,-705v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38xm837,-572v-35,2,-69,-8,-78,26r-140,546r-74,0r-125,-477r-130,477r-68,0r-139,-551v-1,-26,-40,-20,-69,-21r0,-44r183,0r0,44r-57,0r123,486r145,-530r35,0r144,548r128,-504r-59,0r0,-44r181,0r0,44","w":845,"k":{"a":57,"\u00e0":57,"\u00e1":57,"\u00e2":57,"\u00e3":57,"\u00e4":57,"\u0101":57,"\u0103":57,"\u00e5":57,"\u01fb":57,"\u0105":57,"\u00e6":57,"\u01fd":57,"e":52,"\u00e8":52,"\u00e9":52,"\u00ea":52,"\u011b":52,"\u00eb":52,"\u0113":52,"\u0115":52,"\u0117":52,"\u0119":52,"i":12,"\u0131":12,"\u00ec":12,"\u00ed":12,"\u00ee":12,"\u0129":12,"\u00ef":12,"\u012b":12,"\u012d":12,"\u012f":12,"\u0133":12,"o":48,"\u00f2":48,"\u00f3":48,"\u00f4":48,"\u00f5":48,"\u00f6":48,"\u014d":48,"\u014f":48,"\u0151":48,"\u00f8":48,"\u01ff":48,"\u0153":48,"u":24,"\u00f9":24,"\u00fa":24,"\u00fb":24,"\u0169":24,"\u00fc":24,"\u016b":24,"\u016d":24,"\u016f":24,"\u0171":24,"\u0173":24,"A":69,"\u00c0":69,"\u00c1":69,"\u00c2":69,"\u00c3":69,"\u00c4":69,"\u0100":69,"\u0102":69,"\u00c5":69,"\u01fa":69,"\u0104":69,"\u00c6":69,"\u01fc":69,"O":5,"\u00d2":5,"\u00d3":5,"\u00d4":5,"\u00d5":5,"\u00d6":5,"\u014c":5,"\u014e":5,"\u0150":5,"\u00d8":5,"\u01fe":5,"\u0152":5}},"\u1ef2":{"d":"545,-572v-49,2,-70,-8,-92,36r-148,300r0,172v-2,28,32,18,56,20r0,44r-173,0r0,-44r53,0r0,-192r-146,-302v-15,-37,-41,-34,-86,-34r0,-44r189,0r0,44r-54,0r135,280r138,-280r-50,0r0,-44r178,0r0,44xm347,-683r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":500},"\u00dd":{"d":"545,-572v-49,2,-70,-8,-92,36r-148,300r0,172v-2,28,32,18,56,20r0,44r-173,0r0,-44r53,0r0,-192r-146,-302v-15,-37,-41,-34,-86,-34r0,-44r189,0r0,44r-54,0r135,280r138,-280r-50,0r0,-44r178,0r0,44xm346,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":546},"\u0176":{"d":"545,-572v-49,2,-70,-8,-92,36r-148,300r0,172v-2,28,32,18,56,20r0,44r-173,0r0,-44r53,0r0,-192r-146,-302v-15,-37,-41,-34,-86,-34r0,-44r189,0r0,44r-54,0r135,280r138,-280r-50,0r0,-44r178,0r0,44xm382,-657r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":546},"\u0178":{"d":"545,-572v-49,2,-70,-8,-92,36r-148,300r0,172v-2,28,32,18,56,20r0,44r-173,0r0,-44r53,0r0,-192r-146,-302v-15,-37,-41,-34,-86,-34r0,-44r189,0r0,44r-54,0r135,280r138,-280r-50,0r0,-44r178,0r0,44xm384,-705v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm258,-705v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":546},"\u0179":{"d":"468,0r-412,0v-4,-38,17,-63,31,-88r295,-480r-234,0v-46,-2,-28,64,-41,96r-39,0r0,-144r394,0v1,38,-3,40,-37,95r-290,473r253,0v46,2,28,-64,41,-96r39,0r0,144xm324,-715v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":509},"\u017d":{"d":"468,0r-412,0v-4,-38,17,-63,31,-88r295,-480r-234,0v-46,-2,-28,64,-41,96r-39,0r0,-144r394,0v1,38,-3,40,-37,95r-290,473r253,0v46,2,28,-64,41,-96r39,0r0,144xm360,-761r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":509},"\u017b":{"d":"468,0r-412,0v-4,-38,17,-63,31,-88r295,-480r-234,0v-46,-2,-28,64,-41,96r-39,0r0,-144r394,0v1,38,-3,40,-37,95r-290,473r253,0v46,2,28,-64,41,-96r39,0r0,144xm314,-714v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":509},"\u00e0":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm291,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84"},"\u00e1":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm281,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52"},"\u00e2":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm314,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0"},"\u00e3":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm325,-617v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0"},"\u00e4":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm321,-568v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm195,-568v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38"},"\u0101":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm332,-545r-232,0r0,-43r232,0r0,43"},"\u0103":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm306,-617v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0"},"\u00e5":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm296,-583v0,48,-32,80,-77,80v-45,0,-77,-32,-77,-80v0,-48,32,-80,77,-80v45,0,77,32,77,80xm264,-583v0,-31,-15,-54,-45,-54v-30,0,-45,23,-45,54v0,31,15,54,45,54v30,0,45,-23,45,-54"},"\u01fb":{"d":"411,0v-48,-2,-101,11,-106,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19r0,39xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125xm296,-583v0,48,-32,80,-77,80v-45,0,-77,-32,-77,-80v0,-48,32,-80,77,-80v45,0,77,32,77,80xm262,-583v0,-29,-15,-52,-43,-52v-28,0,-43,23,-43,52v0,29,15,52,43,52v28,0,43,-23,43,-52xm278,-735v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52"},"\u0105":{"d":"411,-39r0,39v-30,0,-60,24,-60,55v0,38,51,39,75,26r0,32v-43,22,-117,6,-117,-51v0,-28,17,-51,45,-62v-24,0,-46,-8,-49,-37v-24,28,-69,50,-116,50v-85,0,-141,-50,-141,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v38,-17,90,-29,132,-29v109,0,148,49,148,161r0,252v-3,25,27,18,49,19xm109,-126v0,118,148,116,193,40r0,-165v-88,-5,-193,31,-193,125"},"\u00e6":{"d":"642,-220r-280,0v0,111,34,187,127,187v50,0,91,-29,122,-62r25,26v-61,97,-235,114,-298,11v-29,38,-87,71,-148,71v-85,0,-142,-49,-142,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v84,-40,235,-46,264,39v30,-43,75,-68,132,-68v116,0,169,99,164,251xm579,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm109,-126v0,129,168,109,211,31v-16,-40,-25,-97,-21,-156v-88,-5,-190,32,-190,125","w":685},"\u01fd":{"d":"642,-220r-280,0v0,111,34,187,127,187v50,0,91,-29,122,-62r25,26v-61,97,-235,114,-298,11v-29,38,-87,71,-148,71v-85,0,-142,-49,-142,-134v0,-128,113,-173,254,-171v2,-82,-12,-133,-98,-132v-42,0,-84,13,-122,31r0,-49v84,-40,235,-46,264,39v30,-43,75,-68,132,-68v116,0,169,99,164,251xm579,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm109,-126v0,129,168,109,211,31v-16,-40,-25,-97,-21,-156v-88,-5,-190,32,-190,125xm434,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":685},"\u0107":{"d":"379,-62v-30,41,-86,75,-150,75v-116,0,-186,-79,-186,-240v0,-167,90,-244,188,-244v43,0,81,19,100,44r5,-31r35,0r0,147v-22,0,-44,5,-45,-18v-6,-58,-36,-97,-95,-97v-77,0,-125,68,-125,198v0,124,41,195,130,195v45,0,88,-24,118,-55xm287,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":416},"\u00e7":{"d":"295,88v0,25,-20,54,-63,54v-19,0,-37,-5,-53,-15r8,-28v22,16,72,22,72,-14v0,-26,-38,-30,-53,-15r-26,-8r16,-52v-96,-13,-153,-91,-153,-237v0,-167,90,-244,188,-244v43,0,81,19,100,44r5,-31r35,0r0,147v-22,0,-44,5,-45,-18v-6,-58,-36,-97,-95,-97v-77,0,-125,68,-125,198v0,124,41,195,130,195v45,0,88,-24,118,-55r25,26v-31,41,-86,76,-152,75r-7,22v41,-11,75,11,75,53","w":416},"\u0109":{"d":"379,-62v-30,41,-86,75,-150,75v-116,0,-186,-79,-186,-240v0,-167,90,-244,188,-244v43,0,81,19,100,44r5,-31r35,0r0,147v-22,0,-44,5,-45,-18v-6,-58,-36,-97,-95,-97v-77,0,-125,68,-125,198v0,124,41,195,130,195v45,0,88,-24,118,-55xm327,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":416},"\u010d":{"d":"379,-62v-30,41,-86,75,-150,75v-116,0,-186,-79,-186,-240v0,-167,90,-244,188,-244v43,0,81,19,100,44r5,-31r35,0r0,147v-22,0,-44,5,-45,-18v-6,-58,-36,-97,-95,-97v-77,0,-125,68,-125,198v0,124,41,195,130,195v45,0,88,-24,118,-55xm330,-611r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":416},"\u010b":{"d":"379,-62v-30,41,-86,75,-150,75v-116,0,-186,-79,-186,-240v0,-167,90,-244,188,-244v43,0,81,19,100,44r5,-31r35,0r0,147v-22,0,-44,5,-45,-18v-6,-58,-36,-97,-95,-97v-77,0,-125,68,-125,198v0,124,41,195,130,195v45,0,88,-24,118,-55xm271,-563v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":416},"\u010f":{"d":"509,-647v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41xm44,-221v0,-136,57,-250,185,-250v40,0,78,14,105,33r0,-205r-55,0r-8,-39v56,0,69,-5,100,-5v16,0,23,6,23,22r0,608v-4,24,33,17,55,18r0,39v-46,-2,-110,11,-113,-32v-26,26,-71,45,-115,45v-125,2,-177,-105,-177,-234xm233,-425v-99,0,-126,79,-126,200v0,127,43,194,124,194v40,0,79,-20,103,-50r0,-305v-29,-24,-65,-39,-101,-39","w":499},"\u0111":{"d":"44,-221v0,-136,57,-250,185,-250v40,0,78,14,105,33r0,-97r-130,0r0,-42r130,0r0,-66r-55,0r-8,-39v56,0,69,-5,100,-5v16,0,23,6,23,22r0,88r58,0r0,42r-58,0r0,478v-4,24,33,17,55,18r0,39v-46,-2,-110,11,-113,-32v-26,26,-71,45,-115,45v-125,2,-177,-105,-177,-234xm233,-425v-99,0,-126,79,-126,200v0,127,43,194,124,194v40,0,79,-20,103,-50r0,-305v-29,-24,-65,-39,-101,-39","w":475},"\u00f0":{"d":"376,-622r-80,71v82,68,125,172,125,286v0,153,-54,276,-191,276v-112,0,-184,-82,-184,-212v0,-177,149,-260,294,-191v-18,-48,-45,-92,-82,-126r-72,64r-26,-31r66,-58v-30,-21,-64,-37,-102,-46r13,-37v48,10,90,27,126,50r87,-77xm229,-34v120,0,146,-171,125,-307v-116,-68,-247,-20,-247,142v0,88,43,165,122,165","w":473},"\u00e8":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm298,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":425},"\u00e9":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm281,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":425},"\u00ea":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm318,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":425},"\u011b":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm322,-611r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":425},"\u00eb":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm323,-568v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm197,-568v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":425},"\u0113":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm338,-545r-232,0r0,-43r232,0r0,43","w":425},"\u0115":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm312,-617v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":425},"\u0117":{"d":"387,-220r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62r25,26v-33,49,-98,82,-158,82v-112,0,-180,-82,-180,-239v0,-139,63,-245,180,-245v116,0,169,99,164,251xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm268,-563v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":425},"\u0119":{"d":"381,-69v-28,52,-96,62,-106,124v-5,38,51,39,75,26r0,32v-43,22,-118,6,-118,-51v0,-21,9,-41,24,-54v-134,25,-212,-65,-213,-234v0,-139,63,-245,180,-245v116,0,169,99,164,251r-280,0v0,112,34,187,127,187v50,0,91,-29,122,-62xm324,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0","w":425},"\u011d":{"d":"224,-54v126,-7,201,19,202,127v0,76,-66,150,-197,150v-110,0,-187,-49,-187,-145v0,-49,25,-89,57,-113v-36,-39,-16,-110,23,-131v-41,-30,-61,-80,-61,-138v0,-111,86,-191,213,-161v27,-32,58,-47,95,-47v24,0,20,25,20,47v-38,0,-61,4,-80,14v51,28,75,83,75,148v0,94,-50,166,-161,166v-25,0,-46,-3,-65,-10v-13,10,-24,26,-24,43v0,40,40,53,90,50xm324,-303v0,-78,-34,-128,-101,-128v-67,0,-102,49,-102,127v0,78,35,127,102,127v67,0,101,-48,101,-126xm368,79v0,-113,-154,-58,-234,-89v-20,16,-35,44,-35,84v0,66,44,107,131,107v85,0,138,-42,138,-102xm312,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":435},"\u011f":{"d":"224,-54v126,-7,201,19,202,127v0,76,-66,150,-197,150v-110,0,-187,-49,-187,-145v0,-49,25,-89,57,-113v-36,-39,-16,-110,23,-131v-41,-30,-61,-80,-61,-138v0,-111,86,-191,213,-161v27,-32,58,-47,95,-47v24,0,20,25,20,47v-38,0,-61,4,-80,14v51,28,75,83,75,148v0,94,-50,166,-161,166v-25,0,-46,-3,-65,-10v-13,10,-24,26,-24,43v0,40,40,53,90,50xm324,-303v0,-78,-34,-128,-101,-128v-67,0,-102,49,-102,127v0,78,35,127,102,127v67,0,101,-48,101,-126xm368,79v0,-113,-154,-58,-234,-89v-20,16,-35,44,-35,84v0,66,44,107,131,107v85,0,138,-42,138,-102xm313,-617v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":435},"\u0121":{"d":"224,-54v126,-7,201,19,202,127v0,76,-66,150,-197,150v-110,0,-187,-49,-187,-145v0,-49,25,-89,57,-113v-36,-39,-16,-110,23,-131v-41,-30,-61,-80,-61,-138v0,-111,86,-191,213,-161v27,-32,58,-47,95,-47v24,0,20,25,20,47v-38,0,-61,4,-80,14v51,28,75,83,75,148v0,94,-50,166,-161,166v-25,0,-46,-3,-65,-10v-13,10,-24,26,-24,43v0,40,40,53,90,50xm324,-303v0,-78,-34,-128,-101,-128v-67,0,-102,49,-102,127v0,78,35,127,102,127v67,0,101,-48,101,-126xm368,79v0,-113,-154,-58,-234,-89v-20,16,-35,44,-35,84v0,66,44,107,131,107v85,0,138,-42,138,-102xm269,-563v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":435},"\u0123":{"d":"224,-54v126,-7,201,19,202,127v0,76,-66,150,-197,150v-110,0,-187,-49,-187,-145v0,-49,25,-89,57,-113v-36,-39,-16,-110,23,-131v-41,-30,-61,-80,-61,-138v0,-111,86,-191,213,-161v27,-32,58,-47,95,-47v24,0,20,25,20,47v-38,0,-61,4,-80,14v51,28,75,83,75,148v0,94,-50,166,-161,166v-25,0,-46,-3,-65,-10v-13,10,-24,26,-24,43v0,40,40,53,90,50xm324,-303v0,-78,-34,-128,-101,-128v-67,0,-102,49,-102,127v0,78,35,127,102,127v67,0,101,-48,101,-126xm368,79v0,-113,-154,-58,-234,-89v-20,16,-35,44,-35,84v0,66,44,107,131,107v85,0,138,-42,138,-102xm185,-557v0,-38,22,-76,60,-117r19,12v-15,24,-35,57,-36,74v18,2,36,14,36,35v0,19,-12,37,-37,37v-27,0,-42,-19,-42,-41","w":435},"\u0125":{"d":"304,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,259v36,-34,90,-66,152,-66xm218,-716r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":507},"\u0127":{"d":"289,-419v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-487r-74,0r0,-42r74,0r0,-75r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,96r156,0r0,42r-156,0r0,121v36,-34,90,-66,152,-66v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106","w":507},"\u0131":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39","w":239},"\u00ec":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm188,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":239},"\u00ed":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm163,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":239},"\u00ee":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm214,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":239},"\u0129":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm228,-617v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":239},"\u00ef":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm214,-568v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm88,-568v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":239},"\u012b":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm223,-545r-232,0r0,-43r232,0r0,43","w":239},"\u012d":{"d":"205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm202,-617v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":239},"\u012f":{"d":"205,0v-49,-5,-87,19,-90,55v-3,38,51,39,75,26r0,32v-43,22,-117,6,-117,-51v0,-28,18,-51,46,-62r-74,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm158,-606v0,22,-16,40,-38,40v-22,0,-39,-18,-39,-40v0,-22,17,-39,39,-39v22,0,38,17,38,39","w":239},"\u0133":{"d":"158,-606v0,22,-16,40,-38,40v-22,0,-39,-18,-39,-40v0,-22,17,-39,39,-39v22,0,38,17,38,39xm205,0r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,384v-4,21,30,17,51,17r0,39xm391,-606v0,22,-16,40,-38,40v-22,0,-39,-18,-39,-40v0,-22,17,-39,39,-39v22,0,38,17,38,39xm201,141v75,26,126,5,126,-93r0,-467r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,485v5,96,-26,151,-118,151v-26,0,-48,-4,-68,-12r0,-42","w":469},"\u0135":{"d":"-32,141v75,26,126,5,126,-93r0,-467r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,485v5,96,-26,151,-118,151v-26,0,-48,-4,-68,-12r0,-42xm207,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":236},"\u0137":{"d":"457,0r-155,0r0,-39r34,0r-124,-217r-60,64r0,135v-3,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,411v58,-66,135,-128,180,-204r104,0r0,39v-43,2,-63,-8,-91,22r-92,98r135,235v12,26,34,26,69,25r0,39xm301,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":464},"\u0138":{"d":"459,0r-155,0r0,-39r34,0r-124,-217r-60,64r0,135v-3,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,187v58,-66,135,-128,180,-204r104,0r0,39v-43,2,-63,-8,-91,22r-92,98r135,235v12,26,34,26,69,25r0,39","w":469},"\u013a":{"d":"203,0r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,608v-4,21,30,17,51,17r0,39xm173,-774v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":238},"\u013e":{"d":"265,-646v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41xm203,0r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,608v-4,21,30,17,51,17r0,39","w":255},"\u013c":{"d":"203,0r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,608v-4,21,30,17,51,17r0,39xm165,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":238},"\u0142":{"d":"249,-402r-98,47r0,299v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-288r-98,47r0,-46r98,-46r0,-271r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,263r98,-46r0,45","w":236},"\u017f":{"d":"120,-568v0,48,33,91,33,140r0,371v-4,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-79,0r0,-39r72,0v-15,-27,-28,-67,-28,-109v0,-108,118,-150,211,-107r0,44v-56,-27,-149,-24,-149,62","w":259},"\u0140":{"d":"203,0r-160,0r0,-39r49,0r0,-604r-56,0r-8,-39v57,0,70,-5,101,-5v17,0,23,7,23,23r0,608v-4,21,30,17,51,17r0,39xm304,-299v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":298},"\u0144":{"d":"306,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,22,32,23,58v36,-34,90,-66,152,-66xm330,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":510},"\u0148":{"d":"306,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,22,32,23,58v36,-34,90,-66,152,-66xm361,-611r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":510},"\u00f1":{"d":"306,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,22,32,23,58v36,-34,90,-66,152,-66xm370,-617v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":510},"\u0146":{"d":"306,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,22,32,23,58v36,-34,90,-66,152,-66xm299,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":510},"\u0149":{"d":"306,-471v82,0,118,64,118,150r0,265v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-274v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,22,32,23,58v36,-34,90,-66,152,-66xm70,-651v0,46,-25,90,-68,140r-22,-14v18,-29,40,-69,42,-90v-21,-2,-42,-16,-42,-42v0,-22,14,-44,43,-44v30,0,47,23,47,50","w":510},"\u014b":{"d":"238,111v75,26,126,5,126,-93r0,-331v3,-59,-16,-107,-73,-106v-55,1,-105,36,-137,69r0,294v-4,21,30,17,51,17r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v57,0,70,-5,101,-5v31,0,22,32,23,58v36,-34,90,-66,152,-66v82,0,118,64,118,150r0,335v5,96,-26,151,-118,151v-26,0,-48,-4,-68,-12r0,-42","w":504},"\u00f2":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm305,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84"},"\u00f3":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm279,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52"},"\u00f4":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm325,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0"},"\u00f5":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm331,-617v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0"},"\u00f6":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm327,-568v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm201,-568v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38"},"\u014d":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm340,-545r-232,0r0,-43r232,0r0,43"},"\u014f":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm313,-617v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0"},"\u0151":{"d":"404,-230v0,178,-85,243,-182,243v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v99,0,178,63,178,241xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197xm325,-578v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40xm224,-578v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40"},"\u00f8":{"d":"404,-230v0,178,-85,243,-182,243v-32,0,-62,-7,-88,-22r-36,70r-44,0r49,-94v-36,-37,-59,-99,-59,-195v0,-178,85,-243,182,-243v35,0,67,8,94,26r41,-78r42,0r-54,103v34,38,55,99,55,190xm296,-398v-19,-19,-44,-28,-71,-28v-59,0,-118,42,-118,197v0,64,9,110,25,141xm341,-229v0,-59,-8,-103,-22,-134r-161,309v18,16,40,22,65,22v59,0,118,-42,118,-197"},"\u01ff":{"d":"404,-230v0,178,-85,243,-182,243v-32,0,-62,-7,-88,-22r-36,70r-44,0r49,-94v-36,-37,-59,-99,-59,-195v0,-178,85,-243,182,-243v35,0,67,8,94,26r41,-78r42,0r-54,103v34,38,55,99,55,190xm296,-398v-19,-19,-44,-28,-71,-28v-59,0,-118,42,-118,197v0,64,9,110,25,141xm341,-229v0,-59,-8,-103,-22,-134r-161,309v18,16,40,22,65,22v59,0,118,-42,118,-197xm285,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52"},"\u0153":{"d":"685,-220r-280,0v0,111,34,187,127,187v50,0,91,-29,122,-62r25,26v-66,102,-253,115,-307,-6v-33,62,-89,88,-150,88v-99,0,-178,-63,-178,-241v0,-178,85,-243,182,-243v63,0,117,26,149,90v30,-55,79,-90,146,-90v116,0,169,99,164,251xm622,-258v0,-105,-34,-169,-103,-169v-68,0,-107,68,-113,169r216,0xm341,-229v0,-146,-48,-197,-116,-197v-59,0,-118,42,-118,197v0,146,48,197,116,197v59,0,118,-42,118,-197","w":723},"\u00fe":{"d":"444,-236v0,148,-43,249,-180,249v-47,0,-91,-19,-114,-52r0,216v4,59,-65,45,-119,46r0,-39v25,-1,59,8,59,-21r0,-806r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,261v31,-42,76,-67,129,-67v127,0,165,131,165,235xm150,-175v-3,84,36,144,111,144v90,0,120,-87,120,-206v0,-76,-18,-185,-115,-185v-75,0,-116,67,-116,149r0,98","w":488},"\u0155":{"d":"300,-408v-74,-3,-103,10,-146,66r0,285v-3,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v56,0,70,-5,101,-5v34,0,20,42,23,70v34,-47,78,-78,122,-78v35,0,21,35,24,63xm237,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":314,"k":{"a":5,"\u00e0":5,"\u00e1":5,"\u00e2":5,"\u00e3":5,"\u00e4":5,"\u0101":5,"\u0103":5,"\u00e5":5,"\u01fb":5,"\u0105":5,"\u00e6":5,"\u01fd":5,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"i":4,"\u0131":4,"\u00ec":4,"\u00ed":4,"\u00ee":4,"\u0129":4,"\u00ef":4,"\u012b":4,"\u012d":4,"\u012f":4,"\u0133":4,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u0159":{"d":"300,-408v-74,-3,-103,10,-146,66r0,285v-3,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v56,0,70,-5,101,-5v34,0,20,42,23,70v34,-47,78,-78,122,-78v35,0,21,35,24,63xm276,-611r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":314,"k":{"a":5,"\u00e0":5,"\u00e1":5,"\u00e2":5,"\u00e3":5,"\u00e4":5,"\u0101":5,"\u0103":5,"\u00e5":5,"\u01fb":5,"\u0105":5,"\u00e6":5,"\u01fd":5,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"i":4,"\u0131":4,"\u00ec":4,"\u00ed":4,"\u00ee":4,"\u0129":4,"\u00ef":4,"\u012b":4,"\u012d":4,"\u012f":4,"\u0133":4,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u0157":{"d":"300,-408v-74,-3,-103,10,-146,66r0,285v-3,22,30,18,51,18r0,39r-160,0r0,-39r49,0r0,-380r-56,0r-8,-39v56,0,70,-5,101,-5v34,0,20,42,23,70v34,-47,78,-78,122,-78v35,0,21,35,24,63xm164,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":314,"k":{"a":5,"\u00e0":5,"\u00e1":5,"\u00e2":5,"\u00e3":5,"\u00e4":5,"\u0101":5,"\u0103":5,"\u00e5":5,"\u01fb":5,"\u0105":5,"\u00e6":5,"\u01fd":5,"e":8,"\u00e8":8,"\u00e9":8,"\u00ea":8,"\u011b":8,"\u00eb":8,"\u0113":8,"\u0115":8,"\u0117":8,"\u0119":8,"i":4,"\u0131":4,"\u00ec":4,"\u00ed":4,"\u00ee":4,"\u0129":4,"\u00ef":4,"\u012b":4,"\u012d":4,"\u012f":4,"\u0133":4,"o":8,"\u00f2":8,"\u00f3":8,"\u00f4":8,"\u00f5":8,"\u00f6":8,"\u014d":8,"\u014f":8,"\u0151":8,"\u00f8":8,"\u01ff":8,"\u0153":8,"u":6,"\u00f9":6,"\u00fa":6,"\u00fb":6,"\u0169":6,"\u00fc":6,"\u016b":6,"\u016d":6,"\u016f":6,"\u0171":6,"\u0173":6}},"\u015b":{"d":"298,-107v2,-130,-249,-79,-249,-238v0,-116,173,-169,243,-83r4,-30r34,0r0,147v-20,1,-37,2,-38,-18v-4,-65,-47,-103,-105,-103v-53,0,-86,34,-86,75v0,50,49,68,110,90v66,23,138,55,138,147v0,128,-188,180,-259,82r-8,38r-34,0r0,-148v21,0,41,-4,42,18v6,66,53,103,111,103v49,0,97,-27,97,-80xm264,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":382},"\u015d":{"d":"298,-107v2,-130,-249,-79,-249,-238v0,-116,173,-169,243,-83r4,-30r34,0r0,147v-20,1,-37,2,-38,-18v-4,-65,-47,-103,-105,-103v-53,0,-86,34,-86,75v0,50,49,68,110,90v66,23,138,55,138,147v0,128,-188,180,-259,82r-8,38r-34,0r0,-148v21,0,41,-4,42,18v6,66,53,103,111,103v49,0,97,-27,97,-80xm293,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":382},"\u0161":{"d":"301,-107v2,-130,-249,-79,-249,-238v0,-116,173,-169,243,-83r4,-30r34,0r0,147v-20,1,-37,2,-38,-18v-4,-65,-47,-103,-105,-103v-53,0,-86,34,-86,75v0,50,49,68,110,90v66,23,138,55,138,147v0,128,-188,180,-259,82r-8,38r-34,0r0,-148v21,0,41,-4,42,18v6,66,53,103,111,103v49,0,97,-27,97,-80xm289,-611r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":385},"\u015f":{"d":"298,-107v2,-130,-249,-79,-249,-238v0,-116,173,-169,243,-83r4,-30r34,0r0,147v-20,1,-37,2,-38,-18v-4,-65,-47,-103,-105,-103v-53,0,-86,34,-86,75v0,50,49,68,110,90v66,23,138,55,138,147v0,79,-59,133,-148,133r-7,22v41,-11,75,11,75,53v0,25,-20,54,-63,54v-19,0,-37,-5,-53,-15r8,-28v22,16,72,22,72,-14v0,-26,-38,-30,-53,-15r-26,-8r16,-52v-32,-6,-63,-21,-80,-48r-8,38r-34,0r0,-148v21,0,41,-4,42,18v6,66,53,103,111,103v49,0,97,-27,97,-80","w":382},"\u0219":{"d":"298,-107v2,-130,-249,-79,-249,-238v0,-116,173,-169,243,-83r4,-30r34,0r0,147v-20,1,-37,2,-38,-18v-4,-65,-47,-103,-105,-103v-53,0,-86,34,-86,75v0,50,49,68,110,90v66,23,138,55,138,147v0,128,-188,180,-259,82r-8,38r-34,0r0,-148v21,0,41,-4,42,18v6,66,53,103,111,103v49,0,97,-27,97,-80xm250,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":382},"\u00df":{"d":"258,-691v85,0,147,47,146,127v0,130,-161,119,-161,215v0,40,26,59,102,86v94,33,137,63,137,145v0,136,-183,173,-254,80r-8,38r-34,0r0,-148v21,0,41,-4,42,18v6,61,49,103,107,103v55,0,95,-32,95,-78v0,-55,-37,-76,-119,-104v-83,-29,-125,-62,-125,-131v0,-124,162,-116,162,-224v0,-54,-34,-87,-89,-87v-76,0,-107,70,-107,162r0,489r-109,0r0,-39r49,0r0,-380r-78,0r0,-39r78,0v0,-58,-3,-108,20,-155v26,-52,80,-78,146,-78","w":506},"\u0165":{"d":"259,-609v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41xm148,-117v-12,87,56,99,119,76r0,41v-19,7,-50,13,-73,13v-79,-3,-106,-41,-106,-141r0,-291r-67,0r0,-39r67,0v5,-40,-16,-101,25,-105r33,-5r0,110r109,0r8,39r-115,0r0,302","w":297},"\u0163":{"d":"148,-117v-12,87,56,99,119,76r0,41v-19,7,-50,13,-73,13v-79,-3,-106,-41,-106,-141r0,-291r-67,0r0,-39r67,0v5,-40,-16,-101,25,-105r33,-5r0,110r109,0r8,39r-115,0r0,302xm211,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":297},"\u021b":{"d":"148,-117v-12,87,56,99,119,76r0,41v-19,7,-50,13,-73,13v-79,-3,-106,-41,-106,-141r0,-291r-67,0r0,-39r67,0v5,-40,-16,-101,25,-105r33,-5r0,110r109,0r8,39r-115,0r0,302xm211,93v0,38,-22,76,-60,117r-19,-12v15,-24,35,-57,36,-74v-18,-2,-36,-14,-36,-35v0,-19,12,-37,37,-37v27,0,42,19,42,41","w":297},"\u0167":{"d":"194,13v-79,-3,-106,-41,-106,-141r0,-115r-58,0r0,-42r58,0r0,-134r-67,0r0,-39r67,0v5,-40,-16,-101,25,-105r33,-5r0,110r109,0r8,39r-115,0r0,134r90,0r0,42r-90,0v8,84,-30,215,61,213v19,0,43,-5,58,-11r0,41v-19,7,-50,13,-73,13","w":297},"\u00f9":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm317,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":500},"\u00fa":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm306,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":500},"\u00fb":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm340,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":500},"\u0169":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm358,-617v-4,45,-21,84,-62,84v-39,0,-60,-38,-96,-38v-20,0,-31,14,-37,38r-22,0v5,-48,20,-84,61,-84v43,0,64,40,99,40v18,0,29,-16,35,-40r22,0","w":500},"\u00fc":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm341,-568v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm215,-568v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":500},"\u016b":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm360,-545r-232,0r0,-43r232,0r0,43","w":500},"\u016d":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm333,-617v1,62,-30,104,-87,104v-56,0,-87,-42,-87,-104r26,0v7,38,26,64,61,64v35,0,54,-26,60,-64r27,0","w":500},"\u016f":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm325,-583v0,48,-32,80,-77,80v-45,0,-77,-32,-77,-80v0,-48,32,-80,77,-80v45,0,77,32,77,80xm291,-583v0,-29,-15,-52,-43,-52v-28,0,-43,23,-43,52v0,29,15,52,43,52v28,0,43,-23,43,-52","w":500},"\u0171":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-54,-2,-119,16,-111,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm347,-578v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40xm246,-578v-36,0,-49,16,-91,56r-10,-10v35,-54,58,-86,84,-86v22,-1,16,21,17,40","w":500},"\u0173":{"d":"218,-39v55,-1,105,-36,137,-69r0,-311r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,385v0,25,29,15,51,17r0,39v-56,-6,-83,87,-19,89v14,0,31,-5,38,-8r0,32v-43,22,-117,6,-117,-51v0,-28,16,-51,44,-62v-38,3,-60,-10,-57,-53v-36,34,-90,66,-152,66v-82,0,-118,-64,-118,-150r0,-282r-56,0r-8,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106","w":500},"\u1e81":{"d":"643,-419v-32,2,-63,-8,-72,23r-109,396r-66,0r-87,-355r-104,355r-64,0r-102,-419r-45,0r0,-39r156,0r0,39v-26,-1,-57,-6,-49,28r79,320r113,-387r45,0r97,392r96,-353r-40,0r0,-39r144,0xm392,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":625},"\u1e83":{"d":"643,-419v-32,2,-63,-8,-72,23r-109,396r-66,0r-87,-355r-104,355r-64,0r-102,-419r-45,0r0,-39r156,0r0,39v-26,-1,-57,-6,-49,28r79,320r113,-387r45,0r97,392r96,-353r-40,0r0,-39r144,0xm384,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":625},"\u0175":{"d":"643,-419v-32,2,-63,-8,-72,23r-109,396r-66,0r-87,-355r-104,355r-64,0r-102,-419r-45,0r0,-39r156,0r0,39v-26,-1,-57,-6,-49,28r79,320r113,-387r45,0r97,392r96,-353r-40,0r0,-39r144,0xm410,-510r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":625},"\u1e85":{"d":"643,-419v-32,2,-63,-8,-72,23r-109,396r-66,0r-87,-355r-104,355r-64,0r-102,-419r-45,0r0,-39r156,0r0,39v-26,-1,-57,-6,-49,28r79,320r113,-387r45,0r97,392r96,-353r-40,0r0,-39r144,0xm411,-582v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm285,-582v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":625},"\u1ef3":{"d":"218,-39v54,-1,105,-36,137,-68r0,-312r-53,0r0,-39r157,0r9,39v-27,0,-53,-4,-53,26r0,411v2,132,-46,207,-183,207v-40,0,-90,-10,-123,-23r0,-49v32,16,81,27,111,27v141,3,138,-102,135,-232v-36,34,-90,65,-152,65v-82,0,-118,-64,-118,-150r0,-282r-55,0r-9,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm316,-534r-17,19v-36,-30,-72,-51,-120,-51v1,-23,-7,-52,19,-52v38,0,80,35,118,84","w":499},"\u00fd":{"d":"218,-39v54,-1,105,-36,137,-68r0,-312r-53,0r0,-39r157,0r9,39v-27,0,-53,-4,-53,26r0,411v2,132,-46,207,-183,207v-40,0,-90,-10,-123,-23r0,-49v32,16,81,27,111,27v141,3,138,-102,135,-232v-36,34,-90,65,-152,65v-82,0,-118,-64,-118,-150r0,-282r-55,0r-9,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm309,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":499},"\u0177":{"d":"218,-39v54,-1,105,-36,137,-68r0,-312r-53,0r0,-39r157,0r9,39v-27,0,-53,-4,-53,26r0,411v2,132,-46,207,-183,207v-40,0,-90,-10,-123,-23r0,-49v32,16,81,27,111,27v141,3,138,-102,135,-232v-36,34,-90,65,-152,65v-82,0,-118,-64,-118,-150r0,-282r-55,0r-9,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm346,-517r-26,0r-72,-50r-72,50r-26,0r77,-92v8,-13,32,-12,42,0","w":499},"\u00ff":{"d":"218,-39v54,-1,105,-36,137,-68r0,-312r-53,0r0,-39r157,0r9,39v-27,0,-53,-4,-53,26r0,411v2,132,-46,207,-183,207v-40,0,-90,-10,-123,-23r0,-49v32,16,81,27,111,27v141,3,138,-102,135,-232v-36,34,-90,65,-152,65v-82,0,-118,-64,-118,-150r0,-282r-55,0r-9,-39v56,0,70,-5,101,-5v16,0,23,6,23,22r0,296v-3,59,16,107,73,106xm349,-568v0,21,-14,38,-37,38v-22,0,-40,-16,-40,-38v0,-22,18,-38,40,-38v23,0,37,17,37,38xm223,-568v0,21,-16,38,-39,38v-22,0,-38,-16,-38,-38v0,-22,16,-38,38,-38v23,0,39,17,39,38","w":499},"\u017a":{"d":"370,-458v0,23,0,31,-12,49r-252,367r180,0v39,2,32,-46,40,-76r38,0r0,118r-334,0v0,-24,-1,-31,12,-50r250,-366r-180,0v-38,-3,-32,45,-40,75r-38,0r0,-117r336,0xm272,-566v-48,0,-84,21,-120,51r-17,-19v38,-49,80,-84,118,-84v26,0,18,29,19,52","w":402},"\u017e":{"d":"370,-458v0,23,0,31,-12,49r-252,367r180,0v39,2,32,-46,40,-76r38,0r0,118r-334,0v0,-24,-1,-31,12,-50r250,-366r-180,0v-38,-3,-32,45,-40,75r-38,0r0,-117r336,0xm298,-611r-77,92v-8,13,-32,12,-42,0r-77,-92r26,0r72,50r72,-50r26,0","w":402},"\u017c":{"d":"370,-458v0,23,0,31,-12,49r-252,367r180,0v39,2,32,-46,40,-76r38,0r0,118r-334,0v0,-24,-1,-31,12,-50r250,-366r-180,0v-38,-3,-32,45,-40,75r-38,0r0,-117r336,0xm248,-563v0,24,-18,45,-44,45v-25,0,-44,-20,-44,-45v0,-25,19,-45,44,-45v26,0,44,21,44,45","w":402},"\uf8ff":{"d":"426,-189r-245,0r0,-60r184,0r0,-63r-184,0r0,-182r245,0r0,61r-183,0r0,60r183,0r0,184xm426,-556r-305,0r0,495r68,0r0,61r-129,0r0,-616r366,0r0,60","w":486}}});
;
/*
 * 	loopedSlider 0.5.6 - jQuery plugin
 *	written by Nathan Searles	
 *	http://nathansearles.com/loopedslider/
 *
 *	Copyright (c) 2009 Nathan Searles (http://nathansearles.com/)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *	Compatible with jQuery 1.3.2+
 *
 */

/***** EXTRA *****/
/* just adds the ability to fade description text in and out as it loops.
 * usage: 
 * place an element within each 'slide' with a description, and give it a class '.slide-desc'
 * e.g.
 * <div class="slides">
 *				<div><img src="01.jpg" alt="" /><div class="slide-desc">This is description for image 1</div></div>
 *				<div><img src="02.jpg" alt="" /><div class="slide-desc">More description text, but or image 2</div></div>
 *				...
 */

/*
 *	markup example for $("#loopedSlider").loopedSlider();
 *
 *	<div id="loopedSlider">	
 *		<div class="container">
 *			<div class="slides">
 *				<div><img src="01.jpg" alt="" /></div>
 *				<div><img src="02.jpg" alt="" /></div>
 *				<div><img src="03.jpg" alt="" /></div>
 *				<div><img src="04.jpg" alt="" /></div>
 *			</div>
 *		</div>
 *		<a href="#" class="previous"><</a>
 *		<a href="#" class="next">></a>	
 *	</div>
 *
*/

if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			loopedSlider: function(options) {
				var settings = $.extend({}, $.fn.loopedSlider.defaults, options);
			
				return this.each(
					function() {
					if($.fn.jquery < '1.3.2') {return;}
					var $t = $(this);
					var o = $.metadata ? $.extend({}, settings, $t.metadata()) : settings;
					
					var distance = 0;
					var times = 1;
					var slides = $(o.slides,$t).children().size();
					var width = $(o.slides,$t).children().outerWidth();
					var position = 0;
					var active = false;
					var number = 0;
					var interval = 0;
					var restart = 0;
					var pagination = $("."+o.pagination+" li a",$t);
					
					//$t.children('.container').addClass('loop-enabled');
					/***** EXTRA *****/ $t.addClass('loop-enabled');
					
					if(o.addPagination && !$(pagination).length){
						var buttons = slides;
						$($t).append("<ul class="+o.pagination+">");
						$(o.slides,$t).children().each(function(){
							if (number<buttons) {
								$("."+o.pagination,$t).append("<li><a rel="+(number+1)+" href=\"#\" >"+(number+1)+"</a></li>");
								number = number+1;
							} else {
								number = 0;
								return false;
							}
							$("."+o.pagination+" li a:eq(0)",$t).parent().addClass("active");
						});
						pagination = $("."+o.pagination+" li a",$t);
					} else {
						$(pagination,$t).each(function(){
							number=number+1;
							$(this).attr("rel",number);
							$(pagination.eq(0),$t).parent().addClass("active");
						});
					}

					if (slides===1) {
						$(o.slides,$t).children().css({position:"absolute",left:position,display:"block"});
						return;
					}

					$(o.slides,$t).css({width:(slides*width)});

					$(o.slides,$t).children().each(function(){
						$(this).css({position:"absolute",left:position,display:"block"});
						position=position+width;
					});

					$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});

					if (slides>3) {
						$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});
					}

					if(o.autoHeight){autoHeight(times);}

					$(".next",$t).click(function(){
						if(active===false) {
							animate("next",true);
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
						} return false;
					});

					$(".previous",$t).click(function(){
						if(active===false) {	
							animate("prev",true);
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
						} return false;
					});

					if (o.containerClick) {
						$(o.container,$t).click(function(){
							if(active===false) {
								animate("next",true);
								if(o.autoStart){
									if (o.restart) {autoStart();}
									else {clearInterval(sliderIntervalID);}
								}
							} return false;
						});
					}

					$(pagination,$t).click(function(){
						if ($(this).parent().hasClass("active")) {return false;}
						else {
							times = $(this).attr("rel");
							$(pagination,$t).parent().siblings().removeClass("active");
							$(this).parent().addClass("active");
							animate("fade",times);
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
						} return false;
					});

					if (o.autoStart) {
						sliderIntervalID = setInterval(function(){
							if(active===false) {animate("next",true);}
						},o.autoStart);
						function autoStart() {
							if (o.restart) {
							clearInterval(sliderIntervalID);
							clearInterval(interval);
							clearTimeout(restart);
								restart = setTimeout(function() {
									interval = setInterval(	function(){
										animate("next",true);
									},o.autoStart);
								},o.restart);
							} else {
								sliderIntervalID = setInterval(function(){
									if(active===false) {animate("next",true);}
								},o.autoStart);
							}
						};
					}
					
					/***** EXTRA *****/
					if (o.alignDirNav) {
						var navspace = 5;
						var ppos = $t.children('.pagination').position();
						var pwide = $t.children('.pagination').width();
						$t.children('.next').css({'top' : ppos.top + navspace, 'left': ppos.left + pwide + navspace});
						$t.children('.previous').css({'top' : ppos.top + navspace, 'left': ppos.left - $t.children('.previous').width() - navspace});
					}
					
					function current(times) {
						if(times===slides+1){times = 1;}
						if(times===0){times = slides;}
						$(pagination,$t).parent().siblings().removeClass("active");
						$(pagination+"[rel='" + (times) + "']",$t).parent().addClass("active");
					};

					function autoHeight(times) {
						if(times===slides+1){times=1;}
						if(times===0){times=slides;}	
						var getHeight = $(o.slides,$t).children(":eq("+(times-1)+")",$t).outerHeight();
						$(o.container,$t).animate({height: getHeight},o.autoHeight);					
					};		

					function animate(dir,clicked){	
						
						active = true;	
						switch(dir){
							case "next":
								times = times+1;
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								if(slides<3){
									if (times===3){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});}
									if (times===2){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:width});}
								}
								/***** EXTRA *****/	$(o.slides,$t).children().children('.slide-desc').fadeOut(o.slidespeed/4);
								$(o.slides,$t).animate({left: distance}, o.slidespeed,function(){
									if (times===slides+1) {
										times = 1;
										$(o.slides,$t).css({left:0},function(){$(o.slides,$t).animate({left:distance})});							
										$(o.slides,$t).children(":eq(0)").css({left:0});
										$(o.slides,$t).children(":eq("+(slides-1)+")").css({ position:"absolute",left:-width});				
									}
									if (times===slides) $(o.slides,$t).children(":eq(0)").css({left:(slides*width)});
									if (times===slides-1) $(o.slides,$t).children(":eq("+(slides-1)+")").css({left:(slides*width-width)});
									/***** EXTRA *****/	$(o.slides,$t).children().children('.slide-desc').fadeIn(o.slidespeed);
									active = false;
								});					
								break; 
							case "prev":
								times = times-1;
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								if (slides<3){
									if(times===0){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(-width)});}
									if(times===1){$(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0});}
								}
								/***** EXTRA *****/	$(o.slides,$t).children().children('.slide-desc').fadeOut(o.slidespeed/4);
								$(o.slides,$t).animate({left: distance}, o.slidespeed,function(){
									if (times===0) {
										times = slides;
										$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(slides*width-width)});
										$(o.slides,$t).css({left: -(slides*width-width)});
										$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});
									}
									if (times===2 ) $(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0});
									if (times===1) $(o.slides,$t).children(":eq("+ (slides-1) +")").css({position:"absolute",left:-width});
									/***** EXTRA *****/	$(o.slides,$t).children().children('.slide-desc').fadeIn(o.slidespeed);
									active = false;
								});
								break;
							case "fade":
								times = [times]*1;
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								/***** EXTRA *****/	$(o.slides,$t).children().children('.slide-desc').fadeOut(o.fadespeed);
								$(o.slides,$t).children().fadeOut(o.fadespeed, function(){
									$(o.slides,$t).css({left: distance});
									$(o.slides,$t).children(":eq("+(slides-1)+")").css({left:slides*width-width});
									$(o.slides,$t).children(":eq(0)").css({left:0});
									if(times===slides){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});}
									if(times===1){$(o.slides,$t).children(":eq("+(slides-1)+")").css({ position:"absolute",left:-width});}
									$(o.slides,$t).children().fadeIn(o.fadespeed);
									/***** EXTRA *****/	$(o.slides,$t).children().children('.slide-desc').fadeIn(o.fadespeed);
									active = false;
								});
								break; 
							default:
								break;
							}					

						};

					}
				);
			}
		});
		$.fn.loopedSlider.defaults = {
			container: ".container", //Class/id of main container. You can use "#container" for an id.
			slides: ".slides", //Class/id of slide container. You can use "#slides" for an id.
			pagination: "pagination", //Class name of parent ul for numbered links. Don't add a "." here.
			containerClick: true, //Click slider to goto next slide? true/false
			autoStart: 0, //Set to positive number for true. This number will be the time between transitions.
			restart: 0, //Set to positive number for true. Sets time until autoStart is restarted.
			slidespeed: 300, //Speed of slide animation, 1000 = 1second.
			fadespeed: 200, //Speed of fade animation, 1000 = 1second.
			autoHeight: 0, //Set to positive number for true. This number will be the speed of the animation.
			alignDirNav: false, /******* EXTRA *******/ //aligns the forward and back navigation buttons to book-end the pagination
			addPagination: false //Add pagination links based on content? true/false
		};
	});
}
;
/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(i){var q={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null, itemFallbackDimension:null},r=false;i(window).bind("load.jcarousel",function(){r=true});i.jcarousel=function(a,c){this.options=i.extend({},q,c||{});this.autoStopped=this.locked=false;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===undefined)this.options.rtl=(i(a).attr("dir")||i("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl? "right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){i(a).removeClass(d[f]);b=d[f];break}if(a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"){this.list=i(a);this.container=this.list.parent();if(this.container.hasClass("jcarousel-clip")){if(!this.container.parent().hasClass("jcarousel-container"))this.container=this.container.wrap("<div></div>");this.container=this.container.parent()}else if(!this.container.hasClass("jcarousel-container"))this.container= this.list.wrap("<div></div>").parent()}else{this.container=i(a);this.list=this.container.find("ul,ol").eq(0)}b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass("jcarousel-clip"))this.clip=this.list.wrap("<div></div>").parent();this.buttonNext=i(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext= this.clip.after(this.options.buttonNextHTML).next();this.buttonNext.addClass(this.className("jcarousel-next"));this.buttonPrev=i(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=this.clip.after(this.options.buttonPrevHTML).next();this.buttonPrev.addClass(this.className("jcarousel-prev"));this.clip.addClass(this.className("jcarousel-clip")).css({overflow:"hidden",position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden", position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;b=this.list.children("li");var e=this;if(b.size()>0){var g=0,k=this.options.offset;b.each(function(){e.format(this,k++);g+=e.dimension(this, j)});this.list.css(this.wh,g+100+"px");if(!c||c.size===undefined)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.reload()};this.options.initCallback!==null&&this.options.initCallback(this,"init");if(!r&&i.browser.safari){this.buttons(false,false);i(window).bind("load.jcarousel",function(){e.setup()})}else this.setup()}; var h=i.jcarousel;h.fn=h.prototype={jcarousel:"0.2.6"};h.fn.extend=h.extend=i.extend;h.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=false;this.tail=this.timer=null;this.inTail=false;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,true);this.prevFirst=this.prevLast=null;this.animate(a,false);i(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize)}}, reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0; this.list.children("li").each(function(f){b+=a.dimension(this,c);if(f+1<a.first)d=b});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(a){if(a!==undefined){this.options.size=a;this.locked||this.buttons()}return this.options.size},has:function(a,c){if(c===undefined||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b= a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return false}return true},get:function(a){return i(".jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,f=i(c);if(b.length===0){var j,e=h.intval(a);for(b=this.create(a);;){j=this.get(--e);if(e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}}else d=this.dimension(b);if(f.get(0).nodeName.toUpperCase()=="LI"){b.replaceWith(f);b=f}else b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")), a);f=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;d=this.dimension(b,f)-d;a>0&&a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,h.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(!(!c.length||a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,h.intval(this.list.css(this.wh))- b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(false):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(true):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!(this.locked|| this.animating||!this.tail)){this.stopAuto();var c=h.intval(this.list.css(this.lt));c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){if(!(this.locked||this.animating)){this.stopAuto();this.animate(this.pos(a),c)}},pos:function(a,c){var b=h.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;if(this.options.wrap!="circular")a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a;for(var d= this.first>a,f=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(f):this.get(this.last),e=d?f:f-1,g=null,k=0,l=false,m=0;d?--e>=a:++e<a;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jcarousel-item-placeholder"));j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g=this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(l)k+= m;if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<=this.options.size)))b=d?b+m:b-m}f=this.clipping();var p=[],o=0,n=0;j=this.get(a-1);for(e=a;++o;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jcarousel-item-placeholder"));j.length===0?this.list.prepend(g):j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g= this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(m===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");if(this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size)p.push(g);else if(l)k+=m;n+=m;if(n>=f)break;e++}for(g=0;g<p.length;g++)p[g].remove();if(k>0){this.list.css(this.wh,this.dimension(this.list)+k+"px");if(d){b-=k;this.list.css(this.lt,h.intval(this.list.css(this.lt))-k+"px")}}k=a+o-1;if(this.options.wrap!="circular"&& this.options.size&&k>this.options.size)k=this.options.size;if(e>k){o=0;e=k;for(n=0;++o;){g=this.get(e--);if(!g.length)break;n+=this.dimension(g);if(n>=f)break}}e=k-o+1;if(this.options.wrap!="circular"&&e<1)e=1;if(this.inTail&&d){b+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!="circular"&&k==this.options.size&&k-o+1>=1){d=h.margin(this.get(k),!this.options.vertical?"marginRight":"marginBottom");if(n-d>f)this.tail=n-f-d}if(c&&a===this.options.size&&this.tail){b-=this.tail;this.inTail= true}for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=k;return b},animate:function(a,c){if(!(this.locked||this.animating)){this.animating=true;var b=this,d=function(){b.animating=false;a===0&&b.list.css(b.lt,0);if(!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size))b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&& b.options.size!==null)for(var f=b.prevFirst;f<=b.prevLast;f++)if(f!==null&&!(f>=b.first&&f<=b.last)&&(f<1||f>b.options.size))b.remove(f)};this.notify("onBeforeAnimation");if(!this.options.animation||c===false){this.list.css(this.lt,a+"px");d()}else this.list.animate(!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},this.options.animation,this.options.easing,d)}},startAuto:function(a){if(a!==undefined)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer=== null){this.autoStopped=false;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){if(this.timer!==null){window.clearTimeout(this.timer);this.timer=null;this.autoStopped=true}},buttons:function(a,c){if(a==null){a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&&this.last>= this.options.size)a=this.tail!==null&&!this.inTail}if(c==null){c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1)c=this.tail!==null&&this.inTail}var b=this;if(this.buttonNext.size()>0){this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext);a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext); this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?false:true);this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)}else this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);if(this.buttonPrev.size()>0){this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel", this.funcPrev);c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev);this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?false:true);this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)}else this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null, c);this.buttonNextState=a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",a,c,this.first);this.callback("itemFirstOutCallback",a,c,this.prevFirst)}if(this.prevLast!==this.last){this.callback("itemLastInCallback",a,c,this.last);this.callback("itemLastOutCallback",a,c,this.prevLast)}this.callback("itemVisibleInCallback",a,c,this.first, this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var g=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(i.isFunction(g)){var k=this;if(d===undefined)g(k,b,c);else if(f===undefined)this.get(d).each(function(){g(k,this,d,b,c)});else{a=function(m){k.get(m).each(function(){g(k, this,m,b,c)})};for(var l=d;l<=f;l++)l!==null&&!(l>=j&&l<=e)&&a(l)}}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){a=i(a);for(var b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical? "-horizontal":"-vertical")},dimension:function(a,c){var b=a.jquery!==undefined?a[0]:a,d=!this.options.vertical?(b.offsetWidth||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginLeft")+h.margin(b,"marginRight"):(b.offsetHeight||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginTop")+h.margin(b,"marginBottom");if(c==null||d==c)return d;d=!this.options.vertical?c-h.margin(b,"marginLeft")-h.margin(b,"marginRight"):c-h.margin(b,"marginTop")-h.margin(b,"marginBottom");i(b).css(this.wh, d+"px");return this.dimension(b)},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-h.intval(this.clip.css("borderLeftWidth"))-h.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-h.intval(this.clip.css("borderTopWidth"))-h.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});h.extend({defaults:function(a){return i.extend(q,a||{})},margin:function(a,c){if(!a)return 0; var b=a.jquery!==undefined?a[0]:a;if(c=="marginRight"&&i.browser.safari){var d={display:"block","float":"none",width:"auto"},f,j;i.swap(b,d,function(){f=b.offsetWidth});d.marginRight=0;i.swap(b,d,function(){j=b.offsetWidth});return j-f}return h.intval(i.css(b,c))},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a}});i.fn.jcarousel=function(a){if(typeof a=="string"){var c=i(this).data("jcarousel"),b=Array.prototype.slice.call(arguments,1);return c[a].apply(c,b)}else return this.each(function(){i(this).data("jcarousel", new h(this,a))})}})(jQuery);
;
/* Banner functions */
/* Button tooltips and panel slide-ups - custom JQuery for CDU
 * @author Andrew Kurniawan
 *
 * to enable the function of hover tooltips and opening panels automatically on all the buttons of the loopslider banner, use this JS:
 * initBanner( "jquery class or id element selector for the group of buttons" ,{});
 * 
 * to customise whether buttons have tooltips on or off, or enable/disable opening panels, use e.g.:
 * initBanner( ".bn1-btns" ,{
 *		tooltip: true,
		openPanel: true
 * });
 * other possible options/parameters include "closeBtn" and "direction" which defines the button that will close the opening panel (default is '.btn-close'), 
 * and define the direction of tooltips (default calculates automatically) respectively.
 * 
 * example of markup for buttons and panels:
 * <div class="bn2-btns">
 * 		<a href="javascript:;" class="btn-search" rel="course-search">Course Search</a>
 *			<div class="tooltip-speech course-search">
 *				<p>1 Lorem ipsum dolor sit amet sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim minim.</p>
 *			</div>
 *			<div id="course-search" class="bn2-panel">
 *				<div class="btn-close"></div>
 *				<p>content of opening panel in here</p>
 *			</div>
 * </div>
 *			
 * notice the 'rel' value is equivalent to the tooltips class, and the panels id. 
 *
 *
 */
 
//for individual buttons
function initBannerButton(e,o) { //needs updating and testing
	if (!o.tooltip) o.tooltip = true;
	if (!o.direction) o.direction = "left";
	if (!o.openPanel) o.openPanel = false;
	
	$(e).each(function() {	
		if (o.tooltip) {
			$tip = $(this).next('.' + $(this).attr('rel'));
			$tip.hide();
			
			if (o.direction == "left") {
				$tip.css({left: $(this).position().left + ($(this).width()) + "px", top: $(this).position().top - $tip.height() + "px" });
			}
			
			$(this).mouseover(function(){
				$tip.show();
			});
			$(this).mouseout(function(){
				$tip.hide();
			});
		}
			
	});
}
//for a whole group of buttons, tested
function initBanner(e,o) {
	if (!o.tooltip) o.tooltip = true;
	if (!o.direction) o.direction = "left";
	if (!o.openPanel) o.openPanel = false;
	if (!o.closeBtn) o.closeBtn = ".btn-close";
	
	$(e).children().each(function() { //for all buttons inside the nav
	
		if (o.tooltip) {
			$rel = $(this).attr('rel');
			
			if ($rel != '') { //if a rel exists
				$tip = $(this).next('.' + $rel); //pair the buttons rel attribute to its tooltip
				
				if ($tip.length > 0) { //if a pair exists
					$tip.hide();
					/*
					//if the tooltip will reach the end, change direction
					if (($(this).position().left + $tip.width()) > $(this).parent().width()) { 
						o.direction = "right";
					}
					*/
					//if the tooltip is over half the banner
					if ($(this).position().left > $(this).parent().width()/2) { 
						o.direction = "right";
					}
					
					if (o.direction == "left") {
						$tip.css({left: $(this).position().left + $(this).width() + "px", top: $(this).position().top - $tip.height() + "px" });
					} else if (o.direction == "right") {
						$tip.css({left: $(this).position().left - ($(this).width() * 2) + "px", top: $(this).position().top - $tip.height() + "px" });
						$tip.addClass("tooltip-left");
					}
					
					$(this).mouseover(function(){
						$(this).next('.' + $(this).attr('rel')).show();
					});
					$(this).mouseout(function(){
						$(this).next('.' + $(this).attr('rel')).hide();
					});
				}
			}
		}
		
		if (o.openPanel) {
			$rel = $(this).attr('rel');
			
			if ($rel != '') { //if a rel exists
				$panel = $(this).nextAll("#" + $rel);
				if ($panel.length > 0) { //if panel is found
					$panel.hide();
					$(e).parent().append($panel);
					
					$(this).click(function(){
						$label = '.' + $(e).parent().attr('id').replace('#','') + '-panel';
						if ( $('#' + $(this).attr('rel')).css('display') == 'none') {
							$(e).siblings($label).slideUp(200);
							$(this).siblings('a').removeClass('selected');
							$('#' + $(this).attr('rel')).slideToggle(500);
							$(this).addClass('selected');
						}
					});
					
					$('#' + $(this).attr('rel')).children(o.closeBtn).click(function(){
						$(this).parent().slideUp(500);
						$(e).children('a').removeClass('selected');
					});
				}
				
			
			}
		}
			
	});
}


/* Collapsible panels - custom JQuery for CDU
 * @author Andrew Kurniawan
 *
 * enable them using 
 * initCollapse("element-selector",{});
 * where 'element-selector' is the jquery class or id selector value of the content panel
 *
 * label the arrow with class 'col-open' or 'col-closed' to set the initial state of the whole panel
 * 
 * 'read more' buttons are required to be inside the '-min' state div and have class 'col-btn-open'
 *
 */
function initCollapse(e,o) {
	
	if (!o.speed) o.speed = 500;
	
	$(e).each(function(){
	
		var type = e.replace("-col", "");
		
		$(this).addClass('col-enabled');
		
		$max = $(this).children(type + "-cont").children(type + "-max:first");
		$min = $(this).children(type + "-cont").children(type + "-min:first");
		
		var xHeight = $max.outerHeight(true);
		var nHeight = $min.outerHeight(true);

		if ($(this).children(type + "-heading:first").children('a').children('.col-arrow').hasClass('col-closed')) {
			$(this).children(type + '-cont').children(type + '-max').hide();
			$(this).children(type + '-cont').children(type + '-min').show();
			$(this).children(type + '-cont').height(nHeight);
		} else {
			$(this).children(type + '-cont').children(type + '-min').hide();
			$(this).children(type + '-cont').height(xHeight);
		}
		
		$(this).children(type + "-heading:first").children('a').click(function(){
			$t = $(this);
			if ($t.children('.col-arrow:first').hasClass('col-closed')) {	
				$t.parent().siblings(type + "-cont").children(type + '-min').hide();
				$t.parent().siblings(type + "-cont").children(type + '-max').fadeIn(o.speed/2);
				$t.parent().siblings(type + "-cont").animate({height: xHeight}, o.speed, function() {
					$t.children('.col-arrow:first').removeClass('col-closed').addClass('col-open');
				});
			} else {
				$t.parent().siblings(type + "-cont").animate({height: nHeight}, o.speed, function() {
				    $t.children('.col-arrow:first').removeClass('col-open').addClass('col-closed');
				    $(this).children(type + '-max').hide();
				    $(this).children(type + '-min').fadeIn(o.speed/2);
				});
			}
		});
		
		$(this).children(type + '-cont').children(type + '-min').children('.col-btn-open').click(function(){
			$t = $(this);
			
			$t.parent().parent().children(type + '-min').hide();
			$t.parent().parent().children(type + '-max').fadeIn(o.speed/2);
			$t.parent().parent().animate({height: xHeight}, o.speed, function() {
				$t.parent().parent().siblings(type + '-heading:first').children('a').children('.col-arrow:first').removeClass('col-closed').addClass('col-open');
			});
		});
	
	});
	
}



/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/* Custom Scroll Buttons - scrolling content panels using custom buttons. Custom JQuery for CDU, requires JQuery.ScrollTo
 * @author Andrew Kurniawan
 * 
 *
 *
 */
function initScroll(e,o) {

	if (!o.bUp) o.bUp = '.btn-scroll-up'; //button which scrolls the target panel up
	if (!o.bDown) o.bDown = '.btn-scroll-down'; //button which scrolls the target panel down
	if (!o.tPanel) o.tPanel = '.scroll-content'; //target panel to scroll, needs to be child of main selector
	if (!o.scroll) o.scroll = 100; //amount of pixels to scroll
	if (!o.speed) o.speed = 300;
	
	$(e).each(function(){
		$(this).children(o.bUp).click(function(){
			$(this).siblings(o.tPanel).scrollTo( {top:'-='+o.scroll+'px', left:'0'}, o.speed );
		});
		
		$(this).children(o.bDown).click(function(){
			$(this).siblings(o.tPanel).scrollTo( {top:'+='+o.scroll+'px', left:'0'}, o.speed );		
		});
		
	});
}

$(document).ready(function() {
	/* Contact Us Page Mega Menu Control Logic */
	if ($('.contact-points').size() > 0) {
		
		$(".contact-points .left .item-off").click(function() {
            $(".contact-points .left .item-on").each(function() {
                $(this).attr("class", "item-off");
                //$($($(this).parent().parent().children().get(2)).children().get($(this).index())).hide(); //WTF Mate?
                $(this).parent().parent().children('.middle').children(':eq(' + $(this).parent().children().index($(this)) +')').hide(); //hide the visible middle menu
                $(this).mouseover(function() {
                    $(this).attr("class", "item-on");
                }).mouseout(function() {
                    $(this).attr("class", "item-off");
                });
            });
            $(".contact-points .middle .item-on").each(function() {
                $(this).attr("class", "item-off");
                $(this).mouseover(function() {
                	$(this).attr("class", "item-on");
                }).mouseout(function() {
                	$(this).attr("class", "item-off");
                });
            });
            $(".contact-points .right .content").each(function() {
                $(this).hide();
                $(this).children().hide();
            });
            $(this).attr("class", "item-on");
            $(this).unbind("mouseover");
            $(this).unbind("mouseout");
            $(this).parent().parent().children('.middle').children(':eq(' + $(this).parent().children().index($(this)) +')').show(); //show the corresponding middle menu
            //console.log( $(this).parent().children().index($(this)) );
            //alert($(this).parent().parent().children('.middle').children(':eq(' + $(this).index() + ')' ).attr('class') ); //.show();
        }).mouseover(function() {
            $(this).attr("class", "item-on");
        }).mouseout(function() {
            $(this).attr("class", "item-off");
        });

	    $(".contact-points .middle .container .item-off").click(function() {
            $(".contact-points .middle .item-on").each(function() {
                $(this).attr("class", "item-off");
                $(this).mouseover(function() {
                    $(this).attr("class", "item-on");
                }).mouseout(function() {
                    $(this).attr("class", "item-off");
                });
            });
            $(".contact-points .right .content").each(function() {
                $(this).hide();
                $(this).children().hide();
            });
            $(this).attr("class", "item-on");
            var idxa = $(".contact-points .left>div").index($(".contact-points .left .item-on"));
            var idxb = $(".contact-points .middle>.container>div").index($(this));
            //console.log(idxa + " " + idxb);
            $(this).unbind("mouseover");
            $(this).unbind("mouseout");
            
            //$($($(this).parent().parent().children().get(2)).children().get($(this).index())).show();
            //$($($(this).parent().parent().parent().children().get(3)).children().get(idxa)).show();
            //$($($($(this).parent().parent().parent().children().get(3)).children().get(idxa)).children().get(idxb)).show();
            
             //$(this).parent().parent().parent().children('.right').children().children('.contact-points .right>.container>div:eq(' + idxb + ')').show(); //show the corresponding content (right)
             $(".contact-points .right>.content:eq(" + idxa + ")").show();
             $(".contact-points .right>.content>div:eq(" + idxb + ")").show();
            
        }).mouseover(function() {
            $(this).attr("class", "item-on");
        }).mouseout(function() {
            $(this).attr("class", "item-off");
	    });
	    $(".contact-points .middle .container").each(function() {
	        $(this).css("marginTop", $(this).parent().children().index($(this)) * $(this).parent().parent().children('.left').children(':eq(' + $(this).parent().children().index($(this)) +')').height() );
	    });
	}
	
	
    /* Mega Menu 2 Control Logic */
    if (document.all && !window.opera)
    {
        var eon = "mouseenter";
        var eoff = "mouseleave";
    }
    else
    {
        var eon = "mouseover";
        var eoff = "mouseout";
    }

    // MAIN NAVIGATION
    $("#head-nav > li").add("#head-nav .hstud>ul>li").each(function() {
        if (!$(this).hasClass("hstud")) {
            $(this).bind("mouseenter", function() {
            	$(this).addClass("mouseover");
            	$(this).animate({ borderWidth: 0 }, 50, function(){ //delay hack
	                var pw = $("#header").offset().left + $("#header").outerWidth();
	                var mw =  $(this).offset().left + $(this).children("div.mega-menu-riel").outerWidth();
	                if (mw > pw) {
	                    $(this).children("div.mega-menu-riel").css("left", pw - mw);
	                } else {
	                    $(this).children("div.mega-menu-riel").css("left", 0);
	                }
	                $(this).addClass("selected");
	                $(this).children("div.mega-menu-riel").show();
				});
            });
            
            $(this).bind("mouseleave", function() {  
                //if ($(this).parent().attr("class") != "left" || $(this).parent().attr("class") != "right")
               	$(this).removeClass("mouseover");
            	$(this).animate({ borderWidth: 0 }, 50, function(){ //delay hack
                	if (!$(this).hasClass("mouseover")) {
                		$(this).removeClass("selected");
                		$(this).children("div.mega-menu-riel").hide();
                	}
				});
                
            });
        }
    });

    $("#head-nav .item-off").each(function()
    {
        $(this).bind("mouseenter", function()
        {	
        	$(this).addClass('mouseover');
        	$(this).animate({ borderWidth: 0 }, 200, function(){ //delay hack
        		if (!$(this).siblings('li').hasClass('mouseover')) { //if any siblings have a mouse over, dont show
		            //$(this).attr("class", "item-on");
		            $(this).removeClass('item-off').addClass('item-on');
		            if ($($(this).children().get(1)).attr("class") == "sub-container")
		            {
		                $($(this).children().get(1)).show();
		                var list = $(this);
		                var right =  $($($(this).children().get(1)).children().get(0));
		                setTimeout(function()
		                {
		                    var lh = parseInt(right.offset().top + right.outerHeight());
		                    var mh = (list.parent().parent().parent().parent().offset().top + list.parent().parent().parent().parent().outerHeight()) - 27;
		                    if (lh > mh) {
		                        right.css("top", (lh - mh + 20) * -1);
		                    }
		                    
		                }, 20);             
		            }
				}
			});
        });
        $(this).bind("mouseleave", function()
        {	
        	$(this).removeClass('mouseover');
        	$(this).animate({ borderWidth: 0 }, 210, function(){ //delay hack
        		if (!$(this).hasClass("mouseover")) {
		            //$(this).attr("class", "item-off");
		            $(this).removeClass('item-on').addClass('item-off');
		            if ($($(this).children().get(1)).attr("class") == "sub-container")
		            {
		                $($(this).children().get(1)).hide();
		            }
				}
			});
        });
    });

	/* Contact Form functions */
	
	$("#edit-name").click(function(){
		if ($(this).attr('value') == 'Enter your name') {
			$(this).attr('value','').addClass('grey');
		}
	}).blur(function(){
		if ($(this).attr('value') == '') {
			$(this).attr('value','Enter your name').removeClass('grey');
		}
	});

	$("#edit-mail").click(function(){
		if ($(this).attr('value') == 'Enter your email') {
			$(this).attr('value','').addClass('grey');
		}
	}).blur(function(){
		if ($(this).attr('value') == '') {
			$(this).attr('value','Enter your email').removeClass('grey');
		}
	});
	
	$("#edit-message").click(function(){
		if ($(this).html() == 'Enter your comment') {
			$(this).html('').addClass('grey');
		}
	});


});
;
/*!
 * jQuery UI 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.5",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,
"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");
if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"));if(!isNaN(b)&&b!=0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind("mousedown.ui-disableSelection selectstart.ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,
"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c.style(this,h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c.style(this,
h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}});
c(function(){var a=document.createElement("div"),b=document.body;c.extend(a.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.appendChild(a).offsetHeight===100;b.removeChild(a).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,
d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.substring(0,1)===
"_")return h;e?this.each(function(){var g=b.data(this,a);if(!g)throw"cannot call methods on "+a+" prior to initialization; attempted to call method '"+d+"'";if(!b.isFunction(g[d]))throw"no such method '"+d+"' for "+a+" widget instance";var i=g[d].apply(g,f);if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",
widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(c)[this.widgetName],a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+
"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a,e=this;if(arguments.length===0)return b.extend({},e.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}b.each(d,function(f,h){e._setOption(f,h)});return e},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",
false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*
 * jQuery UI Accordion 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(c){c.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var a=this,b=a.options;a.running=0;a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
a.headers=a.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){b.disabled||c(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){b.disabled||c(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){b.disabled||c(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){b.disabled||c(this).removeClass("ui-state-focus")});a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(b.navigation){var d=a.element.find("a").filter(b.navigationFilter).eq(0);if(d.length){var f=d.closest(".ui-accordion-header");a.active=f.length?f:d.closest(".ui-accordion-content").prev()}}a.active=a._findActive(a.active||b.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all ui-corner-top");a.active.next().addClass("ui-accordion-content-active");a._createIcons();a.resize();a.element.attr("role","tablist");a.headers.attr("role","tab").bind("keydown.accordion",function(g){return a._keydown(g)}).next().attr("role",
"tabpanel");a.headers.not(a.active||"").attr({"aria-expanded":"false",tabIndex:-1}).next().hide();a.active.length?a.active.attr({"aria-expanded":"true",tabIndex:0}):a.headers.eq(0).attr("tabIndex",0);c.browser.safari||a.headers.find("a").attr("tabIndex",-1);b.event&&a.headers.bind(b.event.split(" ").join(".accordion ")+".accordion",function(g){a._clickHandler.call(a,g,this);g.preventDefault()})},_createIcons:function(){var a=this.options;if(a.icons){c("<span></span>").addClass("ui-icon "+a.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var a=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(a.autoHeight||a.fillHeight)b.css("height","");return c.Widget.prototype.destroy.call(this)},_setOption:function(a,b){c.Widget.prototype._setOption.apply(this,arguments);a=="active"&&this.activate(b);if(a=="icons"){this._destroyIcons();
b&&this._createIcons()}if(a=="disabled")this.headers.add(this.headers.next())[b?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(a){if(!(this.options.disabled||a.altKey||a.ctrlKey)){var b=c.ui.keyCode,d=this.headers.length,f=this.headers.index(a.target),g=false;switch(a.keyCode){case b.RIGHT:case b.DOWN:g=this.headers[(f+1)%d];break;case b.LEFT:case b.UP:g=this.headers[(f-1+d)%d];break;case b.SPACE:case b.ENTER:this._clickHandler({target:a.target},a.target);
a.preventDefault()}if(g){c(a.target).attr("tabIndex",-1);c(g).attr("tabIndex",0);g.focus();return false}return true}},resize:function(){var a=this.options,b;if(a.fillSpace){if(c.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}b=this.element.parent().height();c.browser.msie&&this.element.parent().css("overflow",d);this.headers.each(function(){b-=c(this).outerHeight(true)});this.headers.next().each(function(){c(this).height(Math.max(0,b-c(this).innerHeight()+
c(this).height()))}).css("overflow","auto")}else if(a.autoHeight){b=0;this.headers.next().each(function(){b=Math.max(b,c(this).height("").height())}).height(b)}return this},activate:function(a){this.options.active=a;a=this._findActive(a)[0];this._clickHandler({target:a},a);return this},_findActive:function(a){return a?typeof a==="number"?this.headers.filter(":eq("+a+")"):this.headers.not(this.headers.not(a)):a===false?c([]):this.headers.filter(":eq(0)")},_clickHandler:function(a,b){var d=this.options;
if(!d.disabled)if(a.target){a=c(a.currentTarget||b);b=a[0]===this.active[0];d.active=d.collapsible&&b?false:this.headers.index(a);if(!(this.running||!d.collapsible&&b)){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);if(!b){a.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
a.next().addClass("ui-accordion-content-active")}h=a.next();f=this.active.next();g={options:d,newHeader:b&&d.collapsible?c([]):a,oldHeader:this.active,newContent:b&&d.collapsible?c([]):h,oldContent:f};d=this.headers.index(this.active[0])>this.headers.index(a[0]);this.active=b?c([]):a;this._toggle(h,f,g,b,d)}}else if(d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
this.active.next().addClass("ui-accordion-content-active");var f=this.active.next(),g={options:d,newHeader:c([]),oldHeader:d.active,newContent:c([]),oldContent:f},h=this.active=c([]);this._toggle(h,f,g)}},_toggle:function(a,b,d,f,g){var h=this,e=h.options;h.toShow=a;h.toHide=b;h.data=d;var j=function(){if(h)return h._completed.apply(h,arguments)};h._trigger("changestart",null,h.data);h.running=b.size()===0?a.size():b.size();if(e.animated){d={};d=e.collapsible&&f?{toShow:c([]),toHide:b,complete:j,
down:g,autoHeight:e.autoHeight||e.fillSpace}:{toShow:a,toHide:b,complete:j,down:g,autoHeight:e.autoHeight||e.fillSpace};if(!e.proxied)e.proxied=e.animated;if(!e.proxiedDuration)e.proxiedDuration=e.duration;e.animated=c.isFunction(e.proxied)?e.proxied(d):e.proxied;e.duration=c.isFunction(e.proxiedDuration)?e.proxiedDuration(d):e.proxiedDuration;f=c.ui.accordion.animations;var i=e.duration,k=e.animated;if(k&&!f[k]&&!c.easing[k])k="slide";f[k]||(f[k]=function(l){this.slide(l,{easing:k,duration:i||700})});
f[k](d)}else{if(e.collapsible&&f)a.toggle();else{b.hide();a.show()}j(true)}b.prev().attr({"aria-expanded":"false",tabIndex:-1}).blur();a.prev().attr({"aria-expanded":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");this._trigger("change",null,this.data)}}});c.extend(c.ui.accordion,{version:"1.8.5",animations:{slide:function(a,
b){a=c.extend({easing:"swing",duration:300},a,b);if(a.toHide.size())if(a.toShow.size()){var d=a.toShow.css("overflow"),f=0,g={},h={},e;b=a.toShow;e=b[0].style.width;b.width(parseInt(b.parent().width(),10)-parseInt(b.css("paddingLeft"),10)-parseInt(b.css("paddingRight"),10)-(parseInt(b.css("borderLeftWidth"),10)||0)-(parseInt(b.css("borderRightWidth"),10)||0));c.each(["height","paddingTop","paddingBottom"],function(j,i){h[i]="hide";j=(""+c.css(a.toShow[0],i)).match(/^([\d+-.]+)(.*)$/);g[i]={value:j[1],
unit:j[2]||"px"}});a.toShow.css({height:0,overflow:"hidden"}).show();a.toHide.filter(":hidden").each(a.complete).end().filter(":visible").animate(h,{step:function(j,i){if(i.prop=="height")f=i.end-i.start===0?0:(i.now-i.start)/(i.end-i.start);a.toShow[0].style[i.prop]=f*g[i.prop].value+g[i.prop].unit},duration:a.duration,easing:a.easing,complete:function(){a.autoHeight||a.toShow.css("height","");a.toShow.css({width:e,overflow:d});a.complete()}})}else a.toHide.animate({height:"hide",paddingTop:"hide",
paddingBottom:"hide"},a);else a.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},a)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1E3:200})}}})})(jQuery);
;/*
 * jQuery UI Tabs 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(d,p){function u(){return++v}function w(){return++x}var v=0,x=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(a,e){if(a=="selected")this.options.collapsible&&
e==this.options.selected||this.select(e);else{this.options[a]=e;this._tabify()}},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+u()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var a=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+w());return d.cookie.apply(null,[a].concat(d.makeArray(arguments)))},_ui:function(a,e){return{tab:a,panel:e,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var a=
d(this);a.html(a.data("label.tabs")).removeData("label.tabs")})},_tabify:function(a){function e(g,f){g.css("display","");!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}var b=this,c=this.options,h=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=d(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);this.anchors.each(function(g,f){var i=d(f).attr("href"),l=i.split("#")[0],q;if(l&&(l===location.toString().split("#")[0]||
(q=d("base")[0])&&l===q.href)){i=f.hash;f.href=i}if(h.test(i))b.panels=b.panels.add(b._sanitizeSelector(i));else if(i&&i!=="#"){d.data(f,"href.tabs",i);d.data(f,"load.tabs",i.replace(/#.*$/,""));i=b._tabId(f);f.href="#"+i;f=d("#"+i);if(!f.length){f=d(c.panelTemplate).attr("id",i).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(b.panels[g-1]||b.list);f.data("destroy.tabs",true)}b.panels=b.panels.add(f)}else c.disabled.push(g)});if(a){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(c.selected===p){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){c.selected=g;return false}});if(typeof c.selected!=="number"&&c.cookie)c.selected=parseInt(b._cookie(),10);if(typeof c.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)c.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));c.selected=c.selected||(this.lis.length?0:-1)}else if(c.selected===null)c.selected=-1;c.selected=c.selected>=0&&this.anchors[c.selected]||c.selected<0?c.selected:0;c.disabled=d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return b.lis.index(g)}))).sort();d.inArray(c.selected,c.disabled)!=-1&&c.disabled.splice(d.inArray(c.selected,c.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(c.selected>=0&&this.anchors.length){this.panels.eq(c.selected).removeClass("ui-tabs-hide");this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");b.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[c.selected],b.panels[c.selected]))});this.load(c.selected)}d(window).bind("unload",function(){b.lis.add(b.anchors).unbind(".tabs");b.lis=b.anchors=b.panels=null})}else c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[c.collapsible?"addClass":
"removeClass"]("ui-tabs-collapsible");c.cookie&&this._cookie(c.selected,c.cookie);a=0;for(var j;j=this.lis[a];a++)d(j)[d.inArray(a,c.disabled)!=-1&&!d(j).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");c.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(c.event!=="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+g)};this.lis.bind("mouseover.tabs",
function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(c.fx)if(d.isArray(c.fx)){m=c.fx[0];o=c.fx[1]}else m=o=c.fx;var r=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",function(){e(f,o);b._trigger("show",
null,b._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");b._trigger("show",null,b._ui(g,f[0]))},s=m?function(g,f){f.animate(m,m.duration||"normal",function(){b.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);b.element.dequeue("tabs")})}:function(g,f){b.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");b.element.dequeue("tabs")};this.anchors.bind(c.event+".tabs",
function(){var g=this,f=d(g).closest("li"),i=b.panels.filter(":not(.ui-tabs-hide)"),l=d(b._sanitizeSelector(g.hash));if(f.hasClass("ui-tabs-selected")&&!c.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||b.panels.filter(":animated").length||b._trigger("select",null,b._ui(this,l[0]))===false){this.blur();return false}c.selected=b.anchors.index(this);b.abort();if(c.collapsible)if(f.hasClass("ui-tabs-selected")){c.selected=-1;c.cookie&&b._cookie(c.selected,c.cookie);b.element.queue("tabs",
function(){s(g,i)}).dequeue("tabs");this.blur();return false}else if(!i.length){c.cookie&&b._cookie(c.selected,c.cookie);b.element.queue("tabs",function(){r(g,l)});b.load(b.anchors.index(this));this.blur();return false}c.cookie&&b._cookie(c.selected,c.cookie);if(l.length){i.length&&b.element.queue("tabs",function(){s(g,i)});b.element.queue("tabs",function(){r(g,l)});b.load(b.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",
function(){return false})},_getIndex:function(a){if(typeof a=="string")a=this.anchors.index(this.anchors.filter("[href$="+a+"]"));return a},destroy:function(){var a=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=d.data(this,"href.tabs");if(e)this.href=
e;var b=d(this).unbind(".tabs");d.each(["href","load","cache"],function(c,h){b.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});a.cookie&&this._cookie(null,a.cookie);return this},add:function(a,e,b){if(b===p)b=this.anchors.length;
var c=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,a).replace(/#\{label\}/g,e));a=!a.indexOf("#")?a.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var j=d("#"+a);j.length||(j=d(h.panelTemplate).attr("id",a).data("destroy.tabs",true));j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(b>=this.lis.length){e.appendTo(this.list);j.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[b]);
j.insertBefore(this.panels[b])}h.disabled=d.map(h.disabled,function(k){return k>=b?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");j.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){c._trigger("show",null,c._ui(c.anchors[0],c.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[b],this.panels[b]));return this},remove:function(a){a=this._getIndex(a);var e=this.options,b=this.lis.eq(a).remove(),c=this.panels.eq(a).remove();
if(b.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(a+(a+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=a}),function(h){return h>=a?--h:h});this._tabify();this._trigger("remove",null,this._ui(b.find("a")[0],c[0]));return this},enable:function(a){a=this._getIndex(a);var e=this.options;if(d.inArray(a,e.disabled)!=-1){this.lis.eq(a).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(b){return b!=a});this._trigger("enable",null,
this._ui(this.anchors[a],this.panels[a]));return this}},disable:function(a){a=this._getIndex(a);var e=this.options;if(a!=e.selected){this.lis.eq(a).addClass("ui-state-disabled");e.disabled.push(a);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))}return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},
load:function(a){a=this._getIndex(a);var e=this,b=this.options,c=this.anchors.eq(a)[0],h=d.data(c,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(c,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(a).addClass("ui-state-processing");if(b.spinner){var j=d("span",c);j.data("label.tabs",j.html()).html(b.spinner)}this.xhr=d.ajax(d.extend({},b.ajaxOptions,{url:h,success:function(k,n){d(e._sanitizeSelector(c.hash)).html(k);e._cleanup();b.cache&&d.data(c,"cache.tabs",
true);e._trigger("load",null,e._ui(e.anchors[a],e.panels[a]));try{b.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[a],e.panels[a]));try{b.ajaxOptions.error(k,n,a,c)}catch(m){}}}));e.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(a,
e){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.5"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(a,e){var b=this,c=this.options,h=b._rotate||(b._rotate=function(j){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var k=c.selected;b.select(++k<b.anchors.length?k:0)},a);j&&j.stopPropagation()});e=b._unrotate||(b._unrotate=!e?function(j){j.clientX&&b.rotate(null)}:
function(){t=c.selected;h()});if(a){this.element.bind("tabsshow",h);this.anchors.bind(c.event+".tabs",e);h()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(c.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
;;

/* 
 ================================================
 PVII Horizontal Glider Magic scripts
 Copyright (c) 2009 Project Seven Development
 www.projectseven.com
 Version: 1.2.0 -build 30
 ================================================
 
 */

var p7HGMover='_over';
var p7HGMopen='_down';
var p7HGMmark='_overdown';
var p7HGMctl=[],p7HGMi=false,p7HGMa=false,p7HGMadv=[];
function P7_HGMset(){
	var h,sh,hd;
	if (!document.getElementById){
		return;
	}
	sh='.p7HGM_viewport_wrapper {width:auto;}\n';
	sh+='.p7HGM_viewport {overflow:hidden;position:relative;width:auto;}\n';
	sh+='.p7HGM_panels_wrapper {width:auto;position:relative;left:0px;overflow:hidden;}\n';
	sh+='.p7HGM_panel {width:auto;float:left;}\n';
	sh+='.p7HGM_controls {width:auto;}\n';
	sh+='.p7HGM_controls div, .p7HGMpaginator, .p7HGMvcr, .p7HGMvcrtext, .p7HGMtrig {display:block !important;}\n';
	sh+='.p7HGMtrig {width:auto;}\n';
	sh+='.p7HGMpaginator {width:auto;}\n';
	if (document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n' + sh + '\n</s' + 'tyle>';
		document.write(h);
	}
	else{
		h=document.createElement('style');
		h.type='text/css';
		h.appendChild(document.createTextNode(sh));
		hd=document.getElementsByTagName('head');
		hd[0].appendChild(h);
	}
}
P7_HGMset();
function P7_opHGM(){
	var x;
	if(!document.getElementById){
		return;
	}
	x=p7HGMctl.length;
	p7HGMctl[x]=arguments;
	if(p7HGMctl[x][1]<=0){
		p7HGMctl[x][1]='auto';
	}
	if(p7HGMctl[x][2]<=0){
		p7HGMctl[x][2]='auto';
	}
}
function P7_HGMaddLoad(){
	if(!document.getElementById){
		return;
	}
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded",P7_initHGM,false);
		window.addEventListener("load",P7_HGMload,false);
		window.addEventListener("unload",P7_HGMrf,false);
		window.addEventListener("resize",P7_HGMrs,false);
	}
	else if(document.addEventListener){
		document.addEventListener("load",P7_initHGM,false);
		document.addEventListener("resize",P7_HGMrs,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_hgm defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_hgm").onreadystatechange=function(){
			if(this.readyState=="complete"){
				if(p7HGMctl.length>0){
					P7_initHGM();
				}
			}
		};
		window.attachEvent("onload",P7_HGMload);
		window.attachEvent("onresize",P7_HGMrs);
	}
	else if(typeof window.onload=='function'){
		var p7vloadit=onload;
		window.onload=function(){
			p7vloadit();
			P7_HGMload();
		};
		window.onresize=P7_HGMrs;
	}
	else{
		window.onload=P7_initHGM;
		window.onresize=P7_HGMrs;
	}
}
P7_HGMaddLoad();
function P7_HGMload(){
	P7_initHGM();
	P7_HGMrs();
}
function P7_HGMrf(){
	return;
}
function P7_initHGM(){
	var i,j,k,x,tB,d,tD,tA,ck,hl,iM,sr,fnA,fnB,swp,s1,s2,s3,wP,zz,pw,vP;
	if(p7HGMi){
		return;
	}
	p7HGMi=true;
	document.p7HGMpreload=[];
	for(i=p7HGMctl.length-1;i>-1;i--){
		tB=document.getElementById(p7HGMctl[i][0]);
		if(tB){
			tB.p7opt=p7HGMctl[i];
			tB.hgmPanels=[];
			tB.hgmTriggers=[];
			tB.hgmPaginators=[];
			tB.hgmCurrentPanel=1;
			tB.hgmPrevPanelID='none';
			tB.hgmDelay=15;
			tB.hgmTargetLeft=0;
			tB.hgmFrameRate=1;
			tB.hgmAnimRunning=false;
			tB.hgmRotate='';
			tB.hgmAutoPlay=false;
			tB.hgmDirection='forward';
			wP=document.getElementById(tB.id.replace('_','wp_'));
			vP=document.getElementById(tB.id.replace('_','vp_'));
			if(tB.p7opt[1]!='auto'){
				vP.style.width=tB.p7opt[1]+'px';
				document.getElementById(tB.id.replace('_','vpw_')).style.width=tB.p7opt[1]+'px';
			}
			if(navigator.appVersion.indexOf("MSIE 6")>-1 || navigator.appVersion.indexOf("MSIE 5")>-1){
				vP.style.width='100%';
			}
			pw=vP.offsetWidth;
			d=tB.id.replace("_","pn_");
			tD=tB.getElementsByTagName('DIV');
			ck=-1;
			hl=0;
			for(j=0;j<tD.length;j++){
				if(tD[j].id&&tD[j].id.indexOf(d)===0){
					x=tB.hgmPanels.length;
					tB.hgmPanels[x]=tD[j].id;
					tD[j].hgmDiv=tB.id;
					tD[j].hgmPanelNum=parseInt(tD[j].id.substr(10),10);
					if(tB.p7opt[1]=='auto'){
						tD[j].style.width=pw+'px';
					}
					else{
						tD[j].style.width=tB.p7opt[1]+'px';
					}
					if(tB.p7opt[2]!='auto'){
						tD[j].style.height=tB.p7opt[2]+'px';
						tD[j].style.overflow='auto';
					}
					tD[j].style.position='absolute';
					tD[j].style.cssFloat="none";
					tD[j].style.top='0px';
					tD[j].style.left=((tD[j].hgmPanelNum-1)*vP.offsetWidth)+'px';
					zz=9000;
					if(ck<0){
						ck=j;
						tB.hgmCurrentPanelID=tD[ck].id;
						tD[j].style.position='relative';
						if(tB.p7opt[3]==4){
							tD[j].style.zIndex='9200';
						}
						tD[j].style.left='0px';
					}
					else{
						if(tB.p7opt[3]==4){
							tD[j].style.zIndex=zz;
							tD[j].style.left=(tD[j].offsetWidth*-1)+'px';
						}
					}
				}
			}
			tB.hgmPanelNums=tB.hgmPanels.length;
			if(tB.p7opt[1]=='auto'){
				wP.style.width =(tB.hgmPanelNums*pw)+'px';
			}
			else{
				wP.style.width=(tB.p7opt[1]*tB.hgmPanelNums)+'px';
			}
			d=tB.id.replace("_","trg_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
				tA=tD.getElementsByTagName('A');
				if(tA){
					d=tB.id.replace('M_','Mt');
					for(k=0;k<tA.length;k++){
						if(tA[k].id&&tA[k].id.indexOf(d)===0){
							tA[k].hgmDiv=tB.id;
							tA[k].hgmPanelNum=tA[k].id.substr(8);
							tB.hgmTriggers[tB.hgmTriggers.length]=tA[k].id;
							tA[k].onclick=function(){
								return P7_HGMcontrol(this,'show');
							};
							if(tB.p7opt[17]==1){
								tA[k].onmouseover=function(){
									P7_HGMcontrol(this,'show');
								};
							}
							iM=tA[k].getElementsByTagName("IMG");
							if(iM&&iM[0]){
								sr=iM[0].getAttribute("src");
								swp=tB.p7opt[13];
								iM[0].hgmSwap=swp;
								x=sr.lastIndexOf(".");
								fnA=sr.substring(0,x);
								fnB='.'+sr.substring(x+1);
								s1=fnA+p7HGMover+fnB;
								s2=fnA+p7HGMopen+fnB;
								s3=fnA+p7HGMmark+fnB;
								if(swp==1){
									iM[0].p7imgswap=[sr,s1,s1,s1];
									P7_HGMpreloader(s1);
								}
								else if(swp==2){
									iM[0].p7imgswap=[sr,s1,s2,s2];
									P7_HGMpreloader(s1,s2);
								}
								else if(swp==3){
									iM[0].p7imgswap=[sr,s1,s2,s3];
									P7_HGMpreloader(s1,s2,s3);
								}
								else{
									iM[0].p7imgswap=[sr,sr,sr,sr];
								}
								iM[0].p7state='closed';
								iM[0].mark=false;
								iM[0].rollover=tB.p7opt[14];
								if(swp>0){
									tA[k].hasImg=true;
									iM[0].onmouseover=function(){
										P7_HGMimovr(this);
									};
									iM[0].onmouseout=function(){
										P7_HGMimout(this);
									};
								}
							}
						}
					}
				}
			}
			d=tB.id.replace("_","pg_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
				tA=tD.getElementsByTagName('A');
				if(tA){
					for(k=0;k<tA.length;k++){
						if(tA[k].id&&tA[k].id.indexOf('p7HGMpg')===0){
							tA[k].hgmDiv=tB.id;
							tA[k].hgmPanelNum=tA[k].id.substr(9);
							tB.hgmPaginators[tB.hgmPaginators.length]=tA[k].id;
							tA[k].onclick=function(){
								return P7_HGMpaginator(this);
							};
							if(tB.p7opt[18]==1){
								tA[k].onmouseover=function(){
									P7_HGMpaginator(this);
								};
							}
						}
					}
				}
			}
			d=tB.id.replace('_','wp_');
			tD=document.getElementById(d);
			if(tD){
				tD.style.left='0px';
				tD.hgmDiv=tB.id;
			}
			if(tB.p7opt[9]==1){
				tD.onmouseover=function(){
					var d=document.getElementById(this.hgmDiv);
					if(d.hgmAutoPlay=='play'){
						this.hgmRestart=true;
						P7_HGMpause(d.id);
					}
					else{
						this.hgmRestart=false;
					}
				};
				tD.onmouseout=function(){
					var d=document.getElementById(this.hgmDiv);
					if(this.hgmRestart){
						this.restart=false;
						P7_HGMplay(d.id,true,true);
					}
				};
			}
			tB.hgmControls=new Array(12);
			d=tB.id.replace("_","mpn_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
			}
			tB.hgmControls[0]=P7_HGMsetCC(tB.id,'bp_','prev');
			tB.hgmControls[1]=P7_HGMsetCC(tB.id,'bn_','next');
			d=tB.id.replace("_","vcr_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
			}
			tB.hgmControls[2]=P7_HGMsetCC(tB.id,'rf_','first');
			tB.hgmControls[3]=P7_HGMsetCC(tB.id,'rp_','prev');
			d=tB.id.replace('_','rpp_');
			tD=document.getElementById(d);
			if(tD){
				tD.p7state='pause';
				tD.hgmDiv=tB.id;
				tB.hgmControls[4]=tD;
				tD.onclick=function(){
					return P7_HGMpausePlay(this);
				};
			}
			tB.hgmControls[5]=P7_HGMsetCC(tB.id,'rn_','next');
			tB.hgmControls[6]=P7_HGMsetCC(tB.id,'rl_','last');
			d=tB.id.replace("_","vcx_");
			tD=document.getElementById(d);
			if(tD){
				if(tB.p7opt[1]!='auto'){
					tD.style.width=tB.p7opt[1]+'px';
				}
			}
			tB.hgmControls[7]=P7_HGMsetCC(tB.id,'xf_','first');
			tB.hgmControls[8]=P7_HGMsetCC(tB.id,'xp_','prev');
			d=tB.id.replace('_','xpp_');
			tD=document.getElementById(d);
			if(tD){
				tD.p7state='pause';
				tD.hgmDiv=tB.id;
				tB.hgmControls[9]=tD;
				tD.onclick=function(){
					return P7_HGMpausePlay(this);
				};
			}
			tB.hgmControls[10]=P7_HGMsetCC(tB.id,'xn_','next');
			tB.hgmControls[11]=P7_HGMsetCC(tB.id,'xl_','last');
			d=tB.id.replace('_','pgpp_');
			tD=document.getElementById(d);
			if(tD){
				tD.p7state='pause';
				tD.hgmDiv=tB.id;
				tB.hgmControls[12]=tD;
				tD.onclick=function(){
					return P7_HGMpausePlay(this);
				};
			}
			x=tB.p7opt[5];
			if(x==-1){
				x=Math.floor(Math.random()*tB.hgmPanels.length+1);
			}
			if(x>0){
				P7_HGMcontrol(tB.id,'show',x);
			}
			else{
				P7_HGMcontrol(tB.id,'first');
			}
			if(tB.p7opt[15]==1){
				P7_HGMcurrentMark(tB);
			}
			P7_HGMurl(tB.id);
			if(tB.p7opt[7]==1){
				P7_HGMplay(tB.id,true,true);
			}
		}
	}
	p7HGMa=true;
	P7_HGMrs();
}
function P7_HGMshowPanel(md,d){
	var i,tB,tD,tA,tW,vP,x,w,n,tl,ca,a,op,m=false,iM,pa;
	tB=document.getElementById(md);
	tA=tB.hgmTriggers;
	ca=document.getElementById(d.replace('pn_','t'));
	for(i=0;i<tA.length;i++){
		a=document.getElementById(tA[i]);
		if(a){
			P7_HGMremClass(a,'panel_open');
			if(a==ca){
				P7_HGMsetClass(a,'panel_open');
				if(a.hasImg){
					iM=a.getElementsByTagName("IMG")[0];
					iM.p7state='open';
					iM.src=iM.p7imgswap[2];
				}
			}
			else{
				if(a.hasImg){
					iM=a.getElementsByTagName("IMG")[0];
					iM.p7state='closed';
					if(iM.mark){
						iM.src=iM.p7imgswap[3];
					}
					else{
						iM.src=iM.p7imgswap[0];
					}
				}
			}
		}
	}
	tA=tB.hgmPaginators;
	pa=document.getElementById(d.replace('pn_','pg'));
	for(i=0;i<tA.length;i++){
		a=document.getElementById(tA[i]);
		if(a){
			P7_HGMremClass(a,'panel_open');
			if(a==pa){
				P7_HGMsetClass(a,'panel_open');
			}
		}
	}
	tD=document.getElementById(d);
	if(!tD){
		if(ca&&ca.href!=document.location.href){
			if(ca.href.indexOf('javascr')==-1){
				m=true;
			}
		}
		return m;
	}
	if(d==tB.hgmCurrentPanelID){
		P7_HGMsetControlStates(tB);
		return m;
	}
	tB.hgmPrevPanelID=tB.hgmCurrentPanelID;
	tB.hgmCurrentPanel=tD.hgmPanelNum;
	tB.hgmCurrentPanelID=tD.id;
	tW=document.getElementById(tB.id.replace('_','wp_'));
	vP=document.getElementById(tB.id.replace('_','vp_'));
	tl=(tD.hgmPanelNum-1)*vP.offsetWidth*-1;
	if(vP.scrollLeft !== 0){
		vP.scrollLeft=0;
	}
	if(vP.scrollTop !== 0){
		vP.scrollTop=0;
	}
	op=tB.p7opt[3];
	if(!p7HGMa&&op>0&&op!=4){
		op=0;
		P7_HGMsetGlide(tB,tl,true);
	}
	P7_HGMsetControlStates(tB);
	if(op>0){
		P7_HGMsetGlide(tB,tl);
	}
	else{
		tW.style.left=tl+'px';
		P7_HGMsetPanels(tB);
		P7_HGMrs();
	}
	if(tB.hgmAutoPlay=='play'){
		if(tB.hgmCurrentPanelID==tB.hgmPanels[tB.hgmPanels.length-1]&&tB.p7opt[6]!=1&tB.p7opt[11]!=1){
			P7_HGMpause(tB.id,true);
		}
		else{
			tB.hgmRotate=setTimeout("P7_HGMplay('"+tB.id+"',true)",tB.p7opt[8]);
		}
	}
	return m;
}
function P7_HGMsetPanels(ob){
	var i,tD;
	for(i=0;i<ob.hgmPanels.length;i++){
		tD=document.getElementById(ob.hgmPanels[i]);
		if(tD.id==ob.hgmCurrentPanelID){
			tD.style.position='relative';
		}
		else{
			tD.style.position='absolute';
		}
	}
}
function P7_HGMcontrol(d,ac,n){
	var a,m=false,tB,pn,cp,sh=false;
	if(typeof(d)=='object'){
		a=d;
		n=d.hgmPanelNum;
		d=d.hgmDiv;
	}
	tB=document.getElementById(d);
	cp=tB.hgmCurrentPanel;
	if(ac=='first' || ac=='prev' || ac=='next' || ac=='last'){
		pn=P7_HGMgetPanel(tB,ac);
		sh=true;
	}
	else if(ac=='show'){
		pn=d.replace('_','pn_')+'_'+n;
		sh=true;
	}
	else if(ac=='pause'){
		P7_HGMpause(d);
	}
	else if(ac=='play'){
		P7_HGMplay(d);
	}
	if(sh){
		if(tB.p7opt[10]==1&&tB.hgmRotate){
			P7_HGMpause(d);
		}
		m=P7_HGMshowPanel(d,pn);
	}
	return m;
}
function P7_HGMpaginator(pG){
	P7_HGMcontrol(pG.hgmDiv,'show',pG.hgmPanelNum);
	return false;
}
function P7_HGMplay(d,sh,de){
	var tB,np;
	tB=document.getElementById(d);
	if(tB){
		if(tB.hgmRotate){
			clearTimeout(tB.hgmRotate);
		}
		np=P7_HGMgetPanel(tB,'next',true);
		if(np==tB.hgmCurrentPanelID){
			if(!sh){
				np=tB.hgmPanels[0];
			}
			else{
				P7_HGMpause(d,sh);
				return;
			}
		}
		P7_HGMsetPlay(tB.hgmControls[4]);
		P7_HGMsetPlay(tB.hgmControls[9]);
		P7_HGMsetPlay(tB.hgmControls[12]);
		tB.hgmAutoPlay='play';
		if(de){
			tB.hgmRotate=setTimeout("P7_HGMshowPanel('"+tB.id+"','"+np+"')",tB.p7opt[8]);
		}
		else{
			P7_HGMshowPanel(tB.id,np);
		}
	}
}
function P7_HGMpause(d){
	var tB;
	tB=document.getElementById(d);
	if(tB){
		if(tB.hgmRotate){
			clearTimeout(tB.hgmRotate);
		}
		P7_HGMsetPause(tB.hgmControls[4]);
		P7_HGMsetPause(tB.hgmControls[9]);
		P7_HGMsetPause(tB.hgmControls[12]);
		tB.hgmAutoPlay='pause';
	}
}
function P7_HGMsetPlay(bt){
	if(bt){
		bt.p7state='play';
		bt.className='pause';
		if(bt.tagName&&bt.tagName=='A'){
			if(bt.firstChild&&bt.firstChild.nodeType==3){
				bt.firstChild.nodeValue='Pause';
			}
		}
	}
}
function P7_HGMsetPause(bt){
	if(bt){
		bt.p7state='pause';
		bt.className='play';
		if(bt.tagName&&bt.tagName=='A'){
			if(bt.firstChild&&bt.firstChild.nodeType==3){
				bt.firstChild.nodeValue='Play';
			}
		}
	}
}
function P7_HGMrotate(d,ac){
	if(ac=='play'){
		P7_HGMplay(d);
	}
	else
	if(ac=='pause'){
		P7_HGMpause(d);
	}
}
function P7_HGMpausePlay(bb,d){
	if(bb.p7state=='pause'){
		P7_HGMplay(bb.hgmDiv);
	}
	else{
		P7_HGMpause(bb.hgmDiv);
	}
	return false;
}
function P7_HGMgetPanel(dd,ac,sh){
	var i,j,cp,tP,k=0,dv='';
	cp=dd.hgmCurrentPanelID;
	tP=dd.hgmPanels;
	j=tP.length-1;
	for(i=0;i<tP.length;i++){
		if(tP[i]==cp){
			k=i;
			break;
		}
	}
	if(ac=='first'){
		dv=tP[0];
	}
	else if(ac=='prev'){
		k--;
		if(k<0){
			if(dd.p7opt[6]==1){
				k=j;
			}
			else{
				k++;
			}
		}
		dv=tP[k];
	}
	else if(ac=='next'){
		k++;
		if(sh&&dd.p7opt[11]==1){
			if(dd.hgmDirection=='reverse'){
				k=i-1;
				if(k<0){
					dd.hgmDirection='forward';
					k=i+1;
				}
			}
			else if(dd.hgmDirection=='forward'){
				if(k>j){
					dd.hgmDirection='reverse';
					k=i-1;
				}
			}
		}
		if(k>j){
			if(dd.p7opt[6]==1){
				k=0;
			}
			else{
				k--;
			}
		}
		dv=tP[k];
	}
	else if(ac=='last'){
		dv=tP[j];
	}
	return dv;
}
function P7_HGMsetControlStates(dd){
	var cp,tP,j,cl;
	if(dd.p7opt[6]===0){
		cp=dd.hgmCurrentPanelID;
		tP=dd.hgmPanels;
		j=tP.length-1;
		cl='off';
		if(tP[0]==cp){
			P7_HGMsetClass(dd.hgmControls[0],cl);
			P7_HGMsetClass(dd.hgmControls[2],cl);
			P7_HGMsetClass(dd.hgmControls[3],cl);
			P7_HGMsetClass(dd.hgmControls[7],cl);
			P7_HGMsetClass(dd.hgmControls[8],cl);
		}
		else{
			P7_HGMremClass(dd.hgmControls[0],cl);
			P7_HGMremClass(dd.hgmControls[2],cl);
			P7_HGMremClass(dd.hgmControls[3],cl);
			P7_HGMremClass(dd.hgmControls[7],cl);
			P7_HGMremClass(dd.hgmControls[8],cl);
		}
		if(tP[j]==cp){
			P7_HGMsetClass(dd.hgmControls[1],cl);
			P7_HGMsetClass(dd.hgmControls[5],cl);
			P7_HGMsetClass(dd.hgmControls[6],cl);
			P7_HGMsetClass(dd.hgmControls[10],cl);
			P7_HGMsetClass(dd.hgmControls[11],cl);
		}
		else{
			P7_HGMremClass(dd.hgmControls[1],cl);
			P7_HGMremClass(dd.hgmControls[5],cl);
			P7_HGMremClass(dd.hgmControls[6],cl);
			P7_HGMremClass(dd.hgmControls[10],cl);
			P7_HGMremClass(dd.hgmControls[11],cl);
		}
	}
}
function P7_HGMsetGlide(dd,tl,bp){
	var tW,dur,dy,stp,fr,frh,ds,cl,tP,th,ch,dh,vP;
	tW=document.getElementById(dd.id.replace('_','wp_'));
	vP=document.getElementById(dd.id.replace('_','vp_'));
	dur=dd.p7opt[4];
	dur=(dur>0)?dur:250;
	dy=(dd.p7opt[3]==2)?15:20;
	dd.hgmDelay=dy;
	dd.hgmTargetLeft=tl;
	stp=dur/dy;
	cl=parseInt(tW.style.left,10);
	ds=Math.abs(Math.abs(tl)-Math.abs(cl));
	if(dd.p7opt[3]==3){
		ds=vP.offsetWidth;
	}
	fr=parseInt(ds/stp,10);
	fr=(fr<=1)?1:fr;
	dd.hgmFrameRate=fr;
	if(dd.p7opt[2]!='auto'){
		th=tW.offsetHeight;
	}
	else{
		tP=document.getElementById(dd.hgmCurrentPanelID);
		th=tP.offsetHeight;
	}
	ch=tW.offsetHeight;
	dh=Math.abs(Math.abs(th)-Math.abs(ch));
	frh=parseInt(dh/stp,10);
	frh=(frh<=1)?1:frh;
	dd.hgmFrameRateHeight=frh;
	dd.hgmTargetHeight=th;
	if(!bp){
		if(dd.p7opt[3]==4){
			if(dh>0&&!dd.hgmAnimRunning){
				dd.hgmAnimRunning=true;
				dd.hgmGlider=setInterval("P7_HGMglider('"+dd.id+"')",dd.hgmDelay);
			}
			else{
				P7_HGMsetPanels(dd);
				P7_HGMsetFader(dd);
			}
		}
		else if((ds>0||dh>0)&&!dd.hgmAnimRunning){
			dd.hgmAnimRunning=true;
			P7_HGMsetOverflow(dd);
			dd.hgmGlider=setInterval("P7_HGMglider('"+dd.id+"')",dd.hgmDelay);
		}
	}
}
function P7_HGMsetFader(dd){
	var i,zz,cP,pP,tPS,p,tW;
	tW=document.getElementById(dd.id.replace('_','wp_'));
	dd.hgmFrameRateFader=4;
	dd.hgmDelayFader=30;
	cP=document.getElementById(dd.hgmCurrentPanelID);
	if(p7HGMa){
		if(!cP.filters){
			cP.style.opacity=0.01;
		}
		else{
			cP.style.filter='alpha(opacity=1)';
		}
	}
	cP.hgmOpacity=1;
	cP.style.zIndex=9200;
	cP.style.left='0px';
	pP=document.getElementById(dd.hgmPrevPanelID);
	tPS=dd.hgmPanels;
	for(i=0;i<tPS.length;i++){
		p=document.getElementById(tPS[i]);
		if(p.id!=cP.id){
			zz=9000;
			if(p==pP){
				zz=9100;
				if(p7HGMa){
					if(!p.filters){
						p.style.opacity=0.99;
					}
					else{
						p.style.filter='alpha(opacity=99)';
					}
				}
				else{
					p.style.left=(p.offsetWidth*-1)+'px';
				}
				p.hgmOpacity=100;
				p.style.zIndex=zz;
			}
			else{
				p.style.zIndex=zz;
				p.hgmOpacity=100;
				p.style.left=(p.offsetWidth*-1)+'px';
			}
		}
	}
	tW.style.left='0px';
	if(!dd.hgmFaderRunning){
		dd.hgmFaderRunning=true;
		dd.hgmFader=setInterval("P7_HGMfader('"+dd.id+"')",dd.hgmDelayFader);
	}
}
function P7_HGMfader(dv){
	var tB,cP,pP,co,po,ulm=99,llm=1,fr;
	tB=document.getElementById(dv);
	fr=tB.hgmFrameRateFader;
	cP=document.getElementById(tB.hgmCurrentPanelID);
	pP=document.getElementById(tB.hgmPrevPanelID);
	co=cP.hgmOpacity;
	po=pP.hgmOpacity;
	co+=fr;
	po -= fr;
	if(cP.id==pP.id){
		po=llm;
	}
	co=(co >= ulm)?ulm:co;
	po=(po<=llm)?llm:po;
	cP.hgmOpacity=co;
	pP.hgmOpacity=po;
	if(!cP.filters){
		cP.style.opacity=(co / 100);
		if(cP.id!=pP.id){
			pP.style.opacity=(po / 100);
		}
	}
	else{
		cP.style.filter='alpha(opacity='+(co)+')';
		if(cP.id!=pP.id){
			pP.style.filter='alpha(opacity='+(po)+')';
		}
	}
	if(co==ulm&&po==llm){
		tB.hgmFaderRunning=false;
		clearInterval(tB.hgmFader);
		pP.style.left=(pP.offsetWidth*-1)+'px';
		if(cP.filters){
			cP.style.filter='';
			pP.style.filter='';
		}
		else{
			pP.style.opacity=1;
			cP.style.opacity=1;
		}
		P7_HGMrs();
	}
}
function P7_HGMglider(d){
	var tB,tW,tl,th,cl,ch,fr,frh,dy,nl=0,nh=0,op,tt,tp,pc=0.15,m=false;
	tB=document.getElementById(d);
	tW=document.getElementById(tB.id.replace('_','wp_'));
	tl=tB.hgmTargetLeft;
	cl=parseInt(tW.style.left,10);
	fr=tB.hgmFrameRate;
	dy=tB.hgmDelay;
	op=tB.p7opt[3];
	if(op==2){
		tt=Math.abs(Math.abs(tl)-Math.abs(cl));
		tp=parseInt(tt*pc,10);
		fr=(tp<1)?1:tp;
	}
	if(tB.p7opt[3]==4){
		cl=tl;
	}
	th=tB.hgmTargetHeight;
	ch=parseInt(tW.style.height,10);
	if(!ch){
		ch=tW.offsetHeight;
	}
	frh=tB.hgmFrameRateHeight;
	if(op==2){
		tt=Math.abs(Math.abs(th)-Math.abs(ch));
		tp=parseInt(tt*pc,10);
		frh=(tp<1)?1:tp;
	}
	if(tl<cl){
		nl=cl-fr;
		nl=(nl<=tl)?tl:nl;
		tW.style.left=nl+'px';
		m=true;
	}
	else if(tl>cl){
		nl=cl+fr;
		nl=(nl>=tl)?tl:nl;
		tW.style.left=nl+'px';
		m=true;
	}
	if(th<ch){
		nh=ch-frh;
		nh=(nh<=th)?th:nh;
		tW.style.height=nh+'px';
		m=true;
	}
	else if(th>ch){
		nh=ch+frh;
		nh=(nh>=th)?th:nh;
		tW.style.height=nh+'px';
		m=true;
	}
	if(!m){
		clearInterval(tB.hgmGlider);
		tB.hgmAnimRunning=false;
		P7_HGMrestoreOverflow(tB);
		P7_HGMsetPanels(tB);
		if(tB.p7opt[2]=='auto'){
			tW.style.height='auto';
		}
		P7_HGMrs();
		if(tB.p7opt[3]==4){
			P7_HGMsetFader(tB);
		}
	}
}
function P7_HGMpreloader(){
	var i,x;
	for(i=0;i<arguments.length;i++){
		x=document.p7HGMpreload.length;
		document.p7HGMpreload[x]=new Image();
		document.p7HGMpreload[x].src=arguments[i];
	}
}
function P7_HGMimovr(im){
	var m=false,r=im.rollover;
	if(im.mark){
		m=(r>1)?true:false;
	}
	else
	if(im.p7state=='open'){
		m=(r==1 || r==3)?true:false;
	}
	else{
		m=true;
	}
	if(m){
		im.src=im.p7imgswap[1];
	}
}
function P7_HGMimout(im){
	var r=im.rollover;
	if(im.mark){
		if(im.p7state=='open'){
			im.src=im.p7imgswap[2];
		}
		else{
			im.src=im.p7imgswap[3];
		}
	}
	else
	if(im.p7state=='open'){
		if(r==1 || r==3){
			im.src=im.p7imgswap[2];
		}
	}
	else{
		im.src=im.p7imgswap[0];
	}
}
function P7_HGMmark(){
	p7HGMadv[p7HGMadv.length]=arguments;
}
function P7_HGMcurrentMark(el){
	var j,i,x,wH,cm=false,mt=['',1,'',''],op,r1,k,kk,tA,aU,pp,tr,aT,aP,d,pn;
	wH=window.location.href;
	if(el.p7opt[16]!=1){
		wH=wH.replace(window.location.search,'');
	}
	if(wH.charAt(wH.length-1)=='#'){
		wH=wH.substring(0,wH.length-1);
	}
	for(k=0;k<p7HGMadv.length;k++){
		if(p7HGMadv[k][0]&&p7HGMadv[k][0]==el.id){
			mt=p7HGMadv[k];
			cm=true;
			break;
		}
	}
	op=mt[1];
	if(op<1){
		return;
	}
	r1=/index\.[\S]*/i;
	k=-1;
	kk=-1;
	tA=[];
	d=document.getElementById(el.id.replace("_","trg_"));
	if(d){
		aT=d.getElementsByTagName('A');
		if(aT&&aT.length>0){
			for(i=0;i<aT.length;i++){
				tA[tA.length]=aT[i];
			}
		}
	}
	d=document.getElementById(el.id.replace("_","wp_"));
	if(d){
		aP=d.getElementsByTagName('A');
		if(aP&&aP.length>0){
			for(i=0;i<aP.length;i++){
				tA[tA.length]=aP[i];
			}
		}
	}
	for(j=0;j<tA.length;j++){
		aU=tA[j].href.replace(r1,'');
		if(op>0){
			if(tA[j].href==wH || aU==wH){
				k=j;
				kk=-1;
			}
		}
		if(op==2){
			if(tA[j].firstChild){
				if(tA[j].firstChild.nodeValue==mt[2]){
					kk=j;
				}
			}
		}
		if(op==3&&tA[j].href.indexOf(mt[2])>-1){
			kk=j;
		}
		if(op==4){
			for(x=2;x<mt.length;x+=2){
				if(wH.indexOf(mt[x])>-1){
					if(tA[j].firstChild&&tA[j].firstChild.nodeValue){
						if(tA[j].firstChild.nodeValue==mt[x+1]){
							kk=j;
						}
					}
				}
			}
		}
	}
	k=(kk>k)?kk:k;
	if(k>-1){
		if(tA[k].hgmPanelNum){
			tr=tA[k];
			pn=tA[k].id.replace("t","pn_");
		}
		else{
			P7_HGMsetClass(tA[k],'current_mark');
			pp=tA[k].parentNode;
			while (pp){
				if(pp.id&&pp.id.indexOf('p7HGMpn_')===0){
					tr=document.getElementById(pp.id.replace("pn_","t"));
					pn=pp.id;
					break;
				}
				pp=pp.parentNode;
			}
		}
		if(tr){
			P7_HGMsetClass(tr,'current_mark');
			P7_HGMsetClass(tr.parentNode,'current_mark');
			P7_HGMshowPanel(el.id,pn);
		}
	}
}
function P7_HGMurl(dv){
	var i,h,s,x,d='hgm',pn,n=dv.replace("p7HGM_","");
	if(document.getElementById){
		h=document.location.search;
		if(h){
			h=h.replace('?','');
			s=h.split(/[=&]/g);
			if(s&&s.length){
				for(i=0;i<s.length;i+=2){
					if(s[i]==d){
						x=s[i+1];
						if(n!=x.charAt(0)){
							x=false;
						}
						if(x){
							pn='p7HGMpn_'+x;
							P7_HGMshowPanel(dv,pn);
						}
					}
				}
			}
		}
		h=document.location.hash;
		if(h){
			x=h.substring(1,h.length);
			if(n!=x.charAt(3)){
				x=false;
			}
			if(x&&x.indexOf(d)===0){
				pn='p7HGMpn_'+x.substring(3);
				P7_HGMshowPanel(dv,pn);
			}
		}
	}
}
function P7_HGMov(ob){
	var s,m;
	s=ob.style.overflow;
	if(!s){
		if(ob.currentStyle){
			s=ob.currentStyle.overflow;
		}
		else
		if(document.defaultView.getComputedStyle(ob,"")){
			s=document.defaultView.getComputedStyle(ob,"").getPropertyValue("overflow");
		}
	}
	m=(s&&s=='auto')?true:false;
	return m;
}
function P7_HGMsetCC(dd,rp,ac){
	var d,tD;
	d=dd.replace('_',rp);
	tD=document.getElementById(d);
	if(tD){
		tD.onclick=function(){
			return P7_HGMcontrol(dd,ac);
		};
	}
	return tD;
}
function P7_HGMsetClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		nc=cl;
		if(cc&&cc.length>0){
			if(cc.indexOf(cl)==-1){
				nc=cc+' '+cl;
			}
			else{
				nc=cc;
			}
		}
		nc=nc.replace(r,' ');
		ob.className=nc;
	}
}
function P7_HGMremClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		if(cc&&cc.indexOf(cl>-1)){
			nc=cc.replace(cl,'');
			nc=nc.replace(r,' ');
			nc=nc.replace(/\s$/,'');
			ob.className=nc;
		}
	}
}
function P7_HGMhasOverflow(ob){
	var s,m;
	s=ob.style.overflow;
	if(!s){
		if(document.defaultView.getComputedStyle(ob,"")){
			s=document.defaultView.getComputedStyle(ob,"").getPropertyValue("overflow");
		}
	}
	m=(s&&s.indexOf('auto')>-1)?true:false;
	return m;
}
function P7_HGMsetOverflow(tB){
	if(navigator.userAgent.toLowerCase().indexOf('gecko')>-1){
		var i,dv,tD=tB.hgmPanels;
		for(i=0;i<tD.length;i++){
			dv=document.getElementById(tD[i]);
			if(P7_HGMhasOverflow(dv)){
				dv.hgmOverflow='auto';
				dv.style.overflow='hidden';
			}
			else{
				dv.hgmOverflow='';
			}
		}
	}
}
function P7_HGMrestoreOverflow(tB){
	if(navigator.userAgent.toLowerCase().indexOf('gecko')>-1){
		var i,dv,tD=tB.hgmPanels;
		for(i=0;i<tD.length;i++){
			dv=document.getElementById(tD[i]);
			if(dv.hgmOverflow=='auto'){
				if(!tB.hgmAnimRunning){
					dv.style.overflow='auto';
				}
			}
		}
	}
}
function P7_HGMrs(){
	var i,j,tB,vP,wP,tD,pP,tl,h=0,oh,w=0,jj,n;
	if(!p7HGMa){
		return;
	}
	for(i=p7HGMctl.length-1;i>-1;i--){
		if(p7HGMctl[i][1]=='auto'){
			tB=document.getElementById(p7HGMctl[i][0]);
			if(tB.hgmAnimRunning){
				continue;
			}
			wP=document.getElementById(tB.id.replace('_','wp_'));
			vP=document.getElementById(tB.id.replace('_','vp_'));
			w=vP.offsetWidth;
			for(j=0;j<tB.hgmPanels.length;j++){
				pP=document.getElementById(tB.hgmPanels[j]);
				pP.style.width=w+'px';
				if(tB.p7opt[3]==4){
					if(pP.id!=tB.hgmCurrentPanelID){
						pP.style.left=(pP.offsetWidth*-1)+'px';
					}
				}
				else{
					pP.style.left=((pP.hgmPanelNum-1)*w)+'px';
				}
			}
			n=tB.hgmPanelNums;
			if(n&&n>0){
				if(tB.p7opt[1]=='auto'){
					wP.style.width =(n*w)+'px';
				}
				else{
					wP.style.width=(tB.p7opt[1]*n)+'px';
				}
			}
			tl=(tB.hgmCurrentPanel-1)*vP.offsetWidth*-1;
			tB.targetLeft=tl;
			if(tB.p7opt[3]!=4){
				wP.style.left=tl+'px';
			}
		}
	}
}
;
