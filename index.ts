interface LogInConfig {
  //androidClientId?: string
  //androidStandaloneAppClientId?: string
  //iosClientId?: string
  //iosStandaloneAppClientId?: string
  webClientId: string
  //behavior?:  'system' |  'web'
  scopes: string[]
}

type LogInResult =
  | {
      type: 'success'
      accessToken: string
      idToken: string
      refreshToken?: string
      serverAuthCode: string
      user: User
    }
  | {
      type: 'cancel'
    }

interface User {
  id: string
  name: string
  givenName: string
  familyName: string
  photoUrl?: string
  email?: string
}

export async function logInAsync(config: LogInConfig) {
  return new Promise((resolve, reject) => {
    gapi.auth2.authorize(
      {
        client_id: config.webClientId,
        scope: config.scopes.join(' ') || 'profile email',
        //cookie_policy: 'single_host_origin',
        response_type: 'id_token permission code',
      },
      async authResult => {
        if (authResult.error) {
          console.error(authResult.error, authResult.error_subtype)
          reject(authResult.error)
        } else {
          if (authResult.access_token) {
            const user = await getUserProfile(authResult.access_token)
            resolve({
              type: 'success',
              accessToken: authResult.access_token,
              idToken: authResult.id_token,
              //refreshToken: null,
              serverAuthCode: authResult.code,
              user,
            })
          } else {
            resolve({ type: 'cancel' })
          }
        }
      }
    )
  }) as Promise<LogInResult>
}

async function getUserProfile(accessToken: string): Promise<User> {
  let userInfoResponse: any = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  userInfoResponse = await userInfoResponse.json()
  return {
    id: userInfoResponse.id,
    name: userInfoResponse.name,
    givenName: userInfoResponse.given_name,
    familyName: userInfoResponse.family_name,
    photoUrl: userInfoResponse.picture,
    email: userInfoResponse.email,
  }
}

/* function logOut() {
  return new Promise((resolve, reject) => {
    const token: string = ''
      fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`, {
        mode: 'no-cors',
      })
        .then(res => {
          resolve()
        })
        .catch(error => reject(error))
  })
} */
