import { useRouter } from 'pages/routing';
import { useEffect } from 'react';
import { Lottie } from '_tosslib/components';
import { Top03 } from '_tosslib/components/Top';
import { colors } from '_tosslib/constants/colors';
import { getLoanInquiryProgress } from './remotes';

export function WaitingPage() {
  const router = useRouter();
  const id = sessionStorage.getItem('transactionId');

  useEffect(() => {
    const interval = setInterval(async () => {
      if (id) {
        const { progress } = await getLoanInquiryProgress(id);
        if (progress === 'complete') {
          router.push('/inquiry-complete');
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [id, router]);

  return (
    <>
      <Top03 color={colors.grey900}>{`입력한 정보로\n임지훈님의 대출 조건을 확인할게요`}</Top03>
      <Lottie src="https://static.toss.im/lotties/loading/profile-loading.json" loop />
    </>
  );
}
