import Vue from 'vue';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var script = /*#__PURE__*/ Vue.extend({
    name: "hexagon",
    props: {
        borderSize: {
            type: Number,
            default: 1.5,
        },
        borderColor: {
            type: String,
            default: "#000",
        },
        size: {
            type: Number,
            default: 100,
        },
        backgroundColor: {
            type: String,
            default: "#fff",
        },
        backgroundImage: {
            type: String,
            default: undefined,
        },
        contentStyle: {
            type: Object,
            default: undefined,
        },
        contentClass: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        wrapperStyle: function () {
            var px = this.size + "px";
            return {
                width: px,
                height: px,
            };
        },
        contentStyles: function () {
            var px = this.size + "px";
            var innerStyles = {
                width: px,
                height: px,
                "background-color": this.backgroundColor,
                "background-image": this.backgroundImage,
            };
            return __assign(__assign({}, innerStyles), this.contentStyle);
        },
        borderStyles: function () {
            var px = -this.borderSize + "px";
            return {
                top: px,
                right: px,
                bottom: px,
                left: px,
                "background-color": this.borderColor,
            };
        },
    },
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "coddicat_hexagon__wrapper", style: _vm.wrapperStyle },
    [
      _vm.borderSize > 0
        ? _c("div", {
            staticClass: "coddicat_hexagon__border coddicat_hexagon",
            style: _vm.borderStyles
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "coddicat_hexagon__content coddicat_hexagon",
          class: _vm.contentClass,
          style: _vm.contentStyles,
          on: {
            click: function($e) {
              return _vm.$emit("click", $e)
            },
            mousedown: function($e) {
              return _vm.$emit("mousedown", $e)
            },
            mouseup: function($e) {
              return _vm.$emit("mouseup", $e)
            },
            mousewheel: function($e) {
              return _vm.$emit("mousewheel", $e)
            },
            mousemove: function($e) {
              return _vm.$emit("mousemove", $e)
            },
            mouseenter: function($e) {
              return _vm.$emit("mouseenter", $e)
            },
            mouseover: function($e) {
              return _vm.$emit("mouseover", $e)
            },
            mouseleave: function($e) {
              return _vm.$emit("mouseleave", $e)
            },
            mouseout: function($e) {
              return _vm.$emit("mouseout", $e)
            }
          }
        },
        [_vm._t("default")],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-15e425a2_0", { source: ".coddicat_hexagon {\n  content: \"\";\n  position: absolute;\n  display: block;\n  clip-path: polygon(0% 50%, 25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%);\n  background-size: contain;\n  margin: auto;\n  user-select: none;\n}\n.coddicat_hexagon__content {\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.coddicat_hexagon__wrapper {\n  position: relative;\n  user-select: none;\n}\n\n/*# sourceMappingURL=hexagon.vue.map */", map: {"version":3,"sources":["/Users/shlomo/Projects/vue-pinch-scale/github/vue-hexagon/src/hexagon.vue","hexagon.vue"],"names":[],"mappings":"AA4FA;EACA,WAAA;EACA,kBAAA;EACA,cAAA;EACA,8EAAA;EAQA,wBAAA;EACA,YAAA;EACA,iBAAA;AClGA;ADoGA;EACA,wBAAA;EACA,4BAAA;EACA,0BAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,iBAAA;EACA,wCAAA;AClGA;ADqGA;EACA,kBAAA;EAGA,iBAAA;ACrGA;;AAEA,sCAAsC","file":"hexagon.vue","sourcesContent":["<template>\n  <div class=\"coddicat_hexagon__wrapper\" :style=\"wrapperStyle\">\n    <div\n      class=\"coddicat_hexagon__border coddicat_hexagon\"\n      :style=\"borderStyles\"\n      v-if=\"borderSize > 0\"\n    ></div>\n    <div\n      :class=\"contentClass\"\n      class=\"coddicat_hexagon__content coddicat_hexagon\"\n      :style=\"contentStyles\"\n      @click=\"($e) => $emit('click', $e)\"\n      @mousedown=\"($e) => $emit('mousedown', $e)\"\n      @mouseup=\"($e) => $emit('mouseup', $e)\"\n      @mousewheel=\"($e) => $emit('mousewheel', $e)\"\n      @mousemove=\"($e) => $emit('mousemove', $e)\"\n      @mouseenter=\"($e) => $emit('mouseenter', $e)\"\n      @mouseover=\"($e) => $emit('mouseover', $e)\"\n      @mouseleave=\"($e) => $emit('mouseleave', $e)\"\n      @mouseout=\"($e) => $emit('mouseout', $e)\"\n    >\n      <slot></slot>\n    </div>\n  </div>\n</template>\n<script lang=\"ts\">\nimport Vue from \"vue\";\nexport default /*#__PURE__*/ Vue.extend({\n  name: \"hexagon\",\n  props: {\n    borderSize: {\n      type: Number,\n      default: 1.5,\n    },\n    borderColor: {\n      type: String,\n      default: \"#000\",\n    },\n    size: {\n      type: Number,\n      default: 100,\n    },\n    backgroundColor: {\n      type: String,\n      default: \"#fff\",\n    },\n    backgroundImage: {\n      type: String,\n      default: undefined,\n    },\n    contentStyle: {\n      type: Object,\n      default: undefined,\n    },\n    contentClass: {\n      type: String,\n      default: undefined,\n    },\n  },\n  computed: {\n    wrapperStyle(): any {\n      const px = `${this.size}px`;\n      return {\n        width: px,\n        height: px,\n      };\n    },\n    contentStyles(): any {\n      const px = `${this.size}px`;\n      const innerStyles = {\n        width: px,\n        height: px,\n        \"background-color\": this.backgroundColor,\n        \"background-image\": this.backgroundImage,\n      };\n      return { ...innerStyles, ...this.contentStyle };\n    },\n    borderStyles(): any {\n      const px = `${-this.borderSize}px`;\n      return {\n        top: px,\n        right: px,\n        bottom: px,\n        left: px,\n        \"background-color\": this.borderColor,\n      };\n    },\n  },\n});\n</script>\n\n<style lang=\"scss\">\n.coddicat_hexagon {\n  content: \"\";\n  position: absolute;\n  display: block;\n  clip-path: polygon(\n    0% 50%,\n    25% 6.7%,\n    75% 6.7%,\n    100% 50%,\n    75% 93.3%,\n    25% 93.3%\n  );\n  background-size: contain;\n  margin: auto;\n  user-select: none;\n\n  &__content {\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-size: 100% 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    user-select: none;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  &__wrapper {\n    position: relative;\n    //margin: auto;\n    //transform: translate(-50%, -50%);\n    user-select: none;\n  }\n}\n</style>\n",".coddicat_hexagon {\n  content: \"\";\n  position: absolute;\n  display: block;\n  clip-path: polygon(0% 50%, 25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%);\n  background-size: contain;\n  margin: auto;\n  user-select: none;\n}\n.coddicat_hexagon__content {\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.coddicat_hexagon__wrapper {\n  position: relative;\n  user-select: none;\n}\n\n/*# sourceMappingURL=hexagon.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;
//# sourceMappingURL=index.esm.js.map
