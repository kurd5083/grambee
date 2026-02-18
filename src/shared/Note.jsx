import styled from 'styled-components';
import exclamation from "@/assets/exclamation.svg";

const Note = ({children}) => {
    return (
        <NoteContainer>
            <img src={exclamation} alt="exclamation icon" />
            {children}
        </NoteContainer>
    )
}

const NoteContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  font-size: 12px;
  line-height: 18px;
  color: #6A7080;
  margin-top: 24px;
`
export default Note