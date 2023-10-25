import { ApiPromise, HttpProvider } from '@polkadot/api';

import getEndpoint from './getEndpoint';

/**
 * To get the api for a chain
 *
 * @param genesisHash - teh genesisHash of the chain will be used to find an endpoint to use
 */
export async function getApi(genesisHash: string): Promise<ApiPromise> {
  const endpoint = getEndpoint(genesisHash);
  if (!endpoint) {
    throw new Error(`No endpoint with genesisHash: '${genesisHash}'.`);
  }
  const adjustedUrl = endpoint.replace('wss://', 'https://'); // since Metamask snap does not support web sockets at the moment we use https instead
  const httpProvider = new HttpProvider(adjustedUrl);

  const api = await ApiPromise.create({ provider: httpProvider });

  return api;
}
