// import { api } from "@/services/api";

export default {
  fetchModules({ commit }) {
    commit('MODULES_REQUEST');

    try {
      // const response = await api.get('modules');

      commit('MODULES__SUCCESS', {
        "id": 1,
        "title": "modulozao",
        "description": "modulo top",
        "categories": [
          {
            "title": "categoria junior",
            "id": 1,
            "classes": [
              {
                "id": 1,
                "title": "Primeira Classe",
                "category": 1,
                "video": "https://www.youtube.com/embed/UXQ6GtieB8E",
                "description":"Aula topper",
                "text": "<p>texto aqui caaiio</p>"
              },
              {
                "id": 2,
                "title": "aula 2",
                "category": 1,
                "video": "https://www.youtube.com/embed/UXQ6GtieB8E",
                "description":"Aula topper",
                "text": "<p>https://www.youtube.com/embed/UXQ6GtieB8E</p>"
              },
              {
                "id": 3,
                "title": "aula 2",
                "category": 1,
                "video": "https://www.youtube.com/embed/UXQ6GtieB8E",
                "description":"Aula topper",
                "text": "<p>https://www.youtube.com/embed/UXQ6GtieB8E</p>"
              },
              {
                "id": 4,
                "title": "aula 2",
                "category": 1,
                "video": "https://www.youtube.com/embed/UXQ6GtieB8E",
                "description":"Aula topper",
                "text": "<p>https://www.youtube.com/embed/UXQ6GtieB8E</p>"
              },
              {
                "id": 5,
                "title": "aula 2",
                "category": 1,
                "video": "https://www.youtube.com/embed/UXQ6GtieB8E",
                "description":"Aula topper",
                "text": "<p>https://www.youtube.com/embed/UXQ6GtieB8E</p>"
              }
            ]
          }
        ]
      });
    } catch (e) {
      commit('MODULES_ERROR', e);
    }
  },
}