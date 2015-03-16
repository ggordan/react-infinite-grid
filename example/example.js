var React = require('react');
var InfiniteGrid = require('../src/grid');

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

React.render(<InfiniteGrid entries={items} />, document.getElementById('grid'));