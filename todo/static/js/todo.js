var app = angular.module('toDo', []);
app.controller('toDoController', function($scope, $http) {
  // $scope.todoList = [{todoText: 'Finish this app', done: false}];

  function refresh(response) {
    $scope.todoList = [];
    for (var i = 0; i < response.data.length; i++) {
      var todo = {}
      todo.id = response.data[i].id
      todo.todoText = response.data[i].text
      todo.done = response.data[i].done
      $scope.todoList.push(todo);
    }
  };

  $http.get('/todo/api/').then(refresh)

  $scope.saveData = function() {
    var data = {text: $scope.todoInput, done: false}
    $http.put('/todo/api/', data).then(function(response) {
      $http.get('/todo/api/').then(refresh)
    });
  };

  $scope.todoAdd = function() {
    $scope.todoList.push({todoText: $scope.todoInput, done: false});
    $scope.todoInput = '';
  };

  $scope.remove = function() {
    var oldList = $scope.todoList;
    $scope.todoList = [];
    angular.forEach(oldList, function(todo) {
      if (todo.done) {
        $http.delete('/todo/api/' + todo.id + '/');
      } else {
        $scope.todoList.push(todo);
      }
    });
  };
});
