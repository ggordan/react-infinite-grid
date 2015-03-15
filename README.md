# react-infinite-grid

_react infinite grid_ is a React component which renders a grid of React elements. It's different because it only renders the elements that the user can see (and a small buffer) meaning that it is well suited for displaying a large number of elements.

# Installation

```
npm install react-infinite-grid
```

# Example

The example below renders a grid with 100,000 items.

```jsx
var React = require('react');
var InfiniteGrid = require('react-infinite-grid');

var Example = React.createClass({
	render: function() {
		return(
			<div className="example">
				This is {this.props.index}
			</div>
		);
	},
});

var items = [];
for (var i = 0; i <= 100000; i++) {
	items.push(<Example index={i} key={"example-" + i} />);
}

React.render(<InfiniteGrid wrapperHeight={400} entries={items} />, document.getElementById('grid'));
```

## Required props

- entries `React.PropTypes.arrayOf(React.PropTypes.element)` - The only required property is an array of React elements that you want to render.

## Optional props

- **height** `React.PropTypes.number` - The height of the grid item
- **width** `React.PropTypes.number` - The width of the grid item
- **padding** `React.PropTypes.number` - The padding around your items
- **wrapperHeight** `React.PropTypes.number` - The height of the grid.
- **lazyCallback** `React.PropTypes.func` - A function that takes no arguments which is called when a user reaches the end of the grid. Useful if you want to lazy load your data.

# Demo

You can find a demo [here](http://ggordan.com/post/react-infinite-grid.html).
