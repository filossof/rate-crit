import styled from "styled-components";

type MovieModalItemProps = {
  title: string;
  text: string;
};

export default function MovieModalItem({ title, text }: MovieModalItemProps) {
  return (
    <div>
      <SubTitle>{title}</SubTitle>
      <Text>{text}</Text>
    </div>
  );
}

const SubTitle = styled.h3`
  color: #008080;
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  &.overview {
    text-align: justify;
  }
`;
