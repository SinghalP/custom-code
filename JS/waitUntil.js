/**
 * Wait for the Global variables or DOM elements and executes callback once all of them are      found. Will wait until document is completely loaded.
 * 
 * @param {array} arr - array of either DOM elements or Global variables
 * @param {function} callback - callback once all the DOM elements/global variables are found
 * @param {boolean} isDomElement - if the items in arr are DOM elements
 * 
 * @error - if less than 2 parameters are passed or 1st parameter not an Array or 2nd 					parameter not a function
 */
	
function waitUntil( arr, callback, isDomElement ){

	/* Minimum 2 arguments required */
	if( arguments.length < 2 || !Array.isArray( arr ) || typeof callback !== 'function' ){
		throw new Error( 'waitUntil function require minimum 2 parameters. First should be an Array, second should be a function' );
	}

	var func = null;

	function checkDomElement( selector ){
		if( document.querySelectorAll( selector ).length === 0 ){
			return false;
		}
		return true;
	}

	function checkGlobalVariable( variable ){

		if( typeof window[ variable ] === "undefined" ){
			return false;
		}
		return true;
	}

	/* assuming that the items are not DOM elements but Global variables like JQuery etc */
	func = isDomElement ? checkDomElement : checkGlobalVariable;

	for( var i = 0; i < arr.length; i++ ){
		if( !func( arr[ i ] ) ){
			if( document.readyState === "complete" ){
				console.log( '%cwaitUntil: Searched DOM elements/global variables do not exist', 'background:red;color:white;font-size:30px' );
				return;
			}
			setTimeout( waitUntil.bind( this, arr, callback, isDomElement ), 0 );
			return;
		}
	}
	callback();
}