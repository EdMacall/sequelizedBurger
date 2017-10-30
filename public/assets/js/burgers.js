$(document).ready(function() {
  /* global moment */
  // burgerContainer holds all of our burgers
  var burgerContainer = $(".burger-container");
  var burgerCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleBurgerDelete);
  $(document).on("click", "button.edit", handleBurgerEdit);
  // Variable to hold our posts
  var burgers;
  // The code below handles the case where we want to get burger burgers for a specific eater
  // Looks for a query param in the url for eater_id
  var url = window.location.search;
  var eaterId;
  if (url.indexOf("?eater_id=") !== -1) {
    eaterId = url.split("=")[1];
    getBurgers(eaterId);
  }
  // If there's no eaterId we just get all burgers as usual
  else {
    getBurgers();
  }
  // This function grabs burgers from the database and updates the view
  function getBurgers(author) {
    eaterId = eater || "";
    if (eaterId) {
      eaterId = "/?eater_id=" + eaterId;
    }
    $.get("/api/burgers" + eaterId, function(data) {
      console.log("Burgers", data);
      burgers = data;
      if (!burgers || !burgers.length) {
        displayEmpty(eater);
      }
      else {
        initializeRows();
      }
    });
  }
  // This function does an API call to delete burgers
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    })
    .done(function() {
      getPosts(postCategorySelect.val());
    });
  }
  // InitializeRows handles appending all of our constructed burger HTML inside burgerContainer
  function initializeRows() {
    burgerContainer.empty();
    var burgersToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      burgersToAdd.push(createNewRow(burgers[i]));
    }
    burgerContainer.append(burgersToAdd);
  }
  // This function constructs a burger's HTML
  function createNewRow(burger) {
    var formattedDate = new Date(burger.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newBurgerPanel = $("<div>");
    newBurgerPanel.addClass("panel panel-default");
    var newBurgerPanelHeading = $("<div>");
    newBurgerPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newBurgerTitle = $("<h2>");
    var newBurgerDate = $("<small>");
    var newBurgerEater = $("<h5>");
    newBurgerEater.text("Eaten by: " + burger.Eater.name);
    newBurgerEater.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newPostPanelBody = $("<div>");
    newBurgerPanelBody.addClass("panel-body");
    var newBurgerBody = $("<p>");
    newBurgerTitle.text(burger.title + " ");
    newBurgerBody.text(burger.body);
    newBurgerDate.text(formattedDate);
    newBurgerTitle.append(newBurgerDate);
    newBurgerPanelHeading.append(deleteBtn);
    newBurgerPanelHeading.append(editBtn);
    newBurgerPanelHeading.append(newBurgerTitle);
    newBurgerPanelHeading.append(newBurgerAuthor);
    newBurgerPanelBody.append(newBurgerBody);
    newBurgerPanel.append(newBurgerPanelHeading);
    newBurgerPanel.append(newBurgerPanelBody);
    newBurgerPanel.data("burger", burger);
    return newBurgerPanel;
  }
  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentBurger = $(this)
      .parent()
      .parent()
      .data("burger");
    deleteBurger(currentBurger.id);
  }
  // This function figures out which post we want to edit and takes it to the appropriate url
  function handleBurgerEdit() {
    var currentBurger = $(this)
      .parent()
      .parent()
      .data("burger");
    window.location.href = "/cms?burger_id=" + currentBurger.id;
  }
  // This function displays a messgae when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Eater #" + id;
    }
    burgerContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No burgers yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    burgerContainer.append(messageh2);
  }
});