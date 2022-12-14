import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 55px;
`;

const StartElement = styled.div`
  min-width: 50px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Subtitle = styled.p`
  margin: 4px 8px;
  font-size: 14px;
  white-space: nowrap;
`;

const Title = styled.p`
  margin: 0 8px;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
`;

const StyledHeader = {
  Container,
  StartElement,
  MiddleContainer,
  Subtitle,
  Title,
};

export default StyledHeader;
