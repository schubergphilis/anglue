define(["exports", "angular", "./annotation"], function (exports, _angular, _annotation) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

    var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

    var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

    var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var angular = _interopRequire(_angular);

    var Annotation = _interopRequire(_annotation);

    var Store = exports.Store = (function (Annotation) {
        function Store() {
            _classCallCheck(this, Store);

            if (Annotation != null) {
                Annotation.apply(this, arguments);
            }
        }

        _inherits(Store, Annotation);

        _prototypeProperties(Store, null, {
            serviceName: {
                get: function () {
                    var name = this.name;
                    return name[0].toUpperCase() + name.slice(1) + "Store";
                },
                configurable: true
            },
            getInjectionTokens: {
                value: function getInjectionTokens() {
                    return ["LuxyFlux", "LuxyFluxStore", "ApplicationDispatcher"].concat(_get(Object.getPrototypeOf(Store.prototype), "getInjectionTokens", this).call(this));
                },
                writable: true,
                configurable: true
            },
            factoryFn: {
                get: function () {
                    var TargetCls = this.targetCls;
                    var annotation = this;

                    return function (LuxyFlux, LuxyFluxStore, ApplicationDispatcher) {
                        var injected = Array.from(arguments).slice(3);
                        var instance = _applyConstructor(TargetCls, _toConsumableArray(injected));

                        annotation.applyInjectionBindings(instance, injected);
                        annotation.applyDecorators(instance);

                        return LuxyFlux.createStore({
                            name: "store." + annotation.name,
                            dispatcher: ApplicationDispatcher,
                            handlers: TargetCls.handlers,
                            decorate: instance
                        }, LuxyFluxStore);
                    };
                },
                configurable: true
            },
            module: {
                get: function () {
                    if (!this._module) {
                        this._module = angular.module("stores." + this.name, this.dependencies);

                        this._module.factory(this.serviceName, this.getInjectionTokens().concat([this.factoryFn]));

                        this.configure(this._module);
                    }
                    return this._module;
                },
                configurable: true
            }
        });

        return Store;
    })(Annotation);
    exports["default"] = Store;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
//# sourceMappingURL=store.js.map