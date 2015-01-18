var React = require('react');
var Item = require('./item');

var Grid = React.createClass({

    propTypes: {
        entries: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
        height: React.PropTypes.number,
        width: React.PropTypes.number,
        itemPadding: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            itemPadding: 10,
            entries: [],
            height: 250,
            width: 250,
        };
    },

    getInitialState: function() {
        return {
            selectMode: false,
            minHeight: window.innerHeight * 2,
            visibleIndexes: {
                lower: 0,
                higher: 100,
            },
            itemDimensions: {
                height: this._itemHeight(),
                width: this._itemHeight(),
                gridWidth: window.innerWidth,
                itemsPerRow: 2,
            },
        };
    },

    // METHODS

    _style: function() {
        return {
            marginTop: this.props.itemPadding,
            marginLeft: this.props.itemPadding,
            position: "relative",
            minHeight: this.state.minHeight,
        };
    },

    _getGridRect: function() {
        return this.refs.grid.getDOMNode().getBoundingClientRect();
    },

    _visibleIndexes: function() {

        // The number of items per row
        var itemsPerRow = this._itemsPerRow();

        // The number of rows that the user has scrolled past
        var scrolledPast = (this._scrolledPastRows() * itemsPerRow);
        if (scrolledPast < 0) scrolledPast = 0;

        // If i have scrolled past 20 items, but 60 are visible on screen,
        // we do not want to change the minimum
        var min = scrolledPast - itemsPerRow;
        if (min < 0) min = 0;

        // the maximum should be the number of items scrolled past, plus some
        // buffer
        var bufferRows = this._numVisibleRows() + 1;
        var max = scrolledPast + (itemsPerRow * bufferRows);

        this.setState({
            visibleIndexes: {
                lower: min,
                higher: max,
            },
            itemDimensions: {
                height: this._itemHeight(),
                width: this._itemHeight(),
                gridWidth: this._getGridRect().width,
                itemsPerRow: itemsPerRow,
            },
            minHeight: this._totalRows(),
        });
    },

    _itemsPerRow: function() {
        return Math.floor(this._getGridRect().width / this._itemWidth());
    },

    _totalRows: function() {
        var scrolledPastHeight = (this.props.entries.length / this._itemsPerRow()) * this._itemHeight();
        if (scrolledPastHeight < 0) return 0;
        return scrolledPastHeight;
    },

    // The number of rows that a user has scrolled past
    _scrolledPastRows: function() {
        var rect = this._getGridRect();
        var topScrollOffset = rect.height - rect.bottom;
        return Math.floor(topScrollOffset / this._itemHeight());
    },

    _itemHeight: function() {
        return this.props.height + (2 * this.props.itemPadding);
    },

    _itemWidth: function() {
        return this.props.width + (2 * this.props.itemPadding);
    },

    // The number of visible rows in the grid
    _numVisibleRows: function() {
        return Math.ceil(window.innerHeight / this._itemHeight());
    },

    // LIFECYCLE

    componentWillMount: function() {
        window.addEventListener('resize', this._resizeListener);
        window.addEventListener('scroll', this._scrollListener);
    },

    componentDidMount: function() {
        this._visibleIndexes();
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this._resizeListener);
        window.removeEventListener('scroll', this._scrollListener);
    },

    // LISTENERS

    _scrollListener: function() {
        this._visibleIndexes();
    },

    _resizeListener: function() {
        this._visibleIndexes();
    },

    // RENDER

    render: function() {

        var entries = [];
        var arrEntries = this.props.entries;
        if (arrEntries.length > 0) {
            for (var i = 0; i <= arrEntries.length; i++) {
                var entry = this.props.entries[i];
                if (i >= this.state.visibleIndexes.lower && i <= this.state.visibleIndexes.higher) {
                    if (entry) {
                        entries.push(Item({
                            dimensions: this.state.itemDimensions,
                            index: i,
                            key: "item-" + i,
                            padding: this.props.itemPadding,
                            children: [entry({ key: "hello"+ i})],
                        }));
                        // entries.push(
                        //     <Item dimensions={this.state.itemDimensions} index={i} key={"item" + i}>
                        //         <entry />
                        //     </Item>
                        // );
                    }
                }
            }
        }
        return(
            <div className="lazy-grid-wrapper">
                <div ref="grid" className="lazy-grid" style={this._style()}>
                    {entries}
                </div>
            </div>
        );
    },
});

module.exports = Grid;
