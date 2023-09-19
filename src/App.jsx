import Navbar from "./components/Navbar/Navbar";
import Presentation from "./components/Presentation/Presentation";
import Footer from "./components/Footer/Footer"
import Languages from "./components/Languages/Languages"
import React, { useEffect, useState } from "react";
import Header from "./components/ShoppingCart/header/Header";
import Search from "./components/ShoppingCart/search/Search";
import AddProducts from "./components/ShoppingCart/addproducts/AddProducts";
import CardBody from "./components/ShoppingCart/cards/CardBody";
import Button from "./components/ShoppingCart/button/Button";


function App() {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
    console.count("hi");
  }, []);

  function changingSrarchData(e) {
    setSearchValue(e.target.value);
  }
  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }
  // console.log(addedItems);
  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
    // console.log(addedItems);
  }

  return (
    <>
    <Navbar/>
    <Presentation/>
    <Languages/>
    <Footer/>
    <div>

      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSrarchData}
            />
            <Button num={addedItems.length} click={setShowAddProducts} />
          </div>
        </div>

        {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}
        <CardBody
          products={itmesFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
    
    </>
  )
}

export default App
