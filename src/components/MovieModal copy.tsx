import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Movie } from "../types";
import MovieModalItem from "./MovieModalItem";

type MovieModalProps = {
  selectedMovie: Movie;
  open: boolean;
  //   children: ReactNode;
  onClose: () => void;
};

function MovieModal({ selectedMovie, open, onClose }: MovieModalProps) {
  const dialog = useRef();

  const genreList =
    selectedMovie && selectedMovie.genre
      ? selectedMovie.genre.map((movie) => movie.name).join(", ")
      : "";

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <MovieModalContainer ref={dialog} onClose={onClose}>
      <ModalWrapper>
        <ModalContent>
          {selectedMovie ? (
            <>
              <Title>{selectedMovie.title}</Title>
              <MovieModalItem title="Genres" text={genreList} />
              <MovieModalItem title="Overview" text={selectedMovie.overview} />
              <MovieModalItem
                title="Release Date"
                text={selectedMovie.release_date}
              />
              <MovieModalItem
                title="Score"
                text={selectedMovie.vote_average.toString()}
              />
            </>
          ) : null}
        </ModalContent>
      </ModalWrapper>
    </MovieModalContainer>,
    document.getElementById("modal")!
  );
}

const MovieModalContainer = styled.dialog`
  min-width: 30rem;
  width: 60%;
  height: 1000px;
  padding: 0;
  z-index: 2;
  background: #09121e;
  border-radius: 18px;
  outline: 2px solid #ddb31b; /* Specify the border width, style, and color */
  border: none;
  
  opacity: 0;
  transform: translateY(-200px);
  transition: opacity 1s ease, transform 1 ease;

  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26); */
  /* animation: slide-down-fade-in 0.3s ease-out forwards; */

  &::backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }

  &[open] {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  height: 100%; /* Take full height of the modal */
`;

const ModalContent = styled.div`
  height: 60%; /* Set the height to 60% of the modal */
`;

const Title = styled.h2`
  color: #e09f05;
  text-align: center;
  font-size: 2rem;
`;

export default MovieModal;
