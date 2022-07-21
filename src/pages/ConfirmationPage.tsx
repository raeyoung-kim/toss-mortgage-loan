import { useRouter } from 'pages/routing';
import { Button, FixedBottomCTA, List, ListRow, Spacing } from '_tosslib/components';
import { Top03 } from '_tosslib/components/Top';
import { colors } from '_tosslib/constants/colors';
import { useRecoilState } from 'recoil';
import { addressData } from 'store';
import { useCallback, useEffect, useState } from 'react';
import { getMe, inquiryLoan } from './remotes';

export function ConfirmationPage() {
  const router = useRouter();
  const [addressState] = useRecoilState(addressData);
  const [myName, setMyName] = useState('');

  const onConfirm = useCallback(async () => {
    try {
      const id = sessionStorage.getItem('transactionId');
      if (id) {
        const { main, gu, dong } = addressState;
        const result: string[] = [main, gu, dong].filter(el => el);
        const { transactionId } = await inquiryLoan({
          propertyType: (sessionStorage.getItem('option')! as '아파트' | '주택/빌라') || '아파트',
          address: result,
        });
        sessionStorage.setItem('transactionId', transactionId);
      }
    } catch (err) {
      console.error(err);
    }
  }, [addressState]);

  const load = useCallback(async () => {
    try {
      const me = await getMe();
      setMyName(me.name);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <Spacing size={17} />
      <Top03 color={colors.grey900}>아래 정보가 맞는지 확인해주세요</Top03>
      <Spacing size={37} />
      <List>
        <ListRow
          contents={
            <ListRow.Text1Row
              top="이름"
              topProps={{
                color: colors.grey700,
              }}
            />
          }
          right={
            <ListRow.Text1Row
              top={myName}
              topProps={{
                color: colors.grey700,
              }}
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Text1Row
              top="아파트 주소"
              topProps={{
                color: colors.grey700,
                typography: 't5',
              }}
            />
          }
          right={
            <ListRow.Text2Rows
              top={`${addressState.main} ${addressState.gu} ${addressState.dong}`}
              topProps={{
                color: colors.grey700,
                typography: 't5',
                fontWeight: 'bold',
              }}
              bottom={`${sessionStorage.getItem('option') || ''}`}
              bottomProps={{
                color: colors.grey700,
                typography: 't5',
                textAlign: 'end',
              }}
            />
          }
        />
      </List>
      <FixedBottomCTA.TypeB
        leftButton={
          <Button style="weak" type="dark" onClick={() => router.back()}>
            바꿀래요
          </Button>
        }
        rightButton={
          <Button
            style="fill"
            type="primary"
            onClick={async () => {
              await onConfirm();
              router.push('/waiting');
            }}
          >
            맞아요
          </Button>
        }
      />
    </>
  );
}
