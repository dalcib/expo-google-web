# expo-google-web

Provides Google authentication with Expo API for react-native-web projects

---

You'll get an access token after a succesful login. Once you have the token, if you would like to make further calls to the Google API, you can use Google's [REST APIs](https://developers.google.com/apis-explorer/) directly through HTTP (using [fetch](https://facebook.github.io/react-native/docs/network.html#fetch), for example).

```javascript
// Example of using the Google REST API
async function getUserInfo(accessToken) {
  let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return userInfoResponse
}
```

## Usage

### `logInAsync(options)`

Prompts the user to log into Google and grants your app permission to access some of their Google data, as specified by the scopes.

#### :param object options

A map of options:

- **scopes** (_array_) -- An array specifying the scopes to ask for from Google for this login ([more information here](https://gsuite-developers.googleblog.com/2012/01/tips-on-using-apis-discovery-service.html)). Default scopes are `['profile', 'email']`.
- **webClientId** (_string_) -- The web client id registered with Google to generate server tokens.

#### Returns

If the user or Google cancelled the login, returns `{ type: 'cancel' }`.

Otherwise, returns `{ type: 'success', accessToken, idToken, {...profileInformation} }`, `accessToken` is a string giving the access token to use with Google HTTP API requests.
