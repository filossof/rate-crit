import styled from "styled-components";
import logoImage from "../assets/logo.png";
import { useState } from "react";
import GenreSelect from "./GenreSelect";

type TopbarProps = {
  onSearch: (query: string) => void;
  onTabSelect: (tabName: string) => void;
  selectedTab: string;
  onSelectGenre: (selectedGenreId: number) => void;
  genreId: number;
};

export default function Topbar({
  onSearch,
  onTabSelect,
  selectedTab,
  onSelectGenre,
  genreId,
}: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(selectedTab);

  function handleSearch() {
    if (searchQuery.trim()) {
      setActiveTab("");
      onSearch(searchQuery);
    }
  }

  function handleTabClick(tabName: string) {
    setActiveTab(tabName);
    onTabSelect(tabName);
  }

  function handleSelectedGenre(genreId: number) {
    setActiveTab("");
    onSelectGenre(genreId);
  }
  return (
    <TopbarContainer>
      <Logo>
        <LogoImage src={logoImage} alt="RateCrit logo" />
      </Logo>
      <Tabs>
        <Tab
          name="mostPopular"
          onClick={() => handleTabClick("mostPopular")}
          $isActive={activeTab === "mostPopular"}
        >
          Most Popular
        </Tab>
        <Tab
          name="topRated"
          onClick={() => handleTabClick("topRated")}
          $isActive={activeTab === "topRated"}
        >
          Top Rated
        </Tab>
        <Tab
          name="nowPlaying"
          onClick={() => handleTabClick("nowPlaying")}
          $isActive={activeTab === "nowPlaying"}
        >
          Now Playing
        </Tab>
      </Tabs>
      <GenreSelect
        onSelect={handleSelectedGenre}
        value={genreId}
      />
      <SearchBar>
        <SearchInput
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          type="text"
          placeholder="Search for a movie..."
        />
        <SearchButton onClick={handleSearch}>🔍</SearchButton>
      </SearchBar>
    </TopbarContainer>
  );
}

// Styled-components
const TopbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: #1a1a1a;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: sticky;
  z-index: 1000;
  border-radius: 1rem;
  top: 0;
`;

const Logo = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #e09f05;
`;

const Tabs = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${({ $isActive }) => ($isActive ? "#e09f05" : "#fff")};
  font-size: 1rem;
  padding: 0.5rem;
  transition: color 0.3s ease, box-shadow 0.5s ease;
  outline: none;
  border: none;
  border-radius: 0;

  box-shadow: ${({ $isActive }) =>
    $isActive ? "inset 0 -1.5px 0 0 #e09f05" : "none"};

  &:hover,
  &:focus {
    color: #e09f05;
    box-shadow: inset 0 -1.5px 0 0 #e09f05;
    outline: none;
    border: none;
    border-radius: 0;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  background-color: #333;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  outline: none;
  color: #fff;
  background-color: transparent;
  font-size: 1rem;
  width: 200px;
  transition: width 0.4s ease;

  &::placeholder {
    color: #bbb;
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: #e09f05;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d08c03;
  }
`;

const LogoImage = styled.img`
  height: 4em;
  padding: 0.5rem;
`;
