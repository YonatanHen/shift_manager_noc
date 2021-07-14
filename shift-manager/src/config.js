const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit Flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
    issuer: 'https://accessfintechinternal.okta.com/',
    clientId: '0oa3rf7k1vkGwQ8or4x7', //    af - 0oa1enxmznReofv4z4x7 noc - 0oa3rf7k1vkGwQ8or4x7
    redirectUri: window.location.origin + '/login/callback',
  };
  
  const oktaSignInConfig = {
    baseUrl: 'https://accessfintechinternal.okta.com/',
    clientId: '0oa3rf7k1vkGwQ8or4x7',
    redirectUri: window.location.origin + '/login/callback',
    authParams: {
      // If your app is configured to use the Implicit Flow
      // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
      // you will need to uncomment the below line
      // pkce: false
    }
  };
  
  export { oktaAuthConfig, oktaSignInConfig };