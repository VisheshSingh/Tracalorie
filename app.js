// Storage Controller

// ItemCtrl Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Items = function(id, name, calories) {
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
    }
  };
})();

// UICtrl Controller
const UICtrl = (function() {
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

      document.querySelector("#item-list").innerHTML = html;
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate items
      UICtrl.populateItems(items);
    }
  };
})(ItemCtrl, UICtrl);

App.init();
