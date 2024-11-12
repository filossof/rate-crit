import styled from "styled-components";
import GenreChip from "./GenreChip";
import { Genre } from "../types";

type MovieCardProps = {
  title: string;
  imgSrc: string;
  releaseDate: string;
  time: string;
  score: number;
  overview: string;
  genre: Genre[];
};


export default function MovieCard({
  title,
  imgSrc,
  releaseDate,
  score,
  overview,
  genre,
}: MovieCardProps) {
  return (
    <>
      <StyledMovieCard>
        <MovieCardInner>
          <MovieCardFront>
            <Image src={imgSrc} alt="Movie Poster" />
          </MovieCardFront>
          <MovieCardBack>
            {genre &&
              genre.length > 0 &&
              genre.map((gnr) => <GenreChip key={gnr.id} genre={gnr} />)}
            <Title>{title}</Title>
            <SubTitle>Plot</SubTitle>
            <p>{overview}</p>
            <SubTitle>Users Score</SubTitle>
            <div>{score}</div>
            <SubTitle>Release Year</SubTitle>
            <div>{releaseDate.slice(0, 4)}</div>
          </MovieCardBack>
        </MovieCardInner>
      </StyledMovieCard>
    </>
  );
}

const MovieCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease-in-out;
`;

const MovieCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.4s ease-in-out;
`;

const MovieCardBack = styled.div`
  background-color: #151515;
  opacity: 0;
  color: white;
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  transition: transform 1s ease-in-out;
  padding: 30px 20px 60px 20px;
  box-sizing: border-box;
  border-radius: 0.5rem;
  overflow-y: auto;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #333; 
  }
  &::-webkit-scrollbar-thumb {
    background: #666; 
    border-radius: 4px;
  } 
`;

const StyledMovieCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 320px;
  height: 550px;
  margin: auto 10px;
  border: 3px solid black;
  border-radius: 0.6rem;

  &:hover ${MovieCardFront} {
    opacity: 0.3;
    transition: opacity 1s ease-in-out;
  }

  &:hover ${MovieCardBack} {
    opacity: 0.9;
    transform: translateY(10%);
    transition: transform 1s ease-in-out, opacity 1.5s;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const Title = styled.h2`
  color: #e09f05;
`;

const SubTitle = styled.h3`
  color: #008080;
`;
