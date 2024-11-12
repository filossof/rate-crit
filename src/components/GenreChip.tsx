import styled from "styled-components";
import { Genre } from "../types";

type GenreChipProps = {
    genre: Genre;
    onClick: (id: number) => void;
};

export default function GenreChip({ genre, onClick }: GenreChipProps) {
  function handleSelectGenre() {
    onClick(genre.id);
  }

  return <Chip onClick={handleSelectGenre}>{genre.name}</Chip>;
}

const Chip = styled.div`
  display: inline-block;
  padding: 4px 12px;
  margin: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  background-color: #008080;
  border-radius: 16px;
  cursor: default;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #e09f05;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;
