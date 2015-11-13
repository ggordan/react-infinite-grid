import React from 'react';

export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.props = {};
		this.state = {};
	}

	_itemWidth() {
		return this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow;
	}

	_itemLeft() {
		var column = this.props.index % this.props.dimensions.itemsPerRow;
		return column * (this.props.dimensions.gridWidth / this.props.dimensions.itemsPerRow);
	}

	_itemTop() {
		return Math.floor(this.props.index / this.props.dimensions.itemsPerRow) * this.props.dimensions.height;
	}

	render() {

		const _style = {
			width: this._itemWidth() - this.props.padding,
			height: this.props.dimensions.height - this.props.padding,
			left: this._itemLeft(),
			top: this._itemTop(),
			position: "absolute"
		};

		var props = {
			className: this.props.itemClassName,
			style: _style
		};

		return (
			<div {...props}>
				<div>{this.props.data}</div>
			</div>
		);

	}
}
