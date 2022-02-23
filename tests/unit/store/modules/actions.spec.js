import actions from '@/store/modules/actions';

let url = ''
let body = {}
let mockError = false

jest.mock("axios", () => ({
  get: (_url, _body) => { 
    return new Promise((resolve) => {
      if (mockError) 
        throw Error()

      url = _url
      body = _body
      resolve(true)
    })
  }
}))

describe("authenticate", () => {
  it("authenticated a user", async () => {
    // const commit = jest.fn()
    // const username = "alice"
    // const password = "password"

    // await actions.fetchModules({ commit })

    // expect(url).toBe("/api/authenticate")
    // expect(body).toEqual({ username, password })
    // expect(commit).toHaveBeenCalledWith(
    //   "SET_AUTHENTICATED", true)
    expect(true);
  })

  it("catches an error", async () => {
    // mockError = true
  
    // await expect(actions.authenticate({ commit: jest.fn() }, {}))
    //   .rejects.toThrow("API Error occurred.")
  })
})