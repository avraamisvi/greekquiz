var quiz = {

  data: [],

  atual: 0,
  points: 0,
  errors: 0,
  max: 2,
  selected: null,

  start: function (quiz_id, max_questions) {
    this.atual= 0;
    this.points= 0;
    this.errors= 0;
    this.max= max_questions;

    this.loadQuestions(quiz_id);

  },

  loadQuestions: function(quiz_id) {
    //se as questos carregadas forem maior que o maximo, o maximo  permanece, senao se menor, muda para o total de questoes na lista.
    $.get('data/'+quiz_id+'.dat', function(data) {
      console.log(data)
      data = eval("(" + data + ")")
      quiz.data = data;

      $.get('quiz.mst', function(template) {
        var rendered = Mustache.render(template, {config: {}});
        $('#main_content').html(rendered);
        quiz.loadQuestion();
      });

    });

  },

  rightAnswer: function() {
    return this.data.answers[this.data.questions[this.atual].correct];
  },

  getQuestion: function() {

    var quest = {
        answers: [],
        title:""
    };

    console.log(this.data)

    var qtsAtual = this.data.questions[this.atual];
    var pattern = qtsAtual.patterns[Math.floor((Math.random() * 3))];

    for(i = 0; i < pattern.length; i++) {
      quest.answers.push({
        label: ""+i,
        text: this.data.answers[pattern[i]].text,
        id: this.data.answers[pattern[i]].id
      });
      quest.title = qtsAtual.title;
    }

    return quest;
  },

  selectAnswer: function(id) {
    this.selected = id;
  },

  submitAnswer: function() {

    if(this.selected == this.rightAnswer().id) {
      this.points++;
      $.get('result_succeed.mst', function(template) {
        var rendered = Mustache.render(template, {right: quiz.rightAnswer(), explanation: quiz.data.questions[quiz.atual].explanation});
        $('#question_content').html(rendered);
      });
    } else {
      this.errors++;
      $.get('result_error.mst', function(template) {
        var rendered = Mustache.render(template, {right: quiz.rightAnswer(), explanation: quiz.data.questions[quiz.atual].explanation});
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

    if(this.getPointsPercent() >= 70) {
      $.get('final_result_a.mst', function(template) {
        var rendered = Mustache.render(template, {errors: quiz.errors, points: quiz.points, classification: quiz.getClassification()});
        $('#main_content').html(rendered);
      });
    } else if(this.getPointsPercent() >= 50) {
      $.get('final_result_b.mst', function(template) {
        var rendered = Mustache.render(template, {errors: quiz.errors, points: quiz.points, classification: quiz.getClassification()});
        $('#main_content').html(rendered);
      });
    } else {
      $.get('final_result_f.mst', function(template) {
        var rendered = Mustache.render(template, {errors: quiz.errors, points: quiz.points, classification: quiz.getClassification()});
        $('#main_content').html(rendered);
      });
    }
  },

  getPointsPercent: function() {
    return (this.points/this.max) * 100;
  },

  getClassification: function() {
    return this.getPointsPercent()+'%';
  },

  next: function() {
    this.atual++;
    this.selected = null;
    if(this.atual >= this.max) {
      this.loadFinalResult();
    } else {
      this.loadQuestion();
    }
  }
}
