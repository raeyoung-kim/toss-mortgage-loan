import { useRouter } from 'pages/routing';
import { Spacing } from '_tosslib/components';
import { Top03 } from '_tosslib/components/Top';
import { colors } from '_tosslib/constants/colors';
import { useRecoilState } from 'recoil';
import { addressData } from 'store';
import { RegionTreeNode } from './remotes';
import { RegionList } from '_tosslib/components/RegionList';

export function RegionBasedMainChildrenAddressPage() {
  const router = useRouter();
  const [addressState, setAddressState] = useRecoilState(addressData);

  const onClick = (el: RegionTreeNode) => {
    if (el.children) {
      if (el.name.includes('구') || el.name.includes('군')) {
        setAddressState({
          ...addressState,
          gu: el.name,
          guChildren: el.children || [],
        });
        router.push('/region-based-address/gu');
      }
      if (el.name.includes('동')) {
        setAddressState({
          ...addressState,
          dong: el.name,
        });
        router.push('/region-based-address/dong');
      }
    } else {
      setAddressState({
        ...addressState,
        gu: el.name,
      });
      router.push('/confirmation');
    }
  };

  return (
    <>
      <Top03 color={colors.grey900}>{`주택담보대출을 받을\n지역을 알려주세요`}</Top03>
      <Spacing size={22} />
      <RegionList list={addressState.mainChildren || []} onClick={onClick} />
    </>
  );
}
