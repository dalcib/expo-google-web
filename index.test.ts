import { logInAsync } from './index'

declare const global: any

global.gapi = {
  auth2: {
    authorize: jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => 'fsdfds',
      })
    ),
  },
}

describe('Given an ApiClient', () => {
  const params = {
    client_id: 'webClientId',
    response_type: 'id_token permission code',
    scope: 'a b',
  }

  const logInConfig = {
    webClientId: 'webClientId',
    scopes: ['a', 'b'],
  }

  describe('with user is signed in', () => {
    beforeEach(() => {
      logInAsync(logInConfig)
    })
    describe('when constructing', () => {
      it('should load client', () => {
        expect(gapi.auth2.authorize).toHaveBeenCalled()
        expect(gapi.auth2.authorize).toHaveBeenCalledTimes(1)
        expect(gapi.auth2.authorize).resolves.toBe('fsdfds')
        expect(gapi.auth2.authorize).toBeCalledWith(params, expect.any(Function))
        expect(gapi.auth2.authorize).toHaveBeenCalledWith(params, expect.any(Function))
      })
    })
  })
})
