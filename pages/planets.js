import styles from '../styles/Planets.module.css'
import { useEffect, useState } from "react"
import Image from 'next/image'

import imgUrl from '../assets/images/planet.jpg'

const URL = 'https://swapi.py4e.com/api/planets'

export default function Planets() {
  const [planets, setPlanets] = useState([])
  const [page, setPage] = useState(0)
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    getPlanets()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPlanets = () => {
    fetch(`${URL}?page=${page + 1}`).then(res => res.json()).then(data => {
      setPlanets([...planets, ...data.results])
      setPage(p => p + 1)
      if(!data.next) setIsLoadMore(false)
    }).catch(error => console.error(error))
  }

  const onLoadMore = () => {
    getPlanets()
  }
  return (
    <div>
      <h1>List of planets</h1>
      <label>Search: </label>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <div className={styles.cards}>
        {
          planets.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(planet => <Card key={planet.name} planet={planet} />)
        }
      </div>
      {
        isLoadMore && <button className={styles.loadMore} onClick={onLoadMore}>Load More</button>
      }
    </div>
  )
}

function Card({planet}) {
  return (
    <div className={styles.card}>
      <Image width={300} height={300} src={imgUrl} alt='Planet image' />
      <p>Name - <b>{planet.name}</b></p>
      <p>Climat - <b>{planet.climate}</b></p>
      <p>Residents - <b>{planet.residents.length}</b></p>
      <p>Diameter - <b>{planet.diameter}km</b></p>
      <p>Population - <b>{planet.population}</b></p>
      <p>Rotation period - <b>{planet.rotation_period}</b></p>
      <p>Surface water - <b>{planet.surface_water}</b></p>
      <p>Terrain - <b>{planet.terrain}</b></p>
    </div>
  )
}
