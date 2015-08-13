'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Item = require('./item');

var InfiniteGrid = React.createClass({
    displayName: 'InfiniteGrid',

    mixins: [PureRenderMixin],

    propTypes: {
        ItemRenderer: function ItemRenderer(props, propName, componentName) {
            // TODO: test if this is a ReactClass
        },
        itemClassName: React.PropTypes.string,
        entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        height: React.PropTypes.number,
        width: React.PropTypes.number,
        padding: React.PropTypes.number,
        wrapperHeight: React.PropTypes.number,
        lazyCallback: React.PropTypes.func,
        renderRangeCallback: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            padding: 10,
            entries: [],
            height: 250,
            width: 250
        };
    },

    getInitialState: function getInitialState() {
        return {
            initiatedLazyload: false,
            minHeight: window.innerHeight * 2,
            minItemIndex: 0,
            maxItemIndex: 100,
            itemDimensions: {
                height: this._itemHeight(),
                width: this._itemHeight(),
                gridWidth: 0,
                itemsPerRow: 2
            }
        };
    },

    // METHODS

    _wrapperStyle: function _wrapperStyle() {
        return {
            maxHeight: window.innerHeight,
            overflowY: 'scroll',
            width: '100%',
            height: this.props.wrapperHeight,
            WebkitOverflowScrolling: 'touch'
        };
    },

    _gridStyle: function _gridStyle() {
        return {
            position: "relative",
            marginTop: this.props.padding,
            marginLeft: this.props.padding,
            minHeight: this.state.minHeight
        };
    },

    _getGridRect: function _getGridRect() {
        return this.refs.grid.getDOMNode().getBoundingClientRect();
    },

    _getWrapperRect: function _getWrapperRect() {
        return this.refs.wrapper.getDOMNode().getBoundingClientRect();
    },

    _visibleIndexes: function _visibleIndexes() {
        var itemsPerRow = this._itemsPerRow();

        // The number of rows that the user has scrolled past
        var scrolledPast = this._scrolledPastRows() * itemsPerRow;
        if (scrolledPast < 0) scrolledPast = 0;

        // If i have scrolled past 20 items, but 60 are visible on screen,
        // we do not want to change the minimum
        var min = scrolledPast - itemsPerRow;
        if (min < 0) min = 0;

        // the maximum should be the number of items scrolled past, plus some
        // buffer
        var bufferRows = this._numVisibleRows() + 1;
        var max = scrolledPast + itemsPerRow * bufferRows;
        if (max > this.props.entries.length) max = this.props.entries.length;

        this.setState({
            minItemIndex: min,
            maxItemIndex: max
        }, function () {
            this._lazyCallback();
        });
    },

    _updateItemDimensions: function _updateItemDimensions() {
        this.setState({
            itemDimensions: {
                height: this._itemHeight(),
                width: this._itemHeight(),
                gridWidth: this._getGridRect().width,
                itemsPerRow: this._itemsPerRow()
            },
            minHeight: this._totalRows()
        });
    },

    _itemsPerRow: function _itemsPerRow() {
        return Math.floor(this._getGridRect().width / this._itemWidth());
    },

    _totalRows: function _totalRows() {
        var scrolledPastHeight = this.props.entries.length / this._itemsPerRow() * this._itemHeight();
        if (scrolledPastHeight < 0) return 0;
        return scrolledPastHeight;
    },

    _scrolledPastRows: function _scrolledPastRows() {
        var rect = this._getGridRect();
        var topScrollOffset = rect.height - rect.bottom;
        return Math.floor(topScrollOffset / this._itemHeight());
    },

    _itemHeight: function _itemHeight() {
        return this.props.height + 2 * this.props.padding;
    },

    _itemWidth: function _itemWidth() {
        return this.props.width + 2 * this.props.padding;
    },

    _numVisibleRows: function _numVisibleRows() {
        return Math.ceil(this._getWrapperRect().height / this._itemHeight());
    },

    _lazyCallback: function _lazyCallback() {
        if (!this.state.initiatedLazyload && this.state.maxItemIndex === this.props.entries.length && this.props.lazyCallback) {
            this.setState({ initiatedLazyload: true });
            this.props.lazyCallback(this.state.maxItemIndex);
        }
    },

    // LIFECYCLE

    componentWillMount: function componentWillMount() {
        window.addEventListener('resize', this._resizeListener);
    },

    componentDidMount: function componentDidMount() {
        this._updateItemDimensions();
        this._visibleIndexes();
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.entries.length > this.props.entries.length) {
            this.setState({
                initiatedLazyload: false
            });
        }
        // Update these all the time because entries may change on the fly.
        this._updateItemDimensions();
        this._visibleIndexes();
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        if (typeof this.props.renderRangeCallback === 'function') {
            this.props.renderRangeCallback(this.state.minItemIndex, this.state.maxItemIndex);
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this._resizeListener);
    },

    // LISTENERS

    _scrollListener: function _scrollListener(event) {
        this._visibleIndexes();
    },

    _resizeListener: function _resizeListener(event) {
        if (!this.props.wrapperHeight) {
            this.setState({
                wrapperHeight: window.innerHeight
            });
        }
        this._updateItemDimensions();
        this._visibleIndexes();
    },

    // RENDER

    render: function render() {
        var entries = [];
        if (this.props.entries.length > 0) {
            for (var i = this.state.minItemIndex; i <= this.state.maxItemIndex; i++) {
                var entry = this.props.entries[i];
                if (entry) {
                    entries.push(React.createElement(Item, {
                        ItemRenderer: this.props.ItemRenderer,
                        itemClassName: this.props.itemClassName,
                        key: "item-" + i,
                        index: i,
                        padding: this.props.padding,
                        dimensions: this.state.itemDimensions,
                        data: entry
                    }));
                }
            }
        }

        return React.createElement(
            'div',
            { ref: 'wrapper', className: 'infinite-grid-wrapper', onScroll: this._scrollListener, style: this._wrapperStyle() },
            React.createElement(
                'div',
                { ref: 'grid', className: 'infinite-grid', style: this._gridStyle() },
                entries
            )
        );
    }
});

module.exports = InfiniteGrid;