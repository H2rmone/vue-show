(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.5.9
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function no(a, b, c) {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = {}.watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check
var formatComponentName = noop;

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned;
}

function cloneVNodes(vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res;
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this) : childVal, typeof parentVal === 'function' ? parentVal.call(this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else if ("development" !== 'production' && inject) {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn("Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ') + ", got " + toRawType(value) + ".", vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type);
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true;
    }
  }
  /* istanbul ignore next */
  return false;
}

/*  */

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function macroTimerFunc() {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function macroTimerFunc() {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function macroTimerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function microTimerFunc() {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res;
  });
}

function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val)) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };
    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender() {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject("timeout (" + res.timeout + "ms)");
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = child.data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res;
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }observerState.shouldConvert = true;
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (methods[key] == null) {
        warn("Method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }
      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, keyOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }
    return result;
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    ret._isVList = true;
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes);
  } else {
    return nodes;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInAlias, eventKeyName) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1;
    } else {
      return keyCodes !== eventKeyCode;
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor, isOnce) {
  // render fns generated by compiler < 2.5.4 does not provide v-once
  // information to runtime so be conservative
  var isOldVersion = arguments.length < 3;
  // if a static tree is generated by v-once, it is cached on the instance;
  // otherwise it is purely static and can be cached on the shared options
  // across all instances.
  var renderFns = this.$options.staticRenderFns;
  var cached = isOldVersion || isOnce ? this._staticTrees || (this._staticTrees = []) : renderFns.cached || (renderFns.cached = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = renderFns[index].call(this._renderProxy, null, this);
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

/*  */

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    return resolveSlots(children, parent);
  };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options);
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  };
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) {
      applyNS(vnode, ns);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || slot[0] && slot[0].elm) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}

/*  */

var uid = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue$3(options) {
  if ("development" !== 'production' && !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
      }
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include(val) {
      pruneCache(this, function (name) {
        return matches(val, name);
      });
    },
    exclude: function exclude(val) {
      pruneCache(this, function (name) {
        return !matches(val, name);
      });
    }
  },

  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
      // not included
      include && (!name || !matches(include, name)) ||
      // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});

Vue$3.version = '2.5.9';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }
      res += stringified;
    }
  }
  return res;
}

function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }
      res += key;
    }
  }
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !vnodeToMove) {
            warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
          }
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && !el.__ieph) {
        var blocker = function blocker(e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler(handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, once$$1, capture, passive) {
  handler = withMacroTask(handler);
  if (once$$1) {
    handler = createOnceHandler(handler, event, capture);
  }
  target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
}

function isDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}

function isInputChanged(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal);
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim();
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def === 'undefined' ? 'undefined' : _typeof(def)) === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag || isAsyncPlaceholder(c);
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
  if ("development" !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
  }
}, 0);

/*  */

var easings = {
  // Cubic
  easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

  // Circ
  easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',

  // Expo
  easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',

  // Quad
  easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
  easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

  // Quart
  easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

  // Quint
  easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
  easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

  // Sine
  easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

  // Back
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
};

var transitionEvent = function () {
  if (typeof document === 'undefined') {
    return;
  }
  var el = document.createElement('fakeelement');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}();

var xShow = {
  name: 'x-show',
  props: {
    show: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    },
    transitionProperty: {
      type: String,
      default: function _default() {
        return 'height';
      }
    },
    duration: {
      type: Number,
      default: function _default() {
        return 500;
      }
    },
    easing: {
      type: String,
      default: function _default() {
        return 'ease-out';
      }
    },
    minHeight: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    maxHeight: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    transitionOnMount: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    unmountOnHide: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    height: {
      type: Number,
      default: function _default() {
        return 0;
      }
    }
  },
  data: function data() {
    return {
      mountContent: true,
      calcHeight: this.transitionOnMount ? '0px' : this.height !== 0 ? this.measureHeight() + 'px' : 'auto'
    };
  },

  computed: {
    getStyle: function getStyle() {
      var calcHeight = this.calcHeight,
          transitionProperty = this.transitionProperty,
          duration = this.duration,
          easing = this.easing;


      return {
        transitionProperty: transitionProperty,
        height: calcHeight,
        transitionDuration: duration + 'ms',
        transitionTimingFunction: easings[easing] || easing,
        overflow: 'hidden'
      };
    }
  },
  watch: {
    show: function show(val) {
      this[val ? 'animateIn' : 'animateOut']();
    }
  },
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      _this.bindEvent();
      if (_this.transitionOnMount) _this.animateIn();
    });
  },
  beforeUpdate: function beforeUpdate() {
    if (this.unmountOnHide) this.bindEvent();
  },

  methods: {
    measureHeight: function measureHeight() {
      return this.height || this.$el.scrollHeight;
    },
    animateIn: function animateIn() {
      var _this2 = this;

      var minHeight = this.minHeight,
          maxHeight = this.maxHeight;

      this.mountContent = true;
      this.calcHeight = (minHeight || 0) + 'px';
      this.$nextTick(function () {
        var height = _this2.measureHeight();
        setTimeout(function () {
          _this2.calcHeight = (maxHeight || height) + 'px';
        }, 16);
      });
    },
    animateOut: function animateOut() {
      var _this3 = this;

      var minHeight = this.minHeight,
          maxHeight = this.maxHeight;

      var minimize = function minimize() {
        setTimeout(function () {
          if (_this3.$el.style.height === 'auto') {
            minimize();
            return;
          }
          _this3.calcHeight = (minHeight || 0) + 'px';
        }, 16);
      };
      if (this.$el.style.height !== 'auto') {
        minimize();
      } else {
        var height = this.measureHeight();
        this.calcHeight = (maxHeight || height) + 'px';
        minimize();
      }
    },
    onTransitionEnd: function onTransitionEnd() {
      var unmountOnHide = this.unmountOnHide,
          show = this.show;

      if (!show && unmountOnHide) this.mountContent = false;
    },
    bindEvent: function bindEvent() {
      this.$el.addEventListener(transitionEvent, this.onTransitionEnd);
    }
  },
  render: function render() {
    var h = arguments[0];

    return this.mountContent ? h(
      'div',
      { style: this.getStyle },
      [this.$slots.default]
    ) : null;
  }
};

var app = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "app" }, [_c('h1', [_vm._v("Vue Show")]), _c('button', { class: { 'active': _vm.isShow }, on: { "click": function click($event) {
          _vm.isShow = !_vm.isShow;
        } } }, [_vm._v("Click me! Status: " + _vm._s(_vm.isShow ? 'show' : 'hide'))]), _c('x-show', { staticClass: "easings", attrs: { "show": _vm.isShow, "easing": _vm.easing, "duration": 700, "transition-on-mount": "", "unmount-on-hide": "" } }, [_c('ul', _vm._l(_vm.list, function (item, idx) {
      return _c('li', [_c('button', { class: { 'active': item.active }, on: { "click": function click($event) {
            _vm.handleClick(item, idx);
          } } }, [_vm._v(_vm._s(item.key))])]);
    }))])], 1);
  }, staticRenderFns: [],
  name: 'app',
  data: function data() {
    return {
      list: [],
      isShow: true,
      easing: Object.keys(easings)[0]
    };
  },
  components: {
    xShow: xShow
  },
  created: function created() {
    this.list = Object.keys(easings).map(function (key) {
      return {
        key: key,
        show: true,
        active: false
      };
    });
    this.list[0].active = true;
  },

  methods: {
    handleClick: function handleClick(_ref, idx) {
      var key = _ref.key;

      this.easing = key;
      this.list.forEach(function (item, index) {
        item.active = idx === index;
      });
    }
  }
};

Vue$3.config.productionTip = false;

new Vue$3({
    el: '#app',
    render: function render(h) {
        return h(app);
    }
});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy92dWUvZGlzdC92dWUucnVudGltZS5lc20uanMiLCIuLi8uLi9zcmMvZWFzaW5ncy5qcyIsIi4uLy4uL3NyYy94LXNob3cuanMiLCIuLi9zcmMvYXBwLnZ1ZSIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogVnVlLmpzIHYyLjUuOVxuICogKGMpIDIwMTQtMjAxNyBFdmFuIFlvdVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG4vKiAgKi9cblxudmFyIGVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG5cbi8vIHRoZXNlIGhlbHBlcnMgcHJvZHVjZXMgYmV0dGVyIHZtIGNvZGUgaW4gSlMgZW5naW5lcyBkdWUgdG8gdGhlaXJcbi8vIGV4cGxpY2l0bmVzcyBhbmQgZnVuY3Rpb24gaW5saW5pbmdcbmZ1bmN0aW9uIGlzVW5kZWYgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsXG59XG5cbmZ1bmN0aW9uIGlzRGVmICh2KSB7XG4gIHJldHVybiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbFxufVxuXG5mdW5jdGlvbiBpc1RydWUgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHRydWVcbn1cblxuZnVuY3Rpb24gaXNGYWxzZSAodikge1xuICByZXR1cm4gdiA9PT0gZmFsc2Vcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBpcyBwcmltaXRpdmVcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUgKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHxcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJ1xuICApXG59XG5cbi8qKlxuICogUXVpY2sgb2JqZWN0IGNoZWNrIC0gdGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byB0ZWxsXG4gKiBPYmplY3RzIGZyb20gcHJpbWl0aXZlIHZhbHVlcyB3aGVuIHdlIGtub3cgdGhlIHZhbHVlXG4gKiBpcyBhIEpTT04tY29tcGxpYW50IHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0IChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xufVxuXG4vKipcbiAqIEdldCB0aGUgcmF3IHR5cGUgc3RyaW5nIG9mIGEgdmFsdWUgZS5nLiBbb2JqZWN0IE9iamVjdF1cbiAqL1xudmFyIF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHRvUmF3VHlwZSAodmFsdWUpIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKHZhbHVlKS5zbGljZSg4LCAtMSlcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0IChvYmopIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59XG5cbmZ1bmN0aW9uIGlzUmVnRXhwICh2KSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWwgaXMgYSB2YWxpZCBhcnJheSBpbmRleC5cbiAqL1xuZnVuY3Rpb24gaXNWYWxpZEFycmF5SW5kZXggKHZhbCkge1xuICB2YXIgbiA9IHBhcnNlRmxvYXQoU3RyaW5nKHZhbCkpO1xuICByZXR1cm4gbiA+PSAwICYmIE1hdGguZmxvb3IobikgPT09IG4gJiYgaXNGaW5pdGUodmFsKVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSB2YWx1ZSB0byBhIHN0cmluZyB0aGF0IGlzIGFjdHVhbGx5IHJlbmRlcmVkLlxuICovXG5mdW5jdGlvbiB0b1N0cmluZyAodmFsKSB7XG4gIHJldHVybiB2YWwgPT0gbnVsbFxuICAgID8gJydcbiAgICA6IHR5cGVvZiB2YWwgPT09ICdvYmplY3QnXG4gICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMilcbiAgICAgIDogU3RyaW5nKHZhbClcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgaW5wdXQgdmFsdWUgdG8gYSBudW1iZXIgZm9yIHBlcnNpc3RlbmNlLlxuICogSWYgdGhlIGNvbnZlcnNpb24gZmFpbHMsIHJldHVybiBvcmlnaW5hbCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyICh2YWwpIHtcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbCk7XG4gIHJldHVybiBpc05hTihuKSA/IHZhbCA6IG5cbn1cblxuLyoqXG4gKiBNYWtlIGEgbWFwIGFuZCByZXR1cm4gYSBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYSBrZXlcbiAqIGlzIGluIHRoYXQgbWFwLlxuICovXG5mdW5jdGlvbiBtYWtlTWFwIChcbiAgc3RyLFxuICBleHBlY3RzTG93ZXJDYXNlXG4pIHtcbiAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBsaXN0ID0gc3RyLnNwbGl0KCcsJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG1hcFtsaXN0W2ldXSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGV4cGVjdHNMb3dlckNhc2VcbiAgICA/IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWwudG9Mb3dlckNhc2UoKV07IH1cbiAgICA6IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWxdOyB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB0YWcgaXMgYSBidWlsdC1pbiB0YWcuXG4gKi9cbnZhciBpc0J1aWx0SW5UYWcgPSBtYWtlTWFwKCdzbG90LGNvbXBvbmVudCcsIHRydWUpO1xuXG4vKipcbiAqIENoZWNrIGlmIGEgYXR0cmlidXRlIGlzIGEgcmVzZXJ2ZWQgYXR0cmlidXRlLlxuICovXG52YXIgaXNSZXNlcnZlZEF0dHJpYnV0ZSA9IG1ha2VNYXAoJ2tleSxyZWYsc2xvdCxzbG90LXNjb3BlLGlzJyk7XG5cbi8qKlxuICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBhbiBhcnJheVxuICovXG5mdW5jdGlvbiByZW1vdmUgKGFyciwgaXRlbSkge1xuICBpZiAoYXJyLmxlbmd0aCkge1xuICAgIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGhhc093biAob2JqLCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgY2FjaGVkIHZlcnNpb24gb2YgYSBwdXJlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjYWNoZWQgKGZuKSB7XG4gIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHJldHVybiAoZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xuICAgIHZhciBoaXQgPSBjYWNoZVtzdHJdO1xuICAgIHJldHVybiBoaXQgfHwgKGNhY2hlW3N0cl0gPSBmbihzdHIpKVxuICB9KVxufVxuXG4vKipcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbGltaXRlZCBzdHJpbmcuXG4gKi9cbnZhciBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xudmFyIGNhbWVsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIGZ1bmN0aW9uIChfLCBjKSB7IHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJyc7IH0pXG59KTtcblxuLyoqXG4gKiBDYXBpdGFsaXplIGEgc3RyaW5nLlxuICovXG52YXIgY2FwaXRhbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn0pO1xuXG4vKipcbiAqIEh5cGhlbmF0ZSBhIGNhbWVsQ2FzZSBzdHJpbmcuXG4gKi9cbnZhciBoeXBoZW5hdGVSRSA9IC9cXEIoW0EtWl0pL2c7XG52YXIgaHlwaGVuYXRlID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGh5cGhlbmF0ZVJFLCAnLSQxJykudG9Mb3dlckNhc2UoKVxufSk7XG5cbi8qKlxuICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICovXG5mdW5jdGlvbiBiaW5kIChmbiwgY3R4KSB7XG4gIGZ1bmN0aW9uIGJvdW5kRm4gKGEpIHtcbiAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgcmV0dXJuIGxcbiAgICAgID8gbCA+IDFcbiAgICAgICAgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcbiAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgIDogZm4uY2FsbChjdHgpXG4gIH1cbiAgLy8gcmVjb3JkIG9yaWdpbmFsIGZuIGxlbmd0aFxuICBib3VuZEZuLl9sZW5ndGggPSBmbi5sZW5ndGg7XG4gIHJldHVybiBib3VuZEZuXG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkgKGxpc3QsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCAodG8sIF9mcm9tKSB7XG4gIGZvciAodmFyIGtleSBpbiBfZnJvbSkge1xuICAgIHRvW2tleV0gPSBfZnJvbVtrZXldO1xuICB9XG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIE1lcmdlIGFuIEFycmF5IG9mIE9iamVjdHMgaW50byBhIHNpbmdsZSBPYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0IChhcnIpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0pIHtcbiAgICAgIGV4dGVuZChyZXMsIGFycltpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyoqXG4gKiBQZXJmb3JtIG5vIG9wZXJhdGlvbi5cbiAqIFN0dWJiaW5nIGFyZ3MgdG8gbWFrZSBGbG93IGhhcHB5IHdpdGhvdXQgbGVhdmluZyB1c2VsZXNzIHRyYW5zcGlsZWQgY29kZVxuICogd2l0aCAuLi5yZXN0IChodHRwczovL2Zsb3cub3JnL2Jsb2cvMjAxNy8wNS8wNy9TdHJpY3QtRnVuY3Rpb24tQ2FsbC1Bcml0eS8pXG4gKi9cbmZ1bmN0aW9uIG5vb3AgKGEsIGIsIGMpIHt9XG5cbi8qKlxuICogQWx3YXlzIHJldHVybiBmYWxzZS5cbiAqL1xudmFyIG5vID0gZnVuY3Rpb24gKGEsIGIsIGMpIHsgcmV0dXJuIGZhbHNlOyB9O1xuXG4vKipcbiAqIFJldHVybiBzYW1lIHZhbHVlXG4gKi9cbnZhciBpZGVudGl0eSA9IGZ1bmN0aW9uIChfKSB7IHJldHVybiBfOyB9O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgc3RhdGljIGtleXMgc3RyaW5nIGZyb20gY29tcGlsZXIgbW9kdWxlcy5cbiAqL1xuXG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIHZhbHVlcyBhcmUgbG9vc2VseSBlcXVhbCAtIHRoYXQgaXMsXG4gKiBpZiB0aGV5IGFyZSBwbGFpbiBvYmplY3RzLCBkbyB0aGV5IGhhdmUgdGhlIHNhbWUgc2hhcGU/XG4gKi9cbmZ1bmN0aW9uIGxvb3NlRXF1YWwgKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHsgcmV0dXJuIHRydWUgfVxuICB2YXIgaXNPYmplY3RBID0gaXNPYmplY3QoYSk7XG4gIHZhciBpc09iamVjdEIgPSBpc09iamVjdChiKTtcbiAgaWYgKGlzT2JqZWN0QSAmJiBpc09iamVjdEIpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGlzQXJyYXlBID0gQXJyYXkuaXNBcnJheShhKTtcbiAgICAgIHZhciBpc0FycmF5QiA9IEFycmF5LmlzQXJyYXkoYik7XG4gICAgICBpZiAoaXNBcnJheUEgJiYgaXNBcnJheUIpIHtcbiAgICAgICAgcmV0dXJuIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJiBhLmV2ZXJ5KGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIGxvb3NlRXF1YWwoZSwgYltpXSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoIWlzQXJyYXlBICYmICFpc0FycmF5Qikge1xuICAgICAgICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhhKTtcbiAgICAgICAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMoYik7XG4gICAgICAgIHJldHVybiBrZXlzQS5sZW5ndGggPT09IGtleXNCLmxlbmd0aCAmJiBrZXlzQS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGxvb3NlRXF1YWwoYVtrZXldLCBiW2tleV0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9IGVsc2UgaWYgKCFpc09iamVjdEEgJiYgIWlzT2JqZWN0Qikge1xuICAgIHJldHVybiBTdHJpbmcoYSkgPT09IFN0cmluZyhiKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGxvb3NlSW5kZXhPZiAoYXJyLCB2YWwpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobG9vc2VFcXVhbChhcnJbaV0sIHZhbCkpIHsgcmV0dXJuIGkgfVxuICB9XG4gIHJldHVybiAtMVxufVxuXG4vKipcbiAqIEVuc3VyZSBhIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbmx5IG9uY2UuXG4gKi9cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cbnZhciBTU1JfQVRUUiA9ICdkYXRhLXNlcnZlci1yZW5kZXJlZCc7XG5cbnZhciBBU1NFVF9UWVBFUyA9IFtcbiAgJ2NvbXBvbmVudCcsXG4gICdkaXJlY3RpdmUnLFxuICAnZmlsdGVyJ1xuXTtcblxudmFyIExJRkVDWUNMRV9IT09LUyA9IFtcbiAgJ2JlZm9yZUNyZWF0ZScsXG4gICdjcmVhdGVkJyxcbiAgJ2JlZm9yZU1vdW50JyxcbiAgJ21vdW50ZWQnLFxuICAnYmVmb3JlVXBkYXRlJyxcbiAgJ3VwZGF0ZWQnLFxuICAnYmVmb3JlRGVzdHJveScsXG4gICdkZXN0cm95ZWQnLFxuICAnYWN0aXZhdGVkJyxcbiAgJ2RlYWN0aXZhdGVkJyxcbiAgJ2Vycm9yQ2FwdHVyZWQnXG5dO1xuXG4vKiAgKi9cblxudmFyIGNvbmZpZyA9ICh7XG4gIC8qKlxuICAgKiBPcHRpb24gbWVyZ2Ugc3RyYXRlZ2llcyAodXNlZCBpbiBjb3JlL3V0aWwvb3B0aW9ucylcbiAgICovXG4gIG9wdGlvbk1lcmdlU3RyYXRlZ2llczogT2JqZWN0LmNyZWF0ZShudWxsKSxcblxuICAvKipcbiAgICogV2hldGhlciB0byBzdXBwcmVzcyB3YXJuaW5ncy5cbiAgICovXG4gIHNpbGVudDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIFNob3cgcHJvZHVjdGlvbiBtb2RlIHRpcCBtZXNzYWdlIG9uIGJvb3Q/XG4gICAqL1xuICBwcm9kdWN0aW9uVGlwOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGVuYWJsZSBkZXZ0b29sc1xuICAgKi9cbiAgZGV2dG9vbHM6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVjb3JkIHBlcmZcbiAgICovXG4gIHBlcmZvcm1hbmNlOiBmYWxzZSxcblxuICAvKipcbiAgICogRXJyb3IgaGFuZGxlciBmb3Igd2F0Y2hlciBlcnJvcnNcbiAgICovXG4gIGVycm9ySGFuZGxlcjogbnVsbCxcblxuICAvKipcbiAgICogV2FybiBoYW5kbGVyIGZvciB3YXRjaGVyIHdhcm5zXG4gICAqL1xuICB3YXJuSGFuZGxlcjogbnVsbCxcblxuICAvKipcbiAgICogSWdub3JlIGNlcnRhaW4gY3VzdG9tIGVsZW1lbnRzXG4gICAqL1xuICBpZ25vcmVkRWxlbWVudHM6IFtdLFxuXG4gIC8qKlxuICAgKiBDdXN0b20gdXNlciBrZXkgYWxpYXNlcyBmb3Igdi1vblxuICAgKi9cbiAga2V5Q29kZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGFnIGlzIHJlc2VydmVkIHNvIHRoYXQgaXQgY2Fubm90IGJlIHJlZ2lzdGVyZWQgYXMgYVxuICAgKiBjb21wb25lbnQuIFRoaXMgaXMgcGxhdGZvcm0tZGVwZW5kZW50IGFuZCBtYXkgYmUgb3ZlcndyaXR0ZW4uXG4gICAqL1xuICBpc1Jlc2VydmVkVGFnOiBubyxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIGlzIHJlc2VydmVkIHNvIHRoYXQgaXQgY2Fubm90IGJlIHVzZWQgYXMgYSBjb21wb25lbnRcbiAgICogcHJvcC4gVGhpcyBpcyBwbGF0Zm9ybS1kZXBlbmRlbnQgYW5kIG1heSBiZSBvdmVyd3JpdHRlbi5cbiAgICovXG4gIGlzUmVzZXJ2ZWRBdHRyOiBubyxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB0YWcgaXMgYW4gdW5rbm93biBlbGVtZW50LlxuICAgKiBQbGF0Zm9ybS1kZXBlbmRlbnQuXG4gICAqL1xuICBpc1Vua25vd25FbGVtZW50OiBubyxcblxuICAvKipcbiAgICogR2V0IHRoZSBuYW1lc3BhY2Ugb2YgYW4gZWxlbWVudFxuICAgKi9cbiAgZ2V0VGFnTmFtZXNwYWNlOiBub29wLFxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgcmVhbCB0YWcgbmFtZSBmb3IgdGhlIHNwZWNpZmljIHBsYXRmb3JtLlxuICAgKi9cbiAgcGFyc2VQbGF0Zm9ybVRhZ05hbWU6IGlkZW50aXR5LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBhdHRyaWJ1dGUgbXVzdCBiZSBib3VuZCB1c2luZyBwcm9wZXJ0eSwgZS5nLiB2YWx1ZVxuICAgKiBQbGF0Zm9ybS1kZXBlbmRlbnQuXG4gICAqL1xuICBtdXN0VXNlUHJvcDogbm8sXG5cbiAgLyoqXG4gICAqIEV4cG9zZWQgZm9yIGxlZ2FjeSByZWFzb25zXG4gICAqL1xuICBfbGlmZWN5Y2xlSG9va3M6IExJRkVDWUNMRV9IT09LU1xufSk7XG5cbi8qICAqL1xuXG4vKipcbiAqIENoZWNrIGlmIGEgc3RyaW5nIHN0YXJ0cyB3aXRoICQgb3IgX1xuICovXG5mdW5jdGlvbiBpc1Jlc2VydmVkIChzdHIpIHtcbiAgdmFyIGMgPSAoc3RyICsgJycpLmNoYXJDb2RlQXQoMCk7XG4gIHJldHVybiBjID09PSAweDI0IHx8IGMgPT09IDB4NUZcbn1cblxuLyoqXG4gKiBEZWZpbmUgYSBwcm9wZXJ0eS5cbiAqL1xuZnVuY3Rpb24gZGVmIChvYmosIGtleSwgdmFsLCBlbnVtZXJhYmxlKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIHZhbHVlOiB2YWwsXG4gICAgZW51bWVyYWJsZTogISFlbnVtZXJhYmxlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBQYXJzZSBzaW1wbGUgcGF0aC5cbiAqL1xudmFyIGJhaWxSRSA9IC9bXlxcdy4kXS87XG5mdW5jdGlvbiBwYXJzZVBhdGggKHBhdGgpIHtcbiAgaWYgKGJhaWxSRS50ZXN0KHBhdGgpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHNlZ21lbnRzID0gcGF0aC5zcGxpdCgnLicpO1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghb2JqKSB7IHJldHVybiB9XG4gICAgICBvYmogPSBvYmpbc2VnbWVudHNbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gb2JqXG4gIH1cbn1cblxuLyogICovXG5cblxuLy8gY2FuIHdlIHVzZSBfX3Byb3RvX18/XG52YXIgaGFzUHJvdG8gPSAnX19wcm90b19fJyBpbiB7fTtcblxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xudmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xudmFyIGluV2VleCA9IHR5cGVvZiBXWEVudmlyb25tZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhIVdYRW52aXJvbm1lbnQucGxhdGZvcm07XG52YXIgd2VleFBsYXRmb3JtID0gaW5XZWV4ICYmIFdYRW52aXJvbm1lbnQucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtcbnZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xudmFyIGlzSUUgPSBVQSAmJiAvbXNpZXx0cmlkZW50Ly50ZXN0KFVBKTtcbnZhciBpc0lFOSA9IFVBICYmIFVBLmluZGV4T2YoJ21zaWUgOS4wJykgPiAwO1xudmFyIGlzRWRnZSA9IFVBICYmIFVBLmluZGV4T2YoJ2VkZ2UvJykgPiAwO1xudmFyIGlzQW5kcm9pZCA9IChVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwKSB8fCAod2VleFBsYXRmb3JtID09PSAnYW5kcm9pZCcpO1xudmFyIGlzSU9TID0gKFVBICYmIC9pcGhvbmV8aXBhZHxpcG9kfGlvcy8udGVzdChVQSkpIHx8ICh3ZWV4UGxhdGZvcm0gPT09ICdpb3MnKTtcbnZhciBpc0Nocm9tZSA9IFVBICYmIC9jaHJvbWVcXC9cXGQrLy50ZXN0KFVBKSAmJiAhaXNFZGdlO1xuXG4vLyBGaXJlZm94IGhhcyBhIFwid2F0Y2hcIiBmdW5jdGlvbiBvbiBPYmplY3QucHJvdG90eXBlLi4uXG52YXIgbmF0aXZlV2F0Y2ggPSAoe30pLndhdGNoO1xuXG52YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG5pZiAoaW5Ccm93c2VyKSB7XG4gIHRyeSB7XG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3B0cywgJ3Bhc3NpdmUnLCAoe1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQgKCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pKTsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0LXBhc3NpdmUnLCBudWxsLCBvcHRzKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuLy8gdGhpcyBuZWVkcyB0byBiZSBsYXp5LWV2YWxlZCBiZWNhdXNlIHZ1ZSBtYXkgYmUgcmVxdWlyZWQgYmVmb3JlXG4vLyB2dWUtc2VydmVyLXJlbmRlcmVyIGNhbiBzZXQgVlVFX0VOVlxudmFyIF9pc1NlcnZlcjtcbnZhciBpc1NlcnZlclJlbmRlcmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKF9pc1NlcnZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFpbkJyb3dzZXIgJiYgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGRldGVjdCBwcmVzZW5jZSBvZiB2dWUtc2VydmVyLXJlbmRlcmVyIGFuZCBhdm9pZFxuICAgICAgLy8gV2VicGFjayBzaGltbWluZyB0aGUgcHJvY2Vzc1xuICAgICAgX2lzU2VydmVyID0gZ2xvYmFsWydwcm9jZXNzJ10uZW52LlZVRV9FTlYgPT09ICdzZXJ2ZXInO1xuICAgIH0gZWxzZSB7XG4gICAgICBfaXNTZXJ2ZXIgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIF9pc1NlcnZlclxufTtcblxuLy8gZGV0ZWN0IGRldnRvb2xzXG52YXIgZGV2dG9vbHMgPSBpbkJyb3dzZXIgJiYgd2luZG93Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX187XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBpc05hdGl2ZSAoQ3Rvcikge1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KEN0b3IudG9TdHJpbmcoKSlcbn1cblxudmFyIGhhc1N5bWJvbCA9XG4gIHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFN5bWJvbCkgJiZcbiAgdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFJlZmxlY3Qub3duS2V5cyk7XG5cbnZhciBfU2V0O1xuLyogaXN0YW5idWwgaWdub3JlIGlmICovIC8vICRmbG93LWRpc2FibGUtbGluZVxuaWYgKHR5cGVvZiBTZXQgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFNldCkpIHtcbiAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXG4gIF9TZXQgPSBTZXQ7XG59IGVsc2Uge1xuICAvLyBhIG5vbi1zdGFuZGFyZCBTZXQgcG9seWZpbGwgdGhhdCBvbmx5IHdvcmtzIHdpdGggcHJpbWl0aXZlIGtleXMuXG4gIF9TZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNldCAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldID09PSB0cnVlXG4gICAgfTtcbiAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAoa2V5KSB7XG4gICAgICB0aGlzLnNldFtrZXldID0gdHJ1ZTtcbiAgICB9O1xuICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcblxuICAgIHJldHVybiBTZXQ7XG4gIH0oKSk7XG59XG5cbi8qICAqL1xuXG52YXIgd2FybiA9IG5vb3A7XG52YXIgdGlwID0gbm9vcDtcbnZhciBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlID0gKG5vb3ApOyAvLyB3b3JrIGFyb3VuZCBmbG93IGNoZWNrXG52YXIgZm9ybWF0Q29tcG9uZW50TmFtZSA9IChub29wKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGhhc0NvbnNvbGUgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCc7XG4gIHZhciBjbGFzc2lmeVJFID0gLyg/Ol58Wy1fXSkoXFx3KS9nO1xuICB2YXIgY2xhc3NpZnkgPSBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHJcbiAgICAucmVwbGFjZShjbGFzc2lmeVJFLCBmdW5jdGlvbiAoYykgeyByZXR1cm4gYy50b1VwcGVyQ2FzZSgpOyB9KVxuICAgIC5yZXBsYWNlKC9bLV9dL2csICcnKTsgfTtcblxuICB3YXJuID0gZnVuY3Rpb24gKG1zZywgdm0pIHtcbiAgICB2YXIgdHJhY2UgPSB2bSA/IGdlbmVyYXRlQ29tcG9uZW50VHJhY2Uodm0pIDogJyc7XG5cbiAgICBpZiAoY29uZmlnLndhcm5IYW5kbGVyKSB7XG4gICAgICBjb25maWcud2FybkhhbmRsZXIuY2FsbChudWxsLCBtc2csIHZtLCB0cmFjZSk7XG4gICAgfSBlbHNlIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW1Z1ZSB3YXJuXTogXCIgKyBtc2cgKyB0cmFjZSkpO1xuICAgIH1cbiAgfTtcblxuICB0aXAgPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIltWdWUgdGlwXTogXCIgKyBtc2cgKyAoXG4gICAgICAgIHZtID8gZ2VuZXJhdGVDb21wb25lbnRUcmFjZSh2bSkgOiAnJ1xuICAgICAgKSk7XG4gICAgfVxuICB9O1xuXG4gIGZvcm1hdENvbXBvbmVudE5hbWUgPSBmdW5jdGlvbiAodm0sIGluY2x1ZGVGaWxlKSB7XG4gICAgaWYgKHZtLiRyb290ID09PSB2bSkge1xuICAgICAgcmV0dXJuICc8Um9vdD4nXG4gICAgfVxuICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHZtID09PSAnZnVuY3Rpb24nICYmIHZtLmNpZCAhPSBudWxsXG4gICAgICA/IHZtLm9wdGlvbnNcbiAgICAgIDogdm0uX2lzVnVlXG4gICAgICAgID8gdm0uJG9wdGlvbnMgfHwgdm0uY29uc3RydWN0b3Iub3B0aW9uc1xuICAgICAgICA6IHZtIHx8IHt9O1xuICAgIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lIHx8IG9wdGlvbnMuX2NvbXBvbmVudFRhZztcbiAgICB2YXIgZmlsZSA9IG9wdGlvbnMuX19maWxlO1xuICAgIGlmICghbmFtZSAmJiBmaWxlKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBmaWxlLm1hdGNoKC8oW14vXFxcXF0rKVxcLnZ1ZSQvKTtcbiAgICAgIG5hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgKG5hbWUgPyAoXCI8XCIgKyAoY2xhc3NpZnkobmFtZSkpICsgXCI+XCIpIDogXCI8QW5vbnltb3VzPlwiKSArXG4gICAgICAoZmlsZSAmJiBpbmNsdWRlRmlsZSAhPT0gZmFsc2UgPyAoXCIgYXQgXCIgKyBmaWxlKSA6ICcnKVxuICAgIClcbiAgfTtcblxuICB2YXIgcmVwZWF0ID0gZnVuY3Rpb24gKHN0ciwgbikge1xuICAgIHZhciByZXMgPSAnJztcbiAgICB3aGlsZSAobikge1xuICAgICAgaWYgKG4gJSAyID09PSAxKSB7IHJlcyArPSBzdHI7IH1cbiAgICAgIGlmIChuID4gMSkgeyBzdHIgKz0gc3RyOyB9XG4gICAgICBuID4+PSAxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH07XG5cbiAgZ2VuZXJhdGVDb21wb25lbnRUcmFjZSA9IGZ1bmN0aW9uICh2bSkge1xuICAgIGlmICh2bS5faXNWdWUgJiYgdm0uJHBhcmVudCkge1xuICAgICAgdmFyIHRyZWUgPSBbXTtcbiAgICAgIHZhciBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwO1xuICAgICAgd2hpbGUgKHZtKSB7XG4gICAgICAgIGlmICh0cmVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgbGFzdCA9IHRyZWVbdHJlZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAobGFzdC5jb25zdHJ1Y3RvciA9PT0gdm0uY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSsrO1xuICAgICAgICAgICAgdm0gPSB2bS4kcGFyZW50O1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSA+IDApIHtcbiAgICAgICAgICAgIHRyZWVbdHJlZS5sZW5ndGggLSAxXSA9IFtsYXN0LCBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2VdO1xuICAgICAgICAgICAgY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJlZS5wdXNoKHZtKTtcbiAgICAgICAgdm0gPSB2bS4kcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuICdcXG5cXG5mb3VuZCBpblxcblxcbicgKyB0cmVlXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHZtLCBpKSB7IHJldHVybiAoXCJcIiArIChpID09PSAwID8gJy0tLT4gJyA6IHJlcGVhdCgnICcsIDUgKyBpICogMikpICsgKEFycmF5LmlzQXJyYXkodm0pXG4gICAgICAgICAgICA/ICgoZm9ybWF0Q29tcG9uZW50TmFtZSh2bVswXSkpICsgXCIuLi4gKFwiICsgKHZtWzFdKSArIFwiIHJlY3Vyc2l2ZSBjYWxscylcIilcbiAgICAgICAgICAgIDogZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpKTsgfSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXCJcXG5cXG4oZm91bmQgaW4gXCIgKyAoZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpICsgXCIpXCIpXG4gICAgfVxuICB9O1xufVxuXG4vKiAgKi9cblxuXG52YXIgdWlkJDEgPSAwO1xuXG4vKipcbiAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cbiAqL1xudmFyIERlcCA9IGZ1bmN0aW9uIERlcCAoKSB7XG4gIHRoaXMuaWQgPSB1aWQkMSsrO1xuICB0aGlzLnN1YnMgPSBbXTtcbn07XG5cbkRlcC5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gYWRkU3ViIChzdWIpIHtcbiAgdGhpcy5zdWJzLnB1c2goc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gcmVtb3ZlU3ViIChzdWIpIHtcbiAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgaWYgKERlcC50YXJnZXQpIHtcbiAgICBEZXAudGFyZ2V0LmFkZERlcCh0aGlzKTtcbiAgfVxufTtcblxuRGVwLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbiBub3RpZnkgKCkge1xuICAvLyBzdGFiaWxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICB2YXIgc3VicyA9IHRoaXMuc3Vicy5zbGljZSgpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgc3Vic1tpXS51cGRhdGUoKTtcbiAgfVxufTtcblxuLy8gdGhlIGN1cnJlbnQgdGFyZ2V0IHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkLlxuLy8gdGhpcyBpcyBnbG9iYWxseSB1bmlxdWUgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvbmx5IG9uZVxuLy8gd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQgYXQgYW55IHRpbWUuXG5EZXAudGFyZ2V0ID0gbnVsbDtcbnZhciB0YXJnZXRTdGFjayA9IFtdO1xuXG5mdW5jdGlvbiBwdXNoVGFyZ2V0IChfdGFyZ2V0KSB7XG4gIGlmIChEZXAudGFyZ2V0KSB7IHRhcmdldFN0YWNrLnB1c2goRGVwLnRhcmdldCk7IH1cbiAgRGVwLnRhcmdldCA9IF90YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHBvcFRhcmdldCAoKSB7XG4gIERlcC50YXJnZXQgPSB0YXJnZXRTdGFjay5wb3AoKTtcbn1cblxuLyogICovXG5cbnZhciBWTm9kZSA9IGZ1bmN0aW9uIFZOb2RlIChcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgdGV4dCxcbiAgZWxtLFxuICBjb250ZXh0LFxuICBjb21wb25lbnRPcHRpb25zLFxuICBhc3luY0ZhY3Rvcnlcbikge1xuICB0aGlzLnRhZyA9IHRhZztcbiAgdGhpcy5kYXRhID0gZGF0YTtcbiAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB0aGlzLnRleHQgPSB0ZXh0O1xuICB0aGlzLmVsbSA9IGVsbTtcbiAgdGhpcy5ucyA9IHVuZGVmaW5lZDtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5mbkNvbnRleHQgPSB1bmRlZmluZWQ7XG4gIHRoaXMuZm5PcHRpb25zID0gdW5kZWZpbmVkO1xuICB0aGlzLmZuU2NvcGVJZCA9IHVuZGVmaW5lZDtcbiAgdGhpcy5rZXkgPSBkYXRhICYmIGRhdGEua2V5O1xuICB0aGlzLmNvbXBvbmVudE9wdGlvbnMgPSBjb21wb25lbnRPcHRpb25zO1xuICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZDtcbiAgdGhpcy5yYXcgPSBmYWxzZTtcbiAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICB0aGlzLmlzUm9vdEluc2VydCA9IHRydWU7XG4gIHRoaXMuaXNDb21tZW50ID0gZmFsc2U7XG4gIHRoaXMuaXNDbG9uZWQgPSBmYWxzZTtcbiAgdGhpcy5pc09uY2UgPSBmYWxzZTtcbiAgdGhpcy5hc3luY0ZhY3RvcnkgPSBhc3luY0ZhY3Rvcnk7XG4gIHRoaXMuYXN5bmNNZXRhID0gdW5kZWZpbmVkO1xuICB0aGlzLmlzQXN5bmNQbGFjZWhvbGRlciA9IGZhbHNlO1xufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgY2hpbGQ6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcblxuLy8gREVQUkVDQVRFRDogYWxpYXMgZm9yIGNvbXBvbmVudEluc3RhbmNlIGZvciBiYWNrd2FyZHMgY29tcGF0LlxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnByb3RvdHlwZUFjY2Vzc29ycy5jaGlsZC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmNvbXBvbmVudEluc3RhbmNlXG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyggVk5vZGUucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcblxudmFyIGNyZWF0ZUVtcHR5Vk5vZGUgPSBmdW5jdGlvbiAodGV4dCkge1xuICBpZiAoIHRleHQgPT09IHZvaWQgMCApIHRleHQgPSAnJztcblxuICB2YXIgbm9kZSA9IG5ldyBWTm9kZSgpO1xuICBub2RlLnRleHQgPSB0ZXh0O1xuICBub2RlLmlzQ29tbWVudCA9IHRydWU7XG4gIHJldHVybiBub2RlXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVUZXh0Vk5vZGUgKHZhbCkge1xuICByZXR1cm4gbmV3IFZOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFN0cmluZyh2YWwpKVxufVxuXG4vLyBvcHRpbWl6ZWQgc2hhbGxvdyBjbG9uZVxuLy8gdXNlZCBmb3Igc3RhdGljIG5vZGVzIGFuZCBzbG90IG5vZGVzIGJlY2F1c2UgdGhleSBtYXkgYmUgcmV1c2VkIGFjcm9zc1xuLy8gbXVsdGlwbGUgcmVuZGVycywgY2xvbmluZyB0aGVtIGF2b2lkcyBlcnJvcnMgd2hlbiBET00gbWFuaXB1bGF0aW9ucyByZWx5XG4vLyBvbiB0aGVpciBlbG0gcmVmZXJlbmNlLlxuZnVuY3Rpb24gY2xvbmVWTm9kZSAodm5vZGUsIGRlZXApIHtcbiAgdmFyIGNvbXBvbmVudE9wdGlvbnMgPSB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xuICB2YXIgY2xvbmVkID0gbmV3IFZOb2RlKFxuICAgIHZub2RlLnRhZyxcbiAgICB2bm9kZS5kYXRhLFxuICAgIHZub2RlLmNoaWxkcmVuLFxuICAgIHZub2RlLnRleHQsXG4gICAgdm5vZGUuZWxtLFxuICAgIHZub2RlLmNvbnRleHQsXG4gICAgY29tcG9uZW50T3B0aW9ucyxcbiAgICB2bm9kZS5hc3luY0ZhY3RvcnlcbiAgKTtcbiAgY2xvbmVkLm5zID0gdm5vZGUubnM7XG4gIGNsb25lZC5pc1N0YXRpYyA9IHZub2RlLmlzU3RhdGljO1xuICBjbG9uZWQua2V5ID0gdm5vZGUua2V5O1xuICBjbG9uZWQuaXNDb21tZW50ID0gdm5vZGUuaXNDb21tZW50O1xuICBjbG9uZWQuZm5Db250ZXh0ID0gdm5vZGUuZm5Db250ZXh0O1xuICBjbG9uZWQuZm5PcHRpb25zID0gdm5vZGUuZm5PcHRpb25zO1xuICBjbG9uZWQuZm5TY29wZUlkID0gdm5vZGUuZm5TY29wZUlkO1xuICBjbG9uZWQuaXNDbG9uZWQgPSB0cnVlO1xuICBpZiAoZGVlcCkge1xuICAgIGlmICh2bm9kZS5jaGlsZHJlbikge1xuICAgICAgY2xvbmVkLmNoaWxkcmVuID0gY2xvbmVWTm9kZXModm5vZGUuY2hpbGRyZW4sIHRydWUpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50T3B0aW9ucyAmJiBjb21wb25lbnRPcHRpb25zLmNoaWxkcmVuKSB7XG4gICAgICBjb21wb25lbnRPcHRpb25zLmNoaWxkcmVuID0gY2xvbmVWTm9kZXMoY29tcG9uZW50T3B0aW9ucy5jaGlsZHJlbiwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjbG9uZWRcbn1cblxuZnVuY3Rpb24gY2xvbmVWTm9kZXMgKHZub2RlcywgZGVlcCkge1xuICB2YXIgbGVuID0gdm5vZGVzLmxlbmd0aDtcbiAgdmFyIHJlcyA9IG5ldyBBcnJheShsZW4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcmVzW2ldID0gY2xvbmVWTm9kZSh2bm9kZXNbaV0sIGRlZXApO1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuLypcbiAqIG5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBwbGF5IHdlbGwgd2l0aFxuICogZHluYW1pY2FsbHkgYWNjZXNzaW5nIG1ldGhvZHMgb24gQXJyYXkgcHJvdG90eXBlXG4gKi9cblxudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG52YXIgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKTtbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NwbGljZScsXG4gICdzb3J0JyxcbiAgJ3JldmVyc2UnXG5dXG4uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF07XG4gIGRlZihhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgdmFyIHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHZhciBvYiA9IHRoaXMuX19vYl9fO1xuICAgIHZhciBpbnNlcnRlZDtcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBpZiAoaW5zZXJ0ZWQpIHsgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKTsgfVxuICAgIC8vIG5vdGlmeSBjaGFuZ2VcbiAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KTtcbn0pO1xuXG4vKiAgKi9cblxudmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcyk7XG5cbi8qKlxuICogQnkgZGVmYXVsdCwgd2hlbiBhIHJlYWN0aXZlIHByb3BlcnR5IGlzIHNldCwgdGhlIG5ldyB2YWx1ZSBpc1xuICogYWxzbyBjb252ZXJ0ZWQgdG8gYmVjb21lIHJlYWN0aXZlLiBIb3dldmVyIHdoZW4gcGFzc2luZyBkb3duIHByb3BzLFxuICogd2UgZG9uJ3Qgd2FudCB0byBmb3JjZSBjb252ZXJzaW9uIGJlY2F1c2UgdGhlIHZhbHVlIG1heSBiZSBhIG5lc3RlZCB2YWx1ZVxuICogdW5kZXIgYSBmcm96ZW4gZGF0YSBzdHJ1Y3R1cmUuIENvbnZlcnRpbmcgaXQgd291bGQgZGVmZWF0IHRoZSBvcHRpbWl6YXRpb24uXG4gKi9cbnZhciBvYnNlcnZlclN0YXRlID0ge1xuICBzaG91bGRDb252ZXJ0OiB0cnVlXG59O1xuXG4vKipcbiAqIE9ic2VydmVyIGNsYXNzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIGVhY2ggb2JzZXJ2ZWRcbiAqIG9iamVjdC4gT25jZSBhdHRhY2hlZCwgdGhlIG9ic2VydmVyIGNvbnZlcnRzIHRhcmdldFxuICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaGVzIHVwZGF0ZXMuXG4gKi9cbnZhciBPYnNlcnZlciA9IGZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSkge1xuICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIHRoaXMuZGVwID0gbmV3IERlcCgpO1xuICB0aGlzLnZtQ291bnQgPSAwO1xuICBkZWYodmFsdWUsICdfX29iX18nLCB0aGlzKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFyIGF1Z21lbnQgPSBoYXNQcm90b1xuICAgICAgPyBwcm90b0F1Z21lbnRcbiAgICAgIDogY29weUF1Z21lbnQ7XG4gICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhbGsodmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC5cbiAqL1xuT2JzZXJ2ZXIucHJvdG90eXBlLndhbGsgPSBmdW5jdGlvbiB3YWxrIChvYmopIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBkZWZpbmVSZWFjdGl2ZShvYmosIGtleXNbaV0sIG9ialtrZXlzW2ldXSk7XG4gIH1cbn07XG5cbi8qKlxuICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG4gKi9cbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiBvYnNlcnZlQXJyYXkgKGl0ZW1zKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgb2JzZXJ2ZShpdGVtc1tpXSk7XG4gIH1cbn07XG5cbi8vIGhlbHBlcnNcblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgaW50ZXJjZXB0aW5nXG4gKiB0aGUgcHJvdG90eXBlIGNoYWluIHVzaW5nIF9fcHJvdG9fX1xuICovXG5mdW5jdGlvbiBwcm90b0F1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG4gIHRhcmdldC5fX3Byb3RvX18gPSBzcmM7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tcHJvdG8gKi9cbn1cblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gY29weUF1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfVxufVxuXG4vKipcbiAqIEF0dGVtcHQgdG8gY3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlIGZvciBhIHZhbHVlLFxuICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcbiAqIG9yIHRoZSBleGlzdGluZyBvYnNlcnZlciBpZiB0aGUgdmFsdWUgYWxyZWFkeSBoYXMgb25lLlxuICovXG5mdW5jdGlvbiBvYnNlcnZlICh2YWx1ZSwgYXNSb290RGF0YSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iO1xuICBpZiAoaGFzT3duKHZhbHVlLCAnX19vYl9fJykgJiYgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXIpIHtcbiAgICBvYiA9IHZhbHVlLl9fb2JfXztcbiAgfSBlbHNlIGlmIChcbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgJiZcbiAgICAhaXNTZXJ2ZXJSZW5kZXJpbmcoKSAmJlxuICAgIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqZWN0KHZhbHVlKSkgJiZcbiAgICBPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSAmJlxuICAgICF2YWx1ZS5faXNWdWVcbiAgKSB7XG4gICAgb2IgPSBuZXcgT2JzZXJ2ZXIodmFsdWUpO1xuICB9XG4gIGlmIChhc1Jvb3REYXRhICYmIG9iKSB7XG4gICAgb2Iudm1Db3VudCsrO1xuICB9XG4gIHJldHVybiBvYlxufVxuXG4vKipcbiAqIERlZmluZSBhIHJlYWN0aXZlIHByb3BlcnR5IG9uIGFuIE9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUgKFxuICBvYmosXG4gIGtleSxcbiAgdmFsLFxuICBjdXN0b21TZXR0ZXIsXG4gIHNoYWxsb3dcbikge1xuICB2YXIgZGVwID0gbmV3IERlcCgpO1xuXG4gIHZhciBwcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICBpZiAocHJvcGVydHkgJiYgcHJvcGVydHkuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gY2F0ZXIgZm9yIHByZS1kZWZpbmVkIGdldHRlci9zZXR0ZXJzXG4gIHZhciBnZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5nZXQ7XG4gIHZhciBzZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5zZXQ7XG5cbiAgdmFyIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKHZhbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIgKCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgIGRlcC5kZXBlbmQoKTtcbiAgICAgICAgaWYgKGNoaWxkT2IpIHtcbiAgICAgICAgICBjaGlsZE9iLmRlcC5kZXBlbmQoKTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGRlcGVuZEFycmF5KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiByZWFjdGl2ZVNldHRlciAobmV3VmFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlICovXG4gICAgICBpZiAobmV3VmFsID09PSB2YWx1ZSB8fCAobmV3VmFsICE9PSBuZXdWYWwgJiYgdmFsdWUgIT09IHZhbHVlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlICovXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjdXN0b21TZXR0ZXIpIHtcbiAgICAgICAgY3VzdG9tU2V0dGVyKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IG5ld1ZhbDtcbiAgICAgIH1cbiAgICAgIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKG5ld1ZhbCk7XG4gICAgICBkZXAubm90aWZ5KCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYmplY3QuIEFkZHMgdGhlIG5ldyBwcm9wZXJ0eSBhbmRcbiAqIHRyaWdnZXJzIGNoYW5nZSBub3RpZmljYXRpb24gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3RcbiAqIGFscmVhZHkgZXhpc3QuXG4gKi9cbmZ1bmN0aW9uIHNldCAodGFyZ2V0LCBrZXksIHZhbCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQubGVuZ3RoID0gTWF0aC5tYXgodGFyZ2V0Lmxlbmd0aCwga2V5KTtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSwgdmFsKTtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgaWYgKGtleSBpbiB0YXJnZXQgJiYgIShrZXkgaW4gT2JqZWN0LnByb3RvdHlwZSkpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgYWRkaW5nIHJlYWN0aXZlIHByb3BlcnRpZXMgdG8gYSBWdWUgaW5zdGFuY2Ugb3IgaXRzIHJvb3QgJGRhdGEgJyArXG4gICAgICAnYXQgcnVudGltZSAtIGRlY2xhcmUgaXQgdXBmcm9udCBpbiB0aGUgZGF0YSBvcHRpb24uJ1xuICAgICk7XG4gICAgcmV0dXJuIHZhbFxuICB9XG4gIGlmICghb2IpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgZGVmaW5lUmVhY3RpdmUob2IudmFsdWUsIGtleSwgdmFsKTtcbiAgb2IuZGVwLm5vdGlmeSgpO1xuICByZXR1cm4gdmFsXG59XG5cbi8qKlxuICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cbiAqL1xuZnVuY3Rpb24gZGVsICh0YXJnZXQsIGtleSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgZGVsZXRpbmcgcHJvcGVydGllcyBvbiBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcbiAgICAgICctIGp1c3Qgc2V0IGl0IHRvIG51bGwuJ1xuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKCFoYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZGVsZXRlIHRhcmdldFtrZXldO1xuICBpZiAoIW9iKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgb2IuZGVwLm5vdGlmeSgpO1xufVxuXG4vKipcbiAqIENvbGxlY3QgZGVwZW5kZW5jaWVzIG9uIGFycmF5IGVsZW1lbnRzIHdoZW4gdGhlIGFycmF5IGlzIHRvdWNoZWQsIHNpbmNlXG4gKiB3ZSBjYW5ub3QgaW50ZXJjZXB0IGFycmF5IGVsZW1lbnQgYWNjZXNzIGxpa2UgcHJvcGVydHkgZ2V0dGVycy5cbiAqL1xuZnVuY3Rpb24gZGVwZW5kQXJyYXkgKHZhbHVlKSB7XG4gIGZvciAodmFyIGUgPSAodm9pZCAwKSwgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBlID0gdmFsdWVbaV07XG4gICAgZSAmJiBlLl9fb2JfXyAmJiBlLl9fb2JfXy5kZXAuZGVwZW5kKCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHtcbiAgICAgIGRlcGVuZEFycmF5KGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBPcHRpb24gb3ZlcndyaXRpbmcgc3RyYXRlZ2llcyBhcmUgZnVuY3Rpb25zIHRoYXQgaGFuZGxlXG4gKiBob3cgdG8gbWVyZ2UgYSBwYXJlbnQgb3B0aW9uIHZhbHVlIGFuZCBhIGNoaWxkIG9wdGlvblxuICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXG4gKi9cbnZhciBzdHJhdHMgPSBjb25maWcub3B0aW9uTWVyZ2VTdHJhdGVnaWVzO1xuXG4vKipcbiAqIE9wdGlvbnMgd2l0aCByZXN0cmljdGlvbnNcbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgc3RyYXRzLmVsID0gc3RyYXRzLnByb3BzRGF0YSA9IGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkLCB2bSwga2V5KSB7XG4gICAgaWYgKCF2bSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCJvcHRpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiIGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIGluc3RhbmNlIFwiICtcbiAgICAgICAgJ2NyZWF0aW9uIHdpdGggdGhlIGBuZXdgIGtleXdvcmQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRTdHJhdChwYXJlbnQsIGNoaWxkKVxuICB9O1xufVxuXG4vKipcbiAqIEhlbHBlciB0aGF0IHJlY3Vyc2l2ZWx5IG1lcmdlcyB0d28gZGF0YSBvYmplY3RzIHRvZ2V0aGVyLlxuICovXG5mdW5jdGlvbiBtZXJnZURhdGEgKHRvLCBmcm9tKSB7XG4gIGlmICghZnJvbSkgeyByZXR1cm4gdG8gfVxuICB2YXIga2V5LCB0b1ZhbCwgZnJvbVZhbDtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhmcm9tKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICB0b1ZhbCA9IHRvW2tleV07XG4gICAgZnJvbVZhbCA9IGZyb21ba2V5XTtcbiAgICBpZiAoIWhhc093bih0bywga2V5KSkge1xuICAgICAgc2V0KHRvLCBrZXksIGZyb21WYWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh0b1ZhbCkgJiYgaXNQbGFpbk9iamVjdChmcm9tVmFsKSkge1xuICAgICAgbWVyZ2VEYXRhKHRvVmFsLCBmcm9tVmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvXG59XG5cbi8qKlxuICogRGF0YVxuICovXG5mdW5jdGlvbiBtZXJnZURhdGFPckZuIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm1cbikge1xuICBpZiAoIXZtKSB7XG4gICAgLy8gaW4gYSBWdWUuZXh0ZW5kIG1lcmdlLCBib3RoIHNob3VsZCBiZSBmdW5jdGlvbnNcbiAgICBpZiAoIWNoaWxkVmFsKSB7XG4gICAgICByZXR1cm4gcGFyZW50VmFsXG4gICAgfVxuICAgIGlmICghcGFyZW50VmFsKSB7XG4gICAgICByZXR1cm4gY2hpbGRWYWxcbiAgICB9XG4gICAgLy8gd2hlbiBwYXJlbnRWYWwgJiBjaGlsZFZhbCBhcmUgYm90aCBwcmVzZW50LFxuICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAgIC8vIG1lcmdlZCByZXN1bHQgb2YgYm90aCBmdW5jdGlvbnMuLi4gbm8gbmVlZCB0b1xuICAgIC8vIGNoZWNrIGlmIHBhcmVudFZhbCBpcyBhIGZ1bmN0aW9uIGhlcmUgYmVjYXVzZVxuICAgIC8vIGl0IGhhcyB0byBiZSBhIGZ1bmN0aW9uIHRvIHBhc3MgcHJldmlvdXMgbWVyZ2VzLlxuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWREYXRhRm4gKCkge1xuICAgICAgcmV0dXJuIG1lcmdlRGF0YShcbiAgICAgICAgdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nID8gY2hpbGRWYWwuY2FsbCh0aGlzKSA6IGNoaWxkVmFsLFxuICAgICAgICB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nID8gcGFyZW50VmFsLmNhbGwodGhpcykgOiBwYXJlbnRWYWxcbiAgICAgIClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZEluc3RhbmNlRGF0YUZuICgpIHtcbiAgICAgIC8vIGluc3RhbmNlIG1lcmdlXG4gICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gY2hpbGRWYWwuY2FsbCh2bSlcbiAgICAgICAgOiBjaGlsZFZhbDtcbiAgICAgIHZhciBkZWZhdWx0RGF0YSA9IHR5cGVvZiBwYXJlbnRWYWwgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBwYXJlbnRWYWwuY2FsbCh2bSlcbiAgICAgICAgOiBwYXJlbnRWYWw7XG4gICAgICBpZiAoaW5zdGFuY2VEYXRhKSB7XG4gICAgICAgIHJldHVybiBtZXJnZURhdGEoaW5zdGFuY2VEYXRhLCBkZWZhdWx0RGF0YSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0RGF0YVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5zdHJhdHMuZGF0YSA9IGZ1bmN0aW9uIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm1cbikge1xuICBpZiAoIXZtKSB7XG4gICAgaWYgKGNoaWxkVmFsICYmIHR5cGVvZiBjaGlsZFZhbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAnVGhlIFwiZGF0YVwiIG9wdGlvbiBzaG91bGQgYmUgYSBmdW5jdGlvbiAnICtcbiAgICAgICAgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArXG4gICAgICAgICdkZWZpbml0aW9ucy4nLFxuICAgICAgICB2bVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHBhcmVudFZhbFxuICAgIH1cbiAgICByZXR1cm4gbWVyZ2VEYXRhT3JGbihwYXJlbnRWYWwsIGNoaWxkVmFsKVxuICB9XG5cbiAgcmV0dXJuIG1lcmdlRGF0YU9yRm4ocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0pXG59O1xuXG4vKipcbiAqIEhvb2tzIGFuZCBwcm9wcyBhcmUgbWVyZ2VkIGFzIGFycmF5cy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VIb29rIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbFxuKSB7XG4gIHJldHVybiBjaGlsZFZhbFxuICAgID8gcGFyZW50VmFsXG4gICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXG4gICAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGRWYWwpXG4gICAgICAgID8gY2hpbGRWYWxcbiAgICAgICAgOiBbY2hpbGRWYWxdXG4gICAgOiBwYXJlbnRWYWxcbn1cblxuTElGRUNZQ0xFX0hPT0tTLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcbiAgc3RyYXRzW2hvb2tdID0gbWVyZ2VIb29rO1xufSk7XG5cbi8qKlxuICogQXNzZXRzXG4gKlxuICogV2hlbiBhIHZtIGlzIHByZXNlbnQgKGluc3RhbmNlIGNyZWF0aW9uKSwgd2UgbmVlZCB0byBkb1xuICogYSB0aHJlZS13YXkgbWVyZ2UgYmV0d2VlbiBjb25zdHJ1Y3RvciBvcHRpb25zLCBpbnN0YW5jZVxuICogb3B0aW9ucyBhbmQgcGFyZW50IG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXNzZXRzIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm0sXG4gIGtleVxuKSB7XG4gIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFZhbCB8fCBudWxsKTtcbiAgaWYgKGNoaWxkVmFsKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBhc3NlcnRPYmplY3RUeXBlKGtleSwgY2hpbGRWYWwsIHZtKTtcbiAgICByZXR1cm4gZXh0ZW5kKHJlcywgY2hpbGRWYWwpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlc1xuICB9XG59XG5cbkFTU0VUX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgc3RyYXRzW3R5cGUgKyAncyddID0gbWVyZ2VBc3NldHM7XG59KTtcblxuLyoqXG4gKiBXYXRjaGVycy5cbiAqXG4gKiBXYXRjaGVycyBoYXNoZXMgc2hvdWxkIG5vdCBvdmVyd3JpdGUgb25lXG4gKiBhbm90aGVyLCBzbyB3ZSBtZXJnZSB0aGVtIGFzIGFycmF5cy5cbiAqL1xuc3RyYXRzLndhdGNoID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bSxcbiAga2V5XG4pIHtcbiAgLy8gd29yayBhcm91bmQgRmlyZWZveCdzIE9iamVjdC5wcm90b3R5cGUud2F0Y2guLi5cbiAgaWYgKHBhcmVudFZhbCA9PT0gbmF0aXZlV2F0Y2gpIHsgcGFyZW50VmFsID0gdW5kZWZpbmVkOyB9XG4gIGlmIChjaGlsZFZhbCA9PT0gbmF0aXZlV2F0Y2gpIHsgY2hpbGRWYWwgPSB1bmRlZmluZWQ7IH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghY2hpbGRWYWwpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRPYmplY3RUeXBlKGtleSwgY2hpbGRWYWwsIHZtKTtcbiAgfVxuICBpZiAoIXBhcmVudFZhbCkgeyByZXR1cm4gY2hpbGRWYWwgfVxuICB2YXIgcmV0ID0ge307XG4gIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gIGZvciAodmFyIGtleSQxIGluIGNoaWxkVmFsKSB7XG4gICAgdmFyIHBhcmVudCA9IHJldFtrZXkkMV07XG4gICAgdmFyIGNoaWxkID0gY2hpbGRWYWxba2V5JDFdO1xuICAgIGlmIChwYXJlbnQgJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkge1xuICAgICAgcGFyZW50ID0gW3BhcmVudF07XG4gICAgfVxuICAgIHJldFtrZXkkMV0gPSBwYXJlbnRcbiAgICAgID8gcGFyZW50LmNvbmNhdChjaGlsZClcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZCkgPyBjaGlsZCA6IFtjaGlsZF07XG4gIH1cbiAgcmV0dXJuIHJldFxufTtcblxuLyoqXG4gKiBPdGhlciBvYmplY3QgaGFzaGVzLlxuICovXG5zdHJhdHMucHJvcHMgPVxuc3RyYXRzLm1ldGhvZHMgPVxuc3RyYXRzLmluamVjdCA9XG5zdHJhdHMuY29tcHV0ZWQgPSBmdW5jdGlvbiAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWwsXG4gIHZtLFxuICBrZXlcbikge1xuICBpZiAoY2hpbGRWYWwgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydE9iamVjdFR5cGUoa2V5LCBjaGlsZFZhbCwgdm0pO1xuICB9XG4gIGlmICghcGFyZW50VmFsKSB7IHJldHVybiBjaGlsZFZhbCB9XG4gIHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICBpZiAoY2hpbGRWYWwpIHsgZXh0ZW5kKHJldCwgY2hpbGRWYWwpOyB9XG4gIHJldHVybiByZXRcbn07XG5zdHJhdHMucHJvdmlkZSA9IG1lcmdlRGF0YU9yRm47XG5cbi8qKlxuICogRGVmYXVsdCBzdHJhdGVneS5cbiAqL1xudmFyIGRlZmF1bHRTdHJhdCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gIHJldHVybiBjaGlsZFZhbCA9PT0gdW5kZWZpbmVkXG4gICAgPyBwYXJlbnRWYWxcbiAgICA6IGNoaWxkVmFsXG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIGNvbXBvbmVudCBuYW1lc1xuICovXG5mdW5jdGlvbiBjaGVja0NvbXBvbmVudHMgKG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMuY29tcG9uZW50cykge1xuICAgIHZhciBsb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChpc0J1aWx0SW5UYWcobG93ZXIpIHx8IGNvbmZpZy5pc1Jlc2VydmVkVGFnKGxvd2VyKSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0RvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgJyArXG4gICAgICAgICdpZDogJyArIGtleVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmUgYWxsIHByb3BzIG9wdGlvbiBzeW50YXggYXJlIG5vcm1hbGl6ZWQgaW50byB0aGVcbiAqIE9iamVjdC1iYXNlZCBmb3JtYXQuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVByb3BzIChvcHRpb25zLCB2bSkge1xuICB2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuICBpZiAoIXByb3BzKSB7IHJldHVybiB9XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGksIHZhbCwgbmFtZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMpKSB7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YWwgPSBwcm9wc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYW1lID0gY2FtZWxpemUodmFsKTtcbiAgICAgICAgcmVzW25hbWVdID0geyB0eXBlOiBudWxsIH07XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgd2FybigncHJvcHMgbXVzdCBiZSBzdHJpbmdzIHdoZW4gdXNpbmcgYXJyYXkgc3ludGF4LicpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHByb3BzKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgdmFsID0gcHJvcHNba2V5XTtcbiAgICAgIG5hbWUgPSBjYW1lbGl6ZShrZXkpO1xuICAgICAgcmVzW25hbWVdID0gaXNQbGFpbk9iamVjdCh2YWwpXG4gICAgICAgID8gdmFsXG4gICAgICAgIDogeyB0eXBlOiB2YWwgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHdhcm4oXG4gICAgICBcIkludmFsaWQgdmFsdWUgZm9yIG9wdGlvbiBcXFwicHJvcHNcXFwiOiBleHBlY3RlZCBhbiBBcnJheSBvciBhbiBPYmplY3QsIFwiICtcbiAgICAgIFwiYnV0IGdvdCBcIiArICh0b1Jhd1R5cGUocHJvcHMpKSArIFwiLlwiLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIG9wdGlvbnMucHJvcHMgPSByZXM7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIGFsbCBpbmplY3Rpb25zIGludG8gT2JqZWN0LWJhc2VkIGZvcm1hdFxuICovXG5mdW5jdGlvbiBub3JtYWxpemVJbmplY3QgKG9wdGlvbnMsIHZtKSB7XG4gIHZhciBpbmplY3QgPSBvcHRpb25zLmluamVjdDtcbiAgdmFyIG5vcm1hbGl6ZWQgPSBvcHRpb25zLmluamVjdCA9IHt9O1xuICBpZiAoQXJyYXkuaXNBcnJheShpbmplY3QpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5vcm1hbGl6ZWRbaW5qZWN0W2ldXSA9IHsgZnJvbTogaW5qZWN0W2ldIH07XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoaW5qZWN0KSkge1xuICAgIGZvciAodmFyIGtleSBpbiBpbmplY3QpIHtcbiAgICAgIHZhciB2YWwgPSBpbmplY3Rba2V5XTtcbiAgICAgIG5vcm1hbGl6ZWRba2V5XSA9IGlzUGxhaW5PYmplY3QodmFsKVxuICAgICAgICA/IGV4dGVuZCh7IGZyb206IGtleSB9LCB2YWwpXG4gICAgICAgIDogeyBmcm9tOiB2YWwgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBpbmplY3QpIHtcbiAgICB3YXJuKFxuICAgICAgXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcImluamVjdFxcXCI6IGV4cGVjdGVkIGFuIEFycmF5IG9yIGFuIE9iamVjdCwgXCIgK1xuICAgICAgXCJidXQgZ290IFwiICsgKHRvUmF3VHlwZShpbmplY3QpKSArIFwiLlwiLFxuICAgICAgdm1cbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogTm9ybWFsaXplIHJhdyBmdW5jdGlvbiBkaXJlY3RpdmVzIGludG8gb2JqZWN0IGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyAob3B0aW9ucykge1xuICB2YXIgZGlycyA9IG9wdGlvbnMuZGlyZWN0aXZlcztcbiAgaWYgKGRpcnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGlycykge1xuICAgICAgdmFyIGRlZiA9IGRpcnNba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRpcnNba2V5XSA9IHsgYmluZDogZGVmLCB1cGRhdGU6IGRlZiB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRPYmplY3RUeXBlIChuYW1lLCB2YWx1ZSwgdm0pIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHdhcm4oXG4gICAgICBcIkludmFsaWQgdmFsdWUgZm9yIG9wdGlvbiBcXFwiXCIgKyBuYW1lICsgXCJcXFwiOiBleHBlY3RlZCBhbiBPYmplY3QsIFwiICtcbiAgICAgIFwiYnV0IGdvdCBcIiArICh0b1Jhd1R5cGUodmFsdWUpKSArIFwiLlwiLFxuICAgICAgdm1cbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgdHdvIG9wdGlvbiBvYmplY3RzIGludG8gYSBuZXcgb25lLlxuICogQ29yZSB1dGlsaXR5IHVzZWQgaW4gYm90aCBpbnN0YW50aWF0aW9uIGFuZCBpbmhlcml0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VPcHRpb25zIChcbiAgcGFyZW50LFxuICBjaGlsZCxcbiAgdm1cbikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNoZWNrQ29tcG9uZW50cyhjaGlsZCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGNoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2hpbGQgPSBjaGlsZC5vcHRpb25zO1xuICB9XG5cbiAgbm9ybWFsaXplUHJvcHMoY2hpbGQsIHZtKTtcbiAgbm9ybWFsaXplSW5qZWN0KGNoaWxkLCB2bSk7XG4gIG5vcm1hbGl6ZURpcmVjdGl2ZXMoY2hpbGQpO1xuICB2YXIgZXh0ZW5kc0Zyb20gPSBjaGlsZC5leHRlbmRzO1xuICBpZiAoZXh0ZW5kc0Zyb20pIHtcbiAgICBwYXJlbnQgPSBtZXJnZU9wdGlvbnMocGFyZW50LCBleHRlbmRzRnJvbSwgdm0pO1xuICB9XG4gIGlmIChjaGlsZC5taXhpbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkLm1peGlucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHBhcmVudCA9IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkLm1peGluc1tpXSwgdm0pO1xuICAgIH1cbiAgfVxuICB2YXIgb3B0aW9ucyA9IHt9O1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBwYXJlbnQpIHtcbiAgICBtZXJnZUZpZWxkKGtleSk7XG4gIH1cbiAgZm9yIChrZXkgaW4gY2hpbGQpIHtcbiAgICBpZiAoIWhhc093bihwYXJlbnQsIGtleSkpIHtcbiAgICAgIG1lcmdlRmllbGQoa2V5KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWVyZ2VGaWVsZCAoa2V5KSB7XG4gICAgdmFyIHN0cmF0ID0gc3RyYXRzW2tleV0gfHwgZGVmYXVsdFN0cmF0O1xuICAgIG9wdGlvbnNba2V5XSA9IHN0cmF0KHBhcmVudFtrZXldLCBjaGlsZFtrZXldLCB2bSwga2V5KTtcbiAgfVxuICByZXR1cm4gb3B0aW9uc1xufVxuXG4vKipcbiAqIFJlc29sdmUgYW4gYXNzZXQuXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgYmVjYXVzZSBjaGlsZCBpbnN0YW5jZXMgbmVlZCBhY2Nlc3NcbiAqIHRvIGFzc2V0cyBkZWZpbmVkIGluIGl0cyBhbmNlc3RvciBjaGFpbi5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUFzc2V0IChcbiAgb3B0aW9ucyxcbiAgdHlwZSxcbiAgaWQsXG4gIHdhcm5NaXNzaW5nXG4pIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIGFzc2V0cyA9IG9wdGlvbnNbdHlwZV07XG4gIC8vIGNoZWNrIGxvY2FsIHJlZ2lzdHJhdGlvbiB2YXJpYXRpb25zIGZpcnN0XG4gIGlmIChoYXNPd24oYXNzZXRzLCBpZCkpIHsgcmV0dXJuIGFzc2V0c1tpZF0gfVxuICB2YXIgY2FtZWxpemVkSWQgPSBjYW1lbGl6ZShpZCk7XG4gIGlmIChoYXNPd24oYXNzZXRzLCBjYW1lbGl6ZWRJZCkpIHsgcmV0dXJuIGFzc2V0c1tjYW1lbGl6ZWRJZF0gfVxuICB2YXIgUGFzY2FsQ2FzZUlkID0gY2FwaXRhbGl6ZShjYW1lbGl6ZWRJZCk7XG4gIGlmIChoYXNPd24oYXNzZXRzLCBQYXNjYWxDYXNlSWQpKSB7IHJldHVybiBhc3NldHNbUGFzY2FsQ2FzZUlkXSB9XG4gIC8vIGZhbGxiYWNrIHRvIHByb3RvdHlwZSBjaGFpblxuICB2YXIgcmVzID0gYXNzZXRzW2lkXSB8fCBhc3NldHNbY2FtZWxpemVkSWRdIHx8IGFzc2V0c1tQYXNjYWxDYXNlSWRdO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuTWlzc2luZyAmJiAhcmVzKSB7XG4gICAgd2FybihcbiAgICAgICdGYWlsZWQgdG8gcmVzb2x2ZSAnICsgdHlwZS5zbGljZSgwLCAtMSkgKyAnOiAnICsgaWQsXG4gICAgICBvcHRpb25zXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3AgKFxuICBrZXksXG4gIHByb3BPcHRpb25zLFxuICBwcm9wc0RhdGEsXG4gIHZtXG4pIHtcbiAgdmFyIHByb3AgPSBwcm9wT3B0aW9uc1trZXldO1xuICB2YXIgYWJzZW50ID0gIWhhc093bihwcm9wc0RhdGEsIGtleSk7XG4gIHZhciB2YWx1ZSA9IHByb3BzRGF0YVtrZXldO1xuICAvLyBoYW5kbGUgYm9vbGVhbiBwcm9wc1xuICBpZiAoaXNUeXBlKEJvb2xlYW4sIHByb3AudHlwZSkpIHtcbiAgICBpZiAoYWJzZW50ICYmICFoYXNPd24ocHJvcCwgJ2RlZmF1bHQnKSkge1xuICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKCFpc1R5cGUoU3RyaW5nLCBwcm9wLnR5cGUpICYmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IGh5cGhlbmF0ZShrZXkpKSkge1xuICAgICAgdmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgfVxuICAvLyBjaGVjayBkZWZhdWx0IHZhbHVlXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSBnZXRQcm9wRGVmYXVsdFZhbHVlKHZtLCBwcm9wLCBrZXkpO1xuICAgIC8vIHNpbmNlIHRoZSBkZWZhdWx0IHZhbHVlIGlzIGEgZnJlc2ggY29weSxcbiAgICAvLyBtYWtlIHN1cmUgdG8gb2JzZXJ2ZSBpdC5cbiAgICB2YXIgcHJldlNob3VsZENvbnZlcnQgPSBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQ7XG4gICAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ID0gdHJ1ZTtcbiAgICBvYnNlcnZlKHZhbHVlKTtcbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSBwcmV2U2hvdWxkQ29udmVydDtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydFByb3AocHJvcCwga2V5LCB2YWx1ZSwgdm0sIGFic2VudCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogR2V0IHRoZSBkZWZhdWx0IHZhbHVlIG9mIGEgcHJvcC5cbiAqL1xuZnVuY3Rpb24gZ2V0UHJvcERlZmF1bHRWYWx1ZSAodm0sIHByb3AsIGtleSkge1xuICAvLyBubyBkZWZhdWx0LCByZXR1cm4gdW5kZWZpbmVkXG4gIGlmICghaGFzT3duKHByb3AsICdkZWZhdWx0JykpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbiAgdmFyIGRlZiA9IHByb3AuZGVmYXVsdDtcbiAgLy8gd2FybiBhZ2FpbnN0IG5vbi1mYWN0b3J5IGRlZmF1bHRzIGZvciBPYmplY3QgJiBBcnJheVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBpc09iamVjdChkZWYpKSB7XG4gICAgd2FybihcbiAgICAgICdJbnZhbGlkIGRlZmF1bHQgdmFsdWUgZm9yIHByb3AgXCInICsga2V5ICsgJ1wiOiAnICtcbiAgICAgICdQcm9wcyB3aXRoIHR5cGUgT2JqZWN0L0FycmF5IG11c3QgdXNlIGEgZmFjdG9yeSBmdW5jdGlvbiAnICtcbiAgICAgICd0byByZXR1cm4gdGhlIGRlZmF1bHQgdmFsdWUuJyxcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxuICAvLyB0aGUgcmF3IHByb3AgdmFsdWUgd2FzIGFsc28gdW5kZWZpbmVkIGZyb20gcHJldmlvdXMgcmVuZGVyLFxuICAvLyByZXR1cm4gcHJldmlvdXMgZGVmYXVsdCB2YWx1ZSB0byBhdm9pZCB1bm5lY2Vzc2FyeSB3YXRjaGVyIHRyaWdnZXJcbiAgaWYgKHZtICYmIHZtLiRvcHRpb25zLnByb3BzRGF0YSAmJlxuICAgIHZtLiRvcHRpb25zLnByb3BzRGF0YVtrZXldID09PSB1bmRlZmluZWQgJiZcbiAgICB2bS5fcHJvcHNba2V5XSAhPT0gdW5kZWZpbmVkXG4gICkge1xuICAgIHJldHVybiB2bS5fcHJvcHNba2V5XVxuICB9XG4gIC8vIGNhbGwgZmFjdG9yeSBmdW5jdGlvbiBmb3Igbm9uLUZ1bmN0aW9uIHR5cGVzXG4gIC8vIGEgdmFsdWUgaXMgRnVuY3Rpb24gaWYgaXRzIHByb3RvdHlwZSBpcyBmdW5jdGlvbiBldmVuIGFjcm9zcyBkaWZmZXJlbnQgZXhlY3V0aW9uIGNvbnRleHRcbiAgcmV0dXJuIHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicgJiYgZ2V0VHlwZShwcm9wLnR5cGUpICE9PSAnRnVuY3Rpb24nXG4gICAgPyBkZWYuY2FsbCh2bSlcbiAgICA6IGRlZlxufVxuXG4vKipcbiAqIEFzc2VydCB3aGV0aGVyIGEgcHJvcCBpcyB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gYXNzZXJ0UHJvcCAoXG4gIHByb3AsXG4gIG5hbWUsXG4gIHZhbHVlLFxuICB2bSxcbiAgYWJzZW50XG4pIHtcbiAgaWYgKHByb3AucmVxdWlyZWQgJiYgYWJzZW50KSB7XG4gICAgd2FybihcbiAgICAgICdNaXNzaW5nIHJlcXVpcmVkIHByb3A6IFwiJyArIG5hbWUgKyAnXCInLFxuICAgICAgdm1cbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsICYmICFwcm9wLnJlcXVpcmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHR5cGUgPSBwcm9wLnR5cGU7XG4gIHZhciB2YWxpZCA9ICF0eXBlIHx8IHR5cGUgPT09IHRydWU7XG4gIHZhciBleHBlY3RlZFR5cGVzID0gW107XG4gIGlmICh0eXBlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICB0eXBlID0gW3R5cGVdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGUubGVuZ3RoICYmICF2YWxpZDsgaSsrKSB7XG4gICAgICB2YXIgYXNzZXJ0ZWRUeXBlID0gYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZVtpXSk7XG4gICAgICBleHBlY3RlZFR5cGVzLnB1c2goYXNzZXJ0ZWRUeXBlLmV4cGVjdGVkVHlwZSB8fCAnJyk7XG4gICAgICB2YWxpZCA9IGFzc2VydGVkVHlwZS52YWxpZDtcbiAgICB9XG4gIH1cbiAgaWYgKCF2YWxpZCkge1xuICAgIHdhcm4oXG4gICAgICBcIkludmFsaWQgcHJvcDogdHlwZSBjaGVjayBmYWlsZWQgZm9yIHByb3AgXFxcIlwiICsgbmFtZSArIFwiXFxcIi5cIiArXG4gICAgICBcIiBFeHBlY3RlZCBcIiArIChleHBlY3RlZFR5cGVzLm1hcChjYXBpdGFsaXplKS5qb2luKCcsICcpKSArXG4gICAgICBcIiwgZ290IFwiICsgKHRvUmF3VHlwZSh2YWx1ZSkpICsgXCIuXCIsXG4gICAgICB2bVxuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHZhbGlkYXRvciA9IHByb3AudmFsaWRhdG9yO1xuICBpZiAodmFsaWRhdG9yKSB7XG4gICAgaWYgKCF2YWxpZGF0b3IodmFsdWUpKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnSW52YWxpZCBwcm9wOiBjdXN0b20gdmFsaWRhdG9yIGNoZWNrIGZhaWxlZCBmb3IgcHJvcCBcIicgKyBuYW1lICsgJ1wiLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG52YXIgc2ltcGxlQ2hlY2tSRSA9IC9eKFN0cmluZ3xOdW1iZXJ8Qm9vbGVhbnxGdW5jdGlvbnxTeW1ib2wpJC87XG5cbmZ1bmN0aW9uIGFzc2VydFR5cGUgKHZhbHVlLCB0eXBlKSB7XG4gIHZhciB2YWxpZDtcbiAgdmFyIGV4cGVjdGVkVHlwZSA9IGdldFR5cGUodHlwZSk7XG4gIGlmIChzaW1wbGVDaGVja1JFLnRlc3QoZXhwZWN0ZWRUeXBlKSkge1xuICAgIHZhciB0ID0gdHlwZW9mIHZhbHVlO1xuICAgIHZhbGlkID0gdCA9PT0gZXhwZWN0ZWRUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gZm9yIHByaW1pdGl2ZSB3cmFwcGVyIG9iamVjdHNcbiAgICBpZiAoIXZhbGlkICYmIHQgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YWxpZCA9IHZhbHVlIGluc3RhbmNlb2YgdHlwZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWRUeXBlID09PSAnT2JqZWN0Jykge1xuICAgIHZhbGlkID0gaXNQbGFpbk9iamVjdCh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWRUeXBlID09PSAnQXJyYXknKSB7XG4gICAgdmFsaWQgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB2YWxpZCA9IHZhbHVlIGluc3RhbmNlb2YgdHlwZTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHZhbGlkOiB2YWxpZCxcbiAgICBleHBlY3RlZFR5cGU6IGV4cGVjdGVkVHlwZVxuICB9XG59XG5cbi8qKlxuICogVXNlIGZ1bmN0aW9uIHN0cmluZyBuYW1lIHRvIGNoZWNrIGJ1aWx0LWluIHR5cGVzLFxuICogYmVjYXVzZSBhIHNpbXBsZSBlcXVhbGl0eSBjaGVjayB3aWxsIGZhaWwgd2hlbiBydW5uaW5nXG4gKiBhY3Jvc3MgZGlmZmVyZW50IHZtcyAvIGlmcmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGdldFR5cGUgKGZuKSB7XG4gIHZhciBtYXRjaCA9IGZuICYmIGZuLnRvU3RyaW5nKCkubWF0Y2goL15cXHMqZnVuY3Rpb24gKFxcdyspLyk7XG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogJydcbn1cblxuZnVuY3Rpb24gaXNUeXBlICh0eXBlLCBmbikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZm4pKSB7XG4gICAgcmV0dXJuIGdldFR5cGUoZm4pID09PSBnZXRUeXBlKHR5cGUpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGdldFR5cGUoZm5baV0pID09PSBnZXRUeXBlKHR5cGUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gZmFsc2Vcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yIChlcnIsIHZtLCBpbmZvKSB7XG4gIGlmICh2bSkge1xuICAgIHZhciBjdXIgPSB2bTtcbiAgICB3aGlsZSAoKGN1ciA9IGN1ci4kcGFyZW50KSkge1xuICAgICAgdmFyIGhvb2tzID0gY3VyLiRvcHRpb25zLmVycm9yQ2FwdHVyZWQ7XG4gICAgICBpZiAoaG9va3MpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY2FwdHVyZSA9IGhvb2tzW2ldLmNhbGwoY3VyLCBlcnIsIHZtLCBpbmZvKSA9PT0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoY2FwdHVyZSkgeyByZXR1cm4gfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGdsb2JhbEhhbmRsZUVycm9yKGUsIGN1ciwgJ2Vycm9yQ2FwdHVyZWQgaG9vaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBnbG9iYWxIYW5kbGVFcnJvcihlcnIsIHZtLCBpbmZvKTtcbn1cblxuZnVuY3Rpb24gZ2xvYmFsSGFuZGxlRXJyb3IgKGVyciwgdm0sIGluZm8pIHtcbiAgaWYgKGNvbmZpZy5lcnJvckhhbmRsZXIpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGNvbmZpZy5lcnJvckhhbmRsZXIuY2FsbChudWxsLCBlcnIsIHZtLCBpbmZvKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ0Vycm9yKGUsIG51bGwsICdjb25maWcuZXJyb3JIYW5kbGVyJyk7XG4gICAgfVxuICB9XG4gIGxvZ0Vycm9yKGVyciwgdm0sIGluZm8pO1xufVxuXG5mdW5jdGlvbiBsb2dFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHdhcm4oKFwiRXJyb3IgaW4gXCIgKyBpbmZvICsgXCI6IFxcXCJcIiArIChlcnIudG9TdHJpbmcoKSkgKyBcIlxcXCJcIiksIHZtKTtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoKGluQnJvd3NlciB8fCBpbldlZXgpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBlcnJcbiAgfVxufVxuXG4vKiAgKi9cbi8qIGdsb2JhbHMgTWVzc2FnZUNoYW5uZWwgKi9cblxudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIHBlbmRpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZmx1c2hDYWxsYmFja3MgKCkge1xuICBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBjb3BpZXMgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gIGNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvcGllc1tpXSgpO1xuICB9XG59XG5cbi8vIEhlcmUgd2UgaGF2ZSBhc3luYyBkZWZlcnJpbmcgd3JhcHBlcnMgdXNpbmcgYm90aCBtaWNybyBhbmQgbWFjcm8gdGFza3MuXG4vLyBJbiA8IDIuNCB3ZSB1c2VkIG1pY3JvIHRhc2tzIGV2ZXJ5d2hlcmUsIGJ1dCB0aGVyZSBhcmUgc29tZSBzY2VuYXJpb3Mgd2hlcmVcbi8vIG1pY3JvIHRhc2tzIGhhdmUgdG9vIGhpZ2ggYSBwcmlvcml0eSBhbmQgZmlyZXMgaW4gYmV0d2VlbiBzdXBwb3NlZGx5XG4vLyBzZXF1ZW50aWFsIGV2ZW50cyAoZS5nLiAjNDUyMSwgIzY2OTApIG9yIGV2ZW4gYmV0d2VlbiBidWJibGluZyBvZiB0aGUgc2FtZVxuLy8gZXZlbnQgKCM2NTY2KS4gSG93ZXZlciwgdXNpbmcgbWFjcm8gdGFza3MgZXZlcnl3aGVyZSBhbHNvIGhhcyBzdWJ0bGUgcHJvYmxlbXNcbi8vIHdoZW4gc3RhdGUgaXMgY2hhbmdlZCByaWdodCBiZWZvcmUgcmVwYWludCAoZS5nLiAjNjgxMywgb3V0LWluIHRyYW5zaXRpb25zKS5cbi8vIEhlcmUgd2UgdXNlIG1pY3JvIHRhc2sgYnkgZGVmYXVsdCwgYnV0IGV4cG9zZSBhIHdheSB0byBmb3JjZSBtYWNybyB0YXNrIHdoZW5cbi8vIG5lZWRlZCAoZS5nLiBpbiBldmVudCBoYW5kbGVycyBhdHRhY2hlZCBieSB2LW9uKS5cbnZhciBtaWNyb1RpbWVyRnVuYztcbnZhciBtYWNyb1RpbWVyRnVuYztcbnZhciB1c2VNYWNyb1Rhc2sgPSBmYWxzZTtcblxuLy8gRGV0ZXJtaW5lIChtYWNybykgVGFzayBkZWZlciBpbXBsZW1lbnRhdGlvbi5cbi8vIFRlY2huaWNhbGx5IHNldEltbWVkaWF0ZSBzaG91bGQgYmUgdGhlIGlkZWFsIGNob2ljZSwgYnV0IGl0J3Mgb25seSBhdmFpbGFibGVcbi8vIGluIElFLiBUaGUgb25seSBwb2x5ZmlsbCB0aGF0IGNvbnNpc3RlbnRseSBxdWV1ZXMgdGhlIGNhbGxiYWNrIGFmdGVyIGFsbCBET01cbi8vIGV2ZW50cyB0cmlnZ2VyZWQgaW4gdGhlIHNhbWUgbG9vcCBpcyBieSB1c2luZyBNZXNzYWdlQ2hhbm5lbC5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKHNldEltbWVkaWF0ZSkpIHtcbiAgbWFjcm9UaW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0SW1tZWRpYXRlKGZsdXNoQ2FsbGJhY2tzKTtcbiAgfTtcbn0gZWxzZSBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJyAmJiAoXG4gIGlzTmF0aXZlKE1lc3NhZ2VDaGFubmVsKSB8fFxuICAvLyBQaGFudG9tSlNcbiAgTWVzc2FnZUNoYW5uZWwudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgTWVzc2FnZUNoYW5uZWxDb25zdHJ1Y3Rvcl0nXG4pKSB7XG4gIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gIHZhciBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaENhbGxiYWNrcztcbiAgbWFjcm9UaW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcG9ydC5wb3N0TWVzc2FnZSgxKTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIG1hY3JvVGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoZmx1c2hDYWxsYmFja3MsIDApO1xuICB9O1xufVxuXG4vLyBEZXRlcm1pbmUgTWljcm9UYXNrIGRlZmVyIGltcGxlbWVudGF0aW9uLlxuLyogaXN0YW5idWwgaWdub3JlIG5leHQsICRmbG93LWRpc2FibGUtbGluZSAqL1xuaWYgKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShQcm9taXNlKSkge1xuICB2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICBtaWNyb1RpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBwLnRoZW4oZmx1c2hDYWxsYmFja3MpO1xuICAgIC8vIGluIHByb2JsZW1hdGljIFVJV2ViVmlld3MsIFByb21pc2UudGhlbiBkb2Vzbid0IGNvbXBsZXRlbHkgYnJlYWssIGJ1dFxuICAgIC8vIGl0IGNhbiBnZXQgc3R1Y2sgaW4gYSB3ZWlyZCBzdGF0ZSB3aGVyZSBjYWxsYmFja3MgYXJlIHB1c2hlZCBpbnRvIHRoZVxuICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBidXQgdGhlIHF1ZXVlIGlzbid0IGJlaW5nIGZsdXNoZWQsIHVudGlsIHRoZSBicm93c2VyXG4gICAgLy8gbmVlZHMgdG8gZG8gc29tZSBvdGhlciB3b3JrLCBlLmcuIGhhbmRsZSBhIHRpbWVyLiBUaGVyZWZvcmUgd2UgY2FuXG4gICAgLy8gXCJmb3JjZVwiIHRoZSBtaWNyb3Rhc2sgcXVldWUgdG8gYmUgZmx1c2hlZCBieSBhZGRpbmcgYW4gZW1wdHkgdGltZXIuXG4gICAgaWYgKGlzSU9TKSB7IHNldFRpbWVvdXQobm9vcCk7IH1cbiAgfTtcbn0gZWxzZSB7XG4gIC8vIGZhbGxiYWNrIHRvIG1hY3JvXG4gIG1pY3JvVGltZXJGdW5jID0gbWFjcm9UaW1lckZ1bmM7XG59XG5cbi8qKlxuICogV3JhcCBhIGZ1bmN0aW9uIHNvIHRoYXQgaWYgYW55IGNvZGUgaW5zaWRlIHRyaWdnZXJzIHN0YXRlIGNoYW5nZSxcbiAqIHRoZSBjaGFuZ2VzIGFyZSBxdWV1ZWQgdXNpbmcgYSBUYXNrIGluc3RlYWQgb2YgYSBNaWNyb1Rhc2suXG4gKi9cbmZ1bmN0aW9uIHdpdGhNYWNyb1Rhc2sgKGZuKSB7XG4gIHJldHVybiBmbi5fd2l0aFRhc2sgfHwgKGZuLl93aXRoVGFzayA9IGZ1bmN0aW9uICgpIHtcbiAgICB1c2VNYWNyb1Rhc2sgPSB0cnVlO1xuICAgIHZhciByZXMgPSBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIHVzZU1hY3JvVGFzayA9IGZhbHNlO1xuICAgIHJldHVybiByZXNcbiAgfSlcbn1cblxuZnVuY3Rpb24gbmV4dFRpY2sgKGNiLCBjdHgpIHtcbiAgdmFyIF9yZXNvbHZlO1xuICBjYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNiKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYi5jYWxsKGN0eCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGUsIGN0eCwgJ25leHRUaWNrJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChfcmVzb2x2ZSkge1xuICAgICAgX3Jlc29sdmUoY3R4KTtcbiAgICB9XG4gIH0pO1xuICBpZiAoIXBlbmRpbmcpIHtcbiAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICBpZiAodXNlTWFjcm9UYXNrKSB7XG4gICAgICBtYWNyb1RpbWVyRnVuYygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtaWNyb1RpbWVyRnVuYygpO1xuICAgIH1cbiAgfVxuICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgaWYgKCFjYiAmJiB0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9KVxuICB9XG59XG5cbi8qICAqL1xuXG4vKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggUHJveHkgKi9cblxudmFyIGluaXRQcm94eTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGFsbG93ZWRHbG9iYWxzID0gbWFrZU1hcChcbiAgICAnSW5maW5pdHksdW5kZWZpbmVkLE5hTixpc0Zpbml0ZSxpc05hTiwnICtcbiAgICAncGFyc2VGbG9hdCxwYXJzZUludCxkZWNvZGVVUkksZGVjb2RlVVJJQ29tcG9uZW50LGVuY29kZVVSSSxlbmNvZGVVUklDb21wb25lbnQsJyArXG4gICAgJ01hdGgsTnVtYmVyLERhdGUsQXJyYXksT2JqZWN0LEJvb2xlYW4sU3RyaW5nLFJlZ0V4cCxNYXAsU2V0LEpTT04sSW50bCwnICtcbiAgICAncmVxdWlyZScgLy8gZm9yIFdlYnBhY2svQnJvd3NlcmlmeVxuICApO1xuXG4gIHZhciB3YXJuTm9uUHJlc2VudCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgIHdhcm4oXG4gICAgICBcIlByb3BlcnR5IG9yIG1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgbm90IGRlZmluZWQgb24gdGhlIGluc3RhbmNlIGJ1dCBcIiArXG4gICAgICAncmVmZXJlbmNlZCBkdXJpbmcgcmVuZGVyLiBNYWtlIHN1cmUgdGhhdCB0aGlzIHByb3BlcnR5IGlzIHJlYWN0aXZlLCAnICtcbiAgICAgICdlaXRoZXIgaW4gdGhlIGRhdGEgb3B0aW9uLCBvciBmb3IgY2xhc3MtYmFzZWQgY29tcG9uZW50cywgYnkgJyArXG4gICAgICAnaW5pdGlhbGl6aW5nIHRoZSBwcm9wZXJ0eS4gJyArXG4gICAgICAnU2VlOiBodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9yZWFjdGl2aXR5Lmh0bWwjRGVjbGFyaW5nLVJlYWN0aXZlLVByb3BlcnRpZXMuJyxcbiAgICAgIHRhcmdldFxuICAgICk7XG4gIH07XG5cbiAgdmFyIGhhc1Byb3h5ID1cbiAgICB0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnICYmXG4gICAgUHJveHkudG9TdHJpbmcoKS5tYXRjaCgvbmF0aXZlIGNvZGUvKTtcblxuICBpZiAoaGFzUHJveHkpIHtcbiAgICB2YXIgaXNCdWlsdEluTW9kaWZpZXIgPSBtYWtlTWFwKCdzdG9wLHByZXZlbnQsc2VsZixjdHJsLHNoaWZ0LGFsdCxtZXRhLGV4YWN0Jyk7XG4gICAgY29uZmlnLmtleUNvZGVzID0gbmV3IFByb3h5KGNvbmZpZy5rZXlDb2Rlcywge1xuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQgKHRhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaXNCdWlsdEluTW9kaWZpZXIoa2V5KSkge1xuICAgICAgICAgIHdhcm4oKFwiQXZvaWQgb3ZlcndyaXRpbmcgYnVpbHQtaW4gbW9kaWZpZXIgaW4gY29uZmlnLmtleUNvZGVzOiAuXCIgKyBrZXkpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBoYXNIYW5kbGVyID0ge1xuICAgIGhhczogZnVuY3Rpb24gaGFzICh0YXJnZXQsIGtleSkge1xuICAgICAgdmFyIGhhcyA9IGtleSBpbiB0YXJnZXQ7XG4gICAgICB2YXIgaXNBbGxvd2VkID0gYWxsb3dlZEdsb2JhbHMoa2V5KSB8fCBrZXkuY2hhckF0KDApID09PSAnXyc7XG4gICAgICBpZiAoIWhhcyAmJiAhaXNBbGxvd2VkKSB7XG4gICAgICAgIHdhcm5Ob25QcmVzZW50KHRhcmdldCwga2V5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXMgfHwgIWlzQWxsb3dlZFxuICAgIH1cbiAgfTtcblxuICB2YXIgZ2V0SGFuZGxlciA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiAhKGtleSBpbiB0YXJnZXQpKSB7XG4gICAgICAgIHdhcm5Ob25QcmVzZW50KHRhcmdldCwga2V5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0YXJnZXRba2V5XVxuICAgIH1cbiAgfTtcblxuICBpbml0UHJveHkgPSBmdW5jdGlvbiBpbml0UHJveHkgKHZtKSB7XG4gICAgaWYgKGhhc1Byb3h5KSB7XG4gICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggcHJveHkgaGFuZGxlciB0byB1c2VcbiAgICAgIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG4gICAgICB2YXIgaGFuZGxlcnMgPSBvcHRpb25zLnJlbmRlciAmJiBvcHRpb25zLnJlbmRlci5fd2l0aFN0cmlwcGVkXG4gICAgICAgID8gZ2V0SGFuZGxlclxuICAgICAgICA6IGhhc0hhbmRsZXI7XG4gICAgICB2bS5fcmVuZGVyUHJveHkgPSBuZXcgUHJveHkodm0sIGhhbmRsZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdm0uX3JlbmRlclByb3h5ID0gdm07XG4gICAgfVxuICB9O1xufVxuXG4vKiAgKi9cblxudmFyIHNlZW5PYmplY3RzID0gbmV3IF9TZXQoKTtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSB0cmF2ZXJzZSBhbiBvYmplY3QgdG8gZXZva2UgYWxsIGNvbnZlcnRlZFxuICogZ2V0dGVycywgc28gdGhhdCBldmVyeSBuZXN0ZWQgcHJvcGVydHkgaW5zaWRlIHRoZSBvYmplY3RcbiAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlICh2YWwpIHtcbiAgX3RyYXZlcnNlKHZhbCwgc2Vlbk9iamVjdHMpO1xuICBzZWVuT2JqZWN0cy5jbGVhcigpO1xufVxuXG5mdW5jdGlvbiBfdHJhdmVyc2UgKHZhbCwgc2Vlbikge1xuICB2YXIgaSwga2V5cztcbiAgdmFyIGlzQSA9IEFycmF5LmlzQXJyYXkodmFsKTtcbiAgaWYgKCghaXNBICYmICFpc09iamVjdCh2YWwpKSB8fCBPYmplY3QuaXNGcm96ZW4odmFsKSkge1xuICAgIHJldHVyblxuICB9XG4gIGlmICh2YWwuX19vYl9fKSB7XG4gICAgdmFyIGRlcElkID0gdmFsLl9fb2JfXy5kZXAuaWQ7XG4gICAgaWYgKHNlZW4uaGFzKGRlcElkKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHNlZW4uYWRkKGRlcElkKTtcbiAgfVxuICBpZiAoaXNBKSB7XG4gICAgaSA9IHZhbC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgeyBfdHJhdmVyc2UodmFsW2ldLCBzZWVuKTsgfVxuICB9IGVsc2Uge1xuICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7IF90cmF2ZXJzZSh2YWxba2V5c1tpXV0sIHNlZW4pOyB9XG4gIH1cbn1cblxudmFyIG1hcms7XG52YXIgbWVhc3VyZTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHBlcmYgPSBpbkJyb3dzZXIgJiYgd2luZG93LnBlcmZvcm1hbmNlO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKFxuICAgIHBlcmYgJiZcbiAgICBwZXJmLm1hcmsgJiZcbiAgICBwZXJmLm1lYXN1cmUgJiZcbiAgICBwZXJmLmNsZWFyTWFya3MgJiZcbiAgICBwZXJmLmNsZWFyTWVhc3VyZXNcbiAgKSB7XG4gICAgbWFyayA9IGZ1bmN0aW9uICh0YWcpIHsgcmV0dXJuIHBlcmYubWFyayh0YWcpOyB9O1xuICAgIG1lYXN1cmUgPSBmdW5jdGlvbiAobmFtZSwgc3RhcnRUYWcsIGVuZFRhZykge1xuICAgICAgcGVyZi5tZWFzdXJlKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgICAgcGVyZi5jbGVhck1hcmtzKHN0YXJ0VGFnKTtcbiAgICAgIHBlcmYuY2xlYXJNYXJrcyhlbmRUYWcpO1xuICAgICAgcGVyZi5jbGVhck1lYXN1cmVzKG5hbWUpO1xuICAgIH07XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBub3JtYWxpemVFdmVudCA9IGNhY2hlZChmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgcGFzc2l2ZSA9IG5hbWUuY2hhckF0KDApID09PSAnJic7XG4gIG5hbWUgPSBwYXNzaXZlID8gbmFtZS5zbGljZSgxKSA6IG5hbWU7XG4gIHZhciBvbmNlJCQxID0gbmFtZS5jaGFyQXQoMCkgPT09ICd+JzsgLy8gUHJlZml4ZWQgbGFzdCwgY2hlY2tlZCBmaXJzdFxuICBuYW1lID0gb25jZSQkMSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICB2YXIgY2FwdHVyZSA9IG5hbWUuY2hhckF0KDApID09PSAnISc7XG4gIG5hbWUgPSBjYXB0dXJlID8gbmFtZS5zbGljZSgxKSA6IG5hbWU7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBvbmNlOiBvbmNlJCQxLFxuICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgcGFzc2l2ZTogcGFzc2l2ZVxuICB9XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlRm5JbnZva2VyIChmbnMpIHtcbiAgZnVuY3Rpb24gaW52b2tlciAoKSB7XG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG4gICAgdmFyIGZucyA9IGludm9rZXIuZm5zO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZucykpIHtcbiAgICAgIHZhciBjbG9uZWQgPSBmbnMuc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNsb25lZFtpXS5hcHBseShudWxsLCBhcmd1bWVudHMkMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJldHVybiBoYW5kbGVyIHJldHVybiB2YWx1ZSBmb3Igc2luZ2xlIGhhbmRsZXJzXG4gICAgICByZXR1cm4gZm5zLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICB9XG4gIH1cbiAgaW52b2tlci5mbnMgPSBmbnM7XG4gIHJldHVybiBpbnZva2VyXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3RlbmVycyAoXG4gIG9uLFxuICBvbGRPbixcbiAgYWRkLFxuICByZW1vdmUkJDEsXG4gIHZtXG4pIHtcbiAgdmFyIG5hbWUsIGN1ciwgb2xkLCBldmVudDtcbiAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgY3VyID0gb25bbmFtZV07XG4gICAgb2xkID0gb2xkT25bbmFtZV07XG4gICAgZXZlbnQgPSBub3JtYWxpemVFdmVudChuYW1lKTtcbiAgICBpZiAoaXNVbmRlZihjdXIpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiSW52YWxpZCBoYW5kbGVyIGZvciBldmVudCBcXFwiXCIgKyAoZXZlbnQubmFtZSkgKyBcIlxcXCI6IGdvdCBcIiArIFN0cmluZyhjdXIpLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkKSkge1xuICAgICAgaWYgKGlzVW5kZWYoY3VyLmZucykpIHtcbiAgICAgICAgY3VyID0gb25bbmFtZV0gPSBjcmVhdGVGbkludm9rZXIoY3VyKTtcbiAgICAgIH1cbiAgICAgIGFkZChldmVudC5uYW1lLCBjdXIsIGV2ZW50Lm9uY2UsIGV2ZW50LmNhcHR1cmUsIGV2ZW50LnBhc3NpdmUpO1xuICAgIH0gZWxzZSBpZiAoY3VyICE9PSBvbGQpIHtcbiAgICAgIG9sZC5mbnMgPSBjdXI7XG4gICAgICBvbltuYW1lXSA9IG9sZDtcbiAgICB9XG4gIH1cbiAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgaWYgKGlzVW5kZWYob25bbmFtZV0pKSB7XG4gICAgICBldmVudCA9IG5vcm1hbGl6ZUV2ZW50KG5hbWUpO1xuICAgICAgcmVtb3ZlJCQxKGV2ZW50Lm5hbWUsIG9sZE9uW25hbWVdLCBldmVudC5jYXB0dXJlKTtcbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIG1lcmdlVk5vZGVIb29rIChkZWYsIGhvb2tLZXksIGhvb2spIHtcbiAgaWYgKGRlZiBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgZGVmID0gZGVmLmRhdGEuaG9vayB8fCAoZGVmLmRhdGEuaG9vayA9IHt9KTtcbiAgfVxuICB2YXIgaW52b2tlcjtcbiAgdmFyIG9sZEhvb2sgPSBkZWZbaG9va0tleV07XG5cbiAgZnVuY3Rpb24gd3JhcHBlZEhvb2sgKCkge1xuICAgIGhvb2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAvLyBpbXBvcnRhbnQ6IHJlbW92ZSBtZXJnZWQgaG9vayB0byBlbnN1cmUgaXQncyBjYWxsZWQgb25seSBvbmNlXG4gICAgLy8gYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICByZW1vdmUoaW52b2tlci5mbnMsIHdyYXBwZWRIb29rKTtcbiAgfVxuXG4gIGlmIChpc1VuZGVmKG9sZEhvb2spKSB7XG4gICAgLy8gbm8gZXhpc3RpbmcgaG9va1xuICAgIGludm9rZXIgPSBjcmVhdGVGbkludm9rZXIoW3dyYXBwZWRIb29rXSk7XG4gIH0gZWxzZSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGlzRGVmKG9sZEhvb2suZm5zKSAmJiBpc1RydWUob2xkSG9vay5tZXJnZWQpKSB7XG4gICAgICAvLyBhbHJlYWR5IGEgbWVyZ2VkIGludm9rZXJcbiAgICAgIGludm9rZXIgPSBvbGRIb29rO1xuICAgICAgaW52b2tlci5mbnMucHVzaCh3cmFwcGVkSG9vayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGV4aXN0aW5nIHBsYWluIGhvb2tcbiAgICAgIGludm9rZXIgPSBjcmVhdGVGbkludm9rZXIoW29sZEhvb2ssIHdyYXBwZWRIb29rXSk7XG4gICAgfVxuICB9XG5cbiAgaW52b2tlci5tZXJnZWQgPSB0cnVlO1xuICBkZWZbaG9va0tleV0gPSBpbnZva2VyO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZXh0cmFjdFByb3BzRnJvbVZOb2RlRGF0YSAoXG4gIGRhdGEsXG4gIEN0b3IsXG4gIHRhZ1xuKSB7XG4gIC8vIHdlIGFyZSBvbmx5IGV4dHJhY3RpbmcgcmF3IHZhbHVlcyBoZXJlLlxuICAvLyB2YWxpZGF0aW9uIGFuZCBkZWZhdWx0IHZhbHVlcyBhcmUgaGFuZGxlZCBpbiB0aGUgY2hpbGRcbiAgLy8gY29tcG9uZW50IGl0c2VsZi5cbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLnByb3BzO1xuICBpZiAoaXNVbmRlZihwcm9wT3B0aW9ucykpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgcmVzID0ge307XG4gIHZhciBhdHRycyA9IGRhdGEuYXR0cnM7XG4gIHZhciBwcm9wcyA9IGRhdGEucHJvcHM7XG4gIGlmIChpc0RlZihhdHRycykgfHwgaXNEZWYocHJvcHMpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XG4gICAgICB2YXIgYWx0S2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB2YXIga2V5SW5Mb3dlckNhc2UgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGtleSAhPT0ga2V5SW5Mb3dlckNhc2UgJiZcbiAgICAgICAgICBhdHRycyAmJiBoYXNPd24oYXR0cnMsIGtleUluTG93ZXJDYXNlKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aXAoXG4gICAgICAgICAgICBcIlByb3AgXFxcIlwiICsga2V5SW5Mb3dlckNhc2UgKyBcIlxcXCIgaXMgcGFzc2VkIHRvIGNvbXBvbmVudCBcIiArXG4gICAgICAgICAgICAoZm9ybWF0Q29tcG9uZW50TmFtZSh0YWcgfHwgQ3RvcikpICsgXCIsIGJ1dCB0aGUgZGVjbGFyZWQgcHJvcCBuYW1lIGlzXCIgK1xuICAgICAgICAgICAgXCIgXFxcIlwiICsga2V5ICsgXCJcXFwiLiBcIiArXG4gICAgICAgICAgICBcIk5vdGUgdGhhdCBIVE1MIGF0dHJpYnV0ZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmUgYW5kIGNhbWVsQ2FzZWQgXCIgK1xuICAgICAgICAgICAgXCJwcm9wcyBuZWVkIHRvIHVzZSB0aGVpciBrZWJhYi1jYXNlIGVxdWl2YWxlbnRzIHdoZW4gdXNpbmcgaW4tRE9NIFwiICtcbiAgICAgICAgICAgIFwidGVtcGxhdGVzLiBZb3Ugc2hvdWxkIHByb2JhYmx5IHVzZSBcXFwiXCIgKyBhbHRLZXkgKyBcIlxcXCIgaW5zdGVhZCBvZiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGVja1Byb3AocmVzLCBwcm9wcywga2V5LCBhbHRLZXksIHRydWUpIHx8XG4gICAgICBjaGVja1Byb3AocmVzLCBhdHRycywga2V5LCBhbHRLZXksIGZhbHNlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBjaGVja1Byb3AgKFxuICByZXMsXG4gIGhhc2gsXG4gIGtleSxcbiAgYWx0S2V5LFxuICBwcmVzZXJ2ZVxuKSB7XG4gIGlmIChpc0RlZihoYXNoKSkge1xuICAgIGlmIChoYXNPd24oaGFzaCwga2V5KSkge1xuICAgICAgcmVzW2tleV0gPSBoYXNoW2tleV07XG4gICAgICBpZiAoIXByZXNlcnZlKSB7XG4gICAgICAgIGRlbGV0ZSBoYXNoW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAoaGFzT3duKGhhc2gsIGFsdEtleSkpIHtcbiAgICAgIHJlc1trZXldID0gaGFzaFthbHRLZXldO1xuICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xuICAgICAgICBkZWxldGUgaGFzaFthbHRLZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qICAqL1xuXG4vLyBUaGUgdGVtcGxhdGUgY29tcGlsZXIgYXR0ZW1wdHMgdG8gbWluaW1pemUgdGhlIG5lZWQgZm9yIG5vcm1hbGl6YXRpb24gYnlcbi8vIHN0YXRpY2FsbHkgYW5hbHl6aW5nIHRoZSB0ZW1wbGF0ZSBhdCBjb21waWxlIHRpbWUuXG4vL1xuLy8gRm9yIHBsYWluIEhUTUwgbWFya3VwLCBub3JtYWxpemF0aW9uIGNhbiBiZSBjb21wbGV0ZWx5IHNraXBwZWQgYmVjYXVzZSB0aGVcbi8vIGdlbmVyYXRlZCByZW5kZXIgZnVuY3Rpb24gaXMgZ3VhcmFudGVlZCB0byByZXR1cm4gQXJyYXk8Vk5vZGU+LiBUaGVyZSBhcmVcbi8vIHR3byBjYXNlcyB3aGVyZSBleHRyYSBub3JtYWxpemF0aW9uIGlzIG5lZWRlZDpcblxuLy8gMS4gV2hlbiB0aGUgY2hpbGRyZW4gY29udGFpbnMgY29tcG9uZW50cyAtIGJlY2F1c2UgYSBmdW5jdGlvbmFsIGNvbXBvbmVudFxuLy8gbWF5IHJldHVybiBhbiBBcnJheSBpbnN0ZWFkIG9mIGEgc2luZ2xlIHJvb3QuIEluIHRoaXMgY2FzZSwganVzdCBhIHNpbXBsZVxuLy8gbm9ybWFsaXphdGlvbiBpcyBuZWVkZWQgLSBpZiBhbnkgY2hpbGQgaXMgYW4gQXJyYXksIHdlIGZsYXR0ZW4gdGhlIHdob2xlXG4vLyB0aGluZyB3aXRoIEFycmF5LnByb3RvdHlwZS5jb25jYXQuIEl0IGlzIGd1YXJhbnRlZWQgdG8gYmUgb25seSAxLWxldmVsIGRlZXBcbi8vIGJlY2F1c2UgZnVuY3Rpb25hbCBjb21wb25lbnRzIGFscmVhZHkgbm9ybWFsaXplIHRoZWlyIG93biBjaGlsZHJlbi5cbmZ1bmN0aW9uIHNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW5baV0pKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pXG4gICAgfVxuICB9XG4gIHJldHVybiBjaGlsZHJlblxufVxuXG4vLyAyLiBXaGVuIHRoZSBjaGlsZHJlbiBjb250YWlucyBjb25zdHJ1Y3RzIHRoYXQgYWx3YXlzIGdlbmVyYXRlZCBuZXN0ZWQgQXJyYXlzLFxuLy8gZS5nLiA8dGVtcGxhdGU+LCA8c2xvdD4sIHYtZm9yLCBvciB3aGVuIHRoZSBjaGlsZHJlbiBpcyBwcm92aWRlZCBieSB1c2VyXG4vLyB3aXRoIGhhbmQtd3JpdHRlbiByZW5kZXIgZnVuY3Rpb25zIC8gSlNYLiBJbiBzdWNoIGNhc2VzIGEgZnVsbCBub3JtYWxpemF0aW9uXG4vLyBpcyBuZWVkZWQgdG8gY2F0ZXIgdG8gYWxsIHBvc3NpYmxlIHR5cGVzIG9mIGNoaWxkcmVuIHZhbHVlcy5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICByZXR1cm4gaXNQcmltaXRpdmUoY2hpbGRyZW4pXG4gICAgPyBbY3JlYXRlVGV4dFZOb2RlKGNoaWxkcmVuKV1cbiAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pXG4gICAgICA/IG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4oY2hpbGRyZW4pXG4gICAgICA6IHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBpc1RleHROb2RlIChub2RlKSB7XG4gIHJldHVybiBpc0RlZihub2RlKSAmJiBpc0RlZihub2RlLnRleHQpICYmIGlzRmFsc2Uobm9kZS5pc0NvbW1lbnQpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4gKGNoaWxkcmVuLCBuZXN0ZWRJbmRleCkge1xuICB2YXIgcmVzID0gW107XG4gIHZhciBpLCBjLCBsYXN0SW5kZXgsIGxhc3Q7XG4gIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBjaGlsZHJlbltpXTtcbiAgICBpZiAoaXNVbmRlZihjKSB8fCB0eXBlb2YgYyA9PT0gJ2Jvb2xlYW4nKSB7IGNvbnRpbnVlIH1cbiAgICBsYXN0SW5kZXggPSByZXMubGVuZ3RoIC0gMTtcbiAgICBsYXN0ID0gcmVzW2xhc3RJbmRleF07XG4gICAgLy8gIG5lc3RlZFxuICAgIGlmIChBcnJheS5pc0FycmF5KGMpKSB7XG4gICAgICBpZiAoYy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGMgPSBub3JtYWxpemVBcnJheUNoaWxkcmVuKGMsICgobmVzdGVkSW5kZXggfHwgJycpICsgXCJfXCIgKyBpKSk7XG4gICAgICAgIC8vIG1lcmdlIGFkamFjZW50IHRleHQgbm9kZXNcbiAgICAgICAgaWYgKGlzVGV4dE5vZGUoY1swXSkgJiYgaXNUZXh0Tm9kZShsYXN0KSkge1xuICAgICAgICAgIHJlc1tsYXN0SW5kZXhdID0gY3JlYXRlVGV4dFZOb2RlKGxhc3QudGV4dCArIChjWzBdKS50ZXh0KTtcbiAgICAgICAgICBjLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2guYXBwbHkocmVzLCBjKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzUHJpbWl0aXZlKGMpKSB7XG4gICAgICBpZiAoaXNUZXh0Tm9kZShsYXN0KSkge1xuICAgICAgICAvLyBtZXJnZSBhZGphY2VudCB0ZXh0IG5vZGVzXG4gICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciBTU1IgaHlkcmF0aW9uIGJlY2F1c2UgdGV4dCBub2RlcyBhcmVcbiAgICAgICAgLy8gZXNzZW50aWFsbHkgbWVyZ2VkIHdoZW4gcmVuZGVyZWQgdG8gSFRNTCBzdHJpbmdzXG4gICAgICAgIHJlc1tsYXN0SW5kZXhdID0gY3JlYXRlVGV4dFZOb2RlKGxhc3QudGV4dCArIGMpO1xuICAgICAgfSBlbHNlIGlmIChjICE9PSAnJykge1xuICAgICAgICAvLyBjb252ZXJ0IHByaW1pdGl2ZSB0byB2bm9kZVxuICAgICAgICByZXMucHVzaChjcmVhdGVUZXh0Vk5vZGUoYykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNUZXh0Tm9kZShjKSAmJiBpc1RleHROb2RlKGxhc3QpKSB7XG4gICAgICAgIC8vIG1lcmdlIGFkamFjZW50IHRleHQgbm9kZXNcbiAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgYy50ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlZmF1bHQga2V5IGZvciBuZXN0ZWQgYXJyYXkgY2hpbGRyZW4gKGxpa2VseSBnZW5lcmF0ZWQgYnkgdi1mb3IpXG4gICAgICAgIGlmIChpc1RydWUoY2hpbGRyZW4uX2lzVkxpc3QpICYmXG4gICAgICAgICAgaXNEZWYoYy50YWcpICYmXG4gICAgICAgICAgaXNVbmRlZihjLmtleSkgJiZcbiAgICAgICAgICBpc0RlZihuZXN0ZWRJbmRleCkpIHtcbiAgICAgICAgICBjLmtleSA9IFwiX192bGlzdFwiICsgbmVzdGVkSW5kZXggKyBcIl9cIiArIGkgKyBcIl9fXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2goYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGVuc3VyZUN0b3IgKGNvbXAsIGJhc2UpIHtcbiAgaWYgKFxuICAgIGNvbXAuX19lc01vZHVsZSB8fFxuICAgIChoYXNTeW1ib2wgJiYgY29tcFtTeW1ib2wudG9TdHJpbmdUYWddID09PSAnTW9kdWxlJylcbiAgKSB7XG4gICAgY29tcCA9IGNvbXAuZGVmYXVsdDtcbiAgfVxuICByZXR1cm4gaXNPYmplY3QoY29tcClcbiAgICA/IGJhc2UuZXh0ZW5kKGNvbXApXG4gICAgOiBjb21wXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFzeW5jUGxhY2Vob2xkZXIgKFxuICBmYWN0b3J5LFxuICBkYXRhLFxuICBjb250ZXh0LFxuICBjaGlsZHJlbixcbiAgdGFnXG4pIHtcbiAgdmFyIG5vZGUgPSBjcmVhdGVFbXB0eVZOb2RlKCk7XG4gIG5vZGUuYXN5bmNGYWN0b3J5ID0gZmFjdG9yeTtcbiAgbm9kZS5hc3luY01ldGEgPSB7IGRhdGE6IGRhdGEsIGNvbnRleHQ6IGNvbnRleHQsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGFnOiB0YWcgfTtcbiAgcmV0dXJuIG5vZGVcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUFzeW5jQ29tcG9uZW50IChcbiAgZmFjdG9yeSxcbiAgYmFzZUN0b3IsXG4gIGNvbnRleHRcbikge1xuICBpZiAoaXNUcnVlKGZhY3RvcnkuZXJyb3IpICYmIGlzRGVmKGZhY3RvcnkuZXJyb3JDb21wKSkge1xuICAgIHJldHVybiBmYWN0b3J5LmVycm9yQ29tcFxuICB9XG5cbiAgaWYgKGlzRGVmKGZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkucmVzb2x2ZWRcbiAgfVxuXG4gIGlmIChpc1RydWUoZmFjdG9yeS5sb2FkaW5nKSAmJiBpc0RlZihmYWN0b3J5LmxvYWRpbmdDb21wKSkge1xuICAgIHJldHVybiBmYWN0b3J5LmxvYWRpbmdDb21wXG4gIH1cblxuICBpZiAoaXNEZWYoZmFjdG9yeS5jb250ZXh0cykpIHtcbiAgICAvLyBhbHJlYWR5IHBlbmRpbmdcbiAgICBmYWN0b3J5LmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNvbnRleHRzID0gZmFjdG9yeS5jb250ZXh0cyA9IFtjb250ZXh0XTtcbiAgICB2YXIgc3luYyA9IHRydWU7XG5cbiAgICB2YXIgZm9yY2VSZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNvbnRleHRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb250ZXh0c1tpXS4kZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJlc29sdmUgPSBvbmNlKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vIGNhY2hlIHJlc29sdmVkXG4gICAgICBmYWN0b3J5LnJlc29sdmVkID0gZW5zdXJlQ3RvcihyZXMsIGJhc2VDdG9yKTtcbiAgICAgIC8vIGludm9rZSBjYWxsYmFja3Mgb25seSBpZiB0aGlzIGlzIG5vdCBhIHN5bmNocm9ub3VzIHJlc29sdmVcbiAgICAgIC8vIChhc3luYyByZXNvbHZlcyBhcmUgc2hpbW1lZCBhcyBzeW5jaHJvbm91cyBkdXJpbmcgU1NSKVxuICAgICAgaWYgKCFzeW5jKSB7XG4gICAgICAgIGZvcmNlUmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgcmVqZWN0ID0gb25jZShmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiRmFpbGVkIHRvIHJlc29sdmUgYXN5bmMgY29tcG9uZW50OiBcIiArIChTdHJpbmcoZmFjdG9yeSkpICtcbiAgICAgICAgKHJlYXNvbiA/IChcIlxcblJlYXNvbjogXCIgKyByZWFzb24pIDogJycpXG4gICAgICApO1xuICAgICAgaWYgKGlzRGVmKGZhY3RvcnkuZXJyb3JDb21wKSkge1xuICAgICAgICBmYWN0b3J5LmVycm9yID0gdHJ1ZTtcbiAgICAgICAgZm9yY2VSZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciByZXMgPSBmYWN0b3J5KHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICBpZiAoaXNPYmplY3QocmVzKSkge1xuICAgICAgaWYgKHR5cGVvZiByZXMudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyAoKSA9PiBQcm9taXNlXG4gICAgICAgIGlmIChpc1VuZGVmKGZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgICAgICAgcmVzLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0RlZihyZXMuY29tcG9uZW50KSAmJiB0eXBlb2YgcmVzLmNvbXBvbmVudC50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlcy5jb21wb25lbnQudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIGlmIChpc0RlZihyZXMuZXJyb3IpKSB7XG4gICAgICAgICAgZmFjdG9yeS5lcnJvckNvbXAgPSBlbnN1cmVDdG9yKHJlcy5lcnJvciwgYmFzZUN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy5sb2FkaW5nKSkge1xuICAgICAgICAgIGZhY3RvcnkubG9hZGluZ0NvbXAgPSBlbnN1cmVDdG9yKHJlcy5sb2FkaW5nLCBiYXNlQ3Rvcik7XG4gICAgICAgICAgaWYgKHJlcy5kZWxheSA9PT0gMCkge1xuICAgICAgICAgICAgZmFjdG9yeS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmIChpc1VuZGVmKGZhY3RvcnkucmVzb2x2ZWQpICYmIGlzVW5kZWYoZmFjdG9yeS5lcnJvcikpIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvcmNlUmVuZGVyKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlcy5kZWxheSB8fCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZihyZXMudGltZW91dCkpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKGZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG4gICAgICAgICAgICAgICAgICA/IChcInRpbWVvdXQgKFwiICsgKHJlcy50aW1lb3V0KSArIFwibXMpXCIpXG4gICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCByZXMudGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzeW5jID0gZmFsc2U7XG4gICAgLy8gcmV0dXJuIGluIGNhc2UgcmVzb2x2ZWQgc3luY2hyb25vdXNseVxuICAgIHJldHVybiBmYWN0b3J5LmxvYWRpbmdcbiAgICAgID8gZmFjdG9yeS5sb2FkaW5nQ29tcFxuICAgICAgOiBmYWN0b3J5LnJlc29sdmVkXG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGlzQXN5bmNQbGFjZWhvbGRlciAobm9kZSkge1xuICByZXR1cm4gbm9kZS5pc0NvbW1lbnQgJiYgbm9kZS5hc3luY0ZhY3Rvcnlcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGdldEZpcnN0Q29tcG9uZW50Q2hpbGQgKGNoaWxkcmVuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2hpbGRyZW5baV07XG4gICAgICBpZiAoaXNEZWYoYykgJiYgKGlzRGVmKGMuY29tcG9uZW50T3B0aW9ucykgfHwgaXNBc3luY1BsYWNlaG9sZGVyKGMpKSkge1xuICAgICAgICByZXR1cm4gY1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRFdmVudHMgKHZtKSB7XG4gIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2bS5faGFzSG9va0V2ZW50ID0gZmFsc2U7XG4gIC8vIGluaXQgcGFyZW50IGF0dGFjaGVkIGV2ZW50c1xuICB2YXIgbGlzdGVuZXJzID0gdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgaWYgKGxpc3RlbmVycykge1xuICAgIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyh2bSwgbGlzdGVuZXJzKTtcbiAgfVxufVxuXG52YXIgdGFyZ2V0O1xuXG5mdW5jdGlvbiBhZGQgKGV2ZW50LCBmbiwgb25jZSkge1xuICBpZiAob25jZSkge1xuICAgIHRhcmdldC4kb25jZShldmVudCwgZm4pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC4kb24oZXZlbnQsIGZuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUkMSAoZXZlbnQsIGZuKSB7XG4gIHRhcmdldC4kb2ZmKGV2ZW50LCBmbik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyAoXG4gIHZtLFxuICBsaXN0ZW5lcnMsXG4gIG9sZExpc3RlbmVyc1xuKSB7XG4gIHRhcmdldCA9IHZtO1xuICB1cGRhdGVMaXN0ZW5lcnMobGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMgfHwge30sIGFkZCwgcmVtb3ZlJDEsIHZtKTtcbiAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBldmVudHNNaXhpbiAoVnVlKSB7XG4gIHZhciBob29rUkUgPSAvXmhvb2s6LztcbiAgVnVlLnByb3RvdHlwZS4kb24gPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcyQxLiRvbihldmVudFtpXSwgZm4pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAodm0uX2V2ZW50c1tldmVudF0gfHwgKHZtLl9ldmVudHNbZXZlbnRdID0gW10pKS5wdXNoKGZuKTtcbiAgICAgIC8vIG9wdGltaXplIGhvb2s6ZXZlbnQgY29zdCBieSB1c2luZyBhIGJvb2xlYW4gZmxhZyBtYXJrZWQgYXQgcmVnaXN0cmF0aW9uXG4gICAgICAvLyBpbnN0ZWFkIG9mIGEgaGFzaCBsb29rdXBcbiAgICAgIGlmIChob29rUkUudGVzdChldmVudCkpIHtcbiAgICAgICAgdm0uX2hhc0hvb2tFdmVudCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJG9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBmdW5jdGlvbiBvbiAoKSB7XG4gICAgICB2bS4kb2ZmKGV2ZW50LCBvbik7XG4gICAgICBmbi5hcHBseSh2bSwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgb24uZm4gPSBmbjtcbiAgICB2bS4kb24oZXZlbnQsIG9uKTtcbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRvZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIC8vIGFsbFxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdm0uX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgLy8gYXJyYXkgb2YgZXZlbnRzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGV2ZW50Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzJDEuJG9mZihldmVudFtpXSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgdmFyIGNicyA9IHZtLl9ldmVudHNbZXZlbnRdO1xuICAgIGlmICghY2JzKSB7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgaWYgKCFmbikge1xuICAgICAgdm0uX2V2ZW50c1tldmVudF0gPSBudWxsO1xuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIGlmIChmbikge1xuICAgICAgLy8gc3BlY2lmaWMgaGFuZGxlclxuICAgICAgdmFyIGNiO1xuICAgICAgdmFyIGkkMSA9IGNicy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaSQxLS0pIHtcbiAgICAgICAgY2IgPSBjYnNbaSQxXTtcbiAgICAgICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcbiAgICAgICAgICBjYnMuc3BsaWNlKGkkMSwgMSk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIGxvd2VyQ2FzZUV2ZW50ID0gZXZlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChsb3dlckNhc2VFdmVudCAhPT0gZXZlbnQgJiYgdm0uX2V2ZW50c1tsb3dlckNhc2VFdmVudF0pIHtcbiAgICAgICAgdGlwKFxuICAgICAgICAgIFwiRXZlbnQgXFxcIlwiICsgbG93ZXJDYXNlRXZlbnQgKyBcIlxcXCIgaXMgZW1pdHRlZCBpbiBjb21wb25lbnQgXCIgK1xuICAgICAgICAgIChmb3JtYXRDb21wb25lbnROYW1lKHZtKSkgKyBcIiBidXQgdGhlIGhhbmRsZXIgaXMgcmVnaXN0ZXJlZCBmb3IgXFxcIlwiICsgZXZlbnQgKyBcIlxcXCIuIFwiICtcbiAgICAgICAgICBcIk5vdGUgdGhhdCBIVE1MIGF0dHJpYnV0ZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmUgYW5kIHlvdSBjYW5ub3QgdXNlIFwiICtcbiAgICAgICAgICBcInYtb24gdG8gbGlzdGVuIHRvIGNhbWVsQ2FzZSBldmVudHMgd2hlbiB1c2luZyBpbi1ET00gdGVtcGxhdGVzLiBcIiArXG4gICAgICAgICAgXCJZb3Ugc2hvdWxkIHByb2JhYmx5IHVzZSBcXFwiXCIgKyAoaHlwaGVuYXRlKGV2ZW50KSkgKyBcIlxcXCIgaW5zdGVhZCBvZiBcXFwiXCIgKyBldmVudCArIFwiXFxcIi5cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2JzID0gdm0uX2V2ZW50c1tldmVudF07XG4gICAgaWYgKGNicykge1xuICAgICAgY2JzID0gY2JzLmxlbmd0aCA+IDEgPyB0b0FycmF5KGNicykgOiBjYnM7XG4gICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNic1tpXS5hcHBseSh2bSwgYXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBoYW5kbGVFcnJvcihlLCB2bSwgKFwiZXZlbnQgaGFuZGxlciBmb3IgXFxcIlwiICsgZXZlbnQgKyBcIlxcXCJcIikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIHJhdyBjaGlsZHJlbiBWTm9kZXMgaW50byBhIHNsb3Qgb2JqZWN0LlxuICovXG5mdW5jdGlvbiByZXNvbHZlU2xvdHMgKFxuICBjaGlsZHJlbixcbiAgY29udGV4dFxuKSB7XG4gIHZhciBzbG90cyA9IHt9O1xuICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHNsb3RzXG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICB2YXIgZGF0YSA9IGNoaWxkLmRhdGE7XG4gICAgLy8gcmVtb3ZlIHNsb3QgYXR0cmlidXRlIGlmIHRoZSBub2RlIGlzIHJlc29sdmVkIGFzIGEgVnVlIHNsb3Qgbm9kZVxuICAgIGlmIChkYXRhICYmIGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy5zbG90KSB7XG4gICAgICBkZWxldGUgZGF0YS5hdHRycy5zbG90O1xuICAgIH1cbiAgICAvLyBuYW1lZCBzbG90cyBzaG91bGQgb25seSBiZSByZXNwZWN0ZWQgaWYgdGhlIHZub2RlIHdhcyByZW5kZXJlZCBpbiB0aGVcbiAgICAvLyBzYW1lIGNvbnRleHQuXG4gICAgaWYgKChjaGlsZC5jb250ZXh0ID09PSBjb250ZXh0IHx8IGNoaWxkLmZuQ29udGV4dCA9PT0gY29udGV4dCkgJiZcbiAgICAgIGRhdGEgJiYgZGF0YS5zbG90ICE9IG51bGxcbiAgICApIHtcbiAgICAgIHZhciBuYW1lID0gY2hpbGQuZGF0YS5zbG90O1xuICAgICAgdmFyIHNsb3QgPSAoc2xvdHNbbmFtZV0gfHwgKHNsb3RzW25hbWVdID0gW10pKTtcbiAgICAgIGlmIChjaGlsZC50YWcgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgc2xvdC5wdXNoLmFwcGx5KHNsb3QsIGNoaWxkLmNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsb3QucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIChzbG90cy5kZWZhdWx0IHx8IChzbG90cy5kZWZhdWx0ID0gW10pKS5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cbiAgLy8gaWdub3JlIHNsb3RzIHRoYXQgY29udGFpbnMgb25seSB3aGl0ZXNwYWNlXG4gIGZvciAodmFyIG5hbWUkMSBpbiBzbG90cykge1xuICAgIGlmIChzbG90c1tuYW1lJDFdLmV2ZXJ5KGlzV2hpdGVzcGFjZSkpIHtcbiAgICAgIGRlbGV0ZSBzbG90c1tuYW1lJDFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2xvdHNcbn1cblxuZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChub2RlKSB7XG4gIHJldHVybiAobm9kZS5pc0NvbW1lbnQgJiYgIW5vZGUuYXN5bmNGYWN0b3J5KSB8fCBub2RlLnRleHQgPT09ICcgJ1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU2NvcGVkU2xvdHMgKFxuICBmbnMsIC8vIHNlZSBmbG93L3Zub2RlXG4gIHJlc1xuKSB7XG4gIHJlcyA9IHJlcyB8fCB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmbnNbaV0pKSB7XG4gICAgICByZXNvbHZlU2NvcGVkU2xvdHMoZm5zW2ldLCByZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNbZm5zW2ldLmtleV0gPSBmbnNbaV0uZm47XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbnZhciBhY3RpdmVJbnN0YW5jZSA9IG51bGw7XG52YXIgaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGluaXRMaWZlY3ljbGUgKHZtKSB7XG4gIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG5cbiAgLy8gbG9jYXRlIGZpcnN0IG5vbi1hYnN0cmFjdCBwYXJlbnRcbiAgdmFyIHBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICBpZiAocGFyZW50ICYmICFvcHRpb25zLmFic3RyYWN0KSB7XG4gICAgd2hpbGUgKHBhcmVudC4kb3B0aW9ucy5hYnN0cmFjdCAmJiBwYXJlbnQuJHBhcmVudCkge1xuICAgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnQ7XG4gICAgfVxuICAgIHBhcmVudC4kY2hpbGRyZW4ucHVzaCh2bSk7XG4gIH1cblxuICB2bS4kcGFyZW50ID0gcGFyZW50O1xuICB2bS4kcm9vdCA9IHBhcmVudCA/IHBhcmVudC4kcm9vdCA6IHZtO1xuXG4gIHZtLiRjaGlsZHJlbiA9IFtdO1xuICB2bS4kcmVmcyA9IHt9O1xuXG4gIHZtLl93YXRjaGVyID0gbnVsbDtcbiAgdm0uX2luYWN0aXZlID0gbnVsbDtcbiAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gIHZtLl9pc01vdW50ZWQgPSBmYWxzZTtcbiAgdm0uX2lzRGVzdHJveWVkID0gZmFsc2U7XG4gIHZtLl9pc0JlaW5nRGVzdHJveWVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxpZmVjeWNsZU1peGluIChWdWUpIHtcbiAgVnVlLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gKHZub2RlLCBoeWRyYXRpbmcpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmICh2bS5faXNNb3VudGVkKSB7XG4gICAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZVVwZGF0ZScpO1xuICAgIH1cbiAgICB2YXIgcHJldkVsID0gdm0uJGVsO1xuICAgIHZhciBwcmV2Vm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgdmFyIHByZXZBY3RpdmVJbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlO1xuICAgIGFjdGl2ZUluc3RhbmNlID0gdm07XG4gICAgdm0uX3Zub2RlID0gdm5vZGU7XG4gICAgLy8gVnVlLnByb3RvdHlwZS5fX3BhdGNoX18gaXMgaW5qZWN0ZWQgaW4gZW50cnkgcG9pbnRzXG4gICAgLy8gYmFzZWQgb24gdGhlIHJlbmRlcmluZyBiYWNrZW5kIHVzZWQuXG4gICAgaWYgKCFwcmV2Vm5vZGUpIHtcbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18oXG4gICAgICAgIHZtLiRlbCwgdm5vZGUsIGh5ZHJhdGluZywgZmFsc2UgLyogcmVtb3ZlT25seSAqLyxcbiAgICAgICAgdm0uJG9wdGlvbnMuX3BhcmVudEVsbSxcbiAgICAgICAgdm0uJG9wdGlvbnMuX3JlZkVsbVxuICAgICAgKTtcbiAgICAgIC8vIG5vIG5lZWQgZm9yIHRoZSByZWYgbm9kZXMgYWZ0ZXIgaW5pdGlhbCBwYXRjaFxuICAgICAgLy8gdGhpcyBwcmV2ZW50cyBrZWVwaW5nIGEgZGV0YWNoZWQgRE9NIHRyZWUgaW4gbWVtb3J5ICgjNTg1MSlcbiAgICAgIHZtLiRvcHRpb25zLl9wYXJlbnRFbG0gPSB2bS4kb3B0aW9ucy5fcmVmRWxtID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdXBkYXRlc1xuICAgICAgdm0uJGVsID0gdm0uX19wYXRjaF9fKHByZXZWbm9kZSwgdm5vZGUpO1xuICAgIH1cbiAgICBhY3RpdmVJbnN0YW5jZSA9IHByZXZBY3RpdmVJbnN0YW5jZTtcbiAgICAvLyB1cGRhdGUgX192dWVfXyByZWZlcmVuY2VcbiAgICBpZiAocHJldkVsKSB7XG4gICAgICBwcmV2RWwuX192dWVfXyA9IG51bGw7XG4gICAgfVxuICAgIGlmICh2bS4kZWwpIHtcbiAgICAgIHZtLiRlbC5fX3Z1ZV9fID0gdm07XG4gICAgfVxuICAgIC8vIGlmIHBhcmVudCBpcyBhbiBIT0MsIHVwZGF0ZSBpdHMgJGVsIGFzIHdlbGxcbiAgICBpZiAodm0uJHZub2RlICYmIHZtLiRwYXJlbnQgJiYgdm0uJHZub2RlID09PSB2bS4kcGFyZW50Ll92bm9kZSkge1xuICAgICAgdm0uJHBhcmVudC4kZWwgPSB2bS4kZWw7XG4gICAgfVxuICAgIC8vIHVwZGF0ZWQgaG9vayBpcyBjYWxsZWQgYnkgdGhlIHNjaGVkdWxlciB0byBlbnN1cmUgdGhhdCBjaGlsZHJlbiBhcmVcbiAgICAvLyB1cGRhdGVkIGluIGEgcGFyZW50J3MgdXBkYXRlZCBob29rLlxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl93YXRjaGVyKSB7XG4gICAgICB2bS5fd2F0Y2hlci51cGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmICh2bS5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlRGVzdHJveScpO1xuICAgIHZtLl9pc0JlaW5nRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHBhcmVudFxuICAgIHZhciBwYXJlbnQgPSB2bS4kcGFyZW50O1xuICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNCZWluZ0Rlc3Ryb3llZCAmJiAhdm0uJG9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICAgIHJlbW92ZShwYXJlbnQuJGNoaWxkcmVuLCB2bSk7XG4gICAgfVxuICAgIC8vIHRlYXJkb3duIHdhdGNoZXJzXG4gICAgaWYgKHZtLl93YXRjaGVyKSB7XG4gICAgICB2bS5fd2F0Y2hlci50ZWFyZG93bigpO1xuICAgIH1cbiAgICB2YXIgaSA9IHZtLl93YXRjaGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdm0uX3dhdGNoZXJzW2ldLnRlYXJkb3duKCk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZWZlcmVuY2UgZnJvbSBkYXRhIG9iXG4gICAgLy8gZnJvemVuIG9iamVjdCBtYXkgbm90IGhhdmUgb2JzZXJ2ZXIuXG4gICAgaWYgKHZtLl9kYXRhLl9fb2JfXykge1xuICAgICAgdm0uX2RhdGEuX19vYl9fLnZtQ291bnQtLTtcbiAgICB9XG4gICAgLy8gY2FsbCB0aGUgbGFzdCBob29rLi4uXG4gICAgdm0uX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAvLyBpbnZva2UgZGVzdHJveSBob29rcyBvbiBjdXJyZW50IHJlbmRlcmVkIHRyZWVcbiAgICB2bS5fX3BhdGNoX18odm0uX3Zub2RlLCBudWxsKTtcbiAgICAvLyBmaXJlIGRlc3Ryb3llZCBob29rXG4gICAgY2FsbEhvb2sodm0sICdkZXN0cm95ZWQnKTtcbiAgICAvLyB0dXJuIG9mZiBhbGwgaW5zdGFuY2UgbGlzdGVuZXJzLlxuICAgIHZtLiRvZmYoKTtcbiAgICAvLyByZW1vdmUgX192dWVfXyByZWZlcmVuY2VcbiAgICBpZiAodm0uJGVsKSB7XG4gICAgICB2bS4kZWwuX192dWVfXyA9IG51bGw7XG4gICAgfVxuICAgIC8vIHJlbGVhc2UgY2lyY3VsYXIgcmVmZXJlbmNlICgjNjc1OSlcbiAgICBpZiAodm0uJHZub2RlKSB7XG4gICAgICB2bS4kdm5vZGUucGFyZW50ID0gbnVsbDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50IChcbiAgdm0sXG4gIGVsLFxuICBoeWRyYXRpbmdcbikge1xuICB2bS4kZWwgPSBlbDtcbiAgaWYgKCF2bS4kb3B0aW9ucy5yZW5kZXIpIHtcbiAgICB2bS4kb3B0aW9ucy5yZW5kZXIgPSBjcmVhdGVFbXB0eVZOb2RlO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICgodm0uJG9wdGlvbnMudGVtcGxhdGUgJiYgdm0uJG9wdGlvbnMudGVtcGxhdGUuY2hhckF0KDApICE9PSAnIycpIHx8XG4gICAgICAgIHZtLiRvcHRpb25zLmVsIHx8IGVsKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBhcmUgdXNpbmcgdGhlIHJ1bnRpbWUtb25seSBidWlsZCBvZiBWdWUgd2hlcmUgdGhlIHRlbXBsYXRlICcgK1xuICAgICAgICAgICdjb21waWxlciBpcyBub3QgYXZhaWxhYmxlLiBFaXRoZXIgcHJlLWNvbXBpbGUgdGhlIHRlbXBsYXRlcyBpbnRvICcgK1xuICAgICAgICAgICdyZW5kZXIgZnVuY3Rpb25zLCBvciB1c2UgdGhlIGNvbXBpbGVyLWluY2x1ZGVkIGJ1aWxkLicsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ0ZhaWxlZCB0byBtb3VudCBjb21wb25lbnQ6IHRlbXBsYXRlIG9yIHJlbmRlciBmdW5jdGlvbiBub3QgZGVmaW5lZC4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNhbGxIb29rKHZtLCAnYmVmb3JlTW91bnQnKTtcblxuICB2YXIgdXBkYXRlQ29tcG9uZW50O1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLnBlcmZvcm1hbmNlICYmIG1hcmspIHtcbiAgICB1cGRhdGVDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbmFtZSA9IHZtLl9uYW1lO1xuICAgICAgdmFyIGlkID0gdm0uX3VpZDtcbiAgICAgIHZhciBzdGFydFRhZyA9IFwidnVlLXBlcmYtc3RhcnQ6XCIgKyBpZDtcbiAgICAgIHZhciBlbmRUYWcgPSBcInZ1ZS1wZXJmLWVuZDpcIiArIGlkO1xuXG4gICAgICBtYXJrKHN0YXJ0VGFnKTtcbiAgICAgIHZhciB2bm9kZSA9IHZtLl9yZW5kZXIoKTtcbiAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgIG1lYXN1cmUoKFwidnVlIFwiICsgbmFtZSArIFwiIHJlbmRlclwiKSwgc3RhcnRUYWcsIGVuZFRhZyk7XG5cbiAgICAgIG1hcmsoc3RhcnRUYWcpO1xuICAgICAgdm0uX3VwZGF0ZSh2bm9kZSwgaHlkcmF0aW5nKTtcbiAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgIG1lYXN1cmUoKFwidnVlIFwiICsgbmFtZSArIFwiIHBhdGNoXCIpLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZtLl91cGRhdGUodm0uX3JlbmRlcigpLCBoeWRyYXRpbmcpO1xuICAgIH07XG4gIH1cblxuICAvLyB3ZSBzZXQgdGhpcyB0byB2bS5fd2F0Y2hlciBpbnNpZGUgdGhlIHdhdGNoZXIncyBjb25zdHJ1Y3RvclxuICAvLyBzaW5jZSB0aGUgd2F0Y2hlcidzIGluaXRpYWwgcGF0Y2ggbWF5IGNhbGwgJGZvcmNlVXBkYXRlIChlLmcuIGluc2lkZSBjaGlsZFxuICAvLyBjb21wb25lbnQncyBtb3VudGVkIGhvb2spLCB3aGljaCByZWxpZXMgb24gdm0uX3dhdGNoZXIgYmVpbmcgYWxyZWFkeSBkZWZpbmVkXG4gIG5ldyBXYXRjaGVyKHZtLCB1cGRhdGVDb21wb25lbnQsIG5vb3AsIG51bGwsIHRydWUgLyogaXNSZW5kZXJXYXRjaGVyICovKTtcbiAgaHlkcmF0aW5nID0gZmFsc2U7XG5cbiAgLy8gbWFudWFsbHkgbW91bnRlZCBpbnN0YW5jZSwgY2FsbCBtb3VudGVkIG9uIHNlbGZcbiAgLy8gbW91bnRlZCBpcyBjYWxsZWQgZm9yIHJlbmRlci1jcmVhdGVkIGNoaWxkIGNvbXBvbmVudHMgaW4gaXRzIGluc2VydGVkIGhvb2tcbiAgaWYgKHZtLiR2bm9kZSA9PSBudWxsKSB7XG4gICAgdm0uX2lzTW91bnRlZCA9IHRydWU7XG4gICAgY2FsbEhvb2sodm0sICdtb3VudGVkJyk7XG4gIH1cbiAgcmV0dXJuIHZtXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoaWxkQ29tcG9uZW50IChcbiAgdm0sXG4gIHByb3BzRGF0YSxcbiAgbGlzdGVuZXJzLFxuICBwYXJlbnRWbm9kZSxcbiAgcmVuZGVyQ2hpbGRyZW5cbikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCA9IHRydWU7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgd2hldGhlciBjb21wb25lbnQgaGFzIHNsb3QgY2hpbGRyZW5cbiAgLy8gd2UgbmVlZCB0byBkbyB0aGlzIGJlZm9yZSBvdmVyd3JpdGluZyAkb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW5cbiAgdmFyIGhhc0NoaWxkcmVuID0gISEoXG4gICAgcmVuZGVyQ2hpbGRyZW4gfHwgICAgICAgICAgICAgICAvLyBoYXMgbmV3IHN0YXRpYyBzbG90c1xuICAgIHZtLiRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiB8fCAgLy8gaGFzIG9sZCBzdGF0aWMgc2xvdHNcbiAgICBwYXJlbnRWbm9kZS5kYXRhLnNjb3BlZFNsb3RzIHx8IC8vIGhhcyBuZXcgc2NvcGVkIHNsb3RzXG4gICAgdm0uJHNjb3BlZFNsb3RzICE9PSBlbXB0eU9iamVjdCAvLyBoYXMgb2xkIHNjb3BlZCBzbG90c1xuICApO1xuXG4gIHZtLiRvcHRpb25zLl9wYXJlbnRWbm9kZSA9IHBhcmVudFZub2RlO1xuICB2bS4kdm5vZGUgPSBwYXJlbnRWbm9kZTsgLy8gdXBkYXRlIHZtJ3MgcGxhY2Vob2xkZXIgbm9kZSB3aXRob3V0IHJlLXJlbmRlclxuXG4gIGlmICh2bS5fdm5vZGUpIHsgLy8gdXBkYXRlIGNoaWxkIHRyZWUncyBwYXJlbnRcbiAgICB2bS5fdm5vZGUucGFyZW50ID0gcGFyZW50Vm5vZGU7XG4gIH1cbiAgdm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuID0gcmVuZGVyQ2hpbGRyZW47XG5cbiAgLy8gdXBkYXRlICRhdHRycyBhbmQgJGxpc3RlbmVycyBoYXNoXG4gIC8vIHRoZXNlIGFyZSBhbHNvIHJlYWN0aXZlIHNvIHRoZXkgbWF5IHRyaWdnZXIgY2hpbGQgdXBkYXRlIGlmIHRoZSBjaGlsZFxuICAvLyB1c2VkIHRoZW0gZHVyaW5nIHJlbmRlclxuICB2bS4kYXR0cnMgPSAocGFyZW50Vm5vZGUuZGF0YSAmJiBwYXJlbnRWbm9kZS5kYXRhLmF0dHJzKSB8fCBlbXB0eU9iamVjdDtcbiAgdm0uJGxpc3RlbmVycyA9IGxpc3RlbmVycyB8fCBlbXB0eU9iamVjdDtcblxuICAvLyB1cGRhdGUgcHJvcHNcbiAgaWYgKHByb3BzRGF0YSAmJiB2bS4kb3B0aW9ucy5wcm9wcykge1xuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IGZhbHNlO1xuICAgIHZhciBwcm9wcyA9IHZtLl9wcm9wcztcbiAgICB2YXIgcHJvcEtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IHByb3BLZXlzW2ldO1xuICAgICAgcHJvcHNba2V5XSA9IHZhbGlkYXRlUHJvcChrZXksIHZtLiRvcHRpb25zLnByb3BzLCBwcm9wc0RhdGEsIHZtKTtcbiAgICB9XG4gICAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ID0gdHJ1ZTtcbiAgICAvLyBrZWVwIGEgY29weSBvZiByYXcgcHJvcHNEYXRhXG4gICAgdm0uJG9wdGlvbnMucHJvcHNEYXRhID0gcHJvcHNEYXRhO1xuICB9XG5cbiAgLy8gdXBkYXRlIGxpc3RlbmVyc1xuICBpZiAobGlzdGVuZXJzKSB7XG4gICAgdmFyIG9sZExpc3RlbmVycyA9IHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XG4gICAgdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgICB1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnModm0sIGxpc3RlbmVycywgb2xkTGlzdGVuZXJzKTtcbiAgfVxuICAvLyByZXNvbHZlIHNsb3RzICsgZm9yY2UgdXBkYXRlIGlmIGhhcyBjaGlsZHJlblxuICBpZiAoaGFzQ2hpbGRyZW4pIHtcbiAgICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMocmVuZGVyQ2hpbGRyZW4sIHBhcmVudFZub2RlLmNvbnRleHQpO1xuICAgIHZtLiRmb3JjZVVwZGF0ZSgpO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0luSW5hY3RpdmVUcmVlICh2bSkge1xuICB3aGlsZSAodm0gJiYgKHZtID0gdm0uJHBhcmVudCkpIHtcbiAgICBpZiAodm0uX2luYWN0aXZlKSB7IHJldHVybiB0cnVlIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKGlzSW5JbmFjdGl2ZVRyZWUodm0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0gZWxzZSBpZiAodm0uX2RpcmVjdEluYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZtLl9pbmFjdGl2ZSB8fCB2bS5faW5hY3RpdmUgPT09IG51bGwpIHtcbiAgICB2bS5faW5hY3RpdmUgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZtLiRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2FjdGl2YXRlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gdHJ1ZTtcbiAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuICBpZiAoIXZtLl9pbmFjdGl2ZSkge1xuICAgIHZtLl9pbmFjdGl2ZSA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bS4kY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2RlYWN0aXZhdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEhvb2sgKHZtLCBob29rKSB7XG4gIHZhciBoYW5kbGVycyA9IHZtLiRvcHRpb25zW2hvb2tdO1xuICBpZiAoaGFuZGxlcnMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaGFuZGxlcnNbaV0uY2FsbCh2bSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCAoaG9vayArIFwiIGhvb2tcIikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodm0uX2hhc0hvb2tFdmVudCkge1xuICAgIHZtLiRlbWl0KCdob29rOicgKyBob29rKTtcbiAgfVxufVxuXG4vKiAgKi9cblxuXG52YXIgTUFYX1VQREFURV9DT1VOVCA9IDEwMDtcblxudmFyIHF1ZXVlID0gW107XG52YXIgYWN0aXZhdGVkQ2hpbGRyZW4gPSBbXTtcbnZhciBoYXMgPSB7fTtcbnZhciBjaXJjdWxhciA9IHt9O1xudmFyIHdhaXRpbmcgPSBmYWxzZTtcbnZhciBmbHVzaGluZyA9IGZhbHNlO1xudmFyIGluZGV4ID0gMDtcblxuLyoqXG4gKiBSZXNldCB0aGUgc2NoZWR1bGVyJ3Mgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHJlc2V0U2NoZWR1bGVyU3RhdGUgKCkge1xuICBpbmRleCA9IHF1ZXVlLmxlbmd0aCA9IGFjdGl2YXRlZENoaWxkcmVuLmxlbmd0aCA9IDA7XG4gIGhhcyA9IHt9O1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNpcmN1bGFyID0ge307XG4gIH1cbiAgd2FpdGluZyA9IGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8qKlxuICogRmx1c2ggYm90aCBxdWV1ZXMgYW5kIHJ1biB0aGUgd2F0Y2hlcnMuXG4gKi9cbmZ1bmN0aW9uIGZsdXNoU2NoZWR1bGVyUXVldWUgKCkge1xuICBmbHVzaGluZyA9IHRydWU7XG4gIHZhciB3YXRjaGVyLCBpZDtcblxuICAvLyBTb3J0IHF1ZXVlIGJlZm9yZSBmbHVzaC5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQ6XG4gIC8vIDEuIENvbXBvbmVudHMgYXJlIHVwZGF0ZWQgZnJvbSBwYXJlbnQgdG8gY2hpbGQuIChiZWNhdXNlIHBhcmVudCBpcyBhbHdheXNcbiAgLy8gICAgY3JlYXRlZCBiZWZvcmUgdGhlIGNoaWxkKVxuICAvLyAyLiBBIGNvbXBvbmVudCdzIHVzZXIgd2F0Y2hlcnMgYXJlIHJ1biBiZWZvcmUgaXRzIHJlbmRlciB3YXRjaGVyIChiZWNhdXNlXG4gIC8vICAgIHVzZXIgd2F0Y2hlcnMgYXJlIGNyZWF0ZWQgYmVmb3JlIHRoZSByZW5kZXIgd2F0Y2hlcilcbiAgLy8gMy4gSWYgYSBjb21wb25lbnQgaXMgZGVzdHJveWVkIGR1cmluZyBhIHBhcmVudCBjb21wb25lbnQncyB3YXRjaGVyIHJ1bixcbiAgLy8gICAgaXRzIHdhdGNoZXJzIGNhbiBiZSBza2lwcGVkLlxuICBxdWV1ZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmlkIC0gYi5pZDsgfSk7XG5cbiAgLy8gZG8gbm90IGNhY2hlIGxlbmd0aCBiZWNhdXNlIG1vcmUgd2F0Y2hlcnMgbWlnaHQgYmUgcHVzaGVkXG4gIC8vIGFzIHdlIHJ1biBleGlzdGluZyB3YXRjaGVyc1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBxdWV1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICB3YXRjaGVyID0gcXVldWVbaW5kZXhdO1xuICAgIGlkID0gd2F0Y2hlci5pZDtcbiAgICBoYXNbaWRdID0gbnVsbDtcbiAgICB3YXRjaGVyLnJ1bigpO1xuICAgIC8vIGluIGRldiBidWlsZCwgY2hlY2sgYW5kIHN0b3AgY2lyY3VsYXIgdXBkYXRlcy5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBoYXNbaWRdICE9IG51bGwpIHtcbiAgICAgIGNpcmN1bGFyW2lkXSA9IChjaXJjdWxhcltpZF0gfHwgMCkgKyAxO1xuICAgICAgaWYgKGNpcmN1bGFyW2lkXSA+IE1BWF9VUERBVEVfQ09VTlQpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnWW91IG1heSBoYXZlIGFuIGluZmluaXRlIHVwZGF0ZSBsb29wICcgKyAoXG4gICAgICAgICAgICB3YXRjaGVyLnVzZXJcbiAgICAgICAgICAgICAgPyAoXCJpbiB3YXRjaGVyIHdpdGggZXhwcmVzc2lvbiBcXFwiXCIgKyAod2F0Y2hlci5leHByZXNzaW9uKSArIFwiXFxcIlwiKVxuICAgICAgICAgICAgICA6IFwiaW4gYSBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9uLlwiXG4gICAgICAgICAgKSxcbiAgICAgICAgICB3YXRjaGVyLnZtXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8ga2VlcCBjb3BpZXMgb2YgcG9zdCBxdWV1ZXMgYmVmb3JlIHJlc2V0dGluZyBzdGF0ZVxuICB2YXIgYWN0aXZhdGVkUXVldWUgPSBhY3RpdmF0ZWRDaGlsZHJlbi5zbGljZSgpO1xuICB2YXIgdXBkYXRlZFF1ZXVlID0gcXVldWUuc2xpY2UoKTtcblxuICByZXNldFNjaGVkdWxlclN0YXRlKCk7XG5cbiAgLy8gY2FsbCBjb21wb25lbnQgdXBkYXRlZCBhbmQgYWN0aXZhdGVkIGhvb2tzXG4gIGNhbGxBY3RpdmF0ZWRIb29rcyhhY3RpdmF0ZWRRdWV1ZSk7XG4gIGNhbGxVcGRhdGVkSG9va3ModXBkYXRlZFF1ZXVlKTtcblxuICAvLyBkZXZ0b29sIGhvb2tcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChkZXZ0b29scyAmJiBjb25maWcuZGV2dG9vbHMpIHtcbiAgICBkZXZ0b29scy5lbWl0KCdmbHVzaCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxVcGRhdGVkSG9va3MgKHF1ZXVlKSB7XG4gIHZhciBpID0gcXVldWUubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIHdhdGNoZXIgPSBxdWV1ZVtpXTtcbiAgICB2YXIgdm0gPSB3YXRjaGVyLnZtO1xuICAgIGlmICh2bS5fd2F0Y2hlciA9PT0gd2F0Y2hlciAmJiB2bS5faXNNb3VudGVkKSB7XG4gICAgICBjYWxsSG9vayh2bSwgJ3VwZGF0ZWQnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBRdWV1ZSBhIGtlcHQtYWxpdmUgY29tcG9uZW50IHRoYXQgd2FzIGFjdGl2YXRlZCBkdXJpbmcgcGF0Y2guXG4gKiBUaGUgcXVldWUgd2lsbCBiZSBwcm9jZXNzZWQgYWZ0ZXIgdGhlIGVudGlyZSB0cmVlIGhhcyBiZWVuIHBhdGNoZWQuXG4gKi9cbmZ1bmN0aW9uIHF1ZXVlQWN0aXZhdGVkQ29tcG9uZW50ICh2bSkge1xuICAvLyBzZXR0aW5nIF9pbmFjdGl2ZSB0byBmYWxzZSBoZXJlIHNvIHRoYXQgYSByZW5kZXIgZnVuY3Rpb24gY2FuXG4gIC8vIHJlbHkgb24gY2hlY2tpbmcgd2hldGhlciBpdCdzIGluIGFuIGluYWN0aXZlIHRyZWUgKGUuZy4gcm91dGVyLXZpZXcpXG4gIHZtLl9pbmFjdGl2ZSA9IGZhbHNlO1xuICBhY3RpdmF0ZWRDaGlsZHJlbi5wdXNoKHZtKTtcbn1cblxuZnVuY3Rpb24gY2FsbEFjdGl2YXRlZEhvb2tzIChxdWV1ZSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgcXVldWVbaV0uX2luYWN0aXZlID0gdHJ1ZTtcbiAgICBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KHF1ZXVlW2ldLCB0cnVlIC8qIHRydWUgKi8pO1xuICB9XG59XG5cbi8qKlxuICogUHVzaCBhIHdhdGNoZXIgaW50byB0aGUgd2F0Y2hlciBxdWV1ZS5cbiAqIEpvYnMgd2l0aCBkdXBsaWNhdGUgSURzIHdpbGwgYmUgc2tpcHBlZCB1bmxlc3MgaXQnc1xuICogcHVzaGVkIHdoZW4gdGhlIHF1ZXVlIGlzIGJlaW5nIGZsdXNoZWQuXG4gKi9cbmZ1bmN0aW9uIHF1ZXVlV2F0Y2hlciAod2F0Y2hlcikge1xuICB2YXIgaWQgPSB3YXRjaGVyLmlkO1xuICBpZiAoaGFzW2lkXSA9PSBudWxsKSB7XG4gICAgaGFzW2lkXSA9IHRydWU7XG4gICAgaWYgKCFmbHVzaGluZykge1xuICAgICAgcXVldWUucHVzaCh3YXRjaGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgYWxyZWFkeSBmbHVzaGluZywgc3BsaWNlIHRoZSB3YXRjaGVyIGJhc2VkIG9uIGl0cyBpZFxuICAgICAgLy8gaWYgYWxyZWFkeSBwYXN0IGl0cyBpZCwgaXQgd2lsbCBiZSBydW4gbmV4dCBpbW1lZGlhdGVseS5cbiAgICAgIHZhciBpID0gcXVldWUubGVuZ3RoIC0gMTtcbiAgICAgIHdoaWxlIChpID4gaW5kZXggJiYgcXVldWVbaV0uaWQgPiB3YXRjaGVyLmlkKSB7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlLnNwbGljZShpICsgMSwgMCwgd2F0Y2hlcik7XG4gICAgfVxuICAgIC8vIHF1ZXVlIHRoZSBmbHVzaFxuICAgIGlmICghd2FpdGluZykge1xuICAgICAgd2FpdGluZyA9IHRydWU7XG4gICAgICBuZXh0VGljayhmbHVzaFNjaGVkdWxlclF1ZXVlKTtcbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbnZhciB1aWQkMiA9IDA7XG5cbi8qKlxuICogQSB3YXRjaGVyIHBhcnNlcyBhbiBleHByZXNzaW9uLCBjb2xsZWN0cyBkZXBlbmRlbmNpZXMsXG4gKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuICogVGhpcyBpcyB1c2VkIGZvciBib3RoIHRoZSAkd2F0Y2goKSBhcGkgYW5kIGRpcmVjdGl2ZXMuXG4gKi9cbnZhciBXYXRjaGVyID0gZnVuY3Rpb24gV2F0Y2hlciAoXG4gIHZtLFxuICBleHBPckZuLFxuICBjYixcbiAgb3B0aW9ucyxcbiAgaXNSZW5kZXJXYXRjaGVyXG4pIHtcbiAgdGhpcy52bSA9IHZtO1xuICBpZiAoaXNSZW5kZXJXYXRjaGVyKSB7XG4gICAgdm0uX3dhdGNoZXIgPSB0aGlzO1xuICB9XG4gIHZtLl93YXRjaGVycy5wdXNoKHRoaXMpO1xuICAvLyBvcHRpb25zXG4gIGlmIChvcHRpb25zKSB7XG4gICAgdGhpcy5kZWVwID0gISFvcHRpb25zLmRlZXA7XG4gICAgdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXI7XG4gICAgdGhpcy5sYXp5ID0gISFvcHRpb25zLmxhenk7XG4gICAgdGhpcy5zeW5jID0gISFvcHRpb25zLnN5bmM7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kZWVwID0gdGhpcy51c2VyID0gdGhpcy5sYXp5ID0gdGhpcy5zeW5jID0gZmFsc2U7XG4gIH1cbiAgdGhpcy5jYiA9IGNiO1xuICB0aGlzLmlkID0gKyt1aWQkMjsgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIHRoaXMuZGlydHkgPSB0aGlzLmxhenk7IC8vIGZvciBsYXp5IHdhdGNoZXJzXG4gIHRoaXMuZGVwcyA9IFtdO1xuICB0aGlzLm5ld0RlcHMgPSBbXTtcbiAgdGhpcy5kZXBJZHMgPSBuZXcgX1NldCgpO1xuICB0aGlzLm5ld0RlcElkcyA9IG5ldyBfU2V0KCk7XG4gIHRoaXMuZXhwcmVzc2lvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbiAgICA/IGV4cE9yRm4udG9TdHJpbmcoKVxuICAgIDogJyc7XG4gIC8vIHBhcnNlIGV4cHJlc3Npb24gZm9yIGdldHRlclxuICBpZiAodHlwZW9mIGV4cE9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmdldHRlciA9IGV4cE9yRm47XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5nZXR0ZXIgPSBwYXJzZVBhdGgoZXhwT3JGbik7XG4gICAgaWYgKCF0aGlzLmdldHRlcikge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJGYWlsZWQgd2F0Y2hpbmcgcGF0aDogXFxcIlwiICsgZXhwT3JGbiArIFwiXFxcIiBcIiArXG4gICAgICAgICdXYXRjaGVyIG9ubHkgYWNjZXB0cyBzaW1wbGUgZG90LWRlbGltaXRlZCBwYXRocy4gJyArXG4gICAgICAgICdGb3IgZnVsbCBjb250cm9sLCB1c2UgYSBmdW5jdGlvbiBpbnN0ZWFkLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cbiAgfVxuICB0aGlzLnZhbHVlID0gdGhpcy5sYXp5XG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHRoaXMuZ2V0KCk7XG59O1xuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcHVzaFRhcmdldCh0aGlzKTtcbiAgdmFyIHZhbHVlO1xuICB2YXIgdm0gPSB0aGlzLnZtO1xuICB0cnkge1xuICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIChcImdldHRlciBmb3Igd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgLy8gXCJ0b3VjaFwiIGV2ZXJ5IHByb3BlcnR5IHNvIHRoZXkgYXJlIGFsbCB0cmFja2VkIGFzXG4gICAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gICAgaWYgKHRoaXMuZGVlcCkge1xuICAgICAgdHJhdmVyc2UodmFsdWUpO1xuICAgIH1cbiAgICBwb3BUYXJnZXQoKTtcbiAgICB0aGlzLmNsZWFudXBEZXBzKCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59O1xuXG4vKipcbiAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmFkZERlcCA9IGZ1bmN0aW9uIGFkZERlcCAoZGVwKSB7XG4gIHZhciBpZCA9IGRlcC5pZDtcbiAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoaWQpKSB7XG4gICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKTtcbiAgICB0aGlzLm5ld0RlcHMucHVzaChkZXApO1xuICAgIGlmICghdGhpcy5kZXBJZHMuaGFzKGlkKSkge1xuICAgICAgZGVwLmFkZFN1Yih0aGlzKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYW4gdXAgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuY2xlYW51cERlcHMgPSBmdW5jdGlvbiBjbGVhbnVwRGVwcyAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIGRlcCA9IHRoaXMkMS5kZXBzW2ldO1xuICAgIGlmICghdGhpcyQxLm5ld0RlcElkcy5oYXMoZGVwLmlkKSkge1xuICAgICAgZGVwLnJlbW92ZVN1Yih0aGlzJDEpO1xuICAgIH1cbiAgfVxuICB2YXIgdG1wID0gdGhpcy5kZXBJZHM7XG4gIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHM7XG4gIHRoaXMubmV3RGVwSWRzID0gdG1wO1xuICB0aGlzLm5ld0RlcElkcy5jbGVhcigpO1xuICB0bXAgPSB0aGlzLmRlcHM7XG4gIHRoaXMuZGVwcyA9IHRoaXMubmV3RGVwcztcbiAgdGhpcy5uZXdEZXBzID0gdG1wO1xuICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMDtcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlciBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgZGVwZW5kZW5jeSBjaGFuZ2VzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodGhpcy5sYXp5KSB7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gIH0gZWxzZSBpZiAodGhpcy5zeW5jKSB7XG4gICAgdGhpcy5ydW4oKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZVdhdGNoZXIodGhpcyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2NoZWR1bGVyIGpvYiBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgc2NoZWR1bGVyLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiBydW4gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpO1xuICAgIGlmIChcbiAgICAgIHZhbHVlICE9PSB0aGlzLnZhbHVlIHx8XG4gICAgICAvLyBEZWVwIHdhdGNoZXJzIGFuZCB3YXRjaGVycyBvbiBPYmplY3QvQXJyYXlzIHNob3VsZCBmaXJlIGV2ZW5cbiAgICAgIC8vIHdoZW4gdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCBiZWNhdXNlIHRoZSB2YWx1ZSBtYXlcbiAgICAgIC8vIGhhdmUgbXV0YXRlZC5cbiAgICAgIGlzT2JqZWN0KHZhbHVlKSB8fFxuICAgICAgdGhpcy5kZWVwXG4gICAgKSB7XG4gICAgICAvLyBzZXQgbmV3IHZhbHVlXG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaGFuZGxlRXJyb3IoZSwgdGhpcy52bSwgKFwiY2FsbGJhY2sgZm9yIHdhdGNoZXIgXFxcIlwiICsgKHRoaXMuZXhwcmVzc2lvbikgKyBcIlxcXCJcIikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIHZhbHVlIG9mIHRoZSB3YXRjaGVyLlxuICogVGhpcyBvbmx5IGdldHMgY2FsbGVkIGZvciBsYXp5IHdhdGNoZXJzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uIGV2YWx1YXRlICgpIHtcbiAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gIHRoaXMuZGlydHkgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogRGVwZW5kIG9uIGFsbCBkZXBzIGNvbGxlY3RlZCBieSB0aGlzIHdhdGNoZXIuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uIGRlcGVuZCAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdGhpcyQxLmRlcHNbaV0uZGVwZW5kKCk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJzY3JpYmVyIGxpc3QuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnRlYXJkb3duID0gZnVuY3Rpb24gdGVhcmRvd24gKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3RcbiAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgZXhwZW5zaXZlIG9wZXJhdGlvbiBzbyB3ZSBza2lwIGl0XG4gICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIGRlc3Ryb3llZC5cbiAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgIHJlbW92ZSh0aGlzLnZtLl93YXRjaGVycywgdGhpcyk7XG4gICAgfVxuICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzJDEuZGVwc1tpXS5yZW1vdmVTdWIodGhpcyQxKTtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufTtcblxuLyogICovXG5cbnZhciBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24gPSB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBub29wLFxuICBzZXQ6IG5vb3Bcbn07XG5cbmZ1bmN0aW9uIHByb3h5ICh0YXJnZXQsIHNvdXJjZUtleSwga2V5KSB7XG4gIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5nZXQgPSBmdW5jdGlvbiBwcm94eUdldHRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXNbc291cmNlS2V5XVtrZXldXG4gIH07XG4gIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBmdW5jdGlvbiBwcm94eVNldHRlciAodmFsKSB7XG4gICAgdGhpc1tzb3VyY2VLZXldW2tleV0gPSB2YWw7XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uKTtcbn1cblxuZnVuY3Rpb24gaW5pdFN0YXRlICh2bSkge1xuICB2bS5fd2F0Y2hlcnMgPSBbXTtcbiAgdmFyIG9wdHMgPSB2bS4kb3B0aW9ucztcbiAgaWYgKG9wdHMucHJvcHMpIHsgaW5pdFByb3BzKHZtLCBvcHRzLnByb3BzKTsgfVxuICBpZiAob3B0cy5tZXRob2RzKSB7IGluaXRNZXRob2RzKHZtLCBvcHRzLm1ldGhvZHMpOyB9XG4gIGlmIChvcHRzLmRhdGEpIHtcbiAgICBpbml0RGF0YSh2bSk7XG4gIH0gZWxzZSB7XG4gICAgb2JzZXJ2ZSh2bS5fZGF0YSA9IHt9LCB0cnVlIC8qIGFzUm9vdERhdGEgKi8pO1xuICB9XG4gIGlmIChvcHRzLmNvbXB1dGVkKSB7IGluaXRDb21wdXRlZCh2bSwgb3B0cy5jb21wdXRlZCk7IH1cbiAgaWYgKG9wdHMud2F0Y2ggJiYgb3B0cy53YXRjaCAhPT0gbmF0aXZlV2F0Y2gpIHtcbiAgICBpbml0V2F0Y2godm0sIG9wdHMud2F0Y2gpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRQcm9wcyAodm0sIHByb3BzT3B0aW9ucykge1xuICB2YXIgcHJvcHNEYXRhID0gdm0uJG9wdGlvbnMucHJvcHNEYXRhIHx8IHt9O1xuICB2YXIgcHJvcHMgPSB2bS5fcHJvcHMgPSB7fTtcbiAgLy8gY2FjaGUgcHJvcCBrZXlzIHNvIHRoYXQgZnV0dXJlIHByb3BzIHVwZGF0ZXMgY2FuIGl0ZXJhdGUgdXNpbmcgQXJyYXlcbiAgLy8gaW5zdGVhZCBvZiBkeW5hbWljIG9iamVjdCBrZXkgZW51bWVyYXRpb24uXG4gIHZhciBrZXlzID0gdm0uJG9wdGlvbnMuX3Byb3BLZXlzID0gW107XG4gIHZhciBpc1Jvb3QgPSAhdm0uJHBhcmVudDtcbiAgLy8gcm9vdCBpbnN0YW5jZSBwcm9wcyBzaG91bGQgYmUgY29udmVydGVkXG4gIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IGlzUm9vdDtcbiAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoIGtleSApIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB2YXIgdmFsdWUgPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wc09wdGlvbnMsIHByb3BzRGF0YSwgdm0pO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBoeXBoZW5hdGVkS2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICBpZiAoaXNSZXNlcnZlZEF0dHJpYnV0ZShoeXBoZW5hdGVkS2V5KSB8fFxuICAgICAgICAgIGNvbmZpZy5pc1Jlc2VydmVkQXR0cihoeXBoZW5hdGVkS2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIlxcXCJcIiArIGh5cGhlbmF0ZWRLZXkgKyBcIlxcXCIgaXMgYSByZXNlcnZlZCBhdHRyaWJ1dGUgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIGNvbXBvbmVudCBwcm9wLlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmaW5lUmVhY3RpdmUocHJvcHMsIGtleSwgdmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHZtLiRwYXJlbnQgJiYgIWlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICBcIkF2b2lkIG11dGF0aW5nIGEgcHJvcCBkaXJlY3RseSBzaW5jZSB0aGUgdmFsdWUgd2lsbCBiZSBcIiArXG4gICAgICAgICAgICBcIm92ZXJ3cml0dGVuIHdoZW5ldmVyIHRoZSBwYXJlbnQgY29tcG9uZW50IHJlLXJlbmRlcnMuIFwiICtcbiAgICAgICAgICAgIFwiSW5zdGVhZCwgdXNlIGEgZGF0YSBvciBjb21wdXRlZCBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcHJvcCdzIFwiICtcbiAgICAgICAgICAgIFwidmFsdWUuIFByb3AgYmVpbmcgbXV0YXRlZDogXFxcIlwiICsga2V5ICsgXCJcXFwiXCIsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbmVSZWFjdGl2ZShwcm9wcywga2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8vIHN0YXRpYyBwcm9wcyBhcmUgYWxyZWFkeSBwcm94aWVkIG9uIHRoZSBjb21wb25lbnQncyBwcm90b3R5cGVcbiAgICAvLyBkdXJpbmcgVnVlLmV4dGVuZCgpLiBXZSBvbmx5IG5lZWQgdG8gcHJveHkgcHJvcHMgZGVmaW5lZCBhdFxuICAgIC8vIGluc3RhbnRpYXRpb24gaGVyZS5cbiAgICBpZiAoIShrZXkgaW4gdm0pKSB7XG4gICAgICBwcm94eSh2bSwgXCJfcHJvcHNcIiwga2V5KTtcbiAgICB9XG4gIH07XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3BzT3B0aW9ucykgbG9vcCgga2V5ICk7XG4gIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGluaXREYXRhICh2bSkge1xuICB2YXIgZGF0YSA9IHZtLiRvcHRpb25zLmRhdGE7XG4gIGRhdGEgPSB2bS5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nXG4gICAgPyBnZXREYXRhKGRhdGEsIHZtKVxuICAgIDogZGF0YSB8fCB7fTtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgZGF0YSA9IHt9O1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdDpcXG4nICtcbiAgICAgICdodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9jb21wb25lbnRzLmh0bWwjZGF0YS1NdXN0LUJlLWEtRnVuY3Rpb24nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XG4gIHZhciBtZXRob2RzID0gdm0uJG9wdGlvbnMubWV0aG9kcztcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAobWV0aG9kcyAmJiBoYXNPd24obWV0aG9kcywga2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFzIGEgZGF0YSBwcm9wZXJ0eS5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb3BzICYmIGhhc093bihwcm9wcywga2V5KSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIlRoZSBkYXRhIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlY2xhcmVkIGFzIGEgcHJvcC4gXCIgK1xuICAgICAgICBcIlVzZSBwcm9wIGRlZmF1bHQgdmFsdWUgaW5zdGVhZC5cIixcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICBwcm94eSh2bSwgXCJfZGF0YVwiLCBrZXkpO1xuICAgIH1cbiAgfVxuICAvLyBvYnNlcnZlIGRhdGFcbiAgb2JzZXJ2ZShkYXRhLCB0cnVlIC8qIGFzUm9vdERhdGEgKi8pO1xufVxuXG5mdW5jdGlvbiBnZXREYXRhIChkYXRhLCB2bSkge1xuICB0cnkge1xuICAgIHJldHVybiBkYXRhLmNhbGwodm0sIHZtKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaGFuZGxlRXJyb3IoZSwgdm0sIFwiZGF0YSgpXCIpO1xuICAgIHJldHVybiB7fVxuICB9XG59XG5cbnZhciBjb21wdXRlZFdhdGNoZXJPcHRpb25zID0geyBsYXp5OiB0cnVlIH07XG5cbmZ1bmN0aW9uIGluaXRDb21wdXRlZCAodm0sIGNvbXB1dGVkKSB7XG4gIHZhciB3YXRjaGVycyA9IHZtLl9jb21wdXRlZFdhdGNoZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgLy8gY29tcHV0ZWQgcHJvcGVydGllcyBhcmUganVzdCBnZXR0ZXJzIGR1cmluZyBTU1JcbiAgdmFyIGlzU1NSID0gaXNTZXJ2ZXJSZW5kZXJpbmcoKTtcblxuICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICB2YXIgdXNlckRlZiA9IGNvbXB1dGVkW2tleV07XG4gICAgdmFyIGdldHRlciA9IHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nID8gdXNlckRlZiA6IHVzZXJEZWYuZ2V0O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGdldHRlciA9PSBudWxsKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAoXCJHZXR0ZXIgaXMgbWlzc2luZyBmb3IgY29tcHV0ZWQgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiLlwiKSxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1NTUikge1xuICAgICAgLy8gY3JlYXRlIGludGVybmFsIHdhdGNoZXIgZm9yIHRoZSBjb21wdXRlZCBwcm9wZXJ0eS5cbiAgICAgIHdhdGNoZXJzW2tleV0gPSBuZXcgV2F0Y2hlcihcbiAgICAgICAgdm0sXG4gICAgICAgIGdldHRlciB8fCBub29wLFxuICAgICAgICBub29wLFxuICAgICAgICBjb21wdXRlZFdhdGNoZXJPcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNvbXBvbmVudC1kZWZpbmVkIGNvbXB1dGVkIHByb3BlcnRpZXMgYXJlIGFscmVhZHkgZGVmaW5lZCBvbiB0aGVcbiAgICAvLyBjb21wb25lbnQgcHJvdG90eXBlLiBXZSBvbmx5IG5lZWQgdG8gZGVmaW5lIGNvbXB1dGVkIHByb3BlcnRpZXMgZGVmaW5lZFxuICAgIC8vIGF0IGluc3RhbnRpYXRpb24gaGVyZS5cbiAgICBpZiAoIShrZXkgaW4gdm0pKSB7XG4gICAgICBkZWZpbmVDb21wdXRlZCh2bSwga2V5LCB1c2VyRGVmKTtcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChrZXkgaW4gdm0uJGRhdGEpIHtcbiAgICAgICAgd2FybigoXCJUaGUgY29tcHV0ZWQgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIGFscmVhZHkgZGVmaW5lZCBpbiBkYXRhLlwiKSwgdm0pO1xuICAgICAgfSBlbHNlIGlmICh2bS4kb3B0aW9ucy5wcm9wcyAmJiBrZXkgaW4gdm0uJG9wdGlvbnMucHJvcHMpIHtcbiAgICAgICAgd2FybigoXCJUaGUgY29tcHV0ZWQgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIGFscmVhZHkgZGVmaW5lZCBhcyBhIHByb3AuXCIpLCB2bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZUNvbXB1dGVkIChcbiAgdGFyZ2V0LFxuICBrZXksXG4gIHVzZXJEZWZcbikge1xuICB2YXIgc2hvdWxkQ2FjaGUgPSAhaXNTZXJ2ZXJSZW5kZXJpbmcoKTtcbiAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IHNob3VsZENhY2hlXG4gICAgICA/IGNyZWF0ZUNvbXB1dGVkR2V0dGVyKGtleSlcbiAgICAgIDogdXNlckRlZjtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID0gbm9vcDtcbiAgfSBlbHNlIHtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uZ2V0ID0gdXNlckRlZi5nZXRcbiAgICAgID8gc2hvdWxkQ2FjaGUgJiYgdXNlckRlZi5jYWNoZSAhPT0gZmFsc2VcbiAgICAgICAgPyBjcmVhdGVDb21wdXRlZEdldHRlcihrZXkpXG4gICAgICAgIDogdXNlckRlZi5nZXRcbiAgICAgIDogbm9vcDtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID0gdXNlckRlZi5zZXRcbiAgICAgID8gdXNlckRlZi5zZXRcbiAgICAgIDogbm9vcDtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9PT0gbm9vcCkge1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAoXCJDb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgd2FzIGFzc2lnbmVkIHRvIGJ1dCBpdCBoYXMgbm8gc2V0dGVyLlwiKSxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIgKGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gY29tcHV0ZWRHZXR0ZXIgKCkge1xuICAgIHZhciB3YXRjaGVyID0gdGhpcy5fY29tcHV0ZWRXYXRjaGVycyAmJiB0aGlzLl9jb21wdXRlZFdhdGNoZXJzW2tleV07XG4gICAgaWYgKHdhdGNoZXIpIHtcbiAgICAgIGlmICh3YXRjaGVyLmRpcnR5KSB7XG4gICAgICAgIHdhdGNoZXIuZXZhbHVhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgIHdhdGNoZXIuZGVwZW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0Y2hlci52YWx1ZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0TWV0aG9kcyAodm0sIG1ldGhvZHMpIHtcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XG4gIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChtZXRob2RzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYW4gdW5kZWZpbmVkIHZhbHVlIGluIHRoZSBjb21wb25lbnQgZGVmaW5pdGlvbi4gXCIgK1xuICAgICAgICAgIFwiRGlkIHlvdSByZWZlcmVuY2UgdGhlIGZ1bmN0aW9uIGNvcnJlY3RseT9cIixcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BzICYmIGhhc093bihwcm9wcywga2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFzIGEgcHJvcC5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICgoa2V5IGluIHZtKSAmJiBpc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgY29uZmxpY3RzIHdpdGggYW4gZXhpc3RpbmcgVnVlIGluc3RhbmNlIG1ldGhvZC4gXCIgK1xuICAgICAgICAgIFwiQXZvaWQgZGVmaW5pbmcgY29tcG9uZW50IG1ldGhvZHMgdGhhdCBzdGFydCB3aXRoIF8gb3IgJC5cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB2bVtrZXldID0gbWV0aG9kc1trZXldID09IG51bGwgPyBub29wIDogYmluZChtZXRob2RzW2tleV0sIHZtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0V2F0Y2ggKHZtLCB3YXRjaCkge1xuICBmb3IgKHZhciBrZXkgaW4gd2F0Y2gpIHtcbiAgICB2YXIgaGFuZGxlciA9IHdhdGNoW2tleV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGFuZGxlcikpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXJbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVXYXRjaGVyIChcbiAgdm0sXG4gIGtleU9yRm4sXG4gIGhhbmRsZXIsXG4gIG9wdGlvbnNcbikge1xuICBpZiAoaXNQbGFpbk9iamVjdChoYW5kbGVyKSkge1xuICAgIG9wdGlvbnMgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBoYW5kbGVyLmhhbmRsZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJykge1xuICAgIGhhbmRsZXIgPSB2bVtoYW5kbGVyXTtcbiAgfVxuICByZXR1cm4gdm0uJHdhdGNoKGtleU9yRm4sIGhhbmRsZXIsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIHN0YXRlTWl4aW4gKFZ1ZSkge1xuICAvLyBmbG93IHNvbWVob3cgaGFzIHByb2JsZW1zIHdpdGggZGlyZWN0bHkgZGVjbGFyZWQgZGVmaW5pdGlvbiBvYmplY3RcbiAgLy8gd2hlbiB1c2luZyBPYmplY3QuZGVmaW5lUHJvcGVydHksIHNvIHdlIGhhdmUgdG8gcHJvY2VkdXJhbGx5IGJ1aWxkIHVwXG4gIC8vIHRoZSBvYmplY3QgaGVyZS5cbiAgdmFyIGRhdGFEZWYgPSB7fTtcbiAgZGF0YURlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9kYXRhIH07XG4gIHZhciBwcm9wc0RlZiA9IHt9O1xuICBwcm9wc0RlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9wcm9wcyB9O1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGRhdGFEZWYuc2V0ID0gZnVuY3Rpb24gKG5ld0RhdGEpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdBdm9pZCByZXBsYWNpbmcgaW5zdGFuY2Ugcm9vdCAkZGF0YS4gJyArXG4gICAgICAgICdVc2UgbmVzdGVkIGRhdGEgcHJvcGVydGllcyBpbnN0ZWFkLicsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfTtcbiAgICBwcm9wc0RlZi5zZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB3YXJuKFwiJHByb3BzIGlzIHJlYWRvbmx5LlwiLCB0aGlzKTtcbiAgICB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJGRhdGEnLCBkYXRhRGVmKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckcHJvcHMnLCBwcm9wc0RlZik7XG5cbiAgVnVlLnByb3RvdHlwZS4kc2V0ID0gc2V0O1xuICBWdWUucHJvdG90eXBlLiRkZWxldGUgPSBkZWw7XG5cbiAgVnVlLnByb3RvdHlwZS4kd2F0Y2ggPSBmdW5jdGlvbiAoXG4gICAgZXhwT3JGbixcbiAgICBjYixcbiAgICBvcHRpb25zXG4gICkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoY2IpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlV2F0Y2hlcih2bSwgZXhwT3JGbiwgY2IsIG9wdGlvbnMpXG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXNlciA9IHRydWU7XG4gICAgdmFyIHdhdGNoZXIgPSBuZXcgV2F0Y2hlcih2bSwgZXhwT3JGbiwgY2IsIG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLmltbWVkaWF0ZSkge1xuICAgICAgY2IuY2FsbCh2bSwgd2F0Y2hlci52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiB1bndhdGNoRm4gKCkge1xuICAgICAgd2F0Y2hlci50ZWFyZG93bigpO1xuICAgIH1cbiAgfTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRQcm92aWRlICh2bSkge1xuICB2YXIgcHJvdmlkZSA9IHZtLiRvcHRpb25zLnByb3ZpZGU7XG4gIGlmIChwcm92aWRlKSB7XG4gICAgdm0uX3Byb3ZpZGVkID0gdHlwZW9mIHByb3ZpZGUgPT09ICdmdW5jdGlvbidcbiAgICAgID8gcHJvdmlkZS5jYWxsKHZtKVxuICAgICAgOiBwcm92aWRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRJbmplY3Rpb25zICh2bSkge1xuICB2YXIgcmVzdWx0ID0gcmVzb2x2ZUluamVjdCh2bS4kb3B0aW9ucy5pbmplY3QsIHZtKTtcbiAgaWYgKHJlc3VsdCkge1xuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IGZhbHNlO1xuICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUodm0sIGtleSwgcmVzdWx0W2tleV0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgXCJBdm9pZCBtdXRhdGluZyBhbiBpbmplY3RlZCB2YWx1ZSBkaXJlY3RseSBzaW5jZSB0aGUgY2hhbmdlcyB3aWxsIGJlIFwiICtcbiAgICAgICAgICAgIFwib3ZlcndyaXR0ZW4gd2hlbmV2ZXIgdGhlIHByb3ZpZGVkIGNvbXBvbmVudCByZS1yZW5kZXJzLiBcIiArXG4gICAgICAgICAgICBcImluamVjdGlvbiBiZWluZyBtdXRhdGVkOiBcXFwiXCIgKyBrZXkgKyBcIlxcXCJcIixcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZSh2bSwga2V5LCByZXN1bHRba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlSW5qZWN0IChpbmplY3QsIHZtKSB7XG4gIGlmIChpbmplY3QpIHtcbiAgICAvLyBpbmplY3QgaXMgOmFueSBiZWNhdXNlIGZsb3cgaXMgbm90IHNtYXJ0IGVub3VnaCB0byBmaWd1cmUgb3V0IGNhY2hlZFxuICAgIHZhciByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBrZXlzID0gaGFzU3ltYm9sXG4gICAgICAgID8gUmVmbGVjdC5vd25LZXlzKGluamVjdCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGluamVjdCwga2V5KS5lbnVtZXJhYmxlXG4gICAgICAgIH0pXG4gICAgICAgIDogT2JqZWN0LmtleXMoaW5qZWN0KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICB2YXIgcHJvdmlkZUtleSA9IGluamVjdFtrZXldLmZyb207XG4gICAgICB2YXIgc291cmNlID0gdm07XG4gICAgICB3aGlsZSAoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuX3Byb3ZpZGVkICYmIHByb3ZpZGVLZXkgaW4gc291cmNlLl9wcm92aWRlZCkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gc291cmNlLl9wcm92aWRlZFtwcm92aWRlS2V5XTtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZS4kcGFyZW50O1xuICAgICAgfVxuICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgaWYgKCdkZWZhdWx0JyBpbiBpbmplY3Rba2V5XSkge1xuICAgICAgICAgIHZhciBwcm92aWRlRGVmYXVsdCA9IGluamVjdFtrZXldLmRlZmF1bHQ7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB0eXBlb2YgcHJvdmlkZURlZmF1bHQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gcHJvdmlkZURlZmF1bHQuY2FsbCh2bSlcbiAgICAgICAgICAgIDogcHJvdmlkZURlZmF1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHdhcm4oKFwiSW5qZWN0aW9uIFxcXCJcIiArIGtleSArIFwiXFxcIiBub3QgZm91bmRcIiksIHZtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlbmRlcmluZyB2LWZvciBsaXN0cy5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyTGlzdCAoXG4gIHZhbCxcbiAgcmVuZGVyXG4pIHtcbiAgdmFyIHJldCwgaSwgbCwga2V5cywga2V5O1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0ID0gbmV3IEFycmF5KHZhbC5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGwgPSB2YWwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICByZXRbaV0gPSByZW5kZXIodmFsW2ldLCBpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICByZXQgPSBuZXcgQXJyYXkodmFsKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdmFsOyBpKyspIHtcbiAgICAgIHJldFtpXSA9IHJlbmRlcihpICsgMSwgaSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICByZXQgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxba2V5XSwga2V5LCBpKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzRGVmKHJldCkpIHtcbiAgICAocmV0KS5faXNWTGlzdCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIDxzbG90PlxuICovXG5mdW5jdGlvbiByZW5kZXJTbG90IChcbiAgbmFtZSxcbiAgZmFsbGJhY2ssXG4gIHByb3BzLFxuICBiaW5kT2JqZWN0XG4pIHtcbiAgdmFyIHNjb3BlZFNsb3RGbiA9IHRoaXMuJHNjb3BlZFNsb3RzW25hbWVdO1xuICB2YXIgbm9kZXM7XG4gIGlmIChzY29wZWRTbG90Rm4pIHsgLy8gc2NvcGVkIHNsb3RcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGlmIChiaW5kT2JqZWN0KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhaXNPYmplY3QoYmluZE9iamVjdCkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnc2xvdCB2LWJpbmQgd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCcsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcHJvcHMgPSBleHRlbmQoZXh0ZW5kKHt9LCBiaW5kT2JqZWN0KSwgcHJvcHMpO1xuICAgIH1cbiAgICBub2RlcyA9IHNjb3BlZFNsb3RGbihwcm9wcykgfHwgZmFsbGJhY2s7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsb3ROb2RlcyA9IHRoaXMuJHNsb3RzW25hbWVdO1xuICAgIC8vIHdhcm4gZHVwbGljYXRlIHNsb3QgdXNhZ2VcbiAgICBpZiAoc2xvdE5vZGVzKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBzbG90Tm9kZXMuX3JlbmRlcmVkKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJEdXBsaWNhdGUgcHJlc2VuY2Ugb2Ygc2xvdCBcXFwiXCIgKyBuYW1lICsgXCJcXFwiIGZvdW5kIGluIHRoZSBzYW1lIHJlbmRlciB0cmVlIFwiICtcbiAgICAgICAgICBcIi0gdGhpcyB3aWxsIGxpa2VseSBjYXVzZSByZW5kZXIgZXJyb3JzLlwiLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHNsb3ROb2Rlcy5fcmVuZGVyZWQgPSB0cnVlO1xuICAgIH1cbiAgICBub2RlcyA9IHNsb3ROb2RlcyB8fCBmYWxsYmFjaztcbiAgfVxuXG4gIHZhciB0YXJnZXQgPSBwcm9wcyAmJiBwcm9wcy5zbG90O1xuICBpZiAodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJywgeyBzbG90OiB0YXJnZXQgfSwgbm9kZXMpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5vZGVzXG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlc29sdmluZyBmaWx0ZXJzXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVGaWx0ZXIgKGlkKSB7XG4gIHJldHVybiByZXNvbHZlQXNzZXQodGhpcy4kb3B0aW9ucywgJ2ZpbHRlcnMnLCBpZCwgdHJ1ZSkgfHwgaWRlbnRpdHlcbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIGNoZWNraW5nIGtleUNvZGVzIGZyb20gY29uZmlnLlxuICogZXhwb3NlZCBhcyBWdWUucHJvdG90eXBlLl9rXG4gKiBwYXNzaW5nIGluIGV2ZW50S2V5TmFtZSBhcyBsYXN0IGFyZ3VtZW50IHNlcGFyYXRlbHkgZm9yIGJhY2t3YXJkcyBjb21wYXRcbiAqL1xuZnVuY3Rpb24gY2hlY2tLZXlDb2RlcyAoXG4gIGV2ZW50S2V5Q29kZSxcbiAga2V5LFxuICBidWlsdEluQWxpYXMsXG4gIGV2ZW50S2V5TmFtZVxuKSB7XG4gIHZhciBrZXlDb2RlcyA9IGNvbmZpZy5rZXlDb2Rlc1trZXldIHx8IGJ1aWx0SW5BbGlhcztcbiAgaWYgKGtleUNvZGVzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Q29kZXMpKSB7XG4gICAgICByZXR1cm4ga2V5Q29kZXMuaW5kZXhPZihldmVudEtleUNvZGUpID09PSAtMVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ga2V5Q29kZXMgIT09IGV2ZW50S2V5Q29kZVxuICAgIH1cbiAgfSBlbHNlIGlmIChldmVudEtleU5hbWUpIHtcbiAgICByZXR1cm4gaHlwaGVuYXRlKGV2ZW50S2V5TmFtZSkgIT09IGtleVxuICB9XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciBtZXJnaW5nIHYtYmluZD1cIm9iamVjdFwiIGludG8gYSBWTm9kZSdzIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGJpbmRPYmplY3RQcm9wcyAoXG4gIGRhdGEsXG4gIHRhZyxcbiAgdmFsdWUsXG4gIGFzUHJvcCxcbiAgaXNTeW5jXG4pIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ3YtYmluZCB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0IG9yIEFycmF5IHZhbHVlJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdG9PYmplY3QodmFsdWUpO1xuICAgICAgfVxuICAgICAgdmFyIGhhc2g7XG4gICAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICgga2V5ICkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAga2V5ID09PSAnY2xhc3MnIHx8XG4gICAgICAgICAga2V5ID09PSAnc3R5bGUnIHx8XG4gICAgICAgICAgaXNSZXNlcnZlZEF0dHJpYnV0ZShrZXkpXG4gICAgICAgICkge1xuICAgICAgICAgIGhhc2ggPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0eXBlID0gZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLnR5cGU7XG4gICAgICAgICAgaGFzaCA9IGFzUHJvcCB8fCBjb25maWcubXVzdFVzZVByb3AodGFnLCB0eXBlLCBrZXkpXG4gICAgICAgICAgICA/IGRhdGEuZG9tUHJvcHMgfHwgKGRhdGEuZG9tUHJvcHMgPSB7fSlcbiAgICAgICAgICAgIDogZGF0YS5hdHRycyB8fCAoZGF0YS5hdHRycyA9IHt9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShrZXkgaW4gaGFzaCkpIHtcbiAgICAgICAgICBoYXNoW2tleV0gPSB2YWx1ZVtrZXldO1xuXG4gICAgICAgICAgaWYgKGlzU3luYykge1xuICAgICAgICAgICAgdmFyIG9uID0gZGF0YS5vbiB8fCAoZGF0YS5vbiA9IHt9KTtcbiAgICAgICAgICAgIG9uWyhcInVwZGF0ZTpcIiArIGtleSldID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICB2YWx1ZVtrZXldID0gJGV2ZW50O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkgbG9vcCgga2V5ICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgc3RhdGljIHRyZWVzLlxuICovXG5mdW5jdGlvbiByZW5kZXJTdGF0aWMgKFxuICBpbmRleCxcbiAgaXNJbkZvcixcbiAgaXNPbmNlXG4pIHtcbiAgLy8gcmVuZGVyIGZucyBnZW5lcmF0ZWQgYnkgY29tcGlsZXIgPCAyLjUuNCBkb2VzIG5vdCBwcm92aWRlIHYtb25jZVxuICAvLyBpbmZvcm1hdGlvbiB0byBydW50aW1lIHNvIGJlIGNvbnNlcnZhdGl2ZVxuICB2YXIgaXNPbGRWZXJzaW9uID0gYXJndW1lbnRzLmxlbmd0aCA8IDM7XG4gIC8vIGlmIGEgc3RhdGljIHRyZWUgaXMgZ2VuZXJhdGVkIGJ5IHYtb25jZSwgaXQgaXMgY2FjaGVkIG9uIHRoZSBpbnN0YW5jZTtcbiAgLy8gb3RoZXJ3aXNlIGl0IGlzIHB1cmVseSBzdGF0aWMgYW5kIGNhbiBiZSBjYWNoZWQgb24gdGhlIHNoYXJlZCBvcHRpb25zXG4gIC8vIGFjcm9zcyBhbGwgaW5zdGFuY2VzLlxuICB2YXIgcmVuZGVyRm5zID0gdGhpcy4kb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnM7XG4gIHZhciBjYWNoZWQgPSBpc09sZFZlcnNpb24gfHwgaXNPbmNlXG4gICAgPyAodGhpcy5fc3RhdGljVHJlZXMgfHwgKHRoaXMuX3N0YXRpY1RyZWVzID0gW10pKVxuICAgIDogKHJlbmRlckZucy5jYWNoZWQgfHwgKHJlbmRlckZucy5jYWNoZWQgPSBbXSkpO1xuICB2YXIgdHJlZSA9IGNhY2hlZFtpbmRleF07XG4gIC8vIGlmIGhhcyBhbHJlYWR5LXJlbmRlcmVkIHN0YXRpYyB0cmVlIGFuZCBub3QgaW5zaWRlIHYtZm9yLFxuICAvLyB3ZSBjYW4gcmV1c2UgdGhlIHNhbWUgdHJlZSBieSBkb2luZyBhIHNoYWxsb3cgY2xvbmUuXG4gIGlmICh0cmVlICYmICFpc0luRm9yKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodHJlZSlcbiAgICAgID8gY2xvbmVWTm9kZXModHJlZSlcbiAgICAgIDogY2xvbmVWTm9kZSh0cmVlKVxuICB9XG4gIC8vIG90aGVyd2lzZSwgcmVuZGVyIGEgZnJlc2ggdHJlZS5cbiAgdHJlZSA9IGNhY2hlZFtpbmRleF0gPSByZW5kZXJGbnNbaW5kZXhdLmNhbGwodGhpcy5fcmVuZGVyUHJveHksIG51bGwsIHRoaXMpO1xuICBtYXJrU3RhdGljKHRyZWUsIChcIl9fc3RhdGljX19cIiArIGluZGV4KSwgZmFsc2UpO1xuICByZXR1cm4gdHJlZVxufVxuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciB2LW9uY2UuXG4gKiBFZmZlY3RpdmVseSBpdCBtZWFucyBtYXJraW5nIHRoZSBub2RlIGFzIHN0YXRpYyB3aXRoIGEgdW5pcXVlIGtleS5cbiAqL1xuZnVuY3Rpb24gbWFya09uY2UgKFxuICB0cmVlLFxuICBpbmRleCxcbiAga2V5XG4pIHtcbiAgbWFya1N0YXRpYyh0cmVlLCAoXCJfX29uY2VfX1wiICsgaW5kZXggKyAoa2V5ID8gKFwiX1wiICsga2V5KSA6IFwiXCIpKSwgdHJ1ZSk7XG4gIHJldHVybiB0cmVlXG59XG5cbmZ1bmN0aW9uIG1hcmtTdGF0aWMgKFxuICB0cmVlLFxuICBrZXksXG4gIGlzT25jZVxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHJlZVtpXSAmJiB0eXBlb2YgdHJlZVtpXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWFya1N0YXRpY05vZGUodHJlZVtpXSwgKGtleSArIFwiX1wiICsgaSksIGlzT25jZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG1hcmtTdGF0aWNOb2RlKHRyZWUsIGtleSwgaXNPbmNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXJrU3RhdGljTm9kZSAobm9kZSwga2V5LCBpc09uY2UpIHtcbiAgbm9kZS5pc1N0YXRpYyA9IHRydWU7XG4gIG5vZGUua2V5ID0ga2V5O1xuICBub2RlLmlzT25jZSA9IGlzT25jZTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGJpbmRPYmplY3RMaXN0ZW5lcnMgKGRhdGEsIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSkge1xuICAgIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ3Ytb24gd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCB2YWx1ZScsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvbiA9IGRhdGEub24gPSBkYXRhLm9uID8gZXh0ZW5kKHt9LCBkYXRhLm9uKSA6IHt9O1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgIHZhciBleGlzdGluZyA9IG9uW2tleV07XG4gICAgICAgIHZhciBvdXJzID0gdmFsdWVba2V5XTtcbiAgICAgICAgb25ba2V5XSA9IGV4aXN0aW5nID8gW10uY29uY2F0KGV4aXN0aW5nLCBvdXJzKSA6IG91cnM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbnN0YWxsUmVuZGVySGVscGVycyAodGFyZ2V0KSB7XG4gIHRhcmdldC5fbyA9IG1hcmtPbmNlO1xuICB0YXJnZXQuX24gPSB0b051bWJlcjtcbiAgdGFyZ2V0Ll9zID0gdG9TdHJpbmc7XG4gIHRhcmdldC5fbCA9IHJlbmRlckxpc3Q7XG4gIHRhcmdldC5fdCA9IHJlbmRlclNsb3Q7XG4gIHRhcmdldC5fcSA9IGxvb3NlRXF1YWw7XG4gIHRhcmdldC5faSA9IGxvb3NlSW5kZXhPZjtcbiAgdGFyZ2V0Ll9tID0gcmVuZGVyU3RhdGljO1xuICB0YXJnZXQuX2YgPSByZXNvbHZlRmlsdGVyO1xuICB0YXJnZXQuX2sgPSBjaGVja0tleUNvZGVzO1xuICB0YXJnZXQuX2IgPSBiaW5kT2JqZWN0UHJvcHM7XG4gIHRhcmdldC5fdiA9IGNyZWF0ZVRleHRWTm9kZTtcbiAgdGFyZ2V0Ll9lID0gY3JlYXRlRW1wdHlWTm9kZTtcbiAgdGFyZ2V0Ll91ID0gcmVzb2x2ZVNjb3BlZFNsb3RzO1xuICB0YXJnZXQuX2cgPSBiaW5kT2JqZWN0TGlzdGVuZXJzO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gRnVuY3Rpb25hbFJlbmRlckNvbnRleHQgKFxuICBkYXRhLFxuICBwcm9wcyxcbiAgY2hpbGRyZW4sXG4gIHBhcmVudCxcbiAgQ3RvclxuKSB7XG4gIHZhciBvcHRpb25zID0gQ3Rvci5vcHRpb25zO1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMubGlzdGVuZXJzID0gZGF0YS5vbiB8fCBlbXB0eU9iamVjdDtcbiAgdGhpcy5pbmplY3Rpb25zID0gcmVzb2x2ZUluamVjdChvcHRpb25zLmluamVjdCwgcGFyZW50KTtcbiAgdGhpcy5zbG90cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmVTbG90cyhjaGlsZHJlbiwgcGFyZW50KTsgfTtcblxuICAvLyBlbnN1cmUgdGhlIGNyZWF0ZUVsZW1lbnQgZnVuY3Rpb24gaW4gZnVuY3Rpb25hbCBjb21wb25lbnRzXG4gIC8vIGdldHMgYSB1bmlxdWUgY29udGV4dCAtIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciBjb3JyZWN0IG5hbWVkIHNsb3QgY2hlY2tcbiAgdmFyIGNvbnRleHRWbSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgdmFyIGlzQ29tcGlsZWQgPSBpc1RydWUob3B0aW9ucy5fY29tcGlsZWQpO1xuICB2YXIgbmVlZE5vcm1hbGl6YXRpb24gPSAhaXNDb21waWxlZDtcblxuICAvLyBzdXBwb3J0IGZvciBjb21waWxlZCBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChpc0NvbXBpbGVkKSB7XG4gICAgLy8gZXhwb3NpbmcgJG9wdGlvbnMgZm9yIHJlbmRlclN0YXRpYygpXG4gICAgdGhpcy4kb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgLy8gcHJlLXJlc29sdmUgc2xvdHMgZm9yIHJlbmRlclNsb3QoKVxuICAgIHRoaXMuJHNsb3RzID0gdGhpcy5zbG90cygpO1xuICAgIHRoaXMuJHNjb3BlZFNsb3RzID0gZGF0YS5zY29wZWRTbG90cyB8fCBlbXB0eU9iamVjdDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLl9zY29wZUlkKSB7XG4gICAgdGhpcy5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7XG4gICAgICB2YXIgdm5vZGUgPSBjcmVhdGVFbGVtZW50KGNvbnRleHRWbSwgYSwgYiwgYywgZCwgbmVlZE5vcm1hbGl6YXRpb24pO1xuICAgICAgaWYgKHZub2RlKSB7XG4gICAgICAgIHZub2RlLmZuU2NvcGVJZCA9IG9wdGlvbnMuX3Njb3BlSWQ7XG4gICAgICAgIHZub2RlLmZuQ29udGV4dCA9IHBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bm9kZVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KGNvbnRleHRWbSwgYSwgYiwgYywgZCwgbmVlZE5vcm1hbGl6YXRpb24pOyB9O1xuICB9XG59XG5cbmluc3RhbGxSZW5kZXJIZWxwZXJzKEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0LnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQgKFxuICBDdG9yLFxuICBwcm9wc0RhdGEsXG4gIGRhdGEsXG4gIGNvbnRleHRWbSxcbiAgY2hpbGRyZW5cbikge1xuICB2YXIgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucztcbiAgdmFyIHByb3BzID0ge307XG4gIHZhciBwcm9wT3B0aW9ucyA9IG9wdGlvbnMucHJvcHM7XG4gIGlmIChpc0RlZihwcm9wT3B0aW9ucykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcE9wdGlvbnMpIHtcbiAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhIHx8IGVtcHR5T2JqZWN0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRGVmKGRhdGEuYXR0cnMpKSB7IG1lcmdlUHJvcHMocHJvcHMsIGRhdGEuYXR0cnMpOyB9XG4gICAgaWYgKGlzRGVmKGRhdGEucHJvcHMpKSB7IG1lcmdlUHJvcHMocHJvcHMsIGRhdGEucHJvcHMpOyB9XG4gIH1cblxuICB2YXIgcmVuZGVyQ29udGV4dCA9IG5ldyBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dChcbiAgICBkYXRhLFxuICAgIHByb3BzLFxuICAgIGNoaWxkcmVuLFxuICAgIGNvbnRleHRWbSxcbiAgICBDdG9yXG4gICk7XG5cbiAgdmFyIHZub2RlID0gb3B0aW9ucy5yZW5kZXIuY2FsbChudWxsLCByZW5kZXJDb250ZXh0Ll9jLCByZW5kZXJDb250ZXh0KTtcblxuICBpZiAodm5vZGUgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgIHZub2RlLmZuQ29udGV4dCA9IGNvbnRleHRWbTtcbiAgICB2bm9kZS5mbk9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmIChkYXRhLnNsb3QpIHtcbiAgICAgICh2bm9kZS5kYXRhIHx8ICh2bm9kZS5kYXRhID0ge30pKS5zbG90ID0gZGF0YS5zbG90O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2bm9kZVxufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzICh0bywgZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgIHRvW2NhbWVsaXplKGtleSldID0gZnJvbVtrZXldO1xuICB9XG59XG5cbi8qICAqL1xuXG4vLyBob29rcyB0byBiZSBpbnZva2VkIG9uIGNvbXBvbmVudCBWTm9kZXMgZHVyaW5nIHBhdGNoXG52YXIgY29tcG9uZW50Vk5vZGVIb29rcyA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCAoXG4gICAgdm5vZGUsXG4gICAgaHlkcmF0aW5nLFxuICAgIHBhcmVudEVsbSxcbiAgICByZWZFbG1cbiAgKSB7XG4gICAgaWYgKCF2bm9kZS5jb21wb25lbnRJbnN0YW5jZSB8fCB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHZhciBjaGlsZCA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VGb3JWbm9kZShcbiAgICAgICAgdm5vZGUsXG4gICAgICAgIGFjdGl2ZUluc3RhbmNlLFxuICAgICAgICBwYXJlbnRFbG0sXG4gICAgICAgIHJlZkVsbVxuICAgICAgKTtcbiAgICAgIGNoaWxkLiRtb3VudChoeWRyYXRpbmcgPyB2bm9kZS5lbG0gOiB1bmRlZmluZWQsIGh5ZHJhdGluZyk7XG4gICAgfSBlbHNlIGlmICh2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgLy8ga2VwdC1hbGl2ZSBjb21wb25lbnRzLCB0cmVhdCBhcyBhIHBhdGNoXG4gICAgICB2YXIgbW91bnRlZE5vZGUgPSB2bm9kZTsgLy8gd29yayBhcm91bmQgZmxvd1xuICAgICAgY29tcG9uZW50Vk5vZGVIb29rcy5wcmVwYXRjaChtb3VudGVkTm9kZSwgbW91bnRlZE5vZGUpO1xuICAgIH1cbiAgfSxcblxuICBwcmVwYXRjaDogZnVuY3Rpb24gcHJlcGF0Y2ggKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvcHRpb25zID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICB2YXIgY2hpbGQgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IG9sZFZub2RlLmNvbXBvbmVudEluc3RhbmNlO1xuICAgIHVwZGF0ZUNoaWxkQ29tcG9uZW50KFxuICAgICAgY2hpbGQsXG4gICAgICBvcHRpb25zLnByb3BzRGF0YSwgLy8gdXBkYXRlZCBwcm9wc1xuICAgICAgb3B0aW9ucy5saXN0ZW5lcnMsIC8vIHVwZGF0ZWQgbGlzdGVuZXJzXG4gICAgICB2bm9kZSwgLy8gbmV3IHBhcmVudCB2bm9kZVxuICAgICAgb3B0aW9ucy5jaGlsZHJlbiAvLyBuZXcgY2hpbGRyZW5cbiAgICApO1xuICB9LFxuXG4gIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0ICh2bm9kZSkge1xuICAgIHZhciBjb250ZXh0ID0gdm5vZGUuY29udGV4dDtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQpIHtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQgPSB0cnVlO1xuICAgICAgY2FsbEhvb2soY29tcG9uZW50SW5zdGFuY2UsICdtb3VudGVkJyk7XG4gICAgfVxuICAgIGlmICh2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgaWYgKGNvbnRleHQuX2lzTW91bnRlZCkge1xuICAgICAgICAvLyB2dWUtcm91dGVyIzEyMTJcbiAgICAgICAgLy8gRHVyaW5nIHVwZGF0ZXMsIGEga2VwdC1hbGl2ZSBjb21wb25lbnQncyBjaGlsZCBjb21wb25lbnRzIG1heVxuICAgICAgICAvLyBjaGFuZ2UsIHNvIGRpcmVjdGx5IHdhbGtpbmcgdGhlIHRyZWUgaGVyZSBtYXkgY2FsbCBhY3RpdmF0ZWQgaG9va3NcbiAgICAgICAgLy8gb24gaW5jb3JyZWN0IGNoaWxkcmVuLiBJbnN0ZWFkIHdlIHB1c2ggdGhlbSBpbnRvIGEgcXVldWUgd2hpY2ggd2lsbFxuICAgICAgICAvLyBiZSBwcm9jZXNzZWQgYWZ0ZXIgdGhlIHdob2xlIHBhdGNoIHByb2Nlc3MgZW5kZWQuXG4gICAgICAgIHF1ZXVlQWN0aXZhdGVkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UsIHRydWUgLyogZGlyZWN0ICovKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSAodm5vZGUpIHtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgaWYgKCF2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS4kZGVzdHJveSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgaG9va3NUb01lcmdlID0gT2JqZWN0LmtleXMoY29tcG9uZW50Vk5vZGVIb29rcyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAoXG4gIEN0b3IsXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICB0YWdcbikge1xuICBpZiAoaXNVbmRlZihDdG9yKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGJhc2VDdG9yID0gY29udGV4dC4kb3B0aW9ucy5fYmFzZTtcblxuICAvLyBwbGFpbiBvcHRpb25zIG9iamVjdDogdHVybiBpdCBpbnRvIGEgY29uc3RydWN0b3JcbiAgaWYgKGlzT2JqZWN0KEN0b3IpKSB7XG4gICAgQ3RvciA9IGJhc2VDdG9yLmV4dGVuZChDdG9yKTtcbiAgfVxuXG4gIC8vIGlmIGF0IHRoaXMgc3RhZ2UgaXQncyBub3QgYSBjb25zdHJ1Y3RvciBvciBhbiBhc3luYyBjb21wb25lbnQgZmFjdG9yeSxcbiAgLy8gcmVqZWN0LlxuICBpZiAodHlwZW9mIEN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybigoXCJJbnZhbGlkIENvbXBvbmVudCBkZWZpbml0aW9uOiBcIiArIChTdHJpbmcoQ3RvcikpKSwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gYXN5bmMgY29tcG9uZW50XG4gIHZhciBhc3luY0ZhY3Rvcnk7XG4gIGlmIChpc1VuZGVmKEN0b3IuY2lkKSkge1xuICAgIGFzeW5jRmFjdG9yeSA9IEN0b3I7XG4gICAgQ3RvciA9IHJlc29sdmVBc3luY0NvbXBvbmVudChhc3luY0ZhY3RvcnksIGJhc2VDdG9yLCBjb250ZXh0KTtcbiAgICBpZiAoQ3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyByZXR1cm4gYSBwbGFjZWhvbGRlciBub2RlIGZvciBhc3luYyBjb21wb25lbnQsIHdoaWNoIGlzIHJlbmRlcmVkXG4gICAgICAvLyBhcyBhIGNvbW1lbnQgbm9kZSBidXQgcHJlc2VydmVzIGFsbCB0aGUgcmF3IGluZm9ybWF0aW9uIGZvciB0aGUgbm9kZS5cbiAgICAgIC8vIHRoZSBpbmZvcm1hdGlvbiB3aWxsIGJlIHVzZWQgZm9yIGFzeW5jIHNlcnZlci1yZW5kZXJpbmcgYW5kIGh5ZHJhdGlvbi5cbiAgICAgIHJldHVybiBjcmVhdGVBc3luY1BsYWNlaG9sZGVyKFxuICAgICAgICBhc3luY0ZhY3RvcnksXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB0YWdcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAvLyByZXNvbHZlIGNvbnN0cnVjdG9yIG9wdGlvbnMgaW4gY2FzZSBnbG9iYWwgbWl4aW5zIGFyZSBhcHBsaWVkIGFmdGVyXG4gIC8vIGNvbXBvbmVudCBjb25zdHJ1Y3RvciBjcmVhdGlvblxuICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKEN0b3IpO1xuXG4gIC8vIHRyYW5zZm9ybSBjb21wb25lbnQgdi1tb2RlbCBkYXRhIGludG8gcHJvcHMgJiBldmVudHNcbiAgaWYgKGlzRGVmKGRhdGEubW9kZWwpKSB7XG4gICAgdHJhbnNmb3JtTW9kZWwoQ3Rvci5vcHRpb25zLCBkYXRhKTtcbiAgfVxuXG4gIC8vIGV4dHJhY3QgcHJvcHNcbiAgdmFyIHByb3BzRGF0YSA9IGV4dHJhY3RQcm9wc0Zyb21WTm9kZURhdGEoZGF0YSwgQ3RvciwgdGFnKTtcblxuICAvLyBmdW5jdGlvbmFsIGNvbXBvbmVudFxuICBpZiAoaXNUcnVlKEN0b3Iub3B0aW9ucy5mdW5jdGlvbmFsKSkge1xuICAgIHJldHVybiBjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50KEN0b3IsIHByb3BzRGF0YSwgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pXG4gIH1cblxuICAvLyBleHRyYWN0IGxpc3RlbmVycywgc2luY2UgdGhlc2UgbmVlZHMgdG8gYmUgdHJlYXRlZCBhc1xuICAvLyBjaGlsZCBjb21wb25lbnQgbGlzdGVuZXJzIGluc3RlYWQgb2YgRE9NIGxpc3RlbmVyc1xuICB2YXIgbGlzdGVuZXJzID0gZGF0YS5vbjtcbiAgLy8gcmVwbGFjZSB3aXRoIGxpc3RlbmVycyB3aXRoIC5uYXRpdmUgbW9kaWZpZXJcbiAgLy8gc28gaXQgZ2V0cyBwcm9jZXNzZWQgZHVyaW5nIHBhcmVudCBjb21wb25lbnQgcGF0Y2guXG4gIGRhdGEub24gPSBkYXRhLm5hdGl2ZU9uO1xuXG4gIGlmIChpc1RydWUoQ3Rvci5vcHRpb25zLmFic3RyYWN0KSkge1xuICAgIC8vIGFic3RyYWN0IGNvbXBvbmVudHMgZG8gbm90IGtlZXAgYW55dGhpbmdcbiAgICAvLyBvdGhlciB0aGFuIHByb3BzICYgbGlzdGVuZXJzICYgc2xvdFxuXG4gICAgLy8gd29yayBhcm91bmQgZmxvd1xuICAgIHZhciBzbG90ID0gZGF0YS5zbG90O1xuICAgIGRhdGEgPSB7fTtcbiAgICBpZiAoc2xvdCkge1xuICAgICAgZGF0YS5zbG90ID0gc2xvdDtcbiAgICB9XG4gIH1cblxuICAvLyBtZXJnZSBjb21wb25lbnQgbWFuYWdlbWVudCBob29rcyBvbnRvIHRoZSBwbGFjZWhvbGRlciBub2RlXG4gIG1lcmdlSG9va3MoZGF0YSk7XG5cbiAgLy8gcmV0dXJuIGEgcGxhY2Vob2xkZXIgdm5vZGVcbiAgdmFyIG5hbWUgPSBDdG9yLm9wdGlvbnMubmFtZSB8fCB0YWc7XG4gIHZhciB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAoXCJ2dWUtY29tcG9uZW50LVwiICsgKEN0b3IuY2lkKSArIChuYW1lID8gKFwiLVwiICsgbmFtZSkgOiAnJykpLFxuICAgIGRhdGEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHQsXG4gICAgeyBDdG9yOiBDdG9yLCBwcm9wc0RhdGE6IHByb3BzRGF0YSwgbGlzdGVuZXJzOiBsaXN0ZW5lcnMsIHRhZzogdGFnLCBjaGlsZHJlbjogY2hpbGRyZW4gfSxcbiAgICBhc3luY0ZhY3RvcnlcbiAgKTtcbiAgcmV0dXJuIHZub2RlXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlRm9yVm5vZGUgKFxuICB2bm9kZSwgLy8gd2Uga25vdyBpdCdzIE1vdW50ZWRDb21wb25lbnRWTm9kZSBidXQgZmxvdyBkb2Vzbid0XG4gIHBhcmVudCwgLy8gYWN0aXZlSW5zdGFuY2UgaW4gbGlmZWN5Y2xlIHN0YXRlXG4gIHBhcmVudEVsbSxcbiAgcmVmRWxtXG4pIHtcbiAgdmFyIHZub2RlQ29tcG9uZW50T3B0aW9ucyA9IHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gIHZhciBvcHRpb25zID0ge1xuICAgIF9pc0NvbXBvbmVudDogdHJ1ZSxcbiAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICBwcm9wc0RhdGE6IHZub2RlQ29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGEsXG4gICAgX2NvbXBvbmVudFRhZzogdm5vZGVDb21wb25lbnRPcHRpb25zLnRhZyxcbiAgICBfcGFyZW50Vm5vZGU6IHZub2RlLFxuICAgIF9wYXJlbnRMaXN0ZW5lcnM6IHZub2RlQ29tcG9uZW50T3B0aW9ucy5saXN0ZW5lcnMsXG4gICAgX3JlbmRlckNoaWxkcmVuOiB2bm9kZUNvbXBvbmVudE9wdGlvbnMuY2hpbGRyZW4sXG4gICAgX3BhcmVudEVsbTogcGFyZW50RWxtIHx8IG51bGwsXG4gICAgX3JlZkVsbTogcmVmRWxtIHx8IG51bGxcbiAgfTtcbiAgLy8gY2hlY2sgaW5saW5lLXRlbXBsYXRlIHJlbmRlciBmdW5jdGlvbnNcbiAgdmFyIGlubGluZVRlbXBsYXRlID0gdm5vZGUuZGF0YS5pbmxpbmVUZW1wbGF0ZTtcbiAgaWYgKGlzRGVmKGlubGluZVRlbXBsYXRlKSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gaW5saW5lVGVtcGxhdGUucmVuZGVyO1xuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gaW5saW5lVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zO1xuICB9XG4gIHJldHVybiBuZXcgdm5vZGVDb21wb25lbnRPcHRpb25zLkN0b3Iob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gbWVyZ2VIb29rcyAoZGF0YSkge1xuICBpZiAoIWRhdGEuaG9vaykge1xuICAgIGRhdGEuaG9vayA9IHt9O1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3NUb01lcmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGhvb2tzVG9NZXJnZVtpXTtcbiAgICB2YXIgZnJvbVBhcmVudCA9IGRhdGEuaG9va1trZXldO1xuICAgIHZhciBvdXJzID0gY29tcG9uZW50Vk5vZGVIb29rc1trZXldO1xuICAgIGRhdGEuaG9va1trZXldID0gZnJvbVBhcmVudCA/IG1lcmdlSG9vayQxKG91cnMsIGZyb21QYXJlbnQpIDogb3VycztcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUhvb2skMSAob25lLCB0d28pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7XG4gICAgb25lKGEsIGIsIGMsIGQpO1xuICAgIHR3byhhLCBiLCBjLCBkKTtcbiAgfVxufVxuXG4vLyB0cmFuc2Zvcm0gY29tcG9uZW50IHYtbW9kZWwgaW5mbyAodmFsdWUgYW5kIGNhbGxiYWNrKSBpbnRvXG4vLyBwcm9wIGFuZCBldmVudCBoYW5kbGVyIHJlc3BlY3RpdmVseS5cbmZ1bmN0aW9uIHRyYW5zZm9ybU1vZGVsIChvcHRpb25zLCBkYXRhKSB7XG4gIHZhciBwcm9wID0gKG9wdGlvbnMubW9kZWwgJiYgb3B0aW9ucy5tb2RlbC5wcm9wKSB8fCAndmFsdWUnO1xuICB2YXIgZXZlbnQgPSAob3B0aW9ucy5tb2RlbCAmJiBvcHRpb25zLm1vZGVsLmV2ZW50KSB8fCAnaW5wdXQnOyhkYXRhLnByb3BzIHx8IChkYXRhLnByb3BzID0ge30pKVtwcm9wXSA9IGRhdGEubW9kZWwudmFsdWU7XG4gIHZhciBvbiA9IGRhdGEub24gfHwgKGRhdGEub24gPSB7fSk7XG4gIGlmIChpc0RlZihvbltldmVudF0pKSB7XG4gICAgb25bZXZlbnRdID0gW2RhdGEubW9kZWwuY2FsbGJhY2tdLmNvbmNhdChvbltldmVudF0pO1xuICB9IGVsc2Uge1xuICAgIG9uW2V2ZW50XSA9IGRhdGEubW9kZWwuY2FsbGJhY2s7XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBTSU1QTEVfTk9STUFMSVpFID0gMTtcbnZhciBBTFdBWVNfTk9STUFMSVpFID0gMjtcblxuLy8gd3JhcHBlciBmdW5jdGlvbiBmb3IgcHJvdmlkaW5nIGEgbW9yZSBmbGV4aWJsZSBpbnRlcmZhY2Vcbi8vIHdpdGhvdXQgZ2V0dGluZyB5ZWxsZWQgYXQgYnkgZmxvd1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCAoXG4gIGNvbnRleHQsXG4gIHRhZyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIG5vcm1hbGl6YXRpb25UeXBlLFxuICBhbHdheXNOb3JtYWxpemVcbikge1xuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSB8fCBpc1ByaW1pdGl2ZShkYXRhKSkge1xuICAgIG5vcm1hbGl6YXRpb25UeXBlID0gY2hpbGRyZW47XG4gICAgY2hpbGRyZW4gPSBkYXRhO1xuICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGlzVHJ1ZShhbHdheXNOb3JtYWxpemUpKSB7XG4gICAgbm9ybWFsaXphdGlvblR5cGUgPSBBTFdBWVNfTk9STUFMSVpFO1xuICB9XG4gIHJldHVybiBfY3JlYXRlRWxlbWVudChjb250ZXh0LCB0YWcsIGRhdGEsIGNoaWxkcmVuLCBub3JtYWxpemF0aW9uVHlwZSlcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQgKFxuICBjb250ZXh0LFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBub3JtYWxpemF0aW9uVHlwZVxuKSB7XG4gIGlmIChpc0RlZihkYXRhKSAmJiBpc0RlZigoZGF0YSkuX19vYl9fKSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgIFwiQXZvaWQgdXNpbmcgb2JzZXJ2ZWQgZGF0YSBvYmplY3QgYXMgdm5vZGUgZGF0YTogXCIgKyAoSlNPTi5zdHJpbmdpZnkoZGF0YSkpICsgXCJcXG5cIiArXG4gICAgICAnQWx3YXlzIGNyZWF0ZSBmcmVzaCB2bm9kZSBkYXRhIG9iamVjdHMgaW4gZWFjaCByZW5kZXIhJyxcbiAgICAgIGNvbnRleHRcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgfVxuICAvLyBvYmplY3Qgc3ludGF4IGluIHYtYmluZFxuICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNEZWYoZGF0YS5pcykpIHtcbiAgICB0YWcgPSBkYXRhLmlzO1xuICB9XG4gIGlmICghdGFnKSB7XG4gICAgLy8gaW4gY2FzZSBvZiBjb21wb25lbnQgOmlzIHNldCB0byBmYWxzeSB2YWx1ZVxuICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgfVxuICAvLyB3YXJuIGFnYWluc3Qgbm9uLXByaW1pdGl2ZSBrZXlcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICBpc0RlZihkYXRhKSAmJiBpc0RlZihkYXRhLmtleSkgJiYgIWlzUHJpbWl0aXZlKGRhdGEua2V5KVxuICApIHtcbiAgICB3YXJuKFxuICAgICAgJ0F2b2lkIHVzaW5nIG5vbi1wcmltaXRpdmUgdmFsdWUgYXMga2V5LCAnICtcbiAgICAgICd1c2Ugc3RyaW5nL251bWJlciB2YWx1ZSBpbnN0ZWFkLicsXG4gICAgICBjb250ZXh0XG4gICAgKTtcbiAgfVxuICAvLyBzdXBwb3J0IHNpbmdsZSBmdW5jdGlvbiBjaGlsZHJlbiBhcyBkZWZhdWx0IHNjb3BlZCBzbG90XG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJlxuICAgIHR5cGVvZiBjaGlsZHJlblswXSA9PT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICBkYXRhLnNjb3BlZFNsb3RzID0geyBkZWZhdWx0OiBjaGlsZHJlblswXSB9O1xuICAgIGNoaWxkcmVuLmxlbmd0aCA9IDA7XG4gIH1cbiAgaWYgKG5vcm1hbGl6YXRpb25UeXBlID09PSBBTFdBWVNfTk9STUFMSVpFKSB7XG4gICAgY2hpbGRyZW4gPSBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbik7XG4gIH0gZWxzZSBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IFNJTVBMRV9OT1JNQUxJWkUpIHtcbiAgICBjaGlsZHJlbiA9IHNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKTtcbiAgfVxuICB2YXIgdm5vZGUsIG5zO1xuICBpZiAodHlwZW9mIHRhZyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgQ3RvcjtcbiAgICBucyA9IChjb250ZXh0LiR2bm9kZSAmJiBjb250ZXh0LiR2bm9kZS5ucykgfHwgY29uZmlnLmdldFRhZ05hbWVzcGFjZSh0YWcpO1xuICAgIGlmIChjb25maWcuaXNSZXNlcnZlZFRhZyh0YWcpKSB7XG4gICAgICAvLyBwbGF0Zm9ybSBidWlsdC1pbiBlbGVtZW50c1xuICAgICAgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgICAgIGNvbmZpZy5wYXJzZVBsYXRmb3JtVGFnTmFtZSh0YWcpLCBkYXRhLCBjaGlsZHJlbixcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHRcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpc0RlZihDdG9yID0gcmVzb2x2ZUFzc2V0KGNvbnRleHQuJG9wdGlvbnMsICdjb21wb25lbnRzJywgdGFnKSkpIHtcbiAgICAgIC8vIGNvbXBvbmVudFxuICAgICAgdm5vZGUgPSBjcmVhdGVDb21wb25lbnQoQ3RvciwgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4sIHRhZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHVua25vd24gb3IgdW5saXN0ZWQgbmFtZXNwYWNlZCBlbGVtZW50c1xuICAgICAgLy8gY2hlY2sgYXQgcnVudGltZSBiZWNhdXNlIGl0IG1heSBnZXQgYXNzaWduZWQgYSBuYW1lc3BhY2Ugd2hlbiBpdHNcbiAgICAgIC8vIHBhcmVudCBub3JtYWxpemVzIGNoaWxkcmVuXG4gICAgICB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAgICAgdGFnLCBkYXRhLCBjaGlsZHJlbixcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHRcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGRpcmVjdCBjb21wb25lbnQgb3B0aW9ucyAvIGNvbnN0cnVjdG9yXG4gICAgdm5vZGUgPSBjcmVhdGVDb21wb25lbnQodGFnLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbik7XG4gIH1cbiAgaWYgKGlzRGVmKHZub2RlKSkge1xuICAgIGlmIChucykgeyBhcHBseU5TKHZub2RlLCBucyk7IH1cbiAgICByZXR1cm4gdm5vZGVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlYXRlRW1wdHlWTm9kZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlOUyAodm5vZGUsIG5zLCBmb3JjZSkge1xuICB2bm9kZS5ucyA9IG5zO1xuICBpZiAodm5vZGUudGFnID09PSAnZm9yZWlnbk9iamVjdCcpIHtcbiAgICAvLyB1c2UgZGVmYXVsdCBuYW1lc3BhY2UgaW5zaWRlIGZvcmVpZ25PYmplY3RcbiAgICBucyA9IHVuZGVmaW5lZDtcbiAgICBmb3JjZSA9IHRydWU7XG4gIH1cbiAgaWYgKGlzRGVmKHZub2RlLmNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSB2bm9kZS5jaGlsZHJlbltpXTtcbiAgICAgIGlmIChpc0RlZihjaGlsZC50YWcpICYmIChpc1VuZGVmKGNoaWxkLm5zKSB8fCBpc1RydWUoZm9yY2UpKSkge1xuICAgICAgICBhcHBseU5TKGNoaWxkLCBucywgZm9yY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdFJlbmRlciAodm0pIHtcbiAgdm0uX3Zub2RlID0gbnVsbDsgLy8gdGhlIHJvb3Qgb2YgdGhlIGNoaWxkIHRyZWVcbiAgdm0uX3N0YXRpY1RyZWVzID0gbnVsbDsgLy8gdi1vbmNlIGNhY2hlZCB0cmVlc1xuICB2YXIgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xuICB2YXIgcGFyZW50Vm5vZGUgPSB2bS4kdm5vZGUgPSBvcHRpb25zLl9wYXJlbnRWbm9kZTsgLy8gdGhlIHBsYWNlaG9sZGVyIG5vZGUgaW4gcGFyZW50IHRyZWVcbiAgdmFyIHJlbmRlckNvbnRleHQgPSBwYXJlbnRWbm9kZSAmJiBwYXJlbnRWbm9kZS5jb250ZXh0O1xuICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMob3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4sIHJlbmRlckNvbnRleHQpO1xuICB2bS4kc2NvcGVkU2xvdHMgPSBlbXB0eU9iamVjdDtcbiAgLy8gYmluZCB0aGUgY3JlYXRlRWxlbWVudCBmbiB0byB0aGlzIGluc3RhbmNlXG4gIC8vIHNvIHRoYXQgd2UgZ2V0IHByb3BlciByZW5kZXIgY29udGV4dCBpbnNpZGUgaXQuXG4gIC8vIGFyZ3Mgb3JkZXI6IHRhZywgZGF0YSwgY2hpbGRyZW4sIG5vcm1hbGl6YXRpb25UeXBlLCBhbHdheXNOb3JtYWxpemVcbiAgLy8gaW50ZXJuYWwgdmVyc2lvbiBpcyB1c2VkIGJ5IHJlbmRlciBmdW5jdGlvbnMgY29tcGlsZWQgZnJvbSB0ZW1wbGF0ZXNcbiAgdm0uX2MgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudCh2bSwgYSwgYiwgYywgZCwgZmFsc2UpOyB9O1xuICAvLyBub3JtYWxpemF0aW9uIGlzIGFsd2F5cyBhcHBsaWVkIGZvciB0aGUgcHVibGljIHZlcnNpb24sIHVzZWQgaW5cbiAgLy8gdXNlci13cml0dGVuIHJlbmRlciBmdW5jdGlvbnMuXG4gIHZtLiRjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodm0sIGEsIGIsIGMsIGQsIHRydWUpOyB9O1xuXG4gIC8vICRhdHRycyAmICRsaXN0ZW5lcnMgYXJlIGV4cG9zZWQgZm9yIGVhc2llciBIT0MgY3JlYXRpb24uXG4gIC8vIHRoZXkgbmVlZCB0byBiZSByZWFjdGl2ZSBzbyB0aGF0IEhPQ3MgdXNpbmcgdGhlbSBhcmUgYWx3YXlzIHVwZGF0ZWRcbiAgdmFyIHBhcmVudERhdGEgPSBwYXJlbnRWbm9kZSAmJiBwYXJlbnRWbm9kZS5kYXRhO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZGVmaW5lUmVhY3RpdmUodm0sICckYXR0cnMnLCBwYXJlbnREYXRhICYmIHBhcmVudERhdGEuYXR0cnMgfHwgZW1wdHlPYmplY3QsIGZ1bmN0aW9uICgpIHtcbiAgICAgICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgJiYgd2FybihcIiRhdHRycyBpcyByZWFkb25seS5cIiwgdm0pO1xuICAgIH0sIHRydWUpO1xuICAgIGRlZmluZVJlYWN0aXZlKHZtLCAnJGxpc3RlbmVycycsIG9wdGlvbnMuX3BhcmVudExpc3RlbmVycyB8fCBlbXB0eU9iamVjdCwgZnVuY3Rpb24gKCkge1xuICAgICAgIWlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCAmJiB3YXJuKFwiJGxpc3RlbmVycyBpcyByZWFkb25seS5cIiwgdm0pO1xuICAgIH0sIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGRlZmluZVJlYWN0aXZlKHZtLCAnJGF0dHJzJywgcGFyZW50RGF0YSAmJiBwYXJlbnREYXRhLmF0dHJzIHx8IGVtcHR5T2JqZWN0LCBudWxsLCB0cnVlKTtcbiAgICBkZWZpbmVSZWFjdGl2ZSh2bSwgJyRsaXN0ZW5lcnMnLCBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3QsIG51bGwsIHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlck1peGluIChWdWUpIHtcbiAgLy8gaW5zdGFsbCBydW50aW1lIGNvbnZlbmllbmNlIGhlbHBlcnNcbiAgaW5zdGFsbFJlbmRlckhlbHBlcnMoVnVlLnByb3RvdHlwZSk7XG5cbiAgVnVlLnByb3RvdHlwZS4kbmV4dFRpY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICByZXR1cm4gbmV4dFRpY2soZm4sIHRoaXMpXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdmFyIHJlZiA9IHZtLiRvcHRpb25zO1xuICAgIHZhciByZW5kZXIgPSByZWYucmVuZGVyO1xuICAgIHZhciBfcGFyZW50Vm5vZGUgPSByZWYuX3BhcmVudFZub2RlO1xuXG4gICAgaWYgKHZtLl9pc01vdW50ZWQpIHtcbiAgICAgIC8vIGlmIHRoZSBwYXJlbnQgZGlkbid0IHVwZGF0ZSwgdGhlIHNsb3Qgbm9kZXMgd2lsbCBiZSB0aGUgb25lcyBmcm9tXG4gICAgICAvLyBsYXN0IHJlbmRlci4gVGhleSBuZWVkIHRvIGJlIGNsb25lZCB0byBlbnN1cmUgXCJmcmVzaG5lc3NcIiBmb3IgdGhpcyByZW5kZXIuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdm0uJHNsb3RzKSB7XG4gICAgICAgIHZhciBzbG90ID0gdm0uJHNsb3RzW2tleV07XG4gICAgICAgIC8vIF9yZW5kZXJlZCBpcyBhIGZsYWcgYWRkZWQgYnkgcmVuZGVyU2xvdCwgYnV0IG1heSBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBpZiB0aGUgc2xvdCBpcyBwYXNzZWQgZnJvbSBtYW51YWxseSB3cml0dGVuIHJlbmRlciBmdW5jdGlvbnNcbiAgICAgICAgaWYgKHNsb3QuX3JlbmRlcmVkIHx8IChzbG90WzBdICYmIHNsb3RbMF0uZWxtKSkge1xuICAgICAgICAgIHZtLiRzbG90c1trZXldID0gY2xvbmVWTm9kZXMoc2xvdCwgdHJ1ZSAvKiBkZWVwICovKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZtLiRzY29wZWRTbG90cyA9IChfcGFyZW50Vm5vZGUgJiYgX3BhcmVudFZub2RlLmRhdGEuc2NvcGVkU2xvdHMpIHx8IGVtcHR5T2JqZWN0O1xuXG4gICAgLy8gc2V0IHBhcmVudCB2bm9kZS4gdGhpcyBhbGxvd3MgcmVuZGVyIGZ1bmN0aW9ucyB0byBoYXZlIGFjY2Vzc1xuICAgIC8vIHRvIHRoZSBkYXRhIG9uIHRoZSBwbGFjZWhvbGRlciBub2RlLlxuICAgIHZtLiR2bm9kZSA9IF9wYXJlbnRWbm9kZTtcbiAgICAvLyByZW5kZXIgc2VsZlxuICAgIHZhciB2bm9kZTtcbiAgICB0cnkge1xuICAgICAgdm5vZGUgPSByZW5kZXIuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXJcIik7XG4gICAgICAvLyByZXR1cm4gZXJyb3IgcmVuZGVyIHJlc3VsdCxcbiAgICAgIC8vIG9yIHByZXZpb3VzIHZub2RlIHRvIHByZXZlbnQgcmVuZGVyIGVycm9yIGNhdXNpbmcgYmxhbmsgY29tcG9uZW50XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHZtLiRvcHRpb25zLnJlbmRlckVycm9yKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZub2RlID0gdm0uJG9wdGlvbnMucmVuZGVyRXJyb3IuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50LCBlKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXJFcnJvclwiKTtcbiAgICAgICAgICAgIHZub2RlID0gdm0uX3Zub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2bm9kZSA9IHZtLl92bm9kZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBlbXB0eSB2bm9kZSBpbiBjYXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gZXJyb3JlZCBvdXRcbiAgICBpZiAoISh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnTXVsdGlwbGUgcm9vdCBub2RlcyByZXR1cm5lZCBmcm9tIHJlbmRlciBmdW5jdGlvbi4gUmVuZGVyIGZ1bmN0aW9uICcgK1xuICAgICAgICAgICdzaG91bGQgcmV0dXJuIGEgc2luZ2xlIHJvb3Qgbm9kZS4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB2bm9kZSA9IGNyZWF0ZUVtcHR5Vk5vZGUoKTtcbiAgICB9XG4gICAgLy8gc2V0IHBhcmVudFxuICAgIHZub2RlLnBhcmVudCA9IF9wYXJlbnRWbm9kZTtcbiAgICByZXR1cm4gdm5vZGVcbiAgfTtcbn1cblxuLyogICovXG5cbnZhciB1aWQgPSAwO1xuXG5mdW5jdGlvbiBpbml0TWl4aW4gKFZ1ZSkge1xuICBWdWUucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIC8vIGEgdWlkXG4gICAgdm0uX3VpZCA9IHVpZCsrO1xuXG4gICAgdmFyIHN0YXJ0VGFnLCBlbmRUYWc7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLnBlcmZvcm1hbmNlICYmIG1hcmspIHtcbiAgICAgIHN0YXJ0VGFnID0gXCJ2dWUtcGVyZi1zdGFydDpcIiArICh2bS5fdWlkKTtcbiAgICAgIGVuZFRhZyA9IFwidnVlLXBlcmYtZW5kOlwiICsgKHZtLl91aWQpO1xuICAgICAgbWFyayhzdGFydFRhZyk7XG4gICAgfVxuXG4gICAgLy8gYSBmbGFnIHRvIGF2b2lkIHRoaXMgYmVpbmcgb2JzZXJ2ZWRcbiAgICB2bS5faXNWdWUgPSB0cnVlO1xuICAgIC8vIG1lcmdlIG9wdGlvbnNcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLl9pc0NvbXBvbmVudCkge1xuICAgICAgLy8gb3B0aW1pemUgaW50ZXJuYWwgY29tcG9uZW50IGluc3RhbnRpYXRpb25cbiAgICAgIC8vIHNpbmNlIGR5bmFtaWMgb3B0aW9ucyBtZXJnaW5nIGlzIHByZXR0eSBzbG93LCBhbmQgbm9uZSBvZiB0aGVcbiAgICAgIC8vIGludGVybmFsIGNvbXBvbmVudCBvcHRpb25zIG5lZWRzIHNwZWNpYWwgdHJlYXRtZW50LlxuICAgICAgaW5pdEludGVybmFsQ29tcG9uZW50KHZtLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdm0uJG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG4gICAgICAgIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnModm0uY29uc3RydWN0b3IpLFxuICAgICAgICBvcHRpb25zIHx8IHt9LFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaW5pdFByb3h5KHZtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdm0uX3JlbmRlclByb3h5ID0gdm07XG4gICAgfVxuICAgIC8vIGV4cG9zZSByZWFsIHNlbGZcbiAgICB2bS5fc2VsZiA9IHZtO1xuICAgIGluaXRMaWZlY3ljbGUodm0pO1xuICAgIGluaXRFdmVudHModm0pO1xuICAgIGluaXRSZW5kZXIodm0pO1xuICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlQ3JlYXRlJyk7XG4gICAgaW5pdEluamVjdGlvbnModm0pOyAvLyByZXNvbHZlIGluamVjdGlvbnMgYmVmb3JlIGRhdGEvcHJvcHNcbiAgICBpbml0U3RhdGUodm0pO1xuICAgIGluaXRQcm92aWRlKHZtKTsgLy8gcmVzb2x2ZSBwcm92aWRlIGFmdGVyIGRhdGEvcHJvcHNcbiAgICBjYWxsSG9vayh2bSwgJ2NyZWF0ZWQnKTtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBtYXJrKSB7XG4gICAgICB2bS5fbmFtZSA9IGZvcm1hdENvbXBvbmVudE5hbWUodm0sIGZhbHNlKTtcbiAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgIG1lYXN1cmUoKFwidnVlIFwiICsgKHZtLl9uYW1lKSArIFwiIGluaXRcIiksIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgIH1cblxuICAgIGlmICh2bS4kb3B0aW9ucy5lbCkge1xuICAgICAgdm0uJG1vdW50KHZtLiRvcHRpb25zLmVsKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGluaXRJbnRlcm5hbENvbXBvbmVudCAodm0sIG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSB2bS4kb3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodm0uY29uc3RydWN0b3Iub3B0aW9ucyk7XG4gIC8vIGRvaW5nIHRoaXMgYmVjYXVzZSBpdCdzIGZhc3RlciB0aGFuIGR5bmFtaWMgZW51bWVyYXRpb24uXG4gIG9wdHMucGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XG4gIG9wdHMucHJvcHNEYXRhID0gb3B0aW9ucy5wcm9wc0RhdGE7XG4gIG9wdHMuX3BhcmVudFZub2RlID0gb3B0aW9ucy5fcGFyZW50Vm5vZGU7XG4gIG9wdHMuX3BhcmVudExpc3RlbmVycyA9IG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgb3B0cy5fcmVuZGVyQ2hpbGRyZW4gPSBvcHRpb25zLl9yZW5kZXJDaGlsZHJlbjtcbiAgb3B0cy5fY29tcG9uZW50VGFnID0gb3B0aW9ucy5fY29tcG9uZW50VGFnO1xuICBvcHRzLl9wYXJlbnRFbG0gPSBvcHRpb25zLl9wYXJlbnRFbG07XG4gIG9wdHMuX3JlZkVsbSA9IG9wdGlvbnMuX3JlZkVsbTtcbiAgaWYgKG9wdGlvbnMucmVuZGVyKSB7XG4gICAgb3B0cy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlcjtcbiAgICBvcHRzLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMgKEN0b3IpIHtcbiAgdmFyIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gIGlmIChDdG9yLnN1cGVyKSB7XG4gICAgdmFyIHN1cGVyT3B0aW9ucyA9IHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMoQ3Rvci5zdXBlcik7XG4gICAgdmFyIGNhY2hlZFN1cGVyT3B0aW9ucyA9IEN0b3Iuc3VwZXJPcHRpb25zO1xuICAgIGlmIChzdXBlck9wdGlvbnMgIT09IGNhY2hlZFN1cGVyT3B0aW9ucykge1xuICAgICAgLy8gc3VwZXIgb3B0aW9uIGNoYW5nZWQsXG4gICAgICAvLyBuZWVkIHRvIHJlc29sdmUgbmV3IG9wdGlvbnMuXG4gICAgICBDdG9yLnN1cGVyT3B0aW9ucyA9IHN1cGVyT3B0aW9ucztcbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBhbnkgbGF0ZS1tb2RpZmllZC9hdHRhY2hlZCBvcHRpb25zICgjNDk3NilcbiAgICAgIHZhciBtb2RpZmllZE9wdGlvbnMgPSByZXNvbHZlTW9kaWZpZWRPcHRpb25zKEN0b3IpO1xuICAgICAgLy8gdXBkYXRlIGJhc2UgZXh0ZW5kIG9wdGlvbnNcbiAgICAgIGlmIChtb2RpZmllZE9wdGlvbnMpIHtcbiAgICAgICAgZXh0ZW5kKEN0b3IuZXh0ZW5kT3B0aW9ucywgbW9kaWZpZWRPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoc3VwZXJPcHRpb25zLCBDdG9yLmV4dGVuZE9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMubmFtZSkge1xuICAgICAgICBvcHRpb25zLmNvbXBvbmVudHNbb3B0aW9ucy5uYW1lXSA9IEN0b3I7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvcHRpb25zXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVNb2RpZmllZE9wdGlvbnMgKEN0b3IpIHtcbiAgdmFyIG1vZGlmaWVkO1xuICB2YXIgbGF0ZXN0ID0gQ3Rvci5vcHRpb25zO1xuICB2YXIgZXh0ZW5kZWQgPSBDdG9yLmV4dGVuZE9wdGlvbnM7XG4gIHZhciBzZWFsZWQgPSBDdG9yLnNlYWxlZE9wdGlvbnM7XG4gIGZvciAodmFyIGtleSBpbiBsYXRlc3QpIHtcbiAgICBpZiAobGF0ZXN0W2tleV0gIT09IHNlYWxlZFtrZXldKSB7XG4gICAgICBpZiAoIW1vZGlmaWVkKSB7IG1vZGlmaWVkID0ge307IH1cbiAgICAgIG1vZGlmaWVkW2tleV0gPSBkZWR1cGUobGF0ZXN0W2tleV0sIGV4dGVuZGVkW2tleV0sIHNlYWxlZFtrZXldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vZGlmaWVkXG59XG5cbmZ1bmN0aW9uIGRlZHVwZSAobGF0ZXN0LCBleHRlbmRlZCwgc2VhbGVkKSB7XG4gIC8vIGNvbXBhcmUgbGF0ZXN0IGFuZCBzZWFsZWQgdG8gZW5zdXJlIGxpZmVjeWNsZSBob29rcyB3b24ndCBiZSBkdXBsaWNhdGVkXG4gIC8vIGJldHdlZW4gbWVyZ2VzXG4gIGlmIChBcnJheS5pc0FycmF5KGxhdGVzdCkpIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgc2VhbGVkID0gQXJyYXkuaXNBcnJheShzZWFsZWQpID8gc2VhbGVkIDogW3NlYWxlZF07XG4gICAgZXh0ZW5kZWQgPSBBcnJheS5pc0FycmF5KGV4dGVuZGVkKSA/IGV4dGVuZGVkIDogW2V4dGVuZGVkXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGVzdC5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gcHVzaCBvcmlnaW5hbCBvcHRpb25zIGFuZCBub3Qgc2VhbGVkIG9wdGlvbnMgdG8gZXhjbHVkZSBkdXBsaWNhdGVkIG9wdGlvbnNcbiAgICAgIGlmIChleHRlbmRlZC5pbmRleE9mKGxhdGVzdFtpXSkgPj0gMCB8fCBzZWFsZWQuaW5kZXhPZihsYXRlc3RbaV0pIDwgMCkge1xuICAgICAgICByZXMucHVzaChsYXRlc3RbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxhdGVzdFxuICB9XG59XG5cbmZ1bmN0aW9uIFZ1ZSQzIChvcHRpb25zKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgISh0aGlzIGluc3RhbmNlb2YgVnVlJDMpXG4gICkge1xuICAgIHdhcm4oJ1Z1ZSBpcyBhIGNvbnN0cnVjdG9yIGFuZCBzaG91bGQgYmUgY2FsbGVkIHdpdGggdGhlIGBuZXdgIGtleXdvcmQnKTtcbiAgfVxuICB0aGlzLl9pbml0KG9wdGlvbnMpO1xufVxuXG5pbml0TWl4aW4oVnVlJDMpO1xuc3RhdGVNaXhpbihWdWUkMyk7XG5ldmVudHNNaXhpbihWdWUkMyk7XG5saWZlY3ljbGVNaXhpbihWdWUkMyk7XG5yZW5kZXJNaXhpbihWdWUkMyk7XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0VXNlIChWdWUpIHtcbiAgVnVlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICB2YXIgaW5zdGFsbGVkUGx1Z2lucyA9ICh0aGlzLl9pbnN0YWxsZWRQbHVnaW5zIHx8ICh0aGlzLl9pbnN0YWxsZWRQbHVnaW5zID0gW10pKTtcbiAgICBpZiAoaW5zdGFsbGVkUGx1Z2lucy5pbmRleE9mKHBsdWdpbikgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvLyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgaWYgKHR5cGVvZiBwbHVnaW4uaW5zdGFsbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcGx1Z2luLmluc3RhbGwuYXBwbHkocGx1Z2luLCBhcmdzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHBsdWdpbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgaW5zdGFsbGVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XG4gICAgcmV0dXJuIHRoaXNcbiAgfTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRNaXhpbiQxIChWdWUpIHtcbiAgVnVlLm1peGluID0gZnVuY3Rpb24gKG1peGluKSB7XG4gICAgdGhpcy5vcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMub3B0aW9ucywgbWl4aW4pO1xuICAgIHJldHVybiB0aGlzXG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0RXh0ZW5kIChWdWUpIHtcbiAgLyoqXG4gICAqIEVhY2ggaW5zdGFuY2UgY29uc3RydWN0b3IsIGluY2x1ZGluZyBWdWUsIGhhcyBhIHVuaXF1ZVxuICAgKiBjaWQuIFRoaXMgZW5hYmxlcyB1cyB0byBjcmVhdGUgd3JhcHBlZCBcImNoaWxkXG4gICAqIGNvbnN0cnVjdG9yc1wiIGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlIGFuZCBjYWNoZSB0aGVtLlxuICAgKi9cbiAgVnVlLmNpZCA9IDA7XG4gIHZhciBjaWQgPSAxO1xuXG4gIC8qKlxuICAgKiBDbGFzcyBpbmhlcml0YW5jZVxuICAgKi9cbiAgVnVlLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbmRPcHRpb25zKSB7XG4gICAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge307XG4gICAgdmFyIFN1cGVyID0gdGhpcztcbiAgICB2YXIgU3VwZXJJZCA9IFN1cGVyLmNpZDtcbiAgICB2YXIgY2FjaGVkQ3RvcnMgPSBleHRlbmRPcHRpb25zLl9DdG9yIHx8IChleHRlbmRPcHRpb25zLl9DdG9yID0ge30pO1xuICAgIGlmIChjYWNoZWRDdG9yc1tTdXBlcklkXSkge1xuICAgICAgcmV0dXJuIGNhY2hlZEN0b3JzW1N1cGVySWRdXG4gICAgfVxuXG4gICAgdmFyIG5hbWUgPSBleHRlbmRPcHRpb25zLm5hbWUgfHwgU3VwZXIub3B0aW9ucy5uYW1lO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoIS9eW2EtekEtWl1bXFx3LV0qJC8udGVzdChuYW1lKSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdJbnZhbGlkIGNvbXBvbmVudCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiLiBDb21wb25lbnQgbmFtZXMgJyArXG4gICAgICAgICAgJ2NhbiBvbmx5IGNvbnRhaW4gYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgYW5kIHRoZSBoeXBoZW4sICcgK1xuICAgICAgICAgICdhbmQgbXVzdCBzdGFydCB3aXRoIGEgbGV0dGVyLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgU3ViID0gZnVuY3Rpb24gVnVlQ29tcG9uZW50IChvcHRpb25zKSB7XG4gICAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuICAgIH07XG4gICAgU3ViLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXIucHJvdG90eXBlKTtcbiAgICBTdWIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViO1xuICAgIFN1Yi5jaWQgPSBjaWQrKztcbiAgICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcbiAgICAgIFN1cGVyLm9wdGlvbnMsXG4gICAgICBleHRlbmRPcHRpb25zXG4gICAgKTtcbiAgICBTdWJbJ3N1cGVyJ10gPSBTdXBlcjtcblxuICAgIC8vIEZvciBwcm9wcyBhbmQgY29tcHV0ZWQgcHJvcGVydGllcywgd2UgZGVmaW5lIHRoZSBwcm94eSBnZXR0ZXJzIG9uXG4gICAgLy8gdGhlIFZ1ZSBpbnN0YW5jZXMgYXQgZXh0ZW5zaW9uIHRpbWUsIG9uIHRoZSBleHRlbmRlZCBwcm90b3R5cGUuIFRoaXNcbiAgICAvLyBhdm9pZHMgT2JqZWN0LmRlZmluZVByb3BlcnR5IGNhbGxzIGZvciBlYWNoIGluc3RhbmNlIGNyZWF0ZWQuXG4gICAgaWYgKFN1Yi5vcHRpb25zLnByb3BzKSB7XG4gICAgICBpbml0UHJvcHMkMShTdWIpO1xuICAgIH1cbiAgICBpZiAoU3ViLm9wdGlvbnMuY29tcHV0ZWQpIHtcbiAgICAgIGluaXRDb21wdXRlZCQxKFN1Yik7XG4gICAgfVxuXG4gICAgLy8gYWxsb3cgZnVydGhlciBleHRlbnNpb24vbWl4aW4vcGx1Z2luIHVzYWdlXG4gICAgU3ViLmV4dGVuZCA9IFN1cGVyLmV4dGVuZDtcbiAgICBTdWIubWl4aW4gPSBTdXBlci5taXhpbjtcbiAgICBTdWIudXNlID0gU3VwZXIudXNlO1xuXG4gICAgLy8gY3JlYXRlIGFzc2V0IHJlZ2lzdGVycywgc28gZXh0ZW5kZWQgY2xhc3Nlc1xuICAgIC8vIGNhbiBoYXZlIHRoZWlyIHByaXZhdGUgYXNzZXRzIHRvby5cbiAgICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBTdWJbdHlwZV0gPSBTdXBlclt0eXBlXTtcbiAgICB9KTtcbiAgICAvLyBlbmFibGUgcmVjdXJzaXZlIHNlbGYtbG9va3VwXG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIFN1Yi5vcHRpb25zLmNvbXBvbmVudHNbbmFtZV0gPSBTdWI7XG4gICAgfVxuXG4gICAgLy8ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgc3VwZXIgb3B0aW9ucyBhdCBleHRlbnNpb24gdGltZS5cbiAgICAvLyBsYXRlciBhdCBpbnN0YW50aWF0aW9uIHdlIGNhbiBjaGVjayBpZiBTdXBlcidzIG9wdGlvbnMgaGF2ZVxuICAgIC8vIGJlZW4gdXBkYXRlZC5cbiAgICBTdWIuc3VwZXJPcHRpb25zID0gU3VwZXIub3B0aW9ucztcbiAgICBTdWIuZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnM7XG4gICAgU3ViLnNlYWxlZE9wdGlvbnMgPSBleHRlbmQoe30sIFN1Yi5vcHRpb25zKTtcblxuICAgIC8vIGNhY2hlIGNvbnN0cnVjdG9yXG4gICAgY2FjaGVkQ3RvcnNbU3VwZXJJZF0gPSBTdWI7XG4gICAgcmV0dXJuIFN1YlxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0UHJvcHMkMSAoQ29tcCkge1xuICB2YXIgcHJvcHMgPSBDb21wLm9wdGlvbnMucHJvcHM7XG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIHByb3h5KENvbXAucHJvdG90eXBlLCBcIl9wcm9wc1wiLCBrZXkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRDb21wdXRlZCQxIChDb21wKSB7XG4gIHZhciBjb21wdXRlZCA9IENvbXAub3B0aW9ucy5jb21wdXRlZDtcbiAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgZGVmaW5lQ29tcHV0ZWQoQ29tcC5wcm90b3R5cGUsIGtleSwgY29tcHV0ZWRba2V5XSk7XG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRBc3NldFJlZ2lzdGVycyAoVnVlKSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYXNzZXQgcmVnaXN0cmF0aW9uIG1ldGhvZHMuXG4gICAqL1xuICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgVnVlW3R5cGVdID0gZnVuY3Rpb24gKFxuICAgICAgaWQsXG4gICAgICBkZWZpbml0aW9uXG4gICAgKSB7XG4gICAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGlmICh0eXBlID09PSAnY29tcG9uZW50JyAmJiBjb25maWcuaXNSZXNlcnZlZFRhZyhpZCkpIHtcbiAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICdEbyBub3QgdXNlIGJ1aWx0LWluIG9yIHJlc2VydmVkIEhUTUwgZWxlbWVudHMgYXMgY29tcG9uZW50ICcgK1xuICAgICAgICAgICAgICAnaWQ6ICcgKyBpZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnICYmIGlzUGxhaW5PYmplY3QoZGVmaW5pdGlvbikpIHtcbiAgICAgICAgICBkZWZpbml0aW9uLm5hbWUgPSBkZWZpbml0aW9uLm5hbWUgfHwgaWQ7XG4gICAgICAgICAgZGVmaW5pdGlvbiA9IHRoaXMub3B0aW9ucy5fYmFzZS5leHRlbmQoZGVmaW5pdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdkaXJlY3RpdmUnICYmIHR5cGVvZiBkZWZpbml0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGVmaW5pdGlvbiA9IHsgYmluZDogZGVmaW5pdGlvbiwgdXBkYXRlOiBkZWZpbml0aW9uIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXSA9IGRlZmluaXRpb247XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lIChvcHRzKSB7XG4gIHJldHVybiBvcHRzICYmIChvcHRzLkN0b3Iub3B0aW9ucy5uYW1lIHx8IG9wdHMudGFnKVxufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChwYXR0ZXJuLCBuYW1lKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4uaW5kZXhPZihuYW1lKSA+IC0xXG4gIH0gZWxzZSBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4uc3BsaXQoJywnKS5pbmRleE9mKG5hbWUpID4gLTFcbiAgfSBlbHNlIGlmIChpc1JlZ0V4cChwYXR0ZXJuKSkge1xuICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobmFtZSlcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gcHJ1bmVDYWNoZSAoa2VlcEFsaXZlSW5zdGFuY2UsIGZpbHRlcikge1xuICB2YXIgY2FjaGUgPSBrZWVwQWxpdmVJbnN0YW5jZS5jYWNoZTtcbiAgdmFyIGtleXMgPSBrZWVwQWxpdmVJbnN0YW5jZS5rZXlzO1xuICB2YXIgX3Zub2RlID0ga2VlcEFsaXZlSW5zdGFuY2UuX3Zub2RlO1xuICBmb3IgKHZhciBrZXkgaW4gY2FjaGUpIHtcbiAgICB2YXIgY2FjaGVkTm9kZSA9IGNhY2hlW2tleV07XG4gICAgaWYgKGNhY2hlZE5vZGUpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShjYWNoZWROb2RlLmNvbXBvbmVudE9wdGlvbnMpO1xuICAgICAgaWYgKG5hbWUgJiYgIWZpbHRlcihuYW1lKSkge1xuICAgICAgICBwcnVuZUNhY2hlRW50cnkoY2FjaGUsIGtleSwga2V5cywgX3Zub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJ1bmVDYWNoZUVudHJ5IChcbiAgY2FjaGUsXG4gIGtleSxcbiAga2V5cyxcbiAgY3VycmVudFxuKSB7XG4gIHZhciBjYWNoZWQkJDEgPSBjYWNoZVtrZXldO1xuICBpZiAoY2FjaGVkJCQxICYmICghY3VycmVudCB8fCBjYWNoZWQkJDEudGFnICE9PSBjdXJyZW50LnRhZykpIHtcbiAgICBjYWNoZWQkJDEuY29tcG9uZW50SW5zdGFuY2UuJGRlc3Ryb3koKTtcbiAgfVxuICBjYWNoZVtrZXldID0gbnVsbDtcbiAgcmVtb3ZlKGtleXMsIGtleSk7XG59XG5cbnZhciBwYXR0ZXJuVHlwZXMgPSBbU3RyaW5nLCBSZWdFeHAsIEFycmF5XTtcblxudmFyIEtlZXBBbGl2ZSA9IHtcbiAgbmFtZTogJ2tlZXAtYWxpdmUnLFxuICBhYnN0cmFjdDogdHJ1ZSxcblxuICBwcm9wczoge1xuICAgIGluY2x1ZGU6IHBhdHRlcm5UeXBlcyxcbiAgICBleGNsdWRlOiBwYXR0ZXJuVHlwZXMsXG4gICAgbWF4OiBbU3RyaW5nLCBOdW1iZXJdXG4gIH0sXG5cbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCAoKSB7XG4gICAgdGhpcy5jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5rZXlzID0gW107XG4gIH0sXG5cbiAgZGVzdHJveWVkOiBmdW5jdGlvbiBkZXN0cm95ZWQgKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMkMS5jYWNoZSkge1xuICAgICAgcHJ1bmVDYWNoZUVudHJ5KHRoaXMkMS5jYWNoZSwga2V5LCB0aGlzJDEua2V5cyk7XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaW5jbHVkZTogZnVuY3Rpb24gaW5jbHVkZSAodmFsKSB7XG4gICAgICBwcnVuZUNhY2hlKHRoaXMsIGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBtYXRjaGVzKHZhbCwgbmFtZSk7IH0pO1xuICAgIH0sXG4gICAgZXhjbHVkZTogZnVuY3Rpb24gZXhjbHVkZSAodmFsKSB7XG4gICAgICBwcnVuZUNhY2hlKHRoaXMsIGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiAhbWF0Y2hlcyh2YWwsIG5hbWUpOyB9KTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgIHZhciBzbG90ID0gdGhpcy4kc2xvdHMuZGVmYXVsdDtcbiAgICB2YXIgdm5vZGUgPSBnZXRGaXJzdENvbXBvbmVudENoaWxkKHNsb3QpO1xuICAgIHZhciBjb21wb25lbnRPcHRpb25zID0gdm5vZGUgJiYgdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICBpZiAoY29tcG9uZW50T3B0aW9ucykge1xuICAgICAgLy8gY2hlY2sgcGF0dGVyblxuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKGNvbXBvbmVudE9wdGlvbnMpO1xuICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICB2YXIgaW5jbHVkZSA9IHJlZi5pbmNsdWRlO1xuICAgICAgdmFyIGV4Y2x1ZGUgPSByZWYuZXhjbHVkZTtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gbm90IGluY2x1ZGVkXG4gICAgICAgIChpbmNsdWRlICYmICghbmFtZSB8fCAhbWF0Y2hlcyhpbmNsdWRlLCBuYW1lKSkpIHx8XG4gICAgICAgIC8vIGV4Y2x1ZGVkXG4gICAgICAgIChleGNsdWRlICYmIG5hbWUgJiYgbWF0Y2hlcyhleGNsdWRlLCBuYW1lKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdm5vZGVcbiAgICAgIH1cblxuICAgICAgdmFyIHJlZiQxID0gdGhpcztcbiAgICAgIHZhciBjYWNoZSA9IHJlZiQxLmNhY2hlO1xuICAgICAgdmFyIGtleXMgPSByZWYkMS5rZXlzO1xuICAgICAgdmFyIGtleSA9IHZub2RlLmtleSA9PSBudWxsXG4gICAgICAgIC8vIHNhbWUgY29uc3RydWN0b3IgbWF5IGdldCByZWdpc3RlcmVkIGFzIGRpZmZlcmVudCBsb2NhbCBjb21wb25lbnRzXG4gICAgICAgIC8vIHNvIGNpZCBhbG9uZSBpcyBub3QgZW5vdWdoICgjMzI2OSlcbiAgICAgICAgPyBjb21wb25lbnRPcHRpb25zLkN0b3IuY2lkICsgKGNvbXBvbmVudE9wdGlvbnMudGFnID8gKFwiOjpcIiArIChjb21wb25lbnRPcHRpb25zLnRhZykpIDogJycpXG4gICAgICAgIDogdm5vZGUua2V5O1xuICAgICAgaWYgKGNhY2hlW2tleV0pIHtcbiAgICAgICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBjYWNoZVtrZXldLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAvLyBtYWtlIGN1cnJlbnQga2V5IGZyZXNoZXN0XG4gICAgICAgIHJlbW92ZShrZXlzLCBrZXkpO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhY2hlW2tleV0gPSB2bm9kZTtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIC8vIHBydW5lIG9sZGVzdCBlbnRyeVxuICAgICAgICBpZiAodGhpcy5tYXggJiYga2V5cy5sZW5ndGggPiBwYXJzZUludCh0aGlzLm1heCkpIHtcbiAgICAgICAgICBwcnVuZUNhY2hlRW50cnkoY2FjaGUsIGtleXNbMF0sIGtleXMsIHRoaXMuX3Zub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2bm9kZS5kYXRhLmtlZXBBbGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZSB8fCAoc2xvdCAmJiBzbG90WzBdKVxuICB9XG59O1xuXG52YXIgYnVpbHRJbkNvbXBvbmVudHMgPSB7XG4gIEtlZXBBbGl2ZTogS2VlcEFsaXZlXG59O1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEdsb2JhbEFQSSAoVnVlKSB7XG4gIC8vIGNvbmZpZ1xuICB2YXIgY29uZmlnRGVmID0ge307XG4gIGNvbmZpZ0RlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWc7IH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uZmlnRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdEbyBub3QgcmVwbGFjZSB0aGUgVnVlLmNvbmZpZyBvYmplY3QsIHNldCBpbmRpdmlkdWFsIGZpZWxkcyBpbnN0ZWFkLidcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLCAnY29uZmlnJywgY29uZmlnRGVmKTtcblxuICAvLyBleHBvc2VkIHV0aWwgbWV0aG9kcy5cbiAgLy8gTk9URTogdGhlc2UgYXJlIG5vdCBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIHB1YmxpYyBBUEkgLSBhdm9pZCByZWx5aW5nIG9uXG4gIC8vIHRoZW0gdW5sZXNzIHlvdSBhcmUgYXdhcmUgb2YgdGhlIHJpc2suXG4gIFZ1ZS51dGlsID0ge1xuICAgIHdhcm46IHdhcm4sXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG4gICAgZGVmaW5lUmVhY3RpdmU6IGRlZmluZVJlYWN0aXZlXG4gIH07XG5cbiAgVnVlLnNldCA9IHNldDtcbiAgVnVlLmRlbGV0ZSA9IGRlbDtcbiAgVnVlLm5leHRUaWNrID0gbmV4dFRpY2s7XG5cbiAgVnVlLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgVnVlLm9wdGlvbnNbdHlwZSArICdzJ10gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9KTtcblxuICAvLyB0aGlzIGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIFwiYmFzZVwiIGNvbnN0cnVjdG9yIHRvIGV4dGVuZCBhbGwgcGxhaW4tb2JqZWN0XG4gIC8vIGNvbXBvbmVudHMgd2l0aCBpbiBXZWV4J3MgbXVsdGktaW5zdGFuY2Ugc2NlbmFyaW9zLlxuICBWdWUub3B0aW9ucy5fYmFzZSA9IFZ1ZTtcblxuICBleHRlbmQoVnVlLm9wdGlvbnMuY29tcG9uZW50cywgYnVpbHRJbkNvbXBvbmVudHMpO1xuXG4gIGluaXRVc2UoVnVlKTtcbiAgaW5pdE1peGluJDEoVnVlKTtcbiAgaW5pdEV4dGVuZChWdWUpO1xuICBpbml0QXNzZXRSZWdpc3RlcnMoVnVlKTtcbn1cblxuaW5pdEdsb2JhbEFQSShWdWUkMyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUkMy5wcm90b3R5cGUsICckaXNTZXJ2ZXInLCB7XG4gIGdldDogaXNTZXJ2ZXJSZW5kZXJpbmdcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlJDMucHJvdG90eXBlLCAnJHNzckNvbnRleHQnLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiB0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0XG4gIH1cbn0pO1xuXG5WdWUkMy52ZXJzaW9uID0gJzIuNS45JztcblxuLyogICovXG5cbi8vIHRoZXNlIGFyZSByZXNlcnZlZCBmb3Igd2ViIGJlY2F1c2UgdGhleSBhcmUgZGlyZWN0bHkgY29tcGlsZWQgYXdheVxuLy8gZHVyaW5nIHRlbXBsYXRlIGNvbXBpbGF0aW9uXG52YXIgaXNSZXNlcnZlZEF0dHIgPSBtYWtlTWFwKCdzdHlsZSxjbGFzcycpO1xuXG4vLyBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGJlIHVzaW5nIHByb3BzIGZvciBiaW5kaW5nXG52YXIgYWNjZXB0VmFsdWUgPSBtYWtlTWFwKCdpbnB1dCx0ZXh0YXJlYSxvcHRpb24sc2VsZWN0LHByb2dyZXNzJyk7XG52YXIgbXVzdFVzZVByb3AgPSBmdW5jdGlvbiAodGFnLCB0eXBlLCBhdHRyKSB7XG4gIHJldHVybiAoXG4gICAgKGF0dHIgPT09ICd2YWx1ZScgJiYgYWNjZXB0VmFsdWUodGFnKSkgJiYgdHlwZSAhPT0gJ2J1dHRvbicgfHxcbiAgICAoYXR0ciA9PT0gJ3NlbGVjdGVkJyAmJiB0YWcgPT09ICdvcHRpb24nKSB8fFxuICAgIChhdHRyID09PSAnY2hlY2tlZCcgJiYgdGFnID09PSAnaW5wdXQnKSB8fFxuICAgIChhdHRyID09PSAnbXV0ZWQnICYmIHRhZyA9PT0gJ3ZpZGVvJylcbiAgKVxufTtcblxudmFyIGlzRW51bWVyYXRlZEF0dHIgPSBtYWtlTWFwKCdjb250ZW50ZWRpdGFibGUsZHJhZ2dhYmxlLHNwZWxsY2hlY2snKTtcblxudmFyIGlzQm9vbGVhbkF0dHIgPSBtYWtlTWFwKFxuICAnYWxsb3dmdWxsc2NyZWVuLGFzeW5jLGF1dG9mb2N1cyxhdXRvcGxheSxjaGVja2VkLGNvbXBhY3QsY29udHJvbHMsZGVjbGFyZSwnICtcbiAgJ2RlZmF1bHQsZGVmYXVsdGNoZWNrZWQsZGVmYXVsdG11dGVkLGRlZmF1bHRzZWxlY3RlZCxkZWZlcixkaXNhYmxlZCwnICtcbiAgJ2VuYWJsZWQsZm9ybW5vdmFsaWRhdGUsaGlkZGVuLGluZGV0ZXJtaW5hdGUsaW5lcnQsaXNtYXAsaXRlbXNjb3BlLGxvb3AsbXVsdGlwbGUsJyArXG4gICdtdXRlZCxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3ZhbGlkYXRlLG5vd3JhcCxvcGVuLHBhdXNlb25leGl0LHJlYWRvbmx5LCcgK1xuICAncmVxdWlyZWQscmV2ZXJzZWQsc2NvcGVkLHNlYW1sZXNzLHNlbGVjdGVkLHNvcnRhYmxlLHRyYW5zbGF0ZSwnICtcbiAgJ3RydWVzcGVlZCx0eXBlbXVzdG1hdGNoLHZpc2libGUnXG4pO1xuXG52YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcblxudmFyIGlzWGxpbmsgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmFtZS5jaGFyQXQoNSkgPT09ICc6JyAmJiBuYW1lLnNsaWNlKDAsIDUpID09PSAneGxpbmsnXG59O1xuXG52YXIgZ2V0WGxpbmtQcm9wID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIGlzWGxpbmsobmFtZSkgPyBuYW1lLnNsaWNlKDYsIG5hbWUubGVuZ3RoKSA6ICcnXG59O1xuXG52YXIgaXNGYWxzeUF0dHJWYWx1ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PSBudWxsIHx8IHZhbCA9PT0gZmFsc2Vcbn07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBnZW5DbGFzc0ZvclZub2RlICh2bm9kZSkge1xuICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gIHZhciBwYXJlbnROb2RlID0gdm5vZGU7XG4gIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcbiAgd2hpbGUgKGlzRGVmKGNoaWxkTm9kZS5jb21wb25lbnRJbnN0YW5jZSkpIHtcbiAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO1xuICAgIGlmIChjaGlsZE5vZGUuZGF0YSkge1xuICAgICAgZGF0YSA9IG1lcmdlQ2xhc3NEYXRhKGNoaWxkTm9kZS5kYXRhLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKGlzRGVmKHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudCkpIHtcbiAgICBpZiAocGFyZW50Tm9kZS5kYXRhKSB7XG4gICAgICBkYXRhID0gbWVyZ2VDbGFzc0RhdGEoZGF0YSwgcGFyZW50Tm9kZS5kYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlbmRlckNsYXNzKGRhdGEuc3RhdGljQ2xhc3MsIGRhdGEuY2xhc3MpXG59XG5cbmZ1bmN0aW9uIG1lcmdlQ2xhc3NEYXRhIChjaGlsZCwgcGFyZW50KSB7XG4gIHJldHVybiB7XG4gICAgc3RhdGljQ2xhc3M6IGNvbmNhdChjaGlsZC5zdGF0aWNDbGFzcywgcGFyZW50LnN0YXRpY0NsYXNzKSxcbiAgICBjbGFzczogaXNEZWYoY2hpbGQuY2xhc3MpXG4gICAgICA/IFtjaGlsZC5jbGFzcywgcGFyZW50LmNsYXNzXVxuICAgICAgOiBwYXJlbnQuY2xhc3NcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDbGFzcyAoXG4gIHN0YXRpY0NsYXNzLFxuICBkeW5hbWljQ2xhc3Ncbikge1xuICBpZiAoaXNEZWYoc3RhdGljQ2xhc3MpIHx8IGlzRGVmKGR5bmFtaWNDbGFzcykpIHtcbiAgICByZXR1cm4gY29uY2F0KHN0YXRpY0NsYXNzLCBzdHJpbmdpZnlDbGFzcyhkeW5hbWljQ2xhc3MpKVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBjb25jYXQgKGEsIGIpIHtcbiAgcmV0dXJuIGEgPyBiID8gKGEgKyAnICcgKyBiKSA6IGEgOiAoYiB8fCAnJylcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5Q2xhc3MgKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBzdHJpbmdpZnlBcnJheSh2YWx1ZSlcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN0cmluZ2lmeU9iamVjdCh2YWx1ZSlcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlBcnJheSAodmFsdWUpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgc3RyaW5naWZpZWQ7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGlzRGVmKHN0cmluZ2lmaWVkID0gc3RyaW5naWZ5Q2xhc3ModmFsdWVbaV0pKSAmJiBzdHJpbmdpZmllZCAhPT0gJycpIHtcbiAgICAgIGlmIChyZXMpIHsgcmVzICs9ICcgJzsgfVxuICAgICAgcmVzICs9IHN0cmluZ2lmaWVkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdCAodmFsdWUpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAodmFsdWVba2V5XSkge1xuICAgICAgaWYgKHJlcykgeyByZXMgKz0gJyAnOyB9XG4gICAgICByZXMgKz0ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG52YXIgbmFtZXNwYWNlTWFwID0ge1xuICBzdmc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gIG1hdGg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJ1xufTtcblxudmFyIGlzSFRNTFRhZyA9IG1ha2VNYXAoXG4gICdodG1sLGJvZHksYmFzZSxoZWFkLGxpbmssbWV0YSxzdHlsZSx0aXRsZSwnICtcbiAgJ2FkZHJlc3MsYXJ0aWNsZSxhc2lkZSxmb290ZXIsaGVhZGVyLGgxLGgyLGgzLGg0LGg1LGg2LGhncm91cCxuYXYsc2VjdGlvbiwnICtcbiAgJ2RpdixkZCxkbCxkdCxmaWdjYXB0aW9uLGZpZ3VyZSxwaWN0dXJlLGhyLGltZyxsaSxtYWluLG9sLHAscHJlLHVsLCcgK1xuICAnYSxiLGFiYnIsYmRpLGJkbyxicixjaXRlLGNvZGUsZGF0YSxkZm4sZW0saSxrYmQsbWFyayxxLHJwLHJ0LHJ0YyxydWJ5LCcgK1xuICAncyxzYW1wLHNtYWxsLHNwYW4sc3Ryb25nLHN1YixzdXAsdGltZSx1LHZhcix3YnIsYXJlYSxhdWRpbyxtYXAsdHJhY2ssdmlkZW8sJyArXG4gICdlbWJlZCxvYmplY3QscGFyYW0sc291cmNlLGNhbnZhcyxzY3JpcHQsbm9zY3JpcHQsZGVsLGlucywnICtcbiAgJ2NhcHRpb24sY29sLGNvbGdyb3VwLHRhYmxlLHRoZWFkLHRib2R5LHRkLHRoLHRyLCcgK1xuICAnYnV0dG9uLGRhdGFsaXN0LGZpZWxkc2V0LGZvcm0saW5wdXQsbGFiZWwsbGVnZW5kLG1ldGVyLG9wdGdyb3VwLG9wdGlvbiwnICtcbiAgJ291dHB1dCxwcm9ncmVzcyxzZWxlY3QsdGV4dGFyZWEsJyArXG4gICdkZXRhaWxzLGRpYWxvZyxtZW51LG1lbnVpdGVtLHN1bW1hcnksJyArXG4gICdjb250ZW50LGVsZW1lbnQsc2hhZG93LHRlbXBsYXRlLGJsb2NrcXVvdGUsaWZyYW1lLHRmb290J1xuKTtcblxuLy8gdGhpcyBtYXAgaXMgaW50ZW50aW9uYWxseSBzZWxlY3RpdmUsIG9ubHkgY292ZXJpbmcgU1ZHIGVsZW1lbnRzIHRoYXQgbWF5XG4vLyBjb250YWluIGNoaWxkIGVsZW1lbnRzLlxudmFyIGlzU1ZHID0gbWFrZU1hcChcbiAgJ3N2ZyxhbmltYXRlLGNpcmNsZSxjbGlwcGF0aCxjdXJzb3IsZGVmcyxkZXNjLGVsbGlwc2UsZmlsdGVyLGZvbnQtZmFjZSwnICtcbiAgJ2ZvcmVpZ25PYmplY3QsZyxnbHlwaCxpbWFnZSxsaW5lLG1hcmtlcixtYXNrLG1pc3NpbmctZ2x5cGgscGF0aCxwYXR0ZXJuLCcgK1xuICAncG9seWdvbixwb2x5bGluZSxyZWN0LHN3aXRjaCxzeW1ib2wsdGV4dCx0ZXh0cGF0aCx0c3Bhbix1c2UsdmlldycsXG4gIHRydWVcbik7XG5cblxuXG52YXIgaXNSZXNlcnZlZFRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgcmV0dXJuIGlzSFRNTFRhZyh0YWcpIHx8IGlzU1ZHKHRhZylcbn07XG5cbmZ1bmN0aW9uIGdldFRhZ05hbWVzcGFjZSAodGFnKSB7XG4gIGlmIChpc1NWRyh0YWcpKSB7XG4gICAgcmV0dXJuICdzdmcnXG4gIH1cbiAgLy8gYmFzaWMgc3VwcG9ydCBmb3IgTWF0aE1MXG4gIC8vIG5vdGUgaXQgZG9lc24ndCBzdXBwb3J0IG90aGVyIE1hdGhNTCBlbGVtZW50cyBiZWluZyBjb21wb25lbnQgcm9vdHNcbiAgaWYgKHRhZyA9PT0gJ21hdGgnKSB7XG4gICAgcmV0dXJuICdtYXRoJ1xuICB9XG59XG5cbnZhciB1bmtub3duRWxlbWVudENhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmZ1bmN0aW9uIGlzVW5rbm93bkVsZW1lbnQgKHRhZykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCFpbkJyb3dzZXIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChpc1Jlc2VydmVkVGFnKHRhZykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICB0YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gIT0gbnVsbCkge1xuICAgIHJldHVybiB1bmtub3duRWxlbWVudENhY2hlW3RhZ11cbiAgfVxuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGlmICh0YWcuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODIxMDM2NC8xMDcwMjQ0XG4gICAgcmV0dXJuICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gPSAoXG4gICAgICBlbC5jb25zdHJ1Y3RvciA9PT0gd2luZG93LkhUTUxVbmtub3duRWxlbWVudCB8fFxuICAgICAgZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MRWxlbWVudFxuICAgICkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gPSAvSFRNTFVua25vd25FbGVtZW50Ly50ZXN0KGVsLnRvU3RyaW5nKCkpKVxuICB9XG59XG5cbnZhciBpc1RleHRJbnB1dFR5cGUgPSBtYWtlTWFwKCd0ZXh0LG51bWJlcixwYXNzd29yZCxzZWFyY2gsZW1haWwsdGVsLHVybCcpO1xuXG4vKiAgKi9cblxuLyoqXG4gKiBRdWVyeSBhbiBlbGVtZW50IHNlbGVjdG9yIGlmIGl0J3Mgbm90IGFuIGVsZW1lbnQgYWxyZWFkeS5cbiAqL1xuZnVuY3Rpb24gcXVlcnkgKGVsKSB7XG4gIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIHNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAnQ2Fubm90IGZpbmQgZWxlbWVudDogJyArIGVsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbFxuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50JDEgKHRhZ05hbWUsIHZub2RlKSB7XG4gIHZhciBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBpZiAodGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcbiAgICByZXR1cm4gZWxtXG4gIH1cbiAgLy8gZmFsc2Ugb3IgbnVsbCB3aWxsIHJlbW92ZSB0aGUgYXR0cmlidXRlIGJ1dCB1bmRlZmluZWQgd2lsbCBub3RcbiAgaWYgKHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS5hdHRycyAmJiB2bm9kZS5kYXRhLmF0dHJzLm11bHRpcGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbG0uc2V0QXR0cmlidXRlKCdtdWx0aXBsZScsICdtdWx0aXBsZScpO1xuICB9XG4gIHJldHVybiBlbG1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TIChuYW1lc3BhY2UsIHRhZ05hbWUpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VNYXBbbmFtZXNwYWNlXSwgdGFnTmFtZSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUgKHRleHQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQgKHRleHQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dClcbn1cblxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlIChwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZCAobm9kZSwgY2hpbGQpIHtcbiAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkIChub2RlLCBjaGlsZCkge1xuICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cblxuZnVuY3Rpb24gcGFyZW50Tm9kZSAobm9kZSkge1xuICByZXR1cm4gbm9kZS5wYXJlbnROb2RlXG59XG5cbmZ1bmN0aW9uIG5leHRTaWJsaW5nIChub2RlKSB7XG4gIHJldHVybiBub2RlLm5leHRTaWJsaW5nXG59XG5cbmZ1bmN0aW9uIHRhZ05hbWUgKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUudGFnTmFtZVxufVxuXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudCAobm9kZSwgdGV4dCkge1xuICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlIChub2RlLCBrZXksIHZhbCkge1xuICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbCk7XG59XG5cblxudmFyIG5vZGVPcHMgPSBPYmplY3QuZnJlZXplKHtcblx0Y3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCQxLFxuXHRjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcblx0Y3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuXHRjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuXHRpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcblx0cmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuXHRhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG5cdHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG5cdG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcblx0dGFnTmFtZTogdGFnTmFtZSxcblx0c2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuXHRzZXRBdHRyaWJ1dGU6IHNldEF0dHJpYnV0ZVxufSk7XG5cbi8qICAqL1xuXG52YXIgcmVmID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSAoXywgdm5vZGUpIHtcbiAgICByZWdpc3RlclJlZih2bm9kZSk7XG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICBpZiAob2xkVm5vZGUuZGF0YS5yZWYgIT09IHZub2RlLmRhdGEucmVmKSB7XG4gICAgICByZWdpc3RlclJlZihvbGRWbm9kZSwgdHJ1ZSk7XG4gICAgICByZWdpc3RlclJlZih2bm9kZSk7XG4gICAgfVxuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95ICh2bm9kZSkge1xuICAgIHJlZ2lzdGVyUmVmKHZub2RlLCB0cnVlKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJSZWYgKHZub2RlLCBpc1JlbW92YWwpIHtcbiAgdmFyIGtleSA9IHZub2RlLmRhdGEucmVmO1xuICBpZiAoIWtleSkgeyByZXR1cm4gfVxuXG4gIHZhciB2bSA9IHZub2RlLmNvbnRleHQ7XG4gIHZhciByZWYgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSB8fCB2bm9kZS5lbG07XG4gIHZhciByZWZzID0gdm0uJHJlZnM7XG4gIGlmIChpc1JlbW92YWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWZzW2tleV0pKSB7XG4gICAgICByZW1vdmUocmVmc1trZXldLCByZWYpO1xuICAgIH0gZWxzZSBpZiAocmVmc1trZXldID09PSByZWYpIHtcbiAgICAgIHJlZnNba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZub2RlLmRhdGEucmVmSW5Gb3IpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZWZzW2tleV0pKSB7XG4gICAgICAgIHJlZnNba2V5XSA9IFtyZWZdO1xuICAgICAgfSBlbHNlIGlmIChyZWZzW2tleV0uaW5kZXhPZihyZWYpIDwgMCkge1xuICAgICAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICAgICAgcmVmc1trZXldLnB1c2gocmVmKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVmc1trZXldID0gcmVmO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFZpcnR1YWwgRE9NIHBhdGNoaW5nIGFsZ29yaXRobSBiYXNlZCBvbiBTbmFiYmRvbSBieVxuICogU2ltb24gRnJpaXMgVmluZHVtIChAcGFsZGVwaW5kKVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcGFsZGVwaW5kL3NuYWJiZG9tL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBtb2RpZmllZCBieSBFdmFuIFlvdSAoQHl5eDk5MDgwMylcbiAqXG4gKiBOb3QgdHlwZS1jaGVja2luZyB0aGlzIGJlY2F1c2UgdGhpcyBmaWxlIGlzIHBlcmYtY3JpdGljYWwgYW5kIHRoZSBjb3N0XG4gKiBvZiBtYWtpbmcgZmxvdyB1bmRlcnN0YW5kIGl0IGlzIG5vdCB3b3J0aCBpdC5cbiAqL1xuXG52YXIgZW1wdHlOb2RlID0gbmV3IFZOb2RlKCcnLCB7fSwgW10pO1xuXG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICdhY3RpdmF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knXTtcblxuZnVuY3Rpb24gc2FtZVZub2RlIChhLCBiKSB7XG4gIHJldHVybiAoXG4gICAgYS5rZXkgPT09IGIua2V5ICYmIChcbiAgICAgIChcbiAgICAgICAgYS50YWcgPT09IGIudGFnICYmXG4gICAgICAgIGEuaXNDb21tZW50ID09PSBiLmlzQ29tbWVudCAmJlxuICAgICAgICBpc0RlZihhLmRhdGEpID09PSBpc0RlZihiLmRhdGEpICYmXG4gICAgICAgIHNhbWVJbnB1dFR5cGUoYSwgYilcbiAgICAgICkgfHwgKFxuICAgICAgICBpc1RydWUoYS5pc0FzeW5jUGxhY2Vob2xkZXIpICYmXG4gICAgICAgIGEuYXN5bmNGYWN0b3J5ID09PSBiLmFzeW5jRmFjdG9yeSAmJlxuICAgICAgICBpc1VuZGVmKGIuYXN5bmNGYWN0b3J5LmVycm9yKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG5mdW5jdGlvbiBzYW1lSW5wdXRUeXBlIChhLCBiKSB7XG4gIGlmIChhLnRhZyAhPT0gJ2lucHV0JykgeyByZXR1cm4gdHJ1ZSB9XG4gIHZhciBpO1xuICB2YXIgdHlwZUEgPSBpc0RlZihpID0gYS5kYXRhKSAmJiBpc0RlZihpID0gaS5hdHRycykgJiYgaS50eXBlO1xuICB2YXIgdHlwZUIgPSBpc0RlZihpID0gYi5kYXRhKSAmJiBpc0RlZihpID0gaS5hdHRycykgJiYgaS50eXBlO1xuICByZXR1cm4gdHlwZUEgPT09IHR5cGVCIHx8IGlzVGV4dElucHV0VHlwZSh0eXBlQSkgJiYgaXNUZXh0SW5wdXRUeXBlKHR5cGVCKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeCAoY2hpbGRyZW4sIGJlZ2luSWR4LCBlbmRJZHgpIHtcbiAgdmFyIGksIGtleTtcbiAgdmFyIG1hcCA9IHt9O1xuICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgIGtleSA9IGNoaWxkcmVuW2ldLmtleTtcbiAgICBpZiAoaXNEZWYoa2V5KSkgeyBtYXBba2V5XSA9IGk7IH1cbiAgfVxuICByZXR1cm4gbWFwXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhdGNoRnVuY3Rpb24gKGJhY2tlbmQpIHtcbiAgdmFyIGksIGo7XG4gIHZhciBjYnMgPSB7fTtcblxuICB2YXIgbW9kdWxlcyA9IGJhY2tlbmQubW9kdWxlcztcbiAgdmFyIG5vZGVPcHMgPSBiYWNrZW5kLm5vZGVPcHM7XG5cbiAgZm9yIChpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICBpZiAoaXNEZWYobW9kdWxlc1tqXVtob29rc1tpXV0pKSB7XG4gICAgICAgIGNic1tob29rc1tpXV0ucHVzaChtb2R1bGVzW2pdW2hvb2tzW2ldXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW1wdHlOb2RlQXQgKGVsbSkge1xuICAgIHJldHVybiBuZXcgVk5vZGUobm9kZU9wcy50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSwge30sIFtdLCB1bmRlZmluZWQsIGVsbSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IgKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICBmdW5jdGlvbiByZW1vdmUgKCkge1xuICAgICAgaWYgKC0tcmVtb3ZlLmxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICByZW1vdmVOb2RlKGNoaWxkRWxtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlLmxpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgICByZXR1cm4gcmVtb3ZlXG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVOb2RlIChlbCkge1xuICAgIHZhciBwYXJlbnQgPSBub2RlT3BzLnBhcmVudE5vZGUoZWwpO1xuICAgIC8vIGVsZW1lbnQgbWF5IGhhdmUgYWxyZWFkeSBiZWVuIHJlbW92ZWQgZHVlIHRvIHYtaHRtbCAvIHYtdGV4dFxuICAgIGlmIChpc0RlZihwYXJlbnQpKSB7XG4gICAgICBub2RlT3BzLnJlbW92ZUNoaWxkKHBhcmVudCwgZWwpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVW5rbm93bkVsZW1lbnQkJDEgKHZub2RlLCBpblZQcmUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgIWluVlByZSAmJlxuICAgICAgIXZub2RlLm5zICYmXG4gICAgICAhKFxuICAgICAgICBjb25maWcuaWdub3JlZEVsZW1lbnRzLmxlbmd0aCAmJlxuICAgICAgICBjb25maWcuaWdub3JlZEVsZW1lbnRzLnNvbWUoZnVuY3Rpb24gKGlnbm9yZSkge1xuICAgICAgICAgIHJldHVybiBpc1JlZ0V4cChpZ25vcmUpXG4gICAgICAgICAgICA/IGlnbm9yZS50ZXN0KHZub2RlLnRhZylcbiAgICAgICAgICAgIDogaWdub3JlID09PSB2bm9kZS50YWdcbiAgICAgICAgfSlcbiAgICAgICkgJiZcbiAgICAgIGNvbmZpZy5pc1Vua25vd25FbGVtZW50KHZub2RlLnRhZylcbiAgICApXG4gIH1cblxuICB2YXIgY3JlYXRpbmdFbG1JblZQcmUgPSAwO1xuICBmdW5jdGlvbiBjcmVhdGVFbG0gKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgcmVmRWxtLCBuZXN0ZWQpIHtcbiAgICB2bm9kZS5pc1Jvb3RJbnNlcnQgPSAhbmVzdGVkOyAvLyBmb3IgdHJhbnNpdGlvbiBlbnRlciBjaGVja1xuICAgIGlmIChjcmVhdGVDb21wb25lbnQodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgdmFyIHRhZyA9IHZub2RlLnRhZztcbiAgICBpZiAoaXNEZWYodGFnKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5wcmUpIHtcbiAgICAgICAgICBjcmVhdGluZ0VsbUluVlByZSsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Vua25vd25FbGVtZW50JCQxKHZub2RlLCBjcmVhdGluZ0VsbUluVlByZSkpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgJ1Vua25vd24gY3VzdG9tIGVsZW1lbnQ6IDwnICsgdGFnICsgJz4gLSBkaWQgeW91ICcgK1xuICAgICAgICAgICAgJ3JlZ2lzdGVyIHRoZSBjb21wb25lbnQgY29ycmVjdGx5PyBGb3IgcmVjdXJzaXZlIGNvbXBvbmVudHMsICcgK1xuICAgICAgICAgICAgJ21ha2Ugc3VyZSB0byBwcm92aWRlIHRoZSBcIm5hbWVcIiBvcHRpb24uJyxcbiAgICAgICAgICAgIHZub2RlLmNvbnRleHRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2bm9kZS5lbG0gPSB2bm9kZS5uc1xuICAgICAgICA/IG5vZGVPcHMuY3JlYXRlRWxlbWVudE5TKHZub2RlLm5zLCB0YWcpXG4gICAgICAgIDogbm9kZU9wcy5jcmVhdGVFbGVtZW50KHRhZywgdm5vZGUpO1xuICAgICAgc2V0U2NvcGUodm5vZGUpO1xuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIHtcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4odm5vZGUsIGNoaWxkcmVuLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBpZiAoaXNEZWYoZGF0YSkpIHtcbiAgICAgICAgICBpbnZva2VDcmVhdGVIb29rcyh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGRhdGEgJiYgZGF0YS5wcmUpIHtcbiAgICAgICAgY3JlYXRpbmdFbG1JblZQcmUtLTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVHJ1ZSh2bm9kZS5pc0NvbW1lbnQpKSB7XG4gICAgICB2bm9kZS5lbG0gPSBub2RlT3BzLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZub2RlLmVsbSA9IG5vZGVPcHMuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50ICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgIHZhciBpID0gdm5vZGUuZGF0YTtcbiAgICBpZiAoaXNEZWYoaSkpIHtcbiAgICAgIHZhciBpc1JlYWN0aXZhdGVkID0gaXNEZWYodm5vZGUuY29tcG9uZW50SW5zdGFuY2UpICYmIGkua2VlcEFsaXZlO1xuICAgICAgaWYgKGlzRGVmKGkgPSBpLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgIGkodm5vZGUsIGZhbHNlIC8qIGh5ZHJhdGluZyAqLywgcGFyZW50RWxtLCByZWZFbG0pO1xuICAgICAgfVxuICAgICAgLy8gYWZ0ZXIgY2FsbGluZyB0aGUgaW5pdCBob29rLCBpZiB0aGUgdm5vZGUgaXMgYSBjaGlsZCBjb21wb25lbnRcbiAgICAgIC8vIGl0IHNob3VsZCd2ZSBjcmVhdGVkIGEgY2hpbGQgaW5zdGFuY2UgYW5kIG1vdW50ZWQgaXQuIHRoZSBjaGlsZFxuICAgICAgLy8gY29tcG9uZW50IGFsc28gaGFzIHNldCB0aGUgcGxhY2Vob2xkZXIgdm5vZGUncyBlbG0uXG4gICAgICAvLyBpbiB0aGF0IGNhc2Ugd2UgY2FuIGp1c3QgcmV0dXJuIHRoZSBlbGVtZW50IGFuZCBiZSBkb25lLlxuICAgICAgaWYgKGlzRGVmKHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSkge1xuICAgICAgICBpbml0Q29tcG9uZW50KHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBpZiAoaXNUcnVlKGlzUmVhY3RpdmF0ZWQpKSB7XG4gICAgICAgICAgcmVhY3RpdmF0ZUNvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0Q29tcG9uZW50ICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgaWYgKGlzRGVmKHZub2RlLmRhdGEucGVuZGluZ0luc2VydCkpIHtcbiAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoLmFwcGx5KGluc2VydGVkVm5vZGVRdWV1ZSwgdm5vZGUuZGF0YS5wZW5kaW5nSW5zZXJ0KTtcbiAgICAgIHZub2RlLmRhdGEucGVuZGluZ0luc2VydCA9IG51bGw7XG4gICAgfVxuICAgIHZub2RlLmVsbSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlLiRlbDtcbiAgICBpZiAoaXNQYXRjaGFibGUodm5vZGUpKSB7XG4gICAgICBpbnZva2VDcmVhdGVIb29rcyh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgIHNldFNjb3BlKHZub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZW1wdHkgY29tcG9uZW50IHJvb3QuXG4gICAgICAvLyBza2lwIGFsbCBlbGVtZW50LXJlbGF0ZWQgbW9kdWxlcyBleGNlcHQgZm9yIHJlZiAoIzM0NTUpXG4gICAgICByZWdpc3RlclJlZih2bm9kZSk7XG4gICAgICAvLyBtYWtlIHN1cmUgdG8gaW52b2tlIHRoZSBpbnNlcnQgaG9va1xuICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2godm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWN0aXZhdGVDb21wb25lbnQgKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgcmVmRWxtKSB7XG4gICAgdmFyIGk7XG4gICAgLy8gaGFjayBmb3IgIzQzMzk6IGEgcmVhY3RpdmF0ZWQgY29tcG9uZW50IHdpdGggaW5uZXIgdHJhbnNpdGlvblxuICAgIC8vIGRvZXMgbm90IHRyaWdnZXIgYmVjYXVzZSB0aGUgaW5uZXIgbm9kZSdzIGNyZWF0ZWQgaG9va3MgYXJlIG5vdCBjYWxsZWRcbiAgICAvLyBhZ2Fpbi4gSXQncyBub3QgaWRlYWwgdG8gaW52b2x2ZSBtb2R1bGUtc3BlY2lmaWMgbG9naWMgaW4gaGVyZSBidXRcbiAgICAvLyB0aGVyZSBkb2Vzbid0IHNlZW0gdG8gYmUgYSBiZXR0ZXIgd2F5IHRvIGRvIGl0LlxuICAgIHZhciBpbm5lck5vZGUgPSB2bm9kZTtcbiAgICB3aGlsZSAoaW5uZXJOb2RlLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICBpbm5lck5vZGUgPSBpbm5lck5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO1xuICAgICAgaWYgKGlzRGVmKGkgPSBpbm5lck5vZGUuZGF0YSkgJiYgaXNEZWYoaSA9IGkudHJhbnNpdGlvbikpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5hY3RpdmF0ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNicy5hY3RpdmF0ZVtpXShlbXB0eU5vZGUsIGlubmVyTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2goaW5uZXJOb2RlKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdW5saWtlIGEgbmV3bHkgY3JlYXRlZCBjb21wb25lbnQsXG4gICAgLy8gYSByZWFjdGl2YXRlZCBrZWVwLWFsaXZlIGNvbXBvbmVudCBkb2Vzbid0IGluc2VydCBpdHNlbGZcbiAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbnNlcnQgKHBhcmVudCwgZWxtLCByZWYkJDEpIHtcbiAgICBpZiAoaXNEZWYocGFyZW50KSkge1xuICAgICAgaWYgKGlzRGVmKHJlZiQkMSkpIHtcbiAgICAgICAgaWYgKHJlZiQkMS5wYXJlbnROb2RlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnQsIGVsbSwgcmVmJCQxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZU9wcy5hcHBlbmRDaGlsZChwYXJlbnQsIGVsbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hpbGRyZW4gKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNyZWF0ZUVsbShjaGlsZHJlbltpXSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCB2bm9kZS5lbG0sIG51bGwsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgIG5vZGVPcHMuYXBwZW5kQ2hpbGQodm5vZGUuZWxtLCBub2RlT3BzLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1BhdGNoYWJsZSAodm5vZGUpIHtcbiAgICB3aGlsZSAodm5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgIHZub2RlID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO1xuICAgIH1cbiAgICByZXR1cm4gaXNEZWYodm5vZGUudGFnKVxuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlQ3JlYXRlSG9va3MgKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpJDEpIHtcbiAgICAgIGNicy5jcmVhdGVbaSQxXShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICB9XG4gICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICBpZiAoaXNEZWYoaSkpIHtcbiAgICAgIGlmIChpc0RlZihpLmNyZWF0ZSkpIHsgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7IH1cbiAgICAgIGlmIChpc0RlZihpLmluc2VydCkpIHsgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2godm5vZGUpOyB9XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0IHNjb3BlIGlkIGF0dHJpYnV0ZSBmb3Igc2NvcGVkIENTUy5cbiAgLy8gdGhpcyBpcyBpbXBsZW1lbnRlZCBhcyBhIHNwZWNpYWwgY2FzZSB0byBhdm9pZCB0aGUgb3ZlcmhlYWRcbiAgLy8gb2YgZ29pbmcgdGhyb3VnaCB0aGUgbm9ybWFsIGF0dHJpYnV0ZSBwYXRjaGluZyBwcm9jZXNzLlxuICBmdW5jdGlvbiBzZXRTY29wZSAodm5vZGUpIHtcbiAgICB2YXIgaTtcbiAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmZuU2NvcGVJZCkpIHtcbiAgICAgIG5vZGVPcHMuc2V0QXR0cmlidXRlKHZub2RlLmVsbSwgaSwgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYW5jZXN0b3IgPSB2bm9kZTtcbiAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICBpZiAoaXNEZWYoaSA9IGFuY2VzdG9yLmNvbnRleHQpICYmIGlzRGVmKGkgPSBpLiRvcHRpb25zLl9zY29wZUlkKSkge1xuICAgICAgICAgIG5vZGVPcHMuc2V0QXR0cmlidXRlKHZub2RlLmVsbSwgaSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBmb3Igc2xvdCBjb250ZW50IHRoZXkgc2hvdWxkIGFsc28gZ2V0IHRoZSBzY29wZUlkIGZyb20gdGhlIGhvc3QgaW5zdGFuY2UuXG4gICAgaWYgKGlzRGVmKGkgPSBhY3RpdmVJbnN0YW5jZSkgJiZcbiAgICAgIGkgIT09IHZub2RlLmNvbnRleHQgJiZcbiAgICAgIGkgIT09IHZub2RlLmZuQ29udGV4dCAmJlxuICAgICAgaXNEZWYoaSA9IGkuJG9wdGlvbnMuX3Njb3BlSWQpXG4gICAgKSB7XG4gICAgICBub2RlT3BzLnNldEF0dHJpYnV0ZSh2bm9kZS5lbG0sIGksICcnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRWbm9kZXMgKHBhcmVudEVsbSwgcmVmRWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgIGNyZWF0ZUVsbSh2bm9kZXNbc3RhcnRJZHhdLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgcmVmRWxtKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VEZXN0cm95SG9vayAodm5vZGUpIHtcbiAgICB2YXIgaSwgajtcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpIHsgaSh2bm9kZSk7IH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSkgeyBjYnMuZGVzdHJveVtpXSh2bm9kZSk7IH1cbiAgICB9XG4gICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraikge1xuICAgICAgICBpbnZva2VEZXN0cm95SG9vayh2bm9kZS5jaGlsZHJlbltqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzIChwYXJlbnRFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xuICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChpc0RlZihjaC50YWcpKSB7XG4gICAgICAgICAgcmVtb3ZlQW5kSW52b2tlUmVtb3ZlSG9vayhjaCk7XG4gICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICB9IGVsc2UgeyAvLyBUZXh0IG5vZGVcbiAgICAgICAgICByZW1vdmVOb2RlKGNoLmVsbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbmRJbnZva2VSZW1vdmVIb29rICh2bm9kZSwgcm0pIHtcbiAgICBpZiAoaXNEZWYocm0pIHx8IGlzRGVmKHZub2RlLmRhdGEpKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICBpZiAoaXNEZWYocm0pKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSByZWN1cnNpdmVseSBwYXNzZWQgZG93biBybSBjYWxsYmFja1xuICAgICAgICAvLyBpbmNyZWFzZSB0aGUgbGlzdGVuZXJzIGNvdW50XG4gICAgICAgIHJtLmxpc3RlbmVycyArPSBsaXN0ZW5lcnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkaXJlY3RseSByZW1vdmluZ1xuICAgICAgICBybSA9IGNyZWF0ZVJtQ2Iodm5vZGUuZWxtLCBsaXN0ZW5lcnMpO1xuICAgICAgfVxuICAgICAgLy8gcmVjdXJzaXZlbHkgaW52b2tlIGhvb2tzIG9uIGNoaWxkIGNvbXBvbmVudCByb290IG5vZGVcbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UpICYmIGlzRGVmKGkgPSBpLl92bm9kZSkgJiYgaXNEZWYoaS5kYXRhKSkge1xuICAgICAgICByZW1vdmVBbmRJbnZva2VSZW1vdmVIb29rKGksIHJtKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNicy5yZW1vdmVbaV0odm5vZGUsIHJtKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5yZW1vdmUpKSB7XG4gICAgICAgIGkodm5vZGUsIHJtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJtKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZU5vZGUodm5vZGUuZWxtKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbiAocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSkge1xuICAgIHZhciBvbGRTdGFydElkeCA9IDA7XG4gICAgdmFyIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgIHZhciBvbGRLZXlUb0lkeCwgaWR4SW5PbGQsIHZub2RlVG9Nb3ZlLCByZWZFbG07XG5cbiAgICAvLyByZW1vdmVPbmx5IGlzIGEgc3BlY2lhbCBmbGFnIHVzZWQgb25seSBieSA8dHJhbnNpdGlvbi1ncm91cD5cbiAgICAvLyB0byBlbnN1cmUgcmVtb3ZlZCBlbGVtZW50cyBzdGF5IGluIGNvcnJlY3QgcmVsYXRpdmUgcG9zaXRpb25zXG4gICAgLy8gZHVyaW5nIGxlYXZpbmcgdHJhbnNpdGlvbnNcbiAgICB2YXIgY2FuTW92ZSA9ICFyZW1vdmVPbmx5O1xuXG4gICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgIGlmIChpc1VuZGVmKG9sZFN0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgaGFzIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgfSBlbHNlIGlmIChpc1VuZGVmKG9sZEVuZFZub2RlKSkge1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgcmlnaHRcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBub2RlT3BzLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgfSBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7IC8vIFZub2RlIG1vdmVkIGxlZnRcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzVW5kZWYob2xkS2V5VG9JZHgpKSB7IG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpOyB9XG4gICAgICAgIGlkeEluT2xkID0gaXNEZWYobmV3U3RhcnRWbm9kZS5rZXkpXG4gICAgICAgICAgPyBvbGRLZXlUb0lkeFtuZXdTdGFydFZub2RlLmtleV1cbiAgICAgICAgICA6IGZpbmRJZHhJbk9sZChuZXdTdGFydFZub2RlLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkgeyAvLyBOZXcgZWxlbWVudFxuICAgICAgICAgIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZub2RlVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICF2bm9kZVRvTW92ZSkge1xuICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgJ0l0IHNlZW1zIHRoZXJlIGFyZSBkdXBsaWNhdGUga2V5cyB0aGF0IGlzIGNhdXNpbmcgYW4gdXBkYXRlIGVycm9yLiAnICtcbiAgICAgICAgICAgICAgJ01ha2Ugc3VyZSBlYWNoIHYtZm9yIGl0ZW0gaGFzIGEgdW5pcXVlIGtleS4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2FtZVZub2RlKHZub2RlVG9Nb3ZlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2hWbm9kZSh2bm9kZVRvTW92ZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIG9sZENoW2lkeEluT2xkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbk1vdmUgJiYgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCB2bm9kZVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2FtZSBrZXkgYnV0IGRpZmZlcmVudCBlbGVtZW50LiB0cmVhdCBhcyBuZXcgZWxlbWVudFxuICAgICAgICAgICAgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICByZWZFbG0gPSBpc1VuZGVmKG5ld0NoW25ld0VuZElkeCArIDFdKSA/IG51bGwgOiBuZXdDaFtuZXdFbmRJZHggKyAxXS5lbG07XG4gICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCByZWZFbG0sIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgIH0gZWxzZSBpZiAobmV3U3RhcnRJZHggPiBuZXdFbmRJZHgpIHtcbiAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kSWR4SW5PbGQgKG5vZGUsIG9sZENoLCBzdGFydCwgZW5kKSB7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIHZhciBjID0gb2xkQ2hbaV07XG4gICAgICBpZiAoaXNEZWYoYykgJiYgc2FtZVZub2RlKG5vZGUsIGMpKSB7IHJldHVybiBpIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXRjaFZub2RlIChvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSkge1xuICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XG5cbiAgICBpZiAoaXNUcnVlKG9sZFZub2RlLmlzQXN5bmNQbGFjZWhvbGRlcikpIHtcbiAgICAgIGlmIChpc0RlZih2bm9kZS5hc3luY0ZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgICAgIGh5ZHJhdGUob2xkVm5vZGUuZWxtLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZub2RlLmlzQXN5bmNQbGFjZWhvbGRlciA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyByZXVzZSBlbGVtZW50IGZvciBzdGF0aWMgdHJlZXMuXG4gICAgLy8gbm90ZSB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIHZub2RlIGlzIGNsb25lZCAtXG4gICAgLy8gaWYgdGhlIG5ldyBub2RlIGlzIG5vdCBjbG9uZWQgaXQgbWVhbnMgdGhlIHJlbmRlciBmdW5jdGlvbnMgaGF2ZSBiZWVuXG4gICAgLy8gcmVzZXQgYnkgdGhlIGhvdC1yZWxvYWQtYXBpIGFuZCB3ZSBuZWVkIHRvIGRvIGEgcHJvcGVyIHJlLXJlbmRlci5cbiAgICBpZiAoaXNUcnVlKHZub2RlLmlzU3RhdGljKSAmJlxuICAgICAgaXNUcnVlKG9sZFZub2RlLmlzU3RhdGljKSAmJlxuICAgICAgdm5vZGUua2V5ID09PSBvbGRWbm9kZS5rZXkgJiZcbiAgICAgIChpc1RydWUodm5vZGUuaXNDbG9uZWQpIHx8IGlzVHJ1ZSh2bm9kZS5pc09uY2UpKVxuICAgICkge1xuICAgICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBvbGRWbm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBpO1xuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkucHJlcGF0Y2gpKSB7XG4gICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgfVxuXG4gICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgaWYgKGlzRGVmKGRhdGEpICYmIGlzUGF0Y2hhYmxlKHZub2RlKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNicy51cGRhdGUubGVuZ3RoOyArK2kpIHsgY2JzLnVwZGF0ZVtpXShvbGRWbm9kZSwgdm5vZGUpOyB9XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSkgeyBpKG9sZFZub2RlLCB2bm9kZSk7IH1cbiAgICB9XG4gICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChvbGRDaCAhPT0gY2gpIHsgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSk7IH1cbiAgICAgIH0gZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkgeyBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgJycpOyB9XG4gICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgfSBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2xkVm5vZGUudGV4dCAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgbm9kZU9wcy5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgIH1cbiAgICBpZiAoaXNEZWYoZGF0YSkpIHtcbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5wb3N0cGF0Y2gpKSB7IGkob2xkVm5vZGUsIHZub2RlKTsgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUluc2VydEhvb2sgKHZub2RlLCBxdWV1ZSwgaW5pdGlhbCkge1xuICAgIC8vIGRlbGF5IGluc2VydCBob29rcyBmb3IgY29tcG9uZW50IHJvb3Qgbm9kZXMsIGludm9rZSB0aGVtIGFmdGVyIHRoZVxuICAgIC8vIGVsZW1lbnQgaXMgcmVhbGx5IGluc2VydGVkXG4gICAgaWYgKGlzVHJ1ZShpbml0aWFsKSAmJiBpc0RlZih2bm9kZS5wYXJlbnQpKSB7XG4gICAgICB2bm9kZS5wYXJlbnQuZGF0YS5wZW5kaW5nSW5zZXJ0ID0gcXVldWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcXVldWVbaV0uZGF0YS5ob29rLmluc2VydChxdWV1ZVtpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGh5ZHJhdGlvbkJhaWxlZCA9IGZhbHNlO1xuICAvLyBsaXN0IG9mIG1vZHVsZXMgdGhhdCBjYW4gc2tpcCBjcmVhdGUgaG9vayBkdXJpbmcgaHlkcmF0aW9uIGJlY2F1c2UgdGhleVxuICAvLyBhcmUgYWxyZWFkeSByZW5kZXJlZCBvbiB0aGUgY2xpZW50IG9yIGhhcyBubyBuZWVkIGZvciBpbml0aWFsaXphdGlvblxuICAvLyBOb3RlOiBzdHlsZSBpcyBleGNsdWRlZCBiZWNhdXNlIGl0IHJlbGllcyBvbiBpbml0aWFsIGNsb25lIGZvciBmdXR1cmVcbiAgLy8gZGVlcCB1cGRhdGVzICgjNzA2MykuXG4gIHZhciBpc1JlbmRlcmVkTW9kdWxlID0gbWFrZU1hcCgnYXR0cnMsY2xhc3Msc3RhdGljQ2xhc3Msc3RhdGljU3R5bGUsa2V5Jyk7XG5cbiAgLy8gTm90ZTogdGhpcyBpcyBhIGJyb3dzZXItb25seSBmdW5jdGlvbiBzbyB3ZSBjYW4gYXNzdW1lIGVsbXMgYXJlIERPTSBub2Rlcy5cbiAgZnVuY3Rpb24gaHlkcmF0ZSAoZWxtLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBpblZQcmUpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgdGFnID0gdm5vZGUudGFnO1xuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICBpblZQcmUgPSBpblZQcmUgfHwgKGRhdGEgJiYgZGF0YS5wcmUpO1xuICAgIHZub2RlLmVsbSA9IGVsbTtcblxuICAgIGlmIChpc1RydWUodm5vZGUuaXNDb21tZW50KSAmJiBpc0RlZih2bm9kZS5hc3luY0ZhY3RvcnkpKSB7XG4gICAgICB2bm9kZS5pc0FzeW5jUGxhY2Vob2xkZXIgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gYXNzZXJ0IG5vZGUgbWF0Y2hcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCFhc3NlcnROb2RlTWF0Y2goZWxtLCB2bm9kZSwgaW5WUHJlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHsgaSh2bm9kZSwgdHJ1ZSAvKiBoeWRyYXRpbmcgKi8pOyB9XG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSkge1xuICAgICAgICAvLyBjaGlsZCBjb21wb25lbnQuIGl0IHNob3VsZCBoYXZlIGh5ZHJhdGVkIGl0cyBvd24gdHJlZS5cbiAgICAgICAgaW5pdENvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzRGVmKHRhZykpIHtcbiAgICAgIGlmIChpc0RlZihjaGlsZHJlbikpIHtcbiAgICAgICAgLy8gZW1wdHkgZWxlbWVudCwgYWxsb3cgY2xpZW50IHRvIHBpY2sgdXAgYW5kIHBvcHVsYXRlIGNoaWxkcmVuXG4gICAgICAgIGlmICghZWxtLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgIGNyZWF0ZUNoaWxkcmVuKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB2LWh0bWwgYW5kIGRvbVByb3BzOiBpbm5lckhUTUxcbiAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEpICYmIGlzRGVmKGkgPSBpLmRvbVByb3BzKSAmJiBpc0RlZihpID0gaS5pbm5lckhUTUwpKSB7XG4gICAgICAgICAgICBpZiAoaSAhPT0gZWxtLmlubmVySFRNTCkge1xuICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAhaHlkcmF0aW9uQmFpbGVkXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGh5ZHJhdGlvbkJhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdQYXJlbnQ6ICcsIGVsbSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdzZXJ2ZXIgaW5uZXJIVE1MOiAnLCBpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ2NsaWVudCBpbm5lckhUTUw6ICcsIGVsbS5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpdGVyYXRlIGFuZCBjb21wYXJlIGNoaWxkcmVuIGxpc3RzXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW5NYXRjaCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY2hpbGROb2RlID0gZWxtLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBjaGlsZHJlbi5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgICAgICAgIGlmICghY2hpbGROb2RlIHx8ICFoeWRyYXRlKGNoaWxkTm9kZSwgY2hpbGRyZW5baSQxXSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBpblZQcmUpKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5NYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2hpbGROb2RlID0gY2hpbGROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgY2hpbGROb2RlIGlzIG5vdCBudWxsLCBpdCBtZWFucyB0aGUgYWN0dWFsIGNoaWxkTm9kZXMgbGlzdCBpc1xuICAgICAgICAgICAgLy8gbG9uZ2VyIHRoYW4gdGhlIHZpcnR1YWwgY2hpbGRyZW4gbGlzdC5cbiAgICAgICAgICAgIGlmICghY2hpbGRyZW5NYXRjaCB8fCBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgIWh5ZHJhdGlvbkJhaWxlZFxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBoeWRyYXRpb25CYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUGFyZW50OiAnLCBlbG0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWlzbWF0Y2hpbmcgY2hpbGROb2RlcyB2cy4gVk5vZGVzOiAnLCBlbG0uY2hpbGROb2RlcywgY2hpbGRyZW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgIHZhciBmdWxsSW52b2tlID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgaWYgKCFpc1JlbmRlcmVkTW9kdWxlKGtleSkpIHtcbiAgICAgICAgICAgIGZ1bGxJbnZva2UgPSB0cnVlO1xuICAgICAgICAgICAgaW52b2tlQ3JlYXRlSG9va3Modm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZ1bGxJbnZva2UgJiYgZGF0YVsnY2xhc3MnXSkge1xuICAgICAgICAgIC8vIGVuc3VyZSBjb2xsZWN0aW5nIGRlcHMgZm9yIGRlZXAgY2xhc3MgYmluZGluZ3MgZm9yIGZ1dHVyZSB1cGRhdGVzXG4gICAgICAgICAgdHJhdmVyc2UoZGF0YVsnY2xhc3MnXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsbS5kYXRhICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICBlbG0uZGF0YSA9IHZub2RlLnRleHQ7XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhc3NlcnROb2RlTWF0Y2ggKG5vZGUsIHZub2RlLCBpblZQcmUpIHtcbiAgICBpZiAoaXNEZWYodm5vZGUudGFnKSkge1xuICAgICAgcmV0dXJuIHZub2RlLnRhZy5pbmRleE9mKCd2dWUtY29tcG9uZW50JykgPT09IDAgfHwgKFxuICAgICAgICAhaXNVbmtub3duRWxlbWVudCQkMSh2bm9kZSwgaW5WUHJlKSAmJlxuICAgICAgICB2bm9kZS50YWcudG9Mb3dlckNhc2UoKSA9PT0gKG5vZGUudGFnTmFtZSAmJiBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSlcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09ICh2bm9kZS5pc0NvbW1lbnQgPyA4IDogMylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gcGF0Y2ggKG9sZFZub2RlLCB2bm9kZSwgaHlkcmF0aW5nLCByZW1vdmVPbmx5LCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgIGlmIChpc1VuZGVmKHZub2RlKSkge1xuICAgICAgaWYgKGlzRGVmKG9sZFZub2RlKSkgeyBpbnZva2VEZXN0cm95SG9vayhvbGRWbm9kZSk7IH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBpc0luaXRpYWxQYXRjaCA9IGZhbHNlO1xuICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcblxuICAgIGlmIChpc1VuZGVmKG9sZFZub2RlKSkge1xuICAgICAgLy8gZW1wdHkgbW91bnQgKGxpa2VseSBhcyBjb21wb25lbnQpLCBjcmVhdGUgbmV3IHJvb3QgZWxlbWVudFxuICAgICAgaXNJbml0aWFsUGF0Y2ggPSB0cnVlO1xuICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgcmVmRWxtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGlzUmVhbEVsZW1lbnQgPSBpc0RlZihvbGRWbm9kZS5ub2RlVHlwZSk7XG4gICAgICBpZiAoIWlzUmVhbEVsZW1lbnQgJiYgc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgICAgLy8gcGF0Y2ggZXhpc3Rpbmcgcm9vdCBub2RlXG4gICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHJlbW92ZU9ubHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzUmVhbEVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBtb3VudGluZyB0byBhIHJlYWwgZWxlbWVudFxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgc2VydmVyLXJlbmRlcmVkIGNvbnRlbnQgYW5kIGlmIHdlIGNhbiBwZXJmb3JtXG4gICAgICAgICAgLy8gYSBzdWNjZXNzZnVsIGh5ZHJhdGlvbi5cbiAgICAgICAgICBpZiAob2xkVm5vZGUubm9kZVR5cGUgPT09IDEgJiYgb2xkVm5vZGUuaGFzQXR0cmlidXRlKFNTUl9BVFRSKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUucmVtb3ZlQXR0cmlidXRlKFNTUl9BVFRSKTtcbiAgICAgICAgICAgIGh5ZHJhdGluZyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc1RydWUoaHlkcmF0aW5nKSkge1xuICAgICAgICAgICAgaWYgKGh5ZHJhdGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpKSB7XG4gICAgICAgICAgICAgIGludm9rZUluc2VydEhvb2sodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIHJldHVybiBvbGRWbm9kZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICAgJ1RoZSBjbGllbnQtc2lkZSByZW5kZXJlZCB2aXJ0dWFsIERPTSB0cmVlIGlzIG5vdCBtYXRjaGluZyAnICtcbiAgICAgICAgICAgICAgICAnc2VydmVyLXJlbmRlcmVkIGNvbnRlbnQuIFRoaXMgaXMgbGlrZWx5IGNhdXNlZCBieSBpbmNvcnJlY3QgJyArXG4gICAgICAgICAgICAgICAgJ0hUTUwgbWFya3VwLCBmb3IgZXhhbXBsZSBuZXN0aW5nIGJsb2NrLWxldmVsIGVsZW1lbnRzIGluc2lkZSAnICtcbiAgICAgICAgICAgICAgICAnPHA+LCBvciBtaXNzaW5nIDx0Ym9keT4uIEJhaWxpbmcgaHlkcmF0aW9uIGFuZCBwZXJmb3JtaW5nICcgK1xuICAgICAgICAgICAgICAgICdmdWxsIGNsaWVudC1zaWRlIHJlbmRlci4nXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGVpdGhlciBub3Qgc2VydmVyLXJlbmRlcmVkLCBvciBoeWRyYXRpb24gZmFpbGVkLlxuICAgICAgICAgIC8vIGNyZWF0ZSBhbiBlbXB0eSBub2RlIGFuZCByZXBsYWNlIGl0XG4gICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXBsYWNpbmcgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgICB2YXIgb2xkRWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgcGFyZW50RWxtJDEgPSBub2RlT3BzLnBhcmVudE5vZGUob2xkRWxtKTtcblxuICAgICAgICAvLyBjcmVhdGUgbmV3IG5vZGVcbiAgICAgICAgY3JlYXRlRWxtKFxuICAgICAgICAgIHZub2RlLFxuICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZSxcbiAgICAgICAgICAvLyBleHRyZW1lbHkgcmFyZSBlZGdlIGNhc2U6IGRvIG5vdCBpbnNlcnQgaWYgb2xkIGVsZW1lbnQgaXMgaW4gYVxuICAgICAgICAgIC8vIGxlYXZpbmcgdHJhbnNpdGlvbi4gT25seSBoYXBwZW5zIHdoZW4gY29tYmluaW5nIHRyYW5zaXRpb24gK1xuICAgICAgICAgIC8vIGtlZXAtYWxpdmUgKyBIT0NzLiAoIzQ1OTApXG4gICAgICAgICAgb2xkRWxtLl9sZWF2ZUNiID8gbnVsbCA6IHBhcmVudEVsbSQxLFxuICAgICAgICAgIG5vZGVPcHMubmV4dFNpYmxpbmcob2xkRWxtKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwYXJlbnQgcGxhY2Vob2xkZXIgbm9kZSBlbGVtZW50LCByZWN1cnNpdmVseVxuICAgICAgICBpZiAoaXNEZWYodm5vZGUucGFyZW50KSkge1xuICAgICAgICAgIHZhciBhbmNlc3RvciA9IHZub2RlLnBhcmVudDtcbiAgICAgICAgICB2YXIgcGF0Y2hhYmxlID0gaXNQYXRjaGFibGUodm5vZGUpO1xuICAgICAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICBjYnMuZGVzdHJveVtpXShhbmNlc3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmNlc3Rvci5lbG0gPSB2bm9kZS5lbG07XG4gICAgICAgICAgICBpZiAocGF0Y2hhYmxlKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kkMSkge1xuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaSQxXShlbXB0eU5vZGUsIGFuY2VzdG9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyAjNjUxM1xuICAgICAgICAgICAgICAvLyBpbnZva2UgaW5zZXJ0IGhvb2tzIHRoYXQgbWF5IGhhdmUgYmVlbiBtZXJnZWQgYnkgY3JlYXRlIGhvb2tzLlxuICAgICAgICAgICAgICAvLyBlLmcuIGZvciBkaXJlY3RpdmVzIHRoYXQgdXNlcyB0aGUgXCJpbnNlcnRlZFwiIGhvb2suXG4gICAgICAgICAgICAgIHZhciBpbnNlcnQgPSBhbmNlc3Rvci5kYXRhLmhvb2suaW5zZXJ0O1xuICAgICAgICAgICAgICBpZiAoaW5zZXJ0Lm1lcmdlZCkge1xuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGF0IGluZGV4IDEgdG8gYXZvaWQgcmUtaW52b2tpbmcgY29tcG9uZW50IG1vdW50ZWQgaG9va1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkkMiA9IDE7IGkkMiA8IGluc2VydC5mbnMubGVuZ3RoOyBpJDIrKykge1xuICAgICAgICAgICAgICAgICAgaW5zZXJ0LmZuc1tpJDJdKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWdpc3RlclJlZihhbmNlc3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXN0cm95IG9sZCBub2RlXG4gICAgICAgIGlmIChpc0RlZihwYXJlbnRFbG0kMSkpIHtcbiAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtJDEsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRhZykpIHtcbiAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbnZva2VJbnNlcnRIb29rKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIGlzSW5pdGlhbFBhdGNoKTtcbiAgICByZXR1cm4gdm5vZGUuZWxtXG4gIH1cbn1cblxuLyogICovXG5cbnZhciBkaXJlY3RpdmVzID0ge1xuICBjcmVhdGU6IHVwZGF0ZURpcmVjdGl2ZXMsXG4gIHVwZGF0ZTogdXBkYXRlRGlyZWN0aXZlcyxcbiAgZGVzdHJveTogZnVuY3Rpb24gdW5iaW5kRGlyZWN0aXZlcyAodm5vZGUpIHtcbiAgICB1cGRhdGVEaXJlY3RpdmVzKHZub2RlLCBlbXB0eU5vZGUpO1xuICB9XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVEaXJlY3RpdmVzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgaWYgKG9sZFZub2RlLmRhdGEuZGlyZWN0aXZlcyB8fCB2bm9kZS5kYXRhLmRpcmVjdGl2ZXMpIHtcbiAgICBfdXBkYXRlKG9sZFZub2RlLCB2bm9kZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3VwZGF0ZSAob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBpc0NyZWF0ZSA9IG9sZFZub2RlID09PSBlbXB0eU5vZGU7XG4gIHZhciBpc0Rlc3Ryb3kgPSB2bm9kZSA9PT0gZW1wdHlOb2RlO1xuICB2YXIgb2xkRGlycyA9IG5vcm1hbGl6ZURpcmVjdGl2ZXMkMShvbGRWbm9kZS5kYXRhLmRpcmVjdGl2ZXMsIG9sZFZub2RlLmNvbnRleHQpO1xuICB2YXIgbmV3RGlycyA9IG5vcm1hbGl6ZURpcmVjdGl2ZXMkMSh2bm9kZS5kYXRhLmRpcmVjdGl2ZXMsIHZub2RlLmNvbnRleHQpO1xuXG4gIHZhciBkaXJzV2l0aEluc2VydCA9IFtdO1xuICB2YXIgZGlyc1dpdGhQb3N0cGF0Y2ggPSBbXTtcblxuICB2YXIga2V5LCBvbGREaXIsIGRpcjtcbiAgZm9yIChrZXkgaW4gbmV3RGlycykge1xuICAgIG9sZERpciA9IG9sZERpcnNba2V5XTtcbiAgICBkaXIgPSBuZXdEaXJzW2tleV07XG4gICAgaWYgKCFvbGREaXIpIHtcbiAgICAgIC8vIG5ldyBkaXJlY3RpdmUsIGJpbmRcbiAgICAgIGNhbGxIb29rJDEoZGlyLCAnYmluZCcsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICBpZiAoZGlyLmRlZiAmJiBkaXIuZGVmLmluc2VydGVkKSB7XG4gICAgICAgIGRpcnNXaXRoSW5zZXJ0LnB1c2goZGlyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXhpc3RpbmcgZGlyZWN0aXZlLCB1cGRhdGVcbiAgICAgIGRpci5vbGRWYWx1ZSA9IG9sZERpci52YWx1ZTtcbiAgICAgIGNhbGxIb29rJDEoZGlyLCAndXBkYXRlJywgdm5vZGUsIG9sZFZub2RlKTtcbiAgICAgIGlmIChkaXIuZGVmICYmIGRpci5kZWYuY29tcG9uZW50VXBkYXRlZCkge1xuICAgICAgICBkaXJzV2l0aFBvc3RwYXRjaC5wdXNoKGRpcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGRpcnNXaXRoSW5zZXJ0Lmxlbmd0aCkge1xuICAgIHZhciBjYWxsSW5zZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzV2l0aEluc2VydC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjYWxsSG9vayQxKGRpcnNXaXRoSW5zZXJ0W2ldLCAnaW5zZXJ0ZWQnLCB2bm9kZSwgb2xkVm5vZGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGlzQ3JlYXRlKSB7XG4gICAgICBtZXJnZVZOb2RlSG9vayh2bm9kZSwgJ2luc2VydCcsIGNhbGxJbnNlcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsSW5zZXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRpcnNXaXRoUG9zdHBhdGNoLmxlbmd0aCkge1xuICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLCAncG9zdHBhdGNoJywgZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzV2l0aFBvc3RwYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjYWxsSG9vayQxKGRpcnNXaXRoUG9zdHBhdGNoW2ldLCAnY29tcG9uZW50VXBkYXRlZCcsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIWlzQ3JlYXRlKSB7XG4gICAgZm9yIChrZXkgaW4gb2xkRGlycykge1xuICAgICAgaWYgKCFuZXdEaXJzW2tleV0pIHtcbiAgICAgICAgLy8gbm8gbG9uZ2VyIHByZXNlbnQsIHVuYmluZFxuICAgICAgICBjYWxsSG9vayQxKG9sZERpcnNba2V5XSwgJ3VuYmluZCcsIG9sZFZub2RlLCBvbGRWbm9kZSwgaXNEZXN0cm95KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGVtcHR5TW9kaWZpZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyQxIChcbiAgZGlycyxcbiAgdm1cbikge1xuICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKCFkaXJzKSB7XG4gICAgcmV0dXJuIHJlc1xuICB9XG4gIHZhciBpLCBkaXI7XG4gIGZvciAoaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgZGlyID0gZGlyc1tpXTtcbiAgICBpZiAoIWRpci5tb2RpZmllcnMpIHtcbiAgICAgIGRpci5tb2RpZmllcnMgPSBlbXB0eU1vZGlmaWVycztcbiAgICB9XG4gICAgcmVzW2dldFJhd0Rpck5hbWUoZGlyKV0gPSBkaXI7XG4gICAgZGlyLmRlZiA9IHJlc29sdmVBc3NldCh2bS4kb3B0aW9ucywgJ2RpcmVjdGl2ZXMnLCBkaXIubmFtZSwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBnZXRSYXdEaXJOYW1lIChkaXIpIHtcbiAgcmV0dXJuIGRpci5yYXdOYW1lIHx8ICgoZGlyLm5hbWUpICsgXCIuXCIgKyAoT2JqZWN0LmtleXMoZGlyLm1vZGlmaWVycyB8fCB7fSkuam9pbignLicpKSlcbn1cblxuZnVuY3Rpb24gY2FsbEhvb2skMSAoZGlyLCBob29rLCB2bm9kZSwgb2xkVm5vZGUsIGlzRGVzdHJveSkge1xuICB2YXIgZm4gPSBkaXIuZGVmICYmIGRpci5kZWZbaG9va107XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICBmbih2bm9kZS5lbG0sIGRpciwgdm5vZGUsIG9sZFZub2RlLCBpc0Rlc3Ryb3kpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGhhbmRsZUVycm9yKGUsIHZub2RlLmNvbnRleHQsIChcImRpcmVjdGl2ZSBcIiArIChkaXIubmFtZSkgKyBcIiBcIiArIGhvb2sgKyBcIiBob29rXCIpKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGJhc2VNb2R1bGVzID0gW1xuICByZWYsXG4gIGRpcmVjdGl2ZXNcbl07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiB1cGRhdGVBdHRycyAob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBvcHRzID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgaWYgKGlzRGVmKG9wdHMpICYmIG9wdHMuQ3Rvci5vcHRpb25zLmluaGVyaXRBdHRycyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoaXNVbmRlZihvbGRWbm9kZS5kYXRhLmF0dHJzKSAmJiBpc1VuZGVmKHZub2RlLmRhdGEuYXR0cnMpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIGtleSwgY3VyLCBvbGQ7XG4gIHZhciBlbG0gPSB2bm9kZS5lbG07XG4gIHZhciBvbGRBdHRycyA9IG9sZFZub2RlLmRhdGEuYXR0cnMgfHwge307XG4gIHZhciBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgfHwge307XG4gIC8vIGNsb25lIG9ic2VydmVkIG9iamVjdHMsIGFzIHRoZSB1c2VyIHByb2JhYmx5IHdhbnRzIHRvIG11dGF0ZSBpdFxuICBpZiAoaXNEZWYoYXR0cnMuX19vYl9fKSkge1xuICAgIGF0dHJzID0gdm5vZGUuZGF0YS5hdHRycyA9IGV4dGVuZCh7fSwgYXR0cnMpO1xuICB9XG5cbiAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICBjdXIgPSBhdHRyc1trZXldO1xuICAgIG9sZCA9IG9sZEF0dHJzW2tleV07XG4gICAgaWYgKG9sZCAhPT0gY3VyKSB7XG4gICAgICBzZXRBdHRyKGVsbSwga2V5LCBjdXIpO1xuICAgIH1cbiAgfVxuICAvLyAjNDM5MTogaW4gSUU5LCBzZXR0aW5nIHR5cGUgY2FuIHJlc2V0IHZhbHVlIGZvciBpbnB1dFt0eXBlPXJhZGlvXVxuICAvLyAjNjY2NjogSUUvRWRnZSBmb3JjZXMgcHJvZ3Jlc3MgdmFsdWUgZG93biB0byAxIGJlZm9yZSBzZXR0aW5nIGEgbWF4XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoKGlzSUUgfHwgaXNFZGdlKSAmJiBhdHRycy52YWx1ZSAhPT0gb2xkQXR0cnMudmFsdWUpIHtcbiAgICBzZXRBdHRyKGVsbSwgJ3ZhbHVlJywgYXR0cnMudmFsdWUpO1xuICB9XG4gIGZvciAoa2V5IGluIG9sZEF0dHJzKSB7XG4gICAgaWYgKGlzVW5kZWYoYXR0cnNba2V5XSkpIHtcbiAgICAgIGlmIChpc1hsaW5rKGtleSkpIHtcbiAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZU5TKHhsaW5rTlMsIGdldFhsaW5rUHJvcChrZXkpKTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzRW51bWVyYXRlZEF0dHIoa2V5KSkge1xuICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldEF0dHIgKGVsLCBrZXksIHZhbHVlKSB7XG4gIGlmIChpc0Jvb2xlYW5BdHRyKGtleSkpIHtcbiAgICAvLyBzZXQgYXR0cmlidXRlIGZvciBibGFuayB2YWx1ZVxuICAgIC8vIGUuZy4gPG9wdGlvbiBkaXNhYmxlZD5TZWxlY3Qgb25lPC9vcHRpb24+XG4gICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGVjaG5pY2FsbHkgYWxsb3dmdWxsc2NyZWVuIGlzIGEgYm9vbGVhbiBhdHRyaWJ1dGUgZm9yIDxpZnJhbWU+LFxuICAgICAgLy8gYnV0IEZsYXNoIGV4cGVjdHMgYSB2YWx1ZSBvZiBcInRydWVcIiB3aGVuIHVzZWQgb24gPGVtYmVkPiB0YWdcbiAgICAgIHZhbHVlID0ga2V5ID09PSAnYWxsb3dmdWxsc2NyZWVuJyAmJiBlbC50YWdOYW1lID09PSAnRU1CRUQnXG4gICAgICAgID8gJ3RydWUnXG4gICAgICAgIDoga2V5O1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0VudW1lcmF0ZWRBdHRyKGtleSkpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCBpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJyA/ICdmYWxzZScgOiAndHJ1ZScpO1xuICB9IGVsc2UgaWYgKGlzWGxpbmsoa2V5KSkge1xuICAgIGlmIChpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlTlMoeGxpbmtOUywgZ2V0WGxpbmtQcm9wKGtleSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gIzcxMzg6IElFMTAgJiAxMSBmaXJlcyBpbnB1dCBldmVudCB3aGVuIHNldHRpbmcgcGxhY2Vob2xkZXIgb25cbiAgICAgIC8vIDx0ZXh0YXJlYT4uLi4gYmxvY2sgdGhlIGZpcnN0IGlucHV0IGV2ZW50IGFuZCByZW1vdmUgdGhlIGJsb2NrZXJcbiAgICAgIC8vIGltbWVkaWF0ZWx5LlxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoXG4gICAgICAgIGlzSUUgJiYgIWlzSUU5ICYmXG4gICAgICAgIGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScgJiZcbiAgICAgICAga2V5ID09PSAncGxhY2Vob2xkZXInICYmICFlbC5fX2llcGhcbiAgICAgICkge1xuICAgICAgICB2YXIgYmxvY2tlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGJsb2NrZXIpO1xuICAgICAgICB9O1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGJsb2NrZXIpO1xuICAgICAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICAgICAgZWwuX19pZXBoID0gdHJ1ZTsgLyogSUUgcGxhY2Vob2xkZXIgcGF0Y2hlZCAqL1xuICAgICAgfVxuICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgYXR0cnMgPSB7XG4gIGNyZWF0ZTogdXBkYXRlQXR0cnMsXG4gIHVwZGF0ZTogdXBkYXRlQXR0cnNcbn07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiB1cGRhdGVDbGFzcyAob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBlbCA9IHZub2RlLmVsbTtcbiAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICB2YXIgb2xkRGF0YSA9IG9sZFZub2RlLmRhdGE7XG4gIGlmIChcbiAgICBpc1VuZGVmKGRhdGEuc3RhdGljQ2xhc3MpICYmXG4gICAgaXNVbmRlZihkYXRhLmNsYXNzKSAmJiAoXG4gICAgICBpc1VuZGVmKG9sZERhdGEpIHx8IChcbiAgICAgICAgaXNVbmRlZihvbGREYXRhLnN0YXRpY0NsYXNzKSAmJlxuICAgICAgICBpc1VuZGVmKG9sZERhdGEuY2xhc3MpXG4gICAgICApXG4gICAgKVxuICApIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBjbHMgPSBnZW5DbGFzc0ZvclZub2RlKHZub2RlKTtcblxuICAvLyBoYW5kbGUgdHJhbnNpdGlvbiBjbGFzc2VzXG4gIHZhciB0cmFuc2l0aW9uQ2xhc3MgPSBlbC5fdHJhbnNpdGlvbkNsYXNzZXM7XG4gIGlmIChpc0RlZih0cmFuc2l0aW9uQ2xhc3MpKSB7XG4gICAgY2xzID0gY29uY2F0KGNscywgc3RyaW5naWZ5Q2xhc3ModHJhbnNpdGlvbkNsYXNzKSk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGNsYXNzXG4gIGlmIChjbHMgIT09IGVsLl9wcmV2Q2xhc3MpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xzKTtcbiAgICBlbC5fcHJldkNsYXNzID0gY2xzO1xuICB9XG59XG5cbnZhciBrbGFzcyA9IHtcbiAgY3JlYXRlOiB1cGRhdGVDbGFzcyxcbiAgdXBkYXRlOiB1cGRhdGVDbGFzc1xufTtcblxuLyogICovXG5cbi8qICAqL1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gbm90ZTogdGhpcyBvbmx5IHJlbW92ZXMgdGhlIGF0dHIgZnJvbSB0aGUgQXJyYXkgKGF0dHJzTGlzdCkgc28gdGhhdCBpdFxuLy8gZG9lc24ndCBnZXQgcHJvY2Vzc2VkIGJ5IHByb2Nlc3NBdHRycy5cbi8vIEJ5IGRlZmF1bHQgaXQgZG9lcyBOT1QgcmVtb3ZlIGl0IGZyb20gdGhlIG1hcCAoYXR0cnNNYXApIGJlY2F1c2UgdGhlIG1hcCBpc1xuLy8gbmVlZGVkIGR1cmluZyBjb2RlZ2VuLlxuXG4vKiAgKi9cblxuLyoqXG4gKiBDcm9zcy1wbGF0Zm9ybSBjb2RlIGdlbmVyYXRpb24gZm9yIGNvbXBvbmVudCB2LW1vZGVsXG4gKi9cblxuXG4vKipcbiAqIENyb3NzLXBsYXRmb3JtIGNvZGVnZW4gaGVscGVyIGZvciBnZW5lcmF0aW5nIHYtbW9kZWwgdmFsdWUgYXNzaWdubWVudCBjb2RlLlxuICovXG5cbi8qICAqL1xuXG4vLyBpbiBzb21lIGNhc2VzLCB0aGUgZXZlbnQgdXNlZCBoYXMgdG8gYmUgZGV0ZXJtaW5lZCBhdCBydW50aW1lXG4vLyBzbyB3ZSB1c2VkIHNvbWUgcmVzZXJ2ZWQgdG9rZW5zIGR1cmluZyBjb21waWxlLlxudmFyIFJBTkdFX1RPS0VOID0gJ19fcic7XG52YXIgQ0hFQ0tCT1hfUkFESU9fVE9LRU4gPSAnX19jJztcblxuLyogICovXG5cbi8vIG5vcm1hbGl6ZSB2LW1vZGVsIGV2ZW50IHRva2VucyB0aGF0IGNhbiBvbmx5IGJlIGRldGVybWluZWQgYXQgcnVudGltZS5cbi8vIGl0J3MgaW1wb3J0YW50IHRvIHBsYWNlIHRoZSBldmVudCBhcyB0aGUgZmlyc3QgaW4gdGhlIGFycmF5IGJlY2F1c2Vcbi8vIHRoZSB3aG9sZSBwb2ludCBpcyBlbnN1cmluZyB0aGUgdi1tb2RlbCBjYWxsYmFjayBnZXRzIGNhbGxlZCBiZWZvcmVcbi8vIHVzZXItYXR0YWNoZWQgaGFuZGxlcnMuXG5mdW5jdGlvbiBub3JtYWxpemVFdmVudHMgKG9uKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNEZWYob25bUkFOR0VfVE9LRU5dKSkge1xuICAgIC8vIElFIGlucHV0W3R5cGU9cmFuZ2VdIG9ubHkgc3VwcG9ydHMgYGNoYW5nZWAgZXZlbnRcbiAgICB2YXIgZXZlbnQgPSBpc0lFID8gJ2NoYW5nZScgOiAnaW5wdXQnO1xuICAgIG9uW2V2ZW50XSA9IFtdLmNvbmNhdChvbltSQU5HRV9UT0tFTl0sIG9uW2V2ZW50XSB8fCBbXSk7XG4gICAgZGVsZXRlIG9uW1JBTkdFX1RPS0VOXTtcbiAgfVxuICAvLyBUaGlzIHdhcyBvcmlnaW5hbGx5IGludGVuZGVkIHRvIGZpeCAjNDUyMSBidXQgbm8gbG9uZ2VyIG5lY2Vzc2FyeVxuICAvLyBhZnRlciAyLjUuIEtlZXBpbmcgaXQgZm9yIGJhY2t3YXJkcyBjb21wYXQgd2l0aCBnZW5lcmF0ZWQgY29kZSBmcm9tIDwgMi40XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNEZWYob25bQ0hFQ0tCT1hfUkFESU9fVE9LRU5dKSkge1xuICAgIG9uLmNoYW5nZSA9IFtdLmNvbmNhdChvbltDSEVDS0JPWF9SQURJT19UT0tFTl0sIG9uLmNoYW5nZSB8fCBbXSk7XG4gICAgZGVsZXRlIG9uW0NIRUNLQk9YX1JBRElPX1RPS0VOXTtcbiAgfVxufVxuXG52YXIgdGFyZ2V0JDE7XG5cbmZ1bmN0aW9uIGNyZWF0ZU9uY2VIYW5kbGVyIChoYW5kbGVyLCBldmVudCwgY2FwdHVyZSkge1xuICB2YXIgX3RhcmdldCA9IHRhcmdldCQxOyAvLyBzYXZlIGN1cnJlbnQgdGFyZ2V0IGVsZW1lbnQgaW4gY2xvc3VyZVxuICByZXR1cm4gZnVuY3Rpb24gb25jZUhhbmRsZXIgKCkge1xuICAgIHZhciByZXMgPSBoYW5kbGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHJlcyAhPT0gbnVsbCkge1xuICAgICAgcmVtb3ZlJDIoZXZlbnQsIG9uY2VIYW5kbGVyLCBjYXB0dXJlLCBfdGFyZ2V0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkJDEgKFxuICBldmVudCxcbiAgaGFuZGxlcixcbiAgb25jZSQkMSxcbiAgY2FwdHVyZSxcbiAgcGFzc2l2ZVxuKSB7XG4gIGhhbmRsZXIgPSB3aXRoTWFjcm9UYXNrKGhhbmRsZXIpO1xuICBpZiAob25jZSQkMSkgeyBoYW5kbGVyID0gY3JlYXRlT25jZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGNhcHR1cmUpOyB9XG4gIHRhcmdldCQxLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgZXZlbnQsXG4gICAgaGFuZGxlcixcbiAgICBzdXBwb3J0c1Bhc3NpdmVcbiAgICAgID8geyBjYXB0dXJlOiBjYXB0dXJlLCBwYXNzaXZlOiBwYXNzaXZlIH1cbiAgICAgIDogY2FwdHVyZVxuICApO1xufVxuXG5mdW5jdGlvbiByZW1vdmUkMiAoXG4gIGV2ZW50LFxuICBoYW5kbGVyLFxuICBjYXB0dXJlLFxuICBfdGFyZ2V0XG4pIHtcbiAgKF90YXJnZXQgfHwgdGFyZ2V0JDEpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgZXZlbnQsXG4gICAgaGFuZGxlci5fd2l0aFRhc2sgfHwgaGFuZGxlcixcbiAgICBjYXB0dXJlXG4gICk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZURPTUxpc3RlbmVycyAob2xkVm5vZGUsIHZub2RlKSB7XG4gIGlmIChpc1VuZGVmKG9sZFZub2RlLmRhdGEub24pICYmIGlzVW5kZWYodm5vZGUuZGF0YS5vbikpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgb24gPSB2bm9kZS5kYXRhLm9uIHx8IHt9O1xuICB2YXIgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uIHx8IHt9O1xuICB0YXJnZXQkMSA9IHZub2RlLmVsbTtcbiAgbm9ybWFsaXplRXZlbnRzKG9uKTtcbiAgdXBkYXRlTGlzdGVuZXJzKG9uLCBvbGRPbiwgYWRkJDEsIHJlbW92ZSQyLCB2bm9kZS5jb250ZXh0KTtcbiAgdGFyZ2V0JDEgPSB1bmRlZmluZWQ7XG59XG5cbnZhciBldmVudHMgPSB7XG4gIGNyZWF0ZTogdXBkYXRlRE9NTGlzdGVuZXJzLFxuICB1cGRhdGU6IHVwZGF0ZURPTUxpc3RlbmVyc1xufTtcblxuLyogICovXG5cbmZ1bmN0aW9uIHVwZGF0ZURPTVByb3BzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgaWYgKGlzVW5kZWYob2xkVm5vZGUuZGF0YS5kb21Qcm9wcykgJiYgaXNVbmRlZih2bm9kZS5kYXRhLmRvbVByb3BzKSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBrZXksIGN1cjtcbiAgdmFyIGVsbSA9IHZub2RlLmVsbTtcbiAgdmFyIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5kb21Qcm9wcyB8fCB7fTtcbiAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5kb21Qcm9wcyB8fCB7fTtcbiAgLy8gY2xvbmUgb2JzZXJ2ZWQgb2JqZWN0cywgYXMgdGhlIHVzZXIgcHJvYmFibHkgd2FudHMgdG8gbXV0YXRlIGl0XG4gIGlmIChpc0RlZihwcm9wcy5fX29iX18pKSB7XG4gICAgcHJvcHMgPSB2bm9kZS5kYXRhLmRvbVByb3BzID0gZXh0ZW5kKHt9LCBwcm9wcyk7XG4gIH1cblxuICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgIGlmIChpc1VuZGVmKHByb3BzW2tleV0pKSB7XG4gICAgICBlbG1ba2V5XSA9ICcnO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgLy8gaWdub3JlIGNoaWxkcmVuIGlmIHRoZSBub2RlIGhhcyB0ZXh0Q29udGVudCBvciBpbm5lckhUTUwsXG4gICAgLy8gYXMgdGhlc2Ugd2lsbCB0aHJvdyBhd2F5IGV4aXN0aW5nIERPTSBub2RlcyBhbmQgY2F1c2UgcmVtb3ZhbCBlcnJvcnNcbiAgICAvLyBvbiBzdWJzZXF1ZW50IHBhdGNoZXMgKCMzMzYwKVxuICAgIGlmIChrZXkgPT09ICd0ZXh0Q29udGVudCcgfHwga2V5ID09PSAnaW5uZXJIVE1MJykge1xuICAgICAgaWYgKHZub2RlLmNoaWxkcmVuKSB7IHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9IDA7IH1cbiAgICAgIGlmIChjdXIgPT09IG9sZFByb3BzW2tleV0pIHsgY29udGludWUgfVxuICAgICAgLy8gIzY2MDEgd29yayBhcm91bmQgQ2hyb21lIHZlcnNpb24gPD0gNTUgYnVnIHdoZXJlIHNpbmdsZSB0ZXh0Tm9kZVxuICAgICAgLy8gcmVwbGFjZWQgYnkgaW5uZXJIVE1ML3RleHRDb250ZW50IHJldGFpbnMgaXRzIHBhcmVudE5vZGUgcHJvcGVydHlcbiAgICAgIGlmIChlbG0uY2hpbGROb2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZWxtLnJlbW92ZUNoaWxkKGVsbS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAndmFsdWUnKSB7XG4gICAgICAvLyBzdG9yZSB2YWx1ZSBhcyBfdmFsdWUgYXMgd2VsbCBzaW5jZVxuICAgICAgLy8gbm9uLXN0cmluZyB2YWx1ZXMgd2lsbCBiZSBzdHJpbmdpZmllZFxuICAgICAgZWxtLl92YWx1ZSA9IGN1cjtcbiAgICAgIC8vIGF2b2lkIHJlc2V0dGluZyBjdXJzb3IgcG9zaXRpb24gd2hlbiB2YWx1ZSBpcyB0aGUgc2FtZVxuICAgICAgdmFyIHN0ckN1ciA9IGlzVW5kZWYoY3VyKSA/ICcnIDogU3RyaW5nKGN1cik7XG4gICAgICBpZiAoc2hvdWxkVXBkYXRlVmFsdWUoZWxtLCBzdHJDdXIpKSB7XG4gICAgICAgIGVsbS52YWx1ZSA9IHN0ckN1cjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgfVxuICB9XG59XG5cbi8vIGNoZWNrIHBsYXRmb3Jtcy93ZWIvdXRpbC9hdHRycy5qcyBhY2NlcHRWYWx1ZVxuXG5cbmZ1bmN0aW9uIHNob3VsZFVwZGF0ZVZhbHVlIChlbG0sIGNoZWNrVmFsKSB7XG4gIHJldHVybiAoIWVsbS5jb21wb3NpbmcgJiYgKFxuICAgIGVsbS50YWdOYW1lID09PSAnT1BUSU9OJyB8fFxuICAgIGlzRGlydHkoZWxtLCBjaGVja1ZhbCkgfHxcbiAgICBpc0lucHV0Q2hhbmdlZChlbG0sIGNoZWNrVmFsKVxuICApKVxufVxuXG5mdW5jdGlvbiBpc0RpcnR5IChlbG0sIGNoZWNrVmFsKSB7XG4gIC8vIHJldHVybiB0cnVlIHdoZW4gdGV4dGJveCAoLm51bWJlciBhbmQgLnRyaW0pIGxvc2VzIGZvY3VzIGFuZCBpdHMgdmFsdWUgaXNcbiAgLy8gbm90IGVxdWFsIHRvIHRoZSB1cGRhdGVkIHZhbHVlXG4gIHZhciBub3RJbkZvY3VzID0gdHJ1ZTtcbiAgLy8gIzYxNTdcbiAgLy8gd29yayBhcm91bmQgSUUgYnVnIHdoZW4gYWNjZXNzaW5nIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW4gYW4gaWZyYW1lXG4gIHRyeSB7IG5vdEluRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbG07IH0gY2F0Y2ggKGUpIHt9XG4gIHJldHVybiBub3RJbkZvY3VzICYmIGVsbS52YWx1ZSAhPT0gY2hlY2tWYWxcbn1cblxuZnVuY3Rpb24gaXNJbnB1dENoYW5nZWQgKGVsbSwgbmV3VmFsKSB7XG4gIHZhciB2YWx1ZSA9IGVsbS52YWx1ZTtcbiAgdmFyIG1vZGlmaWVycyA9IGVsbS5fdk1vZGlmaWVyczsgLy8gaW5qZWN0ZWQgYnkgdi1tb2RlbCBydW50aW1lXG4gIGlmIChpc0RlZihtb2RpZmllcnMpICYmIG1vZGlmaWVycy5udW1iZXIpIHtcbiAgICByZXR1cm4gdG9OdW1iZXIodmFsdWUpICE9PSB0b051bWJlcihuZXdWYWwpXG4gIH1cbiAgaWYgKGlzRGVmKG1vZGlmaWVycykgJiYgbW9kaWZpZXJzLnRyaW0pIHtcbiAgICByZXR1cm4gdmFsdWUudHJpbSgpICE9PSBuZXdWYWwudHJpbSgpXG4gIH1cbiAgcmV0dXJuIHZhbHVlICE9PSBuZXdWYWxcbn1cblxudmFyIGRvbVByb3BzID0ge1xuICBjcmVhdGU6IHVwZGF0ZURPTVByb3BzLFxuICB1cGRhdGU6IHVwZGF0ZURPTVByb3BzXG59O1xuXG4vKiAgKi9cblxudmFyIHBhcnNlU3R5bGVUZXh0ID0gY2FjaGVkKGZ1bmN0aW9uIChjc3NUZXh0KSB7XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGxpc3REZWxpbWl0ZXIgPSAvOyg/IVteKF0qXFwpKS9nO1xuICB2YXIgcHJvcGVydHlEZWxpbWl0ZXIgPSAvOiguKykvO1xuICBjc3NUZXh0LnNwbGl0KGxpc3REZWxpbWl0ZXIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdmFyIHRtcCA9IGl0ZW0uc3BsaXQocHJvcGVydHlEZWxpbWl0ZXIpO1xuICAgICAgdG1wLmxlbmd0aCA+IDEgJiYgKHJlc1t0bXBbMF0udHJpbSgpXSA9IHRtcFsxXS50cmltKCkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXNcbn0pO1xuXG4vLyBtZXJnZSBzdGF0aWMgYW5kIGR5bmFtaWMgc3R5bGUgZGF0YSBvbiB0aGUgc2FtZSB2bm9kZVxuZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVEYXRhIChkYXRhKSB7XG4gIHZhciBzdHlsZSA9IG5vcm1hbGl6ZVN0eWxlQmluZGluZyhkYXRhLnN0eWxlKTtcbiAgLy8gc3RhdGljIHN0eWxlIGlzIHByZS1wcm9jZXNzZWQgaW50byBhbiBvYmplY3QgZHVyaW5nIGNvbXBpbGF0aW9uXG4gIC8vIGFuZCBpcyBhbHdheXMgYSBmcmVzaCBvYmplY3QsIHNvIGl0J3Mgc2FmZSB0byBtZXJnZSBpbnRvIGl0XG4gIHJldHVybiBkYXRhLnN0YXRpY1N0eWxlXG4gICAgPyBleHRlbmQoZGF0YS5zdGF0aWNTdHlsZSwgc3R5bGUpXG4gICAgOiBzdHlsZVxufVxuXG4vLyBub3JtYWxpemUgcG9zc2libGUgYXJyYXkgLyBzdHJpbmcgdmFsdWVzIGludG8gT2JqZWN0XG5mdW5jdGlvbiBub3JtYWxpemVTdHlsZUJpbmRpbmcgKGJpbmRpbmdTdHlsZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShiaW5kaW5nU3R5bGUpKSB7XG4gICAgcmV0dXJuIHRvT2JqZWN0KGJpbmRpbmdTdHlsZSlcbiAgfVxuICBpZiAodHlwZW9mIGJpbmRpbmdTdHlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGFyc2VTdHlsZVRleHQoYmluZGluZ1N0eWxlKVxuICB9XG4gIHJldHVybiBiaW5kaW5nU3R5bGVcbn1cblxuLyoqXG4gKiBwYXJlbnQgY29tcG9uZW50IHN0eWxlIHNob3VsZCBiZSBhZnRlciBjaGlsZCdzXG4gKiBzbyB0aGF0IHBhcmVudCBjb21wb25lbnQncyBzdHlsZSBjb3VsZCBvdmVycmlkZSBpdFxuICovXG5mdW5jdGlvbiBnZXRTdHlsZSAodm5vZGUsIGNoZWNrQ2hpbGQpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICB2YXIgc3R5bGVEYXRhO1xuXG4gIGlmIChjaGVja0NoaWxkKSB7XG4gICAgdmFyIGNoaWxkTm9kZSA9IHZub2RlO1xuICAgIHdoaWxlIChjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgIGNoaWxkTm9kZSA9IGNoaWxkTm9kZS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGU7XG4gICAgICBpZiAoY2hpbGROb2RlLmRhdGEgJiYgKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YShjaGlsZE5vZGUuZGF0YSkpKSB7XG4gICAgICAgIGV4dGVuZChyZXMsIHN0eWxlRGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEodm5vZGUuZGF0YSkpKSB7XG4gICAgZXh0ZW5kKHJlcywgc3R5bGVEYXRhKTtcbiAgfVxuXG4gIHZhciBwYXJlbnROb2RlID0gdm5vZGU7XG4gIHdoaWxlICgocGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50KSkge1xuICAgIGlmIChwYXJlbnROb2RlLmRhdGEgJiYgKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YShwYXJlbnROb2RlLmRhdGEpKSkge1xuICAgICAgZXh0ZW5kKHJlcywgc3R5bGVEYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIGNzc1ZhclJFID0gL14tLS87XG52YXIgaW1wb3J0YW50UkUgPSAvXFxzKiFpbXBvcnRhbnQkLztcbnZhciBzZXRQcm9wID0gZnVuY3Rpb24gKGVsLCBuYW1lLCB2YWwpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChjc3NWYXJSRS50ZXN0KG5hbWUpKSB7XG4gICAgZWwuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsKTtcbiAgfSBlbHNlIGlmIChpbXBvcnRhbnRSRS50ZXN0KHZhbCkpIHtcbiAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWwucmVwbGFjZShpbXBvcnRhbnRSRSwgJycpLCAnaW1wb3J0YW50Jyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplKG5hbWUpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIC8vIFN1cHBvcnQgdmFsdWVzIGFycmF5IGNyZWF0ZWQgYnkgYXV0b3ByZWZpeGVyLCBlLmcuXG4gICAgICAvLyB7ZGlzcGxheTogW1wiLXdlYmtpdC1ib3hcIiwgXCItbXMtZmxleGJveFwiLCBcImZsZXhcIl19XG4gICAgICAvLyBTZXQgdGhlbSBvbmUgYnkgb25lLCBhbmQgdGhlIGJyb3dzZXIgd2lsbCBvbmx5IHNldCB0aG9zZSBpdCBjYW4gcmVjb2duaXplXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGVsLnN0eWxlW25vcm1hbGl6ZWROYW1lXSA9IHZhbFtpXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbbm9ybWFsaXplZE5hbWVdID0gdmFsO1xuICAgIH1cbiAgfVxufTtcblxudmFyIHZlbmRvck5hbWVzID0gWydXZWJraXQnLCAnTW96JywgJ21zJ107XG5cbnZhciBlbXB0eVN0eWxlO1xudmFyIG5vcm1hbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAocHJvcCkge1xuICBlbXB0eVN0eWxlID0gZW1wdHlTdHlsZSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZTtcbiAgcHJvcCA9IGNhbWVsaXplKHByb3ApO1xuICBpZiAocHJvcCAhPT0gJ2ZpbHRlcicgJiYgKHByb3AgaW4gZW1wdHlTdHlsZSkpIHtcbiAgICByZXR1cm4gcHJvcFxuICB9XG4gIHZhciBjYXBOYW1lID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmVuZG9yTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmFtZSA9IHZlbmRvck5hbWVzW2ldICsgY2FwTmFtZTtcbiAgICBpZiAobmFtZSBpbiBlbXB0eVN0eWxlKSB7XG4gICAgICByZXR1cm4gbmFtZVxuICAgIH1cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICB2YXIgb2xkRGF0YSA9IG9sZFZub2RlLmRhdGE7XG5cbiAgaWYgKGlzVW5kZWYoZGF0YS5zdGF0aWNTdHlsZSkgJiYgaXNVbmRlZihkYXRhLnN0eWxlKSAmJlxuICAgIGlzVW5kZWYob2xkRGF0YS5zdGF0aWNTdHlsZSkgJiYgaXNVbmRlZihvbGREYXRhLnN0eWxlKVxuICApIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBjdXIsIG5hbWU7XG4gIHZhciBlbCA9IHZub2RlLmVsbTtcbiAgdmFyIG9sZFN0YXRpY1N0eWxlID0gb2xkRGF0YS5zdGF0aWNTdHlsZTtcbiAgdmFyIG9sZFN0eWxlQmluZGluZyA9IG9sZERhdGEubm9ybWFsaXplZFN0eWxlIHx8IG9sZERhdGEuc3R5bGUgfHwge307XG5cbiAgLy8gaWYgc3RhdGljIHN0eWxlIGV4aXN0cywgc3R5bGViaW5kaW5nIGFscmVhZHkgbWVyZ2VkIGludG8gaXQgd2hlbiBkb2luZyBub3JtYWxpemVTdHlsZURhdGFcbiAgdmFyIG9sZFN0eWxlID0gb2xkU3RhdGljU3R5bGUgfHwgb2xkU3R5bGVCaW5kaW5nO1xuXG4gIHZhciBzdHlsZSA9IG5vcm1hbGl6ZVN0eWxlQmluZGluZyh2bm9kZS5kYXRhLnN0eWxlKSB8fCB7fTtcblxuICAvLyBzdG9yZSBub3JtYWxpemVkIHN0eWxlIHVuZGVyIGEgZGlmZmVyZW50IGtleSBmb3IgbmV4dCBkaWZmXG4gIC8vIG1ha2Ugc3VyZSB0byBjbG9uZSBpdCBpZiBpdCdzIHJlYWN0aXZlLCBzaW5jZSB0aGUgdXNlciBsaWtlbHkgd2FudHNcbiAgLy8gdG8gbXV0YXRlIGl0LlxuICB2bm9kZS5kYXRhLm5vcm1hbGl6ZWRTdHlsZSA9IGlzRGVmKHN0eWxlLl9fb2JfXylcbiAgICA/IGV4dGVuZCh7fSwgc3R5bGUpXG4gICAgOiBzdHlsZTtcblxuICB2YXIgbmV3U3R5bGUgPSBnZXRTdHlsZSh2bm9kZSwgdHJ1ZSk7XG5cbiAgZm9yIChuYW1lIGluIG9sZFN0eWxlKSB7XG4gICAgaWYgKGlzVW5kZWYobmV3U3R5bGVbbmFtZV0pKSB7XG4gICAgICBzZXRQcm9wKGVsLCBuYW1lLCAnJyk7XG4gICAgfVxuICB9XG4gIGZvciAobmFtZSBpbiBuZXdTdHlsZSkge1xuICAgIGN1ciA9IG5ld1N0eWxlW25hbWVdO1xuICAgIGlmIChjdXIgIT09IG9sZFN0eWxlW25hbWVdKSB7XG4gICAgICAvLyBpZTkgc2V0dGluZyB0byBudWxsIGhhcyBubyBlZmZlY3QsIG11c3QgdXNlIGVtcHR5IHN0cmluZ1xuICAgICAgc2V0UHJvcChlbCwgbmFtZSwgY3VyID09IG51bGwgPyAnJyA6IGN1cik7XG4gICAgfVxuICB9XG59XG5cbnZhciBzdHlsZSA9IHtcbiAgY3JlYXRlOiB1cGRhdGVTdHlsZSxcbiAgdXBkYXRlOiB1cGRhdGVTdHlsZVxufTtcblxuLyogICovXG5cbi8qKlxuICogQWRkIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgU1ZHIHNpbmNlIGNsYXNzTGlzdCBpcyBub3Qgc3VwcG9ydGVkIG9uXG4gKiBTVkcgZWxlbWVudHMgaW4gSUVcbiAqL1xuZnVuY3Rpb24gYWRkQ2xhc3MgKGVsLCBjbHMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghY2xzIHx8ICEoY2xzID0gY2xzLnRyaW0oKSkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBpZiAoY2xzLmluZGV4T2YoJyAnKSA+IC0xKSB7XG4gICAgICBjbHMuc3BsaXQoL1xccysvKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKGMpOyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbHMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgY3VyID0gXCIgXCIgKyAoZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnKSArIFwiIFwiO1xuICAgIGlmIChjdXIuaW5kZXhPZignICcgKyBjbHMgKyAnICcpIDwgMCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjdXIgKyBjbHMpLnRyaW0oKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgU1ZHIHNpbmNlIGNsYXNzTGlzdCBpcyBub3Qgc3VwcG9ydGVkIG9uXG4gKiBTVkcgZWxlbWVudHMgaW4gSUVcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MgKGVsLCBjbHMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghY2xzIHx8ICEoY2xzID0gY2xzLnRyaW0oKSkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBpZiAoY2xzLmluZGV4T2YoJyAnKSA+IC0xKSB7XG4gICAgICBjbHMuc3BsaXQoL1xccysvKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBlbC5jbGFzc0xpc3QucmVtb3ZlKGMpOyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpO1xuICAgIH1cbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5sZW5ndGgpIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGN1ciA9IFwiIFwiICsgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykgKyBcIiBcIjtcbiAgICB2YXIgdGFyID0gJyAnICsgY2xzICsgJyAnO1xuICAgIHdoaWxlIChjdXIuaW5kZXhPZih0YXIpID49IDApIHtcbiAgICAgIGN1ciA9IGN1ci5yZXBsYWNlKHRhciwgJyAnKTtcbiAgICB9XG4gICAgY3VyID0gY3VyLnRyaW0oKTtcbiAgICBpZiAoY3VyKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY3VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gcmVzb2x2ZVRyYW5zaXRpb24gKGRlZikge1xuICBpZiAoIWRlZikge1xuICAgIHJldHVyblxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0eXBlb2YgZGVmID09PSAnb2JqZWN0Jykge1xuICAgIHZhciByZXMgPSB7fTtcbiAgICBpZiAoZGVmLmNzcyAhPT0gZmFsc2UpIHtcbiAgICAgIGV4dGVuZChyZXMsIGF1dG9Dc3NUcmFuc2l0aW9uKGRlZi5uYW1lIHx8ICd2JykpO1xuICAgIH1cbiAgICBleHRlbmQocmVzLCBkZWYpO1xuICAgIHJldHVybiByZXNcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBhdXRvQ3NzVHJhbnNpdGlvbihkZWYpXG4gIH1cbn1cblxudmFyIGF1dG9Dc3NUcmFuc2l0aW9uID0gY2FjaGVkKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiB7XG4gICAgZW50ZXJDbGFzczogKG5hbWUgKyBcIi1lbnRlclwiKSxcbiAgICBlbnRlclRvQ2xhc3M6IChuYW1lICsgXCItZW50ZXItdG9cIiksXG4gICAgZW50ZXJBY3RpdmVDbGFzczogKG5hbWUgKyBcIi1lbnRlci1hY3RpdmVcIiksXG4gICAgbGVhdmVDbGFzczogKG5hbWUgKyBcIi1sZWF2ZVwiKSxcbiAgICBsZWF2ZVRvQ2xhc3M6IChuYW1lICsgXCItbGVhdmUtdG9cIiksXG4gICAgbGVhdmVBY3RpdmVDbGFzczogKG5hbWUgKyBcIi1sZWF2ZS1hY3RpdmVcIilcbiAgfVxufSk7XG5cbnZhciBoYXNUcmFuc2l0aW9uID0gaW5Ccm93c2VyICYmICFpc0lFOTtcbnZhciBUUkFOU0lUSU9OID0gJ3RyYW5zaXRpb24nO1xudmFyIEFOSU1BVElPTiA9ICdhbmltYXRpb24nO1xuXG4vLyBUcmFuc2l0aW9uIHByb3BlcnR5L2V2ZW50IHNuaWZmaW5nXG52YXIgdHJhbnNpdGlvblByb3AgPSAndHJhbnNpdGlvbic7XG52YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3RyYW5zaXRpb25lbmQnO1xudmFyIGFuaW1hdGlvblByb3AgPSAnYW5pbWF0aW9uJztcbnZhciBhbmltYXRpb25FbmRFdmVudCA9ICdhbmltYXRpb25lbmQnO1xuaWYgKGhhc1RyYW5zaXRpb24pIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh3aW5kb3cub250cmFuc2l0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcbiAgICB3aW5kb3cub253ZWJraXR0cmFuc2l0aW9uZW5kICE9PSB1bmRlZmluZWRcbiAgKSB7XG4gICAgdHJhbnNpdGlvblByb3AgPSAnV2Via2l0VHJhbnNpdGlvbic7XG4gICAgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQnO1xuICB9XG4gIGlmICh3aW5kb3cub25hbmltYXRpb25lbmQgPT09IHVuZGVmaW5lZCAmJlxuICAgIHdpbmRvdy5vbndlYmtpdGFuaW1hdGlvbmVuZCAhPT0gdW5kZWZpbmVkXG4gICkge1xuICAgIGFuaW1hdGlvblByb3AgPSAnV2Via2l0QW5pbWF0aW9uJztcbiAgICBhbmltYXRpb25FbmRFdmVudCA9ICd3ZWJraXRBbmltYXRpb25FbmQnO1xuICB9XG59XG5cbi8vIGJpbmRpbmcgdG8gd2luZG93IGlzIG5lY2Vzc2FyeSB0byBtYWtlIGhvdCByZWxvYWQgd29yayBpbiBJRSBpbiBzdHJpY3QgbW9kZVxudmFyIHJhZiA9IGluQnJvd3NlclxuICA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZCh3aW5kb3cpXG4gICAgOiBzZXRUaW1lb3V0XG4gIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbigpOyB9O1xuXG5mdW5jdGlvbiBuZXh0RnJhbWUgKGZuKSB7XG4gIHJhZihmdW5jdGlvbiAoKSB7XG4gICAgcmFmKGZuKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFRyYW5zaXRpb25DbGFzcyAoZWwsIGNscykge1xuICB2YXIgdHJhbnNpdGlvbkNsYXNzZXMgPSBlbC5fdHJhbnNpdGlvbkNsYXNzZXMgfHwgKGVsLl90cmFuc2l0aW9uQ2xhc3NlcyA9IFtdKTtcbiAgaWYgKHRyYW5zaXRpb25DbGFzc2VzLmluZGV4T2YoY2xzKSA8IDApIHtcbiAgICB0cmFuc2l0aW9uQ2xhc3Nlcy5wdXNoKGNscyk7XG4gICAgYWRkQ2xhc3MoZWwsIGNscyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlVHJhbnNpdGlvbkNsYXNzIChlbCwgY2xzKSB7XG4gIGlmIChlbC5fdHJhbnNpdGlvbkNsYXNzZXMpIHtcbiAgICByZW1vdmUoZWwuX3RyYW5zaXRpb25DbGFzc2VzLCBjbHMpO1xuICB9XG4gIHJlbW92ZUNsYXNzKGVsLCBjbHMpO1xufVxuXG5mdW5jdGlvbiB3aGVuVHJhbnNpdGlvbkVuZHMgKFxuICBlbCxcbiAgZXhwZWN0ZWRUeXBlLFxuICBjYlxuKSB7XG4gIHZhciByZWYgPSBnZXRUcmFuc2l0aW9uSW5mbyhlbCwgZXhwZWN0ZWRUeXBlKTtcbiAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgdmFyIHRpbWVvdXQgPSByZWYudGltZW91dDtcbiAgdmFyIHByb3BDb3VudCA9IHJlZi5wcm9wQ291bnQ7XG4gIGlmICghdHlwZSkgeyByZXR1cm4gY2IoKSB9XG4gIHZhciBldmVudCA9IHR5cGUgPT09IFRSQU5TSVRJT04gPyB0cmFuc2l0aW9uRW5kRXZlbnQgOiBhbmltYXRpb25FbmRFdmVudDtcbiAgdmFyIGVuZGVkID0gMDtcbiAgdmFyIGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBvbkVuZCk7XG4gICAgY2IoKTtcbiAgfTtcbiAgdmFyIG9uRW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IGVsKSB7XG4gICAgICBpZiAoKytlbmRlZCA+PSBwcm9wQ291bnQpIHtcbiAgICAgICAgZW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZW5kZWQgPCBwcm9wQ291bnQpIHtcbiAgICAgIGVuZCgpO1xuICAgIH1cbiAgfSwgdGltZW91dCArIDEpO1xuICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBvbkVuZCk7XG59XG5cbnZhciB0cmFuc2Zvcm1SRSA9IC9cXGIodHJhbnNmb3JtfGFsbCkoLHwkKS87XG5cbmZ1bmN0aW9uIGdldFRyYW5zaXRpb25JbmZvIChlbCwgZXhwZWN0ZWRUeXBlKSB7XG4gIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gIHZhciB0cmFuc2l0aW9uRGVsYXlzID0gc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ0RlbGF5J10uc3BsaXQoJywgJyk7XG4gIHZhciB0cmFuc2l0aW9uRHVyYXRpb25zID0gc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ0R1cmF0aW9uJ10uc3BsaXQoJywgJyk7XG4gIHZhciB0cmFuc2l0aW9uVGltZW91dCA9IGdldFRpbWVvdXQodHJhbnNpdGlvbkRlbGF5cywgdHJhbnNpdGlvbkR1cmF0aW9ucyk7XG4gIHZhciBhbmltYXRpb25EZWxheXMgPSBzdHlsZXNbYW5pbWF0aW9uUHJvcCArICdEZWxheSddLnNwbGl0KCcsICcpO1xuICB2YXIgYW5pbWF0aW9uRHVyYXRpb25zID0gc3R5bGVzW2FuaW1hdGlvblByb3AgKyAnRHVyYXRpb24nXS5zcGxpdCgnLCAnKTtcbiAgdmFyIGFuaW1hdGlvblRpbWVvdXQgPSBnZXRUaW1lb3V0KGFuaW1hdGlvbkRlbGF5cywgYW5pbWF0aW9uRHVyYXRpb25zKTtcblxuICB2YXIgdHlwZTtcbiAgdmFyIHRpbWVvdXQgPSAwO1xuICB2YXIgcHJvcENvdW50ID0gMDtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChleHBlY3RlZFR5cGUgPT09IFRSQU5TSVRJT04pIHtcbiAgICBpZiAodHJhbnNpdGlvblRpbWVvdXQgPiAwKSB7XG4gICAgICB0eXBlID0gVFJBTlNJVElPTjtcbiAgICAgIHRpbWVvdXQgPSB0cmFuc2l0aW9uVGltZW91dDtcbiAgICAgIHByb3BDb3VudCA9IHRyYW5zaXRpb25EdXJhdGlvbnMubGVuZ3RoO1xuICAgIH1cbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IEFOSU1BVElPTikge1xuICAgIGlmIChhbmltYXRpb25UaW1lb3V0ID4gMCkge1xuICAgICAgdHlwZSA9IEFOSU1BVElPTjtcbiAgICAgIHRpbWVvdXQgPSBhbmltYXRpb25UaW1lb3V0O1xuICAgICAgcHJvcENvdW50ID0gYW5pbWF0aW9uRHVyYXRpb25zLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGltZW91dCA9IE1hdGgubWF4KHRyYW5zaXRpb25UaW1lb3V0LCBhbmltYXRpb25UaW1lb3V0KTtcbiAgICB0eXBlID0gdGltZW91dCA+IDBcbiAgICAgID8gdHJhbnNpdGlvblRpbWVvdXQgPiBhbmltYXRpb25UaW1lb3V0XG4gICAgICAgID8gVFJBTlNJVElPTlxuICAgICAgICA6IEFOSU1BVElPTlxuICAgICAgOiBudWxsO1xuICAgIHByb3BDb3VudCA9IHR5cGVcbiAgICAgID8gdHlwZSA9PT0gVFJBTlNJVElPTlxuICAgICAgICA/IHRyYW5zaXRpb25EdXJhdGlvbnMubGVuZ3RoXG4gICAgICAgIDogYW5pbWF0aW9uRHVyYXRpb25zLmxlbmd0aFxuICAgICAgOiAwO1xuICB9XG4gIHZhciBoYXNUcmFuc2Zvcm0gPVxuICAgIHR5cGUgPT09IFRSQU5TSVRJT04gJiZcbiAgICB0cmFuc2Zvcm1SRS50ZXN0KHN0eWxlc1t0cmFuc2l0aW9uUHJvcCArICdQcm9wZXJ0eSddKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHRpbWVvdXQ6IHRpbWVvdXQsXG4gICAgcHJvcENvdW50OiBwcm9wQ291bnQsXG4gICAgaGFzVHJhbnNmb3JtOiBoYXNUcmFuc2Zvcm1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUaW1lb3V0IChkZWxheXMsIGR1cmF0aW9ucykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICB3aGlsZSAoZGVsYXlzLmxlbmd0aCA8IGR1cmF0aW9ucy5sZW5ndGgpIHtcbiAgICBkZWxheXMgPSBkZWxheXMuY29uY2F0KGRlbGF5cyk7XG4gIH1cblxuICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgZHVyYXRpb25zLm1hcChmdW5jdGlvbiAoZCwgaSkge1xuICAgIHJldHVybiB0b01zKGQpICsgdG9NcyhkZWxheXNbaV0pXG4gIH0pKVxufVxuXG5mdW5jdGlvbiB0b01zIChzKSB7XG4gIHJldHVybiBOdW1iZXIocy5zbGljZSgwLCAtMSkpICogMTAwMFxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZW50ZXIgKHZub2RlLCB0b2dnbGVEaXNwbGF5KSB7XG4gIHZhciBlbCA9IHZub2RlLmVsbTtcblxuICAvLyBjYWxsIGxlYXZlIGNhbGxiYWNrIG5vd1xuICBpZiAoaXNEZWYoZWwuX2xlYXZlQ2IpKSB7XG4gICAgZWwuX2xlYXZlQ2IuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICBlbC5fbGVhdmVDYigpO1xuICB9XG5cbiAgdmFyIGRhdGEgPSByZXNvbHZlVHJhbnNpdGlvbih2bm9kZS5kYXRhLnRyYW5zaXRpb24pO1xuICBpZiAoaXNVbmRlZihkYXRhKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChpc0RlZihlbC5fZW50ZXJDYikgfHwgZWwubm9kZVR5cGUgIT09IDEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBjc3MgPSBkYXRhLmNzcztcbiAgdmFyIHR5cGUgPSBkYXRhLnR5cGU7XG4gIHZhciBlbnRlckNsYXNzID0gZGF0YS5lbnRlckNsYXNzO1xuICB2YXIgZW50ZXJUb0NsYXNzID0gZGF0YS5lbnRlclRvQ2xhc3M7XG4gIHZhciBlbnRlckFjdGl2ZUNsYXNzID0gZGF0YS5lbnRlckFjdGl2ZUNsYXNzO1xuICB2YXIgYXBwZWFyQ2xhc3MgPSBkYXRhLmFwcGVhckNsYXNzO1xuICB2YXIgYXBwZWFyVG9DbGFzcyA9IGRhdGEuYXBwZWFyVG9DbGFzcztcbiAgdmFyIGFwcGVhckFjdGl2ZUNsYXNzID0gZGF0YS5hcHBlYXJBY3RpdmVDbGFzcztcbiAgdmFyIGJlZm9yZUVudGVyID0gZGF0YS5iZWZvcmVFbnRlcjtcbiAgdmFyIGVudGVyID0gZGF0YS5lbnRlcjtcbiAgdmFyIGFmdGVyRW50ZXIgPSBkYXRhLmFmdGVyRW50ZXI7XG4gIHZhciBlbnRlckNhbmNlbGxlZCA9IGRhdGEuZW50ZXJDYW5jZWxsZWQ7XG4gIHZhciBiZWZvcmVBcHBlYXIgPSBkYXRhLmJlZm9yZUFwcGVhcjtcbiAgdmFyIGFwcGVhciA9IGRhdGEuYXBwZWFyO1xuICB2YXIgYWZ0ZXJBcHBlYXIgPSBkYXRhLmFmdGVyQXBwZWFyO1xuICB2YXIgYXBwZWFyQ2FuY2VsbGVkID0gZGF0YS5hcHBlYXJDYW5jZWxsZWQ7XG4gIHZhciBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb247XG5cbiAgLy8gYWN0aXZlSW5zdGFuY2Ugd2lsbCBhbHdheXMgYmUgdGhlIDx0cmFuc2l0aW9uPiBjb21wb25lbnQgbWFuYWdpbmcgdGhpc1xuICAvLyB0cmFuc2l0aW9uLiBPbmUgZWRnZSBjYXNlIHRvIGNoZWNrIGlzIHdoZW4gdGhlIDx0cmFuc2l0aW9uPiBpcyBwbGFjZWRcbiAgLy8gYXMgdGhlIHJvb3Qgbm9kZSBvZiBhIGNoaWxkIGNvbXBvbmVudC4gSW4gdGhhdCBjYXNlIHdlIG5lZWQgdG8gY2hlY2tcbiAgLy8gPHRyYW5zaXRpb24+J3MgcGFyZW50IGZvciBhcHBlYXIgY2hlY2suXG4gIHZhciBjb250ZXh0ID0gYWN0aXZlSW5zdGFuY2U7XG4gIHZhciB0cmFuc2l0aW9uTm9kZSA9IGFjdGl2ZUluc3RhbmNlLiR2bm9kZTtcbiAgd2hpbGUgKHRyYW5zaXRpb25Ob2RlICYmIHRyYW5zaXRpb25Ob2RlLnBhcmVudCkge1xuICAgIHRyYW5zaXRpb25Ob2RlID0gdHJhbnNpdGlvbk5vZGUucGFyZW50O1xuICAgIGNvbnRleHQgPSB0cmFuc2l0aW9uTm9kZS5jb250ZXh0O1xuICB9XG5cbiAgdmFyIGlzQXBwZWFyID0gIWNvbnRleHQuX2lzTW91bnRlZCB8fCAhdm5vZGUuaXNSb290SW5zZXJ0O1xuXG4gIGlmIChpc0FwcGVhciAmJiAhYXBwZWFyICYmIGFwcGVhciAhPT0gJycpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdGFydENsYXNzID0gaXNBcHBlYXIgJiYgYXBwZWFyQ2xhc3NcbiAgICA/IGFwcGVhckNsYXNzXG4gICAgOiBlbnRlckNsYXNzO1xuICB2YXIgYWN0aXZlQ2xhc3MgPSBpc0FwcGVhciAmJiBhcHBlYXJBY3RpdmVDbGFzc1xuICAgID8gYXBwZWFyQWN0aXZlQ2xhc3NcbiAgICA6IGVudGVyQWN0aXZlQ2xhc3M7XG4gIHZhciB0b0NsYXNzID0gaXNBcHBlYXIgJiYgYXBwZWFyVG9DbGFzc1xuICAgID8gYXBwZWFyVG9DbGFzc1xuICAgIDogZW50ZXJUb0NsYXNzO1xuXG4gIHZhciBiZWZvcmVFbnRlckhvb2sgPSBpc0FwcGVhclxuICAgID8gKGJlZm9yZUFwcGVhciB8fCBiZWZvcmVFbnRlcilcbiAgICA6IGJlZm9yZUVudGVyO1xuICB2YXIgZW50ZXJIb29rID0gaXNBcHBlYXJcbiAgICA/ICh0eXBlb2YgYXBwZWFyID09PSAnZnVuY3Rpb24nID8gYXBwZWFyIDogZW50ZXIpXG4gICAgOiBlbnRlcjtcbiAgdmFyIGFmdGVyRW50ZXJIb29rID0gaXNBcHBlYXJcbiAgICA/IChhZnRlckFwcGVhciB8fCBhZnRlckVudGVyKVxuICAgIDogYWZ0ZXJFbnRlcjtcbiAgdmFyIGVudGVyQ2FuY2VsbGVkSG9vayA9IGlzQXBwZWFyXG4gICAgPyAoYXBwZWFyQ2FuY2VsbGVkIHx8IGVudGVyQ2FuY2VsbGVkKVxuICAgIDogZW50ZXJDYW5jZWxsZWQ7XG5cbiAgdmFyIGV4cGxpY2l0RW50ZXJEdXJhdGlvbiA9IHRvTnVtYmVyKFxuICAgIGlzT2JqZWN0KGR1cmF0aW9uKVxuICAgICAgPyBkdXJhdGlvbi5lbnRlclxuICAgICAgOiBkdXJhdGlvblxuICApO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGV4cGxpY2l0RW50ZXJEdXJhdGlvbiAhPSBudWxsKSB7XG4gICAgY2hlY2tEdXJhdGlvbihleHBsaWNpdEVudGVyRHVyYXRpb24sICdlbnRlcicsIHZub2RlKTtcbiAgfVxuXG4gIHZhciBleHBlY3RzQ1NTID0gY3NzICE9PSBmYWxzZSAmJiAhaXNJRTk7XG4gIHZhciB1c2VyV2FudHNDb250cm9sID0gZ2V0SG9va0FyZ3VtZW50c0xlbmd0aChlbnRlckhvb2spO1xuXG4gIHZhciBjYiA9IGVsLl9lbnRlckNiID0gb25jZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgdG9DbGFzcyk7XG4gICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGFjdGl2ZUNsYXNzKTtcbiAgICB9XG4gICAgaWYgKGNiLmNhbmNlbGxlZCkge1xuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBzdGFydENsYXNzKTtcbiAgICAgIH1cbiAgICAgIGVudGVyQ2FuY2VsbGVkSG9vayAmJiBlbnRlckNhbmNlbGxlZEhvb2soZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlckVudGVySG9vayAmJiBhZnRlckVudGVySG9vayhlbCk7XG4gICAgfVxuICAgIGVsLl9lbnRlckNiID0gbnVsbDtcbiAgfSk7XG5cbiAgaWYgKCF2bm9kZS5kYXRhLnNob3cpIHtcbiAgICAvLyByZW1vdmUgcGVuZGluZyBsZWF2ZSBlbGVtZW50IG9uIGVudGVyIGJ5IGluamVjdGluZyBhbiBpbnNlcnQgaG9va1xuICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLCAnaW5zZXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICB2YXIgcGVuZGluZ05vZGUgPSBwYXJlbnQgJiYgcGFyZW50Ll9wZW5kaW5nICYmIHBhcmVudC5fcGVuZGluZ1t2bm9kZS5rZXldO1xuICAgICAgaWYgKHBlbmRpbmdOb2RlICYmXG4gICAgICAgIHBlbmRpbmdOb2RlLnRhZyA9PT0gdm5vZGUudGFnICYmXG4gICAgICAgIHBlbmRpbmdOb2RlLmVsbS5fbGVhdmVDYlxuICAgICAgKSB7XG4gICAgICAgIHBlbmRpbmdOb2RlLmVsbS5fbGVhdmVDYigpO1xuICAgICAgfVxuICAgICAgZW50ZXJIb29rICYmIGVudGVySG9vayhlbCwgY2IpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gc3RhcnQgZW50ZXIgdHJhbnNpdGlvblxuICBiZWZvcmVFbnRlckhvb2sgJiYgYmVmb3JlRW50ZXJIb29rKGVsKTtcbiAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIHN0YXJ0Q2xhc3MpO1xuICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgYWN0aXZlQ2xhc3MpO1xuICAgIG5leHRGcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIHRvQ2xhc3MpO1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBzdGFydENsYXNzKTtcbiAgICAgIGlmICghY2IuY2FuY2VsbGVkICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgICAgIGlmIChpc1ZhbGlkRHVyYXRpb24oZXhwbGljaXRFbnRlckR1cmF0aW9uKSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoY2IsIGV4cGxpY2l0RW50ZXJEdXJhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBjYik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmICh2bm9kZS5kYXRhLnNob3cpIHtcbiAgICB0b2dnbGVEaXNwbGF5ICYmIHRvZ2dsZURpc3BsYXkoKTtcbiAgICBlbnRlckhvb2sgJiYgZW50ZXJIb29rKGVsLCBjYik7XG4gIH1cblxuICBpZiAoIWV4cGVjdHNDU1MgJiYgIXVzZXJXYW50c0NvbnRyb2wpIHtcbiAgICBjYigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxlYXZlICh2bm9kZSwgcm0pIHtcbiAgdmFyIGVsID0gdm5vZGUuZWxtO1xuXG4gIC8vIGNhbGwgZW50ZXIgY2FsbGJhY2sgbm93XG4gIGlmIChpc0RlZihlbC5fZW50ZXJDYikpIHtcbiAgICBlbC5fZW50ZXJDYi5jYW5jZWxsZWQgPSB0cnVlO1xuICAgIGVsLl9lbnRlckNiKCk7XG4gIH1cblxuICB2YXIgZGF0YSA9IHJlc29sdmVUcmFuc2l0aW9uKHZub2RlLmRhdGEudHJhbnNpdGlvbik7XG4gIGlmIChpc1VuZGVmKGRhdGEpIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIHJtKClcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNEZWYoZWwuX2xlYXZlQ2IpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgY3NzID0gZGF0YS5jc3M7XG4gIHZhciB0eXBlID0gZGF0YS50eXBlO1xuICB2YXIgbGVhdmVDbGFzcyA9IGRhdGEubGVhdmVDbGFzcztcbiAgdmFyIGxlYXZlVG9DbGFzcyA9IGRhdGEubGVhdmVUb0NsYXNzO1xuICB2YXIgbGVhdmVBY3RpdmVDbGFzcyA9IGRhdGEubGVhdmVBY3RpdmVDbGFzcztcbiAgdmFyIGJlZm9yZUxlYXZlID0gZGF0YS5iZWZvcmVMZWF2ZTtcbiAgdmFyIGxlYXZlID0gZGF0YS5sZWF2ZTtcbiAgdmFyIGFmdGVyTGVhdmUgPSBkYXRhLmFmdGVyTGVhdmU7XG4gIHZhciBsZWF2ZUNhbmNlbGxlZCA9IGRhdGEubGVhdmVDYW5jZWxsZWQ7XG4gIHZhciBkZWxheUxlYXZlID0gZGF0YS5kZWxheUxlYXZlO1xuICB2YXIgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuXG4gIHZhciBleHBlY3RzQ1NTID0gY3NzICE9PSBmYWxzZSAmJiAhaXNJRTk7XG4gIHZhciB1c2VyV2FudHNDb250cm9sID0gZ2V0SG9va0FyZ3VtZW50c0xlbmd0aChsZWF2ZSk7XG5cbiAgdmFyIGV4cGxpY2l0TGVhdmVEdXJhdGlvbiA9IHRvTnVtYmVyKFxuICAgIGlzT2JqZWN0KGR1cmF0aW9uKVxuICAgICAgPyBkdXJhdGlvbi5sZWF2ZVxuICAgICAgOiBkdXJhdGlvblxuICApO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGlzRGVmKGV4cGxpY2l0TGVhdmVEdXJhdGlvbikpIHtcbiAgICBjaGVja0R1cmF0aW9uKGV4cGxpY2l0TGVhdmVEdXJhdGlvbiwgJ2xlYXZlJywgdm5vZGUpO1xuICB9XG5cbiAgdmFyIGNiID0gZWwuX2xlYXZlQ2IgPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLl9wZW5kaW5nKSB7XG4gICAgICBlbC5wYXJlbnROb2RlLl9wZW5kaW5nW3Zub2RlLmtleV0gPSBudWxsO1xuICAgIH1cbiAgICBpZiAoZXhwZWN0c0NTUykge1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZVRvQ2xhc3MpO1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICB9XG4gICAgaWYgKGNiLmNhbmNlbGxlZCkge1xuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGxlYXZlQ2FuY2VsbGVkICYmIGxlYXZlQ2FuY2VsbGVkKGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm0oKTtcbiAgICAgIGFmdGVyTGVhdmUgJiYgYWZ0ZXJMZWF2ZShlbCk7XG4gICAgfVxuICAgIGVsLl9sZWF2ZUNiID0gbnVsbDtcbiAgfSk7XG5cbiAgaWYgKGRlbGF5TGVhdmUpIHtcbiAgICBkZWxheUxlYXZlKHBlcmZvcm1MZWF2ZSk7XG4gIH0gZWxzZSB7XG4gICAgcGVyZm9ybUxlYXZlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwZXJmb3JtTGVhdmUgKCkge1xuICAgIC8vIHRoZSBkZWxheWVkIGxlYXZlIG1heSBoYXZlIGFscmVhZHkgYmVlbiBjYW5jZWxsZWRcbiAgICBpZiAoY2IuY2FuY2VsbGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gcmVjb3JkIGxlYXZpbmcgZWxlbWVudFxuICAgIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XG4gICAgICAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyB8fCAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyA9IHt9KSlbKHZub2RlLmtleSldID0gdm5vZGU7XG4gICAgfVxuICAgIGJlZm9yZUxlYXZlICYmIGJlZm9yZUxlYXZlKGVsKTtcbiAgICBpZiAoZXhwZWN0c0NTUykge1xuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVBY3RpdmVDbGFzcyk7XG4gICAgICBuZXh0RnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlVG9DbGFzcyk7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVDbGFzcyk7XG4gICAgICAgIGlmICghY2IuY2FuY2VsbGVkICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgICAgICAgaWYgKGlzVmFsaWREdXJhdGlvbihleHBsaWNpdExlYXZlRHVyYXRpb24pKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNiLCBleHBsaWNpdExlYXZlRHVyYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGVuVHJhbnNpdGlvbkVuZHMoZWwsIHR5cGUsIGNiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBsZWF2ZSAmJiBsZWF2ZShlbCwgY2IpO1xuICAgIGlmICghZXhwZWN0c0NTUyAmJiAhdXNlcldhbnRzQ29udHJvbCkge1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gb25seSB1c2VkIGluIGRldiBtb2RlXG5mdW5jdGlvbiBjaGVja0R1cmF0aW9uICh2YWwsIG5hbWUsIHZub2RlKSB7XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnbnVtYmVyJykge1xuICAgIHdhcm4oXG4gICAgICBcIjx0cmFuc2l0aW9uPiBleHBsaWNpdCBcIiArIG5hbWUgKyBcIiBkdXJhdGlvbiBpcyBub3QgYSB2YWxpZCBudW1iZXIgLSBcIiArXG4gICAgICBcImdvdCBcIiArIChKU09OLnN0cmluZ2lmeSh2YWwpKSArIFwiLlwiLFxuICAgICAgdm5vZGUuY29udGV4dFxuICAgICk7XG4gIH0gZWxzZSBpZiAoaXNOYU4odmFsKSkge1xuICAgIHdhcm4oXG4gICAgICBcIjx0cmFuc2l0aW9uPiBleHBsaWNpdCBcIiArIG5hbWUgKyBcIiBkdXJhdGlvbiBpcyBOYU4gLSBcIiArXG4gICAgICAndGhlIGR1cmF0aW9uIGV4cHJlc3Npb24gbWlnaHQgYmUgaW5jb3JyZWN0LicsXG4gICAgICB2bm9kZS5jb250ZXh0XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkRHVyYXRpb24gKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbClcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgYSB0cmFuc2l0aW9uIGhvb2sncyBhcmd1bWVudCBsZW5ndGguIFRoZSBob29rIG1heSBiZTpcbiAqIC0gYSBtZXJnZWQgaG9vayAoaW52b2tlcikgd2l0aCB0aGUgb3JpZ2luYWwgaW4gLmZuc1xuICogLSBhIHdyYXBwZWQgY29tcG9uZW50IG1ldGhvZCAoY2hlY2sgLl9sZW5ndGgpXG4gKiAtIGEgcGxhaW4gZnVuY3Rpb24gKC5sZW5ndGgpXG4gKi9cbmZ1bmN0aW9uIGdldEhvb2tBcmd1bWVudHNMZW5ndGggKGZuKSB7XG4gIGlmIChpc1VuZGVmKGZuKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHZhciBpbnZva2VyRm5zID0gZm4uZm5zO1xuICBpZiAoaXNEZWYoaW52b2tlckZucykpIHtcbiAgICAvLyBpbnZva2VyXG4gICAgcmV0dXJuIGdldEhvb2tBcmd1bWVudHNMZW5ndGgoXG4gICAgICBBcnJheS5pc0FycmF5KGludm9rZXJGbnMpXG4gICAgICAgID8gaW52b2tlckZuc1swXVxuICAgICAgICA6IGludm9rZXJGbnNcbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChmbi5fbGVuZ3RoIHx8IGZuLmxlbmd0aCkgPiAxXG4gIH1cbn1cblxuZnVuY3Rpb24gX2VudGVyIChfLCB2bm9kZSkge1xuICBpZiAodm5vZGUuZGF0YS5zaG93ICE9PSB0cnVlKSB7XG4gICAgZW50ZXIodm5vZGUpO1xuICB9XG59XG5cbnZhciB0cmFuc2l0aW9uID0gaW5Ccm93c2VyID8ge1xuICBjcmVhdGU6IF9lbnRlcixcbiAgYWN0aXZhdGU6IF9lbnRlcixcbiAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUkJDEgKHZub2RlLCBybSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHZub2RlLmRhdGEuc2hvdyAhPT0gdHJ1ZSkge1xuICAgICAgbGVhdmUodm5vZGUsIHJtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm0oKTtcbiAgICB9XG4gIH1cbn0gOiB7fTtcblxudmFyIHBsYXRmb3JtTW9kdWxlcyA9IFtcbiAgYXR0cnMsXG4gIGtsYXNzLFxuICBldmVudHMsXG4gIGRvbVByb3BzLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvblxuXTtcblxuLyogICovXG5cbi8vIHRoZSBkaXJlY3RpdmUgbW9kdWxlIHNob3VsZCBiZSBhcHBsaWVkIGxhc3QsIGFmdGVyIGFsbFxuLy8gYnVpbHQtaW4gbW9kdWxlcyBoYXZlIGJlZW4gYXBwbGllZC5cbnZhciBtb2R1bGVzID0gcGxhdGZvcm1Nb2R1bGVzLmNvbmNhdChiYXNlTW9kdWxlcyk7XG5cbnZhciBwYXRjaCA9IGNyZWF0ZVBhdGNoRnVuY3Rpb24oeyBub2RlT3BzOiBub2RlT3BzLCBtb2R1bGVzOiBtb2R1bGVzIH0pO1xuXG4vKipcbiAqIE5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBsaWtlIGF0dGFjaGluZ1xuICogcHJvcGVydGllcyB0byBFbGVtZW50cy5cbiAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmIChpc0lFOSkge1xuICAvLyBodHRwOi8vd3d3Lm1hdHRzNDExLmNvbS9wb3N0L2ludGVybmV0LWV4cGxvcmVyLTktb25pbnB1dC9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGVsICYmIGVsLnZtb2RlbCkge1xuICAgICAgdHJpZ2dlcihlbCwgJ2lucHV0Jyk7XG4gICAgfVxuICB9KTtcbn1cblxudmFyIGRpcmVjdGl2ZSA9IHtcbiAgaW5zZXJ0ZWQ6IGZ1bmN0aW9uIGluc2VydGVkIChlbCwgYmluZGluZywgdm5vZGUsIG9sZFZub2RlKSB7XG4gICAgaWYgKHZub2RlLnRhZyA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIC8vICM2OTAzXG4gICAgICBpZiAob2xkVm5vZGUuZWxtICYmICFvbGRWbm9kZS5lbG0uX3ZPcHRpb25zKSB7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLCAncG9zdHBhdGNoJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRpcmVjdGl2ZS5jb21wb25lbnRVcGRhdGVkKGVsLCBiaW5kaW5nLCB2bm9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZub2RlLmNvbnRleHQpO1xuICAgICAgfVxuICAgICAgZWwuX3ZPcHRpb25zID0gW10ubWFwLmNhbGwoZWwub3B0aW9ucywgZ2V0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodm5vZGUudGFnID09PSAndGV4dGFyZWEnIHx8IGlzVGV4dElucHV0VHlwZShlbC50eXBlKSkge1xuICAgICAgZWwuX3ZNb2RpZmllcnMgPSBiaW5kaW5nLm1vZGlmaWVycztcbiAgICAgIGlmICghYmluZGluZy5tb2RpZmllcnMubGF6eSkge1xuICAgICAgICAvLyBTYWZhcmkgPCAxMC4yICYgVUlXZWJWaWV3IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCB3aGVuXG4gICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgLy8gdGhpcyBhbHNvIGZpeGVzIHRoZSBpc3N1ZSB3aGVyZSBzb21lIGJyb3dzZXJzIGUuZy4gaU9TIENocm9tZVxuICAgICAgICAvLyBmaXJlcyBcImNoYW5nZVwiIGluc3RlYWQgb2YgXCJpbnB1dFwiIG9uIGF1dG9jb21wbGV0ZS5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25Db21wb3NpdGlvbkVuZCk7XG4gICAgICAgIGlmICghaXNBbmRyb2lkKSB7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25zdGFydCcsIG9uQ29tcG9zaXRpb25TdGFydCk7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25lbmQnLCBvbkNvbXBvc2l0aW9uRW5kKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGlzSUU5KSB7XG4gICAgICAgICAgZWwudm1vZGVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnRVcGRhdGVkOiBmdW5jdGlvbiBjb21wb25lbnRVcGRhdGVkIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICBpZiAodm5vZGUudGFnID09PSAnc2VsZWN0Jykge1xuICAgICAgc2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZub2RlLmNvbnRleHQpO1xuICAgICAgLy8gaW4gY2FzZSB0aGUgb3B0aW9ucyByZW5kZXJlZCBieSB2LWZvciBoYXZlIGNoYW5nZWQsXG4gICAgICAvLyBpdCdzIHBvc3NpYmxlIHRoYXQgdGhlIHZhbHVlIGlzIG91dC1vZi1zeW5jIHdpdGggdGhlIHJlbmRlcmVkIG9wdGlvbnMuXG4gICAgICAvLyBkZXRlY3Qgc3VjaCBjYXNlcyBhbmQgZmlsdGVyIG91dCB2YWx1ZXMgdGhhdCBubyBsb25nZXIgaGFzIGEgbWF0Y2hpbmdcbiAgICAgIC8vIG9wdGlvbiBpbiB0aGUgRE9NLlxuICAgICAgdmFyIHByZXZPcHRpb25zID0gZWwuX3ZPcHRpb25zO1xuICAgICAgdmFyIGN1ck9wdGlvbnMgPSBlbC5fdk9wdGlvbnMgPSBbXS5tYXAuY2FsbChlbC5vcHRpb25zLCBnZXRWYWx1ZSk7XG4gICAgICBpZiAoY3VyT3B0aW9ucy5zb21lKGZ1bmN0aW9uIChvLCBpKSB7IHJldHVybiAhbG9vc2VFcXVhbChvLCBwcmV2T3B0aW9uc1tpXSk7IH0pKSB7XG4gICAgICAgIC8vIHRyaWdnZXIgY2hhbmdlIGV2ZW50IGlmXG4gICAgICAgIC8vIG5vIG1hdGNoaW5nIG9wdGlvbiBmb3VuZCBmb3IgYXQgbGVhc3Qgb25lIHZhbHVlXG4gICAgICAgIHZhciBuZWVkUmVzZXQgPSBlbC5tdWx0aXBsZVxuICAgICAgICAgID8gYmluZGluZy52YWx1ZS5zb21lKGZ1bmN0aW9uICh2KSB7IHJldHVybiBoYXNOb01hdGNoaW5nT3B0aW9uKHYsIGN1ck9wdGlvbnMpOyB9KVxuICAgICAgICAgIDogYmluZGluZy52YWx1ZSAhPT0gYmluZGluZy5vbGRWYWx1ZSAmJiBoYXNOb01hdGNoaW5nT3B0aW9uKGJpbmRpbmcudmFsdWUsIGN1ck9wdGlvbnMpO1xuICAgICAgICBpZiAobmVlZFJlc2V0KSB7XG4gICAgICAgICAgdHJpZ2dlcihlbCwgJ2NoYW5nZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRTZWxlY3RlZCAoZWwsIGJpbmRpbmcsIHZtKSB7XG4gIGFjdHVhbGx5U2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZtKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChpc0lFIHx8IGlzRWRnZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgYWN0dWFsbHlTZXRTZWxlY3RlZChlbCwgYmluZGluZywgdm0pO1xuICAgIH0sIDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFjdHVhbGx5U2V0U2VsZWN0ZWQgKGVsLCBiaW5kaW5nLCB2bSkge1xuICB2YXIgdmFsdWUgPSBiaW5kaW5nLnZhbHVlO1xuICB2YXIgaXNNdWx0aXBsZSA9IGVsLm11bHRpcGxlO1xuICBpZiAoaXNNdWx0aXBsZSAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICBcIjxzZWxlY3QgbXVsdGlwbGUgdi1tb2RlbD1cXFwiXCIgKyAoYmluZGluZy5leHByZXNzaW9uKSArIFwiXFxcIj4gXCIgK1xuICAgICAgXCJleHBlY3RzIGFuIEFycmF5IHZhbHVlIGZvciBpdHMgYmluZGluZywgYnV0IGdvdCBcIiArIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKSksXG4gICAgICB2bVxuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHNlbGVjdGVkLCBvcHRpb247XG4gIGZvciAodmFyIGkgPSAwLCBsID0gZWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBvcHRpb24gPSBlbC5vcHRpb25zW2ldO1xuICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICBzZWxlY3RlZCA9IGxvb3NlSW5kZXhPZih2YWx1ZSwgZ2V0VmFsdWUob3B0aW9uKSkgPiAtMTtcbiAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgIT09IHNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobG9vc2VFcXVhbChnZXRWYWx1ZShvcHRpb24pLCB2YWx1ZSkpIHtcbiAgICAgICAgaWYgKGVsLnNlbGVjdGVkSW5kZXggIT09IGkpIHtcbiAgICAgICAgICBlbC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKCFpc011bHRpcGxlKSB7XG4gICAgZWwuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc05vTWF0Y2hpbmdPcHRpb24gKHZhbHVlLCBvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zLmV2ZXJ5KGZ1bmN0aW9uIChvKSB7IHJldHVybiAhbG9vc2VFcXVhbChvLCB2YWx1ZSk7IH0pXG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlIChvcHRpb24pIHtcbiAgcmV0dXJuICdfdmFsdWUnIGluIG9wdGlvblxuICAgID8gb3B0aW9uLl92YWx1ZVxuICAgIDogb3B0aW9uLnZhbHVlXG59XG5cbmZ1bmN0aW9uIG9uQ29tcG9zaXRpb25TdGFydCAoZSkge1xuICBlLnRhcmdldC5jb21wb3NpbmcgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBvbkNvbXBvc2l0aW9uRW5kIChlKSB7XG4gIC8vIHByZXZlbnQgdHJpZ2dlcmluZyBhbiBpbnB1dCBldmVudCBmb3Igbm8gcmVhc29uXG4gIGlmICghZS50YXJnZXQuY29tcG9zaW5nKSB7IHJldHVybiB9XG4gIGUudGFyZ2V0LmNvbXBvc2luZyA9IGZhbHNlO1xuICB0cmlnZ2VyKGUudGFyZ2V0LCAnaW5wdXQnKTtcbn1cblxuZnVuY3Rpb24gdHJpZ2dlciAoZWwsIHR5cGUpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbn1cblxuLyogICovXG5cbi8vIHJlY3Vyc2l2ZWx5IHNlYXJjaCBmb3IgcG9zc2libGUgdHJhbnNpdGlvbiBkZWZpbmVkIGluc2lkZSB0aGUgY29tcG9uZW50IHJvb3RcbmZ1bmN0aW9uIGxvY2F0ZU5vZGUgKHZub2RlKSB7XG4gIHJldHVybiB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSAmJiAoIXZub2RlLmRhdGEgfHwgIXZub2RlLmRhdGEudHJhbnNpdGlvbilcbiAgICA/IGxvY2F0ZU5vZGUodm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlKVxuICAgIDogdm5vZGVcbn1cblxudmFyIHNob3cgPSB7XG4gIGJpbmQ6IGZ1bmN0aW9uIGJpbmQgKGVsLCByZWYsIHZub2RlKSB7XG4gICAgdmFyIHZhbHVlID0gcmVmLnZhbHVlO1xuXG4gICAgdm5vZGUgPSBsb2NhdGVOb2RlKHZub2RlKTtcbiAgICB2YXIgdHJhbnNpdGlvbiQkMSA9IHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS50cmFuc2l0aW9uO1xuICAgIHZhciBvcmlnaW5hbERpc3BsYXkgPSBlbC5fX3ZPcmlnaW5hbERpc3BsYXkgPVxuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJycgOiBlbC5zdHlsZS5kaXNwbGF5O1xuICAgIGlmICh2YWx1ZSAmJiB0cmFuc2l0aW9uJCQxKSB7XG4gICAgICB2bm9kZS5kYXRhLnNob3cgPSB0cnVlO1xuICAgICAgZW50ZXIodm5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IG9yaWdpbmFsRGlzcGxheTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyBvcmlnaW5hbERpc3BsYXkgOiAnbm9uZSc7XG4gICAgfVxuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlIChlbCwgcmVmLCB2bm9kZSkge1xuICAgIHZhciB2YWx1ZSA9IHJlZi52YWx1ZTtcbiAgICB2YXIgb2xkVmFsdWUgPSByZWYub2xkVmFsdWU7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodmFsdWUgPT09IG9sZFZhbHVlKSB7IHJldHVybiB9XG4gICAgdm5vZGUgPSBsb2NhdGVOb2RlKHZub2RlKTtcbiAgICB2YXIgdHJhbnNpdGlvbiQkMSA9IHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS50cmFuc2l0aW9uO1xuICAgIGlmICh0cmFuc2l0aW9uJCQxKSB7XG4gICAgICB2bm9kZS5kYXRhLnNob3cgPSB0cnVlO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVudGVyKHZub2RlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IGVsLl9fdk9yaWdpbmFsRGlzcGxheTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZSh2bm9kZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyBlbC5fX3ZPcmlnaW5hbERpc3BsYXkgOiAnbm9uZSc7XG4gICAgfVxuICB9LFxuXG4gIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kIChcbiAgICBlbCxcbiAgICBiaW5kaW5nLFxuICAgIHZub2RlLFxuICAgIG9sZFZub2RlLFxuICAgIGlzRGVzdHJveVxuICApIHtcbiAgICBpZiAoIWlzRGVzdHJveSkge1xuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IGVsLl9fdk9yaWdpbmFsRGlzcGxheTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBwbGF0Zm9ybURpcmVjdGl2ZXMgPSB7XG4gIG1vZGVsOiBkaXJlY3RpdmUsXG4gIHNob3c6IHNob3dcbn07XG5cbi8qICAqL1xuXG4vLyBQcm92aWRlcyB0cmFuc2l0aW9uIHN1cHBvcnQgZm9yIGEgc2luZ2xlIGVsZW1lbnQvY29tcG9uZW50LlxuLy8gc3VwcG9ydHMgdHJhbnNpdGlvbiBtb2RlIChvdXQtaW4gLyBpbi1vdXQpXG5cbnZhciB0cmFuc2l0aW9uUHJvcHMgPSB7XG4gIG5hbWU6IFN0cmluZyxcbiAgYXBwZWFyOiBCb29sZWFuLFxuICBjc3M6IEJvb2xlYW4sXG4gIG1vZGU6IFN0cmluZyxcbiAgdHlwZTogU3RyaW5nLFxuICBlbnRlckNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlQ2xhc3M6IFN0cmluZyxcbiAgZW50ZXJUb0NsYXNzOiBTdHJpbmcsXG4gIGxlYXZlVG9DbGFzczogU3RyaW5nLFxuICBlbnRlckFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyVG9DbGFzczogU3RyaW5nLFxuICBkdXJhdGlvbjogW051bWJlciwgU3RyaW5nLCBPYmplY3RdXG59O1xuXG4vLyBpbiBjYXNlIHRoZSBjaGlsZCBpcyBhbHNvIGFuIGFic3RyYWN0IGNvbXBvbmVudCwgZS5nLiA8a2VlcC1hbGl2ZT5cbi8vIHdlIHdhbnQgdG8gcmVjdXJzaXZlbHkgcmV0cmlldmUgdGhlIHJlYWwgY29tcG9uZW50IHRvIGJlIHJlbmRlcmVkXG5mdW5jdGlvbiBnZXRSZWFsQ2hpbGQgKHZub2RlKSB7XG4gIHZhciBjb21wT3B0aW9ucyA9IHZub2RlICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gIGlmIChjb21wT3B0aW9ucyAmJiBjb21wT3B0aW9ucy5DdG9yLm9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICByZXR1cm4gZ2V0UmVhbENoaWxkKGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoY29tcE9wdGlvbnMuY2hpbGRyZW4pKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB2bm9kZVxuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RUcmFuc2l0aW9uRGF0YSAoY29tcCkge1xuICB2YXIgZGF0YSA9IHt9O1xuICB2YXIgb3B0aW9ucyA9IGNvbXAuJG9wdGlvbnM7XG4gIC8vIHByb3BzXG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLnByb3BzRGF0YSkge1xuICAgIGRhdGFba2V5XSA9IGNvbXBba2V5XTtcbiAgfVxuICAvLyBldmVudHMuXG4gIC8vIGV4dHJhY3QgbGlzdGVuZXJzIGFuZCBwYXNzIHRoZW0gZGlyZWN0bHkgdG8gdGhlIHRyYW5zaXRpb24gbWV0aG9kc1xuICB2YXIgbGlzdGVuZXJzID0gb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICBmb3IgKHZhciBrZXkkMSBpbiBsaXN0ZW5lcnMpIHtcbiAgICBkYXRhW2NhbWVsaXplKGtleSQxKV0gPSBsaXN0ZW5lcnNba2V5JDFdO1xuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIHBsYWNlaG9sZGVyIChoLCByYXdDaGlsZCkge1xuICBpZiAoL1xcZC1rZWVwLWFsaXZlJC8udGVzdChyYXdDaGlsZC50YWcpKSB7XG4gICAgcmV0dXJuIGgoJ2tlZXAtYWxpdmUnLCB7XG4gICAgICBwcm9wczogcmF3Q2hpbGQuY29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGFcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhc1BhcmVudFRyYW5zaXRpb24gKHZub2RlKSB7XG4gIHdoaWxlICgodm5vZGUgPSB2bm9kZS5wYXJlbnQpKSB7XG4gICAgaWYgKHZub2RlLmRhdGEudHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTYW1lQ2hpbGQgKGNoaWxkLCBvbGRDaGlsZCkge1xuICByZXR1cm4gb2xkQ2hpbGQua2V5ID09PSBjaGlsZC5rZXkgJiYgb2xkQ2hpbGQudGFnID09PSBjaGlsZC50YWdcbn1cblxudmFyIFRyYW5zaXRpb24gPSB7XG4gIG5hbWU6ICd0cmFuc2l0aW9uJyxcbiAgcHJvcHM6IHRyYW5zaXRpb25Qcm9wcyxcbiAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIgKGgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQ7XG4gICAgaWYgKCFjaGlsZHJlbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIG91dCB0ZXh0IG5vZGVzIChwb3NzaWJsZSB3aGl0ZXNwYWNlcylcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy50YWcgfHwgaXNBc3luY1BsYWNlaG9sZGVyKGMpOyB9KTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIWNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gd2FybiBtdWx0aXBsZSBlbGVtZW50c1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICc8dHJhbnNpdGlvbj4gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIHNpbmdsZSBlbGVtZW50LiBVc2UgJyArXG4gICAgICAgICc8dHJhbnNpdGlvbi1ncm91cD4gZm9yIGxpc3RzLicsXG4gICAgICAgIHRoaXMuJHBhcmVudFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgbW9kZSA9IHRoaXMubW9kZTtcblxuICAgIC8vIHdhcm4gaW52YWxpZCBtb2RlXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAgIG1vZGUgJiYgbW9kZSAhPT0gJ2luLW91dCcgJiYgbW9kZSAhPT0gJ291dC1pbidcbiAgICApIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdpbnZhbGlkIDx0cmFuc2l0aW9uPiBtb2RlOiAnICsgbW9kZSxcbiAgICAgICAgdGhpcy4kcGFyZW50XG4gICAgICApO1xuICAgIH1cblxuICAgIHZhciByYXdDaGlsZCA9IGNoaWxkcmVuWzBdO1xuXG4gICAgLy8gaWYgdGhpcyBpcyBhIGNvbXBvbmVudCByb290IG5vZGUgYW5kIHRoZSBjb21wb25lbnQnc1xuICAgIC8vIHBhcmVudCBjb250YWluZXIgbm9kZSBhbHNvIGhhcyB0cmFuc2l0aW9uLCBza2lwLlxuICAgIGlmIChoYXNQYXJlbnRUcmFuc2l0aW9uKHRoaXMuJHZub2RlKSkge1xuICAgICAgcmV0dXJuIHJhd0NoaWxkXG4gICAgfVxuXG4gICAgLy8gYXBwbHkgdHJhbnNpdGlvbiBkYXRhIHRvIGNoaWxkXG4gICAgLy8gdXNlIGdldFJlYWxDaGlsZCgpIHRvIGlnbm9yZSBhYnN0cmFjdCBjb21wb25lbnRzIGUuZy4ga2VlcC1hbGl2ZVxuICAgIHZhciBjaGlsZCA9IGdldFJlYWxDaGlsZChyYXdDaGlsZCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFjaGlsZCkge1xuICAgICAgcmV0dXJuIHJhd0NoaWxkXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xlYXZpbmcpIHtcbiAgICAgIHJldHVybiBwbGFjZWhvbGRlcihoLCByYXdDaGlsZClcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgYSBrZXkgdGhhdCBpcyB1bmlxdWUgdG8gdGhlIHZub2RlIHR5cGUgYW5kIHRvIHRoaXMgdHJhbnNpdGlvblxuICAgIC8vIGNvbXBvbmVudCBpbnN0YW5jZS4gVGhpcyBrZXkgd2lsbCBiZSB1c2VkIHRvIHJlbW92ZSBwZW5kaW5nIGxlYXZpbmcgbm9kZXNcbiAgICAvLyBkdXJpbmcgZW50ZXJpbmcuXG4gICAgdmFyIGlkID0gXCJfX3RyYW5zaXRpb24tXCIgKyAodGhpcy5fdWlkKSArIFwiLVwiO1xuICAgIGNoaWxkLmtleSA9IGNoaWxkLmtleSA9PSBudWxsXG4gICAgICA/IGNoaWxkLmlzQ29tbWVudFxuICAgICAgICA/IGlkICsgJ2NvbW1lbnQnXG4gICAgICAgIDogaWQgKyBjaGlsZC50YWdcbiAgICAgIDogaXNQcmltaXRpdmUoY2hpbGQua2V5KVxuICAgICAgICA/IChTdHJpbmcoY2hpbGQua2V5KS5pbmRleE9mKGlkKSA9PT0gMCA/IGNoaWxkLmtleSA6IGlkICsgY2hpbGQua2V5KVxuICAgICAgICA6IGNoaWxkLmtleTtcblxuICAgIHZhciBkYXRhID0gKGNoaWxkLmRhdGEgfHwgKGNoaWxkLmRhdGEgPSB7fSkpLnRyYW5zaXRpb24gPSBleHRyYWN0VHJhbnNpdGlvbkRhdGEodGhpcyk7XG4gICAgdmFyIG9sZFJhd0NoaWxkID0gdGhpcy5fdm5vZGU7XG4gICAgdmFyIG9sZENoaWxkID0gZ2V0UmVhbENoaWxkKG9sZFJhd0NoaWxkKTtcblxuICAgIC8vIG1hcmsgdi1zaG93XG4gICAgLy8gc28gdGhhdCB0aGUgdHJhbnNpdGlvbiBtb2R1bGUgY2FuIGhhbmQgb3ZlciB0aGUgY29udHJvbCB0byB0aGUgZGlyZWN0aXZlXG4gICAgaWYgKGNoaWxkLmRhdGEuZGlyZWN0aXZlcyAmJiBjaGlsZC5kYXRhLmRpcmVjdGl2ZXMuc29tZShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5uYW1lID09PSAnc2hvdyc7IH0pKSB7XG4gICAgICBjaGlsZC5kYXRhLnNob3cgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG9sZENoaWxkICYmXG4gICAgICBvbGRDaGlsZC5kYXRhICYmXG4gICAgICAhaXNTYW1lQ2hpbGQoY2hpbGQsIG9sZENoaWxkKSAmJlxuICAgICAgIWlzQXN5bmNQbGFjZWhvbGRlcihvbGRDaGlsZCkgJiZcbiAgICAgIC8vICM2Njg3IGNvbXBvbmVudCByb290IGlzIGEgY29tbWVudCBub2RlXG4gICAgICAhKG9sZENoaWxkLmNvbXBvbmVudEluc3RhbmNlICYmIG9sZENoaWxkLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZS5pc0NvbW1lbnQpXG4gICAgKSB7XG4gICAgICAvLyByZXBsYWNlIG9sZCBjaGlsZCB0cmFuc2l0aW9uIGRhdGEgd2l0aCBmcmVzaCBvbmVcbiAgICAgIC8vIGltcG9ydGFudCBmb3IgZHluYW1pYyB0cmFuc2l0aW9ucyFcbiAgICAgIHZhciBvbGREYXRhID0gb2xkQ2hpbGQuZGF0YS50cmFuc2l0aW9uID0gZXh0ZW5kKHt9LCBkYXRhKTtcbiAgICAgIC8vIGhhbmRsZSB0cmFuc2l0aW9uIG1vZGVcbiAgICAgIGlmIChtb2RlID09PSAnb3V0LWluJykge1xuICAgICAgICAvLyByZXR1cm4gcGxhY2Vob2xkZXIgbm9kZSBhbmQgcXVldWUgdXBkYXRlIHdoZW4gbGVhdmUgZmluaXNoZXNcbiAgICAgICAgdGhpcy5fbGVhdmluZyA9IHRydWU7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKG9sZERhdGEsICdhZnRlckxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMkMS5fbGVhdmluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMkMS4kZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwbGFjZWhvbGRlcihoLCByYXdDaGlsZClcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ2luLW91dCcpIHtcbiAgICAgICAgaWYgKGlzQXN5bmNQbGFjZWhvbGRlcihjaGlsZCkpIHtcbiAgICAgICAgICByZXR1cm4gb2xkUmF3Q2hpbGRcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsYXllZExlYXZlO1xuICAgICAgICB2YXIgcGVyZm9ybUxlYXZlID0gZnVuY3Rpb24gKCkgeyBkZWxheWVkTGVhdmUoKTsgfTtcbiAgICAgICAgbWVyZ2VWTm9kZUhvb2soZGF0YSwgJ2FmdGVyRW50ZXInLCBwZXJmb3JtTGVhdmUpO1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhkYXRhLCAnZW50ZXJDYW5jZWxsZWQnLCBwZXJmb3JtTGVhdmUpO1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhvbGREYXRhLCAnZGVsYXlMZWF2ZScsIGZ1bmN0aW9uIChsZWF2ZSkgeyBkZWxheWVkTGVhdmUgPSBsZWF2ZTsgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhd0NoaWxkXG4gIH1cbn07XG5cbi8qICAqL1xuXG4vLyBQcm92aWRlcyB0cmFuc2l0aW9uIHN1cHBvcnQgZm9yIGxpc3QgaXRlbXMuXG4vLyBzdXBwb3J0cyBtb3ZlIHRyYW5zaXRpb25zIHVzaW5nIHRoZSBGTElQIHRlY2huaXF1ZS5cblxuLy8gQmVjYXVzZSB0aGUgdmRvbSdzIGNoaWxkcmVuIHVwZGF0ZSBhbGdvcml0aG0gaXMgXCJ1bnN0YWJsZVwiIC0gaS5lLlxuLy8gaXQgZG9lc24ndCBndWFyYW50ZWUgdGhlIHJlbGF0aXZlIHBvc2l0aW9uaW5nIG9mIHJlbW92ZWQgZWxlbWVudHMsXG4vLyB3ZSBmb3JjZSB0cmFuc2l0aW9uLWdyb3VwIHRvIHVwZGF0ZSBpdHMgY2hpbGRyZW4gaW50byB0d28gcGFzc2VzOlxuLy8gaW4gdGhlIGZpcnN0IHBhc3MsIHdlIHJlbW92ZSBhbGwgbm9kZXMgdGhhdCBuZWVkIHRvIGJlIHJlbW92ZWQsXG4vLyB0cmlnZ2VyaW5nIHRoZWlyIGxlYXZpbmcgdHJhbnNpdGlvbjsgaW4gdGhlIHNlY29uZCBwYXNzLCB3ZSBpbnNlcnQvbW92ZVxuLy8gaW50byB0aGUgZmluYWwgZGVzaXJlZCBzdGF0ZS4gVGhpcyB3YXkgaW4gdGhlIHNlY29uZCBwYXNzIHJlbW92ZWRcbi8vIG5vZGVzIHdpbGwgcmVtYWluIHdoZXJlIHRoZXkgc2hvdWxkIGJlLlxuXG52YXIgcHJvcHMgPSBleHRlbmQoe1xuICB0YWc6IFN0cmluZyxcbiAgbW92ZUNsYXNzOiBTdHJpbmdcbn0sIHRyYW5zaXRpb25Qcm9wcyk7XG5cbmRlbGV0ZSBwcm9wcy5tb2RlO1xuXG52YXIgVHJhbnNpdGlvbkdyb3VwID0ge1xuICBwcm9wczogcHJvcHMsXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIgKGgpIHtcbiAgICB2YXIgdGFnID0gdGhpcy50YWcgfHwgdGhpcy4kdm5vZGUuZGF0YS50YWcgfHwgJ3NwYW4nO1xuICAgIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLnByZXZDaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW47XG4gICAgdmFyIHJhd0NoaWxkcmVuID0gdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXTtcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdmFyIHRyYW5zaXRpb25EYXRhID0gZXh0cmFjdFRyYW5zaXRpb25EYXRhKHRoaXMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYXdDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSByYXdDaGlsZHJlbltpXTtcbiAgICAgIGlmIChjLnRhZykge1xuICAgICAgICBpZiAoYy5rZXkgIT0gbnVsbCAmJiBTdHJpbmcoYy5rZXkpLmluZGV4T2YoJ19fdmxpc3QnKSAhPT0gMCkge1xuICAgICAgICAgIGNoaWxkcmVuLnB1c2goYyk7XG4gICAgICAgICAgbWFwW2Mua2V5XSA9IGNcbiAgICAgICAgICA7KGMuZGF0YSB8fCAoYy5kYXRhID0ge30pKS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkRhdGE7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciBvcHRzID0gYy5jb21wb25lbnRPcHRpb25zO1xuICAgICAgICAgIHZhciBuYW1lID0gb3B0cyA/IChvcHRzLkN0b3Iub3B0aW9ucy5uYW1lIHx8IG9wdHMudGFnIHx8ICcnKSA6IGMudGFnO1xuICAgICAgICAgIHdhcm4oKFwiPHRyYW5zaXRpb24tZ3JvdXA+IGNoaWxkcmVuIG11c3QgYmUga2V5ZWQ6IDxcIiArIG5hbWUgKyBcIj5cIikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByZXZDaGlsZHJlbikge1xuICAgICAgdmFyIGtlcHQgPSBbXTtcbiAgICAgIHZhciByZW1vdmVkID0gW107XG4gICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBwcmV2Q2hpbGRyZW4ubGVuZ3RoOyBpJDErKykge1xuICAgICAgICB2YXIgYyQxID0gcHJldkNoaWxkcmVuW2kkMV07XG4gICAgICAgIGMkMS5kYXRhLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRGF0YTtcbiAgICAgICAgYyQxLmRhdGEucG9zID0gYyQxLmVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKG1hcFtjJDEua2V5XSkge1xuICAgICAgICAgIGtlcHQucHVzaChjJDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbW92ZWQucHVzaChjJDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmtlcHQgPSBoKHRhZywgbnVsbCwga2VwdCk7XG4gICAgICB0aGlzLnJlbW92ZWQgPSByZW1vdmVkO1xuICAgIH1cblxuICAgIHJldHVybiBoKHRhZywgbnVsbCwgY2hpbGRyZW4pXG4gIH0sXG5cbiAgYmVmb3JlVXBkYXRlOiBmdW5jdGlvbiBiZWZvcmVVcGRhdGUgKCkge1xuICAgIC8vIGZvcmNlIHJlbW92aW5nIHBhc3NcbiAgICB0aGlzLl9fcGF0Y2hfXyhcbiAgICAgIHRoaXMuX3Zub2RlLFxuICAgICAgdGhpcy5rZXB0LFxuICAgICAgZmFsc2UsIC8vIGh5ZHJhdGluZ1xuICAgICAgdHJ1ZSAvLyByZW1vdmVPbmx5ICghaW1wb3J0YW50LCBhdm9pZHMgdW5uZWNlc3NhcnkgbW92ZXMpXG4gICAgKTtcbiAgICB0aGlzLl92bm9kZSA9IHRoaXMua2VwdDtcbiAgfSxcblxuICB1cGRhdGVkOiBmdW5jdGlvbiB1cGRhdGVkICgpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByZXZDaGlsZHJlbjtcbiAgICB2YXIgbW92ZUNsYXNzID0gdGhpcy5tb3ZlQ2xhc3MgfHwgKCh0aGlzLm5hbWUgfHwgJ3YnKSArICctbW92ZScpO1xuICAgIGlmICghY2hpbGRyZW4ubGVuZ3RoIHx8ICF0aGlzLmhhc01vdmUoY2hpbGRyZW5bMF0uZWxtLCBtb3ZlQ2xhc3MpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyB3ZSBkaXZpZGUgdGhlIHdvcmsgaW50byB0aHJlZSBsb29wcyB0byBhdm9pZCBtaXhpbmcgRE9NIHJlYWRzIGFuZCB3cml0ZXNcbiAgICAvLyBpbiBlYWNoIGl0ZXJhdGlvbiAtIHdoaWNoIGhlbHBzIHByZXZlbnQgbGF5b3V0IHRocmFzaGluZy5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNhbGxQZW5kaW5nQ2JzKTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKHJlY29yZFBvc2l0aW9uKTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGFwcGx5VHJhbnNsYXRpb24pO1xuXG4gICAgLy8gZm9yY2UgcmVmbG93IHRvIHB1dCBldmVyeXRoaW5nIGluIHBvc2l0aW9uXG4gICAgLy8gYXNzaWduIHRvIHRoaXMgdG8gYXZvaWQgYmVpbmcgcmVtb3ZlZCBpbiB0cmVlLXNoYWtpbmdcbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICB0aGlzLl9yZWZsb3cgPSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcblxuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgIGlmIChjLmRhdGEubW92ZWQpIHtcbiAgICAgICAgdmFyIGVsID0gYy5lbG07XG4gICAgICAgIHZhciBzID0gZWwuc3R5bGU7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbW92ZUNsYXNzKTtcbiAgICAgICAgcy50cmFuc2Zvcm0gPSBzLldlYmtpdFRyYW5zZm9ybSA9IHMudHJhbnNpdGlvbkR1cmF0aW9uID0gJyc7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkVuZEV2ZW50LCBlbC5fbW92ZUNiID0gZnVuY3Rpb24gY2IgKGUpIHtcbiAgICAgICAgICBpZiAoIWUgfHwgL3RyYW5zZm9ybSQvLnRlc3QoZS5wcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FbmRFdmVudCwgY2IpO1xuICAgICAgICAgICAgZWwuX21vdmVDYiA9IG51bGw7XG4gICAgICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIG1vdmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgaGFzTW92ZTogZnVuY3Rpb24gaGFzTW92ZSAoZWwsIG1vdmVDbGFzcykge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIWhhc1RyYW5zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICh0aGlzLl9oYXNNb3ZlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNNb3ZlXG4gICAgICB9XG4gICAgICAvLyBEZXRlY3Qgd2hldGhlciBhbiBlbGVtZW50IHdpdGggdGhlIG1vdmUgY2xhc3MgYXBwbGllZCBoYXNcbiAgICAgIC8vIENTUyB0cmFuc2l0aW9ucy4gU2luY2UgdGhlIGVsZW1lbnQgbWF5IGJlIGluc2lkZSBhbiBlbnRlcmluZ1xuICAgICAgLy8gdHJhbnNpdGlvbiBhdCB0aGlzIHZlcnkgbW9tZW50LCB3ZSBtYWtlIGEgY2xvbmUgb2YgaXQgYW5kIHJlbW92ZVxuICAgICAgLy8gYWxsIG90aGVyIHRyYW5zaXRpb24gY2xhc3NlcyBhcHBsaWVkIHRvIGVuc3VyZSBvbmx5IHRoZSBtb3ZlIGNsYXNzXG4gICAgICAvLyBpcyBhcHBsaWVkLlxuICAgICAgdmFyIGNsb25lID0gZWwuY2xvbmVOb2RlKCk7XG4gICAgICBpZiAoZWwuX3RyYW5zaXRpb25DbGFzc2VzKSB7XG4gICAgICAgIGVsLl90cmFuc2l0aW9uQ2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHsgcmVtb3ZlQ2xhc3MoY2xvbmUsIGNscyk7IH0pO1xuICAgICAgfVxuICAgICAgYWRkQ2xhc3MoY2xvbmUsIG1vdmVDbGFzcyk7XG4gICAgICBjbG9uZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy4kZWwuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgICAgdmFyIGluZm8gPSBnZXRUcmFuc2l0aW9uSW5mbyhjbG9uZSk7XG4gICAgICB0aGlzLiRlbC5yZW1vdmVDaGlsZChjbG9uZSk7XG4gICAgICByZXR1cm4gKHRoaXMuX2hhc01vdmUgPSBpbmZvLmhhc1RyYW5zZm9ybSlcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNhbGxQZW5kaW5nQ2JzIChjKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoYy5lbG0uX21vdmVDYikge1xuICAgIGMuZWxtLl9tb3ZlQ2IoKTtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGMuZWxtLl9lbnRlckNiKSB7XG4gICAgYy5lbG0uX2VudGVyQ2IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWNvcmRQb3NpdGlvbiAoYykge1xuICBjLmRhdGEubmV3UG9zID0gYy5lbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5VHJhbnNsYXRpb24gKGMpIHtcbiAgdmFyIG9sZFBvcyA9IGMuZGF0YS5wb3M7XG4gIHZhciBuZXdQb3MgPSBjLmRhdGEubmV3UG9zO1xuICB2YXIgZHggPSBvbGRQb3MubGVmdCAtIG5ld1Bvcy5sZWZ0O1xuICB2YXIgZHkgPSBvbGRQb3MudG9wIC0gbmV3UG9zLnRvcDtcbiAgaWYgKGR4IHx8IGR5KSB7XG4gICAgYy5kYXRhLm1vdmVkID0gdHJ1ZTtcbiAgICB2YXIgcyA9IGMuZWxtLnN0eWxlO1xuICAgIHMudHJhbnNmb3JtID0gcy5XZWJraXRUcmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIGR4ICsgXCJweCxcIiArIGR5ICsgXCJweClcIjtcbiAgICBzLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwcyc7XG4gIH1cbn1cblxudmFyIHBsYXRmb3JtQ29tcG9uZW50cyA9IHtcbiAgVHJhbnNpdGlvbjogVHJhbnNpdGlvbixcbiAgVHJhbnNpdGlvbkdyb3VwOiBUcmFuc2l0aW9uR3JvdXBcbn07XG5cbi8qICAqL1xuXG4vLyBpbnN0YWxsIHBsYXRmb3JtIHNwZWNpZmljIHV0aWxzXG5WdWUkMy5jb25maWcubXVzdFVzZVByb3AgPSBtdXN0VXNlUHJvcDtcblZ1ZSQzLmNvbmZpZy5pc1Jlc2VydmVkVGFnID0gaXNSZXNlcnZlZFRhZztcblZ1ZSQzLmNvbmZpZy5pc1Jlc2VydmVkQXR0ciA9IGlzUmVzZXJ2ZWRBdHRyO1xuVnVlJDMuY29uZmlnLmdldFRhZ05hbWVzcGFjZSA9IGdldFRhZ05hbWVzcGFjZTtcblZ1ZSQzLmNvbmZpZy5pc1Vua25vd25FbGVtZW50ID0gaXNVbmtub3duRWxlbWVudDtcblxuLy8gaW5zdGFsbCBwbGF0Zm9ybSBydW50aW1lIGRpcmVjdGl2ZXMgJiBjb21wb25lbnRzXG5leHRlbmQoVnVlJDMub3B0aW9ucy5kaXJlY3RpdmVzLCBwbGF0Zm9ybURpcmVjdGl2ZXMpO1xuZXh0ZW5kKFZ1ZSQzLm9wdGlvbnMuY29tcG9uZW50cywgcGxhdGZvcm1Db21wb25lbnRzKTtcblxuLy8gaW5zdGFsbCBwbGF0Zm9ybSBwYXRjaCBmdW5jdGlvblxuVnVlJDMucHJvdG90eXBlLl9fcGF0Y2hfXyA9IGluQnJvd3NlciA/IHBhdGNoIDogbm9vcDtcblxuLy8gcHVibGljIG1vdW50IG1ldGhvZFxuVnVlJDMucHJvdG90eXBlLiRtb3VudCA9IGZ1bmN0aW9uIChcbiAgZWwsXG4gIGh5ZHJhdGluZ1xuKSB7XG4gIGVsID0gZWwgJiYgaW5Ccm93c2VyID8gcXVlcnkoZWwpIDogdW5kZWZpbmVkO1xuICByZXR1cm4gbW91bnRDb21wb25lbnQodGhpcywgZWwsIGh5ZHJhdGluZylcbn07XG5cbi8vIGRldnRvb2xzIGdsb2JhbCBob29rXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuVnVlJDMubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICBpZiAoY29uZmlnLmRldnRvb2xzKSB7XG4gICAgaWYgKGRldnRvb2xzKSB7XG4gICAgICBkZXZ0b29scy5lbWl0KCdpbml0JywgVnVlJDMpO1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBpc0Nocm9tZSkge1xuICAgICAgY29uc29sZVtjb25zb2xlLmluZm8gPyAnaW5mbycgOiAnbG9nJ10oXG4gICAgICAgICdEb3dubG9hZCB0aGUgVnVlIERldnRvb2xzIGV4dGVuc2lvbiBmb3IgYSBiZXR0ZXIgZGV2ZWxvcG1lbnQgZXhwZXJpZW5jZTpcXG4nICtcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtZGV2dG9vbHMnXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIGNvbmZpZy5wcm9kdWN0aW9uVGlwICE9PSBmYWxzZSAmJlxuICAgIGluQnJvd3NlciAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCdcbiAgKSB7XG4gICAgY29uc29sZVtjb25zb2xlLmluZm8gPyAnaW5mbycgOiAnbG9nJ10oXG4gICAgICBcIllvdSBhcmUgcnVubmluZyBWdWUgaW4gZGV2ZWxvcG1lbnQgbW9kZS5cXG5cIiArXG4gICAgICBcIk1ha2Ugc3VyZSB0byB0dXJuIG9uIHByb2R1Y3Rpb24gbW9kZSB3aGVuIGRlcGxveWluZyBmb3IgcHJvZHVjdGlvbi5cXG5cIiArXG4gICAgICBcIlNlZSBtb3JlIHRpcHMgYXQgaHR0cHM6Ly92dWVqcy5vcmcvZ3VpZGUvZGVwbG95bWVudC5odG1sXCJcbiAgICApO1xuICB9XG59LCAwKTtcblxuLyogICovXG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZSQzO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvLyBDdWJpY1xuICBlYXNlSW5DdWJpYzogJ2N1YmljLWJlemllcigwLjU1MCwgMC4wNTUsIDAuNjc1LCAwLjE5MCknLFxuICBlYXNlT3V0Q3ViaWM6ICdjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEwLCAwLjM1NSwgMS4wMDApJyxcbiAgZWFzZUluT3V0Q3ViaWM6ICdjdWJpYy1iZXppZXIoMC42NDUsIDAuMDQ1LCAwLjM1NSwgMS4wMDApJyxcblxuICAvLyBDaXJjXG4gIGVhc2VJbkNpcmM6ICdjdWJpYy1iZXppZXIoMC42MDAsIDAuMDQwLCAwLjk4MCwgMC4zMzUpJyxcbiAgZWFzZU91dENpcmM6ICdjdWJpYy1iZXppZXIoMC4wNzUsIDAuODIwLCAwLjE2NSwgMS4wMDApJyxcbiAgZWFzZUluT3V0Q2lyYzogJ2N1YmljLWJlemllcigwLjc4NSwgMC4xMzUsIDAuMTUwLCAwLjg2MCknLFxuXG4gIC8vIEV4cG9cbiAgZWFzZUluRXhwbzogJ2N1YmljLWJlemllcigwLjk1MCwgMC4wNTAsIDAuNzk1LCAwLjAzNSknLFxuICBlYXNlT3V0RXhwbzogJ2N1YmljLWJlemllcigwLjE5MCwgMS4wMDAsIDAuMjIwLCAxLjAwMCknLFxuICBlYXNlSW5PdXRFeHBvOiAnY3ViaWMtYmV6aWVyKDEuMDAwLCAwLjAwMCwgMC4wMDAsIDEuMDAwKScsXG5cbiAgLy8gUXVhZFxuICBlYXNlSW5RdWFkOiAnY3ViaWMtYmV6aWVyKDAuNTUwLCAwLjA4NSwgMC42ODAsIDAuNTMwKScsXG4gIGVhc2VPdXRRdWFkOiAnY3ViaWMtYmV6aWVyKDAuMjUwLCAwLjQ2MCwgMC40NTAsIDAuOTQwKScsXG4gIGVhc2VJbk91dFF1YWQ6ICdjdWJpYy1iZXppZXIoMC40NTUsIDAuMDMwLCAwLjUxNSwgMC45NTUpJyxcblxuICAvLyBRdWFydFxuICBlYXNlSW5RdWFydDogJ2N1YmljLWJlemllcigwLjg5NSwgMC4wMzAsIDAuNjg1LCAwLjIyMCknLFxuICBlYXNlT3V0UXVhcnQ6ICdjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQwLCAwLjQ0MCwgMS4wMDApJyxcbiAgZWFzZUluT3V0UXVhcnQ6ICdjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE3NSwgMS4wMDApJyxcblxuICAvLyBRdWludFxuICBlYXNlSW5RdWludDogJ2N1YmljLWJlemllcigwLjc1NSwgMC4wNTAsIDAuODU1LCAwLjA2MCknLFxuICBlYXNlT3V0UXVpbnQ6ICdjdWJpYy1iZXppZXIoMC4yMzAsIDEuMDAwLCAwLjMyMCwgMS4wMDApJyxcbiAgZWFzZUluT3V0UXVpbnQ6ICdjdWJpYy1iZXppZXIoMC44NjAsIDAuMDAwLCAwLjA3MCwgMS4wMDApJyxcblxuICAvLyBTaW5lXG4gIGVhc2VJblNpbmU6ICdjdWJpYy1iZXppZXIoMC40NzAsIDAuMDAwLCAwLjc0NSwgMC43MTUpJyxcbiAgZWFzZU91dFNpbmU6ICdjdWJpYy1iZXppZXIoMC4zOTAsIDAuNTc1LCAwLjU2NSwgMS4wMDApJyxcbiAgZWFzZUluT3V0U2luZTogJ2N1YmljLWJlemllcigwLjQ0NSwgMC4wNTAsIDAuNTUwLCAwLjk1MCknLFxuXG4gIC8vIEJhY2tcbiAgZWFzZUluQmFjazogJ2N1YmljLWJlemllcigwLjYwMCwgLTAuMjgwLCAwLjczNSwgMC4wNDUpJyxcbiAgZWFzZU91dEJhY2s6ICdjdWJpYy1iZXppZXIoMC4xNzUsICAwLjg4NSwgMC4zMjAsIDEuMjc1KScsXG4gIGVhc2VJbk91dEJhY2s6ICdjdWJpYy1iZXppZXIoMC42ODAsIC0wLjU1MCwgMC4yNjUsIDEuNTUwKScsXG59XG4iLCJpbXBvcnQgZWFzaW5ncyBmcm9tICcuL2Vhc2luZ3MnXG5cbmNvbnN0IHRyYW5zaXRpb25FdmVudCA9ICgoKSA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlZWxlbWVudCcpXG4gIGNvbnN0IHRyYW5zaXRpb25zID0ge1xuICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICB9XG5cbiAgZm9yIChjb25zdCB0IGluIHRyYW5zaXRpb25zKSB7XG4gICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XVxuICAgIH1cbiAgfVxufSkoKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd4LXNob3cnLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAgdHJhbnNpdGlvblByb3BlcnR5OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAoKSA9PiAnaGVpZ2h0JyxcbiAgICB9LFxuICAgIGR1cmF0aW9uOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAoKSA9PiA1MDAsXG4gICAgfSxcbiAgICBlYXNpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICgpID0+ICdlYXNlLW91dCcsXG4gICAgfSxcbiAgICBtaW5IZWlnaHQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IDAsXG4gICAgfSxcbiAgICBtYXhIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IDAsXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uT25Nb3VudDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgdW5tb3VudE9uSGlkZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAgaGVpZ2h0OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAoKSA9PiAwLFxuICAgIH0sXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtb3VudENvbnRlbnQ6IHRydWUsXG4gICAgICBjYWxjSGVpZ2h0OiB0aGlzLnRyYW5zaXRpb25Pbk1vdW50XG4gICAgICAgID8gJzBweCdcbiAgICAgICAgOiB0aGlzLmhlaWdodCAhPT0gMFxuICAgICAgICAgID8gYCR7dGhpcy5tZWFzdXJlSGVpZ2h0KCl9cHhgXG4gICAgICAgICAgOiAnYXV0bycsXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGdldFN0eWxlICgpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2FsY0hlaWdodCxcbiAgICAgICAgdHJhbnNpdGlvblByb3BlcnR5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgfSA9IHRoaXNcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNpdGlvblByb3BlcnR5LFxuICAgICAgICBoZWlnaHQ6IGNhbGNIZWlnaHQsXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogYCR7ZHVyYXRpb259bXNgLFxuICAgICAgICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246IGVhc2luZ3NbZWFzaW5nXSB8fCBlYXNpbmcsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICB3YXRjaDoge1xuICAgIHNob3cgKHZhbCkge1xuICAgICAgdGhpc1t2YWwgPyAnYW5pbWF0ZUluJyA6ICdhbmltYXRlT3V0J10oKVxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZWQgKCkge1xuICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgIHRoaXMuYmluZEV2ZW50KClcbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25Pbk1vdW50KSB0aGlzLmFuaW1hdGVJbigpXG4gICAgfSlcbiAgfSxcbiAgYmVmb3JlVXBkYXRlICgpIHtcbiAgICBpZiAodGhpcy51bm1vdW50T25IaWRlKSB0aGlzLmJpbmRFdmVudCgpXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBtZWFzdXJlSGVpZ2h0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhlaWdodCB8fCB0aGlzLiRlbC5zY3JvbGxIZWlnaHRcbiAgICB9LFxuICAgIGFuaW1hdGVJbiAoKSB7XG4gICAgICBjb25zdCB7IG1pbkhlaWdodCwgbWF4SGVpZ2h0IH0gPSB0aGlzXG4gICAgICB0aGlzLm1vdW50Q29udGVudCA9IHRydWVcbiAgICAgIHRoaXMuY2FsY0hlaWdodCA9IGAke21pbkhlaWdodCB8fCAwfXB4YFxuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLm1lYXN1cmVIZWlnaHQoKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNhbGNIZWlnaHQgPSBgJHttYXhIZWlnaHQgfHwgaGVpZ2h0fXB4YFxuICAgICAgICB9LCAxNilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBhbmltYXRlT3V0ICgpIHtcbiAgICAgIGNvbnN0IHsgbWluSGVpZ2h0LCBtYXhIZWlnaHQgfSA9IHRoaXNcbiAgICAgIGNvbnN0IG1pbmltaXplID0gKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy4kZWwuc3R5bGUuaGVpZ2h0ID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIG1pbmltaXplKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhbGNIZWlnaHQgPSBgJHttaW5IZWlnaHQgfHwgMH1weGBcbiAgICAgICAgfSwgMTYpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy4kZWwuc3R5bGUuaGVpZ2h0ICE9PSAnYXV0bycpIHtcbiAgICAgICAgbWluaW1pemUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5tZWFzdXJlSGVpZ2h0KClcbiAgICAgICAgdGhpcy5jYWxjSGVpZ2h0ID0gYCR7bWF4SGVpZ2h0IHx8IGhlaWdodH1weGBcbiAgICAgICAgbWluaW1pemUoKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25UcmFuc2l0aW9uRW5kICgpIHtcbiAgICAgIGNvbnN0IHsgdW5tb3VudE9uSGlkZSwgc2hvdyB9ID0gdGhpc1xuICAgICAgaWYgKCFzaG93ICYmIHVubW91bnRPbkhpZGUpIHRoaXMubW91bnRDb250ZW50ID0gZmFsc2VcbiAgICB9LFxuICAgIGJpbmRFdmVudCAoKSB7XG4gICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICB0cmFuc2l0aW9uRXZlbnQsXG4gICAgICAgIHRoaXMub25UcmFuc2l0aW9uRW5kLFxuICAgICAgKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubW91bnRDb250ZW50ID8gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlfT5cbiAgICAgICAgICB7dGhpcy4kc2xvdHMuZGVmYXVsdH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbFxuICAgIClcbiAgfSxcbn1cbiIsIjx0ZW1wbGF0ZSBsYW5nPVwicHVnXCI+XG4gIGRpdi5hcHBcbiAgICBoMSBWdWUgU2hvd1xuICAgIGJ1dHRvbihcbiAgICAgIDpjbGFzcz1cInsnYWN0aXZlJzogaXNTaG93fVwiXG4gICAgICBAY2xpY2s9XCJpc1Nob3cgPSAhaXNTaG93XCJcbiAgICApIENsaWNrIG1lISBTdGF0dXM6IHt7aXNTaG93ID8gJ3Nob3cnIDogJ2hpZGUnfX1cbiAgICB4LXNob3cuZWFzaW5ncyhcbiAgICAgIDpzaG93PVwiaXNTaG93XCJcbiAgICAgIDplYXNpbmc9XCJlYXNpbmdcIlxuICAgICAgOmR1cmF0aW9uPVwiNzAwXCJcbiAgICAgIHRyYW5zaXRpb24tb24tbW91bnRcbiAgICAgIHVubW91bnQtb24taGlkZVxuICAgIClcbiAgICAgIHVsXG4gICAgICAgIGxpKHYtZm9yPVwiKGl0ZW0sIGlkeCkgaW4gbGlzdFwiKVxuICAgICAgICAgIGJ1dHRvbihcbiAgICAgICAgICAgIDpjbGFzcz1cInsnYWN0aXZlJzogaXRlbS5hY3RpdmV9XCJcbiAgICAgICAgICAgIEBjbGljaz1cImhhbmRsZUNsaWNrKGl0ZW0sIGlkeClcIlxuICAgICAgICAgICkge3tpdGVtLmtleX19XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHhTaG93IGZyb20gJy4uLy4uL3NyYy94LXNob3cnXG5pbXBvcnQgZWFzaW5ncyBmcm9tICcuLi8uLi9zcmMvZWFzaW5ncydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXBwJyxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBsaXN0OiBbXSxcbiAgICBpc1Nob3c6IHRydWUsXG4gICAgZWFzaW5nOiBPYmplY3Qua2V5cyhlYXNpbmdzKVswXSxcbiAgfSksXG4gIGNvbXBvbmVudHM6IHtcbiAgICB4U2hvdyxcbiAgfSxcbiAgY3JlYXRlZCAoKSB7XG4gICAgdGhpcy5saXN0ID0gT2JqZWN0LmtleXMoZWFzaW5ncykubWFwKFxuICAgICAga2V5ID0+ICh7XG4gICAgICAgIGtleSxcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgKVxuICAgIHRoaXMubGlzdFswXS5hY3RpdmUgPSB0cnVlXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVDbGljayAoeyBrZXkgfSwgaWR4KSB7XG4gICAgICB0aGlzLmVhc2luZyA9IGtleVxuICAgICAgdGhpcy5saXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uYWN0aXZlID0gaWR4ID09PSBpbmRleFxuICAgICAgfSlcbiAgICB9LFxuICB9LFxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQG1peGluIGJveC1zaGFkb3cge1xuICBib3gtc2hhZG93OiAwIDFweCA2cHggcmdiYSgzMiwgMzMsIDM2LCAwLjI4KTtcbn1cbioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGZvbnQtZmFtaWx5OiBNb25hY287XG59XG5saSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG4uYXBwIHtcbiAgcGFkZGluZzogMCA4MHB4O1xufVxuXG5idXR0b24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBib3JkZXItcmFkaXVzOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyOiAwO1xuICBjb2xvcjogZ3JheTtcbiAgdHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlO1xuICBAaW5jbHVkZSBib3gtc2hhZG93O1xufVxuaDEge1xuICBmb250LXNpemU6IDQwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogNTBweCAwO1xuICBjb2xvcjogIzQyYjk4Mztcbn1cblxuLmVhc2luZ3Mge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBAaW5jbHVkZSBib3gtc2hhZG93O1xuICB1bCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZzogMTBweCAwO1xuICB9XG4gIGxpIHtcbiAgICB3aWR0aDogMTIwcHg7XG4gICAgbWFyZ2luOiAxMHB4O1xuICB9XG59XG4uYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MmI5ODM7XG59XG5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IGFwcCBmcm9tICcuL2FwcCdcblxuVnVlLmNvbmZpZy5wcm9kdWN0aW9uVGlwID0gZmFsc2VcblxubmV3IFZ1ZSh7XG4gICAgZWw6ICcjYXBwJyxcbiAgICByZW5kZXI6IGggPT4gaChhcHApXG59KVxuIl0sIm5hbWVzIjpbImVtcHR5T2JqZWN0IiwiT2JqZWN0IiwiZnJlZXplIiwiaXNVbmRlZiIsInYiLCJ1bmRlZmluZWQiLCJpc0RlZiIsImlzVHJ1ZSIsImlzRmFsc2UiLCJpc1ByaW1pdGl2ZSIsInZhbHVlIiwiaXNPYmplY3QiLCJvYmoiLCJfdG9TdHJpbmciLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsInRvUmF3VHlwZSIsImNhbGwiLCJzbGljZSIsImlzUGxhaW5PYmplY3QiLCJpc1JlZ0V4cCIsImlzVmFsaWRBcnJheUluZGV4IiwidmFsIiwibiIsInBhcnNlRmxvYXQiLCJTdHJpbmciLCJNYXRoIiwiZmxvb3IiLCJpc0Zpbml0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b051bWJlciIsImlzTmFOIiwibWFrZU1hcCIsInN0ciIsImV4cGVjdHNMb3dlckNhc2UiLCJtYXAiLCJjcmVhdGUiLCJsaXN0Iiwic3BsaXQiLCJpIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiLCJpc0J1aWx0SW5UYWciLCJpc1Jlc2VydmVkQXR0cmlidXRlIiwicmVtb3ZlIiwiYXJyIiwiaXRlbSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImhhc093blByb3BlcnR5IiwiaGFzT3duIiwia2V5IiwiY2FjaGVkIiwiZm4iLCJjYWNoZSIsImNhY2hlZEZuIiwiaGl0IiwiY2FtZWxpemVSRSIsImNhbWVsaXplIiwicmVwbGFjZSIsIl8iLCJjIiwidG9VcHBlckNhc2UiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwiaHlwaGVuYXRlUkUiLCJoeXBoZW5hdGUiLCJiaW5kIiwiY3R4IiwiYm91bmRGbiIsImEiLCJsIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbGVuZ3RoIiwidG9BcnJheSIsInN0YXJ0IiwicmV0IiwiQXJyYXkiLCJleHRlbmQiLCJ0byIsIl9mcm9tIiwidG9PYmplY3QiLCJyZXMiLCJub29wIiwiYiIsIm5vIiwiaWRlbnRpdHkiLCJsb29zZUVxdWFsIiwiaXNPYmplY3RBIiwiaXNPYmplY3RCIiwiaXNBcnJheUEiLCJpc0FycmF5IiwiaXNBcnJheUIiLCJldmVyeSIsImUiLCJrZXlzQSIsImtleXMiLCJrZXlzQiIsImxvb3NlSW5kZXhPZiIsIm9uY2UiLCJjYWxsZWQiLCJTU1JfQVRUUiIsIkFTU0VUX1RZUEVTIiwiTElGRUNZQ0xFX0hPT0tTIiwiY29uZmlnIiwicHJvY2VzcyIsImlzUmVzZXJ2ZWQiLCJjaGFyQ29kZUF0IiwiZGVmIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnR5IiwiYmFpbFJFIiwicGFyc2VQYXRoIiwicGF0aCIsInRlc3QiLCJzZWdtZW50cyIsImhhc1Byb3RvIiwiaW5Ccm93c2VyIiwid2luZG93IiwiaW5XZWV4IiwiV1hFbnZpcm9ubWVudCIsInBsYXRmb3JtIiwid2VleFBsYXRmb3JtIiwiVUEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpc0lFIiwiaXNJRTkiLCJpc0VkZ2UiLCJpc0FuZHJvaWQiLCJpc0lPUyIsImlzQ2hyb21lIiwibmF0aXZlV2F0Y2giLCJ3YXRjaCIsInN1cHBvcnRzUGFzc2l2ZSIsIm9wdHMiLCJnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiX2lzU2VydmVyIiwiaXNTZXJ2ZXJSZW5kZXJpbmciLCJnbG9iYWwiLCJlbnYiLCJWVUVfRU5WIiwiZGV2dG9vbHMiLCJfX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fIiwiaXNOYXRpdmUiLCJDdG9yIiwiaGFzU3ltYm9sIiwiU3ltYm9sIiwiUmVmbGVjdCIsIm93bktleXMiLCJfU2V0IiwiU2V0Iiwic2V0IiwiaGFzIiwiYWRkIiwiY2xlYXIiLCJ3YXJuIiwidGlwIiwiZ2VuZXJhdGVDb21wb25lbnRUcmFjZSIsImZvcm1hdENvbXBvbmVudE5hbWUiLCJoYXNDb25zb2xlIiwiY29uc29sZSIsImNsYXNzaWZ5UkUiLCJjbGFzc2lmeSIsIm1zZyIsInZtIiwidHJhY2UiLCJ3YXJuSGFuZGxlciIsInNpbGVudCIsImVycm9yIiwiaW5jbHVkZUZpbGUiLCIkcm9vdCIsIm9wdGlvbnMiLCJjaWQiLCJfaXNWdWUiLCIkb3B0aW9ucyIsImNvbnN0cnVjdG9yIiwibmFtZSIsIl9jb21wb25lbnRUYWciLCJmaWxlIiwiX19maWxlIiwibWF0Y2giLCJyZXBlYXQiLCIkcGFyZW50IiwidHJlZSIsImN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSIsImxhc3QiLCJwdXNoIiwiam9pbiIsInVpZCQxIiwiRGVwIiwiaWQiLCJzdWJzIiwiYWRkU3ViIiwic3ViIiwicmVtb3ZlU3ViIiwiZGVwZW5kIiwidGFyZ2V0IiwiYWRkRGVwIiwibm90aWZ5IiwidXBkYXRlIiwidGFyZ2V0U3RhY2siLCJwdXNoVGFyZ2V0IiwiX3RhcmdldCIsInBvcFRhcmdldCIsInBvcCIsIlZOb2RlIiwidGFnIiwiZGF0YSIsImNoaWxkcmVuIiwidGV4dCIsImVsbSIsImNvbnRleHQiLCJjb21wb25lbnRPcHRpb25zIiwiYXN5bmNGYWN0b3J5IiwibnMiLCJmbkNvbnRleHQiLCJmbk9wdGlvbnMiLCJmblNjb3BlSWQiLCJjb21wb25lbnRJbnN0YW5jZSIsInBhcmVudCIsInJhdyIsImlzU3RhdGljIiwiaXNSb290SW5zZXJ0IiwiaXNDb21tZW50IiwiaXNDbG9uZWQiLCJpc09uY2UiLCJhc3luY01ldGEiLCJpc0FzeW5jUGxhY2Vob2xkZXIiLCJwcm90b3R5cGVBY2Nlc3NvcnMiLCJjaGlsZCIsImNvbmZpZ3VyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJjcmVhdGVFbXB0eVZOb2RlIiwibm9kZSIsImNyZWF0ZVRleHRWTm9kZSIsImNsb25lVk5vZGUiLCJ2bm9kZSIsImRlZXAiLCJjbG9uZWQiLCJjbG9uZVZOb2RlcyIsInZub2RlcyIsImxlbiIsImFycmF5UHJvdG8iLCJhcnJheU1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwib3JpZ2luYWwiLCJtdXRhdG9yIiwiYXJncyIsInJlc3VsdCIsIm9iIiwiX19vYl9fIiwiaW5zZXJ0ZWQiLCJvYnNlcnZlQXJyYXkiLCJkZXAiLCJhcnJheUtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwib2JzZXJ2ZXJTdGF0ZSIsIk9ic2VydmVyIiwidm1Db3VudCIsImF1Z21lbnQiLCJwcm90b0F1Z21lbnQiLCJjb3B5QXVnbWVudCIsIndhbGsiLCJpdGVtcyIsInNyYyIsIl9fcHJvdG9fXyIsIm9ic2VydmUiLCJhc1Jvb3REYXRhIiwic2hvdWxkQ29udmVydCIsImlzRXh0ZW5zaWJsZSIsImRlZmluZVJlYWN0aXZlIiwiY3VzdG9tU2V0dGVyIiwic2hhbGxvdyIsInByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0dGVyIiwic2V0dGVyIiwiY2hpbGRPYiIsInJlYWN0aXZlR2V0dGVyIiwicmVhY3RpdmVTZXR0ZXIiLCJuZXdWYWwiLCJtYXgiLCJkZWwiLCJkZXBlbmRBcnJheSIsInN0cmF0cyIsIm9wdGlvbk1lcmdlU3RyYXRlZ2llcyIsImVsIiwicHJvcHNEYXRhIiwiZGVmYXVsdFN0cmF0IiwibWVyZ2VEYXRhIiwiZnJvbSIsInRvVmFsIiwiZnJvbVZhbCIsIm1lcmdlRGF0YU9yRm4iLCJwYXJlbnRWYWwiLCJjaGlsZFZhbCIsIm1lcmdlZERhdGFGbiIsIm1lcmdlZEluc3RhbmNlRGF0YUZuIiwiaW5zdGFuY2VEYXRhIiwiZGVmYXVsdERhdGEiLCJtZXJnZUhvb2siLCJjb25jYXQiLCJob29rIiwibWVyZ2VBc3NldHMiLCJhc3NlcnRPYmplY3RUeXBlIiwidHlwZSIsImtleSQxIiwicHJvcHMiLCJtZXRob2RzIiwiaW5qZWN0IiwiY29tcHV0ZWQiLCJwcm92aWRlIiwiY2hlY2tDb21wb25lbnRzIiwiY29tcG9uZW50cyIsImxvd2VyIiwiaXNSZXNlcnZlZFRhZyIsIm5vcm1hbGl6ZVByb3BzIiwibm9ybWFsaXplSW5qZWN0Iiwibm9ybWFsaXplZCIsIm5vcm1hbGl6ZURpcmVjdGl2ZXMiLCJkaXJzIiwiZGlyZWN0aXZlcyIsIm1lcmdlT3B0aW9ucyIsImV4dGVuZHNGcm9tIiwiZXh0ZW5kcyIsIm1peGlucyIsIm1lcmdlRmllbGQiLCJzdHJhdCIsInJlc29sdmVBc3NldCIsIndhcm5NaXNzaW5nIiwiYXNzZXRzIiwiY2FtZWxpemVkSWQiLCJQYXNjYWxDYXNlSWQiLCJ2YWxpZGF0ZVByb3AiLCJwcm9wT3B0aW9ucyIsInByb3AiLCJhYnNlbnQiLCJpc1R5cGUiLCJCb29sZWFuIiwiZ2V0UHJvcERlZmF1bHRWYWx1ZSIsInByZXZTaG91bGRDb252ZXJ0IiwiZGVmYXVsdCIsIl9wcm9wcyIsImdldFR5cGUiLCJhc3NlcnRQcm9wIiwicmVxdWlyZWQiLCJ2YWxpZCIsImV4cGVjdGVkVHlwZXMiLCJhc3NlcnRlZFR5cGUiLCJhc3NlcnRUeXBlIiwiZXhwZWN0ZWRUeXBlIiwidmFsaWRhdG9yIiwic2ltcGxlQ2hlY2tSRSIsInQiLCJoYW5kbGVFcnJvciIsImVyciIsImluZm8iLCJjdXIiLCJob29rcyIsImVycm9yQ2FwdHVyZWQiLCJjYXB0dXJlIiwiZ2xvYmFsSGFuZGxlRXJyb3IiLCJlcnJvckhhbmRsZXIiLCJsb2dFcnJvciIsImNhbGxiYWNrcyIsInBlbmRpbmciLCJmbHVzaENhbGxiYWNrcyIsImNvcGllcyIsIm1pY3JvVGltZXJGdW5jIiwibWFjcm9UaW1lckZ1bmMiLCJ1c2VNYWNyb1Rhc2siLCJzZXRJbW1lZGlhdGUiLCJNZXNzYWdlQ2hhbm5lbCIsImNoYW5uZWwiLCJwb3J0IiwicG9ydDIiLCJwb3J0MSIsIm9ubWVzc2FnZSIsInBvc3RNZXNzYWdlIiwiUHJvbWlzZSIsInAiLCJyZXNvbHZlIiwidGhlbiIsIndpdGhNYWNyb1Rhc2siLCJfd2l0aFRhc2siLCJuZXh0VGljayIsImNiIiwiX3Jlc29sdmUiLCJpbml0UHJveHkiLCJhbGxvd2VkR2xvYmFscyIsIndhcm5Ob25QcmVzZW50IiwiaGFzUHJveHkiLCJQcm94eSIsImlzQnVpbHRJbk1vZGlmaWVyIiwia2V5Q29kZXMiLCJoYXNIYW5kbGVyIiwiaXNBbGxvd2VkIiwiZ2V0SGFuZGxlciIsImhhbmRsZXJzIiwicmVuZGVyIiwiX3dpdGhTdHJpcHBlZCIsIl9yZW5kZXJQcm94eSIsInNlZW5PYmplY3RzIiwidHJhdmVyc2UiLCJfdHJhdmVyc2UiLCJzZWVuIiwiaXNBIiwiaXNGcm96ZW4iLCJkZXBJZCIsIm1hcmsiLCJtZWFzdXJlIiwicGVyZiIsInBlcmZvcm1hbmNlIiwiY2xlYXJNYXJrcyIsImNsZWFyTWVhc3VyZXMiLCJzdGFydFRhZyIsImVuZFRhZyIsIm5vcm1hbGl6ZUV2ZW50IiwicGFzc2l2ZSIsIm9uY2UkJDEiLCJjcmVhdGVGbkludm9rZXIiLCJmbnMiLCJpbnZva2VyIiwiYXJndW1lbnRzJDEiLCJ1cGRhdGVMaXN0ZW5lcnMiLCJvbiIsIm9sZE9uIiwicmVtb3ZlJCQxIiwib2xkIiwiZXZlbnQiLCJtZXJnZVZOb2RlSG9vayIsImhvb2tLZXkiLCJvbGRIb29rIiwid3JhcHBlZEhvb2siLCJtZXJnZWQiLCJleHRyYWN0UHJvcHNGcm9tVk5vZGVEYXRhIiwiYXR0cnMiLCJhbHRLZXkiLCJrZXlJbkxvd2VyQ2FzZSIsImNoZWNrUHJvcCIsImhhc2giLCJwcmVzZXJ2ZSIsInNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuIiwibm9ybWFsaXplQ2hpbGRyZW4iLCJub3JtYWxpemVBcnJheUNoaWxkcmVuIiwiaXNUZXh0Tm9kZSIsIm5lc3RlZEluZGV4IiwibGFzdEluZGV4Iiwic2hpZnQiLCJfaXNWTGlzdCIsImVuc3VyZUN0b3IiLCJjb21wIiwiYmFzZSIsIl9fZXNNb2R1bGUiLCJ0b1N0cmluZ1RhZyIsImNyZWF0ZUFzeW5jUGxhY2Vob2xkZXIiLCJmYWN0b3J5IiwicmVzb2x2ZUFzeW5jQ29tcG9uZW50IiwiYmFzZUN0b3IiLCJlcnJvckNvbXAiLCJyZXNvbHZlZCIsImxvYWRpbmciLCJsb2FkaW5nQ29tcCIsImNvbnRleHRzIiwic3luYyIsImZvcmNlUmVuZGVyIiwiJGZvcmNlVXBkYXRlIiwicmVqZWN0IiwicmVhc29uIiwiY29tcG9uZW50IiwiZGVsYXkiLCJ0aW1lb3V0IiwiZ2V0Rmlyc3RDb21wb25lbnRDaGlsZCIsImluaXRFdmVudHMiLCJfZXZlbnRzIiwiX2hhc0hvb2tFdmVudCIsImxpc3RlbmVycyIsIl9wYXJlbnRMaXN0ZW5lcnMiLCIkb25jZSIsIiRvbiIsInJlbW92ZSQxIiwiJG9mZiIsInVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyIsIm9sZExpc3RlbmVycyIsImV2ZW50c01peGluIiwiVnVlIiwiaG9va1JFIiwidGhpcyQxIiwiY2JzIiwiaSQxIiwiJGVtaXQiLCJsb3dlckNhc2VFdmVudCIsInJlc29sdmVTbG90cyIsInNsb3RzIiwic2xvdCIsIm5hbWUkMSIsImlzV2hpdGVzcGFjZSIsInJlc29sdmVTY29wZWRTbG90cyIsImFjdGl2ZUluc3RhbmNlIiwiaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50IiwiaW5pdExpZmVjeWNsZSIsImFic3RyYWN0IiwiJGNoaWxkcmVuIiwiJHJlZnMiLCJfd2F0Y2hlciIsIl9pbmFjdGl2ZSIsIl9kaXJlY3RJbmFjdGl2ZSIsIl9pc01vdW50ZWQiLCJfaXNEZXN0cm95ZWQiLCJfaXNCZWluZ0Rlc3Ryb3llZCIsImxpZmVjeWNsZU1peGluIiwiX3VwZGF0ZSIsImh5ZHJhdGluZyIsInByZXZFbCIsIiRlbCIsInByZXZWbm9kZSIsIl92bm9kZSIsInByZXZBY3RpdmVJbnN0YW5jZSIsIl9fcGF0Y2hfXyIsIl9wYXJlbnRFbG0iLCJfcmVmRWxtIiwiX192dWVfXyIsIiR2bm9kZSIsIiRkZXN0cm95IiwidGVhcmRvd24iLCJfd2F0Y2hlcnMiLCJfZGF0YSIsIm1vdW50Q29tcG9uZW50IiwidGVtcGxhdGUiLCJ1cGRhdGVDb21wb25lbnQiLCJfbmFtZSIsIl91aWQiLCJfcmVuZGVyIiwiV2F0Y2hlciIsInVwZGF0ZUNoaWxkQ29tcG9uZW50IiwicGFyZW50Vm5vZGUiLCJyZW5kZXJDaGlsZHJlbiIsImhhc0NoaWxkcmVuIiwiX3JlbmRlckNoaWxkcmVuIiwic2NvcGVkU2xvdHMiLCIkc2NvcGVkU2xvdHMiLCJfcGFyZW50Vm5vZGUiLCIkYXR0cnMiLCIkbGlzdGVuZXJzIiwicHJvcEtleXMiLCJfcHJvcEtleXMiLCIkc2xvdHMiLCJpc0luSW5hY3RpdmVUcmVlIiwiYWN0aXZhdGVDaGlsZENvbXBvbmVudCIsImRpcmVjdCIsImRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCIsImNhbGxIb29rIiwiaiIsIk1BWF9VUERBVEVfQ09VTlQiLCJxdWV1ZSIsImFjdGl2YXRlZENoaWxkcmVuIiwiY2lyY3VsYXIiLCJ3YWl0aW5nIiwiZmx1c2hpbmciLCJyZXNldFNjaGVkdWxlclN0YXRlIiwiZmx1c2hTY2hlZHVsZXJRdWV1ZSIsIndhdGNoZXIiLCJzb3J0IiwicnVuIiwidXNlciIsImV4cHJlc3Npb24iLCJhY3RpdmF0ZWRRdWV1ZSIsInVwZGF0ZWRRdWV1ZSIsImVtaXQiLCJjYWxsVXBkYXRlZEhvb2tzIiwicXVldWVBY3RpdmF0ZWRDb21wb25lbnQiLCJjYWxsQWN0aXZhdGVkSG9va3MiLCJxdWV1ZVdhdGNoZXIiLCJ1aWQkMiIsImV4cE9yRm4iLCJpc1JlbmRlcldhdGNoZXIiLCJsYXp5IiwiYWN0aXZlIiwiZGlydHkiLCJkZXBzIiwibmV3RGVwcyIsImRlcElkcyIsIm5ld0RlcElkcyIsImNsZWFudXBEZXBzIiwidG1wIiwib2xkVmFsdWUiLCJldmFsdWF0ZSIsInNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbiIsInByb3h5Iiwic291cmNlS2V5IiwicHJveHlHZXR0ZXIiLCJwcm94eVNldHRlciIsImluaXRTdGF0ZSIsImluaXRQcm9wcyIsInByb3BzT3B0aW9ucyIsImlzUm9vdCIsImxvb3AiLCJoeXBoZW5hdGVkS2V5IiwiaXNSZXNlcnZlZEF0dHIiLCJpbml0RGF0YSIsImdldERhdGEiLCJjb21wdXRlZFdhdGNoZXJPcHRpb25zIiwiaW5pdENvbXB1dGVkIiwid2F0Y2hlcnMiLCJfY29tcHV0ZWRXYXRjaGVycyIsImlzU1NSIiwidXNlckRlZiIsIiRkYXRhIiwiZGVmaW5lQ29tcHV0ZWQiLCJzaG91bGRDYWNoZSIsImNyZWF0ZUNvbXB1dGVkR2V0dGVyIiwiY29tcHV0ZWRHZXR0ZXIiLCJpbml0TWV0aG9kcyIsImluaXRXYXRjaCIsImhhbmRsZXIiLCJjcmVhdGVXYXRjaGVyIiwia2V5T3JGbiIsIiR3YXRjaCIsInN0YXRlTWl4aW4iLCJkYXRhRGVmIiwicHJvcHNEZWYiLCJuZXdEYXRhIiwiJHNldCIsIiRkZWxldGUiLCJpbW1lZGlhdGUiLCJ1bndhdGNoRm4iLCJpbml0UHJvdmlkZSIsIl9wcm92aWRlZCIsImluaXRJbmplY3Rpb25zIiwicmVzb2x2ZUluamVjdCIsImZpbHRlciIsInByb3ZpZGVLZXkiLCJzb3VyY2UiLCJwcm92aWRlRGVmYXVsdCIsInJlbmRlckxpc3QiLCJyZW5kZXJTbG90IiwiZmFsbGJhY2siLCJiaW5kT2JqZWN0Iiwic2NvcGVkU2xvdEZuIiwibm9kZXMiLCJzbG90Tm9kZXMiLCJfcmVuZGVyZWQiLCIkY3JlYXRlRWxlbWVudCIsInJlc29sdmVGaWx0ZXIiLCJjaGVja0tleUNvZGVzIiwiZXZlbnRLZXlDb2RlIiwiYnVpbHRJbkFsaWFzIiwiZXZlbnRLZXlOYW1lIiwiYmluZE9iamVjdFByb3BzIiwiYXNQcm9wIiwiaXNTeW5jIiwibXVzdFVzZVByb3AiLCJkb21Qcm9wcyIsIiRldmVudCIsInJlbmRlclN0YXRpYyIsImlzSW5Gb3IiLCJpc09sZFZlcnNpb24iLCJyZW5kZXJGbnMiLCJzdGF0aWNSZW5kZXJGbnMiLCJfc3RhdGljVHJlZXMiLCJtYXJrT25jZSIsIm1hcmtTdGF0aWMiLCJtYXJrU3RhdGljTm9kZSIsImJpbmRPYmplY3RMaXN0ZW5lcnMiLCJleGlzdGluZyIsIm91cnMiLCJpbnN0YWxsUmVuZGVySGVscGVycyIsIl9vIiwiX24iLCJfcyIsIl9sIiwiX3QiLCJfcSIsIl9pIiwiX20iLCJfZiIsIl9rIiwiX2IiLCJfdiIsIl9lIiwiX3UiLCJfZyIsIkZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0IiwiaW5qZWN0aW9ucyIsImNvbnRleHRWbSIsImlzQ29tcGlsZWQiLCJfY29tcGlsZWQiLCJuZWVkTm9ybWFsaXphdGlvbiIsIl9zY29wZUlkIiwiX2MiLCJkIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQiLCJyZW5kZXJDb250ZXh0IiwibWVyZ2VQcm9wcyIsImNvbXBvbmVudFZOb2RlSG9va3MiLCJpbml0IiwicGFyZW50RWxtIiwicmVmRWxtIiwiY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VGb3JWbm9kZSIsIiRtb3VudCIsImtlZXBBbGl2ZSIsIm1vdW50ZWROb2RlIiwicHJlcGF0Y2giLCJvbGRWbm9kZSIsImluc2VydCIsImRlc3Ryb3kiLCJob29rc1RvTWVyZ2UiLCJjcmVhdGVDb21wb25lbnQiLCJfYmFzZSIsIm1vZGVsIiwiZnVuY3Rpb25hbCIsIm5hdGl2ZU9uIiwidm5vZGVDb21wb25lbnRPcHRpb25zIiwiaW5saW5lVGVtcGxhdGUiLCJtZXJnZUhvb2tzIiwiZnJvbVBhcmVudCIsIm1lcmdlSG9vayQxIiwib25lIiwidHdvIiwidHJhbnNmb3JtTW9kZWwiLCJjYWxsYmFjayIsIlNJTVBMRV9OT1JNQUxJWkUiLCJBTFdBWVNfTk9STUFMSVpFIiwibm9ybWFsaXphdGlvblR5cGUiLCJhbHdheXNOb3JtYWxpemUiLCJfY3JlYXRlRWxlbWVudCIsImlzIiwiZ2V0VGFnTmFtZXNwYWNlIiwicGFyc2VQbGF0Zm9ybVRhZ05hbWUiLCJhcHBseU5TIiwiZm9yY2UiLCJpbml0UmVuZGVyIiwicGFyZW50RGF0YSIsInJlbmRlck1peGluIiwiJG5leHRUaWNrIiwicmVmIiwicmVuZGVyRXJyb3IiLCJ1aWQiLCJpbml0TWl4aW4iLCJfaW5pdCIsIl9pc0NvbXBvbmVudCIsInJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMiLCJfc2VsZiIsImluaXRJbnRlcm5hbENvbXBvbmVudCIsInN1cGVyIiwic3VwZXJPcHRpb25zIiwiY2FjaGVkU3VwZXJPcHRpb25zIiwibW9kaWZpZWRPcHRpb25zIiwicmVzb2x2ZU1vZGlmaWVkT3B0aW9ucyIsImV4dGVuZE9wdGlvbnMiLCJtb2RpZmllZCIsImxhdGVzdCIsImV4dGVuZGVkIiwic2VhbGVkIiwic2VhbGVkT3B0aW9ucyIsImRlZHVwZSIsIlZ1ZSQzIiwiaW5pdFVzZSIsInVzZSIsInBsdWdpbiIsImluc3RhbGxlZFBsdWdpbnMiLCJfaW5zdGFsbGVkUGx1Z2lucyIsInVuc2hpZnQiLCJpbnN0YWxsIiwiaW5pdE1peGluJDEiLCJtaXhpbiIsImluaXRFeHRlbmQiLCJTdXBlciIsIlN1cGVySWQiLCJjYWNoZWRDdG9ycyIsIl9DdG9yIiwiU3ViIiwiVnVlQ29tcG9uZW50IiwiaW5pdFByb3BzJDEiLCJDb21wIiwiaW5pdENvbXB1dGVkJDEiLCJpbml0QXNzZXRSZWdpc3RlcnMiLCJkZWZpbml0aW9uIiwiZ2V0Q29tcG9uZW50TmFtZSIsIm1hdGNoZXMiLCJwYXR0ZXJuIiwicHJ1bmVDYWNoZSIsImtlZXBBbGl2ZUluc3RhbmNlIiwiY2FjaGVkTm9kZSIsInBydW5lQ2FjaGVFbnRyeSIsImN1cnJlbnQiLCJjYWNoZWQkJDEiLCJwYXR0ZXJuVHlwZXMiLCJSZWdFeHAiLCJLZWVwQWxpdmUiLCJOdW1iZXIiLCJjcmVhdGVkIiwiZGVzdHJveWVkIiwiaW5jbHVkZSIsImV4Y2x1ZGUiLCJyZWYkMSIsInBhcnNlSW50IiwiYnVpbHRJbkNvbXBvbmVudHMiLCJpbml0R2xvYmFsQVBJIiwiY29uZmlnRGVmIiwidXRpbCIsImRlbGV0ZSIsInNzckNvbnRleHQiLCJ2ZXJzaW9uIiwiYWNjZXB0VmFsdWUiLCJhdHRyIiwiaXNFbnVtZXJhdGVkQXR0ciIsImlzQm9vbGVhbkF0dHIiLCJ4bGlua05TIiwiaXNYbGluayIsImdldFhsaW5rUHJvcCIsImlzRmFsc3lBdHRyVmFsdWUiLCJnZW5DbGFzc0ZvclZub2RlIiwicGFyZW50Tm9kZSIsImNoaWxkTm9kZSIsIm1lcmdlQ2xhc3NEYXRhIiwicmVuZGVyQ2xhc3MiLCJzdGF0aWNDbGFzcyIsImNsYXNzIiwiZHluYW1pY0NsYXNzIiwic3RyaW5naWZ5Q2xhc3MiLCJzdHJpbmdpZnlBcnJheSIsInN0cmluZ2lmeU9iamVjdCIsInN0cmluZ2lmaWVkIiwibmFtZXNwYWNlTWFwIiwiaXNIVE1MVGFnIiwiaXNTVkciLCJ1bmtub3duRWxlbWVudENhY2hlIiwiaXNVbmtub3duRWxlbWVudCIsImRvY3VtZW50IiwiSFRNTFVua25vd25FbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJpc1RleHRJbnB1dFR5cGUiLCJxdWVyeSIsInNlbGVjdGVkIiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQkMSIsInRhZ05hbWUiLCJtdWx0aXBsZSIsInNldEF0dHJpYnV0ZSIsImNyZWF0ZUVsZW1lbnROUyIsIm5hbWVzcGFjZSIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlQ29tbWVudCIsImluc2VydEJlZm9yZSIsIm5ld05vZGUiLCJyZWZlcmVuY2VOb2RlIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsIm5leHRTaWJsaW5nIiwic2V0VGV4dENvbnRlbnQiLCJ0ZXh0Q29udGVudCIsIm5vZGVPcHMiLCJyZWdpc3RlclJlZiIsImlzUmVtb3ZhbCIsInJlZnMiLCJyZWZJbkZvciIsImVtcHR5Tm9kZSIsInNhbWVWbm9kZSIsInNhbWVJbnB1dFR5cGUiLCJ0eXBlQSIsInR5cGVCIiwiY3JlYXRlS2V5VG9PbGRJZHgiLCJiZWdpbklkeCIsImVuZElkeCIsImNyZWF0ZVBhdGNoRnVuY3Rpb24iLCJiYWNrZW5kIiwibW9kdWxlcyIsImVtcHR5Tm9kZUF0IiwiY3JlYXRlUm1DYiIsImNoaWxkRWxtIiwicmVtb3ZlTm9kZSIsImlzVW5rbm93bkVsZW1lbnQkJDEiLCJpblZQcmUiLCJpZ25vcmVkRWxlbWVudHMiLCJzb21lIiwiaWdub3JlIiwiY3JlYXRpbmdFbG1JblZQcmUiLCJjcmVhdGVFbG0iLCJpbnNlcnRlZFZub2RlUXVldWUiLCJuZXN0ZWQiLCJwcmUiLCJpc1JlYWN0aXZhdGVkIiwiaW5pdENvbXBvbmVudCIsInBlbmRpbmdJbnNlcnQiLCJpc1BhdGNoYWJsZSIsInJlYWN0aXZhdGVDb21wb25lbnQiLCJpbm5lck5vZGUiLCJ0cmFuc2l0aW9uIiwiYWN0aXZhdGUiLCJyZWYkJDEiLCJjcmVhdGVDaGlsZHJlbiIsImludm9rZUNyZWF0ZUhvb2tzIiwic2V0U2NvcGUiLCJhbmNlc3RvciIsImFkZFZub2RlcyIsInN0YXJ0SWR4IiwiaW52b2tlRGVzdHJveUhvb2siLCJyZW1vdmVWbm9kZXMiLCJjaCIsInJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2siLCJybSIsInVwZGF0ZUNoaWxkcmVuIiwib2xkQ2giLCJuZXdDaCIsInJlbW92ZU9ubHkiLCJvbGRTdGFydElkeCIsIm5ld1N0YXJ0SWR4Iiwib2xkRW5kSWR4Iiwib2xkU3RhcnRWbm9kZSIsIm9sZEVuZFZub2RlIiwibmV3RW5kSWR4IiwibmV3U3RhcnRWbm9kZSIsIm5ld0VuZFZub2RlIiwib2xkS2V5VG9JZHgiLCJpZHhJbk9sZCIsInZub2RlVG9Nb3ZlIiwiY2FuTW92ZSIsImZpbmRJZHhJbk9sZCIsImVuZCIsInBhdGNoVm5vZGUiLCJwb3N0cGF0Y2giLCJpbnZva2VJbnNlcnRIb29rIiwiaW5pdGlhbCIsImh5ZHJhdGlvbkJhaWxlZCIsImlzUmVuZGVyZWRNb2R1bGUiLCJoeWRyYXRlIiwiYXNzZXJ0Tm9kZU1hdGNoIiwiaGFzQ2hpbGROb2RlcyIsImlubmVySFRNTCIsImNoaWxkcmVuTWF0Y2giLCJmaXJzdENoaWxkIiwiY2hpbGROb2RlcyIsImZ1bGxJbnZva2UiLCJub2RlVHlwZSIsInBhdGNoIiwiaXNJbml0aWFsUGF0Y2giLCJpc1JlYWxFbGVtZW50IiwiaGFzQXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkRWxtIiwicGFyZW50RWxtJDEiLCJfbGVhdmVDYiIsInBhdGNoYWJsZSIsImkkMiIsInVwZGF0ZURpcmVjdGl2ZXMiLCJ1bmJpbmREaXJlY3RpdmVzIiwiaXNDcmVhdGUiLCJpc0Rlc3Ryb3kiLCJvbGREaXJzIiwibm9ybWFsaXplRGlyZWN0aXZlcyQxIiwibmV3RGlycyIsImRpcnNXaXRoSW5zZXJ0IiwiZGlyc1dpdGhQb3N0cGF0Y2giLCJvbGREaXIiLCJkaXIiLCJjb21wb25lbnRVcGRhdGVkIiwiY2FsbEluc2VydCIsImVtcHR5TW9kaWZpZXJzIiwibW9kaWZpZXJzIiwiZ2V0UmF3RGlyTmFtZSIsInJhd05hbWUiLCJjYWxsSG9vayQxIiwiYmFzZU1vZHVsZXMiLCJ1cGRhdGVBdHRycyIsImluaGVyaXRBdHRycyIsIm9sZEF0dHJzIiwicmVtb3ZlQXR0cmlidXRlTlMiLCJzZXRBdHRyIiwic2V0QXR0cmlidXRlTlMiLCJfX2llcGgiLCJibG9ja2VyIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVwZGF0ZUNsYXNzIiwib2xkRGF0YSIsImNscyIsInRyYW5zaXRpb25DbGFzcyIsIl90cmFuc2l0aW9uQ2xhc3NlcyIsIl9wcmV2Q2xhc3MiLCJrbGFzcyIsIlJBTkdFX1RPS0VOIiwiQ0hFQ0tCT1hfUkFESU9fVE9LRU4iLCJub3JtYWxpemVFdmVudHMiLCJjaGFuZ2UiLCJ0YXJnZXQkMSIsImNyZWF0ZU9uY2VIYW5kbGVyIiwib25jZUhhbmRsZXIiLCJhZGQkMSIsInJlbW92ZSQyIiwidXBkYXRlRE9NTGlzdGVuZXJzIiwiZXZlbnRzIiwidXBkYXRlRE9NUHJvcHMiLCJvbGRQcm9wcyIsIl92YWx1ZSIsInN0ckN1ciIsInNob3VsZFVwZGF0ZVZhbHVlIiwiY2hlY2tWYWwiLCJjb21wb3NpbmciLCJpc0RpcnR5IiwiaXNJbnB1dENoYW5nZWQiLCJub3RJbkZvY3VzIiwiYWN0aXZlRWxlbWVudCIsIl92TW9kaWZpZXJzIiwibnVtYmVyIiwidHJpbSIsInBhcnNlU3R5bGVUZXh0IiwiY3NzVGV4dCIsImxpc3REZWxpbWl0ZXIiLCJwcm9wZXJ0eURlbGltaXRlciIsIm5vcm1hbGl6ZVN0eWxlRGF0YSIsInN0eWxlIiwibm9ybWFsaXplU3R5bGVCaW5kaW5nIiwic3RhdGljU3R5bGUiLCJiaW5kaW5nU3R5bGUiLCJnZXRTdHlsZSIsImNoZWNrQ2hpbGQiLCJzdHlsZURhdGEiLCJjc3NWYXJSRSIsImltcG9ydGFudFJFIiwic2V0UHJvcCIsInNldFByb3BlcnR5Iiwibm9ybWFsaXplZE5hbWUiLCJub3JtYWxpemUiLCJ2ZW5kb3JOYW1lcyIsImVtcHR5U3R5bGUiLCJjYXBOYW1lIiwidXBkYXRlU3R5bGUiLCJvbGRTdGF0aWNTdHlsZSIsIm9sZFN0eWxlQmluZGluZyIsIm5vcm1hbGl6ZWRTdHlsZSIsIm9sZFN0eWxlIiwibmV3U3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUNsYXNzIiwidGFyIiwicmVzb2x2ZVRyYW5zaXRpb24iLCJjc3MiLCJhdXRvQ3NzVHJhbnNpdGlvbiIsImhhc1RyYW5zaXRpb24iLCJUUkFOU0lUSU9OIiwiQU5JTUFUSU9OIiwidHJhbnNpdGlvblByb3AiLCJ0cmFuc2l0aW9uRW5kRXZlbnQiLCJhbmltYXRpb25Qcm9wIiwiYW5pbWF0aW9uRW5kRXZlbnQiLCJvbnRyYW5zaXRpb25lbmQiLCJvbndlYmtpdHRyYW5zaXRpb25lbmQiLCJvbmFuaW1hdGlvbmVuZCIsIm9ud2Via2l0YW5pbWF0aW9uZW5kIiwicmFmIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsIm5leHRGcmFtZSIsImFkZFRyYW5zaXRpb25DbGFzcyIsInRyYW5zaXRpb25DbGFzc2VzIiwicmVtb3ZlVHJhbnNpdGlvbkNsYXNzIiwid2hlblRyYW5zaXRpb25FbmRzIiwiZ2V0VHJhbnNpdGlvbkluZm8iLCJwcm9wQ291bnQiLCJlbmRlZCIsIm9uRW5kIiwidHJhbnNmb3JtUkUiLCJzdHlsZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwidHJhbnNpdGlvbkRlbGF5cyIsInRyYW5zaXRpb25EdXJhdGlvbnMiLCJ0cmFuc2l0aW9uVGltZW91dCIsImdldFRpbWVvdXQiLCJhbmltYXRpb25EZWxheXMiLCJhbmltYXRpb25EdXJhdGlvbnMiLCJhbmltYXRpb25UaW1lb3V0IiwiaGFzVHJhbnNmb3JtIiwiZGVsYXlzIiwiZHVyYXRpb25zIiwidG9NcyIsInMiLCJlbnRlciIsInRvZ2dsZURpc3BsYXkiLCJjYW5jZWxsZWQiLCJfZW50ZXJDYiIsImVudGVyQ2xhc3MiLCJlbnRlclRvQ2xhc3MiLCJlbnRlckFjdGl2ZUNsYXNzIiwiYXBwZWFyQ2xhc3MiLCJhcHBlYXJUb0NsYXNzIiwiYXBwZWFyQWN0aXZlQ2xhc3MiLCJiZWZvcmVFbnRlciIsImFmdGVyRW50ZXIiLCJlbnRlckNhbmNlbGxlZCIsImJlZm9yZUFwcGVhciIsImFwcGVhciIsImFmdGVyQXBwZWFyIiwiYXBwZWFyQ2FuY2VsbGVkIiwiZHVyYXRpb24iLCJ0cmFuc2l0aW9uTm9kZSIsImlzQXBwZWFyIiwic3RhcnRDbGFzcyIsImFjdGl2ZUNsYXNzIiwidG9DbGFzcyIsImJlZm9yZUVudGVySG9vayIsImVudGVySG9vayIsImFmdGVyRW50ZXJIb29rIiwiZW50ZXJDYW5jZWxsZWRIb29rIiwiZXhwbGljaXRFbnRlckR1cmF0aW9uIiwiZXhwZWN0c0NTUyIsInVzZXJXYW50c0NvbnRyb2wiLCJnZXRIb29rQXJndW1lbnRzTGVuZ3RoIiwic2hvdyIsInBlbmRpbmdOb2RlIiwiX3BlbmRpbmciLCJpc1ZhbGlkRHVyYXRpb24iLCJsZWF2ZSIsImxlYXZlQ2xhc3MiLCJsZWF2ZVRvQ2xhc3MiLCJsZWF2ZUFjdGl2ZUNsYXNzIiwiYmVmb3JlTGVhdmUiLCJhZnRlckxlYXZlIiwibGVhdmVDYW5jZWxsZWQiLCJkZWxheUxlYXZlIiwiZXhwbGljaXRMZWF2ZUR1cmF0aW9uIiwicGVyZm9ybUxlYXZlIiwiY2hlY2tEdXJhdGlvbiIsImludm9rZXJGbnMiLCJfZW50ZXIiLCJwbGF0Zm9ybU1vZHVsZXMiLCJ2bW9kZWwiLCJkaXJlY3RpdmUiLCJiaW5kaW5nIiwiX3ZPcHRpb25zIiwiZ2V0VmFsdWUiLCJvbkNvbXBvc2l0aW9uRW5kIiwib25Db21wb3NpdGlvblN0YXJ0IiwicHJldk9wdGlvbnMiLCJjdXJPcHRpb25zIiwibyIsIm5lZWRSZXNldCIsImhhc05vTWF0Y2hpbmdPcHRpb24iLCJzZXRTZWxlY3RlZCIsImFjdHVhbGx5U2V0U2VsZWN0ZWQiLCJpc011bHRpcGxlIiwib3B0aW9uIiwic2VsZWN0ZWRJbmRleCIsInRyaWdnZXIiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJsb2NhdGVOb2RlIiwidHJhbnNpdGlvbiQkMSIsIm9yaWdpbmFsRGlzcGxheSIsIl9fdk9yaWdpbmFsRGlzcGxheSIsImRpc3BsYXkiLCJ1bmJpbmQiLCJwbGF0Zm9ybURpcmVjdGl2ZXMiLCJ0cmFuc2l0aW9uUHJvcHMiLCJnZXRSZWFsQ2hpbGQiLCJjb21wT3B0aW9ucyIsImV4dHJhY3RUcmFuc2l0aW9uRGF0YSIsInBsYWNlaG9sZGVyIiwiaCIsInJhd0NoaWxkIiwiaGFzUGFyZW50VHJhbnNpdGlvbiIsImlzU2FtZUNoaWxkIiwib2xkQ2hpbGQiLCJUcmFuc2l0aW9uIiwibW9kZSIsIl9sZWF2aW5nIiwib2xkUmF3Q2hpbGQiLCJkZWxheWVkTGVhdmUiLCJUcmFuc2l0aW9uR3JvdXAiLCJwcmV2Q2hpbGRyZW4iLCJyYXdDaGlsZHJlbiIsInRyYW5zaXRpb25EYXRhIiwia2VwdCIsInJlbW92ZWQiLCJjJDEiLCJwb3MiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJiZWZvcmVVcGRhdGUiLCJ1cGRhdGVkIiwibW92ZUNsYXNzIiwiaGFzTW92ZSIsImNhbGxQZW5kaW5nQ2JzIiwicmVjb3JkUG9zaXRpb24iLCJhcHBseVRyYW5zbGF0aW9uIiwiX3JlZmxvdyIsImJvZHkiLCJvZmZzZXRIZWlnaHQiLCJtb3ZlZCIsInRyYW5zZm9ybSIsIldlYmtpdFRyYW5zZm9ybSIsInRyYW5zaXRpb25EdXJhdGlvbiIsIl9tb3ZlQ2IiLCJwcm9wZXJ0eU5hbWUiLCJfaGFzTW92ZSIsImNsb25lIiwiY2xvbmVOb2RlIiwibmV3UG9zIiwib2xkUG9zIiwiZHgiLCJsZWZ0IiwiZHkiLCJ0b3AiLCJwbGF0Zm9ybUNvbXBvbmVudHMiLCJwcm9kdWN0aW9uVGlwIiwidHJhbnNpdGlvbkV2ZW50IiwidHJhbnNpdGlvbnMiLCJ0cmFuc2l0aW9uT25Nb3VudCIsImhlaWdodCIsIm1lYXN1cmVIZWlnaHQiLCJjYWxjSGVpZ2h0IiwidHJhbnNpdGlvblByb3BlcnR5IiwiZWFzaW5nIiwiZWFzaW5ncyIsImJpbmRFdmVudCIsImFuaW1hdGVJbiIsInVubW91bnRPbkhpZGUiLCJzY3JvbGxIZWlnaHQiLCJtaW5IZWlnaHQiLCJtYXhIZWlnaHQiLCJtb3Vu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
