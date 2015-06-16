var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var InfiniteGrid = require('../src/grid');

var ExampleItemRenderer = React.createClass({

    mixins: [ PureRenderMixin ],

    propTypes: {
        index: React.PropTypes.arrayOf(React.PropTypes.number)
    },

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
    items.push({
    	index: i
    });
}

React.render(<InfiniteGrid ItemRenderer={ExampleItemRenderer} itemClassName={"item"} entries={items} />, document.getElementById('grid'));