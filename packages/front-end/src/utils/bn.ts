import { BigNumber as BN } from 'ethers';
import BigNumber from 'bignumber.js';

export type BigNumberLike = BN | BigNumber | number | string;

export function toBN(n: BigNumberLike): BigNumber {
  if (!n) return new BigNumber(0);
  return new BigNumber(n.toString(10));
}
