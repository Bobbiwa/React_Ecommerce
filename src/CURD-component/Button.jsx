import styled from 'styled-components';
//button type: primary or link
export default styled.button`
 background: ${({ type }) => type === "primary" ? "palevioletred" : "white"};
 color: ${({ type }) => type === "primary" ? "white" : "palevioletred"};
 border:${({ type }) => type === "link" ? "0 solid transparent" : "2px solid palevioletred"};
 
 font-size: 1em;
 margin: 1em;
 padding: 0.25em 1em;
`;
 