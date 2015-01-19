var React = require('react/addons');

var Item = React.createClass({

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

	// EVENT HANDLERS

    render: function() {

    	var cx = React.addons.classSet({
    		item: true,
    	});

    	var style = {
    		width: this._itemWidth() - this.props.padding,
    		height: this.props.dimensions.height - this.props.padding,
    		left: this._itemLeft(),
    		top: this._itemTop(),
    		position: "absolute",
    	};

        return(
            <div ref="item" className={cx} key={this.props.key+this.props.index} style={style}>
            	{this.props.children}
            </div>
        );
    },
});

module.exports = Item;
