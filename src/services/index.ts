import axios from 'axios';
import { Mainnet } from 'configs';

const TZSTATS_URL = 'https://api.tzstats.com';

export const getEscrowBalance = () => {
  const url = `${TZSTATS_URL}/explorer/account/${Mainnet.Escrow}`;
  return axios.get(url)
    .then((res: any) => {
      return res.spendable_balance;
    })
    .catch(e => console.error(e));
}
