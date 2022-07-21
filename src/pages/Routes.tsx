import { StartPage } from './StartPage';
import { PropertyTypePage } from './PropertyTypePage';
import { RegionBasedAddressPage } from './RegionBasedAddressPage';
import { ConfirmationPage } from './ConfirmationPage';
import { WaitingPage } from './WaitingPage';
import { InquiryCompletePage } from './InquiryCompletePage';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import { RegionBasedMainChildrenAddressPage } from './RegionBaseMainChildrenPage';
import { RegionBasedGuChildrenAddressPage } from './RegionBaseGuChildrenPage';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/start" element={<StartPage />} />
      <Route path="/property-type" element={<PropertyTypePage />} />
      <Route path="/region-based-address" element={<RegionBasedAddressPage />} />
      <Route path="/region-based-address/main" element={<RegionBasedMainChildrenAddressPage />} />
      <Route path="/region-based-address/gu" element={<RegionBasedGuChildrenAddressPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/inquiry-complete" element={<InquiryCompletePage />} />
      <Route path="*" element={<Navigate replace to="/start" />} />
    </ReactRouterRoutes>
  );
};
