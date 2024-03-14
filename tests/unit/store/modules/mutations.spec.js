import mutations from "@/store/modules/mutations.js"

describe("MODULES", () => {
  it("start loading module request", () => {
    const state = {
      loading: null,
    }

    mutations.MODULES_REQUEST(state)

    // expect(state).toEqual({
    //   loading: true,
    // })
  });

  it('recieve an error and stop loading', () => {
    const state = {
      loading: null,
    }

    const error = new Error('error testing');
    mutations.MODULES_ERROR(state, error)

    // expect(state).toEqual({
    //   loading: false,
    //   error: error,
    // })
  });

  it("recieve module and stop loading", () => {
    const state = {
      loading: null,
    }
    
    const module = [{
      "id": 1,
      "title": "modulozao",
      "description": "modulo top",
      "categories": [
        {
          "title": "categoria junior",
          "classes": [
            {
              "id": 1,
              "title": "classe",
              "category": 1,
              "video": "https://www.youtube.com/embed/UXQ6GtieB8E",
              "description": "Aula topper",
              "text": "<p>texto aqui caaiio</p>"
            },
            {
              "id": 2,
              "title": "aula 2",
              "category": 1,
              "video": "https://www.youtube.com/embed/UXQ6GtieB8E",
              "description": "Aula topper",
              "text": "<p>https://www.youtube.com/embed/UXQ6GtieB8E</p>"
            },
          ]

        }
      ]
    }]

    mutations.MODULES__SUCCESS(state, module)

    // expect(state).toEqual({
    //   loading: false,
    //   module: module,
    // })
  });

})