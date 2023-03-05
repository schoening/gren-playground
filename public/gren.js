(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Compile with --optimize  for better performance and smaller assets.');

// LOG

var _Debug_log_UNUSED = F2(function (tag, value) {
  return value;
});

var _Debug_log = F2(function (tag, value) {
  console.log(tag + ": " + _Debug_toString(value));
  return value;
});

// TODOS

function _Debug_todo(moduleName, region) {
  return function (message) {
    _Debug_crash(8, moduleName, region, message);
  };
}

function _Debug_todoCase(moduleName, region, value) {
  return function (message) {
    _Debug_crash(9, moduleName, region, value, message);
  };
}

// TO STRING

function _Debug_toString_UNUSED(value) {
  return "<internals>";
}

function _Debug_toString(value) {
  return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value) {
  if (value == null) {
    return _Debug_internalColor(ansi, "<null>");
  }

  if (typeof value === "function") {
    return _Debug_internalColor(ansi, "<function>");
  }

  if (typeof value === "boolean") {
    return _Debug_ctorColor(ansi, value ? "True" : "False");
  }

  if (typeof value === "number") {
    return _Debug_numberColor(ansi, value + "");
  }

  if (value instanceof String) {
    return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
  }

  if (typeof value === "string") {
    return _Debug_stringColor(
      ansi,
      '"' + _Debug_addSlashes(value, false) + '"'
    );
  }

  if (Array.isArray(value)) {
    var output = "[";

    value.length > 0 && (output += _Debug_toAnsiString(ansi, value[0]));

    for (var idx = 1; idx < value.length; idx++) {
      output += ", " + _Debug_toAnsiString(ansi, value[idx]);
    }

    return output + "]";
  }

  if (typeof value === "object" && "$" in value) {
    var tag = value.$;

    if (typeof tag === "number") {
      return _Debug_internalColor(ansi, "<internals>");
    }

    if (tag === "Set_gren_builtin") {
      return (
        _Debug_ctorColor(ansi, "Set") +
        _Debug_fadeColor(ansi, ".fromArray") +
        " " +
        _Debug_toAnsiString(ansi, $gren_lang$core$Set$toArray(value))
      );
    }

    if (tag === "RBNode_gren_builtin" || tag === "RBEmpty_gren_builtin") {
      return (
        _Debug_ctorColor(ansi, "Dict") +
        _Debug_fadeColor(ansi, ".fromArray") +
        " " +
        _Debug_toAnsiString(ansi, $gren_lang$core$Dict$toArray(value))
      );
    }

    var output = "";
    for (var i in value) {
      if (i === "$") continue;
      var str = _Debug_toAnsiString(ansi, value[i]);
      var c0 = str[0];
      var parenless =
        c0 === "{" ||
        c0 === "(" ||
        c0 === "[" ||
        c0 === "<" ||
        c0 === '"' ||
        str.indexOf(" ") < 0;
      output += " " + (parenless ? str : "(" + str + ")");
    }
    return _Debug_ctorColor(ansi, tag) + output;
  }

  if (typeof DataView === "function" && value instanceof DataView) {
    return _Debug_stringColor(ansi, "<" + value.byteLength + " bytes>");
  }

  if (typeof File !== "undefined" && value instanceof File) {
    return _Debug_internalColor(ansi, "<" + value.name + ">");
  }

  if (typeof value === "object") {
    var output = [];
    for (var key in value) {
      var field = key[0] === "_" ? key.slice(1) : key;
      output.push(
        _Debug_fadeColor(ansi, field) +
          " = " +
          _Debug_toAnsiString(ansi, value[key])
      );
    }
    if (output.length === 0) {
      return "{}";
    }
    return "{ " + output.join(", ") + " }";
  }

  return _Debug_internalColor(ansi, "<internals>");
}

function _Debug_addSlashes(str, isChar) {
  var s = str
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\r/g, "\\r")
    .replace(/\v/g, "\\v")
    .replace(/\0/g, "\\0");

  if (isChar) {
    return s.replace(/\'/g, "\\'");
  } else {
    return s.replace(/\"/g, '\\"');
  }
}

function _Debug_ctorColor(ansi, string) {
  return ansi ? "\x1b[96m" + string + "\x1b[0m" : string;
}

function _Debug_numberColor(ansi, string) {
  return ansi ? "\x1b[95m" + string + "\x1b[0m" : string;
}

function _Debug_stringColor(ansi, string) {
  return ansi ? "\x1b[93m" + string + "\x1b[0m" : string;
}

function _Debug_charColor(ansi, string) {
  return ansi ? "\x1b[92m" + string + "\x1b[0m" : string;
}

function _Debug_fadeColor(ansi, string) {
  return ansi ? "\x1b[37m" + string + "\x1b[0m" : string;
}

function _Debug_internalColor(ansi, string) {
  return ansi ? "\x1b[36m" + string + "\x1b[0m" : string;
}

function _Debug_toHexDigit(n) {
  return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}

// CRASH

function _Debug_crash_UNUSED(identifier) {
  throw new Error(
    "https://github.com/gren-lang/core/blob/1.0.0/hints/" + identifier + ".md"
  );
}

function _Debug_crash(identifier, fact1, fact2, fact3, fact4) {
  switch (identifier) {
    case 0:
      throw new Error(
        'What node should I take over? In JavaScript I need something like:\n\n    Gren.Main.init({\n        node: document.getElementById("gren-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.'
      );

    case 1:
      throw new Error(
        "Browser.application programs cannot handle URLs like this:\n\n    " +
          document.location.href +
          "\n\nWhat is the root? The root of your file system?"
      );

    case 2:
      var jsonErrorString = fact1;
      throw new Error(
        "Problem with the flags given to your Gren program on initialization.\n\n" +
          jsonErrorString
      );

    case 3:
      var portName = fact1;
      throw new Error(
        "There can only be one port named `" +
          portName +
          "`, but your program has multiple."
      );

    case 4:
      var portName = fact1;
      var problem = fact2;
      throw new Error(
        "Trying to send an unexpected type of value through port `" +
          portName +
          "`:\n" +
          problem
      );

    case 5:
      throw new Error(
        'Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Gren sense.\nRead more about this at https://package.gren-lang.org/packages/gren-lang/core/latest/Basics#== which describes why it is this way and what the better version will look like.'
      );

    case 6:
      var moduleName = fact1;
      throw new Error(
        "Your page is loading multiple Gren scripts with a module named " +
          moduleName +
          ". Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!"
      );

    case 8:
      var moduleName = fact1;
      var region = fact2;
      var message = fact3;
      throw new Error(
        "TODO in module `" +
          moduleName +
          "` " +
          _Debug_regionToString(region) +
          "\n\n" +
          message
      );

    case 9:
      var moduleName = fact1;
      var region = fact2;
      var value = fact3;
      var message = fact4;
      throw new Error(
        "TODO in module `" +
          moduleName +
          "` from the `case` expression " +
          _Debug_regionToString(region) +
          "\n\nIt received the following value:\n\n    " +
          _Debug_toString(value).replace("\n", "\n    ") +
          "\n\nBut the branch that handles it says:\n\n    " +
          message.replace("\n", "\n    ")
      );

    case 10:
      throw new Error("Bug in https://github.com/gren-lang/core/issues");

    case 11:
      throw new Error("Cannot perform mod 0. Division by zero error.");
  }
}

function _Debug_regionToString(region) {
  if (region.start.line === region.end.line) {
    return "on line " + region.start.line;
  }
  return (
    "on lines " + region.start.line + " through " + region.end.line
  );
}


// EQUALITY

function _Utils_eq(x, y) {
  for (
    var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
    isEqual && (pair = stack.pop());
    isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
  ) {}

  return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack) {
  if (x === y) {
    return true;
  }

  if (typeof x !== "object" || x === null || y === null) {
    typeof x === "function" && _Debug_crash(5);
    return false;
  }

  if (depth > 100) {
    stack.push({ a: x, b: y });
    return true;
  }

  /**/
	if (x.$ === 'Set_gren_builtin')
	{
		x = $gren_lang$core$Set$toArray(x);
		y = $gren_lang$core$Set$toArray(y);
	}
	if (x.$ === 'RBNode_gren_builtin' || x.$ === 'RBEmpty_gren_builtin')
	{
		x = $gren_lang$core$Dict$toArray(x);
		y = $gren_lang$core$Dict$toArray(y);
	}
	//*/

  /**_UNUSED/
	if (x.$ < 0)
	{
		x = $gren_lang$core$Dict$toArray(x);
		y = $gren_lang$core$Dict$toArray(y);
	}
	//*/

  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }

  var nextDepth = depth + 1;

  for (var key in x) {
    if (!_Utils_eqHelp(x[key], y[key], nextDepth, stack)) {
      return false;
    }
  }

  return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function (a, b) {
  return !_Utils_eq(a, b);
});

// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y) {
  if (typeof x !== "object") {
    return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
  }

  /**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

  // At this point, we can only be comparing arrays
  for (var idx = 0; idx < x.length; idx++) {
    var ord = _Utils_cmp(x[idx], y[idx]);
    if (ord !== 0) return ord;
  }

  return x.length - y.length;
}

var _Utils_lt = F2(function (a, b) {
  return _Utils_cmp(a, b) < 0;
});
var _Utils_le = F2(function (a, b) {
  return _Utils_cmp(a, b) < 1;
});
var _Utils_gt = F2(function (a, b) {
  return _Utils_cmp(a, b) > 0;
});
var _Utils_ge = F2(function (a, b) {
  return _Utils_cmp(a, b) >= 0;
});

var _Utils_compare = F2(function (x, y) {
  var n = _Utils_cmp(x, y);
  return n < 0 ? $gren_lang$core$Basics$LT : n ? $gren_lang$core$Basics$GT : $gren_lang$core$Basics$EQ;
});

// COMMON VALUES

function _Utils_chr_UNUSED(c) {
  return c;
}
function _Utils_chr(c) {
  return new String(c);
}

// RECORDS

function _Utils_update(oldRecord, updatedFields) {
  var newRecord = {};

  for (var key in oldRecord) {
    newRecord[key] = oldRecord[key];
  }

  for (var key in updatedFields) {
    newRecord[key] = updatedFields[key];
  }

  return newRecord;
}

// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys) {
  // append Strings
  if (typeof xs === "string") {
    return xs + ys;
  }

  return xs.concat(ys);
}


var _Array_length = function (array) {
  return array.length;
};

var _Array_initialize = F3(function (size, offset, func) {
  var result = new Array(size);

  for (var i = 0; i < size; i++) {
    result[i] = func(offset + i);
  }

  return result;
});

var _Array_get = F2(function (index, array) {
  if (index < 0 || index >= array.length) {
    return $gren_lang$core$Maybe$Nothing;
  }

  return $gren_lang$core$Maybe$Just(array[index]);
});

var _Array_set = F3(function (index, value, array) {
  if (index < 0 || index >= array.length) {
    return array;
  }

  var result = array.slice();
  result[index] = value;

  return result;
});

var _Array_push = F2(function (value, array) {
  return array.concat([value]);
});

var _Array_foldl = F3(function (func, acc, array) {
  for (var i = 0; i < array.length; i++) {
    acc = A2(func, array[i], acc);
  }

  return acc;
});

var _Array_foldr = F3(function (func, acc, array) {
  for (var i = array.length - 1; i >= 0; i--) {
    acc = A2(func, array[i], acc);
  }

  return acc;
});

var _Array_map = F2(function (func, array) {
  return array.map(func);
});

var _Array_indexedMap = F2(function (func, array) {
  return array.map(function (value, index) {
    return A2(func, index, value);
  });
});

var _Array_slice = F3(function (from, to, array) {
  return array.slice(from, to);
});

var _Array_append = F2(function (left, right) {
  return left.concat(right);
});

var _Array_reverse = function (array) {
  return array.slice().reverse();
};

var _Array_findFirst = F2(function (pred, array) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    if (pred(element)) {
      return $gren_lang$core$Maybe$Just(element);
    }
  }

  return $gren_lang$core$Maybe$Nothing;
});

var _Array_findLast = F2(function (pred, array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var element = array[i];

    if (pred(element)) {
      return $gren_lang$core$Maybe$Just(element);
    }
  }

  return $gren_lang$core$Maybe$Nothing;
});

var _Array_map2 = F3(function (fn, as, bs) {
  var result = [];
  var lowestLength = as.length < bs.length ? as.length : bs.length;

  for (var i = 0; i < lowestLength; i++) {
    result.push(A2(fn, as[i], bs[i]));
  }

  return result;
});

var _Array_map3 = F4(function (fn, as, bs, cs) {
  var result = [];
  var lowestLength = [as.length, bs.length, cs.length].sort()[0];

  for (var i = 0; i < lowestLength; i++) {
    result.push(A3(fn, as[i], bs[i], cs[i]));
  }

  return result;
});

var _Array_sort = function (array) {
  return array.slice().sort(function (a, b) {
    return _Utils_cmp(a, b);
  });
};

var _Array_sortBy = F2(function (fn, array) {
  return array.slice().sort(function (a, b) {
    return _Utils_cmp(fn(a), fn(b));
  });
});

var _Array_sortWith = F2(function (fn, array) {
  return array.slice().sort(function (a, b) {
    var ord = A2(fn, a, b);
    return ord === $gren_lang$core$Basics$EQ ? 0 : ord === $gren_lang$core$Basics$LT ? -1 : 1;
  });
});


// MATH

var _Basics_add = F2(function (a, b) {
  return a + b;
});
var _Basics_sub = F2(function (a, b) {
  return a - b;
});
var _Basics_mul = F2(function (a, b) {
  return a * b;
});
var _Basics_fdiv = F2(function (a, b) {
  return a / b;
});
var _Basics_idiv = F2(function (a, b) {
  return (a / b) | 0;
});
var _Basics_pow = F2(Math.pow);

// MORE MATH

function _Basics_toFloat(x) {
  return x;
}
function _Basics_isInfinite(n) {
  return n === Infinity || n === -Infinity;
}

var _Basics_isNaN = isNaN;

// BOOLEANS

function _Basics_not(bool) {
  return !bool;
}
var _Basics_and = F2(function (a, b) {
  return a && b;
});
var _Basics_or = F2(function (a, b) {
  return a || b;
});
var _Basics_xor = F2(function (a, b) {
  return a !== b;
});


var _String_cons = F2(function (chr, str) {
  return chr + str;
});

function _String_uncons(string) {
  var word = string.charCodeAt(0);
  return !isNaN(word)
    ? $gren_lang$core$Maybe$Just(
        0xd800 <= word && word <= 0xdbff
          ? { first: _Utils_chr(string[0] + string[1]), rest: string.slice(2) }
          : { first: _Utils_chr(string[0]), rest: string.slice(1) }
      )
    : $gren_lang$core$Maybe$Nothing;
}

var _String_append = F2(function (a, b) {
  return a + b;
});

function _String_length(str) {
  return str.length;
}

var _String_map = F2(function (func, string) {
  var len = string.length;
  var array = new Array(len);
  var i = 0;
  while (i < len) {
    var word = string.charCodeAt(i);
    if (0xd800 <= word && word <= 0xdbff) {
      array[i] = func(_Utils_chr(string[i] + string[i + 1]));
      i += 2;
      continue;
    }
    array[i] = func(_Utils_chr(string[i]));
    i++;
  }
  return array.join("");
});

var _String_filter = F2(function (isGood, str) {
  var arr = [];
  var len = str.length;
  var i = 0;
  while (i < len) {
    var char = str[i];
    var word = str.charCodeAt(i);
    i++;
    if (0xd800 <= word && word <= 0xdbff) {
      char += str[i];
      i++;
    }

    if (isGood(_Utils_chr(char))) {
      arr.push(char);
    }
  }
  return arr.join("");
});

function _String_reverse(str) {
  var len = str.length;
  var arr = new Array(len);
  var i = 0;
  while (i < len) {
    var word = str.charCodeAt(i);
    if (0xd800 <= word && word <= 0xdbff) {
      arr[len - i] = str[i + 1];
      i++;
      arr[len - i] = str[i - 1];
      i++;
    } else {
      arr[len - i] = str[i];
      i++;
    }
  }
  return arr.join("");
}

var _String_foldl = F3(function (func, state, string) {
  var len = string.length;
  var i = 0;
  while (i < len) {
    var char = string[i];
    var word = string.charCodeAt(i);
    i++;
    if (0xd800 <= word && word <= 0xdbff) {
      char += string[i];
      i++;
    }
    state = A2(func, _Utils_chr(char), state);
  }
  return state;
});

var _String_foldr = F3(function (func, state, string) {
  var i = string.length;
  while (i--) {
    var char = string[i];
    var word = string.charCodeAt(i);
    if (0xdc00 <= word && word <= 0xdfff) {
      i--;
      char = string[i] + char;
    }
    state = A2(func, _Utils_chr(char), state);
  }
  return state;
});

var _String_split = F2(function (sep, str) {
  return str.split(sep);
});

var _String_join = F2(function (sep, strs) {
  return strs.join(sep);
});

var _String_slice = F3(function (start, end, str) {
  return str.slice(start, end);
});

function _String_trim(str) {
  return str.trim();
}

function _String_trimLeft(str) {
  return str.replace(/^\s+/, "");
}

function _String_trimRight(str) {
  return str.replace(/\s+$/, "");
}

function _String_words(str) {
  return str.trim().split(/\s+/g);
}

function _String_lines(str) {
  return str.split(/\r\n|\r|\n/g);
}

function _String_toUpper(str) {
  return str.toUpperCase();
}

function _String_toLower(str) {
  return str.toLowerCase();
}

var _String_any = F2(function (isGood, string) {
  var i = string.length;
  while (i--) {
    var char = string[i];
    var word = string.charCodeAt(i);
    if (0xdc00 <= word && word <= 0xdfff) {
      i--;
      char = string[i] + char;
    }
    if (isGood(_Utils_chr(char))) {
      return true;
    }
  }
  return false;
});

var _String_all = F2(function (isGood, string) {
  var i = string.length;
  while (i--) {
    var char = string[i];
    var word = string.charCodeAt(i);
    if (0xdc00 <= word && word <= 0xdfff) {
      i--;
      char = string[i] + char;
    }
    if (!isGood(_Utils_chr(char))) {
      return false;
    }
  }
  return true;
});

var _String_contains = F2(function (sub, str) {
  return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function (sub, str) {
  return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function (sub, str) {
  return (
    str.length >= sub.length && str.lastIndexOf(sub) === str.length - sub.length
  );
});

var _String_indexes = F2(function (sub, str) {
  var subLen = sub.length;

  if (subLen < 1) {
    return [];
  }

  var i = 0;
  var is = [];

  while ((i = str.indexOf(sub, i)) > -1) {
    is.push(i);
    i = i + subLen;
  }

  return is;
});

// TO STRING

function _String_fromNumber(number) {
  return number + "";
}

// INT CONVERSIONS

function _String_toInt(str) {
  var total = 0;
  var code0 = str.charCodeAt(0);
  var start = code0 == 0x2b /* + */ || code0 == 0x2d /* - */ ? 1 : 0;

  for (var i = start; i < str.length; ++i) {
    var code = str.charCodeAt(i);
    if (code < 0x30 || 0x39 < code) {
      return $gren_lang$core$Maybe$Nothing;
    }
    total = 10 * total + code - 0x30;
  }

  return i == start
    ? $gren_lang$core$Maybe$Nothing
    : $gren_lang$core$Maybe$Just(code0 == 0x2d ? -total : total);
}

// FLOAT CONVERSIONS

function _String_toFloat(s) {
  // check if it is a hex, octal, or binary number
  if (s.length === 0 || /[\sxbo]/.test(s)) {
    return $gren_lang$core$Maybe$Nothing;
  }
  var n = +s;
  // faster isNaN check
  return n === n ? $gren_lang$core$Maybe$Just(n) : $gren_lang$core$Maybe$Nothing;
}

function _String_fromArray(chars) {
  return chars.join("");
}


function _Char_toCode(char) {
  var code = char.charCodeAt(0);
  if (0xd800 <= code && code <= 0xdbff) {
    return (code - 0xd800) * 0x400 + char.charCodeAt(1) - 0xdc00 + 0x10000;
  }
  return code;
}

function _Char_fromCode(code) {
  return _Utils_chr(
    code < 0 || 0x10ffff < code
      ? "\uFFFD"
      : code <= 0xffff
      ? String.fromCharCode(code)
      : ((code -= 0x10000),
        String.fromCharCode(
          Math.floor(code / 0x400) + 0xd800,
          (code % 0x400) + 0xdc00
        ))
  );
}

function _Char_toUpper(char) {
  return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char) {
  return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char) {
  return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char) {
  return _Utils_chr(char.toLocaleLowerCase());
}


/**/
function _Json_errorToString(error)
{
	return $gren_lang$core$Json$Decode$errorToString(error);
}
//*/

// CORE DECODERS

function _Json_succeed(msg) {
  return {
    $: 0,
    a: msg,
  };
}

function _Json_fail(msg) {
  return {
    $: 1,
    a: msg,
  };
}

function _Json_decodePrim(decoder) {
  return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function (value) {
  return typeof value !== "number"
    ? _Json_expecting("an INT", value)
    : -2147483647 < value && value < 2147483647 && (value | 0) === value
    ? $gren_lang$core$Result$Ok(value)
    : isFinite(value) && !(value % 1)
    ? $gren_lang$core$Result$Ok(value)
    : _Json_expecting("an INT", value);
});

var _Json_decodeBool = _Json_decodePrim(function (value) {
  return typeof value === "boolean"
    ? $gren_lang$core$Result$Ok(value)
    : _Json_expecting("a BOOL", value);
});

var _Json_decodeFloat = _Json_decodePrim(function (value) {
  return typeof value === "number"
    ? $gren_lang$core$Result$Ok(value)
    : _Json_expecting("a FLOAT", value);
});

var _Json_decodeValue = _Json_decodePrim(function (value) {
  return $gren_lang$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function (value) {
  return typeof value === "string"
    ? $gren_lang$core$Result$Ok(value)
    : value instanceof String
    ? $gren_lang$core$Result$Ok(value + "")
    : _Json_expecting("a STRING", value);
});

function _Json_decodeArray(decoder) {
  return { $: 3, b: decoder };
}

function _Json_decodeNull(value) {
  return { $: 4, c: value };
}

var _Json_decodeField = F2(function (field, decoder) {
  return {
    $: 5,
    d: field,
    b: decoder,
  };
});

var _Json_decodeIndex = F2(function (index, decoder) {
  return {
    $: 6,
    e: index,
    b: decoder,
  };
});

function _Json_decodeKeyValuePairs(decoder) {
  return {
    $: 7,
    b: decoder,
  };
}

function _Json_mapMany(f, decoders) {
  return {
    $: 8,
    f: f,
    g: decoders,
  };
}

var _Json_andThen = F2(function (callback, decoder) {
  return {
    $: 9,
    b: decoder,
    h: callback,
  };
});

function _Json_oneOf(decoders) {
  return {
    $: 10,
    g: decoders,
  };
}

// DECODING OBJECTS

var _Json_map1 = F2(function (f, d1) {
  return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function (f, d1, d2) {
  return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function (f, d1, d2, d3) {
  return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function (f, d1, d2, d3, d4) {
  return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function (f, d1, d2, d3, d4, d5) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function (f, d1, d2, d3, d4, d5, d6) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function (f, d1, d2, d3, d4, d5, d6, d7) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function (f, d1, d2, d3, d4, d5, d6, d7, d8) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});

// DECODE

var _Json_runOnString = F2(function (decoder, string) {
  try {
    var value = JSON.parse(string);
    return _Json_runHelp(decoder, value);
  } catch (e) {
    return $gren_lang$core$Result$Err(
      A2(
        $gren_lang$core$Json$Decode$Failure,
        "This is not valid JSON! " + e.message,
        _Json_wrap(string)
      )
    );
  }
});

var _Json_run = F2(function (decoder, value) {
  return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value) {
  switch (decoder.$) {
    case 2:
      return decoder.b(value);

    case 4:
      return value === null
        ? $gren_lang$core$Result$Ok(decoder.c)
        : _Json_expecting("null", value);

    case 3:
      if (!_Json_isArray(value)) {
        return _Json_expecting("an ARRAY", value);
      }
      return _Json_runArrayDecoder(decoder.b, value);

    case 5:
      var field = decoder.d;
      if (typeof value !== "object" || value === null || !(field in value)) {
        return _Json_expecting(
          "an OBJECT with a field named `" + field + "`",
          value
        );
      }
      var result = _Json_runHelp(decoder.b, value[field]);
      return $gren_lang$core$Result$isOk(result)
        ? result
        : $gren_lang$core$Result$Err(A2($gren_lang$core$Json$Decode$Field, field, result.a));

    case 6:
      var index = decoder.e;
      if (!_Json_isArray(value)) {
        return _Json_expecting("an ARRAY", value);
      }
      if (index >= value.length) {
        return _Json_expecting(
          "a LONGER array. Need index " +
            index +
            " but only see " +
            value.length +
            " entries",
          value
        );
      }
      var result = _Json_runHelp(decoder.b, value[index]);
      return $gren_lang$core$Result$isOk(result)
        ? result
        : $gren_lang$core$Result$Err(A2($gren_lang$core$Json$Decode$Index, index, result.a));

    case 7:
      if (typeof value !== "object" || value === null || _Json_isArray(value)) {
        return _Json_expecting("an OBJECT", value);
      }

      var keyValuePairs = [];
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          var result = _Json_runHelp(decoder.b, value[key]);
          if (!$gren_lang$core$Result$isOk(result)) {
            return $gren_lang$core$Result$Err(A2($gren_lang$core$Json$Decode$Field, key, result.a));
          }
          keyValuePairs.push({ key: key, value: result.a });
        }
      }
      return $gren_lang$core$Result$Ok(keyValuePairs);

    case 8:
      var answer = decoder.f;
      var decoders = decoder.g;
      for (var i = 0; i < decoders.length; i++) {
        var result = _Json_runHelp(decoders[i], value);
        if (!$gren_lang$core$Result$isOk(result)) {
          return result;
        }
        answer = answer(result.a);
      }
      return $gren_lang$core$Result$Ok(answer);

    case 9:
      var result = _Json_runHelp(decoder.b, value);
      return !$gren_lang$core$Result$isOk(result)
        ? result
        : _Json_runHelp(decoder.h(result.a), value);

    case 10:
      var errors = [];

      var decoders = decoder.g;
      for (var idx = 0; idx < decoders.length; idx++) {
        var result = _Json_runHelp(decoders[idx], value);
        if ($gren_lang$core$Result$isOk(result)) {
          return result;
        }
        errors.push(result.a);
      }

      return $gren_lang$core$Result$Err($gren_lang$core$Json$Decode$OneOf(errors));

    case 1:
      return $gren_lang$core$Result$Err(A2($gren_lang$core$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

    case 0:
      return $gren_lang$core$Result$Ok(decoder.a);
  }
}

function _Json_runArrayDecoder(decoder, value) {
  var len = value.length;
  var array = new Array(len);
  for (var i = 0; i < len; i++) {
    var result = _Json_runHelp(decoder, value[i]);
    if (!$gren_lang$core$Result$isOk(result)) {
      return $gren_lang$core$Result$Err(A2($gren_lang$core$Json$Decode$Index, i, result.a));
    }
    array[i] = result.a;
  }
  return $gren_lang$core$Result$Ok(array);
}

function _Json_isArray(value) {
  return (
    Array.isArray(value) ||
    (typeof FileList !== "undefined" && value instanceof FileList)
  );
}

function _Json_expecting(type, value) {
  return $gren_lang$core$Result$Err(
    A2($gren_lang$core$Json$Decode$Failure, "Expecting " + type, _Json_wrap(value))
  );
}

// EQUALITY

function _Json_equality(x, y) {
  if (x === y) {
    return true;
  }

  if (x.$ !== y.$) {
    return false;
  }

  switch (x.$) {
    case 0:
    case 1:
      return x.a === y.a;

    case 2:
      return x.b === y.b;

    case 4:
      return x.c === y.c;

    case 3:
    case 7:
      return _Json_equality(x.b, y.b);

    case 5:
      return (
        x.d === y.d && _Json_equality(x.b, y.b)
      );

    case 6:
      return (
        x.e === y.e && _Json_equality(x.b, y.b)
      );

    case 8:
      return (
        x.f === y.f && _Json_arrayEquality(x.g, y.g)
      );

    case 9:
      return (
        x.h === y.h &&
        _Json_equality(x.b, y.b)
      );

    case 10:
      return _Json_arrayEquality(x.g, y.g);
  }
}

function _Json_arrayEquality(aDecoders, bDecoders) {
  var len = aDecoders.length;
  if (len !== bDecoders.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    if (!_Json_equality(aDecoders[i], bDecoders[i])) {
      return false;
    }
  }
  return true;
}

// ENCODE

var _Json_encode = F2(function (indentLevel, value) {
  return JSON.stringify(_Json_unwrap(value), null, indentLevel) + "";
});

function _Json_wrap(value) {
  return { $: 0, a: value };
}
function _Json_unwrap(value) {
  return value.a;
}

function _Json_wrap_UNUSED(value) {
  return value;
}
function _Json_unwrap_UNUSED(value) {
  return value;
}

function _Json_emptyArray() {
  return [];
}
function _Json_emptyObject() {
  return {};
}

var _Json_addField = F3(function (key, value, object) {
  object[key] = _Json_unwrap(value);
  return object;
});

function _Json_addEntry(func) {
  return F2(function (entry, array) {
    array.push(_Json_unwrap(func(entry)));
    return array;
  });
}

var _Json_encodeNull = _Json_wrap(null);


// TASKS

function _Scheduler_succeed(value) {
  return {
    $: 0,
    a: value,
  };
}

function _Scheduler_fail(error) {
  return {
    $: 1,
    a: error,
  };
}

function _Scheduler_binding(callback) {
  return {
    $: 2,
    b: callback,
    c: null,
  };
}

var _Scheduler_andThen = F2(function (callback, task) {
  return {
    $: 3,
    b: callback,
    d: task,
  };
});

var _Scheduler_onError = F2(function (callback, task) {
  return {
    $: 4,
    b: callback,
    d: task,
  };
});

function _Scheduler_receive(callback) {
  return {
    $: 5,
    b: callback,
  };
}

// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task) {
  var proc = {
    $: 0,
    e: _Scheduler_guid++,
    f: task,
    g: null,
    h: [],
  };

  _Scheduler_enqueue(proc);

  return proc;
}

function _Scheduler_spawn(task) {
  return _Scheduler_binding(function (callback) {
    callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
  });
}

function _Scheduler_rawSend(proc, msg) {
  proc.h.push(msg);
  _Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function (proc, msg) {
  return _Scheduler_binding(function (callback) {
    _Scheduler_rawSend(proc, msg);
    callback(_Scheduler_succeed({}));
  });
});

function _Scheduler_kill(proc) {
  return _Scheduler_binding(function (callback) {
    var task = proc.f;
    if (task && task.$ === 2 && task.c) {
      task.c();
    }

    proc.f = null;

    callback(_Scheduler_succeed({}));
  });
}

/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/

var _Scheduler_working = false;
var _Scheduler_queue = [];

function _Scheduler_enqueue(proc) {
  _Scheduler_queue.push(proc);
  if (_Scheduler_working) {
    return;
  }
  _Scheduler_working = true;
  while ((proc = _Scheduler_queue.shift())) {
    _Scheduler_step(proc);
  }
  _Scheduler_working = false;
}

function _Scheduler_step(proc) {
  while (proc.f) {
    var rootTag = proc.f.$;
    if (rootTag === 0 || rootTag === 1) {
      while (proc.g && proc.g.$ !== rootTag) {
        proc.g = proc.g.i;
      }
      if (!proc.g) {
        return;
      }
      proc.f = proc.g.b(proc.f.a);
      proc.g = proc.g.i;
    } else if (rootTag === 2) {
      proc.f.c = proc.f.b(function (newRoot) {
        proc.f = newRoot;
        _Scheduler_enqueue(proc);
      });
      return;
    } else if (rootTag === 5) {
      if (proc.h.length === 0) {
        return;
      }
      proc.f = proc.f.b(proc.h.shift());
    } // if (rootTag === 3 || rootTag === 4)
    else {
      proc.g = {
        $: rootTag === 3 ? 0 : 1,
        b: proc.f.b,
        i: proc.g,
      };
      proc.f = proc.f.d;
    }
  }
}


function _Process_sleep(time) {
  return _Scheduler_binding(function (callback) {
    var id = setTimeout(function () {
      callback(_Scheduler_succeed({}));
    }, time);

    return function () {
      clearTimeout(id);
    };
  });
}


// PROGRAMS

var _Platform_worker = F4(function (impl, flagDecoder, debugMetadata, args) {
  return _Platform_initialize(
    flagDecoder,
    args,
    impl.init,
    impl.update,
    impl.subscriptions,
    function () {
      return function () {};
    }
  );
});

// INITIALIZE A PROGRAM

function _Platform_initialize(
  flagDecoder,
  args,
  init,
  update,
  subscriptions,
  stepperBuilder
) {
  var result = A2(
    _Json_run,
    flagDecoder,
    _Json_wrap(args ? args["flags"] : undefined)
  );
  $gren_lang$core$Result$isOk(result) ||
    _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
  var managers = {};
  var initPair = init(result.a);
  var model = initPair.model;
  var stepper = stepperBuilder(sendToApp, model);
  var ports = _Platform_setupEffects(managers, sendToApp);

  function sendToApp(msg, viewMetadata) {
    var pair = A2(update, msg, model);
    stepper((model = pair.model), viewMetadata);
    _Platform_enqueueEffects(managers, pair.command, subscriptions(model));
  }

  _Platform_enqueueEffects(managers, initPair.command, subscriptions(model));

  return ports ? { ports: ports } : {};
}

// TRACK PRELOADS
//
// This is used by code in gren/browser and gren/http
// to register any HTTP requests that are triggered by init.
//

var _Platform_preload;

function _Platform_registerPreload(url) {
  _Platform_preload.add(url);
}

// EFFECT MANAGERS

var _Platform_effectManagers = {};

function _Platform_setupEffects(managers, sendToApp) {
  var ports;

  // setup all necessary effect managers
  for (var key in _Platform_effectManagers) {
    var manager = _Platform_effectManagers[key];

    if (manager.a) {
      ports = ports || {};
      ports[key] = manager.a(key, sendToApp);
    }

    managers[key] = _Platform_instantiateManager(manager, sendToApp);
  }

  return ports;
}

function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap) {
  return {
    b: init,
    c: onEffects,
    d: onSelfMsg,
    e: cmdMap,
    f: subMap,
  };
}

function _Platform_instantiateManager(info, sendToApp) {
  var router = {
    g: sendToApp,
    h: undefined,
  };

  var onEffects = info.c;
  var onSelfMsg = info.d;
  var cmdMap = info.e;
  var subMap = info.f;

  function loop(state) {
    return A2(
      _Scheduler_andThen,
      loop,
      _Scheduler_receive(function (msg) {
        var value = msg.a;

        if (msg.$ === 0) {
          return A3(onSelfMsg, router, value, state);
        }

        return cmdMap && subMap
          ? A4(onEffects, router, value.i, value.j, state)
          : A3(onEffects, router, cmdMap ? value.i : value.j, state);
      })
    );
  }

  return (router.h = _Scheduler_rawSpawn(
    A2(_Scheduler_andThen, loop, info.b)
  ));
}

// ROUTING

var _Platform_sendToApp = F2(function (router, msg) {
  return _Scheduler_binding(function (callback) {
    router.g(msg);
    callback(_Scheduler_succeed({}));
  });
});

var _Platform_sendToSelf = F2(function (router, msg) {
  return A2(_Scheduler_send, router.h, {
    $: 0,
    a: msg,
  });
});

// BAGS

function _Platform_leaf(home) {
  return function (value) {
    return {
      $: 1,
      k: home,
      l: value,
    };
  };
}

function _Platform_batch(list) {
  return {
    $: 2,
    m: list,
  };
}

var _Platform_map = F2(function (tagger, bag) {
  return {
    $: 3,
    n: tagger,
    o: bag,
  };
});

// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/gren/core/issues/980
//   https://github.com/gren/core/pull/981
//   https://github.com/gren/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.

// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;

function _Platform_enqueueEffects(managers, cmdBag, subBag) {
  _Platform_effectsQueue.push({
    p: managers,
    q: cmdBag,
    r: subBag,
  });

  if (_Platform_effectsActive) return;

  _Platform_effectsActive = true;
  for (var fx; (fx = _Platform_effectsQueue.shift()); ) {
    _Platform_dispatchEffects(fx.p, fx.q, fx.r);
  }
  _Platform_effectsActive = false;
}

function _Platform_dispatchEffects(managers, cmdBag, subBag) {
  var effectsDict = {};
  _Platform_gatherEffects(true, cmdBag, effectsDict, null);
  _Platform_gatherEffects(false, subBag, effectsDict, null);

  for (var home in managers) {
    _Scheduler_rawSend(managers[home], {
      $: "fx",
      a: effectsDict[home] || { i: [], j: [] },
    });
  }
}

function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers) {
  switch (bag.$) {
    case 1:
      var home = bag.k;
      var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
      effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
      return;

    case 2:
      var bags = bag.m;
      for (var idx = 0; idx < bags.length; idx++) {
        _Platform_gatherEffects(isCmd, bags[idx], effectsDict, taggers);
      }
      return;

    case 3:
      _Platform_gatherEffects(isCmd, bag.o, effectsDict, {
        s: bag.n,
        t: taggers,
      });
      return;
  }
}

function _Platform_toEffect(isCmd, home, taggers, value) {
  function applyTaggers(x) {
    for (var temp = taggers; temp; temp = temp.t) {
      x = temp.s(x);
    }
    return x;
  }

  var map = isCmd
    ? _Platform_effectManagers[home].e
    : _Platform_effectManagers[home].f;

  return A2(map, applyTaggers, value);
}

function _Platform_insert(isCmd, newEffect, effects) {
  effects = effects || { i: [], j: [] };

  isCmd
    ? (effects.i = A2($gren_lang$core$Array$pushLast, newEffect, effects.i))
    : (effects.j = A2($gren_lang$core$Array$pushLast, newEffect, effects.j));

  return effects;
}

// PORTS

function _Platform_checkPortName(name) {
  if (_Platform_effectManagers[name]) {
    _Debug_crash(3, name);
  }
}

// OUTGOING PORTS

function _Platform_outgoingPort(name, converter) {
  _Platform_checkPortName(name);
  _Platform_effectManagers[name] = {
    e: _Platform_outgoingPortMap,
    u: converter,
    a: _Platform_setupOutgoingPort,
  };
  return _Platform_leaf(name);
}

var _Platform_outgoingPortMap = F2(function (tagger, value) {
  return value;
});

function _Platform_setupOutgoingPort(name) {
  var subs = [];
  var converter = _Platform_effectManagers[name].u;

  // CREATE MANAGER

  var init = _Process_sleep(0);

  _Platform_effectManagers[name].b = init;
  _Platform_effectManagers[name].c = F3(function (
    router,
    cmdArray,
    state
  ) {
    for (var idx = 0; idx < cmdArray.length; idx++) {
      // grab a separate reference to subs in case unsubscribe is called
      var currentSubs = subs;
      var value = _Json_unwrap(converter(cmdArray[idx]));
      for (var subIdx = 0; subIdx < currentSubs.length; subIdx++) {
        currentSubs[subIdx](value);
      }
    }
    return init;
  });

  // PUBLIC API

  function subscribe(callback) {
    subs.push(callback);
  }

  function unsubscribe(callback) {
    // copy subs into a new array in case unsubscribe is called within a
    // subscribed callback
    subs = subs.slice();
    var index = subs.indexOf(callback);
    if (index >= 0) {
      subs.splice(index, 1);
    }
  }

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
  };
}

// INCOMING PORTS

function _Platform_incomingPort(name, converter) {
  _Platform_checkPortName(name);
  _Platform_effectManagers[name] = {
    f: _Platform_incomingPortMap,
    u: converter,
    a: _Platform_setupIncomingPort,
  };
  return _Platform_leaf(name);
}

var _Platform_incomingPortMap = F2(function (tagger, finalTagger) {
  return function (value) {
    return tagger(finalTagger(value));
  };
});

function _Platform_setupIncomingPort(name, sendToApp) {
  var subs = [];
  var converter = _Platform_effectManagers[name].u;

  // CREATE MANAGER

  var init = _Scheduler_succeed(null);

  _Platform_effectManagers[name].b = init;
  _Platform_effectManagers[name].c = F3(function (
    router,
    subArray,
    state
  ) {
    subs = subArray;
    return init;
  });

  // PUBLIC API

  function send(incomingValue) {
    var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

    $gren_lang$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

    var value = result.a;
    for (var idx = 0; idx < subs.length; idx++) {
      sendToApp(subs[idx](value));
    }
  }

  return { send: send };
}

// EXPORT GREN MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//

function _Platform_export_UNUSED(exports) {
  scope["Gren"]
    ? _Platform_mergeExportsProd(scope["Gren"], exports)
    : (scope["Gren"] = exports);
}

function _Platform_mergeExportsProd(obj, exports) {
  for (var name in exports) {
    name in obj
      ? name == "init"
        ? _Debug_crash(6)
        : _Platform_mergeExportsProd(obj[name], exports[name])
      : (obj[name] = exports[name]);
  }
}

function _Platform_export(exports) {
  scope["Gren"]
    ? _Platform_mergeExportsDebug("Gren", scope["Gren"], exports)
    : (scope["Gren"] = exports);
}

function _Platform_mergeExportsDebug(moduleName, obj, exports) {
  for (var name in exports) {
    name in obj
      ? name == "init"
        ? _Debug_crash(6, moduleName)
        : _Platform_mergeExportsDebug(
            moduleName + "." + name,
            obj[name],
            exports[name]
          )
      : (obj[name] = exports[name]);
  }
}


// HELPERS

var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== "undefined" ? document : {};

function _VirtualDom_appendChild(parent, child) {
  parent.appendChild(child);
}

var _VirtualDom_init = F4(function (
  virtualNode,
  flagDecoder,
  debugMetadata,
  args
) {
  // NOTE: this function needs _Platform_export available to work

  /**_UNUSED/
	var node = args['node'];
	//*/
  /**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

  node.parentNode.replaceChild(
    _VirtualDom_render(virtualNode, function () {}),
    node
  );

  return {};
});

// TEXT

function _VirtualDom_text(string) {
  return {
    $: 0,
    a: string,
  };
}

// NODE

var _VirtualDom_nodeNS = F4(function (namespace, tag, factList, kids) {
  for (var descendantsCount = 0, i = 0; i < kids.length; i++) {
    var kid = kids[i];
    descendantsCount += kid.b || 0;
  }

  descendantsCount += kids.length;

  return {
    $: 1,
    c: tag,
    d: _VirtualDom_organizeFacts(factList),
    e: kids,
    f: namespace,
    b: descendantsCount,
  };
});

var _VirtualDom_node = F3(function (tag, factList, kidList) {
  return A4(_VirtualDom_nodeNS, undefined, tag, factList, kidList);
});

// KEYED NODE

var _VirtualDom_keyedNodeNS = F4(function (namespace, tag, factList, kids) {
  for (var descendantsCount = 0, i = 0; i < kids.length; i++) {
    var kid = kids[i];
    descendantsCount += kid.node.b || 0;
  }

  descendantsCount += kids.length;

  return {
    $: 2,
    c: tag,
    d: _VirtualDom_organizeFacts(factList),
    e: kids,
    f: namespace,
    b: descendantsCount,
  };
});

var _VirtualDom_keyedNode = F3(function (tag, factList, kidList) {
  return A4(_VirtualDom_keyedNodeNS, undefined, tag, factList, kidList);
});

// CUSTOM

function _VirtualDom_custom(factList, model, render, diff) {
  return {
    $: 3,
    d: _VirtualDom_organizeFacts(factList),
    g: model,
    h: render,
    i: diff,
  };
}

// MAP

var _VirtualDom_map = F2(function (tagger, node) {
  return {
    $: 4,
    j: tagger,
    k: node,
    b: 1 + (node.b || 0),
  };
});

// LAZY

function _VirtualDom_thunk(view, args, thunk) {
  return {
    $: 5,
    l: view,
    m: args,
    n: thunk,
    k: undefined,
  };
}

var _VirtualDom_lazy = F2(function (func, a) {
  return _VirtualDom_thunk(func, [a], function () {
    return func(a);
  });
});

var _VirtualDom_lazy2 = F3(function (func, a, b) {
  return _VirtualDom_thunk(func, [a, b], function () {
    return A2(func, a, b);
  });
});

var _VirtualDom_lazy3 = F4(function (func, a, b, c) {
  return _VirtualDom_thunk(func, [a, b, c], function () {
    return A3(func, a, b, c);
  });
});

var _VirtualDom_lazy4 = F5(function (func, a, b, c, d) {
  return _VirtualDom_thunk(func, [a, b, c, d], function () {
    return A4(func, a, b, c, d);
  });
});

var _VirtualDom_lazy5 = F6(function (func, a, b, c, d, e) {
  return _VirtualDom_thunk(func, [a, b, c, d, e], function () {
    return A5(func, a, b, c, d, e);
  });
});

var _VirtualDom_lazy6 = F7(function (func, a, b, c, d, e, f) {
  return _VirtualDom_thunk(func, [a, b, c, d, e, f], function () {
    return A6(func, a, b, c, d, e, f);
  });
});

var _VirtualDom_lazy7 = F8(function (func, a, b, c, d, e, f, g) {
  return _VirtualDom_thunk(func, [a, b, c, d, e, f, g], function () {
    return A7(func, a, b, c, d, e, f, g);
  });
});

var _VirtualDom_lazy8 = F9(function (func, a, b, c, d, e, f, g, h) {
  return _VirtualDom_thunk(func, [a, b, c, d, e, f, g, h], function () {
    return A8(func, a, b, c, d, e, f, g, h);
  });
});

// FACTS

var _VirtualDom_on = F2(function (key, handler) {
  return {
    $: "a0",
    o: key,
    p: handler,
  };
});
var _VirtualDom_style = F2(function (key, value) {
  return {
    $: "a1",
    o: key,
    p: value,
  };
});
var _VirtualDom_property = F2(function (key, value) {
  return {
    $: "a2",
    o: key,
    p: value,
  };
});
var _VirtualDom_attribute = F2(function (key, value) {
  return {
    $: "a3",
    o: key,
    p: value,
  };
});
var _VirtualDom_attributeNS = F3(function (namespace, key, value) {
  return {
    $: "a4",
    o: key,
    p: { f: namespace, p: value },
  };
});

// XSS ATTACK VECTOR CHECKS

function _VirtualDom_noScript(tag) {
  return tag == "script" ? "p" : tag;
}

function _VirtualDom_noOnOrFormAction(key) {
  return /^(on|formAction$)/i.test(key) ? "data-" + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key) {
  return key == "innerHTML" || key == "formAction" ? "data-" + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value) {
  return /^javascript:/i.test(value.replace(/\s/g, "")) ? "" : value;
}

function _VirtualDom_noJavaScriptUri(value) {
  return /^javascript:/i.test(value.replace(/\s/g, ""))
    ? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
    : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value) {
  return /^\s*(javascript:|data:text\/html)/i.test(value) ? "" : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value) {
  return /^\s*(javascript:|data:text\/html)/i.test(value)
    ? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
    : value;
}

// MAP FACTS

var _VirtualDom_mapAttribute = F2(function (func, attr) {
  return attr.$ === "a0"
    ? A2(_VirtualDom_on, attr.o, _VirtualDom_mapHandler(func, attr.p))
    : attr;
});

function _VirtualDom_mapHandler(func, handler) {
  var tag = $gren_lang$browser$VirtualDom$toHandlerInt(handler);

  // 0 = Normal
  // 1 = MayStopPropagation
  // 2 = MayPreventDefault
  // 3 = Custom

  var mappedDecoder;
  switch (tag) {
    case 0:
      A2($gren_lang$core$Json$Decode$map, func, handler.a);
      break;
    case 1:
      A3(
        $gren_lang$core$Json$Decode$map2,
        _VirtualDom_mapMayStopPropagation,
        $gren_lang$core$Json$Decode$succeed(func),
        handler.a
      );
      break;
    case 2:
      A3(
        $gren_lang$core$Json$Decode$map2,
        _VirtualDom_mapMayPreventDefault,
        $gren_lang$core$Json$Decode$succeed(func),
        handler.a
      );
      break;
    case 3:
      A3(
        $gren_lang$core$Json$Decode$map2,
        _VirtualDom_mapEventRecord,
        $gren_lang$core$Json$Decode$succeed(func),
        handler.a
      );
      break;
  }

  return {
    $: handler.$,
    a: mappedDecoder,
  };
}

var _VirtualDom_mapMayStopPropagation = F2(function (func, record) {
  return {
    message: func(record.message),
    stopPropagation: record.stopPropagation,
  };
});

var _VirtualDom_mapMayPreventDefault = F2(function (func, record) {
  return {
    message: func(record.message),
    preventDefault: record.preventDefault,
  };
});

var _VirtualDom_mapEventRecord = F2(function (func, record) {
  return {
    message: func(record.message),
    stopPropagation: record.stopPropagation,
    preventDefault: record.preventDefault,
  };
});

// ORGANIZE FACTS

function _VirtualDom_organizeFacts(factList) {
  for (var facts = {}, i = 0; i < factList.length; i++) {
    var entry = factList[i];

    var tag = entry.$;
    var key = entry.o;
    var value = entry.p;

    if (tag === "a2") {
      key === "className"
        ? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
        : (facts[key] = _Json_unwrap(value));

      continue;
    }

    var subFacts = facts[tag] || (facts[tag] = {});
    tag === "a3" && key === "class"
      ? _VirtualDom_addClass(subFacts, key, value)
      : (subFacts[key] = value);
  }

  return facts;
}

function _VirtualDom_addClass(object, key, newClass) {
  var classes = object[key];
  object[key] = classes ? classes + " " + newClass : newClass;
}

// RENDER

function _VirtualDom_render(vNode, eventNode) {
  var tag = vNode.$;

  if (tag === 5) {
    return _VirtualDom_render(
      vNode.k || (vNode.k = vNode.n()),
      eventNode
    );
  }

  if (tag === 0) {
    return _VirtualDom_doc.createTextNode(vNode.a);
  }

  if (tag === 4) {
    var subNode = vNode.k;
    var tagger = vNode.j;

    while (subNode.$ === 4) {
      typeof tagger !== "object"
        ? (tagger = [tagger, subNode.j])
        : tagger.push(subNode.j);

      subNode = subNode.k;
    }

    var subEventRoot = { j: tagger, q: eventNode };
    var domNode = _VirtualDom_render(subNode, subEventRoot);
    domNode.gren_event_node_ref = subEventRoot;
    return domNode;
  }

  if (tag === 3) {
    var domNode = vNode.h(vNode.g);
    _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
    return domNode;
  }

  // at this point `tag` must be 1 or 2

  var domNode = vNode.f
    ? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
    : _VirtualDom_doc.createElement(vNode.c);

  if (_VirtualDom_divertHrefToApp && vNode.c == "a") {
    domNode.addEventListener("click", _VirtualDom_divertHrefToApp(domNode));
  }

  _VirtualDom_applyFacts(domNode, eventNode, vNode.d);

  for (var kids = vNode.e, i = 0; i < kids.length; i++) {
    _VirtualDom_appendChild(
      domNode,
      _VirtualDom_render(
        tag === 1 ? kids[i] : kids[i].node,
        eventNode
      )
    );
  }

  return domNode;
}

// APPLY FACTS

function _VirtualDom_applyFacts(domNode, eventNode, facts) {
  for (var key in facts) {
    var value = facts[key];

    key === "a1"
      ? _VirtualDom_applyStyles(domNode, value)
      : key === "a0"
      ? _VirtualDom_applyEvents(domNode, eventNode, value)
      : key === "a3"
      ? _VirtualDom_applyAttrs(domNode, value)
      : key === "a4"
      ? _VirtualDom_applyAttrsNS(domNode, value)
      : ((key !== "value" && key !== "checked") || domNode[key] !== value) &&
        (domNode[key] = value);
  }
}

// APPLY STYLES

function _VirtualDom_applyStyles(domNode, styles) {
  var domNodeStyle = domNode.style;

  for (var key in styles) {
    domNodeStyle[key] = styles[key];
  }
}

// APPLY ATTRS

function _VirtualDom_applyAttrs(domNode, attrs) {
  for (var key in attrs) {
    var value = attrs[key];
    typeof value !== "undefined"
      ? domNode.setAttribute(key, value)
      : domNode.removeAttribute(key);
  }
}

// APPLY NAMESPACED ATTRS

function _VirtualDom_applyAttrsNS(domNode, nsAttrs) {
  for (var key in nsAttrs) {
    var pair = nsAttrs[key];
    var namespace = pair.f;
    var value = pair.p;

    typeof value !== "undefined"
      ? domNode.setAttributeNS(namespace, key, value)
      : domNode.removeAttributeNS(namespace, key);
  }
}

// APPLY EVENTS

function _VirtualDom_applyEvents(domNode, eventNode, events) {
  var allCallbacks = domNode.grenFs || (domNode.grenFs = {});

  for (var key in events) {
    var newHandler = events[key];
    var oldCallback = allCallbacks[key];

    if (!newHandler) {
      domNode.removeEventListener(key, oldCallback);
      allCallbacks[key] = undefined;
      continue;
    }

    if (oldCallback) {
      var oldHandler = oldCallback.r;
      if (oldHandler.$ === newHandler.$) {
        oldCallback.r = newHandler;
        continue;
      }
      domNode.removeEventListener(key, oldCallback);
    }

    oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
    domNode.addEventListener(
      key,
      oldCallback,
      _VirtualDom_passiveSupported && {
        passive: $gren_lang$browser$VirtualDom$toHandlerInt(newHandler) < 2,
      }
    );
    allCallbacks[key] = oldCallback;
  }
}

// PASSIVE EVENTS

var _VirtualDom_passiveSupported;

try {
  window.addEventListener(
    "t",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        _VirtualDom_passiveSupported = true;
      },
    })
  );
} catch (e) {}

// EVENT HANDLERS

function _VirtualDom_makeCallback(eventNode, initialHandler) {
  function callback(event) {
    var handler = callback.r;
    var result = _Json_runHelp(handler.a, event);

    if (!$gren_lang$core$Result$isOk(result)) {
      return;
    }

    var tag = $gren_lang$browser$VirtualDom$toHandlerInt(handler);

    // 0 = Normal
    // 1 = MayStopPropagation
    // 2 = MayPreventDefault
    // 3 = Custom

    var value = result.a;
    var message = !tag ? value : value.message;
    var stopPropagation =
      tag == 1 || tag == 3 ? value.stopPropagation : false;
    var currentEventNode =
      (stopPropagation && event.stopPropagation(),
      (tag == 2 || tag == 3 ? value.preventDefault : false) &&
        event.preventDefault(),
      eventNode);
    var tagger;
    var i;
    while ((tagger = currentEventNode.j)) {
      if (typeof tagger == "function") {
        message = tagger(message);
      } else {
        for (var i = tagger.length; i--; ) {
          message = tagger[i](message);
        }
      }
      currentEventNode = currentEventNode.q;
    }
    currentEventNode(message, stopPropagation); // stopPropagation implies isSync
  }

  callback.r = initialHandler;

  return callback;
}

function _VirtualDom_equalEvents(x, y) {
  return x.$ == y.$ && _Json_equality(x.a, y.a);
}

// DIFF

// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y) {
  var patches = [];
  _VirtualDom_diffHelp(x, y, patches, 0);
  return patches;
}

function _VirtualDom_pushPatch(patches, type, index, data) {
  var patch = {
    $: type,
    s: index,
    t: data,
    u: undefined,
    v: undefined,
  };
  patches.push(patch);
  return patch;
}

function _VirtualDom_diffHelp(x, y, patches, index) {
  if (x === y) {
    return;
  }

  var xType = x.$;
  var yType = y.$;

  // Bail if you run into different types of nodes. Implies that the
  // structure has changed significantly and it's not worth a diff.
  if (xType !== yType) {
    if (xType === 1 && yType === 2) {
      y = _VirtualDom_dekey(y);
      yType = 1;
    } else {
      _VirtualDom_pushPatch(patches, 0, index, y);
      return;
    }
  }

  // Now we know that both nodes are the same $.
  switch (yType) {
    case 5:
      var xArgs = x.m;
      var yArgs = y.m;
      var i = xArgs.length;
      var same = i === yArgs.length && x.l === y.l;
      while (same && i--) {
        same = _Utils_eq(xArgs[i], yArgs[i]);
      }
      if (same) {
        y.k = x.k;
        return;
      }
      y.k = y.n();
      var subPatches = [];
      _VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
      subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
      return;

    case 4:
      // gather nested taggers
      var xTaggers = x.j;
      var yTaggers = y.j;
      var nesting = false;

      var xSubNode = x.k;
      while (xSubNode.$ === 4) {
        nesting = true;

        typeof xTaggers !== "object"
          ? (xTaggers = [xTaggers, xSubNode.j])
          : xTaggers.push(xSubNode.j);

        xSubNode = xSubNode.k;
      }

      var ySubNode = y.k;
      while (ySubNode.$ === 4) {
        nesting = true;

        typeof yTaggers !== "object"
          ? (yTaggers = [yTaggers, ySubNode.j])
          : yTaggers.push(ySubNode.j);

        ySubNode = ySubNode.k;
      }

      // Just bail if different numbers of taggers. This implies the
      // structure of the virtual DOM has changed.
      if (nesting && xTaggers.length !== yTaggers.length) {
        _VirtualDom_pushPatch(patches, 0, index, y);
        return;
      }

      // check if taggers are "the same"
      if (
        nesting
          ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers)
          : xTaggers !== yTaggers
      ) {
        _VirtualDom_pushPatch(patches, 2, index, yTaggers);
      }

      // diff everything below the taggers
      _VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
      return;

    case 0:
      if (x.a !== y.a) {
        _VirtualDom_pushPatch(patches, 3, index, y.a);
      }
      return;

    case 1:
      _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
      return;

    case 2:
      _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
      return;

    case 3:
      if (x.h !== y.h) {
        _VirtualDom_pushPatch(patches, 0, index, y);
        return;
      }

      var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
      factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

      var patch = y.i(x.g, y.g);
      patch && _VirtualDom_pushPatch(patches, 5, index, patch);

      return;
  }
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs) {
  for (var i = 0; i < as.length; i++) {
    if (as[i] !== bs[i]) {
      return false;
    }
  }

  return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids) {
  // Bail if obvious indicators have changed. Implies more serious
  // structural changes such that it's not worth it to diff.
  if (x.c !== y.c || x.f !== y.f) {
    _VirtualDom_pushPatch(patches, 0, index, y);
    return;
  }

  var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
  factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

  diffKids(x, y, patches, index);
}

// DIFF FACTS

// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category) {
  var diff;

  // look for changes and removals
  for (var xKey in x) {
    if (
      xKey === "a1" ||
      xKey === "a0" ||
      xKey === "a3" ||
      xKey === "a4"
    ) {
      var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
      if (subDiff) {
        diff = diff || {};
        diff[xKey] = subDiff;
      }
      continue;
    }

    // remove if not in the new facts
    if (!(xKey in y)) {
      diff = diff || {};
      diff[xKey] = !category
        ? typeof x[xKey] === "string"
          ? ""
          : null
        : category === "a1"
        ? ""
        : category === "a0" || category === "a3"
        ? undefined
        : { f: x[xKey].f, p: undefined };

      continue;
    }

    var xValue = x[xKey];
    var yValue = y[xKey];

    // reference equal, so don't worry about it
    if (
      (xValue === yValue && xKey !== "value" && xKey !== "checked") ||
      (category === "a0" && _VirtualDom_equalEvents(xValue, yValue))
    ) {
      continue;
    }

    diff = diff || {};
    diff[xKey] = yValue;
  }

  // add new stuff
  for (var yKey in y) {
    if (!(yKey in x)) {
      diff = diff || {};
      diff[yKey] = y[yKey];
    }
  }

  return diff;
}

// DIFF KIDS

function _VirtualDom_diffKids(xParent, yParent, patches, index) {
  var xKids = xParent.e;
  var yKids = yParent.e;

  var xLen = xKids.length;
  var yLen = yKids.length;

  // FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

  if (xLen > yLen) {
    _VirtualDom_pushPatch(patches, 6, index, {
      w: yLen,
      i: xLen - yLen,
    });
  } else if (xLen < yLen) {
    _VirtualDom_pushPatch(patches, 7, index, {
      w: xLen,
      e: yKids,
    });
  }

  // PAIRWISE DIFF EVERYTHING ELSE

  for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++) {
    var xKid = xKids[i];
    _VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
    index += xKid.b || 0;
  }
}

// KEYED DIFF

function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex) {
  var localPatches = [];

  var changes = {}; // Dict String Entry
  var inserts = []; // Array { index : Int, entry : Entry }
  // type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

  var xKids = xParent.e;
  var yKids = yParent.e;
  var xLen = xKids.length;
  var yLen = yKids.length;
  var xIndex = 0;
  var yIndex = 0;

  var index = rootIndex;

  while (xIndex < xLen && yIndex < yLen) {
    var x = xKids[xIndex];
    var y = yKids[yIndex];

    var xKey = x.key;
    var yKey = y.key;
    var xNode = x.node;
    var yNode = y.node;

    var newMatch = undefined;
    var oldMatch = undefined;

    // check if keys match

    if (xKey === yKey) {
      index++;
      _VirtualDom_diffHelp(xNode, yNode, localPatches, index);
      index += xNode.b || 0;

      xIndex++;
      yIndex++;
      continue;
    }

    // look ahead 1 to detect insertions and removals.

    var xNext = xKids[xIndex + 1];
    var yNext = yKids[yIndex + 1];

    if (xNext) {
      var xNextKey = xNext.key;
      var xNextNode = xNext.key;
      oldMatch = yKey === xNextKey;
    }

    if (yNext) {
      var yNextKey = yNext.key;
      var yNextNode = yNext.key;
      newMatch = xKey === yNextKey;
    }

    // swap x and y
    if (newMatch && oldMatch) {
      index++;
      _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
      _VirtualDom_insertNode(
        changes,
        localPatches,
        xKey,
        yNode,
        yIndex,
        inserts
      );
      index += xNode.b || 0;

      index++;
      _VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
      index += xNextNode.b || 0;

      xIndex += 2;
      yIndex += 2;
      continue;
    }

    // insert y
    if (newMatch) {
      index++;
      _VirtualDom_insertNode(
        changes,
        localPatches,
        yKey,
        yNode,
        yIndex,
        inserts
      );
      _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
      index += xNode.b || 0;

      xIndex += 1;
      yIndex += 2;
      continue;
    }

    // remove x
    if (oldMatch) {
      index++;
      _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
      index += xNode.b || 0;

      index++;
      _VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
      index += xNextNode.b || 0;

      xIndex += 2;
      yIndex += 1;
      continue;
    }

    // remove x, insert y
    if (xNext && xNextKey === yNextKey) {
      index++;
      _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
      _VirtualDom_insertNode(
        changes,
        localPatches,
        yKey,
        yNode,
        yIndex,
        inserts
      );
      index += xNode.b || 0;

      index++;
      _VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
      index += xNextNode.b || 0;

      xIndex += 2;
      yIndex += 2;
      continue;
    }

    break;
  }

  // eat up any remaining nodes with removeNode and insertNode

  while (xIndex < xLen) {
    index++;
    var x = xKids[xIndex];
    var xNode = x.node;
    _VirtualDom_removeNode(changes, localPatches, x.key, xNode, index);
    index += xNode.b || 0;
    xIndex++;
  }

  while (yIndex < yLen) {
    var endInserts = endInserts || [];
    var y = yKids[yIndex];
    _VirtualDom_insertNode(
      changes,
      localPatches,
      y.key,
      y.node,
      undefined,
      endInserts
    );
    yIndex++;
  }

  if (localPatches.length > 0 || inserts.length > 0 || endInserts) {
    _VirtualDom_pushPatch(patches, 8, rootIndex, {
      x: localPatches,
      y: inserts,
      z: endInserts,
    });
  }
}

// CHANGES FROM KEYED DIFF

var _VirtualDom_POSTFIX = "_grenW6BL";

function _VirtualDom_insertNode(
  changes,
  localPatches,
  key,
  vnode,
  yIndex,
  inserts
) {
  var entry = changes[key];

  // never seen this key before
  if (!entry) {
    entry = {
      c: 0,
      A: vnode,
      s: yIndex,
      t: undefined,
    };

    inserts.push({ s: yIndex, B: entry });
    changes[key] = entry;

    return;
  }

  // this key was removed earlier, a match!
  if (entry.c === 1) {
    inserts.push({ s: yIndex, B: entry });

    entry.c = 2;
    var subPatches = [];
    _VirtualDom_diffHelp(entry.A, vnode, subPatches, entry.s);
    entry.s = yIndex;
    entry.t.t = {
      x: subPatches,
      B: entry,
    };

    return;
  }

  // this key has already been inserted or moved, a duplicate!
  _VirtualDom_insertNode(
    changes,
    localPatches,
    key + _VirtualDom_POSTFIX,
    vnode,
    yIndex,
    inserts
  );
}

function _VirtualDom_removeNode(changes, localPatches, key, vnode, index) {
  var entry = changes[key];

  // never seen this key before
  if (!entry) {
    var patch = _VirtualDom_pushPatch(
      localPatches,
      9,
      index,
      undefined
    );

    changes[key] = {
      c: 1,
      A: vnode,
      s: index,
      t: patch,
    };

    return;
  }

  // this key was inserted earlier, a match!
  if (entry.c === 0) {
    entry.c = 2;
    var subPatches = [];
    _VirtualDom_diffHelp(vnode, entry.A, subPatches, index);

    _VirtualDom_pushPatch(localPatches, 9, index, {
      x: subPatches,
      B: entry,
    });

    return;
  }

  // this key has already been removed or moved, a duplicate!
  _VirtualDom_removeNode(
    changes,
    localPatches,
    key + _VirtualDom_POSTFIX,
    vnode,
    index
  );
}

// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.

function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode) {
  _VirtualDom_addDomNodesHelp(
    domNode,
    vNode,
    patches,
    0,
    0,
    vNode.b,
    eventNode
  );
}

// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(
  domNode,
  vNode,
  patches,
  i,
  low,
  high,
  eventNode
) {
  var patch = patches[i];
  var index = patch.s;

  while (index === low) {
    var patchType = patch.$;

    if (patchType === 1) {
      _VirtualDom_addDomNodes(domNode, vNode.k, patch.t, eventNode);
    } else if (patchType === 8) {
      patch.u = domNode;
      patch.v = eventNode;

      var subPatches = patch.t.x;
      if (subPatches.length > 0) {
        _VirtualDom_addDomNodesHelp(
          domNode,
          vNode,
          subPatches,
          0,
          low,
          high,
          eventNode
        );
      }
    } else if (patchType === 9) {
      patch.u = domNode;
      patch.v = eventNode;

      var data = patch.t;
      if (data) {
        data.B.t = domNode;
        var subPatches = data.x;
        if (subPatches.length > 0) {
          _VirtualDom_addDomNodesHelp(
            domNode,
            vNode,
            subPatches,
            0,
            low,
            high,
            eventNode
          );
        }
      }
    } else {
      patch.u = domNode;
      patch.v = eventNode;
    }

    i++;

    if (!(patch = patches[i]) || (index = patch.s) > high) {
      return i;
    }
  }

  var tag = vNode.$;

  if (tag === 4) {
    var subNode = vNode.k;

    while (subNode.$ === 4) {
      subNode = subNode.k;
    }

    return _VirtualDom_addDomNodesHelp(
      domNode,
      subNode,
      patches,
      i,
      low + 1,
      high,
      domNode.gren_event_node_ref
    );
  }

  // tag must be 1 or 2 at this point

  var vKids = vNode.e;
  var childNodes = domNode.childNodes;
  for (var j = 0; j < vKids.length; j++) {
    low++;
    var vKid = tag === 1 ? vKids[j] : vKids[j].node;
    var nextLow = low + (vKid.b || 0);
    if (low <= index && index <= nextLow) {
      i = _VirtualDom_addDomNodesHelp(
        childNodes[j],
        vKid,
        patches,
        i,
        low,
        nextLow,
        eventNode
      );
      if (!(patch = patches[i]) || (index = patch.s) > high) {
        return i;
      }
    }
    low = nextLow;
  }
  return i;
}

// APPLY PATCHES

function _VirtualDom_applyPatches(
  rootDomNode,
  oldVirtualNode,
  patches,
  eventNode
) {
  if (patches.length === 0) {
    return rootDomNode;
  }

  _VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
  return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches) {
  for (var i = 0; i < patches.length; i++) {
    var patch = patches[i];
    var localDomNode = patch.u;
    var newNode = _VirtualDom_applyPatch(localDomNode, patch);
    if (localDomNode === rootDomNode) {
      rootDomNode = newNode;
    }
  }
  return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch) {
  switch (patch.$) {
    case 0:
      return _VirtualDom_applyPatchRedraw(
        domNode,
        patch.t,
        patch.v
      );

    case 4:
      _VirtualDom_applyFacts(domNode, patch.v, patch.t);
      return domNode;

    case 3:
      domNode.replaceData(0, domNode.length, patch.t);
      return domNode;

    case 1:
      return _VirtualDom_applyPatchesHelp(domNode, patch.t);

    case 2:
      if (domNode.gren_event_node_ref) {
        domNode.gren_event_node_ref.j = patch.t;
      } else {
        domNode.gren_event_node_ref = {
          j: patch.t,
          q: patch.v,
        };
      }
      return domNode;

    case 6:
      var data = patch.t;
      for (var i = 0; i < data.i; i++) {
        domNode.removeChild(domNode.childNodes[data.w]);
      }
      return domNode;

    case 7:
      var data = patch.t;
      var kids = data.e;
      var i = data.w;
      var theEnd = domNode.childNodes[i];
      for (; i < kids.length; i++) {
        domNode.insertBefore(
          _VirtualDom_render(kids[i], patch.v),
          theEnd
        );
      }
      return domNode;

    case 9:
      var data = patch.t;
      if (!data) {
        domNode.parentNode.removeChild(domNode);
        return domNode;
      }
      var entry = data.B;
      if (typeof entry.s !== "undefined") {
        domNode.parentNode.removeChild(domNode);
      }
      entry.t = _VirtualDom_applyPatchesHelp(domNode, data.x);
      return domNode;

    case 8:
      return _VirtualDom_applyPatchReorder(domNode, patch);

    case 5:
      return patch.t(domNode);

    default:
      _Debug_crash(10); // 'Ran into an unknown patch!'
  }
}

function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode) {
  var parentNode = domNode.parentNode;
  var newNode = _VirtualDom_render(vNode, eventNode);

  if (!newNode.gren_event_node_ref) {
    newNode.gren_event_node_ref = domNode.gren_event_node_ref;
  }

  if (parentNode && newNode !== domNode) {
    parentNode.replaceChild(newNode, domNode);
  }
  return newNode;
}

function _VirtualDom_applyPatchReorder(domNode, patch) {
  var data = patch.t;

  // remove end inserts
  var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(
    data.z,
    patch
  );

  // removals
  domNode = _VirtualDom_applyPatchesHelp(domNode, data.x);

  // inserts
  var inserts = data.y;
  for (var i = 0; i < inserts.length; i++) {
    var insert = inserts[i];
    var entry = insert.B;
    var node =
      entry.c === 2
        ? entry.t
        : _VirtualDom_render(entry.A, patch.v);
    domNode.insertBefore(node, domNode.childNodes[insert.s]);
  }

  // add end inserts
  if (frag) {
    _VirtualDom_appendChild(domNode, frag);
  }

  return domNode;
}

function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch) {
  if (!endInserts) {
    return;
  }

  var frag = _VirtualDom_doc.createDocumentFragment();
  for (var i = 0; i < endInserts.length; i++) {
    var insert = endInserts[i];
    var entry = insert.B;
    _VirtualDom_appendChild(
      frag,
      entry.c === 2
        ? entry.t
        : _VirtualDom_render(entry.A, patch.v)
    );
  }
  return frag;
}

function _VirtualDom_virtualize(node) {
  // TEXT NODES

  if (node.nodeType === 3) {
    return _VirtualDom_text(node.textContent);
  }

  // WEIRD NODES

  if (node.nodeType !== 1) {
    return _VirtualDom_text("");
  }

  // ELEMENT NODES

  var attrs = node.attributes;
  var attrList = new Array(attrs.length);

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var name = attr.name;
    var value = attr.value;
    attrList[i] = A2(_VirtualDom_attribute, name, value);
  }

  var tag = node.tagName.toLowerCase();
  var kids = node.childNodes;
  var kidList = new Array(kids.length);

  for (var i = 0; i < kids.length; i++) {
    kidList[i] = _VirtualDom_virtualize(kids[i]);
  }

  return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode) {
  var keyedKids = keyedNode.e;
  var len = keyedKids.length;
  var kids = new Array(len);

  for (var i = 0; i < len; i++) {
    kids[i] = keyedKids[i].b;
  }

  return {
    $: 1,
    c: keyedNode.c,
    d: keyedNode.d,
    e: kids,
    f: keyedNode.f,
    b: keyedNode.b,
  };
}


// MATH

var _Math_remainderBy = F2(function (b, a) {
  return a % b;
});

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Math_modBy = F2(function (modulus, x) {
  var answer = x % modulus;
  return modulus === 0
    ? _Debug_crash(11)
    : (answer > 0 && modulus < 0) || (answer < 0 && modulus > 0)
    ? answer + modulus
    : answer;
});

// TRIGONOMETRY

var _Math_pi = Math.PI;
var _Math_e = Math.E;
var _Math_cos = Math.cos;
var _Math_sin = Math.sin;
var _Math_tan = Math.tan;
var _Math_acos = Math.acos;
var _Math_asin = Math.asin;
var _Math_atan = Math.atan;
var _Math_atan2 = F2(Math.atan2);

// MORE MATH

function _Math_truncate(n) {
  return n | 0;
}

var _Math_ceiling = Math.ceil;
var _Math_floor = Math.floor;
var _Math_round = Math.round;
var _Math_sqrt = Math.sqrt;
var _Math_log = Math.log;


// HELPERS

function _Debugger_unsafeCoerce(value) {
  return value;
}

// PROGRAMS

var _Debugger_element = F4(function (impl, flagDecoder, debugMetadata, args) {
  return _Platform_initialize(
    flagDecoder,
    args,
    A3(
      $gren_lang$browser$Debugger$Main$wrapInit,
      _Json_wrap(debugMetadata),
      _Debugger_popout(),
      impl.init
    ),
    $gren_lang$browser$Debugger$Main$wrapUpdate(impl.update),
    $gren_lang$browser$Debugger$Main$wrapSubs(impl.subscriptions),
    function (sendToApp, initialModel) {
      var view = impl.view;
      var title = _VirtualDom_doc.title;
      var domNode = args && args["node"] ? args["node"] : _Debug_crash(0);
      var currNode = _VirtualDom_virtualize(domNode);
      var currBlocker = $gren_lang$browser$Debugger$Main$toBlockerType(initialModel);
      var currPopout;

      var cornerNode = _VirtualDom_doc.createElement("div");
      domNode.parentNode.insertBefore(cornerNode, domNode.nextSibling);
      var cornerCurr = _VirtualDom_virtualize(cornerNode);

      initialModel.popout.a = sendToApp;

      return _Browser_makeAnimator(initialModel, function (model) {
        var nextNode = A2(
          _VirtualDom_map,
          $gren_lang$browser$Debugger$Main$UserMsg,
          view($gren_lang$browser$Debugger$Main$getUserModel(model))
        );
        var patches = _VirtualDom_diff(currNode, nextNode);
        domNode = _VirtualDom_applyPatches(
          domNode,
          currNode,
          patches,
          sendToApp
        );
        currNode = nextNode;

        // update blocker

        var nextBlocker = $gren_lang$browser$Debugger$Main$toBlockerType(model);
        _Debugger_updateBlocker(currBlocker, nextBlocker);
        currBlocker = nextBlocker;

        // view corner

        var cornerNext = $gren_lang$browser$Debugger$Main$cornerView(model);
        var cornerPatches = _VirtualDom_diff(cornerCurr, cornerNext);
        cornerNode = _VirtualDom_applyPatches(
          cornerNode,
          cornerCurr,
          cornerPatches,
          sendToApp
        );
        cornerCurr = cornerNext;

        if (!model.popout.b) {
          currPopout = undefined;
          return;
        }

        // view popout

        _VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
        currPopout ||
          (currPopout = _VirtualDom_virtualize(model.popout.b));
        var nextPopout = $gren_lang$browser$Debugger$Main$popoutView(model);
        var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
        _VirtualDom_applyPatches(
          model.popout.b.body,
          currPopout,
          popoutPatches,
          sendToApp
        );
        currPopout = nextPopout;
        _VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
      });
    }
  );
});

var _Debugger_document = F4(function (impl, flagDecoder, debugMetadata, args) {
  return _Platform_initialize(
    flagDecoder,
    args,
    A3(
      $gren_lang$browser$Debugger$Main$wrapInit,
      _Json_wrap(debugMetadata),
      _Debugger_popout(),
      impl.init
    ),
    $gren_lang$browser$Debugger$Main$wrapUpdate(impl.update),
    $gren_lang$browser$Debugger$Main$wrapSubs(impl.subscriptions),
    function (sendToApp, initialModel) {
      var divertHrefToApp =
        impl.setup &&
        impl.setup(function (x) {
          return sendToApp($gren_lang$browser$Debugger$Main$UserMsg(x));
        });
      var view = impl.view;
      var title = _VirtualDom_doc.title;
      var bodyNode = _VirtualDom_doc.body;
      var currNode = _VirtualDom_virtualize(bodyNode);
      var currBlocker = $gren_lang$browser$Debugger$Main$toBlockerType(initialModel);
      var currPopout;

      initialModel.popout.a = sendToApp;

      return _Browser_makeAnimator(initialModel, function (model) {
        _VirtualDom_divertHrefToApp = divertHrefToApp;
        var doc = view($gren_lang$browser$Debugger$Main$getUserModel(model));
        var nextNode = _VirtualDom_node("body")([])(
          _Utils_ap(
            A2($gren_lang$core$Array$map, _VirtualDom_map($gren_lang$browser$Debugger$Main$UserMsg), doc.body),
            [$gren_lang$browser$Debugger$Main$cornerView(model)]
          )
        );
        var patches = _VirtualDom_diff(currNode, nextNode);
        bodyNode = _VirtualDom_applyPatches(
          bodyNode,
          currNode,
          patches,
          sendToApp
        );
        currNode = nextNode;
        _VirtualDom_divertHrefToApp = 0;
        title !== doc.title &&
          (_VirtualDom_doc.title = title = doc.title);

        // update blocker

        var nextBlocker = $gren_lang$browser$Debugger$Main$toBlockerType(model);
        _Debugger_updateBlocker(currBlocker, nextBlocker);
        currBlocker = nextBlocker;

        // view popout

        if (!model.popout.b) {
          currPopout = undefined;
          return;
        }

        _VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
        currPopout ||
          (currPopout = _VirtualDom_virtualize(model.popout.b));
        var nextPopout = $gren_lang$browser$Debugger$Main$popoutView(model);
        var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
        _VirtualDom_applyPatches(
          model.popout.b.body,
          currPopout,
          popoutPatches,
          sendToApp
        );
        currPopout = nextPopout;
        _VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
      });
    }
  );
});

function _Debugger_popout() {
  return {
    b: undefined,
    a: undefined,
  };
}

function _Debugger_isOpen(popout) {
  return !!popout.b;
}

function _Debugger_open(popout) {
  return _Scheduler_binding(function (callback) {
    _Debugger_openWindow(popout);
    callback(_Scheduler_succeed({}));
  });
}

function _Debugger_openWindow(popout) {
  var w = $gren_lang$browser$Debugger$Main$initialWindowWidth,
    h = $gren_lang$browser$Debugger$Main$initialWindowHeight,
    x = screen.width - w,
    y = screen.height - h;

  var debuggerWindow = window.open(
    "",
    "",
    "width=" + w + ",height=" + h + ",left=" + x + ",top=" + y
  );
  var doc = debuggerWindow.document;
  doc.title = "Gren Debugger";

  // handle arrow keys
  doc.addEventListener("keydown", function (event) {
    event.metaKey && event.which === 82 && window.location.reload();
    event.key === "ArrowUp" &&
      (popout.a($gren_lang$browser$Debugger$Main$Up), event.preventDefault());
    event.key === "ArrowDown" &&
      (popout.a($gren_lang$browser$Debugger$Main$Down), event.preventDefault());
  });

  // handle window close
  window.addEventListener("unload", close);
  debuggerWindow.addEventListener("unload", function () {
    popout.b = undefined;
    popout.a($gren_lang$browser$Debugger$Main$NoOp);
    window.removeEventListener("unload", close);
  });

  function close() {
    popout.b = undefined;
    popout.a($gren_lang$browser$Debugger$Main$NoOp);
    debuggerWindow.close();
  }

  // register new window
  popout.b = doc;
}

// SCROLL

function _Debugger_scroll(popout) {
  return _Scheduler_binding(function (callback) {
    if (popout.b) {
      var msgs = popout.b.getElementById("gren-debugger-sidebar");
      if (msgs && msgs.scrollTop !== 0) {
        msgs.scrollTop = 0;
      }
    }
    callback(_Scheduler_succeed({}));
  });
}

var _Debugger_scrollTo = F2(function (id, popout) {
  return _Scheduler_binding(function (callback) {
    if (popout.b) {
      var msg = popout.b.getElementById(id);
      if (msg) {
        msg.scrollIntoView(false);
      }
    }
    callback(_Scheduler_succeed({}));
  });
});

// UPLOAD

function _Debugger_upload(popout) {
  return _Scheduler_binding(function (callback) {
    var doc = popout.b || document;
    var element = doc.createElement("input");
    element.setAttribute("type", "file");
    element.setAttribute("accept", "text/json");
    element.style.display = "none";
    element.addEventListener("change", function (event) {
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        callback(_Scheduler_succeed(e.target.result));
      };
      fileReader.readAsText(event.target.files[0]);
      doc.body.removeChild(element);
    });
    doc.body.appendChild(element);
    element.click();
  });
}

// DOWNLOAD

var _Debugger_download = F2(function (historyLength, json) {
  return _Scheduler_binding(function (callback) {
    var fileName = "history-" + historyLength + ".txt";
    var jsonString = JSON.stringify(json);
    var mime = "text/plain;charset=utf-8";
    var done = _Scheduler_succeed({});

    // for IE10+
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(new Blob([jsonString], { type: mime }), fileName);
      return callback(done);
    }

    // for HTML5
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:" + mime + "," + encodeURIComponent(jsonString)
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    callback(done);
  });
});

// POPOUT CONTENT

function _Debugger_messageToString(value) {
  if (typeof value === "boolean") {
    return value ? "True" : "False";
  }

  if (typeof value === "number") {
    return value + "";
  }

  if (typeof value === "string") {
    return '"' + _Debugger_addSlashes(value, false) + '"';
  }

  if (value instanceof String) {
    return "'" + _Debugger_addSlashes(value, true) + "'";
  }

  if (typeof value !== "object" || value === null || !("$" in value)) {
    return "…";
  }

  if (typeof value.$ === "number") {
    return "…";
  }

  var code = value.$.charCodeAt(0);
  if (code === 0x23 /* # */ || /* a */ (0x61 <= code && code <= 0x7a) /* z */) {
    return "…";
  }

  if (
    [
      "Array_gren_builtin",
      "Set_gren_builtin",
      "RBNode_gren_builtin",
      "RBEmpty_gren_builtin",
    ].indexOf(value.$) >= 0
  ) {
    return "…";
  }

  var keys = Object.keys(value);
  switch (keys.length) {
    case 1:
      return value.$;
    case 2:
      return value.$ + " " + _Debugger_messageToString(value.a);
    default:
      return (
        value.$ +
        " … " +
        _Debugger_messageToString(value[keys[keys.length - 1]])
      );
  }
}

function _Debugger_init(value) {
  if (typeof value === "boolean") {
    return A3(
      $gren_lang$browser$Debugger$Expando$Constructor,
      $gren_lang$core$Maybe$Just(value ? "True" : "False"),
      true,
      []
    );
  }

  if (typeof value === "number") {
    return $gren_lang$browser$Debugger$Expando$Primitive(value + "");
  }

  if (typeof value === "string") {
    return $gren_lang$browser$Debugger$Expando$S('"' + _Debugger_addSlashes(value, false) + '"');
  }

  if (value instanceof String) {
    return $gren_lang$browser$Debugger$Expando$S("'" + _Debugger_addSlashes(value, true) + "'");
  }

  if (typeof value === "object" && "$" in value) {
    var tag = value.$;

    if (tag === "::" || tag === "[]") {
      return A3(
        $gren_lang$browser$Debugger$Expando$Sequence,
        $gren_lang$browser$Debugger$Expando$ArraySeq,
        true,
        A2($gren_lang$core$Array$map, _Debugger_init, value)
      );
    }

    if (tag === "Set_gren_builtin") {
      return A3(
        $gren_lang$browser$Debugger$Expando$Sequence,
        $gren_lang$browser$Debugger$Expando$SetSeq,
        true,
        A3($gren_lang$core$Set$foldr, _Debugger_initCons, [], value)
      );
    }

    if (tag === "RBNode_gren_builtin" || tag == "RBEmpty_gren_builtin") {
      return A2(
        $gren_lang$browser$Debugger$Expando$Dictionary,
        true,
        A3($gren_lang$core$Dict$foldr, _Debugger_initKeyValueCons, [], value)
      );
    }

    if (typeof tag === "number") {
      return $gren_lang$browser$Debugger$Expando$Primitive("<internals>");
    }

    var char = tag.charCodeAt(0);
    if (char === 35 || (65 <= char && char <= 90)) {
      var list = [];
      for (var i in value) {
        if (i === "$") continue;
        list = [_Debugger_init(value[i])].concat(list);
      }
      return A3(
        $gren_lang$browser$Debugger$Expando$Constructor,
        char === 35 ? $gren_lang$core$Maybe$Nothing : $gren_lang$core$Maybe$Just(tag),
        true,
        $gren_lang$core$Array$reverse(list)
      );
    }

    return $gren_lang$browser$Debugger$Expando$Primitive("<internals>");
  }

  if (typeof value === "object") {
    var dict = $gren_lang$core$Dict$empty;
    for (var i in value) {
      dict = A3($gren_lang$core$Dict$insert, i, _Debugger_init(value[i]), dict);
    }
    return A2($gren_lang$browser$Debugger$Expando$Record, true, dict);
  }

  return $gren_lang$browser$Debugger$Expando$Primitive("<internals>");
}

var _Debugger_initCons = F2(function initConsHelp(value, list) {
  return [_Debugger_init(value)].concat(list);
});

var _Debugger_initKeyValueCons = F3(function (key, value, list) {
  return [
    { key: _Debugger_init(key), value: _Debugger_init(value) },
  ].concat(list);
});

function _Debugger_addSlashes(str, isChar) {
  var s = str
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\r/g, "\\r")
    .replace(/\v/g, "\\v")
    .replace(/\0/g, "\\0");
  if (isChar) {
    return s.replace(/\'/g, "\\'");
  } else {
    return s.replace(/\"/g, '\\"');
  }
}

// BLOCK EVENTS

function _Debugger_updateBlocker(oldBlocker, newBlocker) {
  if (oldBlocker === newBlocker) return;

  var oldEvents = _Debugger_blockerToEvents(oldBlocker);
  var newEvents = _Debugger_blockerToEvents(newBlocker);

  // remove old blockers
  for (var i = 0; i < oldEvents.length; i++) {
    document.removeEventListener(oldEvents[i], _Debugger_blocker, true);
  }

  // add new blockers
  for (var i = 0; i < newEvents.length; i++) {
    document.addEventListener(newEvents[i], _Debugger_blocker, true);
  }
}

function _Debugger_blocker(event) {
  if (event.type === "keydown" && event.metaKey && event.which === 82) {
    return;
  }

  var isScroll = event.type === "scroll" || event.type === "wheel";
  for (var node = event.target; node; node = node.parentNode) {
    if (
      isScroll
        ? node.id === "gren-debugger-details"
        : node.id === "gren-debugger-overlay"
    ) {
      return;
    }
  }

  event.stopPropagation();
  event.preventDefault();
}

function _Debugger_blockerToEvents(blocker) {
  return blocker === $gren_lang$browser$Debugger$Overlay$BlockNone
    ? []
    : blocker === $gren_lang$browser$Debugger$Overlay$BlockMost
    ? _Debugger_mostEvents
    : _Debugger_allEvents;
}

var _Debugger_mostEvents = [
  "click",
  "dblclick",
  "mousemove",
  "mouseup",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "touchstart",
  "touchend",
  "touchcancel",
  "touchmove",
  "pointerdown",
  "pointerup",
  "pointerover",
  "pointerout",
  "pointerenter",
  "pointerleave",
  "pointermove",
  "pointercancel",
  "dragstart",
  "drag",
  "dragend",
  "dragenter",
  "dragover",
  "dragleave",
  "drop",
  "keyup",
  "keydown",
  "keypress",
  "input",
  "change",
  "focus",
  "blur",
];

var _Debugger_allEvents = _Debugger_mostEvents.concat("wheel", "scroll");


// ELEMENT

var _Debugger_element;

var _Browser_element =
  _Debugger_element ||
  F4(function (impl, flagDecoder, debugMetadata, args) {
    return _Platform_initialize(
      flagDecoder,
      args,
      impl.init,
      impl.update,
      impl.subscriptions,
      function (sendToApp, initialModel) {
        var view = impl.view;
        /**_UNUSED/
			var domNode = args['node'];
			//*/
        /**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
        var currNode = _VirtualDom_virtualize(domNode);

        return _Browser_makeAnimator(initialModel, function (model) {
          var nextNode = view(model);
          var patches = _VirtualDom_diff(currNode, nextNode);
          domNode = _VirtualDom_applyPatches(
            domNode,
            currNode,
            patches,
            sendToApp
          );
          currNode = nextNode;
        });
      }
    );
  });

// DOCUMENT

var _Debugger_document;

var _Browser_document =
  _Debugger_document ||
  F4(function (impl, flagDecoder, debugMetadata, args) {
    return _Platform_initialize(
      flagDecoder,
      args,
      impl.init,
      impl.update,
      impl.subscriptions,
      function (sendToApp, initialModel) {
        var divertHrefToApp = impl.setup && impl.setup(sendToApp);
        var view = impl.view;
        var title = _VirtualDom_doc.title;
        var bodyNode = _VirtualDom_doc.body;
        var currNode = _VirtualDom_virtualize(bodyNode);
        return _Browser_makeAnimator(initialModel, function (model) {
          _VirtualDom_divertHrefToApp = divertHrefToApp;
          var doc = view(model);
          var nextNode = _VirtualDom_node("body")([])(doc.body);
          var patches = _VirtualDom_diff(currNode, nextNode);
          bodyNode = _VirtualDom_applyPatches(
            bodyNode,
            currNode,
            patches,
            sendToApp
          );
          currNode = nextNode;
          _VirtualDom_divertHrefToApp = 0;
          title !== doc.title &&
            (_VirtualDom_doc.title = title = doc.title);
        });
      }
    );
  });

// ANIMATION

var _Browser_cancelAnimationFrame =
  typeof cancelAnimationFrame !== "undefined"
    ? cancelAnimationFrame
    : function (id) {
        clearTimeout(id);
      };

var _Browser_requestAnimationFrame =
  typeof requestAnimationFrame !== "undefined"
    ? requestAnimationFrame
    : function (callback) {
        return setTimeout(callback, 1000 / 60);
      };

function _Browser_makeAnimator(model, draw) {
  draw(model);

  var state = 0;

  function updateIfNeeded() {
    state =
      state === 1
        ? 0
        : (_Browser_requestAnimationFrame(updateIfNeeded),
          draw(model),
          1);
  }

  return function (nextModel, isSync) {
    model = nextModel;

    isSync
      ? (draw(model),
        state === 2 && (state = 1))
      : (state === 0 &&
          _Browser_requestAnimationFrame(updateIfNeeded),
        (state = 2));
  };
}

// APPLICATION

function _Browser_application(impl) {
  var onUrlChange = impl.onUrlChange;
  var onUrlRequest = impl.onUrlRequest;
  var key = function () {
    key.a(onUrlChange(_Browser_getUrl()));
  };

  return _Browser_document({
    setup: function (sendToApp) {
      key.a = sendToApp;
      _Browser_window.addEventListener("popstate", key);
      _Browser_window.navigator.userAgent.indexOf("Trident") < 0 ||
        _Browser_window.addEventListener("hashchange", key);

      return F2(function (domNode, event) {
        if (
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey &&
          event.button < 1 &&
          !domNode.target &&
          !domNode.hasAttribute("download")
        ) {
          event.preventDefault();
          var href = domNode.href;
          var curr = _Browser_getUrl();
          var next = $gren_lang$url$Url$fromString(href).a;
          sendToApp(
            onUrlRequest(
              next &&
                curr.protocol === next.protocol &&
                curr.host === next.host &&
                curr.port_.a === next.port_.a
                ? $gren_lang$browser$Browser$Internal(next)
                : $gren_lang$browser$Browser$External(href)
            )
          );
        }
      });
    },
    init: function (flags) {
      return A3(impl.init, flags, _Browser_getUrl(), key);
    },
    view: impl.view,
    update: impl.update,
    subscriptions: impl.subscriptions,
  });
}

function _Browser_getUrl() {
  return $gren_lang$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function (key, n) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function () {
      n && history.go(n);
      key();
    })
  );
});

var _Browser_pushUrl = F2(function (key, url) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function () {
      history.pushState({}, "", url);
      key();
    })
  );
});

var _Browser_replaceUrl = F2(function (key, url) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function () {
      history.replaceState({}, "", url);
      key();
    })
  );
});

// GLOBAL EVENTS

var _Browser_fakeNode = {
  addEventListener: function () {},
  removeEventListener: function () {},
};
var _Browser_doc =
  typeof document !== "undefined" ? document : _Browser_fakeNode;
var _Browser_window =
  typeof window !== "undefined" ? window : _Browser_fakeNode;

var _Browser_on = F3(function (node, eventName, sendToSelf) {
  return _Scheduler_spawn(
    _Scheduler_binding(function (callback) {
      function handler(event) {
        _Scheduler_rawSpawn(sendToSelf(event));
      }
      node.addEventListener(
        eventName,
        handler,
        _VirtualDom_passiveSupported && { passive: true }
      );
      return function () {
        node.removeEventListener(eventName, handler);
      };
    })
  );
});

var _Browser_decodeEvent = F2(function (decoder, event) {
  var result = _Json_runHelp(decoder, event);
  return $gren_lang$core$Result$isOk(result) ? $gren_lang$core$Maybe$Just(result.a) : $gren_lang$core$Maybe$Nothing;
});

// PAGE VISIBILITY

function _Browser_visibilityInfo() {
  return typeof _VirtualDom_doc.hidden !== "undefined"
    ? { hidden: "hidden", change: "visibilitychange" }
    : typeof _VirtualDom_doc.mozHidden !== "undefined"
    ? { hidden: "mozHidden", change: "mozvisibilitychange" }
    : typeof _VirtualDom_doc.msHidden !== "undefined"
    ? { hidden: "msHidden", change: "msvisibilitychange" }
    : typeof _VirtualDom_doc.webkitHidden !== "undefined"
    ? { hidden: "webkitHidden", change: "webkitvisibilitychange" }
    : { hidden: "hidden", change: "visibilitychange" };
}

// ANIMATION FRAMES

function _Browser_rAF() {
  return _Scheduler_binding(function (callback) {
    var id = _Browser_requestAnimationFrame(function () {
      callback(_Scheduler_succeed(Date.now()));
    });

    return function () {
      _Browser_cancelAnimationFrame(id);
    };
  });
}

function _Browser_now() {
  return _Scheduler_binding(function (callback) {
    callback(_Scheduler_succeed(Date.now()));
  });
}

// DOM STUFF

function _Browser_withNode(id, doStuff) {
  return _Scheduler_binding(function (callback) {
    _Browser_requestAnimationFrame(function () {
      var node = document.getElementById(id);
      callback(
        node
          ? _Scheduler_succeed(doStuff(node))
          : _Scheduler_fail($gren_lang$browser$Browser$Dom$NotFound(id))
      );
    });
  });
}

function _Browser_withWindow(doStuff) {
  return _Scheduler_binding(function (callback) {
    _Browser_requestAnimationFrame(function () {
      callback(_Scheduler_succeed(doStuff()));
    });
  });
}

// FOCUS and BLUR

var _Browser_call = F2(function (functionName, id) {
  return _Browser_withNode(id, function (node) {
    node[functionName]();
    return {};
  });
});

// WINDOW VIEWPORT

function _Browser_getViewport() {
  return {
    scene: _Browser_getScene(),
    viewport: {
      x: _Browser_window.pageXOffset,
      y: _Browser_window.pageYOffset,
      width: _Browser_doc.documentElement.clientWidth,
      height: _Browser_doc.documentElement.clientHeight,
    },
  };
}

function _Browser_getScene() {
  var body = _Browser_doc.body;
  var elem = _Browser_doc.documentElement;
  return {
    width: Math.max(
      body.scrollWidth,
      body.offsetWidth,
      elem.scrollWidth,
      elem.offsetWidth,
      elem.clientWidth
    ),
    height: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      elem.scrollHeight,
      elem.offsetHeight,
      elem.clientHeight
    ),
  };
}

var _Browser_setViewport = F2(function (x, y) {
  return _Browser_withWindow(function () {
    _Browser_window.scroll(x, y);
    return {};
  });
});

// ELEMENT VIEWPORT

function _Browser_getViewportOf(id) {
  return _Browser_withNode(id, function (node) {
    return {
      scene: {
        width: node.scrollWidth,
        height: node.scrollHeight,
      },
      viewport: {
        x: node.scrollLeft,
        y: node.scrollTop,
        width: node.clientWidth,
        height: node.clientHeight,
      },
    };
  });
}

var _Browser_setViewportOf = F3(function (id, x, y) {
  return _Browser_withNode(id, function (node) {
    node.scrollLeft = x;
    node.scrollTop = y;
    return {};
  });
});

// ELEMENT

function _Browser_getElement(id) {
  return _Browser_withNode(id, function (node) {
    var rect = node.getBoundingClientRect();
    var x = _Browser_window.pageXOffset;
    var y = _Browser_window.pageYOffset;
    return {
      scene: _Browser_getScene(),
      viewport: {
        x: x,
        y: y,
        width: _Browser_doc.documentElement.clientWidth,
        height: _Browser_doc.documentElement.clientHeight,
      },
      element: {
        x: x + rect.left,
        y: y + rect.top,
        width: rect.width,
        height: rect.height,
      },
    };
  });
}

// LOAD and RELOAD

function _Browser_reload(skipCache) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function (callback) {
      _VirtualDom_doc.location.reload(skipCache);
    })
  );
}

function _Browser_load(url) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function (callback) {
      try {
        _Browser_window.location = url;
      } catch (err) {
        // Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
        // Other browsers reload the page, so let's be consistent about that.
        _VirtualDom_doc.location.reload(false);
      }
    })
  );
}


// SEND REQUEST

var _Http_toTask = F3(function (router, toTask, request) {
  return _Scheduler_binding(function (callback) {
    function done(response) {
      callback(toTask(request.expect.a(response)));
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("error", function () {
      done($gren_lang$browser$Http$NetworkError_);
    });
    xhr.addEventListener("timeout", function () {
      done($gren_lang$browser$Http$Timeout_);
    });
    xhr.addEventListener("load", function () {
      done(_Http_toResponse(request.expect.b, xhr));
    });
    $gren_lang$core$Maybe$isJust(request.tracker) &&
      _Http_track(router, xhr, request.tracker.a);

    try {
      xhr.open(request.method, request.url, true);
    } catch (e) {
      return done($gren_lang$browser$Http$BadUrl_(request.url));
    }

    _Http_configureRequest(xhr, request);

    request.body.a &&
      xhr.setRequestHeader("Content-Type", request.body.a);
    xhr.send(request.body.b);

    return function () {
      xhr.c = true;
      xhr.abort();
    };
  });
});

// CONFIGURE

function _Http_configureRequest(xhr, request) {
  var headers = request.headers;
  for (var i = 0; i < headers.length; i++) {
    xhr.setRequestHeader(headers[i].a, headers[i].b);
  }
  xhr.timeout = request.timeout.a || 0;
  xhr.responseType = request.expect.d;
  xhr.withCredentials = request.allowCookiesFromOtherDomains;
}

// RESPONSES

function _Http_toResponse(toBody, xhr) {
  return A2(
    200 <= xhr.status && xhr.status < 300
      ? $gren_lang$browser$Http$GoodStatus_
      : $gren_lang$browser$Http$BadStatus_,
    _Http_toMetadata(xhr),
    toBody(xhr.response)
  );
}

// METADATA

function _Http_toMetadata(xhr) {
  return {
    url: xhr.responseURL,
    statusCode: xhr.status,
    statusText: xhr.statusText,
    headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
  };
}

// HEADERS

function _Http_parseHeaders(rawHeaders) {
  if (!rawHeaders) {
    return $gren_lang$core$Dict$empty;
  }

  var headers = $gren_lang$core$Dict$empty;
  var headerPairs = rawHeaders.split("\r\n");
  for (var i = headerPairs.length; i--; ) {
    var headerPair = headerPairs[i];
    var index = headerPair.indexOf(": ");
    if (index > 0) {
      var key = headerPair.substring(0, index);
      var value = headerPair.substring(index + 2);

      headers = A3(
        $gren_lang$core$Dict$update,
        key,
        function (oldValue) {
          return $gren_lang$core$Maybe$Just(
            $gren_lang$core$Maybe$isJust(oldValue) ? value + ", " + oldValue.a : value
          );
        },
        headers
      );
    }
  }
  return headers;
}

// EXPECT

var _Http_expect = F3(function (type, toBody, toValue) {
  return {
    $: 0,
    d: type,
    b: toBody,
    a: toValue,
  };
});

var _Http_mapExpect = F2(function (func, expect) {
  return {
    $: 0,
    d: expect.d,
    b: expect.b,
    a: function (x) {
      return func(expect.a(x));
    },
  };
});

function _Http_toDataView(arrayBuffer) {
  return new DataView(arrayBuffer);
}

// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function (a, b) {
  return { $: 0, a: a, b: b };
});

function _Http_toFormData(parts) {
  var formData = new FormData();
  for (var i = 0; i < parts.length; i++) {
    formData.append(parts[i].a, parts[i].b);
  }
  return formData;
}

var _Http_bytesToBlob = F2(function (mime, bytes) {
  return new Blob([bytes], { type: mime });
});

// PROGRESS

function _Http_track(router, xhr, tracker) {
  // TODO check out lengthComputable on loadstart event

  xhr.upload.addEventListener("progress", function (event) {
    if (xhr.c) {
      return;
    }
    _Scheduler_rawSpawn(
      A2($gren_lang$core$Platform$sendToSelf, router, {
        tracker: tracker,
        progress: $gren_lang$browser$Http$Sending({
          sent: event.loaded,
          size: event.total,
        }),
      })
    );
  });
  xhr.addEventListener("progress", function (event) {
    if (xhr.c) {
      return;
    }
    _Scheduler_rawSpawn(
      A2($gren_lang$core$Platform$sendToSelf, router, {
        tracker: tracker,
        progress: $gren_lang$browser$Http$Receiving({
          received: event.loaded,
          size: event.lengthComputable
            ? $gren_lang$core$Maybe$Just(event.total)
            : $gren_lang$core$Maybe$Nothing,
        }),
      })
    );
  });
}
var $gren_lang$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $gren_lang$core$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $gren_lang$core$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $gren_lang$core$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $gren_lang$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $gren_lang$core$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $gren_lang$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_gren_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($gren_lang$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $gren_lang$core$Array$pushLast = _Array_push;
var $gren_lang$core$Dict$toArray = function (dict) {
	return A3(
		$gren_lang$core$Dict$foldl,
		F3(
			function (key, value, array) {
				return A2(
					$gren_lang$core$Array$pushLast,
					{key: key, value: value},
					array);
			}),
		[],
		dict);
};
var $gren_lang$core$Dict$keys = function (dict) {
	return A3(
		$gren_lang$core$Dict$foldl,
		F3(
			function (key, value, keyArray) {
				return A2($gren_lang$core$Array$pushLast, key, keyArray);
			}),
		[],
		dict);
};
var $gren_lang$core$Set$toArray = function (_v0) {
	var dict = _v0.a;
	return $gren_lang$core$Dict$keys(dict);
};
var $gren_lang$core$Basics$EQ = {$: 'EQ'};
var $gren_lang$core$Basics$GT = {$: 'GT'};
var $gren_lang$core$Basics$LT = {$: 'LT'};
var $gren_lang$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $gren_lang$core$Maybe$Nothing = {$: 'Nothing'};
var $gren_lang$core$Basics$False = {$: 'False'};
var $gren_lang$core$Basics$add = _Basics_add;
var $gren_lang$core$String$all = _String_all;
var $gren_lang$core$Basics$and = _Basics_and;
var $gren_lang$core$Basics$append = _Utils_append;
var $gren_lang$core$Json$Encode$encode = _Json_encode;
var $gren_lang$core$String$fromInt = _String_fromNumber;
var $gren_lang$core$String$join = _String_join;
var $gren_lang$core$String$split = _String_split;
var $gren_lang$core$Json$Decode$indent = function (str) {
	return A2(
		$gren_lang$core$String$join,
		'\n    ',
		A2($gren_lang$core$String$split, '\n', str));
};
var $gren_lang$core$Array$indexedMap = _Array_indexedMap;
var $gren_lang$core$Basics$le = _Utils_le;
var $gren_lang$core$Char$toCode = _Char_toCode;
var $gren_lang$core$Char$isLower = function (_char) {
	var code = $gren_lang$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $gren_lang$core$Char$isUpper = function (_char) {
	var code = $gren_lang$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $gren_lang$core$Basics$or = _Basics_or;
var $gren_lang$core$Char$isAlpha = function (_char) {
	return $gren_lang$core$Char$isLower(_char) || $gren_lang$core$Char$isUpper(_char);
};
var $gren_lang$core$Char$isDigit = function (_char) {
	var code = $gren_lang$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $gren_lang$core$Char$isAlphaNum = function (_char) {
	return $gren_lang$core$Char$isLower(_char) || ($gren_lang$core$Char$isUpper(_char) || $gren_lang$core$Char$isDigit(_char));
};
var $gren_lang$core$Array$length = _Array_length;
var $gren_lang$core$String$uncons = _String_uncons;
var $gren_lang$core$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($gren_lang$core$String$fromInt(i + 1) + (') ' + $gren_lang$core$Json$Decode$indent(
			$gren_lang$core$Json$Decode$errorToString(error))));
	});
var $gren_lang$core$Json$Decode$errorToString = function (error) {
	return A2(
		$gren_lang$core$Json$Decode$errorToStringHelp,
		error,
		[]);
};
var $gren_lang$core$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $gren_lang$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.first;
							var rest = _v2.rest;
							return $gren_lang$core$Char$isAlpha(_char) && A2($gren_lang$core$String$all, $gren_lang$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = _Utils_ap(
						[fieldName],
						context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($gren_lang$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = _Utils_ap(
						[indexName],
						context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					switch (errors.length) {
						case 0:
							return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
								if (context.length === 0) {
									return '!';
								} else {
									return ' at json' + A2($gren_lang$core$String$join, '', context);
								}
							}();
						case 1:
							var err = errors[0];
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						default:
							var starter = function () {
								if (context.length === 0) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2($gren_lang$core$String$join, '', context);
								}
							}();
							var introduction = starter + (' failed in the following ' + ($gren_lang$core$String$fromInt(
								$gren_lang$core$Array$length(errors)) + ' ways:'));
							return A2(
								$gren_lang$core$String$join,
								'\n\n',
								_Utils_ap(
									[introduction],
									A2($gren_lang$core$Array$indexedMap, $gren_lang$core$Json$Decode$errorOneOf, errors)));
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (context.length === 0) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2($gren_lang$core$String$join, '', context) + ':\n\n    ');
						}
					}();
					return introduction + ($gren_lang$core$Json$Decode$indent(
						A2($gren_lang$core$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $gren_lang$core$Basics$True = {$: 'True'};
var $gren_lang$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $gren_lang$core$Json$Decode$andThen = _Json_andThen;
var $gren_lang$core$Json$Decode$array = _Json_decodeArray;
var $gren_lang$core$Json$Decode$map = _Json_map1;
var $gren_lang$core$Json$Decode$map2 = _Json_map2;
var $gren_lang$core$Json$Decode$succeed = _Json_succeed;
var $gren_lang$browser$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $gren_lang$browser$Debugger$Expando$ArraySeq = {$: 'ArraySeq'};
var $gren_lang$browser$Debugger$Overlay$BlockMost = {$: 'BlockMost'};
var $gren_lang$browser$Debugger$Overlay$BlockNone = {$: 'BlockNone'};
var $gren_lang$browser$Debugger$Expando$Constructor = F3(
	function (a, b, c) {
		return {$: 'Constructor', a: a, b: b, c: c};
	});
var $gren_lang$browser$Debugger$Expando$Dictionary = F2(
	function (a, b) {
		return {$: 'Dictionary', a: a, b: b};
	});
var $gren_lang$browser$Debugger$Main$Down = {$: 'Down'};
var $gren_lang$browser$Debugger$Main$NoOp = {$: 'NoOp'};
var $gren_lang$browser$Debugger$Expando$Primitive = function (a) {
	return {$: 'Primitive', a: a};
};
var $gren_lang$browser$Debugger$Expando$Record = F2(
	function (a, b) {
		return {$: 'Record', a: a, b: b};
	});
var $gren_lang$browser$Debugger$Expando$S = function (a) {
	return {$: 'S', a: a};
};
var $gren_lang$browser$Debugger$Expando$Sequence = F3(
	function (a, b, c) {
		return {$: 'Sequence', a: a, b: b, c: c};
	});
var $gren_lang$browser$Debugger$Expando$SetSeq = {$: 'SetSeq'};
var $gren_lang$browser$Debugger$Main$Up = {$: 'Up'};
var $gren_lang$browser$Debugger$Main$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var $gren_lang$browser$Debugger$Main$Export = {$: 'Export'};
var $gren_lang$browser$Debugger$Main$Import = {$: 'Import'};
var $gren_lang$browser$Debugger$Main$Open = {$: 'Open'};
var $gren_lang$browser$Debugger$Main$OverlayMsg = function (a) {
	return {$: 'OverlayMsg', a: a};
};
var $gren_lang$browser$Debugger$Main$Resume = {$: 'Resume'};
var $gren_lang$browser$Debugger$Main$isPaused = function (state) {
	if (state.$ === 'Running') {
		return false;
	} else {
		return true;
	}
};
var $gren_lang$browser$Debugger$History$size = function (history) {
	return history.numMessages;
};
var $gren_lang$browser$Debugger$Overlay$Accept = function (a) {
	return {$: 'Accept', a: a};
};
var $gren_lang$browser$Debugger$Overlay$Choose = F2(
	function (a, b) {
		return {$: 'Choose', a: a, b: b};
	});
var $gren_lang$browser$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $gren_lang$browser$Html$node = $gren_lang$browser$VirtualDom$node;
var $gren_lang$browser$Html$div = $gren_lang$browser$Html$node('div');
var $gren_lang$browser$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $gren_lang$browser$Html$Attributes$property = $gren_lang$browser$VirtualDom$property;
var $gren_lang$core$Json$Encode$string = _Json_wrap;
var $gren_lang$browser$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$gren_lang$browser$Html$Attributes$property,
			key,
			$gren_lang$core$Json$Encode$string(string));
	});
var $gren_lang$browser$Html$Attributes$id = $gren_lang$browser$Html$Attributes$stringProperty('id');
var $gren_lang$browser$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $gren_lang$browser$VirtualDom$on = _VirtualDom_on;
var $gren_lang$browser$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$gren_lang$browser$VirtualDom$on,
			event,
			$gren_lang$browser$VirtualDom$Normal(decoder));
	});
var $gren_lang$browser$Html$Events$onClick = function (msg) {
	return A2(
		$gren_lang$browser$Html$Events$on,
		'click',
		$gren_lang$core$Json$Decode$succeed(msg));
};
var $gren_lang$browser$Html$span = $gren_lang$browser$Html$node('span');
var $gren_lang$browser$VirtualDom$style = _VirtualDom_style;
var $gren_lang$browser$Html$Attributes$style = $gren_lang$browser$VirtualDom$style;
var $gren_lang$browser$VirtualDom$text = _VirtualDom_text;
var $gren_lang$browser$Html$text = $gren_lang$browser$VirtualDom$text;
var $gren_lang$browser$Html$a = $gren_lang$browser$Html$node('a');
var $gren_lang$browser$Debugger$Overlay$goodNews1 = 'The good news is that having values like this in your message type is not\nso great in the long run. You are better off using simpler data, like';
var $gren_lang$browser$Debugger$Overlay$goodNews2 = 'function can pattern match on that data and call whatever functions, JSON\ndecoders, etc. you need. This makes the code much more explicit and easy to\nfollow for other readers (or you in a few months!)';
var $gren_lang$browser$Html$Attributes$href = function (url) {
	return A2($gren_lang$browser$Html$Attributes$stringProperty, 'href', url);
};
var $gren_lang$core$Array$map = _Array_map;
var $gren_lang$browser$Html$p = $gren_lang$browser$Html$node('p');
var $gren_lang$browser$Html$ul = $gren_lang$browser$Html$node('ul');
var $gren_lang$browser$Html$code = $gren_lang$browser$Html$node('code');
var $gren_lang$browser$Debugger$Overlay$viewCode = function (name) {
	return A2(
		$gren_lang$browser$Html$code,
		[],
		[
			$gren_lang$browser$Html$text(name)
		]);
};
var $gren_lang$core$Array$slice = _Array_slice;
var $gren_lang$core$Array$dropFirst = F2(
	function (n, array) {
		return A3(
			$gren_lang$core$Array$slice,
			n,
			$gren_lang$core$Array$length(array),
			array);
	});
var $gren_lang$core$Array$get = _Array_get;
var $gren_lang$core$Array$first = function (array) {
	return A2($gren_lang$core$Array$get, 0, array);
};
var $gren_lang$core$Array$popFirst = function (array) {
	var _v0 = $gren_lang$core$Array$first(array);
	if (_v0.$ === 'Just') {
		var value = _v0.a;
		return $gren_lang$core$Maybe$Just(
			{
				first: value,
				rest: A2($gren_lang$core$Array$dropFirst, 1, array)
			});
	} else {
		return $gren_lang$core$Maybe$Nothing;
	}
};
var $gren_lang$browser$Debugger$Overlay$addCommas = function (items) {
	var _v0 = $gren_lang$core$Array$popFirst(items);
	if (_v0.$ === 'Nothing') {
		return '';
	} else {
		switch (_v0.a.rest.length) {
			case 0:
				var _v1 = _v0.a;
				var item = _v1.first;
				return item;
			case 1:
				var _v2 = _v0.a;
				var item1 = _v2.first;
				var item2 = _v2.rest[0];
				return item1 + (' and ' + item2);
			default:
				var _v3 = _v0.a;
				var lastItem = _v3.first;
				var otherItems = _v3.rest;
				return A2(
					$gren_lang$core$String$join,
					', ',
					_Utils_ap(
						otherItems,
						[' and ' + lastItem]));
		}
	}
};
var $gren_lang$browser$Html$li = $gren_lang$browser$Html$node('li');
var $gren_lang$browser$Debugger$Overlay$problemToString = function (problem) {
	switch (problem.$) {
		case 'Function':
			return 'functions';
		case 'Decoder':
			return 'JSON decoders';
		case 'Task':
			return 'tasks';
		case 'Process':
			return 'processes';
		case 'Socket':
			return 'web sockets';
		case 'Request':
			return 'HTTP requests';
		case 'Program':
			return 'programs';
		default:
			return 'virtual DOM values';
	}
};
var $gren_lang$browser$Debugger$Overlay$viewProblemType = function (_v0) {
	var name = _v0.name;
	var problems = _v0.problems;
	return A2(
		$gren_lang$browser$Html$li,
		[],
		[
			$gren_lang$browser$Debugger$Overlay$viewCode(name),
			$gren_lang$browser$Html$text(
			' can contain ' + ($gren_lang$browser$Debugger$Overlay$addCommas(
				A2($gren_lang$core$Array$map, $gren_lang$browser$Debugger$Overlay$problemToString, problems)) + '.'))
		]);
};
var $gren_lang$browser$Debugger$Overlay$viewBadMetadata = function (_v0) {
	var message = _v0.message;
	var problems = _v0.problems;
	return [
		A2(
		$gren_lang$browser$Html$p,
		[],
		[
			$gren_lang$browser$Html$text('The '),
			$gren_lang$browser$Debugger$Overlay$viewCode(message),
			$gren_lang$browser$Html$text(' type of your program cannot be reliably serialized for history files.')
		]),
		A2(
		$gren_lang$browser$Html$p,
		[],
		[
			$gren_lang$browser$Html$text('Functions cannot be serialized, nor can values that contain functions. This is a problem in these places:')
		]),
		A2(
		$gren_lang$browser$Html$ul,
		[],
		A2($gren_lang$core$Array$map, $gren_lang$browser$Debugger$Overlay$viewProblemType, problems)),
		A2(
		$gren_lang$browser$Html$p,
		[],
		[
			$gren_lang$browser$Html$text($gren_lang$browser$Debugger$Overlay$goodNews1),
			A2(
			$gren_lang$browser$Html$a,
			[
				$gren_lang$browser$Html$Attributes$href('https://guide.elm-lang.org/types/custom_types.html')
			],
			[
				$gren_lang$browser$Html$text('custom types')
			]),
			$gren_lang$browser$Html$text(', in your messages. From there, your '),
			$gren_lang$browser$Debugger$Overlay$viewCode('update'),
			$gren_lang$browser$Html$text($gren_lang$browser$Debugger$Overlay$goodNews2)
		])
	];
};
var $gren_lang$browser$VirtualDom$map = _VirtualDom_map;
var $gren_lang$browser$Html$map = $gren_lang$browser$VirtualDom$map;
var $gren_lang$browser$Debugger$Overlay$Cancel = {$: 'Cancel'};
var $gren_lang$browser$Debugger$Overlay$Proceed = {$: 'Proceed'};
var $gren_lang$browser$Html$button = $gren_lang$browser$Html$node('button');
var $gren_lang$browser$Debugger$Overlay$viewButtons = function (buttons) {
	var btn = F2(
		function (msg, string) {
			return A2(
				$gren_lang$browser$Html$button,
				[
					A2($gren_lang$browser$Html$Attributes$style, 'margin-right', '20px'),
					$gren_lang$browser$Html$Events$onClick(msg)
				],
				[
					$gren_lang$browser$Html$text(string)
				]);
		});
	var buttonNodes = function () {
		if (buttons.$ === 'Accept') {
			var proceed = buttons.a;
			return [
				A2(btn, $gren_lang$browser$Debugger$Overlay$Proceed, proceed)
			];
		} else {
			var cancel = buttons.a;
			var proceed = buttons.b;
			return [
				A2(btn, $gren_lang$browser$Debugger$Overlay$Cancel, cancel),
				A2(btn, $gren_lang$browser$Debugger$Overlay$Proceed, proceed)
			];
		}
	}();
	return A2(
		$gren_lang$browser$Html$div,
		[
			A2($gren_lang$browser$Html$Attributes$style, 'height', '60px'),
			A2($gren_lang$browser$Html$Attributes$style, 'line-height', '60px'),
			A2($gren_lang$browser$Html$Attributes$style, 'text-align', 'right'),
			A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
		],
		buttonNodes);
};
var $gren_lang$browser$Debugger$Overlay$viewMessage = F4(
	function (config, title, details, buttons) {
		return A2(
			$gren_lang$browser$Html$div,
			[
				$gren_lang$browser$Html$Attributes$id('elm-debugger-overlay'),
				A2($gren_lang$browser$Html$Attributes$style, 'position', 'fixed'),
				A2($gren_lang$browser$Html$Attributes$style, 'top', '0'),
				A2($gren_lang$browser$Html$Attributes$style, 'left', '0'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', '100vw'),
				A2($gren_lang$browser$Html$Attributes$style, 'height', '100vh'),
				A2($gren_lang$browser$Html$Attributes$style, 'color', 'white'),
				A2($gren_lang$browser$Html$Attributes$style, 'pointer-events', 'none'),
				A2($gren_lang$browser$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
				A2($gren_lang$browser$Html$Attributes$style, 'z-index', '2147483647')
			],
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					A2($gren_lang$browser$Html$Attributes$style, 'position', 'absolute'),
					A2($gren_lang$browser$Html$Attributes$style, 'width', '600px'),
					A2($gren_lang$browser$Html$Attributes$style, 'height', '100vh'),
					A2($gren_lang$browser$Html$Attributes$style, 'padding-left', 'calc(50% - 300px)'),
					A2($gren_lang$browser$Html$Attributes$style, 'padding-right', 'calc(50% - 300px)'),
					A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
					A2($gren_lang$browser$Html$Attributes$style, 'pointer-events', 'auto')
				],
				[
					A2(
					$gren_lang$browser$Html$div,
					[
						A2($gren_lang$browser$Html$Attributes$style, 'font-size', '36px'),
						A2($gren_lang$browser$Html$Attributes$style, 'height', '80px'),
						A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)'),
						A2($gren_lang$browser$Html$Attributes$style, 'padding-left', '22px'),
						A2($gren_lang$browser$Html$Attributes$style, 'vertical-align', 'middle'),
						A2($gren_lang$browser$Html$Attributes$style, 'line-height', '80px')
					],
					[
						$gren_lang$browser$Html$text(title)
					]),
					A2(
					$gren_lang$browser$Html$div,
					[
						$gren_lang$browser$Html$Attributes$id('elm-debugger-details'),
						A2($gren_lang$browser$Html$Attributes$style, 'padding', ' 8px 20px'),
						A2($gren_lang$browser$Html$Attributes$style, 'overflow-y', 'auto'),
						A2($gren_lang$browser$Html$Attributes$style, 'max-height', 'calc(100vh - 156px)'),
						A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)')
					],
					details),
					A2(
					$gren_lang$browser$Html$map,
					config.wrap,
					$gren_lang$browser$Debugger$Overlay$viewButtons(buttons))
				])
			]);
	});
var $gren_lang$core$String$length = _String_length;
var $gren_lang$browser$Debugger$Overlay$viewMiniControls = F2(
	function (config, numMsgs) {
		var string = $gren_lang$core$String$fromInt(numMsgs);
		var width = $gren_lang$core$String$fromInt(
			2 + $gren_lang$core$String$length(string));
		return A2(
			$gren_lang$browser$Html$div,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'position', 'fixed'),
				A2($gren_lang$browser$Html$Attributes$style, 'bottom', '2em'),
				A2($gren_lang$browser$Html$Attributes$style, 'right', '2em'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', 'calc(' + (width + 'ch)')),
				A2($gren_lang$browser$Html$Attributes$style, 'height', '36px'),
				A2($gren_lang$browser$Html$Attributes$style, 'background-color', '#ff6600'),
				A2($gren_lang$browser$Html$Attributes$style, 'color', 'white'),
				A2($gren_lang$browser$Html$Attributes$style, 'font-family', 'monospace'),
				A2($gren_lang$browser$Html$Attributes$style, 'pointer-events', 'auto'),
				A2($gren_lang$browser$Html$Attributes$style, 'z-index', '2147483647'),
				A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
				A2($gren_lang$browser$Html$Attributes$style, 'justify-content', 'center'),
				A2($gren_lang$browser$Html$Attributes$style, 'align-items', 'center'),
				A2($gren_lang$browser$Html$Attributes$style, 'cursor', 'pointer'),
				$gren_lang$browser$Html$Events$onClick(config.open)
			],
			[
				$gren_lang$browser$Html$text(string)
			]);
	});
var $gren_lang$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $gren_lang$browser$Debugger$Overlay$explanationBad = 'The messages in this history do not match the messages handled by your\nprogram. I noticed changes in the following types:';
var $gren_lang$browser$Debugger$Overlay$explanationRisky = 'This history seems old. It will work with this program, but some\nmessages have been added since the history was created:';
var $gren_lang$core$Array$foldr = _Array_foldr;
var $gren_lang$core$Array$prefix = _Array_append;
var $gren_lang$core$Array$pushFirst = F2(
	function (value, array) {
		return A2(
			$gren_lang$core$Array$prefix,
			[value],
			array);
	});
var $gren_lang$core$Array$intersperse = F2(
	function (sep, xs) {
		var _v0 = $gren_lang$core$Array$popFirst(xs);
		if (_v0.$ === 'Nothing') {
			return [];
		} else {
			var _v1 = _v0.a;
			var head = _v1.first;
			var tail = _v1.rest;
			var step = F2(
				function (x, rest) {
					return A2(
						$gren_lang$core$Array$pushFirst,
						sep,
						A2($gren_lang$core$Array$pushFirst, x, rest));
				});
			var spersed = A3(
				$gren_lang$core$Array$foldr,
				step,
				[],
				tail);
			return A2($gren_lang$core$Array$pushFirst, head, spersed);
		}
	});
var $gren_lang$core$Array$reverse = _Array_reverse;
var $gren_lang$browser$Debugger$Overlay$viewMention = F2(
	function (tags, verbed) {
		var _v0 = $gren_lang$core$Array$popFirst(
			A2(
				$gren_lang$core$Array$map,
				$gren_lang$browser$Debugger$Overlay$viewCode,
				$gren_lang$core$Array$reverse(tags)));
		if (_v0.$ === 'Nothing') {
			return $gren_lang$browser$Html$text('');
		} else {
			switch (_v0.a.rest.length) {
				case 0:
					var _v1 = _v0.a;
					var tag = _v1.first;
					return A2(
						$gren_lang$browser$Html$li,
						[],
						[
							$gren_lang$browser$Html$text(verbed),
							tag,
							$gren_lang$browser$Html$text('.')
						]);
				case 1:
					var _v2 = _v0.a;
					var tag2 = _v2.first;
					var tag1 = _v2.rest[0];
					return A2(
						$gren_lang$browser$Html$li,
						[],
						[
							$gren_lang$browser$Html$text(verbed),
							tag1,
							$gren_lang$browser$Html$text(' and '),
							tag2,
							$gren_lang$browser$Html$text('.')
						]);
				default:
					var _v3 = _v0.a;
					var lastTag = _v3.first;
					var otherTags = _v3.rest;
					return A2(
						$gren_lang$browser$Html$li,
						[],
						_Utils_ap(
							[
								$gren_lang$browser$Html$text(verbed)
							],
							_Utils_ap(
								A2(
									$gren_lang$core$Array$intersperse,
									$gren_lang$browser$Html$text(', '),
									$gren_lang$core$Array$reverse(otherTags)),
								[
									$gren_lang$browser$Html$text(', and '),
									lastTag,
									$gren_lang$browser$Html$text('.')
								])));
			}
		}
	});
var $gren_lang$browser$Debugger$Overlay$viewChange = function (change) {
	return A2(
		$gren_lang$browser$Html$li,
		[
			A2($gren_lang$browser$Html$Attributes$style, 'margin', '8px 0')
		],
		function () {
			if (change.$ === 'AliasChange') {
				var name = change.a;
				return [
					A2(
					$gren_lang$browser$Html$span,
					[
						A2($gren_lang$browser$Html$Attributes$style, 'font-size', '1.5em')
					],
					[
						$gren_lang$browser$Debugger$Overlay$viewCode(name)
					])
				];
			} else {
				var name = change.a;
				var _v1 = change.b;
				var removed = _v1.removed;
				var changed = _v1.changed;
				var added = _v1.added;
				var argsMatch = _v1.argsMatch;
				return [
					A2(
					$gren_lang$browser$Html$span,
					[
						A2($gren_lang$browser$Html$Attributes$style, 'font-size', '1.5em')
					],
					[
						$gren_lang$browser$Debugger$Overlay$viewCode(name)
					]),
					A2(
					$gren_lang$browser$Html$ul,
					[
						A2($gren_lang$browser$Html$Attributes$style, 'list-style-type', 'disc'),
						A2($gren_lang$browser$Html$Attributes$style, 'padding-left', '2em')
					],
					[
						A2($gren_lang$browser$Debugger$Overlay$viewMention, removed, 'Removed '),
						A2($gren_lang$browser$Debugger$Overlay$viewMention, changed, 'Changed '),
						A2($gren_lang$browser$Debugger$Overlay$viewMention, added, 'Added ')
					]),
					argsMatch ? $gren_lang$browser$Html$text('') : $gren_lang$browser$Html$text('This may be due to the fact that the type variable names changed.')
				];
			}
		}());
};
var $gren_lang$browser$Debugger$Overlay$viewReport = F2(
	function (isBad, report) {
		switch (report.$) {
			case 'CorruptHistory':
				return [
					$gren_lang$browser$Html$text('Looks like this history file is corrupt. I cannot understand it.')
				];
			case 'VersionChanged':
				var old = report.a;
				var _new = report.b;
				return [
					$gren_lang$browser$Html$text('This history was created with Gren ' + (old + (', but you are using Gren ' + (_new + ' right now.'))))
				];
			case 'MessageChanged':
				var old = report.a;
				var _new = report.b;
				return [
					$gren_lang$browser$Html$text('To import some other history, the overall message type must' + ' be the same. The old history has '),
					$gren_lang$browser$Debugger$Overlay$viewCode(old),
					$gren_lang$browser$Html$text(' messages, but the new program works with '),
					$gren_lang$browser$Debugger$Overlay$viewCode(_new),
					$gren_lang$browser$Html$text(' messages.')
				];
			default:
				var changes = report.a;
				return [
					A2(
					$gren_lang$browser$Html$p,
					[],
					[
						$gren_lang$browser$Html$text(
						isBad ? $gren_lang$browser$Debugger$Overlay$explanationBad : $gren_lang$browser$Debugger$Overlay$explanationRisky)
					]),
					A2(
					$gren_lang$browser$Html$ul,
					[
						A2($gren_lang$browser$Html$Attributes$style, 'list-style-type', 'none'),
						A2($gren_lang$browser$Html$Attributes$style, 'padding-left', '20px')
					],
					A2($gren_lang$core$Array$map, $gren_lang$browser$Debugger$Overlay$viewChange, changes))
				];
		}
	});
var $gren_lang$browser$Debugger$Overlay$view = F5(
	function (config, isPaused, isOpen, numMsgs, state) {
		switch (state.$) {
			case 'None':
				return isOpen ? $gren_lang$browser$Html$text('') : (isPaused ? A2(
					$gren_lang$browser$Html$div,
					[
						$gren_lang$browser$Html$Attributes$id('elm-debugger-overlay'),
						A2($gren_lang$browser$Html$Attributes$style, 'position', 'fixed'),
						A2($gren_lang$browser$Html$Attributes$style, 'top', '0'),
						A2($gren_lang$browser$Html$Attributes$style, 'left', '0'),
						A2($gren_lang$browser$Html$Attributes$style, 'width', '100vw'),
						A2($gren_lang$browser$Html$Attributes$style, 'height', '100vh'),
						A2($gren_lang$browser$Html$Attributes$style, 'cursor', 'pointer'),
						A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
						A2($gren_lang$browser$Html$Attributes$style, 'align-items', 'center'),
						A2($gren_lang$browser$Html$Attributes$style, 'justify-content', 'center'),
						A2($gren_lang$browser$Html$Attributes$style, 'pointer-events', 'auto'),
						A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
						A2($gren_lang$browser$Html$Attributes$style, 'color', 'white'),
						A2($gren_lang$browser$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
						A2($gren_lang$browser$Html$Attributes$style, 'z-index', '2147483646'),
						$gren_lang$browser$Html$Events$onClick(config.resume)
					],
					[
						A2(
						$gren_lang$browser$Html$span,
						[
							A2($gren_lang$browser$Html$Attributes$style, 'font-size', '80px')
						],
						[
							$gren_lang$browser$Html$text('Click to Resume')
						]),
						A2($gren_lang$browser$Debugger$Overlay$viewMiniControls, config, numMsgs)
					]) : A2($gren_lang$browser$Debugger$Overlay$viewMiniControls, config, numMsgs));
			case 'BadMetadata':
				var badMetadata_ = state.a;
				return A4(
					$gren_lang$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot use Import or Export',
					$gren_lang$browser$Debugger$Overlay$viewBadMetadata(badMetadata_),
					$gren_lang$browser$Debugger$Overlay$Accept('Ok'));
			case 'BadImport':
				var report = state.a;
				return A4(
					$gren_lang$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot Import History',
					A2($gren_lang$browser$Debugger$Overlay$viewReport, true, report),
					$gren_lang$browser$Debugger$Overlay$Accept('Ok'));
			default:
				var report = state.a;
				return A4(
					$gren_lang$browser$Debugger$Overlay$viewMessage,
					config,
					'Warning',
					A2($gren_lang$browser$Debugger$Overlay$viewReport, false, report),
					A2($gren_lang$browser$Debugger$Overlay$Choose, 'Cancel', 'Import Anyway'));
		}
	});
var $gren_lang$browser$Debugger$Main$cornerView = function (model) {
	return A5(
		$gren_lang$browser$Debugger$Overlay$view,
		{exportHistory: $gren_lang$browser$Debugger$Main$Export, importHistory: $gren_lang$browser$Debugger$Main$Import, open: $gren_lang$browser$Debugger$Main$Open, resume: $gren_lang$browser$Debugger$Main$Resume, wrap: $gren_lang$browser$Debugger$Main$OverlayMsg},
		$gren_lang$browser$Debugger$Main$isPaused(model.state),
		_Debugger_isOpen(model.popout),
		$gren_lang$browser$Debugger$History$size(model.history),
		model.overlay);
};
var $gren_lang$core$Dict$RBEmpty_gren_builtin = {$: 'RBEmpty_gren_builtin'};
var $gren_lang$core$Dict$empty = $gren_lang$core$Dict$RBEmpty_gren_builtin;
var $gren_lang$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_gren_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($gren_lang$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $gren_lang$core$Set$foldr = F3(
	function (func, initialState, _v0) {
		var dict = _v0.a;
		return A3(
			$gren_lang$core$Dict$foldr,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $gren_lang$browser$Debugger$Main$getCurrentModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.b;
		return model;
	}
};
var $gren_lang$browser$Debugger$Main$getUserModel = function (model) {
	return $gren_lang$browser$Debugger$Main$getCurrentModel(model.state);
};
var $gren_lang$browser$Debugger$Main$initialWindowHeight = 420;
var $gren_lang$browser$Debugger$Main$initialWindowWidth = 900;
var $gren_lang$core$Dict$Black = {$: 'Black'};
var $gren_lang$core$Dict$RBNode_gren_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_gren_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $gren_lang$core$Dict$Red = {$: 'Red'};
var $gren_lang$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_gren_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_gren_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Red,
					key,
					value,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					color,
					rK,
					rV,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_gren_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_gren_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Red,
					lK,
					lV,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($gren_lang$core$Dict$RBNode_gren_builtin, color, key, value, left, right);
			}
		}
	});
var $gren_lang$core$Basics$compare = _Utils_compare;
var $gren_lang$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_gren_builtin') {
			return A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, key, value, $gren_lang$core$Dict$RBEmpty_gren_builtin, $gren_lang$core$Dict$RBEmpty_gren_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($gren_lang$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$gren_lang$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($gren_lang$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($gren_lang$core$Dict$RBNode_gren_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$gren_lang$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($gren_lang$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $gren_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($gren_lang$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_gren_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $gren_lang$browser$Debugger$Main$cachedHistory = function (model) {
	var _v0 = model.state;
	if (_v0.$ === 'Running') {
		return model.history;
	} else {
		var history = _v0.e;
		return history;
	}
};
var $gren_lang$browser$Debugger$Main$DragEnd = {$: 'DragEnd'};
var $gren_lang$browser$Debugger$Main$getDragStatus = function (layout) {
	if (layout.$ === 'Horizontal') {
		var status = layout.a;
		return status;
	} else {
		var status = layout.a;
		return status;
	}
};
var $gren_lang$browser$Debugger$Main$Drag = function (a) {
	return {$: 'Drag', a: a};
};
var $gren_lang$core$Json$Decode$field = _Json_decodeField;
var $gren_lang$core$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($gren_lang$core$Array$foldr, $gren_lang$core$Json$Decode$field, decoder, fields);
	});
var $gren_lang$core$Json$Decode$float = _Json_decodeFloat;
var $gren_lang$browser$Debugger$Main$decodeDimension = function (field) {
	return A2(
		$gren_lang$core$Json$Decode$at,
		['currentTarget', 'ownerDocument', 'defaultView', field],
		$gren_lang$core$Json$Decode$float);
};
var $gren_lang$core$Basics$eq = _Utils_equal;
var $gren_lang$core$Json$Decode$int = _Json_decodeInt;
var $gren_lang$core$Json$Decode$map5 = _Json_map5;
var $gren_lang$browser$Debugger$Main$onMouseMove = A2(
	$gren_lang$browser$Html$Events$on,
	'mousemove',
	A2(
		$gren_lang$core$Json$Decode$map,
		$gren_lang$browser$Debugger$Main$Drag,
		A6(
			$gren_lang$core$Json$Decode$map5,
			F5(
				function (x, y, down, width, height) {
					return {down: down, height: height, width: width, x: x, y: y};
				}),
			A2($gren_lang$core$Json$Decode$field, 'pageX', $gren_lang$core$Json$Decode$float),
			A2($gren_lang$core$Json$Decode$field, 'pageY', $gren_lang$core$Json$Decode$float),
			A2(
				$gren_lang$core$Json$Decode$field,
				'buttons',
				A2(
					$gren_lang$core$Json$Decode$map,
					function (v) {
						return v === 1;
					},
					$gren_lang$core$Json$Decode$int)),
			$gren_lang$browser$Debugger$Main$decodeDimension('innerWidth'),
			$gren_lang$browser$Debugger$Main$decodeDimension('innerHeight'))));
var $gren_lang$browser$Html$Events$onMouseUp = function (msg) {
	return A2(
		$gren_lang$browser$Html$Events$on,
		'mouseup',
		$gren_lang$core$Json$Decode$succeed(msg));
};
var $gren_lang$browser$Debugger$Main$toDragListeners = function (layout) {
	var _v0 = $gren_lang$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return [];
	} else {
		return [
			$gren_lang$browser$Debugger$Main$onMouseMove,
			$gren_lang$browser$Html$Events$onMouseUp($gren_lang$browser$Debugger$Main$DragEnd)
		];
	}
};
var $gren_lang$browser$Debugger$Main$toFlexDirection = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'row';
	} else {
		return 'column-reverse';
	}
};
var $gren_lang$browser$Debugger$Main$DragStart = {$: 'DragStart'};
var $gren_lang$browser$Html$Events$onMouseDown = function (msg) {
	return A2(
		$gren_lang$browser$Html$Events$on,
		'mousedown',
		$gren_lang$core$Json$Decode$succeed(msg));
};
var $gren_lang$core$String$fromFloat = _String_fromNumber;
var $gren_lang$core$Basics$mul = _Basics_mul;
var $gren_lang$browser$Debugger$Main$toPercent = function (fraction) {
	return $gren_lang$core$String$fromFloat(100 * fraction) + '%';
};
var $gren_lang$browser$Debugger$Main$viewDragZone = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return A2(
			$gren_lang$browser$Html$div,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'position', 'absolute'),
				A2($gren_lang$browser$Html$Attributes$style, 'top', '0'),
				A2(
				$gren_lang$browser$Html$Attributes$style,
				'left',
				$gren_lang$browser$Debugger$Main$toPercent(x)),
				A2($gren_lang$browser$Html$Attributes$style, 'margin-left', '-5px'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', '10px'),
				A2($gren_lang$browser$Html$Attributes$style, 'height', '100%'),
				A2($gren_lang$browser$Html$Attributes$style, 'cursor', 'col-resize'),
				$gren_lang$browser$Html$Events$onMouseDown($gren_lang$browser$Debugger$Main$DragStart)
			],
			[]);
	} else {
		var y = layout.c;
		return A2(
			$gren_lang$browser$Html$div,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'position', 'absolute'),
				A2(
				$gren_lang$browser$Html$Attributes$style,
				'top',
				$gren_lang$browser$Debugger$Main$toPercent(y)),
				A2($gren_lang$browser$Html$Attributes$style, 'left', '0'),
				A2($gren_lang$browser$Html$Attributes$style, 'margin-top', '-5px'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', '100%'),
				A2($gren_lang$browser$Html$Attributes$style, 'height', '10px'),
				A2($gren_lang$browser$Html$Attributes$style, 'cursor', 'row-resize'),
				$gren_lang$browser$Html$Events$onMouseDown($gren_lang$browser$Debugger$Main$DragStart)
			],
			[]);
	}
};
var $gren_lang$browser$Debugger$Main$TweakExpandoModel = function (a) {
	return {$: 'TweakExpandoModel', a: a};
};
var $gren_lang$browser$Debugger$Main$TweakExpandoMsg = function (a) {
	return {$: 'TweakExpandoMsg', a: a};
};
var $gren_lang$core$Basics$sub = _Basics_sub;
var $gren_lang$browser$Debugger$Main$toExpandoPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return {
			height: '100%',
			width: $gren_lang$browser$Debugger$Main$toPercent(1 - x)
		};
	} else {
		var y = layout.c;
		return {
			height: $gren_lang$browser$Debugger$Main$toPercent(y),
			width: '100%'
		};
	}
};
var $gren_lang$browser$Debugger$Main$toMouseBlocker = function (layout) {
	var _v0 = $gren_lang$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return 'auto';
	} else {
		return 'none';
	}
};
var $gren_lang$browser$Debugger$Expando$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $gren_lang$browser$Debugger$Expando$Index = F3(
	function (a, b, c) {
		return {$: 'Index', a: a, b: b, c: c};
	});
var $gren_lang$browser$Debugger$Expando$Key = {$: 'Key'};
var $gren_lang$browser$Debugger$Expando$None = {$: 'None'};
var $gren_lang$browser$Debugger$Expando$Toggle = {$: 'Toggle'};
var $gren_lang$browser$Debugger$Expando$Value = {$: 'Value'};
var $gren_lang$browser$Debugger$Expando$blue = A2($gren_lang$browser$Html$Attributes$style, 'color', 'rgb(28, 0, 207)');
var $gren_lang$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $gren_lang$browser$Debugger$Expando$leftPad = function (maybeKey) {
	if (maybeKey.$ === 'Nothing') {
		return [];
	} else {
		return [
			A2($gren_lang$browser$Html$Attributes$style, 'padding-left', '4ch')
		];
	}
};
var $gren_lang$browser$Debugger$Expando$makeArrow = function (arrow) {
	return A2(
		$gren_lang$browser$Html$span,
		[
			A2($gren_lang$browser$Html$Attributes$style, 'color', '#777'),
			A2($gren_lang$browser$Html$Attributes$style, 'padding-left', '2ch'),
			A2($gren_lang$browser$Html$Attributes$style, 'width', '2ch'),
			A2($gren_lang$browser$Html$Attributes$style, 'display', 'inline-block')
		],
		[
			$gren_lang$browser$Html$text(arrow)
		]);
};
var $gren_lang$browser$Debugger$Expando$purple = A2($gren_lang$browser$Html$Attributes$style, 'color', 'rgb(136, 19, 145)');
var $gren_lang$browser$Debugger$Expando$lineStarter = F3(
	function (maybeKey, maybeIsClosed, description) {
		var arrow = function () {
			if (maybeIsClosed.$ === 'Nothing') {
				return $gren_lang$browser$Debugger$Expando$makeArrow('');
			} else {
				if (maybeIsClosed.a) {
					return $gren_lang$browser$Debugger$Expando$makeArrow('▸');
				} else {
					return $gren_lang$browser$Debugger$Expando$makeArrow('▾');
				}
			}
		}();
		if (maybeKey.$ === 'Nothing') {
			return A2($gren_lang$core$Array$pushFirst, arrow, description);
		} else {
			var key = maybeKey.a;
			return _Utils_ap(
				[
					arrow,
					A2(
					$gren_lang$browser$Html$span,
					[$gren_lang$browser$Debugger$Expando$purple],
					[
						$gren_lang$browser$Html$text(key)
					]),
					$gren_lang$browser$Html$text(' = ')
				],
				description);
		}
	});
var $gren_lang$browser$Debugger$Expando$red = A2($gren_lang$browser$Html$Attributes$style, 'color', 'rgb(196, 26, 22)');
var $gren_lang$browser$Debugger$Expando$seqTypeToString = F2(
	function (n, seqType) {
		if (seqType.$ === 'SetSeq') {
			return 'Set(' + ($gren_lang$core$String$fromInt(n) + ')');
		} else {
			return 'Array(' + ($gren_lang$core$String$fromInt(n) + ')');
		}
	});
var $gren_lang$core$Basics$lt = _Utils_lt;
var $gren_lang$core$String$slice = _String_slice;
var $gren_lang$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($gren_lang$core$String$slice, 0, n, string);
	});
var $gren_lang$core$Basics$negate = function (n) {
	return -n;
};
var $gren_lang$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$gren_lang$core$String$slice,
			-n,
			$gren_lang$core$String$length(string),
			string);
	});
var $gren_lang$browser$Debugger$Expando$elideMiddle = function (str) {
	return ($gren_lang$core$String$length(str) <= 18) ? str : (A2($gren_lang$core$String$left, 8, str) + ('...' + A2($gren_lang$core$String$right, 8, str)));
};
var $gren_lang$core$Basics$gt = _Utils_gt;
var $gren_lang$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_gren_builtin') {
		return true;
	} else {
		return false;
	}
};
var $gren_lang$browser$Debugger$Expando$viewExtraTinyRecord = F3(
	function (length, starter, entries) {
		var _v0 = $gren_lang$core$Array$popFirst(entries);
		if (_v0.$ === 'Nothing') {
			return {
				index: length + 1,
				nodes: [
					$gren_lang$browser$Html$text('}')
				]
			};
		} else {
			var _v1 = _v0.a;
			var field = _v1.first;
			var rest = _v1.rest;
			var nextLength = (length + $gren_lang$core$String$length(field)) + 1;
			if (nextLength > 18) {
				return {
					index: length + 2,
					nodes: [
						$gren_lang$browser$Html$text('…}')
					]
				};
			} else {
				var _v2 = A3($gren_lang$browser$Debugger$Expando$viewExtraTinyRecord, nextLength, ',', rest);
				var finalLength = _v2.index;
				var otherHtmls = _v2.nodes;
				return {
					index: finalLength,
					nodes: _Utils_ap(
						[
							$gren_lang$browser$Html$text(starter),
							A2(
							$gren_lang$browser$Html$span,
							[$gren_lang$browser$Debugger$Expando$purple],
							[
								$gren_lang$browser$Html$text(field)
							])
						],
						otherHtmls)
				};
			}
		}
	});
var $gren_lang$browser$Debugger$Expando$viewTinyHelp = function (str) {
	return {
		index: $gren_lang$core$String$length(str),
		nodes: [
			$gren_lang$browser$Html$text(str)
		]
	};
};
var $gren_lang$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $gren_lang$browser$Debugger$Expando$viewExtraTiny = function (value) {
	if (value.$ === 'Record') {
		var record = value.b;
		return A3(
			$gren_lang$browser$Debugger$Expando$viewExtraTinyRecord,
			0,
			'{',
			$gren_lang$core$Dict$keys(record));
	} else {
		return $gren_lang$browser$Debugger$Expando$viewTiny(value);
	}
};
var $gren_lang$browser$Debugger$Expando$viewTiny = function (value) {
	switch (value.$) {
		case 'S':
			var stringRep = value.a;
			var str = $gren_lang$browser$Debugger$Expando$elideMiddle(stringRep);
			return {
				index: $gren_lang$core$String$length(str),
				nodes: [
					A2(
					$gren_lang$browser$Html$span,
					[$gren_lang$browser$Debugger$Expando$red],
					[
						$gren_lang$browser$Html$text(str)
					])
				]
			};
		case 'Primitive':
			var stringRep = value.a;
			return {
				index: $gren_lang$core$String$length(stringRep),
				nodes: [
					A2(
					$gren_lang$browser$Html$span,
					[$gren_lang$browser$Debugger$Expando$blue],
					[
						$gren_lang$browser$Html$text(stringRep)
					])
				]
			};
		case 'Sequence':
			var seqType = value.a;
			var valueArray = value.c;
			return $gren_lang$browser$Debugger$Expando$viewTinyHelp(
				A2(
					$gren_lang$browser$Debugger$Expando$seqTypeToString,
					$gren_lang$core$Array$length(valueArray),
					seqType));
		case 'Dictionary':
			var keyValuePairs = value.b;
			return $gren_lang$browser$Debugger$Expando$viewTinyHelp(
				'Dict(' + ($gren_lang$core$String$fromInt(
					$gren_lang$core$Array$length(keyValuePairs)) + ')'));
		case 'Record':
			var record = value.b;
			return $gren_lang$browser$Debugger$Expando$viewTinyRecord(record);
		default:
			if (value.c.length === 0) {
				var maybeName = value.a;
				return $gren_lang$browser$Debugger$Expando$viewTinyHelp(
					A2($gren_lang$core$Maybe$withDefault, '{}', maybeName));
			} else {
				var maybeName = value.a;
				var valueArray = value.c;
				return $gren_lang$browser$Debugger$Expando$viewTinyHelp(
					function () {
						if (maybeName.$ === 'Nothing') {
							return 'Tuple(' + ($gren_lang$core$String$fromInt(
								$gren_lang$core$Array$length(valueArray)) + ')');
						} else {
							var name = maybeName.a;
							return name + ' …';
						}
					}());
			}
	}
};
var $gren_lang$browser$Debugger$Expando$viewTinyRecord = function (record) {
	return $gren_lang$core$Dict$isEmpty(record) ? {
		index: 2,
		nodes: [
			$gren_lang$browser$Html$text('{}')
		]
	} : A3(
		$gren_lang$browser$Debugger$Expando$viewTinyRecordHelp,
		0,
		'{ ',
		$gren_lang$core$Dict$toArray(record));
};
var $gren_lang$browser$Debugger$Expando$viewTinyRecordHelp = F3(
	function (length, starter, entries) {
		var _v0 = $gren_lang$core$Array$popFirst(entries);
		if (_v0.$ === 'Nothing') {
			return {
				index: length + 2,
				nodes: [
					$gren_lang$browser$Html$text(' }')
				]
			};
		} else {
			var _v1 = _v0.a;
			var _v2 = _v1.first;
			var field = _v2.key;
			var value = _v2.value;
			var rest = _v1.rest;
			var fieldLen = $gren_lang$core$String$length(field);
			var _v3 = $gren_lang$browser$Debugger$Expando$viewExtraTiny(value);
			var valueLen = _v3.index;
			var valueHtmls = _v3.nodes;
			var newLength = ((length + fieldLen) + valueLen) + 5;
			if (newLength > 60) {
				return {
					index: length + 4,
					nodes: [
						$gren_lang$browser$Html$text(', … }')
					]
				};
			} else {
				var _v4 = A3($gren_lang$browser$Debugger$Expando$viewTinyRecordHelp, newLength, ', ', rest);
				var finalLength = _v4.index;
				var otherHtmls = _v4.nodes;
				return {
					index: finalLength,
					nodes: _Utils_ap(
						[
							$gren_lang$browser$Html$text(starter),
							A2(
							$gren_lang$browser$Html$span,
							[$gren_lang$browser$Debugger$Expando$purple],
							[
								$gren_lang$browser$Html$text(field)
							]),
							$gren_lang$browser$Html$text(' = '),
							A2(
							$gren_lang$browser$Html$span,
							[],
							valueHtmls)
						],
						otherHtmls)
				};
			}
		}
	});
var $gren_lang$browser$Debugger$Expando$view = F2(
	function (maybeKey, expando) {
		switch (expando.$) {
			case 'S':
				var stringRep = expando.a;
				return A2(
					$gren_lang$browser$Html$div,
					$gren_lang$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$gren_lang$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$gren_lang$core$Maybe$Nothing,
						[
							A2(
							$gren_lang$browser$Html$span,
							[$gren_lang$browser$Debugger$Expando$red],
							[
								$gren_lang$browser$Html$text(stringRep)
							])
						]));
			case 'Primitive':
				var stringRep = expando.a;
				return A2(
					$gren_lang$browser$Html$div,
					$gren_lang$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$gren_lang$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$gren_lang$core$Maybe$Nothing,
						[
							A2(
							$gren_lang$browser$Html$span,
							[$gren_lang$browser$Debugger$Expando$blue],
							[
								$gren_lang$browser$Html$text(stringRep)
							])
						]));
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var valueArray = expando.c;
				return A4($gren_lang$browser$Debugger$Expando$viewSequence, maybeKey, seqType, isClosed, valueArray);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return A3($gren_lang$browser$Debugger$Expando$viewDictionary, maybeKey, isClosed, keyValuePairs);
			case 'Record':
				var isClosed = expando.a;
				var valueDict = expando.b;
				return A3($gren_lang$browser$Debugger$Expando$viewRecord, maybeKey, isClosed, valueDict);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var valueArray = expando.c;
				return A4($gren_lang$browser$Debugger$Expando$viewConstructor, maybeKey, maybeName, isClosed, valueArray);
		}
	});
var $gren_lang$browser$Debugger$Expando$viewConstructor = F4(
	function (maybeKey, maybeName, isClosed, valueArray) {
		var tinyArgs = A2(
			$gren_lang$core$Array$map,
			A2(
				$gren_lang$core$Basics$composeL,
				function ($) {
					return $.nodes;
				},
				$gren_lang$browser$Debugger$Expando$viewExtraTiny),
			valueArray);
		var description = function () {
			var _v7 = {
				maybeName: maybeName,
				vals: $gren_lang$core$Array$popFirst(tinyArgs)
			};
			if (_v7.maybeName.$ === 'Nothing') {
				if (_v7.vals.$ === 'Nothing') {
					var _v8 = _v7.maybeName;
					var _v9 = _v7.vals;
					return [
						$gren_lang$browser$Html$text('()')
					];
				} else {
					var _v10 = _v7.maybeName;
					var _v11 = _v7.vals.a;
					var x = _v11.first;
					var xs = _v11.rest;
					return _Utils_ap(
						[
							$gren_lang$browser$Html$text('( '),
							A2(
							$gren_lang$browser$Html$span,
							[],
							x)
						],
						A3(
							$gren_lang$core$Array$foldr,
							F2(
								function (args, rest) {
									return _Utils_ap(
										[
											$gren_lang$browser$Html$text(', '),
											A2(
											$gren_lang$browser$Html$span,
											[],
											args)
										],
										rest);
								}),
							[
								$gren_lang$browser$Html$text(' )')
							],
							xs));
				}
			} else {
				if (_v7.vals.$ === 'Nothing') {
					var name = _v7.maybeName.a;
					var _v12 = _v7.vals;
					return [
						$gren_lang$browser$Html$text(name)
					];
				} else {
					var name = _v7.maybeName.a;
					var _v13 = _v7.vals.a;
					var x = _v13.first;
					var xs = _v13.rest;
					return _Utils_ap(
						[
							$gren_lang$browser$Html$text(name + ' '),
							A2(
							$gren_lang$browser$Html$span,
							[],
							x)
						],
						A3(
							$gren_lang$core$Array$foldr,
							F2(
								function (args, rest) {
									return _Utils_ap(
										[
											$gren_lang$browser$Html$text(' '),
											A2(
											$gren_lang$browser$Html$span,
											[],
											args)
										],
										rest);
								}),
							[],
							xs));
				}
			}
		}();
		var _v4 = function () {
			switch (valueArray.length) {
				case 0:
					return {
						maybeIsClosed: $gren_lang$core$Maybe$Nothing,
						openHtml: A2(
							$gren_lang$browser$Html$div,
							[],
							[])
					};
				case 1:
					var entry = valueArray[0];
					switch (entry.$) {
						case 'S':
							return {
								maybeIsClosed: $gren_lang$core$Maybe$Nothing,
								openHtml: A2(
									$gren_lang$browser$Html$div,
									[],
									[])
							};
						case 'Primitive':
							return {
								maybeIsClosed: $gren_lang$core$Maybe$Nothing,
								openHtml: A2(
									$gren_lang$browser$Html$div,
									[],
									[])
							};
						case 'Sequence':
							var subValueArray = entry.c;
							return {
								maybeIsClosed: $gren_lang$core$Maybe$Just(isClosed),
								openHtml: isClosed ? A2(
									$gren_lang$browser$Html$div,
									[],
									[]) : A2(
									$gren_lang$browser$Html$map,
									A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$None, 0),
									$gren_lang$browser$Debugger$Expando$viewSequenceOpen(subValueArray))
							};
						case 'Dictionary':
							var keyValuePairs = entry.b;
							return {
								maybeIsClosed: $gren_lang$core$Maybe$Just(isClosed),
								openHtml: isClosed ? A2(
									$gren_lang$browser$Html$div,
									[],
									[]) : A2(
									$gren_lang$browser$Html$map,
									A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$None, 0),
									$gren_lang$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs))
							};
						case 'Record':
							var record = entry.b;
							return {
								maybeIsClosed: $gren_lang$core$Maybe$Just(isClosed),
								openHtml: isClosed ? A2(
									$gren_lang$browser$Html$div,
									[],
									[]) : A2(
									$gren_lang$browser$Html$map,
									A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$None, 0),
									$gren_lang$browser$Debugger$Expando$viewRecordOpen(record))
							};
						default:
							var subValueArray = entry.c;
							return {
								maybeIsClosed: $gren_lang$core$Maybe$Just(isClosed),
								openHtml: isClosed ? A2(
									$gren_lang$browser$Html$div,
									[],
									[]) : A2(
									$gren_lang$browser$Html$map,
									A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$None, 0),
									$gren_lang$browser$Debugger$Expando$viewConstructorOpen(subValueArray))
							};
					}
				default:
					return {
						maybeIsClosed: $gren_lang$core$Maybe$Just(isClosed),
						openHtml: isClosed ? A2(
							$gren_lang$browser$Html$div,
							[],
							[]) : $gren_lang$browser$Debugger$Expando$viewConstructorOpen(valueArray)
					};
			}
		}();
		var maybeIsClosed = _v4.maybeIsClosed;
		var openHtml = _v4.openHtml;
		return A2(
			$gren_lang$browser$Html$div,
			$gren_lang$browser$Debugger$Expando$leftPad(maybeKey),
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Events$onClick($gren_lang$browser$Debugger$Expando$Toggle)
				],
				A3($gren_lang$browser$Debugger$Expando$lineStarter, maybeKey, maybeIsClosed, description)),
				openHtml
			]);
	});
var $gren_lang$browser$Debugger$Expando$viewConstructorEntry = F2(
	function (index, value) {
		return A2(
			$gren_lang$browser$Html$map,
			A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$None, index),
			A2(
				$gren_lang$browser$Debugger$Expando$view,
				$gren_lang$core$Maybe$Just(
					$gren_lang$core$String$fromInt(index)),
				value));
	});
var $gren_lang$browser$Debugger$Expando$viewConstructorOpen = function (valueArray) {
	return A2(
		$gren_lang$browser$Html$div,
		[],
		A2($gren_lang$core$Array$indexedMap, $gren_lang$browser$Debugger$Expando$viewConstructorEntry, valueArray));
};
var $gren_lang$browser$Debugger$Expando$viewDictionary = F3(
	function (maybeKey, isClosed, keyValuePairs) {
		var starter = 'Dict(' + ($gren_lang$core$String$fromInt(
			$gren_lang$core$Array$length(keyValuePairs)) + ')');
		return A2(
			$gren_lang$browser$Html$div,
			$gren_lang$browser$Debugger$Expando$leftPad(maybeKey),
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Events$onClick($gren_lang$browser$Debugger$Expando$Toggle)
				],
				A3(
					$gren_lang$browser$Debugger$Expando$lineStarter,
					maybeKey,
					$gren_lang$core$Maybe$Just(isClosed),
					[
						$gren_lang$browser$Html$text(starter)
					])),
				isClosed ? $gren_lang$browser$Html$text('') : $gren_lang$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)
			]);
	});
var $gren_lang$browser$Debugger$Expando$viewDictionaryEntry = F2(
	function (index, _v2) {
		var key = _v2.key;
		var value = _v2.value;
		switch (key.$) {
			case 'S':
				var stringRep = key.a;
				return A2(
					$gren_lang$browser$Html$map,
					A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$Value, index),
					A2(
						$gren_lang$browser$Debugger$Expando$view,
						$gren_lang$core$Maybe$Just(stringRep),
						value));
			case 'Primitive':
				var stringRep = key.a;
				return A2(
					$gren_lang$browser$Html$map,
					A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$Value, index),
					A2(
						$gren_lang$browser$Debugger$Expando$view,
						$gren_lang$core$Maybe$Just(stringRep),
						value));
			default:
				return A2(
					$gren_lang$browser$Html$div,
					[],
					[
						A2(
						$gren_lang$browser$Html$map,
						A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$Key, index),
						A2(
							$gren_lang$browser$Debugger$Expando$view,
							$gren_lang$core$Maybe$Just('key'),
							key)),
						A2(
						$gren_lang$browser$Html$map,
						A2($gren_lang$browser$Debugger$Expando$Index, $gren_lang$browser$Debugger$Expando$Value, index),
						A2(
							$gren_lang$browser$Debugger$Expando$view,
							$gren_lang$core$Maybe$Just('value'),
							value))
					]);
		}
	});
var $gren_lang$browser$Debugger$Expando$viewDictionaryOpen = function (keyValuePairs) {
	return A2(
		$gren_lang$browser$Html$div,
		[],
		A2($gren_lang$core$Array$indexedMap, $gren_lang$browser$Debugger$Expando$viewDictionaryEntry, keyValuePairs));
};
var $gren_lang$browser$Debugger$Expando$viewRecord = F3(
	function (maybeKey, isClosed, record) {
		var _v1 = isClosed ? {
			end: $gren_lang$browser$Html$text(''),
			middle: $gren_lang$browser$Html$text(''),
			start: function ($) {
				return $.nodes;
			}(
				$gren_lang$browser$Debugger$Expando$viewTinyRecord(record))
		} : {
			end: A2(
				$gren_lang$browser$Html$div,
				$gren_lang$browser$Debugger$Expando$leftPad(
					$gren_lang$core$Maybe$Just(
						{})),
				[
					$gren_lang$browser$Html$text('}')
				]),
			middle: $gren_lang$browser$Debugger$Expando$viewRecordOpen(record),
			start: [
				$gren_lang$browser$Html$text('{')
			]
		};
		var start = _v1.start;
		var middle = _v1.middle;
		var end = _v1.end;
		return A2(
			$gren_lang$browser$Html$div,
			$gren_lang$browser$Debugger$Expando$leftPad(maybeKey),
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Events$onClick($gren_lang$browser$Debugger$Expando$Toggle)
				],
				A3(
					$gren_lang$browser$Debugger$Expando$lineStarter,
					maybeKey,
					$gren_lang$core$Maybe$Just(isClosed),
					start)),
				middle,
				end
			]);
	});
var $gren_lang$browser$Debugger$Expando$viewRecordEntry = function (_v0) {
	var field = _v0.key;
	var value = _v0.value;
	return A2(
		$gren_lang$browser$Html$map,
		$gren_lang$browser$Debugger$Expando$Field(field),
		A2(
			$gren_lang$browser$Debugger$Expando$view,
			$gren_lang$core$Maybe$Just(field),
			value));
};
var $gren_lang$browser$Debugger$Expando$viewRecordOpen = function (record) {
	return A2(
		$gren_lang$browser$Html$div,
		[],
		A2(
			$gren_lang$core$Array$map,
			$gren_lang$browser$Debugger$Expando$viewRecordEntry,
			$gren_lang$core$Dict$toArray(record)));
};
var $gren_lang$browser$Debugger$Expando$viewSequence = F4(
	function (maybeKey, seqType, isClosed, valueArray) {
		var starter = A2(
			$gren_lang$browser$Debugger$Expando$seqTypeToString,
			$gren_lang$core$Array$length(valueArray),
			seqType);
		return A2(
			$gren_lang$browser$Html$div,
			$gren_lang$browser$Debugger$Expando$leftPad(maybeKey),
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Events$onClick($gren_lang$browser$Debugger$Expando$Toggle)
				],
				A3(
					$gren_lang$browser$Debugger$Expando$lineStarter,
					maybeKey,
					$gren_lang$core$Maybe$Just(isClosed),
					[
						$gren_lang$browser$Html$text(starter)
					])),
				isClosed ? $gren_lang$browser$Html$text('') : $gren_lang$browser$Debugger$Expando$viewSequenceOpen(valueArray)
			]);
	});
var $gren_lang$browser$Debugger$Expando$viewSequenceOpen = function (values) {
	return A2(
		$gren_lang$browser$Html$div,
		[],
		A2($gren_lang$core$Array$indexedMap, $gren_lang$browser$Debugger$Expando$viewConstructorEntry, values));
};
var $gren_lang$browser$Debugger$Main$viewExpando = F3(
	function (expandoMsg, expandoModel, layout) {
		var block = $gren_lang$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $gren_lang$browser$Debugger$Main$toExpandoPercents(layout);
		var w = _v0.width;
		var h = _v0.height;
		return A2(
			$gren_lang$browser$Html$div,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'display', 'block'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', 'calc(' + (w + ' - 4em)')),
				A2($gren_lang$browser$Html$Attributes$style, 'height', 'calc(' + (h + ' - 4em)')),
				A2($gren_lang$browser$Html$Attributes$style, 'padding', '2em'),
				A2($gren_lang$browser$Html$Attributes$style, 'margin', '0'),
				A2($gren_lang$browser$Html$Attributes$style, 'overflow', 'auto'),
				A2($gren_lang$browser$Html$Attributes$style, 'pointer-events', block),
				A2($gren_lang$browser$Html$Attributes$style, '-webkit-user-select', block),
				A2($gren_lang$browser$Html$Attributes$style, '-moz-user-select', block),
				A2($gren_lang$browser$Html$Attributes$style, '-ms-user-select', block),
				A2($gren_lang$browser$Html$Attributes$style, 'user-select', block)
			],
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					A2($gren_lang$browser$Html$Attributes$style, 'color', '#ccc'),
					A2($gren_lang$browser$Html$Attributes$style, 'padding', '0 0 1em 0')
				],
				[
					$gren_lang$browser$Html$text('-- MESSAGE')
				]),
				A2(
				$gren_lang$browser$Html$map,
				$gren_lang$browser$Debugger$Main$TweakExpandoMsg,
				A2($gren_lang$browser$Debugger$Expando$view, $gren_lang$core$Maybe$Nothing, expandoMsg)),
				A2(
				$gren_lang$browser$Html$div,
				[
					A2($gren_lang$browser$Html$Attributes$style, 'color', '#ccc'),
					A2($gren_lang$browser$Html$Attributes$style, 'padding', '1em 0')
				],
				[
					$gren_lang$browser$Html$text('-- MODEL')
				]),
				A2(
				$gren_lang$browser$Html$map,
				$gren_lang$browser$Debugger$Main$TweakExpandoModel,
				A2($gren_lang$browser$Debugger$Expando$view, $gren_lang$core$Maybe$Nothing, expandoModel))
			]);
	});
var $gren_lang$browser$Debugger$Main$Jump = function (a) {
	return {$: 'Jump', a: a};
};
var $gren_lang$browser$VirtualDom$lazy = _VirtualDom_lazy;
var $gren_lang$browser$Html$Lazy$lazy = $gren_lang$browser$VirtualDom$lazy;
var $gren_lang$browser$Debugger$Main$toHistoryPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return {
			height: '100%',
			width: $gren_lang$browser$Debugger$Main$toPercent(x)
		};
	} else {
		var y = layout.c;
		return {
			height: $gren_lang$browser$Debugger$Main$toPercent(1 - y),
			width: '100%'
		};
	}
};
var $gren_lang$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $gren_lang$browser$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $gren_lang$browser$Html$Lazy$lazy3 = $gren_lang$browser$VirtualDom$lazy3;
var $gren_lang$browser$Html$Attributes$class = $gren_lang$browser$Html$Attributes$stringProperty('className');
var $gren_lang$browser$Debugger$History$idForMessageIndex = function (index) {
	return 'msg-' + $gren_lang$core$String$fromInt(index);
};
var $gren_lang$browser$Html$Attributes$title = $gren_lang$browser$Html$Attributes$stringProperty('title');
var $gren_lang$browser$Debugger$History$viewMessage = F3(
	function (currentIndex, index, msg) {
		var messageName = _Debugger_messageToString(msg);
		var className = _Utils_eq(currentIndex, index) ? 'elm-debugger-entry elm-debugger-entry-selected' : 'elm-debugger-entry';
		return A2(
			$gren_lang$browser$Html$div,
			[
				$gren_lang$browser$Html$Attributes$id(
				$gren_lang$browser$Debugger$History$idForMessageIndex(index)),
				$gren_lang$browser$Html$Attributes$class(className),
				$gren_lang$browser$Html$Events$onClick(index)
			],
			[
				A2(
				$gren_lang$browser$Html$span,
				[
					$gren_lang$browser$Html$Attributes$title(messageName),
					$gren_lang$browser$Html$Attributes$class('elm-debugger-entry-content')
				],
				[
					$gren_lang$browser$Html$text(messageName)
				]),
				A2(
				$gren_lang$browser$Html$span,
				[
					$gren_lang$browser$Html$Attributes$class('elm-debugger-entry-index')
				],
				[
					$gren_lang$browser$Html$text(
					$gren_lang$core$String$fromInt(index))
				])
			]);
	});
var $gren_lang$browser$Debugger$History$consMsg = F3(
	function (currentIndex, msg, _v0) {
		var index = _v0.index;
		var nodes = _v0.nodes;
		return {
			index: index + 1,
			nodes: A2(
				$gren_lang$core$Array$pushFirst,
				{
					key: $gren_lang$core$String$fromInt(index),
					node: A4($gren_lang$browser$Html$Lazy$lazy3, $gren_lang$browser$Debugger$History$viewMessage, currentIndex, index, msg)
				},
				nodes)
		};
	});
var $gren_lang$core$Basics$neq = _Utils_notEqual;
var $gren_lang$browser$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $gren_lang$browser$Html$Keyed$node = $gren_lang$browser$VirtualDom$keyedNode;
var $gren_lang$browser$Debugger$History$maxSnapshotSize = 31;
var $gren_lang$browser$Debugger$History$showMoreButton = function (numMessages) {
	var nextIndex = (numMessages - 1) - ($gren_lang$browser$Debugger$History$maxSnapshotSize * 2);
	var labelText = 'View more messages';
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('elm-debugger-entry'),
			$gren_lang$browser$Html$Events$onClick(nextIndex)
		],
		[
			A2(
			$gren_lang$browser$Html$span,
			[
				$gren_lang$browser$Html$Attributes$title(labelText),
				$gren_lang$browser$Html$Attributes$class('elm-debugger-entry-content')
			],
			[
				$gren_lang$browser$Html$text(labelText)
			]),
			A2(
			$gren_lang$browser$Html$span,
			[
				$gren_lang$browser$Html$Attributes$class('elm-debugger-entry-index')
			],
			[])
		]);
};
var $gren_lang$browser$Debugger$History$styles = A3(
	$gren_lang$browser$Html$node,
	'style',
	[],
	[
		$gren_lang$browser$Html$text('\n.elm-debugger-entry {\n  cursor: pointer;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px;\n}\n\n.elm-debugger-entry:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n.elm-debugger-entry-selected, .elm-debugger-entry-selected:hover {\n  background-color: rgb(10, 10, 10);\n}\n\n.elm-debugger-entry-content {\n  width: calc(100% - 40px);\n  padding: 0 5px;\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.elm-debugger-entry-index {\n  color: #666;\n  width: 40px;\n  text-align: right;\n  display: block;\n  float: right;\n}\n')
	]);
var $gren_lang$core$Basics$ge = _Utils_ge;
var $gren_lang$browser$Debugger$History$viewSnapshot = F3(
	function (selectedIndex, index, _v0) {
		var messages = _v0.messages;
		return A3(
			$gren_lang$browser$Html$Keyed$node,
			'div',
			[],
			A3(
				$gren_lang$core$Array$foldr,
				$gren_lang$browser$Debugger$History$consMsg(selectedIndex),
				{
					index: index,
					nodes: []
				},
				messages).nodes);
	});
var $gren_lang$browser$Debugger$History$consSnapshot = F3(
	function (selectedIndex, snapshot, _v0) {
		var index = _v0.index;
		var rest = _v0.nodes;
		var nextIndex = index + $gren_lang$core$Array$length(snapshot.messages);
		var selectedIndexHelp = ((_Utils_cmp(nextIndex, selectedIndex) > 0) && (_Utils_cmp(selectedIndex, index) > -1)) ? selectedIndex : (-1);
		return {
			index: nextIndex,
			nodes: A2(
				$gren_lang$core$Array$pushFirst,
				A4($gren_lang$browser$Html$Lazy$lazy3, $gren_lang$browser$Debugger$History$viewSnapshot, selectedIndexHelp, index, snapshot),
				rest)
		};
	});
var $gren_lang$core$Array$foldl = _Array_foldl;
var $gren_lang$browser$Debugger$History$viewAllSnapshots = F3(
	function (selectedIndex, startIndex, snapshots) {
		return A2(
			$gren_lang$browser$Html$div,
			[],
			A3(
				$gren_lang$core$Array$foldl,
				$gren_lang$browser$Debugger$History$consSnapshot(selectedIndex),
				{
					index: startIndex,
					nodes: []
				},
				snapshots).nodes);
	});
var $gren_lang$browser$Debugger$History$viewRecentSnapshots = F3(
	function (selectedIndex, recentMessagesNum, snapshots) {
		var messagesToFill = $gren_lang$browser$Debugger$History$maxSnapshotSize - recentMessagesNum;
		var arrayLength = $gren_lang$core$Array$length(snapshots);
		var snapshotsToRender = function () {
			var _v0 = {
				fst: A2($gren_lang$core$Array$get, arrayLength - 2, snapshots),
				snd: A2($gren_lang$core$Array$get, arrayLength - 1, snapshots)
			};
			if ((_v0.fst.$ === 'Just') && (_v0.snd.$ === 'Just')) {
				var fillerSnapshot = _v0.fst.a;
				var recentSnapshot = _v0.snd.a;
				return [
					{
					messages: A3($gren_lang$core$Array$slice, 0, messagesToFill, fillerSnapshot.messages),
					model: fillerSnapshot.model
				},
					recentSnapshot
				];
			} else {
				return snapshots;
			}
		}();
		var startingIndex = ((arrayLength * $gren_lang$browser$Debugger$History$maxSnapshotSize) - $gren_lang$browser$Debugger$History$maxSnapshotSize) - messagesToFill;
		return A3($gren_lang$browser$Debugger$History$viewAllSnapshots, selectedIndex, startingIndex, snapshotsToRender);
	});
var $gren_lang$browser$Debugger$History$view = F2(
	function (maybeIndex, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var recentMessageStartIndex = numMessages - recent.numMessages;
		var index = A2($gren_lang$core$Maybe$withDefault, -1, maybeIndex);
		var newStuff = A3(
			$gren_lang$browser$Html$Keyed$node,
			'div',
			[],
			A3(
				$gren_lang$core$Array$foldr,
				$gren_lang$browser$Debugger$History$consMsg(index),
				{
					index: recentMessageStartIndex,
					nodes: []
				},
				recent.messages).nodes);
		var onlyRenderRecentMessages = (!_Utils_eq(index, -1)) || ($gren_lang$core$Array$length(snapshots) < 2);
		var oldStuff = onlyRenderRecentMessages ? A4($gren_lang$browser$Html$Lazy$lazy3, $gren_lang$browser$Debugger$History$viewAllSnapshots, index, 0, snapshots) : A4($gren_lang$browser$Html$Lazy$lazy3, $gren_lang$browser$Debugger$History$viewRecentSnapshots, index, recent.numMessages, snapshots);
		return A2(
			$gren_lang$browser$Html$div,
			[
				$gren_lang$browser$Html$Attributes$id('elm-debugger-sidebar'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', '100%'),
				A2($gren_lang$browser$Html$Attributes$style, 'overflow-y', 'auto'),
				A2($gren_lang$browser$Html$Attributes$style, 'height', 'calc(100% - 72px)')
			],
			_Utils_ap(
				[$gren_lang$browser$Debugger$History$styles, newStuff, oldStuff],
				onlyRenderRecentMessages ? [] : [
					$gren_lang$browser$Debugger$History$showMoreButton(numMessages)
				]));
	});
var $gren_lang$browser$Debugger$Main$SwapLayout = {$: 'SwapLayout'};
var $gren_lang$browser$Debugger$Main$toHistoryIcon = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M13 3h-10a1 1 0 0 0-1 1v5h12v-5a1 1 0 0 0-1-1z M14 10h-12v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1z';
	} else {
		return 'M0 4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3z M2 4v8a1 1 0 0 0 1 1h2v-10h-2a1 1 0 0 0-1 1z M6 3v10h7a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1z';
	}
};
var $gren_lang$browser$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $gren_lang$browser$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $gren_lang$browser$Debugger$Main$icon = function (path) {
	return A4(
		$gren_lang$browser$VirtualDom$nodeNS,
		'http://www.w3.org/2000/svg',
		'svg',
		[
			A2($gren_lang$browser$VirtualDom$attribute, 'viewBox', '0 0 16 16'),
			A2($gren_lang$browser$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
			A2($gren_lang$browser$VirtualDom$attribute, 'fill', 'currentColor'),
			A2($gren_lang$browser$VirtualDom$attribute, 'width', '16px'),
			A2($gren_lang$browser$VirtualDom$attribute, 'height', '16px')
		],
		[
			A4(
			$gren_lang$browser$VirtualDom$nodeNS,
			'http://www.w3.org/2000/svg',
			'path',
			[
				A2($gren_lang$browser$VirtualDom$attribute, 'd', path)
			],
			[])
		]);
};
var $gren_lang$browser$Debugger$Main$viewHistoryButton = F3(
	function (label, msg, path) {
		return A2(
			$gren_lang$browser$Html$button,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
				A2($gren_lang$browser$Html$Attributes$style, 'flex-direction', 'row'),
				A2($gren_lang$browser$Html$Attributes$style, 'align-items', 'center'),
				A2($gren_lang$browser$Html$Attributes$style, 'background', 'none'),
				A2($gren_lang$browser$Html$Attributes$style, 'border', 'none'),
				A2($gren_lang$browser$Html$Attributes$style, 'color', 'inherit'),
				A2($gren_lang$browser$Html$Attributes$style, 'cursor', 'pointer'),
				$gren_lang$browser$Html$Events$onClick(msg)
			],
			[
				$gren_lang$browser$Debugger$Main$icon(path),
				A2(
				$gren_lang$browser$Html$span,
				[
					A2($gren_lang$browser$Html$Attributes$style, 'padding-left', '6px')
				],
				[
					$gren_lang$browser$Html$text(label)
				])
			]);
	});
var $gren_lang$browser$Debugger$Main$viewHistoryOptions = function (layout) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			A2($gren_lang$browser$Html$Attributes$style, 'width', '100%'),
			A2($gren_lang$browser$Html$Attributes$style, 'height', '36px'),
			A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
			A2($gren_lang$browser$Html$Attributes$style, 'flex-direction', 'row'),
			A2($gren_lang$browser$Html$Attributes$style, 'align-items', 'center'),
			A2($gren_lang$browser$Html$Attributes$style, 'justify-content', 'space-between'),
			A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
		],
		[
			A3(
			$gren_lang$browser$Debugger$Main$viewHistoryButton,
			'Swap Layout',
			$gren_lang$browser$Debugger$Main$SwapLayout,
			$gren_lang$browser$Debugger$Main$toHistoryIcon(layout)),
			A2(
			$gren_lang$browser$Html$div,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
				A2($gren_lang$browser$Html$Attributes$style, 'flex-direction', 'row'),
				A2($gren_lang$browser$Html$Attributes$style, 'align-items', 'center'),
				A2($gren_lang$browser$Html$Attributes$style, 'justify-content', 'space-between')
			],
			[
				A3($gren_lang$browser$Debugger$Main$viewHistoryButton, 'Import', $gren_lang$browser$Debugger$Main$Import, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M10 2a1 1 0 0 0 -2 0v6a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2h-3.586l4.293-4.293a1 1 0 0 0-1.414-1.414l-4.293 4.293z'),
				A3($gren_lang$browser$Debugger$Main$viewHistoryButton, 'Export', $gren_lang$browser$Debugger$Main$Export, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1 a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M9 3a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-3.586l-5.293 5.293 a1 1 0 0 1-1.414-1.414l5.293 -5.293z')
			])
		]);
};
var $gren_lang$browser$Debugger$Main$SliderJump = function (a) {
	return {$: 'SliderJump', a: a};
};
var $gren_lang$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $gren_lang$browser$Html$input = $gren_lang$browser$Html$node('input');
var $gren_lang$browser$Debugger$Main$isPlaying = function (maybeIndex) {
	if (maybeIndex.$ === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var $gren_lang$browser$Html$Attributes$max = $gren_lang$browser$Html$Attributes$stringProperty('max');
var $gren_lang$browser$Html$Attributes$min = $gren_lang$browser$Html$Attributes$stringProperty('min');
var $gren_lang$browser$Html$Events$alwaysStop = function (msg) {
	return {message: msg, stopPropagation: true};
};
var $gren_lang$browser$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $gren_lang$browser$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$gren_lang$browser$VirtualDom$on,
			event,
			$gren_lang$browser$VirtualDom$MayStopPropagation(decoder));
	});
var $gren_lang$core$Json$Decode$string = _Json_decodeString;
var $gren_lang$browser$Html$Events$targetValue = A2(
	$gren_lang$core$Json$Decode$at,
	['target', 'value'],
	$gren_lang$core$Json$Decode$string);
var $gren_lang$browser$Html$Events$onInput = function (tagger) {
	return A2(
		$gren_lang$browser$Html$Events$stopPropagationOn,
		'input',
		A2(
			$gren_lang$core$Json$Decode$map,
			$gren_lang$browser$Html$Events$alwaysStop,
			A2($gren_lang$core$Json$Decode$map, tagger, $gren_lang$browser$Html$Events$targetValue)));
};
var $gren_lang$core$String$toInt = _String_toInt;
var $gren_lang$browser$Html$Attributes$type_ = $gren_lang$browser$Html$Attributes$stringProperty('type');
var $gren_lang$browser$Html$Attributes$value = $gren_lang$browser$Html$Attributes$stringProperty('value');
var $gren_lang$browser$Debugger$Main$viewPlayButton = function (playing) {
	return A2(
		$gren_lang$browser$Html$button,
		[
			A2($gren_lang$browser$Html$Attributes$style, 'background', '#1293D8'),
			A2($gren_lang$browser$Html$Attributes$style, 'border', 'none'),
			A2($gren_lang$browser$Html$Attributes$style, 'color', 'white'),
			A2($gren_lang$browser$Html$Attributes$style, 'cursor', 'pointer'),
			A2($gren_lang$browser$Html$Attributes$style, 'width', '36px'),
			A2($gren_lang$browser$Html$Attributes$style, 'height', '36px'),
			$gren_lang$browser$Html$Events$onClick($gren_lang$browser$Debugger$Main$Resume)
		],
		[
			playing ? $gren_lang$browser$Debugger$Main$icon('M2 2h4v12h-4v-12z M10 2h4v12h-4v-12z') : $gren_lang$browser$Debugger$Main$icon('M2 2l12 7l-12 7z')
		]);
};
var $gren_lang$browser$Debugger$Main$viewHistorySlider = F2(
	function (history, maybeIndex) {
		var lastIndex = $gren_lang$browser$Debugger$History$size(history) - 1;
		var selectedIndex = A2($gren_lang$core$Maybe$withDefault, lastIndex, maybeIndex);
		return A2(
			$gren_lang$browser$Html$div,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
				A2($gren_lang$browser$Html$Attributes$style, 'flex-direction', 'row'),
				A2($gren_lang$browser$Html$Attributes$style, 'align-items', 'center'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', '100%'),
				A2($gren_lang$browser$Html$Attributes$style, 'height', '36px'),
				A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			],
			[
				A2(
				$gren_lang$browser$Html$Lazy$lazy,
				$gren_lang$browser$Debugger$Main$viewPlayButton,
				$gren_lang$browser$Debugger$Main$isPlaying(maybeIndex)),
				A2(
				$gren_lang$browser$Html$input,
				[
					$gren_lang$browser$Html$Attributes$type_('range'),
					A2($gren_lang$browser$Html$Attributes$style, 'width', 'calc(100% - 56px)'),
					A2($gren_lang$browser$Html$Attributes$style, 'height', '36px'),
					A2($gren_lang$browser$Html$Attributes$style, 'margin', '0 10px'),
					$gren_lang$browser$Html$Attributes$min('0'),
					$gren_lang$browser$Html$Attributes$max(
					$gren_lang$core$String$fromInt(lastIndex)),
					$gren_lang$browser$Html$Attributes$value(
					$gren_lang$core$String$fromInt(selectedIndex)),
					$gren_lang$browser$Html$Events$onInput(
					A2(
						$gren_lang$core$Basics$composeR,
						$gren_lang$core$String$toInt,
						A2(
							$gren_lang$core$Basics$composeR,
							$gren_lang$core$Maybe$withDefault(lastIndex),
							$gren_lang$browser$Debugger$Main$SliderJump)))
				],
				[])
			]);
	});
var $gren_lang$browser$Debugger$Main$viewHistory = F3(
	function (maybeIndex, history, layout) {
		var block = $gren_lang$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $gren_lang$browser$Debugger$Main$toHistoryPercents(layout);
		var w = _v0.width;
		var h = _v0.height;
		return A2(
			$gren_lang$browser$Html$div,
			[
				A2($gren_lang$browser$Html$Attributes$style, 'width', w),
				A2($gren_lang$browser$Html$Attributes$style, 'height', h),
				A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
				A2($gren_lang$browser$Html$Attributes$style, 'flex-direction', 'column'),
				A2($gren_lang$browser$Html$Attributes$style, 'color', '#DDDDDD'),
				A2($gren_lang$browser$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)'),
				A2($gren_lang$browser$Html$Attributes$style, 'pointer-events', block),
				A2($gren_lang$browser$Html$Attributes$style, 'user-select', block)
			],
			[
				A2($gren_lang$browser$Debugger$Main$viewHistorySlider, history, maybeIndex),
				A2(
				$gren_lang$browser$Html$map,
				$gren_lang$browser$Debugger$Main$Jump,
				A2($gren_lang$browser$Debugger$History$view, maybeIndex, history)),
				A2($gren_lang$browser$Html$Lazy$lazy, $gren_lang$browser$Debugger$Main$viewHistoryOptions, layout)
			]);
	});
var $gren_lang$browser$Debugger$Main$popoutView = function (model) {
	var maybeIndex = function () {
		var _v0 = model.state;
		if (_v0.$ === 'Running') {
			return $gren_lang$core$Maybe$Nothing;
		} else {
			var index = _v0.a;
			return $gren_lang$core$Maybe$Just(index);
		}
	}();
	var historyToRender = $gren_lang$browser$Debugger$Main$cachedHistory(model);
	return A3(
		$gren_lang$browser$Html$node,
		'body',
		_Utils_ap(
			$gren_lang$browser$Debugger$Main$toDragListeners(model.layout),
			[
				A2($gren_lang$browser$Html$Attributes$style, 'margin', '0'),
				A2($gren_lang$browser$Html$Attributes$style, 'padding', '0'),
				A2($gren_lang$browser$Html$Attributes$style, 'width', '100%'),
				A2($gren_lang$browser$Html$Attributes$style, 'height', '100%'),
				A2($gren_lang$browser$Html$Attributes$style, 'font-family', 'monospace'),
				A2($gren_lang$browser$Html$Attributes$style, 'display', 'flex'),
				A2(
				$gren_lang$browser$Html$Attributes$style,
				'flex-direction',
				$gren_lang$browser$Debugger$Main$toFlexDirection(model.layout))
			]),
		[
			A3($gren_lang$browser$Debugger$Main$viewHistory, maybeIndex, historyToRender, model.layout),
			$gren_lang$browser$Debugger$Main$viewDragZone(model.layout),
			A3($gren_lang$browser$Debugger$Main$viewExpando, model.expandoMsg, model.expandoModel, model.layout)
		]);
};
var $gren_lang$browser$Debugger$Overlay$BlockAll = {$: 'BlockAll'};
var $gren_lang$browser$Debugger$Overlay$toBlockerType = F2(
	function (isPaused, state) {
		switch (state.$) {
			case 'None':
				return isPaused ? $gren_lang$browser$Debugger$Overlay$BlockAll : $gren_lang$browser$Debugger$Overlay$BlockNone;
			case 'BadMetadata':
				return $gren_lang$browser$Debugger$Overlay$BlockMost;
			case 'BadImport':
				return $gren_lang$browser$Debugger$Overlay$BlockMost;
			default:
				return $gren_lang$browser$Debugger$Overlay$BlockMost;
		}
	});
var $gren_lang$browser$Debugger$Main$toBlockerType = function (model) {
	return A2(
		$gren_lang$browser$Debugger$Overlay$toBlockerType,
		$gren_lang$browser$Debugger$Main$isPaused(model.state),
		model.overlay);
};
var $gren_lang$browser$Debugger$Main$Horizontal = F3(
	function (a, b, c) {
		return {$: 'Horizontal', a: a, b: b, c: c};
	});
var $gren_lang$browser$Debugger$Main$Running = function (a) {
	return {$: 'Running', a: a};
};
var $gren_lang$browser$Debugger$Main$Static = {$: 'Static'};
var $gren_lang$core$Json$Decode$decodeValue = _Json_run;
var $gren_lang$browser$Debugger$Metadata$decodeAlias = A3(
	$gren_lang$core$Json$Decode$map2,
	F2(
		function (args, tipe) {
			return {args: args, tipe: tipe};
		}),
	A2(
		$gren_lang$core$Json$Decode$field,
		'args',
		$gren_lang$core$Json$Decode$array($gren_lang$core$Json$Decode$string)),
	A2($gren_lang$core$Json$Decode$field, 'type', $gren_lang$core$Json$Decode$string));
var $gren_lang$core$Dict$fromArray = function (assocs) {
	return A3(
		$gren_lang$core$Array$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.key;
				var value = _v0.value;
				return A3($gren_lang$core$Dict$insert, key, value, dict);
			}),
		$gren_lang$core$Dict$empty,
		assocs);
};
var $gren_lang$core$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $gren_lang$core$Json$Decode$dict = function (decoder) {
	return A2(
		$gren_lang$core$Json$Decode$map,
		$gren_lang$core$Dict$fromArray,
		$gren_lang$core$Json$Decode$keyValuePairs(decoder));
};
var $gren_lang$browser$Debugger$Metadata$decodeUnion = A3(
	$gren_lang$core$Json$Decode$map2,
	F2(
		function (args, tags) {
			return {args: args, tags: tags};
		}),
	A2(
		$gren_lang$core$Json$Decode$field,
		'args',
		$gren_lang$core$Json$Decode$array($gren_lang$core$Json$Decode$string)),
	A2(
		$gren_lang$core$Json$Decode$field,
		'tags',
		$gren_lang$core$Json$Decode$dict(
			$gren_lang$core$Json$Decode$array($gren_lang$core$Json$Decode$string))));
var $gren_lang$core$Json$Decode$map3 = _Json_map3;
var $gren_lang$browser$Debugger$Metadata$decodeTypes = A4(
	$gren_lang$core$Json$Decode$map3,
	F3(
		function (message, aliases, unions) {
			return {aliases: aliases, message: message, unions: unions};
		}),
	A2($gren_lang$core$Json$Decode$field, 'message', $gren_lang$core$Json$Decode$string),
	A2(
		$gren_lang$core$Json$Decode$field,
		'aliases',
		$gren_lang$core$Json$Decode$dict($gren_lang$browser$Debugger$Metadata$decodeAlias)),
	A2(
		$gren_lang$core$Json$Decode$field,
		'unions',
		$gren_lang$core$Json$Decode$dict($gren_lang$browser$Debugger$Metadata$decodeUnion)));
var $gren_lang$browser$Debugger$Metadata$decodeVersions = A2(
	$gren_lang$core$Json$Decode$map,
	function (elm) {
		return {elm: elm};
	},
	A2($gren_lang$core$Json$Decode$field, 'elm', $gren_lang$core$Json$Decode$string));
var $gren_lang$browser$Debugger$Metadata$decoder = A3(
	$gren_lang$core$Json$Decode$map2,
	F2(
		function (versions, types) {
			return {types: types, versions: versions};
		}),
	A2($gren_lang$core$Json$Decode$field, 'versions', $gren_lang$browser$Debugger$Metadata$decodeVersions),
	A2($gren_lang$core$Json$Decode$field, 'types', $gren_lang$browser$Debugger$Metadata$decodeTypes));
var $gren_lang$core$Array$filterMap = F2(
	function (mapper, array) {
		return A3(
			$gren_lang$core$Array$foldl,
			F2(
				function (v, acc) {
					var _v0 = mapper(v);
					if (_v0.$ === 'Just') {
						var newValue = _v0.a;
						return A2($gren_lang$core$Array$pushLast, newValue, acc);
					} else {
						return acc;
					}
				}),
			[],
			array);
	});
var $gren_lang$core$String$contains = _String_contains;
var $gren_lang$browser$Debugger$Metadata$hasProblem = F2(
	function (tipe, _v0) {
		var problem = _v0.problem;
		var token = _v0.token;
		return A2($gren_lang$core$String$contains, token, tipe) ? $gren_lang$core$Maybe$Just(problem) : $gren_lang$core$Maybe$Nothing;
	});
var $gren_lang$browser$Debugger$Metadata$Decoder = {$: 'Decoder'};
var $gren_lang$browser$Debugger$Metadata$Function = {$: 'Function'};
var $gren_lang$browser$Debugger$Metadata$Process = {$: 'Process'};
var $gren_lang$browser$Debugger$Metadata$Program = {$: 'Program'};
var $gren_lang$browser$Debugger$Metadata$Request = {$: 'Request'};
var $gren_lang$browser$Debugger$Metadata$Socket = {$: 'Socket'};
var $gren_lang$browser$Debugger$Metadata$Task = {$: 'Task'};
var $gren_lang$browser$Debugger$Metadata$VirtualDom = {$: 'VirtualDom'};
var $gren_lang$browser$Debugger$Metadata$problemTable = [
	{problem: $gren_lang$browser$Debugger$Metadata$Function, token: '->'},
	{problem: $gren_lang$browser$Debugger$Metadata$Decoder, token: 'Json.Decode.Decoder'},
	{problem: $gren_lang$browser$Debugger$Metadata$Task, token: 'Task.Task'},
	{problem: $gren_lang$browser$Debugger$Metadata$Process, token: 'Process.Id'},
	{problem: $gren_lang$browser$Debugger$Metadata$Socket, token: 'WebSocket.LowLevel.WebSocket'},
	{problem: $gren_lang$browser$Debugger$Metadata$Request, token: 'Http.Request'},
	{problem: $gren_lang$browser$Debugger$Metadata$Program, token: 'Platform.Program'},
	{problem: $gren_lang$browser$Debugger$Metadata$VirtualDom, token: 'VirtualDom.Node'},
	{problem: $gren_lang$browser$Debugger$Metadata$VirtualDom, token: 'VirtualDom.Attribute'}
];
var $gren_lang$browser$Debugger$Metadata$findProblems = function (tipe) {
	return A2(
		$gren_lang$core$Array$filterMap,
		$gren_lang$browser$Debugger$Metadata$hasProblem(tipe),
		$gren_lang$browser$Debugger$Metadata$problemTable);
};
var $gren_lang$browser$Debugger$Metadata$collectBadAliases = F3(
	function (name, _v0, list) {
		var tipe = _v0.tipe;
		var _v1 = $gren_lang$browser$Debugger$Metadata$findProblems(tipe);
		if (_v1.length === 0) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$gren_lang$core$Array$pushLast,
				{name: name, problems: problems},
				list);
		}
	});
var $gren_lang$core$Array$flatMap = F2(
	function (mapper, array) {
		return A3(
			$gren_lang$core$Array$foldl,
			F2(
				function (v, acc) {
					return A2(
						$gren_lang$core$Array$prefix,
						acc,
						mapper(v));
				}),
			[],
			array);
	});
var $gren_lang$core$Array$postfix = F2(
	function (fst, second) {
		return A2($gren_lang$core$Array$prefix, second, fst);
	});
var $gren_lang$core$Array$flatten = function (array) {
	return A3(
		$gren_lang$core$Array$foldl,
		$gren_lang$core$Array$postfix,
		[],
		array);
};
var $gren_lang$core$Dict$values = function (dict) {
	return A3(
		$gren_lang$core$Dict$foldl,
		F3(
			function (key, value, valueArray) {
				return A2($gren_lang$core$Array$pushLast, value, valueArray);
			}),
		[],
		dict);
};
var $gren_lang$browser$Debugger$Metadata$collectBadUnions = F3(
	function (name, _v0, list) {
		var tags = _v0.tags;
		var _v1 = A2(
			$gren_lang$core$Array$flatMap,
			$gren_lang$browser$Debugger$Metadata$findProblems,
			$gren_lang$core$Array$flatten(
				$gren_lang$core$Dict$values(tags)));
		if (_v1.length === 0) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$gren_lang$core$Array$pushFirst,
				{name: name, problems: problems},
				list);
		}
	});
var $gren_lang$browser$Debugger$Metadata$isPortable = function (_v0) {
	var types = _v0.types;
	var badAliases = A3(
		$gren_lang$core$Dict$foldl,
		$gren_lang$browser$Debugger$Metadata$collectBadAliases,
		[],
		types.aliases);
	var _v1 = A3($gren_lang$core$Dict$foldl, $gren_lang$browser$Debugger$Metadata$collectBadUnions, badAliases, types.unions);
	if (_v1.length === 0) {
		return $gren_lang$core$Maybe$Nothing;
	} else {
		var problems = _v1;
		return $gren_lang$core$Maybe$Just(
			{message: types.message, problems: problems});
	}
};
var $gren_lang$browser$Debugger$Metadata$decode = function (value) {
	var _v0 = A2($gren_lang$core$Json$Decode$decodeValue, $gren_lang$browser$Debugger$Metadata$decoder, value);
	if (_v0.$ === 'Err') {
		return $gren_lang$core$Result$Err(
			{
				message: 'The compiler is generating bad metadata. This is a compiler bug!',
				problems: []
			});
	} else {
		var metadata = _v0.a;
		var _v1 = $gren_lang$browser$Debugger$Metadata$isPortable(metadata);
		if (_v1.$ === 'Nothing') {
			return $gren_lang$core$Result$Ok(metadata);
		} else {
			var error = _v1.a;
			return $gren_lang$core$Result$Err(error);
		}
	}
};
var $gren_lang$core$Array$empty = [];
var $gren_lang$browser$Debugger$History$empty = function (model) {
	return {
		numMessages: 0,
		recent: {
			messages: [],
			model: model,
			numMessages: 0
		},
		snapshots: $gren_lang$core$Array$empty
	};
};
var $gren_lang$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_gren_builtin') {
			return $gren_lang$core$Dict$RBEmpty_gren_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$gren_lang$core$Dict$RBNode_gren_builtin,
				color,
				key,
				A2(func, key, value),
				A2($gren_lang$core$Dict$map, func, left),
				A2($gren_lang$core$Dict$map, func, right));
		}
	});
var $gren_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_gren_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($gren_lang$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $gren_lang$core$Dict$size = function (dict) {
	return A2($gren_lang$core$Dict$sizeHelp, 0, dict);
};
var $gren_lang$browser$Debugger$Expando$initHelp = F2(
	function (isOuter, expando) {
		switch (expando.$) {
			case 'S':
				return expando;
			case 'Primitive':
				return expando;
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var items = expando.c;
				return isOuter ? A3(
					$gren_lang$browser$Debugger$Expando$Sequence,
					seqType,
					false,
					A2(
						$gren_lang$core$Array$map,
						$gren_lang$browser$Debugger$Expando$initHelp(false),
						items)) : (($gren_lang$core$Array$length(items) <= 8) ? A3($gren_lang$browser$Debugger$Expando$Sequence, seqType, false, items) : expando);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return isOuter ? A2(
					$gren_lang$browser$Debugger$Expando$Dictionary,
					false,
					A2(
						$gren_lang$core$Array$map,
						function (_v1) {
							var key = _v1.key;
							var value = _v1.value;
							return {
								key: key,
								value: A2($gren_lang$browser$Debugger$Expando$initHelp, false, value)
							};
						},
						keyValuePairs)) : (($gren_lang$core$Array$length(keyValuePairs) <= 8) ? A2($gren_lang$browser$Debugger$Expando$Dictionary, false, keyValuePairs) : expando);
			case 'Record':
				var isClosed = expando.a;
				var entries = expando.b;
				return isOuter ? A2(
					$gren_lang$browser$Debugger$Expando$Record,
					false,
					A2(
						$gren_lang$core$Dict$map,
						F2(
							function (_v2, v) {
								return A2($gren_lang$browser$Debugger$Expando$initHelp, false, v);
							}),
						entries)) : (($gren_lang$core$Dict$size(entries) <= 4) ? A2($gren_lang$browser$Debugger$Expando$Record, false, entries) : expando);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var args = expando.c;
				return isOuter ? A3(
					$gren_lang$browser$Debugger$Expando$Constructor,
					maybeName,
					false,
					A2(
						$gren_lang$core$Array$map,
						$gren_lang$browser$Debugger$Expando$initHelp(false),
						args)) : (($gren_lang$core$Array$length(args) <= 4) ? A3($gren_lang$browser$Debugger$Expando$Constructor, maybeName, false, args) : expando);
		}
	});
var $gren_lang$browser$Debugger$Expando$init = function (value) {
	return A2(
		$gren_lang$browser$Debugger$Expando$initHelp,
		true,
		_Debugger_init(value));
};
var $gren_lang$core$Platform$Cmd$map = _Platform_map;
var $gren_lang$browser$Debugger$Overlay$None = {$: 'None'};
var $gren_lang$browser$Debugger$Overlay$none = $gren_lang$browser$Debugger$Overlay$None;
var $gren_lang$browser$Debugger$Main$wrapInit = F4(
	function (metadata, popout, init, flags) {
		var _v0 = init(flags);
		var userModel = _v0.model;
		var userCommands = _v0.command;
		return {
			command: A2($gren_lang$core$Platform$Cmd$map, $gren_lang$browser$Debugger$Main$UserMsg, userCommands),
			model: {
				expandoModel: $gren_lang$browser$Debugger$Expando$init(userModel),
				expandoMsg: $gren_lang$browser$Debugger$Expando$init(
					{}),
				history: $gren_lang$browser$Debugger$History$empty(userModel),
				layout: A3($gren_lang$browser$Debugger$Main$Horizontal, $gren_lang$browser$Debugger$Main$Static, 0.3, 0.5),
				metadata: $gren_lang$browser$Debugger$Metadata$decode(metadata),
				overlay: $gren_lang$browser$Debugger$Overlay$none,
				popout: popout,
				state: $gren_lang$browser$Debugger$Main$Running(userModel)
			}
		};
	});
var $gren_lang$browser$Debugger$Main$getLatestModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.c;
		return model;
	}
};
var $gren_lang$core$Platform$Sub$map = _Platform_map;
var $gren_lang$browser$Debugger$Main$wrapSubs = F2(
	function (subscriptions, model) {
		return A2(
			$gren_lang$core$Platform$Sub$map,
			$gren_lang$browser$Debugger$Main$UserMsg,
			subscriptions(
				$gren_lang$browser$Debugger$Main$getLatestModel(model.state)));
	});
var $gren_lang$browser$Debugger$Main$Moving = {$: 'Moving'};
var $gren_lang$browser$Debugger$Main$Paused = F5(
	function (a, b, c, d, e) {
		return {$: 'Paused', a: a, b: b, c: c, d: d, e: e};
	});
var $gren_lang$browser$Debugger$History$addRecent = F3(
	function (msg, newModel, _v0) {
		var model = _v0.model;
		var messages = _v0.messages;
		var numMessages = _v0.numMessages;
		return _Utils_eq(numMessages, $gren_lang$browser$Debugger$History$maxSnapshotSize) ? {
			recentHistory: {
				messages: [msg],
				model: newModel,
				numMessages: 1
			},
			snapshot: $gren_lang$core$Maybe$Just(
				{messages: messages, model: model})
		} : {
			recentHistory: {
				messages: A2($gren_lang$core$Array$pushFirst, msg, messages),
				model: model,
				numMessages: numMessages + 1
			},
			snapshot: $gren_lang$core$Maybe$Nothing
		};
	});
var $gren_lang$browser$Debugger$History$add = F3(
	function (msg, model, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var _v1 = A3($gren_lang$browser$Debugger$History$addRecent, msg, model, recent);
		if (_v1.snapshot.$ === 'Just') {
			var snapshot = _v1.snapshot.a;
			var newRecent = _v1.recentHistory;
			return {
				numMessages: numMessages + 1,
				recent: newRecent,
				snapshots: A2($gren_lang$core$Array$pushLast, snapshot, snapshots)
			};
		} else {
			var _v2 = _v1.snapshot;
			var newRecent = _v1.recentHistory;
			return {numMessages: numMessages + 1, recent: newRecent, snapshots: snapshots};
		}
	});
var $gren_lang$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $gren_lang$browser$Debugger$Overlay$BadImport = function (a) {
	return {$: 'BadImport', a: a};
};
var $gren_lang$browser$Debugger$Overlay$RiskyImport = F2(
	function (a, b) {
		return {$: 'RiskyImport', a: a, b: b};
	});
var $gren_lang$browser$Debugger$Report$VersionChanged = F2(
	function (a, b) {
		return {$: 'VersionChanged', a: a, b: b};
	});
var $gren_lang$browser$Debugger$Report$MessageChanged = F2(
	function (a, b) {
		return {$: 'MessageChanged', a: a, b: b};
	});
var $gren_lang$browser$Debugger$Report$SomethingChanged = function (a) {
	return {$: 'SomethingChanged', a: a};
};
var $gren_lang$browser$Debugger$Report$AliasChange = function (a) {
	return {$: 'AliasChange', a: a};
};
var $gren_lang$browser$Debugger$Metadata$checkAlias = F4(
	function (name, old, _new, changes) {
		return (_Utils_eq(old.tipe, _new.tipe) && _Utils_eq(old.args, _new.args)) ? changes : A2(
			$gren_lang$core$Array$pushFirst,
			$gren_lang$browser$Debugger$Report$AliasChange(name),
			changes);
	});
var $gren_lang$browser$Debugger$Report$UnionChange = F2(
	function (a, b) {
		return {$: 'UnionChange', a: a, b: b};
	});
var $gren_lang$browser$Debugger$Metadata$addTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				added: A2($gren_lang$core$Array$pushFirst, tag, changes.added)
			});
	});
var $gren_lang$browser$Debugger$Metadata$checkTag = F4(
	function (tag, old, _new, changes) {
		return _Utils_eq(old, _new) ? changes : _Utils_update(
			changes,
			{
				changed: A2($gren_lang$core$Array$pushFirst, tag, changes.changed)
			});
	});
var $gren_lang$browser$Debugger$Report$emptyTagChanges = function (argsMatch) {
	return {
		added: [],
		argsMatch: argsMatch,
		changed: [],
		removed: []
	};
};
var $gren_lang$browser$Debugger$Report$hasTagChanges = function (tagChanges) {
	return _Utils_eq(
		tagChanges,
		$gren_lang$browser$Debugger$Report$emptyTagChanges(true));
};
var $gren_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.list;
					var result = _v0.result;
					var _v1 = $gren_lang$core$Array$popFirst(list);
					if (_v1.$ === 'Nothing') {
						return {
							list: list,
							result: A3(rightStep, rKey, rValue, result)
						};
					} else {
						var _v2 = _v1.a;
						var _v3 = _v2.first;
						var lKey = _v3.key;
						var lValue = _v3.value;
						var rest = _v2.rest;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = {
								list: rest,
								result: A3(leftStep, lKey, lValue, result)
							};
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return {
									list: list,
									result: A3(rightStep, rKey, rValue, result)
								};
							} else {
								return {
									list: rest,
									result: A4(bothStep, lKey, lValue, rValue, result)
								};
							}
						}
					}
				}
			});
		var _v4 = A3(
			$gren_lang$core$Dict$foldl,
			stepState,
			{
				list: $gren_lang$core$Dict$toArray(leftDict),
				result: initialResult
			},
			rightDict);
		var leftovers = _v4.list;
		var intermediateResult = _v4.result;
		return A3(
			$gren_lang$core$Array$foldl,
			F2(
				function (_v5, result) {
					var key = _v5.key;
					var value = _v5.value;
					return A3(leftStep, key, value, result);
				}),
			intermediateResult,
			leftovers);
	});
var $gren_lang$browser$Debugger$Metadata$removeTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				removed: A2($gren_lang$core$Array$pushFirst, tag, changes.removed)
			});
	});
var $gren_lang$browser$Debugger$Metadata$checkUnion = F4(
	function (name, old, _new, changes) {
		var tagChanges = A6(
			$gren_lang$core$Dict$merge,
			$gren_lang$browser$Debugger$Metadata$removeTag,
			$gren_lang$browser$Debugger$Metadata$checkTag,
			$gren_lang$browser$Debugger$Metadata$addTag,
			old.tags,
			_new.tags,
			$gren_lang$browser$Debugger$Report$emptyTagChanges(
				_Utils_eq(old.args, _new.args)));
		return $gren_lang$browser$Debugger$Report$hasTagChanges(tagChanges) ? changes : A2(
			$gren_lang$core$Array$pushFirst,
			A2($gren_lang$browser$Debugger$Report$UnionChange, name, tagChanges),
			changes);
	});
var $gren_lang$browser$Debugger$Metadata$ignore = F3(
	function (key, value, report) {
		return report;
	});
var $gren_lang$browser$Debugger$Metadata$checkTypes = F2(
	function (old, _new) {
		return (!_Utils_eq(old.message, _new.message)) ? A2($gren_lang$browser$Debugger$Report$MessageChanged, old.message, _new.message) : $gren_lang$browser$Debugger$Report$SomethingChanged(
			A6(
				$gren_lang$core$Dict$merge,
				$gren_lang$browser$Debugger$Metadata$ignore,
				$gren_lang$browser$Debugger$Metadata$checkUnion,
				$gren_lang$browser$Debugger$Metadata$ignore,
				old.unions,
				_new.unions,
				A6(
					$gren_lang$core$Dict$merge,
					$gren_lang$browser$Debugger$Metadata$ignore,
					$gren_lang$browser$Debugger$Metadata$checkAlias,
					$gren_lang$browser$Debugger$Metadata$ignore,
					old.aliases,
					_new.aliases,
					[])));
	});
var $gren_lang$browser$Debugger$Metadata$check = F2(
	function (old, _new) {
		return (!_Utils_eq(old.versions.elm, _new.versions.elm)) ? A2($gren_lang$browser$Debugger$Report$VersionChanged, old.versions.elm, _new.versions.elm) : A2($gren_lang$browser$Debugger$Metadata$checkTypes, old.types, _new.types);
	});
var $gren_lang$browser$Debugger$Report$CorruptHistory = {$: 'CorruptHistory'};
var $gren_lang$browser$Debugger$Overlay$corruptImport = $gren_lang$browser$Debugger$Overlay$BadImport($gren_lang$browser$Debugger$Report$CorruptHistory);
var $gren_lang$core$Json$Decode$decodeString = _Json_runOnString;
var $gren_lang$browser$Debugger$Report$Fine = {$: 'Fine'};
var $gren_lang$browser$Debugger$Report$Impossible = {$: 'Impossible'};
var $gren_lang$browser$Debugger$Report$Risky = {$: 'Risky'};
var $gren_lang$core$Basics$not = _Basics_not;
var $gren_lang$core$Array$isEmpty = function (array) {
	return !$gren_lang$core$Array$length(array);
};
var $gren_lang$browser$Debugger$Report$some = function (list) {
	return !$gren_lang$core$Array$isEmpty(list);
};
var $gren_lang$browser$Debugger$Report$evaluateChange = function (change) {
	if (change.$ === 'AliasChange') {
		return $gren_lang$browser$Debugger$Report$Impossible;
	} else {
		var _v1 = change.b;
		var removed = _v1.removed;
		var changed = _v1.changed;
		var added = _v1.added;
		var argsMatch = _v1.argsMatch;
		return ((!argsMatch) || ($gren_lang$browser$Debugger$Report$some(changed) || $gren_lang$browser$Debugger$Report$some(removed))) ? $gren_lang$browser$Debugger$Report$Impossible : ($gren_lang$browser$Debugger$Report$some(added) ? $gren_lang$browser$Debugger$Report$Risky : $gren_lang$browser$Debugger$Report$Fine);
	}
};
var $gren_lang$browser$Debugger$Report$worstCase = F2(
	function (status, statusArray) {
		worstCase:
		while (true) {
			var _v0 = $gren_lang$core$Array$popFirst(statusArray);
			if (_v0.$ === 'Nothing') {
				return status;
			} else {
				switch (_v0.a.first.$) {
					case 'Impossible':
						var _v1 = _v0.a.first;
						return $gren_lang$browser$Debugger$Report$Impossible;
					case 'Risky':
						var _v2 = _v0.a;
						var _v3 = _v2.first;
						var rest = _v2.rest;
						var $temp$status = $gren_lang$browser$Debugger$Report$Risky,
							$temp$statusArray = rest;
						status = $temp$status;
						statusArray = $temp$statusArray;
						continue worstCase;
					default:
						var _v4 = _v0.a;
						var _v5 = _v4.first;
						var rest = _v4.rest;
						var $temp$status = status,
							$temp$statusArray = rest;
						status = $temp$status;
						statusArray = $temp$statusArray;
						continue worstCase;
				}
			}
		}
	});
var $gren_lang$browser$Debugger$Report$evaluate = function (report) {
	switch (report.$) {
		case 'CorruptHistory':
			return $gren_lang$browser$Debugger$Report$Impossible;
		case 'VersionChanged':
			return $gren_lang$browser$Debugger$Report$Impossible;
		case 'MessageChanged':
			return $gren_lang$browser$Debugger$Report$Impossible;
		default:
			var changes = report.a;
			return A2(
				$gren_lang$browser$Debugger$Report$worstCase,
				$gren_lang$browser$Debugger$Report$Fine,
				A2($gren_lang$core$Array$map, $gren_lang$browser$Debugger$Report$evaluateChange, changes));
	}
};
var $gren_lang$core$Json$Decode$value = _Json_decodeValue;
var $gren_lang$browser$Debugger$Overlay$uploadDecoder = A3(
	$gren_lang$core$Json$Decode$map2,
	F2(
		function (x, y) {
			return {historyJson: y, metadata: x};
		}),
	A2($gren_lang$core$Json$Decode$field, 'metadata', $gren_lang$browser$Debugger$Metadata$decoder),
	A2($gren_lang$core$Json$Decode$field, 'history', $gren_lang$core$Json$Decode$value));
var $gren_lang$browser$Debugger$Overlay$assessImport = F2(
	function (metadata, jsonString) {
		var _v0 = A2($gren_lang$core$Json$Decode$decodeString, $gren_lang$browser$Debugger$Overlay$uploadDecoder, jsonString);
		if (_v0.$ === 'Err') {
			return $gren_lang$core$Result$Err($gren_lang$browser$Debugger$Overlay$corruptImport);
		} else {
			var _v1 = _v0.a;
			var foreignMetadata = _v1.metadata;
			var rawHistory = _v1.historyJson;
			var report = A2($gren_lang$browser$Debugger$Metadata$check, foreignMetadata, metadata);
			var _v2 = $gren_lang$browser$Debugger$Report$evaluate(report);
			switch (_v2.$) {
				case 'Impossible':
					return $gren_lang$core$Result$Err(
						$gren_lang$browser$Debugger$Overlay$BadImport(report));
				case 'Risky':
					return $gren_lang$core$Result$Err(
						A2($gren_lang$browser$Debugger$Overlay$RiskyImport, report, rawHistory));
				default:
					return $gren_lang$core$Result$Ok(rawHistory);
			}
		}
	});
var $gren_lang$core$Platform$Cmd$batch = _Platform_batch;
var $gren_lang$browser$Debugger$Overlay$close = F2(
	function (msg, state) {
		switch (state.$) {
			case 'None':
				return $gren_lang$core$Maybe$Nothing;
			case 'BadMetadata':
				return $gren_lang$core$Maybe$Nothing;
			case 'BadImport':
				return $gren_lang$core$Maybe$Nothing;
			default:
				var rawHistory = state.b;
				if (msg.$ === 'Cancel') {
					return $gren_lang$core$Maybe$Nothing;
				} else {
					return $gren_lang$core$Maybe$Just(rawHistory);
				}
		}
	});
var $gren_lang$core$Json$Encode$array = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$gren_lang$core$Array$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(
					{}),
				entries));
	});
var $gren_lang$browser$Debugger$History$elmToJs = A2($gren_lang$core$Basics$composeR, _Json_wrap, _Debugger_unsafeCoerce);
var $gren_lang$browser$Debugger$History$encodeHelp = F2(
	function (snapshot, allMessages) {
		return A3($gren_lang$core$Array$foldl, $gren_lang$core$Array$pushFirst, allMessages, snapshot.messages);
	});
var $gren_lang$browser$Debugger$History$encode = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	return A2(
		$gren_lang$core$Json$Encode$array,
		$gren_lang$browser$Debugger$History$elmToJs,
		A3(
			$gren_lang$core$Array$foldr,
			$gren_lang$browser$Debugger$History$encodeHelp,
			$gren_lang$core$Array$reverse(recent.messages),
			snapshots));
};
var $gren_lang$core$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$gren_lang$core$Array$foldl,
			F2(
				function (_v0, obj) {
					var key = _v0.key;
					var value = _v0.value;
					return A3(_Json_addField, key, value, obj);
				}),
			_Json_emptyObject(
				{}),
			pairs));
};
var $gren_lang$browser$Debugger$Metadata$encodeAlias = function (_v0) {
	var args = _v0.args;
	var tipe = _v0.tipe;
	return $gren_lang$core$Json$Encode$object(
		[
			{
			key: 'args',
			value: A2($gren_lang$core$Json$Encode$array, $gren_lang$core$Json$Encode$string, args)
		},
			{
			key: 'type',
			value: $gren_lang$core$Json$Encode$string(tipe)
		}
		]);
};
var $gren_lang$browser$Debugger$Metadata$encodeDict = F2(
	function (f, dict) {
		return $gren_lang$core$Json$Encode$object(
			$gren_lang$core$Dict$toArray(
				A2(
					$gren_lang$core$Dict$map,
					F2(
						function (key, value) {
							return f(value);
						}),
					dict)));
	});
var $gren_lang$browser$Debugger$Metadata$encodeUnion = function (_v0) {
	var args = _v0.args;
	var tags = _v0.tags;
	return $gren_lang$core$Json$Encode$object(
		[
			{
			key: 'args',
			value: A2($gren_lang$core$Json$Encode$array, $gren_lang$core$Json$Encode$string, args)
		},
			{
			key: 'tags',
			value: A2(
				$gren_lang$browser$Debugger$Metadata$encodeDict,
				$gren_lang$core$Json$Encode$array($gren_lang$core$Json$Encode$string),
				tags)
		}
		]);
};
var $gren_lang$browser$Debugger$Metadata$encodeTypes = function (_v0) {
	var message = _v0.message;
	var unions = _v0.unions;
	var aliases = _v0.aliases;
	return $gren_lang$core$Json$Encode$object(
		[
			{
			key: 'message',
			value: $gren_lang$core$Json$Encode$string(message)
		},
			{
			key: 'aliases',
			value: A2($gren_lang$browser$Debugger$Metadata$encodeDict, $gren_lang$browser$Debugger$Metadata$encodeAlias, aliases)
		},
			{
			key: 'unions',
			value: A2($gren_lang$browser$Debugger$Metadata$encodeDict, $gren_lang$browser$Debugger$Metadata$encodeUnion, unions)
		}
		]);
};
var $gren_lang$browser$Debugger$Metadata$encodeVersions = function (_v0) {
	var elm = _v0.elm;
	return $gren_lang$core$Json$Encode$object(
		[
			{
			key: 'elm',
			value: $gren_lang$core$Json$Encode$string(elm)
		}
		]);
};
var $gren_lang$browser$Debugger$Metadata$encode = function (_v0) {
	var versions = _v0.versions;
	var types = _v0.types;
	return $gren_lang$core$Json$Encode$object(
		[
			{
			key: 'versions',
			value: $gren_lang$browser$Debugger$Metadata$encodeVersions(versions)
		},
			{
			key: 'types',
			value: $gren_lang$browser$Debugger$Metadata$encodeTypes(types)
		}
		]);
};
var $gren_lang$core$Basics$identity = function (x) {
	return x;
};
var $gren_lang$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $gren_lang$core$Task$succeed = _Scheduler_succeed;
var $gren_lang$core$Task$init = $gren_lang$core$Task$succeed(
	{});
var $gren_lang$core$Task$andThen = _Scheduler_andThen;
var $gren_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$gren_lang$core$Task$andThen,
			function (a) {
				return $gren_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $gren_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$gren_lang$core$Task$andThen,
			function (a) {
				return A2(
					$gren_lang$core$Task$andThen,
					function (b) {
						return $gren_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $gren_lang$core$Task$sequence = function (tasks) {
	return A3(
		$gren_lang$core$Array$foldl,
		$gren_lang$core$Task$map2($gren_lang$core$Array$pushLast),
		$gren_lang$core$Task$succeed(
			[]),
		tasks);
};
var $gren_lang$core$Platform$sendToApp = _Platform_sendToApp;
var $gren_lang$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$gren_lang$core$Task$andThen,
				$gren_lang$core$Platform$sendToApp(router),
				task));
	});
var $gren_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$gren_lang$core$Task$map,
			function (_v0) {
				return {};
			},
			$gren_lang$core$Task$sequence(
				A2(
					$gren_lang$core$Array$map,
					$gren_lang$core$Task$spawnCmd(router),
					commands)));
	});
var $gren_lang$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $gren_lang$core$Task$succeed(
			{});
	});
var $gren_lang$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $gren_lang$core$Task$Perform(
			A2($gren_lang$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($gren_lang$core$Task$init, $gren_lang$core$Task$onEffects, $gren_lang$core$Task$onSelfMsg, $gren_lang$core$Task$cmdMap);
var $gren_lang$core$Task$command = _Platform_leaf('Task');
var $gren_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return $gren_lang$core$Task$command(
			$gren_lang$core$Task$Perform(
				A2($gren_lang$core$Task$map, toMessage, task)));
	});
var $gren_lang$browser$Debugger$Main$download = F2(
	function (metadata, history) {
		var historyLength = $gren_lang$browser$Debugger$History$size(history);
		return A2(
			$gren_lang$core$Task$perform,
			function (_v0) {
				return $gren_lang$browser$Debugger$Main$NoOp;
			},
			A2(
				_Debugger_download,
				historyLength,
				_Json_unwrap(
					$gren_lang$core$Json$Encode$object(
						[
							{
							key: 'metadata',
							value: $gren_lang$browser$Debugger$Metadata$encode(metadata)
						},
							{
							key: 'history',
							value: $gren_lang$browser$Debugger$History$encode(history)
						}
						]))));
	});
var $gren_lang$browser$Debugger$Main$Vertical = F3(
	function (a, b, c) {
		return {$: 'Vertical', a: a, b: b, c: c};
	});
var $gren_lang$core$Basics$fdiv = _Basics_fdiv;
var $gren_lang$browser$Debugger$Main$drag = F2(
	function (info, layout) {
		if (layout.$ === 'Horizontal') {
			var status = layout.a;
			var y = layout.c;
			return A3($gren_lang$browser$Debugger$Main$Horizontal, status, info.x / info.width, y);
		} else {
			var status = layout.a;
			var x = layout.b;
			return A3($gren_lang$browser$Debugger$Main$Vertical, status, x, info.y / info.height);
		}
	});
var $gren_lang$browser$Debugger$History$Stepping = F2(
	function (a, b) {
		return {$: 'Stepping', a: a, b: b};
	});
var $gren_lang$browser$Debugger$History$Done = F2(
	function (a, b) {
		return {$: 'Done', a: a, b: b};
	});
var $gren_lang$browser$Debugger$History$getHelp = F3(
	function (update, msg, getResult) {
		if (getResult.$ === 'Done') {
			return getResult;
		} else {
			var n = getResult.a;
			var model = getResult.b;
			return (!n) ? A2(
				$gren_lang$browser$Debugger$History$Done,
				msg,
				function ($) {
					return $.model;
				}(
					A2(update, msg, model))) : A2(
				$gren_lang$browser$Debugger$History$Stepping,
				n - 1,
				function ($) {
					return $.model;
				}(
					A2(update, msg, model)));
		}
	});
var $gren_lang$core$Basics$idiv = _Basics_idiv;
var $gren_lang$core$Math$remainderBy = _Math_remainderBy;
var $gren_lang$browser$Debugger$History$undone = function (getResult) {
	undone:
	while (true) {
		if (getResult.$ === 'Done') {
			var msg = getResult.a;
			var model = getResult.b;
			return {command: msg, model: model};
		} else {
			var $temp$getResult = getResult;
			getResult = $temp$getResult;
			continue undone;
		}
	}
};
var $gren_lang$browser$Debugger$History$get = F3(
	function (update, index, history) {
		get:
		while (true) {
			var recent = history.recent;
			var snapshotMax = history.numMessages - recent.numMessages;
			if (_Utils_cmp(index, snapshotMax) > -1) {
				return $gren_lang$browser$Debugger$History$undone(
					A3(
						$gren_lang$core$Array$foldr,
						$gren_lang$browser$Debugger$History$getHelp(update),
						A2($gren_lang$browser$Debugger$History$Stepping, index - snapshotMax, recent.model),
						recent.messages));
			} else {
				var _v0 = A2($gren_lang$core$Array$get, (index / $gren_lang$browser$Debugger$History$maxSnapshotSize) | 0, history.snapshots);
				if (_v0.$ === 'Nothing') {
					var $temp$update = update,
						$temp$index = index,
						$temp$history = history;
					update = $temp$update;
					index = $temp$index;
					history = $temp$history;
					continue get;
				} else {
					var _v1 = _v0.a;
					var model = _v1.model;
					var messages = _v1.messages;
					return $gren_lang$browser$Debugger$History$undone(
						A3(
							$gren_lang$core$Array$foldr,
							$gren_lang$browser$Debugger$History$getHelp(update),
							A2($gren_lang$browser$Debugger$History$Stepping, index % $gren_lang$browser$Debugger$History$maxSnapshotSize, model),
							messages));
				}
			}
		}
	});
var $gren_lang$browser$Debugger$History$getRecentMsg = function (history) {
	getRecentMsg:
	while (true) {
		var _v0 = A2($gren_lang$core$Array$get, 0, history.recent.messages);
		if (_v0.$ === 'Nothing') {
			var $temp$history = history;
			history = $temp$history;
			continue getRecentMsg;
		} else {
			var first = _v0.a;
			return first;
		}
	}
};
var $gren_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_gren_builtin') {
				return $gren_lang$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($gren_lang$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $gren_lang$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $gren_lang$browser$Debugger$Expando$mergeArrayHelp = F2(
	function (olds, news) {
		var _v10 = {
			l: $gren_lang$core$Array$popFirst(olds),
			r: $gren_lang$core$Array$popFirst(news)
		};
		if (_v10.l.$ === 'Nothing') {
			var _v11 = _v10.l;
			return news;
		} else {
			if (_v10.r.$ === 'Nothing') {
				var _v12 = _v10.r;
				return news;
			} else {
				var _v13 = _v10.l.a;
				var x = _v13.first;
				var xs = _v13.rest;
				var _v14 = _v10.r.a;
				var y = _v14.first;
				var ys = _v14.rest;
				return A2(
					$gren_lang$core$Array$pushFirst,
					A2($gren_lang$browser$Debugger$Expando$mergeHelp, x, y),
					A2($gren_lang$browser$Debugger$Expando$mergeArrayHelp, xs, ys));
			}
		}
	});
var $gren_lang$browser$Debugger$Expando$mergeDictHelp = F3(
	function (oldDict, key, value) {
		var _v9 = A2($gren_lang$core$Dict$get, key, oldDict);
		if (_v9.$ === 'Nothing') {
			return value;
		} else {
			var oldValue = _v9.a;
			return A2($gren_lang$browser$Debugger$Expando$mergeHelp, oldValue, value);
		}
	});
var $gren_lang$browser$Debugger$Expando$mergeHelp = F2(
	function (old, _new) {
		var _v0 = {l: old, r: _new};
		_v0$6:
		while (true) {
			switch (_v0.r.$) {
				case 'S':
					return _new;
				case 'Primitive':
					return _new;
				case 'Sequence':
					if (_v0.l.$ === 'Sequence') {
						var _v1 = _v0.l;
						var isClosed = _v1.b;
						var oldValues = _v1.c;
						var _v2 = _v0.r;
						var seqType = _v2.a;
						var newValues = _v2.c;
						return A3(
							$gren_lang$browser$Debugger$Expando$Sequence,
							seqType,
							isClosed,
							A2($gren_lang$browser$Debugger$Expando$mergeArrayHelp, oldValues, newValues));
					} else {
						break _v0$6;
					}
				case 'Dictionary':
					if (_v0.l.$ === 'Dictionary') {
						var _v3 = _v0.l;
						var isClosed = _v3.a;
						var _v4 = _v0.r;
						var keyValuePairs = _v4.b;
						return A2($gren_lang$browser$Debugger$Expando$Dictionary, isClosed, keyValuePairs);
					} else {
						break _v0$6;
					}
				case 'Record':
					if (_v0.l.$ === 'Record') {
						var _v5 = _v0.l;
						var isClosed = _v5.a;
						var oldDict = _v5.b;
						var _v6 = _v0.r;
						var newDict = _v6.b;
						return A2(
							$gren_lang$browser$Debugger$Expando$Record,
							isClosed,
							A2(
								$gren_lang$core$Dict$map,
								$gren_lang$browser$Debugger$Expando$mergeDictHelp(oldDict),
								newDict));
					} else {
						break _v0$6;
					}
				default:
					if (_v0.l.$ === 'Constructor') {
						var _v7 = _v0.l;
						var isClosed = _v7.b;
						var oldValues = _v7.c;
						var _v8 = _v0.r;
						var maybeName = _v8.a;
						var newValues = _v8.c;
						return A3(
							$gren_lang$browser$Debugger$Expando$Constructor,
							maybeName,
							isClosed,
							A2($gren_lang$browser$Debugger$Expando$mergeArrayHelp, oldValues, newValues));
					} else {
						break _v0$6;
					}
			}
		}
		return _new;
	});
var $gren_lang$browser$Debugger$Expando$merge = F2(
	function (value, expando) {
		return A2(
			$gren_lang$browser$Debugger$Expando$mergeHelp,
			expando,
			_Debugger_init(value));
	});
var $gren_lang$browser$Debugger$Main$jumpUpdate = F3(
	function (update, index, model) {
		var history = $gren_lang$browser$Debugger$Main$cachedHistory(model);
		var currentMsg = $gren_lang$browser$Debugger$History$getRecentMsg(history);
		var currentModel = $gren_lang$browser$Debugger$Main$getLatestModel(model.state);
		var _v0 = A3($gren_lang$browser$Debugger$History$get, update, index, history);
		var indexModel = _v0.model;
		var indexMsg = _v0.command;
		return _Utils_update(
			model,
			{
				expandoModel: A2($gren_lang$browser$Debugger$Expando$merge, indexModel, model.expandoModel),
				expandoMsg: A2($gren_lang$browser$Debugger$Expando$merge, indexMsg, model.expandoMsg),
				state: A5($gren_lang$browser$Debugger$Main$Paused, index, indexModel, currentModel, currentMsg, history)
			});
	});
var $gren_lang$browser$Debugger$History$jsToGren = A2($gren_lang$core$Basics$composeR, _Json_unwrap, _Debugger_unsafeCoerce);
var $gren_lang$browser$Debugger$History$decoder = F2(
	function (initialModel, update) {
		var addMessage = F2(
			function (rawMsg, _v0) {
				var model = _v0.model;
				var history = _v0.history;
				var msg = $gren_lang$browser$Debugger$History$jsToGren(rawMsg);
				return {
					history: A3($gren_lang$browser$Debugger$History$add, msg, model, history),
					model: A2(update, msg, model)
				};
			});
		var updateModel = function (rawMsgs) {
			return A3(
				$gren_lang$core$Array$foldl,
				addMessage,
				{
					history: $gren_lang$browser$Debugger$History$empty(initialModel),
					model: initialModel
				},
				rawMsgs);
		};
		return A2(
			$gren_lang$core$Json$Decode$map,
			updateModel,
			$gren_lang$core$Json$Decode$array($gren_lang$core$Json$Decode$value));
	});
var $gren_lang$browser$Debugger$History$getInitialModel = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	var _v1 = A2($gren_lang$core$Array$get, 0, snapshots);
	if (_v1.$ === 'Just') {
		var model = _v1.a.model;
		return model;
	} else {
		return recent.model;
	}
};
var $gren_lang$core$Platform$Cmd$none = $gren_lang$core$Platform$Cmd$batch(
	[]);
var $gren_lang$browser$Debugger$Main$loadNewHistory = F3(
	function (rawHistory, update, model) {
		var pureUserUpdate = F2(
			function (msg, userModel) {
				return A2(update, msg, userModel).model;
			});
		var initialUserModel = $gren_lang$browser$Debugger$History$getInitialModel(model.history);
		var decoder = A2($gren_lang$browser$Debugger$History$decoder, initialUserModel, pureUserUpdate);
		var _v0 = A2($gren_lang$core$Json$Decode$decodeValue, decoder, rawHistory);
		if (_v0.$ === 'Err') {
			return {
				command: $gren_lang$core$Platform$Cmd$none,
				model: _Utils_update(
					model,
					{overlay: $gren_lang$browser$Debugger$Overlay$corruptImport})
			};
		} else {
			var _v1 = _v0.a;
			var latestUserModel = _v1.model;
			var newHistory = _v1.history;
			return {
				command: $gren_lang$core$Platform$Cmd$none,
				model: _Utils_update(
					model,
					{
						expandoModel: $gren_lang$browser$Debugger$Expando$init(latestUserModel),
						expandoMsg: $gren_lang$browser$Debugger$Expando$init(
							$gren_lang$browser$Debugger$History$getRecentMsg(newHistory)),
						history: newHistory,
						overlay: $gren_lang$browser$Debugger$Overlay$none,
						state: $gren_lang$browser$Debugger$Main$Running(latestUserModel)
					})
			};
		}
	});
var $gren_lang$browser$Debugger$Main$scroll = function (popout) {
	return A2(
		$gren_lang$core$Task$perform,
		$gren_lang$core$Basics$always($gren_lang$browser$Debugger$Main$NoOp),
		_Debugger_scroll(popout));
};
var $gren_lang$browser$Debugger$Main$scrollTo = F2(
	function (id, popout) {
		return A2(
			$gren_lang$core$Task$perform,
			$gren_lang$core$Basics$always($gren_lang$browser$Debugger$Main$NoOp),
			A2(_Debugger_scrollTo, id, popout));
	});
var $gren_lang$browser$Debugger$Main$setDragStatus = F2(
	function (status, layout) {
		if (layout.$ === 'Horizontal') {
			var x = layout.b;
			var y = layout.c;
			return A3($gren_lang$browser$Debugger$Main$Horizontal, status, x, y);
		} else {
			var x = layout.b;
			var y = layout.c;
			return A3($gren_lang$browser$Debugger$Main$Vertical, status, x, y);
		}
	});
var $gren_lang$browser$Debugger$Main$swapLayout = function (layout) {
	if (layout.$ === 'Horizontal') {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($gren_lang$browser$Debugger$Main$Vertical, s, x, y);
	} else {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($gren_lang$browser$Debugger$Main$Horizontal, s, x, y);
	}
};
var $gren_lang$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_gren_builtin') && (dict.d.$ === 'RBNode_gren_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $gren_lang$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_gren_builtin') && (dict.d.$ === 'RBNode_gren_builtin')) && (dict.e.$ === 'RBNode_gren_builtin')) {
		if ((dict.e.d.$ === 'RBNode_gren_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$gren_lang$core$Dict$RBNode_gren_builtin,
				$gren_lang$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Black,
					k,
					v,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Black,
					k,
					v,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Black,
					k,
					v,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $gren_lang$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_gren_builtin') && (dict.d.$ === 'RBNode_gren_builtin')) && (dict.e.$ === 'RBNode_gren_builtin')) {
		if ((dict.d.d.$ === 'RBNode_gren_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$gren_lang$core$Dict$RBNode_gren_builtin,
				$gren_lang$core$Dict$Red,
				lK,
				lV,
				A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Black,
					k,
					v,
					lRight,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Black,
					k,
					v,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					$gren_lang$core$Dict$Black,
					k,
					v,
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $gren_lang$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_gren_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$gren_lang$core$Dict$RBNode_gren_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_gren_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_gren_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $gren_lang$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $gren_lang$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $gren_lang$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_gren_builtin') && (dict.d.$ === 'RBNode_gren_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_gren_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$gren_lang$core$Dict$RBNode_gren_builtin,
					color,
					key,
					value,
					$gren_lang$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $gren_lang$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_gren_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$gren_lang$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$gren_lang$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $gren_lang$core$Dict$RBEmpty_gren_builtin;
				}
			}
		} else {
			return A5(
				$gren_lang$core$Dict$RBNode_gren_builtin,
				color,
				key,
				value,
				$gren_lang$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $gren_lang$core$Dict$RBEmpty_gren_builtin;
	}
};
var $gren_lang$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_gren_builtin') {
			return $gren_lang$core$Dict$RBEmpty_gren_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_gren_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_gren_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$gren_lang$core$Dict$RBNode_gren_builtin,
							color,
							key,
							value,
							A2($gren_lang$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $gren_lang$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_gren_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$gren_lang$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($gren_lang$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $gren_lang$core$Dict$RBEmpty_gren_builtin;
						}
					}
				} else {
					return A5(
						$gren_lang$core$Dict$RBNode_gren_builtin,
						color,
						key,
						value,
						A2($gren_lang$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$gren_lang$core$Dict$removeHelpEQGT,
					targetKey,
					A7($gren_lang$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $gren_lang$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_gren_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $gren_lang$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_gren_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$gren_lang$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$gren_lang$core$Dict$removeMin(right));
				} else {
					return $gren_lang$core$Dict$RBEmpty_gren_builtin;
				}
			} else {
				return A5(
					$gren_lang$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($gren_lang$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $gren_lang$core$Dict$RBEmpty_gren_builtin;
		}
	});
var $gren_lang$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($gren_lang$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_gren_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($gren_lang$core$Dict$RBNode_gren_builtin, $gren_lang$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $gren_lang$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($gren_lang$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($gren_lang$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($gren_lang$core$Dict$remove, targetKey, dictionary);
		}
	});
var $gren_lang$core$Array$set = _Array_set;
var $gren_lang$browser$Debugger$Expando$updateIndex = F3(
	function (n, func, array) {
		var _v0 = A2($gren_lang$core$Array$get, n, array);
		if (_v0.$ === 'Nothing') {
			return array;
		} else {
			var x = _v0.a;
			return A3(
				$gren_lang$core$Array$set,
				n,
				func(x),
				array);
		}
	});
var $gren_lang$browser$Debugger$Expando$update = F2(
	function (msg, value) {
		switch (value.$) {
			case 'S':
				return value;
			case 'Primitive':
				return value;
			case 'Sequence':
				var seqType = value.a;
				var isClosed = value.b;
				var valueArray = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($gren_lang$browser$Debugger$Expando$Sequence, seqType, !isClosed, valueArray);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v3 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$gren_lang$browser$Debugger$Expando$Sequence,
								seqType,
								isClosed,
								A3(
									$gren_lang$browser$Debugger$Expando$updateIndex,
									index,
									$gren_lang$browser$Debugger$Expando$update(subMsg),
									valueArray));
						} else {
							return value;
						}
					default:
						return value;
				}
			case 'Dictionary':
				var isClosed = value.a;
				var keyValuePairs = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($gren_lang$browser$Debugger$Expando$Dictionary, !isClosed, keyValuePairs);
					case 'Index':
						var redirect = msg.a;
						var index = msg.b;
						var subMsg = msg.c;
						switch (redirect.$) {
							case 'None':
								return value;
							case 'Key':
								return A2(
									$gren_lang$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$gren_lang$browser$Debugger$Expando$updateIndex,
										index,
										function (_v6) {
											var key = _v6.key;
											var v = _v6.value;
											return {
												key: A2($gren_lang$browser$Debugger$Expando$update, subMsg, key),
												value: v
											};
										},
										keyValuePairs));
							default:
								return A2(
									$gren_lang$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$gren_lang$browser$Debugger$Expando$updateIndex,
										index,
										function (_v7) {
											var key = _v7.key;
											var v = _v7.value;
											return {
												key: key,
												value: A2($gren_lang$browser$Debugger$Expando$update, subMsg, v)
											};
										},
										keyValuePairs));
						}
					default:
						return value;
				}
			case 'Record':
				var isClosed = value.a;
				var valueDict = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($gren_lang$browser$Debugger$Expando$Record, !isClosed, valueDict);
					case 'Index':
						return value;
					default:
						var field = msg.a;
						var subMsg = msg.b;
						return A2(
							$gren_lang$browser$Debugger$Expando$Record,
							isClosed,
							A3(
								$gren_lang$core$Dict$update,
								field,
								$gren_lang$browser$Debugger$Expando$updateField(subMsg),
								valueDict));
				}
			default:
				var maybeName = value.a;
				var isClosed = value.b;
				var valueArray = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($gren_lang$browser$Debugger$Expando$Constructor, maybeName, !isClosed, valueArray);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v10 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$gren_lang$browser$Debugger$Expando$Constructor,
								maybeName,
								isClosed,
								A3(
									$gren_lang$browser$Debugger$Expando$updateIndex,
									index,
									$gren_lang$browser$Debugger$Expando$update(subMsg),
									valueArray));
						} else {
							return value;
						}
					default:
						return value;
				}
		}
	});
var $gren_lang$browser$Debugger$Expando$updateField = F2(
	function (msg, maybeExpando) {
		if (maybeExpando.$ === 'Nothing') {
			return maybeExpando;
		} else {
			var expando = maybeExpando.a;
			return $gren_lang$core$Maybe$Just(
				A2($gren_lang$browser$Debugger$Expando$update, msg, expando));
		}
	});
var $gren_lang$browser$Debugger$Main$Upload = function (a) {
	return {$: 'Upload', a: a};
};
var $gren_lang$browser$Debugger$Main$upload = function (popout) {
	return A2(
		$gren_lang$core$Task$perform,
		$gren_lang$browser$Debugger$Main$Upload,
		_Debugger_upload(popout));
};
var $gren_lang$browser$Debugger$Overlay$BadMetadata = function (a) {
	return {$: 'BadMetadata', a: a};
};
var $gren_lang$browser$Debugger$Overlay$badMetadata = $gren_lang$browser$Debugger$Overlay$BadMetadata;
var $gren_lang$browser$Debugger$Main$withGoodMetadata = F2(
	function (model, func) {
		var _v0 = model.metadata;
		if (_v0.$ === 'Ok') {
			var metadata = _v0.a;
			return func(metadata);
		} else {
			var error = _v0.a;
			return {
				command: $gren_lang$core$Platform$Cmd$none,
				model: _Utils_update(
					model,
					{
						overlay: $gren_lang$browser$Debugger$Overlay$badMetadata(error)
					})
			};
		}
	});
var $gren_lang$browser$Debugger$Main$wrapUpdate = F3(
	function (update, msg, model) {
		wrapUpdate:
		while (true) {
			switch (msg.$) {
				case 'NoOp':
					return {command: $gren_lang$core$Platform$Cmd$none, model: model};
				case 'UserMsg':
					var userMsg = msg.a;
					var userModel = $gren_lang$browser$Debugger$Main$getLatestModel(model.state);
					var newHistory = A3($gren_lang$browser$Debugger$History$add, userMsg, userModel, model.history);
					var _v1 = A2(update, userMsg, userModel);
					var newUserModel = _v1.model;
					var userCmds = _v1.command;
					var commands = A2($gren_lang$core$Platform$Cmd$map, $gren_lang$browser$Debugger$Main$UserMsg, userCmds);
					var _v2 = model.state;
					if (_v2.$ === 'Running') {
						return {
							command: $gren_lang$core$Platform$Cmd$batch(
								[
									commands,
									$gren_lang$browser$Debugger$Main$scroll(model.popout)
								]),
							model: _Utils_update(
								model,
								{
									expandoModel: A2($gren_lang$browser$Debugger$Expando$merge, newUserModel, model.expandoModel),
									expandoMsg: A2($gren_lang$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									history: newHistory,
									state: $gren_lang$browser$Debugger$Main$Running(newUserModel)
								})
						};
					} else {
						var index = _v2.a;
						var indexModel = _v2.b;
						var history = _v2.e;
						return {
							command: commands,
							model: _Utils_update(
								model,
								{
									history: newHistory,
									state: A5($gren_lang$browser$Debugger$Main$Paused, index, indexModel, newUserModel, userMsg, history)
								})
						};
					}
				case 'TweakExpandoMsg':
					var eMsg = msg.a;
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: _Utils_update(
							model,
							{
								expandoMsg: A2($gren_lang$browser$Debugger$Expando$update, eMsg, model.expandoMsg)
							})
					};
				case 'TweakExpandoModel':
					var eMsg = msg.a;
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: _Utils_update(
							model,
							{
								expandoModel: A2($gren_lang$browser$Debugger$Expando$update, eMsg, model.expandoModel)
							})
					};
				case 'Resume':
					var _v3 = model.state;
					if (_v3.$ === 'Running') {
						return {command: $gren_lang$core$Platform$Cmd$none, model: model};
					} else {
						var userModel = _v3.c;
						var userMsg = _v3.d;
						return {
							command: $gren_lang$browser$Debugger$Main$scroll(model.popout),
							model: _Utils_update(
								model,
								{
									expandoModel: A2($gren_lang$browser$Debugger$Expando$merge, userModel, model.expandoModel),
									expandoMsg: A2($gren_lang$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									state: $gren_lang$browser$Debugger$Main$Running(userModel)
								})
						};
					}
				case 'Jump':
					var index = msg.a;
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: A3($gren_lang$browser$Debugger$Main$jumpUpdate, update, index, model)
					};
				case 'SliderJump':
					var index = msg.a;
					return {
						command: A2(
							$gren_lang$browser$Debugger$Main$scrollTo,
							$gren_lang$browser$Debugger$History$idForMessageIndex(index),
							model.popout),
						model: A3($gren_lang$browser$Debugger$Main$jumpUpdate, update, index, model)
					};
				case 'Open':
					return {
						command: A2(
							$gren_lang$core$Task$perform,
							$gren_lang$core$Basics$always($gren_lang$browser$Debugger$Main$NoOp),
							_Debugger_open(model.popout)),
						model: model
					};
				case 'Up':
					var _v4 = model.state;
					if (_v4.$ === 'Running') {
						return {command: $gren_lang$core$Platform$Cmd$none, model: model};
					} else {
						var i = _v4.a;
						var history = _v4.e;
						var targetIndex = i + 1;
						if (_Utils_cmp(
							targetIndex,
							$gren_lang$browser$Debugger$History$size(history)) < 0) {
							var $temp$update = update,
								$temp$msg = $gren_lang$browser$Debugger$Main$SliderJump(targetIndex),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							var $temp$update = update,
								$temp$msg = $gren_lang$browser$Debugger$Main$Resume,
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						}
					}
				case 'Down':
					var _v5 = model.state;
					if (_v5.$ === 'Running') {
						var $temp$update = update,
							$temp$msg = $gren_lang$browser$Debugger$Main$Jump(
							$gren_lang$browser$Debugger$History$size(model.history) - 1),
							$temp$model = model;
						update = $temp$update;
						msg = $temp$msg;
						model = $temp$model;
						continue wrapUpdate;
					} else {
						var index = _v5.a;
						if (index > 0) {
							var $temp$update = update,
								$temp$msg = $gren_lang$browser$Debugger$Main$SliderJump(index - 1),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							return {command: $gren_lang$core$Platform$Cmd$none, model: model};
						}
					}
				case 'Import':
					return A2(
						$gren_lang$browser$Debugger$Main$withGoodMetadata,
						model,
						function (_v6) {
							return {
								command: $gren_lang$browser$Debugger$Main$upload(model.popout),
								model: model
							};
						});
				case 'Export':
					return A2(
						$gren_lang$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							return {
								command: A2($gren_lang$browser$Debugger$Main$download, metadata, model.history),
								model: model
							};
						});
				case 'Upload':
					var jsonString = msg.a;
					return A2(
						$gren_lang$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							var _v7 = A2($gren_lang$browser$Debugger$Overlay$assessImport, metadata, jsonString);
							if (_v7.$ === 'Err') {
								var newOverlay = _v7.a;
								return {
									command: $gren_lang$core$Platform$Cmd$none,
									model: _Utils_update(
										model,
										{overlay: newOverlay})
								};
							} else {
								var rawHistory = _v7.a;
								return A3($gren_lang$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
							}
						});
				case 'OverlayMsg':
					var overlayMsg = msg.a;
					var _v8 = A2($gren_lang$browser$Debugger$Overlay$close, overlayMsg, model.overlay);
					if (_v8.$ === 'Nothing') {
						return {
							command: $gren_lang$core$Platform$Cmd$none,
							model: _Utils_update(
								model,
								{overlay: $gren_lang$browser$Debugger$Overlay$none})
						};
					} else {
						var rawHistory = _v8.a;
						return A3($gren_lang$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
					}
				case 'SwapLayout':
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: _Utils_update(
							model,
							{
								layout: $gren_lang$browser$Debugger$Main$swapLayout(model.layout)
							})
					};
				case 'DragStart':
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: _Utils_update(
							model,
							{
								layout: A2($gren_lang$browser$Debugger$Main$setDragStatus, $gren_lang$browser$Debugger$Main$Moving, model.layout)
							})
					};
				case 'Drag':
					var info = msg.a;
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: _Utils_update(
							model,
							{
								layout: A2($gren_lang$browser$Debugger$Main$drag, info, model.layout)
							})
					};
				default:
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: _Utils_update(
							model,
							{
								layout: A2($gren_lang$browser$Debugger$Main$setDragStatus, $gren_lang$browser$Debugger$Main$Static, model.layout)
							})
					};
			}
		}
	});
var $gren_lang$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $gren_lang$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $gren_lang$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $gren_lang$url$Url$Http = {$: 'Http'};
var $gren_lang$url$Url$Https = {$: 'Https'};
var $gren_lang$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$gren_lang$core$String$slice,
			n,
			$gren_lang$core$String$length(string),
			string);
	});
var $gren_lang$core$String$indices = _String_indexes;
var $gren_lang$core$String$isEmpty = function (string) {
	return string === '';
};
var $gren_lang$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($gren_lang$core$String$isEmpty(str) || A2($gren_lang$core$String$contains, '@', str)) {
			return $gren_lang$core$Maybe$Nothing;
		} else {
			var _v0 = A2($gren_lang$core$String$indices, ':', str);
			switch (_v0.length) {
				case 0:
					return $gren_lang$core$Maybe$Just(
						{fragment: frag, host: str, path: path, port_: $gren_lang$core$Maybe$Nothing, protocol: protocol, query: params});
				case 1:
					var i = _v0[0];
					var _v1 = $gren_lang$core$String$toInt(
						A2($gren_lang$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $gren_lang$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $gren_lang$core$Maybe$Just(
							{
								fragment: frag,
								host: A2($gren_lang$core$String$left, i, str),
								path: path,
								port_: port_,
								protocol: protocol,
								query: params
							});
					}
				default:
					return $gren_lang$core$Maybe$Nothing;
			}
		}
	});
var $gren_lang$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($gren_lang$core$String$isEmpty(str)) {
			return $gren_lang$core$Maybe$Nothing;
		} else {
			var _v0 = A2(
				$gren_lang$core$Array$get,
				0,
				A2($gren_lang$core$String$indices, '/', str));
			if (_v0.$ === 'Nothing') {
				return A5($gren_lang$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$gren_lang$url$Url$chompBeforePath,
					protocol,
					A2($gren_lang$core$String$dropLeft, i, str),
					params,
					frag,
					A2($gren_lang$core$String$left, i, str));
			}
		}
	});
var $gren_lang$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($gren_lang$core$String$isEmpty(str)) {
			return $gren_lang$core$Maybe$Nothing;
		} else {
			var _v0 = A2(
				$gren_lang$core$Array$get,
				0,
				A2($gren_lang$core$String$indices, '?', str));
			if (_v0.$ === 'Nothing') {
				return A4($gren_lang$url$Url$chompBeforeQuery, protocol, $gren_lang$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$gren_lang$url$Url$chompBeforeQuery,
					protocol,
					$gren_lang$core$Maybe$Just(
						A2($gren_lang$core$String$dropLeft, i + 1, str)),
					frag,
					A2($gren_lang$core$String$left, i, str));
			}
		}
	});
var $gren_lang$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($gren_lang$core$String$isEmpty(str)) {
			return $gren_lang$core$Maybe$Nothing;
		} else {
			var _v0 = A2(
				$gren_lang$core$Array$get,
				0,
				A2($gren_lang$core$String$indices, '#', str));
			if (_v0.$ === 'Nothing') {
				return A3($gren_lang$url$Url$chompBeforeFragment, protocol, $gren_lang$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$gren_lang$url$Url$chompBeforeFragment,
					protocol,
					$gren_lang$core$Maybe$Just(
						A2($gren_lang$core$String$dropLeft, i + 1, str)),
					A2($gren_lang$core$String$left, i, str));
			}
		}
	});
var $gren_lang$core$String$startsWith = _String_startsWith;
var $gren_lang$url$Url$fromString = function (str) {
	return A2($gren_lang$core$String$startsWith, 'http://', str) ? A2(
		$gren_lang$url$Url$chompAfterProtocol,
		$gren_lang$url$Url$Http,
		A2($gren_lang$core$String$dropLeft, 7, str)) : (A2($gren_lang$core$String$startsWith, 'https://', str) ? A2(
		$gren_lang$url$Url$chompAfterProtocol,
		$gren_lang$url$Url$Https,
		A2($gren_lang$core$String$dropLeft, 8, str)) : $gren_lang$core$Maybe$Nothing);
};
var $gren_lang$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $gren_lang$browser$Browser$element = _Browser_element;
var $author$project$Init$initialFiles = [
	{content: 'module Main exposing ( main )\n\nimport Html as H\n\nmain =\n    H.div\n        []\n        [ H.text "Hello, World!!!!!!!!!" ]', extension: 'gren', name: 'Main'}
];
var $gren_lang$core$Debug$log = _Debug_log;
var $gren_lang$core$Debug$toString = _Debug_toString;
var $author$project$Init$init = function (flags) {
	var _v0 = A2(
		$gren_lang$core$Debug$log,
		'flags',
		$gren_lang$core$Debug$toString(flags));
	return {
		command: $gren_lang$core$Platform$Cmd$none,
		model: {files: $author$project$Init$initialFiles, folderName: flags.folderName, selectedFile: $gren_lang$core$Maybe$Nothing, sidebarWidth: 200}
	};
};
var $gren_lang$core$Platform$Sub$batch = _Platform_batch;
var $gren_lang$core$Platform$Sub$none = $gren_lang$core$Platform$Sub$batch(
	[]);
var $author$project$Subscription$subscriptions = function (model) {
	return $gren_lang$core$Platform$Sub$none;
};
var $author$project$Message$GotResponse = function (a) {
	return {$: 'GotResponse', a: a};
};
var $gren_lang$browser$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $gren_lang$browser$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $gren_lang$browser$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $gren_lang$browser$Http$NetworkError_ = {$: 'NetworkError_'};
var $gren_lang$browser$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $gren_lang$browser$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $gren_lang$browser$Http$Timeout_ = {$: 'Timeout_'};
var $gren_lang$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $gren_lang$core$Platform$sendToSelf = _Platform_sendToSelf;
var $gren_lang$browser$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$gren_lang$core$Basics$identity,
			A2($gren_lang$core$Basics$composeR, toResult, toMsg));
	});
var $gren_lang$browser$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $gren_lang$browser$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $gren_lang$browser$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $gren_lang$browser$Http$NetworkError = {$: 'NetworkError'};
var $gren_lang$browser$Http$Timeout = {$: 'Timeout'};
var $gren_lang$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $gren_lang$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $gren_lang$core$Result$Err(
				f(e));
		}
	});
var $gren_lang$browser$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $gren_lang$core$Result$Err(
					$gren_lang$browser$Http$BadUrl(url));
			case 'Timeout_':
				return $gren_lang$core$Result$Err($gren_lang$browser$Http$Timeout);
			case 'NetworkError_':
				return $gren_lang$core$Result$Err($gren_lang$browser$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $gren_lang$core$Result$Err(
					$gren_lang$browser$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$gren_lang$core$Result$mapError,
					$gren_lang$browser$Http$BadBody,
					toResult(body));
		}
	});
var $gren_lang$browser$Http$expectString = function (toMsg) {
	return A2(
		$gren_lang$browser$Http$expectStringResponse,
		toMsg,
		$gren_lang$browser$Http$resolve($gren_lang$core$Result$Ok));
};
var $gren_lang$browser$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $gren_lang$browser$Http$init = $gren_lang$core$Task$succeed(
	{
		reqs: $gren_lang$core$Dict$empty,
		subs: []
	});
var $gren_lang$core$Process$kill = _Scheduler_kill;
var $gren_lang$core$Process$spawn = _Scheduler_spawn;
var $gren_lang$browser$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			var _v0 = $gren_lang$core$Array$popFirst(cmds);
			if (_v0.$ === 'Nothing') {
				return $gren_lang$core$Task$succeed(reqs);
			} else {
				var _v1 = _v0.a;
				var cmd = _v1.first;
				var otherCmds = _v1.rest;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v3 = A2($gren_lang$core$Dict$get, tracker, reqs);
					if (_v3.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v3.a;
						return A2(
							$gren_lang$core$Task$andThen,
							function (_v4) {
								return A3(
									$gren_lang$browser$Http$updateReqs,
									router,
									otherCmds,
									A2($gren_lang$core$Dict$remove, tracker, reqs));
							},
							$gren_lang$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$gren_lang$core$Task$andThen,
						function (pid) {
							var _v5 = req.tracker;
							if (_v5.$ === 'Nothing') {
								return A3($gren_lang$browser$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v5.a;
								return A3(
									$gren_lang$browser$Http$updateReqs,
									router,
									otherCmds,
									A3($gren_lang$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$gren_lang$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$gren_lang$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $gren_lang$browser$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$gren_lang$core$Task$andThen,
			function (reqs) {
				return $gren_lang$core$Task$succeed(
					{reqs: reqs, subs: subs});
			},
			A3($gren_lang$browser$Http$updateReqs, router, cmds, state.reqs));
	});
var $gren_lang$browser$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $gren_lang$core$Maybe$Just(
			A2(
				$gren_lang$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $gren_lang$core$Maybe$Nothing;
	});
var $gren_lang$browser$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.tracker;
		var progress = _v0.progress;
		return A2(
			$gren_lang$core$Task$andThen,
			function (_v1) {
				return $gren_lang$core$Task$succeed(state);
			},
			$gren_lang$core$Task$sequence(
				A2(
					$gren_lang$core$Array$filterMap,
					A3($gren_lang$browser$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $gren_lang$browser$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $gren_lang$browser$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $gren_lang$browser$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $gren_lang$browser$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $gren_lang$browser$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $gren_lang$browser$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$gren_lang$browser$Http$MySub,
			tracker,
			A2($gren_lang$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($gren_lang$browser$Http$init, $gren_lang$browser$Http$onEffects, $gren_lang$browser$Http$onSelfMsg, $gren_lang$browser$Http$cmdMap, $gren_lang$browser$Http$subMap);
var $gren_lang$browser$Http$command = _Platform_leaf('Http');
var $gren_lang$browser$Http$subscription = _Platform_leaf('Http');
var $gren_lang$browser$Http$request = function (r) {
	return $gren_lang$browser$Http$command(
		$gren_lang$browser$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $gren_lang$browser$Http$post = function (r) {
	return $gren_lang$browser$Http$request(
		{
			body: r.body,
			expect: r.expect,
			headers: [],
			method: 'POST',
			timeout: $gren_lang$core$Maybe$Nothing,
			tracker: $gren_lang$core$Maybe$Nothing,
			url: r.url
		});
};
var $gren_lang$browser$Http$stringBody = _Http_pair;
var $author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'OnSidebarFileClicked':
				var file = msg.a;
				var updatedModel = _Utils_update(
					model,
					{
						selectedFile: $gren_lang$core$Maybe$Just(file)
					});
				return {command: $gren_lang$core$Platform$Cmd$none, model: updatedModel};
			case 'OnSaveButtonClicked':
				var fileEncoder = function (file) {
					return $gren_lang$core$Json$Encode$object(
						[
							{
							key: 'name',
							value: $gren_lang$core$Json$Encode$string(file.name)
						},
							{
							key: 'extension',
							value: $gren_lang$core$Json$Encode$string('gren')
						},
							{
							key: 'content',
							value: $gren_lang$core$Json$Encode$string(file.content)
						}
						]);
				};
				var filesEncoder = function (files) {
					return A2($gren_lang$core$Json$Encode$array, fileEncoder, files);
				};
				var requestEncoder = F2(
					function (folderName, files) {
						return $gren_lang$core$Json$Encode$object(
							[
								{
								key: 'folderName',
								value: $gren_lang$core$Json$Encode$string(folderName)
							},
								{
								key: 'files',
								value: filesEncoder(files)
							}
							]);
					});
				var encodedRequest = A2(
					$gren_lang$core$Json$Encode$encode,
					0,
					A2(requestEncoder, model.folderName, model.files));
				var request = $gren_lang$browser$Http$post(
					{
						body: A2($gren_lang$browser$Http$stringBody, 'application/json', encodedRequest),
						expect: $gren_lang$browser$Http$expectString($author$project$Message$GotResponse),
						url: '/api/save'
					});
				var _v1 = A2(
					$gren_lang$core$Debug$log,
					'encodedRequest',
					$gren_lang$core$Debug$toString(encodedRequest));
				return {command: request, model: model};
			default:
				var response = msg.a;
				var _v2 = A2($gren_lang$core$Debug$log, 'response', response);
				return {command: $gren_lang$core$Platform$Cmd$none, model: model};
		}
	});
var $author$project$Message$OnSaveButtonClicked = {$: 'OnSaveButtonClicked'};
var $author$project$View$viewCodeEditor = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('h-screen'),
			$gren_lang$browser$Html$Attributes$class('bg-slate-500'),
			$gren_lang$browser$Html$Attributes$class('w-full')
		],
		function () {
			var _v0 = model.selectedFile;
			if (_v0.$ === 'Just') {
				var file = _v0.a;
				return [
					A2(
					$gren_lang$browser$Html$code,
					[
						$gren_lang$browser$Html$Attributes$class('whitespace-pre-wrap')
					],
					[
						$gren_lang$browser$Html$text(file.content)
					])
				];
			} else {
				return [
					$gren_lang$browser$Html$text('No file selected')
				];
			}
		}());
};
var $gren_lang$browser$Html$iframe = $gren_lang$browser$Html$node('iframe');
var $gren_lang$browser$Html$Attributes$src = function (url) {
	return A2($gren_lang$browser$Html$Attributes$stringProperty, 'src', url);
};
var $author$project$View$viewResult = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('h-screen'),
			$gren_lang$browser$Html$Attributes$class('w-full'),
			$gren_lang$browser$Html$Attributes$class('border-2 border-red-500')
		],
		[
			A2(
			$gren_lang$browser$Html$iframe,
			[
				$gren_lang$browser$Html$Attributes$class('w-full h-full'),
				$gren_lang$browser$Html$Attributes$src('http://localhost:3000/iframe/df9352c4-e9e5-4fe8-9ee3-c5b418970bff_1')
			],
			[])
		]);
};
var $gren_lang$browser$Html$Attributes$action = function (uri) {
	return A2($gren_lang$browser$Html$Attributes$stringProperty, 'action', uri);
};
var $gren_lang$browser$Html$form = $gren_lang$browser$Html$node('form');
var $gren_lang$browser$Html$Attributes$method = $gren_lang$browser$Html$Attributes$stringProperty('method');
var $gren_lang$browser$Html$Attributes$name = $gren_lang$browser$Html$Attributes$stringProperty('name');
var $author$project$View$viewSaveForm = function (model) {
	return A2(
		$gren_lang$browser$Html$form,
		[
			$gren_lang$browser$Html$Attributes$method('post'),
			$gren_lang$browser$Html$Attributes$action('/api/save')
		],
		[
			A2(
			$gren_lang$browser$Html$input,
			[
				$gren_lang$browser$Html$Attributes$name('folderName'),
				$gren_lang$browser$Html$Attributes$value('df9352c4-e9e5-4fe8-9ee3-c5b418970bff_1')
			],
			[]),
			A2(
			$gren_lang$browser$Html$input,
			[
				$gren_lang$browser$Html$Attributes$name('file[]'),
				$gren_lang$browser$Html$Attributes$value('Main.gren')
			],
			[]),
			A2(
			$gren_lang$browser$Html$button,
			[
				$gren_lang$browser$Html$Attributes$type_('submit')
			],
			[
				$gren_lang$browser$Html$text('SAVE!!!')
			])
		]);
};
var $author$project$Message$OnSidebarFileClicked = function (a) {
	return {$: 'OnSidebarFileClicked', a: a};
};
var $author$project$View$viewSidebarFile = function (file) {
	return A2(
		$gren_lang$browser$Html$button,
		[
			$gren_lang$browser$Html$Attributes$class('h-8'),
			$gren_lang$browser$Html$Attributes$class('bg-blue-700'),
			$gren_lang$browser$Html$Attributes$class('w-full'),
			$gren_lang$browser$Html$Events$onClick(
			$author$project$Message$OnSidebarFileClicked(file))
		],
		[
			$gren_lang$browser$Html$text(file.name)
		]);
};
var $author$project$View$viewSidebarFiles = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('h-full'),
			$gren_lang$browser$Html$Attributes$class('bg-blue-600'),
			A2(
			$gren_lang$browser$Html$Attributes$style,
			'width',
			$gren_lang$core$String$fromInt(model.sidebarWidth) + 'px')
		],
		A2($gren_lang$core$Array$map, $author$project$View$viewSidebarFile, model.files));
};
var $author$project$View$viewSidebar = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('h-screen'),
			$gren_lang$browser$Html$Attributes$class('bg-slate-600'),
			A2(
			$gren_lang$browser$Html$Attributes$style,
			'width',
			$gren_lang$core$String$fromInt(model.sidebarWidth) + 'px')
		],
		[
			$author$project$View$viewSaveForm(model),
			$author$project$View$viewSidebarFiles(model)
		]);
};
var $author$project$View$view = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('w-screen h-screen'),
			$gren_lang$browser$Html$Attributes$class('flex'),
			$gren_lang$browser$Html$Attributes$class('bg-slate-500')
		],
		[
			A2(
			$gren_lang$browser$Html$div,
			[],
			[
				$gren_lang$browser$Html$text(model.folderName)
			]),
			$author$project$View$viewSidebar(model),
			$author$project$View$viewCodeEditor(model),
			$author$project$View$viewResult(model),
			A2(
			$gren_lang$browser$Html$button,
			[
				$gren_lang$browser$Html$Events$onClick($author$project$Message$OnSaveButtonClicked)
			],
			[
				$gren_lang$browser$Html$text('Save via AJAX request')
			])
		]);
};
var $author$project$Main$main = $gren_lang$browser$Browser$element(
	{init: $author$project$Init$init, subscriptions: $author$project$Subscription$subscriptions, update: $author$project$Update$update, view: $author$project$View$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$gren_lang$core$Json$Decode$andThen,
		function (folderName) {
			return A2(
				$gren_lang$core$Json$Decode$andThen,
				function (files) {
					return $gren_lang$core$Json$Decode$succeed(
						{files: files, folderName: folderName});
				},
				A2(
					$gren_lang$core$Json$Decode$field,
					'files',
					$gren_lang$core$Json$Decode$array(
						A2(
							$gren_lang$core$Json$Decode$andThen,
							function (name) {
								return A2(
									$gren_lang$core$Json$Decode$andThen,
									function (extension) {
										return A2(
											$gren_lang$core$Json$Decode$andThen,
											function (content) {
												return $gren_lang$core$Json$Decode$succeed(
													{content: content, extension: extension, name: name});
											},
											A2($gren_lang$core$Json$Decode$field, 'content', $gren_lang$core$Json$Decode$string));
									},
									A2($gren_lang$core$Json$Decode$field, 'extension', $gren_lang$core$Json$Decode$string));
							},
							A2($gren_lang$core$Json$Decode$field, 'name', $gren_lang$core$Json$Decode$string)))));
		},
		A2($gren_lang$core$Json$Decode$field, 'folderName', $gren_lang$core$Json$Decode$string)))({"versions":{"gren":"0.2.1"},"types":{"message":"Message.Msg","aliases":{"Model.File":{"args":[],"type":"{ name : String.String, extension : String.String, content : String.String }"}},"unions":{"Message.Msg":{"args":[],"tags":{"OnSidebarFileClicked":["Model.File"],"OnSaveButtonClicked":[],"GotResponse":["Result.Result Http.Error String.String"]}},"Http.Error":{"args":[],"tags":{"BadUrl":["String.String"],"Timeout":[],"NetworkError":[],"BadStatus":["Basics.Int"],"BadBody":["String.String"]}},"Result.Result":{"args":["error","value"],"tags":{"Ok":["value"],"Err":["error"]}},"String.String":{"args":[],"tags":{"String":[]}},"Basics.Int":{"args":[],"tags":{"Int":[]}}}}})}});}(this.module ? this.module.exports : this));