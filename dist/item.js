'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = (function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item(props) {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).call(this, props));
	}

	_createClass(Item, [{
		key: '_itemWidth',
		value: function _itemWidth() {
			return this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow;
		}
	}, {
		key: '_itemLeft',
		value: function _itemLeft() {
			var column = this.props.index % this.props.dimensions.itemsPerRow;
			return column * (this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow);
		}
	}, {
		key: '_itemTop',
		value: function _itemTop() {
			return Math.floor(this.props.index / this.props.dimensions.itemsPerRow) * this.props.dimensions.height;
		}

		// LIFECYCLE

	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return !(0, _lodash.isEqual)(this.props, nextProps);
		}

		// RENDER

	}, {
		key: 'render',
		value: function render() {
			var _style = {
				width: this._itemWidth() - this.props.padding,
				height: this.props.dimensions.height - this.props.padding,
				left: this._itemLeft(),
				top: this._itemTop(),
				position: 'absolute'
			};

			var props = {
				className: 'item',
				style: _style
			};

			return _react2.default.createElement(
				'div',
				props,
				_react2.default.createElement(
					'div',
					null,
					this.props.data
				)
			);
		}
	}]);

	return Item;
})(_react2.default.Component);

exports.default = Item;