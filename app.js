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
    }
  };
})();

// UICtrl Controller
const UICtrl = (function() {})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  return {
    init: function() {
      console.log("Initialize App...");
    }
  };
})(ItemCtrl, UICtrl);

App.init();
