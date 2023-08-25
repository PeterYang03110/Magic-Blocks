import Shop from 'containers/Shop';

import { InfluencePointProvider } from 'contexts/influence-point-context';


export default function ShopPage() {
  return (
    <InfluencePointProvider>
      <Shop />
    </InfluencePointProvider>
  );
}