import React from 'react';
import styled from 'styled-components';

const Alert = styled.div`
font-size: 12px;
color: red; 
padding-top: 5px;
`;
const Wrapper = styled.div`
  padding: 0 auto;
  margin: 0 auto;
  margin-left: 160px;
//   text-align: center;
  height: 20px;
`;
const AlertBox = ({available,children}) => {
    return (
        <Wrapper>
            {available?<Alert></Alert>:<Alert>{children}</Alert>}     
        </Wrapper>
       
    );
}

export default AlertBox