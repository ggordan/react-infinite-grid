"use strict";

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var Item = React.createClass({
    displayName: "Item",

    mixins: [PureRenderMixin],

    _itemWidth: function _itemWidth() {
        return this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow;
    },

    _itemLeft: function _itemLeft() {
        var column = this.props.index % this.props.dimensions.itemsPerRow;
        return column * (this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow);
    },

    _itemTop: function _itemTop() {
        return Math.floor(this.props.index / this.props.dimensions.itemsPerRow) * this.props.dimensions.height;
    },

    render: function render() {

        var style = {
            width: this._itemWidth() - this.props.padding,
            height: this.props.dimensions.height - this.props.padding,
            left: this._itemLeft(),
            top: this._itemTop(),
            position: "absolute"
        };
        var ItemRenderer = this.props.ItemRenderer;

        return React.createElement(
            "div",
            { ref: "item", className: this.props.itemClassName, key: this.props.key + this.props.index, style: style },
            React.createElement(ItemRenderer, this.props.data)
        );
    }
});

module.exports = Item;