import { useRouter } from 'pages/routing';
import { useState, useEffect } from 'react';
import { FixedBottomCTA, Radio, Spacing } from '_tosslib/components';
import { Top03 } from '_tosslib/components/Top';
import { colors } from '_tosslib/constants/colors';
import { marginX24 } from '_tosslib/utils/spacing';

export function PropertyTypePage() {
  const router = useRouter();
  const [value, setValue] = useState<'주택/빌라' | '아파트'>('아파트');

  useEffect(() => {
    sessionStorage.setItem('option', value);
  }, [value]);

  return (
    <>
      <Top03 color={colors.grey900}>{`주택담보대출을 신청할\n주택의 종류를 선택해주세요`}</Top03>
      <Spacing size={32} />
      <Radio value={value} onChange={e => setValue(e.target.value! as '주택/빌라' | '아파트')} css={marginX24}>
        <Radio.Option value="아파트">아파트</Radio.Option>
        <Radio.Option value="주택/빌라">주택/빌라</Radio.Option>
      </Radio>
      <FixedBottomCTA onClick={() => router.push('/region-based-address')} disabled={false}>
        다음
      </FixedBottomCTA>
    </>
  );
}
