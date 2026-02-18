import { useEffect } from 'react';
import styled from 'styled-components';

import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Popup from '@/components/Popup/Popup';

import { usePopupStore } from "@/store/popupStore";

const MainLayout = () => {
	const { popup, closePopup } = usePopupStore()
  const location = useLocation()

  useEffect(() => {
    if(popup.state) closePopup();
  }, [location.pathname])

  return (
    <Container>
      <Header/>
      <Outlet />
      <Footer/>
      {popup.state &&
        <Popup/>
      }
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

export default MainLayout;
