import React from 'react'

const MovieCard = ({ movie: { Poster, Title, Year, Type } }) => {
  return (
    <div className='movie-card'>
      <img
        src={Poster !== 'N/A' ? Poster : './No-Poster.png'}
        alt={`${Title} Poster`}
        onError={e => { e.target.onerror = null; e.target.src = './No-Poster.png'; }}
      />
      <div className='mt-4'>
        <h3>{Title}</h3>
        <div className='content'>
          <p className='year'>{Year}</p>
          <span>・</span>
          <p className='lang'>{Type}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard