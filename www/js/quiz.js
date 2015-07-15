var quiz = {

  questions: [
    {
      title: "Qual é esta forma de λύω ?"
      answers: [
        {label:"a", text:"1a pessoa do presente do indicativo ativo singular"},
        {label:"b", text:"1a pessoa do presente do indicativo ativo plural"},
        {label:"c", text:"1a pessoa do futuro do indicativo ativo singular"},
        {label:"d", text:"3a pessoa do futuro do indicativo passivo/médio singular"}
      ],
      correct: 0
    },
    {
      title: "Qual é esta forma de λύετε ?"
      answers: [
        {label:"a", text:"1a pessoa do presente do indicativo ativo singular"},
        {label:"b", text:"2a pessoa do presente do indicativo ativo plural"},
        {label:"c", text:"1a pessoa do futuro do indicativo ativo singular"},
        {label:"d", text:"3a pessoa do futuro do indicativo passivo/médio singular"}
      ],
      correct: 1
    }
  ],

  atual: 0,
  points: 0,
  errors: 0,
  max: 2,

  start: function (level, questions_len) {
    this.atual= 0;
    this.points= 0;
    this.errors= 0;
    this.max= 2;
    this.loadQuestion();
  },

  rightAnswer: function() {
    return this.getQuestion().answers[this.getQuestion().correct];
  },

  getQuestion: function() {
    return this.questions[this.atual];
  },

  selectAnswer: function(label) {

    if(label == this.rightAnswer().label) {
      this.points++;
      $.get('result_succeed.mst', function(template) {
        var rendered = Mustache.render(template, {right: quiz.rightAnswer()});
        $('#question_content').html(rendered);
      });
    } else {
      $.get('result_error.mst', function(template) {
        var rendered = Mustache.render(template, {right: quiz.rightAnswer()});
        $('#question_content').html(rendered);
      });
    }
  },

  loadQuestion: function() {
    $.get('question.mst', function(template) {
      var rendered = Mustache.render(template, {question: quiz.getQuestion()});
      $('#question_content').html(rendered);
    });
  },

  loadResult: function() {
    $.get('result.mst', function(template) {
      var rendered = Mustache.render(template, {errors: quiz.errors, points: quiz.points, classification: quiz.getClassification()});
      $('#question_content').html(rendered);
    });
  },

  loadFinalResult: function() {
    $.get('final_result.mst', function(template) {
      var rendered = Mustache.render(template, {errors: quiz.errors, points: quiz.points, classification: quiz.getClassification()});
      $('#question_content').html(rendered);
    });
  },

  getClassification: function() {
    return 'A';
  },

  next: function() {
    this.atual++;
    if(this.atual >= this.max) {
      this.loadFinalResult();
    } else {
      this.loadQuestion();
    }
  }
}
