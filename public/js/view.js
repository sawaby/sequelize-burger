$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burg
  var newItemInput = $("input.new-item");

  var burgContainer = $(".burg-container");
  var burgc = $("cont");
  // Adding event listeners for deleting, editing, and adding burgers
  
  $(document).on("click", "button.devour", toggleDevour);
  $(document).on("submit", "#burger-form", insertBurger);
 // Our initial burgers array
  var burger;


 
  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    burgContainer.empty();
    burgc.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burger.length; i++) {
      rowsToAdd.push(createNewRow(burger[i]));
    }
    burgContainer.prepend(rowsToAdd);
    burgc.prepend(rowsToAdd);
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      console.log("Burgers", data);
      burger = data;
      initializeRows();
    });
  }
  function createNewRow(burgers) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item burg-item");
    var newburgSpan = $("<span>");
    newburgSpan.text(burgers.id+". ");
    newburgSpan.append(burgers.burger_name);
    newInputRow.append(newburgSpan);
    var newburgInput = $("<input>");
    newburgInput.attr("type", "text");
    newburgInput.addClass("edit");
    newburgInput.css("display", "none");
    newInputRow.append(newburgInput);
    var newDevourBtn = $("<button>");
    newDevourBtn.addClass("devour btn btn-default");
   // newDevourBtn.attr("id", "dd");
    newDevourBtn.text("Devour It!")
    
    newInputRow.append(newDevourBtn);
    newInputRow.data("burger", burgers);
    if (burgers.devoured) {
        newDevourBtn.hide();
      
     // newburgSpan.css("readonly", true);
      $("#buright").replaceWith(newInputRow);
      
    }
    return newInputRow;
  }
 

  // This function sets a todos complete attribute to the opposite of what it is
  // and then runs the updateTodo function
  function toggleDevour() {
    var burger = $(this)
      .parent()
      .data("burger");

    burger.devoured = !burger.devoured;
    updateBurger(burger);
  }


  // This function updates a burger in our database
  function updateBurger(burgers) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burgers
    })
    .done(function() {
      getBurgers();
    });
  }


  // This function inserts a new burger into our database and then updates the view
  function insertBurger(event) {
    event.preventDefault();
     if (!newItemInput.val().trim()) {   return; }
    var burgers = {
      burger_name: newItemInput.val().trim(),
      devoured: false
    };
    // Posting the new burger, calling getburgers when done
    $.post("/api/burgers", burgers, function() {
      getBurgers();
    });
    newItemInput.val("");
  }

});
