import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
import { addItem } from '../state/actions/index';
import axiosWithAuth from '../utils/axiosWithAuth';

const OwnerAddItem = (props) => {
  
  const [isValidItem, setIsValidItem] = useState(true);

  const [newItem, setNewItem] = useState({
    item_id: '',
    name: '',
    category: '',
    price: '',
    location: '',
    description: '',
    url: '',
    user_id: parseInt(localStorage.getItem('user_id')),
  });
  const { addItem } = props;

  const initialIsAddingItem = false;

  // const [itemInfo, setItemInfo] = useState(initialItemInfo);
  const [isAddingItem, setIsAddingItem] = useState(initialIsAddingItem);

  useEffect(() => {
    setNewItem({ ...newItem});
  }, [isAddingItem]);

  // const { push } = useHistory();

  // const handleChange = e => {
  //   setItemInfo({
  //     ...itemInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleClickAdd = e => {
  //   e.preventDefault();
  //   setIsAddingItem(true);
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   axiosWithAuth
  //     .post(`${API_URL}items`, itemInfo)
  //     .then(resp => console.log(resp))
  //     .catch(err => console.error(err));
  //   setIsAddingItem(false);
  // };

  // const handleCancel = e => {
  //   e.preventDefault();

  //   setIsAddingItem(false);
  // };

  // const selectCategory = async e => {
  //   setItemInfo(getNewCategory(e));
  // };

  // const getNewCategory = e => {
  //   const newItemInfo = { ...itemInfo };
  //   newItemInfo.category = e.target.value;
  //   console.log(newItemInfo);
  //   return newItemInfo;
  // };

  const handleChange = e => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //     addItem(newItem);
  //   };


  const handleSubmit = e => {
    e.preventDefault();
    const { name, price, category, location } = newItem;
    setIsValidItem( name && price && category && location ) ;

    axiosWithAuth()
      .post(`${process.env.REACT_APP_API_URI}/items`, newItem)
      .then(resp => {
        addItem(newItem);
        console.log(resp, 'Res from api');

      })
      .catch(err => console.error(err));
  };

    // setNewItem({
    //   category: '',
    // description: '',
    // item_id: '',
    // location: '',
    // name: '',
    // price: '',
    // user_id: '',
    // url: '',
    // });


  // ------------------------------------

  const handleClickAdd = e => {
    e.preventDefault();
    setIsAddingItem(true);
  };

  const handleCancel = e => {
    e.preventDefault();

    setIsAddingItem(false);
  };

  const selectCategory = async e => {
    setNewItem(getNewCategory(e));
  };

  const getNewCategory = e => {
    const newItemInfo = { ...newItem };
    newItemInfo.category = e.target.value;
    return newItemInfo;
  };

  return (
    <div className="add-item-container">
      {!isAddingItem && <button onClick={handleClickAdd}>Add New Item</button>}
      {isAddingItem && (
        <div className="add-item-card">
          <h2>ADD AN ITEM</h2>
          <button onClick={handleCancel}>X close</button>
          { !isValidItem && 
            <p>
              You must include a name, price, category and location. 
            </p>}
          <form onSubmit={handleSubmit}>
            <label>
              PRODUCT NAME
              <input
                type="text"
                value={newItem.name}
                onChange={handleChange}
                name="name"
                id="name"
              />
            </label>

            <label>
              DESCRIPTION
              <input
                type="text"
                value={newItem.description}
                onChange={handleChange}
                name="description"
              />
            </label>

            <label>
              PRICE
              <input
                type="text"
                value={newItem.price}
                onChange={handleChange}
                name="price"
              />
            </label>

            <label>
              LOCATION
              <input
                type="text"
                value={newItem.location}
                onChange={handleChange}
                name="location"
              />
            </label>
            <label>
              IMAGE URL
              <input
                type="text"
                value={newItem.url}
                onChange={handleChange}
                name="url"
              />
            </label>
            <label>
              CATEGORY
              <select
                id={newItem.category}
                onChange={selectCategory}
                name={newItem.category}
                value={newItem.category}
              >
                <option name="category" value="0">
                  SELECT CATEGORY:
                </option>
                <option name="housewares" value="housewares">
                  HOUSEWARES
                </option>
                <option name="furniture" value="furniture">
                  FURNITURE
                </option>
                <option name="food" value="food">
                  FOOD
                </option>
                <option name="apparel" value="apparel">
                  APPAREL
                </option>
              </select>
            </label>
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.itemReducer.items,
});

export default connect(mapStateToProps, { addItem })(OwnerAddItem);
