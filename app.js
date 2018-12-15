// Storage Controller

// ItemCtrl Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure/ State
  const data = {
    items: [
      // { id: 1, name: "Steak Dinner", calories: 1200 },
      // { id: 2, name: "Cookie", calories: 400 },
      // { id: 3, name: "Eggs", calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public method
  return {
    logData: function() {
      return data;
    },

    getItems: function() {
      return data.items;
    },
    getItemById: function(id) {
      let found = null;
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    addItem: function(name, calories) {
      let Id;
      // Get id
      if (data.items.length > 0) {
        Id = data.items[data.items.length - 1].id + 1;
      } else {
        Id = 0;
      }

      // calories as number
      calories = Number(calories);
      const newItem = new Item(Id, name, calories);

      data.items.push(newItem);
      return newItem;
    },
    updateItem: function(name, calories) {
      calories = Number(calories);
      let found = null;
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id) {
      const ids = data.items.map(item => {
        return item.id;
      });

      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;
      data.items.forEach(item => (total += item.calories));
      data.totalCalories = total;
      return data.totalCalories;
    }
  };
})();

// UICtrl Controller
const UICtrl = (function() {
  // Selectors
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemName: "#item-name",
    itemCalories: "#item-calories",
    totalCalories: ".total-calories"
  };
  // Public method
  return {
    populateItems: function(items) {
      let html = "";

      items.forEach(item => {
        html += `<li class="collection-item" id="${item.id}">
                <strong>${item.name}: </strong> <em>${
          item.calories
        } Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
              </li>`;
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    addItemList: function(item) {
      document.querySelector(UISelectors.itemList).style.display = "block";

      // disable enter button
      document.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          return false;
        }
      });
      // Create element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${
        item.calories
      } Calories</em>
              <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;

      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    getFormInput: function() {
      return {
        name: document.querySelector(UISelectors.itemName).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      };
    },
    getSelectors: function() {
      return UISelectors;
    },
    clearFields: function() {
      document.querySelector(UISelectors.itemName).value = "";
      document.querySelector(UISelectors.itemCalories).value = "";
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function(calories) {
      document.querySelector(UISelectors.totalCalories).textContent = calories;
    },
    clearEditState: function() {
      UICtrl.clearFields();
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
    },
    showEditState: function() {
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemName
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCalories
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems.forEach(listItem => {
        const itemId = listItem.getAttribute("id");

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${
            item.name
          }: </strong> <em>${item.calories} Calories</em>
                  <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    const UIselectors = UICtrl.getSelectors();

    // Add item
    document
      .querySelector(UIselectors.addBtn)
      .addEventListener("click", itemAddSubmit);
    // EDIT CLICK
    document
      .querySelector(UIselectors.itemList)
      .addEventListener("click", itemEditClick);
    // UPDATE CLICK
    document
      .querySelector(UIselectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
    // DELETE CLICK
    document
      .querySelector(UIselectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);
    // BACK BUTTON  CLICK
    document
      .querySelector(UIselectors.backBtn)
      .addEventListener("click", function(e) {
        e.preventDefault();
        UICtrl.clearEditState();
      });
  };
  // Add item submit
  function itemAddSubmit(e) {
    // Get form input from UICtrl
    const input = UICtrl.getFormInput();

    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to list
      UICtrl.addItemList(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      // clear fields
      UICtrl.clearFields();
    }

    e.preventDefault();
  }
  //EDIT CLICK
  function itemEditClick(e) {
    e.preventDefault();

    if (e.target.classList.contains("edit-item")) {
      const listId = e.target.parentElement.parentElement.id;
      const listArr = listId.split("-");
      const id = Number(listArr[1]);
      // Get item
      const ItemToEdit = ItemCtrl.getItemById(id);
      // Set current item
      ItemCtrl.setCurrentItem(ItemToEdit);

      UICtrl.addItemToForm();
    }
  }

  // UPDATE SUBMIT
  function itemUpdateSubmit(e) {
    e.preventDefault();
    const input = UICtrl.getFormInput();
    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // update UI
    UICtrl.updateListItem(updatedItem);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  }
  // DELETE SUBMIT
  function itemDeleteSubmit(e) {
    e.preventDefault();
    const currentItem = ItemCtrl.getCurrentItem();
    // delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // update UI
    UICtrl.deleteListItem(currentItem.id);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  }

  return {
    init: function() {
      //Set init state
      UICtrl.clearEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate items
        UICtrl.populateItems(items);
      }
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

App.init();
