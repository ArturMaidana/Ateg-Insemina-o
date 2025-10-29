import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: #F9F9F9; 
	padding: 20px;
`;

export const Title = styled.Text`
	color: #007C6F;
	font-family: Ubuntu;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 18px; 
	margin-bottom: 14px;
`;

export const Label = styled.Text`
	color: #333;
	font-family: Ubuntu;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 18px;
`;

export const InputContainer = styled.View`
border-bottom-width: 1px;  
border-bottom-color: #000;  
padding: 5px 0;  
`;

export const StyledInput = styled.TextInput.attrs({
	placeholderTextColor: '#999',  
  })`
	font-size: 16px;  
	color: #000;  
  `;

