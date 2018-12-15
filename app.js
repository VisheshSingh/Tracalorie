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
      { id: 1, name: "Steak Dinner", calories: 1200 },
      { id: 2, name: "Cookie", calories: 400 },
      { id: 3, name: "Eggs", calories: 300 }
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
    }
  };
})();

// UICtrl Controller
const UICtrl = (function() {
  // Selectors
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemName: "#item-name",
    itemCalories: "#item-calories"
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
      // Create element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `${item.id}`;
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
      document.forms[0].reset();
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    const UIselectors = UICtrl.getSelectors();

    // Add item list
    document
      .querySelector(UIselectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };
  // Add item submit
  function itemAddSubmit(e) {
    // Get form input from UICtrl
    const input = UICtrl.getFormInput();

    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to list
      UICtrl.addItemList(newItem);

      // clear fields
      UICtrl.clearFields();
    }

    e.preventDefault();
  }

  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate items
      UICtrl.populateItems(items);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

App.init();
