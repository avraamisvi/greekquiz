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
      correct: "a"
    },
    {
      title: "Qual é esta forma de λύετε ?"
      answers: [
        {label:"a", text:"1a pessoa do presente do indicativo ativo singular"},
        {label:"b", text:"2a pessoa do presente do indicativo ativo plural"},
        {label:"c", text:"1a pessoa do futuro do indicativo ativo singular"},
        {label:"d", text:"3a pessoa do futuro do indicativo passivo/médio singular"}
      ],
      correct: "b"
    }
  ],

  actual: 0,
  points: 0,
  errors: 0,
  max: 2,

  start: function (level, questions_len) {

  },

  selectAnswer: function(label) {

  },

  next: function() {

  }
}
