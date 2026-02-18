import { useEffect } from 'react';
import styled from 'styled-components';

import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/components/Footer';

import { usePopupStore } from "@/store/popupStore";

const WithoutHatLayout = () => {
  const { popup, closePopup } = usePopupStore()
  const location = useLocation()

  useEffect(() => {
    if(popup.state) closePopup();
  }, [location.pathname])

  return (
    <Container>
      <Outlet />
      <Footer/>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  border: 2px solid #FF6B6B; 
  box-sizing: border-box;
  padding-bottom: 126px;
  overflow: hidden;
`;

export default WithoutHatLayout;
