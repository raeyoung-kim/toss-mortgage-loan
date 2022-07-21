import { useRouter } from 'pages/routing';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Spacing, List, ListRow } from '_tosslib/components';
import { Top03 } from '_tosslib/components/Top';
import { colors } from '_tosslib/constants/colors';
import { getRegions, RegionTreeNode } from './remotes';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { addressData } from 'store';

export function RegionBasedAddressPage() {
  const router = useRouter();
  const [adressState, setAdressState] = useRecoilState(addressData);
  const reset = useResetRecoilState(addressData);
  const [list, setList] = useState<RegionTreeNode[]>([]);

  const load = useCallback(async () => {
    try {
      const { rootRegions } = await getRegions();
      rootRegions && setList(rootRegions);
    } catch (err) {
      console.error(err);
    } finally {
      reset();
    }
  }, [reset]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <Top03 color={colors.grey900}>{`주택담보대출을 받을\n지역을 알려주세요`}</Top03>
      <Spacing size={22} />
      <List>
        {list.map(el => {
          return (
            <Fragment key={el.name}>
              <ListRow
                contents={
                  <ListRow.Text1Row
                    top={el.name}
                    topProps={{
                      color: colors.grey700,
                    }}
                  />
                }
                withArrow
                onClick={() => {
                  if (el.children) {
                    setAdressState({
                      ...adressState,
                      main: el.name,
                      mainChildren: el.children,
                    });
                    router.push('/region-based-address/main');
                  } else {
                    router.push('/confirmation');
                  }
                }}
              />
            </Fragment>
          );
        })}
      </List>
    </>
  );
}
