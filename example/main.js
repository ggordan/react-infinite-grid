import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteGrid from '../src/grid';

class ExampleItem extends React.Component {

  static get propTypes() {
    return {
      index: React.PropTypes.number
    };
  }

  render() {
    return(
      <div className='example'>
        This is {this.props.index}
      </div>
    );
  }

}

// Create 100,000 Example items
let items = [];
for (let i = 0; i <= 1000; i++) {
  items.push(<ExampleItem index={i} />);
}

const lazyCallback = (index) => {
  console.log(index);
}

ReactDOM.render(<InfiniteGrid entries={items} wrapperHeight={400} lazyCallback={lazyCallback} />, document.getElementById('grid'));
