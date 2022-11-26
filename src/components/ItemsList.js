import React, { useEffect } from 'react';

// Redux imports
import { connect } from 'react-redux';
import { fetchItems } from '../state/actions/index';

const ItemsList = props => {
  const { items, isLoading, itemError, fetchItems } = props;

  // This fetches the items using redux and therefore reducing code
  useEffect(() => {
    fetchItems();
  }, []);

  // This is a loading page is isLoading === true
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  // This puts up an error message if something goes wrong
  if (itemError) {
    const error = itemError.toString();
    // No clue why it's making me toString but oh well
    return <h2>Uh oh! We got this error: {error}</h2>;
  }

  return (
    <div className="list-container">
      <div className="main-list">
        {items.map(item => (
          <figure key={item.item_id} className="fig-container">
            <figcaption>
               {item.name}
            </figcaption>
            <img src={item.url} alt={item.name} />
            
            <div className="image-price">
              <p>{item.price}</p>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.itemReducer.items,
  isLoading: state.itemReducer.isLoading,
  itemError: state.itemReducer.itemError,
});

export default connect(mapStateToProps, { fetchItems })(ItemsList);
