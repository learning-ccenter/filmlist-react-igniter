import { useCallback, useEffect, useState } from 'react';
import { Button } from './Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';


export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SidebarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar({selectedGenreId, setSelectedGenreId}: SidebarProps) {
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, [])
  //useCallback para passar funers par acomponentes filhos
  const handleClickButton = useCallback((id: number) => {
      setSelectedGenreId(id)
    }, [selectedGenreId]
  )
  
  return (
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {
            genres.map(genre => (
              <Button
                key={String(genre.id)}
                title={genre.title}
                iconName={genre.name}
                onClick={() => handleClickButton(genre.id)}
                selected={selectedGenreId === genre.id}
              />
            ))
          }
        </div>

      </nav>
    </>

  )
}