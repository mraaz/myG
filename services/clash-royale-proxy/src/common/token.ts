/**
 * Eventually this will return a list of tokens that the API can use to make clash api requests.
 */
export const getTokens = (): string => {
  return process.env.TOKEN || Token.NoToken;
};

export const getEndpoint = (): string => {
  return process.env.ENDPOINT || Token.NoEndpoint;
};

export enum Token {
  NoToken = 'NO_TOKEN',
  NoEndpoint = 'NO_ENDPOINT',
}
