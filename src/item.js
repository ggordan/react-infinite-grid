var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var Item = React.createClass({

    mixins: [ PureRenderMixin ],

	_itemWidth: function() {
		return this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow;
	},

	_itemLeft: function() {
		var column = this.props.index % this.props.dimensions.itemsPerRow;
		return column * (this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow);
	},

	_itemTop: function() {
		return Math.floor(this.props.index / this.props.dimensions.itemsPerRow) * this.props.dimensions.height;
	},

    render: function() {
        
    	var style = {
    		width: this._itemWidth() - this.props.padding,
    		height: this.props.dimensions.height - this.props.padding,
    		left: this._itemLeft(),
    		top: this._itemTop(),
    		position: "absolute",
    	};
        var ItemRenderer = this.props.ItemRenderer;

        return(
            <div ref="item" className={this.props.itemClassName} key={this.props.key+this.props.index} style={style}>
            	<ItemRenderer {...this.props.data}/>
            </div>
        );
    },
});

module.exports = Item;
