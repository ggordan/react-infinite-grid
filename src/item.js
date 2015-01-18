var React = require('react/addons');

var Item = React.createClass({

	getInitialState: function() {
		return {
			src: null,
			visible: false,
			selected: false,
		};
	},

	_itemWidth: function() {
		return this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow;
	},

	_itemLeft: function() {
		var d = this.props.dimensions;

		// get the index with the itemsPerRow range. Item 50 can't be 50 * w
		// if there are only 6 items in a row.
		var column = this.props.index % d.itemsPerRow;
		return column * (d.gridWidth / d.itemsPerRow);
	},

	_itemTop: function() {
		return Math.floor(this.props.index / this.props.dimensions.itemsPerRow) * this.props.dimensions.height;
	},

	// EVENT HANDLERS

    render: function() {

    	var cx = React.addons.classSet({
    		item: true,
    		selected: this.state.selected,
    	});

    	var style = {
    		width: this._itemWidth() - 10,
    		height: this.props.dimensions.height - 10,
    		left: this._itemLeft(),
    		top: this._itemTop(),
    		position: "absolute",
    		background: "#e2e2e2",
    	};

        return(
            <div ref="item" className={cx} key={this.props.key} style={style}>
            	{this.props.children}
            </div>
        );
    },
});

module.exports = Item;
