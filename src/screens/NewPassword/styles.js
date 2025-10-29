import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #F9F9F9;
`;

export const Title = styled.Text`
  color: #007C6F;
  font-family: Ubuntu;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; 
  text-align: start;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: start;
  margin-top: 10px;
  margin-bottom: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: flex-end;
`; 

export const ContinueButton = styled.TouchableOpacity`
	background-color: #37C064;
	padding: 15px;
	border-radius: 5px;
	align-items: center;
	margin-bottom: 20px;
  margin-top: 50px;
`;

export const ContinueButtonText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

export const NoPinButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #D3D3D3;
  align-items: center;
`;

export const NoPinButtonText = styled.Text`
  font-size: 16px;
  color: #707070;
`;
