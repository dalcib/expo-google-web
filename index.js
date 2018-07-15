"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function logInAsync(config) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    gapi.auth2.authorize({
                        client_id: config.webClientId,
                        scope: config.scopes.join(' ') || 'profile email',
                        //cookie_policy: 'single_host_origin',
                        response_type: 'id_token permission code',
                    }, function (authResult) { return __awaiter(_this, void 0, void 0, function () {
                        var user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!authResult.error) return [3 /*break*/, 1];
                                    console.error(authResult.error, authResult.error_subtype);
                                    reject(authResult.error);
                                    return [3 /*break*/, 4];
                                case 1:
                                    if (!authResult.access_token) return [3 /*break*/, 3];
                                    return [4 /*yield*/, getUserProfile(authResult.access_token)];
                                case 2:
                                    user = _a.sent();
                                    resolve({
                                        type: 'success',
                                        accessToken: authResult.access_token,
                                        idToken: authResult.id_token,
                                        //refreshToken: null,
                                        serverAuthCode: authResult.code,
                                        user: user,
                                    });
                                    return [3 /*break*/, 4];
                                case 3:
                                    resolve({ type: 'cancel' });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                })];
        });
    });
}
exports.logInAsync = logInAsync;
function getUserProfile(accessToken) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://www.googleapis.com/userinfo/v2/me', {
                        headers: { Authorization: "Bearer " + accessToken },
                    })];
                case 1:
                    userInfoResponse = _a.sent();
                    return [4 /*yield*/, userInfoResponse.json()];
                case 2:
                    userInfoResponse = _a.sent();
                    return [2 /*return*/, {
                            id: userInfoResponse.id,
                            name: userInfoResponse.name,
                            givenName: userInfoResponse.given_name,
                            familyName: userInfoResponse.family_name,
                            photoUrl: userInfoResponse.picture,
                            email: userInfoResponse.email,
                        }];
            }
        });
    });
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
