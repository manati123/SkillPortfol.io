import { AuthenticationContext } from 'react-adal';

export default class TokenProvider {
    public static async silentLogin(): Promise<string> {
        const authContext = new AuthenticationContext({
            clientId: _spPageContextInfo['spfx3rdPartyServicePrincipalId'],
            tenant: _spPageContextInfo['aadTenantId'],
            redirectUri: window.location.origin + '/_forms/spfxsinglesignon.aspx'
        });

        return authContext._renewToken(_spPageContextInfo['spfx3rdPartyServicePrincipalId'], (_, token: string) => { return token; }, authContext.RESPONSE_TYPE.ID_TOKEN_TOKEN);
    }
}