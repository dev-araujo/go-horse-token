import { Network } from "../../config/blockchain.config";

export interface ITokenService {
  getMetadataAboutToken(network: Network): Promise<string>;
  getTotalMinted(network: Network): Promise<number>;
  getMaxSupply(network: Network): Promise<number>;
  getMintFee(network: Network): Promise<string>;
}
