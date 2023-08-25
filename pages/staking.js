import Staking from 'containers/Staking';
import { StakingProvider } from 'contexts/staking-context';

export default function StakingPage() {
  return (
    <StakingProvider>
      <Staking />
    </StakingProvider>
  );
}
