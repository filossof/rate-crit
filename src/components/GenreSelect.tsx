import styled from "styled-components";
import Genres from "../genres.json";

type GenreSelectProps = {
  onSelect: (genreId: number) => void;
  value: number;
};

export default function GenreSelect({ onSelect, value }: GenreSelectProps) {
  return (
    <Select value={value} onChange={(e) => onSelect(Number(e.target.value))}>
      <option value="0">Genre</option>
      {Genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </Select>
  );
}

const Select = styled.select`
  border: 0;
  outline: 0;
  font: inherit;
  width: 8.5rem;
  background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, var(--arrow-bg) 3em, var(--select-bg) 3em);
  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
