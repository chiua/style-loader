/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author KonstantinKai @kos9k
*/

'use strict';
var loaderUtils = require('loader-utils');

module.exports = function (loaderContext, attrs, content) {
	function parseAttrs (attr) {
		attr = attr.replace(/\\:/g, '__colon__');

		var parts = attr.split(':');
		parts[1] = loaderUtils.interpolateName(loaderContext, (parts[1] = parts[1].replace('__colon__', ':')), {content: content});
		
		return parts;
	}

	var preparedAttrs = [];
	var defaultAttr = ['data-hash:[hash]', 'data-id:[name]'];

	attrs = defaultAttr.concat(attrs);

	for (var i = attrs.length; i--;) {
		preparedAttrs.push(parseAttrs(attrs[i]));
	}

	return preparedAttrs;
};