import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Movie } from "../types";
import MovieModalItem from "./MovieModalItem";

type MovieModalProps = {
  selectedMovie: Movie;
  open: boolean;
  onClose: () => void;
};

function MovieModal({ selectedMovie, open, onClose }: MovieModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const genreList =
    selectedMovie && selectedMovie.genre
      ? selectedMovie.genre.map((movie) => movie.name).join(", ")
      : "";

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (open) {
      if (timer) {
        clearTimeout(timer);
      }
      if (dialog.current) {
        dialog.current.showModal();
      }
      setIsVisible(true);
    } else {
      setIsVisible(false);
      timer = setTimeout(() => {
        if (dialog.current) {
          dialog.current.close();
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [open]);

  return createPortal(
    <MovieModalContainer
      ref={dialog}
      className={isVisible ? "visible" : ""}
      onClose={onClose}
    >
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
  outline: 2px solid #e09f05;
  border: none;

  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 1s ease, transform 1s ease;

  &::backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalContent = styled.div`
  height: 60%;
`;

const Title = styled.h2`
  color: #e09f05;
  text-align: center;
  font-size: 2rem;
`;

export default MovieModal;
