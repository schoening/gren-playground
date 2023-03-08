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


var _WebStorage_length = function (useLocalStorage) {
    return _Scheduler_binding(function (callback) {
        try {
            var length = _WebStorage_getStore(useLocalStorage).length;
        } catch (e) {
            return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$AccessError));
        }

        return callback(_Scheduler_succeed(length));
    });
};

var _WebStorage_key = F2(function(useLocalStorage, index) {
    return _Scheduler_binding(function (callback) {
        try {
            var key = _WebStorage_getStore(useLocalStorage).key(index);

            if (key == null) {
                return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$NoValue));
            } else {
                return callback(_Scheduler_succeed(key));
            }
        } catch (e) {
            return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$ReadBlocked));
        }
    });
});

var _WebStorage_get = F2(function(useLocalStorage, key) {
    return _Scheduler_binding(function (callback) {
        try {
            var item = _WebStorage_getStore(useLocalStorage).getItem(key);

            if (item == null) {
                return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$NoValue));
            } else {
                return callback(_Scheduler_succeed(item));
            }
        } catch (e) {
            return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$ReadBlocked));
        }
    });
});

var _WebStorage_set = F3(function (useLocalStorage, key, value) {
    return _Scheduler_binding(function (callback) {
        try {
            _WebStorage_getStore(useLocalStorage).setItem(key, value);
        } catch (err) {
            if (err.name === 'QuotaExceededError') {
                return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$QuotaExceeded));
            } else {
                return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$WriteBlocked));
            }
        }

        return callback(_Scheduler_succeed({}));
    })
});

var _WebStorage_remove = F2(function (useLocalStorage, key) {
    return _Scheduler_binding(function (callback) {
        try {
            _WebStorage_getStore(useLocalStorage).removeItem(key);
        } catch (err) {
            return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$AccessError));
        }

        return callback(_Scheduler_succeed({}));
    })
});

var _WebStorage_clear = function (useLocalStorage) {
    return _Scheduler_binding(function (callback) {
        try {
            _WebStorage_getStore(useLocalStorage).clear();
        } catch (err) {
            return callback(_Scheduler_fail($gren_lang$web_storage$WebStorage$AccessError));
        }

        return callback(_Scheduler_succeed({}));
    });
};


// Private functions

var _WebStorage_getStore = function(persist) {
    return persist ? window.localStorage : window.sessionStorage;
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
var $gren_lang$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $gren_lang$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $gren_lang$core$Basics$identity = function (x) {
	return x;
};
var $gren_lang$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $gren_lang$url$Url$Http = {$: 'Http'};
var $gren_lang$url$Url$Https = {$: 'Https'};
var $gren_lang$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $gren_lang$core$String$contains = _String_contains;
var $gren_lang$core$String$length = _String_length;
var $gren_lang$core$Basics$lt = _Utils_lt;
var $gren_lang$core$String$slice = _String_slice;
var $gren_lang$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$gren_lang$core$String$slice,
			n,
			$gren_lang$core$String$length(string),
			string);
	});
var $gren_lang$core$String$indices = _String_indexes;
var $gren_lang$core$Basics$eq = _Utils_equal;
var $gren_lang$core$String$isEmpty = function (string) {
	return string === '';
};
var $gren_lang$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($gren_lang$core$String$slice, 0, n, string);
	});
var $gren_lang$core$String$toInt = _String_toInt;
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
var $gren_lang$core$Array$get = _Array_get;
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
var $gren_lang$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $gren_lang$core$Task$succeed = _Scheduler_succeed;
var $gren_lang$core$Task$init = $gren_lang$core$Task$succeed(
	{});
var $gren_lang$core$Array$map = _Array_map;
var $gren_lang$core$Task$andThen = _Scheduler_andThen;
var $gren_lang$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
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
var $gren_lang$core$Array$foldl = _Array_foldl;
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
var $gren_lang$browser$Browser$element = _Browser_element;
var $gren_lang$core$Json$Decode$field = _Json_decodeField;
var $author$project$Model$FolderName = function (a) {
	return {$: 'FolderName', a: a};
};
var $author$project$Model$New = {$: 'New'};
var $author$project$Message$OnGotSelectedFileFromLocalStorage = function (a) {
	return {$: 'OnGotSelectedFileFromLocalStorage', a: a};
};
var $gren_lang$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $gren_lang$core$Task$onError = _Scheduler_onError;
var $gren_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $gren_lang$core$Task$command(
			$gren_lang$core$Task$Perform(
				A2(
					$gren_lang$core$Task$onError,
					A2(
						$gren_lang$core$Basics$composeL,
						A2($gren_lang$core$Basics$composeL, $gren_lang$core$Task$succeed, resultToMessage),
						$gren_lang$core$Result$Err),
					A2(
						$gren_lang$core$Task$andThen,
						A2(
							$gren_lang$core$Basics$composeL,
							A2($gren_lang$core$Basics$composeL, $gren_lang$core$Task$succeed, resultToMessage),
							$gren_lang$core$Result$Ok),
						task))));
	});
var $gren_lang$web_storage$WebStorage$AccessError = {$: 'AccessError'};
var $gren_lang$web_storage$WebStorage$NoValue = {$: 'NoValue'};
var $gren_lang$web_storage$WebStorage$QuotaExceeded = {$: 'QuotaExceeded'};
var $gren_lang$web_storage$WebStorage$ReadBlocked = {$: 'ReadBlocked'};
var $gren_lang$web_storage$WebStorage$WriteBlocked = {$: 'WriteBlocked'};
var $gren_lang$web_storage$Internal$WebStorage$get = _WebStorage_get;
var $gren_lang$web_storage$LocalStorage$get = function (key) {
	return A2($gren_lang$web_storage$Internal$WebStorage$get, true, key);
};
var $gren_lang$core$Debug$log = _Debug_log;
var $gren_lang$core$Array$sortBy = _Array_sortBy;
var $gren_lang$core$Debug$toString = _Debug_toString;
var $author$project$Init$init = function (flags) {
	var initialModel = {
		files: A2(
			$gren_lang$core$Array$sortBy,
			function (f) {
				return (f.name === 'Main') ? 1 : 2;
			},
			flags.files),
		folderName: (flags.folderName === 'new') ? $author$project$Model$New : $author$project$Model$FolderName(flags.folderName),
		newFileName: '',
		reloadIframeHack: 0,
		selectedFileName: $gren_lang$core$Maybe$Nothing,
		showDeleteFileModal: $gren_lang$core$Maybe$Nothing,
		showNewFileModal: false,
		showUpdateFileNameModal: $gren_lang$core$Maybe$Nothing,
		sidebarWidth: 200
	};
	var folderName = function () {
		var _v1 = initialModel.folderName;
		if (_v1.$ === 'New') {
			return 'new';
		} else {
			var name = _v1.a;
			return name;
		}
	}();
	var getSelectedFile = $gren_lang$web_storage$LocalStorage$get('selected-file' + ('_' + folderName));
	var _v0 = A2(
		$gren_lang$core$Debug$log,
		'flags',
		$gren_lang$core$Debug$toString(flags));
	return {
		command: A2($gren_lang$core$Task$attempt, $author$project$Message$OnGotSelectedFileFromLocalStorage, getSelectedFile),
		model: initialModel
	};
};
var $gren_lang$core$Json$Decode$string = _Json_decodeString;
var $author$project$Message$FromJS_CodeEditorHasChanged = function (a) {
	return {$: 'FromJS_CodeEditorHasChanged', a: a};
};
var $gren_lang$core$Platform$Sub$batch = _Platform_batch;
var $author$project$Subscription$toGren_CodeEditorHasChanged = _Platform_incomingPort('toGren_CodeEditorHasChanged', $gren_lang$core$Json$Decode$string);
var $author$project$Subscription$subscriptions = function (model) {
	return $gren_lang$core$Platform$Sub$batch(
		[
			$author$project$Subscription$toGren_CodeEditorHasChanged($author$project$Message$FromJS_CodeEditorHasChanged)
		]);
};
var $author$project$Message$AttemptFocusElement = function (a) {
	return {$: 'AttemptFocusElement', a: a};
};
var $author$project$Message$GotCreateNewProjectResponse = function (a) {
	return {$: 'GotCreateNewProjectResponse', a: a};
};
var $author$project$Message$GotSaveResponse = function (a) {
	return {$: 'GotSaveResponse', a: a};
};
var $author$project$Message$NoOp = {$: 'NoOp'};
var $gren_lang$core$Array$findFirst = _Array_findFirst;
var $gren_lang$core$Array$any = F2(
	function (fn, array) {
		var _v0 = A2($gren_lang$core$Array$findFirst, fn, array);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $gren_lang$core$Platform$Cmd$batch = _Platform_batch;
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
var $gren_lang$core$Json$Encode$string = _Json_wrap;
var $author$project$Data$fileEncoder = function (file) {
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
var $author$project$Data$filesEncoder = function (files) {
	return A2($gren_lang$core$Json$Encode$array, $author$project$Data$fileEncoder, files);
};
var $author$project$Data$createNewProjectRequestEncoder = function (files) {
	return $gren_lang$core$Json$Encode$object(
		[
			{
			key: 'files',
			value: $author$project$Data$filesEncoder(files)
		}
		]);
};
var $gren_lang$core$Json$Decode$decodeString = _Json_runOnString;
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
var $gren_lang$core$Dict$RBEmpty_gren_builtin = {$: 'RBEmpty_gren_builtin'};
var $gren_lang$core$Dict$empty = $gren_lang$core$Dict$RBEmpty_gren_builtin;
var $gren_lang$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $gren_lang$core$Platform$sendToSelf = _Platform_sendToSelf;
var $gren_lang$core$Basics$compare = _Utils_compare;
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
var $gren_lang$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $gren_lang$browser$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$gren_lang$core$Basics$identity,
			A2($gren_lang$core$Basics$composeR, toResult, toMsg));
	});
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
var $gren_lang$browser$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$gren_lang$browser$Http$expectStringResponse,
			toMsg,
			$gren_lang$browser$Http$resolve(
				function (string) {
					return A2(
						$gren_lang$core$Result$mapError,
						$gren_lang$core$Json$Decode$errorToString,
						A2($gren_lang$core$Json$Decode$decodeString, decoder, string));
				}));
	});
var $gren_lang$browser$Http$expectString = function (toMsg) {
	return A2(
		$gren_lang$browser$Http$expectStringResponse,
		toMsg,
		$gren_lang$browser$Http$resolve($gren_lang$core$Result$Ok));
};
var $gren_lang$core$Array$filter = F2(
	function (pred, array) {
		return A3(
			$gren_lang$core$Array$foldl,
			F2(
				function (v, acc) {
					return pred(v) ? A2($gren_lang$core$Array$pushLast, v, acc) : acc;
				}),
			[],
			array);
	});
var $gren_lang$browser$Browser$Dom$focus = _Browser_call('focus');
var $gren_lang$browser$Browser$Navigation$load = _Browser_load;
var $gren_lang$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $gren_lang$core$Maybe$Just(
				f(value));
		} else {
			return $gren_lang$core$Maybe$Nothing;
		}
	});
var $gren_lang$core$Basics$neq = _Utils_notEqual;
var $gren_lang$core$Platform$Cmd$none = $gren_lang$core$Platform$Cmd$batch(
	[]);
var $gren_lang$browser$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $gren_lang$browser$Http$init = $gren_lang$core$Task$succeed(
	{
		reqs: $gren_lang$core$Dict$empty,
		subs: []
	});
var $gren_lang$core$Process$kill = _Scheduler_kill;
var $gren_lang$core$Array$slice = _Array_slice;
var $gren_lang$core$Array$dropFirst = F2(
	function (n, array) {
		return A3(
			$gren_lang$core$Array$slice,
			n,
			$gren_lang$core$Array$length(array),
			array);
	});
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
var $gren_lang$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$gren_lang$core$String$join,
			after,
			A2($gren_lang$core$String$split, before, string));
	});
var $author$project$Data$saveRequestEncoder = F2(
	function (folderName, files) {
		return $gren_lang$core$Json$Encode$object(
			[
				{
				key: 'folderName',
				value: $gren_lang$core$Json$Encode$string(folderName)
			},
				{
				key: 'files',
				value: $author$project$Data$filesEncoder(files)
			}
			]);
	});
var $gren_lang$web_storage$Internal$WebStorage$set = _WebStorage_set;
var $gren_lang$web_storage$LocalStorage$set = F2(
	function (key, value) {
		return A3($gren_lang$web_storage$Internal$WebStorage$set, true, key, value);
	});
var $gren_lang$browser$Http$stringBody = _Http_pair;
var $author$project$Subscription$toJS_SetCodeEditorValue = _Platform_outgoingPort('toJS_SetCodeEditorValue', $gren_lang$core$Json$Encode$string);
var $gren_lang$core$String$trim = _String_trim;
var $gren_lang$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'OnSidebarFileClicked':
				var file = msg.a;
				var updatedModel = _Utils_update(
					model,
					{
						selectedFileName: $gren_lang$core$Maybe$Just(file.name)
					});
				var folderName = function () {
					var _v2 = model.folderName;
					if (_v2.$ === 'FolderName') {
						var name = _v2.a;
						return name;
					} else {
						return 'new';
					}
				}();
				return {
					command: $gren_lang$core$Platform$Cmd$batch(
						[
							A2(
							$gren_lang$core$Task$attempt,
							function (_v1) {
								return $author$project$Message$NoOp;
							},
							A2($gren_lang$web_storage$LocalStorage$set, 'selected-file' + ('_' + folderName), file.name)),
							$author$project$Subscription$toJS_SetCodeEditorValue(file.content)
						]),
					model: updatedModel
				};
			case 'FromJS_CodeEditorHasChanged':
				var code = msg.a;
				var updatedFiles = function () {
					var _v4 = model.selectedFileName;
					if (_v4.$ === 'Just') {
						var fileName = _v4.a;
						return A2(
							$gren_lang$core$Array$map,
							function (f) {
								return _Utils_eq(f.name, fileName) ? _Utils_update(
									f,
									{content: code}) : f;
							},
							model.files);
					} else {
						return model.files;
					}
				}();
				var _v3 = A2($gren_lang$core$Debug$log, 'FromJS_CodeEditorHasChanged', code);
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{files: updatedFiles})
				};
			case 'OnUpdateFileNameButtonClicked':
				var fileName = msg.a;
				return {
					command: A2(
						$gren_lang$core$Task$attempt,
						function (_v5) {
							return $author$project$Message$AttemptFocusElement('input');
						},
						$gren_lang$browser$Browser$Dom$focus('input')),
					model: _Utils_update(
						model,
						{
							showUpdateFileNameModal: $gren_lang$core$Maybe$Just(
								{newName: fileName, oldName: fileName})
						})
				};
			case 'OnUpdateFileNameModalFileNameChanged':
				var updatedFileName = msg.a;
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{
							showUpdateFileNameModal: A2(
								$gren_lang$core$Maybe$withDefault,
								$gren_lang$core$Maybe$Nothing,
								A2(
									$gren_lang$core$Maybe$map,
									function (_v6) {
										var oldName = _v6.oldName;
										return $gren_lang$core$Maybe$Just(
											{newName: updatedFileName, oldName: oldName});
									},
									model.showUpdateFileNameModal))
						})
				};
			case 'OnUpdateFileNameModalConfirmButtonClicked':
				var updatedFiles = A2(
					$gren_lang$core$Maybe$withDefault,
					model.files,
					A2(
						$gren_lang$core$Maybe$map,
						function (_v7) {
							var oldName = _v7.oldName;
							var newName = _v7.newName;
							return A2(
								$gren_lang$core$Array$map,
								function (f) {
									return _Utils_eq(f.name, oldName) ? _Utils_update(
										f,
										{name: newName}) : f;
								},
								model.files);
						},
						model.showUpdateFileNameModal));
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{files: updatedFiles, showUpdateFileNameModal: $gren_lang$core$Maybe$Nothing})
				};
			case 'OnUpdateFileNameModalCancelButtonClicked':
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{showUpdateFileNameModal: $gren_lang$core$Maybe$Nothing})
				};
			case 'OnSideBarDeleteFileButtonClicked':
				var fileName = msg.a;
				var updatedModel = _Utils_update(
					model,
					{
						showDeleteFileModal: $gren_lang$core$Maybe$Just(fileName)
					});
				return {command: $gren_lang$core$Platform$Cmd$none, model: updatedModel};
			case 'OnDeleteFileModalConfirmButtonClicked':
				var fileName = msg.a;
				var updatedFiles = A2(
					$gren_lang$core$Array$filter,
					function (f) {
						return !_Utils_eq(f.name, fileName);
					},
					model.files);
				var updatedModel = _Utils_update(
					model,
					{files: updatedFiles, showDeleteFileModal: $gren_lang$core$Maybe$Nothing});
				return {command: $gren_lang$core$Platform$Cmd$none, model: updatedModel};
			case 'OnDeleteFileModalCancelButtonClicked':
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{showDeleteFileModal: $gren_lang$core$Maybe$Nothing})
				};
			case 'NoOp':
				return {command: $gren_lang$core$Platform$Cmd$none, model: model};
			case 'OnGotSelectedFileFromLocalStorage':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var fileName = result.a;
					var selectedFile = A2(
						$gren_lang$core$Array$get,
						0,
						A2(
							$gren_lang$core$Array$filter,
							function (f) {
								return _Utils_eq(f.name, fileName);
							},
							model.files));
					var selectedFileName = A2(
						$gren_lang$core$Maybe$withDefault,
						$gren_lang$core$Maybe$Nothing,
						A2(
							$gren_lang$core$Maybe$map,
							function (f) {
								return $gren_lang$core$Maybe$Just(f.name);
							},
							selectedFile));
					return {
						command: A2(
							$gren_lang$core$Maybe$withDefault,
							$gren_lang$core$Platform$Cmd$none,
							A2(
								$gren_lang$core$Maybe$map,
								function (_v9) {
									var content = _v9.content;
									return $author$project$Subscription$toJS_SetCodeEditorValue(content);
								},
								selectedFile)),
						model: _Utils_update(
							model,
							{selectedFileName: selectedFileName})
					};
				} else {
					var selectedFileName = A2(
						$gren_lang$core$Maybe$map,
						function (f) {
							return f.name;
						},
						A2(
							$gren_lang$core$Array$findFirst,
							function (f) {
								return f.name === 'Main';
							},
							model.files));
					return {
						command: $gren_lang$core$Platform$Cmd$none,
						model: _Utils_update(
							model,
							{selectedFileName: selectedFileName})
					};
				}
			case 'OnSaveButtonClicked':
				var _v10 = model.folderName;
				if (_v10.$ === 'FolderName') {
					var fName = _v10.a;
					var encodedRequest = A2(
						$gren_lang$core$Json$Encode$encode,
						0,
						A2($author$project$Data$saveRequestEncoder, fName, model.files));
					var request = $gren_lang$browser$Http$post(
						{
							body: A2($gren_lang$browser$Http$stringBody, 'application/json', encodedRequest),
							expect: $gren_lang$browser$Http$expectString($author$project$Message$GotSaveResponse),
							url: '/api/save'
						});
					return {command: request, model: model};
				} else {
					var folderNameDecoder = A2($gren_lang$core$Json$Decode$field, 'folderName', $gren_lang$core$Json$Decode$string);
					var encodedRequest = A2(
						$gren_lang$core$Json$Encode$encode,
						0,
						$author$project$Data$createNewProjectRequestEncoder(model.files));
					var postCreateNewProject = $gren_lang$browser$Http$post(
						{
							body: A2($gren_lang$browser$Http$stringBody, 'application/json', encodedRequest),
							expect: A2($gren_lang$browser$Http$expectJson, $author$project$Message$GotCreateNewProjectResponse, folderNameDecoder),
							url: '/api/create'
						});
					return {command: postCreateNewProject, model: model};
				}
			case 'GotSaveResponse':
				var response = msg.a;
				var _v11 = A2($gren_lang$core$Debug$log, 'response', response);
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{reloadIframeHack: model.reloadIframeHack + 1})
				};
			case 'GotCreateNewProjectResponse':
				var resp = msg.a;
				var _v12 = A2($gren_lang$core$Debug$log, 'resp', resp);
				if (resp.$ === 'Ok') {
					var folderName = resp.a;
					return {
						command: $gren_lang$browser$Browser$Navigation$load('/project/' + folderName),
						model: model
					};
				} else {
					var err = resp.a;
					return {command: $gren_lang$core$Platform$Cmd$none, model: model};
				}
			case 'OnNewFileButtonClicked':
				return {
					command: A2(
						$gren_lang$core$Task$attempt,
						function (_v14) {
							return $author$project$Message$AttemptFocusElement('input');
						},
						$gren_lang$browser$Browser$Dom$focus('input')),
					model: _Utils_update(
						model,
						{showNewFileModal: true})
				};
			case 'OnNewFileNameChanged':
				var name = msg.a;
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{newFileName: name})
				};
			case 'OnNewFileModalCloseButtonClicked':
				return {
					command: $gren_lang$core$Platform$Cmd$none,
					model: _Utils_update(
						model,
						{newFileName: '', showNewFileModal: false})
				};
			case 'OnNewFileModalSaveButtonClicked':
				var newFileName = $gren_lang$core$String$trim(
					A3($gren_lang$core$String$replace, '.gren', '', model.newFileName));
				var newFile = {content: '', extension: '.gren', name: newFileName};
				var fileNameEmpty = newFileName === '';
				var fileExists = A2(
					$gren_lang$core$Array$any,
					function (f) {
						return _Utils_eq(f.name, newFileName);
					},
					model.files);
				var updatedFiles = (fileExists || fileNameEmpty) ? model.files : A2($gren_lang$core$Array$pushLast, newFile, model.files);
				var updatedModel = _Utils_update(
					model,
					{files: updatedFiles, newFileName: '', showNewFileModal: false});
				return {command: $gren_lang$core$Platform$Cmd$none, model: updatedModel};
			default:
				var searchQuery = msg.a;
				var focusElement = A2(
					$gren_lang$core$Task$attempt,
					function (_v16) {
						return $author$project$Message$NoOp;
					},
					$gren_lang$browser$Browser$Dom$focus(searchQuery));
				var _v15 = A2($gren_lang$core$Debug$log, 'searchQuery', searchQuery);
				return {command: focusElement, model: model};
		}
	});
var $gren_lang$browser$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $gren_lang$browser$Html$Attributes$property = $gren_lang$browser$VirtualDom$property;
var $gren_lang$browser$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$gren_lang$browser$Html$Attributes$property,
			key,
			$gren_lang$core$Json$Encode$string(string));
	});
var $gren_lang$browser$Html$Attributes$class = $gren_lang$browser$Html$Attributes$stringProperty('className');
var $gren_lang$browser$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $gren_lang$browser$Html$node = $gren_lang$browser$VirtualDom$node;
var $gren_lang$browser$Html$div = $gren_lang$browser$Html$node('div');
var $gren_lang$browser$VirtualDom$text = _VirtualDom_text;
var $gren_lang$browser$Html$text = $gren_lang$browser$VirtualDom$text;
var $author$project$Message$OnNewFileModalCloseButtonClicked = {$: 'OnNewFileModalCloseButtonClicked'};
var $author$project$Message$OnNewFileModalSaveButtonClicked = {$: 'OnNewFileModalSaveButtonClicked'};
var $author$project$Message$OnNewFileNameChanged = function (a) {
	return {$: 'OnNewFileNameChanged', a: a};
};
var $gren_lang$browser$Html$button = $gren_lang$browser$Html$node('button');
var $gren_lang$browser$Html$input = $gren_lang$browser$Html$node('input');
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
var $gren_lang$core$Array$foldr = _Array_foldr;
var $gren_lang$core$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($gren_lang$core$Array$foldr, $gren_lang$core$Json$Decode$field, decoder, fields);
	});
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
var $gren_lang$browser$Html$Attributes$placeholder = $gren_lang$browser$Html$Attributes$stringProperty('placeholder');
var $gren_lang$browser$Html$Attributes$value = $gren_lang$browser$Html$Attributes$stringProperty('value');
var $author$project$View$viewModal = F2(
	function (model, children) {
		return A2(
			$gren_lang$browser$Html$div,
			[
				$gren_lang$browser$Html$Attributes$class('w-full h-full'),
				$gren_lang$browser$Html$Attributes$class('fixed top-0 left-0'),
				$gren_lang$browser$Html$Attributes$class('flex justify-center items-center'),
				$gren_lang$browser$Html$Attributes$class('bg-black bg-opacity-50')
			],
			children);
	});
var $author$project$View$viewCreateNewFileModal = function (model) {
	return A2(
		$author$project$View$viewModal,
		model,
		[
			A2(
			$gren_lang$browser$Html$div,
			[
				$gren_lang$browser$Html$Attributes$class('bg-white rounded'),
				$gren_lang$browser$Html$Attributes$class('p-4 shadow')
			],
			[
				A2(
				$gren_lang$browser$Html$input,
				[
					$gren_lang$browser$Html$Attributes$class('w-full'),
					$gren_lang$browser$Html$Attributes$class('h-8'),
					$gren_lang$browser$Html$Attributes$class('bg-white'),
					$gren_lang$browser$Html$Attributes$class('text-black'),
					$gren_lang$browser$Html$Attributes$class('p-2'),
					$gren_lang$browser$Html$Attributes$class('border-2 border-black'),
					$gren_lang$browser$Html$Attributes$class('border-solid'),
					$gren_lang$browser$Html$Attributes$class('rounded'),
					$gren_lang$browser$Html$Attributes$class('outline-none'),
					$gren_lang$browser$Html$Attributes$placeholder('File name'),
					$gren_lang$browser$Html$Attributes$value(model.newFileName),
					$gren_lang$browser$Html$Events$onInput($author$project$Message$OnNewFileNameChanged)
				],
				[]),
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Attributes$class('w-full'),
					$gren_lang$browser$Html$Attributes$class('flex justify-between items-center'),
					$gren_lang$browser$Html$Attributes$class('mt-4')
				],
				[
					A2(
					$gren_lang$browser$Html$button,
					[
						$gren_lang$browser$Html$Events$onClick($author$project$Message$OnNewFileModalSaveButtonClicked)
					],
					[
						$gren_lang$browser$Html$text('Create File')
					]),
					A2(
					$gren_lang$browser$Html$button,
					[
						$gren_lang$browser$Html$Events$onClick($author$project$Message$OnNewFileModalCloseButtonClicked)
					],
					[
						$gren_lang$browser$Html$text('Cancel')
					])
				])
			])
		]);
};
var $author$project$Message$OnDeleteFileModalCancelButtonClicked = {$: 'OnDeleteFileModalCancelButtonClicked'};
var $author$project$Message$OnDeleteFileModalConfirmButtonClicked = function (a) {
	return {$: 'OnDeleteFileModalConfirmButtonClicked', a: a};
};
var $author$project$View$viewDeleteFileModal = F2(
	function (model, fileName) {
		return A2(
			$author$project$View$viewModal,
			model,
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Attributes$class('bg-white rounded'),
					$gren_lang$browser$Html$Attributes$class('p-4 shadow')
				],
				[
					A2(
					$gren_lang$browser$Html$div,
					[
						$gren_lang$browser$Html$Attributes$class('w-full'),
						$gren_lang$browser$Html$Attributes$class('flex justify-between items-center'),
						$gren_lang$browser$Html$Attributes$class('mt-4')
					],
					[
						$gren_lang$browser$Html$text('Are you sure you want to delete ' + (fileName + '?'))
					]),
					A2(
					$gren_lang$browser$Html$div,
					[
						$gren_lang$browser$Html$Attributes$class('w-full'),
						$gren_lang$browser$Html$Attributes$class('flex justify-between items-center'),
						$gren_lang$browser$Html$Attributes$class('mt-4')
					],
					[
						A2(
						$gren_lang$browser$Html$button,
						[
							$gren_lang$browser$Html$Events$onClick(
							$author$project$Message$OnDeleteFileModalConfirmButtonClicked(fileName))
						],
						[
							$gren_lang$browser$Html$text('DELETE')
						]),
						A2(
						$gren_lang$browser$Html$button,
						[
							$gren_lang$browser$Html$Events$onClick($author$project$Message$OnDeleteFileModalCancelButtonClicked)
						],
						[
							$gren_lang$browser$Html$text('Cancel')
						])
					])
				])
			]);
	});
var $gren_lang$browser$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $gren_lang$browser$Html$Attributes$attribute = $gren_lang$browser$VirtualDom$attribute;
var $author$project$View$viewCodeEditor = function (model) {
	var alwaysPropagate = function (msg) {
		return {message: msg, stopPropagation: false};
	};
	var onCut = function (tagger) {
		return A2(
			$gren_lang$browser$Html$Events$stopPropagationOn,
			'cut',
			A2(
				$gren_lang$core$Json$Decode$map,
				alwaysPropagate,
				A2($gren_lang$core$Json$Decode$map, tagger, $gren_lang$browser$Html$Events$targetValue)));
	};
	var onPaste = function (tagger) {
		return A2(
			$gren_lang$browser$Html$Events$stopPropagationOn,
			'paste',
			A2(
				$gren_lang$core$Json$Decode$map,
				alwaysPropagate,
				A2($gren_lang$core$Json$Decode$map, tagger, $gren_lang$browser$Html$Events$targetValue)));
	};
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('flex-1'),
			$gren_lang$browser$Html$Attributes$class('bg-slate-900'),
			$gren_lang$browser$Html$Attributes$class('w-full')
		],
		function () {
			var _v0 = model.selectedFileName;
			if (_v0.$ === 'Just') {
				var fileName = _v0.a;
				var maybeFile = A2(
					$gren_lang$core$Array$findFirst,
					function (file) {
						return _Utils_eq(file.name, fileName);
					},
					model.files);
				if (maybeFile.$ === 'Just') {
					var file = maybeFile.a;
					return [
						A3(
						$gren_lang$browser$Html$node,
						'wc-monaco-editor',
						[
							A2($gren_lang$browser$Html$Attributes$attribute, 'language', 'elm')
						],
						[])
					];
				} else {
					return [
						A2(
						$gren_lang$browser$Html$div,
						[
							$gren_lang$browser$Html$Attributes$class('text-white')
						],
						[
							$gren_lang$browser$Html$text('File not found')
						])
					];
				}
			} else {
				return [
					A2(
					$gren_lang$browser$Html$div,
					[
						$gren_lang$browser$Html$Attributes$class('text-white')
					],
					[
						$gren_lang$browser$Html$text('No file selected')
					])
				];
			}
		}());
};
var $gren_lang$browser$Html$iframe = $gren_lang$browser$Html$node('iframe');
var $gren_lang$browser$Html$Attributes$src = function (url) {
	return A2($gren_lang$browser$Html$Attributes$stringProperty, 'src', url);
};
var $author$project$View$viewIframe = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('flex-1'),
			$gren_lang$browser$Html$Attributes$class('w-full'),
			$gren_lang$browser$Html$Attributes$class('border-2 border-red-500'),
			$gren_lang$browser$Html$Attributes$class('bg-white')
		],
		function () {
			var _v0 = model.folderName;
			if (_v0.$ === 'FolderName') {
				var folderName = _v0.a;
				return [
					A2(
					$gren_lang$browser$Html$iframe,
					[
						$gren_lang$browser$Html$Attributes$class('w-full h-full'),
						$gren_lang$browser$Html$Attributes$src(
						'/iframe/' + (folderName + ('?' + $gren_lang$core$String$fromInt(model.reloadIframeHack))))
					],
					[])
				];
			} else {
				return [
					A2(
					$gren_lang$browser$Html$div,
					[
						$gren_lang$browser$Html$Attributes$class('w-full h-full')
					],
					[])
				];
			}
		}());
};
var $author$project$Message$OnSaveButtonClicked = {$: 'OnSaveButtonClicked'};
var $author$project$View$viewRightTopBar = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('w-full h-10'),
			$gren_lang$browser$Html$Attributes$class('flex items-center'),
			$gren_lang$browser$Html$Attributes$class('px-2'),
			$gren_lang$browser$Html$Attributes$class('bg-indigo-800'),
			$gren_lang$browser$Html$Attributes$class('border-b-2 border-indigo-600')
		],
		[
			A2(
			$gren_lang$browser$Html$button,
			[
				$gren_lang$browser$Html$Attributes$class('h-8'),
				$gren_lang$browser$Html$Attributes$class('text-white'),
				$gren_lang$browser$Html$Attributes$class('p-2'),
				$gren_lang$browser$Html$Attributes$class('bg-orange-500'),
				$gren_lang$browser$Html$Attributes$class('flex justify-center items-center'),
				$gren_lang$browser$Html$Events$onClick($author$project$Message$OnSaveButtonClicked)
			],
			[
				$gren_lang$browser$Html$text('Save')
			])
		]);
};
var $author$project$View$viewRight = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('w-full flex-1'),
			$gren_lang$browser$Html$Attributes$class('flex flex-col')
		],
		[
			$author$project$View$viewRightTopBar(model),
			A2(
			$gren_lang$browser$Html$div,
			[
				$gren_lang$browser$Html$Attributes$class('w-full'),
				$gren_lang$browser$Html$Attributes$class('flex-1 flex flex-row')
			],
			[
				$author$project$View$viewCodeEditor(model),
				$author$project$View$viewIframe(model)
			])
		]);
};
var $gren_lang$browser$VirtualDom$style = _VirtualDom_style;
var $gren_lang$browser$Html$Attributes$style = $gren_lang$browser$VirtualDom$style;
var $author$project$Message$OnNewFileButtonClicked = {$: 'OnNewFileButtonClicked'};
var $gren_lang$browser$Html$i = $gren_lang$browser$Html$node('i');
var $author$project$View$viewSideBarTopPanel = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('w-full h-10'),
			$gren_lang$browser$Html$Attributes$class('bg-indigo-800'),
			$gren_lang$browser$Html$Attributes$class('border-b-2 border-indigo-600'),
			$gren_lang$browser$Html$Attributes$class('flex justify-end items-center'),
			$gren_lang$browser$Html$Attributes$class('px-2')
		],
		[
			A2(
			$gren_lang$browser$Html$button,
			[
				$gren_lang$browser$Html$Events$onClick($author$project$Message$OnNewFileButtonClicked)
			],
			[
				A2(
				$gren_lang$browser$Html$i,
				[
					$gren_lang$browser$Html$Attributes$class('gg-file-add'),
					$gren_lang$browser$Html$Attributes$class('text-white')
				],
				[])
			])
		]);
};
var $author$project$Message$OnSideBarDeleteFileButtonClicked = function (a) {
	return {$: 'OnSideBarDeleteFileButtonClicked', a: a};
};
var $author$project$Message$OnSidebarFileClicked = function (a) {
	return {$: 'OnSidebarFileClicked', a: a};
};
var $author$project$Message$OnUpdateFileNameButtonClicked = function (a) {
	return {$: 'OnUpdateFileNameButtonClicked', a: a};
};
var $gren_lang$browser$Html$Attributes$classList = function (classes) {
	return $gren_lang$browser$Html$Attributes$class(
		A2(
			$gren_lang$core$String$join,
			' ',
			A2(
				$gren_lang$core$Array$map,
				function ($) {
					return $._class;
				},
				A2(
					$gren_lang$core$Array$filter,
					function ($) {
						return $.enabled;
					},
					classes))));
};
var $gren_lang$browser$Html$span = $gren_lang$browser$Html$node('span');
var $author$project$View$viewSidebarFile = F2(
	function (model, file) {
		var isSelectedFile = function () {
			var _v0 = model.selectedFileName;
			if (_v0.$ === 'Just') {
				var fileName = _v0.a;
				return _Utils_eq(fileName, file.name);
			} else {
				return false;
			}
		}();
		return A2(
			$gren_lang$browser$Html$button,
			[
				$gren_lang$browser$Html$Attributes$class('h-8'),
				$gren_lang$browser$Html$Attributes$class('bg-indigo-800 text-slate-200'),
				$gren_lang$browser$Html$Attributes$class('w-full'),
				$gren_lang$browser$Html$Attributes$class('flex justify-start items-center'),
				$gren_lang$browser$Html$Attributes$class('pl-2'),
				$gren_lang$browser$Html$Attributes$classList(
				[
					{_class: 'text-white bg-indigo-600', enabled: isSelectedFile}
				]),
				$gren_lang$browser$Html$Events$onClick(
				$author$project$Message$OnSidebarFileClicked(file))
			],
			(file.name === 'Main') ? [
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Attributes$class('w-6')
				],
				[
					A2(
					$gren_lang$browser$Html$i,
					[
						$gren_lang$browser$Html$Attributes$class('gg-file-document'),
						$gren_lang$browser$Html$Attributes$class('mr-2')
					],
					[])
				]),
				A2(
				$gren_lang$browser$Html$span,
				[
					$gren_lang$browser$Html$Attributes$class('whitespace-nowrap text-left flex-1 w-full')
				],
				[
					$gren_lang$browser$Html$text(
					_Utils_ap(file.name, file.extension))
				])
			] : [
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Attributes$class('w-6')
				],
				[
					A2(
					$gren_lang$browser$Html$i,
					[
						$gren_lang$browser$Html$Attributes$class('gg-file-document'),
						$gren_lang$browser$Html$Attributes$class('mr-2')
					],
					[])
				]),
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Attributes$class('flex items-center w-full')
				],
				[
					A2(
					$gren_lang$browser$Html$span,
					[
						$gren_lang$browser$Html$Attributes$class('whitespace-nowrap'),
						$gren_lang$browser$Html$Attributes$class('flex-1 w-full text-left')
					],
					[
						$gren_lang$browser$Html$text(
						_Utils_ap(file.name, file.extension))
					]),
					A2(
					$gren_lang$browser$Html$button,
					[
						$gren_lang$browser$Html$Events$onClick(
						$author$project$Message$OnSideBarDeleteFileButtonClicked(file.name)),
						$gren_lang$browser$Html$Attributes$class('mr-2')
					],
					[
						A2(
						$gren_lang$browser$Html$i,
						[
							$gren_lang$browser$Html$Attributes$class('gg-trash')
						],
						[])
					]),
					A2(
					$gren_lang$browser$Html$button,
					[
						$gren_lang$browser$Html$Events$onClick(
						$author$project$Message$OnUpdateFileNameButtonClicked(file.name))
					],
					[
						A2(
						$gren_lang$browser$Html$i,
						[
							$gren_lang$browser$Html$Attributes$class('gg-rename')
						],
						[])
					])
				])
			]);
	});
var $author$project$View$viewSidebarFiles = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class(''),
			$gren_lang$browser$Html$Attributes$class('bg-indigo-800'),
			A2(
			$gren_lang$browser$Html$Attributes$style,
			'width',
			$gren_lang$core$String$fromInt(model.sidebarWidth) + 'px')
		],
		A2(
			$gren_lang$core$Array$map,
			$author$project$View$viewSidebarFile(model),
			model.files));
};
var $author$project$View$viewSidebar = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('h-full'),
			$gren_lang$browser$Html$Attributes$class('bg-indigo-800'),
			A2(
			$gren_lang$browser$Html$Attributes$style,
			'width',
			$gren_lang$core$String$fromInt(model.sidebarWidth) + 'px')
		],
		[
			$author$project$View$viewSideBarTopPanel(model),
			$author$project$View$viewSidebarFiles(model)
		]);
};
var $author$project$Message$OnUpdateFileNameModalCancelButtonClicked = {$: 'OnUpdateFileNameModalCancelButtonClicked'};
var $author$project$Message$OnUpdateFileNameModalConfirmButtonClicked = {$: 'OnUpdateFileNameModalConfirmButtonClicked'};
var $author$project$Message$OnUpdateFileNameModalFileNameChanged = function (a) {
	return {$: 'OnUpdateFileNameModalFileNameChanged', a: a};
};
var $author$project$View$viewUpdateFileNameModal = F2(
	function (model, newFileName) {
		return A2(
			$author$project$View$viewModal,
			model,
			[
				A2(
				$gren_lang$browser$Html$div,
				[
					$gren_lang$browser$Html$Attributes$class('bg-white rounded'),
					$gren_lang$browser$Html$Attributes$class('p-4 shadow')
				],
				[
					A2(
					$gren_lang$browser$Html$input,
					[
						$gren_lang$browser$Html$Attributes$class('w-full'),
						$gren_lang$browser$Html$Attributes$class('h-8'),
						$gren_lang$browser$Html$Attributes$class('bg-white'),
						$gren_lang$browser$Html$Attributes$class('text-black'),
						$gren_lang$browser$Html$Attributes$class('p-2'),
						$gren_lang$browser$Html$Attributes$class('border-2 border-black'),
						$gren_lang$browser$Html$Attributes$class('border-solid'),
						$gren_lang$browser$Html$Attributes$class('rounded'),
						$gren_lang$browser$Html$Attributes$class('outline-none'),
						$gren_lang$browser$Html$Attributes$placeholder('File name'),
						$gren_lang$browser$Html$Attributes$value(newFileName),
						$gren_lang$browser$Html$Events$onInput($author$project$Message$OnUpdateFileNameModalFileNameChanged)
					],
					[]),
					A2(
					$gren_lang$browser$Html$div,
					[
						$gren_lang$browser$Html$Attributes$class('w-full'),
						$gren_lang$browser$Html$Attributes$class('flex justify-between items-center'),
						$gren_lang$browser$Html$Attributes$class('mt-4')
					],
					[
						A2(
						$gren_lang$browser$Html$button,
						[
							$gren_lang$browser$Html$Events$onClick($author$project$Message$OnUpdateFileNameModalConfirmButtonClicked)
						],
						[
							$gren_lang$browser$Html$text('Update')
						]),
						A2(
						$gren_lang$browser$Html$button,
						[
							$gren_lang$browser$Html$Events$onClick($author$project$Message$OnUpdateFileNameModalCancelButtonClicked)
						],
						[
							$gren_lang$browser$Html$text('Cancel')
						])
					])
				])
			]);
	});
var $author$project$View$view = function (model) {
	return A2(
		$gren_lang$browser$Html$div,
		[
			$gren_lang$browser$Html$Attributes$class('w-screen h-screen'),
			$gren_lang$browser$Html$Attributes$class('flex'),
			$gren_lang$browser$Html$Attributes$class('bg-slate-900')
		],
		[
			$author$project$View$viewSidebar(model),
			$author$project$View$viewRight(model),
			model.showNewFileModal ? $author$project$View$viewCreateNewFileModal(model) : $gren_lang$browser$Html$text(''),
			function () {
			var _v0 = model.showDeleteFileModal;
			if (_v0.$ === 'Just') {
				var fileName = _v0.a;
				return A2($author$project$View$viewDeleteFileModal, model, fileName);
			} else {
				return $gren_lang$browser$Html$text('');
			}
		}(),
			function () {
			var _v1 = model.showUpdateFileNameModal;
			if (_v1.$ === 'Just') {
				var newName = _v1.a.newName;
				return A2($author$project$View$viewUpdateFileNameModal, model, newName);
			} else {
				return $gren_lang$browser$Html$text('');
			}
		}()
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
		A2($gren_lang$core$Json$Decode$field, 'folderName', $gren_lang$core$Json$Decode$string)))(0)}});}(this.module ? this.module.exports : this));