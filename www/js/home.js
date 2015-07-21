var home = {

  menu: {},

  option_selected: null,

  showMenu: function() {
    $.get('menu.mst', function(template) {
      $.get('data/menu.dat', function(data) {
        data = eval("(" + data + ")");
        home.menu = data;
        var rendered = Mustache.render(template, {home: home.menu});
        $('#main_content').html(rendered);
      });
    });
  },

  start: function(optionID) {
    $.get('quiz_options.mst', function(template) {

      var opt = null;

      for(i = 0; i < home.menu.options.length; i++) {
        if(home.menu.options[i]._id == optionID) {
          opt = home.menu.options[i];
        }
      }

      home.option_selected = opt;

      var rendered = Mustache.render(template, {option: opt});
      $('#main_content').html(rendered);
    });
  },

  run: function() {
    var start = parseInt($("#start_question").val());
    var end = parseInt($("#end_question").val());

    quiz.start(this.option_selected._id, start, end);
  }
}
