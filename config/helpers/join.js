module.exports = function(parts, sep) {
  'use strict';

  var separator = sep || '/';
  var replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
  
  }
