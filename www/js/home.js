var home = {

  menu: {
    options: [
      {
        _id:"idasdsadsa", label: "Quiz do presente do indicativo.",
        subgroups: [
          {tag:"A", label:"ativo"},
          {tag:"P", label:"passivo/médio"}
        ],
        min_questions: 2,
        max_questions: 2
       }
    ]
  },

  option_selected: null,

  showMenu: function() {
    $.get('menu.mst', function(template) {
      var rendered = Mustache.render(template, {home: home.menu});
      $('#main_content').html(rendered);
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
    var max = this.option_selected.max_questions;
    if($("#radio_max_questions").prop( "checked" )) {
      max = this.option_selected.max_questions;
    } else {
      max = this.option_selected.min_questions;
    }
    quiz.start(0,max);
  }
}
