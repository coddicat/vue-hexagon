import { Prop, Component, Vue } from 'vue-property-decorator';

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var events = [
    "click",
    "mousedown",
    "mouseup",
    "mousewheel",
    "mousemove",
    "mouseenter",
    "mouseover",
    "mouseleave",
    "mouseout",
];
var Hexagon = /** @class */ (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Hexagon.prototype, "wrapperStyle", {
        get: function () {
            var px = this.size + "px";
            return {
                width: px,
                height: px,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hexagon.prototype, "contentStyles", {
        get: function () {
            var px = this.size + "px";
            var innerStyles = {
                width: px,
                height: px,
                "background-color": this.backgroundColor,
                "background-image": this.backgroundImage,
            };
            return __assign(__assign({}, innerStyles), this.contentStyle);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hexagon.prototype, "borderStyles", {
        get: function () {
            var px = -this.borderSize + "px";
            return {
                top: px,
                right: px,
                bottom: px,
                left: px,
                "background-color": this.borderColor,
            };
        },
        enumerable: false,
        configurable: true
    });
    Hexagon.prototype.mounted = function () {
        var _this = this;
        var el = this.$refs.content;
        events.forEach(function (event) {
            if (_this.$listeners[event]) {
                el.addEventListener(event, function ($e) { return _this.$emit(event, $e); });
            }
        });
    };
    __decorate([
        Prop({ required: false, default: 1.5 })
    ], Hexagon.prototype, "borderSize", void 0);
    __decorate([
        Prop({ required: false, default: "#000" })
    ], Hexagon.prototype, "borderColor", void 0);
    __decorate([
        Prop({ required: false, default: 100 })
    ], Hexagon.prototype, "size", void 0);
    __decorate([
        Prop({ required: false, default: "#fff" })
    ], Hexagon.prototype, "backgroundColor", void 0);
    __decorate([
        Prop({ required: false, default: undefined })
    ], Hexagon.prototype, "backgroundImage", void 0);
    __decorate([
        Prop({ required: false, default: undefined })
    ], Hexagon.prototype, "contentStyle", void 0);
    __decorate([
        Prop({ required: false, default: undefined })
    ], Hexagon.prototype, "contentClass", void 0);
    Hexagon = __decorate([
        Component({
            name: "Hexagon",
        })
    ], Hexagon);
    return Hexagon;
}(Vue));

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
const __vue_script__ = Hexagon;

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
          ref: "content",
          staticClass: "coddicat_hexagon__content coddicat_hexagon",
          class: _vm.contentClass,
          style: _vm.contentStyles
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
    inject("data-v-444035a3_0", { source: ".coddicat_hexagon {\n  content: \"\";\n  position: absolute;\n  display: block;\n  clip-path: polygon(0% 50%, 25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%);\n  background-size: contain;\n  margin: auto;\n  user-select: none;\n}\n.coddicat_hexagon__content {\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.coddicat_hexagon__wrapper {\n  position: relative;\n  user-select: none;\n}\n\n/*# sourceMappingURL=hexagon.vue.map */", map: {"version":3,"sources":["C:\\Users\\shlomo\\source\\repos\\coddicat\\github\\vue-hexagon\\src\\hexagon.vue","hexagon.vue"],"names":[],"mappings":"AAuFA;EACA,WAAA;EACA,kBAAA;EACA,cAAA;EACA,8EAAA;EAQA,wBAAA;EACA,YAAA;EACA,iBAAA;AC7FA;AD+FA;EACA,wBAAA;EACA,4BAAA;EACA,0BAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,iBAAA;EACA,wCAAA;AC7FA;ADgGA;EACA,kBAAA;EAGA,iBAAA;AChGA;;AAEA,sCAAsC","file":"hexagon.vue","sourcesContent":["<template>\r\n  <div class=\"coddicat_hexagon__wrapper\" :style=\"wrapperStyle\">\r\n    <div\r\n      class=\"coddicat_hexagon__border coddicat_hexagon\"\r\n      :style=\"borderStyles\"\r\n      v-if=\"borderSize > 0\"\r\n    ></div>\r\n    <div\r\n      ref=\"content\"\r\n      :class=\"contentClass\"\r\n      class=\"coddicat_hexagon__content coddicat_hexagon\"\r\n      :style=\"contentStyles\"\r\n    >\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Component, Prop, Vue } from \"vue-property-decorator\";\r\n\r\nconst events = [\r\n  \"click\",\r\n  \"mousedown\",\r\n  \"mouseup\",\r\n  \"mousewheel\",\r\n  \"mousemove\",\r\n  \"mouseenter\",\r\n  \"mouseover\",\r\n  \"mouseleave\",\r\n  \"mouseout\",\r\n];\r\n\r\n\r\n@Component({\r\n  name: \"Hexagon\",\r\n})\r\nexport default class Hexagon extends Vue { \r\n  @Prop({ required: false, default: 1.5 }) private borderSize!: number;\r\n  @Prop({ required: false, default: \"#000\" }) private borderColor!: string;\r\n  @Prop({ required: false, default: 100 }) private size!: number;\r\n  @Prop({ required: false, default: \"#fff\" }) private backgroundColor!: string;\r\n  @Prop({ required: false, default: undefined }) private backgroundImage: string | undefined;\r\n  @Prop({ required: false, default: undefined }) private contentStyle: object | undefined;\r\n  @Prop({ required: false, default: undefined }) private contentClass: string | undefined;\r\n\r\n  get wrapperStyle(): object {\r\n    const px = `${this.size}px`;\r\n    return {\r\n      width: px,\r\n      height: px,\r\n    };\r\n  }\r\n\r\n  get contentStyles(): object {\r\n    const px = `${this.size}px`;\r\n    const innerStyles = {\r\n      width: px,\r\n      height: px,\r\n      \"background-color\": this.backgroundColor,\r\n      \"background-image\": this.backgroundImage,\r\n    };\r\n    return { ...innerStyles, ...this.contentStyle };\r\n  }\r\n\r\n  get borderStyles(): object {\r\n    const px = `${-this.borderSize}px`;\r\n    return {\r\n      top: px,\r\n      right: px,\r\n      bottom: px,\r\n      left: px,\r\n      \"background-color\": this.borderColor,\r\n    };\r\n  }\r\n\r\n  mounted(): void {\r\n    const el = this.$refs.content as Element;\r\n    events.forEach((event) => {\r\n      if (this.$listeners[event]) {\r\n        el.addEventListener(event, ($e: any) => this.$emit(event, $e));\r\n      }\r\n    });\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.coddicat_hexagon {\r\n  content: \"\";\r\n  position: absolute;\r\n  display: block;\r\n  clip-path: polygon(\r\n    0% 50%,\r\n    25% 6.7%,\r\n    75% 6.7%,\r\n    100% 50%,\r\n    75% 93.3%,\r\n    25% 93.3%\r\n  );\r\n  background-size: contain;\r\n  margin: auto;\r\n  user-select: none;\r\n\r\n  &__content {\r\n    background-size: contain;\r\n    background-repeat: no-repeat;\r\n    background-size: 100% 100%;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    user-select: none;\r\n    -webkit-tap-highlight-color: transparent;\r\n  }\r\n\r\n  &__wrapper {\r\n    position: relative;\r\n    //margin: auto;\r\n    //transform: translate(-50%, -50%);\r\n    user-select: none;\r\n  }\r\n}\r\n</style>\r\n",".coddicat_hexagon {\n  content: \"\";\n  position: absolute;\n  display: block;\n  clip-path: polygon(0% 50%, 25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%);\n  background-size: contain;\n  margin: auto;\n  user-select: none;\n}\n.coddicat_hexagon__content {\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.coddicat_hexagon__wrapper {\n  position: relative;\n  user-select: none;\n}\n\n/*# sourceMappingURL=hexagon.vue.map */"]}, media: undefined });

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
