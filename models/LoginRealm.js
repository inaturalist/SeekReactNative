class LoginRealm {}
LoginRealm.schema = {
  name: "LoginRealm",
  properties: {
    access_token: "int",
    index: { type: "int", default: 0 }
  }
};

export default LoginRealm;
